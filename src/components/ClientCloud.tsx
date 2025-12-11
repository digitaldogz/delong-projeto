import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: "MINISTRY OF PUBLIC SECURITY", size: "xl" },
  { name: "FOREIGN AFFAIRS", size: "lg" },
  { name: "MINISTRY OF CULTURE", size: "xl" },
  { name: "SPORTS AND TOURISM", size: "lg" },
  { name: "VINGROUP", size: "xl" },
  { name: "BIM GROUP", size: "lg" },
  { name: "PETROLIMEX", size: "lg" },
  { name: "VIETINBANK", size: "xl" },
  { name: "VIETCOMBANK", size: "lg" },
  { name: "TECHCOMBANK", size: "xl" },
  { name: "VPBANK", size: "lg" },
  { name: "MB BANK", size: "lg" },
  { name: "TPBANK", size: "md" },
  { name: "SHB", size: "md" },
  { name: "HDBANK", size: "md" },
  { name: "MSB", size: "md" },
  { name: "PJICO", size: "md" },
  { name: "VIETTEL", size: "xl" },
  { name: "VNG", size: "lg" },
  { name: "VTC", size: "md" },
  { name: "FPT", size: "xl" },
  { name: "VINAPHONE", size: "lg" },
  { name: "SAMSUNG", size: "xl" },
  { name: "LG", size: "xl" },
  { name: "VIETNAM AIRLINES", size: "lg" },
  { name: "BAMBOO AIRWAYS", size: "lg" },
  { name: "SONY", size: "xl" },
  { name: "OPPO", size: "md" },
  { name: "HYUNDAI", size: "lg" },
  { name: "SABECO", size: "md" },
  { name: "VINACONEX", size: "md" },
  { name: "AND MORE...", size: "md" },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
  },
};

const ClientCloud = () => {
  return (
    <section className="w-full bg-background py-40 px-4 overflow-hidden">
      
      {/* Label Superior */}
      <div className="flex justify-center mb-16">
        <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase">
          ▪ Featured Clients
        </span>
      </div>

      {/* O Bloco de Nomes */}
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="flex flex-wrap justify-center items-baseline gap-x-6 gap-y-3 text-center leading-tight"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
        >
          {clients.map((client, index) => {
            let classes = "inline-block transition-colors duration-300 hover:text-primary ";
            
            if (client.size === 'xl') {
              classes += "text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight";
            } else if (client.size === 'lg') {
              classes += "text-xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground tracking-tight";
            } else {
              classes += "text-lg md:text-2xl font-medium text-muted-foreground/60";
            }

            return (
              <React.Fragment key={index}>
                <motion.span variants={itemVariants} className={classes}>
                  {client.name}
                </motion.span>
                {index < clients.length - 1 && (
                  <span className="text-muted-foreground/30 select-none">&nbsp;</span>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
      
    </section>
  );
};

export default ClientCloud;
