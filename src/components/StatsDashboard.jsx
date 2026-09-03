import React, { useState, useMemo } from 'react';
import { 
  BarChart2, 
  Award, 
  Layers, 
  ChevronDown, 
  Compass, 
  BookOpen 
} from 'lucide-react';
import { 
  Dropdown, 
  DropdownItem 
} from './ui';
import { COURSES_CATALOG } from '../data/courseCatalog';
import { calculateStatsSummary, KEY_FINGER_MAPPING } from '../utils/storage';
import { getKeysForLayout } from '../data/keyboardLayout';
import { sound } from '../utils/audio';
import BadgesDashboard from './BadgesDashboard';
import {
  StatsOverviewCards,
  StatsPerformanceChart,
  KeyboardHeatmap,
  ProblemKeysAnalysis,
  RecentAttemptsTable
} from './stats';

export default function StatsDashboard({ 
  userProgress = {}, 
  activeCourseId = 'keystroke-foundations', 
  defaultTab = 'telemetry',
  onSelectCourse, 
  onNavigate,
  onStartLesson,
  onPracticeKey,
  onBack
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState(activeCourseId || 'all');
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedKey, setSelectedKey] = useState('f');
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [tableStatusFilter, setTableStatusFilter] = useState('all');

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

  const enrolledIds = userProgress.enrolledCourses || ['keystroke-foundations', 'retrospeed-odyssey', 'syntax-forge', 'global-lexicon', 'curiosity-vault'];
  const enrolledCourses = COURSES_CATALOG.filter(c => enrolledIds.includes(c.id));
  const activeCourseObj = COURSES_CATALOG.find(c => c.id === selectedCourseFilter);

  const layoutKeys = useMemo(() => getKeysForLayout('qwerty'), []);

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

  const getCourseTitle = (cId) => {
    const found = COURSES_CATALOG.find(c => c.id === cId);
    return found ? found.title.replace('Typing | ', '') : (cId || 'General Practice');
  };

  const handlePracticeKeyClick = (keyChar) => {
    sound.playKeyClick();
    if (onPracticeKey) {
      onPracticeKey(keyChar);
    } else if (onNavigate) {
      onNavigate('map');
    }
  };

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
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[var(--rs-paper)] p-4 sm:p-6 overflow-y-auto space-y-5 transition-colors duration-200">
      {/* Top Tab Selector */}
      <div className="bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] rounded-2xl p-2.5 sm:p-3 shadow-[4px_4px_0px_var(--rs-shadow)] flex flex-wrap items-center justify-between gap-3 transition-colors duration-200">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setActiveTab('telemetry');
            }}
            className={`px-3.5 py-1.5 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-[#F6C445] shadow-[3px_3px_0px_#2D2319] translate-x-0.5 translate-y-0.5'
                : 'bg-[var(--rs-paper)] hover:bg-white shadow-[2px_2px_0px_#2D2319]'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Performance Diagnostics</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setActiveTab('trophies');
            }}
            className={`px-3.5 py-1.5 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'trophies'
                ? 'bg-[#F6C445] shadow-[3px_3px_0px_#2D2319] translate-x-0.5 translate-y-0.5'
                : 'bg-[var(--rs-paper)] hover:bg-white shadow-[2px_2px_0px_#2D2319]'
            }`}
          >
            <Award className="w-4 h-4 text-[#2D2319]" />
            <span>Trophy Cabinet (24 Badges)</span>
          </button>
        </div>

        <div className="text-[11px] font-mono font-bold text-[#2D2319]/70 pr-2 hidden sm:block">
          {activeTab === 'telemetry' ? 'Real-time Keystroke Telemetry' : 'Milestones & Achievement Trophies'}
        </div>
      </div>

      <div key={activeTab} className="tab-content-animate flex-1 flex flex-col justify-between">
        {activeTab === 'trophies' ? (
          <BadgesDashboard
            userProgress={userProgress}
            onNavigate={onNavigate}
            onSelectCourse={onSelectCourse}
            onBack={() => setActiveTab('telemetry')}
          />
        ) : (
          <div className="space-y-5">
            {/* Header Controls Bar */}
            <div className="bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_var(--rs-shadow)] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200">
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

              <div className="flex flex-wrap items-center gap-2.5">
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

                <div className="bg-[#FBF6EA] p-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-1">
                  {[
                    { id: '7days', label: '7 Days' },
                    { id: '30days', label: '30 Days' },
                    { id: 'all', label: 'All Time' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        sound.playKeyClick();
                        setTimeRange(tab.id);
                      }}
                      className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                        timeRange === tab.id 
                          ? 'bg-[#4BA3E3] text-[#2D2319] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]' 
                          : 'text-[#2D2319]/80 hover:text-[#2D2319] hover:bg-[#FDF8EE]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    sound.playKeyClick();
                    if (onNavigate) onNavigate('map');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#FBF6EA] text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all hidden sm:inline-flex items-center space-x-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#4BA3E3]" />
                  <span>Lessons Map</span>
                </button>
              </div>
            </div>

            {/* Dashboard Sections */}
            <div className="p-4 sm:p-6 space-y-6">
              <StatsOverviewCards
                timeRange={timeRange}
                averageWpm={averageWpm}
                overallAccuracy={overallAccuracy}
                keyboardCoverage={keyboardCoverage}
                totalPracticeTime={totalPracticeTime}
                totalPracticeTimeHuman={totalPracticeTimeHuman}
                totalLessonsPassed={totalLessonsPassed}
                totalStars={totalStars}
                attemptBreakdown={attemptBreakdown}
              />

              <StatsPerformanceChart
                chartData={chartData}
                totalPracticeTime={totalPracticeTime}
              />

              <KeyboardHeatmap
                layoutKeys={layoutKeys}
                keyAccuracyMap={keyAccuracyMap}
                keyTierCounts={keyTierCounts}
                selectedKey={selectedKey}
                normalizedSelectedKey={normalizedSelectedKey}
                activeKeyData={activeKeyData}
                activeKeyFinger={activeKeyFinger}
                onSelectKey={setSelectedKey}
                onPracticeKey={handlePracticeKeyClick}
              />

              <ProblemKeysAnalysis
                problemKeys={problemKeys}
                onSelectKey={setSelectedKey}
                onPracticeKey={handlePracticeKeyClick}
              />

              <RecentAttemptsTable
                filteredTableAttempts={filteredTableAttempts}
                tableSearchQuery={tableSearchQuery}
                tableStatusFilter={tableStatusFilter}
                onSearchChange={e => setTableSearchQuery(e.target.value)}
                onClearSearch={() => setTableSearchQuery('')}
                onStatusFilterChange={setTableStatusFilter}
                getCourseTitle={getCourseTitle}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
