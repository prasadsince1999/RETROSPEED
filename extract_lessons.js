import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawOutputPath = 'C:/Users/kpr25/.gemini/antigravity/brain/e0a46888-960b-4007-a151-8505ea88c98d/.system_generated/steps/380/output.txt';

try {
  const fileContent = fs.readFileSync(rawOutputPath, 'utf-8');
  // Find JSON block
  const jsonStart = fileContent.indexOf('{"totalHeaders"');
  const jsonEnd = fileContent.lastIndexOf('}') + 1;
  const jsonStr = fileContent.substring(jsonStart, jsonEnd);
  const data = JSON.parse(jsonStr);

  console.log(`Loaded ${data.totalHeaders} headers and ${data.totalPlayableLessons} playable lessons!`);

  // Save to clean JSON file
  const targetPath = path.join(__dirname, 'src', 'data', 'edclub_full_lessons.json');
  fs.writeFileSync(targetPath, JSON.stringify(data.fullData, null, 2), 'utf-8');
  console.log(`Saved clean lesson data to ${targetPath}`);

} catch (e) {
  console.error('Extraction error:', e);
}
