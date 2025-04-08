import { Container, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import SectionImage from "./SectionImages";

const regions = [
  {
    name: "Middle East",
    tokenizedValue: "$2.3B",
    growth: "+67%",
    topAssets: ["Real Estate", "Energy", "Infrastructure"],
  },
  {
    name: "Europe",
    tokenizedValue: "$1.8B",
    growth: "+45%",
    topAssets: ["Real Estate", "Private Equity", "Art"],
  },
  {
    name: "Asia Pacific",
    tokenizedValue: "$3.1B",
    growth: "+82%",
    topAssets: ["Real Estate", "Infrastructure", "Commodities"],
  },
  {
    name: "Americas",
    tokenizedValue: "$4.2B",
    growth: "+58%",
    topAssets: ["Real Estate", "Private Equity", "Venture Capital"],
  },
];

export default function GlobalMarkets() {
  return (
    <Box className="py-24 relative overflow-hidden">
       <SectionImage
                src="/assets/sections/businessman.png"
                alt="Blockchains Banner"
              />
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography
            variant="overline"
            className="text-primary font-medium tracking-wider block mb-2"
          >
            GLOBAL REACH
          </Typography>
          <Typography variant="h2" className="text-4xl md:text-5xl mb-4">
            Connecting <span className="text-primary">Global Markets</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary max-w-2xl mx-auto"
          >
            Tokenize assets from anywhere in the world and access a global
            network of investors and liquidity providers.
          </Typography>
        </motion.div>

        <Box className="relative mb-16">
          
          {/* World Map Visualization ---> (comment line) */}
          {/* <Box
            className="w-full aspect-[2/1] rounded-xl overflow-hidden"
            sx={{
              background: "rgba(18, 19, 26, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          > */}
          
            {/* Replace with actual interactive map component ---> (comment line) */} 
            {/* <Box
              className="absolute inset-0"
              sx={{
                background:
                  "radial-gradient(circle at center, rgba(0, 255, 133, 0.2) 0%, rgba(10, 11, 13, 0) 70%)",
              }}
            />
          </Box> */}

          {/* Connection Lines */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Add animated connection lines here */}
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {regions.map((region, index) => (
            <Grid item xs={12} sm={6} md={3} key={region.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Box
                  className="bg-background-paper rounded-lg p-6 h-full"
                  sx={{
                    background: "rgba(18, 19, 26, 0.5)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Typography variant="h6" className="mb-4">
                    {region.name}
                  </Typography>
                  <Box className="mb-4">
                    <Typography
                      variant="overline"
                      className="text-text-secondary block"
                    >
                      Tokenized Value:
                    </Typography>
                    <Typography variant="h5" className="text-primary">
                      {region.tokenizedValue}
                    </Typography>
                  </Box>
                  <Box className="mb-4">
                    <Typography
                      variant="overline"
                      className="text-text-secondary block"
                    >
                      YoY Growth:
                    </Typography>
                    <Typography variant="h5" className="text-primary">
                      {region.growth}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="overline"
                      className="text-text-secondary block mb-2"
                    >
                      Top Asset Classes:
                    </Typography>
                    {region.topAssets.map((asset, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        className="text-text-secondary"
                      >
                        {asset}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Background Glow Effect */}
        <Box
          className="absolute inset-0 pointer-events-none"
          sx={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 255, 133, 0.1) 0%, rgba(10, 11, 13, 0) 50%)",
          }}
        />
      </Container>
    </Box>
  );
}
