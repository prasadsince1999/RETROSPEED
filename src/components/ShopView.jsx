import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Palette, 
  Volume2, 
  Sparkles, 
  Check, 
  Award, 
  Shield, 
  Star, 
  Radio, 
  Zap 
} from 'lucide-react';
import { sound } from '../utils/audio';
import { PLAYER_AVATARS, getPlayerProfile, updatePlayerProfile } from '../utils/storage';

export const RETRO_THEMES = [
  {
    id: 'bone',
    name: 'Vintage 90s OS (Default)',
    subtitle: 'Warm cream canvas with solid mustard & lilac accents',
    bg: '#B9D2E8',
    surface: '#FDF8EE',
    header: '#C3A6E8',
    accent: '#F6C445',
    tag: 'Classic'
  },
  {
    id: 'vintage',
    name: 'Macintosh Classic Paper',
    subtitle: 'Soft sandstone parchment with sky denim highlights',
    bg: '#C5D8E6',
    surface: '#FAF3E0',
    header: '#4BA3E3',
    accent: '#48B89F',
    tag: 'Vintage'
  },
  {
    id: 'cyber-mint',
    name: 'Neo Mint & Lavender',
    subtitle: 'Pastel mint green surfaces with lavender titlebars',
    bg: '#D4E8DC',
    surface: '#FDF8EE',
    header: '#48B89F',
    accent: '#C3A6E8',
    tag: 'Modern Retro'
  },
  {
    id: 'lavender',
    name: 'Pastel Dreamscape',
    subtitle: 'Solid lilac headers with warm coral accents',
    bg: '#E3D7F4',
    surface: '#FDF8EE',
    header: '#C3A6E8',
    accent: '#F28B82',
    tag: 'Pastel'
  },
  {
    id: 'terminal',
    name: 'Terminal Amber',
    subtitle: 'Golden mustard titlebars with high contrast ink cards',
    bg: '#E8DEC4',
    surface: '#FDF8EE',
    header: '#F6C445',
    accent: '#2D2319',
    tag: 'Hacker CRT'
  }
];

export const KEYCAP_SOUND_PACKS = [
  {
    id: 'cherry-blue',
    name: 'Cherry MX Blue (Clicky)',
    description: 'Crisp, tactile, satisfying acoustic snap with instant key actuation feedback.',
    tag: 'Mechanical'
  },
  {
    id: 'gateron-brown',
    name: 'Gateron Brown (Tactile)',
    description: 'Smooth tactile bump with dampened low-frequency bottom-out acoustic profile.',
    tag: 'Silent Tactile'
  },
  {
    id: 'ibm-model-m',
    name: 'Vintage IBM Model M',
    description: 'Legendary heavy buckling spring clack from the 1980s computing era.',
    tag: 'Vintage Spring'
  },
  {
    id: 'thocky',
    name: 'Thocky Lubed Linear',
    description: 'Deep, marbly acoustic thock on premium POM stem switches.',
    tag: 'Custom Keyboard'
  },
  {
    id: 'chiptune',
    name: '8-Bit Chiptune Arcade',
    description: 'Retro 8-bit blips and synthesized frequency chirps for nostalgic gaming.',
    tag: 'Arcade Synth'
  }
];

