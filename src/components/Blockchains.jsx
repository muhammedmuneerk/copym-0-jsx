import { Container, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";

const blockchains = [
  {
    name: "Solana",
    description: "Full support for Solana ecosystem",
    logo: "🌟", // Replace with actual logo
  },
  {
    name: "Polygon",
    description: "Full support for Polygon ecosystem",
    logo: "🔷", // Replace with actual logo
  },
  {
    name: "Binance",
    description: "Full support for Binance ecosystem",
    logo: "🟡", // Replace with actual logo
  },
  {
    name: "Cardano",
    description: "Full support for Cardano ecosystem",
    logo: "🔵", // Replace with actual logo
  },
  {
    name: "Optimism",
    description: "Full support for Optimism ecosystem",
    logo: "🔴", // Replace with actual logo
  },
];

export default function Blockchains() {
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
          <Typography variant="h2" className="text-4xl md:text-5xl mb-4">
            Unified Access to{" "}
            <span className="text-primary">All Major Blockchains</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary max-w-2xl mx-auto"
          >
            Tokenize assets on your preferred blockchain. Copym provides
            seamless integration with all major networks through a single,
            unified platform.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {blockchains.map((blockchain, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={blockchain.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background-paper rounded-lg p-6 text-center h-full flex flex-col items-center justify-center"
                style={{
                  background: "rgba(18, 19, 26, 0.5)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Box
                  className="w-16 h-16 mb-4 rounded-full flex items-center justify-center text-3xl"
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {blockchain.logo}
                </Box>
                <Typography variant="h6" className="mb-2">
                  {blockchain.name}
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  {blockchain.description}
                </Typography>
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
