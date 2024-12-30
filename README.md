# Supertube
Organize your youtube channel subscriptions

### Commands

**Install Ionic cli**
`npm i -g @ionic/cli`

**Install packages:**
`pnpm i`

**Start a local dev server for app dev/testing:** http://localhost:8100/
`ionic serve`

**Run on local:** http://localhost:5173/
`pnpm dev`

**Create build**
`ionic build`

**Run build preview on local:** http://localhost:4173/
`pnpm preview`

**Run on https using ngrok (link localhost to ngrok url):**
- Go to ngrok.com, login and download ngrok
- Put into the C:\ngrock\ngrok.exe and set the system environment path accordingly, so that ngrok command available in terminal.
`ngrok config add-authtoken your-token` // token from ngrok dashboard
`ngrok http 4173`  or `ngrok http http://localhost:5173`
- It will give a https url in terminal which can be used to run the dev app with https (which is must to make PWA installable) 


