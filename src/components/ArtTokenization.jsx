import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaletteIcon from "@mui/icons-material/Palette";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const ArtTokenization = () => {
  const [artworkDetails, setArtworkDetails] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 pt-20">
        <Typography
          variant="h2"
          component="h1"
          className="text-4xl md:text-5xl font-bold mb-2"
        >
          Art Tokenization
        </Typography>
        <Typography
          variant="h5"
          className="text-xl md:text-2xl font-medium mb-4"
        >
          Democratizing Art Investment
        </Typography>
        <Typography variant="body1" className="text-gray-300 mb-8 max-w-2xl">
          Transform art ownership through blockchain technology, making valuable
          art accessible to global investors
        </Typography>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="contained"
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3"
          >
            Start Tokenizing Art
          </Button>
          <Button
            variant="outlined"
            className="border-gray-400 text-gray-200 hover:bg-gray-800"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Features */}
          <div>
            <Typography
              variant="h3"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Revolutionize Art Investment
            </Typography>
            <Typography variant="body1" className="text-gray-300 mb-8">
              Empower your art investment strategy with fractional ownership and
              blockchain technology
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature Card 1 */}
              <Card className="bg-gray-800 border border-gray-700">
                <CardContent>
                  <PaletteIcon className="text-green-500 mb-4 text-4xl" />
                  <Typography variant="h6" className="font-bold mb-2">
                    Fractional Art Ownership
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    Invest in high-value art pieces with lower entry barriers
                  </Typography>
                </CardContent>
              </Card>

              {/* Feature Card 2 */}
              <Card className="bg-gray-800 border border-gray-700">
                <CardContent>
                  <ShieldIcon className="text-green-500 mb-4 text-4xl" />
                  <Typography variant="h6" className="font-bold mb-2">
                    Provenance Verification
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    Blockchain-backed authenticity and ownership tracking
                  </Typography>
                </CardContent>
              </Card>

              {/* Feature Card 3 (Grayed out) */}
              <Card className="bg-gray-800 border border-gray-700 ">
                <CardContent>
                  <LanguageIcon className="text-green-500 mb-4 text-4xl" />
                  <Typography variant="h6" className="font-bold mb-2">
                    Global Art Market
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    Access international art investments seamlessly
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Featured Art */}
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            {/* Artwork Preview */}
            <div className="relative bg-gradient-to-r from-green-500 to-green-700 p-8">
              <div className="absolute top-4 left-4">
                <IconButton
                  size="small"
                  className="bg-gray-800 text-white mr-2"
                >
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
              </div>
              <div className="absolute top-4 right-4">
                <IconButton size="small" className="bg-gray-800 text-white">
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </div>
              <div className="flex justify-end">
                <PaletteIcon className="text-white text-6xl opacity-30" />
              </div>
              <Typography variant="h4" className="text-white font-bold mb-1">
                Digital Horizon
              </Typography>
              <div className="flex items-center text-white text-sm">
                <Typography variant="body2">Elena Rodriguez</Typography>
                <span className="mx-2">•</span>
                <Typography variant="body2">Digital Art NFT</Typography>
              </div>
            </div>

            {/* Artwork Stats */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <Typography variant="body2" className="text-gray-400 mb-1">
                    Artwork Value
                  </Typography>
                  <Typography
                    variant="h6"
                    className="font-bold flex items-center"
                  >
                    <Box component="span" className="text-green-500 mr-1">
                      $
                    </Box>
                    1.2M
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" className="text-gray-400 mb-1">
                    Total Tokens
                  </Typography>
                  <Typography
                    variant="h6"
                    className="font-bold flex items-center"
                  >
                    <Box component="span" className="text-green-500 mr-1">
                      #
                    </Box>
                    12,000
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" className="text-gray-400 mb-1">
                    Investors
                  </Typography>
                  <Typography
                    variant="h6"
                    className="font-bold flex items-center"
                  >
                    <Box component="span" className="text-green-500 mr-1">
                      👤
                    </Box>
                    420
                  </Typography>
                </div>
              </div>

              {/* Token Distribution */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="body2" className="text-gray-400">
                    Token Distribution
                  </Typography>
                  <Typography variant="body2" className="text-right">
                    Token Price
                    <Typography variant="h6" className="font-bold">
                      ${100}
                    </Typography>
                  </Typography>
                </div>

                {/* Token Distribution Visualization */}
                <div className="grid grid-cols-10 gap-1 mb-2">
                  {[...Array(100)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-sm ${
                        index < 75 ? "bg-green-500" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex justify-between text-sm">
                  <Typography variant="body2">75% Sold</Typography>
                  <Typography variant="body2">25% Available</Typography>
                </div>
              </div>

              {/* Artwork Details */}
              <div className="border-t border-gray-700 pt-4">
                <Button
                  variant="text"
                  className="text-white flex justify-between w-full"
                  onClick={() => setArtworkDetails(!artworkDetails)}
                  endIcon={
                    <ExpandMoreIcon
                      className={artworkDetails ? "transform rotate-180" : ""}
                    />
                  }
                >
                  Artwork Details
                </Button>

                {artworkDetails && (
                  <div className="mt-4 text-gray-300">
                    <div className="mb-4">
                      <Typography
                        variant="body2"
                        className="text-gray-400 mb-1"
                      >
                        Expected Returns
                      </Typography>
                      <Typography variant="h6" className="font-bold">
                        7.5% annual
                      </Typography>
                    </div>

                    <div>
                      <Typography
                        variant="body2"
                        className="text-gray-400 mb-2"
                      >
                        Tokenization Benefits
                      </Typography>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ArrowRightIcon className="text-green-500 mr-1" />
                          <Typography variant="body2">
                            Fractional ownership starting from $100
                          </Typography>
                        </li>
                        <li className="flex items-start">
                          <ArrowRightIcon className="text-green-500 mr-1" />
                          <Typography variant="body2">
                            Secondary market trading
                          </Typography>
                        </li>
                        <li className="flex items-start">
                          <ArrowRightIcon className="text-green-500 mr-1" />
                          <Typography variant="body2">
                            Verified authenticity
                          </Typography>
                        </li>
                        <li className="flex items-start">
                          <ArrowRightIcon className="text-green-500 mr-1" />
                          <Typography variant="body2">
                            Transparent ownership records
                          </Typography>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Button
                variant="contained"
                className="bg-green-500 hover:bg-green-600 w-full mt-4 py-3"
                endIcon={<ArrowForwardIcon />}
              >
                View Investment Opportunity
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tokenizable Art Types Section */}
      <div className="py-16 text-center">
        <Typography variant="h3" className="text-3xl font-bold mb-2">
          Tokenizable <span className="text-green-500">Art Types</span>
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Explore a diverse range of art assets ready for fractional ownership
        </Typography>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <Chip
            label="Fine Art Paintings"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-6"
          />
          <Chip
            label="Digital Art NFTs"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-6"
          />
          <Chip
            label="Sculptures"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-6"
          />
          <Chip
            label="Photography Collections"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-6"
          />
          <Chip
            label="Rare Collectibles"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-6"
          />
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 text-center bg-gray-800">
        <Typography variant="h3" className="text-3xl font-bold mb-2">
          Ready to Invest in Art?
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Join a new era of art investment with transparent, accessible, and
          fractional ownership
        </Typography>

        <div className="flex justify-center gap-4">
          <Button
            variant="contained"
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3"
          >
            Start Investing
          </Button>
          <Button
            variant="outlined"
            className="border-gray-400 text-gray-200 hover:bg-gray-700"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtTokenization;
