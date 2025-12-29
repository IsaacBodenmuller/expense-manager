import { X, CircleAlert, CircleX, CircleCheck } from "lucide-react";
import { motion } from "framer-motion";
import ProgressBar from "../../components/elements/ProgressBar";
import { useEffect } from "react";
// import { useEffect } from "react";

export default function ModalWarning({ onExitModal, type, text }) {
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
      className="flex flex-col justify-center z-[9999] fixed top-4 justify-self-end pr-4"
      initial={{ display: "none" }}
      animate={{ display: "flex" }}
      exit={{ display: "none" }}
      transition={{ duration: 0.2 }}
      onClick={onExitModal}
    >
      <motion.div
        className={`max-w-96 w-80 lg:w-fit h-fit border rounded-lg shadow flex flex-col ${styles.bg} ${styles.border} z-50`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          <div
            className={`w-[15%] justify-center items-center flex rounded-tl-md ${styles.bgIcon}`}
          >
            {styles.icon}
          </div>
          <div className="flex items-center pl-5 py-2">
            <div className="">
              <span>{text}</span>
            </div>
            <div
              className="cursor-pointer flex justify-between border-slate-200 py-4 px-4"
              onClick={onExitModal}
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
