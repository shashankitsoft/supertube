import { useHistory } from 'react-router-dom';
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

const Channels: React.FC = () => {
    const history = useHistory();

    const handleChannelClick = (channelId: string) => {
      history.push(`/channel/${channelId}`);
    };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Channels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Channels</IonTitle>
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
                 onClick={() => handleChannelClick(channel.id)}
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

export default Channels;
