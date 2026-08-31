// Universal Multi-Course Curriculum Engine
import { getCourseById, COURSES_CATALOG } from './courseCatalog';

// Sanitize text at runtime for bulletproof safety
function cleanString(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035\u0060\u00B4]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')
    .replace(/[\u2014\u2013\u2010\u2011\u2012\u2015]/g, '-')
    .replace(/[\u2026]/g, '...')
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}

export function getCurriculumForCourse(courseId = 'keystroke-foundations') {
  const course = getCourseById(courseId);
  const rawData = course.data || [];
  const rawItems = Array.isArray(rawData) ? rawData : (rawData.lessons || rawData.data || []);

  // Extract stage headers and playable lessons
  const stages = [];
  const playableLessons = [];

  let currentStageTitle = 'Stage 1';
  let currentStageStart = 1;
  let stageIndex = 0;

  const addStage = (title, start, end) => {
    if (end < start) return;
    const stageLessons = playableLessons.slice(start - 1, end);
    const sum = stageLessons.reduce((acc, l) => acc + (l.goalWpm || 20), 0);
    const avg = stageLessons.length > 0 ? Math.round(sum / stageLessons.length) : 20;
    stages.push({
      id: `stage-${stageIndex}`,
      title: cleanString(title) || `Stage ${stageIndex}`,
      start,
      end,
      goal: `${avg} WPM`
    });
  };

  rawItems.forEach((item, rawIdx) => {
    if (item.isHeader || item.lesson_type === 'header') {
      // Close previous stage if exists
      if (playableLessons.length >= currentStageStart) {
        addStage(currentStageTitle, currentStageStart, playableLessons.length);
      }
      stageIndex++;
      currentStageTitle = item.stage || item.name || `Stage ${stageIndex}`;
      currentStageStart = playableLessons.length + 1;
    } else {
      const lessonNumber = playableLessons.length + 1;
      const name = cleanString(item.name) || `Lesson ${lessonNumber}`;
      
      // Target keys extraction with full symbol, bracket, and whitespace support
      let targetKeys = [];
      if (Array.isArray(item.targetKeys) && item.targetKeys.length > 0) {
        targetKeys = item.targetKeys.map(k => cleanString(k).toLowerCase());
      } else if (item.instruction && item.instruction.length > 0) {
        targetKeys = item.instruction.map(ins => cleanString(ins.chr).toLowerCase()).filter(Boolean);
        if (targetKeys.length === 0) {
          item.instruction.forEach(ins => {
            if (ins.body) {
              const bMatch = ins.body.match(/\[([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;':",.<>\/?`~]|space|enter|tab)\]/i);
              if (bMatch) {
                const k = bMatch[1].toLowerCase();
                if (k === 'space') targetKeys.push(' ');
                else if (k === 'enter') targetKeys.push('\n');
                else if (k === 'tab') targetKeys.push('\t');
                else targetKeys.push(bMatch[1]);
              }
            }
          });
        }
      }

      if (targetKeys.length === 0 && name) {
        // Special Key Names
        if (/space\s*bar|space/i.test(name)) {
          targetKeys = [' '];
        } else if (/shift\s*key|left\s*shift|right\s*shift|shift/i.test(name)) {
          targetKeys = ['shift'];
        } else if (/enter\s*key|return/i.test(name)) {
          targetKeys = ['\n'];
        } else if (/tab\s*key/i.test(name)) {
          targetKeys = ['\t'];
        } else if (/period/i.test(name)) {
          targetKeys = ['.'];
        } else if (/comma/i.test(name)) {
          targetKeys = [','];
        } else if (/semicolon/i.test(name)) {
          targetKeys = [';'];
        } else if (/colon/i.test(name)) {
          targetKeys = [':'];
        } else if (/slash/i.test(name)) {
          targetKeys = ['/'];
        } else if (/question\s*mark/i.test(name)) {
          targetKeys = ['?'];
        } else if (/exclamation/i.test(name)) {
          targetKeys = ['!'];
        } else if (/apostrophe/i.test(name)) {
          targetKeys = ["'"];
        } else if (/double\s*quote|quotation/i.test(name)) {
          targetKeys = ['"'];
        } else if (/hyphen|minus|dash/i.test(name)) {
          targetKeys = ['-'];
        } else if (/equal/i.test(name)) {
          targetKeys = ['='];
        } else if (/plus/i.test(name)) {
          targetKeys = ['+'];
        } else if (/keys\s*1\s*(?:to|-)\s*5/i.test(name)) {
          targetKeys = ['1', '2', '3', '4', '5'];
        } else if (/keys\s*6\s*(?:to|-)\s*0/i.test(name)) {
          targetKeys = ['6', '7', '8', '9', '0'];
        } else if (/keys\s*!@#\$%/i.test(name)) {
          targetKeys = ['!', '@', '#', '$', '%'];
        } else if (/keys\s*\^&\*\(\)/i.test(name)) {
          targetKeys = ['^', '&', '*', '(', ')'];
        } else {
          // Key pairs: "Keys f & j", "Keys { and }", "Keys < and >", "Keys : and \"", "Keys [ and ]"
          const pairMatch = name.match(/^Keys?\s+([^\s&,]+)\s*(?:&|and|,|\/)\s*([^\s]+)/i);
          if (pairMatch) {
            const parseKey = (str) => {
              const low = str.toLowerCase();
              if (low === 'space') return ' ';
              if (low === 'enter') return '\n';
              if (low === 'tab') return '\t';
              return str.toLowerCase();
            };
            targetKeys = [parseKey(pairMatch[1]), parseKey(pairMatch[2])];
          } else {
            const singleMatch = name.match(/^Key\s+([^\s]+)/i);
            if (singleMatch) {
              const low = singleMatch[1].toLowerCase();
              if (low === 'space') targetKeys = [' '];
              else if (low === 'enter') targetKeys = ['\n'];
              else if (low === 'tab') targetKeys = ['\t'];
              else targetKeys = [singleMatch[1].toLowerCase()];
            }
          }
        }
      }

      // Detect authentic paper-arcade workshop game engine
      const combinedGameHints = `${item.renderEngine || ''} ${item.activityApp || ''} ${name || ''} ${item.icon || ''} ${item.lessonType || ''}`.toLowerCase();
      let gameEngine = null;
      if (combinedGameHints.includes('plane') || combinedGameHints.includes('bubble') || combinedGameHints.includes('paper')) {
        gameEngine = 'paper-planes';
      } else if (combinedGameHints.includes('local') || combinedGameHints.includes('train') || combinedGameHints.includes('monster') || combinedGameHints.includes('line')) {
        gameEngine = 'local-line';
      } else if (combinedGameHints.includes('market') || combinedGameHints.includes('night') || combinedGameHints.includes('apple') || combinedGameHints.includes('chit')) {
        gameEngine = 'night-market';
      } else if (combinedGameHints.includes('drop') || combinedGameHints.includes('meteor') || combinedGameHints.includes('temple')) {
        gameEngine = 'drop-chits';
      } else if (combinedGameHints.includes('pit') || combinedGameHints.includes('lane') || combinedGameHints.includes('racer') || combinedGameHints.includes('velocity')) {
        gameEngine = 'pit-lane';
      } else if (combinedGameHints.includes('fuse') || combinedGameHints.includes('desk') || combinedGameHints.includes('bomb')) {
        gameEngine = 'fuse-desk';
      } else if (combinedGameHints.includes('patch') || combinedGameHints.includes('terminal') || combinedGameHints.includes('syntax') || combinedGameHints.includes('matrix') || combinedGameHints.includes('hacker')) {
        gameEngine = 'patch-terminal';
      } else if (combinedGameHints.includes('press') || combinedGameHints.includes('stamp') || combinedGameHints.includes('balloon') || combinedGameHints.includes('ninja')) {
        gameEngine = 'press-room';
      }

      // Determine robust lesson type
      let type = 'practice';
      const isIntroName = /^Keys?\s+[a-z0-9;,./\-=\[\]\\'`~`!@#$%^&*()_+{}|:"<>?]/i.test(name) || /space\s*bar|shift\s*key/i.test(name);

      if (item.lessonType === 'video' || item.videoId || item.activityApp?.includes('video')) {
        type = 'video';
      } else if (item.isGame || item.lessonType === 'game' || name.startsWith('Play:') || item.activityApp?.includes('game') || gameEngine !== null) {
        type = 'game';
        if (!gameEngine) {
          gameEngine = 'press-room';
        }
      } else if (item.lessonType === 'intro' || isIntroName) {
        type = 'intro';
      }

      const rawText = cleanString(item.text1 || item.text2 || item.text) || `Practice typing: ${name}`;
      const cleanLetters = rawText.replace(/\s+/g, '').split('');

      // Auto-detect code formatting if renderEngine is code, or text contains code syntax/newlines/tabs
      const renderEngine = type === 'game' ? gameEngine : (item.renderEngine || (course.id === 'syntax-forge' || course.id === 'code-typing' || rawText.includes('\n') || rawText.includes('\t') || rawText.includes('{') || rawText.includes(';') ? 'code' : 'normal'));
      const activityApp = type === 'game' ? (item.activityApp || gameEngine) : item.activityApp;

      playableLessons.push({
        id: lessonNumber,
        rawId: item.id || (1000 + lessonNumber),
        courseId: course.id,
        programId: course.programId,
        courseTitle: course.title,
        title: name,
        stageTitle: cleanString(currentStageTitle),
        type,
        renderEngine,
        activityApp,
        goalWpm: item.goalWpm || Math.min(75, Math.max(15, 15 + Math.floor(lessonNumber / 15))),
        minAccuracy: item.minAccuracy || 80,
        text: rawText,
        letters: cleanLetters.length > 0 ? cleanLetters : (targetKeys.length > 0 ? targetKeys : ['f', 'j', 'd', 'k']),
        targetKeys: targetKeys.length > 0 ? targetKeys : ['f', 'j'],
        instruction: item.instruction || null,
        videoId: item.videoId || null,
        icon: item.icon,
        isGame: type === 'game',
        gameApp: activityApp || gameEngine
      });
    }
  });

  // Close last stage
  if (playableLessons.length >= currentStageStart) {
    addStage(currentStageTitle, currentStageStart, playableLessons.length);
  }

  // Fallback if no stages found
  if (stages.length === 0) {
    addStage(course.title, 1, playableLessons.length);
  }

  return {
    course,
    stages,
    lessons: playableLessons
  };
}

// Backward compatibility default exports
const defaultCurriculum = getCurriculumForCourse('keystroke-foundations');
export const STAGES = defaultCurriculum.stages;
export const ALL_LESSONS = defaultCurriculum.lessons;

export function getLessonById(id, courseId = 'keystroke-foundations') {
  const { lessons } = getCurriculumForCourse(courseId);
  return lessons.find(l => l.id === id) || lessons[0];
}

export function getAllCourses() {
  return COURSES_CATALOG;
}