export default function ShopView({
  userProgress = {},
  selectedTheme = 'bone',
  onSelectTheme,
  onUpdateProfile,
  onNavigate
}) {
  const profile = getPlayerProfile(userProgress);
  
  const [activeTab, setActiveTab] = useState('themes'); // 'themes' | 'audio' | 'avatars'
  const [currentSoundPack, setCurrentSoundPack] = useState(userProgress.settings?.soundPack || 'cherry-blue');
  const [selectedAvatarId, setSelectedAvatarId] = useState(profile.avatarId);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2500);
  };

  const handlePickTheme = (themeId) => {
    sound.playKeyClick();
    if (onSelectTheme) {
      onSelectTheme(themeId);
      showNotification(`Applied Theme: ${RETRO_THEMES.find(t => t.id === themeId)?.name}`);
    }
  };

  const handlePickSoundPack = (packId) => {
    sound.playKeyClick();
    setCurrentSoundPack(packId);
    if (onUpdateProfile) {
      const updated = {
        ...userProgress,
        settings: {
          ...(userProgress.settings || {}),
          soundPack: packId
        }
      };
      onUpdateProfile(updated);
    }
    showNotification(`Active Sound Pack: ${KEYCAP_SOUND_PACKS.find(p => p.id === packId)?.name}`);
  };

  const handlePickAvatar = (avatarId) => {
    sound.playKeyClick();
    setSelectedAvatarId(avatarId);
    const updated = updatePlayerProfile(userProgress, { avatarId });
    if (onUpdateProfile) {
      onUpdateProfile(updated);
    }
    showNotification(`Active Avatar: ${PLAYER_AVATARS.find(a => a.id === avatarId)?.name}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto">
      
      {/* Header Banner */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#2D2319]/20 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#F6C445]" />
              <h1 className="text-xl sm:text-2xl font-black font-display text-[#2D2319]">
                Customization Workshop & Shop
              </h1>
            </div>
            <p className="text-xs text-[#2D2319]/70 font-medium mt-0.5 font-serif italic">
              Personalize your Retro OS theme, keycap acoustics, and player identity.
            </p>
          </div>

          {/* Player Points Pill */}
          <div className="bg-[#FAF3E0] px-3 py-1.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-2 text-xs font-mono font-bold text-[#2D2319] self-start sm:self-auto">
            <Star className="w-4 h-4 text-[#F6C445] fill-[#F6C445]" />
            <span>{profile.totalXp.toLocaleString()} Lifetime XP Points</span>
          </div>
        </div>

        {/* Tab Pills: Themes | Audio Sound Packs | Avatars */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          {[
            { id: 'themes', label: 'Palette Themes', icon: Palette },
            { id: 'audio', label: 'Keycap Audio Packs', icon: Volume2 },
            { id: 'avatars', label: 'Player Avatars', icon: Sparkles }
          ].map(tab => {
            const isSel = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl border-2 border-[#2D2319] flex items-center space-x-1.5 font-bold transition-all ${
                  isSel 
                    ? 'bg-[#C7E8CA] shadow-[2px_2px_0px_#2D2319] font-black' 
                    : 'bg-[#FAF3E0] hover:bg-white shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Tab Content with Smooth Tab Transition */}
      <div key={activeTab} className="my-5 flex-1 tab-content-animate">
        
        {/* 1. Themes Tab */}
        {activeTab === 'themes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RETRO_THEMES.map(th => {
              const isActive = selectedTheme === th.id;
              return (
                <div
                  key={th.id}
                  onClick={() => handlePickTheme(th.id)}
                  className={`p-4 rounded-2xl border-2 border-[#2D2319] cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-[#FAF3E0] shadow-[4px_4px_0px_#2D2319] ring-2 ring-[#48B89F]' 
                      : 'bg-[#FDF8EE] hover:bg-[#FAF3E0] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-5 h-5 rounded-md border border-[#2D2319]"
                        style={{ backgroundColor: th.header }}
                      />
                      <span className="font-display font-black text-sm text-[#2D2319]">{th.name}</span>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-[#FDF8EE] border border-[#2D2319] text-[10px] font-mono font-bold text-[#2D2319]">
                      {th.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[#2D2319]/70 mt-2 font-medium">
                    {th.subtitle}
                  </p>

                  {/* Swatch Previews */}
                  <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-[#2D2319]/10">
                    <span className="text-[10px] font-mono text-[#2D2319]/60">Palette:</span>
                    <span className="w-4 h-4 rounded border border-[#2D2319]" style={{ backgroundColor: th.bg }} title="Canvas Wallpaper" />
                    <span className="w-4 h-4 rounded border border-[#2D2319]" style={{ backgroundColor: th.surface }} title="Card Surface" />
                    <span className="w-4 h-4 rounded border border-[#2D2319]" style={{ backgroundColor: th.header }} title="Titlebar Header" />
                    <span className="w-4 h-4 rounded border border-[#2D2319]" style={{ backgroundColor: th.accent }} title="Accent Color" />
                    
                    {isActive && (
                      <span className="ml-auto text-xs font-mono font-black text-[#48B89F] flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>ACTIVE</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. Keycap Audio Sound Packs Tab */}
        {activeTab === 'audio' && (
          <div className="space-y-3">
            {KEYCAP_SOUND_PACKS.map(pack => {
              const isActive = currentSoundPack === pack.id;
              return (
                <div
                  key={pack.id}
                  onClick={() => handlePickSoundPack(pack.id)}
                  className={`p-4 rounded-2xl border-2 border-[#2D2319] cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isActive 
                      ? 'bg-[#C7E8CA] shadow-[4px_4px_0px_#2D2319]' 
                      : 'bg-[#FAF3E0] hover:bg-white shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-[#2D2319]" />
                      <span className="font-display font-black text-sm text-[#2D2319]">{pack.name}</span>
                      <span className="px-2 py-0.2 rounded bg-[#FDF8EE] border border-[#2D2319] text-[10px] font-mono font-bold text-[#2D2319]">
                        {pack.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#2D2319]/80 font-medium max-w-xl">
                      {pack.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playKeyClick();
                      }}
                      className="px-3 py-1.5 bg-[#FDF8EE] hover:bg-white border-2 border-[#2D2319] rounded-xl text-xs font-mono font-bold text-[#2D2319] shadow-[1px_1px_0px_#2D2319]"
                    >
                      🔊 Test Click
                    </button>
                    {isActive && (
                      <span className="px-3 py-1.5 bg-[#48B89F] text-white border-2 border-[#2D2319] rounded-xl text-xs font-display font-black shadow-[1px_1px_0px_#2D2319]">
                        EQUIPPED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Avatars Tab */}
        {activeTab === 'avatars' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {PLAYER_AVATARS.map(av => {
              const isSelected = selectedAvatarId === av.id;
              return (
                <div
                  key={av.id}
                  onClick={() => handlePickAvatar(av.id)}
                  className={`p-4 rounded-2xl border-2 border-[#2D2319] flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-[#F6C445] shadow-[4px_4px_0px_#2D2319] -translate-y-0.5' 
                      : 'bg-[#FAF3E0] hover:bg-white shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                  }`}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-3xl"
                    style={{ backgroundColor: av.bg }}
                  >
                    {av.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-display font-black text-xs text-[#2D2319] truncate">{av.name}</div>
                    <div className="text-[10px] font-mono text-[#2D2319]/70">Retro Persona</div>
                  </div>
                  {isSelected && (
                    <span className="px-2 py-0.5 bg-[#2D2319] text-white text-[9px] font-mono font-bold rounded-md">
                      ACTIVE
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Footer / Notification Bar */}
      <div className="border-t border-[#2D2319]/20 pt-3 flex items-center justify-between text-xs font-mono">
        <div className="font-bold text-[#48B89F]">
          {notification && `✓ ${notification}`}
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            if (onNavigate) onNavigate('home');
          }}
          className="px-4 py-1.5 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5"
        >
          Return to Home
        </button>
      </div>

    </div>
  );
}
