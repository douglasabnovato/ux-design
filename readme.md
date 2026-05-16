# 🎨 UX Design - Portfólio de Projetos

> Uma plataforma moderna e elegante para showcasing de projetos UX/UI Design com interface intuitiva e responsiva.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Ativo-brightgreen)](https://github.com/douglasabnovato/ux-design)

---

## ✨ Destaques

- 🎯 **Interface Moderna** - Design dark theme com estética profissional
- 📱 **Totalmente Responsivo** - Adaptável para desktop, tablet e mobile
- ⚡ **Performance Otimizada** - Carregamento rápido e animações suaves
- 🎭 **Animações Elegantes** - Efeitos visuais sofisticados e feedback interativo
- 🌐 **Navegação Intuitiva** - Acesso fácil a todos os projetos
- ♿ **Acessível** - Suporte a navegação por teclado e screen readers

---

## 📂 Estrutura do Projeto

```
ux-design/
├── index.html                    # Página principal (portfólio)
├── style.css                     # Estilos globais
├── script.js                     # Interatividade e animações
├── README.md                     # Este arquivo
└── projects/                     # Pasta contendo todos os projetos
    ├── uma-franquia/
    │   └── index.html
    ├── seja-um-franqueado/
    │   └── index.html
    ├── encarte/
    │   └── index.html
    ├── clube-spfc/
    │   └── index.html
    ├── clube-crf/
    │   └── index.html
    └── clube-cam/
        └── index.html
```

---

## 🚀 Início Rápido

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Nenhuma dependência externa necessária!

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/douglasabnovato/ux-design.git
   cd ux-design
   ```

2. **Abra a página principal**
   ```bash
   # Opção 1: Abra direto no navegador
   open index.html
   
   # Opção 2: Use um servidor local (recomendado)
   python -m http.server 8000
   # ou
   npx http-server
   ```

3. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

---

## 📋 Projetos Inclusos

| Projeto | Descrição | Link |
|---------|-----------|------|
| 🏪 **Uma Franquia** | Landing page de franquia com design moderno e conversão otimizada | [`projects/uma-franquia/`](projects/uma-franquia/) |
| 💼 **Seja um Franqueado** | Plataforma para potenciais franqueados se cadastrarem e conhecer a oportunidade | [`projects/seja-um-franqueado/`](projects/seja-um-franqueado/) |
| 📄 **Encarte** | Catálogo digital interativo com apresentação de produtos e serviços | [`projects/encarte/`](projects/encarte/) |
| ⚽ **Clube SPFC** | Portal do clube com informações, eventos e engajamento de torcedores | [`projects/clube-spfc/`](projects/clube-spfc/) |
| 🏆 **Clube CRF** | Plataforma comunitária do clube com atualizações e programa de membros | [`projects/clube-crf/`](projects/clube-crf/) |
| 🎯 **Clube CAM** | Interface moderna para gerenciar eventos e conectar membros do clube | [`projects/clube-cam/`](projects/clube-cam/) |

---

## 🎨 Tecnologias Utilizadas

### Frontend
- **HTML5** - Semântica e estrutura
- **CSS3** - Estilos, animações e responsividade
- **JavaScript (Vanilla)** - Interatividade sem dependências

### Design
- **Dark Theme** - Interface moderna com fundo escuro
- **Color Palette**: 
  - Primária: `#00d4d4` (Cyan)
  - Secundária: `#0a0e27` (Azul Escuro)
  - Background: `#0f1419` (Preto)
  - Cards: `#1a1f2e` (Cinza Escuro)

---

## 🎭 Recursos Principais

### 1. **Grid Responsivo**
- 6 colunas em desktop
- Adaptação automática para tablet (3-4 colunas)
- 1 coluna em mobile

### 2. **Animações & Interações**
- ✨ Efeito ripple ao clicar
- 🎯 Hover com elevação (transform)
- 💫 Glow effect com box-shadow
- 🎬 Animação progressiva de entrada
- 🔄 Transições suaves (300ms)

### 3. **Funcionalidades**
- 🔗 Navegação direta para projetos
- 🖱️ Feedback visual ao interagir
- ⌨️ Navegação por teclado
- 📊 Console logging para tracking

---

## 🛠️ Como Usar

### Navegando pelo Portfólio
1. Abra `index.html` no navegador
2. Veja o grid com 6 cards de projetos
3. Clique em qualquer card para abrir o projeto
4. Use os efeitos hover para visualizar interações

### Adicionando Novos Projetos
1. Crie uma pasta em `projects/novo-projeto/`
2. Adicione um `index.html` nela
3. Atualize o HTML principal com um novo card:

```html
<a href="projects/novo-projeto/index.html" class="project-card">
    <div class="card-icon">🎨</div>
    <h2>Novo Projeto</h2>
    <p>Descrição do seu projeto aqui</p>
</a>
```

---

## 💻 Detalhes Técnicos

### CSS - Variáveis Globais
```css
:root {
    --primary-color: #00d4d4;
    --secondary-color: #0a0e27;
    --dark-bg: #0f1419;
    --card-bg: #1a1f2e;
    --text-light: #e0e0e0;
    --text-dim: #a0a0a0;
    --transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### JavaScript - Recursos
- Animação de cards ao carregar (staggered)
- Ripple effect ao clicar
- Logger de interações
- Detecção de suporte CSS
- Navegação com feedback

---

## 📱 Responsividade

| Dispositivo | Breakpoint | Colunas |
|-------------|-----------|---------|
| Desktop | > 1024px | 6 |
| Tablet | 768px - 1024px | 3-4 |
| Mobile | < 768px | 1-2 |

---

## 🎯 Roadmap

- [ ] Adicionar filtros por categoria
- [ ] Implementar busca de projetos
- [ ] Dark/Light mode toggle
- [ ] Animações de page transition
- [ ] Sistema de tags/labels
- [ ] Modal preview de projetos
- [ ] Seção de sobre/contato

---

## 🐛 Troubleshooting

### Cards não aparecem
- Verifique se os caminhos dos projetos estão corretos
- Abra o console (F12) e procure por erros

### Animações travadas
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Desabilite extensões do navegador
- Teste em outro navegador

### Links não funcionam
- Certifique-se de estar usando um servidor local
- Verifique se os arquivos index.html existem nas pastas dos projetos

---

## 🌐 Compatibilidade

| Navegador | Versão | Suporte |
|-----------|--------|--------|
| Chrome | 90+ | ✅ Completo |
| Firefox | 88+ | ✅ Completo |
| Safari | 14+ | ✅ Completo |
| Edge | 90+ | ✅ Completo |
| IE 11 | - | ❌ Não suportado |

---

## 👨‍💻 Desenvolvimento

### Estrutura de Arquivos Explicada

**index.html**
- Estrutura semântica dos cards
- Links para projetos
- Referência aos estilos e scripts

**style.css**
- Design system com variáveis CSS
- Grid responsivo
- Animações e transições
- Media queries para responsividade

**script.js**
- Inicialização de eventos
- Efeitos interativos (ripple)
- Logging e analytics
- Acessibilidade (keyboard navigation)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Douglas Abnovato**
- GitHub: [@douglasabnovato](https://github.com/douglasabnovato)
- Portfólio: [ux-design](https://github.com/douglasabnovato/ux-design)

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Sinta-se livre para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

---

## 📞 Suporte

Encontrou um problema? Abra uma [issue](https://github.com/douglasabnovato/ux-design/issues) no GitHub!

---

<div align="center">

### ⭐ Se gostou do projeto, deixe uma estrela! ⭐

Feito com ❤️ por [Douglas Abnovato](https://github.com/douglasabnovato)

</div>