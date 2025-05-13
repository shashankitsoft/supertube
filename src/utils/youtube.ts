// Common YouTube utility functions for reuse across components

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
export function openInYouTube(videoId: string) {
  if (!videoId) return;
  const isAndroid = /android/i.test(navigator.userAgent);
  const isCapacitor = (window as any).Capacitor !== undefined;
  if (isAndroid && isCapacitor) {
    const intentUrl = `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
    window.location.href = intentUrl;
  } else {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  }
}
