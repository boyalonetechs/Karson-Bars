import {
  Award,
  BadgeCheck,
  Leaf,
  GraduationCap,
  FlaskConical,
  Globe,
  Trophy,
  Users,
  Sprout,
  Wheat,
  Heart,
  Sun,
  Milk,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#1E1E1E] font-sans overflow-x-clip">
      <Header />

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-2">
              About Us
            </h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
              Gifta Multi Services Ltd — the home of Gifta Breadfruit Bars
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Company Story */}
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                <strong className="text-[#801B1B]">
                  GIFTA MULTI SERVICES LTD
                </strong>{" "}
                is a business company registered with CAC in 2011. Gifta is
                registered with the Federal Ministry of Industry, Trade and
                Investment Commercial Law Department with a Trademark Acceptance
                on 18th April, 2026 under product class 30.
              </p>
              <p>
                Gifta produces a Specialty Food known as{" "}
                <strong>Gifta Breadfruit Bars</strong>, which has also been
                registered with NAFDAC. Gifta Breadfruit Bars is a completely
                plant-based food snack produced under extensive and intensive
                research — a more nutritious and convenient alternative to the
                utilisation of African breadfruit seeds other than the
                traditional roasting or boiling and consuming as porridge meals.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Award,
                  title: "CAC Registered",
                  sub: "Business company since 2011",
                },
                {
                  icon: BadgeCheck,
                  title: "NAFDAC Registered",
                  sub: "Gifta Breadfruit Bars certified",
                },
                {
                  icon: Leaf,
                  title: "100% Plant-Based",
                  sub: "Made from African breadfruit seeds",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/60 border border-yellow-200/50 rounded-2xl p-5 flex items-start space-x-4 shadow-sm"
                >
                  <div className="bg-[#FAD02C] p-2.5 rounded-full text-[#1E1E1E] shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOUNDER'S INTRODUCTION --- */}
      <section className="bg-[#801B1B] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
            Founder&apos;s Introduction
          </h2>
          <p className="text-center text-xs md:text-sm text-red-100 mb-12">
            The mind behind Gifta Breadfruit Bars
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-4 text-sm text-red-50 leading-relaxed">
              <p>
                The Founder and Developer of Gifta Breadfruit Bars is{" "}
                <strong className="text-white">
                  Professor Titus Ugochukwu Nwabueze
                </strong>
                . He is a Professor of Food Science and Technology with
                specialization in postharvest management of crops, particularly
                of African breadfruit (<em>Treculia africana, ukwa</em>) seeds
                utilisation.
              </p>
              <p>
                Technologically, he specializes in{" "}
                <strong className="text-white">
                  Food Extrusion Technology and Process Optimization
                </strong>
                , using African breadfruit seeds. By this specialization, he is
                a Food Products Formulator and Developer, with value addition as
                his target. This has taken him to more than 8 countries in the
                world, including the USA, Canada, and Brazil.
              </p>
              <p>
                He has developed, published and presented many products from
                African breadfruit seeds in local and international conferences
                and workshops. These products included but not limited to snack
                bars, cookies, bread, biscuits, spaghetti-like products,
                doughnuts, cakes and chin chin, breadfruit oil and breadfruit
                milk.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: GraduationCap,
                  title: "Professor of Food Science & Technology",
                  sub: "Postharvest management of crops, particularly African breadfruit seed utilisation.",
                },
                {
                  icon: FlaskConical,
                  title: "Food Extrusion Technologist",
                  sub: "Process optimization and product formulation with value addition as the target.",
                },
                {
                  icon: Globe,
                  title: "8+ Countries & Counting",
                  sub: "Has taken his research to the USA, Canada, Brazil and beyond.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAD02C] text-[#1E1E1E] p-5 rounded-xl flex items-start space-x-4 shadow-md"
                >
                  <div className="bg-white p-2.5 rounded-full text-[#1E1E1E] shrink-0 mt-0.5">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-800 leading-relaxed">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- THE CHALLENGE AT RETIREMENT --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3 space-y-4 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-2">
              The Challenge at Retirement
            </h2>
            <p>
              My retirement from Michael Okpara University of Agriculture
              Umudike on 9th January 2025, after 20 years of professorship,
              opened a divinely awaited opportunity to translate the wealth of
              my intense research on African breadfruit utilization beyond
              roasting as snacks with palm kernels and boiling into porridge
              meals.
            </p>
            <p>
              African breadfruit was my pivot in my inaugural lecture in 2018,
              titled{" "}
              <em className="text-[#801B1B] font-semibold">
                BREAD ON THE TREE
              </em>
              . Ordinarily, raw African breadfruit seeds are seasonal and do not
              last beyond 3–4 days before they shrivel and dry up. This makes
              their processing and transformation into special products like
              Gifta Breadfruit Bars — which can last beyond one week — of great
              value, considering particularly that African breadfruit is
              seasonal and hard to cook.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-[#FAD02C] text-[#1E1E1E] p-8 rounded-2xl shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#801B1B] text-white flex items-center justify-center font-serif text-xl leading-none mb-4">
                “
              </div>
              <p className="font-serif italic text-2xl md:text-3xl leading-relaxed">
                BREAD ON THE TREE
              </p>
              <p className="text-xs text-gray-800 mt-3">
                Inaugural Lecture · 2018
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXHIBITIONS, TRADE FAIRS AND CONFERENCES --- */}
      <section className="bg-[#801B1B] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
            Exhibitions, Trade Fairs &amp; Conferences
          </h2>
          <p className="text-center text-xs md:text-sm text-red-100 mb-12">
            Sharing Gifta Breadfruit Bars across Nigeria and beyond
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: "Umuahia Mega Trade Fair",
                sub: "Gifta Breadfruit Bars was exhibited at the Shop Rite Umuahia between 5th–7th December, 2025.",
              },
              {
                icon: Sparkles,
                title: "Ohafia Mega Exhibition",
                sub: "Organisers located and invited Gifta to display Gifta Breadfruit Bars at their trade fairs.",
              },
              {
                icon: Users,
                title: "Panel Discussions",
                sub: "Invited to panels at NIFST: SE and Regional and Abia State Ministry of Science, Technology and Innovation.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAD02C] text-[#1E1E1E] p-6 rounded-2xl flex flex-col items-start space-y-4 shadow-md"
              >
                <div className="bg-white p-3 rounded-full text-[#1E1E1E]">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs md:text-sm text-red-100 max-w-3xl mx-auto mt-10">
            Topics covered included Research and Innovation, Research to
            Commercialization, Food Value Addition and Sustainability, and the
            Role of the Nigeria Institute of Food Science and Technology in a
            Depressed Economy — with African breadfruit utilization and research
            experiences as key references.
          </p>
        </div>
      </section>

      {/* --- SOLVING THE NUTRITIONAL PROBLEMS --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-2">
          Solving the Nutritional Problems
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mb-12 max-w-xl mx-auto">
          Gifta Breadfruit Bars is not just another snack food. It is a food
          snack formulated and developed from selected legumes and cereals to
          meet the nutritional needs of the society.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sprout,
              stat: "28%",
              label: "High Protein",
              sub: "For sustained nutrition",
            },
            {
              icon: Wheat,
              stat: "25%",
              label: "Dietary Fibre",
              sub: "Supports digestion and satiety",
            },
            {
              icon: Sparkles,
              stat: "Rich",
              label: "Vitamins & Minerals",
              sub: "Naturally wholesome",
            },
            {
              icon: Heart,
              stat: "Friendly",
              label: "Diabetes Friendly",
              sub: "Formulated for young and adults",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/60 border border-yellow-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-[#FAD02C] w-11 h-11 mx-auto rounded-full flex items-center justify-center mb-4">
                <item.icon size={20} />
              </div>
              <h3 className="text-3xl font-black text-[#801B1B]">
                {item.stat}
              </h3>
              <p className="font-bold text-sm mt-1">{item.label}</p>
              <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-700 leading-relaxed max-w-3xl mx-auto mt-10">
          Consumption of starch-based snacks, or at most single legumes or
          cereals, is not good enough where a better and nutrient-enriched
          alternative like Gifta Breadfruit Bars is possible. Gifta Breadfruit
          Bars is tasty, nutritious, satiable, and digestive. It enhances fluid
          intake into the body — such as water, breakfast tea, coffee, midday
          beverages like minerals, fruit juice and local fluid preparations.
        </p>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-2">
          Core Values
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mb-12 max-w-xl mx-auto">
          What makes Gifta Breadfruit Bars the companion you can count on — at
          work, at home and everywhere in between
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sun,
              title: "Tasty & Convenient",
              sub: "A quick serve to visitors and a companion while hurrying to work or at office, meetings, classrooms or conferences.",
            },
            {
              icon: Heart,
              title: "Nutritious & Satiable",
              sub: "Rich in protein, dietary fibre, vitamins and minerals — keeps one off intermittent hunger while at work.",
            },
            {
              icon: Milk,
              title: "Enhances Fluid Intake",
              sub: "Pairs beautifully with water, breakfast tea, coffee, midday beverages and local fluid preparations.",
            },
            {
              icon: Leaf,
              title: "Wholesome & Plant-Based",
              sub: "Cheap compared to its animal nutritional equivalents. Well packaged and convenient.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAD02C] text-[#1E1E1E] p-6 rounded-2xl shadow-md flex flex-col items-start text-left space-y-4"
            >
              <div className="bg-white p-3 rounded-full">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-800 leading-relaxed">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
