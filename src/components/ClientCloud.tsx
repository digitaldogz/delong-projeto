import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: "MINISTRY OF PUBLIC SECURITY", size: "xl" },
  { name: "FOREIGN AFFAIRS", size: "lg" },
  { name: "MINISTRY OF CULTURE", size: "xl" },
  { name: "SPORTS AND TOURISM", size: "lg" },
  { name: "VINGROUP", size: "xl" },
  { name: "VIETINBANK", size: "lg" },
  { name: "VIETCOMBANK", size: "lg" },
  { name: "TECHCOMBANK", size: "xl" },
  { name: "MB BANK", size: "md" },
  { name: "TPBANK", size: "md" },
  { name: "MSB", size: "md" },
  { name: "PJICO", size: "md" },
  { name: "VIETTEL", size: "xl" },
  { name: "VTC", size: "md" },
  { name: "FPT", size: "lg" },
  { name: "HDBANK", size: "md" },
  { name: "SAMSUNG", size: "xl" },
  { name: "LG", size: "xl" },
  { name: "VIETNAM AIRLINES", size: "lg" },
  { name: "BAMBOO AIRWAYS", size: "lg" },
  { name: "SONY", size: "xl" },
  { name: "OPPO", size: "md" },
  { name: "HYUNDAI", size: "lg" },
  { name: "SABECO", size: "md" },
  { name: "VINACONEX", size: "md" },
  { name: "MORE...", size: "md" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  },
};

const ClientCloud = () => {
  return (
    <section className="w-full bg-background py-32 px-4 overflow-hidden border-t border-border">
      
      {/* Label Superior */}
      <div className="flex justify-center mb-20">
        <div className="flex items-center gap-3 opacity-60">
          <div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>
          <span className="text-xs md:text-sm text-foreground font-medium tracking-widest uppercase">
            Featured Clients
          </span>
        </div>
      </div>

      {/* A Nuvem de Nomes */}
      <motion.div 
        className="max-w-7xl mx-auto flex flex-wrap justify-center items-center content-center gap-x-4 gap-y-2 md:gap-x-8 md:gap-y-4 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {clients.map((client, index) => {
          let classes = "cursor-pointer transition-all duration-300 ease-out leading-none text-center ";
          
          if (client.size === 'xl') {
            classes += "text-4xl md:text-6xl lg:text-7xl font-bold text-foreground hover:text-primary hover:scale-105 z-10";
          } else if (client.size === 'lg') {
            classes += "text-2xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground hover:text-foreground hover:scale-105 z-0";
          } else {
            classes += "text-xl md:text-3xl font-medium text-muted-foreground/50 hover:text-foreground hover:scale-105 z-0";
          }

          return (
            <motion.span 
              key={index}
              variants={itemVariants}
              className={classes}
            >
              {client.name}
            </motion.span>
          );
        })}
      </motion.div>
      
    </section>
  );
};

export default ClientCloud;
