import React, { useState } from 'react';

// Reusable FormField text input component
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  helperText,
  error,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-200">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-xl bg-slate-900 border px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
          error 
            ? 'border-red-500/50 focus:ring-red-500/50' 
            : 'border-slate-800 focus:border-teal-500/50 focus:ring-teal-500/20'
        }`}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} className="text-xs text-red-400 font-medium mt-0.5">
          {error}
        </span>
      ) : helperText ? (
        <span id={`${id}-helper`} className="text-xs text-slate-500 mt-0.5">
          {helperText}
        </span>
      ) : null}
    </div>
  );
};

export interface RegisterFormData {
  name: string;
  lname: string;
  dni: string;
  sexo: string;
  country: string;
  dataPolicy: boolean;
}

export interface RegisterFormProps {
  onSubmitSuccess?: (data: RegisterFormData) => void;
  title?: string;
  subtitle?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmitSuccess,
  title = 'Crear Cuenta',
  subtitle = 'Completa tus datos para registrarte en la plataforma.',
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    lname: '',
    dni: '',
    sexo: '',
    country: '',
    dataPolicy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
    
    // Clear validation error when editing
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.lname.trim()) newErrors.lname = 'El apellido es obligatorio.';
    
    // Simple DNI validation (format check)
    if (!formData.dni.trim()) {
      newErrors.dni = 'El DNI/NIE es obligatorio.';
    } else if (!/^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i.test(formData.dni.trim())) {
      newErrors.dni = 'El formato del DNI/NIE no es válido.';
    }

    if (!formData.sexo) newErrors.sexo = 'Selecciona tu sexo.';
    if (!formData.country) newErrors.country = 'Selecciona tu país.';
    if (!formData.dataPolicy) newErrors.dataPolicy = 'Debes aceptar la política de protección de datos.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/20">
          <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">¡Registro Completado!</h3>
        <p className="text-slate-400 text-sm">
          Muchas gracias, <span className="text-teal-400 font-semibold">{formData.name}</span>. Tus datos han sido guardados correctamente en el frontend.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              lname: '',
              dni: '',
              sexo: '',
              country: '',
              dataPolicy: false,
            });
          }}
          className="mt-6 rounded-full bg-slate-800 px-6 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          Registrar otro usuario
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto shadow-xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name and Lname row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            id="name"
            name="name"
            label="Nombre"
            placeholder="Introduce tu nombre"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormField
            id="lname"
            name="lname"
            label="Apellidos"
            placeholder="Introduce tus apellidos"
            value={formData.lname}
            onChange={handleChange}
            error={errors.lname}
          />
        </div>

        {/* DNI */}
        <FormField
          id="dni"
          name="dni"
          label="DNI / NIE"
          placeholder="Ej: 12345678Z"
          helperText="Formato oficial de 8 números y 1 letra"
          value={formData.dni}
          onChange={handleChange}
          error={errors.dni}
        />

        {/* Sexo (Radio buttons) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-200">Sexo</span>
          <div className="flex gap-6 mt-1">
            
            <label className="inline-flex items-center gap-2 text-sm text-slate-300 cursor-pointer group">
             
              <input
                type="radio"
                name="sexo"
                value="masculino"
                checked={formData.sexo === 'masculino'}
                onChange={handleChange}
                className="w-4 h-4 text-teal-500 bg-slate-950 border-slate-800 focus:ring-teal-500/20 focus:ring-2 cursor-pointer"
              />
              <span className="group-hover:text-white transition-colors">Masculino</span>

            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-300 cursor-pointer group">
              <input
                type="radio"
                name="sexo"
                value="femenino"
                checked={formData.sexo === 'femenino'}
                onChange={handleChange}
                className="w-4 h-4 text-teal-500 bg-slate-950 border-slate-800 focus:ring-teal-500/20 focus:ring-2 cursor-pointer"
              />
              <span className="group-hover:text-white transition-colors">Femenino</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-300 cursor-pointer group">
              <input
                type="radio"
                name="sexo"
                value="otro"
                checked={formData.sexo === 'otro'}
                onChange={handleChange}
                className="w-4 h-4 text-teal-500 bg-slate-950 border-slate-800 focus:ring-teal-500/20 focus:ring-2 cursor-pointer"
              />
              <span className="group-hover:text-white transition-colors">Otro</span>
            </label>
          </div>
          {errors.sexo && (
            <span className="text-xs text-red-400 font-medium mt-0.5">{errors.sexo}</span>
          )}
        </div>

        {/* Country Select */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="country" className="text-sm font-semibold text-slate-200">
            País
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:border-teal-500/50 focus:ring-teal-500/20 transition-all cursor-pointer"
          >
            <option value="">Selecciona un país</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
            <option value="CR">Cost Rica</option>
            <option value="CL">Chile</option>
            <option value="ES">España</option>
            <option value="HO">Honduras</option>
            <option value="MX">México</option>
            <option value="PE">Perú</option>
          </select>
          {errors.country && (
            <span className="text-xs text-red-400 font-medium mt-0.5">{errors.country}</span>
          )}
        </div>

        {/* Data Protection Checkbox */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="inline-flex items-start gap-3 text-xs text-slate-400 cursor-pointer group">
            <input
              type="checkbox"
              name="dataPolicy"
              checked={formData.dataPolicy}
              onChange={handleChange}
              className="mt-0.5 w-4 h-4 rounded text-teal-500 bg-slate-950 border-slate-800 focus:ring-teal-500/20 focus:ring-2 cursor-pointer"
            />
            <span className="group-hover:text-slate-300 transition-colors leading-relaxed">
              Acepto la política de protección de datos y el tratamiento de mis datos personales según los términos establecidos. <span className="text-red-400">*</span>
            </span>
          </label>
          {errors.dataPolicy && (
            <span className="text-xs text-red-400 font-medium mt-0.5">{errors.dataPolicy}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-teal-500 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-400 transition-all hover:scale-102 active:scale-98 cursor-pointer shadow-lg shadow-teal-500/10"
        >
          Completar Registro
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
