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
import "../components/VideoThumbnailCard.css";
import { BASE_PATH } from "../constants";

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoEntry[]>([]);

  useEffect(() => {
    fetch(`${BASE_PATH}youtube-data.json`)
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
              {entries.map((entry, idx) =>
                entry.latestVideo ? (
                  <VideoThumbnailCard
                    key={idx}
                    video={entry.latestVideo}
                    channelName={entry.name}
                    onClick={() => window.open(entry.latestVideo!.url, "_blank")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        window.open(entry.latestVideo!.url, "_blank");
                    }}
                  />
                ) : null
              )}
            </div>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Videos;
