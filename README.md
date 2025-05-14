# Supertube
Organize your youtube favorite channel subscriptions.
This project aims to auto fetch latest live and videos from the configured youtube favorite channels on scheduled basis, so that you can find and watch live news, technology or other category channels easily without clutter of unwanted videos in your youtube app feed.

The netflix style channel list and playable video which you can play within Supertube app itself or open in youtube app directly.

Youtube app has no way to view list of play videos of a particular channel category wise, and when you subscribed too many channels, its a clutter and you do not find what's latest in news, technology or any category.

Moreover, the Google/android TV Youtube app is very complicated to browse channel wise (much worst compared to android mobile app), as it has no propor way to going to a channel's page and see video list etc.  

Supertube solves such youtube's limitations. It is complete GoogleTV compatible and make it super easy.
It has three screens:
- Channels page: Netflix scrolling style channels category wise like news, technology, etc.
- News page: Autofetches the live news and latest video from the configured source channels, which are playable directly within app, or open in youtube app.
- Videos page: Autofetches lates video in different categories. Playable within app or open in youtube app. 

### The idea:
In today's times, TV media has havily been compromized, people leaving TV, and there are very few news channels run by independent reporters on youtube aiming to give fact checks and real news only wihout noise. While seeking such content when you watch one such channel in youtube, the youtube's recommendation engine suggest random news videos form other channels as well which even you have not subscribed. Also going one by one to each channel checking their latest video or live is very difficult and hectic within youtube app. 
Moreover the Google TV Youtube app is worst compared to android mobile youtube app, becase the google/android TV version is more complicated to go to a channel or browse. 
So, today's users need some app which autofilters news or other content category wise and only the latest ones, which they can browse easily, find and watch easily the respective contents, either on their mobile device or Google/android TV. 

### How this Works
- The source channels list with their youtube channel handle is put in a public/channels.json file. 
- Using github workflow and script it pulls the channels information and their live and latest videos every few hours and generates youtube-data.json file with respective infiormation, which being cionstantly updated. This uses YouTube Data API v3 with a youtube api key. 

- Supertube is published on github pages, so its accessible via browser at: https://shashankitsoft.github.io/supertube/ . 
- Also it is available as PWA (Progressive Web app) so it can directly be installed from browser in your device (Windows desktop, Android Mobile or Google TV). You will get the app launcher icon. 
- It is also available as android app.apk which can be installed in both Android mobile device as well Google/Android TV for native experience.

### Tech Stack, Libs & Tools
- Node: 22.12.0, Npm: 10.9.0, Pnpm: 10.10.0
- Ionic Framework: 8, with capacitor
- React: 19.1
- Typescript: 5.8.3
- Axios
- YouTube Data API v3 (to fetch channel info and live/latest videos)
- Github Workflow and Actions
- Github pages (for published web version)
- VScode
- Java SDK: 24 (required for Andrpoid studio, android build)
- Android Studio: Meerkat 2024.3.2

### Setup and Commands

**Install Ionic cli**
`npm i -g @ionic/cli`

**Install packages:**
`pnpm i`

**.env**
- Go to https://console.cloud.google.com/apis/dashboard Create a Project and Enable APIs & Services -> YouTube Data API v3. Generate credentials to use as youtube secret key.
- For local create .env file from .env.example and put your YOUTUBE_API_KEY as copied from gogole console.
- Put VITE_BASE_PATH = '/' and VITE_REMOTE_BASE_URL=<github-page-url>
- Create another .env.production similarly. This env will be red by vite.config.ts during build phase (production mode on local). 
- So for this .env.production, VITE_BASE_PATH='/supertube/' when generating build for PWA/web (as githubpages hosted on the subfolder). But when you generate android app.apk you will need to generate build with VITE_BASE_PATH = '/' as android app need to read files from root.

**Github environment variables**
- For Github workflow CI/CD build and deploy we will need these variables in github repository settings.
- So add the YOUTUBE_API_KEY as secret variable in repository secret variable with its value.
- Add VITE_BASE_PATH and VITE_REMOTE_BASE_URL as repository environment variable with corresponding values.

The app browser title, name, package name, etc. can be updated in package.json, root index.html, ionic.config.json and capacitor.config.ts.


**Run on local, development mode:** http://localhost:5173/

`pnpm dev`

**Can start a local dev server for app dev/testing:** http://localhost:8100/

`ionic serve`

**Create build**
Keep .env and .env.production ready as explained above before running build.

`pnpm build`

This will generate the dist folder with all assets and compiled files for PWA/web.

