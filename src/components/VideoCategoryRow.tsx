import React from "react";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import VideoThumbnailCard from "./VideoThumbnailCard";
import { VideoEntry } from "../types";

interface VideoCategoryRowProps {
  category: string;
  entries: VideoEntry[];
  parentFocusKey?: string;
  onCardSelect: (video: { videoId: string; title: string }) => void;
}

const VideoCategoryRow: React.FC<VideoCategoryRowProps> = ({ category, entries, parentFocusKey, onCardSelect }) => {
  // Row focusable (vertical navigation)
  // @ts-expect-error: parentFocusKey is supported at runtime but not in types
  const { ref: rowRef, focusKey: rowFocusKey } = useFocusable({ parentFocusKey, trackChildren: true });
  return (
    <div className="category" ref={rowRef}>
      <h2 className="category-title">{category}</h2>
      <div className="channel-list">
        {entries.map((entry, idx) => {
          if (!entry.latestVideo) return null;
          const match = entry.latestVideo.url.match(/[?&]v=([^&]+)/);
          const videoId = match ? match[1] : "";
          return (
            <VideoThumbnailCard
              key={idx}
              video={entry.latestVideo}
              channelName={entry.name}
              onClick={() => onCardSelect({ videoId, title: entry.latestVideo!.title })}
              parentFocusKey={rowFocusKey}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VideoCategoryRow;
