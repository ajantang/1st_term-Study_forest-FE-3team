import { useEffect, useState, useRef } from "react";
import { deleteHabit, gethabitList, postHabit } from "../../../../api/api";
import ListModalBody from "./ListModalBody";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.svg";
import btn_patchComplit from "../../../../assets/images/btn_patchComplit.svg";
import btn_cancle from "../../../../assets/images/btn_cancel.svg";
import ListModalPost from "./ListModalPost";

function ListModal({ studyId, modalState, patchList, setPageRender }) {
  const [list, setList] = useState([]);
  const [habitIds, setHabitIds] = useState([]);
  const [deletedIdx, setDeletedIdx] = useState([]);
  const [postInput, setPostInput] = useState(false);
  const [value, setValue] = useState("");
  const [postValues, setPostValues] = useState([]);
  const [reRender, setReRender] = useState(false);

  const childRefs = useRef([]);

  useEffect(() => {
    // API 호출 함수
    const getList = async () => {
      const data = await gethabitList(studyId);
      setList(data.habits);

      // 습관 아이디 배열로 저장
      const Ids = data.habits.map((habit) => {
        return habit.id;
      });
      setHabitIds(Ids);
    };

    if (!list[0] && modalState) {
      // 첫 렌더링 시
      getList();
    } else if (reRender) {
      getList();
      setReRender(false);
      setValue("");
    }
  }, [studyId, modalState, list, reRender]);

  // value와 input 값 일치 함수
  const changeValueHandler = (e) => {
    setValue(e.target.value);
  };

  // post input 생성 함수
  const postInputHandler = async () => {
    if (!postInput) {
      setPostInput(true);
    } else if (postInput && value !== "") {
      setPostValues((prePostValues) => [...prePostValues, value]);
      setValue("");
    }
  };

  // 수정 완료 함수
  const patchSuccessHandler = async () => {
    const filterValus = postValues.filter((habit) => habit !== "");

    if (filterValus[0]) {
      patchList(); // 모달창 닫기

      const promises = childRefs.current.map((ref) => ref.sendRequest()); // 이름 수정 있을 시 작동

      const postPromises = filterValus.map(async (habit) => {
        const surveyData = { name: habit };
        const result = await postHabit(studyId, surveyData);
        return result;
      });

      const deletePromis = deletedIdx.map(async (idx) => {
        if (idx) {
          const habitId = habitIds[idx];
          return await deleteHabit(habitId);
        }
      });

      if (value) {
        // input에 값이 존재할 시
        const surveyData = { name: value };
        const postResult = await postHabit(studyId, surveyData);
        await Promise.all([
          ...promises,
          ...postPromises,
          ...deletePromis,
          postResult,
        ]);
      } else {
        await Promise.all([...promises, ...postPromises, ...deletePromis]); // input에 값이 없을 시
      }

      setValue("");
      setPostValues([]);
      setHabitIds([]);
      setDeletedIdx([]);
      setReRender(true);
      setPostInput(false);
      setPageRender(true);
    } else if (value) {
      // input에만 값이 있을 때
      patchList();
      const promises = childRefs.current.map((ref) => ref.sendRequest());

      const surveyData = { name: value };
      const postResult = await postHabit(studyId, surveyData);

      const deletePromis = deletedIdx.map(async (idx) => {
        if (idx) {
          const habitId = habitIds[idx];
          return await deleteHabit(habitId);
        }
      });

      await Promise.all([...promises, ...deletePromis, postResult]);

      setValue("");
      setPostValues([]);
      setHabitIds([]);
      setDeletedIdx([]);
      setReRender(true);
      setPostInput(false);
      setPageRender(true);
    } else {
      patchList();
      setPostInput(false);

      // 이름 수정 있을 시 작동
      const promises = childRefs.current.map((ref) => ref.sendRequest());

      const deletePromis = deletedIdx.map(async (idx) => {
        if (idx) {
          const habitId = habitIds[idx];
          return await deleteHabit(habitId);
        }
      });

      const resultArrey = await Promise.all([...promises, ...deletePromis]);
      const result = resultArrey.filter(
        (arrey) => arrey !== null && arrey !== undefined
      );

      if (result[0]) {
        setHabitIds([]);
        setDeletedIdx([]);
        setReRender(true);
        setPageRender(true);
      }
    }
  };

  // 취소 버튼 함수
  const cencelHandler = () => {
    patchList();
    setPostInput(false);
    setValue("");
    setPostValues([]);
    setDeletedIdx([]);
  };

  return (
    <>
      {modalState && (
        <div>
          <p>습관 목록</p>
          <ol>
            {list.map((habit, index) => {
              return (
                <li key={habit.id}>
                  <ListModalBody
                    habit={habit}
                    idx={index}
                    setDeletedIdx={setDeletedIdx}
                    ref={(el) => (childRefs.current[index] = el)}
                  />
                </li>
              );
            })}
            {postValues.map((habit, idx) => {
              return (
                <li key={idx}>
                  <ListModalPost
                    habit={habit}
                    idx={idx}
                    postValues={postValues}
                    setPostValues={setPostValues}
                  />
                </li>
              );
            })}
          </ol>
          {postInput && (
            <div>
              <input value={value} onChange={changeValueHandler} />
              <img src={trashCanImg} alt="쓰레기통" />
            </div>
          )}
          <div onClick={postInputHandler}>+</div>
          <div>
            <img onClick={cencelHandler} src={btn_cancle} alt="취소" />
            <img
              onClick={patchSuccessHandler}
              src={btn_patchComplit}
              alt="수정 완료"
            />
            \
          </div>
        </div>
      )}
    </>
  );
}

export default ListModal;
