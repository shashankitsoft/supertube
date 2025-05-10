import React, { RefObject } from "react";
import { IonModal, IonButton } from "@ionic/react";

interface VideoModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  selectedVideo: { url: string; title: string } | null;
  playerContainerRef: RefObject<HTMLDivElement>;
  handleModalKeyDown: (e: React.KeyboardEvent) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onDidDismiss, selectedVideo, playerContainerRef, handleModalKeyDown }) => (
  <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
    <div
      className="modal-content"
      tabIndex={0}
      onKeyDown={handleModalKeyDown}
    >
      {/* <h2>{selectedVideo?.title}</h2> */}
      <div ref={playerContainerRef} id="yt-player-container" className="yt-player-container" />
      <IonButton onClick={onDidDismiss} className="close-btn">Close</IonButton>
      <div className="yt-controls-hint">Use YouTube controls for play/pause/fullscreen</div>
    </div>
  </IonModal>
);

export default VideoModal;
