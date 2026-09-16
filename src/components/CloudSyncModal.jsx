import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  CloudUpload, 
  CloudDownload, 
  Copy, 
  Check, 
  ShieldCheck, 
  RefreshCw, 
  AlertCircle,
  Sparkles,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';
import { 
  backupToCloud, 
  restoreFromCloud, 
  getActiveSyncCode, 
  getLastSyncTime,
  isValidSyncCode,
  normalizeSyncCode
} from '../utils/cloudSync';
import { getPlayerProfile } from '../utils/storage';

export default function CloudSyncModal({
  isOpen,
  onClose,
  userProgress = {},
  onSyncRestored
}) {
  const [activeTab, setActiveTab] = useState('backup'); // 'backup' | 'restore'
  const [syncCode, setSyncCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [lastSync, setLastSync] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success'|'error', text: string }
  const [copied, setCopied] = useState(false);

  const profile = getPlayerProfile(userProgress);

  // Initialize active sync code and last sync time on open
  useEffect(() => {
    if (isOpen) {
      const code = getActiveSyncCode();
      if (code) setSyncCode(code);
      const time = getLastSyncTime();
      if (time) setLastSync(time);
      setStatusMessage(null);
      setCopied(false);
      setInputCode('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = (codeToCopy) => {
    sound.playKeyClick();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackup = async () => {
    sound.playKeyClick();
    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const res = await backupToCloud(userProgress, syncCode || null);
      setSyncCode(res.code);
      setLastSync(res.savedAt);
      setStatusMessage({
        type: 'success',
        text: `✓ Successfully backed up to Cloudflare Edge under code: ${res.code}`
      });
      if (sound?.playLevelComplete) sound.playLevelComplete();
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Backup failed. Please check your internet connection.'
      });
      if (sound?.playMiss) sound.playMiss();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async (e) => {
    e?.preventDefault();
    sound.playKeyClick();
    const cleanCode = normalizeSyncCode(inputCode);

    if (!isValidSyncCode(cleanCode)) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid 6-character code (e.g. RS-8421).'
      });
      return;
    }

    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const res = await restoreFromCloud(cleanCode);
      setSyncCode(res.code);
      setLastSync(res.savedAt);
      setStatusMessage({
        type: 'success',
        text: `✓ Progress restored! Loaded Level ${res.progress?.profile?.level || 1} with all scores and XP.`
      });
      if (sound?.playLevelComplete) sound.playLevelComplete();

      if (onSyncRestored) {
        onSyncRestored(res.progress);
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Could not find or restore progress for that code.'
      });
      if (sound?.playMiss) sound.playMiss();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#2D2319]/75 backdrop-blur-xs select-none modal-backdrop-animate">
      <div className="w-full max-w-lg bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[8px_8px_0px_#2D2319] overflow-hidden flex flex-col max-h-[90vh] modal-window-animate">
        
        {/* RETRO TITLEBAR */}
        <div className="px-4 py-3 bg-[#C3A6E8] border-b-2 border-[#2D2319] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-[#FAF3E0] border-2 border-[#2D2319]" />
            <span className="font-mono text-xs sm:text-sm font-black tracking-wider text-[#2D2319] uppercase flex items-center gap-1.5">
              <Cloud className="w-4 h-4" />
              <span>CLOUDFLARE EDGE SYNC</span>
              <span className="text-[#2D2319]/40">//</span>
              <span className="hidden sm:inline">ANONYMOUS VAULT</span>
            </span>
          </div>

          <button
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="w-6 h-6 rounded bg-[#FAF3E0] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs font-bold cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className="grid grid-cols-2 bg-[#FAF3E0] border-b-2 border-[#2D2319] px-3 pt-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setActiveTab('backup');
              setStatusMessage(null);
            }}
            className={`py-2 px-3 rounded-t-xl border-t-2 border-x-2 border-[#2D2319] font-mono text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-[#FDF8EE] text-[#2D2319] border-b-2 border-b-[#FDF8EE] -mb-[2px] z-10 shadow-[0px_-2px_0px_#2D2319]'
                : 'bg-[#FAF3E0] hover:bg-white text-[#2D2319]/70 border-b-2 border-b-[#2D2319]'
            }`}
          >
            <CloudUpload className="w-4 h-4" />
            <span>Cloud Backup</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setActiveTab('restore');
              setStatusMessage(null);
            }}
            className={`py-2 px-3 rounded-t-xl border-t-2 border-x-2 border-[#2D2319] font-mono text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === 'restore'
                ? 'bg-[#FDF8EE] text-[#2D2319] border-b-2 border-b-[#FDF8EE] -mb-[2px] z-10 shadow-[0px_-2px_0px_#2D2319]'
                : 'bg-[#FAF3E0] hover:bg-white text-[#2D2319]/70 border-b-2 border-b-[#2D2319]'
            }`}
          >
            <CloudDownload className="w-4 h-4" />
            <span>Restore From Cloud</span>
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#2D2319] flex-1 bg-[#FDF8EE]">
          
          {/* TAB 1: BACKUP */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              
              {/* Local Progress Snapshot */}
              <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[2px_2px_0px_#2D2319] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-xl border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: profile.avatarBg }}
                  >
                    {profile.avatarIcon}
                  </div>
                  <div>
                    <div className="font-display font-black text-sm text-[#2D2319]">{profile.displayName}</div>
                    <div className="text-[10px] font-mono font-bold text-[#2D2319]/70">
                      Level {profile.level} • {profile.totalXp.toLocaleString()} XP
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#C7E8CA] text-[#2D2319] text-[10px] font-bold border border-[#2D2319]">
                    Local Active
                  </span>
                </div>
              </div>

              {/* Sync Code Display if available */}
              {syncCode && (
                <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[3px_3px_0px_#2D2319] text-center space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2D2319]/70">
                    Your Personal Cloud Sync Code
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-mono text-2xl sm:text-3xl font-black tracking-widest text-[#2D2319] bg-[#FAF3E0] px-4 py-1.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                      {syncCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(syncCode)}
                      className="px-3 py-2.5 bg-[#F6C445] hover:bg-[#f4ba24] border-2 border-[#2D2319] rounded-xl font-mono text-xs font-bold shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1 cursor-pointer"
                      title="Copy code to clipboard"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#2D2319]" /> : <Copy className="w-4 h-4 text-[#2D2319]" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  {lastSync && (
                    <div className="text-[10px] font-mono text-[#2D2319]/60">
                      Last backed up: {new Date(lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              )}

              {/* Primary Backup Action */}
              <button
                type="button"
                onClick={handleBackup}
                disabled={isProcessing}
                className="w-full py-3 bg-[#48B89F] hover:bg-[#3ea089] text-[#2D2319] font-display font-black text-sm uppercase rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>{syncCode ? 'Update Cloud Save' : 'Backup to Cloud & Get Code'}</span>
              </button>

              {/* Privacy Note */}
              <div className="bg-[#FAF3E0] border border-[#2D2319] rounded-xl p-3 text-[11px] font-mono text-[#2D2319]/80 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-[#2D2319]">
                  <ShieldCheck className="w-4 h-4 text-[#48B89F]" />
                  <span>Zero Signup Cloud Storage:</span>
                </div>
                <p>
                  No email or password needed. Save this 6-character code and enter it on any device to restore your exact typing progress.
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: RESTORE */}
          {activeTab === 'restore' && (
            <form onSubmit={handleRestore} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-black uppercase tracking-wider text-[#2D2319] flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F6C445]" />
                  <span>Enter Your 6-Character Sync Code:</span>
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="RS-8421"
                  maxLength={7}
                  className="w-full px-4 py-3 bg-white border-2 border-[#2D2319] rounded-xl font-mono text-xl font-black tracking-widest text-[#2D2319] placeholder:text-[#2D2319]/30 focus:outline-none focus:bg-[#FAF3E0] focus:shadow-[2px_2px_0px_#2D2319] transition-all text-center"
                />
                <div className="text-[10px] font-mono text-[#2D2319]/70 text-center">
                  Format: <span className="font-bold">RS-XXXX</span> (or just enter the 4 characters)
                </div>
              </div>

              {/* Primary Restore Action */}
              <button
                type="submit"
                disabled={isProcessing || !inputCode.trim()}
                className="w-full py-3 bg-[#F6C445] hover:bg-[#f4ba24] text-[#2D2319] font-display font-black text-sm uppercase rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <CloudDownload className={`w-4 h-4 ${isProcessing ? 'animate-bounce' : ''}`} />
                <span>{isProcessing ? 'Restoring From Cloud...' : 'Restore Progress'}</span>
              </button>

              {/* Warning Notice */}
              <div className="bg-[#FAF3E0] border border-[#2D2319] rounded-xl p-3 text-[11px] font-mono text-[#2D2319]/80 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-[#2D2319]">
                  <AlertCircle className="w-4 h-4 text-[#F28B82]" />
                  <span>Restore Notice:</span>
                </div>
                <p>
                  Restoring will replace the current local progress in this browser with the cloud save from your code.
                </p>
              </div>

            </form>
          )}

          {/* Status Message Alert */}
          {statusMessage && (
            <div className={`p-3 rounded-xl border-2 border-[#2D2319] text-xs font-mono font-bold flex items-start space-x-2 shadow-[2px_2px_0px_#2D2319] animate-in fade-in ${
              statusMessage.type === 'success' ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-[#F28B82] text-white'
            }`}>
              {statusMessage.type === 'success' ? (
                <Check className="w-4 h-4 shrink-0 text-[#2D2319] mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-white mt-0.5" />
              )}
              <div className="flex-1">{statusMessage.text}</div>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="bg-[#FAF3E0] px-4 py-3 border-t-2 border-[#2D2319] flex items-center justify-between shrink-0">
          <div className="text-[10px] font-mono text-[#2D2319]/70">
            Powered by Cloudflare Edge Storage
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#FDF8EE] hover:bg-white border-2 border-[#2D2319] rounded-xl text-xs font-mono font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
