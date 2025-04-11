import React, { useState } from "react";
import {
  ArrowForward,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ExpandMore,
  Check,
  Language,
  Security,
  AccountBalance,
  ArrowRightAlt,
} from "@mui/icons-material";
import GoldSwirl from "./GoldSwirl";

const GoldTokenization = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Function to render an accurate token distribution chart
  const renderTokenDistributionChart = () => {
    // Chart data
    const totalColumns = 10;
    const totalRows = 10;
    const soldPercentage = 72;

    // Calculate how many cells should be filled (gold color)
    const totalCells = totalColumns * totalRows;
    const filledCells = Math.round((soldPercentage / 100) * totalCells);

    // Create the grid cells
    const cells = [];
    let cellCounter = 0;

    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalColumns; col++) {
        cellCounter++;
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`h-4 rounded-sm ${
              cellCounter <= filledCells ? "bg-yellow-500" : "bg-gray-600"
            }`}
          />
        );
      }
    }

    return cells;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20">
      {/* Header Section */}
      <div className="relative">
    {/* 🌀 GoldSwirl Background */}
    <div className="fixed  inset-0 z-0 flex items-center justify-center pointer-events-none w-full h-full">
      <GoldSwirl />
    </div>
      <div className="container mx-auto py-20 px-4 md:px-12 pt-20 ">
      
        <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-2">
          Gold Tokenization
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300 mb-4">
          Democratizing Gold Investment Through Blockchain
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl">
          Transform your approach to gold investing with fractional ownership,
          enhanced liquidity, and transparent trading
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md font-medium transition">
            Start Investing in Gold
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition">
            Learn More
          </button>
        </div>
      </div>
      

      {/* Revolutionize Gold Investment Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
                Revolutionize Gold Investment
              </h2>
              <p className="text-gray-400 mb-6">
                Unlock the potential of gold through blockchain-powered
                fractional ownership
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Feature Card 1 */}
                <div className="bg-gray-800 p-6 rounded-lg transition-all hover:bg-gray-700">
                  <div className="text-yellow-500 mb-4">
                    <AccountBalance fontSize="large" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Fractional Gold Ownership
                  </h3>
                  <p className="text-gray-400">
                    Invest in premium gold assets with lower entry barriers
                  </p>
                </div>

                {/* Feature Card 2 */}
                <div className="bg-gray-800 p-6 rounded-lg transition-all hover:bg-gray-700">
                  <div className="text-yellow-500 mb-4">
                    <Security fontSize="large" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
                  <p className="text-gray-400">
                    Professionally vaulted and insured gold assets
                  </p>
                </div>

                {/* Feature Card 3 (Disabled) */}
                <div className="bg-gray-800 p-6 rounded-lg  transition-all hover:bg-gray-700">
                  <div className="text-gray-500 mb-4">
                    <Language fontSize="large" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Global Accessibility
                  </h3>
                  <p className="text-gray-400">
                    Trade gold tokens from anywhere in the world
                  </p>
                </div>
              </div>
            </div>

            {/* Gold Vault Card */}
            <div className="lg:w-1/2 lg:pl-10">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="relative">
                  <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-bold">Royal Gold Vault</h3>
                        <p className="text-gray-300">
                          Swiss Secure Vault • 99.99% Pure Gold
                        </p>
                      </div>
                      <div className="flex">
                        <button className="bg-gray-800 bg-opacity-30 p-2 rounded-full mr-2">
                          <KeyboardArrowLeft />
                        </button>
                        <button className="bg-gray-800 bg-opacity-30 p-2 rounded-full">
                          <KeyboardArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div>
                        <p className="text-gray-400 text-sm">Total Value</p>
                        <p className="text-lg flex items-center">
                          <span className="text-yellow-500 mr-1">$</span>28.5M
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Total Tokens</p>
                        <p className="text-lg">285,000</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Investors</p>
                        <p className="text-lg flex items-center">
                          <span className="text-yellow-500 mr-1">👤</span>1,240
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-400">Token Distribution</p>
                        <p className="text-gray-300">
                          Token Price{" "}
                          <span className="text-yellow-500">$100</span>
                        </p>
                      </div>

                      {/* Updated Token Distribution Chart */}
                      <div className="grid grid-cols-10 gap-1 mb-1">
                        {renderTokenDistributionChart()}
                      </div>

                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-yellow-500">72% Sold</p>
                        <p className="text-sm text-gray-400">28% Available</p>
                      </div>
                    </div>

                    <button
                      className="flex justify-between items-center w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-md mb-4"
                      onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    >
                      <span className="font-medium">Gold Asset Details</span>
                      <ExpandMore
                        className={`transform transition-transform ${
                          isDetailsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDetailsOpen && (
                      <div className="bg-gray-700 -mt-4 mb-4 p-4 rounded-b-md">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-sm">
                              Total Weight
                            </p>
                            <p className="text-gray-200">500 kg</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">
                              Expected Returns
                            </p>
                            <p className="text-gray-200">6.5% annual</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-400 text-sm mb-1">
                            Certification
                          </p>
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                            <p className="text-gray-200">
                              LBMA Good Delivery Standard
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm mb-2">
                            Tokenization Benefits
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-yellow-500 mr-2">→</span>
                              <span className="text-gray-200">
                                Fractional ownership starting from $100
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-500 mr-2">→</span>
                              <span className="text-gray-200">
                                Secure vault storage
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-500 mr-2">→</span>
                              <span className="text-gray-200">
                                Transparent ownership records
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-500 mr-2">→</span>
                              <span className="text-gray-200">
                                Easy liquidity
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 py-3 px-4 rounded-md font-medium flex items-center justify-center">
                      Invest in Gold Tokens
                      <ArrowForward className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tokenizable Gold Assets Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-2">
            Tokenizable <span className="text-yellow-500">Gold Assets</span>
          </h2>
          <p className="text-gray-400 mb-10">
            Explore the diverse range of gold assets available for tokenization
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-full transition">
              Bullion Bars
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-full transition">
              Numismatic Coins
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-full transition">
              Refined Gold
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-full transition">
              Gold Certificates
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-full transition">
              Mining Shares
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <h2 className=" font-orbitron text-3xl md:text-4xl font-bold mb-2">
            Benefits of{" "}
            <span className="text-yellow-500">Gold Tokenization</span>
          </h2>
          <p className="text-gray-400 mb-10">
            Discover the advantages of investing in tokenized gold assets
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* For Investors */}
            <div className="bg-gray-800 p-8 rounded-lg text-left">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">
                For Investors
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-yellow-500 mr-2 mt-1" />
                  <span>Low minimum investment</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-yellow-500 mr-2 mt-1" />
                  <span>High liquidity</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-yellow-500 mr-2 mt-1" />
                  <span>Transparent ownership</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-yellow-500 mr-2 mt-1" />
                  <span>Global market access</span>
                </li>
              </ul>
            </div>

            {/* For Gold Owners */}
            <div className="bg-gray-800 p-8 rounded-lg text-left">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">
                For Gold Owners
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-yellow-500 mr-2 mt-1" />
                  <span>Unlock asset value</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-yellow-500 mr-2 mt-1" />
                  <span>Attract global investors</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-yellow-500 mr-2 mt-1" />
                  <span>Reduce storage costs</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-yellow-500 mr-2 mt-1" />
                  <span>Enhanced asset liquidity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 bg-gray-800 bg-opacity-50">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            Ready to Invest in Tokenized Gold?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of gold investment with our secure, transparent, and
            accessible platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-md font-medium transition">
              Start Investing
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-md font-medium transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GoldTokenization;
