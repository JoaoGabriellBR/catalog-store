import React from "react";
import {
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Minha Conta",
      href: "/my-account",
    },
    {
      title: "Login / Register",
      href: "/login",
    },
    {
      title: "Carrinho",
      href: "/cart",
    },
    {
      title: "Lista de Favoritos",
      href: "/wishlist",
    },
    {
      title: "Produtos",
      href: "/products",
    },
  ];

  const socialMediaLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: <Facebook className="w-[18px] h-[18px]" />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      name: "Linkedin",
      href: "#",
      icon: <Linkedin className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- footer menu start --> */}
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between pt-17.5 xl:pt-22.5 pb-10 xl:pb-15">
          <div className="flex flex-col justify-between item-start">
            <Link href="/" className="flex items-center gap-2 w-full sm:w-auto">
              <ShoppingBag size={25} className="stroke-current text-blue" />
              <h1 className="text-3xl font-bold text-dark">Stg Catalog</h1>
            </Link>

            <div className="flex items-center gap-4 mt-7.5">
              {socialMediaLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-label={`${link.name} Social Link`}
                  className="flex ease-out duration-200 hover:text-blue"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
              Conta
            </h2>

            <ul className="flex flex-col gap-3.5">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="ease-out duration-200 hover:text-blue"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-[330px] w-full">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
              Ajuda e Suporte
            </h2>

            {/* <!-- Social Links start --> */}
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#" className="flex items-center gap-4.5">
                  <Mail size={24} className="text-blue" />
                  stgcatalog@gmail.com
                </Link>
              </li>
            </ul>
            {/* <!-- Social Links end --> */}
          </div>
        </div>
        {/* <!-- footer menu end --> */}
      </div>

      {/* <!-- footer bottom start --> */}
      <div className="py-5 xl:py-7.5 bg-gray-1">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-5 flex-wrap items-center justify-between">
            <p className="text-dark font-medium">
              &copy; {year}. Todos os direitos reservados por{" "}
              <Link href={"/"} className="underline">
                STG Catalog.
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* <!-- footer bottom end --> */}
    </footer>
  );
};

export default Footer;
