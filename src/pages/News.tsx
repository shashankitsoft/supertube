import { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import NewsSection from "../components/NewsSection";
import VideoModal from "../components/VideoModal";
import { VideoEntry } from "../types";
import { BASE_PATH, REMOTE_BASE_URL } from "../constants";

const News: React.FC = () => {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);

  useEffect(() => {
    fetch(`${REMOTE_BASE_URL}youtube-data.json`)
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  // Filter News entries
  const newsEntries = videos.filter((entry) => entry.category === "News");
  const liveNews = newsEntries.filter((entry) => entry.liveVideo);
  const latestNews = newsEntries.filter(
    (entry) => entry.latestVideo && (!entry.liveVideo || entry.latestVideo !== entry.liveVideo)
  );

  // Keyboard navigation: Enter/OK to open, Escape to close
  const handleCardKeyDown = (e: React.KeyboardEvent, video: { videoId: string; title: string }) => {
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
          <IonTitle>
            <img
              src={`${BASE_PATH}assets/icon/supertube-32x32.png`}
              alt="SuperTube Logo"
              className="logo"
            />
            News
          </IonTitle>
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
          handleModalKeyDown={handleModalKeyDown}
        />
      </IonContent>
    </IonPage>
  );
};

export default News;
