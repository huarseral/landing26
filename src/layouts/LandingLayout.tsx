import React from 'react';

export interface LandingLayoutProps {
  navbar?: React.ReactNode;
  hero?: React.ReactNode;
  gallery?: React.ReactNode;
  contacts?: React.ReactNode;
  registerForm?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Reusable LandingLayout component that organizes key landing page elements
 * (navbar, hero, gallery, contacts, registration form, and footer)
 * in a modern, responsive, and semantic layout structure.
 */
export const LandingLayout: React.FC<LandingLayoutProps> = ({
  navbar,
  hero,
  gallery,
  contacts,
  registerForm,
  footer,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-teal-500 selection:text-slate-900 lg:pr-[420px] xl:pr-[460px] relative transition-all duration-300">
      
      {/* Header / Navbar slot */}
      {navbar && (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
          {navbar}
        </header>   
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section slot */}
        {hero && (
          <section id="hero" className="relative overflow-hidden">
            {hero}
          </section>
        )}

        {/* Gallery Section slot */}
        {gallery && (
          <section id="gallery" className="py-16 md:py-24 border-t border-slate-800">
            {gallery}
          </section>
        )}

        {/* Contacts Section slot */}
        {(contacts || registerForm) && (
          <section id="contacts" className="py-16 md:py-24 border-t border-slate-800 bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-12 items-start">
                {/* Contacts Block */}
                {contacts && (
                  <div className="w-full">
                    {contacts}
                  </div>
                )}
                {/* Mobile/Tablet Registration Form Block */}
                {registerForm && (
                  <div className="w-full lg:hidden" id="register-mobile">
                    {registerForm}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Section slot */}
      {footer && (
        <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-12 md:py-16">
          {footer}
        </footer>
      )}

      {/* Fixed desktop registration form container */}
      {registerForm && (
        <div 
          className="hidden lg:block lg:fixed lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:z-[1000] lg:w-[380px] xl:w-[420px] xl:right-10"
          id="register-desktop"
        >
          {registerForm}
        </div>
      )}
    </div>
  );
};

export default LandingLayout;
