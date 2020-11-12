module.exports = {
  dateconv,
  secondsToHms,
  nano
}


function nano(d) {
  d = Number(d);
  let h = Math.floor(d / 1000000);
  let m = Math.floor(d % 1000000 / 1000);
  let s = Math.floor(d % 1000000 % 1000);

  let hDisplay = h > 0 ? h + "ms " : "";
  let mDisplay = m > 0 ? m + "μs " : "";
  let sDisplay = s > 0 ? s + "ns " : "";
  return hDisplay + mDisplay + sDisplay;
}

function dateconv(timestamp) {
  let date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function secondsToHms(d) {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor(d % 3600 / 60);
  let s = Math.floor(d % 3600 % 60);

  let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}
