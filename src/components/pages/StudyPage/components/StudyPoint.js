import "./studypoint.css";
import { ReactComponent as PointMark } from "../../../../assets/images/ic_point.svg";

export function StudyPoint({ point }) {
  const icSize = "1.9rem";
  return (
    <div className="study__point">
      <div className="point__description">현재까지 획득한 포인트</div>
      <div className="flex-row point__point-block">
        <div style={{ width: icSize, height: icSize }}>
          <PointMark height="97.63157%" width="85.94736%" />
        </div>
        <p className="point__point-text">{point}P 획득</p>
      </div>
    </div>
  );
}

export default StudyPoint;
