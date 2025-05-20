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
  // Row focusable (horizontal navigation)
  // @ts-expect-error: parentFocusKey is supported at runtime but not in types
  const { ref: rowRef, focusKey: rowFocusKey } = useFocusable({ parentFocusKey, trackChildren: true });
  if (!category.channels || category.channels.length === 0) return null;
  return (
    <div className="category">
      <h2 className="category-title">{category.category}</h2>
      <div className="channel-list" ref={rowRef}>
        {category.channels.map((channel, idx) => (
          <ChannelCard
            key={idx}
            channel={channel}
            onClick={onChannelSelect}
            parentFocusKey={rowFocusKey}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelsCategorySection;
