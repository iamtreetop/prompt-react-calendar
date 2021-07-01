export const formatTime = (time) => {
  let numTime = Number(time.slice(0, 2)) % 12;
  if (Number(time.slice(0, 2)) < 12 || Number(time.slice(0, 2)) === 24) {
    return numTime + time.slice(2) + "am";
  } else {
    return numTime.toString() + time.slice(2) + "pm";
  }
};
