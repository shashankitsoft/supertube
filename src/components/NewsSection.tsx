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
  const validVideos = videos
    .map(entry => ({
      entry,
      video: isLive ? entry.liveVideo : entry.latestVideo
    }))
    .filter(({ video }) => video);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: rowRef, focusKey: rowFocusKey } = useFocusable({ parentFocusKey, trackChildren: true } as any);
  return (
    <div className="news-section">
      <h2 className="section-title">{title}</h2>
      <div className="channel-list" ref={rowRef}>
        {validVideos.length === 0 ? (
          <div className="empty-row" />
        ) : (
          validVideos.map(({ entry, video }, idx) => {
            // Extract videoId from video.url
            const match = video!.url.match(/[?&]v=([^&]+)/);
            const videoId = match ? match[1] : "";
            return (
              <VideoThumbnailCard
                key={idx}
                video={video!}
                channelName={entry.name}
                onClick={() => onCardSelect({ videoId, title: video!.title })}
                parentFocusKey={rowFocusKey}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default NewsSection;
