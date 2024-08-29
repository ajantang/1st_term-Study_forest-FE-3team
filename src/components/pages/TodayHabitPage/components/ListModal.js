import { useEffect, useState, useRef, useContext } from "react";
import { setHabitDelete, createHabit, gethabitList } from "../../../../api/api";
import ListModalBody from "./ListModalBody";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.svg";
import byn_plusButton from "../../../../assets/images/btn_plusButton.svg";
import ListModalPost from "./ListModalPost";
import "./ListModal.css";
import { studyIdContext } from "../TodayHabitPage";

function ListModal({ modalState, patchList, setPageRender }) {
  const [list, setList] = useState([]); // 서버에서 받아온 리스트 저장
  const [habitIds, setHabitIds] = useState([]); // 서버에서 받아온 습관 id들 저장
  const [deletedIdx, setDeletedIdx] = useState([]); // 리스트에서 삭제할 습관 인덱스 저장
  const [postInput, setPostInput] = useState(false); // 습관 추가 input 공개 여부
  const [value, setValue] = useState(""); // 습관 추가 인풋 값
  const [postValues, setPostValues] = useState([]); // 습관 추가할 값들 저장
  const [reRender, setReRender] = useState(false); // 모달창 리스트 리랜더링 여부(수정 사항있을 시 마지막에 작동)
  const [rockButtonBody, setRockButtonBody] = useState([]); // ListModalBody.js 습관 수정 시 에러 방지
  const [rockButtonPost, setRockButtonPost] = useState([]); // ListModalPost.js 습관 수정 시 에러 방지
  const [checkLength30, setCheckLength30] = useState(false); // 문자 길이가 30을 넘을때 에러 메세지 공개 여부
  const [rockButton, setRockButton] = useState(false); // 습관 생성 시 에러 방지
  const [postRock, setPostRock] = useState(false); // 수정 완료 버튼 중복 클릭 시 중복 작동 방지
  const [olListHeight, setOlListHeight] = useState(
    "ListModal__list-ol list__ol-572 flex-col border-box" // ol태그 클래스 저장
  );
  const [listClass, setListClass] = useState([]); // ListModalBody.js 내 삭제할 습관이 있을 시 li를 없애기 위한 클래스 저장
  const [postClass, setPostClass] = useState([]); // ListModalPost.js 내 삭제할 습관이 있을 시 li를 없애기 위한 클래스 저장
  const [checkInputClass, setCheckInputClass] = useState(
    "ListModal__input font16 bold border-box"
  ); // 습관 추가 인풋 css

  let studyId = useContext(studyIdContext);
  const childRefs = useRef([]); // ListModalBody.js에서 patchAPI를 가져오기 위한 ref
  const containerRef = useRef(null); // 습관 추가시 맨 아래 스크롤로 이동을 위한 ref
  const focusInputRef = useRef(null); // posy input 활성화 시 focus를 위한 ref

  useEffect(() => {
    // API 호출 함수
    const getList = async () => {
      try {
        const data = await gethabitList(studyId);
        setList(data.habits);

        // 습관 아이디 배열로 저장
        const Ids = data.habits.map((habit) => {
          return habit.id;
        });
        setHabitIds(Ids);
      } catch (e) {
        alert("잠시 후 다시 시도해주세요");
      }
    };

    if (!list[0] && modalState) {
      // 첫 렌더링 시
      getList();
    } else if (reRender) {
      // 변경 사항이 있을때
      getList();
      setReRender(false);
      setValue("");
    }
  }, [studyId, modalState, list, reRender]);

  useEffect(() => {
    // 습관 갯수에 따른 li 클래스 저장
    if (!listClass[0]) {
      list.map(() => {
        return setListClass((preListClass) => [...preListClass, "li-use"]);
      });
    }
  }, [list]);

  // value와 input 값 일치 함수
  const changeValueHandler = (e) => {
    setValue(e.target.value);

    // 키보드를 꾹 눌렀을 때를 위한 로직
    if (value.trim().length > 30) {
      // 문자 길이가 30을 넘을 때
      setCheckLength30(true);
      setRockButton(true);
      setCheckInputClass(
        "ListModal__input ListModal__text-error font16 bold border-box"
      );
    } else {
      // 문자 길이가 문제 없을때
      setCheckLength30(false);
      setCheckInputClass("ListModal__input font16 bold border-box");
    }
  };

  // value값 검사 함수
  const checkValueHandler = () => {
    if (value.trim().length > 30) {
      // 문자 길이가 30을 넘을 때
      setCheckLength30(true);
      setRockButton(true);
      setCheckInputClass(
        "ListModal__input ListModal__text-error font16 bold border-box"
      );
    } else {
      // 문자 길이가 문제 없을때
      setCheckLength30(false);
      setRockButton(false);
      setCheckInputClass("ListModal__input font16 bold border-box");
    }
  };

  // post input 생성 함수
  const postInputHandler = async () => {
    if (!postInput) {
      setPostInput(true);
      setOlListHeight("ListModal__list-ol list__ol-518 flex-col border-box");
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight; //스크롤을 맨 하단으로 이동
        }
      }, 50);
      setTimeout(() => {
        focusInputRef.current.focus(); // input 요소로 포커스 이동
      }, 50);
    } else if (postInput && value !== "" && !rockButton) {
      setPostValues((prePostValues) => [...prePostValues, value]);
      setPostClass((prePostClass) => [...prePostClass, "li-use"]);
      setValue("");
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight; //스크롤을 맨 하단으로 이동
        }
      }, 50);
      setTimeout(() => {
        focusInputRef.current.focus(); // input 요소로 포커스 이동
      }, 50);
    }
  };

  // post input 삭제 함수
  const postInputDeleteHandler = () => {
    setValue("");
    setPostInput(false);
    setCheckLength30(false);
    setRockButton(false);
    setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
    setCheckInputClass("ListModal__input font16 bold border-box");
  };

  // 수정 완료 함수
  const patchSuccessHandler = async () => {
    const filterValus = postValues.filter((habit) => habit !== ""); // ListModalPost에서 삭제 예정인 값 필터
    const filterockButtonBody = rockButtonBody.filter(
      // ListModalBody에서 문자 길이 검사 시 문제 없는 값 제거
      (boolin) => boolin === true && boolin !== undefined && boolin !== null
    );
    const filterockButtonPost = rockButtonPost.filter(
      // ListModalPost에서 문자 길이 검사 시 문제 없는 값 제거
      (boolin) => boolin === true && boolin !== undefined && boolin !== null
    );

    if (
      !filterockButtonBody[0] &&
      !filterockButtonPost[0] &&
      !rockButton &&
      !postRock
    ) {
      if (filterValus[0]) {
        setPostRock(true);

        const promises = childRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref.sendRequest()); // 이름 수정 있을 시 동직

        for (const habit of filterValus) {
          // 순차적으로 post
          try {
            await createHabit(studyId, habit);
          } catch (e) {
            alert("잠시 후 다시 시도해주세요");
          }
        }

        const deletePromis = deletedIdx.map(async (idx) => {
          // 삭제 예정인 습관 있을 시 동작
          if (idx || idx === 0) {
            const habitId = habitIds[idx];
            return await setHabitDelete(habitId);
          }
        });

        if (value) {
          // input에 값이 존재할 시
          const postResult = await createHabit(studyId, value);
          try {
            await Promise.all([...promises, ...deletePromis, postResult]);
          } catch (e) {
            alert("잠시 후 다시 시도해주세요");
          }
        } else {
          // input에 값이 없을 시
          try {
            await Promise.all([...promises, ...deletePromis]);
          } catch (e) {
            alert("잠시 후 다시 시도해주세요");
          }
        }

        setValue("");
        setPostValues([]);
        setHabitIds([]);
        setDeletedIdx([]);
        setReRender(true);
        setPageRender(true);
        setPostInput(false);
        setListClass([]);
        setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
        setRockButtonBody([]);
        setRockButtonPost([]);
        patchList(); // 모달창 닫기
        setPostRock(false);
      } else if (value) {
        // input에만 값이 있을 때
        setPostRock(true);

        const promises = childRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref.sendRequest());

        const postResult = await createHabit(studyId, value);

        const deletePromis = deletedIdx.map(async (idx) => {
          if (idx || idx === 0) {
            const habitId = habitIds[idx];
            return await setHabitDelete(habitId);
          }
        });
        try {
          await Promise.all([...promises, ...deletePromis, postResult]);
        } catch (e) {
          alert("잠시 후 다시 시도해주세요");
        }

        setValue("");
        setPostValues([]);
        setHabitIds([]);
        setDeletedIdx([]);
        setReRender(true);
        setPageRender(true);
        setPostInput(false);
        setListClass([]);
        setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
        setRockButtonBody([]);
        setRockButtonPost([]);
        patchList(); // 모달창 닫기
        setPostRock(false);
      } else {
        setPostRock(true);

        const promises = childRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref.sendRequest());

        const deletePromis = deletedIdx.map(async (idx) => {
          if (idx || idx === 0) {
            const habitId = habitIds[idx];
            return await setHabitDelete(habitId);
          }
        });
        try {
          const resultArrey = await Promise.all([...promises, ...deletePromis]);
          const result = resultArrey.filter(
            (arrey) => arrey !== null && arrey !== undefined
          );

          // post 외 동작만 있을 시
          if (result[0]) {
            setHabitIds([]);
            setDeletedIdx([]);
            setReRender(true);
            setPageRender(true);
            setListClass([]);
          }
        } catch (e) {
          alert("잠시 후 다시 시도해주세요");
        }
        setPostInput(false);
        setRockButtonBody([]);
        setRockButtonPost([]);
        setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
        patchList();
        setPostRock(false);
      }
    }
  };

  // 취소 버튼 함수
  const cencelHandler = () => {
    setValue("");
    setPostInput(false);
    setPostValues([]);
    setCheckLength30(false);
    setRockButton(false);
    setDeletedIdx([]);
    setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
    setRockButtonBody([]);
    setRockButtonPost([]);
    patchList();
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
                      rockButtonBody={rockButtonBody}
                      setRockButtonBody={setRockButtonBody}
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
                      rockButtonPost={rockButtonPost}
                      setRockButtonPost={setRockButtonPost}
                      postClass={postClass}
                      setPostClass={setPostClass}
                    />
                  </li>
                );
              })}
            </ol>
            {postInput && (
              <div className={"ListModal__plusInut flex-row border-box"}>
                <input
                  className={checkInputClass}
                  value={value}
                  placeholder="새로운 습관 추가하기"
                  onChange={changeValueHandler}
                  onKeyUp={checkValueHandler}
                  ref={focusInputRef}
                />
                {checkLength30 && (
                  <p className="ListModalBody__text-check font12 semi-bold">
                    30자 이내로 입력해주세요
                  </p>
                )}
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
              <div
                className="ListModal__img-button ListModal__img-cencel"
                onClick={cencelHandler}
                alt="취소"
              />
              <div
                className="ListModal__img-button ListModal__img-patch"
                onClick={patchSuccessHandler}
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
