import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function ProgressBar({ duration = 2, styles }) {
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setVisible(false);
  //     onFinish && onFinish();
  //   }, duration * 1000);
  //   return () => clearTimeout(timer);
  // }, [duration, onFinish]);

  // if (!visible) return null
  return (
    <div className="w-full h-2 bg-slate-200 overflow-hidden">
      <motion.div
        className={`h-full ${styles.bgIcon}`}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration, ease: "linear" }}
      ></motion.div>
    </div>
  );
}
export default ProgressBar;
