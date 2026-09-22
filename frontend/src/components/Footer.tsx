import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[#F3EFE4]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-11 flex flex-wrap justify-between gap-10">
        <div className="flex flex-col gap-2.5 max-w-[280px]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-[7px] bg-sage" />
            <span className="font-display text-base font-semibold text-ink">
              MenuMap
            </span>
          </div>
          <p className="m-0 text-[13px] text-muted-2 leading-relaxed">
            Real menus. Real prices. Ordered straight from the table.
          </p>
        </div>

        <div className="flex gap-16 flex-wrap">
          <FooterColumn
            title="Diners"
            links={["Browse restaurants", "How ordering works"]}
          />
          <FooterColumn
            title="Businesses"
            links={["List your restaurant", "Owner dashboard"]}
          />
          <FooterColumn title="Company" links={["About", "Contact"]} />
        </div>
      </div>
      <div className="border-t border-[#E5DFCF] px-6 py-4 text-center text-[12.5px] text-muted-2">
        © 2026 MenuMap. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[12.5px] font-bold tracking-wide uppercase text-muted-2">
        {title}
      </span>
      {links.map((link) => (
        <button
          key={link}
          type="button"
          className="text-left text-sm font-medium text-muted hover:text-ink transition-colors"
        >
          {link}
        </button>
      ))}
    </div>
  );
}
