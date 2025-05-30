import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal
} from "@ionic/react";
import {type Channel, type ChannelData} from '../types';
import { BASE_PATH } from "../constants";
import "./Channels.css";


const getYouTubeLogoURL = (channelId: string) =>
  `https://yt3.googleusercontent.com/${channelId}`;

const Channels: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [channelData, setChannelData] = useState<ChannelData[]>([]);

  useEffect(() => {
    fetch(`${BASE_PATH}channels.json`)
      .then(res => res.json())
      .then(setChannelData);
  }, []);

  const handleChannelClick = (channel: Channel) => {
    setSelectedChannel(channel);
    setModalOpen(true);
  };

  const handleModalAction = (type: 'live' | 'videos') => {
    if (!selectedChannel) return;
    const url = `https://www.youtube.com/${selectedChannel.handle}/${type === 'live' ? 'streams' : 'videos'}`;
    window.open(url, '_blank');
    setModalOpen(false);
  };

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      (document.getElementById('modal-live-btn') as HTMLElement)?.focus();
    } else if (e.key === 'ArrowRight') {
      (document.getElementById('modal-videos-btn') as HTMLElement)?.focus();
    } else if (e.key === 'Escape') {
      setModalOpen(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <img
              src={`${BASE_PATH}assets/icon/supertube-32x32.png`}
              alt="SuperTube Logo"
              className="logo"
            />
            Channels
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Channels</IonTitle>
          </IonToolbar>
        </IonHeader>
        {channelData.map((category, index) => (
          <div key={index} className="category">
            <h2 className="category-title">{category.category}</h2>
            <div className="channel-list">
              {category.channels.map((channel, idx) => (
                <div
                  key={idx}
                  className="channel-square-card focusable"
                  tabIndex={0}
                  onClick={() => handleChannelClick(channel)}
                  onKeyDown={e => { if (e.key === 'Enter') handleChannelClick(channel); }}
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
              ))}
            </div>
          </div>
        ))}
        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)} backdropDismiss={true}>
          <div
            className="channel-modal-content"
            tabIndex={0}
            onKeyDown={handleModalKeyDown}
          >
            <div
              id="modal-live-btn"
              className="modal-action-btn modal-action-btn-live"
              tabIndex={0}
              onClick={() => handleModalAction('live')}
              onKeyDown={e => { if (e.key === 'Enter') handleModalAction('live'); }}
            >
              <span role="img" aria-label="Live" className="modal-action-icon">🔴</span>
              Live
            </div>
            <div
              id="modal-videos-btn"
              className="modal-action-btn modal-action-btn-videos"
              tabIndex={0}
              onClick={() => handleModalAction('videos')}
              onKeyDown={e => { if (e.key === 'Enter') handleModalAction('videos'); }}
            >
              <span role="img" aria-label="Videos" className="modal-action-icon">🎬</span>
              Videos
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Channels;
