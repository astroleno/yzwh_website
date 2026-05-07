import React, { useEffect, useRef } from "react";
import {
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { cn } from "../lib/utils";

interface HeroPanoramaProps {
  src: string;
  alt: string;
  className?: string;
}

const getView = (width: number) => ({
  fov: width < 768 ? 68 : 54,
  yaw: width < 768 ? 1.08 : 1.18,
  pitch: width < 768 ? -0.18 : -0.12,
});

export const HeroPanorama: React.FC<HeroPanoramaProps> = ({ src, alt, className }) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let isMounted = true;
    let rafId = 0;
    let texture: Texture | null = null;

    const scene = new Scene();
    const camera = new PerspectiveCamera(54, 1, 0.1, 1000);
    camera.rotation.order = "YXZ";

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setClearColor(0x07111f, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const geometry = new SphereGeometry(500, 96, 48);
    geometry.scale(-1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    const sphere = new Mesh(geometry, material);
    scene.add(sphere);

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      const view = getView(width);

      camera.fov = view.fov;
      camera.aspect = width / height;
      camera.rotation.x = view.pitch;
      camera.rotation.y = view.yaw;
      camera.rotation.z = 0;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const startedAt = performance.now();
    const renderFrame = (now: number) => {
      const view = getView(host.clientWidth);
      const drift = prefersReducedMotion.matches ? 0 : Math.sin((now - startedAt) / 18000) * 0.025;
      const lift = prefersReducedMotion.matches ? 0 : Math.sin((now - startedAt) / 24000) * 0.006;

      camera.rotation.x = view.pitch + lift;
      camera.rotation.y = view.yaw + drift;
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderFrame);
    };

    const textureLoader = new TextureLoader();
    textureLoader.load(src, (loadedTexture) => {
      if (!isMounted) {
        loadedTexture.dispose();
        return;
      }

      texture = loadedTexture;
      texture.colorSpace = SRGBColorSpace;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.generateMipmaps = false;
      material.map = texture;
      material.needsUpdate = true;
      resize();
      rafId = window.requestAnimationFrame(renderFrame);
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("resize", resize);
    resize();

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
      texture?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [src]);

  return (
    <div ref={hostRef} data-hero-panorama className={cn("absolute inset-0 overflow-hidden bg-[var(--color-ink)] will-change-transform", className)}>
      <span className="sr-only">{alt}</span>
    </div>
  );
};
