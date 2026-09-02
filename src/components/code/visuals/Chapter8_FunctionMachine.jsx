import React, { useState } from 'react';
import RetroVisualFrame from './RetroVisualFrame';
import { ArrowRight, Cpu, CheckCircle2, ShieldAlert, Sparkles, Database, Mail, Terminal, Shuffle, Filter, GitMerge, FileCode } from 'lucide-react';

export default function Chapter8_FunctionMachine() {
  const [activeArchetype, setActiveArchetype] = useState('transformation');

  const frames = [
    {
      title: "Why Functions? Modularity vs Monolith",
      subtitle: "Page 149-152: Transforming Fragile Scripts into Scalable Systems",
      caption: "A single 500-line script creates cascading bugs (Bug #203) whenever business rules change. Functions break big problems into small, tested, reusable blocks that team members can build in parallel.",
      render: () => (
        <div className="grid grid-cols-2 gap-3 w-full py-1 font-mono text-xs">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-3 rounded-xl shadow-[2px_2px_0px_#2D2319]">
            <div className="flex items-center gap-1.5 text-rose-600 font-black mb-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>One Big Script (Fragile)</span>
            </div>
            <ul className="text-[10px] space-y-1 text-gray-700 list-disc list-inside">
              <li>Duplicated logic copied everywhere</li>
              <li>Changing 1 line breaks 10 others</li>
              <li>Outdated legacy snippets</li>
              <li>Hard to test & collaborate</li>
            </ul>
          </div>
          <div className="bg-[#C7E8CA] border-2 border-[#2D2319] p-3 rounded-xl shadow-[3px_3px_0px_#2D2319]">
            <div className="flex items-center gap-1.5 text-emerald-800 font-black mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Modular Functions (Clean)</span>
            </div>
            <ul className="text-[10px] space-y-1 text-gray-800 list-disc list-inside">
              <li>1 Responsibility per function</li>
              <li>Update logic in 1 central place</li>
              <li>Reusable across files & pipelines</li>
              <li>Isolated, testable components</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "4 Sources of Python Functions",
      subtitle: "Page 153-155: Built-in, Standard Library, External & User-Defined",
      caption: "Golden Rule: Always check Built-in → Standard Lib → Community Packages (PyPI) before writing your own custom def!",
      render: () => (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full py-1 font-mono text-xs text-center">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2 rounded-xl shadow-[2px_2px_0px_#2D2319]">
            <div className="font-black text-[#48B89F]">1. Built-In</div>
            <div className="text-[10px] text-gray-600 mt-1">print(), len(), sum(), max()</div>
            <div className="text-[9px] text-emerald-700 font-bold mt-1">Zero Import Needed</div>
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2 rounded-xl shadow-[2px_2px_0px_#2D2319]">
            <div className="font-black text-[#4BA3E3]">2. Standard Lib</div>
            <div className="text-[10px] text-gray-600 mt-1">math, random, datetime</div>
            <div className="text-[9px] text-sky-700 font-bold mt-1">import module</div>
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2 rounded-xl shadow-[2px_2px_0px_#2D2319]">
            <div className="font-black text-[#F6C445]">3. External (PyPI)</div>
            <div className="text-[10px] text-gray-600 mt-1">pandas, requests, numpy</div>
            <div className="text-[9px] text-amber-700 font-bold mt-1">pip install package</div>
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2 rounded-xl shadow-[2px_2px_0px_#2D2319]">
            <div className="font-black text-[#F28B82]">4. User-Defined</div>
            <div className="text-[10px] text-gray-600 mt-1">def calculate_tax():</div>
            <div className="text-[9px] text-rose-700 font-bold mt-1">Custom Business Logic</div>
          </div>
        </div>
      )
    },
    {
      title: "Function Execution & Scope Lifetime",
      subtitle: "Page 157, 164-166: Global Memory vs Local Stack Allocation",
      caption: "Defining `def` stores the blueprint in RAM. Calling `func()` allocates a local execution scope with parameters and local variables, which is destroyed upon `return`.",
      render: () => (
        <div className="w-full py-1 space-y-2 font-mono text-xs">
          <div className="bg-[#2D2319] text-[#FAF3E0] p-3 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-[#F6C445] font-bold">global_rate = 1.2</div>
              <div className="text-gray-400">def calculate(price):</div>
              <div className="text-gray-400 pl-4">tax = price * global_rate</div>
              <div className="text-gray-400 pl-4">return tax</div>
            </div>
            <div className="bg-[#FAF3E0] text-[#2D2319] p-2.5 rounded-lg border-2 border-amber-400 text-right space-y-1">
              <div className="text-[10px] font-bold text-amber-700">GLOBAL: global_rate (Lives forever)</div>
              <div className="text-[10px] font-bold text-emerald-700">LOCAL: price, tax (Lives during call only!)</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Parameter Flexibility: *args & **kwargs",
      subtitle: "Page 168-171: Positional, Keyword, Default, and Dynamic Collectors",
      caption: "*args collects dynamic positional arguments into a Tuple. **kwargs collects keyword arguments into a Dictionary.",
      render: () => (
        <div className="grid grid-cols-2 gap-2 w-full py-1 font-mono text-xs">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl shadow-[2px_2px_0px_#2D2319]">
            <span className="font-black text-[#4BA3E3]">def total(*args):</span>
            <div className="text-[10px] text-gray-700 mt-1">total(1, 2, 3)</div>
            <div className="bg-[#C7E8CA] p-1.5 rounded mt-2 text-[10px] border border-[#2D2319] font-bold">
              args = (1, 2, 3) [Tuple]
            </div>
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl shadow-[2px_2px_0px_#2D2319]">
            <span className="font-black text-[#F28B82]">def user_profile(**kwargs):</span>
            <div className="text-[10px] text-gray-700 mt-1">user_profile(name='Max', age=31)</div>
            <div className="bg-[#C7E8CA] p-1.5 rounded mt-2 text-[10px] border border-[#2D2319] font-bold">
              kwargs = {'{name: "Max", age: 31}'} [Dict]
            </div>
          </div>
        </div>
      )
    },
    {
      title: "print() vs return",
      subtitle: "Page 173: Human Visual Output vs Programmatic Pipeline Data",
      caption: "print() only writes ink on the human's terminal screen and returns None. return sends computational values back into variables for pipelines.",
      render: () => (
        <div className="grid grid-cols-2 gap-3 w-full py-1 font-mono text-xs">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <div className="font-black text-amber-600">print(x + y)</div>
            <div className="text-[10px] text-gray-700 mt-1">Displays on screen</div>
            <div className="text-[9px] text-rose-600 font-bold mt-1">Returns None (Cannot be saved in variable!)</div>
          </div>
          <div className="bg-[#C7E8CA] border-2 border-[#2D2319] p-2.5 rounded-xl text-center shadow-[3px_3px_0px_#2D2319]">
            <div className="font-black text-emerald-800">return x + y</div>
            <div className="text-[10px] text-gray-800 mt-1">Passes value back to caller</div>
            <div className="text-[9px] text-emerald-700 font-bold mt-1">result = add(2, 3) (Can chain & compute!)</div>
          </div>
        </div>
      )
    },
    {
      title: "The 4 Function Archetypes by Purpose",
      subtitle: "Page 174-180: Action, Transformation, Validation, and Orchestrator",
      caption: "Professional Python architects divide functions into 4 specific roles to maintain pure business logic and clean side-effect boundaries.",
      render: () => (
        <div className="w-full py-1 space-y-2 font-mono text-xs">
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'action', label: '1. Action', color: '#F28B82' },
              { id: 'transformation', label: '2. Transform', color: '#4BA3E3' },
              { id: 'validation', label: '3. Validate', color: '#48B89F' },
              { id: 'orchestrator', label: '4. Orchestrate', color: '#C3A6E8' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveArchetype(tab.id)}
                className={`p-1.5 rounded-lg border-2 border-[#2D2319] font-bold text-[10px] transition-all ${
                  activeArchetype === tab.id
                    ? 'bg-[#2D2319] text-white shadow-[2px_2px_0px_#F6C445]'
                    : 'bg-[#FAF3E0] hover:bg-amber-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-3 rounded-xl shadow-[3px_3px_0px_#2D2319]">
            {activeArchetype === 'action' && (
              <div>
                <div className="font-black text-[#F28B82] flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> Action Function (Side Effects)
                </div>
                <div className="text-[11px] text-gray-700 mt-1">
                  Makes something happen outside the code: saving to Database, writing a File, sending an Email, or calling a REST API.
                </div>
              </div>
            )}
            {activeArchetype === 'transformation' && (
              <div>
                <div className="font-black text-[#4BA3E3] flex items-center gap-1.5">
                  <Shuffle className="w-4 h-4" /> Transformation Function (Business Logic)
                </div>
                <div className="text-[11px] text-gray-700 mt-1">
                  Pure computation: takes input data, cleans/converts/aggregates it, and always returns the transformed output without side effects.
                </div>
              </div>
            )}
            {activeArchetype === 'validation' && (
              <div>
                <div className="font-black text-[#48B89F] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Validation Function (Rule Checks)
                </div>
                <div className="text-[11px] text-gray-700 mt-1">
                  Inspection: verifies data types, permissions, email formats, or bounds, and strictly returns True or False.
                </div>
              </div>
            )}
            {activeArchetype === 'orchestrator' && (
              <div>
                <div className="font-black text-[#C3A6E8] flex items-center gap-1.5">
                  <GitMerge className="w-4 h-4" /> Orchestrator Function (The Conductor)
                </div>
                <div className="text-[11px] text-gray-700 mt-1">
                  Workflow control: calls Validation → Transformation → Action functions in orderly sequence to execute an entire pipeline.
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="Chapter 8: Professional Function Architecture Master Blueprint"
      analogy="Modularity, Scope Lifetimes & Clean Architecture Archetypes"
      frames={frames}
    />
  );
}
