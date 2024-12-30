import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
//import axios from 'axios';
import "./ChannelDetail.css";
import { channelData } from "../data/channelData";

const API_KEY = "YOUR_YOUTUBE_API_KEY";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const ChannelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id", id);
  const videos = [
    { id: "aaa", title: "aaa", thumbnail: "aaa" },
    { id: "aaa", title: "aaa", thumbnail: "aaa" },
  ];

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
        <div className="channel-detail">
          <h1>{"aaa"}</h1>
          <div className="video-list">
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={video.thumbnail} alt={video.title} />
                  <p>{video.title}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChannelDetail;
