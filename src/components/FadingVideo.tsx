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
  backdropSrc: string;
  backdropAlt: string;
  sources?: FadingVideoSource[];
  className?: string;
  backdropClassName?: string;
  videoClassName?: string;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({
  src,
  fallbackSrc,
  backdropSrc,
  backdropAlt,
  sources,
  className,
  backdropClassName,
  videoClassName,
  style,
  onCanPlay,
  onError,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const seamTimeoutRef = useRef<number>(0);
  const seamActiveRef = useRef(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const resetLoop = () => {
      window.clearTimeout(seamTimeoutRef.current);
      seamTimeoutRef.current = window.setTimeout(() => {
        if (!videoRef.current || hasError) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => setHasError(true));
        setIsVideoVisible(true);
        window.setTimeout(() => {
          seamActiveRef.current = false;
        }, 220);
      }, 620);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || seamActiveRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.85 && remaining > 0) {
        seamActiveRef.current = true;
        setIsVideoVisible(false);
        resetLoop();
      }
    };

    const handleEnded = () => {
      if (seamActiveRef.current) return;
      seamActiveRef.current = true;
      setIsVideoVisible(false);
      resetLoop();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      window.clearTimeout(seamTimeoutRef.current);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [hasError]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={backdropSrc}
        alt={backdropAlt}
        data-hero-panorama
        className={cn("absolute inset-0 h-full w-full object-cover will-change-transform", backdropClassName)}
        decoding="async"
        fetchPriority="high"
      />
      <video
        ref={videoRef}
        data-hero-video
        className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out", videoClassName)}
        style={{ ...style, opacity: hasError || !isVideoVisible ? 0 : 1 }}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={(event) => {
          setIsVideoVisible(true);
          event.currentTarget.play().catch(() => setHasError(true));
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
