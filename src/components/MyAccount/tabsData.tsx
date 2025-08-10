import type { ComponentType, SVGProps } from "react";
import {
  LayoutDashboard,
  ShoppingBasket,
  Download,
  MapPin,
  User,
} from "lucide-react";

type TabItem = {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const tabsData: TabItem[] = [
  {
    title: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "orders",
    icon: ShoppingBasket,
  },
  {
    title: "downloads",
    icon: Download,
  },
  {
    title: "addresses",
    icon: MapPin,
  },
  {
    title: "account details",
    icon: User,
  },
];

export default tabsData;
