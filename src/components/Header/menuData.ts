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
    title: "Contato",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "Páginas",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 62,
        title: "Produtos",
        newTab: false,
        path: "/products",
      },
      {
        id: 65,
        title: "Carrinho",
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        title: "Favoritos",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        title: "Entrar",
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        title: "Registrar",
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        title: "Minha conta",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 70,
        title: "Contato",
        newTab: false,
        path: "/contact",
      },
      {
        id: 63,
        title: "Mail Success",
        newTab: false,
        path: "/mail-success",
      },
    ],
  },
];
