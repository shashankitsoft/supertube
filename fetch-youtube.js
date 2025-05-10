import axios from 'axios';
import fs from 'fs';

const apiKey = process.env.YOUTUBE_API_KEY;

// Read channel list from public/channels.json
const channels = JSON.parse(fs.readFileSync('public/channels.json', 'utf-8'));

async function fetchLatestVideo(channelHandle, category) {
  // Use forHandle endpoint to get channelId
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&forHandle=${channelHandle}&part=id`;
  const channelRes = await axios.get(channelUrl);

  const channelId = channelRes.data.items[0]?.id;
  if (!channelId) return { latest: null, live: null, channelId: null };

  const latestUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1&type=video`;
  const latestRes = await axios.get(latestUrl);
  const latest = latestRes.data.items[0];
  const latestVideo = latest ? `https://www.youtube.com/watch?v=${latest.id.videoId}` : null;

  let liveVideo = null;
  if (category.toLowerCase() === 'news') {  // fetch live video only for news category
    const liveUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&eventType=live&type=video&order=date&maxResults=1`;
    const liveRes = await axios.get(liveUrl);
    const live = liveRes.data.items[0];
    liveVideo = live ? `https://www.youtube.com/watch?v=${live.id.videoId}` : null;
  }

  return { latest: latestVideo, live: liveVideo, channelId };
}

(async () => {
  const results = [];
  for (const category of channels) {
    for (const ch of category.channels) {
      try {
        const { latest, live, channelId } = await fetchLatestVideo(ch.handle, category.category);
        results.push({
          category: category.category,
          name: ch.name,
          handle: ch.handle,
          channelId,
          latestVideo: latest,
          liveVideo: live,
        });
      } catch (e) {
        results.push({ category: category.category, name: ch.name, handle: ch.handle, error: e.message });
      }
    }
  }
  fs.writeFileSync('public/youtube-data.json', JSON.stringify(results, null, 2));
})();
