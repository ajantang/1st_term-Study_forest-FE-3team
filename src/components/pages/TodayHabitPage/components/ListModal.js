import { useEffect, useState, useRef } from "react";
<<<<<<< HEAD
import { deleteHabit, gethabitList, postHabit } from "../../../../api/api";
import ListModalBody from "./ListModalBody";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.svg";
import btn_patchComplit from "../../../../assets/images/btn_patchComplit.svg";
import btn_cancle from "../../../../assets/images/btn_cancel.svg";
import byn_plusButton from "../../../../assets/images/btn_plusButton.svg";
import ListModalPost from "./ListModalPost";
import "./ListModal.css";

function ListModal({ studyId, modalState, patchList, setPageRender }) {
  const [list, setList] = useState([]); // 서버에서 받아온 리스트 저장
  const [habitIds, setHabitIds] = useState([]); // 서버에서 받아온 습관 id들 저장
  const [deletedIdx, setDeletedIdx] = useState([]); // 리스트에서 삭제할 습관 인덱스 저장
  const [postInput, setPostInput] = useState(false); // 습관 추가 input 공개 여부
  const [value, setValue] = useState(""); // 습관 추가 인풋 값
  const [postValues, setPostValues] = useState([]); // 습관 추가할 값들 저장
  const [reRender, setReRender] = useState(false); // 모달창 리스트 리랜더링 여부(수정 사항있을 시 마지막에 작동)
  const [rockButtonBody, setRockButtonBody] = useState([]); // ListModalBody.js 습관 수정 시 에러 방지
  const [rockButtonPost, setRockButtonPost] = useState([]); // ListModalPost.js 습관 수정 시 에러 방지
  const [checkLength0, setCheckLength0] = useState(false); // 문자 길이가 0일때 에러 메세지 공개 여부
  const [checkLength30, setCheckLength30] = useState(false); // 문자 길이가 30을 넘을때 에러 메세지 공개 여부
  const [rockButton, setRockButton] = useState(false); // 습관 생성 시 에러 방지
  const [olListHeight, setOlListHeight] = useState(
    "ListModal__list-ol list__ol-572 flex-col border-box" // ol태그 클래스 저장
  );
  const [listClass, setListClass] = useState([]); // ListModalBody.js 내 삭제할 습관이 있을 시 li를 없애기 위한 클래스 저장
  const [postClass, setPostClass] = useState([]); // ListModalPost.js 내 삭제할 습관이 있을 시 li를 없애기 위한 클래스 저장

  const childRefs = useRef([]); // ListModalBody.js에서 patchAPI를 가져오기 위한 ref
  const containerRef = useRef(null); // 슴관 추가시 맨 아래 스크롤로 이동을 위한 ref
=======
import { gethabitList, postHabit } from "../../../../api/api";
import ListModalBody from "./ListModalBody";
import trashCanImg from "../../../../assets/images/btn_trashCanImg.png";
import ListModalPost from "./ListModalPost";

function ListModal({ studyId, modalState, patchList, setPageRender }) {
  const [list, setList] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [postInput, setPostInput] = useState(false);
  const [value, setValue] = useState("");
  const [postValues, setPostValues] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const childRefs = useRef([]);
>>>>>>> develop

  useEffect(() => {
    // API 호출 함수
    const getList = async () => {
      const data = await gethabitList(studyId);
      setList(data.habits);
<<<<<<< HEAD

      // 습관 아이디 배열로 저장
      const Ids = data.habits.map((habit) => {
        return habit.id;
      });
      setHabitIds(Ids);
=======
>>>>>>> develop
    };

    if (!list[0] && modalState) {
      // 첫 렌더링 시
      getList();
    } else if (reRender) {
<<<<<<< HEAD
      // 변경 사항이 있을때
      getList();
      setReRender(false);
      setValue("");
    }
    
  }, [studyId, modalState, list, reRender]);

  useEffect(()=> {
    // 습관 갯수에 따른 li 클래스 저장
    if (!listClass[0]) {
      list.map(() => {
        return setListClass((preListClass) => [...preListClass, "li-use"]);
      });
    }
  }, [list]) 

  // value와 input 값 일치 함수
  const changeValueHandler = (e) => {
    setValue(e.target.value);

    // 키보드를 꾹 눌렀을 때를 위한 로직
    if (value.trim().length > 30) {
      // 문자 길이가 30을 넘을 때
      setCheckLength30(true);
      setRockButton(true);
    } else {
      // 문자 길이가 문제 없을때
      setCheckLength0(false);
      setCheckLength30(false);
    }
  };

  // value값 검사 함수
  const checkValueHandler = () => {
    if (value.trim().length === 0) {
      // 문자 길이가 0일 때
      setCheckLength0(true);
      setCheckLength30(false);
      setRockButton(true);
    } else if (value.trim().length > 30) {
      // 문자 길이가 30을 넘을 때
      setCheckLength30(true);
      setRockButton(true);
    } else {
      // 문자 길이가 문제 없을때
      setCheckLength0(false);
      setCheckLength30(false);
      setRockButton(false);
    }
=======
      getList();
      setReRender(false);
      setValue("");
      console.log("modal");
    }
  }, [studyId, modalState, list, reRender]);

  // value와 input 값 일치 함수
  const changeValueHandler = (e) => {
    setValue(e.target.value);
>>>>>>> develop
  };

  // post input 생성 함수
  const postInputHandler = async () => {
    if (!postInput) {
      setPostInput(true);
<<<<<<< HEAD
      setOlListHeight("ListModal__list-ol list__ol-518 flex-col border-box");
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight; //스크롤을 맨 하단으로 이동
        }
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
    }
  };

  // post input 삭제 함수
  const postInputDeleteHandler = () => {
    setValue("");
    setPostInput(false);
    setCheckLength0(false);
    setCheckLength30(false);
    setRockButton(false);
    setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
  };

  // 수정 완료 함수
  const patchSuccessHandler = async () => {
    const filterValus = postValues.filter((habit) => habit !== ""); // ListModalPost에서 삭제 예정인 값 필터
    const filterockButtonBody = rockButtonBody.filter(
      // ListModalBody에서 문자 길이 검사 시 문제 없는 값 제거
      (boolin) => boolin !== false
    );
    const filterockButtonPost = rockButtonPost.filter(
      // ListModalPost에서 문자 길이 검사 시 문제 없는 값 제거
      (boolin) => boolin !== false
    );

    if (!filterockButtonBody[0] && !filterockButtonPost[0] && !rockButton) {
      if (filterValus[0]) {
        const promises = childRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref.sendRequest()); // 이름 수정 있을 시 동직

        for (const habit of filterValus) {
          // 순차적으로 post
          const surveyData = { name: habit };
          await postHabit(studyId, surveyData);
        }

        const deletePromis = deletedIdx.map(async (idx) => {
          // 삭제 예정인 습관 있을 시 동작
          if (idx || idx === 0) {
            const habitId = habitIds[idx];
            return await deleteHabit(habitId);
          }
        });

        if (value) {
          // input에 값이 존재할 시
          const surveyData = { name: value };
          const postResult = await postHabit(studyId, surveyData);
          await Promise.all([...promises, ...deletePromis, postResult]);
        } else {
          // input에 값이 없을 시
          await Promise.all([...promises, ...deletePromis]);
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
      } else if (value) {
        // input에만 값이 있을 때
        const promises = childRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref.sendRequest());

        const surveyData = { name: value };
        const postResult = await postHabit(studyId, surveyData);

        const deletePromis = deletedIdx.map(async (idx) => {
          if (idx || idx === 0) {
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
        setPageRender(true);
        setPostInput(false);
        setListClass([]);
        setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
        setRockButtonBody([]);
        setRockButtonPost([]);
        patchList(); // 모달창 닫기
      } else {
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

        // post 외 동작만 있을 시
        if (result[0]) {
          setHabitIds([]);
          setDeletedIdx([]);
          setReRender(true);
          setPageRender(true);
        }

        setPostInput(false);
        setRockButtonBody([]);
        setRockButtonPost([]);
        setListClass([]);
        setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
        patchList();
=======
    } else if (postInput && value !== "") {
      setPostValues((prePostValues) => [...prePostValues, value]);
      setValue("");
    }
  };

  // 수정 완료 함수
  const patchsuccessHandler = async () => {
    const filterValus = postValues.filter((habit) => habit !== "");

    if (filterValus[0]) {
      patchList(); // 모달창 닫기
      const promises = childRefs.current // 이름 수정 있을 시 작동
        .filter((ref) => ref !== null)
        .map((ref) => ref.sendRequest());
      await Promise.all(promises);

      const postPromises = filterValus.map(async (habit) => {
        const surveyData = { name: habit };
        const result = await postHabit(studyId, surveyData);
        return result;
      });

      if (value) {
        // input에 값이 존재할 시
        const surveyData = { name: value };
        const result = await postHabit(studyId, surveyData);
        await Promise.all([...postPromises, result]);
      } else {
        await Promise.all(postPromises); // input에 값이 없을 시
      }

      setValue("");
      setPostValues([]);
      setReRender(true);
      setPostInput(false);
      setPageRender(true);
    } else if (value) {
      // input에만 값이 있을 때
      patchList();
      const promises = childRefs.current
        .filter((ref) => ref !== null)
        .map((ref) => ref.sendRequest());
      await Promise.all(promises);

      const surveyData = { name: value };
      await postHabit(studyId, surveyData);

      setValue("");
      setPostValues([]);
      setReRender(true);
      setPostInput(false);
      setPageRender(true);
    } else {
      patchList();
      setPostInput(false);

      const promises = childRefs.current
        .filter((ref) => ref !== null)
        .map((ref) => ref.sendRequest());

      const resultArrey = await Promise.all(promises);
      const result = resultArrey.filter(
        (arrey) => arrey !== null && arrey !== undefined
      );

      if (deleted) {
        // 삭제한게 있을 시
        setPageRender(true);
        setDeleted(false);
      } else if (result[0]) {
        // 수정한 것만 있을 시
        setReRender(true);
        setPageRender(true);
>>>>>>> develop
      }
    }
  };

  // 취소 버튼 함수
  const cencelHandler = () => {
<<<<<<< HEAD
    setValue("");
    setPostInput(false);
    setPostValues([]);
    setCheckLength0(false);
    setCheckLength30(false);
    setRockButton(false);
    setDeletedIdx([]);
    setListClass([]);
    setOlListHeight("ListModal__list-ol list__ol-572 flex-col border-box");
    setRockButtonBody([]);
    setRockButtonPost([]);
    patchList();
=======
    patchList();
    setPostInput(false);
    setValue("");
    setPostValues([]);

    if (deleted) {
      setPageRender(true);
      setDeleted(false);
    }
>>>>>>> develop
  };

  return (
    <>
      {modalState && (
<<<<<<< HEAD
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
              <div className="ListModal__plusInut flex-row border-box">
                <input
                  className="ListModal__input font16 bold border-box"
                  value={value}
                  placeholder="새로운 습관 추가하기"
                  onChange={changeValueHandler}
                  onKeyUp={checkValueHandler}
                />
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
                className="ListModal__img-button"
                onClick={cencelHandler}
                src={btn_cancle}
                alt="취소"
              />
              <img
                className="ListModal__img-button"
                onClick={patchSuccessHandler}
                src={btn_patchComplit}
                alt="수정 완료"
              />
            </div>
          </div>
        </>
=======
        <div>
          <p>습관 목록</p>
          <ol>
            {list.map((habit, index) => {
              return (
                <li key={habit.id}>
                  <ListModalBody
                    habit={habit}
                    setReRender={setReRender}
                    setDeleted={setDeleted}
                    ref={(el) => (childRefs.current[index] = el)}
                  />
                </li>
              );
            })}
            {postValues.map((habit, idx) => {
              return (
                <ListModalPost
                  habit={habit}
                  idx={idx}
                  postValues={postValues}
                  setPostValues={setPostValues}
                />
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
            <p onClick={cencelHandler}>취소</p>
            <p onClick={patchsuccessHandler}>수정 완료</p>
          </div>
        </div>
>>>>>>> develop
      )}
    </>
  );
}

export default ListModal;
