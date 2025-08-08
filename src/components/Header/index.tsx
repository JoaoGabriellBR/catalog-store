"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import CustomSelect from "./CustomSelect";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { products, categories } from "../../../lib/productsData";
import type { Product } from "@/types/product";
import SearchResults from "./SearchResults";
import useDebounce from "@/hooks/useDebounce";
import { useAuth } from "@/app/context/AuthContext";
import {
  Search,
  User,
  ShoppingCart,
  Clock,
  Heart,
  ShoppingBag,
} from "lucide-react";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { user } = useAuth();

  const filteredProducts: Product[] = useMemo(() => {
    if (!debouncedQuery) return [];
    const query = debouncedQuery.toLowerCase();
    const isValidCategory = categories.includes(selectedCategory);
    return products.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query);
      const matchesCategory =
        !isValidCategory || selectedCategory === "Todos"
          ? true
          : item.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [debouncedQuery, selectedCategory]);
  const { openCartModal } = useCartModalContext();

  const product = useAppSelector((state) => state.cartReducer.items);

  const handleClearSearch = () => {
    setSearchQuery("");
    filteredProducts.length = 0;
  };

  // Sticky menu
  useEffect(() => {
    const handleStickyMenu = () => {
      setStickyMenu(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  // user state is managed by AuthProvider

  const options = categories.map((cat) => ({ label: cat, value: cat }));

  return (
    <header
      className={`fixed left-0 top-0 w-full z-50 bg-white transition-all duration-300 ${
        stickyMenu ? "shadow" : ""
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        {/* header top */}
        <div
          className={`flex flex-col lg:flex-row items-end lg:items-center justify-between gap-5 ease-out duration-200 ${
            stickyMenu ? "py-4" : "py-6"
          }`}
        >
          {/* Logo + Busca */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-5 sm:gap-10 w-full">
            <Link href="/" className="flex items-center gap-2 w-full sm:w-auto">
              <ShoppingBag size={25} className="stroke-current text-blue" />
              <h1 className="text-3xl font-bold text-dark">Stg Catalog</h1>
            </Link>
            <div className="max-w-[475px] w-full">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center">
                    <CustomSelect
                      options={options}
                      onSelect={setSelectedCategory}
                    />
                  <div className="relative w-full max-w-[333px] sm:min-w-[333px]">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-5.5 bg-gray-4" />
                    <input
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Pesquisar produto..."
                      autoComplete="off"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="custom-search w-full rounded-r-[5px] bg-gray-1 border border-gray-3 border-l-0 py-2.5 pl-4 pr-10 outline-none transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      id="search-btn"
                      aria-label="Pesquisar"
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200 hover:text-blue"
                    >
                      <Search size={18} className="stroke-current" />
                    </button>
                    <SearchResults
                      results={filteredProducts}
                      handleClearSearch={handleClearSearch}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Usuário, Carrinho e Hamburger */}
          <div className="flex items-center gap-7.5 w-full lg:w-auto">
            <span className="hidden xl:block w-px h-7.5 bg-gray-4" />
            <div className="flex items-center gap-5 w-full lg:w-auto justify-between">
              <div className="flex items-center gap-5">
                {user ? (
                  <Link
                    href="/my-account"
                    className="flex items-center gap-2.5 hover:text-blue transition-colors"
                  >
                    <User size={24} className="stroke-current text-blue" />
                    <p className="font-medium text-custom-sm text-dark">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                  </Link>
                ) : (
                  <Link
                    href="/signin"
                    className="flex items-center gap-2.5 hover:text-blue transition-colors"
                  >
                    <User size={24} className="stroke-current text-blue" />
                    <p className="font-medium text-custom-sm text-dark">Entrar</p>
                  </Link>
                )}
                <button
                  onClick={openCartModal}
                  className="flex items-center gap-2.5"
                >
                  <span className="relative inline-block">
                    <ShoppingCart size={24} className="stroke-current" />
                    <span className="absolute -right-2 -top-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue text-2xs font-medium text-white">
                      {product.length}
                    </span>
                  </span>
                </button>
              </div>

              {/* Hamburger mobile */}
              <button
                id="Toggle"
                aria-label="Abrir menu"
                className="xl:hidden"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                <span className="relative block w-5.5 h-5.5">
                  <span className="block absolute right-0 w-full h-full">
                    <span
                      className={`block bg-dark rounded-sm h-0.5 w-0 my-1 transition-all duration-200 ${
                        !navigationOpen && "w-full delay-300"
                      }`}
                    />
                    <span
                      className={`block bg-dark rounded-sm h-0.5 w-0 my-1 transition-all duration-200 delay-150 ${
                        !navigationOpen && "w-full delay-400"
                      }`}
                    />
                    <span
                      className={`block bg-dark rounded-sm h-0.5 w-0 my-1 transition-all duration-200 delay-200 ${
                        !navigationOpen && "w-full delay-500"
                      }`}
                    />
                  </span>
                  <span className="absolute right-0 w-full h-full rotate-45">
                    <span
                      className={`block bg-dark rounded-sm absolute left-2.5 top-0 h-full w-0.5 transition-all duration-200 delay-300 ${
                        !navigationOpen && "h-0 delay-0"
                      }`}
                    />
                    <span
                      className={`block bg-dark rounded-sm absolute left-0 top-2.5 h-0.5 w-full transition-all duration-200 delay-400 ${
                        !navigationOpen && "h-0 delay-200"
                      }`}
                    />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nav principal */}
      <div className="border-t border-gray-3">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div className="flex items-center justify-between">
            {/* Nav esquerda */}
            <div
              className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
                navigationOpen &&
                "!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5"
              }`}
            >
              <nav>
                <ul className="flex flex-col xl:flex-row gap-5 xl:gap-6">
                  {menuData.map((menuItem, i) =>
                    menuItem.submenu ? (
                      <Dropdown
                        key={i}
                        menuItem={menuItem}
                        stickyMenu={stickyMenu}
                        user={user}
                      />
                    ) : (
                      <li
                        key={i}
                        className="relative before:absolute before:top-0 before:left-0 before:h-[3px] before:w-0 before:rounded-b-sm before:bg-blue before:transition-width before:duration-200 hover:before:w-full"
                      >
                        <Link
                          href={menuItem.path}
                          className={`flex items-center text-custom-sm font-medium text-dark transition-colors hover:text-blue ${
                            stickyMenu ? "xl:py-4" : "xl:py-6"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>

            {/* Nav direita (XL) */}
            <div className="hidden xl:block">
              <ul className="flex items-center gap-5.5">
                <li className="py-4">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue transition-colors"
                  >
                    <Clock size={16} className="stroke-current" />
                    Visto recentemente
                  </a>
                </li>

                <li className="py-4">
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue transition-colors"
                  >
                    <Heart size={16} className="stroke-current" />
                    Favoritos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
