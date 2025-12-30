export default function TransactionPage({ /*expenses,*/ pages, onGoPage }) {
  return (
    <div className="flex flex-col h-full pr-4 relative py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-y-auto">
      <div className="flex items-center gap-4 pt-2">
        <div className={`text-sm text-slate-500 cursor-pointer`}>
          {pages.map((page, index) => (
            <span
              onClick={() => {
                if (page === "Home") onGoPage("home");
              }}
              key={page}
              className={`${
                index === pages.length - 1
                  ? "underline font-medium cursor-default"
                  : ""
              }`}
            >
              {page}
              {index < pages.length - 1 && " > "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
