import React, { useState } from 'react';
import { INITIAL_D_TRACKS, TrackInfo } from '../utils/audioEngine';
import { Play, ExternalLink, Radio, Disc, Music, Check, Sparkles, Youtube } from 'lucide-react';

interface JukeboxProps {
  lang: 'mn' | 'en';
}

export const EurobeatJukebox: React.FC<JukeboxProps> = ({ lang }) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackInfo>(INITIAL_D_TRACKS[0]);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const playlistUrl = 'https://www.youtube.com/watch?v=jfLWWUm4o_U&list=RDjfLWWUm4o_U&start_radio=1';

  return (
    <section id="eurobeat" className="py-12 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs uppercase font-racing tracking-widest text-amber-500 mb-1 flex items-center justify-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{lang === 'mn' ? 'Албан ёсны Initial D хөгжим' : 'Official Initial D OST Player'}</span>
          </div>
          <h2 className="text-3xl font-extrabold font-racing text-white tracking-tight">
            {lang === 'mn' ? 'АЛБАН ЁСНЫ INITIAL D ДУУНУУД (m.o.v.e)' : 'OFFICIAL INITIAL D SOUNDTRACKS (m.o.v.e)'}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            {lang === 'mn'
              ? 'm.o.v.e хамтлагийн домогт «Rage your Dream», «around the world», «Gamble Rumble» зэрэг анимены жинхэнэ ориг дуунуудыг шууд сонсоорой.'
              : 'Stream the official original studio recordings by m.o.v.e including Rage your Dream, around the world, and Gamble Rumble.'}
          </p>
        </div>

        {/* Main Player Card */}
        <div className="max-w-4xl mx-auto bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: YouTube Video/Audio Player */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-xl">
                <iframe
                  key={selectedTrack.youtubeId}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedTrack.youtubeId}?autoplay=${autoPlay ? 1 : 0}&rel=0&enablejsapi=1`}
                  title={selectedTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Now Playing info & Link */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 flex items-center justify-between gap-4">
                <div className="truncate">
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-racing uppercase tracking-wider mb-0.5">
                    <Music className="w-3 h-3" />
                    <span>{selectedTrack.stage}</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold font-racing text-white truncate">
                    {selectedTrack.title} — <span className="text-neutral-400">{selectedTrack.artist}</span>
                  </div>
                </div>

                <a
                  href={playlistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-semibold transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">YouTube Playlist</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right: Track Playlist Selector */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <div className="text-xs font-racing uppercase tracking-wider text-amber-400">
                  {lang === 'mn' ? 'Албан ёсны Initial D дуунууд:' : 'Official Initial D Tracklist:'}
                </div>
                <div className="text-[11px] text-neutral-500 font-mono">
                  {INITIAL_D_TRACKS.length} Tracks
                </div>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {INITIAL_D_TRACKS.map((track, idx) => {
                  const isSelected = selectedTrack.id === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => {
                        setSelectedTrack(track);
                        setAutoPlay(true);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/80 text-white shadow-sm ring-1 ring-amber-500/30'
                          : 'bg-neutral-950/80 border-neutral-850 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {isSelected ? <Play className="w-3.5 h-3.5 fill-current" /> : `0${idx + 1}`}
                        </div>

                        <div className="truncate text-left">
                          <div className={`text-xs font-bold font-racing truncate ${isSelected ? 'text-amber-400' : 'text-neutral-100'}`}>
                            {track.title}
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate">
                            {track.artist} · <span className="text-neutral-500">{track.stage}</span>
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-xs text-neutral-500 shrink-0">
                        {track.durationStr}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Direct Link to YouTube Radio Mix */}
              <div className="pt-2">
                <a
                  href={playlistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 flex items-center justify-center gap-2 transition-colors font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{lang === 'mn' ? 'YouTube дээр бүтэн радио сонсох' : 'Open Full YouTube Radio Mix'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
