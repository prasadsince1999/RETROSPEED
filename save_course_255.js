import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawOutputPath = 'C:/Users/kpr25/.gemini/antigravity/brain/e0a46888-960b-4007-a151-8505ea88c98d/.system_generated/steps/703/output.txt';

try {
  const fileContent = fs.readFileSync(rawOutputPath, 'utf-8');
  const jsonStart = fileContent.indexOf('{"courseId"');
  const jsonEnd = fileContent.lastIndexOf('}') + 1;
  const jsonStr = fileContent.substring(jsonStart, jsonEnd);
  const data = JSON.parse(jsonStr);

  const coursesDir = path.join(__dirname, 'src', 'data', 'courses');
  const targetPath = path.join(coursesDir, 'mystery_detective_255.json');
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Saved Mystery Detective (${data.totalLessons} lessons) to ${targetPath}`);

} catch (e) {
  console.error('Error saving course 255:', e);
}
