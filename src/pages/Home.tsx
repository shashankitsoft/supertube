import { useEffect, useState } from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";


const getYouTubeLogoURL = (channelId: string) =>
  `https://yt3.googleusercontent.com/${channelId}`;

import {type Channel, type ChannelData } from "../types";

const Home: React.FC = () => {
  const [channelData, setChannelData] = useState<ChannelData[]>([]);

  useEffect(() => {
    fetch("/channels.json")
      .then((res) => res.json())
      .then(setChannelData);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {channelData.map((category, index) => (
          <div key={index} className="category">
            <h2 className="category-title">{category.category}</h2>
            <div className="channel-list">
              {category.channels.map((channel: Channel, idx: number) => (
                <div
                  key={idx}
                  className="channel-card"
                  onClick={() => window.open(channel.handle, "_blank")}
                >
                  <IonAvatar className="channel-logo-container">
                    <img
                      src={getYouTubeLogoURL(channel.key)}
                      alt={`${channel.name} logo`}
                      className="channel-logo"
                    />
                  </IonAvatar>

                  <p className="channel-name">{channel.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
