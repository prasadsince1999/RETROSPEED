import React, { useState } from 'react';
import RetroVisualFrame from './RetroVisualFrame';
import { Layers, Box, Cpu, Database, Split, Shuffle, Check, X, ShieldAlert, Binary } from 'lucide-react';

export default function Chapter7_DataStructures() {
  const [selectedDs, setSelectedDs] = useState('list');
  const [activeSetOp, setActiveSetOp] = useState('union');

  const frames = [
    {
      title: "The 4 Core Data Structures Comparison",
      subtitle: "Page 93, 136-137: List, Tuple, Set, Dictionary",
      caption: "Python provides 4 built-in collection types. Choose based on whether you need ordering, mutability, unique items, or key-value lookups.",
      render: () => (
        <div className="w-full py-1 space-y-3 font-mono">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <button
              onClick={() => setSelectedDs('list')}
              className={`p-2 rounded-lg border-2 border-[#2D2319] transition-all ${
                selectedDs === 'list' ? 'bg-[#48B89F] text-white shadow-[2px_2px_0px_#2D2319]' : 'bg-[#FAF3E0] hover:bg-amber-100'
              }`}
            >
              <div className="font-black">List [ ]</div>
              <div className="text-[10px] opacity-90">Mutable Array</div>
            </button>
            <button
              onClick={() => setSelectedDs('tuple')}
              className={`p-2 rounded-lg border-2 border-[#2D2319] transition-all ${
                selectedDs === 'tuple' ? 'bg-[#4BA3E3] text-white shadow-[2px_2px_0px_#2D2319]' : 'bg-[#FAF3E0] hover:bg-sky-100'
              }`}
            >
              <div className="font-black">Tuple ( )</div>
              <div className="text-[10px] opacity-90">Immutable Lock</div>
            </button>
            <button
              onClick={() => setSelectedDs('set')}
              className={`p-2 rounded-lg border-2 border-[#2D2319] transition-all ${
                selectedDs === 'set' ? 'bg-[#F6C445] text-[#2D2319] shadow-[2px_2px_0px_#2D2319]' : 'bg-[#FAF3E0] hover:bg-yellow-100'
              }`}
            >
              <div className="font-black">Set {'{ }'}</div>
              <div className="text-[10px] opacity-90">Unique Hash</div>
            </button>
            <button
              onClick={() => setSelectedDs('dict')}
              className={`p-2 rounded-lg border-2 border-[#2D2319] transition-all ${
                selectedDs === 'dict' ? 'bg-[#F28B82] text-white shadow-[2px_2px_0px_#2D2319]' : 'bg-[#FAF3E0] hover:bg-rose-100'
              }`}
            >
              <div className="font-black">Dict {'{k:v}'}</div>
              <div className="text-[10px] opacity-90">Key Map</div>
            </button>
          </div>

          <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319]">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-[#2D2319] text-left">
                  <th className="pb-1.5 font-bold">Property</th>
                  <th className="pb-1.5 text-center font-bold">Ordered</th>
                  <th className="pb-1.5 text-center font-bold">Duplicates</th>
                  <th className="pb-1.5 text-center font-bold">Indexed</th>
                  <th className="pb-1.5 text-center font-bold">Mutable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200">
                <tr className={selectedDs === 'list' ? 'bg-[#C7E8CA] font-bold' : ''}>
                  <td className="py-1">List [1, 2, 2]</td>
                  <td className="text-center text-emerald-700">✓</td>
                  <td className="text-center text-emerald-700">✓</td>
                  <td className="text-center text-emerald-700">✓</td>
                  <td className="text-center text-emerald-700">✓</td>
                </tr>
                <tr className={selectedDs === 'tuple' ? 'bg-[#C7E8CA] font-bold' : ''}>
                  <td className="py-1">Tuple (1, 2, 2)</td>
                  <td className="text-center text-emerald-700">✓</td>
                  <td className="text-center text-emerald-700">✓</td>
                  <td className="text-center text-emerald-700">✓</td>
                  <td className="text-center text-rose-600">✕</td>
                </tr>
                <tr className={selectedDs === 'set' ? 'bg-[#C7E8CA] font-bold' : ''}>
                  <td className="py-1">Set {'{1, 2}'}</td>
                  <td className="text-center text-rose-600">✕</td>
                  <td className="text-center text-rose-600">✕</td>
                  <td className="text-center text-rose-600">✕</td>
                  <td className="text-center text-emerald-700">✓</td>
                </tr>
                <tr className={selectedDs === 'dict' ? 'bg-[#C7E8CA] font-bold' : ''}>
                  <td className="py-1">Dict {'{\'a\': 1}'}</td>
                  <td className="text-center text-emerald-700">✓ (3.7+)</td>
                  <td className="text-center text-amber-600">Values only</td>
                  <td className="text-center text-amber-600">Keyed</td>
                  <td className="text-center text-emerald-700">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      title: "List Memory Model & Slicing",
      subtitle: "Page 98, 102-104: Array Pointers & Inclusive:Exclusive Ranges",
      caption: "A list stores memory pointers to objects (0x0123). Indexing picks 1 item, while slicing [start:end] cuts from inclusive start to exclusive end.",
      render: () => (
        <div className="w-full py-1 space-y-3 font-mono">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { pos: 0, neg: -4, val: "'a'", ptr: '0x123' },
              { pos: 1, neg: -3, val: "'b'", ptr: '0x124', highlight: true },
              { pos: 2, neg: -2, val: "'c'", ptr: '0x125', highlight: true },
              { pos: 3, neg: -1, val: "'d'", ptr: '0x126' },
            ].map((cell, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center p-2 rounded-xl border-2 border-[#2D2319] ${
                  cell.highlight ? 'bg-[#F6C445] shadow-[3px_3px_0px_#2D2319]' : 'bg-[#FAF3E0] shadow-[1px_1px_0px_#2D2319]'
                }`}
              >
                <span className="text-[10px] text-amber-700 font-bold">neg: {cell.neg}</span>
                <span className="text-sm font-black my-1 text-[#2D2319]">{cell.val}</span>
                <span className="text-[10px] text-emerald-700 font-bold">idx: {cell.pos}</span>
                <span className="text-[8px] text-gray-500">{cell.ptr}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl text-xs text-center">
            <span className="font-bold text-[#48B89F]">letters[1:3]</span>
            <span className="text-[#2D2319]"> → includes index 1 ('b') and 2 ('c'), stops before index 3 → </span>
            <span className="font-bold bg-[#C7E8CA] px-2 py-0.5 rounded border border-[#2D2319]">['b', 'c']</span>
          </div>
        </div>
      )
    },
    {
      title: "Packing & Unpacking with Star & Underscore",
      subtitle: "Page 106-110: Deconstructing Structures into Variables",
      caption: "Packing puts values into a list box. Unpacking pulls them out. Use *rest to collect excess elements into a sub-list, and _ to discard unused items.",
      render: () => (
        <div className="w-full py-1 space-y-2 font-mono text-xs">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl text-center">
            <div className="font-bold text-[#2D2319] mb-1">Source List: ['Maria', 29, 'DE', 'Spain']</div>
            <div className="flex items-center justify-center gap-2 flex-wrap text-[11px]">
              <span className="bg-[#4BA3E3] text-white px-2 py-1 rounded border border-[#2D2319] font-bold">name = 'Maria'</span>
              <span className="bg-[#F6C445] text-[#2D2319] px-2 py-1 rounded border border-[#2D2319] font-bold">*details = [29, 'DE']</span>
              <span className="bg-[#48B89F] text-white px-2 py-1 rounded border border-[#2D2319] font-bold">country = 'Spain'</span>
            </div>
          </div>
          <div className="bg-[#C7E8CA] border-2 border-[#2D2319] p-2 rounded-xl text-center text-[11px] font-bold">
            Code: <code>name, *details, country = ['Maria', 29, 'DE', 'Spain']</code>
          </div>
        </div>
      )
    },
    {
      title: "Shallow Copy vs Deep Copy",
      subtitle: "Page 120-123: Shared References vs Full Recursive Cloning",
      caption: "Assignment (b = a) shares the same object. Shallow copy (.copy()) duplicates outer list but shares inner items. Deep copy (copy.deepcopy()) recursively duplicates everything.",
      render: () => (
        <div className="grid grid-cols-3 gap-2 w-full py-1 font-mono text-xs">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <div className="font-black text-rose-600">b = a</div>
            <div className="text-[10px] mt-1 text-[#2D2319]">Shared Reference</div>
            <div className="text-[9px] text-gray-500 mt-1">Both point to 0x100. Mutating b changes a!</div>
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <div className="font-black text-amber-600">b = a.copy()</div>
            <div className="text-[10px] mt-1 text-[#2D2319]">Shallow Copy</div>
            <div className="text-[9px] text-gray-500 mt-1">New outer list (0x200), but nested lists still shared!</div>
          </div>
          <div className="bg-[#C7E8CA] border-2 border-[#2D2319] p-2 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <div className="font-black text-emerald-800">deepcopy(a)</div>
            <div className="text-[10px] mt-1 text-[#2D2319]">Deep Copy</div>
            <div className="text-[9px] text-gray-600 mt-1">100% independent clone at all nested levels.</div>
          </div>
        </div>
      )
    },
    {
      title: "Iterators, Map, Filter & Comprehensions",
      subtitle: "Page 127-135: Lazy Evaluation Machines & Stream Pipelines",
      caption: "An Iterable holds all data in memory. An Iterator is a conveyor belt engine yielding 1 value at a time via next(). Comprehensions fuse Loop + Filter + Transform.",
      render: () => (
        <div className="w-full py-1 space-y-2 font-mono text-xs">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl flex items-center justify-between">
            <span className="bg-[#F28B82] text-white px-2 py-0.5 rounded border border-[#2D2319] font-bold text-[10px]">Transform</span>
            <span className="font-bold text-[#2D2319]">[ x * 2 </span>
            <span className="bg-[#4BA3E3] text-white px-2 py-0.5 rounded border border-[#2D2319] font-bold text-[10px]">Loop</span>
            <span className="font-bold text-[#2D2319]">for x in nums </span>
            <span className="bg-[#48B89F] text-white px-2 py-0.5 rounded border border-[#2D2319] font-bold text-[10px]">Filter</span>
            <span className="font-bold text-[#2D2319]">if x &gt; 5 ]</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
            <div className="bg-[#FDF8EE] border border-[#2D2319] p-1.5 rounded-lg">
              <span className="font-bold text-[#48B89F]">enumerate()</span>
              <span className="block text-gray-600">(index, item)</span>
            </div>
            <div className="bg-[#FDF8EE] border border-[#2D2319] p-1.5 rounded-lg">
              <span className="font-bold text-[#4BA3E3]">zip(a, b)</span>
              <span className="block text-gray-600">pairs elements</span>
            </div>
            <div className="bg-[#FDF8EE] border border-[#2D2319] p-1.5 rounded-lg">
              <span className="font-bold text-[#C3A6E8]">lambda x: x+1</span>
              <span className="block text-gray-600">inline anonymous</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Sets & Venn Diagram Mathematical Operations",
      subtitle: "Page 139-143: Hash-Based O(1) Lookups & Set Operations",
      caption: "Sets use hash tables for instantaneous O(1) membership checks and mathematical Venn operations (Union |, Intersection &, Difference -, Symmetric Difference ^).",
      render: () => (
        <div className="w-full py-1 space-y-2 font-mono text-xs">
          <div className="flex justify-center gap-1">
            {['union', 'intersection', 'difference', 'sym_diff'].map(op => (
              <button
                key={op}
                onClick={() => setActiveSetOp(op)}
                className={`px-2 py-1 rounded border-2 border-[#2D2319] text-[10px] font-bold transition-all ${
                  activeSetOp === op ? 'bg-[#F6C445] shadow-[2px_2px_0px_#2D2319]' : 'bg-[#FAF3E0]'
                }`}
              >
                {op === 'union' && 'A | B (Union)'}
                {op === 'intersection' && 'A & B (Intersect)'}
                {op === 'difference' && 'A - B (Diff)'}
                {op === 'sym_diff' && 'A ^ B (SymDiff)'}
              </button>
            ))}
          </div>

          <div className="bg-[#2D2319] text-[#FAF3E0] p-3 rounded-xl flex items-center justify-around">
            <div className="text-center">
              <div className="text-[10px] text-gray-400">Set A = {'{1, 2, 3}'}</div>
              <div className="text-[10px] text-gray-400">Set B = {'{3, 4, 5}'}</div>
            </div>
            <div className="bg-[#48B89F] text-[#2D2319] px-3 py-1.5 rounded-lg font-black text-sm border-2 border-white">
              {activeSetOp === 'union' && '{1, 2, 3, 4, 5}'}
              {activeSetOp === 'intersection' && '{3}'}
              {activeSetOp === 'difference' && '{1, 2}'}
              {activeSetOp === 'sym_diff' && '{1, 2, 4, 5}'}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="Chapter 7: Python Data Structures Master Blueprint"
      analogy="Collections, Memory Models, Hash Tables & Iterators"
      frames={frames}
    />
  );
}
