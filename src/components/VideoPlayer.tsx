/**
 * Universal Video Player Component
 * Supports YouTube, Bunny Stream, and direct video URLs.
 */

import React from 'react';

interface BunnyVideo {
  libraryId: string;
  videoId: string;
}

interface VideoPlayerProps {
  youtubeId?: string;
  bunnyVideo?: BunnyVideo;
  videoUrl?: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  youtubeId,
  bunnyVideo,
  videoUrl,
  title = "Video",
}) => {
  // Priority: Bunny Stream > YouTube > Direct URL
  
  // Bunny Stream
  if (bunnyVideo) {
    const bunnyUrl = `https://iframe.mediadelivery.net/embed/${bunnyVideo.libraryId}/${bunnyVideo.videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
    
    return (
      <div className="relative w-full aspect-video bg-secondary overflow-hidden shadow-2xl">
        <iframe
          src={bunnyUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  // YouTube
  if (youtubeId) {
    return (
      <div className="relative w-full aspect-video bg-secondary overflow-hidden shadow-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  // Direct Video URL (MP4, etc.)
  if (videoUrl) {
    return (
      <div className="relative w-full aspect-video bg-secondary overflow-hidden shadow-2xl">
        <video
          controls
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain"
        >
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>
    );
  }

  // No video source provided
  return null;
};

export default VideoPlayer;
