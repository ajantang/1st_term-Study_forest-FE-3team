import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import "./Emoji.css";

export function Emoji() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [tempEmoji, setTempEmoji] = useState("이모지 출력 영역");

  const handleAddEmoji = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleSelectedEmoji = (e) => {
    setIsPickerOpen(false);
    setTempEmoji(e.native);
    alert("기능 추가 예정 / log 확인");
    console.log(e);
  };

  const showTempEmoji = () => {
    return tempEmoji;
  };

  return (
    <div className="flex-row emoji">
      <div className="font20">{showTempEmoji()}</div>
      <div className="emoji__anchor">
        <svg className="emoji__btn-add" onClick={handleAddEmoji} />
        {isPickerOpen && (
          <div className="emoji__picker">
            <Picker data={data} onEmojiSelect={handleSelectedEmoji} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Emoji;
