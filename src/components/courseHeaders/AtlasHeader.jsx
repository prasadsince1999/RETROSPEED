import React from 'react';
import { MapPin, Landmark } from 'lucide-react';

export const US_STATES_DB = {
  'alabama': { code: 'AL', name: 'Alabama', capital: 'Montgomery', nickname: 'The Heart of Dixie', region: 'The Southeast', flag: '🌲', trivia: 'Home to the Marshall Space Flight Center in Huntsville.' },
  'alaska': { code: 'AK', name: 'Alaska', capital: 'Juneau', nickname: 'The Last Frontier', region: 'Non-contiguous States', flag: '🏔️', trivia: 'The largest U.S. state by area, containing over 3 million lakes.' },
  'arizona': { code: 'AZ', name: 'Arizona', capital: 'Phoenix', nickname: 'The Grand Canyon State', region: 'The Southwest', flag: '🏜️', trivia: 'Home to the magnificent Grand Canyon and the Sonoran Desert.' },
  'arkansas': { code: 'AR', name: 'Arkansas', capital: 'Little Rock', nickname: 'The Natural State', region: 'South Central', flag: '💎', trivia: 'Home to the Crater of Diamonds State Park where visitors find real diamonds.' },
  'california': { code: 'CA', name: 'California', capital: 'Sacramento', nickname: 'The Golden State', region: 'The West Coast', flag: '☀️', trivia: 'Most populous U.S. state, featuring Yosemite, Redwood forests, and Silicon Valley.' },
  'colorado': { code: 'CO', name: 'Colorado', capital: 'Denver', nickname: 'The Centennial State', region: 'The West', flag: '🏔️', trivia: 'Has the highest mean altitude of any state, with over 50 peaks exceeding 14,000 feet.' },
  'connecticut': { code: 'CT', name: 'Connecticut', capital: 'Hartford', nickname: 'The Constitution State', region: 'New England', flag: '⚓', trivia: 'Home to Yale University and the first public library in America.' },
  'delaware': { code: 'DE', name: 'Delaware', capital: 'Dover', nickname: 'The First State', region: 'The Mid-Atlantic', flag: '🏛️', trivia: 'The first state to ratify the United States Constitution on December 7, 1787.' },
  'florida': { code: 'FL', name: 'Florida', capital: 'Tallahassee', nickname: 'The Sunshine State', region: 'The Southeast', flag: '🌴', trivia: 'Home to the Everglades ecosystem, Kennedy Space Center, and the Florida Keys.' },
  'georgia': { code: 'GA', name: 'Georgia', capital: 'Atlanta', nickname: 'The Peach State', region: 'The Southeast', flag: '🍑', trivia: 'Top producer of peaches, peanuts, and pecans in the United States.' },
  'hawaii': { code: 'HI', name: 'Hawaii', capital: 'Honolulu', nickname: 'The Aloha State', region: 'Non-contiguous States', flag: '🌺', trivia: 'The only U.S. state located in Oceania, made entirely of volcanic islands.' },
  'idaho': { code: 'ID', name: 'Idaho', capital: 'Boise', nickname: 'The Gem State', region: 'The West', flag: '🥔', trivia: 'Produces one third of all potatoes grown in the United States and has 72 gem varieties.' },
  'illinois': { code: 'IL', name: 'Illinois', capital: 'Springfield', nickname: 'The Prairie State', region: 'The Great Lakes', flag: '🏙️', trivia: 'Known as the Land of Lincoln and home to Chicago on the shores of Lake Michigan.' },
  'indiana': { code: 'IN', name: 'Indiana', capital: 'Indianapolis', nickname: 'The Hoosier State', region: 'The Great Lakes', flag: '🏎️', trivia: 'Hosts the world-famous Indianapolis 500 motor race every Memorial Day weekend.' },
  'iowa': { code: 'IA', name: 'Iowa', capital: 'Des Moines', nickname: 'The Hawkeye State', region: 'The Midwest', flag: '🌽', trivia: 'A powerhouse in corn and agriculture, bounded by the Mississippi and Missouri rivers.' },
  'kansas': { code: 'KS', name: 'Kansas', capital: 'Topeka', nickname: 'The Sunflower State', region: 'The Midwest', flag: '🌻', trivia: 'Located in the geographic center of the 48 contiguous United States.' },
  'kentucky': { code: 'KY', name: 'Kentucky', capital: 'Frankfort', nickname: 'The Bluegrass State', region: 'South Central', flag: '🐎', trivia: 'Famous for the Kentucky Derby and Mammoth Cave, the longest cave system in the world.' },
  'louisiana': { code: 'LA', name: 'Louisiana', capital: 'Baton Rouge', nickname: 'The Pelican State', region: 'South Central', flag: '🎷', trivia: 'Renowned for French Creole culture, Mardi Gras, and the birthplace of Jazz.' },
  'maine': { code: 'ME', name: 'Maine', capital: 'Augusta', nickname: 'The Pine Tree State', region: 'New England', flag: '🦞', trivia: 'Easternmost state in the U.S., famous for rocky coastlines and lobster fishing.' },
  'maryland': { code: 'MD', name: 'Maryland', capital: 'Annapolis', nickname: 'The Old Line State', region: 'The Mid-Atlantic', flag: '🦀', trivia: 'Famous for blue crabs from Chesapeake Bay and birthplace of the Star-Spangled Banner.' },
  'massachusetts': { code: 'MA', name: 'Massachusetts', capital: 'Boston', nickname: 'The Bay State', region: 'New England', flag: '⛵', trivia: 'Landing site of the Mayflower pilgrims at Plymouth in 1620 and cradle of the American Revolution.' },
  'michigan': { code: 'MI', name: 'Lansing', capital: 'Lansing', nickname: 'The Great Lakes State', region: 'The Great Lakes', flag: '🚗', trivia: 'The only state composed of two separate peninsulas, bordered by four of the five Great Lakes.' },
  'minnesota': { code: 'MN', name: 'Saint Paul', capital: 'Saint Paul', nickname: 'Land of 10,000 Lakes', region: 'The Great Lakes', flag: '🌲', trivia: 'Contains 11,842 lakes and the northern headwaters of the great Mississippi River.' },
  'mississippi': { code: 'MS', name: 'Jackson', capital: 'Jackson', nickname: 'The Magnolia State', region: 'The Southeast', flag: '🎸', trivia: 'The birthplace of Delta Blues music and major producer of farm-raised catfish.' },
  'missouri': { code: 'MO', name: 'Jefferson City', capital: 'Jefferson City', nickname: 'The Show-Me State', region: 'The Midwest', flag: '🏛️', trivia: 'Features the stainless steel Gateway Arch in St. Louis, the Gateway to the West.' },
  'montana': { code: 'MT', name: 'Helena', capital: 'Helena', nickname: 'The Treasure State', region: 'The West', flag: '🏔️', trivia: 'Known as "Big Sky Country" and home to Glacier National Park.' },
  'nebraska': { code: 'NE', name: 'Lincoln', capital: 'Lincoln', nickname: 'The Cornhusker State', region: 'The Midwest', flag: '🌾', trivia: 'Home to Chimney Rock, a landmark along the historic Oregon and Mormon trails.' },
  'nevada': { code: 'NV', name: 'Carson City', capital: 'Carson City', nickname: 'The Silver State', region: 'The West', flag: '🎰', trivia: 'Leading producer of gold and silver in the U.S., featuring the Great Basin and Hoover Dam.' },
  'new hampshire': { code: 'NH', name: 'Concord', capital: 'Concord', nickname: 'The Granite State', region: 'New England', flag: '⛰️', trivia: 'First state to declare its independence from Great Britain in January 1776.' },
  'new jersey': { code: 'NJ', name: 'Trenton', capital: 'Trenton', nickname: 'The Garden State', region: 'The Mid-Atlantic', flag: '🎡', trivia: 'Has the highest population density in the U.S. and famous Atlantic boardwalks.' },
  'new mexico': { code: 'NM', name: 'Santa Fe', capital: 'Santa Fe', nickname: 'The Land of Enchantment', region: 'The Southwest', flag: '🌶️', trivia: 'Santa Fe is the oldest state capital in the U.S., founded in 1610.' },
  'new york': { code: 'NY', name: 'Albany', capital: 'Albany', nickname: 'The Empire State', region: 'The Mid-Atlantic', flag: '🗽', trivia: 'Home to the Statue of Liberty, Adirondack Park, and Niagara Falls.' },
  'north carolina': { code: 'NC', name: 'Raleigh', capital: 'Raleigh', nickname: 'The Tar Heel State', region: 'The Southeast', flag: '✈️', trivia: 'First in Flight: The Wright Brothers made the first powered flight at Kitty Hawk in 1903.' },
  'north dakota': { code: 'ND', name: 'Bismarck', capital: 'Bismarck', nickname: 'The Peace Garden State', region: 'The Midwest', flag: '🦬', trivia: 'Home to Theodore Roosevelt National Park and leading producer of spring wheat and sunflowers.' },
  'ohio': { code: 'OH', name: 'Columbus', capital: 'Columbus', nickname: 'The Buckeye State', region: 'The Great Lakes', flag: '🛸', trivia: 'Birthplace of aviation pioneers and 24 American astronauts, including Neil Armstrong.' },
  'oklahoma': { code: 'OK', name: 'Oklahoma City', capital: 'Oklahoma City', nickname: 'The Sooner State', region: 'South Central', flag: '🏹', trivia: 'Rich Native American history with 39 tribal nations headquartered in the state.' },
  'oregon': { code: 'OR', name: 'Salem', capital: 'Salem', nickname: 'The Beaver State', region: 'The West Coast', flag: '🌲', trivia: 'Home to Crater Lake, the deepest lake in the United States, formed by an ancient volcano.' },
  'pennsylvania': { code: 'PA', name: 'Harrisburg', capital: 'Harrisburg', nickname: 'The Keystone State', region: 'The Mid-Atlantic', flag: '🔔', trivia: 'Birthplace of American independence, where the Declaration of Independence was signed.' },
  'rhode island': { code: 'RI', name: 'Providence', capital: 'Providence', nickname: 'The Ocean State', region: 'New England', flag: '⛵', trivia: 'The smallest state by land area, but boasting over 400 miles of tidal shoreline.' },
  'south carolina': { code: 'SC', name: 'Columbia', capital: 'Columbia', nickname: 'The Palmetto State', region: 'The Southeast', flag: '🌴', trivia: 'Historic coastal state where the first shots of the Civil War were fired at Fort Sumter.' },
  'south dakota': { code: 'SD', name: 'Pierre', capital: 'Pierre', nickname: 'The Mount Rushmore State', region: 'The Midwest', flag: '🗿', trivia: 'Features the famous Mount Rushmore National Memorial carved into the Black Hills.' },
  'tennessee': { code: 'TN', name: 'Nashville', capital: 'Nashville', nickname: 'The Volunteer State', region: 'The Southeast', flag: '🎸', trivia: 'Known worldwide as the capital of Country Music (Nashville) and Blues/Rock (Memphis).' },
  'texas': { code: 'TX', name: 'Austin', capital: 'Austin', nickname: 'The Lone Star State', region: 'South Central', flag: '⭐', trivia: 'Second largest U.S. state by area and population, with rich cattle and aerospace heritage.' },
  'utah': { code: 'UT', name: 'Salt Lake City', capital: 'Salt Lake City', nickname: 'The Beehive State', region: 'The West', flag: '🏜️', trivia: 'Famous for the "Mighty 5" National Parks (Zion, Bryce, Arches, Canyonlands, Capitol Reef).' },
  'vermont': { code: 'VT', name: 'Montpelier', capital: 'Montpelier', nickname: 'The Green Mountain State', region: 'New England', flag: '🍁', trivia: 'Leading producer of pure maple syrup in the U.S. and famous for its covered bridges.' },
  'virginia': { code: 'VA', name: 'Richmond', capital: 'Richmond', nickname: 'The Old Dominion', region: 'The Southeast', flag: '🏛️', trivia: 'Birthplace of eight U.S. presidents, more than any other state.' },
  'washington': { code: 'WA', name: 'Olympia', capital: 'Olympia', nickname: 'The Evergreen State', region: 'The West Coast', flag: '🌲', trivia: 'Home to Mount Rainier, Puget Sound, and leading producer of apples and sweet cherries.' },
  'west virginia': { code: 'WV', name: 'Charleston', capital: 'Charleston', nickname: 'The Mountain State', region: 'The Mid-Atlantic', flag: '⛰️', trivia: 'The only state entirely located within the Appalachian Mountain range.' },
  'wisconsin': { code: 'WI', name: 'Madison', capital: 'Madison', nickname: 'The Badger State', region: 'The Great Lakes', flag: '🧀', trivia: 'Known as "America\'s Dairyland", producing over a quarter of all cheese in the nation.' },
  'wyoming': { code: 'WY', name: 'Cheyenne', capital: 'Cheyenne', nickname: 'The Equality State', region: 'The West', flag: '🦬', trivia: 'First state to grant women the right to vote (1869), and home to Yellowstone National Park.' }
};

