export function changeDigits(i) {
  i = String(i);
  if (i.length === 1) {
    i = i.padStart(2, "0");
  } else if (i.length >= 3) {
    i = i.substring(1, 3);
  }
  return i;
}

export function changeTime(i) {
  if (i <= 60) {
    i = "00:" + changeDigits(String(i));
  } else {
    i = changeDigits(Math.floor(i / 60)) + ":" + changeDigits(String(i % 60));
  }
  return i;
}

