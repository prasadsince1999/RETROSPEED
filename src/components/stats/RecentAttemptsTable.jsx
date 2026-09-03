import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { SearchInput } from '../ui';
import { formatTimeDigital } from '../../utils/storage';
import { sound } from '../../utils/audio';

export function RecentAttemptsTable({
  filteredTableAttempts,
  tableSearchQuery,
  tableStatusFilter,
  onSearchChange,
  onClearSearch,
  onStatusFilterChange,
  getCourseTitle
}) {
  const [showAllAttempts, setShowAllAttempts] = useState(false);
  const displayedTableAttempts = showAllAttempts ? filteredTableAttempts : filteredTableAttempts.slice(0, 8);

  return (
    <section>
      <div className="border-2 border-[#2D2319] bg-[var(--rs-paper)] rounded-xl shadow-[4px_4px_0px_var(--rs-shadow)] overflow-hidden text-[#2D2319] transition-colors duration-200">
        {/* Table Header & Search Controls */}
        <div className="p-4 sm:p-6 border-b-2 border-[#2D2319] bg-[var(--rs-paper-alt)] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200">
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

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-48 sm:w-56">
              <SearchInput
                value={tableSearchQuery}
                onChange={onSearchChange}
                onClear={onClearSearch}
                placeholder="Search attempts..."
                size="sm"
              />
            </div>

            <div className="bg-[var(--rs-paper)] p-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center text-xs font-mono font-bold space-x-1">
              {['all', 'passed', 'partial', 'failed'].map(st => (
                <button
                  key={st}
                  onClick={() => {
                    sound.playKeyClick();
                    onStatusFilterChange(st);
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
                      <td className="py-3 px-4 sm:px-6 text-[#2D2319] whitespace-nowrap">
                        <div className="font-bold">{formattedDate}</div>
                        <div className="text-[10px] text-[#2D2319]/70">{formattedTime}</div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-[#2D2319] text-[11px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                          {getCourseTitle(att.courseId)}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-bold text-[#2D2319] font-sans">
                          {att.lessonTitle || `Lesson ${att.lessonId}`}
                        </div>
                        <div className="text-[10px] text-[#2D2319]/70">ID: #{att.lessonId}</div>
                      </td>

                      <td className="py-3 px-4 text-right font-black text-[#2D2319] whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] inline" />
                          <span>{att.wpm} <span className="text-[10px] text-[#2D2319]/70 font-normal">WPM</span></span>
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-black whitespace-nowrap">
                        <span className={att.accuracy >= 95 ? 'text-[#10B981]' : att.accuracy >= 85 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}>
                          {att.accuracy}%
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="text-[#F59E0B] font-black tracking-widest text-xs">
                          {'★'.repeat(Math.min(5, Math.max(1, att.stars || 5)))}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right text-[#2D2319] whitespace-nowrap font-bold">
                        {formatTimeDigital(att.durationSeconds || att.time || 15)}
                      </td>

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
                sound.playKeyClick();
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
  );
}
