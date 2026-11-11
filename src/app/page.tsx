import Image from 'next/image';
import {
  BadgeCheck,
  Calculator,
    Camera,
  Check,
  Gift,
  ListChecks,
  Lock,
  Mail,
  MessageCircle,
  Package,
  Plus,
  Printer,
  Scissors,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Wallet,
  X,
} from 'lucide-react';
import { Cta } from '@/components/Cta';
import { Depoimentos } from '@/components/Depoimentos';
import { ExitPopup } from '@/components/ExitPopup';
import { Foto } from '@/components/Foto';
import { HeroCollage } from '@/components/HeroCollage';
import { KitsGrid } from '@/components/KitsGrid';
import { StickyBar } from '@/components/StickyBar';
import { bonus, checkout, faq, fichaExemplo, imagens, marca, mostrarDepoimentos, planoCompletoExtras, planoEssencial, precos } from '@/config/oferta';

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function Preco({ v, className = '' }: { v: number; className?: string }) {
  const [r, c] = brl(v).replace('R$', '').trim().split(',');
  return (
    <p className={`flex items-start justify-center font-extrabold text-verde ${className}`}>
      <span className="mt-2 text-[18px]">R$</span>
      <span className="text-[56px] leading-none tracking-tight">{r}</span>
      <span className="mt-2 text-[22px]">,{c}</span>
    </p>
  );
}

