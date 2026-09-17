import React from 'react';
import DynamicVisualStage, { detectAnalogyType } from './DynamicVisualStage';
import Chapter1_InterpreterPipeline from './Chapter1_InterpreterPipeline';
import Chapter1_DataTypesRoadmap from './Chapter1_DataTypesRoadmap';
import Chapter2_StringTrainAndRuler from './Chapter2_StringTrainAndRuler';
import Chapter5_DecisionFork from './Chapter5_DecisionFork';
import Chapter6_ConveyorLoops from './Chapter6_ConveyorLoops';
import Chapter7_DataStructures from './Chapter7_DataStructures';
import Chapter8_FunctionMachine from './Chapter8_FunctionMachine';

export { DynamicVisualStage, detectAnalogyType };

/**
 * Route lesson to its accurate animated visual stage component.
 * Removes the old static 5+5 cartoon fallbacks and ensures every lesson
 * has a dynamic, animated physical mental model.
 */
export function getVisualComponentForLesson(lessonOrId, chapter = 1, maybeLesson = null) {
  const lesson = (typeof lessonOrId === 'object' && lessonOrId !== null)
    ? lessonOrId
    : (maybeLesson || { id: lessonOrId, rawId: lessonOrId, codeId: lessonOrId, chapter });

  const lessonId = String(lesson?.codeId || lesson?.rawId || lesson?.id || (typeof lessonOrId === 'string' ? lessonOrId : ''));
  const effectiveChapter = Number(lesson?.chapter || chapter || 1);

  // 1. Explicit analogyType on lesson metadata takes highest precedence
  if (lesson?.analogyType) {
    return <DynamicVisualStage analogyType={lesson.analogyType} lesson={lesson} />;
  }

  // 2. Specific curated multi-frame storyboard overrides if applicable
  switch (lessonId) {
    case 'py-101':
      return <DynamicVisualStage analogyType="language_ladder" lesson={lesson} />;
    case 'py-102':
    case 'py-103':
      return <DynamicVisualStage analogyType="cpython_pipeline" lesson={lesson} />;
    case 'py-104':
      return <DynamicVisualStage analogyType="arithmetic" lesson={lesson} />;
    case 'py-105':
      return <DynamicVisualStage analogyType="cpython_pipeline" lesson={lesson} />;
    case 'py-106':
    case 'py-107':
    case 'py-108':
      return <DynamicVisualStage analogyType="box_reassign" lesson={lesson} />;
    case 'py-201':
    case 'py-203':
    case 'py-204':
      return <DynamicVisualStage analogyType="train" lesson={lesson} />;
    case 'py-301':
    case 'py-302':
      return <DynamicVisualStage analogyType="microphone" lesson={lesson} />;
    case 'py-401':
    case 'py-402':
      return <DynamicVisualStage analogyType="arithmetic" lesson={lesson} />;
    case 'py-501':
    case 'py-502':
      return <DynamicVisualStage analogyType="fork" lesson={lesson} />;
    case 'py-601':
    case 'py-602':
      return <DynamicVisualStage analogyType="conveyor" lesson={lesson} />;
    case 'py-701':
    case 'py-702':
    case 'py-703':
      return <DynamicVisualStage analogyType="tray" lesson={lesson} />;
    case 'py-801':
    case 'py-802':
      return <DynamicVisualStage analogyType="machine" lesson={lesson} />;
    default:
      break;
  }

  // 3. Dynamic content-aware routing by scanning lesson text, code, and keywords
  const detected = detectAnalogyType(lesson);
  if (detected && detected !== 'box') {
    return <DynamicVisualStage analogyType={detected} lesson={lesson} />;
  }

  // 4. Chapter-based topic routing
  switch (effectiveChapter) {
    case 1:
      // In chapter 1, determine if print or variable or arithmetic
      if (lesson?.code?.includes('print(')) {
        return <DynamicVisualStage analogyType="megaphone" lesson={lesson} />;
      }
      return <DynamicVisualStage analogyType="box" lesson={lesson} />;
    case 2:
      return <DynamicVisualStage analogyType="train" lesson={lesson} />;
    case 3:
      return <DynamicVisualStage analogyType="microphone" lesson={lesson} />;
    case 4:
      return <DynamicVisualStage analogyType="arithmetic" lesson={lesson} />;
    case 5:
      return <DynamicVisualStage analogyType="fork" lesson={lesson} />;
    case 6:
      return <DynamicVisualStage analogyType="conveyor" lesson={lesson} />;
    case 7:
      return <DynamicVisualStage analogyType="tray" lesson={lesson} />;
    case 8:
      return <DynamicVisualStage analogyType="machine" lesson={lesson} />;
    default:
      return <DynamicVisualStage analogyType={detected || 'box'} lesson={lesson} />;
  }
}
