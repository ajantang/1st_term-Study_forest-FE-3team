import "./TodayButton.css";
import { ReactComponent as ArrowRight } from "../../assets/images/ic_arrow_right.svg";

export function TodayButton({ onClick, children }) {
  const onButtonClick = () => onClick();

  return (
    <div>
      <button onClick={onButtonClick} className="font16 medium btn-today">
        {children}
        <ArrowRight width="2.4rem" height="2.4rem" />
      </button>
    </div>
  );
}

export default TodayButton;
