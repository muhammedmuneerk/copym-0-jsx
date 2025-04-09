import React from "react";
import { Box, Typography, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";

const PrivateEquityTokenization = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: { xs: "60px", sm: "70px", md: "80px" },
      }}
    >
      
     

      {/* Hero Section */}
      <Box sx={{ 
        pt: { xs: 3, sm: 4, md: 6 }, 
        pb: { xs: 6, sm: 8, md: 12 }, 
        pl: { xs: 3, sm: 6, md: 12 },
        pr: { xs: 3, sm: 6, md: 12 },
      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: { xs: "flex-start", sm: "center" }, 
          gap: { xs: 2, sm: 3 },
          flexDirection: { xs: "column", sm: "row" }
        }}>
          {/* 3D Stack Icon */}
          <Box
            sx={{
              backgroundColor: "#0e192d",
              borderRadius: "12px",
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "60px", sm: "70px", md: "80px" },
              height: { xs: "60px", sm: "70px", md: "80px" },
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 30L24 38L38 30L24 22L10 30Z"
                fill="url(#paint0_linear)"
                fillOpacity="0.6"
              />
              <path
                d="M10 24L24 32L38 24L24 16L10 24Z"
                fill="url(#paint1_linear)"
                fillOpacity="0.8"
              />
              <path
                d="M10 18L24 26L38 18L24 10L10 18Z"
                fill="url(#paint2_linear)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="10"
                  y1="30"
                  x2="38"
                  y2="30"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8A2BE2" />
                  <stop offset="1" stopColor="#FF00FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="10"
                  y1="24"
                  x2="38"
                  y2="24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8A2BE2" />
                  <stop offset="1" stopColor="#FF00FF" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear"
                  x1="10"
                  y1="18"
                  x2="38"
                  y2="18"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8A2BE2" />
                  <stop offset="1" stopColor="#FF00FF" />
                </linearGradient>
              </defs>
            </svg>
          </Box>

          <Box>
            <Typography
              variant="h1"
              className="font-orbitron"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
                fontFamily: '"Chakra Petch", sans-serif',
                letterSpacing: "0.02em",
                mb: 0.5,
                lineHeight: 1.2,
                
              }}
            >
              Private Equity Tokenization
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#e0e0ff",
                fontWeight: 400,
                opacity: 0.9,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              }}
            >
              Unlock New Investment Horizons
            </Typography>
          </Box>
        </Box>
      </Box>

        {/* Gradient divider line at the top */}
      <Box
        sx={{
          height: "2px",
          background: "linear-gradient(90deg, #0CC7B4 0%, #2B6DEF 100%)",
          width: "100%",
        }}
      />

      {/* Main Content */}
      <Box sx={{ 
        px: { xs: 2, sm: 4, md: 8 }, 
        mb: { xs: 4, sm: 6, md: 8 }
      }}>
        {/* Title */}
        <Typography
          variant="h2"
          className="font-orbitron"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            fontFamily: '"Chakra Petch", sans-serif',
            background: "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: { xs: 3, sm: 4, md: 6 },
            ml: { xs: 2, sm: 3, md: 4 },
            pt: { xs: 10, sm: 10, md: 10 },
          }}
        >
          Revolutionize Private Equity Investment
        </Typography>

        {/* Features Grid - Completely restructured to match image */}
        <Box sx={{ 
          display: "flex", 
          px: { xs: 1, sm: 2, md: 4 }, 
          gap: { xs: 2, sm: 3, md: 4 },
          flexDirection: { xs: "column", md: "row" }
        }}>
          {/* Left side: Two columns of feature cards */}
          <Box
            sx={{ 
              flex: "2", 
              display: "flex", 
              flexDirection: "column", 
              gap: { xs: 2, sm: 3, md: 4 }
            }}
          >
            {/* Top row with two cards side by side */}
            <Box sx={{ 
              display: "flex", 
              gap: { xs: 2, sm: 3, md: 4 }, 
              height: { xs: "auto", md: "240px" },
              flexDirection: { xs: "column", sm: "row" }
            }}>
              {/* Increased Liquidity Card */}
              <Box
                sx={{
                  backgroundColor: "#0e192d",
                  borderRadius: "16px",
                  p: { xs: 3, md: 4 },
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TrendingUpIcon
                  sx={{
                    fontSize: { xs: 36, md: 48 },
                    color: "#a855f7",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    fontFamily: '"Chakra Petch", sans-serif',
                    fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
                    mb: 2,
                  }}
                >
                  Increased Liquidity
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.8, lineHeight: 1.5 }}
                >
                  Transform illiquid private equity investments into tradable
                  assets
                </Typography>
              </Box>

              {/* Regulatory Compliance Card */}
              <Box
                sx={{
                  backgroundColor: "#0e192d",
                  borderRadius: "16px",
                  p: { xs: 3, md: 4 },
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <LockIcon
                  sx={{
                    fontSize: { xs: 36, md: 48 },
                    color: "#a855f7",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    fontFamily: '"Chakra Petch", sans-serif',
                    fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
                    mb: 2,
                  }}
                >
                  Regulatory Compliance
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.8, lineHeight: 1.5 }}
                >
                  Comprehensive legal frameworks for secure tokenization
                </Typography>
              </Box>
            </Box>

            {/* Bottom row with Global Accessibility card */}
            <Box
              sx={{
                backgroundColor: "#0e192d",
                borderRadius: "16px",
                p: { xs: 3, md: 4 },
                height: { xs: "auto", md: "240px" },
                width: { xs: "100%", md: "360px" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PublicIcon
                sx={{
                  fontSize: { xs: 36, md: 48 },
                  color: "#a855f7",
                  mb: 2,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  fontFamily: '"Chakra Petch", sans-serif',
                  fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
                  mb: 2,
                }}
              >
                Global Accessibility
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.8, lineHeight: 1.5 }}
              >
                Democratize access to premium investment opportunities
              </Typography>
            </Box>
          </Box>

          {/* Right Side: Tokenizable Types Panel */}
          <Box
            sx={{
              flex: { xs: "none", md: "1" },
              background:
                "linear-gradient(135deg, rgba(138, 43, 226, 0.4) 0%, rgba(255, 0, 255, 0.2) 100%)",
              borderRadius: "16px",
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontFamily: '"Chakra Petch", sans-serif',
                mb: { xs: 3, md: 4 },
                color: "#e0e0ff",
                fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.75rem" },
              }}
            >
              Tokenizable Private Equity Types
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 2.5, md: 3 },
                mt: 2,
                flex: 1,
                justifyContent: "space-around",
              }}
            >
              {/* Type Pills - Arranged exactly as in the image */}
              <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <Box
                  sx={{
                    background:
                      "linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)",
                    borderRadius: "50px",
                    py: { xs: 1, md: 1.5 },
                    px: { xs: 2, md: 3 },
                    display: "inline-block",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    maxWidth: { xs: "100%", sm: "auto" },
                  }}
                >
                  Venture Capital Funds
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" } }}>
                <Box
                  sx={{
                    background:
                      "linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)",
                    borderRadius: "50px",
                    py: { xs: 1, md: 1.5 },
                    px: { xs: 2, md: 3 },
                    display: "inline-block",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    maxWidth: { xs: "100%", sm: "auto" },
                  }}
                >
                  Private Business Equity
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <Box
                  sx={{
                    background:
                      "linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)",
                    borderRadius: "50px",
                    py: { xs: 1, md: 1.5 },
                    px: { xs: 2, md: 3 },
                    display: "inline-block",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    maxWidth: { xs: "100%", sm: "auto" },
                  }}
                >
                  Private Debt
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" } }}>
                <Box
                  sx={{
                    background:
                      "linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)",
                    borderRadius: "50px",
                    py: { xs: 1, md: 1.5 },
                    px: { xs: 2, md: 3 },
                    display: "inline-block",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    maxWidth: { xs: "100%", sm: "auto" },
                  }}
                >
                  Revenue Sharing Agreements
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <Box
                  sx={{
                    background:
                      "linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)",
                    borderRadius: "50px",
                    py: { xs: 1, md: 1.5 },
                    px: { xs: 2, md: 3 },
                    display: "inline-block",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    maxWidth: { xs: "100%", sm: "auto" },
                  }}
                >
                  Growth Equity Investments
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivateEquityTokenization;