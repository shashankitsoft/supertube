import { useEffect, useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
} from "@ionic/react";
import "./News.css";

interface YTPlayer {
  destroy: () => void;
}

interface YTPlayerOptions {
  height: string;
  width: string;
  videoId: string;
  playerVars: { autoplay: number };
}
interface YTPlayerConstructor {
  new (container: HTMLElement, options: YTPlayerOptions): YTPlayer;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: unknown;
  }
}

interface VideoInfo {
  id: string;
  url: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string | null;
}

interface VideoEntry {
  category: string;
  name: string;
  latestVideo: VideoInfo | null;
  liveVideo: VideoInfo | null;
  handle?: string;
  channelId?: string;
}

const loadYouTubeAPI = (() => {
  let loaded = false;
  return (cb: () => void) => {
    if (loaded) return cb();
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = () => {
      loaded = true;
      cb();
    };
    document.body.appendChild(tag);
  };
})();

const News: React.FC = () => {

  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/youtube-data.json")
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  // Filter News entries
  const newsEntries = videos.filter((entry) => entry.category === "News");
  const liveNews = newsEntries.filter((entry) => entry.liveVideo);
  const latestNews = newsEntries.filter(
    (entry) => entry.latestVideo && (!entry.liveVideo || entry.latestVideo !== entry.liveVideo)
  );

  // Handle modal open/close and YouTube Player API
  useEffect(() => {
    if (!modalOpen || !selectedVideo) return;
    loadYouTubeAPI(() => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      // Extract videoId from URL
      const match = selectedVideo.url.match(/[?&]v=([^&]+)/);
      const videoId = match ? match[1] : null;
      if (videoId && playerContainerRef.current && window.YT) {
        const YT = window.YT as { Player: YTPlayerConstructor };
        playerRef.current = new YT.Player(playerContainerRef.current, {
          height: "360",
          width: "640",
          videoId,
          playerVars: { autoplay: 1 },
        });
      }
    });
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [modalOpen, selectedVideo]);

  // Keyboard navigation: Enter/OK to open, Escape to close
  const handleCardKeyDown = (e: React.KeyboardEvent, video: { url: string; title: string }) => {
    if (e.key === "Enter" || e.key === " ") {
      setSelectedVideo(video);
      setModalOpen(true);
    }
  };
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setModalOpen(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">News</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="news-section">
          <h2 className="section-title">Live</h2>
          <div className="channel-list">
            {liveNews.map((entry, idx) => (
              entry.liveVideo && (
                <div
                  key={idx}
                  className="channel-card-rect focusable"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedVideo({ url: entry.liveVideo!.url, title: entry.liveVideo!.title });
                    setModalOpen(true);
                  }}
                  onKeyDown={(e) => handleCardKeyDown(e, { url: entry.liveVideo!.url, title: entry.liveVideo!.title })}
                >
                  <img className="video-thumb" src={entry.liveVideo.thumbnail || ''} alt={entry.liveVideo.title + ' thumbnail'} />
                  <div className="video-info">
                    <div className="video-title">{entry.liveVideo.title}</div>
                    <div className="video-meta">
                      <span className="channel-name">{entry.name}</span>
                      <span className="video-time">{new Date(entry.liveVideo.publishedAt).toLocaleString()}</span>
                    </div>
                    <div className="video-desc">{entry.liveVideo.description}</div>
                  </div>
                  <div className="video-embed placeholder">Press OK/Enter to play</div>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="news-section">
          <h2 className="section-title">Latest</h2>
          <div className="channel-list">
            {latestNews.map((entry, idx) => (
              entry.latestVideo && (
                <div
                  key={idx}
                  className="channel-card-rect focusable"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedVideo({ url: entry.latestVideo!.url, title: entry.latestVideo!.title });
                    setModalOpen(true);
                  }}
                  onKeyDown={(e) => handleCardKeyDown(e, { url: entry.latestVideo!.url, title: entry.latestVideo!.title })}
                >
                  <img className="video-thumb" src={entry.latestVideo.thumbnail || ''} alt={entry.latestVideo.title + ' thumbnail'} />
                  <div className="video-info">
                    <div className="video-title">{entry.latestVideo.title}</div>
                    <div className="video-meta">
                      <span className="channel-name">{entry.name}</span>
                      <span className="video-time">{new Date(entry.latestVideo.publishedAt).toLocaleString()}</span>
                    </div>
                    <div className="video-desc">{entry.latestVideo.description}</div>
                  </div>
                  <div className="video-embed placeholder">Press OK/Enter to play</div>
                </div>
              )
            ))}
          </div>
        </div>
        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <div
            className="modal-content"
            tabIndex={0}
            onKeyDown={handleModalKeyDown}
          >
            <h2>{selectedVideo?.title}</h2>
            <div ref={playerContainerRef} id="yt-player-container" className="yt-player-container" />
            <IonButton onClick={() => setModalOpen(false)} className="close-btn">Close</IonButton>
            <div className="yt-controls-hint">Use YouTube controls for play/pause/fullscreen</div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default News;