Not needed but kept for reference.
`ionic build`
`ionic build --watch`

**Run build preview on local:** http://localhost:4173/
`pnpm preview`

**Deploy on github pages**
- To deploy on github page https://shashankitsoft.github.io/supertube/ from local.

`pnpm run deploy`

It will create or use gh-pages branch in github repo, push the dist files there and publish on the linked github page.

**Github workflow**
.github/workflow has two workflow files:
- deploy-gh-pages.yml: Runs when feature/code changes pushed to main branch, uses pnpm to build using environment variables, and push build files to gh-pages branch, updating with latest compiled files, which furthr published on github pages link, visible chnages in browser with new updates.
- fetch-youtube.yml: Runs manually as well as scheduled every 2 hours, uses fetch-youtube.js node script and youtube api key (from github secret) to fetch latest and live videos from the preset list of youtube channel handles mentioned in public/channels.json category wise, to generate/update public/youtube-data.json, without running the full app build. This updated youtube-data.json is publically available to fetch as remote url using axios, so there's no need to reinstall PWA or android app to get your content updated. Keeps you browser, PWA or android app content always fresh.   

**Run on https using ngrok (link localhost to ngrok url):**
- Go to ngrok.com, login and download ngrok
- Put into the C:\ngrock\ngrok.exe and set the system environment path accordingly, so that ngrok command available in terminal.
`ngrok config add-authtoken your-token` // token from ngrok dashboard
`ngrok http 4173`  or `ngrok http http://localhost:5173`
- It will give a https url in terminal which can be used to run the dev app with https (which is must to make PWA installable) 


### Check for PWA Eligibility in Chrome:
1. a) Open DevTools (F12 > Application Tab > Service Workers).
Check if the service worker is active and controlling the app.
b) Open DevTools (F12 > Application Tab > Manifest).
Look for a section saying "Installability".
If the app isn’t installable, it will show why (e.g., "No service worker detected").
Use Lighthouse to Audit Your PWA:

2. Open DevTools (F12 > Lighthouse Tab).
Run a PWA audit to get detailed feedback on missing or incorrect configurations.


### Ref: 
https://ionicframework.com/docs/react/pwa

### Generate android app.apk

- Add android related files and configurations
`pnpm exec cap add android      # npx cap add android`

- For any code/feature change in ionic react app, you will need to create build and sync to android.
```
pnpm build      # use VITE_BASE_PATH = '/' in .env.production on local system (for android build)

pnpm exec cap sync android  # Sync the assets to Android
or,
ionic capacitor build android

```

- To generate icons and splash screens, place your custom icon and splash in the resources/ folder:
```
resources/icon.png (1024x1024, PNG, no transparency)
resources/splash.png (2732x2732, PNG, logo centered, background as needed)
```
Run 
```
npx @capacitor/assets generate
or,
npx @capacitor/assets generate --android    # for android build only

pnpm exec cap sync android  # Sync the assets to Android
or,
ionic capacitor build android
```

Note: The files in dist/assets are for the PWA/web version only.
The Android app uses icons and splash screens from android/app/src/main/res/ (mipmap-, drawable-). 

- Then open root android folder in Android Studio. Let the gradle sync to complete.
- In the Android studio toolbar in top, you should be able to see Run/Play button. Click on that to run the app in android emulator. 
- You may need to add an emulator virtual device say Pixel 3A if not already.
- The emulator will open in Android Studio and you should be able to see the 'Supertube' App Icon to run it. 
- To check the logs, you can enable Toolbar -> View -> Tool Windows -> Logcat

- To generate the apk, go to Toolbar -> Build -> Generate App Bundles or APKs -> Generate APKs. The generated apk will be available in android\app\build\outputs\apk\debug folder with app-debug.apk .
- You can transfer this file to any real android mobile device or Google TV and install it. Run the Supertube app natively! 


Note: 
- The file android/app/src/main/res/values/strings.xml is used to display the name, package_name etc for android app,  generated by Capacitor when you first add the Android platform (npx cap add android). After that, it is not automatically overwritten by ionic capacitor build android or npx cap sync android, it is treated as a native file.
- Changing the app name in ionic.config.json or capacitor.config.ts only affects the initial generation of the native project.
After the Android project is created, you must manually update the app name in android/app/src/main/res/values/strings.xml:
- You may remove the android/ folder, update appId, name etc in capacitor.config.ts, and re-run 'pnpm exec cap add android' (but you will lose any manual changes in the native project).


Happy Mobile App Development!

Thanks
Shashank :)
