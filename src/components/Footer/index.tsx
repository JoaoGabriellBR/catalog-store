import React from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CreditCard,
  Wallet,
  Banknote,
  Apple,
  BadgeDollarSign,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- footer menu start --> */}
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between pt-17.5 xl:pt-22.5 pb-10 xl:pb-15">
          <div className="max-w-[330px] w-full">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
              Help & Support
            </h2>

            <ul className="flex flex-col gap-3">
              <li className="flex gap-4.5">
                <span className="flex-shrink-0">
                  <MapPin size={24} className="text-blue" />
                </span>
                685 Market Street,Las Vegas, LA 95820,United States.
              </li>

              <li>
                <a href="#" className="flex items-center gap-4.5">
                  <Phone size={24} className="text-blue" />
                  (+099) 532-786-9843
                </a>
              </li>

              <li>
                <a href="#" className="flex items-center gap-4.5">
                  <Mail size={24} className="text-blue" />
                  stgcatalog@gmail.com
                </a>
              </li>
            </ul>

            {/* <!-- Social Links start --> */}
            <div className="flex items-center gap-4 mt-7.5">
              <a
                href="#"
                aria-label="Facebook Social Link"
                className="flex ease-out duration-200 hover:text-blue"
              >
                <Facebook className="w-[18px] h-[18px]" />
              </a>

              <a
                href="#"
                aria-label="Twitter Social Link"
                className="flex ease-out duration-200 hover:text-blue"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram Social Link"
                className="flex ease-out duration-200 hover:text-blue"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Linkedin Social Link"
                className="flex ease-out duration-200 hover:text-blue"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            {/* <!-- Social Links end --> */}
          </div>

          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
              Account
            </h2>

            <ul className="flex flex-col gap-3.5">
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Minha Conta
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Login / Register
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Cart
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Wishlist
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Shop
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- footer menu end --> */}
      </div>

      {/* <!-- footer bottom start --> */}
      <div className="py-5 xl:py-7.5 bg-gray-1">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-5 flex-wrap items-center justify-between">
            <p className="text-dark font-medium">
              &copy; {year}. Todos os direitos reservados por STG Catalog.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <p className="font-medium">Nós aceitamos:</p>

              <div className="flex flex-wrap items-center gap-6 text-dark">
                <a
                  href="#"
                  aria-label="payment method: credit card"
                  className="flex"
                >
                  <CreditCard className="w-[34px] h-[22px]" />
                </a>
                <a
                  href="#"
                  aria-label="payment method: wallet"
                  className="flex"
                >
                  <Wallet className="w-[34px] h-[22px]" />
                </a>
                <a
                  href="#"
                  aria-label="payment method: banknote"
                  className="flex"
                >
                  <Banknote className="w-[34px] h-[22px]" />
                </a>
                <a
                  href="#"
                  aria-label="payment method: apple pay"
                  className="flex"
                >
                  <Apple className="w-[34px] h-[22px]" />
                </a>
                <a href="#" aria-label="payment method: other" className="flex">
                  <BadgeDollarSign className="w-[34px] h-[22px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- footer bottom end --> */}
    </footer>
  );
};

export default Footer;
