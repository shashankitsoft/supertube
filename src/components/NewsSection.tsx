import React from "react";
import VideoThumbnailCard from "./VideoThumbnailCard";
import { VideoEntry } from "../types";

interface NewsSectionProps {
  title: string;
  videos: VideoEntry[];
  isLive: boolean;
  onCardSelect: (video: { videoId: string; title: string }) => void;
  onCardKeyDown: (e: React.KeyboardEvent, video: { videoId: string; title: string }) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, videos, isLive, onCardSelect, onCardKeyDown }) => (
  <div className="news-section">
    <h2 className="section-title">{title}</h2>
    <div className="channel-list">
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
            onKeyDown={(e) => onCardKeyDown(e, { videoId, title: video.title })}
          />
        );
      })}
    </div>
  </div>
);

export default NewsSection;
