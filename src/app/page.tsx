import Image from 'next/image';
import {
  BadgeCheck,
  Calculator,
  CalendarDays,
  Camera,
  Check,
  Gift,
  Heart,
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
import { Countdown } from '@/components/Countdown';
import { Cta } from '@/components/Cta';
import { Foto } from '@/components/Foto';
import { KitsGrid } from '@/components/KitsGrid';
import { StickyBar } from '@/components/StickyBar';
import { bonus, checkout, faq, fichaExemplo, imagens, marca, planoCompletoExtras, planoEssencial, precos } from '@/config/oferta';

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
    <section id={id} className={`py-14 md:py-20 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

function Cabecalho({ kicker, titulo, sub, claro = false }: { kicker: string; titulo: React.ReactNode; sub?: string; claro?: boolean }) {
  return (
    <div className="mx-auto max-w-[680px] text-center">
      <p className={`kicker ${claro ? '!text-dourado' : ''}`}>{kicker}</p>
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
        Oferta de Natal · Acesso imediato · 7 dias de garantia
      </div>

      {/* ---------- HERO ---------- */}
      <header id="topo" className="relative overflow-hidden bg-creme">
        <div className="wrap grid items-center gap-8 pb-12 pt-6 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-10">
          <div className="text-center md:text-left">
            <Image src="/brand/logo-horizontal.png" alt={marca.nome} width={1056} height={192} priority className="mx-auto h-auto w-[210px] md:mx-0 md:w-[260px]" />
            <p className="kicker mt-6">Renda extra neste Natal</p>
            <h1 className="mt-3 text-[34px] font-extrabold leading-[1.06] text-verde md:text-[52px]">
              30 Kits de Natal para <span className="text-vermelho">Montar e Vender</span>
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-tinta/80 md:text-[19px]">
              Aprenda a montar presentes natalinos lindos usando <b className="text-verde">produtos prontos e baratos</b>, mesmo que você nunca tenha feito artesanato.
            </p>
            <div className="mt-6 md:hidden">
              <Foto src={imagens.heroMockup} alt="Mockup do produto: capa do material e kits de Natal montados" ratio="4 / 3" className="rounded-3xl" priority />
            </div>
            <ul className="mx-auto mt-6 max-w-[420px] space-y-2.5 text-left text-[15px] font-semibold text-tinta md:mx-0">
              {[
                ['Moldes prontos', 'para imprimir: tags, cartões e cintas'],
                ['Lista de materiais', 'de cada kit, com as quantidades'],
                ['Passo a passo com fotos', 'do começo ao laço final'],
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
            <div className="mt-7">
              <Cta href={ctaTopo} pulse>
                Quero meus 30 kits
              </Cta>
              <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12.5px] font-semibold text-cinza md:justify-start">
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
          </div>
          <div className="hidden md:block">
            <Foto src={imagens.heroMockup} alt="Mockup do produto: capa do material e kits de Natal montados" ratio="1 / 1" className="rounded-[32px]" priority />
          </div>
        </div>
        <div className="fita" />
      </header>

      <main>
        {/* ---------- FICHA DE EXEMPLO ---------- */}
        <Secao className="bg-papel">
          <Cabecalho kicker="Por dentro de cada kit" titulo="Cada kit vem com tudo explicado" sub="Foto do presente pronto, o que comprar, os moldes para imprimir e quanto custa montar. Veja um exemplo:" />
          <div className="card mx-auto mt-8 max-w-[860px] overflow-hidden md:grid md:grid-cols-[1fr_1.1fr]">
            <Foto src={imagens.fichaExemplo} alt={`Foto do ${fichaExemplo.nome} montado`} ratio="1 / 1" />
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
                  <p className="text-[18px] font-extrabold text-verde">{fichaExemplo.custo}</p>
                </div>
                <div className="rounded-2xl bg-creme p-3">
                  <p className="text-[11px] font-bold uppercase text-cinza">Montagem</p>
                  <p className="text-[18px] font-extrabold text-verde">{fichaExemplo.tempo}</p>
                </div>
                <div className="rounded-2xl bg-verde p-3 text-white">
                  <p className="text-[11px] font-bold uppercase text-white/75">Sugestão</p>
                  <p className="text-[18px] font-extrabold text-dourado">{fichaExemplo.venda}</p>
                </div>
              </div>
              <p className="mt-3 text-[12px] leading-snug text-cinza">Valores ilustrativos. Cada ficha mostra como calcular o custo com os preços da sua região.</p>
            </div>
          </div>
        </Secao>

        {/* ---------- COMO FUNCIONA ---------- */}
        <section className="neve relative bg-verde py-14 md:py-20">
          <div className="wrap">
            <Cabecalho claro kicker="Como funciona" titulo="Você não fabrica nada. Você monta." sub="O segredo está na combinação e na embalagem: produtos simples viram presentes que encantam." />
            <ol className="mt-10 grid gap-4 md:grid-cols-4">
              {[
                [Gift, 'Escolha', 'Separe os modelos que você mais gostou e que cabem no seu bolso.'],
                [ShoppingCart, 'Compre', 'Siga a lista de materiais: mercado, papelaria e loja de embalagens.'],
                [Scissors, 'Monte', 'Imprima os moldes e siga o passo a passo com fotos.'],
                [Store, 'Venda', 'Ofereça para amigos, família, vizinhos e colegas de trabalho.'],
              ].map(([Icon, t, d], i) => {
                const I = Icon as typeof Gift;
                return (
                  <li key={t as string} className="rounded-3xl bg-white/[0.07] p-5 ring-1 ring-white/15">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-dourado text-verde">
                        <I size={22} strokeWidth={2.4} />
                      </span>
                      <span className="text-[13px] font-extrabold uppercase tracking-widest text-dourado">Passo {i + 1}</span>
                    </div>
                    <h3 className="mt-4 text-[22px] font-extrabold text-white">{t as string}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-white/80">{d as string}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ---------- OBJEÇÕES ---------- */}
        <Secao>
          <Cabecalho kicker="Feito para quem nunca fez" titulo={<>Você não precisa de <span className="text-vermelho">nada disso</span></>} />
          <div className="mx-auto mt-8 grid max-w-[900px] gap-3 md:grid-cols-2">
            {[
              ['Saber fazer artesanato', 'Os kits usam produtos prontos. Você só monta e embala.'],
              ['Ter criatividade', 'Os 30 modelos já estão criados, com foto de como fica.'],
              ['Saber o que comprar', 'Cada kit tem a lista de materiais com as quantidades.'],
              ['Investir muito ou ter estoque', 'Comece com 3 ou 4 modelos e trabalhe por encomenda.'],
            ].map(([a, b]) => (
              <div key={a} className="card flex gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vermelho-claro text-vermelho">
                  <X size={20} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-[17px] font-extrabold text-verde">{a}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-cinza">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </Secao>

        {/* ---------- VITRINE ---------- */}
        <Secao id="kits" className="bg-papel">
          <Cabecalho kicker="Os 30 kits" titulo="Escolha seus favoritos e comece por eles" sub="Lembrancinhas econômicas, canecas, kits de spa, chocolates, presentes para professores e ideias diferentes." />
          <div className="mt-8">
            <KitsGrid />
          </div>
        </Secao>

        {/* ---------- O QUE VOCÊ RECEBE ---------- */}
        <Secao>
          <Cabecalho kicker="O que você recebe" titulo="Tudo pronto para reproduzir, não só ideias" />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              [Package, '30 modelos de kits', 'De lembrancinhas simples a caixas de presente mais completas.'],
              [Printer, 'Moldes para imprimir', 'Tags, cartões, etiquetas, cintas, fundos de saquinho e caixas.'],
              [ListChecks, 'Lista de materiais', 'O que comprar para cada kit, com quantidades e onde encontrar.'],
              [Scissors, 'Passo a passo com fotos', 'Da separação dos produtos ao laço e à tag no final.'],
              [Camera, 'Fotos de referência', 'Como cada presente fica pronto, para você reproduzir igual.'],
              [Calculator, 'Custos e preços', 'Exemplo de custo de cada kit e como pensar no preço de venda.'],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Gift;
              return (
                <div key={t as string} className="card p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-verde-claro text-verde">
                    <I size={22} strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-3 text-[17px] font-extrabold text-verde">{t as string}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-cinza">{d as string}</p>
                </div>
              );
            })}
          </div>

          <h3 className="mt-12 text-center text-[20px] font-extrabold text-verde">Veja as páginas por dentro</h3>
          <p className="mt-1 text-center text-[14px] text-cinza">Arraste para o lado</p>
          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
            {imagens.porDentro.map((p) => (
              <figure key={p.legenda} className="w-[72%] max-w-[300px] shrink-0 snap-center">
                <Foto src={p.img} alt={`Página do material: ${p.legenda}`} ratio="3 / 4" className="rounded-2xl shadow-card" sizes="300px" />
                <figcaption className="mt-2 text-center text-[13px] font-semibold text-cinza">{p.legenda}</figcaption>
              </figure>
            ))}
          </div>
        </Secao>

        {/* ---------- PARA QUEM É ---------- */}
        <Secao className="bg-papel">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Foto alt="Foto: mulher montando um kit de Natal na mesa da cozinha" ratio="4 / 3" className="rounded-3xl" />
            <div>
              <p className="kicker">Para quem é</p>
              <h2 className="titulo mt-3">Para quem quer aproveitar o Natal</h2>
              <ul className="mt-6 space-y-3 text-[16px] text-tinta">
                {[
                  'Quem quer fazer uma renda extra de casa neste fim de ano.',
                  'Quem nunca vendeu nada e quer começar com algo simples.',
                  'Quem não tem jeito para artesanato, mas gosta de presentear bonito.',
                  'Quem já vende doces ou artesanato e quer novos produtos para o Natal.',
                  'Quem quer presentear a família e os amigos gastando pouco.',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Heart size={20} className="mt-0.5 shrink-0 fill-vermelho text-vermelho" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Secao>

        {/* ---------- BÔNUS ---------- */}
        <Secao>
          <Cabecalho kicker="Bônus do Plano Completo" titulo={<>3 bônus para você <span className="text-vermelho">começar a vender</span></>} sub="Além de montar os kits, você recebe o caminho para divulgar e fechar as primeiras encomendas." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {bonus.map((b) => (
              <article key={b.n} className="card overflow-hidden">
                <Foto src={b.img} alt={`Capa do bônus ${b.n}: ${b.nome}`} ratio="4 / 3" />
                <div className="p-5">
                  <p className="selo">
                    <Gift size={13} /> Bônus {b.n}
                  </p>
                  <h3 className="mt-3 text-[18px] font-extrabold leading-snug text-verde">{b.nome}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-cinza">{b.desc}</p>
                  <p className="mt-4 text-[12px] font-extrabold uppercase tracking-wider text-vermelho">Incluído no Plano Completo</p>
                </div>
              </article>
            ))}
          </div>
        </Secao>

        {/* ---------- DEPOIMENTOS ---------- */}
        <Secao className="bg-papel">
          <Cabecalho kicker="Depoimentos" titulo="O que estão dizendo" sub="Mensagens de quem já recebeu o material." />
          <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {imagens.depoimentos.map((d) => (
              <Foto key={d.legenda} src={d.img} alt={d.legenda} ratio="9 / 16" className="w-[70%] max-w-[300px] shrink-0 snap-center rounded-3xl md:w-auto md:max-w-none" sizes="300px" />
            ))}
          </div>
        </Secao>

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
                  <li className="flex gap-2 text-cinza/80">
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

        {/* ---------- O NATAL TEM DATA ---------- */}
        <Secao className="bg-papel">
          <div className="mx-auto max-w-[760px]">
            <p className="kicker text-center">Não deixe para depois</p>
            <h2 className="titulo mt-3 text-center">O Natal tem data</h2>
            <p className="sub text-center">
              Faltam <b className="text-vermelho"><Countdown /> dias</b> para fechar as encomendas de Natal (20 de dezembro). Quem começa antes aproveita as confraternizações e o amigo-secreto.
            </p>
            <ol className="mt-8 space-y-3">
              {[
                ['Hoje', 'Escolha seus modelos e monte as primeiras amostras.'],
                ['Começo de dezembro', 'Divulgue para o amigo-secreto e as confraternizações de fim de ano.'],
                ['Até 20 de dezembro', 'Feche as encomendas de Natal.'],
                ['Até 24 de dezembro', 'Monte e entregue os presentes.'],
              ].map(([q, t], i) => (
                <li key={q} className="card flex items-center gap-4 p-4">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-extrabold ${i === 0 ? 'bg-vermelho text-white' : 'bg-creme text-verde'}`}>
                    {i === 0 ? <Sparkles size={18} /> : <CalendarDays size={18} />}
                  </span>
                  <p className="text-[15px] text-tinta">
                    <b className="text-verde">{q}:</b> {t}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-8 text-center">
              <Cta href="#planos">Quero começar hoje</Cta>
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
            <p className="mx-auto mt-3 max-w-[560px] text-[16px] text-white/80">30 modelos com moldes, lista de materiais e passo a passo. É só escolher, montar e oferecer.</p>
            <div className="mt-7">
              <Cta href="#planos" pulse>
                Quero meus 30 kits
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
    </>
  );
}

