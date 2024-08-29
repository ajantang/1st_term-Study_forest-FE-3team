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
  rockButtonPost,
  setRockButtonPost,
}) {
  const [value, setValue] = useState(habit);                  // 생성할 습관 이름 저장
  const [patchInput, setPatchInput] = useState(false);        // 습관 수정 input 공개 여부
  const [deleted, setDeleted] = useState(false);              // 삭제 예정 시 프론트에서 지우기 위한 값
  const [checkLength0, setCheckLength0] = useState(false);    // 문자 길이가 0일때 에러 메세지 공개 여부
  const [checkLength30, setCheckLength30] = useState(false);  // 문자 길이가 30을 넘을때 에러 메세지 공개 여부

  //patch input 생성 함수
  const patchClick = () => {
    setPatchInput(true);
  };

  // value와 input 값 일치 함수
  const changeValueHandler = (e) => {
    setValue(e.target.value);

    // 키보드를 꾹 눌렀을 때를 위한 로직
    if (value.trim().length > 30) {
      // 문자 길이가 30을 넘을 때
      setCheckLength30(true);

      const rockButtonPosts = [...rockButtonPost];
      rockButtonPosts[idx] = true;
      setRockButtonPost(rockButtonPosts);
    } else {
      // 문자 길이가 문제 없을때
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
      // 문자 길이가 0일 때
      setCheckLength0(true);
      setCheckLength30(false);

      const rockButtonPosts = [...rockButtonPost];
      rockButtonPosts[idx] = true;
      setRockButtonPost(rockButtonPosts);
    } else if (value.trim().length > 30) {
      // 문자 길이가 30을 넘을 때
      setCheckLength30(true);

      const rockButtonPosts = [...rockButtonPost];
      rockButtonPosts[idx] = true;
      setRockButtonPost(rockButtonPosts);
    } else {
      // 문자 길이가 문제 없을때
      setCheckLength0(false);
      setCheckLength30(false);

      const rockButtonPosts = [...rockButtonPost];
      rockButtonPosts[idx] = false;
      setRockButtonPost(rockButtonPosts);
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

    const rockButtonPosts = [...rockButtonPost];
    rockButtonPosts[idx] = false;
    setRockButtonPost(rockButtonPosts);
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
