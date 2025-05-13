// Utility for creating and destroying a YouTube IFrame Player in a given container
// Handles waiting for the API to be ready, and always cleans up the container

export function createYouTubePlayer(container: HTMLElement, videoId: string, onReady?: () => void) {
  if (!container || !videoId) return null;
  container.innerHTML = "";
  // Wait for YT API to be available
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
