import { motion } from "framer-motion";
import { X } from "lucide-react";
import Title from "../components/elements/Title";

export default function Menu({ onClose }) {
  return (
    <>
      <motion.div
        className="bg-black/40 backdrop-blur-sm fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-50 p-4 pr-8"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
      >
        <div className="flex justify-between items-center mb-6">
          <Title size="lg" weight="semibold" position="start">
            Menu
          </Title>
          <div>
            <X className="cursor-pointer" onClick={onClose} />
          </div>
        </div>
        <nav className="flex flex-col gap-4 pt-8">
          <span>Dashboard</span>
          <span>Transações</span>
          <span>Configurações</span>
        </nav>
      </motion.aside>
    </>
  );
}
