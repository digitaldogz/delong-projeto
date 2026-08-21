import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface BunnyVideo {
  libraryId: string;
  videoId: string;
}

interface VideoPlayerProps {
  youtubeId?: string;
  bunnyVideo?: BunnyVideo;
  videoUrl?: string;
  title?: string;
  poster?: string;
  videoOrientation?: string;
}

const formatTime = (timeInSeconds: number) => {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  return result.replace(/^00:/, ''); // remove hours if zero
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  youtubeId,
  bunnyVideo,
  videoUrl,
  title = "Video",
  poster,
  videoOrientation = 'horizontal'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Focus on bunny stream (explicit bunnyVideo prop)
  if (bunnyVideo) {
    const bunnyUrl = `https://iframe.mediadelivery.net/embed/${bunnyVideo.libraryId}/${bunnyVideo.videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
    const isVertical = videoOrientation === 'vertical';
    return (
      <div className={`relative w-full ${isVertical ? 'aspect-[9/16] max-w-[400px] mx-auto' : 'aspect-video'} bg-black overflow-hidden shadow-2xl`}>
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

  // Focus on YouTube
  if (youtubeId) {
    return (
      <div className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl">
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

  // Auto-convert Bunny Stream Embed URLs into Direct MP4 URLs so the custom player is ALWAYS used
  let processedUrl = videoUrl;
  if (processedUrl && processedUrl.includes('mediadelivery.net')) {
    const match = videoUrl.match(/\/(play|embed)\/\d+\/([a-zA-Z0-9-]+)/);
    if (match) {
      const guid = match[2];
      // Forcefully convert to the direct CDN url so we get the custom bolinha branca player!
      processedUrl = `https://vz-b5c6f4c7-023.b-cdn.net/${guid}/play_1080p.mp4`;
    }
  }

  // Auto-detect Bunny CDN direct file URLs (b-cdn.net)
  // Esses funcionam com <video> tag normalmente

  // Focus on Direct Video URL with Custom Player
  if (processedUrl) {
    const handleGlobalPause = (e: any) => {
      if (e.detail !== videoRef.current) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    useEffect(() => {
      window.addEventListener('bunnyVideoPlay', handleGlobalPause);
      return () => {
        window.removeEventListener('bunnyVideoPlay', handleGlobalPause);
      };
    }, []);

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
          setHasStarted(true);
          window.dispatchEvent(new CustomEvent('bunnyVideoPlay', { detail: videoRef.current }));
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (videoRef.current) {
        if (isMuted) {
          videoRef.current.muted = false;
          videoRef.current.volume = volume === 0 ? 1 : volume;
          if (volume === 0) setVolume(1);
          setIsMuted(false);
        } else {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
        if (newVolume === 0) {
          videoRef.current.muted = true;
          setIsMuted(true);
        } else {
          videoRef.current.muted = false;
          setIsMuted(false);
        }
      }
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        setCurrentTime(current);
        setProgress((current / total) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const seekTime = (parseFloat(e.target.value) / 100) * duration;
      if (videoRef.current) {
        videoRef.current.currentTime = seekTime;
        setProgress(parseFloat(e.target.value));
      }
    };

    const toggleFullscreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    };

    const isVertical = videoOrientation === 'vertical';

    return (
      <div 
        ref={containerRef}
        className={`relative w-full ${isVertical ? 'aspect-[9/16] max-w-[400px] mx-auto' : 'aspect-video'} bg-black overflow-hidden shadow-2xl group cursor-pointer`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        onClick={togglePlay}
      >
        {/* Auto-derive Bunny thumbnail if possible */}
        <video
          ref={videoRef}
          src={processedUrl}
          poster={processedUrl && processedUrl.includes('.b-cdn.net') ? (poster || processedUrl.replace(/\/[^\/]+\.mp4$/, '/thumbnail.jpg')) : poster}
          
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          playsInline
        />

        {/* Big Play Button Overlay (shown before starting) */}
        {!hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-500">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-105 hover:bg-white/20 transition-all duration-300">
              <Play className="w-8 h-8 md:w-12 md:h-12 text-white ml-2" fill="white" />
            </div>
          </div>
        )}

        {/* Custom Controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 pb-4 pt-16 px-6 transition-opacity duration-300 ${
            showControls && hasStarted ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Bar */}
          <div className="w-full flex items-center gap-3 mb-4">
            <span className="text-white text-xs font-medium w-12">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer hover:[&::-webkit-slider-thumb]:scale-150 transition-all"
              style={{
                background: `linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.3) ${progress}%)`
              }}
            />
            <span className="text-white/60 text-xs font-medium w-12">{formatTime(duration)}</span>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 group/volume relative">
              <button 
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors outline-none"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                onClick={(e) => e.stopPropagation()}
                className="w-0 opacity-0 group-hover/volume:w-16 group-hover/volume:opacity-100 transition-all duration-300 h-1.5 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125"
                style={{
                  background: `linear-gradient(to right, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%)`
                }}
              />
            </div>
            </div>

            <div className="flex items-center gap-4">
              <h4 className="text-white/80 text-sm font-medium uppercase tracking-wider hidden md:block">{title}</h4>
              <button 
                onClick={toggleFullscreen}
                className="text-white hover:text-primary transition-colors outline-none ml-4"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VideoPlayer;
