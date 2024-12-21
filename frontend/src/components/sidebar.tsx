import { sidebarItems } from "@/constants/sidebar-items";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Sidebar() {
  const [active, setActive] = useState("Students");
  return (
    <nav className="md:flex flex-col gap-2 hidden md:w-1/5 h-full  px-3 bg-white">
      <div className="my-7">
        <Link to="/">
          <img src="/logo.png" width={98} height={42} alt="Quyl Logo" />
        </Link>
      </div>

      {sidebarItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-[#6f767e] transition-all hover:text-gray-900",
            item.name === active && "bg-gray-100 text-black"
          )}
          onClick={() => setActive(item.name)}
        >
          <img src={item.icon} alt="icon" width={24} height={24} />
          <span
            className={item.name === active ? "font-bold" : "font-semibold"}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
