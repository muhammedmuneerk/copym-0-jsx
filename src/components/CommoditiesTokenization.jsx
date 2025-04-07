import React, { useState } from "react";
import { Button, Card, CardContent, IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";

const CommoditiesTokenization = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section */}
      <section className="px-8 py-16 md:px-16 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Commodities Tokenization
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300 mb-4">
          Transforming Physical Assets into Digital Investments
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Unlock new investment opportunities in global commodity markets
          through blockchain technology
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="contained"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded"
            style={{ backgroundColor: "#10B981", textTransform: "none" }}
          >
            Start Tokenizing Commodities
          </Button>
          <Button
            variant="outlined"
            className="border-gray-500 text-white hover:bg-gray-800 px-6 py-3 rounded"
            style={{
              borderColor: "#6B7280",
              color: "white",
              textTransform: "none",
            }}
          >
            Explore Market Insights
          </Button>
        </div>
      </section>

      {/* Redefine Commodity Investment - Fixed Section */}
      <section className="px-8 py-16 md:px-16 lg:px-24 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Redefine Commodity Investment
          </h2>
          <p className="text-gray-400 mb-8">
            Leverage blockchain technology to transform traditional commodity
            investing
          </p>

          {/* Feature Boxes Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Commodity Liquidity */}
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
              <div className="text-green-500 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 18L12 22L16 18" />
                  <path d="M12 2V22" />
                  <path d="M3 9H21" />
                  <path d="M3 15H21" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-200">
                Commodity Liquidity
              </h3>
              <p className="text-gray-400">
                Transform physical commodities into tradable digital assets
              </p>
            </div>

            {/* Risk Mitigation */}
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
              <div className="text-green-500 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-200">
                Risk Mitigation
              </h3>
              <p className="text-gray-400">
                Diversify investment portfolios across commodity markets
              </p>
            </div>

            {/* Global Access (Grayed Out) */}
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg ">
              <div className="text-green-500 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-200">
                Global Access
              </h3>
              <p className="text-gray-400">
                Invest in commodities from around the world without barriers
              </p>
            </div>
          </div>
        </div>

        {/* Featured Tokenized Commodity Card */}
        <div className="md:w-1/2 mt-12 md:mt-0 pl-10">
          <Card className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-xl">
            {/* Green Header with Logo */}
            <div className="bg-green-600 p-6 relative">
              <div className="flex justify-between items-center">
                <IconButton
                  size="small"
                  className="text-white absolute left-4 bg-white/20 hover:bg-white/30 w-8 h-8"
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>

                <div className="ml-10">
                  <h3 className="text-2xl font-bold text-white">
                    Golden Reserves
                  </h3>
                  <p className="text-green-100">Precious Metals</p>
                </div>

                <div className="flex items-center">
                  <div className="mr-8">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      className="text-white/80"
                    >
                      <rect
                        x="8"
                        y="8"
                        width="24"
                        height="6"
                        fill="currentColor"
                        opacity="0.7"
                      />
                      <rect
                        x="8"
                        y="17"
                        width="24"
                        height="6"
                        fill="currentColor"
                        opacity="0.8"
                      />
                      <rect
                        x="8"
                        y="26"
                        width="24"
                        height="6"
                        fill="currentColor"
                        opacity="0.9"
                      />
                    </svg>
                  </div>
                  <IconButton
                    size="small"
                    className="text-white absolute right-4 bg-white/20 hover:bg-white/30 w-8 h-8"
                  >
                    <ChevronRightIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <CardContent className="text-white p-6">
              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Total Value</p>
                  <p className="text-xl font-semibold flex items-center">
                    <span className="inline-block w-5 h-5 mr-1 rounded-full bg-green-500 flex items-center justify-center text-xs">
                      $
                    </span>
                    15.6M
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Tokens</p>
                  <p className="text-xl font-semibold flex items-center">
                    <span className="inline-block w-5 h-5 mr-1 rounded-full bg-blue-500 flex items-center justify-center text-xs">
                      ↗
                    </span>
                    156,000
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Investors</p>
                  <p className="text-xl font-semibold flex items-center">
                    <span className="inline-block w-5 h-5 mr-1 rounded-full bg-purple-500 flex items-center justify-center text-xs">
                      ★
                    </span>
                    520
                  </p>
                </div>
              </div>

              {/* Token Distribution */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span>Token Distribution</span>
                  <span className="text-right">
                    <span className="text-gray-400 text-sm">Token Price</span>
                    <br />
                    <span className="font-semibold">$100</span>
                  </span>
                </div>

                {/* Token Distribution Grid */}
                <div className="grid grid-cols-10 gap-1 mb-2">
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-${i}`}
                        className="h-4 bg-green-500 rounded-sm"
                      ></div>
                    ))}
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-${i}`}
                        className="h-4 bg-green-500 rounded-sm"
                      ></div>
                    ))}
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-${i}`}
                        className="h-4 bg-green-500 rounded-sm"
                      ></div>
                    ))}
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-${i}`}
                        className="h-4 bg-green-500 rounded-sm"
                      ></div>
                    ))}
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-${i}`}
                        className="h-4 bg-green-500 rounded-sm"
                      ></div>
                    ))}
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-${i}`}
                        className="h-4 bg-green-500 rounded-sm"
                      ></div>
                    ))}
                  {Array(2)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-${i}`}
                        className="h-4 bg-green-500 rounded-sm"
                      ></div>
                    ))}
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-empty-${i}`}
                        className="h-4 bg-gray-600 rounded-sm"
                      ></div>
                    ))}
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-empty-${i}`}
                        className="h-4 bg-gray-600 rounded-sm"
                      ></div>
                    ))}
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row1-empty-${i}`}
                        className="h-4 bg-gray-600 rounded-sm"
                      ></div>
                    ))}
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`row2-empty-${i}`}
                        className="h-4 bg-gray-600 rounded-sm"
                      ></div>
                    ))}
                </div>

                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-green-500">68% Sold</span>
                  <span className="text-gray-400">32% Available</span>
                </div>
              </div>

              {/* Investment Details */}
              <div className="border-t border-gray-700 pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={toggleDetails}
                >
                  <h4 className="font-semibold">Investment Details</h4>
                  <IconButton size="small" className="text-white">
                    {detailsOpen ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </div>

                <Collapse in={detailsOpen}>
                  <div className="py-4">
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm">Expected Returns</p>
                      <p className="font-semibold">6.7% annual</p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm mb-2">
                        Tokenization Benefits
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Fractional ownership starting from $100",
                          "Global market access",
                          "Transparent trading",
                          "Diversification opportunities",
                        ].map((benefit, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-green-500 mr-2">→</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Collapse>

                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<ArrowForwardIcon />}
                  className="mt-4"
                  style={{ backgroundColor: "#10B981", textTransform: "none" }}
                >
                  View Investment Opportunity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Tokenizable Commodity Types */}
      <section className="px-8 py-16 md:px-16 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Tokenizable <span className="text-green-500">Commodity Types</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
          Explore a diverse range of commodity assets ready for fractional
          ownership
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outlined"
            className="rounded-full px-6 py-2"
            style={{ borderColor: "#6B7280", color: "white" }}
          >
            Precious Metals
          </Button>
          <Button
            variant="outlined"
            className="rounded-full px-6 py-2"
            style={{ borderColor: "#6B7280", color: "white" }}
          >
            Energy Resources
          </Button>
          <Button
            variant="outlined"
            className="rounded-full px-6 py-2"
            style={{ borderColor: "#6B7280", color: "white" }}
          >
            Agricultural Products
          </Button>
          <Button
            variant="outlined"
            className="rounded-full px-6 py-2"
            style={{ borderColor: "#6B7280", color: "white" }}
          >
            Industrial Metals
          </Button>
          <Button
            variant="outlined"
            className="rounded-full px-6 py-2"
            style={{ borderColor: "#6B7280", color: "white" }}
          >
            Rare Earth Elements
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-8 py-16 md:px-16 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Benefits of{" "}
          <span className="text-green-500">Commodity Tokenization</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
          Unlock new investment possibilities with blockchain-powered commodity
          assets
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-xl text-green-500 font-semibold mb-6 text-left">
              For Investors
            </h3>
            <ul className="space-y-4 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Low minimum investment</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Enhanced market liquidity</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Diversification across commodity classes</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Transparent and secure transactions</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-xl text-green-500 font-semibold mb-6 text-left">
              For Commodity Owners
            </h3>
            <ul className="space-y-4 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Fractional asset monetization</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Global investor access</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Reduced liquidity constraints</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Efficient capital management</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-16 md:px-16 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Revolutionize Your Commodity Investments?
        </h2>
        <p className="text-gray-400 mb-8 max-w-3xl mx-auto">
          Join the future of commodity investing with our blockchain-powered
          tokenization platform
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="contained"
            className="px-8 py-3"
            style={{ backgroundColor: "#10B981", textTransform: "none" }}
          >
            Start Investing
          </Button>
          <Button
            variant="outlined"
            className="px-8 py-3"
            style={{
              borderColor: "#6B7280",
              color: "white",
              textTransform: "none",
            }}
          >
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CommoditiesTokenization;
