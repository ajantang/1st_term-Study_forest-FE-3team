import { useState, useEffect } from "react";
import { gethabitData } from "../../../../api/api";
import "./HabitRecord.css";

import { ReactComponent as StickerEmpty } from "../../../../assets/images/sticker_empty.svg";
import { ReactComponent as Sticker01 } from "../../../../assets/images/sticker_light_green_100_01.svg";
import { ReactComponent as Sticker02 } from "../../../../assets/images/sticker_light_green_100_02.svg";
import { ReactComponent as Sticker03 } from "../../../../assets/images/sticker_light_green_100_03.svg";
import { ReactComponent as Sticker04 } from "../../../../assets/images/sticker_light_mint_100_04.svg";
import { ReactComponent as Sticker05 } from "../../../../assets/images/sticker_light_mint_200_05.svg";
import { ReactComponent as Sticker06 } from "../../../../assets/images/sticker_green_06.svg";
import { ReactComponent as Sticker07 } from "../../../../assets/images/sticker_blue_100_07.svg";
import { ReactComponent as Sticker08 } from "../../../../assets/images/sticker_blue_200_08.svg";
import { ReactComponent as Sticker09 } from "../../../../assets/images/sticker_blue_300_09.svg";
import { ReactComponent as Sticker10 } from "../../../../assets/images/sticker_purple_100_10.svg";
import { ReactComponent as Sticker11 } from "../../../../assets/images/sticker_purple_200_11.svg";
import { ReactComponent as Sticker12 } from "../../../../assets/images/sticker_purple_300_12.svg";
import { ReactComponent as Sticker13 } from "../../../../assets/images/sticker_yellow_100_13.svg";
import { ReactComponent as Sticker14 } from "../../../../assets/images/sticker_yellow_200_14.svg";
import { ReactComponent as Sticker15 } from "../../../../assets/images/sticker_yellow_300_15.svg";
import { ReactComponent as Sticker16 } from "../../../../assets/images/sticker_pink_100_16.svg";
import { ReactComponent as Sticker17 } from "../../../../assets/images/sticker_pink_200_17.svg";
import { ReactComponent as Sticker18 } from "../../../../assets/images/sticker_pink_300_18.svg";

const stickers = [
  <StickerEmpty />,
  <Sticker01 />,
  <Sticker02 />,
  <Sticker03 />,
  <Sticker04 />,
  <Sticker05 />,
  <Sticker06 />,
  <Sticker07 />,
  <Sticker08 />,
  <Sticker09 />,
  <Sticker10 />,
  <Sticker11 />,
  <Sticker12 />,
  <Sticker13 />,
  <Sticker14 />,
  <Sticker15 />,
  <Sticker16 />,
  <Sticker17 />,
  <Sticker18 />,
];

function HabitMark({ type }) {
  let svg = stickers[type];

  return <div className="habitrecord__table-habitsuccess">{svg}</div>;
}

function HabitWeekRecord({
  habitName = "습관 이름",
  stickerType = 0,
  successIndices = [],
}) {
  stickerType = (stickerType % 18) + 1;

  console.log(successIndices);

  const weekRecord = [
    <HabitMark key="0" type="0" />,
    <HabitMark key="1" type="0" />,
    <HabitMark key="2" type="0" />,
    <HabitMark key="3" type="0" />,
    <HabitMark key="4" type="0" />,
    <HabitMark key="5" type="0" />,
    <HabitMark key="6" type="0" />,
  ];

  successIndices.forEach((indexInfo) => {
    weekRecord[indexInfo] = <HabitMark key={indexInfo} type={stickerType} />;
  });

  return (
    <div className="flex-row">
      <div className="bold habitrecord__table-habitname">{habitName}</div>
      <div className="flex-row habitrecord__table-habitsuccesses">
        {weekRecord}
      </div>
    </div>
  );
}

function HabitWeekRecords({ totalCount, habits }) {
  let data = null;

  if (totalCount) {
    data = (
      <div className="habitrecord__table-value-frame">
        {habits.map((habit, index) => {
          return (
            <HabitWeekRecord
              key={index}
              habitName={habit.name}
              stickerType={index}
              successIndices={habit.success}
            />
          );
        })}
      </div>
    );
  } else {
    data = (
      <div className="flex-col font20 medium habitrecord__empty-message">
        <div>아직 습관이 없어요</div>
        <div>오늘의 습관에서 습관을 생성해보세요</div>
      </div>
    );
  }

  return data;
}

function Dates() {
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const recentOneWeek = [];

  for (let i = 0; i < 7; i++) {
    const now = new Date();
    now.setDate(now.getDate() - i);
    const newDate = new Date(now);
    recentOneWeek[6 - i] = {
      date: newDate.getDate(),
      day: weekDays[newDate.getDay()],
    };
  }

  const marks = recentOneWeek.map((date, index) => {
    const mark = `${date.date} (${date.day})`;
    return (
      <div key={index} className="habitrecord__title-day">
        {mark}
      </div>
    );
  });

  return <div className="flex-row habitrecord__title-days">{marks}</div>;
}

export function HabitRecord({ studyId }) {
  const [habits, setHabits] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    gethabitData(studyId)
      .then((data) => {
        setTotalCount(data.totalHabit);
        setHabits(data.habits);
      })
      .catch((err) => {
        /* 에러 처리 : 기획 필요필요 */
      });
  }, []);

  return (
    <div className="study__habits habitrecord">
      <div className="extra-bold habitrecord__title">습관 기록표</div>
      <div className="habitrecord__table">
        <Dates />
        <HabitWeekRecords totalCount={totalCount} habits={habits} />
      </div>
    </div>
  );
}

export default HabitRecord;
