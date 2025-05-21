import React, { useRef } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { logoYoutube, newspaper, videocam } from 'ionicons/icons';
import News from './pages/News';
import Channels from './pages/Channels';
import Videos from './pages/Videos';
import { BASE_PATH } from './constants';
import { loadYouTubeAPI } from './utils/youtube';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './global.css';


// Load YouTube IFrame API globally
loadYouTubeAPI(() => {});

setupIonicReact();

const App: React.FC = () => {
  // Use Norigin spatial navigation for each tab button
  const { ref: channelsRef, focused: channelsFocused } = useFocusable({});
  const { ref: newsRef, focused: newsFocused } = useFocusable({});
  const { ref: videosRef, focused: videosFocused } = useFocusable({});

  return (
    <IonApp>
      <IonReactRouter basename={BASE_PATH}>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/channels">
              <Channels />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
            <Route exact path="/videos">
              <Videos />
            </Route>
            <Route exact path="/">
              <Redirect to="/channels" />
            </Route>
          </IonRouterOutlet>
          {/*
          Note for maintainers:
          The tab hrefs below are root-relative (e.g. "/channels").
          React Router's basename (set above) will prepend the correct subpath (e.g. "/supertube/") at navigation time (bcoz of vite-config for github page).
          This means the browser status bar on hover will show the root-relative path (e.g. "/channels"),
          but the actual navigation will go to the correct subpath (e.g. "/supertube/channels").
          This is a known limitation of React Router's basename handling and is standard for subpath deployments.
        */}
          <IonTabBar slot="bottom">
            <IonTabButton ref={channelsRef} tab="channels" href="/channels" className={channelsFocused ? 'focused' : ''}>
              <IonIcon aria-hidden="true" icon={logoYoutube} />
              <IonLabel>Channels</IonLabel>
            </IonTabButton>
            <IonTabButton ref={newsRef} tab="news" href="/news" className={newsFocused ? 'focused' : ''}>
              <IonIcon aria-hidden="true" icon={newspaper} />
              <IonLabel>News</IonLabel>
            </IonTabButton>
            <IonTabButton ref={videosRef} tab="videos" href="/videos" className={videosFocused ? 'focused' : ''}>
              <IonIcon aria-hidden="true" icon={videocam} />
              <IonLabel>Videos</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
