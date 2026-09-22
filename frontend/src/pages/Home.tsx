import React from "react";
import Header from "../components/Header";
import StatsPanel from "../components/StatsPanel";
import Footer from "../components/Footer";

// NOTE: links to /restaurants, /signup, /business, etc. point at pages that
// will be built in later sprints. For sprint 1 the only live data on this
// page is the restaurant count in <StatsPanel />.

const steps = [
  {
    title: "Search by what you eat",
    body: "Look up dishes by ingredients, nutrition, and dietary needs, not just by restaurant name.",
  },
  {
    title: "Order from your table",
    body: "Scan the QR code at your table to see the live menu and order without waiting for a server.",
  },
  {
    title: "Or pick it up",
    body: "Order ahead and grab your food on the way. We don't run a delivery fleet, which keeps costs down.",
  },
];

const team = ["Iurii Onopko", "Zahid Khan", "Edvin Rastoder"];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream font-body text-ink">
      <Header />

      {/* Hero */}
      <section className="max-w-6xl mx-auto w-full px-6 md:px-10 pt-14 pb-16 flex flex-col md:flex-row gap-10 md:gap-14 items-center">
        <div className="flex-[1.1] flex flex-col gap-5 min-w-0 w-full">
          <div className="inline-flex items-center gap-2 bg-[#EFF3EA] rounded-full px-3.5 py-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#3BAA6A] live-dot" />
            <span className="text-[13px] font-semibold text-[#3F5A3F]">
              Now onboarding local restaurants
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight tracking-tight m-0">
            Find what's
            <br />
            actually on the menu.
          </h1>

          <p className="m-0 text-[17px] leading-relaxed text-muted max-w-md">
            MenuMap connects diners with detailed, up-to-date menus from local
            restaurants, and lets you order from the table or for pickup
            without the delivery-app markup.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={`${process.env.PUBLIC_URL}/restaurants`}
              className="px-5 py-3 rounded-[10px] text-[15px] font-semibold bg-sage text-[#FBF6EC] hover:bg-sage-dark transition-colors"
            >
              Browse restaurants
            </a>
            <a
              href="#for-businesses"
              className="px-5 py-3 rounded-[10px] text-[15px] font-semibold border-[1.5px] border-border-strong text-ink hover:border-sage hover:text-sage transition-colors"
            >
              List your restaurant
            </a>
          </div>
        </div>

        <div className="flex-[0.85] w-full md:w-auto">
          <StatsPanel />
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="max-w-6xl mx-auto w-full px-6 md:px-10 py-14 border-t border-border"
      >
        <SectionHeading
          eyebrow="How it works"
          title="Menus you can actually search."
        />
        <div className="grid gap-4 md:grid-cols-3 mt-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-card border border-border rounded-2xl px-6 py-6 flex flex-col gap-2"
            >
              <span className="w-8 h-8 rounded-[9px] bg-[#EFF3EA] text-sage font-display font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <h3 className="m-0 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="m-0 text-[14.5px] leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* For businesses */}
      <section
        id="for-businesses"
        className="max-w-6xl mx-auto w-full px-6 md:px-10 py-14"
      >
        <div className="bg-sage rounded-[20px] px-7 md:px-10 py-10 flex flex-col md:flex-row gap-8 md:items-center">
          <div className="flex-1 flex flex-col gap-3">
            <span className="text-[13px] font-semibold tracking-wide uppercase text-[#CFE0CC]">
              For businesses
            </span>
            <h2 className="m-0 font-display text-3xl font-semibold tracking-tight text-[#FBF6EC]">
              Your menu, your prices, your customers.
            </h2>
            <p className="m-0 text-[15.5px] leading-relaxed text-[#DCE7D8] max-w-xl">
              Big delivery apps charge commissions high enough that many
              restaurants have to raise their prices or build their own
              ordering sites. MenuMap only handles dine-in and pickup, so it
              can charge a much lower commission. You also get a simple
              dashboard to edit your menu, update prices, and manage incoming
              orders.
            </p>
          </div>
          <a
            href={`${process.env.PUBLIC_URL}/business/apply`}
            className="shrink-0 w-fit px-5 py-3 rounded-[10px] text-[15px] font-semibold bg-[#FBF6EC] text-sage hover:bg-white transition-colors"
          >
            Partner with us
          </a>
        </div>
      </section>

      {/* About us */}
      <section
        id="about"
        className="max-w-6xl mx-auto w-full px-6 md:px-10 pt-6 pb-16 flex flex-col md:flex-row gap-10 md:gap-14"
      >
        <div className="flex-[1.1] flex flex-col gap-4">
          <SectionHeading eyebrow="About us" title="Why we're building MenuMap." />
          <p className="m-0 text-[15.5px] leading-relaxed text-muted">
            Ordering apps have grown to cover everything, and restaurants and
            diners end up paying for that. We want to do a few things well:
            help people find food that fits their taste and nutrition goals,
            and help restaurants put a clear, detailed menu online without
            giving up their margins.
          </p>
          <p className="m-0 text-[15.5px] leading-relaxed text-muted">
            Every menu item on MenuMap carries detailed information such as
            description, price, availability, nutrition, and dietary tags. That
            means you can search for "high-protein vegetarian near me" and get
            a real answer.
          </p>
        </div>

        <div className="flex-[0.85] bg-card border border-border rounded-2xl px-6 py-6 flex flex-col gap-4 h-fit">
          <span className="text-[12.5px] font-bold tracking-wide uppercase text-muted-2">
            The team · CS 157A, Team 8
          </span>
          <ul className="m-0 p-0 list-none flex flex-col gap-3">
            {team.map((name) => (
              <li key={name} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#EFF3EA] text-sage font-semibold text-sm flex items-center justify-center">
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="text-[15px] font-medium text-ink">{name}</span>
              </li>
            ))}
          </ul>
          <a
            href={`${process.env.PUBLIC_URL}/about`}
            className="text-sm font-semibold text-sage hover:text-sage-dark transition-colors w-fit"
          >
            More about the project →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold tracking-wide uppercase text-sage">
        {eyebrow}
      </span>
      <h2 className="m-0 font-display text-3xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
