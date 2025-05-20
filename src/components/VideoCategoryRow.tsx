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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: rowRef, focusKey: rowFocusKey } = useFocusable({ parentFocusKey, trackChildren: true } as any);
  const validEntries = entries.filter(entry => entry.latestVideo);
  return (
    <div className="category" ref={rowRef}>
      <h2 className="category-title">{category}</h2>
      <div className="channel-list">
        {validEntries.length === 0 ? (
          <div className="empty-row" />
        ) : (
          validEntries.map((entry, idx) => {
            const match = entry.latestVideo!.url.match(/[?&]v=([^&]+)/);
            const videoId = match ? match[1] : "";
            return (
              <VideoThumbnailCard
                key={idx}
                video={entry.latestVideo!}
                channelName={entry.name}
                onClick={() => onCardSelect({ videoId, title: entry.latestVideo!.title })}
                parentFocusKey={rowFocusKey}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default VideoCategoryRow;
