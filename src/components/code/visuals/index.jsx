import React from 'react';
import Chapter1_LevelsOfLanguages from './Chapter1_LevelsOfLanguages';
import Chapter1_InterpreterPipeline from './Chapter1_InterpreterPipeline';
import Chapter1_VariablesMemoryBox from './Chapter1_VariablesMemoryBox';
import Chapter1_MegaphoneAndFunctions from './Chapter1_MegaphoneAndFunctions';
import Chapter1_DataTypesRoadmap from './Chapter1_DataTypesRoadmap';
import Chapter2_StringTrainAndRuler from './Chapter2_StringTrainAndRuler';
import Chapter5_DecisionFork from './Chapter5_DecisionFork';
import Chapter6_ConveyorLoops from './Chapter6_ConveyorLoops';
import Chapter7_DataStructures from './Chapter7_DataStructures';
import Chapter8_FunctionMachine from './Chapter8_FunctionMachine';

export function getVisualComponentForLesson(lessonId, chapter = 1) {
  switch (lessonId) {
    case 'py-101':
      return <Chapter1_LevelsOfLanguages />;
    case 'py-102':
      return <Chapter1_InterpreterPipeline />;
    case 'py-104':
    case 'py-105':
      return <Chapter1_MegaphoneAndFunctions />;
    case 'py-106':
    case 'py-107':
      return <Chapter1_VariablesMemoryBox />;
    case 'py-109':
    case 'py-110':
      return <Chapter1_DataTypesRoadmap />;
    case 'py-201':
    case 'py-203':
    case 'py-204':
      return <Chapter2_StringTrainAndRuler />;
    case 'py-501':
    case 'py-502':
      return <Chapter5_DecisionFork />;
    case 'py-601':
    case 'py-602':
      return <Chapter6_ConveyorLoops />;
    case 'py-701':
    case 'py-702':
    case 'py-703':
      return <Chapter7_DataStructures />;
    case 'py-801':
    case 'py-802':
      return <Chapter8_FunctionMachine />;
    default:
      if (chapter === 1) return <Chapter1_LevelsOfLanguages />;
      if (chapter === 2) return <Chapter2_StringTrainAndRuler />;
      if (chapter === 5) return <Chapter5_DecisionFork />;
      if (chapter === 6) return <Chapter6_ConveyorLoops />;
      if (chapter === 7) return <Chapter7_DataStructures />;
      if (chapter === 8) return <Chapter8_FunctionMachine />;
      return <Chapter1_LevelsOfLanguages />;
  }
}
