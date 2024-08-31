import "./studyList.css";
import { useState, useRef, useEffect } from "react";
import searchBtn from "../../../../assets/images/Vector.svg";
import dropdownBtn from "../../../../assets/images/ic_toggle.svg";
import StudyCard from "./StudyCard";
import { getStudyInfo } from "../../../../api/api";
import useDebounce from "../../../hooks/useDebounce";

// eslint-disable-next-line
const StudyList = ({}) => {
  const [studyCards, setStudyCards] = useState([]);
  const [pageSize, setPageSize] = useState(6);
  const [hasMore, setHasMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [boxText, setBoxText] = useState("최근 순");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [order, setOrder] = useState("recent");
  const dropDownRef = useRef(null);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500); // 500ms 디바운스

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchStudyCards = async () => {
      try {
        const response = await getStudyInfo(
          1,
          pageSize,
          order,
          debouncedSearchKeyword
        );
        setStudyCards(response.studies);
        if (response.totalCount <= pageSize || response.totalCount === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.error("Error fetching study cards:", error);
      }
    };
    fetchStudyCards();
  }, [order, pageSize, debouncedSearchKeyword]);

  const handleViewMore = () => {
    setPageSize(pageSize + 6);
  };

  const handleClickRecent = () => {
    setBoxText("최신순");
    setOrder("recent");
  };

  const handleClickOldest = () => {
    setBoxText("오래된 순");
    setOrder("oldest");
  };

  const handleClickMostPoint = () => {
    setBoxText("많은 포인트 순");
    setOrder("mostPoint");
  };

  const handleClicLeastPoint = () => {
    setBoxText("적은 포인트 순");
    setOrder("leastPoint");
  };

  return (
    <div className="study-list__container">
      <p>스터디 둘러보기</p>
      <div className="study-list__nav">
        <div className="study-list__nav__search-container">
          <input
            placeholder="검색"
            className="study-list__nav__search"
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setPageSize(6);
            }}
          />
          <img
            src={searchBtn}
            alt="search"
            className="study-list__nav__search-icon"
          />
        </div>
        <div
          className="study-list__nav__dropdown"
          onClick={toggleDropDown}
          ref={dropDownRef}
        >
          <p>{boxText}</p>
          <img
            src={dropdownBtn}
            alt="dropdownBtn"
            className={`study-list__nav__dropdown-btn ${
              isOpen ? "rotate" : ""
            }`}
          />
          {isOpen && (
            <div className="study-list__nav__dropdown-box">
              <div
                className="study-list__nav__dropdown-box__order recent"
                onClick={handleClickRecent}
              >
                최근 순
              </div>
              <div
                className="study-list__nav__dropdown-box__order oldest"
                onClick={handleClickOldest}
              >
                오래된 순
              </div>
              <div
                className="study-list__nav__dropdown-box__order most-point"
                onClick={handleClickMostPoint}
              >
                많은 포인트 순
              </div>
              <div
                className="study-list__nav__dropdown-box__order least-point"
                onClick={handleClicLeastPoint}
              >
                적은 포인트 순
              </div>
            </div>
          )}
        </div>
      </div>

      {studyCards.length > 0 ? (
        <div className="study-list__grid">
          {studyCards.map((card, index) => (
            <StudyCard
              key={index}
              id={card.id}
              studyName={card.studyName}
              description={card.description}
              nickname={card.nickname}
              point={card.point}
              background={card.background}
              createdAt={card.createdAt}
            />
          ))}
        </div>
      ) : (
        <p className="study-list__no-list">아직 둘러 볼 스터디가 없어요</p>
      )}
      {hasMore && (
        <div className={`study-list__view-more`} onClick={handleViewMore}>
          더보기
        </div>
      )}
    </div>
  );
};

export default StudyList;
