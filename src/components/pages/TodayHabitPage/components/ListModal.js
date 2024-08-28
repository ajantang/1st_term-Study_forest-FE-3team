import { useEffect, useState, useRef } from "react";
import { deleteHabit, gethabitList, postHabit } from "../../../../api/api";
import ListModalBody from "./ListModalBody";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.svg";
import btn_patchComplit from "../../../../assets/images/btn_patchComplit.svg";
import btn_cancle from "../../../../assets/images/btn_cancel.svg";
import byn_plusButton from "../../../../assets/images/btn_plusButton.svg";
import ListModalPost from "./ListModalPost";
import "./ListModal.css";

function ListModal({ studyId, modalState, patchList, setPageRender }) {
  const [list, setList] = useState([]);
  const [habitIds, setHabitIds] = useState([]);
  const [deletedIdx, setDeletedIdx] = useState([]);
  const [postInput, setPostInput] = useState(false);
  const [value, setValue] = useState("");
  const [postValues, setPostValues] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [rockButton, setRockButton] = useState([]);

  const [olListHeight, setOlListHeight] = useState(
    "ListModal__list-ol list__ol-572 flex-col border-box"
  );
  const [listClass, setListClass] = useState([]);
  const [postClass, setPostClass] = useState([]);

  const childRefs = useRef([]);
  const containerRef = useRef(null);

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

    if (!listClass[0]) {
      list.map(() => {
        return setListClass((preListClass) => [...preListClass, "li-use"]);
      });
    }
  }, [studyId, modalState, list, reRender, listClass]);

  // value와 input 값 일치 함수
  const changeValueHandler = (e) => {
    setValue(e.target.value);
  };

  // post input 생성 함수
  const postInputHandler = async () => {
    if (!postInput) {
      setPostInput(true);
      setOlListHeight("ListModal__list-ol list__ol-518 flex-col border-box");
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 50);
    } else if (postInput && value !== "") {
      setPostValues((prePostValues) => [...prePostValues, value]);
      setPostClass((prePostClass) => [...prePostClass, "li-use"]);
      setValue("");
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 50);
    }
  };

  // post input 삭제 함수
  const postInputDeleteHandler = () => {
    setValue("");
    setPostInput(false);
    setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
  };

  // 수정 완료 함수
  const patchSuccessHandler = async () => {
    const filterValus = postValues.filter((habit) => habit !== "");
    const filteRockButton = rockButton.filter((boolin) => boolin !== false)

    if (!filteRockButton[0]) {
      if (filterValus[0]) {
        patchList(); // 모달창 닫기

        const promises = childRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref.sendRequest()); // 이름 수정 있을 시 작동

        for (const habit of filterValus) {
          const surveyData = { name: habit };
          await postHabit(studyId, surveyData);
        }

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
            // ...postPromises,
            ...deletePromis,
            postResult,
          ]);
        } else {
          await Promise.all([
            ...promises,
            // ...postPromises,
            ...deletePromis,
          ]); // input에 값이 없을 시
        }

        setValue("");
        setPostValues([]);
        setHabitIds([]);
        setDeletedIdx([]);
        setReRender(true);
        setPostInput(false);
        setPageRender(true);
        setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
        setListClass([]);
      } else if (value) {
        // input에만 값이 있을 때
        patchList();
        const promises = childRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref.sendRequest());

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
        setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
        setListClass([]);
      } else {
        patchList();
        setPostInput(false);
        setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");

        // 이름 수정 있을 시 작동
        const promises = childRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref.sendRequest());

        const deletePromis = deletedIdx.map(async (idx) => {
          if (idx || idx === 0) {
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

        setListClass([]);
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
    setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
    setListClass([]);
  };

  return (
    <>
      {modalState && (
        <>
          <div className="ListModal-overlay" />
          <div className="ListModal__body flex-col border-box">
            <p className="ListModal__title font24 extra-bold border-box">
              습관 목록
            </p>
            <ol className={olListHeight} ref={containerRef}>
              {list.map((habit, index) => {
                return (
                  <li key={habit.id} className={listClass[index]}>
                    <ListModalBody
                      habit={habit}
                      idx={index}
                      setDeletedIdx={setDeletedIdx}
                      rockButton={rockButton}
                      setRockButton={setRockButton}
                      listClass={listClass}
                      setListClass={setListClass}
                      ref={(el) => (childRefs.current[index] = el)}
                    />
                  </li>
                );
              })}
              {postValues.map((habit, idx) => {
                return (
                  <li key={idx} className={postClass[idx]}>
                    <ListModalPost
                      habit={habit}
                      idx={idx}
                      postValues={postValues}
                      setPostValues={setPostValues}
                      rockButton={rockButton}
                      setRockButton={setRockButton}
                      postClass={postClass}
                      setPostClass={setPostClass}
                    />
                  </li>
                );
              })}
            </ol>
            {postInput && (
              <div className="ListModal__plusInut flex-row border-box">
                <input
                  className="ListModal__input font16 bold border-box"
                  value={value}
                  placeholder="새로운 습관 추가하기"
                  onChange={changeValueHandler}
                />
                <img
                  className="ListModal__img-trashCan border-box"
                  src={trashCanImg}
                  alt="쓰레기통"
                  onClick={postInputDeleteHandler}
                />
              </div>
            )}
            <img
              className="ListModal__img-plus border-box"
              onClick={postInputHandler}
              src={byn_plusButton}
              alt="추가 버튼"
            />
            <div className="ListModal__button flex-row border-box">
              <img
                classNam="ListModal__img-button"
                onClick={cencelHandler}
                src={btn_cancle}
                alt="취소"
              />
              <img
                classNam="ListModal__img-button"
                onClick={patchSuccessHandler}
                src={btn_patchComplit}
                alt="수정 완료"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ListModal;
