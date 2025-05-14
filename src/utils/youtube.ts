// Common YouTube utility functions for reuse across components
import { Browser } from "@capacitor/browser";
import { isPlatform } from "@ionic/react";

/**
 * Loads the YouTube IFrame API script and calls the callback when ready.
 * Ensures the script is loaded only once.
 */
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: unknown;
  }
}

export const loadYouTubeAPI = (() => {
  let loaded = false;
  return (cb: () => void) => {
    if (loaded) return cb();
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = () => {
      loaded = true;
      cb();
    };
    document.body.appendChild(tag);
  };
})();

/**
 * Extracts the YouTube video ID from a YouTube URL.
 * Returns an empty string if not found.
 */
export function extractYouTubeVideoId(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : "";
}

/**
 * Opens a YouTube video in the YouTube app (on Android/Capacitor) or in a new tab (web/PWA).
 */
export async function openInYouTube(videoId: string) {
  if (!videoId) return;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  if (isPlatform("android")) {
    // Try to open in YouTube app via deep link
    try {
      window.open(`vnd.youtube:${videoId}`, "_system");
    } catch (e) {
      // Fallback: open in browser via Capacitor Browser plugin
      await Browser.open({ url });
    }
  } else if ((window as any).Capacitor) {
    // iOS or other Capacitor platforms: open in system browser
    await Browser.open({ url });
  } else {
    // Web/PWA: open in new tab
    window.open(url, "_blank");
  }
}

/**
 * (Legacy) Create and destroy YouTube IFrame Player in a container. Not used with iframe modal, but kept for reference.
 */
export function createYouTubePlayer(
  container: HTMLElement,
  videoId: string,
  onReady?: () => void
) {
  if (!container || !videoId) return null;
  container.innerHTML = "";
  function tryCreate() {
    // @ts-ignore
    if (window.YT && window.YT.Player) {
      // @ts-ignore
      const player = new window.YT.Player(container, {
        height: "360",
        width: "640",
        videoId,
        playerVars: { autoplay: 1 },
        events: onReady ? { onReady } : undefined,
      });
      return player;
    } else {
      setTimeout(tryCreate, 100);
    }
  }
  return tryCreate();
}
export function destroyYouTubePlayer(player: any, container?: HTMLElement) {
  if (player && typeof player.destroy === "function") player.destroy();
  if (container) container.innerHTML = "";
}
