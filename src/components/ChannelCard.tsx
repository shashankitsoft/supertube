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
  // @ts-expect-error: parentFocusKey is supported at runtime but not in types
  const { ref, focused } = useFocusable({ parentFocusKey });
  return (
    <div
      ref={ref}
      className={`channel-square-card focusable${focused ? ' focused' : ''}`}
      tabIndex={0}
      onClick={() => onClick(channel)}
      // onKeyDown handled by spatial navigation
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