export const US_REGIONS_CONFIG = {
  'The West Coast': { icon: '🌲', theme: 'emerald', label: 'West Coast • Pacific Shore & Cascades' },
  'The West': { icon: '🏔️', theme: 'amber', label: 'Mountain West • Rockies & High Plateaus' },
  'The Southwest': { icon: '🏜️', theme: 'orange', label: 'American Southwest • Deserts & Canyons' },
  'The Midwest': { icon: '🌽', theme: 'yellow', label: 'The Heartland • Prairie & Agriculture' },
  'The Great Lakes': { icon: '🌊', theme: 'cyan', label: 'Great Lakes Region • Upper Midwest' },
  'South Central': { icon: '🤠', theme: 'stone', label: 'South Central • Gulf Coast & Plains' },
  'The Southeast': { icon: '☀️', theme: 'rose', label: 'The Southeast • Sun Belt & Atlantic Coast' },
  'The Mid-Atlantic': { icon: '🏛️', theme: 'blue', label: 'Mid-Atlantic • Capital & Colonial Heritage' },
  'New England': { icon: '🍁', theme: 'red', label: 'New England • Historic Atlantic Coast' },
  'Non-contiguous States': { icon: '🌋', theme: 'indigo', label: 'Pacific & Arctic • Alaska & Hawaii' },
  'Regions': { icon: '🗺️', theme: 'sky', label: '50 States • Geographic Regions of America' },
  'Introduction': { icon: '🇺🇸', theme: 'blue', label: 'Welcome to the 50 Great United States' }
};

