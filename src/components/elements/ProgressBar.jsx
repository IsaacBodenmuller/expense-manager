import { motion } from "framer-motion";

export default function ProgressBar({ duration = 2, styles }) {
  return (
    <div className="w-full h-2 bg-slate-200 overflow-hidden rounded-b-md z-[9999]">
      <motion.div
        className={`h-full ${styles.bgIcon}`}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration, ease: "linear" }}
      ></motion.div>
    </div>
  );
}
