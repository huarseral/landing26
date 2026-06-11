import React, { useState } from 'react';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
}

export interface ImageCardProps {
  image: GalleryImage;
  isSpotlighted: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Reusable ImageCard subcomponent representing an individual image item
 * within the gallery, utilizing native lazy loading and hover spotlight behaviors.
 */
export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  isSpotlighted,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex-grow flex-shrink-0 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-slate-800/80 group ${
        isSpotlighted ? 'scale-[1.03] shadow-2xl shadow-teal-500/20 border-teal-500/30 z-10' : ''
      } ${
        isDimmed ? 'opacity-40 scale-[0.97] blur-[0.5px]' : 'opacity-100'
      }`}
      tabIndex={0}
      aria-label={`Ver imagen ${image.title} de la categoría ${image.category}`}
    >
      {/* Background Image with Lazy Loading */}
      <img
        src={image.url}
        alt={image.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Hover Info Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-2">
          {image.category}
        </span>
        <h3 className="text-lg font-bold text-white mb-1">
          {image.title}
        </h3>
        {image.description && (
          <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
            {image.description}
          </p>
        )}
      </div>
    </div>
  );
};

export interface GalleryProps {
  images?: GalleryImage[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    title: 'Interfaces Inteligentes',
    category: 'Diseño UI',
    description: 'Interfaces de usuario dinámicas optimizadas mediante modelos de aprendizaje automático.',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    title: 'Algoritmos Complejos',
    category: 'Desarrollo',
    description: 'Procesamiento eficiente de datos a gran escala y redes neuronales en tiempo real.',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    title: 'Análisis Predictivo',
    category: 'Big Data',
    description: 'Extracción de valor y patrones futuros a través de modelos de regresión y clustering.',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    title: 'Infraestructura Cloud',
    category: 'DevOps',
    description: 'Despliegues escalables globales automatizados con redundancia distribuida e integrada.',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&q=80',
    title: 'Seguridad Avanzada',
    category: 'Ciberseguridad',
    description: 'Cifrado de extremo a extremo y auditoría inteligente de accesos no autorizados.',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
    title: 'Hardware IoT',
    category: 'Robótica',
    description: 'Sensores inteligentes interconectados para la toma de decisiones descentralizada.',
  },
];

/**
 * Reusable Gallery component layout that displays a collections of image cards
 * in a responsive flex grid structure, including a header and spotlight on-hover interactions.
 */
export const Gallery: React.FC<GalleryProps> = ({
  images = DEFAULT_IMAGES,
  title = 'Proyectos Destacados',
  subtitle = 'Explora nuestros trabajos recientes impulsados por tecnologías de vanguardia.',
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Gallery Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Gallery Flexbox Container */}
      <div className="flex flex-wrap gap-6 justify-center">
        {images.map((img) => (
          <ImageCard
            key={img.id}
            image={img}
            isSpotlighted={hoveredId === img.id}
            isDimmed={hoveredId !== null && hoveredId !== img.id}
            onMouseEnter={() => setHoveredId(img.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
