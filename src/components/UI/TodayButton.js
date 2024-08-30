import "./TodayButton.css";
import { ReactComponent as ArrowRight } from "../../assets/images/ic_arrow_right.svg";
import { motion } from 'framer-motion';
import { MOTION } from '../../constants/global';

export function TodayButton({ onClick, children }) {
  const onButtonClick = () => onClick();

  return (
    <div>
      <motion.button
        onClick={onButtonClick}
        className="font16 medium btn-today"
        initial={{ scale: 1 }}
        whileTap={{ scale: 1 }}
        whileHover={MOTION.whileHover}>
        {children}
        <ArrowRight width="2.4rem" height="2.4rem" />
      </motion.button>
    </div>
  );
}

export default TodayButton;
