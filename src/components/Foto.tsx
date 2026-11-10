import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

/** Foto do produto. Sem imagem definida, mostra um espaço reservado com a descrição do que vai ali. */
export function Foto({ src, alt, ratio = '4 / 5', className = '', sizes = '(max-width: 768px) 100vw, 540px', priority = false }: {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-dourado/60 bg-[repeating-linear-gradient(45deg,#F3E6BD33,#F3E6BD33_10px,transparent_10px,transparent_20px)] p-4 text-center ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <ImageIcon className="text-dourado" size={26} />
      <span className="text-[12px] font-bold leading-snug text-cinza">{alt}</span>
    </div>
  );
}
