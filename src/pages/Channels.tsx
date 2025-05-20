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
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import ChannelsCategorySection from '../components/ChannelsCategorySection';

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

  const { ref: pageRef, focusKey: pageFocusKey } = useFocusable({ trackChildren: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: modalRef, focusKey: modalFocusKey } = useFocusable({ parentFocusKey: pageFocusKey, isFocusBoundary: true } as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: liveBtnRef, focused: liveBtnFocused } = useFocusable({ parentFocusKey: modalFocusKey } as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: videosBtnRef, focused: videosBtnFocused } = useFocusable({ parentFocusKey: modalFocusKey } as any);

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
        <div ref={pageRef}>
          {channelData.length > 0 && channelData.map((category, index) => (
            <ChannelsCategorySection
              key={index}
              category={category}
              parentFocusKey={pageFocusKey}
              onChannelSelect={handleChannelClick}
            />
          ))}
        </div>
        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)} backdropDismiss={true}>
          <div
            className="channel-modal-content"
            ref={modalRef}
            tabIndex={-1}
            // onKeyDown={handleModalKeyDown} // spatial navigation now handles key events; keep for future reference
          >
            <div
              id="modal-live-btn"
              className={`modal-action-btn modal-action-btn-live${liveBtnFocused ? ' focused' : ''}`}
              ref={liveBtnRef}
              tabIndex={-1}
              onClick={() => handleModalAction('live')}
              // onKeyDown={e => { if (e.key === 'Enter') handleModalAction('live'); }} // keep for future reference
            >
              <span role="img" aria-label="Live" className="modal-action-icon">🔴</span>
              Live
            </div>
            <div
              id="modal-videos-btn"
              className={`modal-action-btn modal-action-btn-videos${videosBtnFocused ? ' focused' : ''}`}
              ref={videosBtnRef}
              tabIndex={-1}
              onClick={() => handleModalAction('videos')}
              // onKeyDown={e => { if (e.key === 'Enter') handleModalAction('videos'); }} // keep for future reference
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
