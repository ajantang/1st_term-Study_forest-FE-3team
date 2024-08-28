import { useState } from "react";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.svg";
import "./ListModalBody.css";

function ListModalPost({
  habit,
  idx,
  postValues,
  setPostValues,
  postClass,
  setPostClass,
  rockButton,
  setRockButton,
}) {
  const [value, setValue] = useState(habit);
  const [patchInput, setPatchInput] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [checkLength0, setCheckLength0] = useState(false);
  const [checkLength30, setCheckLength30] = useState(false);

  //patch input 생성 함수
  const patchClick = () => {
    setPatchInput(true);
  };

  const changeValueHandler = (e) => {
    setValue(e.target.value);

    if (value.trim().length === 0) {
      setCheckLength0(true);
      setCheckLength30(false);
    } else if (value.trim().length > 30) {
      setCheckLength30(true);
      const rockButtons = [...rockButton];
      rockButtons[idx] = true;
      setRockButton(rockButtons);
    } else {
      setCheckLength0(false);
      setCheckLength30(false);
    }
  };

  // postValues 배열 내 해당하는 습관 이름 수정 및 value값 검사 함수
  const changePostValuesHandler = () => {
    const postValue = [...postValues];
    postValue[idx] = value;
    setPostValues(postValue);

    if (value.trim().length === 0) {
      setCheckLength0(true);
      setCheckLength30(false);
      const rockButtons = [...rockButton];
      rockButtons[idx] = true;
      setRockButton(rockButtons);
    } else if (value.trim().length > 30) {
      setCheckLength30(true);
      const rockButtons = [...rockButton];
      rockButtons[idx] = true;
      setRockButton(rockButtons);
    } else {
      setCheckLength0(false);
      setCheckLength30(false);
      const rockButtons = [...rockButton];
      rockButtons[idx] = false;
      setRockButton(rockButtons);
    }
  };

  // 삭제 함수
  const deleteHandler = () => {
    const postValue = [...postValues];
    postValue[idx] = "";
    setPostValues(postValue);
    setDeleted(true);
    const PostClasses = [...postClass];
    PostClasses[idx] = "li-delete";
    setPostClass(PostClasses);
    const rockButtons = [...rockButton];
    rockButtons[idx] = false;
    setRockButton(rockButtons);
  };

  return (
    <>
      {deleted || (
        <div className="ListModalBody__list-body flex-row border-box">
          {!patchInput && (
            <div
              className="ListModalBody__text ListModalBody__flex-align flex-row font16 bold border-box"
              onClick={patchClick}
            >
              {habit}
            </div>
          )}
          {patchInput && (
            <input
              className="ListModalBody__text ListModalBody__text-align font16 bold border-box"
              value={value}
              onChange={changeValueHandler}
              onKeyUp={changePostValuesHandler}
            />
          )}
          {checkLength0 && (
            <p className="ListModalBody__text-check font12 semi-bold">
              값을 입력해주세요
            </p>
          )}
          {checkLength30 && (
            <p className="ListModalBody__text-check font12 semi-bold">
              30자 이내로 입력해주세요
            </p>
          )}
          <img
            className="ListModalBody__img-trashCan"
            onClick={deleteHandler}
            src={trashCanImg}
            alt="쓰레기통"
          />
        </div>
      )}
    </>
  );
}

export default ListModalPost;
