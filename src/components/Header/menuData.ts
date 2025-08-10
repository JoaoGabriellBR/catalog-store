import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Popular",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Produtos",
    newTab: false,
    path: "/products",
  },
  {
    id: 3,
    title: "Páginas",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 60,
        title: "Produtos",
        newTab: false,
        path: "/products",
      },
      {
        id: 61,
        title: "Carrinho",
        newTab: false,
        path: "/cart",
      },
      {
        id: 62,
        title: "Favoritos",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 63,
        title: "Entrar",
        newTab: false,
        path: "/signin",
      },
      {
        id: 64,
        title: "Registrar",
        newTab: false,
        path: "/signup",
      },
      {
        id: 65,
        title: "Minha conta",
        newTab: false,
        path: "/my-account",
      },
    ],
  },
];
