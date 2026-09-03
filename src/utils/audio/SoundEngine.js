// RETROSPEED Procedural Web Audio Sound Engine Core Orchestrator
import { playSynthesizedKeyClick } from './keyPacks';
import * as arcadeSfx from './arcadeSfx';
import * as uiSfx from './uiSfx';

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.volume = 0.7;
    this.soundPack = 'cherry-blue';
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  setPack(packId) {
    if (packId) {
      this.soundPack = packId;
    }
  }

  getPack() {
    return this.soundPack;
  }

  _canPlay() {
    if (this.muted) return false;
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  // Keycap click with switchable acoustic profiles
  playKeyClick(overridePack = null) {
    if (!this._canPlay()) return;
    const pack = overridePack || this.soundPack || 'cherry-blue';
    playSynthesizedKeyClick(this.ctx, this.volume, pack);
  }

  // UI Sounds
  playErrorBuzz() {
    if (!this._canPlay()) return;
    uiSfx.playErrorBuzz(this.ctx, this.volume);
  }

  playError() {
    this.playErrorBuzz();
  }

  playSuccessChime() {
    if (!this._canPlay()) return;
    uiSfx.playSuccessChime(this.ctx, this.volume);
  }

  playSuccess() {
    this.playSuccessChime();
  }

  playWordSuccess() {
    this.playSuccessChime();
  }

  playStarPop(starIndex = 1) {
    if (!this._canPlay()) return;
    uiSfx.playStarPop(this.ctx, this.volume, starIndex);
  }

  playComboChime(multiplier = 2) {
    if (!this._canPlay()) return;
    uiSfx.playComboChime(this.ctx, this.volume, multiplier);
  }

  playCriticalHit() {
    if (!this._canPlay()) return;
    uiSfx.playCriticalHit(this.ctx, this.volume);
  }

  playCounterTick(pitch = 1) {
    if (!this._canPlay()) return;
    uiSfx.playCounterTick(this.ctx, this.volume, pitch);
  }

  playAvatarHop() {
    if (!this._canPlay()) return;
    uiSfx.playAvatarHop(this.ctx, this.volume);
  }

  playRuneGlow(index = 0) {
    if (!this._canPlay()) return;
    uiSfx.playRuneGlow(this.ctx, this.volume, index);
  }

  playGateRumble() {
    if (!this._canPlay()) return;
    uiSfx.playGateRumble(this.ctx, this.volume);
  }

  playVictoryFanfare() {
    if (!this._canPlay()) return;
    uiSfx.playVictoryFanfare(this.ctx, this.volume);
  }

  playTada() {
    this.playVictoryFanfare();
  }

  playLevelComplete() {
    this.playVictoryFanfare();
  }

  // Arcade Sound Effects
  playBalloonPop() {
    if (!this._canPlay()) return;
    arcadeSfx.playBalloonPop(this.ctx, this.volume);
  }

  playBladeSlash() {
    if (!this._canPlay()) return;
    arcadeSfx.playBladeSlash(this.ctx, this.volume);
  }

  playLaserBeam() {
    if (!this._canPlay()) return;
    arcadeSfx.playLaserBeam(this.ctx, this.volume);
  }

  playMonsterHit() {
    if (!this._canPlay()) return;
    arcadeSfx.playMonsterHit(this.ctx, this.volume);
  }

  playMonsterDefeat() {
    if (!this._canPlay()) return;
    arcadeSfx.playMonsterDefeat(this.ctx, this.volume);
  }

  playSlingshot() {
    if (!this._canPlay()) return;
    arcadeSfx.playSlingshot(this.ctx, this.volume);
  }

  playAppleDrop() {
    if (!this._canPlay()) return;
    arcadeSfx.playAppleDrop(this.ctx, this.volume);
  }

  playStoneBash() {
    if (!this._canPlay()) return;
    arcadeSfx.playStoneBash(this.ctx, this.volume);
  }

  playChiselStrike() {
    if (!this._canPlay()) return;
    arcadeSfx.playChiselStrike(this.ctx, this.volume);
  }

  playStoneCrumble() {
    if (!this._canPlay()) return;
    arcadeSfx.playStoneCrumble(this.ctx, this.volume);
  }

  playBubbleBurst() {
    if (!this._canPlay()) return;
    arcadeSfx.playBubblePop(this.ctx, this.volume);
    arcadeSfx.playWaterSplash(this.ctx, this.volume);
  }

  playBubblePop() {
    if (!this._canPlay()) return;
    arcadeSfx.playBubblePop(this.ctx, this.volume);
  }

  playWaterSplash() {
    if (!this._canPlay()) return;
    arcadeSfx.playWaterSplash(this.ctx, this.volume);
  }

  playSonarPing() {
    if (!this._canPlay()) return;
    arcadeSfx.playSonarPing(this.ctx, this.volume);
  }
}

export const sound = new SoundEngine();
