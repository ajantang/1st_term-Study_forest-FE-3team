import { useEffect, useState, useRef } from 'react';
import { gethabitList, createHabit } from '../../../../api/api';
import ListModalBody from './ListModalBody';
import trashCanImg from '../../../../assets/images/btn_trashCanImg.png';
import ListModalPost from './ListModalPost';

function ListModal({ studyId, modalState, patchList, setPageRender }) {
  const [list, setList] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [postInput, setPostInput] = useState(false);
  const [value, setValue] = useState('');
  const [postValues, setPostValues] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const childRefs = useRef([]);

  useEffect(() => {
    // API 호출 함수
    const getList = async () => {
      const data = await gethabitList(studyId);
      setList(data.habits);
    };

    if (!list[0] && modalState) {
      // 첫 렌더링 시
      getList();
    } else if (reRender) {
      getList();
      setReRender(false);
      setValue('');
      console.log('modal');
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
    } else if (postInput && value !== '') {
      setPostValues((prePostValues) => [...prePostValues, value]);
      setValue('');
    }
  };

  // 수정 완료 함수
  const patchsuccessHandler = async () => {
    const filterValus = postValues.filter((habit) => habit !== '');

    if (filterValus[0]) {
      patchList(); // 모달창 닫기
      const promises = childRefs.current // 이름 수정 있을 시 작동
        .filter((ref) => ref !== null)
        .map((ref) => ref.sendRequest());
      await Promise.all(promises);

      const postPromises = filterValus.map(async (habit) => {
        const surveyData = { name: habit };
        const result = await createHabit(studyId, surveyData);
        return result;
      });

      if (value) {
        // input에 값이 존재할 시
        const surveyData = { name: value };
        const result = await createHabit(studyId, surveyData);
        await Promise.all([...postPromises, result]);
      } else {
        await Promise.all(postPromises); // input에 값이 없을 시
      }

      setValue('');
      setPostValues([]);
      setReRender(true);
      setPostInput(false);
      setPageRender(true);
    } else if (value) {
      // input에만 값이 있을 때
      patchList();
      const promises = childRefs.current.filter((ref) => ref !== null).map((ref) => ref.sendRequest());
      await Promise.all(promises);

      const surveyData = { name: value };
      await createHabit(studyId, surveyData);

      setValue('');
      setPostValues([]);
      setReRender(true);
      setPostInput(false);
      setPageRender(true);
    } else {
      patchList();
      setPostInput(false);

      const promises = childRefs.current.filter((ref) => ref !== null).map((ref) => ref.sendRequest());

      const resultArrey = await Promise.all(promises);
      const result = resultArrey.filter((arrey) => arrey !== null && arrey !== undefined);

      if (deleted) {
        // 삭제한게 있을 시
        setPageRender(true);
        setDeleted(false);
      } else if (result[0]) {
        // 수정한 것만 있을 시
        setReRender(true);
        setPageRender(true);
      }
    }
  };

  // 취소 버튼 함수
  const cencelHandler = () => {
    patchList();
    setPostInput(false);
    setValue('');
    setPostValues([]);

    if (deleted) {
      setPageRender(true);
      setDeleted(false);
    }
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
                    setReRender={setReRender}
                    setDeleted={setDeleted}
                    ref={(el) => (childRefs.current[index] = el)}
                  />
                </li>
              );
            })}
            {postValues.map((habit, idx) => {
              return <ListModalPost habit={habit} idx={idx} postValues={postValues} setPostValues={setPostValues} />;
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
      )}
    </>
  );
}

export default ListModal;
