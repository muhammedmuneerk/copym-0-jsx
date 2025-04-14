import { Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

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
        className="font-orbitron text-4xl md:text-5xl mb-4 pb-1 bg-[linear-gradient(183deg,_rgba(0,255,0,1)_0%,_rgba(0,198,0,1)_0%,_rgba(0,158,0,1)_100%,_rgba(0,0,0,1)_100%)] bg-clip-text text-transparent"
      >
        Ready to Transform Your Assets?
      </Typography>
      <Typography
        variant="body1"
        className="text-text-secondary mb-8 max-w-2xl mx-auto"
      >
        Join thousands of individuals and organizations already unlocking
        the value of their assets on the Copym platform.
      </Typography>
      <Button
        variant="text"
        size="large"
        className="bg-[linear-gradient(183deg,_rgba(0,255,0,1)_0%,_rgba(0,198,0,1)_0%,_rgba(0,158,0,1)_100%,_rgba(0,0,0,1)_100%)]  text-black font-semibold px-8 py-3 rounded-md shadow-md hover:shadow-[0_0_15px_rgba(16,224,96,0.5)]"
      >
        Explore Asset Tokenization
      </Button>
    </motion.div>
  );
} 