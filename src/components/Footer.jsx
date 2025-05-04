import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";

export default function Footer() {
  return (
    <Box className="py-24 relative">
      <Container maxWidth="xl">
        {/* Footer Content */}
        <Box
          className="pt-12 border-t border-white/10"
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <Box className="md:col-span-2">
              <Typography
                variant="h6"
                className="font-bold text-2xl tracking-tight flex items-center mb-4"
              >
                <img
                  src="/assets/icons/logo-svg.svg"
                  alt="COPYM"
                  className="w-20 h-10 sm:w-30 sm:h-15 md:w-36 md:h-16 lg:w-48 lg:h-20 xl:w-40 xl:h-16"
                />
              </Typography>
              <Typography
                variant="body2"
                className="text-text-secondary max-w-sm"
              >
                The complete ecosystem for tokenizing, managing, and trading
                real-world assets. Built for enterprises, accessible to
                everyone.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography
                variant="overline"
                className="text-primary font-medium block mb-4"
              >
                Quick Links
              </Typography>
              <Box className="flex flex-col gap-2">
                {["About", "Features", "Documentation", "Blog"].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    className="text-text-secondary hover:text-white cursor-pointer transition-colors"
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Resources */}
            <Box>
              <Typography
                variant="overline"
                className="text-primary font-medium block mb-4"
              >
                Resources
              </Typography>
              <Box className="flex flex-col gap-2">
                {[
                  "API Reference",
                  "Help Center",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    className="text-text-secondary hover:text-white cursor-pointer transition-colors"
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Copyright */}
          <Box className="mt-12 pt-6 border-t border-white/10">
            <Typography
              variant="body2"
              className="text-text-secondary text-center"
            >
              © 2024 Copym. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Enhanced background gradient highlight with Glow Effect */}
     {/* <BackgroundGlowEffect/> */}
    </Box>
  );
}
