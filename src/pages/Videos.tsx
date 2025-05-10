import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./News.css";

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

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoEntry[]>([]);

  useEffect(() => {
    fetch("/youtube-data.json")
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
                  <div
                    key={idx}
                    className="channel-card-rect focusable"
                    tabIndex={0}
                  >
                    <img
                      className="video-thumb"
                      src={
                        entry.latestVideo.thumbnail ||
                        "https://via.placeholder.com/150"
                      }
                      alt={entry.latestVideo.title + " thumbnail"}
                    />
                    <div className="video-info">
                      <div className="video-title">{entry.latestVideo.title}</div>
                      <div className="video-meta">
                        <span className="channel-name">{entry.name}</span>
                        <span className="video-time">
                          {new Date(entry.latestVideo.publishedAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="video-desc">
                        {entry.latestVideo.description}
                      </div>
                    </div>
                    <div className="video-embed placeholder">
                      Open on YouTube
                    </div>
                  </div>
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
