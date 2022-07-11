export const formatInterval = (sec_num) => {
  var minutes = Math.floor(sec_num / 60);
  var seconds = sec_num - (minutes * 60);
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ':' + seconds;
  
}