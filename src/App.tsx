import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import {
  Phone,
  MapPin,
  Clock,
  Shield,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "./config/site";
import { BudgetCalculator } from "./components/BudgetCalculator";
import logo from "./assets/logo.png";

function App() {
  // 1. Preparamos o terreno com os valores padrão (Plano B)
  const [telefone, setTelefone] = useState(siteConfig.contact.mainPhone);
  const [email, setEmail] = useState(siteConfig.contact.email);

  // 2. O espião que busca os dados no Supabase
  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1);

      if (data && data.length > 0) {
        // Se encontrou no banco, substitui!
        if (data[0].whatsapp_number) setTelefone(data[0].whatsapp_number);
        if (data[0].contact_email) setEmail(data[0].contact_email);
      }
    }
    fetchSettings();
  }, []);

  // 3. Montamos o link dinâmico com o telefone que veio do banco
  const mensagemPadrao = "Olá! Preciso de atendimento. Pode me ajudar?";
  const whatsappMsg = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagemPadrao)}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* HEADER */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Auto Socorro Laranjal"
              className="h-14 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl font-bold tracking-wider leading-none">
                AUTO SOCORRO
              </h1>
              <span className="text-sm text-blue-400 font-semibold tracking-widest">
                LARANJAL
              </span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 font-medium text-sm">
            <a href="#inicio" className="hover:text-orange-500 transition">
              Início
            </a>
            <a href="#sobre" className="hover:text-orange-500 transition">
              Empresa
            </a>
            <a href="#servicos" className="hover:text-orange-500 transition">
              Serviços
            </a>
            <a href="#orcamento" className="hover:text-orange-500 transition">
              Orçamento
            </a>
          </nav>
          <a
            href={whatsappMsg}
            target="_blank"
            rel="noreferrer"
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md font-bold flex items-center gap-2 transition"
          >
            <Phone className="h-4 w-4" />
            ACIONAR 24H
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="bg-slate-800 text-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1605648873760-449e5d4de75b?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-xs mb-6">
              ATENDIMENTO 24 HORAS
            </div>
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Assistência 24 horas <br />
              <span className="text-orange-500">quando você mais precisa.</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              Guincho, transporte de veículos e assistência automotiva na Zona
              da Mata Mineira e em todo o território intermunicipal e
              interestadual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappMsg}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-md text-center text-lg flex items-center justify-center gap-2 transition shadow-lg"
              >
                <Phone className="h-5 w-5" /> Acionar Agora
              </a>
              <a
                href="#orcamento"
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-md text-center text-lg transition border border-slate-500"
              >
                Calcular Orçamento
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <Clock className="h-10 w-10 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Atendimento 24h</h3>
                <p className="text-sm text-slate-600">
                  Disponibilidade total, dia e noite, finais de semana e
                  feriados.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="h-10 w-10 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">≈ 50 Anos de Tradição</h3>
                <p className="text-sm text-slate-600">
                  Experiência e confiança construídas ao longo de décadas.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-10 w-10 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Atuação Ampla</h3>
                <p className="text-sm text-slate-600">
                  Atendimento regional, intermunicipal e interestadual.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Wrench className="h-10 w-10 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Estrutura Própria</h3>
                <p className="text-sm text-slate-600">
                  Amplo pátio para estadia de veículos e frota diversificada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Somos prestadores de serviços de reboque e assistência 24 horas na
            cidade de Laranjal/MG e na Zona da Mata Mineira. Atuamos há cerca de
            50 anos no mercado, construindo nossa trajetória através da
            experiência, confiança e compromisso com nossos clientes e
            parceiros.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Atendemos seguradoras, associações e clientes particulares,
            oferecendo serviços de assistência automotiva, reboque, transporte e
            apoio ao motorista com máxima eficiência e segurança.
          </p>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Equipamentos adequados para cada necessidade. Atendimento ágil
              para garantir a integridade do seu veículo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Reboque / Guincho Leve",
              "Reboque Utilitário",
              "Guincho Pesado",
              "Reboque de Motos",
              "Troca de Pneus",
              "Carga de Bateria",
              "Pane Seca",
              "Chaveiro / Abertura",
            ].map((servico, i) => (
              <div
                key={i}
                className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition bg-slate-50 flex items-center justify-between group"
              >
                <span className="font-bold text-slate-800">{servico}</span>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-orange-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORÇAMENTO */}
      <section id="orcamento" className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Solicitar Orçamento</h2>
            <p className="text-slate-600">
              Calcule uma estimativa e envie direto para o nosso WhatsApp.
            </p>
          </div>
          <BudgetCalculator />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t-4 border-orange-500">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">
              Auto Socorro Laranjal
            </h3>
            <p className="mb-2">Razão Social: {siteConfig.legalName}</p>
            <p className="mb-6">CNPJ: {siteConfig.cnpj}</p>
            <p className="text-sm">
              © {new Date().getFullYear()} - Todos os direitos reservados.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
            <p className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-orange-500" /> {telefone}{" "}
              (WhatsApp)
            </p>
            <p className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-orange-500" />{" "}
              {siteConfig.address.base}
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.social.instagram}
                  className="hover:text-white transition"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.facebook}
                  className="hover:text-white transition"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a
        href={whatsappMsg}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50"
        aria-label="Falar no WhatsApp"
      >
        <Phone className="h-8 w-8" />
      </a>
    </div>
  );
}

export default App;
