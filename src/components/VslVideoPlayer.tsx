import React, { useRef, useState } from 'react';
import {
  Activity,
  Mail,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { TARGET_EMAIL, DISPLAY_EMAIL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface VslVideoPlayerProps {
  currentLang?: SupportedLanguage;
  instructionText?: string;
  onCtaClick?: () => void;
}

/**
 * Local, user-provided video sources. The first source is the best-quality MP4;
 * the second is a lighter MP4 for constrained webviews; WebM is the final codec
 * fallback for browsers that prefer it.
 */
const VIDEO_STREAMS = [
  { id: 'primary-mp4', src: '/video/naturlich-1910-primary.mp4', type: 'video/mp4', label: 'HD' },
  { id: 'fallback-mp4', src: '/video/naturlich-1910-fallback.mp4', type: 'video/mp4', label: 'SD' },
  { id: 'fallback-webm', src: '/video/naturlich-1910.webm', type: 'video/webm', label: 'WebM' },
];

export const VslVideoPlayer: React.FC<VslVideoPlayerProps> = ({ currentLang = 'de' }) => {
  const t = translations[currentLang] || translations.de;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [switchNotice, setSwitchNotice] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [failedSources, setFailedSources] = useState<number[]>([]);

  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getVideo = (index = activeTagIndex) => videoRefs.current[index];

  const handleVideoError = (failedIndex: number) => {
    if (!hasStarted || failedSources.includes(failedIndex)) return;

    const nextFailed = [...failedSources, failedIndex];
    setFailedSources(nextFailed);
    const nextIndex = VIDEO_STREAMS.findIndex((_, index) => !nextFailed.includes(index));

    if (nextIndex === -1) {
      setSwitchNotice('Video konnte in diesem Browser nicht geladen werden.');
      setIsPlaying(false);
      return;
    }

    setSwitchNotice(`${t.vslBufferNotice} ${nextIndex + 1}...`);
    setActiveTagIndex(nextIndex);

    window.setTimeout(() => {
      const nextVideo = getVideo(nextIndex);
      if (!nextVideo) return;
      nextVideo.currentTime = currentTime;
      nextVideo.muted = isMuted;
      nextVideo.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      setSwitchNotice(null);
    }, 250);
  };

  const handlePlayClick = () => {
    // Deliberately no autoplay: playback starts only from this user gesture.
    setHasStarted(true);
    setShowControls(true);
    const currentVideo = getVideo();
    if (!currentVideo) return;

    currentVideo.muted = false;
    setIsMuted(false);
    currentVideo.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Some in-app browsers allow only muted playback after a gesture.
        currentVideo.muted = true;
        setIsMuted(true);
        currentVideo.play().then(() => setIsPlaying(true)).catch(() => handleVideoError(activeTagIndex));
      });
  };

  const handleTogglePlayPause = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    if (!hasStarted) {
      handlePlayClick();
      return;
    }

    const currentVideo = getVideo();
    if (!currentVideo) return;
    if (isPlaying) {
      currentVideo.pause();
      setIsPlaying(false);
    } else {
      currentVideo.play().then(() => setIsPlaying(true)).catch(() => handleVideoError(activeTagIndex));
    }
  };

  const handleToggleMute = (event: React.MouseEvent) => {
    event.stopPropagation();
    const currentVideo = getVideo();
    if (!currentVideo) return;
    const nextMuted = !isMuted;
    currentVideo.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.target.value);
    const currentVideo = getVideo();
    if (currentVideo) currentVideo.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);
    return `${minutes}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 sm:my-6 relative">
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

      <div
        ref={containerRef}
        onContextMenu={(event) => event.preventDefault()}
        onClick={() => handleTogglePlayPause()}
        className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#070b08] border-2 border-[#c5a059]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] cursor-pointer group select-none"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: "url('/assets/vsl-archive-poster.webp')", opacity: hasStarted ? 0.08 : 1 }}
        />

        {VIDEO_STREAMS.map((stream, index) => (
          <video
            key={stream.id}
            ref={(element) => { videoRefs.current[index] = element; }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              activeTagIndex === index && hasStarted ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'
            }`}
            src={stream.src}
            playsInline
            preload={index === 0 ? 'metadata' : 'none'}
            muted={isMuted}
            controls={false}
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            onLoadedMetadata={(event) => {
              if (index !== activeTagIndex) return;
              const video = event.currentTarget;
              setDuration(Number.isFinite(video.duration) ? video.duration : 0);
            }}
            onTimeUpdate={(event) => {
              if (index === activeTagIndex) setCurrentTime(event.currentTarget.currentTime);
            }}
            onPlay={() => { if (index === activeTagIndex) setIsPlaying(true); }}
            onPause={() => { if (index === activeTagIndex) setIsPlaying(false); }}
            onEnded={() => { if (index === activeTagIndex) setIsPlaying(false); }}
            onError={() => handleVideoError(index)}
          >
            <source src={stream.src} type={stream.type} />
          </video>
        ))}

        {switchNotice && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-[#162319]/95 text-[#e6c278] border border-[#c5a059] px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg">
            <RotateCcw className="w-3 h-3 animate-spin text-[#c5a059]" />
            <span>{switchNotice}</span>
          </div>
        )}

        {!hasStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center bg-black/45 backdrop-blur-[2px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#18261b]/90 border border-[#c5a059]/60 text-[#dfb76c] text-[11px] font-semibold tracking-wider uppercase shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>{t.vslDossierTag}</span>
            </div>
            <button
              onClick={(event) => { event.stopPropagation(); handlePlayClick(); }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#f2d08a] via-[#c59b48] to-[#8d6c29] p-[3px] shadow-[0_0_40px_rgba(212,163,89,0.5)] animate-gold-pulse transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={t.vslPlaySound}
              id="vsl-play-button"
            >
              <div className="w-full h-full rounded-full bg-[#0d140e] flex items-center justify-center border border-[#dfb76c]/40">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#f5d796] fill-[#f5d796] ml-1.5" />
              </div>
            </button>
            <div className="mt-5 space-y-1">
              <p className="text-sm sm:text-base font-semibold text-[#f8f5ee] tracking-wide flex items-center justify-center gap-2">
                <Volume2 className="w-4 h-4 text-[#e6c278]" />
                <span>{t.vslPlaySound}</span>
              </p>
              <p className="text-[11px] sm:text-xs text-[#b8afa0] max-w-sm mx-auto">{t.vslAutoplayNotice}</p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-[#9ca3af] bg-[#0c140e]/80 px-2.5 py-1 rounded-md border border-white/10">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>{t.vslWebviewOptimized}</span>
            </div>
          </div>
        )}

        {hasStarted && (
          <div
            className={`absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:p-4 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={(event) => event.stopPropagation()}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
          >
            <input
              type="range"
              min="0"
              max={duration || 1}
              value={Math.min(currentTime, duration || 1)}
              onChange={handleSeek}
              aria-label="Video progress"
              className="w-full h-1.5 bg-neutral-700/80 rounded-lg appearance-none cursor-pointer accent-[#dfb76c]"
            />
            <div className="flex items-center justify-between text-xs text-white mt-2">
              <div className="flex items-center gap-3">
                <button onClick={handleTogglePlayPause} className="p-1.5 rounded-full hover:bg-white/10 text-[#dfb76c]" aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button onClick={handleToggleMute} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300" aria-label={isMuted ? 'Unmute' : 'Mute'}>
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[11px] text-neutral-400 font-mono tracking-wider">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] text-neutral-300 font-semibold tracking-wide">{VIDEO_STREAMS[activeTagIndex].label}</span>
            </div>
          </div>
        )}
      </div>

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowContactModal(false)}>
          <div className="w-full max-w-md bg-[#0f1711] border border-[#c5a059]/40 rounded-2xl p-6 text-[#e3ded4] shadow-2xl relative" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-[#dfb76c]" /><h3 className="font-display font-semibold text-lg text-[#f0e6d2]">{t.vslModalTitle}</h3></div>
              <button onClick={() => setShowContactModal(false)} className="text-neutral-400 hover:text-white text-xl leading-none">&times;</button>
            </div>
            <p className="text-sm text-[#b8afa0] leading-relaxed mb-4">{t.vslModalDesc}</p>
            <div className="bg-[#18261b] border border-[#c5a059]/30 rounded-xl p-4 mb-5 space-y-2">
              <div className="text-xs text-[#a39b8c]">{t.vslModalContactLabel}</div>
              <a href={`mailto:${TARGET_EMAIL}`} className="block text-sm sm:text-base font-semibold text-[#dfb76c] hover:underline break-all">{DISPLAY_EMAIL}</a>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowContactModal(false)} className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 rounded-lg border border-white/10">{t.vslModalClose}</button>
              <a href={`mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(t.vslModalSubject)}`} className="px-4 py-2 text-xs font-semibold text-[#0d140e] bg-gradient-to-r from-[#dfb76c] to-[#c59b48] rounded-lg shadow">{t.vslModalCompose}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
