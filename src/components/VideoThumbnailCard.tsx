import React from "react";
import { VideoInfo } from "../types";
import "./VideoThumbnailCard.css";

interface VideoThumbnailCardProps {
  video: VideoInfo;
  channelName: string;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const VideoThumbnailCard: React.FC<VideoThumbnailCardProps> = ({ video, channelName, onClick, onKeyDown }) => (
  <div
    className="channel-card-rect focusable"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    <img className="video-thumb" src={video.thumbnail || ''} alt={video.title + ' thumbnail'} />
    <div className="video-info">
      <div className="video-title">{video.title}</div>
      <div className="video-meta">
        <span className="channel-name">{channelName}</span>
        <span className="video-time">{new Date(video.publishedAt).toLocaleString()}</span>
      </div>
      <div className="video-desc">{video.description}</div>
    </div>
  </div>
);

export default VideoThumbnailCard;
