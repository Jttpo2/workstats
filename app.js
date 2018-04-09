
let re = {};
re.date = /^\d{6}\b/; // 6 digits at beginning of line with trailing whitespace
re.startTime = /\b(?:\d{2}|\d{4})(?=\-)/; // 2 or 4 digits at start of word followed by '-'
re.endTime = /(?<=-)(?:\d{2}|\d{4})\b/; //2 or 4 digits preceded by '-' followed by word boundary
re.totalTips = /\b\d+(?=\/)/; // one or more digits at start of word followed by forward slash
re.kitchenTips = /(?<=\/)(?:\d+)\b/; // one or more digits preceded by forward slash, at end of word
re.whiteHours = /\b[0-9,\.]+(?=v\b)/; // one or more digits or ',' or '.' followed by 'v' at end of word
re.salesTotal = /\b\d+(?=s\b)/; // one or more digits at start of word, followed by letter 's' at end of word

function stringToWorkday(entry) {
  let workday = {};

  workday.date = getFirstMatchStringFrom(entry, re.date);
  workday.startTime = getFirstMatchStringFrom(entry, re.startTime);
  workday.endTime = getFirstMatchStringFrom(entry, re.endTime);
  workday.totalTips = getFirstMatchStringFrom(entry, re.totalTips);
  workday.kitchenTips = getFirstMatchStringFrom(entry, re.kitchenTips);
  workday.whiteHours = getFirstMatchStringFrom(entry, re.whiteHours).replace(',', '.');
  workday.salesTotal = getFirstMatchStringFrom(entry, re.salesTotal);

  return workday;
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
