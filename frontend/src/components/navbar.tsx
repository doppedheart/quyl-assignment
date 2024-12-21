import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navbarIcons } from "@/constants/navbar-icons";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export function UserNav() {
  return (
    <div className="flex justify-between items-center px-5 py-3">
      <div className="relative w-1/2">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search your course"
          className="bg-primary pl-8 w-full h-12 rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors "
        />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        {navbarIcons.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-[#6f767e] transition-all hover:text-gray-900"
            )}
          >
            <img src={item.icon} alt="icon" width={24} height={24} />
          </Link>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-5 cursor-pointer">
              <Avatar>
                <AvatarImage src="/avatar-default.png" alt="@shadcn" />
              </Avatar>
              <h1 className="font-semibold text-lg">Adeline H, Dancy</h1>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  Adeline H. Dancy
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  adeline@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
