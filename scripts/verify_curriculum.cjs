const fs = require('fs');

const raw = fs.readFileSync('src/data/courses/python_zero_to_hero.json', 'utf8');
const data = JSON.parse(raw);

console.log('--- Verification Report ---');
console.log('Course title:', data.title);
console.log('Course lessonsCount:', data.lessonsCount);
console.log('Stages count:', data.stages.length);

const allowedAnalogyTypes = new Set([
  'box',
  'megaphone',
  'microphone',
  'train',
  'fork',
  'conveyor',
  'machine',
  'tray',
  'arithmetic'
]);

let totalLessons = 0;
let errors = [];
let lessonsWith55 = [];

data.stages.forEach((stage, sIdx) => {
  stage.lessons.forEach((l, lIdx) => {
    totalLessons++;

    // Check analogy
    if (!l.analogy || typeof l.analogy !== 'string') {
      errors.push('Lesson ' + l.id + ' missing analogy');
    }

    // Check analogyType
    if (!l.analogyType || !allowedAnalogyTypes.has(l.analogyType)) {
      errors.push('Lesson ' + l.id + ' has invalid analogyType: ' + l.analogyType);
    }

    // Check instructorExplanation
    if (!l.instructorExplanation || typeof l.instructorExplanation !== 'string' || l.instructorExplanation.length < 10) {
      errors.push('Lesson ' + l.id + ' missing valid instructorExplanation');
    }

    // Check codeBreakdown
    if (!Array.isArray(l.codeBreakdown) || l.codeBreakdown.length === 0) {
      errors.push('Lesson ' + l.id + ' missing codeBreakdown');
    } else {
      l.codeBreakdown.forEach(cb => {
        if (!cb.token || !cb.label || !cb.explanation) {
          errors.push('Lesson ' + l.id + ' malformed codeBreakdown item: ' + JSON.stringify(cb));
        }
      });
    }

    // Check executionSteps
    if (!Array.isArray(l.executionSteps) || l.executionSteps.length === 0) {
      errors.push('Lesson ' + l.id + ' missing executionSteps');
    } else {
      l.executionSteps.forEach(es => {
        if (!es.step || !es.title || !es.description) {
          errors.push('Lesson ' + l.id + ' malformed executionSteps item: ' + JSON.stringify(es));
        }
      });
    }

    // Check 5 + 5
    if (l.code && l.code.includes('5 + 5')) {
      lessonsWith55.push({ id: l.id, title: l.title, code: l.code });
    }
  });
});

console.log('Total verified lessons:', totalLessons);
console.log('Errors found:', errors.length);
if (errors.length > 0) {
  console.error('First errors:', errors.slice(0, 10));
}

console.log('Lessons with "5 + 5":', lessonsWith55);
if (lessonsWith55.length === 1 && lessonsWith55[0].id === 4) {
  console.log('✅ "5 + 5" appears exclusively in Lesson 4 (First Math Execution)!');
} else {
  console.error('❌ "5 + 5" check failed!');
  process.exit(1);
}

if (totalLessons === 197 && errors.length === 0) {
  console.log('🎉 ALL 197 LESSONS VALIDATED WITH 100% SPEC COMPLIANCE!');
} else {
  process.exit(1);
}
