/**
 * 유튜브 영상 등록 URL 가공
 * @since 2025-12-18
 * @author khj
 */

/**
 * 유튜브 URL에서 videoId(11자리) 추출
 * @param {string} url 유튜브 영상 URL
 * @returns {string|null} videoId
 */

export function extractYoutubeVideoId(url) {
  if (!url) return null;

  const clean = url.trim();

  try {
    // 1) youtu.be 단축 URL
    const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];

    // 2) youtube.com/watch?v=
    const watchMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];

    // 3) embed URL
    const embedMatch = clean.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];

    return null;
  } catch {
    return null;
  }
}