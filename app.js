
let dateRe = /^\d{6}\b/;

function stringToWorkday(entry) {
  let workday = {};
  let matchArray = dateRe.exec(note);
  workday.date = matchArray[0];

  return workday;
}

let note = '180401 13-22 4,5v 4376s 159/9';

let workday = stringToWorkday(note);
console.log(workday.date);
