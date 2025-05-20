import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { VideoEntry } from "../types";
import VideoModal from "../components/VideoModal";
import VideoCategoryRow from "../components/VideoCategoryRow";
import "../components/VideoModal.css";
import { BASE_PATH, REMOTE_BASE_URL } from "../constants";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

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

  // Top-level focusable container for all categories
  const { ref: listRef, focusKey: listFocusKey } = useFocusable({ trackChildren: true });

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setModalOpen(false);
  };

  const handleCardSelect = (video: { videoId: string; title: string }) => {
    setSelectedVideo(video);
    setModalOpen(true);
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
              Videos
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Videos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div ref={listRef}>
          {categories.length === 0 ? (
            <div className="empty-row" />
          ) : (
            categories.map(([category, entries]) => (
              <VideoCategoryRow
                key={category}
                category={category}
                entries={entries}
                parentFocusKey={listFocusKey}
                onCardSelect={handleCardSelect}
              />
            ))
          )}
        </div>
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
