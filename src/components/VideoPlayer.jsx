import React from 'react';
import MotionLessonPlayer from './motion/MotionLessonPlayer';

/**
 * Scripted Graphic Motion Lesson Player
 * Replaces static cartoon playback with synchronized audio narration,
 * kinetic paper keyboard animations, and interactive keyboard gates.
 */
export default function VideoPlayer({ lesson, onComplete, onExit }) {
  return (
    <MotionLessonPlayer
      lesson={lesson}
      onComplete={onComplete}
      onExit={onExit}
    />
  );
}
