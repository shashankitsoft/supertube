import { useEffect, useState, useRef } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import NewsSection from "../components/NewsSection";
import VideoModal from "../components/VideoModal";
import { VideoEntry, YTPlayer, YTPlayerConstructor } from "../types";
import "../components/VideoThumbnailCard.css";
import "../components/VideoModal.css";
import "../components/NewsSection.css";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: unknown;
  }
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
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

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
        <NewsSection
          title="Live"
          videos={liveNews}
          isLive={true}
          onCardSelect={(video) => {
            setSelectedVideo(video);
            setModalOpen(true);
          }}
          onCardKeyDown={handleCardKeyDown}
        />
        <NewsSection
          title="Latest"
          videos={latestNews}
          isLive={false}
          onCardSelect={(video) => {
            setSelectedVideo(video);
            setModalOpen(true);
          }}
          onCardKeyDown={handleCardKeyDown}
        />
        <VideoModal
          isOpen={modalOpen}
          onDidDismiss={() => setModalOpen(false)}
          selectedVideo={selectedVideo}
          playerContainerRef={playerContainerRef as React.RefObject<HTMLDivElement>}
          handleModalKeyDown={handleModalKeyDown}
        />
      </IonContent>
    </IonPage>
  );
};

export default News;
