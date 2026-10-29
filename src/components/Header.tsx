import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Globe, Play, Pause, SkipForward, Disc, Download } from 'lucide-react';
import { audioEngine, TrackInfo, INITIAL_D_TRACKS } from '../utils/audioEngine';

interface HeaderProps {
  lang: 'mn' | 'en';
  setLang: (lang: 'mn' | 'en') => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  isEurobeat: boolean;
  setIsEurobeat: (v: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  activeSection,
  setActiveSection,
  isEurobeat,
  setIsEurobeat
}) => {
  const [muted, setMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(audioEngine.getCurrentTrack());

  useEffect(() => {
    audioEngine.registerTrackListener((track, playing) => {
      setCurrentTrack(track);
      setIsEurobeat(playing);
    });
  }, [setIsEurobeat]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    audioEngine.setMute(next);
    if (next) {
      setIsEurobeat(false);
    }
  };

  const handleEurobeatToggle = () => {
    if (muted) {
      setMuted(false);
      audioEngine.setMute(false);
    }
    const playing = audioEngine.toggleEurobeat();
    setIsEurobeat(playing);
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (muted) {
      setMuted(false);
      audioEngine.setMute(false);
    }
    const next = audioEngine.nextTrack();
    setCurrentTrack(next);
    setIsEurobeat(true);
  };

  const navLinks = [
    { id: 'gallery', labelMn: 'AE86 Дрифт', labelEn: 'AE86 Drift' },
    { id: 'techniques', labelMn: '🥋 Дрифтийн Техник', labelEn: '🥋 Drift Technique' },
    { id: 'fleet', labelMn: '🚗 Бүх Тэргүүд', labelEn: '🚗 JDM Fleet' },
    { id: 'carx-tuning', labelMn: '🔧 CarX Тохиргоо', labelEn: '🔧 CarX Tuning' },
    { id: 'eurobeat', labelMn: '🎵 Initial D Дуунууд', labelEn: '🎵 Initial D OST' },
    { id: 'tachometer', labelMn: '11,000 RPM Мотор', labelEn: 'Tachometer' },
    { id: 'water-cup', labelMn: 'Усны аяга тест', labelEn: 'Water Cup Test' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark (single element, clean typography) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#gallery"
            onClick={(e) => { e.preventDefault(); setActiveSection('gallery'); }}
            className="text-lg md:text-xl font-bold tracking-wider font-racing text-white hover:text-amber-400 transition-colors uppercase whitespace-nowrap"
          >
            INITIAL D <span className="text-amber-500">·</span> SPRINTER TRUENO AE86
          </a>
        </div>

        {/* Zone 2: 5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                activeSection === link.id
                  ? 'text-amber-400 border-amber-500 font-semibold'
                  : 'border-transparent text-neutral-400'
              }`}
            >
              {lang === 'mn' ? link.labelMn : link.labelEn}
            </button>
          ))}
        </nav>

        {/* Zone 3: Top Bar Player & Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Original Initial D Song Player Widget */}
          <div
            onClick={handleEurobeatToggle}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all select-none ${
              isEurobeat
                ? 'bg-gradient-to-r from-amber-500/20 to-red-500/20 border-amber-500/60 text-amber-400 shadow-md shadow-amber-500/10'
                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
            }`}
            title="Initial D Eurobeat: Running in the 90s, Deja Vu, Gas Gas Gas"
          >
            <div className={`p-1 rounded-full ${isEurobeat ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-300'}`}>
              {isEurobeat ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
            </div>

            <div className="flex flex-col text-left max-w-[130px] sm:max-w-[170px] truncate">
              <span className="text-[11px] font-racing font-bold tracking-wider uppercase text-white truncate leading-tight">
                {currentTrack.title}
              </span>
              <span className="text-[9px] text-neutral-400 truncate leading-tight">
                {currentTrack.artist}
              </span>
            </div>

            <button
              onClick={handleNextTrack}
              className="p-1 hover:text-white text-neutral-400 transition-colors"
              title="Дараагийн дуу / Next Track"
            >
              <SkipForward className="w-3 h-3" />
            </button>
          </div>

          {/* Sound Mute */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
              muted
                ? 'bg-neutral-900 text-neutral-500 border-neutral-800'
                : 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:text-white'
            }`}
            title={muted ? 'Unmute' : 'Mute Sound'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Download Local Project ZIP */}
          <a
            href="/initial-d-ae86-jdm-project.zip"
            download="initial-d-ae86-jdm-project.zip"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-md shadow-red-600/20 whitespace-nowrap"
            title="Төслийг ZIP хэлбэрээр татах / Download Project ZIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'mn' ? 'Татах' : 'ZIP'}</span>
          </a>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
            title="Хэл солих / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'mn' ? 'MN' : 'EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
