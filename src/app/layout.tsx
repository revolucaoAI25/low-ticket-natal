import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Tracking } from '@/components/Tracking';
import { marca } from '@/config/oferta';
import { montserrat } from './fonts';
import './globals.css';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const pixelId = (process.env.NEXT_PUBLIC_META_PIXEL_ID || '').replace(/\D/g, '');
const utmify = process.env.NEXT_PUBLIC_UTMIFY_UTMS !== '0';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: `${marca.produto} · ${marca.nome}`,
  description: '40 modelos de presentes de Natal com moldes para imprimir, lista de materiais e passo a passo. Monte com produtos prontos e venda neste Natal, mesmo sem saber artesanato.',
  openGraph: {
    title: marca.produto,
    description: 'Monte presentes lindos com produtos prontos e faça uma renda extra neste Natal.',
    images: ['/brand/logo-empilhado.png'],
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0B3D2E' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        {pixelId ? (
          <>
            <link rel="preconnect" href="https://connect.facebook.net" />
            {/* Pixel no início da página: o PageView sai antes do resto carregar (melhora a taxa de conexão). */}
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="min-h-dvh font-sans">
        {children}
        <Tracking />
        {utmify ? (
          <Script id="utmify-utms" src="https://cdn.utmify.com.br/scripts/utms/latest.js" strategy="afterInteractive" data-utmify-prevent-xcod-sck="" data-utmify-prevent-subids="" />
        ) : null}
      </body>
    </html>
  );
}
