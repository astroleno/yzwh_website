import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

type FadingVideoSource = {
  src: string;
  type: string;
  media?: string;
};

interface FadingVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fallbackSrc?: string;
  sources?: FadingVideoSource[];
  className?: string;
  videoClassName?: string;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({
  src,
  fallbackSrc,
  sources,
  className,
  videoClassName,
  style,
  onCanPlay,
  onError,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rAfRef = useRef<number>(0);
  const fadingOutRef = useRef(false);
  const [hasError, setHasError] = useState(false);

  const fadeTo = (targetOpacity: number) => {
    const video = videoRef.current;
    if (!video) return;

    cancelAnimationFrame(rAfRef.current);
    const startOpacity = parseFloat(video.style.opacity || "0");
    const startTime = performance.now();
    const fadeMs = 500;

    const animateFade = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / fadeMs, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      if (videoRef.current) videoRef.current.style.opacity = currentOpacity.toString();
      if (progress < 1) rAfRef.current = requestAnimationFrame(animateFade);
    };

    rAfRef.current = requestAnimationFrame(animateFade);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && remaining > 0 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      window.setTimeout(() => {
        if (!videoRef.current || hasError) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => setHasError(true));
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    return () => {
      cancelAnimationFrame(rAfRef.current);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [hasError]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <video
        ref={videoRef}
        className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", videoClassName)}
        style={{ ...style, opacity: hasError ? 0 : 1 }}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={(event) => {
          event.currentTarget.play().catch(() => setHasError(true));
          fadeTo(1);
          onCanPlay?.(event);
        }}
        onError={(event) => {
          setHasError(true);
          onError?.(event);
        }}
        {...props}
      >
        {(sources ?? [
          { src, type: "video/webm" },
          ...(fallbackSrc ? [{ src: fallbackSrc, type: "video/mp4" }] : []),
        ]).map((source) => (
          <source key={`${source.media ?? "default"}:${source.src}`} src={source.src} type={source.type} media={source.media} />
        ))}
      </video>
    </div>
  );
};
