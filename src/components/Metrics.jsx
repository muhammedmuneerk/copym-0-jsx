import { Container, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";

const metrics = [
  {
    value: "1.3B",
    label: "Assets Tokenized",
    growth: "+42%",
    period: "year-over-year",
  },
  {
    value: "50K",
    label: "Active Users",
    growth: "+78%",
    period: "year-over-year",
  },
  {
    value: "5",
    label: "Blockchain Networks",
    growth: "+3",
    period: "this year",
  },
  {
    value: "2M",
    label: "Transactions",
    growth: "+53%",
    period: "year-over-year",
  },
];

const monthlyData = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Metrics() {
  return (
    <Box className="py-24 bg-background/50">
      <Container maxWidth="xl">
        <Typography
          variant="overline"
          className="text-primary font-medium tracking-wider block text-center mb-2"
        >
          PLATFORM METRICS
        </Typography>
        <Typography
          variant="h2"
          className="text-4xl md:text-5xl text-center mb-4"
        >
          Tokenization at Scale
        </Typography>
        <Typography
          variant="body1"
          className="text-text-secondary text-center mb-16 max-w-2xl mx-auto"
        >
          Powering the global tokenization economy with enterprise-grade
          infrastructure
        </Typography>

        <Grid container spacing={4} className="mb-24">
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Typography variant="h2" className="text-5xl mb-2">
                  {metric.value}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-text-secondary mb-2"
                >
                  {metric.label}
                </Typography>
                <Typography variant="body2" className="text-primary">
                  {metric.growth}
                  <span className="text-text-secondary ml-2">
                    {metric.period}
                  </span>
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box className="text-center mb-16">
          <Typography variant="h3" className="mb-4">
            Platform Growth
          </Typography>
          <Typography variant="body1" className="text-text-secondary">
            Consistent growth in tokenized assets across all classes
          </Typography>
        </Box>

        <Box className="flex justify-center gap-4 flex-wrap">
          {monthlyData.map((month, index) => (
            <Typography
              key={index}
              variant="body2"
              className="text-text-secondary hover:text-primary cursor-pointer transition-colors"
            >
              {month}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
