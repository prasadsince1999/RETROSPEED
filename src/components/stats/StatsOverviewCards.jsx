import React from 'react';
import { 
  Zap, 
  Target, 
  Keyboard as KeyboardIcon, 
  Clock, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle, 
  XCircle, 
  Award 
} from 'lucide-react';

export function StatsOverviewCards({
  timeRange,
  averageWpm,
  overallAccuracy,
  keyboardCoverage,
  totalPracticeTime,
  totalPracticeTimeHuman,
  totalLessonsPassed,
  totalStars,
  attemptBreakdown
}) {
  const maxBenchmarkWpm = Math.max(60, Math.ceil(((averageWpm || 0) + 10) / 10) * 10);
  const studentPct = Math.min(100, Math.max(14, ((averageWpm || 0) / maxBenchmarkWpm) * 100));
  const avgPct = Math.min(100, Math.max(14, (24 / maxBenchmarkWpm) * 100));
  const proPct = Math.min(100, Math.max(14, (50 / maxBenchmarkWpm) * 100));

  return (
    <div className="space-y-6">
      {/* 1. Core Performance KPI Tiles */}
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
          {/* Average Speed */}
          <div className="bg-[var(--rs-paper)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_var(--rs-shadow)] flex flex-col justify-between select-none transition-colors duration-200">
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

          {/* Typing Accuracy */}
          <div className="bg-[var(--rs-paper)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_var(--rs-shadow)] flex flex-col justify-between select-none transition-colors duration-200">
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

          {/* Keyboard Coverage */}
          <div className="bg-[var(--rs-paper)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_var(--rs-shadow)] flex flex-col justify-between select-none transition-colors duration-200">
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

          {/* Total Practice Time */}
          <div className="bg-[var(--rs-paper)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_var(--rs-shadow)] flex flex-col justify-between select-none transition-colors duration-200">
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

          {/* Total Lessons Passed */}
          <div className="bg-[var(--rs-paper)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_var(--rs-shadow)] flex flex-col justify-between select-none transition-colors duration-200">
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

          {/* Total Stars */}
          <div className="bg-[var(--rs-paper)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_var(--rs-shadow)] flex flex-col justify-between select-none transition-colors duration-200">
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

      {/* 2. Practice Time Breakdown & Comparative Benchmark Bars */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Time Breakdown */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="border-2 border-[#2D2319] bg-[var(--rs-paper)] rounded-xl shadow-[4px_4px_0px_var(--rs-shadow)] p-5 sm:p-6 flex-1 flex flex-col justify-between text-[#2D2319] transition-colors duration-200">
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
                <span className="px-2 py-0.5 rounded bg-[var(--rs-paper-alt)] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                  {attemptBreakdown.totalAttempts} total logs
                </span>
              </div>

              <div className="space-y-4">
                {/* Passed */}
                <div className="bg-[var(--rs-paper-alt)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] transition-colors duration-200">
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
                  <div className="w-full bg-[var(--rs-paper)] border-2 border-[#2D2319] rounded-lg h-3 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                    <div 
                      className="h-full bg-[#10B981] border border-[#2D2319] rounded-[3px] transition-all duration-300"
                      style={{ width: `${attemptBreakdown.passed.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Partial */}
                <div className="bg-[var(--rs-paper-alt)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] transition-colors duration-200">
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
                  <div className="w-full bg-[var(--rs-paper)] border-2 border-[#2D2319] rounded-lg h-3 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                    <div 
                      className="h-full bg-[#F59E0B] border border-[#2D2319] rounded-[3px] transition-all duration-300"
                      style={{ width: `${attemptBreakdown.partial.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Failed */}
                <div className="bg-[var(--rs-paper-alt)] p-3.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] transition-colors duration-200">
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
                  <div className="w-full bg-[var(--rs-paper)] border-2 border-[#2D2319] rounded-lg h-3 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                    <div 
                      className="h-full bg-[#EF4444] border border-[#2D2319] rounded-[3px] transition-all duration-300"
                      style={{ width: `${attemptBreakdown.failed.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t-2 border-[#2D2319]/15 flex items-center justify-between">
              <span className="text-xs font-bold text-[#2D2319]/80 font-mono">Cumulative Practice Time:</span>
              <span className="text-sm font-black text-[#2D2319] font-mono bg-[#F6C445] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                {totalPracticeTime} <span className="text-xs font-bold text-[#2D2319]/80">({totalPracticeTimeHuman})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Benchmark Bars */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="border-2 border-[#2D2319] bg-[var(--rs-paper)] rounded-xl shadow-[4px_4px_0px_var(--rs-shadow)] p-5 sm:p-6 flex-1 flex flex-col justify-between text-[#2D2319] transition-colors duration-200">
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

              <div className="space-y-4 my-2">
                {/* Bar 1: Student */}
                <div className="bg-[var(--rs-paper-alt)] p-3 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] transition-colors duration-200">
                  <div className="flex items-center justify-between text-xs font-black mb-1.5">
                    <span className="flex items-center space-x-1.5 text-[#2D2319]">
                      <Sparkles className="w-4 h-4 text-[#F6C445]" />
                      <span>You (Student Average)</span>
                    </span>
                    <span className="font-mono text-sm text-[#2D2319] font-black bg-[#4BA3E3] px-2 py-0.2 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                      {averageWpm} WPM
                    </span>
                  </div>
                  <div className="w-full bg-[var(--rs-paper)] rounded-xl h-6 p-0.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                    <div 
                      className="h-full rounded-lg bg-[#4BA3E3] border border-[#2D2319] flex items-center justify-end px-2 text-[10px] text-[#2D2319] font-black font-mono transition-all duration-300"
                      style={{ width: `${studentPct}%` }}
                    >
                      {averageWpm} WPM
                    </div>
                  </div>
                </div>

                {/* Bar 2: Benchmark (24 WPM) */}
                <div className="bg-[var(--rs-paper-alt)] p-3 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] transition-colors duration-200">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-[#2D2319]">
                    <span>Average Elementary / Middle School Standard</span>
                    <span className="font-mono font-black text-[#2D2319] bg-[#E2E8F0] px-2 py-0.2 rounded border border-[#2D2319]">
                      24 WPM
                    </span>
                  </div>
                  <div className="w-full bg-[var(--rs-paper)] rounded-xl h-5 p-0.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                    <div 
                      className="h-full rounded-lg bg-[#E2E8F0] border border-[#2D2319] flex items-center justify-end px-2 text-[10px] text-[#2D2319] font-black font-mono transition-all duration-300"
                      style={{ width: `${avgPct}%` }}
                    >
                      24 WPM
                    </div>
                  </div>
                </div>

                {/* Bar 3: Pro Target (50 WPM) */}
                <div className="bg-[var(--rs-paper-alt)] p-3 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] transition-colors duration-200">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-[#2D2319]">
                    <span className="flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5 text-[#F6C445]" />
                      <span>Professional Touch-Typing Target</span>
                    </span>
                    <span className="font-mono font-black text-[#2D2319] bg-[#F6C445] px-2 py-0.2 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                      50 WPM
                    </span>
                  </div>
                  <div className="w-full bg-[var(--rs-paper)] rounded-xl h-5 p-0.5 border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                    <div 
                      className="h-full rounded-lg bg-[#F6C445] border border-[#2D2319] flex items-center justify-end px-2 text-[10px] text-[#2D2319] font-black font-mono transition-all duration-300"
                      style={{ width: `${proPct}%` }}
                    >
                      50 WPM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs text-[#2D2319] font-bold transition-colors duration-200">
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
    </div>
  );
}
