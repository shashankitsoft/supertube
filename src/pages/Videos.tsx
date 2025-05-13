import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { VideoEntry } from "../types";
import VideoThumbnailCard from "../components/VideoThumbnailCard";
import VideoModal from "../components/VideoModal";
import "../components/VideoThumbnailCard.css";
import "../components/VideoModal.css";
import { REMOTE_BASE_URL } from "../constants";

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    videoId: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    fetch(`${REMOTE_BASE_URL}youtube-data.json`)
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  // Group latest videos by category, excluding News
  const categories = Array.from(
    videos
      .filter((entry) => entry.latestVideo && entry.category !== "News")
      .reduce((map, entry) => {
        if (!map.has(entry.category)) map.set(entry.category, []);
        map.get(entry.category)!.push(entry);
        return map;
      }, new Map<string, VideoEntry[]>())
  );

  // Keyboard navigation: Enter/OK to open, Escape to close
  const handleCardKeyDown = (
    e: React.KeyboardEvent,
    video: { videoId: string; title: string }
  ) => {
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
          <IonTitle>Videos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Videos</IonTitle>
          </IonToolbar>
        </IonHeader>
        {categories.map(([category, entries]) => (
          <div key={category} className="category">
            <h2 className="category-title">{category}</h2>
            <div className="channel-list">
              {entries.map((entry, idx) => {
                if (!entry.latestVideo) return null;
                // Extract videoId from url
                const match = entry.latestVideo.url.match(/[?&]v=([^&]+)/);
                const videoId = match ? match[1] : "";
                return (
                  <VideoThumbnailCard
                    key={idx}
                    video={entry.latestVideo}
                    channelName={entry.name}
                    onClick={() => {
                      setSelectedVideo({
                        videoId,
                        title: entry.latestVideo!.title,
                      });
                      setModalOpen(true);
                    }}
                    onKeyDown={(e) =>
                      handleCardKeyDown(e, {
                        videoId,
                        title: entry.latestVideo!.title,
                      })
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
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

export default Videos;
