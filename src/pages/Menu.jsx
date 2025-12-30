import { motion } from "framer-motion";
import { X } from "lucide-react";
import Title from "../components/elements/Title";

export default function Menu({ currentPage, onGoPage, onClose }) {
  const menuItems = [
    { label: "Home", page: "home" },
    { label: "Transações", page: "transactions" },
    { label: "Metas", page: "goals" },
    { label: "Configurações", page: "settings" },
  ];
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
          {menuItems.map((item) => {
            const isActive = currentPage === item.page;

            return (
              <span
                key={item.page}
                onClick={() => {
                  onGoPage(item.page);
                  onClose();
                }}
                className={`cursor-pointer px-4 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </span>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}
