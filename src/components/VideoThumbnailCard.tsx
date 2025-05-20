import React from "react";
import { VideoInfo } from "../types";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import "./VideoThumbnailCard.css";

interface VideoThumbnailCardProps {
  video: VideoInfo;
  channelName: string;
  onClick: () => void;
  parentFocusKey?: string; // Add parentFocusKey prop
}

const VideoThumbnailCard: React.FC<VideoThumbnailCardProps> = ({ video, channelName, onClick, parentFocusKey }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref, focused } = useFocusable({ parentFocusKey } as any);
  return (
    <div
      ref={ref}
      className={`channel-card-rect focusable${focused ? ' focused' : ''}`}
      tabIndex={0}
      onClick={onClick}
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
};

export default VideoThumbnailCard;
