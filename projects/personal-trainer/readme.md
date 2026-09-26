# 🏋️ Personal Trainer — Landing Page

Landing Page moderna e responsiva para personal trainers, pronta para atrair clientes, coletar leads e apresentar serviços com profissionalismo.

---

## 💼 Para Profissionais (Clientes)

Esta landing page foi criada para personal trainers que desejam:

- 📱 Receber contatos direto no WhatsApp
- 📝 Coletar leads via formulário integrado (Formspree)
- ⚡ Ter site rápido e responsivo (carrega em <2s)
- 🔍 SEO otimizado para buscadores
- 🧪 Teste A/B da seção principal (Hero)

**Destaques do projeto:**

- Design moderno, mobile-first e responsivo
- Headline clara com CTA estratégico
- Sessão de planos (Start / Pro / Elite) com destaque para o recomendado
- Depoimentos de clientes como prova social
- Integração com Google Analytics 4

Ideal para personal trainers que querem uma solução direta, moderna e funcional para vender seus serviços online.

---

## 🛠️ Para Desenvolvedores (Parte Técnica)

### Stack utilizada

- **HTML5** — Estrutura semântica (`header`, `section`, `footer`)
- **CSS3** — Layout responsivo, variáveis CSS, media queries
- **JavaScript (Vanilla)** — Scripts organizados por funcionalidade

### Estrutura de pastas

```text
PERSONAL-TRAINER/
│
├─ .github/                  # Configurações do GitHub (workflows, templates)
├─ .history/                 # Histórico de arquivos (gerado pelo VSCode ou extensão)
├─ assets/                   # Recursos estáticos
│   ├─ icons/                # Ícones
│   │   └─ logo.svg
│   └─ imgs/                 # Imagens diversas do projeto
├─ css/
│   └─ style.css             # Estilos CSS da landing page
├─ script/                   # Scripts JavaScript separados
│   ├─ ab-test.js            # Teste A/B do hero
│   ├─ analytics.js          # Configurações e eventos GA4
│   ├─ contact.js            # Funções do formulário
│   ├─ script.js             # Script principal / inicialização
│   └─ whatsapp.js           # Funções do botão WhatsApp
├─ .gitignore
├─ index.html                # Página principal da LP
├─ readme.md                 # Documentação do projeto
├─ robots.txt                # Configurações de rastreamento para buscadores
└─ sitemap.xml               # Sitemap para SEO

```

### ✅ Benefícios dessa modularização

- Manutenção facilitada: Cada script faz apenas uma coisa (Single Responsibility Principle).
- Reuso: Você pode importar funções específicas em várias páginas ou componentes.
- Leitura clara: Um dev novo consegue entender rapidamente qual arquivo mexer.
- Escalabilidade: Se quiser adicionar testes A/B, GA4 ou WhatsApp avançado, só cria funções nesses módulos.

## Trechos de código importantes

### 1️⃣ Teste A/B do Hero

```js
(function () {
  const KEY = "lp_hero_variant";
  let variant = localStorage.getItem(KEY);
  if (!variant) {
    variant = Math.random() > 0.5 ? "B" : "A";
    localStorage.setItem(KEY, variant);
  }

  const heroH1 = document.querySelector(".hero h1");
  if (heroH1 && variant === "B") {
    heroH1.textContent =
      "Resultados rápidos, treinos inteligentes: seu personal trainer online e acessível.";
  }

  if (typeof gtag === "function") {
    gtag("event", "view_hero_ab", { variation: variant });
  }
})();
```

### 2️⃣ Botão de WhatsApp com mensagem dinâmica

```js
function openWhatsApp(message) {
  const phone = "5532988367667"; // DDI + DDD + número
  const text = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}
```

### 3️⃣ Formulário com envio via Fetch (Formspree)

```js
async function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  try {
    const resp = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    if (resp.ok) {
      alert("Mensagem enviada!");
      form.reset();
    } else {
      alert("Não foi possível enviar. Tente pelo WhatsApp.");
    }
  } catch (err) {
    alert("Erro de conexão. Tente novamente.");
  }
}
```

### ✅ Resposta de envio de form

- Experiência 100% inline: usuário permanece na LP.
- Modal elegante com cores, fontes e sombra da LP.
- Botão Fechar para retomar a navegação normalmente.
- Compatível com Formspree, sem necessidade de redirecionar.
- Feedback visual imediato com ícone de sucesso (✅).

#### ✅ Melhorias desta versão

- Animação suave: modal aparece com fade-in e zoom, saindo com fade-out.
- Fechamento automático: o modal desaparece após 5 segundos, garantindo que o usuário volte à navegação.
- Botão “Fechar”: permite interação manual, caso o usuário queira fechar antes.
- Experiência moderna: mantém a LP totalmente inline, sem redirecionamentos.
- Visual consistente: cores, sombras e bordas seguem a identidade visual da landing page.

### 4️⃣ Evento de clique no WhatsApp (GA4)

```js
document.querySelectorAll("a").forEach((link) => {
  if (link.href.includes("wa.me")) {
    link.addEventListener("click", () => {
      gtag("event", "click_whatsapp", {
        event_category: "engagement",
        event_label: "WhatsApp CTA",
      });
    });
  }
});
```

### 5️⃣ JSON-LD para SEO

```js
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Seu Nome - Personal Trainer",
  "jobTitle": "Personal Trainer",
  "description": "Treinos personalizados presenciais e online",
  "url": "https://seudominio.com/",
  "email": "mailto:contato@seudominio.com",
  "telephone": "+5500000000000",
  "sameAs": ["https://instagram.com/", "https://www.linkedin.com/"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Planos",
    "itemListElement": [
      { "@type": "Offer", "name": "Start", "price": "199", "priceCurrency": "BRL" },
      { "@type": "Offer", "name": "Pro", "price": "349", "priceCurrency": "BRL" },
      { "@type": "Offer", "name": "Elite", "price": "699", "priceCurrency": "BRL" }
    ]
  }
}
</script>

```

### ✅ Boas práticas aplicadas

- Scripts organizados e isolados por funcionalidade
- Layout fluido e mobile-first
- Persistência do teste A/B via localStorage
- Variáveis globais para configuração (GA_ID, FORM_ENDPOINT, DOMAIN)
- Sem dependências externas → performance otimizada

### ✅ Imagens

- unsplash : https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=256&q=80&auto=format&fit=crop
- criando originais
- criar logo
- criar favicon
- criar banners

### ✅ Seções do site

- home
- serviços
- planos
- contato

### ⚡ Melhorias futuras

- Separar CSS/JS em arquivos externos
- Alt descritivo em todas as imagens
- Pequenas animações no Hero e microinterações para UX

### 📌 Próximos passos para personalização

- ⚙️ Substituir telefone do WhatsApp e links de redes sociais
- 📝 Atualizar headline, planos e depoimentos
- 🌐 Publicar via GitHub Pages ou Vercel
- 📊 Configurar Google Analytics 4 e SEO (sitemap.xml, robots.txt)
