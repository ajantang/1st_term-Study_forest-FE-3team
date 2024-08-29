import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./BackgroundSelector.css";

const BACKGROUND_GREEN = {
  class: "background-selector__green",
  imageUrl: "https://ifh.cc/g/zaNc6p.jpg",
};
const BACKGROUND_YELLOW = {
  class: "background-selector__yellow",
  imageUrl: "https://ifh.cc/g/QkXtRJ.jpg",
};
const BACKGROUND_BLUE = {
  class: "background-selector__blue",
  imageUrl: "https://ifh.cc/g/Lc8rN9.jpg",
};
const BACKGROUND_PINK = {
  class: "background-selector__pink",
  imageUrl: "https://ifh.cc/g/3YoYNa.jpg",
};
const BACKGROUND_CLOCK = {
  class: "background-selector__clock",
  imageUrl: "https://ifh.cc/g/m4hJV4.jpg",
};
const BACKGROUND_LEAF1 = {
  class: "background-selector__leaf1",
  imageUrl: "https://ifh.cc/g/73YYHS.jpg",
};
const BACKGROUND_BOOKS = {
  class: "background-selector__books",
  imageUrl: "https://ifh.cc/g/44BxpL.jpg",
};
const BACKGROUND_LEAF2 = {
  class: "background-selector__leef2",
  imageUrl: "https://ifh.cc/g/k9Gd8J.jpg",
};

const backgroundClassList = [
  BACKGROUND_GREEN,
  BACKGROUND_YELLOW,
  BACKGROUND_BLUE,
  BACKGROUND_PINK,
  BACKGROUND_CLOCK,
  BACKGROUND_LEAF1,
  BACKGROUND_BOOKS,
  BACKGROUND_LEAF2,
];

const BackgroundSelector = forwardRef(({ classListIndex, onClick }, ref) => {
  const [isSelected, setIsSelected] = useState(false);
  const divRef = useRef(null);

  useImperativeHandle(ref, () => ({
    cancelSelect: () => {
      setIsSelected(false);
    },
  }));

  const selectorClick = () => {
    setIsSelected(true);
    onClick(classListIndex, backgroundClassList[classListIndex].imageUrl);
  };

  const backgroundSelectorClass = `flex-row background-selector ${backgroundClassList[classListIndex].class}`;

  useEffect(() => {
    if (divRef.current) {
      const backgroundImageUrl = `url(${backgroundClassList[classListIndex].imageUrl})`;
      divRef.current.style.backgroundImage = backgroundImageUrl;
    }
  }, []);

  const returnTags = (
    <div
      ref={divRef}
      className={backgroundSelectorClass}
      onClick={selectorClick}
    >
      {isSelected ? (
        <svg className="background-selector__selected-mark" />
      ) : undefined}
    </div>
  );

  return returnTags;
});

export default BackgroundSelector;
