import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";

const features = [
  {
    title: "Cross-Chain Infrastructure",
    description:
      "Seamlessly bridge assets across all major blockchains through our unified interface.",
    icon: "🔄", // Replace with actual icon
  },
  {
    title: "Comprehensive Compliance",
    description:
      "Built-in KYC/AML, regulatory frameworks, and automated compliance across jurisdictions.",
    icon: "✓", // Replace with actual icon
  },
  {
    title: "Fractional Ownership",
    description:
      "Divide assets into tradable fractions, democratizing access to previously exclusive investments.",
    icon: "📊", // Replace with actual icon
  },
  {
    title: "Complete Wallet Ecosystem",
    description:
      "Support for custodial, non-custodial, MPC, and hardware wallet solutions.",
    icon: "👛", // Replace with actual icon
  },
  {
    title: "End-to-End Marketplace",
    description:
      "Primary issuance, secondary trading, liquidity pools, and OTC services all in one place.",
    icon: "🏛️", // Replace with actual icon
  },
  {
    title: "Developer Toolkit",
    description:
      "APIs, SDKs, and no-code solutions to build on top of the Copym ecosystem.",
    icon: "⚙️", // Replace with actual icon
  },
];

export default function Features() {
  return (
    <Box className="py-24 relative overflow-hidden">
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
            ALL-IN-ONE PLATFORM
          </Typography>
          <Typography variant="h2" className="text-4xl md:text-5xl mb-4">
            Everything You Need In{" "}
            <span className="text-primary">One Place</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary max-w-2xl mx-auto"
          >
            No more juggling multiple services or platforms. Copym provides
            end-to-end solutions for the entire tokenization lifecycle.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
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
                    transition: "transform 0.2s, border-color 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Box
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
                    sx={{
                      background: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" className="mb-3">
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-text-secondary mb-4"
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    endIcon={<ArrowForward />}
                    className="text-primary hover:bg-primary/5 px-0"
                  >
                    Learn more
                  </Button>
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
