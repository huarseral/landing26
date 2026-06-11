import React from 'react';

export interface HeroSectionProps {
  avatarUrl?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  bgImageUrl?: string;
}

/**
 * Reusable HeroSection component styled with modern CSS features,
 * gradient headers, ambient lighting, and accessibility attributes.
 */

/**
 * png, jpg(fotografias) 100  10
 * webp (compresion) 20 
*/

export const HeroSection: React.FC<HeroSectionProps> = ({
  avatarUrl = 'https://media-www.partycity.ca/product/seasonal-gardening/party-city-everyday/party-city-party-supplies-decor/8437000/marvel-powers-unite-masks-8ct-f1bc99fe-d4b0-4d71-abd3-db9dd69ba48c-jpgrendition.jpg',
  name = 'Desarrollador IA',
  title = 'Diseño Web Asistido con IA',
  subtitle = 'Creamos experiencias digitales únicas asistidas por Inteligencia Artificial de última generación.',
  ctaText = 'Comenzar Proyecto',
  onCtaClick,
  bgImageUrl = 'https://economis.com.ar/wp-content/uploads/2018/04/avengers-infinity-war-poster-by-themadbutcher-db8b8tc-1_jz8y-1-1.jpg',
}) => {
  return (
    <div 
      className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950 px-4 sm:px-6 lg:px-8 py-20"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.98)), url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
        
        {/* Circle Avatar */}
        {avatarUrl && (
          <div className="relative mb-6 group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 opacity-75 blur-md group-hover:opacity-100 transition duration-500" />
            <img
              src={avatarUrl}
              alt={`Avatar of ${name}`}
              className="relative w-30 h-30 md:w-28 md:h-28 sm:w-[250px] sm:h-[250px] rounded-full border-4 border-slate-900 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Name / Badge (Presentation Tag) */}
        {name && (
          <span className="inline-flex items-center rounded-full bg-teal-500/10 px-4 py-1 text-sm font-semibold text-teal-400 ring-1 ring-inset ring-teal-500/20 mb-6 backdrop-blur-md">
            {name}
          </span>
        )}

        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
          <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtitle / Presentation Description */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>

        {/* CTA Button */}
        {ctaText && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onCtaClick}
              className="relative group rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 p-[2px] transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-teal-500/20"
            >
              <span className="block px-8 py-3 rounded-full bg-slate-950 text-sm font-bold text-white transition-colors group-hover:bg-transparent group-hover:text-slate-950">
                {ctaText}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
