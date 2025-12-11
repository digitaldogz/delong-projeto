import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: "MINISTRY OF PUBLIC SECURITY", size: "xl" },
  { name: "MINISTRY OF FOREIGN AFFAIRS", size: "lg" },
  { name: "MINISTRY OF CULTURE", size: "xl" },
  { name: "SPORTS AND TOURISM", size: "lg" },
  { name: "VINGROUP", size: "xl" },
  { name: "BIM GROUP", size: "lg" }, 
  { name: "PETROLIMEX", size: "lg" }, 
  { name: "VIETINBANK", size: "xl" },
  { name: "VIETCOMBANK", size: "lg" },
  { name: "TECHCOMBANK", size: "xl" },
  { name: "VPBANK", size: "lg" }, 
  { name: "MB", size: "lg" },
  { name: "TPBANK", size: "md" },
  { name: "SHB", size: "xl" },
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
  { name: "AND MORE...", size: "sm" },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const }
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

        {/* O BLOCO DE TEXTO */}
        <div className="w-full">
        <motion.div 
          className="text-justify leading-none md:leading-[0.9] tracking-tighter"
          style={{ textAlignLast: "center" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {clients.map((client, index) => {
            
            let classes = "inline-block transition-colors duration-300 hover:text-foreground cursor-default ";
            
            if (client.size === 'xl') {
              classes += "text-4xl md:text-6xl lg:text-[5rem] font-bold text-foreground";
            } else if (client.size === 'lg') {
              classes += "text-2xl md:text-4xl lg:text-[3.5rem] font-semibold text-muted-foreground";
            } else if (client.size === 'md') {
              classes += "text-xl md:text-3xl lg:text-[2.5rem] font-medium text-muted-foreground/60";
            } else {
              classes += "text-lg md:text-xl font-medium text-muted-foreground/40";
            }

            return (
              <React.Fragment key={index}>
                <motion.span variants={itemVariants} className={classes}>
                  {client.name}
                </motion.span>
                <span className="inline-block w-4 md:w-8"></span> 
              </React.Fragment>
            );
          })}
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientCloud;
