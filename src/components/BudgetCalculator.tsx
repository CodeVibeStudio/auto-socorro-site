import { supabase } from "../lib/supabase";
import { siteConfig } from "../config/site";
import { useState, useEffect } from "react";

interface QuoteForm {
  serviceType: string;
  vehicleType: string;
  origin: string;
  destination: string;
  distance: number;
  observations: string;
}

// 1. A mágica acontece aqui: recebemos o telefone que o App.tsx nos entregou!
export function BudgetCalculator({ telefone }: { telefone?: string }) {
  const [pricing, setPricing] = useState(siteConfig.defaultPricing);

  useEffect(() => {
    async function fetchPrices() {
      const { data } = await supabase
        .from("pricing_rules")
        .select("*")
        .eq("active", true);

      if (data && data.length > 0) {
        const precosDoBanco: Record<string, any> = {};

        data.forEach((linha) => {
          precosDoBanco[linha.category] = {
            base: linha.base_price,
            includedKm: linha.included_km,
            extraKm: linha.price_per_extra_km,
          };
        });

        setPricing(precosDoBanco as any);
      }
    }

    fetchPrices();
  }, []);

  const [form, setForm] = useState<QuoteForm>({
    serviceType: "LEVE",
    vehicleType: "Carro",
    origin: "",
    destination: "",
    distance: 0,
    observations: "",
  });

  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();

    const rule =
      pricing[form.serviceType as keyof typeof pricing] || pricing.LEVE;

    let total = rule.base;
    if (form.distance > rule.includedKm) {
      const extraKm = form.distance - rule.includedKm;
      total += extraKm * rule.extraKm;
    }

    setEstimate(total);
  };

  const handleWhatsApp = () => {
    const msg = `Olá! Gostaria de solicitar um orçamento ao Auto Socorro Laranjal.\n\n*Serviço:* ${form.serviceType}\n*Veículo:* ${form.vehicleType}\n*Origem:* ${form.origin}\n*Destino:* ${form.destination}\n*Distância:* ${form.distance} km\n*Valor Estimado:* R$ ${estimate?.toFixed(2)}\n\n*Observações:* ${form.observations}\n\nGostaria de confirmar o atendimento.`;

    // 2. Usamos o telefone dinâmico (ou o plano B se o telefone vier vazio)
    const numeroFinal = telefone || siteConfig.contact.mainPhone;
    const link = `https://wa.me/55${numeroFinal}?text=${encodeURIComponent(msg)}`;

    window.open(link, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Calcular Orçamento Estimado
      </h2>

      <form onSubmit={calculateEstimate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoria do Serviço
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              value={form.serviceType}
              onChange={(e) =>
                setForm({ ...form, serviceType: e.target.value })
              }
            >
              <option value="LEVE">Guincho Leve (Carros)</option>
              <option value="UTILITARIO">
                Guincho Utilitário (SUVs, Pickups)
              </option>
              <option value="PESADO">Guincho Pesado (Caminhões)</option>
              <option value="MOTO">Guincho de Moto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distância Estimada (km)
            </label>
            <input
              type="number"
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={form.distance || ""}
              onChange={(e) =>
                setForm({ ...form, distance: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Origem (Cidade/Bairro)
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Destino (Cidade/Bairro)
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={form.destination}
              onChange={(e) =>
                setForm({ ...form, destination: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Observações Adicionais
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
            value={form.observations}
            onChange={(e) => setForm({ ...form, observations: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Calcular Estimativa
        </button>
      </form>

      {estimate !== null && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Resumo da Solicitação
          </h3>
          <div className="text-3xl font-bold text-orange-600 mb-2">
            R$ {estimate.toFixed(2)}*
          </div>
          <p className="text-xs text-gray-500 mb-6">
            *Este valor é uma estimativa. O valor final poderá variar conforme
            as condições do atendimento, rota, pedágios, acesso e necessidade de
            equipamentos extras no local.
          </p>

          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-md font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            ENVIAR ORÇAMENTO PELO WHATSAPP
          </button>
        </div>
      )}
    </div>
  );
}
