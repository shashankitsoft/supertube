import React from "react";
import "./NewsSection.css";
import VideoThumbnailCard from "./VideoThumbnailCard";
import { VideoEntry } from "../types";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

interface NewsSectionProps {
  title: string;
  videos: VideoEntry[];
  isLive: boolean;
  onCardSelect: (video: { videoId: string; title: string }) => void;
  parentFocusKey?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, videos, isLive, onCardSelect, parentFocusKey }) => {
  // Section focusable (vertical navigation)
  // @ts-expect-error: parentFocusKey is supported at runtime but not in types
  const { ref: sectionRef, focusKey: sectionFocusKey } = useFocusable({ parentFocusKey, trackChildren: true });

  // Row focusable (horizontal navigation)
  // @ts-expect-error: parentFocusKey is supported at runtime but not in types
  const { ref: rowRef, focusKey: rowFocusKey } = useFocusable({ parentFocusKey: sectionFocusKey, trackChildren: true });

  return (
    <div className="news-section" ref={sectionRef}>
      <h2 className="section-title">{title}</h2>
      <div className="channel-list" ref={rowRef}>
        {videos.map((entry, idx) => {
          const video = isLive ? entry.liveVideo : entry.latestVideo;
          if (!video) return null;
          // Extract videoId from video.url
          const match = video.url.match(/[?&]v=([^&]+)/);
          const videoId = match ? match[1] : "";
          return (
            <VideoThumbnailCard
              key={idx}
              video={video}
              channelName={entry.name}
              onClick={() => onCardSelect({ videoId, title: video.title })}
              parentFocusKey={rowFocusKey}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsSection;
