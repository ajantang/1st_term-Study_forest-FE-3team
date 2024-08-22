import { forwardRef, useImperativeHandle, useState } from "react";
import { deleteHabit, patchHabit } from "../../../../api/api";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.png";

const ListModalBody = forwardRef(({ habit, setReRender, setDeleted }, ref) => {
  const [value, setValue] = useState({ name: habit.name });
  const [patchInput, setPatchInput] = useState(false);
  const habitId = habit.id;

  // 삭제 함수
  const deleteHabitHandler = async () => {
    await deleteHabit(habitId);
    setReRender(true);
    setDeleted(true);
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
    },
  }));

  return (
    <div>
      {!patchInput && <div onClick={patchClick}>{habit.name}</div>}
      {patchInput && <input value={value.name} onChange={changValueHandler} />}
      <img onClick={deleteHabitHandler} src={trashCanImg} alt="쓰레기통" />
    </div>
  );
});

export default ListModalBody;
