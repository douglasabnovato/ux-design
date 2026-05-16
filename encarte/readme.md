# 📋 Encarte ABC da Construção

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/TR/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![Responsive Design](https://img.shields.io/badge/Responsive-✓-green)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

> Página de cadastro responsiva para download de encarte de ofertas mensais da **ABC da Construção**.

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Formulário](#estrutura-do-formulário)
- [Design System](#design-system)
- [Funcionalidades](#funcionalidades)
- [Dados Embarcados](#dados-embarcados)
- [Como Usar](#como-usar)
- [Roadmap](#roadmap)
- [Contato](#contato)

---

## 👁️ Visão Geral

Página de cadastro em **3 etapas** que coleta informações de localização e dados pessoais de clientes, disponibilizando download automático do encarte de ofertas.

**Stack tecnológico:**
- HTML5 semântico
- CSS3 com design tokens (custom properties)
- Vanilla JavaScript (sem dependências externas)
- 100% responsivo (mobile-first)

---

## 🏗️ Estrutura do Formulário

### 📍 Passo 1 — Localização

Seleção cascata de localização para direcionar a oferta:

```
Estado → Cidade → Guide Shop (loja mais próxima)
```

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| Estado | Select | ✅ | 27 UFs brasileiras |
| Cidade | Select | ✅ | Dinamicamente carregada |
| Guide Shop | Select | ✅ | Dinamicamente carregada |

---

### 👤 Passo 2 — Dados Pessoais

Coleta de informações para contato e CRM:

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| Nome | Text | ✅ | Texto simples |
| Sobrenome | Text | ✅ | Texto simples |
| WhatsApp | Tel | ✅ | Máscara: `(00) 00000-0000` |
| E-mail | Email | ✅ | Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Política de Privacidade | Checkbox | ✅ | Deve estar marcado |
| Consentimento Marketing | Checkbox | ☐ | Opcional |

**Validações em tempo real:**
- Email: marcado como `.valid` (borda verde) quando válido
- Email: marcado como `.invalid` (borda vermelha) quando inválido
- WhatsApp: máscara automática enquanto digita

---

### ✅ Passo 3 — Sucesso

Confirmação com download automático e opções de repetir ou reiniciar.

---

## 🎨 Design System

### 🌈 Paleta de Cores

```css
--red:       #c8102e   /* Brand primary */
--red-dark:  #9b0c22   /* Hover state */
--red-light: #f5e6e9   /* Background light */

--ink:       #1a1a1a   /* Text primary */
--ink-60:    #666      /* Text secondary */
--ink-30:    #b8b8b8   /* Text tertiary */
--ink-10:    #f0efee   /* Background subtle */

--white:     #ffffff   /* White */
--cream:     #faf9f7   /* Background principal */

--success:   #1a6b3c   /* Success state */
--success-bg:#e6f4ec   /* Success background */
```

### 🔤 Tipografia

| Uso | Font | Pesos |
|-----|------|-------|
| Display/Headings | `Cormorant Garamond` | 300, 400, 500, 600 |
| Body/UI | `DM Sans` | 300, 400, 500 |

**Importação:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
```

### 📏 Espaçamento & Raios

```css
--radius-sm: 6px      /* Inputs, small buttons */
--radius-md: 14px     /* Medium components */
--radius-lg: 24px     /* Cards, large buttons */

--shadow-card: 0 2px 6px rgba(0,0,0,.04), 0 20px 60px rgba(0,0,0,.10)
--shadow-lift: 0 4px 12px rgba(0,0,0,.06), 0 32px 80px rgba(0,0,0,.14)
```

### 🎬 Animações

| Animação | Duração | Easing |
|----------|---------|--------|
| `fadeSlideLeft` | 0.8s | cubic-bezier(.16,1,.3,1) |
| `fadeSlideRight` | 0.8s | cubic-bezier(.16,1,.3,1) |
| `fadeIn` | 0.35s | cubic-bezier(.16,1,.3,1) |
| `popIn` | 0.5s | cubic-bezier(.16,1,.3,1) |

---

## ⚙️ Funcionalidades

### ✨ Características Principais

- **Formulário em cascata**: Selects dinâmicos (estado → cidade → loja)
- **Validação em tempo real**: Email, tel, checkboxes com feedback visual
- **Máscara de telefone**: Formatação automática enquanto digita
- **Barra de progresso**: Visualização do progresso (0-100%)
- **Download automático**: Inicia download do encarte após envio
- **Responsivo**: Adapta-se automaticamente a qualquer tela
- **Estado de carregamento**: Spinner animado no botão de envio
- **Reset automático**: Limpa formulário para novo cadastro

### 🎯 Fluxo de Dados

```
┌─────────────────────────────────────────┐
│ Step 1: Localização                     │
│ - Estado, Cidade, Guide Shop            │
│ - Progress: 0% → 85%                    │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ Step 2: Dados Pessoais                  │
│ - Nome, Sobrenome, Tel, Email           │
│ - Checkboxes: Privacidade + Marketing   │
│ - Progress: 90% → 95%                   │
└────────────┬────────────────────────────┘
             │
             ↓
        [VALIDAÇÃO]
             │
             ↓
┌─────────────────────────────────────────┐
│ Envio de Dados (Salesforce)             │
│ - Loading state: 900ms                  │
│ - Download automático                   │
│ - Progress: 100%                        │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ Step 3: Sucesso                         │
│ - Ícone de sucesso animado              │
│ - Botões: Baixar novamente + Reset      │
└─────────────────────────────────────────┘
```

### 📊 Payload Enviado

```javascript
{
  // Localização
  state: "SP",
  city: "São Paulo",
  guide_shop: "ABC SP — Moema",
  
  // Dados Pessoais
  name: "João Silva",
  lastname: "Silva",
  email: "joao@example.com",
  tel: "11987654321",
  
  // Consentimentos
  privacyPolicy: true,
  marketingConsent: true,
  
  // CRM (Salesforce)
  firstName: "João",
  lastName: "Silva",
  idLead: "JoãoSilva11987654321",
  recordtypeDevName: "Expansao",
  company: "ABC",
  company2: "ABC Expansão",
  owner: "00GbJ0000062OFjUAM",
  canalDeEntrada: "Landing Page Encarte"
}
```

---

## 📦 Dados Embarcados

### 🗺️ Cobertura Geográfica

- **27 Estados brasileiros** (todas as UFs)
- **150+ Cidades** nas principais regiões
- **200+ Guide Shops** (lojas ABC distribuídas)

### 📍 Estrutura de Dados

```javascript
const DATA = {
  SP: {
    label: "São Paulo",
    cities: {
      "São Paulo": [
        "ABC SP — Moema",
        "ABC SP — Tatuapé",
        "ABC SP — Santo André",
        "ABC SP — Lapa"
      ],
      "Campinas": [
        "ABC Campinas — Cambuí",
        "ABC Campinas — Taquaral"
      ]
    }
  }
}
```

**Exemplo de UF:** São Paulo (SP)
- Cidades: 8
- Guide Shops: 18 lojas espalhadas

---

## 🚀 Como Usar

### 📋 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/encarte-abc-construcao.git
cd encarte-abc-construcao
```

2. Abra no navegador:
```bash
# Opção 1: Abrir diretamente
open encarte/index.html

# Opção 2: Usar um servidor local
python -m http.server 8000
# Acesse: http://localhost:8000/encarte/index.html
```

### 🔧 Configuração

#### Substituir Logo
Localize os SVGs inline e substitua pelos logos reais:
- Linha 659-664: Logo do header
- Linha 856-860: Logo do footer

#### Integrar com Salesforce
No arquivo `index.html`, encontre a função `handleSubmit()` (linha 1382):

```javascript
function handleSubmit() {
  // ... validação ...
  
  // TODO: Substituir setTimeout() por fetch real
  setTimeout(() => {
    // Aqui fazer POST para seu backend
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.data)
    })
    .then(res => res.json())
    .then(data => {
      triggerDownload();
      showStep(3);
    });
  }, 900);
}
```

#### Customizar Arquivo para Download
Localize a função `triggerDownload()` (linha 1418):

```javascript
function triggerDownload() {
  const link = document.createElement('a');
  link.href = 'caminho/para/encarte-2024-12.pdf'; // Altere aqui
  link.download = 'encarte-abc-novidades.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

---

## 📱 Responsividade

| Breakpoint | Layout | Cols |
|-----------|--------|------|
| Desktop | Grid 2 colunas | info (1fr) + card (520px) |
| Tablet (<960px) | Stack vertical | 1 coluna, fullwidth |
| Mobile (<480px) | Stack + comprimido | 1 coluna, inputs full |

**Testado em:**
- ✅ Chrome/Edge (Desktop)
- ✅ Safari (Desktop/Mobile)
- ✅ Firefox (Desktop)
- ✅ Mobile (iOS/Android)

---

## 🛣️ Roadmap

### v1.0 ✅
- [x] Formulário multietapas
- [x] Validação em tempo real
- [x] Responsivo mobile-first
- [x] Design system completo
- [x] Download automático

### v1.1 🔄 (Próximo)
- [ ] Integração com Salesforce API
- [ ] Analytics (GTM/GA4)
- [ ] A/B Testing (variações do encarte)
- [ ] Envio de confirmação por e-mail
- [ ] Suporte a múltiplos idiomas (PT-BR, ES, EN)

### v2.0 🚀 (Futuro)
- [ ] Sistema de notificações push
- [ ] Encarte em PDF dinâmico (gerado por Guide Shop)
- [ ] Dashboard de leads (admin)
- [ ] Integração com WhatsApp Business API
- [ ] Geolocalização automática

---

## 📸 Screenshots

> ⚠️ **Adicione aqui:**
> - Screenshot do Step 1 (desktop)
> - Screenshot do Step 2 (desktop)
> - Screenshot do Step 3 (desktop)
> - Screenshot responsivo (mobile)

---

## 🔐 Segurança & Privacidade

- ✅ HTTPS obrigatório em produção
- ✅ Validação de e-mail (regex + confirmação)
- ✅ Máscara de telefone (sem armazenar caracteres especiais)
- ✅ Política de Privacidade obrigatória
- ✅ Consentimento de Marketing (LGPD)
- ✅ Dados nunca são expostos no console (apenas log de desenvolvimento)

---

## 📞 Contato & Suporte

- **Issues**: [Abrir uma issue](https://github.com/seu-usuario/encarte-abc-construcao/issues)
- **E-mail**: seu-email@abcdaconstrucao.com.br
- **Slack**: #projeto-encarte

---

## 📄 Licença

MIT License © 2025 ABC da Construção LTDA

---

## 👏 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/melhorias`)
3. Commit suas mudanças (`git commit -am 'Adiciona melhorias'`)
4. Push para a branch (`git push origin feature/melhorias`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ pela equipe ABC da Construção**
