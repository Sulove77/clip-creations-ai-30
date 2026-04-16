import { motion } from "framer-motion";

import type { BlockConfig } from "@/content/portfolio.schema";

type ServicesBlock = Extract<BlockConfig, { type: "services" }>;

type ServicesSectionProps = {
  block: ServicesBlock;
};

export default function ServicesSection({ block }: ServicesSectionProps) {
  return (
    <section id="services" className="section-padding bg-mesh relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/8 blur-3xl animate-pulse-glow" />
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-coral/6 blur-xl animate-float" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-display">
            {block.title} <span className="text-gradient">{block.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{block.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {block.items.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 hover:glow-coral-sm transition-shadow duration-300 cursor-default group"
            >
              <motion.div
                className="text-3xl mb-4"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-lg font-bold font-display text-foreground mb-2 group-hover:text-coral transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {block.image ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <div className="animate-float-slow">
              <img
                src={block.image.src}
                alt={block.image.alt}
                loading="lazy"
                width={block.image.width ?? 800}
                height={block.image.height ?? 800}
                className="w-full max-w-xs opacity-70"
              />
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
