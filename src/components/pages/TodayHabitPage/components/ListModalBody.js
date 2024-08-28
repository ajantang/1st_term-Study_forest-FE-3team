import { forwardRef, useImperativeHandle, useState } from "react";
import { patchHabit } from "../../../../api/api";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.svg";
import "./ListModalBody.css";

const ListModalBody = forwardRef(
  (
    {
      habit,
      idx,
      setDeletedIdx,
      listClass,
      setListClass,
      rockButton,
      setRockButton,
    },
    ref
  ) => {
    const [value, setValue] = useState({ name: habit.name });
    const [patchInput, setPatchInput] = useState(false);
    const [hideDelete, setHideDelete] = useState(false);
    const [checkLength0, setCheckLength0] = useState(false);
    const [checkLength30, setCheckLength30] = useState(false);
    const habitId = habit.id;

    // 삭제 함수
    const deleteHabitHandler = () => {
      setDeletedIdx((preDeleted) => [...preDeleted, idx]);
      setHideDelete(true);
      const ListClasses = [...listClass];
      ListClasses[idx] = "li-delete";
      setListClass(ListClasses);
      const rockButtons = [...rockButton];
      rockButtons[idx] = false;
      setRockButton(rockButtons);
    };

    //patch input 생성 함수
    const patchClick = () => {
      setPatchInput(true);
    };

    // value와 input 값 일치 함수
    const changValueHandler = (e) => {
      setValue({ name: e.target.value });

      if (value.name.trim().length === 0) {
        setCheckLength0(true);
        setCheckLength30(false);
      } else if (value.name.trim().length > 30) {
        setCheckLength30(true);
        const rockButtons = [...rockButton];
        rockButtons[idx] = true;
        setRockButton(rockButtons);
      } else {
        setCheckLength0(false);
        setCheckLength30(false);
      }
    };

    // value값 검사 함수
    const checkValueHandler = () => {
      if (value.name.trim().length === 0) {
        setCheckLength0(true);
        setCheckLength30(false);
        const rockButtons = [...rockButton];
        rockButtons[idx] = true;
        setRockButton(rockButtons);
      } else if (value.name.trim().length > 30) {
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
            {!patchInput && (
              <div
                className="ListModalBody__text ListModalBody__flex-align flex-row font16 bold border-box"
                onClick={patchClick}
              >
                {habit.name}
              </div>
            )}
            {patchInput && (
              <input
                className="ListModalBody__text ListModalBody__text-align font16 bold border-box"
                value={value.name}
                onChange={changValueHandler}
                onKeyUp={checkValueHandler}
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
              onClick={deleteHabitHandler}
              src={trashCanImg}
              alt="쓰레기통"
            />
          </div>
        )}
      </>
    );
  }
);

export default ListModalBody;
