<<<<<<< HEAD
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
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
      rockButtonBody,
      setRockButtonBody,
    },
    ref
  ) => {
    const [value, setValue] = useState({ name: habit.name }); // 습관 이름 저장
    const [patchInput, setPatchInput] = useState(false); // 습관 수정 input 공개 여부
    const [hideDelete, setHideDelete] = useState(false); // 삭제 예정 시 프론트에서 지우기 위한 값
    const [checkLength0, setCheckLength0] = useState(false); // 문자 길이가 0일때 에러 메세지 공개 여부
    const [checkLength30, setCheckLength30] = useState(false); // 문자 길이가 30을 넘을때 에러 메세지 공개 여부
    const habitId = habit.id;
    const inputRef = useRef(null);

    // 삭제 함수
    const deleteHabitHandler = () => {
      setDeletedIdx((preDeleted) => [...preDeleted, idx]);
      setHideDelete(true);

      const ListClasses = [...listClass];
      ListClasses[idx] = "li-delete";
      setListClass(ListClasses); // 상위 컴포에서 해당 컴포를 감싸는 li 태그를 지우는 로직

      const rockButtonBodys = [...rockButtonBody];
      rockButtonBodys[idx] = false;
      setRockButtonBody(rockButtonBodys);
    };

    //patch input 생성 함수
    const patchClick = () => {
      setPatchInput(true);
      setTimeout(() => {
        inputRef.current.focus();  // input 요소로 포커스 이동
      }, 50);
    };

    // value와 input 값 일치 함수
    const changValueHandler = (e) => {
      setValue({ name: e.target.value });

      // 키보드를 꾹 눌렀을 때를 위한 로직
      if (value.name.trim().length > 30) {
        // 문자 길이가 30을 넘을 때
        setCheckLength30(true);

        const rockButtonBodys = [...rockButtonBody];
        rockButtonBodys[idx] = true;
        setRockButtonBody(rockButtonBodys);

      } else {
        // 문자 길이가 문제 없을때
        setCheckLength0(false);
        setCheckLength30(false);
      }
    };

    // value값 검사 함수
    const checkValueHandler = () => {
      if (value.name.trim().length === 0) {
        // 문자 길이가 0일 때
        setCheckLength0(true);
        setCheckLength30(false);

        const rockButtonBodys = [...rockButtonBody];
        rockButtonBodys[idx] = true;
        setRockButtonBody(rockButtonBodys);

      } else if (value.name.trim().length > 30) {
        // 문자 길이가 30을 넘을 때
        setCheckLength30(true);

        const rockButtonBodys = [...rockButtonBody];
        rockButtonBodys[idx] = true;
        setRockButtonBody(rockButtonBodys);

      } else {
        // 문자 길이가 문제 없을때
        setCheckLength0(false);
        setCheckLength30(false);

        const rockButtonBodys = [...rockButtonBody];
        rockButtonBodys[idx] = false;
        setRockButtonBody(rockButtonBodys);
      }
    };

    // 상위 컴포에서 쓸 함수(PATCH API)
    useImperativeHandle(ref, () => ({
      sendRequest: async () => {
        if (value.name !== habit.name && !hideDelete) {
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
                ref={inputRef}
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
=======
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
>>>>>>> develop

export default ListModalBody;