export function AtlasHeader({ lesson, title, stage }) {
  const searchTarget = (title + ' ' + stage).toLowerCase();
  let matchedState = null;
  for (const [key, stateData] of Object.entries(US_STATES_DB)) {
    if (searchTarget.includes(key)) {
      matchedState = stateData;
      break;
    }
  }

  let regionInfo = US_REGIONS_CONFIG[stage] || US_REGIONS_CONFIG['50 States'] || {
    icon: '🗺️',
    theme: 'blue',
    label: stage || 'United States Geography'
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-3">
      <div className="bg-[#e0f2fe] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
        <div className="bg-[#2c3e50] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-sky-300">✦</span>
            <span className="font-bold tracking-wider">US_ATLAS.DAT // 50_STATES_GEOGRAPHY</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-300">_</span>
            <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[8px] font-mono text-slate-300">□</span>
            <span className="w-3.5 h-3.5 bg-[#f87171] border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-900">✕</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-900">
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                <span>{regionInfo.icon}</span>
                <span>{stage}</span>
              </span>

              {matchedState && (
                <span className="px-2.5 py-0.5 rounded bg-[#fef08a] text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                  <span>{matchedState.flag}</span>
                  <span>{matchedState.name} [{matchedState.code}]</span>
                </span>
              )}

              {matchedState && (
                <span className="px-2 py-0.5 rounded bg-sky-200 text-sky-950 font-mono text-[10px] font-bold border border-sky-600 inline-flex items-center space-x-1">
                  <Landmark className="w-3 h-3 text-sky-800" />
                  <span>Capital: {matchedState.capital}</span>
                </span>
              )}

              {matchedState?.nickname && (
                <span className="italic text-xs font-mono text-sky-900 bg-sky-100 px-2 py-0.2 rounded border border-sky-300">
                  "{matchedState.nickname}"
                </span>
              )}
            </div>

            <div className="text-xs font-mono text-slate-700 pt-0.5 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span>
                {matchedState ? matchedState.trivia : `${regionInfo.label} • Lesson ${lesson.id}: ${title}`}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="px-2.5 py-0.5 rounded bg-white border border-slate-900 shadow-[1px_1px_0_#0f172a] text-slate-900 font-mono text-xs font-black">
              🇺🇸 STATE TRIVIA
            </span>
            <span className="text-[10px] text-slate-600 font-mono mt-0.5">Capitals & Geography</span>
          </div>
        </div>
      </div>
    </div>
  );
}
