import React from "react";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import ChannelCard from './ChannelCard';
import { Channel, ChannelData } from '../types';
import './ChannelCard.css';

interface ChannelsCategorySectionProps {
  category: ChannelData;
  parentFocusKey?: string;
  onChannelSelect: (channel: Channel) => void;
}

const ChannelsCategorySection: React.FC<ChannelsCategorySectionProps> = ({ category, parentFocusKey, onChannelSelect }) => {
  // Only make the row focusable, not the section
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: rowRef, focusKey: rowFocusKey } = useFocusable({ parentFocusKey, trackChildren: true } as any);
  return (
    <div className="category">
      <h2 className="category-title">{category.category}</h2>
      <div className="channel-list" ref={rowRef}>
        {(!category.channels || category.channels.length === 0) ? (
          <div className="empty-row" />
        ) : (
          category.channels.map((channel, idx) => (
            <ChannelCard
              key={idx}
              channel={channel}
              onClick={onChannelSelect}
              parentFocusKey={rowFocusKey}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChannelsCategorySection;
