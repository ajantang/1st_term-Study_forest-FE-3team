import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./emoji.css";

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
    <emoji className="flex-row">
      <div className="font20">{showTempEmoji()}</div>
      <div>
        <svg className="emoji__btn-add" onClick={handleAddEmoji} />
        {isPickerOpen && (
          <Picker data={data} onEmojiSelect={handleSelectedEmoji} />
        )}
      </div>
    </emoji>
  );
}

export default Emoji;
