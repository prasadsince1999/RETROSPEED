/**
 * Pure Deterministic Engine for Press Room Workshop Game.
 * Single-key factory drill: Rubber stamp slams onto moving paper slips.
 */

export function createPressRoomState(options = {}) {
  const targetKeys = options.targetKeys || ['f', 'j'];
  const goalSlips = options.goalSlips || 30;
  const speed = options.speed || 120; // px/sec

  return {
    slips: [
      { id: 1, char: targetKeys[0], x: 0, stamped: false },
      { id: 2, char: targetKeys[1], x: 120, stamped: false }
    ],
    nextId: 3,
    targetKeys,
    goalSlips,
    stampedCount: 0,
    lives: options.lives || 3,
    score: 0,
    streak: 0,
    hits: 0,
    misses: 0,
    speed,
    conveyorWidth: options.conveyorWidth || 800,
    stampX: options.stampX || 300,
    tolerance: options.tolerance || 60,
    status: 'playing', // 'playing' | 'won' | 'gameover'
    timeElapsed: 0
  };
}

export function tickPressRoom(state, dt) {
  if (state.status !== 'playing') return state;

  const nextTime = state.timeElapsed + dt;
  let nextLives = state.lives;
  let nextMisses = state.misses;
  let nextStreak = state.streak;
  let nextStatus = state.status;

  // Advance slips along conveyor
  const movedSlips = state.slips.map(slip => ({
    ...slip,
    x: slip.x + state.speed * dt
  }));

  // Check slips that fell off conveyor without being stamped
  const remainingSlips = [];
  movedSlips.forEach(slip => {
    if (slip.x > state.conveyorWidth) {
      if (!slip.stamped) {
        nextMisses += 1;
        nextLives -= 1;
        nextStreak = 0;
      }
    } else {
      remainingSlips.push(slip);
    }
  });

  // Spawn new slip if needed
  let nextId = state.nextId;
  const lastSlip = remainingSlips[remainingSlips.length - 1];
  if (!lastSlip || lastSlip.x > 180) {
    const nextChar = state.targetKeys[(nextId) % state.targetKeys.length];
    remainingSlips.push({
      id: nextId++,
      char: nextChar,
      x: (lastSlip ? Math.min(0, lastSlip.x - 160) : 0),
      stamped: false
    });
  }

  if (nextLives <= 0) {
    nextStatus = 'gameover';
  } else if (state.stampedCount >= state.goalSlips) {
    nextStatus = 'won';
  }

  return {
    ...state,
    timeElapsed: nextTime,
    slips: remainingSlips,
    nextId,
    lives: Math.max(0, nextLives),
    misses: nextMisses,
    streak: nextStreak,
    status: nextStatus
  };
}

export function applyKeyToPressRoom(state, key) {
  if (state.status !== 'playing') return state;

  const normalizedKey = key.toLowerCase();
  
  // Find the nearest active slip in stamping zone
  const targetSlip = state.slips.find(
    s => !s.stamped && Math.abs(s.x - state.stampX) <= state.tolerance
  );

  if (targetSlip && targetSlip.char.toLowerCase() === normalizedKey) {
    // Valid stamp!
    const nextStampedCount = state.stampedCount + 1;
    const nextStreak = state.streak + 1;
    const nextScore = state.score + 100 + nextStreak * 15;
    const nextHits = state.hits + 1;
    const nextStatus = nextStampedCount >= state.goalSlips ? 'won' : 'playing';

    const updatedSlips = state.slips.map(s => 
      s.id === targetSlip.id ? { ...s, stamped: true } : s
    );

    return {
      ...state,
      slips: updatedSlips,
      stampedCount: nextStampedCount,
      score: nextScore,
      streak: nextStreak,
      hits: nextHits,
      status: nextStatus
    };
  } else {
    // Jam / Typo
    const nextMisses = state.misses + 1;
    const nextLives = state.lives - 1;
    const nextStatus = nextLives <= 0 ? 'gameover' : 'playing';

    return {
      ...state,
      misses: nextMisses,
      lives: Math.max(0, nextLives),
      streak: 0,
      status: nextStatus
    };
  }
}
