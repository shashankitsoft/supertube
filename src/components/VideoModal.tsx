import React, { useEffect } from "react";
import { IonModal, IonButton, IonIcon } from "@ionic/react";
import { openInYouTube } from "../utils/youtube";
import { logoYoutube } from "ionicons/icons";
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import "./VideoModal.css";

interface VideoModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  selectedVideo: { videoId: string; title: string } | null;
  handleModalKeyDown: (e: React.KeyboardEvent) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onDidDismiss, selectedVideo, handleModalKeyDown }) => {
  // Modal focusable hierarchy for TV/remote navigation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: modalRef, focusKey: modalFocusKey } = useFocusable({ isFocusBoundary: true } as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: ytBtnRef, focused: ytBtnFocused } = useFocusable({ parentFocusKey: modalFocusKey } as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref: closeBtnRef, focused: closeBtnFocused } = useFocusable({ parentFocusKey: modalFocusKey } as any);

  useEffect(() => {
    if (isOpen) {
      setFocus(modalFocusKey);
    }
  }, [isOpen, modalFocusKey]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <div
        className="modal-content"
        ref={modalRef}
        tabIndex={-1}
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
            ref={ytBtnRef}
            className={`yt-btn${ytBtnFocused ? ' focused' : ''}`}
            onClick={() => selectedVideo && openInYouTube(selectedVideo.videoId)}
            tabIndex={-1}
          >
            <IonIcon icon={logoYoutube}  className="yt-icon" slot="start" />
            Play in YouTube
          </IonButton>
          <IonButton
            ref={closeBtnRef}
            className={`close-btn${closeBtnFocused ? ' focused' : ''}`}
            onClick={onDidDismiss}
            tabIndex={-1}
          >
            Close
          </IonButton>
        </div>
        <div className="yt-controls-hint">Use YouTube controls for play/pause/fullscreen</div>
      </div>
    </IonModal>
  );
};

export default VideoModal;
