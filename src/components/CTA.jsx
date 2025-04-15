import { Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Box } from "@mui/system";

export default function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-24 relative z-10"
    >
   <Typography
  variant="h2"
  className="font-orbitron text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
>
  <Box
    component="div"
    className="flex flex-col items-center justify-center leading-snug max-w-xs sm:max-w-xl lg:max-w-4xl mx-auto"
  >
    {/* Small and Medium screens: 3 lines */}
    <Box className="block lg:hidden">
      <Box component="div" className="flex flex-wrap justify-center">
        {Array.from("Ready to").map((char, idx) => (
          <span key={`sm-line1-${idx}`} className="gradient-letter">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Box>

      <Box component="div" className="flex flex-wrap justify-center">
        {Array.from("Transform Your").map((char, idx) => (
          <span key={`sm-line2-${idx}`} className="gradient-letter">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Box>

      <Box component="div" className="flex flex-wrap justify-center">
        {Array.from("Assets?").map((char, idx) => (
          <span key={`sm-line3-${idx}`} className="gradient-letter">
            {char}
          </span>
        ))}
      </Box>
    </Box>

    {/* Large screens: 2 lines */}
    <Box className="hidden lg:block">
      <Box component="div" className="flex flex-wrap justify-center">
        {Array.from("Ready to Transform").map((char, idx) => (
          <span key={`lg-line1-${idx}`} className="gradient-letter">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Box>

      <Box component="div" className="flex flex-wrap justify-center">
        {Array.from("Your Assets?").map((char, idx) => (
          <span key={`lg-line2-${idx}`} className="gradient-letter">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Box>
    </Box>
  </Box>
</Typography>




      <Typography
        variant="body1"
        className="text-text-secondary mb-8 max-w-2xl mx-auto"
      >
        Join thousands of individuals and organizations already unlocking
        the value of their assets on the Copym platform.
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


    </motion.div>
  );
}
