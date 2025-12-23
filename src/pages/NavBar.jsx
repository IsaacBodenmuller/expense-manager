import { Menu, Wallet } from "lucide-react";
import Title from "../components/elements/Title";

function NavBar() {
  return (
    <div className="bg-white/80 backdrop-blur-sm fixed flex h-14 w-full justify-between p-4 border-b border-slate-300 z-50">
      <div className="flex gap-4">
        <div className=" size-8 content-center justify-items-center rounded-lg bg-gradient-to-tl from-purple-700 to-purple-500">
          <Wallet className="text-white size-4"></Wallet>
        </div>
        <Title position="center" size="lg" weight="semibold">
          FinanceApp
        </Title>
      </div>
      <div className="h-14 cursor-pointer justify-items-center content-center w-14">
        <Menu className="size-5"></Menu>
      </div>
    </div>
  );
}
export default NavBar;
