module.exports = {
  dateconv,
  secondsToHms,
  nano
}


function nano(d) {
  d = Number(d);
  var h = Math.floor(d / 1000000);
  var m = Math.floor(d % 1000000 / 1000);
  var s = Math.floor(d % 1000000 % 1000);

  var hDisplay = h > 0 ? h + "ms " : "";
  var mDisplay = m > 0 ? m + "μs " : "";
  var sDisplay = s > 0 ? s + "ns " : "";
  return hDisplay + mDisplay + sDisplay;
}

function dateconv(timestamp) {
  var date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}
