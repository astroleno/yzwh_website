import React, { useState } from "react";
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
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("overflow-hidden", className)}>
      <video
        className={cn("absolute inset-0 h-full w-full object-cover", videoClassName)}
        style={{ ...style, opacity: hasError ? 0 : 1 }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={(event) => {
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
