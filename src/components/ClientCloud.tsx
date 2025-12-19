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
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const }
  },
};

const ClientCloud = () => {
  return (
    <section className="w-full bg-background py-32 overflow-hidden border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        {/* Label Superior */}
        <div className="flex justify-center mb-16">
          <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase">
            ▪ Featured Clients
          </span>
        </div>

        {/* Client Rows */}
        <motion.div 
          className="flex flex-col items-center gap-2 md:gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {clientRows.map((row, rowIndex) => (
            <motion.div 
              key={rowIndex}
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-x-4 md:gap-x-8"
            >
              {row.map((client, clientIndex) => (
                <span 
                  key={clientIndex}
                  className="text-sm md:text-lg lg:text-xl font-bold text-foreground tracking-wider whitespace-nowrap"
                >
                  {client}
                </span>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientCloud;
