import { motion } from "framer-motion";
import logo from "@/assets/logo-delong-white.png";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.img
        src={logo}
        alt="Delong Media House"
        className="h-16 md:h-20 w-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Progress line */}
      <div className="mt-8 w-32 h-[2px] bg-white/20 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
