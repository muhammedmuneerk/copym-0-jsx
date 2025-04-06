import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function Hero() {
  return (
    <Box className="min-h-screen relative">
      <Container maxWidth="xl">
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              The Complete Ecosystem for{" "}
              <Box component="span" className="block">
                <Box component="span" className="text-primary">
                  Real World Asset
                </Box>{" "}
                Tokenization
              </Box>
            </Typography>

            <Typography
              variant="body1"
              className="text-text-secondary mb-12 max-w-3xl mx-auto text-lg"
            >
              One unified platform for tokenizing, managing, and trading any
              real-world asset class. Access all the tools, networks, and
              liquidity you need in a single ecosystem.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="contained"
                size="large"
                className="text-background font-semibold px-8 py-3"
              >
                Explore Asset Tokenization
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="font-semibold px-8 py-3"
              >
                Start Tokenizing Now
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Typography
            variant="button"
            className="text-text-secondary flex flex-col items-center cursor-pointer"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          >
            Discover More
            <KeyboardArrowDown className="mt-2" />
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
