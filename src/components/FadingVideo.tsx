import React, { useEffect, useRef, useState } from "react";
import { HeroPanorama } from "./HeroPanorama";
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
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const revealVideo = () => {
      if (video.readyState >= 2 || !video.paused) {
        setHasError(false);
        setIsVideoVisible(true);
      }
    };
    if (video.readyState >= 2) revealVideo();

    video.addEventListener("loadedmetadata", revealVideo);
    video.addEventListener("loadeddata", revealVideo);
    video.addEventListener("canplay", revealVideo);
    video.addEventListener("playing", revealVideo);
    video.addEventListener("timeupdate", revealVideo);

    return () => {
      video.removeEventListener("loadedmetadata", revealVideo);
      video.removeEventListener("loadeddata", revealVideo);
      video.removeEventListener("canplay", revealVideo);
      video.removeEventListener("playing", revealVideo);
      video.removeEventListener("timeupdate", revealVideo);
    };
  }, []);

  return (
    <div className={cn("overflow-hidden", className)}>
      <HeroPanorama
        src={backdropSrc}
        alt={backdropAlt}
        className={backdropClassName}
      />
      <video
        ref={videoRef}
        data-hero-video
        className={cn("absolute inset-0 h-full w-full object-cover", videoClassName)}
        style={{ ...style, opacity: hasError || !isVideoVisible ? 0 : 1 }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={(event) => {
          setIsVideoVisible(true);
          if (event.currentTarget.dataset.heroScrollScrub !== "active") {
            event.currentTarget.play().catch(() => undefined);
          }
          onCanPlay?.(event);
        }}
        onError={(event) => {
          if (event.currentTarget.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || event.currentTarget.readyState === 0) {
            setHasError(true);
          }
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
