// src/config/site.ts

export const siteConfig = {
  name: "Auto Socorro Laranjal",
  legalName: "SILVIO AMADEU BOALENTO & CIA LTDA",
  cnpj: "19.481.019/0001-25",
  description: "Assistência 24 horas, guincho e transporte de veículos na Zona da Mata Mineira.",
  
  contact: {
    mainPhone: "32999657935", // Formato para links
    mainPhoneDisplay: "(32) 99965-7935",
    secondaryPhones: ["(32) 99183-4692", "(32) 98466-4986"],
    email: "soslaranjalmg@gmail.com",
    manager: "Silvia Boalento"
  },
  
  address: {
    base: "BR-116 Km 735, Zona Rural, Laranjal/MG, CEP 36760-000",
    postal: "Caixa Postal 2, Centro, Laranjal/MG, CEP 36760-000",
    mapsUrl: "[CONFIGURAÇÃO NECESSÁRIA - INSERIR URL DO GOOGLE MAPS]"
  },

  social: {
    instagram: "https://instagram.com/autosocorrolaranjalmg",
    facebook: "https://www.facebook.com/autosocorro.laranjal"
  },

  // Preços default (Fallback caso o Supabase falhe ou esteja offline)
  defaultPricing: {
    LEVE: { base: 160, includedKm: 40, extraKm: 3.10 },
    UTILITARIO: { base: 250, includedKm: 40, extraKm: 3.30 },
    PESADO: { base: 500, includedKm: 40, extraKm: 5.50 },
    MOTO: { base: 150, includedKm: 40, extraKm: 2.90 }
  }
};

export const generateWhatsAppLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/55${siteConfig.contact.mainPhone}?text=${encoded}`;
};
