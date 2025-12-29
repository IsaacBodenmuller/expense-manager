import Title from "./elements/Title";

export default function LinearGraphic() {
  return (
    <div className="w-full border border-slate-200 rounded-xl px-4 py-4">
      <div>
        <Title size="base" weight="medium">
          Visão Mensal
        </Title>
      </div>
      <div className="flex flex-col text-center self-center text-sm text-slate-400">
        Aqui será um gráfico
      </div>
    </div>
  );
}
