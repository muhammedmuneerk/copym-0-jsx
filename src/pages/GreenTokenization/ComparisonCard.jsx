import { motion } from "framer-motion";
import { FaGem, FaBalanceScale } from "react-icons/fa";

const features = [
  {
    title: "Traceability",
    metals: "High transparency with blockchain tracking",
    others: "Often opaque and difficult to verify",
  },
  {
    title: "Liquidity",
    metals: "Tokenized metals allow 24/7 trading",
    others: "Traditional assets limited to market hours",
  },
  {
    title: "Security",
    metals: "Blockchain ensures secure ownership",
    others: "Prone to fraud or mismanagement",
  },
  {
    title: "Accessibility",
    metals: "Invest from anywhere globally",
    others: "Restricted by geography and regulations",
  },
];

export default function ComparativeSnapshot() {
  return (
    <div className=" bg-transparent text-white p-8 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="relative p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-400/50 rounded-2xl shadow-2xl hover:shadow-green-400/50 transition duration-500 backdrop-blur-md">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative z-10 flex flex-col space-y-4">
                <h3 className="text-2xl font-semibold text-green-300">{feature.title}</h3>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <FaGem className="text-green-400" />
                      <span className="text-lg font-medium">Metals</span>
                    </div>
                    <p className="text-sm text-green-200 mt-2">{feature.metals}</p>
                  </div>
                  <div className="w-px h-24 bg-gradient-to-b from-green-400 via-blue-400 to-green-400" />
                  <div className="flex-1 flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <FaBalanceScale className="text-blue-400" />
                      <span className="text-lg font-medium">Other Assets</span>
                    </div>
                    <p className="text-sm text-blue-200 mt-2">{feature.others}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
