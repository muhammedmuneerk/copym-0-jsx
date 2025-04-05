import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';

const PrivateEquityTokenization = () => {
  return (
    <Box sx={{ 
      background: '#000', 
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      marginTop:'80px'
    }}>
      {/* Gradient divider line at the top */}
      <Box sx={{ 
        height: '2px', 
        background: 'linear-gradient(90deg, #0CC7B4 0%, #2B6DEF 100%)',
        width: '100%'
      }} />
      
      {/* Hero Section */}
      <Box sx={{ pt: 6, pb: 12, pl: 12 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* 3D Stack Icon */}
          <Box sx={{ 
            backgroundColor: '#0e192d', 
            borderRadius: '12px',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80px',
            height: '80px'
          }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 30L24 38L38 30L24 22L10 30Z" fill="url(#paint0_linear)" fillOpacity="0.6"/>
              <path d="M10 24L24 32L38 24L24 16L10 24Z" fill="url(#paint1_linear)" fillOpacity="0.8"/>
              <path d="M10 18L24 26L38 18L24 10L10 18Z" fill="url(#paint2_linear)"/>
              <defs>
                <linearGradient id="paint0_linear" x1="10" y1="30" x2="38" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8A2BE2"/>
                  <stop offset="1" stopColor="#FF00FF"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="10" y1="24" x2="38" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8A2BE2"/>
                  <stop offset="1" stopColor="#FF00FF"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="10" y1="18" x2="38" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8A2BE2"/>
                  <stop offset="1" stopColor="#FF00FF"/>
                </linearGradient>
              </defs>
            </svg>
          </Box>
          
          <Box>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '3rem',
                fontFamily: '"Chakra Petch", sans-serif',
                letterSpacing: '0.02em',
                mb: 0.5,
                lineHeight: 1.2
              }}
            >
              Private Equity Tokenization
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#e0e0ff',
                fontWeight: 400,
                opacity: 0.9
              }}
            >
              Unlock New Investment Horizons
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ px: 8, mb: 8 }}>
        {/* Title */}
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '2.5rem',
            fontFamily: '"Chakra Petch", sans-serif',
            background: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6,
            ml: 4
          }}
        >
          Revolutionize Private Equity Investment
        </Typography>

        {/* Features Grid - Completely restructured to match image */}
        <Box sx={{ display: 'flex', px: 4, gap: 4 }}>
          {/* Left side: Two columns of feature cards */}
          <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Top row with two cards side by side */}
            <Box sx={{ display: 'flex', gap: 4, height: '240px' }}>
              {/* Increased Liquidity Card */}
              <Box sx={{ 
                backgroundColor: '#0e192d', 
                borderRadius: '16px',
                p: 4,
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <TrendingUpIcon sx={{ 
                  fontSize: 48, 
                  color: '#a855f7',
                  mb: 2 
                }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600,
                    fontFamily: '"Chakra Petch", sans-serif',
                    fontSize: '1.5rem',
                    mb: 2
                  }}
                >
                  Increased Liquidity
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.5 }}>
                  Transform illiquid private equity investments into tradable assets
                </Typography>
              </Box>

              {/* Regulatory Compliance Card */}
              <Box sx={{ 
                backgroundColor: '#0e192d', 
                borderRadius: '16px',
                p: 4,
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <LockIcon sx={{ 
                  fontSize: 48, 
                  color: '#a855f7',
                  mb: 2 
                }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600,
                    fontFamily: '"Chakra Petch", sans-serif',
                    fontSize: '1.5rem',
                    mb: 2
                  }}
                >
                  Regulatory Compliance
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.5 }}>
                  Comprehensive legal frameworks for secure tokenization
                </Typography>
              </Box>
            </Box>

            {/* Bottom row with Global Accessibility card */}
            <Box sx={{ 
              backgroundColor: '#0e192d', 
              borderRadius: '16px',
              p: 4,
              height: '240px',
              width: '360px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <PublicIcon sx={{ 
                fontSize: 48, 
                color: '#a855f7',
                mb: 2 
              }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600,
                  fontFamily: '"Chakra Petch", sans-serif',
                  fontSize: '1.5rem',
                  mb: 2
                }}
              >
                Global Accessibility
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.5 }}>
                Democratize access to premium investment opportunities
              </Typography>
            </Box>
          </Box>

          {/* Right Side: Tokenizable Types Panel */}
          <Box sx={{ 
            flex: '1',
            background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.4) 0%, rgba(255, 0, 255, 0.2) 100%)',
            borderRadius: '16px',
            p: 4,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                fontFamily: '"Chakra Petch", sans-serif',
                mb: 4,
                color: '#e0e0ff'
              }}
            >
              Tokenizable Private Equity Types
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3, 
              mt: 2,
              flex: 1,
              justifyContent: 'space-around'
            }}>
              {/* Type Pills - Arranged exactly as in the image */}
              <Box sx={{ display: 'flex' }}>
                <Box 
                  sx={{
                    background: 'linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)',
                    borderRadius: '50px',
                    py: 1.5,
                    px: 3,
                    display: 'inline-block',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Venture Capital Funds
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box 
                  sx={{
                    background: 'linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)',
                    borderRadius: '50px',
                    py: 1.5,
                    px: 3,
                    display: 'inline-block',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Private Business Equity
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <Box 
                  sx={{
                    background: 'linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)',
                    borderRadius: '50px',
                    py: 1.5,
                    px: 3,
                    display: 'inline-block',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Private Debt
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box 
                  sx={{
                    background: 'linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)',
                    borderRadius: '50px',
                    py: 1.5,
                    px: 3,
                    display: 'inline-block',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Revenue Sharing Agreements
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <Box 
                  sx={{
                    background: 'linear-gradient(90deg, #8A2BE2 0%, #FF00FF 100%)',
                    borderRadius: '50px',
                    py: 1.5,
                    px: 3,
                    display: 'inline-block',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap'
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