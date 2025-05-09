export interface Channel {
  key: string;
  name: string;
  handle: string;
}

export type ChannelData = {
  category: string;
  channels: Channel[];
};