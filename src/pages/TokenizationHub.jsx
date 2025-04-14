import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import BusinessIcon from "@mui/icons-material/Business";
import PaletteIcon from "@mui/icons-material/Palette";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import NatureIcon from "@mui/icons-material/Nature";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DescriptionIcon from "@mui/icons-material/Description";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PolicyIcon from "@mui/icons-material/Policy";
import PaymentsIcon from "@mui/icons-material/Payments";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import RuleIcon from "@mui/icons-material/Rule";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TimelineIcon from "@mui/icons-material/Timeline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PieChartIcon from "@mui/icons-material/PieChart";
import ForumIcon from "@mui/icons-material/Forum";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MonitorIcon from "@mui/icons-material/Monitor";
import { alpha } from "@mui/material/styles";

const assetCategories = [
  {
    title: "Real Estate",
    description:
      "Tokenize commercial and residential properties, REITs, and development projects",
    marketSize: "280B+",
    keyBenefits: [
      "Fractional ownership of premium properties",
      "Enhanced liquidity for real estate assets",
      "Access to global real estate markets",
    ],
  },
  {
    title: "Art & Collectibles",
    description:
      "Digital ownership of fine art, collections, and cultural assets",
    marketSize: "65B+",
    keyBenefits: [
      "Fractional ownership of high-value art",
      "Digital provenance on the blockchain",
      "Access to exclusive art collections",
    ],
  },
  {
    title: "Commodities",
    description:
      "Tokenize physical commodities including precious metals and agriculture",
    marketSize: "120B+",
    keyBenefits: [
      "Fractional ownership of commodity supplies",
      "Simplified trading and settlement",
      "Reduced custody costs",
    ],
  },
  {
    title: "Carbon Credits",
    description:
      "Digital trading of carbon offset credits and environmental assets",
    marketSize: "45B+",
    keyBenefits: [
      "Transparent carbon offset certificates",
      "Streamlined carbon credit trading",
      "Enhanced environmental impact tracking",
    ],
  },
  {
    title: "Private Equity",
    description:
      "Tokenize private equity funds, venture capital, and business shares",
    marketSize: "175B+",
    keyBenefits: [
      "Access to previously illiquid investments",
      "Reduced minimum investment thresholds",
      "Enhanced secondary market trading",
    ],
  },
  {
    title: "Other Asset Classes",
    description: "Explore additional assets like infrastructure, IP, and more",
    marketSize: "90B+",
    keyBenefits: [
      "Tokenize virtually any asset with value",
      "Custom tokenization frameworks",
      "Innovative asset structures",
    ],
  },
];

const tokenizationSteps = [
  {
    label: "Asset Registration",
    description:
      "Register your physical asset with comprehensive documentation and validation.",
    features: [
      "Ownership verification",
      "Asset appraisal",
      "Documentation upload",
      "KYC/AML compliance",
      "Jurisdictional framework selection",
    ],
  },
  {
    label: "Legal Structure",
    description:
      "Apply the appropriate legal framework based on your asset class and jurisdiction.",
    features: [
      "Automated legal templates",
      "Compliance checks",
      "Regulatory reporting setup",
      "Investor qualification",
      "Disclaimer and disclosure generation",
    ],
  },
  {
    label: "Smart Contract",
    description:
      "Deploy secure, audited smart contracts on your chosen blockchain.",
    features: [
      "Token standard selection",
      "Configurable token parameters",
      "Multi-chain deployment options",
      "Automated contract verification",
      "On-chain governance setup",
    ],
  },
  {
    label: "Token Distribution",
    description: "Distribute tokens through public or private offerings.",
    features: [
      "Customizable offering structures",
      "Investor onboarding portal",
      "Payment processing",
      "Vesting schedules",
      "Distribution automation",
    ],
  },
  {
    label: "Market",
    description: "Enable trading of your tokenized assets.",
    features: [
      "Built-in exchange mechanism",
      "External exchange integration",
      "Liquidity pool setup",
      "OTC trading capabilities",
      "Market data analytics",
    ],
  },
  {
    label: "Management",
    description:
      "Manage your tokenized asset with governance tools and reporting.",
    features: [
      "Dividend/distribution automation",
      "Governance proposal system",
      "Reporting dashboard",
      "Investor communications",
      "Compliance monitoring",
    ],
  },
];

