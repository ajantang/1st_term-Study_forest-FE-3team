import { useEffect, useState, useContext } from "react";
import { studyIdContext } from "./StudyBody";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { getEmojiInfo, addEmojiInfo } from "../../../../api/api";

import { ReactComponent as Plus } from "../../../../assets/images/ic_plus.svg";

import "./Emojis.css";

export function Emoji({ emojiCode, emojiCount }) {
  const parsedEmojiCode = parseInt(emojiCode, 16);
  const emoji = String.fromCodePoint(parsedEmojiCode);

  if (emojiCount > 99) {
    emojiCount = "99+";
  }

  return (
    <div className="flex-row font16 regular emoji">
      <div className="emoji__emoji">{emoji}</div>
      {emojiCount}
    </div>
  );
}

export function Emojis({ showExtraEmojisBtn = true, showAddEmojiBtn = true }) {
  const [isExtraOpne, setIsExtraOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [extraBtnClass, setExtraBtnClass] = useState(
    "flex-row font16 regular emojis__btn-extra"
  );
  const [emojis, setEmojis] = useState([]);

  let studyId = useContext(studyIdContext);

  const handleAddEmoji = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleSelectedEmoji = (emoji) => {
    setIsPickerOpen(false);
    addEmojiInfo(studyId, emoji.unified).then((data) => {
      const updatedEmojiIndex = emojis.findIndex(
        (emoji) => emoji.emojiCode === data.emojiCode
      );

      if (updatedEmojiIndex === -1) {
        const newEmoji = { emojiCode: data.emojiCode, count: 1 };
        setEmojis([...emojis, newEmoji]);
      } else {
        emojis[updatedEmojiIndex].count++;
        const sortedMmojis = [...emojis].sort((a, b) => b.count - a.count);
        setEmojis(sortedMmojis);
      }
    });
  };

  const emojiBoxes = () => {
    if (emojis.length > 3) {
      const topThreeEmojis = emojis.slice(0, 3);
      const emojiBoxes = topThreeEmojis.map((emoji, index) => {
        return (
          <Emoji
            key={index}
            emojiCode={emoji.emojiCode}
            emojiCount={emoji.count}
          />
        );
      });
      return emojiBoxes;
    }

    const emojiBoxes = emojis.map((emoji, index) => {
      return (
        <Emoji
          key={index}
          emojiCode={emoji.emojiCode}
          emojiCount={emoji.count}
        />
      );
    });
    return emojiBoxes;
  };

  const extraEmojiBtn = () => {
    const extraEmojis = emojis.slice(3).map((emoji, index) => {
      return (
        <Emoji
          key={index}
          emojiCode={emoji.emojiCode}
          emojiCount={emoji.count}
        />
      );
    });

    const handleExtraEmojiBtn = () => {
      setIsExtraOpen(!isExtraOpne);
      setExtraBtnClass(
        extraBtnClass === "flex-row font16 regular emojis__btn-extra"
          ? "flex-row font16 regular emojis__btn-extra-clicked"
          : "flex-row font16 regular emojis__btn-extra"
      );
    };

    const extraEmojiBtn = (
      <div className="emojis__anchor">
        <div className={extraBtnClass} onClick={handleExtraEmojiBtn}>
          <Plus /> {emojis.length - 3}..
        </div>
        {isExtraOpne ? (
          <div className="flex-row font16 emojis__extra">{extraEmojis}</div>
        ) : undefined}
      </div>
    );
    return extraEmojiBtn;
  };

  const addEmojiBtn = () => {
    const addEmojiBtn = (
      <div className="emojis__anchor">
        <svg className="emojis__btn-add" onClick={handleAddEmoji} />
        {isPickerOpen && (
          <div className="emojis__picker">
            <Picker data={data} onEmojiSelect={handleSelectedEmoji} />
          </div>
        )}
      </div>
    );
    return addEmojiBtn;
  };

  useEffect(() => {
    getEmojiInfo(studyId)
      .then((data) => {
        totalCount = data.totalCount;
        setEmojis([...data.Emojis]);
      })
      .catch((err) => {});
  }, [studyId]);

  return (
    <div className="flex-row emojis">
      <div className="flex-row font20 emojis__boxes">{emojiBoxes()}</div>
      {showExtraEmojisBtn ? extraEmojiBtn() : undefined}
      {showAddEmojiBtn ? addEmojiBtn() : undefined}
    </div>
  );
}

export default Emojis;
