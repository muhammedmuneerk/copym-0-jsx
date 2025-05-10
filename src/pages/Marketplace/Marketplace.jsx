import { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Slider,
  Grid,
  LinearProgress,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import GradientLetters from "../../components/GradientLetters";


const mockAssets = [
  {
    id: 1,
    title: "Premium Office Building",
    category: "Real Estate",
    location: "New York, USA",
    expectedRoi: "8.5%",
    price: 250000,
    availableTokens: 750,
    totalTokens: 1000,
    image: "placeholder",
  },
  {
    id: 2,
    title: "Digital Art Collection",
    category: "Art",
    location: "Digital",
    expectedRoi: "Variable",
    price: 15000,
    availableTokens: 65,
    totalTokens: 100,
    image: "placeholder",
  },
  {
    id: 3,
    title: "Gold Reserve",
    category: "Commodities",
    location: "Secure Vault, Switzerland",
    expectedRoi: "5.2%",
    price: 50000,
    availableTokens: 320,
    totalTokens: 500,
    image: "placeholder",
  },
  {
    id: 4,
    title: "Solar Farm Project",
    category: "Infrastructure",
    location: "Arizona, USA",
    expectedRoi: "7.3%",
    price: 120000,
    availableTokens: 1800,
    totalTokens: 2000,
    image: "placeholder",
  },
  {
    id: 5,
    title: "Tech Startup Equity",
    category: "Startups",
    location: "San Francisco, USA",
    expectedRoi: "High Risk/Reward",
    price: 75000,
    availableTokens: 210,
    totalTokens: 300,
    image: "placeholder",
  },
  {
    id: 6,
    title: "Luxury Apartment Complex",
    category: "Real Estate",
    location: "Miami, USA",
    expectedRoi: "6.8%",
    price: 350000,
    availableTokens: 1200,
    totalTokens: 1500,
    image: "placeholder",
  },
];

const categories = [
  "All Categories",
  "Real Estate",
  "Art",
  "Commodities",
  "Infrastructure",
  "Startups",
];
const sortOptions = [
  "Latest",
  "ROI",
  "Price: Low to High",
  "Price: High to Low",
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("Latest");

  // Format price for display
  const formatPrice = (value) => {
    return `$${value.toLocaleString()}`;
  };

  // Filter and sort assets
  const filteredAssets = useMemo(() => {
    return mockAssets
      .filter((asset) => {
        // Search filter
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          asset.title.toLowerCase().includes(searchLower) ||
          asset.location.toLowerCase().includes(searchLower) ||
          asset.category.toLowerCase().includes(searchLower);

        // Category filter
        const matchesCategory =
          selectedCategory === "All Categories" ||
          asset.category === selectedCategory;

        // Price range filter
        const matchesPriceRange =
          asset.price >= priceRange[0] && asset.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesPriceRange;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "Price: Low to High":
            return a.price - b.price;
          case "Price: High to Low":
            return b.price - a.price;
          case "ROI":
            // Convert ROI strings to numbers for comparison
            const getROIValue = (roi) => {
              if (roi === "Variable" || roi === "High Risk/Reward") return -1;
              return parseFloat(roi.replace("%", ""));
            };
            return getROIValue(b.expectedRoi) - getROIValue(a.expectedRoi);
          case "Latest":
          default:
            return b.id - a.id; // Assuming higher IDs are more recent
        }
      });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // Handle price range change
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box className="min-h-screen py-16">
      <Container maxWidth="xl">
        {/* Header Section */}
        <Typography
          variant="h1"
          className="w-full text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-20 text-center"
        >
          <Box
            component="div"
            className="flex flex-col items-center justify-center w-full"
          >
            {/* Large Screens (1 line) */}
            <Box className="hidden lg:flex lg:justify-center w-full">
              <GradientLetters
                text="Asset Tokenization Marketplace"
                keyPrefix="lg-line1"
              />
            </Box>

            {/* Small and Medium screens: 2 lines */}
            <Box className="flex flex-col items-center justify-center lg:hidden w-full">
              <Box component="div" className="flex justify-center w-full">
                <GradientLetters text="Asset Tokenization" keyPrefix="sm-line1" />
              </Box>

              <Box component="div" className="flex justify-center w-full">
                <GradientLetters text="Marketplace" keyPrefix="sm-line2" />
              </Box>
            </Box>
          </Box>
        </Typography>

        <Typography
          variant="body1"
          className="text-text-secondary text-center max-w-3xl mx-auto mb-12"
        >
          Discover and invest in tokenized assets across various categories.
          Each asset is fractionally divided, allowing for smaller investment
          thresholds.
        </Typography>

        {/* Search and Filter Section */}
        <Grid container spacing={3} className="mb-8">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name, category, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(18, 19, 26, 0.5)",
                  backdropFilter: "blur(10px)",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  backgroundColor: "rgba(18, 19, 26, 0.5)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>
                Price Range: {formatPrice(priceRange[0])} -{" "}
                {formatPrice(priceRange[1])}
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                min={0}
                max={1000000}
                step={10000}
                valueLabelDisplay="auto"
                valueLabelFormat={formatPrice}
                sx={{
                  "& .MuiSlider-thumb": {
                    color: "#00ff85",
                  },
                  "& .MuiSlider-track": {
                    color: "#00ff85",
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  backgroundColor: "rgba(18, 19, 26, 0.5)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Results Count */}
        <Typography className="mb-4 text-text-secondary">
          Showing {filteredAssets.length} of {mockAssets.length} assets
        </Typography>

        {/* Asset Grid */}
        <Grid container spacing={4}>
          {filteredAssets.map((asset) => (
            <Grid item xs={12} sm={6} lg={4} key={asset.id}>
              <Box
                className="rounded-lg overflow-hidden"
                sx={{
                  backgroundColor: "rgba(18, 19, 26, 0.5)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Asset Image */}
                <Box
                  className="w-full aspect-video bg-gray-800 flex items-center justify-center"
                  sx={{ backgroundColor: "rgba(18, 19, 26, 0.8)" }}
                >
                  <Typography>Asset Image Placeholder</Typography>
                </Box>

                {/* Asset Details */}
                <Box className="p-4">
                  <Box className="mb-2">
                    <span
                      className="inline-block px-2 py-1 rounded text-sm"
                      style={{
                        backgroundColor: "rgba(0, 255, 133, 0.1)",
                        color: "#00ff85",
                      }}
                    >
                      {asset.category}
                    </span>
                  </Box>
                  <Typography variant="h6" className="mb-2">
                    {asset.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-text-secondary mb-2"
                  >
                    Location: {asset.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-text-secondary mb-2"
                  >
                    Expected ROI: {asset.expectedRoi}
                  </Typography>
                  <Box className="mb-3">
                    <Typography
                      variant="body2"
                      className="text-text-secondary mb-1"
                    >
                      Available: {asset.availableTokens}/{asset.totalTokens}{" "}
                      tokens
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(asset.availableTokens / asset.totalTokens) * 100}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#00ff85",
                        },
                      }}
                    />
                  </Box>
                  <Box className="flex items-center justify-between">
                    <Typography variant="h6" sx={{ color: "#00ff85" }}>
                      ${asset.price.toLocaleString()}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#00ff85",
                        "&:hover": {
                          backgroundColor: "#00cc6a",
                        },
                      }}
                    >
                      Invest
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
