import localFont from 'next/font/local';

// Montserrat (variável, 100–900), servida pelo próprio site: carrega rápido e não depende do Google.
export const montserrat = localFont({
  src: './fonts/montserrat.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-montserrat',
});
