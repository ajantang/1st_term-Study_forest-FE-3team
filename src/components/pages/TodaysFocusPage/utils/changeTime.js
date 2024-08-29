// 한 자리 값 입력 시 앞에 0표시, 3자리값 이상 입력 시 2자릿수로 자름
export function changeDigits(i) {
  i = String(i);
  if (i.length === 1) {
    i = i.padStart(2, "0");
  } else if (i.length >= 3) {
    i = i.substring(1, 3);
  }
  return i;
}

// 화면에 시간 타입으로 표시
export function changeTime(i) {
  if (i >= 6000) {
    i = 5999;
  }

  if (i < 60) {
    i = "00:" + changeDigits(String(i));
  } else {
    i = changeDigits(Math.floor(i / 60)) + ":" + changeDigits(String(i % 60));
  }
  return i;
}