function Secao({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-11 md:py-16 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

function Cabecalho({ kicker, titulo, sub, claro = false }: { kicker: string; titulo: React.ReactNode; sub?: string; claro?: boolean }) {
  return (
    <div className="mx-auto max-w-[680px] text-center">
      <p className={`kicker inline-flex items-center gap-2 ${claro ? '!text-dourado' : ''}`}>
        <span className="h-px w-6 bg-current opacity-50" />
        {kicker}
        <span className="h-px w-6 bg-current opacity-50" />
      </p>
      <h2 className={`titulo mt-3 ${claro ? '!text-white' : ''}`}>{titulo}</h2>
      {sub && <p className={`sub ${claro ? '!text-white/80' : ''}`}>{sub}</p>}
    </div>
  );
}

export default function Page() {
  const ctaTopo = '#planos';
  return (
    <>
      {/* faixa de topo */}
      <div className="bg-vermelho px-4 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.14em] text-white md:text-[12px]">
        🎄 Oferta especial de Natal
      </div>

      {/* ---------- HERO ---------- */}
      <header id="topo" className="hero relative overflow-hidden">
        <div className="wrap relative grid items-center gap-6 pb-12 pt-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 md:pb-16 lg:pb-20 md:pt-10 lg:pt-14">
          <div className="mx-auto max-w-[640px] text-center lg:mx-0 lg:max-w-none lg:text-left">
            <p className="kicker">Renda extra no Natal</p>
            <h1 className="mt-3 text-[33px] font-extrabold leading-[1.04] tracking-tight text-verde min-[380px]:text-[36px] md:text-[52px] xl:text-[60px]">
              40 Kits de Natal para <span className="text-vermelho">Montar e Vender</span>
            </h1>
            <p className="mx-auto mt-3 max-w-[520px] text-[15.5px] leading-snug text-tinta/80 lg:mx-0 md:mt-4 md:text-[19px] md:leading-relaxed">
              Monte presentes natalinos lindos com <b className="text-verde">produtos prontos e baratos</b> e comece a vender ainda neste Natal, <b className="text-verde">mesmo que você nunca tenha feito artesanato</b>.
            </p>
            <div className="mt-5 lg:hidden">
              <HeroCollage capa={imagens.capa} kits={imagens.heroKits} />
            </div>
            <div className="mt-7">
              <Cta href={ctaTopo} pulse>
                Quero meus 40 kits
              </Cta>
            </div>
            <ul className="mx-auto mt-6 grid max-w-[460px] gap-2 text-left text-[14.5px] text-tinta lg:mx-0">
              {[
                ['Moldes prontos', 'para imprimir: tags, cartões, cintas e caixas'],
                ['Lista de compras', 'de cada kit, com quantidades e onde achar'],
                ['Passo a passo', 'em 6 etapas, do produto ao laço final'],
              ].map(([a, b]) => (
                <li key={a} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-verde text-white">
                    <Check size={13} strokeWidth={3.5} />
                  </span>
                  <span>
                    <b className="text-verde">{a}</b> {b}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12.5px] font-semibold text-cinza lg:justify-start">
              <span className="inline-flex items-center gap-1">
                <Smartphone size={14} /> Material digital
              </span>
              <span className="inline-flex items-center gap-1">
                <Mail size={14} /> Chega no e-mail na hora
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck size={14} /> 7 dias de garantia
              </span>
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroCollage capa={imagens.capa} kits={imagens.heroKits} />
          </div>
        </div>
        <div className="fita relative" />
      </header>

      <main>
        {/* ---------- FICHA DE EXEMPLO ---------- */}
        <Secao className="bg-papel textura">
          <Cabecalho kicker="Por dentro de cada kit" titulo="Cada kit vem com tudo explicado" sub="Foto do presente pronto, o que comprar, os moldes para imprimir e quanto custa montar. Veja um exemplo:" />
          <div className="card mx-auto mt-8 max-w-[860px] overflow-hidden md:grid md:grid-cols-[1fr_1.1fr]">
            <Foto src={imagens.fichaExemplo} alt={`${fichaExemplo.nome} montado`} ratio="4 / 5" className="md:!aspect-auto md:h-full md:min-h-[460px]" />
            <div className="p-5 md:p-7">
              <p className="kicker">{fichaExemplo.kit}</p>
              <h3 className="mt-1 text-[24px] font-extrabold leading-tight text-verde">{fichaExemplo.nome}</h3>
              <p className="mt-4 text-[12px] font-extrabold uppercase tracking-wider text-cinza">Materiais</p>
              <ul className="mt-2 space-y-1.5 text-[14.5px] text-tinta">
                {fichaExemplo.materiais.map((m) => (
                  <li key={m} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-verde" strokeWidth={3} /> {m}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-creme p-3">
                  <p className="text-[11px] font-bold uppercase text-cinza">Custo</p>
                  <p className="text-[17px] font-extrabold leading-tight text-verde">{fichaExemplo.custo}</p>
                </div>
                <div className="rounded-2xl bg-creme p-3">
                  <p className="text-[11px] font-bold uppercase text-cinza">Montagem</p>
                  <p className="text-[15px] font-extrabold leading-tight text-verde">{fichaExemplo.tempo}</p>
                </div>
                <div className="rounded-2xl bg-verde p-3 text-white">
                  <p className="text-[11px] font-bold uppercase text-white/75">Venda</p>
                  <p className="text-[15px] font-extrabold leading-tight text-dourado">{fichaExemplo.venda}</p>
                </div>
              </div>
              <p className="mt-3 text-[12px] leading-snug text-cinza">Valores de referência do material. Cada ficha mostra como recalcular com os preços da sua região.</p>
            </div>
          </div>
        </Secao>

        {/* ---------- COMO FUNCIONA ---------- */}
        <section className="neve relative bg-verde py-11 md:py-16">
          <div className="wrap">
            <Cabecalho claro kicker="Como funciona" titulo="Você não fabrica nada. Você monta." />
            <ol className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                [Gift, 'Escolha', 'os modelos que mais gostou'],
                [ShoppingCart, 'Compre', 'os produtos da lista'],
                [Scissors, 'Monte', 'com os moldes e o passo a passo'],
                [Store, 'Venda', 'para amigos, família e colegas'],
              ].map(([Icon, t, d], i) => {
                const I = Icon as typeof Gift;
                return (
                  <li key={t as string} className="rounded-2xl bg-[#15533F] p-4 shadow-[0_10px_24px_-14px_rgba(0,0,0,.6)] ring-1 ring-dourado/35">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-dourado text-verde">
                      <I size={20} strokeWidth={2.4} />
                    </span>
                    <h3 className="mt-3 text-[18px] font-extrabold text-white">
                      <span className="text-dourado">{i + 1}.</span> {t as string}
                    </h3>
                    <p className="mt-0.5 text-[14px] font-medium leading-snug text-white/95">{d as string}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ---------- OBJEÇÕES ---------- */}
        <Secao>
          <Cabecalho kicker="Feito para quem nunca fez" titulo={<>Você não precisa de <span className="text-vermelho">nada disso</span></>} />
          <ul className="card mx-auto mt-7 max-w-[720px] divide-y divide-linha">
            {[
              ['Saber fazer artesanato', 'os kits usam produtos prontos, você só monta e embala.'],
              ['Ter criatividade', 'os 40 modelos já estão criados, com foto de como fica.'],
              ['Saber o que comprar', 'cada kit tem a lista de materiais com as quantidades.'],
              ['Investir muito ou ter estoque', 'comece com 2 ou 3 modelos e venda por encomenda.'],
            ].map(([a, b]) => (
              <li key={a} className="flex gap-3 p-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-vermelho-claro text-vermelho">
                  <X size={15} strokeWidth={3} />
                </span>
                <p className="text-[15px] leading-snug text-cinza">
                  <b className="text-verde">{a}:</b> {b}
                </p>
              </li>
            ))}
          </ul>
        </Secao>

        {/* ---------- VITRINE ---------- */}
        <Secao id="kits" className="bg-papel">
          <Cabecalho kicker="Alguns dos 40 kits" titulo="Escolha seus favoritos e comece por eles" sub="Um gostinho do que tem no material: são 40 modelos em 6 categorias." />
          <div className="mt-8">
            <KitsGrid />
          </div>
        </Secao>

        {/* ---------- O QUE VOCÊ RECEBE ---------- */}
        <Secao>
          <Cabecalho kicker="O que você recebe" titulo="Tudo pronto para reproduzir, não só ideias" />
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              [Package, '40 modelos de kits', 'do mimo simples à caixa completa'],
              [Printer, 'Moldes para imprimir', 'tags, cartões, cintas e caixas'],
              [ListChecks, 'Lista de materiais', 'o que comprar e quanto'],
              [Scissors, 'Passo a passo', 'com fotos de cada etapa'],
              [Camera, 'Fotos de referência', 'de cada kit pronto'],
              [Calculator, 'Custos e preços', 'exemplo de cada kit'],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Gift;
              return (
                <div key={t as string} className="card p-4">
                  <I size={22} strokeWidth={2.2} className="text-vermelho" />
                  <h3 className="mt-2 text-[15px] font-extrabold leading-tight text-verde">{t as string}</h3>
                  <p className="mt-0.5 text-[13px] leading-snug text-cinza">{d as string}</p>
                </div>
              );
            })}
          </div>

          <h3 className="mt-10 text-center text-[18px] font-extrabold text-verde">Veja as páginas por dentro</h3>
          <div className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
            {imagens.porDentro.map((p) => (
              <figure key={p.legenda} className="w-[62%] max-w-[250px] shrink-0 snap-center">
                <Foto src={p.img} alt={`Página do material: ${p.legenda}`} ratio="760 / 1075" className="rounded-xl shadow-card ring-1 ring-linha" sizes="250px" />
                <figcaption className="mt-2 text-center text-[12.5px] font-semibold text-cinza">{p.legenda}</figcaption>
              </figure>
            ))}
          </div>
        </Secao>

        {/* ---------- RENDA EXTRA ---------- */}
        <section className="relative overflow-hidden bg-vermelho py-12 text-white md:py-16">
          <div className="neve absolute inset-0 opacity-40" aria-hidden />
          <div className="wrap relative">
            <div className="mx-auto max-w-[700px] text-center">
              <p className="kicker inline-flex items-center gap-2 !text-dourado">
                <span className="h-px w-6 bg-current opacity-60" />
                Renda extra de verdade
                <span className="h-px w-6 bg-current opacity-60" />
              </p>
              <h2 className="mt-3 text-[30px] font-extrabold leading-[1.1] md:text-[42px]">
                Feche o ano com <span className="text-dourado">dinheiro no bolso</span>
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-white/85 md:text-[18px]">
                No Natal todo mundo precisa de presente. Você monta, oferece para quem já conhece e transforma o fim de ano em renda extra.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-[900px] gap-3 md:grid-cols-3">
              {[
                [Gift, 'Todo mundo compra', 'Amigo-secreto, confraternização, professora, família: dezembro é o mês dos presentes.'],
                [Store, 'Venda perto de você', 'Família, vizinhos, colegas de trabalho, grupos do bairro e do WhatsApp.'],
                [Sparkles, 'Comece 2027 no azul', 'Pague as contas de fim de ano e entre em janeiro com dinheiro guardado.'],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Gift;
                return (
                  <div key={t as string} className="rounded-3xl bg-[#8E1724] p-5 shadow-[0_10px_24px_-14px_rgba(0,0,0,.6)] ring-1 ring-dourado/35">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-dourado text-vermelho">
                      <I size={22} strokeWidth={2.4} />
                    </span>
                    <h3 className="mt-3 text-[18px] font-extrabold">{t as string}</h3>
                    <p className="mt-1 text-[14.5px] font-medium leading-snug text-white/95">{d as string}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Cta href="#planos" variant="verde" className="ring-2 ring-dourado/70">
                Quero fazer renda extra neste Natal
              </Cta>
            </div>
          </div>
        </section>

        {/* ---------- BÔNUS ---------- */}
        <Secao className="bg-papel textura">
          <Cabecalho kicker="Bônus do Plano Completo" titulo={<>3 bônus para você <span className="text-vermelho">começar a vender</span></>} />
          <div className="mx-auto mt-7 grid max-w-[980px] gap-3 md:grid-cols-3">
            {bonus.map((b) => (
              <article key={b.n} className="card flex gap-4 p-3 md:flex-col md:p-0">
                <Foto src={b.img} alt={`Capa do bônus ${b.n}`} ratio="3 / 4" className="w-[92px] shrink-0 rounded-xl md:w-full md:rounded-b-none md:rounded-t-3xl" sizes="(max-width: 768px) 92px, 320px" />
                <div className="py-1 md:p-5 md:pt-2">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-vermelho">Bônus {b.n}</p>
                  <h3 className="mt-0.5 text-[16px] font-extrabold leading-snug text-verde">{b.nome}</h3>
                  <p className="mt-1 text-[13.5px] leading-snug text-cinza">{b.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Secao>

        {/* ---------- DEPOIMENTOS ---------- */}
        {mostrarDepoimentos && (
          <section className="overflow-hidden py-11 md:py-16">
            <div className="wrap">
              <Cabecalho kicker="Depoimentos" titulo="O que estão dizendo" sub="Mensagens de quem já montou os primeiros kits." />
            </div>
            <Depoimentos itens={imagens.depoimentos} />
          </section>
        )}

        {/* ---------- PLANOS ---------- */}
        <section id="planos" className="neve bg-verde py-14 md:py-20">
          <div className="wrap">
            <Cabecalho claro kicker="Escolha seu plano" titulo="Seus kits de Natal começam aqui" sub="Pagamento único. Sem mensalidade. Acesso imediato." />
            <div className="mx-auto mt-10 grid max-w-[920px] items-start gap-5 md:grid-cols-2">
              {/* Completo */}
              <div className="relative rounded-[28px] border-4 border-dourado bg-papel p-6 shadow-card md:order-2">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dourado px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-wider text-verde">
                  ★ Mais escolhido
                </span>
                <h3 className="mt-2 text-center text-[24px] font-extrabold text-verde">Plano Completo</h3>
                <p className="mt-1 text-center text-[14px] text-cinza">Para montar os kits e ter ajuda para vender.</p>
                <Preco v={precos.completo} className="mt-4" />
                <p className="text-center text-[13px] font-semibold text-cinza">pagamento único</p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-tinta">
                  {planoEssencial.map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check size={18} className="mt-0.5 shrink-0 text-verde" strokeWidth={3} /> {t}
                    </li>
                  ))}
                  {planoCompletoExtras.map((t) => (
                    <li key={t} className="flex gap-2 font-bold text-verde">
                      <Gift size={18} className="mt-0.5 shrink-0 text-vermelho" /> {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-2xl bg-dourado-suave px-4 py-3 text-center text-[14px] font-bold text-verde">
                  Só {brl(precos.completo - precos.essencial)} a mais que o Essencial, com os 3 bônus para vender.
                </p>
                <div className="mt-5">
                  <Cta href={checkout.completo || '#planos'} value={precos.completo} plano="Plano Completo" className="!w-full !min-w-0">
                    Quero o Plano Completo
                  </Cta>
                </div>
              </div>
              {/* Essencial */}
              <div className="rounded-[28px] bg-papel p-6 shadow-card md:order-1 md:mt-8">
                <h3 className="text-center text-[22px] font-extrabold text-verde">Plano Essencial</h3>
                <p className="mt-1 text-center text-[14px] text-cinza">Para aprender a montar os presentes.</p>
                <Preco v={precos.essencial} className="mt-4" />
                <p className="text-center text-[13px] font-semibold text-cinza">pagamento único</p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-tinta">
                  {planoEssencial.map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check size={18} className="mt-0.5 shrink-0 text-verde" strokeWidth={3} /> {t}
                    </li>
                  ))}
                  <li className="flex gap-2 text-cinza">
                    <X size={18} className="mt-0.5 shrink-0" strokeWidth={3} /> Sem os 3 bônus de vendas
                  </li>
                </ul>
                <div className="mt-6">
                  <Cta href={checkout.essencial || '#planos'} variant="linha" value={precos.essencial} plano="Plano Essencial" className="!w-full !min-w-0">
                    Quero o Essencial
                  </Cta>
                </div>
              </div>
            </div>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[13px] font-semibold text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={14} /> Compra segura
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wallet size={14} /> Pix ou cartão
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} /> 7 dias de garantia
              </span>
            </p>
          </div>
        </section>

        {/* ---------- GARANTIA ---------- */}
        <Secao>
          <div className="card mx-auto flex max-w-[760px] flex-col items-center gap-5 p-7 text-center md:flex-row md:text-left">
            <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-4 border-dourado bg-verde text-white">
              <span className="text-[30px] font-extrabold leading-none">7</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider">dias</span>
            </div>
            <div>
              <h2 className="text-[24px] font-extrabold text-verde">Garantia de 7 dias</h2>
              <p className="mt-2 text-[15.5px] leading-relaxed text-cinza">
                Conheça o material com calma. Se não for para você, peça o reembolso dentro de 7 dias e o valor volta inteiro, sem perguntas.
              </p>
            </div>
          </div>
        </Secao>

        {/* ---------- FAQ ---------- */}
        <Secao>
          <Cabecalho kicker="Dúvidas" titulo="Perguntas frequentes" />
          <div className="mx-auto mt-8 max-w-[760px] space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="card group p-0">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-[16px] font-bold text-verde">
                  {f.q}
                  <Plus size={20} className="gira shrink-0 text-vermelho transition-transform" />
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-cinza">{f.a}</p>
              </details>
            ))}
          </div>
        </Secao>

        {/* ---------- CTA FINAL ---------- */}
        <section className="neve bg-verde py-16 text-center">
          <div className="wrap">
            <Image src="/brand/icone.png" alt="" width={80} height={80} className="mx-auto h-20 w-20" />
            <h2 className="mx-auto mt-5 max-w-[640px] text-[28px] font-extrabold leading-tight text-white md:text-[38px]">
              Este Natal, transforme presentes simples em <span className="text-dourado">renda extra</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[16px] text-white/80">40 modelos com moldes, lista de materiais e passo a passo. É só escolher, montar e oferecer.</p>
            <div className="mt-7">
              <Cta href="#planos" pulse>
                Quero meus 40 kits
              </Cta>
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/70">
              <BadgeCheck size={15} /> Acesso imediato · Pagamento único · 7 dias de garantia
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-verde-escuro py-10 pb-28 text-center text-[13px] text-white/60 md:pb-10">
        <div className="wrap">
          <p className="font-bold text-white/85">{marca.nome}</p>
          <p className="mt-1">Produto digital. Não há envio de material físico.</p>
          <p className="mt-1">
            Os resultados dependem da dedicação de cada pessoa. Não garantimos ganhos.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5">
            <MessageCircle size={14} /> Suporte: {marca.suporte}
          </p>
          <p className="mt-3 flex justify-center gap-4">
            <a href="/termos" className="underline">Termos de uso</a>
            <a href="/privacidade" className="underline">Política de privacidade</a>
          </p>
        </div>
      </footer>

      <StickyBar preco={brl(precos.essencial)} />
      <ExitPopup href={checkout.saida} preco={precos.saida} precoDe={precos.completo} bonus={bonus.map((b) => b.nome)} capa={imagens.capa} />
    </>
  );
}

