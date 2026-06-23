import LandingLayout from './layouts/LandingLayout';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import RegisterForm from './components/RegisterForm';

function App() {
  const handleCtaClick = () => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      const nameInput = document.getElementById('name');
      if (nameInput) {
        nameInput.focus();
      }
    } else {
      const targetElement = document.getElementById('register-mobile');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <LandingLayout
     
    navbar={
        <Navbar 
          logo="LAChirana Plat"
          ctaLabel="Comenzar"
          onCtaClick={handleCtaClick}
          links={[
            { label: 'Inicio', href: '#hero' },
            { label: 'TeamLP', href: 'https://www.facebook.com/LAChiranaPlat/' },
            { label: 'Galería', href: '#gallery' },
            { label: 'Contacto', href: '#contacts' },
            { label: 'Servicios', href: '#contacts' },
          ]}
        />
      }

      hero={
        <HeroSection 
          name="Huarseral Developer"
          title="Alexander M. Huarcaya Serrano"
          subtitle="Creamos experiencias digitales únicas asistidas por Inteligencia Artificial de última generación."
          ctaText="El Futuro es Hoy..."
          onCtaClick={handleCtaClick}
        />
      }
      gallery={<Gallery />}
      contacts={
        <div className="text-slate-400">
          <h3 className="text-xl font-bold text-white mb-2">Contacto</h3>
          <p>Email: contacto@ejemplo.com</p>
          <p>Tel: +34 123 456 789</p>
        </div>
      }
      registerForm={<RegisterForm />}
      footer={
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Antigravity. Todos los derechos reservados.</span>
          <span>Desarrollado con IA</span>
        </div>
      }
    />
  );
}

export default App;
