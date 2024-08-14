import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

// Valor inicial del contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider del contexto
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Lee la preferencia del tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Cambia el tema y guarda la preferencia en localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto del tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
