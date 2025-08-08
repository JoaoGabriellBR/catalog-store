import React from "react";
import { Repeat2, ShieldCheck, HeadphonesIcon } from "lucide-react";

const featureData = [
  {
    icon: <Repeat2 size={40} />,
    title: "Devolução em 7 dias",
    description: "Cancelamento após 7 dias",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Pagamento 100% Seguro",
    description: "Garantia de pagamentos seguros",
  },
  {
    icon: <HeadphonesIcon size={40} />,
    title: "Suporte 24/7",
    description: "Em qualquer lugar e hora",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-row justify-between flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            {item.icon}
            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
