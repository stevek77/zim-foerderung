import { ArrowRight } from "lucide-react";
import content from "@/data/content-funding.json";

export default function FundingTable() {
  return (
    <section className="py-20 bg-surface-soft">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
            {content.label}
          </p>
          <h2 className="text-[2rem] md:text-[2.25rem] mb-5">
            {content.heading}
          </h2>
          <p className="text-body text-[17px] leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Funding Rates Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full bg-white rounded-lg overflow-hidden border border-border-DEFAULT">
            <thead>
              <tr className="bg-surface-soft border-b-2 border-primary-DEFAULT/20">
                <th className="text-left px-6 py-4 font-semibold text-heading text-sm">
                  {content.tableHeaders.type}
                </th>
                <th className="text-center px-6 py-4 font-semibold text-heading text-sm">
                  {content.tableHeaders.einzelprojekt}
                </th>
                <th className="text-center px-6 py-4 font-semibold text-heading text-sm">
                  {content.tableHeaders.koopNational}
                </th>
                <th className="text-center px-6 py-4 font-semibold text-heading text-sm">
                  {content.tableHeaders.koopInternational}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.fundingRates.map((rate, i) => (
                <tr
                  key={rate.type}
                  className={`border-t border-border-DEFAULT ${
                    i % 2 === 0 ? "bg-white" : "bg-surface-soft/50"
                  }`}
                >
                  <td className="px-6 py-3.5 font-medium text-heading text-[15px]">
                    {rate.type}
                  </td>
                  <td className="text-center px-6 py-3.5 text-body text-[15px]">
                    {rate.einzelprojekt}
                  </td>
                  <td className="text-center px-6 py-3.5">
                    <span className="font-semibold text-primary-DEFAULT text-[15px]">
                      {rate.koopNational}
                    </span>
                  </td>
                  <td className="text-center px-6 py-3.5">
                    <span className="font-semibold text-primary-DEFAULT text-[15px]">
                      {rate.koopInternational}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost Caps */}
        <h3 className="text-[1.35rem] font-semibold text-center mb-7">
          {content.costCapsHeading}
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {content.costCaps.map((cap) => (
            <div
              key={cap.label}
              className="bg-white rounded-lg p-6 border border-border-DEFAULT text-center"
            >
              <div className="text-2xl font-bold text-primary-DEFAULT mb-1.5">
                {cap.value}
              </div>
              <div className="text-body text-sm">{cap.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-body mb-5 text-[15px]">
            {content.calculatorText}
          </p>
          <a
            href="/zim-rechner/"
            className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
          >
            {content.calculatorCta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
