import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Palette, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Star 
} from 'lucide-react';
import { sound } from '../utils/audio';
import { PLAYER_AVATARS, getPlayerProfile, updatePlayerProfile } from '../utils/storage';
import {
  RETRO_THEMES,
  KEYCAP_SOUND_PACKS,
  ThemeSelector,
  SoundPackSelector,
  AvatarSelector,
  CourseUnlockGrid
} from './shop';

export { RETRO_THEMES, KEYCAP_SOUND_PACKS };

export default function ShopView({
  userProgress = {},
  selectedTheme = 'bone',
  activeCourseId = 'retrospeed-odyssey',
  initialTab = 'themes',
  onSelectTheme,
  onSelectCourse,
  onUpdateProfile,
  onNavigate
}) {
  const profile = getPlayerProfile(userProgress);
  
  const [activeTab, setActiveTab] = useState(initialTab);
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
    sound.setPack(packId);
    sound.playKeyClick(packId);
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
              Personalize your Retro OS theme, keycap acoustics, player identity, and course curricula.
            </p>
          </div>

          <div className="bg-[#FAF3E0] px-3 py-1.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-2 text-xs font-mono font-bold text-[#2D2319] self-start sm:self-auto">
            <Star className="w-4 h-4 text-[#F6C445] fill-[#F6C445]" />
            <span>{profile.totalXp.toLocaleString()} Lifetime XP Points</span>
          </div>
        </div>

        {/* Tab Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {[
            { id: 'themes', label: 'Palette Themes', icon: Palette },
            { id: 'audio', label: 'Keycap Audio Packs', icon: Volume2 },
            { id: 'avatars', label: 'Player Avatars', icon: Sparkles },
            { id: 'courses', label: 'Course Library', icon: BookOpen }
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

      {/* Main Tab Content */}
      <div key={activeTab} className="my-5 flex-1 tab-content-animate">
        {activeTab === 'themes' && (
          <ThemeSelector selectedTheme={selectedTheme} onSelectTheme={handlePickTheme} />
        )}

        {activeTab === 'audio' && (
          <SoundPackSelector currentSoundPack={currentSoundPack} onSelectSoundPack={handlePickSoundPack} />
        )}

        {activeTab === 'avatars' && (
          <AvatarSelector selectedAvatarId={selectedAvatarId} onSelectAvatar={handlePickAvatar} />
        )}

        {activeTab === 'courses' && (
          <CourseUnlockGrid userProgress={userProgress} onSelectCourse={onSelectCourse} onNavigate={onNavigate} />
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
