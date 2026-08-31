import React, { useState, useMemo } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Zap, 
  Target, 
  Keyboard as KeyboardIcon, 
  Clock, 
  Award, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Layers, 
  ChevronDown, 
  Play, 
  Sparkles, 
  Compass, 
  Info,
  BookOpen,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  Badge, 
  Button, 
  ProgressBar, 
  Dropdown, 
  DropdownItem, 
  SearchInput 
} from './ui';
import { COURSES_CATALOG } from '../data/courseCatalog';
import { calculateStatsSummary, KEY_FINGER_MAPPING, formatTimeDigital, formatTimeHuman } from '../utils/storage';
import { getKeysForLayout } from '../data/keyboardLayout';
import { sound } from '../utils/audio';

export default function StatsDashboard({ 
  userProgress = {}, 
  activeCourseId = 'keycraft-odyssey', 
  onSelectCourse, 
  onNavigate,
  onStartLesson,
  onPracticeKey,
  onBack
}) {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState(activeCourseId || 'all');
  const [timeRange, setTimeRange] = useState('7days'); // '7days' | '30days' | 'all'
  const [selectedKey, setSelectedKey] = useState('f');
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [tableStatusFilter, setTableStatusFilter] = useState('all');
  const [hoveredChartIndex, setHoveredChartIndex] = useState(null);
  const [showAllAttempts, setShowAllAttempts] = useState(false);

  // Calculate full dynamic analytics summary
  const summary = useMemo(() => {
    return calculateStatsSummary(userProgress, selectedCourseFilter, timeRange);
  }, [userProgress, selectedCourseFilter, timeRange]);

  const {
    overallAccuracy,
    totalPracticeTime,
    totalPracticeTimeHuman,
    averageWpm,
    keyboardCoverage,
    totalLessonsPassed,
    totalStars,
    attemptBreakdown,
    keyAccuracyMap,
    problemKeys,
    recentAttempts,
    chartData
  } = summary;

  // Enrolled & all courses for filter dropdown
  const enrolledIds = userProgress.enrolledCourses || ['keycraft-odyssey', 'syntax-forge', 'global-lexicon', 'curiosity-vault'];
  const enrolledCourses = COURSES_CATALOG.filter(c => enrolledIds.includes(c.id));
  const activeCourseObj = COURSES_CATALOG.find(c => c.id === selectedCourseFilter);

  // Base layout keys for SVG Keyboard Heatmap
  const layoutKeys = useMemo(() => getKeysForLayout('qwerty'), []);

  // Selected key data for inspector panel
  const normalizedSelectedKey = (selectedKey === 'space' || selectedKey === 'Space') ? ' ' : selectedKey;
  const activeKeyData = keyAccuracyMap[normalizedSelectedKey.toLowerCase()] || keyAccuracyMap[selectedKey.toLowerCase()] || {
    key: selectedKey,
    hits: 0,
    misses: 0,
    total: 0,
    accuracy: 100,
    status: 'slate'
  };
  const activeKeyFinger = KEY_FINGER_MAPPING[normalizedSelectedKey.toLowerCase()] || KEY_FINGER_MAPPING[selectedKey.toLowerCase()] || { finger: 'Standard Touch', hand: 'Both' };

  // Filtered recent attempts for Section 7
  const filteredTableAttempts = useMemo(() => {
    return recentAttempts.filter(att => {
      if (tableStatusFilter !== 'all' && att.status !== tableStatusFilter) {
        return false;
      }
      if (!tableSearchQuery.trim()) return true;
      const q = tableSearchQuery.toLowerCase().trim();
      const titleMatch = (att.lessonTitle || '').toLowerCase().includes(q);
      const courseMatch = (att.courseId || '').toLowerCase().includes(q);
      const levelMatch = String(att.lessonId || '').includes(q);
      return titleMatch || courseMatch || levelMatch;
    });
  }, [recentAttempts, tableSearchQuery, tableStatusFilter]);

  const displayedTableAttempts = showAllAttempts ? filteredTableAttempts : filteredTableAttempts.slice(0, 8);

  // Helper to get course title
  const getCourseTitle = (cId) => {
    const found = COURSES_CATALOG.find(c => c.id === cId);
    return found ? found.title.replace('Typing | ', '') : (cId || 'General Practice');
  };

  // Helper to handle practice key shortcut
  const handlePracticeKeyClick = (keyChar) => {
    if (sound && typeof sound.playKeyClick === 'function') {
      sound.playKeyClick();
    }
    if (onPracticeKey) {
      onPracticeKey(keyChar);
    } else if (onNavigate) {
      onNavigate('map');
    }
  };

  // Keyboard tier counts for solid retro heatmap (>95% emerald, 85-94% amber, <85% rose, unpracticed slate)
  const keyTierCounts = useMemo(() => {
    let emerald = 0, amber = 0, rose = 0, slate = 0;
    Object.values(keyAccuracyMap).forEach(k => {
      if (k.status === 'emerald') emerald++;
      else if (k.status === 'amber') amber++;
      else if (k.status === 'rose') rose++;
      else slate++;
    });
    return { emerald, amber, rose, slate };
  }, [keyAccuracyMap]);

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto space-y-5">
      
      {/* SUB-HEADER & FILTER CONTROLS BAR */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Title & Subtitle */}
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#4BA3E3] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-bold shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h1 className="text-xl sm:text-2xl font-black text-[#2D2319] tracking-tight font-display">
                  Performance Diagnostics & Reports
                </h1>
                <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                  LIVE LOGS
                </span>
              </div>
              <p className="text-xs text-[#2D2319]/80 font-medium font-mono mt-0.5">
                Speed diagnostics, accuracy heatmaps, benchmark metrics, and historical attempts.
              </p>
            </div>
          </div>
        </div>

          {/* Right Controls: Course Filter, Time Range & Navigation */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Course Filter Dropdown */}
            <Dropdown
              align="right"
              width="lg"
              trigger={
                <button className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#FBF6EA] border-2 border-[#2D2319] text-xs font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all">
                  <Award className="w-4 h-4 text-[#F6C445] shrink-0" />
                  <span className="truncate max-w-[130px] sm:max-w-[170px]">
                    {selectedCourseFilter === 'all' ? 'All Curricula (Global)' : (activeCourseObj ? activeCourseObj.title : selectedCourseFilter)}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#2D2319] shrink-0" />
                </button>
              }
            >
              {({ close }) => (
                <div className="p-1 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319]">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#2D2319]/60 border-b border-[#2D2319]/20">
                    FILTER SCOPE
                  </div>
                  
                  <DropdownItem
                    selected={selectedCourseFilter === 'all'}
                    onClick={() => {
                      setSelectedCourseFilter('all');
                      close();
                    }}
                    icon={<Layers className="w-4 h-4" />}
                  >
                    All Courses Combined
                  </DropdownItem>

                  <div className="h-px bg-[#2D2319]/20 my-1" />

                  {enrolledCourses.map(course => (
                    <DropdownItem
                      key={course.id}
                      selected={selectedCourseFilter === course.id}
                      onClick={() => {
                        setSelectedCourseFilter(course.id);
                        if (onSelectCourse) onSelectCourse(course.id);
                        close();
                      }}
                      icon={<BookOpen className="w-4 h-4" />}
                    >
                      <span>{course.title}</span>
                    </DropdownItem>
                  ))}
                </div>
              )}
            </Dropdown>

            {/* Time Range Selector Tabs */}
            <div className="bg-[#FBF6EA] p-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-1">
              {[
                { id: '7days', label: '7 Days' },
                { id: '30days', label: '30 Days' },
                { id: 'all', label: 'All Time' }
              ].map(tab => {
                const isActive = timeRange === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
                      setTimeRange(tab.id);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      isActive 
                        ? 'bg-[#4BA3E3] text-[#2D2319] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]' 
                        : 'text-[#2D2319]/80 hover:text-[#2D2319] hover:bg-[#FDF8EE]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Return to Map button */}
            <button
              onClick={() => {
                if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
                if (onNavigate) onNavigate('map');
              }}
              className="px-3 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#FBF6EA] text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all hidden sm:inline-flex items-center space-x-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-[#4BA3E3]" />
              <span>Lessons Map</span>
            </button>

          </div>

        </div>

        {/* DASHBOARD INNER BODY SECTIONS */}
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* SECTION 2: KPI Metric Tiles Grid (Solid Pastel Boxes) */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-mono font-bold text-[#2D2319] uppercase tracking-wider">
                ✦ CORE PERFORMANCE METRICS
              </h2>
              <span className="text-xs font-mono text-[#2D2319]/70 font-bold">
                {timeRange === '7days' ? 'Last 7 Days' : timeRange === '30days' ? 'Last 30 Days' : 'All History'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              
              {/* 1. Average Speed (WPM) */}
              <div className="bg-[#FDF8EE] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between select-none">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase">AVG SPEED</span>
                  <span className="w-7 h-7 rounded-lg bg-[#F6C445] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319]">
                    <Zap className="w-3.5 h-3.5 fill-[#2D2319]" />
                  </span>
                </div>
                <div className="my-2">
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#2D2319]">{averageWpm} <span className="text-xs text-[#2D2319]/70 font-bold">WPM</span></div>
                  <div className="text-[10px] font-mono text-[#2D2319]/70 font-bold">Typing velocity</div>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#2D2319] bg-[#F6C445] px-1.5 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] truncate">
                  {averageWpm >= 24 ? `+${averageWpm - 24} vs benchmark` : 'Target 24 WPM'}
                </div>
              </div>

              {/* 2. Typing Accuracy (%) */}
              <div className="bg-[#FDF8EE] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between select-none">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase">ACCURACY</span>
                  <span className="w-7 h-7 rounded-lg bg-[#10B981] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319]">
                    <Target className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="my-2">
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#10B981]">{overallAccuracy}%</div>
                  <div className="text-[10px] font-mono text-[#2D2319]/70 font-bold">Precision rate</div>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#2D2319] bg-[#10B981] px-1.5 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] truncate">
                  {overallAccuracy >= 95 ? 'Gold standard' : 'Needs focus'}
                </div>
              </div>

              {/* 3. Keyboard Coverage (%) */}
              <div className="bg-[#FDF8EE] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between select-none">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase">COVERAGE</span>
                  <span className="w-7 h-7 rounded-lg bg-[#4BA3E3] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319]">
                    <KeyboardIcon className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="my-2">
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#4BA3E3]">{keyboardCoverage}%</div>
                  <div className="text-[10px] font-mono text-[#2D2319]/70 font-bold">Keys mastered</div>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#2D2319] bg-[#4BA3E3] px-1.5 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] truncate">
                  47-key layout
                </div>
              </div>

              {/* 4. Total Practice Time */}
              <div className="bg-[#FDF8EE] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between select-none">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase">PRACTICE</span>
                  <span className="w-7 h-7 rounded-lg bg-[#C3A6E8] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319]">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="my-2">
                  <div className="text-base sm:text-lg font-black font-mono text-[#2D2319] truncate">{totalPracticeTimeHuman || totalPracticeTime}</div>
                  <div className="text-[10px] font-mono text-[#2D2319]/70 font-bold">Active keystrokes</div>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#2D2319] bg-[#C3A6E8] px-1.5 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] truncate">
                  {totalPracticeTime}
                </div>
              </div>

              {/* 5. Total Lessons Passed */}
              <div className="bg-[#FDF8EE] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between select-none">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase">PASSED</span>
                  <span className="w-7 h-7 rounded-lg bg-[#10B981] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="my-2">
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#2D2319]">{totalLessonsPassed}</div>
                  <div className="text-[10px] font-mono text-[#2D2319]/70 font-bold">{attemptBreakdown.passed.percentage}% success rate</div>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#2D2319] bg-[#10B981] px-1.5 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] truncate">
                  {attemptBreakdown.totalAttempts} attempts
                </div>
              </div>

              {/* 6. Total Stars Earned */}
              <div className="bg-[#FDF8EE] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between select-none">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase">STARS</span>
                  <span className="w-7 h-7 rounded-lg bg-[#F6C445] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319]">
                    <Star className="w-3.5 h-3.5 fill-[#2D2319]" />
                  </span>
                </div>
                <div className="my-2">
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#F59E0B]">★ {totalStars}</div>
                  <div className="text-[10px] font-mono text-[#2D2319]/70 font-bold">XP Masteries</div>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#2D2319] bg-[#F6C445] px-1.5 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] truncate">
                  Level ratings
                </div>
              </div>

            </div>
          </section>


          {/* SECTION 3: Performance Chart (Pure SVG High-Contrast Bar Chart, NO Gradients) */}
          <section>
            <div className="border-2 border-[#2D2319] bg-[#FDF8EE] rounded-xl shadow-[4px_4px_0px_#2D2319] p-5 sm:p-6 text-[#2D2319] overflow-hidden">
              
              {/* Chart Header & Solid Legend */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#2D2319]/15 pb-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base sm:text-lg font-black text-[#2D2319] tracking-tight font-display">
                      Progress Overview Timeline (Dual-Axis Chart)
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                      Interactive
                    </span>
                  </div>
                  <p className="text-xs text-[#2D2319]/70 font-medium mt-0.5 font-mono">
                    Visual correlation between daily practice duration (minutes), average WPM speed, and accuracy curves.
                  </p>
                </div>

                {/* Solid Legend Indicators */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold font-mono">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3.5 h-3.5 rounded-[2px] bg-[#4BA3E3] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] inline-block" />
                    <span className="text-[#2D2319]">Practice Time (min)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3.5 h-1.5 rounded-full bg-[#F6C445] border border-[#2D2319] inline-block" />
                    <span className="text-[#2D2319]">Speed (WPM)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3.5 h-1.5 rounded-full bg-[#10B981] border border-[#2D2319] inline-block" />
                    <span className="text-[#2D2319]">Accuracy (%)</span>
                  </div>
                </div>
              </div>

              {/* Pure SVG Chart Canvas */}
              <div className="relative w-full pt-2">
                
                {/* Floating Retro Hover Tooltip */}
                {hoveredChartIndex !== null && chartData[hoveredChartIndex] && (
                  <div 
                    className="absolute z-20 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full bg-[#FDF8EE] text-[#2D2319] p-3 rounded-xl shadow-[4px_4px_0px_#2D2319] border-2 border-[#2D2319] text-xs font-mono min-w-[180px]"
                    style={{
                      left: `${((hoveredChartIndex + 0.5) / Math.max(1, chartData.length)) * 100}%`,
                      top: '25%'
                    }}
                  >
                    <div className="text-[11px] font-bold text-[#2D2319] bg-[#F6C445] border-b-2 border-[#2D2319] px-2 py-1 -mx-3 -mt-3 rounded-t-[10px] mb-2 flex items-center justify-between">
                      <span>{chartData[hoveredChartIndex].dayName}, {chartData[hoveredChartIndex].date}</span>
                      <span className="px-1.5 py-0.2 bg-[#FDF8EE] rounded border border-[#2D2319] text-[9px] font-bold">
                        {chartData[hoveredChartIndex].attemptsCount} sessions
                      </span>
                    </div>
                    <div className="space-y-1 text-[#2D2319] font-bold">
                      <div className="flex justify-between">
                        <span className="text-[#2D2319]/70">Practice Time:</span>
                        <span className="text-[#4BA3E3] font-black">{chartData[hoveredChartIndex].practiceTimeFormatted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2D2319]/70">Typing Speed:</span>
                        <span className="text-[#F59E0B] font-black">{chartData[hoveredChartIndex].wpm} WPM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2D2319]/70">Accuracy:</span>
                        <span className="text-[#10B981] font-black">{chartData[hoveredChartIndex].accuracy}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Responsive Pure SVG Chart */}
                <div className="w-full h-64 sm:h-72">
                  <svg 
                    viewBox="0 0 800 240" 
                    preserveAspectRatio="none"
                    className="w-full h-full overflow-visible select-none"
                  >
                    {/* Horizontal Grid Guidelines (0, 25, 50, 75, 100) */}
                    {[0, 25, 50, 75, 100].map((pct, idx) => {
                      const y = 200 - (pct / 100) * 160;
                      return (
                        <g key={idx}>
                          <line 
                            x1="45" 
                            y1={y} 
                            x2="755" 
                            y2={y} 
                            stroke="#2D2319" 
                            strokeDasharray={pct === 0 ? "none" : "4,4"} 
                            strokeWidth={pct === 0 ? "1.5" : "1"}
                            opacity={pct === 0 ? 0.8 : 0.2}
                          />
                          {/* Left Y Axis Label (WPM / Acc %) */}
                          <text 
                            x="38" 
                            y={y + 3} 
                            fontSize="9" 
                            fill="#2D2319" 
                            textAnchor="end" 
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {pct}
                          </text>
                          {/* Right Y Axis Label (Practice Time in Minutes) */}
                          <text 
                            x="762" 
                            y={y + 3} 
                            fontSize="9" 
                            fill="#2D2319" 
                            textAnchor="start" 
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {Math.round((pct / 100) * 30)}m
                          </text>
                        </g>
                      );
                    })}

                    {/* Solid Cyan Bars (#4BA3E3) - NO GRADIENTS */}
                    {chartData.map((item, idx) => {
                      const numBars = chartData.length;
                      const slotWidth = 710 / numBars;
                      const barWidth = Math.min(32, slotWidth * 0.45);
                      const x = 45 + idx * slotWidth + (slotWidth - barWidth) / 2;
                      
                      // Practice time mapped to max 30 minutes
                      const barHeight = Math.min(160, Math.max(4, (item.practiceTimeMinutes / 30) * 160));
                      const y = 200 - barHeight;
                      const isHovered = hoveredChartIndex === idx;

                      return (
                        <g 
                          key={`bar_${idx}`}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredChartIndex(idx)}
                          onMouseLeave={() => setHoveredChartIndex(null)}
                        >
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            rx="3"
                            fill={isHovered ? "#3d95d5" : "#4BA3E3"}
                            stroke="#2D2319"
                            strokeWidth="1.5"
                            className="transition-all duration-150"
                          />
                        </g>
                      );
                    })}

                    {/* Solid Amber WPM Trend Line (#F6C445) - NO GRADIENT/GLOW */}
                    {(() => {
                      if (chartData.length < 2) return null;
                      const numBars = chartData.length;
                      const slotWidth = 710 / numBars;
                      
                      const points = chartData.map((d, i) => {
                        const x = 45 + i * slotWidth + slotWidth / 2;
                        const y = 200 - Math.min(160, Math.max(0, (d.wpm / 100) * 160));
                        return { x, y, val: d.wpm };
                      });

                      // Build smooth SVG path
                      let pathD = `M ${points[0].x} ${points[0].y}`;
                      for (let i = 1; i < points.length; i++) {
                        const prev = points[i - 1];
                        const curr = points[i];
                        const cpX1 = prev.x + (curr.x - prev.x) / 2;
                        const cpX2 = cpX1;
                        pathD += ` C ${cpX1} ${prev.y}, ${cpX2} ${curr.y}, ${curr.x} ${curr.y}`;
                      }

                      return (
                        <g>
                          <path
                            d={pathD}
                            fill="none"
                            stroke="#F6C445"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {points.map((p, idx) => (
                            <circle
                              key={`wpm_pt_${idx}`}
                              cx={p.x}
                              cy={p.y}
                              r={hoveredChartIndex === idx ? 6.5 : 4.5}
                              fill="#F6C445"
                              stroke="#2D2319"
                              strokeWidth="2"
                              className="transition-all duration-150 cursor-pointer"
                              onMouseEnter={() => setHoveredChartIndex(idx)}
                              onMouseLeave={() => setHoveredChartIndex(null)}
                            />
                          ))}
                        </g>
                      );
                    })()}

                    {/* Solid Emerald Accuracy Trend Line (#10B981) - NO GRADIENT */}
                    {(() => {
                      if (chartData.length < 2) return null;
                      const numBars = chartData.length;
                      const slotWidth = 710 / numBars;
                      
                      const points = chartData.map((d, i) => {
                        const x = 45 + i * slotWidth + slotWidth / 2;
                        const y = 200 - Math.min(160, Math.max(0, (d.accuracy / 100) * 160));
                        return { x, y, val: d.accuracy };
                      });

                      let pathD = `M ${points[0].x} ${points[0].y}`;
                      for (let i = 1; i < points.length; i++) {
                        const prev = points[i - 1];
                        const curr = points[i];
                        const cpX1 = prev.x + (curr.x - prev.x) / 2;
                        const cpX2 = cpX1;
                        pathD += ` C ${cpX1} ${prev.y}, ${cpX2} ${curr.y}, ${curr.x} ${curr.y}`;
                      }

                      return (
                        <g>
                          <path
                            d={pathD}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2.5"
                            strokeDasharray="5,3"
                            strokeLinecap="round"
                          />
                          {points.map((p, idx) => (
                            <rect
                              key={`acc_pt_${idx}`}
                              x={p.x - (hoveredChartIndex === idx ? 5 : 3.5)}
                              y={p.y - (hoveredChartIndex === idx ? 5 : 3.5)}
                              width={hoveredChartIndex === idx ? 10 : 7}
                              height={hoveredChartIndex === idx ? 10 : 7}
                              transform={`rotate(45 ${p.x} ${p.y})`}
                              fill="#10B981"
                              stroke="#2D2319"
                              strokeWidth="1.5"
                              className="transition-all duration-150 cursor-pointer"
                              onMouseEnter={() => setHoveredChartIndex(idx)}
                              onMouseLeave={() => setHoveredChartIndex(null)}
                            />
                          ))}
                        </g>
                      );
                    })()}

                    {/* Bottom X Axis Days Labels */}
                    {chartData.map((item, idx) => {
                      const numBars = chartData.length;
                      const slotWidth = 710 / numBars;
                      const x = 45 + idx * slotWidth + slotWidth / 2;
                      const isHovered = hoveredChartIndex === idx;

                      return (
                        <text
                          key={`lbl_${idx}`}
                          x={x}
                          y="222"
                          textAnchor="middle"
                          fontSize={numBars > 14 ? "8" : "10"}
                          fontWeight={isHovered ? "900" : "700"}
                          fill="#2D2319"
                          fontFamily="monospace"
                          className="transition-colors duration-150 select-none cursor-pointer"
                          onMouseEnter={() => setHoveredChartIndex(idx)}
                          onMouseLeave={() => setHoveredChartIndex(null)}
                        >
                          {item.date}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                {/* Bottom Chart Footer Explanation */}
                <div className="mt-3 pt-3 border-t-2 border-[#2D2319]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#2D2319] gap-2 font-mono">
                  <span className="flex items-center space-x-1.5">
                    <Info className="w-4 h-4 text-[#4BA3E3] shrink-0" />
                    <span>Hover over any bar or node to inspect granular session details.</span>
                  </span>
                  <span className="font-bold">
                    Total Interval Practice: <span className="bg-[#4BA3E3] text-[#2D2319] px-2 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] font-black">{totalPracticeTime}</span>
                  </span>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 4: Time Breakdown & Benchmark (Solid Horizontal Comparison Bars) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 4A: Time Breakdown (5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="border-2 border-[#2D2319] bg-[#FDF8EE] rounded-xl shadow-[4px_4px_0px_#2D2319] p-5 sm:p-6 flex-1 flex flex-col justify-between text-[#2D2319]">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#2D2319]/15">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-[#10B981] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-bold">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-[#2D2319] font-display">
                          Practice Time Breakdown
                        </h3>
                        <p className="text-[11px] text-[#2D2319]/70 font-mono">Duration by attempt result status</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#FBF6EA] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                      {attemptBreakdown.totalAttempts} total logs
                    </span>
                  </div>

                  {/* Status Breakdown Rows with Solid Bars */}
                  <div className="space-y-4">
                    
                    {/* Passed Attempts */}
                    <div className="bg-[#FBF6EA] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                          <span className="text-xs font-black text-[#2D2319]">Passed Lessons</span>
                          <span className="px-1.5 py-0.2 rounded bg-[#10B981] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                            {attemptBreakdown.passed.count} lessons
                          </span>
                        </div>
                        <span className="text-xs font-mono font-black text-[#2D2319]">
                          {attemptBreakdown.passed.durationFormatted} ({attemptBreakdown.passed.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-lg h-3 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                        <div 
                          className="h-full bg-[#10B981] border border-[#2D2319] rounded-[3px] transition-all duration-300"
                          style={{ width: `${attemptBreakdown.passed.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Partial Attempts */}
                    <div className="bg-[#FBF6EA] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                          <span className="text-xs font-black text-[#2D2319]">Partial Attempts</span>
                          <span className="px-1.5 py-0.2 rounded bg-[#F59E0B] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                            {attemptBreakdown.partial.count} attempts
                          </span>
                        </div>
                        <span className="text-xs font-mono font-black text-[#2D2319]">
                          {attemptBreakdown.partial.durationFormatted} ({attemptBreakdown.partial.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-lg h-3 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                        <div 
                          className="h-full bg-[#F59E0B] border border-[#2D2319] rounded-[3px] transition-all duration-300"
                          style={{ width: `${attemptBreakdown.partial.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Failed Attempts */}
                    <div className="bg-[#FBF6EA] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <XCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                          <span className="text-xs font-black text-[#2D2319]">Failed Attempts</span>
                          <span className="px-1.5 py-0.2 rounded bg-[#EF4444] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                            {attemptBreakdown.failed.count} attempts
                          </span>
                        </div>
                        <span className="text-xs font-mono font-black text-[#2D2319]">
                          {attemptBreakdown.failed.durationFormatted} ({attemptBreakdown.failed.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-lg h-3 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                        <div 
                          className="h-full bg-[#EF4444] border border-[#2D2319] rounded-[3px] transition-all duration-300"
                          style={{ width: `${attemptBreakdown.failed.percentage}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Total Active Duration Summary Box */}
                <div className="mt-5 pt-3 border-t-2 border-[#2D2319]/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2D2319]/80 font-mono">Cumulative Practice Time:</span>
                  <span className="text-sm font-black text-[#2D2319] font-mono bg-[#F6C445] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                    {totalPracticeTime} <span className="text-xs font-bold text-[#2D2319]/80">({totalPracticeTimeHuman})</span>
                  </span>
                </div>

              </div>
            </div>

            {/* 4B: Comparative Benchmark Bars (7 cols - Solid Comparison Bars) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="border-2 border-[#2D2319] bg-[#FDF8EE] rounded-xl shadow-[4px_4px_0px_#2D2319] p-5 sm:p-6 flex-1 flex flex-col justify-between text-[#2D2319]">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#2D2319]/15">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-[#4BA3E3] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-bold">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-[#2D2319] font-display">
                          Typing Speed Benchmark Comparison
                        </h3>
                        <p className="text-[11px] text-[#2D2319]/70 font-mono">Student speed vs national benchmarks</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                      WPM Velocity
                    </span>
                  </div>

                  {/* Solid Horizontal Comparison Bars: "You" vs "Benchmark" vs "Pro Target" */}
                  <div className="space-y-4 my-2">
                    {(() => {
                      const maxBenchmarkWpm = Math.max(60, Math.ceil(((averageWpm || 0) + 10) / 10) * 10);
                      const studentPct = Math.min(100, Math.max(14, ((averageWpm || 0) / maxBenchmarkWpm) * 100));
                      const avgPct = Math.min(100, Math.max(14, (24 / maxBenchmarkWpm) * 100));
                      const proPct = Math.min(100, Math.max(14, (50 / maxBenchmarkWpm) * 100));

                      return (
                        <>
                          {/* Bar 1: Student ("You") - Solid Cyan (#4BA3E3) */}
                          <div className="bg-[#FBF6EA] p-3 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                            <div className="flex items-center justify-between text-xs font-black mb-1.5">
                              <span className="flex items-center space-x-1.5 text-[#2D2319]">
                                <Sparkles className="w-4 h-4 text-[#F6C445]" />
                                <span>You (Student Average)</span>
                              </span>
                              <span className="font-mono text-sm text-[#2D2319] font-black bg-[#4BA3E3] px-2 py-0.2 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                                {averageWpm} WPM
                              </span>
                            </div>
                            <div className="w-full bg-[#FDF8EE] rounded-xl h-6 p-0.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                              <div 
                                className="h-full rounded-lg bg-[#4BA3E3] border border-[#2D2319] flex items-center justify-end px-2 text-[10px] text-[#2D2319] font-black font-mono transition-all duration-300"
                                style={{ width: `${studentPct}%` }}
                              >
                                {averageWpm} WPM
                              </div>
                            </div>
                          </div>

                          {/* Bar 2: Average Benchmark (24 WPM) - Solid Slate (#E2E8F0) */}
                          <div className="bg-[#FBF6EA] p-3 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-[#2D2319]">
                              <span>Average Elementary / Middle School Standard</span>
                              <span className="font-mono font-black text-[#2D2319] bg-[#E2E8F0] px-2 py-0.2 rounded border border-[#2D2319]">
                                24 WPM
                              </span>
                            </div>
                            <div className="w-full bg-[#FDF8EE] rounded-xl h-5 p-0.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                              <div 
                                className="h-full rounded-lg bg-[#E2E8F0] border border-[#2D2319] flex items-center justify-end px-2 text-[10px] text-[#2D2319] font-black font-mono transition-all duration-300"
                                style={{ width: `${avgPct}%` }}
                              >
                                24 WPM
                              </div>
                            </div>
                          </div>

                          {/* Bar 3: Pro Target (50 WPM) - Solid Mustard (#F6C445) */}
                          <div className="bg-[#FBF6EA] p-3 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-[#2D2319]">
                              <span className="flex items-center space-x-1">
                                <Award className="w-3.5 h-3.5 text-[#F6C445]" />
                                <span>Professional Touch-Typing Target</span>
                              </span>
                              <span className="font-mono font-black text-[#2D2319] bg-[#F6C445] px-2 py-0.2 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                                50 WPM
                              </span>
                            </div>
                            <div className="w-full bg-[#FDF8EE] rounded-xl h-5 p-0.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                              <div 
                                className="h-full rounded-lg bg-[#F6C445] border border-[#2D2319] flex items-center justify-end px-2 text-[10px] text-[#2D2319] font-black font-mono transition-all duration-300"
                                style={{ width: `${proPct}%` }}
                              >
                                50 WPM
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}

                  </div>
                </div>

                {/* Motivational Solid Callout */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#FBF6EA] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs text-[#2D2319] font-bold">
                  <Sparkles className="w-5 h-5 text-[#F6C445] shrink-0" />
                  <span>
                    {averageWpm > 24 
                      ? `Outstanding! You are typing ${Math.round(((averageWpm - 24) / 24) * 100)}% faster than the standard student benchmark.`
                      : averageWpm === 24
                      ? `Great job! You have matched the standard student benchmark of 24 WPM.`
                      : `Keep practicing! You are currently ${Math.max(0, 24 - averageWpm)} WPM away from the standard student benchmark.`}
                  </span>
                </div>

              </div>
            </div>

          </section>

          {/* SECTION 5: Keyboard Heatmap (Solid Color Keys: Emerald #10B981, Amber #F59E0B, Rose #EF4444, Slate #E2E8F0) */}
          <section>
            <div className="border-2 border-[#2D2319] bg-[#FDF8EE] rounded-xl shadow-[4px_4px_0px_#2D2319] p-5 sm:p-6 text-[#2D2319]">
              
              {/* Section Header with Solid Tiers Legend */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#2D2319]/15 pb-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base sm:text-lg font-black text-[#2D2319] tracking-tight font-display">
                      Interactive Keyboard Accuracy Heatmap
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#10B981] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                      Click Any Key
                    </span>
                  </div>
                  <p className="text-xs text-[#2D2319]/70 mt-0.5 font-mono">
                    Solid color diagnostic keycaps across desktop keyboard layout. Hover or click to inspect hit/miss metrics.
                  </p>
                </div>

                {/* Solid Heatmap Legend Tiers */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold font-mono">
                  <div className="flex items-center space-x-1.5 bg-[#10B981] text-[#2D2319] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D2319]" />
                    <span>&gt;95% Mastered ({keyTierCounts.emerald})</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-[#F59E0B] text-[#2D2319] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D2319]" />
                    <span>85-94% Good ({keyTierCounts.amber})</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-[#EF4444] text-[#2D2319] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D2319]" />
                    <span>&lt;85% Needs Work ({keyTierCounts.rose})</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-[#E2E8F0] text-[#2D2319] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D2319]" />
                    <span>Unpracticed ({keyTierCounts.slate})</span>
                  </div>
                </div>
              </div>

              {/* Heatmap Interactive Keyboard + Key Diagnostic Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Keyboard SVG Canvas Chassis (9 cols) */}
                <div className="lg:col-span-9 bg-[#2D2319] p-4 sm:p-5 rounded-2xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]">
                  <svg 
                    viewBox="0 0 683.3 254" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto select-none"
                  >
                    <g id="heatmap-keys">
                      {layoutKeys.map(key => {
                        const rawChar = (key.label || key.id || '').toLowerCase();
                        const keyChar = (key.id === 'space' || rawChar === 'space') ? ' ' : rawChar;
                        const stat = keyAccuracyMap[keyChar] || keyAccuracyMap[key.id];
                        const isSelected = normalizedSelectedKey.toLowerCase() === keyChar || 
                                           selectedKey.toLowerCase() === rawChar || 
                                           selectedKey.toLowerCase() === key.id;

                        // Determine solid fill color based on tier
                        let fill = '#E2E8F0'; // Solid Slate (unpracticed)
                        let stroke = '#2D2319';
                        let textFill = '#2D2319';

                        if (stat && stat.total > 0) {
                          if (stat.accuracy >= 95) {
                            fill = '#10B981'; // Solid Emerald
                            stroke = '#2D2319';
                            textFill = '#2D2319';
                          } else if (stat.accuracy >= 85) {
                            fill = '#F59E0B'; // Solid Amber
                            stroke = '#2D2319';
                            textFill = '#2D2319';
                          } else {
                            fill = '#EF4444'; // Solid Rose
                            stroke = '#2D2319';
                            textFill = '#2D2319';
                          }
                        }

                        return (
                          <g 
                            key={key.id}
                            className="cursor-pointer group"
                            onClick={() => {
                              if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
                              setSelectedKey(key.id === 'space' ? ' ' : (key.label || key.id));
                            }}
                          >
                            {/* Selected Active Border Highlight */}
                            {isSelected && (
                              <path
                                d={key.d}
                                fill="none"
                                stroke="#F6C445"
                                strokeWidth="4"
                                opacity="1"
                              />
                            )}

                            {/* Solid Keycap Body */}
                            <path
                              d={key.d}
                              fill={fill}
                              stroke={isSelected ? '#F6C445' : stroke}
                              strokeWidth={isSelected ? '2.5' : '1.5'}
                              className="transition-all duration-100 group-hover:opacity-90"
                              style={{
                                transform: isSelected ? 'translateY(-2px)' : 'none',
                                transformOrigin: `${key.cx}px ${key.cy}px`
                              }}
                            />

                            {/* Tactile Home Row Bumps (F and J) */}
                            {key.isHomeKey && (
                              <line
                                x1={key.cx - 6}
                                y1={key.cy + 10}
                                x2={key.cx + 6}
                                y2={key.cy + 10}
                                stroke="#2D2319"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            )}

                            {/* Key Label Text */}
                            <text
                              x={key.cx}
                              y={key.cy + (key.id === 'space' ? 4 : 5)}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize={key.id === 'space' || key.id === 'shift-left' || key.id === 'shift-right' || key.id === 'capslock' || key.id === 'tab' || key.id === 'enter' || key.id === 'backspace' ? "10" : "13"}
                              fontWeight="900"
                              fontFamily="monospace"
                              fill={textFill}
                              className="pointer-events-none select-none"
                            >
                              {key.label || key.id}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  </svg>
                </div>

                {/* Key Diagnostic Inspector Panel (3 cols) */}
                <div className="lg:col-span-3 h-full">
                  <div className="border-2 border-[#2D2319] bg-[#FBF6EA] rounded-xl p-5 shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between h-full text-[#2D2319]">
                    <div>
                      <div className="flex items-center justify-between border-b-2 border-[#2D2319]/15 pb-3 mb-3">
                        <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                          Key Diagnostic
                        </span>
                        <span className="text-[10px] uppercase font-bold text-[#2D2319] font-mono">
                          {activeKeyFinger.hand} Hand
                        </span>
                      </div>

                      {/* Key Preview Box with Solid Tier Background */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black font-mono border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] text-[#2D2319] ${
                          activeKeyData.status === 'emerald'
                            ? 'bg-[#10B981]'
                            : activeKeyData.status === 'amber'
                            ? 'bg-[#F59E0B]'
                            : activeKeyData.status === 'rose'
                            ? 'bg-[#EF4444]'
                            : 'bg-[#E2E8F0]'
                        }`}>
                          {selectedKey === ' ' ? '␣' : selectedKey.toUpperCase()}
                        </div>

                        <div>
                          <div className="text-xl font-black text-[#2D2319] font-display">
                            Key "{selectedKey === ' ' ? 'Space' : selectedKey.toUpperCase()}"
                          </div>
                          <div className="text-xs font-bold text-[#2D2319]/70 font-mono mt-0.5">
                            {activeKeyFinger.finger}
                          </div>
                        </div>
                      </div>

                      {/* Metrics Breakdown in Solid Boxes */}
                      <div className="space-y-2 text-xs font-bold font-mono">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-[#FDF8EE] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                          <span className="text-[#2D2319]/80">Accuracy:</span>
                          <span className="font-black text-[#2D2319]">
                            {activeKeyData.total > 0 ? `${activeKeyData.accuracy}%` : 'Unpracticed'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-[#FDF8EE] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                          <span className="text-[#2D2319]/80">Correct Hits:</span>
                          <span className="font-black text-[#10B981]">
                            {activeKeyData.hits} hits
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-[#FDF8EE] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                          <span className="text-[#2D2319]/80">Errors / Typos:</span>
                          <span className={`font-black ${activeKeyData.misses > 0 ? 'text-[#EF4444]' : 'text-[#2D2319]/50'}`}>
                            {activeKeyData.misses} misses
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Direct Practice Key Button */}
                    <div className="mt-5 pt-3 border-t-2 border-[#2D2319]/15">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => handlePracticeKeyClick(selectedKey)}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        className="font-black"
                      >
                        Practice Key "{selectedKey === ' ' ? 'Space' : selectedKey.toUpperCase()}"
                      </Button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 6: Problem Keys Grid (Solid Mistyped Keys & Practice Button) */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
                <h2 className="text-xs font-mono font-bold text-[#2D2319] uppercase tracking-wider">
                  Top Problem Keys & Targeted Remediation
                </h2>
              </div>
              <span className="text-xs font-mono text-[#2D2319]/70 font-bold">Keys with highest mistype frequency</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {problemKeys.length > 0 ? (
                problemKeys.map((item, idx) => (
                  <div 
                    key={item.key} 
                    className="border-2 border-[#2D2319] bg-[#FDF8EE] hover:bg-[#FBF6EA] rounded-xl p-5 shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between transition-all duration-150 cursor-pointer text-[#2D2319]"
                    onClick={() => {
                      if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
                      setSelectedKey(item.key);
                    }}
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-[#EF4444] text-[#2D2319] font-mono font-black text-xl flex items-center justify-center border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                            {item.label}
                          </div>
                          <div>
                            <div className="font-black text-[#2D2319] text-base font-display">
                              Key "{item.label}"
                            </div>
                            <div className="text-[11px] text-[#2D2319]/70 font-bold font-mono">
                              {item.finger}
                            </div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded bg-[#EF4444] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                          #{idx + 1} Issue
                        </span>
                      </div>

                      {/* Error Stats */}
                      <div className="mt-4 pt-3 border-t-2 border-[#2D2319]/15 space-y-2 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#2D2319]/80 font-bold">Error Rate:</span>
                          <span className="font-black text-[#EF4444]">{item.errorRate}%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-[#2D2319]/80 font-bold">Misses vs Hits:</span>
                          <span className="font-bold text-[#2D2319]">
                            <span className="text-[#EF4444] font-black">{item.misses}</span> / {item.hits}
                          </span>
                        </div>

                        <div className="w-full bg-[#FBF6EA] border-2 border-[#2D2319] rounded-lg h-2.5 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                          <div
                            className="h-full bg-[#EF4444] border border-[#2D2319] rounded-[2px]"
                            style={{ width: `${Math.min(100, Math.max(10, item.errorRate * 3))}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Direct Practice Button */}
                    <div className="mt-5 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePracticeKeyClick(item.key);
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-[#F28B82] hover:bg-[#e47970] text-[#2D2319] font-black font-display text-xs border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                      >
                        Practice Key "{item.label}"
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center bg-[#FDF8EE] rounded-2xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] text-[#2D2319]">
                  <CheckCircle2 className="w-8 h-8 text-[#10B981] mx-auto mb-2" />
                  <p className="text-sm font-black text-[#2D2319]">No major problem keys detected!</p>
                  <p className="text-xs text-[#2D2319]/70 font-mono mt-0.5">Your accuracy across all keys is above standard thresholds.</p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 7: Recent Attempt Log Table with Solid Status Stamps */}
          <section>
            <div className="border-2 border-[#2D2319] bg-[#FDF8EE] rounded-xl shadow-[4px_4px_0px_#2D2319] overflow-hidden text-[#2D2319]">
              
              {/* Table Header & Search Controls */}
              <div className="p-4 sm:p-6 border-b-2 border-[#2D2319] bg-[#FBF6EA] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base sm:text-lg font-black text-[#2D2319] tracking-tight font-display">
                      Recent Lesson Attempts & Activity Log
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                      {filteredTableAttempts.length} Records
                    </span>
                  </div>
                  <p className="text-xs text-[#2D2319]/70 font-mono mt-0.5">
                    Detailed ledger of all typing drills, speed assessments, and mini-game completions.
                  </p>
                </div>

                {/* Table Search & Status Filter Pills */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="w-48 sm:w-56">
                    <SearchInput
                      value={tableSearchQuery}
                      onChange={e => setTableSearchQuery(e.target.value)}
                      onClear={() => setTableSearchQuery('')}
                      placeholder="Search attempts..."
                      size="sm"
                    />
                  </div>

                  <div className="bg-[#FDF8EE] p-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center text-xs font-mono font-bold space-x-1">
                    {['all', 'passed', 'partial', 'failed'].map(st => (
                      <button
                        key={st}
                        onClick={() => {
                          if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
                          setTableStatusFilter(st);
                        }}
                        className={`px-2.5 py-0.5 rounded capitalize transition-all ${
                          tableStatusFilter === st 
                            ? 'bg-[#4BA3E3] text-[#2D2319] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]' 
                            : 'text-[#2D2319]/70 hover:text-[#2D2319]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Table with Solid Status Stamps */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-medium">
                  <thead className="bg-[#F6C445] text-[#2D2319] uppercase tracking-wider font-display text-xs border-b-2 border-[#2D2319] font-black select-none">
                    <tr>
                      <th className="py-3 px-4 sm:px-6">Date & Time</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Lesson / Title</th>
                      <th className="py-3 px-4 text-right">Speed</th>
                      <th className="py-3 px-4 text-right">Accuracy</th>
                      <th className="py-3 px-4 text-center">Stars</th>
                      <th className="py-3 px-4 text-right">Duration</th>
                      <th className="py-3 px-4 sm:px-6 text-center">Result</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y-2 divide-[#2D2319]/10">
                    {displayedTableAttempts.length > 0 ? (
                      displayedTableAttempts.map((att, idx) => {
                        const dateObj = new Date(att.timestamp || Date.now());
                        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                        const isPassed = att.status === 'passed';
                        const isPartial = att.status === 'partial';

                        return (
                          <tr key={att.id || idx} className="hover:bg-[#FBF6EA] transition-colors font-mono">
                            
                            {/* Date & Time */}
                            <td className="py-3 px-4 sm:px-6 text-[#2D2319] whitespace-nowrap">
                              <div className="font-bold">{formattedDate}</div>
                              <div className="text-[10px] text-[#2D2319]/70">{formattedTime}</div>
                            </td>

                            {/* Course */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-[#2D2319] text-[11px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                                {getCourseTitle(att.courseId)}
                              </span>
                            </td>

                            {/* Lesson Title */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="font-bold text-[#2D2319] font-sans">
                                {att.lessonTitle || `Lesson ${att.lessonId}`}
                              </div>
                              <div className="text-[10px] text-[#2D2319]/70">ID: #{att.lessonId}</div>
                            </td>

                            {/* Speed (WPM) */}
                            <td className="py-3 px-4 text-right font-black text-[#2D2319] whitespace-nowrap">
                              <span className="inline-flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] inline" />
                                <span>{att.wpm} <span className="text-[10px] text-[#2D2319]/70 font-normal">WPM</span></span>
                              </span>
                            </td>

                            {/* Accuracy */}
                            <td className="py-3 px-4 text-right font-black whitespace-nowrap">
                              <span className={att.accuracy >= 95 ? 'text-[#10B981]' : att.accuracy >= 85 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}>
                                {att.accuracy}%
                              </span>
                            </td>

                            {/* Stars */}
                            <td className="py-3 px-4 text-center whitespace-nowrap">
                              <span className="text-[#F59E0B] font-black tracking-widest text-xs">
                                {'★'.repeat(Math.min(5, Math.max(1, att.stars || 5)))}
                              </span>
                            </td>

                            {/* Duration */}
                            <td className="py-3 px-4 text-right text-[#2D2319] whitespace-nowrap font-bold">
                              {formatTimeDigital(att.durationSeconds || att.time || 15)}
                            </td>

                            {/* Result Badge (Solid Status Stamp) */}
                            <td className="py-3 px-4 sm:px-6 text-center whitespace-nowrap">
                              {isPassed ? (
                                <span className="px-2 py-0.5 rounded bg-[#10B981] text-[#2D2319] font-display font-black text-[10px] uppercase border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D2319]" />
                                  Passed
                                </span>
                              ) : isPartial ? (
                                <span className="px-2 py-0.5 rounded bg-[#F59E0B] text-[#2D2319] font-display font-black text-[10px] uppercase border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D2319]" />
                                  Partial
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-[#EF4444] text-[#2D2319] font-display font-black text-[10px] uppercase border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D2319]" />
                                  Failed
                                </span>
                              )}
                            </td>

                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-[#2D2319]/70 font-bold font-mono">
                          No attempt records match your active search filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Actions */}
              {filteredTableAttempts.length > 8 && (
                <div className="p-4 bg-[#FBF6EA] border-t-2 border-[#2D2319] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#2D2319]/80 font-bold">
                    Showing {displayedTableAttempts.length} of {filteredTableAttempts.length} lesson attempts
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
                      setShowAllAttempts(!showAllAttempts);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FDF8EE] hover:bg-[#FBF6EA] text-[#2D2319] font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    {showAllAttempts ? 'Show Less' : `View All ${filteredTableAttempts.length} Records`}
                  </button>
                </div>
              )}

            </div>
          </section>
        </div>
    </div>
  );
}
