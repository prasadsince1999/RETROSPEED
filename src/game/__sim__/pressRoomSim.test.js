import { describe, it, expect } from 'vitest';
import {
  createPressRoomState,
  tickPressRoom,
  applyKeyToPressRoom
} from '../engines/pressRoomEngine';

describe('Press Room Game Simulation Harness', () => {
  it('Sim lose: No keys typed over time causes slips to jam/fall off and reaches gameover', () => {
    let state = createPressRoomState({ lives: 3, speed: 200, conveyorWidth: 600 });
    
    expect(state.status).toBe('playing');
    expect(state.lives).toBe(3);

    // Advance simulation by 15 seconds in 100ms ticks without typing
    for (let frame = 0; frame < 150; frame++) {
      state = tickPressRoom(state, 0.1);
      if (state.status === 'gameover') break;
    }

    expect(state.status).toBe('gameover');
    expect(state.lives).toBe(0);
    expect(state.misses).toBeGreaterThanOrEqual(3);
  });

  it('Sim win: Accurate timed keystrokes stamp all target slips and trigger victory', () => {
    let state = createPressRoomState({ goalSlips: 5, stampX: 300, tolerance: 50, speed: 100 });

    // Step simulation and stamp every slip when it reaches the stamping zone
    for (let frame = 0; frame < 200; frame++) {
      state = tickPressRoom(state, 0.05);

      const target = state.slips.find(
        s => !s.stamped && Math.abs(s.x - state.stampX) <= 40
      );

      if (target) {
        state = applyKeyToPressRoom(state, target.char);
      }

      if (state.status === 'won') break;
    }

    expect(state.status).toBe('won');
    expect(state.stampedCount).toBe(5);
    expect(state.hits).toBe(5);
    expect(state.misses).toBe(0);
    expect(state.score).toBeGreaterThan(500);
    expect(state.lives).toBe(3);
  });
});
