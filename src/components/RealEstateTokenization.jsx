import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckIcon from "@mui/icons-material/Check";
import BuildingIcon from "@mui/icons-material/Business";
import DocumentIcon from "@mui/icons-material/Description";
import TokenIcon from "@mui/icons-material/Token";
import TradeIcon from "@mui/icons-material/SwapHoriz";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const RealEstateTokenization = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Function to render an accurate token distribution chart
  const renderTokenDistributionChart = () => {
    // Chart data
    const totalColumns = 10;
    const totalRows = 10;
    const soldPercentage = 92;

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
              cellCounter <= filledCells ? "bg-blue-500" : "bg-gray-600"
            }`}
          />
        );
      }
    }

    return cells;
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mt-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real Estate Tokenization
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            Transform Property Investment with Blockchain Technology
          </h2>
          <p className="text-gray-300 mb-8">
            Democratize real estate investment through fractional ownership,
            enhanced liquidity, and global accessibility.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6 py-2"
              style={{ backgroundColor: "#10b981", textTransform: "none" }}
            >
              Start Tokenizing
            </Button>
            <Button
              variant="outlined"
              className="border-green-500 text-green-500 hover:bg-green-900 rounded-md px-6 py-2"
              style={{
                borderColor: "#10b981",
                color: "#10b981",
                textTransform: "none",
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Revolutionize Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Revolutionize Real Estate Investment
            </h2>
            <p className="text-gray-300 mb-8">
              Copym enables investors to tokenize and trade real estate assets
              with unprecedented ease, transparency, and efficiency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature Card 1 */}
              <Card className="bg-[#1e293b] text-white border-none h-full rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Box className="w-12 h-12 bg-opacity-20 bg-green-900 rounded-md flex items-center justify-center">
                      <BusinessIcon
                        style={{ color: "#10b981", fontSize: 28 }}
                      />
                    </Box>
                  </div>
                  <Typography variant="h6" className="mb-2 font-bold">
                    Fractional Property Ownership
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Invest in premium real estate with lower entry barriers and
                    increased liquidity.
                  </Typography>
                </CardContent>
              </Card>

              {/* Feature Card 2 */}
              <Card className="bg-[#1e293b] text-white border-none h-full rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Box className="w-12 h-12 bg-opacity-20 bg-green-900 rounded-md flex items-center justify-center">
                      <DescriptionIcon
                        style={{ color: "#10b981", fontSize: 28 }}
                      />
                    </Box>
                  </div>
                  <Typography variant="h6" className="mb-2 font-bold">
                    Dynamic Valuation
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Real-time market pricing and transparent asset valuation
                    through blockchain.
                  </Typography>
                </CardContent>
              </Card>

              {/* Feature Card 3 - Comprehensive Compliance (Disabled/Dimmed) */}
              <Card className="bg-[#1e293b] text-white border-none h-full rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Box className="w-12 h-12 bg-opacity-20 bg-green-900 rounded-md flex items-center justify-center">
                      <DescriptionIcon
                        style={{ color: "#10b981", fontSize: 28 }}
                      />
                    </Box>
                  </div>
                  <Typography variant="h6" className="mb-2 font-bold">
                    Comprehensive Compliance
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Automated regulatory checks and investor verification for
                    seamless transactions.
                  </Typography>
                </CardContent>
              </Card>

              {/* Feature Card 4 */}
              <Card className="bg-[#1e293b] text-white border-none h-full rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Box className="w-12 h-12 bg-opacity-20 bg-green-900 rounded-md flex items-center justify-center">
                      <TokenIcon style={{ color: "#10b981", fontSize: 28 }} />
                    </Box>
                  </div>
                  <Typography variant="h6" className="mb-2 font-bold">
                    Global Accessibility
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Trade and invest in international real estate markets
                    without geographical limitations.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gold Vault Card */}
          <div className="lg:w-4/4 lg:pl-10">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold">Skyline Tower</h3>
                      <p className="text-gray-300">
                        New York, USA • Commercial
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
                      <p className="text-gray-400 text-sm">Property Value</p>
                      <p className="text-lg flex items-center">
                        <span className="text-blue-500 mr-1">$</span>28.5M
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Tokens</p>
                      <p className="text-lg">285,000</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Investors</p>
                      <p className="text-lg flex items-center">
                        <span className="text-blue-500 mr-1">👤</span>1,240
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-400">Token Distribution</p>
                      <p className="text-gray-300">
                        Token Price <span className="text-blue-500">$100</span>
                      </p>
                    </div>

                    {/* Updated Token Distribution Chart */}
                    <div className="grid grid-cols-10 gap-1 mb-1">
                      {renderTokenDistributionChart()}
                    </div>

                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-blue-500">92% Sold</p>
                      <p className="text-sm text-gray-400">8% Available</p>
                    </div>
                  </div>

                  <button
                    className="flex justify-between items-center w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-md mb-4"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  >
                    <span className="font-medium">Property Details</span>
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
                            Expected Returns
                          </p>
                          <p className="text-gray-200">8.2% annual</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-2">
                          Tokenization Benefits
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">→</span>
                            <span className="text-gray-200">
                              Fractional ownership starting from $100
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">→</span>
                            <span className="text-gray-200">
                              Secondary market trading for liquidity
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">→</span>
                            <span className="text-gray-200">
                              Automated dividend distributions
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">→</span>
                            <span className="text-gray-200">
                              Transparent ownership records
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-md font-medium flex items-center justify-center">
                    View Investment Opportunity
                    <ArrowForward className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenization Process Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Real Estate{" "}
            <span className="text-green-500">Tokenization Process</span>
          </h2>
          <p className="text-gray-300">
            Our streamlined process makes tokenizing real estate assets simple
            and efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Process Step 1 */}
          <Card className="bg-[#1e293b] text-white h-full relative">
            <span className="absolute top-6 left-6 w-8 h-8 bg-[#0f172a] rounded-full flex items-center justify-center text-xl font-bold">
              1
            </span>
            <CardContent className="pt-16 pb-8">
              <div className="mb-4">
                <Box className="w-10 h-10 bg-green-900 rounded-md flex items-center justify-center">
                  <BuildingIcon className="text-green-500" />
                </Box>
              </div>
              <Typography variant="h6" className="font-bold mb-2">
                Property Onboarding
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Register property details, documentation, and ownership
                verification.
              </Typography>
            </CardContent>
          </Card>

          {/* Process Step 2 */}
          <Card className="bg-[#1e293b] text-white h-full relative">
            <span className="absolute top-6 left-6 w-8 h-8 bg-[#0f172a] rounded-full flex items-center justify-center text-xl font-bold">
              2
            </span>
            <CardContent className="pt-16 pb-8">
              <div className="mb-4">
                <Box className="w-10 h-10 bg-green-900 rounded-md flex items-center justify-center">
                  <DocumentIcon className="text-green-500" />
                </Box>
              </div>
              <Typography variant="h6" className="font-bold mb-2">
                Legal Structure
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Set up the appropriate legal framework based on jurisdiction and
                property type.
              </Typography>
            </CardContent>
          </Card>

          {/* Process Step 3 */}
          <Card className="bg-[#1e293b] text-white h-full relative">
            <span className="absolute top-6 left-6 w-8 h-8 bg-[#0f172a] rounded-full flex items-center justify-center text-xl font-bold">
              3
            </span>
            <CardContent className="pt-16 pb-8">
              <div className="mb-4">
                <Box className="w-10 h-10 bg-green-900 rounded-md flex items-center justify-center">
                  <TokenIcon className="text-green-500" />
                </Box>
              </div>
              <Typography variant="h6" className="font-bold mb-2">
                Token Issuance
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Create property tokens with compliance and regulatory parameters
                built-in.
              </Typography>
            </CardContent>
          </Card>

          {/* Process Step 4 */}
          <Card className="bg-[#1e293b] text-white h-full relative">
            <span className="absolute top-6 left-6 w-8 h-8 bg-[#0f172a] rounded-full flex items-center justify-center text-xl font-bold">
              4
            </span>
            <CardContent className="pt-16 pb-8">
              <div className="mb-4">
                <Box className="w-10 h-10 bg-green-900 rounded-md flex items-center justify-center">
                  <TradeIcon className="text-green-500" />
                </Box>
              </div>
              <Typography variant="h6" className="font-bold mb-2">
                Investment & Trading
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Enable primary offering and secondary market trading for
                property tokens.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Benefits of{" "}
            <span className="text-green-500">Real Estate Tokenization</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Property Owners */}
          <Card className="bg-[#1e293b] text-white h-full">
            <CardContent className="p-8">
              <Typography
                variant="h5"
                className="font-bold mb-6 text-green-500"
              >
                For Property Owners
              </Typography>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-0.5" />
                  <Typography variant="body1">
                    Unlock liquidity without full property sale
                  </Typography>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-0.5" />
                  <Typography variant="body1">
                    Access global investor capital
                  </Typography>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-0.5" />
                  <Typography variant="body1">
                    Streamlined property management
                  </Typography>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-0.5" />
                  <Typography variant="body1">
                    Reduced transaction costs
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* For Investors */}
          <Card className="bg-[#1e293b] text-white h-full">
            <CardContent className="p-8">
              <Typography
                variant="h5"
                className="font-bold mb-6 text-green-500"
              >
                For Investors
              </Typography>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-0.5" />
                  <Typography variant="body1">
                    Lower investment minimums
                  </Typography>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-0.5" />
                  <Typography variant="body1">
                    Portfolio diversification
                  </Typography>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-0.5" />
                  <Typography variant="body1">
                    Secondary market liquidity
                  </Typography>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-0.5" />
                  <Typography variant="body1">
                    Automated income distributions
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Real Estate Portfolio?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of property owners and investors already tokenizing
            real estate on the Copym platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6 py-2"
              style={{ backgroundColor: "#10b981", textTransform: "none" }}
            >
              Start Tokenizing
            </Button>
            <Button
              variant="outlined"
              className="border-green-500 text-green-500 hover:bg-green-900 rounded-md px-6 py-2"
              style={{
                borderColor: "#10b981",
                color: "#10b981",
                textTransform: "none",
              }}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstateTokenization;
