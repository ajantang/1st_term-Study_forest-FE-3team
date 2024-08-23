import { useState } from "react";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.svg";

function ListModalPost({ habit, idx, postValues, setPostValues }) {
  const [value, setValue] = useState(habit);
  const [patchInput, setPatchInput] = useState(false);
  const [deleted, setDeleted] = useState(false);

  //patch input 생성 함수
  const patchClick = () => {
    setPatchInput(true);
  };

  const changeValueHandler = (e) => {
    setValue(e.target.value);
  };

  // postValues 배열 내 해당하는 습관 이름 수정 함수
  const changePostValuesHandler = () => {
    const postValue = [...postValues];
    postValue[idx] = value;
    setPostValues(postValue);
  };

  // 삭제 함수
  const deleteHandler = () => {
    const postValue = [...postValues];
    postValue[idx] = "";
    setPostValues(postValue);
    setDeleted(true);
  };

  return (
    <>
      {deleted || (
        <div>
          {!patchInput && <div onClick={patchClick}>{habit}</div>}
          {patchInput && (
            <input
              value={value}
              onChange={changeValueHandler}
              onKeyUp={changePostValuesHandler}
            />
          )}
          <img onClick={deleteHandler} src={trashCanImg} alt="쓰레기통" />
        </div>
      )}
    </>
  );
}

export default ListModalPost;
