import React from "react";
import VideoThumbnailCard from "./VideoThumbnailCard";
import { VideoEntry } from "../types";

interface NewsSectionProps {
  title: string;
  videos: VideoEntry[];
  isLive: boolean;
  onCardSelect: (video: { url: string; title: string }) => void;
  onCardKeyDown: (e: React.KeyboardEvent, video: { url: string; title: string }) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, videos, isLive, onCardSelect, onCardKeyDown }) => (
  <div className="news-section">
    <h2 className="section-title">{title}</h2>
    <div className="channel-list">
      {videos.map((entry, idx) => {
        const video = isLive ? entry.liveVideo : entry.latestVideo;
        if (!video) return null;
        return (
          <VideoThumbnailCard
            key={idx}
            video={video}
            channelName={entry.name}
            onClick={() => onCardSelect({ url: video.url, title: video.title })}
            onKeyDown={(e) => onCardKeyDown(e, { url: video.url, title: video.title })}
          />
        );
      })}
    </div>
  </div>
);

export default NewsSection;
