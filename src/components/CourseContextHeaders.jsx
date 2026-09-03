import React from 'react';
import {
  AtlasHeader,
  LoanwordHeader,
  DetectiveHeader,
  MusicHeader,
  SyntaxHeader,
  VocabHeader
} from './courseHeaders';

export {
  AtlasHeader,
  LoanwordHeader,
  DetectiveHeader,
  MusicHeader,
  SyntaxHeader,
  VocabHeader
};

export default function CourseContextHeaders({ lesson, activeCourse }) {
  if (!lesson) return null;

  const title = lesson.title || '';
  const text = lesson.text || '';
  const stage = lesson.stage || '';
  const cId = activeCourse?.id || '';
  const prog = activeCourse?.programId || 0;

  // A. Chronicles of Mystery / Detective Cases
  if (prog === 268 || cId === 'chronicles-of-mystery' || cId === 'mystery-detective' || /detective|mystery|sherlock|case/i.test(cId)) {
    return <DetectiveHeader lesson={lesson} title={title} stage={stage} text={text} />;
  }

  // B. Loanwords & Global Lexicon
  if (prog === 240 || cId === 'global-lexicon' || cId === 'loanwords' || /loanword|lexicon|etymology/i.test(cId)) {
    return <LoanwordHeader lesson={lesson} title={title} stage={stage} text={text} />;
  }

  // B2. Literary Heritage / Vocabulary
  if (prog === 289 || cId === 'literary-heritage' || cId === 'vocab-nonfiction' || /vocab|heritage|literature/i.test(cId)) {
    return <VocabHeader lesson={lesson} title={title} stage={stage} />;
  }

  // C. Music Theory / Symphony Keys
  if (prog === 254 || cId === 'symphony-keys' || cId === 'music-theory' || /music|symphony/i.test(cId)) {
    return <MusicHeader lesson={lesson} title={title} stage={stage} />;
  }

  // D. U.S. Atlas Chronicles
  if (prog === 249 || cId === 'atlas-chronicles' || cId === 'us-state-facts' || /state|atlas|geography/i.test(cId)) {
    return <AtlasHeader lesson={lesson} title={title} stage={stage} />;
  }

  // E. Developer Track / Syntax Forge
  if (prog === 306 || cId === 'syntax-forge' || cId === 'code-typing' || /code|syntax|developer/i.test(cId)) {
    return <SyntaxHeader lesson={lesson} title={title} stage={stage} text={text} />;
  }

  return null;
}
