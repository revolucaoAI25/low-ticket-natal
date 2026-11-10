import type { Config } from 'tailwindcss';

// Identidade visual "Kits pra Vender" (ver docs/IDENTIDADE.md).
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        verde: { DEFAULT: '#0B3D2E', escuro: '#072A20', claro: '#E7EFE9' },
        vermelho: { DEFAULT: '#A61C2A', escuro: '#821520', claro: '#F8E6E8' },
        dourado: { DEFAULT: '#D4AF37', escuro: '#A88721', suave: '#F3E6BD' },
        creme: { DEFAULT: '#F9F5E8', escuro: '#F1E9D3' },
        papel: '#FFFDF8',
        tinta: '#1E2B25',
        cinza: '#5B655F',
        linha: '#E6DDC6',
      },
      fontFamily: { sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'] },
      boxShadow: {
        card: '0 1px 0 rgba(30,43,37,.04), 0 10px 30px -14px rgba(30,43,37,.28)',
        cta: '0 4px 0 0 #821520',
        'cta-verde': '0 4px 0 0 #072A20',
      },
    },
  },
  plugins: [],
};
export default config;
