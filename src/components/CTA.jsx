import { Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Box } from "@mui/system";
import BorderImages from "./BorderImages";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import GradientLetters from "./GradientLetters";

export default function CTA() {
  return (
    <Container maxWidth="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center pt-14 mt-24 mb-10 relative z-10"
      >
        <Typography
          variant="h2"
          className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
        >
          <Box
            component="div"
            className="flex flex-col items-center justify-center leading-snug max-w-xs sm:max-w-xl lg:max-w-4xl mx-auto"
          >
             {/* Large screens: 2 lines */}
             <Box className="hidden lg:block">
              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters
                  text="Ready to Transform"
                  keyPrefix="lg-line1"
                />
              </Box>

              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters text="Your Assets?" keyPrefix="lg-line2" />
              </Box>
            </Box>

            {/* Small and Medium screens: 3 lines */}
            <Box className="block lg:hidden">
              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters text="Ready to Transform" keyPrefix="sm-line1" />
              </Box>

              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters text=" Your Assets?" keyPrefix="sm-line2" />
              </Box>

            </Box>
          </Box>
        </Typography>

        <Typography
          variant="body1"
          className="text-text-secondary mb-8 max-w-2xl mx-auto"
        >
          Join thousands of individuals and organizations already unlocking the
          value of their assets on the Copym platform.
        </Typography>
        <div className="inline-block rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(32,94,59,0.73),rgba(0,255,132,0.6))]">
          <div className="rounded-full w-full h-full bg-black">
            <Button
              variant="text"
              size="large"
              className="rounded-full px-8 py-3 font-semibold text-white w-full h-full bg-white/5 backdrop-blur-md hover:shadow-[0_0_20px_rgba(0,255,133,0.5)]"
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Explore Asset Tokenization
            </Button>
          </div>
        </div>
        <BorderImages
          src="/assets/sections/grid-bg-bottom.png"
          alt="Blockchains Banner"
        />
      </motion.div>

      {/* Enhanced background gradient highlight with Glow Effect */}
      {/* <BackgroundGlowEffect/> */}
    </Container>
  );
}
