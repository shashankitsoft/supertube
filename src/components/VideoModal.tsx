import React from "react";
import { IonModal, IonButton, IonIcon } from "@ionic/react";
import { openInYouTube } from "../utils/youtube";
import { logoYoutube } from "ionicons/icons";
import "./VideoModal.css";

interface VideoModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  selectedVideo: { videoId: string; title: string } | null;
  handleModalKeyDown: (e: React.KeyboardEvent) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onDidDismiss, selectedVideo, handleModalKeyDown }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <div
        className="modal-content"
        tabIndex={0}
        onKeyDown={handleModalKeyDown}
      >
        {/* <h2>{selectedVideo?.title}</h2> */}
        <div className="yt-player-container">
          {selectedVideo && (
            <iframe
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>
        <div className="modal-btn-row">
          <IonButton
            onClick={() => selectedVideo && openInYouTube(selectedVideo.videoId)}
            className="yt-btn"
          >
            <IonIcon icon={logoYoutube}  className="yt-icon" slot="start" />
            Play in YouTube
          </IonButton>
          <IonButton onClick={onDidDismiss} className="close-btn">Close</IonButton>
        </div>
        <div className="yt-controls-hint">Use YouTube controls for play/pause/fullscreen</div>
      </div>
    </IonModal>
  );
};

export default VideoModal;
