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
import { channelData } from "../data/channelData";

const getYouTubeLogoURL = (channelId: string) =>
  //`https://yt3.ggpht.com/${channelId}`;
  `https://yt3.googleusercontent.com/${channelId}`;

const Home: React.FC = () => {
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
              {category.channels.map((channel, idx) => (
                <div
                  key={idx}
                  className="channel-card"
                  onClick={() => window.open(channel.url, "_blank")}
                >
                  <IonAvatar className="channel-logo-container">
                    <img
                      src={getYouTubeLogoURL(channel.id)}
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
