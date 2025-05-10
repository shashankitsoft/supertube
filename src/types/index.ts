export interface Channel {
  key: string;
  name: string;
  handle: string;
}

export type ChannelData = {
  category: string;
  channels: Channel[];
};

export interface VideoInfo {
  id: string;
  url: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string | null;
}

export interface VideoEntry {
  category: string;
  name: string;
  latestVideo: VideoInfo | null;
  liveVideo: VideoInfo | null;
  handle?: string;
  channelId?: string;
}

export interface YTPlayer {
  destroy: () => void;
}

export interface YTPlayerOptions {
  height: string;
  width: string;
  videoId: string;
  playerVars: { autoplay: number };
}
export interface YTPlayerConstructor {
  new (container: HTMLElement, options: YTPlayerOptions): YTPlayer;
}