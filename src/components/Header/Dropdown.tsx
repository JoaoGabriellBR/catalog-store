import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Menu } from "@/types/Menu";
import type { User } from "@supabase/supabase-js";
import { ChevronDown } from "lucide-react";
import Button from "@/components/Common/Button";

interface DropdownProps {
  menuItem: Menu;
  stickyMenu: boolean;
  user: User | null;
}

const Dropdown = ({ menuItem, stickyMenu, user }: DropdownProps) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();

  const items = useMemo(
    () =>
      menuItem.submenu?.filter(
        (item) =>
          !(user && (item.path === "/signin" || item.path === "/signup"))
      ) || [],
    [menuItem.submenu, user]
  );

  return (
    <li
      onClick={() => setDropdownToggler(!dropdownToggler)}
      className={`group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full ${
        pathUrl.includes(menuItem.title) && "before:!w-full"
      }`}
    >
      <Button
        type="button"
        variant="ghost"
        className={`hover:text-blue text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize ${
          stickyMenu ? "xl:py-4" : "xl:py-6"
        } ${pathUrl.includes(menuItem.title) && "!text-blue"}`}
      >
        {menuItem.title}
        <ChevronDown className="w-4 h-4" />
      </Button>

      {/* <!-- Dropdown Start --> */}
      <ul
        className={`dropdown ${dropdownToggler && "flex"} ${
          stickyMenu
            ? "xl:group-hover:translate-y-0"
            : "xl:group-hover:translate-y-0"
        }`}
      >
        {items.map((item, i) => (
          <li key={i}>
            <Link
              href={item.path}
              className={`flex text-custom-sm hover:text-blue hover:bg-gray-1 py-[7px] px-4.5 ${
                pathUrl === item.path && "text-blue bg-gray-1"
              } `}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Dropdown;
