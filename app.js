let ids = {
  date: 'date',
  startTime : 'startTime',
  endTime: 'endTime',
  totalTips: 'totalTips',
  kitchenTips: 'kitchenTips',
  whiteHours: 'whiteHours',
  salesTotal: 'salesTotal'
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
    workdayMap.set(key, getFirstMatchStringFrom(entry, re))
  });

  // Replace ','s with '.'s
  let whiteHours = workdayMap.get(ids.whiteHours);
  workdayMap.set(ids.whiteHours, whiteHours.replace(',', '.'));

  return workdayMap;
}

function getFirstMatchStringFrom(note, re) {
  let matchArray = re.exec(note);
  if (matchArray) {
    return matchArray[0];
  } else {
    return null;
  }
}

let note1 = '180401 13-22 4,5v 4376s 159/9';
let note2 = '171227 14-2330 440/20 4,5v 7533s';

let workday = stringToWorkday(note1);
console.log(workday);
