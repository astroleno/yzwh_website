import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

const smoothStep = (a: number, b: number, t: number): number => {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
};

const length = (x: number, y: number): number => Math.sqrt(x * x + y * y);

const roundedRectSDF = (x: number, y: number, width: number, height: number, radius: number): number => {
    const qx = Math.abs(x) - width + radius;
    const qy = Math.abs(y) - height + radius;
    return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
};

interface UV { x: number; y: number; }

export interface LiquidGlassProps extends React.ComponentProps<"div"> {
    intensity?: "normal" | "strong";
    as?: any;
}

export const LiquidGlass = React.forwardRef<HTMLElement, LiquidGlassProps>(({
    className,
    children,
    intensity = "normal",
    as: Component = "div",
    ...props
}, ref) => {
    const containerRef = useRef<HTMLElement>(null);
    const mergedRef = (node: HTMLElement) => {
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        containerRef.current = node;
    };

    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        setWidth(element.offsetWidth);
        setHeight(element.offsetHeight);

        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                setWidth(entries[0].contentRect.width);
                setHeight(entries[0].contentRect.height);
            }
        });
        resizeObserver.observe(element);
        return () => resizeObserver.disconnect();
    }, []);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const feImageRef = useRef<SVGFEImageElement | null>(null);
    const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
    const filterId = useRef("liquid-glass-" + Math.random().toString(36).slice(2, 11));

    // Tweaked defaults for better adaptive sizing
    const distortWidth = 0.45;
    const distortHeight = 0.45;
    const distortRadius = 0.25;
    const smoothStepEdge = 0.8;
    const distanceOffset = 0.05;

    const updateShader = useCallback(() => {
        if (!canvasRef.current || !feImageRef.current || !feDisplacementMapRef.current || width <= 1 || height <= 1) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Uses a 0.25 DPI scale for performance—creates a nice, natural smooth blur effect too
        const canvasDPI = 0.25;
        const w = Math.floor(width * canvasDPI);
        const h = Math.floor(height * canvasDPI);
        if (w <= 0 || h <= 0) return;

        canvas.width = w;
        canvas.height = h;

        const data = new Uint8ClampedArray(w * h * 4);
        let maxScale = 0;
        const rawValues: number[] = [];

        const aspect = width / height;

        const fragment = (uv: UV) => {
            // Apply scale logic similar to original, slightly adjusted to prevent over-stretching
            const ix = uv.x - 0.5;
            const iy = (uv.y - 0.5) / aspect; 
            const distanceToEdge = roundedRectSDF(ix, iy, distortWidth, distortHeight / aspect, distortRadius);
            const displacement = smoothStep(smoothStepEdge, 0, distanceToEdge - distanceOffset);
            const scaled = smoothStep(0, 1, displacement);
            return { x: ix * scaled + 0.5, y: iy * aspect * scaled + 0.5 };
        };

        for (let i = 0; i < w * h; i++) {
            const x = i % w;
            const y = Math.floor(i / w);
            const pos = fragment({ x: x / w, y: y / h });
            const dx = pos.x * w - x;
            const dy = pos.y * h - y;
            maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
            rawValues.push(dx, dy);
        }

        maxScale *= 0.8;
        let dataIndex = 0;
        let rawValIdx = 0;
        for (let i = 0; i < w * h; i++) {
            const r = rawValues[rawValIdx++] / maxScale + 0.5;
            const g = rawValues[rawValIdx++] / maxScale + 0.5;
            data[dataIndex++] = r * 255;
            data[dataIndex++] = g * 255;
            data[dataIndex++] = 0;
            data[dataIndex++] = 255;
        }

        context.putImageData(new ImageData(data, w, h), 0, 0);
        feImageRef.current.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL());
        feDisplacementMapRef.current.setAttribute("scale", (maxScale / canvasDPI).toString());
    }, [width, height]);

    useEffect(() => {
        updateShader();
    }, [updateShader]);

    // Heavily increasing the blur values to solve "reference is too clear"
    const blurAmount = intensity === "strong" ? "40px" : "20px";

    return (
        <>
            <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none", zIndex: -1 }}>
                <defs>
                    <filter id={filterId.current} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB" x="0" y="0" width={width} height={height}>
                        <feImage ref={feImageRef} width={width} height={height} result={filterId.current + "_map"} />
                        <feDisplacementMap ref={feDisplacementMapRef} in="SourceGraphic" in2={filterId.current + "_map"} xChannelSelector="R" yChannelSelector="G" scale="0" />
                    </filter>
                </defs>
            </svg>
            <Component
                ref={mergedRef}
                style={{
                    backdropFilter: `url(#${filterId.current}) blur(${blurAmount}) contrast(1.1) brightness(1.2) saturate(1.2)`,
                    WebkitBackdropFilter: `url(#${filterId.current}) blur(${blurAmount}) contrast(1.1) brightness(1.2) saturate(1.2)`,
                    ...props.style
                }}
                className={cn(
                    "relative overflow-hidden",
                    intensity === "strong" ? "liquid-glass-strong" : "liquid-glass",
                    className
                )}
                {...props}
            >
                {children}
            </Component>
            <canvas ref={canvasRef} width={width} height={height} style={{ display: "none" }} />
        </>
    );
});
LiquidGlass.displayName = "LiquidGlass";
