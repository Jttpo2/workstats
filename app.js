let ids = {
  date: 'date',
  startTime : 'startTime',
  endTime: 'endTime',
  totalTips: 'totalTips',
  kitchenTips: 'kitchenTips',
  whiteHours: 'whiteHours',
  salesTotal: 'salesTotal',
  comment: 'comment'
};

let reArray = [
  [ids.date, /^\d{6}\b/], // 6 digits at beginning of line with trailing whitespace
  [ids.startTime, /\b(?:\d{2}|\d{4})(?=\-)/], // 2 or 4 digits at start of word followed by '-'
  [ids.endTime, /(?<=-)(?:\d{2}|\d{4})\b/], //2 or 4 digits preceded by '-' followed by word boundary
  [ids.totalTips, /\b\d+(?=\/)/], // one or more digits at start of word followed by forward slash
  [ids.kitchenTips, /(?<=\/)(?:\d+)\b/], // one or more digits preceded by forward slash, at end of word
  [ids.whiteHours, /\b[0-9,\.]+(?=v\b)/], // one or more digits or ',' or '.' followed by 'v' at end of word
  [ids.salesTotal, /\b\d+(?=s\b)/] // one or more digits at start of word, followed by letter 's' at end of word
];
let regexes = new Map(reArray);

function stringToWorkday(entry) {
  let workdayMap = new Map();

  regexes.forEach(function(re, key, map) {
    let match = getFirstMatchStringFrom(entry, re);
    workdayMap.set(key, convertToNumber(match));
  });

  workdayMap.set(ids.comment, extractComment(entry))

  return workdayMap;
}

function getFirstMatchStringFrom(entry, re) {
  let matchArray = re.exec(entry);
  if (matchArray) {
    return matchArray[0];
  } else {
    return null;
  }
}

function extractComment(entry) {
  entryCopy = entry;
  regexes.forEach(function(re, key, map) {
    entryCopy = entryCopy.replace(re, '');
  });
  return entryCopy.trim();

}

function convertToNumber(entry) {
  return parseFloat(entry.replace(',', '.'));
}

// ***********************************

let note1 = '180401 13-22 4,5v 4376s 159/9';
let note2 = '171227 14-2330 440/20 4,5v 7533s';
let note3 = '171228 14-2330 340/30 4,5v 12659s Leif 5000:-';
let note4 = '171221 1730-2130 v libanesiskt julbord-hjälp';

let workday = stringToWorkday(note3);
console.log(workday);
