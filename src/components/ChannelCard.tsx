import React from "react";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { Channel } from '../types';
import './ChannelCard.css';

const getYouTubeLogoURL = (channelId: string) =>
  `https://yt3.googleusercontent.com/${channelId}`;

interface ChannelCardProps {
  channel: Channel;
  onClick: (channel: Channel) => void;
  parentFocusKey?: string;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onClick, parentFocusKey }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref, focused } = useFocusable({ parentFocusKey } as any);
  // Handle Enter/OK key for TV remote
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === 'OK' || e.keyCode === 13) {
      onClick(channel);
    }
  };
  return (
    <div
      ref={ref}
      className={`channel-square-card focusable${focused ? ' focused' : ''}`}
      tabIndex={-1}
      onClick={() => onClick(channel)}
      onKeyDown={handleKeyDown}
    >
      <div className="channel-logo-name">
        <img
          src={getYouTubeLogoURL(channel.key)}
          alt={`${channel.name} logo`}
          className="channel-logo"
        />
        <div className="channel-title">{channel.name}</div>
      </div>
    </div>
  );
};

export default ChannelCard;
