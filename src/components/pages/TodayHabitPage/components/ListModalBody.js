import { forwardRef, useImperativeHandle, useState } from "react";
import { patchHabit } from "../../../../api/api";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.svg";
import './ListModalBody.css'

const ListModalBody = forwardRef(({ habit, idx, setDeletedIdx}, ref) => {
  const [value, setValue] = useState({ name: habit.name });
  const [patchInput, setPatchInput] = useState(false);
  const [hideDelete, setHideDelete] = useState(false);
  const habitId = habit.id;

  // 삭제 함수
  const deleteHabitHandler = () => {
    setDeletedIdx((preDeleted) => [...preDeleted, idx]);
    setHideDelete(true);
  };

  //patch input 생성 함수
  const patchClick = () => {
    setPatchInput(true);
  };

  // value와 input 값 일치 함수
  const changValueHandler = (e) => {
    setValue({ name: e.target.value });
  };

  // 상위 컴포에서 쓸 함수(PATCH API)
  useImperativeHandle(ref, () => ({
    sendRequest: async () => {
      if (value.name !== habit.name) {
        const data = await patchHabit(habitId, value);
        setPatchInput(false);
        return data;
      }
      return null;
    },
  }));

  return (
    <>
      {hideDelete || (
        <div className="ListModalBody__list-body flex-row border-box">
          {!patchInput && <div className="ListModalBody__text ListModalBody__flex-align flex-row font16 bold border-box" onClick={patchClick}>{habit.name}</div>}
          {patchInput && (
            <input className="ListModalBody__text ListModalBody__text-align font16 bold border-box" value={value.name} onChange={changValueHandler} />
          )}
          <img className="ListModalBody__img-trashCan" onClick={deleteHabitHandler} src={trashCanImg} alt="쓰레기통" />
        </div>
      )}
    </>
  );
});

export default ListModalBody;
