import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Flame,
  Star,
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';
import AchievementBadgeIcon from './AchievementBadgeIcon';
import { evaluateAchievements, ACHIEVEMENT_CATEGORIES } from '../data/achievementsData';
import { sound } from '../utils/audio';

export default function BadgesDashboard({
  userProgress = {},
  onNavigate,
  onSelectCourse,
  onBack
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'unlocked' | 'in-progress' | 'locked'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Compute live achievement progression data
  const evaluated = evaluateAchievements(userProgress);
  const {
    achievements,
    totalUnlocked,
    totalBadges,
    completionPercent,
    earnedXp,
    totalPossibleXp,
    categoryCounts,
    nextUpcomingBadge,
    rankTier,
    rankTitle
  } = evaluated;

  // Trigger fanfare confetti
  const triggerCelebration = () => {
    sound.playTada();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleOpenBadge = (badge) => {
    sound.playKeyClick();
    setSelectedBadge(badge);
  };

  const categoryTabs = [
    { id: 'all', label: `All (${totalBadges})`, count: totalBadges },
    { id: 'speed', label: `Speed (${categoryCounts.speed.total})`, count: categoryCounts.speed.total },
    { id: 'accuracy', label: `Accuracy (${categoryCounts.accuracy.total})`, count: categoryCounts.accuracy.total },
    { id: 'streaks', label: `Streaks (${categoryCounts.streaks.total})`, count: categoryCounts.streaks.total },
    { id: 'arcade', label: `Arcade (${categoryCounts.arcade.total})`, count: categoryCounts.arcade.total },
    { id: 'mastery', label: `Mastery (${categoryCounts.mastery.total})`, count: categoryCounts.mastery.total }
  ];

  // Filter achievements
  const filteredAchievements = achievements.filter((badge) => {
    const matchesCat = selectedCategory === 'all' || badge.category === selectedCategory;

    let matchesStatus = true;
    if (statusFilter === 'unlocked') matchesStatus = badge.isUnlocked;
    if (statusFilter === 'in-progress') matchesStatus = !badge.isUnlocked && badge.progressPercent > 0;
    if (statusFilter === 'locked') matchesStatus = !badge.isUnlocked;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      badge.title.toLowerCase().includes(searchLower) ||
      badge.subtitle.toLowerCase().includes(searchLower) ||
      badge.requirement.toLowerCase().includes(searchLower) ||
      badge.lore.toLowerCase().includes(searchLower) ||
      badge.categoryLabel.toLowerCase().includes(searchLower);

    return matchesCat && matchesStatus && matchesSearch;
  });

  const handlePracticeCourse = (courseId, targetLevel) => {
    sound.playKeyClick();
    if (onSelectCourse) {
      onSelectCourse(courseId, targetLevel);
    } else if (onNavigate) {
      onNavigate('learn');
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto space-y-5">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#2D2319]/20 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#F6C445] text-[#2D2319] flex items-center justify-center border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#2D2319] tracking-tight font-display">
                  Badges & Achievements
                </h1>
                <span className="px-2.5 py-0.5 rounded bg-[#FAF3E0] text-[#2D2319] font-mono text-xs font-black border border-[#2D2319]">
                  {totalUnlocked} / {totalBadges} EARNED
                </span>
              </div>
              <p className="text-xs text-[#2D2319]/70 mt-0.5 font-mono font-medium">
                Milestones across speed, precision, streaks, arcade challenges, and mastery.
              </p>
            </div>
          </div>
        </div>

        {/* Fanfare Celebration Trigger */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={triggerCelebration}
            className="px-3.5 py-2 rounded-xl bg-[#F6C445] hover:bg-[#ffd95e] text-[#2D2319] font-mono text-xs font-black border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#2D2319]" />
            <span>FANFARE CELEBRATION</span>
          </button>
        </div>
      </div>

      {/* Top Overview Banner: Overall Progression & Next Upcoming Badge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left 2 Cols: Overall Progress & Rank Banner */}
        <div className="lg:col-span-2 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-[#FDF8EE] text-[#2D2319] font-mono text-xs font-bold border border-[#2D2319]">
                  🏆 Player Tier: {rankTier}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#C7E8CA] text-[#2D2319] font-mono text-xs font-black border border-[#2D2319]">
                  ★ {rankTitle}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#2D2319]">
                {earnedXp.toLocaleString()} / {totalPossibleXp.toLocaleString()} XP
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-[#2D2319] font-display tracking-tight leading-tight">
              Overall Achievement Progression
            </h2>
            <p className="text-xs text-[#2D2319]/80 font-mono">
              Unlocked <span className="text-[#2D2319] font-black">{totalUnlocked} of {totalBadges}</span> badges ({completionPercent}% complete). Continue practicing to reach Grandmaster rank!
            </p>

            {/* Major Progress Bar */}
            <div className="space-y-1">
              <div className="h-3.5 bg-[#FDF8EE] rounded-full border-2 border-[#2D2319] overflow-hidden p-0.5 flex">
                <div 
                  className="h-full rounded-full bg-[#48B89F] transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#2D2319]/80">
                <span>{totalUnlocked} Badges Unlocked</span>
                <span>{completionPercent}% Finished</span>
                <span>{totalBadges - totalUnlocked} Remaining</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 mt-3 border-t border-[#2D2319]/20 text-center font-mono text-xs">
            <div className="bg-[#FDF8EE] rounded-xl py-2 px-2.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              <div className="text-base font-black text-[#2D2319]">
                {categoryCounts.speed.unlocked} / {categoryCounts.speed.total}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-[#2D2319]/70 font-bold">Speed Badges</div>
            </div>

            <div className="bg-[#FDF8EE] rounded-xl py-2 px-2.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              <div className="text-base font-black text-[#48B89F]">
                {categoryCounts.accuracy.unlocked} / {categoryCounts.accuracy.total}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-[#2D2319]/70 font-bold">Accuracy Badges</div>
            </div>

            <div className="bg-[#FDF8EE] rounded-xl py-2 px-2.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              <div className="text-base font-black text-[#4BA3E3]">
                {categoryCounts.arcade.unlocked + categoryCounts.mastery.unlocked} / {categoryCounts.arcade.total + categoryCounts.mastery.total}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-[#2D2319]/70 font-bold">Arcade & Mastery</div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Next Upcoming Badge Spotlight */}
        <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[4px_4px_0px_#2D2319] relative">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-white font-mono text-[10px] font-black border border-[#2D2319] inline-flex items-center space-x-1">
                <Flame className="w-3 h-3 text-[#F6C445]" />
                <span>NEXT UPCOMING</span>
              </span>
              {nextUpcomingBadge && (
                <span className="text-[11px] font-mono font-bold text-[#2D2319]">
                  {nextUpcomingBadge.progressPercent}%
                </span>
              )}
            </div>

            {nextUpcomingBadge ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 my-1">
                  <div
                    onClick={() => handleOpenBadge(nextUpcomingBadge)}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    <AchievementBadgeIcon
                      badgeId={nextUpcomingBadge.id}
                      isUnlocked={false}
                      size="sm"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-[#2D2319] text-xs font-display leading-tight">
                      {nextUpcomingBadge.title}
                    </h3>
                    <p className="text-[10px] font-mono text-[#2D2319]/70">
                      {nextUpcomingBadge.subtitle}
                    </p>
                    <span className="inline-block mt-0.5 text-[9px] font-mono font-bold text-[#2D2319] bg-[#F6C445] px-1.5 py-0.2 rounded border border-[#2D2319]">
                      +{nextUpcomingBadge.xp} XP Reward
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#2D2319]/80 font-medium line-clamp-2">
                  {nextUpcomingBadge.requirement}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono font-bold text-[#2D2319]">
                    <span>Target Progress</span>
                    <span>
                      {nextUpcomingBadge.currentValue} / {nextUpcomingBadge.targetValue} {nextUpcomingBadge.unit}
                    </span>
                  </div>
                  <div className="h-2.5 bg-[#FDF8EE] rounded-full border-2 border-[#2D2319] overflow-hidden p-0.5 flex">
                    <div 
                      className="h-full rounded-full bg-[#F6C445]"
                      style={{ width: `${nextUpcomingBadge.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-8 h-8 text-[#48B89F] mx-auto mb-2" />
                <h4 className="font-bold text-[#2D2319] text-xs">All Badges Conquered!</h4>
                <p className="text-[10px] text-[#2D2319]/70 mt-1 font-mono">You have completed all 24 RETROSPEED achievements.</p>
              </div>
            )}
          </div>

          {nextUpcomingBadge && (
            <div className="mt-3 pt-3 border-t border-[#2D2319]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleOpenBadge(nextUpcomingBadge)}
                className="text-xs font-mono font-bold text-[#2D2319] hover:underline"
              >
                Inspect Details
              </button>

              <button
                type="button"
                onClick={() => handlePracticeCourse(nextUpcomingBadge.courseShortcut, nextUpcomingBadge.targetLevel)}
                className="px-3 py-1.5 rounded-xl bg-[#48B89F] hover:bg-[#3ca089] text-white font-mono text-xs font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center space-x-1"
              >
                <span>Practice</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Filtering & Search Controls */}
      <div className="space-y-3">
        
        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
            {categoryTabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setSelectedCategory(tab.id);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border-2 border-[#2D2319] shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-[#C7E8CA] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black'
                    : 'bg-[#FAF3E0] text-[#2D2319] hover:bg-white shadow-[1px_1px_0px_#2D2319]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-64 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-[#2D2319]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search 24 badges & lore..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl text-xs font-mono text-[#2D2319] placeholder:text-[#2D2319]/50 shadow-[2px_2px_0px_#2D2319] focus:outline-none focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#2D2319]/70 font-mono font-bold text-[11px] uppercase tracking-wider flex items-center space-x-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>

          {[
            { id: 'all', label: `All (${achievements.length})` },
            { id: 'unlocked', label: `✓ Unlocked (${totalUnlocked})` },
            { id: 'in-progress', label: `⚡ In Progress (${totalBadges - totalUnlocked})` },
            { id: 'locked', label: `🔒 Locked Only` }
          ].map((status) => (
            <button
              key={status.id}
              type="button"
              onClick={() => {
                setStatusFilter(status.id);
                sound.playKeyClick();
              }}
              className={`px-2.5 py-1 rounded-xl font-mono text-xs font-bold transition-all border-2 border-[#2D2319] shrink-0 ${
                statusFilter === status.id
                  ? 'bg-[#2D2319] text-white shadow-[2px_2px_0px_#2D2319]'
                  : 'bg-[#FAF3E0] text-[#2D2319] hover:bg-white shadow-[1px_1px_0px_#2D2319]'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

      </div>

      {/* Achievements Grid (24 Badges) */}
      {filteredAchievements.length === 0 ? (
        <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] text-center py-10 p-6">
          <div className="w-12 h-12 rounded-2xl bg-[#F6C445] border-2 border-[#2D2319] text-[#2D2319] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#2D2319]">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-[#2D2319] font-display">No achievements match your filter</h3>
          <p className="text-xs text-[#2D2319]/70 mt-1 max-w-sm mx-auto font-mono">
            Try adjusting your search query, status filter, or switching to the "All Badges" category tab.
          </p>
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setSelectedCategory('all');
              setStatusFilter('all');
              setSearchTerm('');
            }}
            className="mt-4 px-4 py-1.5 rounded-xl bg-[#2D2319] hover:bg-slate-800 text-white font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredAchievements.map((badge) => {
            const isUnlocked = badge.isUnlocked;

            return (
              <div
                key={badge.id}
                onClick={() => handleOpenBadge(badge)}
                className={`p-3.5 rounded-2xl border-2 border-[#2D2319] cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isUnlocked
                    ? 'bg-[#FAF3E0] hover:bg-white shadow-[3px_3px_0px_#2D2319]'
                    : 'bg-[#F5EFE0] hover:bg-[#FAF3E0] shadow-[2px_2px_0px_#2D2319] opacity-85'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.2 rounded bg-[#FDF8EE] border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319]">
                      {badge.rarity}
                    </span>
                    {isUnlocked ? (
                      <span className="px-2 py-0.2 rounded bg-[#C7E8CA] border border-[#2D2319] text-[9px] font-mono font-black text-[#2D2319] flex items-center space-x-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>EARNED</span>
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded bg-[#FDF8EE] border border-[#2D2319] text-[9px] font-mono text-[#2D2319]/70 flex items-center space-x-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>{badge.progressPercent}%</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 my-2">
                    <AchievementBadgeIcon badgeId={badge.id} isUnlocked={isUnlocked} size="sm" />
                    <div className="min-w-0">
                      <h4 className="font-black text-xs text-[#2D2319] font-display truncate">
                        {badge.title}
                      </h4>
                      <p className="text-[10px] font-mono text-[#2D2319]/70 truncate">
                        {badge.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#2D2319]/80 font-medium line-clamp-2 leading-relaxed">
                    {badge.requirement}
                  </p>
                </div>

                {/* Progress Bar or XP Stamp */}
                <div className="pt-2 border-t border-[#2D2319]/10">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#48B89F]">
                      <span>+{badge.xp} XP Claimed</span>
                      <span>★ 100%</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono font-bold text-[#2D2319]/70">
                        <span>Progress: {badge.currentValue} / {badge.targetValue}</span>
                        <span>{badge.progressPercent}%</span>
                      </div>
                      <div className="h-2 bg-[#FDF8EE] rounded-full border border-[#2D2319] overflow-hidden flex">
                        <div
                          className="h-full bg-[#F6C445] rounded-full"
                          style={{ width: `${badge.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Achievement Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden animate-in zoom-in-95 duration-150 font-sans">
            
            <div className="bg-[#C3A6E8] text-[#2D2319] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono font-bold text-xs">
              <span className="font-display font-black uppercase">BADGE_INSPECTOR.EXE</span>
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="w-5 h-5 bg-[#F28B82] border border-[#2D2319] rounded flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-center">
              <div className="w-20 h-20 mx-auto">
                <AchievementBadgeIcon badgeId={selectedBadge.id} isUnlocked={selectedBadge.isUnlocked} size="lg" />
              </div>

              <div>
                <h3 className="text-lg font-black font-display text-[#2D2319]">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs font-mono text-[#2D2319]/70">{selectedBadge.subtitle}</p>
                <div className="inline-block mt-1 px-2.5 py-0.5 rounded bg-[#F6C445] border border-[#2D2319] text-[10px] font-mono font-black text-[#2D2319]">
                  +{selectedBadge.xp} XP Reward
                </div>
              </div>

              <p className="text-xs text-[#2D2319]/90 font-medium bg-[#FAF3E0] p-3 rounded-xl border border-[#2D2319]">
                "{selectedBadge.lore}"
              </p>

              <div className="text-xs font-mono text-[#2D2319]/80 space-y-1">
                <div className="font-bold">Requirement:</div>
                <div>{selectedBadge.requirement}</div>
              </div>

              <div className="pt-2 flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedBadge(null)}
                  className="px-4 py-1.5 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                {!selectedBadge.isUnlocked && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBadge(null);
                      handlePracticeCourse(selectedBadge.courseShortcut, selectedBadge.targetLevel);
                    }}
                    className="px-5 py-1.5 bg-[#48B89F] hover:bg-[#3ca089] border-2 border-[#2D2319] rounded-xl text-xs font-black text-white"
                  >
                    Practice Now
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