const comparisonData = [
  {
    feature: "Multi-Chain Support",
    copym: { value: "Yes", status: "success" },
    competitorA: { value: "Limited", status: "warning" },
    competitorB: { value: "No", status: "error" },
  },
  {
    feature: "Compliance Framework",
    copym: { value: "Extensive", status: "success" },
    competitorA: { value: "Moderate", status: "warning" },
    competitorB: { value: "Basic", status: "error" },
  },
  {
    feature: "Asset Types",
    copym: { value: "Multiple", status: "success" },
    competitorA: { value: "Few", status: "warning" },
    competitorB: { value: "Single", status: "error" },
  },
];

const getCategoryIcon = (title) => {
  switch (title) {
    case "Real Estate":
      return <BusinessIcon fontSize="large" />;
    case "Art & Collectibles":
      return <PaletteIcon fontSize="large" />;
    case "Commodities":
      return <LocalGroceryStoreIcon fontSize="large" />;
    case "Carbon Credits":
      return <NatureIcon fontSize="large" />;
    case "Private Equity":
      return <TrendingUpIcon fontSize="large" />;
    default:
      return <MoreHorizIcon fontSize="large" />;
  }
};

const getStepIcon = (label) => {
  switch (label) {
    case "Asset Registration":
      return <DescriptionIcon />;
    case "Legal Structure":
      return <GavelIcon />;
    case "Smart Contract":
      return <AccountTreeIcon />;
    case "Token Distribution":
      return <SwapHorizIcon />;
    case "Market":
      return <StorefrontIcon />;
    case "Management":
      return <SettingsIcon />;
    default:
      return null;
  }
};

const getFeatureIcon = (feature) => {
  const iconMap = {
    // Asset Registration
    "Ownership verification": <VerifiedUserIcon />,
    "Asset appraisal": <AssessmentIcon />,
    "Documentation upload": <DescriptionIcon />,
    "KYC/AML compliance": <SecurityIcon />,
    "Jurisdictional framework selection": <GavelIcon />,

    // Legal Structure
    "Automated legal templates": <ReceiptLongIcon />,
    "Compliance checks": <RuleIcon />,
    "Regulatory reporting setup": <AnalyticsIcon />,
    "Investor qualification": <HowToRegIcon />,
    "Disclaimer and disclosure generation": <DescriptionIcon />,

    // Smart Contract
    "Token standard selection": <IntegrationInstructionsIcon />,
    "Configurable token parameters": <SettingsSuggestIcon />,
    "Multi-chain deployment options": <AccountTreeIcon />,
    "Automated contract verification": <FactCheckIcon />,
    "On-chain governance setup": <SupervisorAccountIcon />,

    // Token Distribution
    "Customizable offering structures": <PieChartIcon />,
    "Investor onboarding portal": <SupportAgentIcon />,
    "Payment processing": <AccountBalanceWalletIcon />,
    "Vesting schedules": <TimelineIcon />,
    "Distribution automation": <CompareArrowsIcon />,

    // Market
    "Built-in exchange mechanism": <CompareArrowsIcon />,
    "External exchange integration": <MonetizationOnIcon />,
    "Liquidity pool setup": <StorageIcon />,
    "OTC trading capabilities": <HandshakeIcon />,
    "Market data analytics": <BarChartIcon />,

    // Management
    "Dividend/distribution automation": <MonetizationOnIcon />,
    "Governance proposal system": <ManageAccountsIcon />,
    "Reporting dashboard": <MonitorIcon />,
    "Investor communications": <ForumIcon />,
    "Compliance monitoring": <SecurityUpdateIcon />,
  };

  return iconMap[feature] || <CheckIcon />;
};

