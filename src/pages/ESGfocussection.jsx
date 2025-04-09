import React from "react";

const ESGFocusSection = () => {
  return (
    <section className="px-4 py-20 bg-background text-text-primary space-y-24">
      {/* Section 1: Focus on Metals */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className=" font-orbitron text-3xl md:text-4xl font-bold text-green-400 font-futuristic mb-4">
            Focus on Metals: Our Core Offering
          </h2>
          <p className="text-lg text-text-secondary font-futuristic mb-4">
            Metals are at the center of our strategy due to their critical role in sustainable technology:
          </p>
          <p className="text-base text-text-secondary font-futuristic">
            Each tokenized metal is vetted for sustainable sourcing, traceability, and environmental impact, with transparent records across the value chain.
          </p>
        </div>
        <div className="md:w-1/2">
          {/* Replace with actual image */}
          <img src="/images/metal-use-case.jpg" alt="Metal Use Case" className="rounded-xl shadow-md" />
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-green-400/10 mx-auto w-3/4" />

      {/* Section 2: Diversified ESG Portfolio */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          {/* Replace with actual image */}
          <img src="/images/esg-diversified.jpg" alt="Diversified ESG Portfolio" className="rounded-xl shadow-md" />
        </div>
        <div className="md:w-1/2">
          <h2 className=" font-orbitron text-3xl md:text-4xl font-bold text-green-400 font-futuristic mb-4">
            Diversified ESG Commodities Portfolio
          </h2>
          <p className="text-lg text-text-secondary font-futuristic">
            While metals are our flagship, we are expanding into other ESG-aligned asset categories. This diversified approach ensures investors can build a balanced and impactful ESG portfolio.
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-green-400/10 mx-auto w-3/4" />

      {/* Section 3: Blockchain Role */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className=" font-orbitron text-3xl md:text-4xl font-bold text-green-400 font-futuristic mb-6">
          The Role of Blockchain
        </h2>
        <ul className="text-lg text-text-secondary font-futuristic space-y-2 text-left max-w-2xl mx-auto">
          <li>• <strong>Traceability:</strong> Every asset’s lifecycle is visible, preventing greenwashing.</li>
          <li>• <strong>Liquidity:</strong> Tokenized assets are tradable 24/7 with global reach.</li>
          <li>• <strong>Security:</strong> Smart contracts ensure direct, tamper-proof ownership and compliance.</li>
          <li>• <strong>Accessibility:</strong> Lower entry points via fractionalization expand participation in ESG investing.</li>
        </ul>
      </div>

      {/* Divider */}
      <hr className="border-t border-green-400/10 mx-auto w-3/4" />

      {/* Section 4: Comparative Snapshot */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-green-400 font-futuristic mb-6">
          Comparative Snapshot: Metals vs. Other ESG Assets
        </h2>
        {/* Replace with actual image */}
        <img src="/images/metals-vs-esg.jpg" alt="Metals vs ESG Comparison" className="mx-auto rounded-xl shadow-md" />
        <p className="text-lg text-text-secondary font-futuristic mt-4">
          This clear focus ensures metals lead our impact, with complementary assets scaling the platform’s ESG reach.
        </p>
      </div>
    </section>
  );
};

export default ESGFocusSection;
