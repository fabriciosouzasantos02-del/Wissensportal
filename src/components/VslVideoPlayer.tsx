import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ShieldCheck, 
  Activity, 
  Mail,
  Sparkles
} from 'lucide-react';
import { TARGET_EMAIL, DISPLAY_EMAIL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface VslVideoPlayerProps {
  currentLang?: SupportedLanguage;
  instructionText?: string;
  onCtaClick?: () => void;
}

// Multi-stream sources for reliable fallback across Google Chrome, Safari, Instagram In-App, TikTok, etc.
const VIDEO_STREAMS = [
  {
    id: 'tag-1-primary',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=5,60',
    type: 'video/mp4',
    label: 'Stream 1 (HD)'
  },
  {
    id: 'tag-2-fallback',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4#t=10,60',
    type: 'video/mp4',
    label: 'Stream 2 (Fallback)'
  },
  {
    id: 'tag-3-backup',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    type: 'video/mp4',
    label: 'Stream 3 (Mirror)'
  }
];

export const VslVideoPlayer: React.FC<VslVideoPlayerProps> = ({ currentLang = 'de' }) => {
  const t = translations[currentLang] || translations.de;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(845);
  const [activeTagIndex, setActiveTagIndex] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [switchNotice, setSwitchNotice] = useState<string | null>(null);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [simulatedPlaybackActive, setSimulatedPlaybackActive] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

  const videoRefs = [
    useRef<HTMLVideoElement | null>(null),
    useRef<HTMLVideoElement | null>(null),
    useRef<HTMLVideoElement | null>(null),
  ];
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Switch to next video tag if current fails
  const handleVideoError = (failedIndex: number) => {
    console.warn(`[VSL Player] Video-Tag #${failedIndex + 1} fallback.`);
    const nextIndex = (failedIndex + 1) % VIDEO_STREAMS.length;
    setSwitchNotice(`${t.vslBufferNotice} ${nextIndex + 1}...`);
    setActiveTagIndex(nextIndex);

    setTimeout(() => {
      setSwitchNotice(null);
      const nextVideo = videoRefs[nextIndex].current;
      if (nextVideo && hasStarted) {
        nextVideo.currentTime = currentTime;
        nextVideo.play().catch(() => {
          setSimulatedPlaybackActive(true);
        });
      }
    }, 800);
  };

  const handlePlayClick = () => {
    setHasStarted(true);
    setIsPlaying(true);
    const currentVideo = videoRefs[activeTagIndex].current;

    if (currentVideo) {
      currentVideo.muted = false;
      setIsMuted(false);
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('[VSL Player] Fallback to secondary tag:', err);
          handleVideoError(activeTagIndex);
        });
      }
    } else {
      setSimulatedPlaybackActive(true);
    }
  };

  const handleTogglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasStarted) {
      handlePlayClick();
      return;
    }

    const currentVideo = videoRefs[activeTagIndex].current;
    if (isPlaying) {
      if (currentVideo) currentVideo.pause();
      setIsPlaying(false);
    } else {
      if (currentVideo) {
        currentVideo.play().catch(() => setSimulatedPlaybackActive(true));
      }
      setIsPlaying(true);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVideo = videoRefs[activeTagIndex].current;
    if (currentVideo) {
      currentVideo.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    const currentVideo = videoRefs[activeTagIndex].current;
    if (currentVideo) {
      currentVideo.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 sm:my-6 relative">
      
      {/* Top Status & Fast Contact Trigger */}
      <div className="flex items-center justify-between px-2 pb-2 text-xs text-[#a8a090]">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#dfb76c] font-semibold">{t.dossierBadge}</span>
        </div>

        <button
          onClick={() => setShowContactModal(true)}
          className="inline-flex items-center gap-1 hover:text-[#fce0ad] transition-colors py-0.5 px-2 rounded bg-[#131d15] border border-[#c5a059]/30 text-[11px] cursor-pointer"
        >
          <Mail className="w-3 h-3 text-[#dfb76c]" />
          <span>{t.vslModalTitle}</span>
        </button>
      </div>

      {/* Main Video Stage Frame */}
      <div 
        ref={containerRef}
        onClick={handleTogglePlayPause}
        className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#070b08] border-2 border-[#c5a059]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] cursor-pointer group select-none"
      >
        {/* Archival Poster Background to eliminate black flickering */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512290900672-1f5be5722378?auto=format&fit=crop&w=1600&q=85')`,
            opacity: hasStarted ? 0.3 : 1
          }}
        />

        {/* Multi-Video Tag Array */}
        {VIDEO_STREAMS.map((stream, idx) => (
          <video
            key={stream.id}
            ref={videoRefs[idx]}
            src={stream.src}
            playsInline
            preload="metadata"
            muted={isMuted}
            onTimeUpdate={() => {
              const v = videoRefs[idx].current;
              if (v && v.currentTime) setCurrentTime(v.currentTime);
            }}
            onLoadedMetadata={() => {
              const v = videoRefs[idx].current;
              if (v && v.duration) setDuration(v.duration);
            }}
            onError={() => handleVideoError(idx)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              activeTagIndex === idx && isPlaying ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          />
        ))}

        {/* Dynamic Switch Notice Banner */}
        {switchNotice && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-[#162319]/95 text-[#e6c278] border border-[#c5a059] px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg animate-fade-in">
            <RotateCcw className="w-3 h-3 animate-spin text-[#c5a059]" />
            <span>{switchNotice}</span>
          </div>
        )}

        {/* Pre-Play Overlay with Gold Pulsing Play Button */}
        {!hasStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center bg-black/45 backdrop-blur-[2px]">
            {/* Historical Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#18261b]/90 border border-[#c5a059]/60 text-[#dfb76c] text-[11px] font-semibold tracking-wider uppercase shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>{t.vslDossierTag}</span>
            </div>

            {/* Pulsing Play Button with Sound Warning */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayClick();
              }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#f2d08a] via-[#c59b48] to-[#8d6c29] p-[3px] shadow-[0_0_40px_rgba(212,163,89,0.5)] animate-gold-pulse transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={t.vslPlaySound}
              id="vsl-play-button"
            >
              <div className="w-full h-full rounded-full bg-[#0d140e] flex items-center justify-center border border-[#dfb76c]/40">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#f5d796] fill-[#f5d796] ml-1.5 transition-transform" />
              </div>
            </button>

            {/* Instruction: Click to play with audio */}
            <div className="mt-5 space-y-1">
              <p className="text-sm sm:text-base font-semibold text-[#f8f5ee] tracking-wide flex items-center justify-center gap-2">
                <Volume2 className="w-4 h-4 text-[#e6c278]" />
                <span>{t.vslPlaySound}</span>
              </p>
              <p className="text-[11px] sm:text-xs text-[#b8afa0] max-w-sm mx-auto">
                {t.vslAutoplayNotice}
              </p>
            </div>

            {/* In-App Browser Compatibility Pill */}
            <div className="mt-4 flex items-center gap-2 text-[10px] text-[#9ca3af] bg-[#0c140e]/80 px-2.5 py-1 rounded-md border border-white/10">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>{t.vslWebviewOptimized}</span>
            </div>
          </div>
        )}


        {/* Custom Controls Bar */}
        {hasStarted && (
          <div 
            className={`absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:p-4 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Interactive Progress Scrubber */}
            <div className="relative flex items-center mb-2 group/slider">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-neutral-700/80 rounded-lg appearance-none cursor-pointer accent-[#dfb76c] hover:h-2 transition-all"
              />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-[#8d6c29] to-[#dfb76c] rounded-lg pointer-events-none"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>

            {/* Bottom Row Controls */}
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlayPause}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#dfb76c] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={handleToggleMute}
                  className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-[11px] text-neutral-400 font-mono tracking-wider">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] text-neutral-300 font-semibold tracking-wide">
                  HD 1080p
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Direct Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#0f1711] border border-[#c5a059]/40 rounded-2xl p-6 text-[#e3ded4] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#dfb76c]" />
                <h3 className="font-display font-semibold text-lg text-[#f0e6d2]">{t.vslModalTitle}</h3>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-neutral-400 hover:text-white text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <p className="text-sm text-[#b8afa0] leading-relaxed mb-4">
              {t.vslModalDesc}
            </p>
            <div className="bg-[#18261b] border border-[#c5a059]/30 rounded-xl p-4 mb-5 space-y-2">
              <div className="text-xs text-[#a39b8c]">{t.vslModalContactLabel}</div>
              <a 
                href={`mailto:${TARGET_EMAIL}`}
                className="block text-sm sm:text-base font-semibold text-[#dfb76c] hover:underline break-all"
              >
                {DISPLAY_EMAIL}
              </a>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
              >
                {t.vslModalClose}
              </button>
              <a
                href={`mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(t.vslModalSubject)}`}
                className="px-4 py-2 text-xs font-semibold text-[#0d140e] bg-gradient-to-r from-[#dfb76c] to-[#c59b48] rounded-lg shadow"
              >
                {t.vslModalCompose}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
