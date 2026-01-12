import React from 'react';
import { motion } from 'framer-motion';

const clientRows = [
  ["PEDAL"],
  ["RED BULL", "CANAL DE BIKE"],
  ["REVISTA BICICLETA", "GO OUTSIDE", "ADV MAG"],
  ["CBC", "SUL BIKE RACE", "BIKINGMAN", "DESAFIO DOS ROCHAS"],
  ["AVELAR", "SHIMANO FEST", "XTERRA", "CIMTB", "IRONMAN"],
  ["EUROBIKE", "BIKE CHOPP", "UPHILL MARATHON", "SPECIALIZED", "OGGI", "SENSE"],
  ["ATHOR", "AUDAX", "ORIGINE", "FOX", "ISAPA", "FREE FORCE", "HB"],
  ["PROPARTS", "OTL", "MAP TREINE", "SHIMANO", "GASGAS", "HOUSTON"],
  ["BLUECYCLE", "SEMEXE", "MOAGEIRA", "FOBRAS", "E MAIS..."],
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.6, 
      ease: [0.33, 1, 0.68, 1] as const 
    }
  },
};

const ClientCloud = () => {
  return (
    <section className="w-full bg-background py-32 overflow-hidden border-t border-border">
      <div className="container-premium">
        {/* Label Superior */}
        <div className="flex justify-center mb-16">
          <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase">
            ▪ Featured Clients
          </span>
        </div>

        {/* Client Rows */}
        <motion.div 
          className="flex flex-col items-center gap-1 md:gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {clientRows.map((row, rowIndex) => (
            <motion.div 
              key={rowIndex}
              variants={rowVariants}
              className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 lg:gap-x-8"
            >
              {row.map((client, clientIndex) => (
                <motion.span 
                  key={clientIndex}
                  variants={wordVariants}
                  className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground tracking-[0.2em] whitespace-nowrap"
                >
                  {client}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientCloud;
