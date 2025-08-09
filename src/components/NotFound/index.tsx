import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <Breadcrumb title="Página não encontrada" pages={["erro"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
            <div className="text-center">
              <SearchX className="mx-auto mb-8 h-48 w-48 text-blue" />

              <h2 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                Desculpe, a página não foi encontrada
              </h2>

              <p className="max-w-[410px] w-full mx-auto mb-7.5">
                A página que você procura foi movida, excluída ou não existe.
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
              >
                <ArrowLeft className="h-5 w-5" /> Voltar para a Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
