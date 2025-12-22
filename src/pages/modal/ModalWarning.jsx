import { X, CircleAlert, CircleX, CircleCheck } from "lucide-react";
import { motion } from "framer-motion";
import ProgressBar from "../../components/elements/ProgressBar";
import { useEffect } from "react";
// import { useEffect } from "react";

function ModalWarning({ onExitModal, type, text }) {
  const stylesByType = {
    alert: {
      bg: "bg-yellow-200",
      border: "border-yellow-400",
      bgIcon: "bg-yellow-400",
      icon: <CircleAlert />,
    },
    error: {
      bg: "bg-red-200",
      border: "border-red-400",
      bgIcon: "bg-red-400",
      icon: <CircleX />,
    },
    success: {
      bg: "bg-green-200",
      border: "border-green-400",
      bgIcon: "bg-green-400",
      icon: <CircleCheck />,
    },
  };
  const styles = stylesByType[type] || stylesByType.warning;

  useEffect(() => {
    const timer = setTimeout(() => {
      onExitModal("warning");
    }, 2000);

    return () => clearTimeout(timer);
  }, [onExitModal]);

  return (
    <motion.div
      className="absolute top-10 right-20 flex flex-col justify-center z-50"
      initial={{ display: "none" }}
      animate={{ display: "flex" }}
      exit={{ display: "none" }}
      transition={{ duration: 0.2 }}
      onClick={() => onExitModal("warning")}
    >
      <motion.div
        className={`max-w-96 h-fit border rounded-md shadow flex flex-col ${styles.bg} ${styles.border}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          <div
            className={`w-[15%] justify-center items-center flex ${styles.bgIcon}`}
          >
            {styles.icon}
          </div>
          <div className="flex items-center pl-5 py-2">
            <div className="">
              <span>{text}</span>
            </div>
            <div
              className="cursor-pointer flex justify-between border-slate-200 py-4 px-4"
              onClick={() => onExitModal("warning")}
            >
              <X />
            </div>
          </div>
        </div>
        <ProgressBar duration={2} styles={styles}></ProgressBar>
      </motion.div>
    </motion.div>
  );
}
export default ModalWarning;
