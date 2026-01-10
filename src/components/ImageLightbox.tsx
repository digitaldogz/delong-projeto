import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  projectTitle: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, projectTitle }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  }, [selectedIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  }, [selectedIndex, images.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  }, [closeLightbox, goToPrevious, goToNext]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group cursor-pointer aspect-[4/3] overflow-hidden bg-secondary"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`${projectTitle} - Imagem ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 bg-secondary/50 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 md:left-8 z-10 p-3 bg-secondary/50 hover:bg-secondary rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 md:right-8 z-10 p-3 bg-secondary/50 hover:bg-secondary rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={images[selectedIndex]}
              alt={`${projectTitle} - Imagem ${selectedIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-secondary/50 px-4 py-2 rounded-full">
              <span className="text-sm text-foreground font-mono">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageLightbox;
