import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HERO_VIDEO_TARGET_TIME = 7.45;
const HERO_VIDEO_SCRUB_START = 0.006;

export const ScrollStoryController: React.FC = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const timelines: gsap.core.Timeline[] = [];
      const scrollTriggers: ScrollTrigger[] = [];
      const cleanupCallbacks: Array<() => void> = [];
      const hero = document.querySelector<HTMLElement>("[data-scroll-scene='hero']");
      const panorama = hero?.querySelector<HTMLElement>("[data-hero-panorama]");
      const heroVideo = hero?.querySelector<HTMLVideoElement>("[data-hero-video]");

      if (hero && panorama) {
        gsap.set(panorama, { yPercent: -2, scale: 1.06, transformOrigin: "50% 50%" });
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(heroTl);
        heroTl.to(panorama, { yPercent: 5, scale: 1.02, ease: "none" });
      }

      if (hero && heroVideo) {
        let scrubStartTime: number | null = null;
        let queuedTime: number | null = null;
        let seekRaf = 0;

        const targetTime = () => {
          if (!Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) {
            return HERO_VIDEO_TARGET_TIME;
          }

          return Math.min(HERO_VIDEO_TARGET_TIME, Math.max(0, heroVideo.duration - 0.35));
        };

        const cancelQueuedSeek = () => {
          if (seekRaf) {
            window.cancelAnimationFrame(seekRaf);
            seekRaf = 0;
          }
          queuedTime = null;
        };

        const seekVideo = (time: number) => {
          queuedTime = time;
          if (seekRaf) return;

          seekRaf = window.requestAnimationFrame(() => {
            seekRaf = 0;
            if (queuedTime === null) return;
            if (Math.abs(heroVideo.currentTime - queuedTime) > 0.012) {
              heroVideo.currentTime = queuedTime;
            }
            queuedTime = null;
          });
        };

        const resumeHeroPlayback = () => {
          scrubStartTime = null;
          cancelQueuedSeek();
          delete heroVideo.dataset.heroScrollScrub;
          if (heroVideo.paused && heroVideo.readyState >= 2) {
            heroVideo.play().catch(() => undefined);
          }
        };

        const scrubVideoToTarget = (progress: number) => {
          if (progress <= HERO_VIDEO_SCRUB_START) {
            scrubStartTime = null;
            return;
          }

          if (!Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) return;

          if (scrubStartTime === null) {
            scrubStartTime = heroVideo.currentTime;
          }

          heroVideo.dataset.heroScrollScrub = "active";
          if (!heroVideo.paused) {
            heroVideo.pause();
          }

          const mappedProgress = gsap.utils.clamp(0, 1, (progress - HERO_VIDEO_SCRUB_START) / (1 - HERO_VIDEO_SCRUB_START));
          seekVideo(gsap.utils.interpolate(scrubStartTime, targetTime(), mappedProgress));
        };

        const heroVideoTrigger = ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          invalidateOnRefresh: true,
          onUpdate: (self) => scrubVideoToTarget(self.progress),
          onLeave: () => {
            heroVideo.dataset.heroScrollScrub = "active";
            heroVideo.pause();
            seekVideo(targetTime());
          },
          onLeaveBack: resumeHeroPlayback,
        });
        scrollTriggers.push(heroVideoTrigger);
        cleanupCallbacks.push(cancelQueuedSeek);
      }

      const flight = document.querySelector<HTMLElement>("[data-scroll-scene='flight']");
      if (flight) {
        const route = flight.querySelector<SVGPathElement>("[data-flight-route]");
        const points = gsap.utils.toArray<HTMLElement>(flight.querySelectorAll("[data-flight-point]"));
        const drone = flight.querySelector<HTMLElement>("[data-flight-drone]");
        const layers = gsap.utils.toArray<HTMLElement>(flight.querySelectorAll("[data-flight-layer]"));

        if (route) {
          const routeLength = route.getTotalLength();
          gsap.set(route, {
            strokeDasharray: routeLength,
            strokeDashoffset: routeLength,
            opacity: 1,
          });
        }

        gsap.set(points, { autoAlpha: 0, scale: 0.62, transformOrigin: "50% 50%" });
        if (drone) {
          gsap.set(drone, { autoAlpha: 0, scale: 0.9, y: 18, transformOrigin: "50% 50%" });
        }
        gsap.set(layers, { autoAlpha: 0, y: 32 });

        const flightTl = gsap.timeline({
          scrollTrigger: {
            trigger: flight,
            start: "top top+=64",
            end: "+=180%",
            pin: true,
            pinSpacing: "margin",
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(flightTl);
        flightTl.addLabel("route", 0);
        flightTl.addLabel("points", 0.35);
        flightTl.addLabel("data", 0.70);

        if (route) {
          flightTl.to(route, { strokeDashoffset: 0, ease: "none", duration: 0.35 }, "route");
        }

        flightTl.to(points, { autoAlpha: 1, scale: 1, stagger: 0.06, ease: "back.out(1.8)", duration: 0.24 }, "points");

        if (drone) {
          flightTl.to(drone, { autoAlpha: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.24 }, "points+=0.04");
        }

        flightTl.to(layers, { autoAlpha: 1, y: 0, stagger: 0.08, ease: "power2.out", duration: 0.28 }, "data");
      }

      return () => {
        timelines.forEach((timeline) => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        });
        scrollTriggers.forEach((trigger) => trigger.kill());
        cleanupCallbacks.forEach((cleanup) => cleanup());
      };
    });

    return () => mm.revert();
  }, []);

  return null;
};