export default function TokenizationHub() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) =>
      Math.min(prevStep + 1, tokenizationSteps.length - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <Box
      className="min-h-screen bg-background"
      sx={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(18,19,26,1) 100%)",
        pt: 16,
        pb: 8,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background:
            "radial-gradient(circle at 50% 0%, rgba(0,255,133,0.15) 0%, rgba(0,0,0,0) 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 mt-8 relative"
        >
          <Box
            sx={{
              position: "absolute",
              top: -60,
              left: "50%",
              transform: "translateX(-50%)",
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "rgba(0, 255, 133, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                top: -10,
                left: -10,
                right: -10,
                bottom: -10,
                borderRadius: "50%",
                border: "2px solid rgba(0, 255, 133, 0.1)",
                animation: "pulse 2s infinite",
              },
            }}
          >
            <SecurityIcon sx={{ fontSize: 40, color: "#00ff85" }} />
          </Box>
          <Typography
            variant="h1"
            className="text-4xl md:text-6xl font-bold mb-6"
            sx={{
              color: "#00ff85",
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 20px rgba(0, 255, 133, 0.5)",
            }}
          >
            Complete Asset
            <br />
            Tokenization Hub
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary max-w-3xl mx-auto text-lg"
            sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            Transform any real-world asset into digital tokens with CopyM's
            comprehensive tokenization platform.
          </Typography>
        </motion.div>

        {/* Asset Categories Section */}
        <Box className="mb-32">
          <Typography
            variant="h2"
            className="text-3xl md:text-5xl text-center mb-4"
            sx={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Tokenize Any <span className="text-primary">Asset Class</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary text-center max-w-2xl mx-auto mb-16 text-lg"
          >
            Our unified platform supports the complete tokenization lifecycle
            for all major asset classes
          </Typography>

          <Grid container spacing={4}>
            {assetCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={category.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Card
                    className="h-full relative overflow-hidden"
                    sx={{
                      backgroundColor: alpha("#12131A", 0.7),
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      p: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "rgba(0, 255, 133, 0.3)",
                        boxShadow: "0 0 30px rgba(0, 255, 133, 0.1)",
                        "& .category-icon": {
                          color: "#00ff85",
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    <Box
                      className="category-icon"
                      sx={{
                        color: "rgba(255, 255, 255, 0.5)",
                        mb: 2,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {getCategoryIcon(category.title)}
                    </Box>
                    <Typography
                      variant="h6"
                      className="mb-2"
                      sx={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-text-secondary mb-4"
                    >
                      {category.description}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="text-primary mb-4"
                      sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        textShadow: "0 0 10px rgba(0, 255, 133, 0.5)",
                      }}
                    >
                      ${category.marketSize}
                    </Typography>
                    <Box className="mb-4">
                      <Typography variant="subtitle2" className="mb-2">
                        Key Benefits:
                      </Typography>
                      <List dense>
                        {category.keyBenefits.map((benefit, i) => (
                          <ListItem key={i} className="px-0">
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckIcon
                                className="text-primary"
                                fontSize="small"
                                sx={{
                                  filter:
                                    "drop-shadow(0 0 5px rgba(0, 255, 133, 0.5))",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={benefit}
                              className="text-text-secondary"
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box className="flex gap-2">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          color: "text.secondary",
                          "&:hover": {
                            borderColor: "#00ff85",
                            color: "#00ff85",
                            backgroundColor: "rgba(0, 255, 133, 0.1)",
                          },
                        }}
                      >
                        View Example Assets
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          color: "text.secondary",
                          "&:hover": {
                            borderColor: "#00ff85",
                            color: "#00ff85",
                            backgroundColor: "rgba(0, 255, 133, 0.1)",
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tokenization Journey Section */}
        <Box className="mb-32 relative">
          <Box
            sx={{
              position: "absolute",
              top: -100,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "200%",
              background:
                "radial-gradient(circle at 50% 0%, rgba(0,255,133,0.1) 0%, rgba(0,0,0,0) 50%)",
              pointerEvents: "none",
            }}
          />
          <Typography
            variant="h2"
            className="text-3xl md:text-5xl text-center mb-4"
            sx={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Complete Tokenization <span className="text-primary">Journey</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary text-center max-w-2xl mx-auto mb-16 text-lg"
          >
            CopyM guides you through every step of the tokenization process with
            our comprehensive platform
          </Typography>

          <Box className="mb-8">
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                width: "100%",
                "@media (max-width: 600px)": {
                  width: "100%",
                  overflowX: "auto",
                  padding: "0 8px",
                  "& .MuiStep-root": {
                    minWidth: "80px", // Minimum width for each step on mobile
                  },
                },
                "& .MuiStepLabel-label": {
                  color: "text.secondary",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.9rem",
                  marginTop: "8px",
                  "&.Mui-active": {
                    color: "#00ff85",
                    textShadow: "0 0 10px rgba(0, 255, 133, 0.5)",
                  },
                  "@media (max-width: 600px)": {
                    fontSize: "0.7rem",
                  },
                },
                "& .MuiStepConnector-line": {
                  borderColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {tokenizationSteps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <IconButton
                        onClick={() => handleStepClick(index)}
                        sx={{
                          width: 48,
                          height: 48,
                          "@media (max-width: 600px)": {
                            width: 36,
                            height: 36,
                          },
                          borderRadius: "12px",
                          backgroundColor:
                            activeStep >= index
                              ? "rgba(0, 255, 133, 0.1)"
                              : "rgba(255, 255, 255, 0.1)",
                          color:
                            activeStep >= index
                              ? "#00ff85"
                              : "rgba(255, 255, 255, 0.5)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(0, 255, 133, 0.2)",
                            transform: "translateY(-2px)",
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            borderRadius: "14px",
                            border: "1px solid",
                            borderColor:
                              activeStep >= index
                                ? "rgba(0, 255, 133, 0.3)"
                                : "transparent",
                            transition: "all 0.3s ease",
                          },
                        }}
                      >
                        {getStepIcon(step.label)}
                      </IconButton>
                    )}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={activeStep}
          >
            <Card
              sx={{
                backgroundColor: alpha("#12131A", 0.7),
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                p: 4,
                position: "relative",
                overflow: "hidden",
                maxWidth: "900px",
                mx: "auto",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  // background: 'linear-gradient(90deg, rgba(0,255,133,0) 0%, rgba(0,255,133,1) 50%, rgba(0,255,133,0) 100%)',
                },
              }}
            >
              <Box className="flex items-start gap-6">
                <Box className="flex-1">
                  <Box className="flex items-center gap-3 mb-6">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        backgroundColor: "rgba(0, 255, 133, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#00ff85",
                        filter: "drop-shadow(0 0 10px rgba(0, 255, 133, 0.3))",
                      }}
                    >
                      {getStepIcon(tokenizationSteps[activeStep].label)}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Orbitron', sans-serif",
                          color: "#00ff85",
                          textShadow: "0 0 10px rgba(0, 255, 133, 0.5)",
                          mb: 0.5,
                        }}
                      >
                        {tokenizationSteps[activeStep].label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        {tokenizationSteps[activeStep].description}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: 2,
                    }}
                  >
                    {tokenizationSteps[activeStep].features.map(
                      (feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              p: 2,
                              borderRadius: 1,
                              backgroundColor: alpha("#12131A", 0.3),
                              border: "1px solid rgba(255, 255, 255, 0.05)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: alpha("#12131A", 0.5),
                                borderColor: "rgba(0, 255, 133, 0.2)",
                                transform: "translateX(8px)",
                                "& .feature-icon": {
                                  color: "#00ff85",
                                  transform: "scale(1.1)",
                                },
                              },
                            }}
                          >
                            <Box
                              className="feature-icon"
                              sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                transition: "all 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {getFeatureIcon(feature)}
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "rgba(255, 255, 255, 0.9)",
                                fontWeight: 500,
                              }}
                            >
                              {feature}
                            </Typography>
                          </Box>
                        </motion.div>
                      )
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color:
                        activeStep === 0
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 255, 133, 0.1)",
                        color: "#00ff85",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    disabled={activeStep === tokenizationSteps.length - 1}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color:
                        activeStep === tokenizationSteps.length - 1
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 255, 133, 0.1)",
                        color: "#00ff85",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                      },
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Box>

        {/* Why Choose CopyM Section */}
        <Box className="mb-32">
          <Typography
            variant="h2"
            className="text-3xl md:text-5xl text-center mb-4"
            sx={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Why Choose <span className="text-primary">CopyM</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary text-center max-w-2xl mx-auto mb-16 text-lg"
          >
            The most comprehensive asset tokenization platform in the market
          </Typography>

          <Card
            sx={{
              backgroundColor: alpha("#12131A", 0.7),
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              p: 4,
              maxWidth: "md",
              mx: "auto",
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: "30%",
                height: "100%",
                background:
                  "linear-gradient(45deg, rgba(0,255,133,0) 0%, rgba(0,255,133,0.1) 100%)",
                pointerEvents: "none",
              },
            }}
          >
            <Box className="flex items-center gap-4 mb-4">
              <SpeedIcon sx={{ fontSize: 40, color: "#00ff85" }} />
              <Typography
                variant="h6"
                sx={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Complete All-in-One Solution
              </Typography>
            </Box>
            <Typography variant="body1" className="text-text-secondary">
              CopyM provides end-to-end tokenization infrastructure in one
              platform, eliminating the need to piece together multiple
              services.
            </Typography>
          </Card>
        </Box>

        {/* Comparison Table Section */}
        <Box className="mb-32">
          <Typography
            variant="h2"
            className="text-3xl md:text-5xl text-center mb-4"
            sx={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            How CopyM <span className="text-primary">Compares</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary text-center max-w-2xl mx-auto mb-16 text-lg"
          >
            See why leading organizations choose CopyM for their tokenization
            needs
          </Typography>

          <Card
            sx={{
              backgroundColor: alpha("#12131A", 0.7),
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              maxWidth: "lg",
              mx: "auto",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle at top right, rgba(0,255,133,0.1) 0%, rgba(0,0,0,0) 70%)",
                pointerEvents: "none",
              },
            }}
          >
            <Box className="p-4">
              <Grid container className="border-b border-gray-700 pb-2 mb-4">
                <Grid item xs={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Features
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="subtitle2"
                    className="text-primary"
                    sx={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    CopyM
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Competitor A
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Competitor B
                  </Typography>
                </Grid>
              </Grid>
              {comparisonData.map((row) => (
                <Grid container key={row.feature} className="py-2">
                  <Grid item xs={3}>
                    <Typography variant="body2">{row.feature}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className="flex items-center gap-2">
                      <CheckCircleOutlineIcon
                        className="text-primary"
                        sx={{
                          filter: "drop-shadow(0 0 5px rgba(0, 255, 133, 0.5))",
                        }}
                      />
                      <Typography variant="body2">{row.copym.value}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className="flex items-center gap-2">
                      <WarningAmberIcon color="warning" />
                      <Typography variant="body2">
                        {row.competitorA.value}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className="flex items-center gap-2">
                      <CancelIcon color="error" />
                      <Typography variant="body2">
                        {row.competitorB.value}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Card>
        </Box>

        {/* CTA Section */}
        <Box className="text-center relative">
          <Box
            sx={{
              position: "absolute",
              top: -100,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "200%",
              background:
                "radial-gradient(circle at 50% 0%, rgba(0,255,133,0.1) 0%, rgba(0,0,0,0) 50%)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "rgba(0, 255, 133, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                mb: 4,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -10,
                  left: -10,
                  right: -10,
                  bottom: -10,
                  borderRadius: "50%",
                  border: "2px solid rgba(0, 255, 133, 0.1)",
                  animation: "pulse 2s infinite",
                },
              }}
            >
              <GroupsIcon sx={{ fontSize: 40, color: "#00ff85" }} />
            </Box>
            <Typography
              variant="h2"
              className="text-3xl md:text-5xl mb-4"
              sx={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Ready to{" "}
              <span className="text-primary">Tokenize Your Assets?</span>
            </Typography>
            <Typography
              variant="body1"
              className="text-text-secondary max-w-2xl mx-auto mb-8 text-lg"
            >
              Join thousands of businesses and investors already transforming
              their assets on the CopyM platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#00ff85",
                color: "background.default",
                padding: "12px 32px",
                fontSize: "1.1rem",
                fontFamily: "'Orbitron', sans-serif",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: "#00cc6a",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  transform: "translateX(-100%)",
                  transition: "transform 0.6s",
                },
                "&:hover::before": {
                  transform: "translateX(100%)",
                },
              }}
            >
              Contact Our Team
            </Button>
          </motion.div>
        </Box>

        {/* Background Elements */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: -1,
            opacity: 0.5,
            background: `
              radial-gradient(circle at 20% 20%, rgba(0,255,133,0.05) 0%, rgba(0,0,0,0) 20%),
              radial-gradient(circle at 80% 80%, rgba(0,255,133,0.05) 0%, rgba(0,0,0,0) 20%),
              radial-gradient(circle at 50% 50%, rgba(0,255,133,0.05) 0%, rgba(0,0,0,0) 30%)
            `,
          }}
        />
      </Container>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}
