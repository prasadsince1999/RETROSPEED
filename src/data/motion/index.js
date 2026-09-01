import homeRow from './homeRow.json';

export const MOTION_LESSONS = {
  'motion.home-row': homeRow,
  'home-row': homeRow,
  'motion-home-row': homeRow
};

export function getMotionLesson(id) {
  if (!id) return homeRow;
  return MOTION_LESSONS[id] || homeRow;
}

export default MOTION_LESSONS;
