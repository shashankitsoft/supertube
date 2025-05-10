import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { logoYoutube, newspaper, videocam } from 'ionicons/icons';
import News from './pages/News';
import Channels from './pages/Channels';
import Videos from './pages/Videos';
import { BASE_PATH } from './constants';

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


setupIonicReact();

const App: React.FC = () => (
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
        <IonTabBar slot="bottom">
          <IonTabButton tab="channels" href={`${BASE_PATH}channels`}>
            <IonIcon aria-hidden="true" icon={logoYoutube} />
            <IonLabel>Channels</IonLabel>
          </IonTabButton>
          <IonTabButton tab="news" href={`${BASE_PATH}news`}>
            <IonIcon aria-hidden="true" icon={newspaper} />
            <IonLabel>News</IonLabel>
          </IonTabButton>
          <IonTabButton tab="videos" href={`${BASE_PATH}videos`}>
            <IonIcon aria-hidden="true" icon={videocam} />
            <IonLabel>Videos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
