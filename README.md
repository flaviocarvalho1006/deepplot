# 🎬 DeepPlot — Descoberta Cinematográfica Inteligente

Aplicação web progressiva (PWA) e híbrida (Web & Android TV) desenvolvida em **React** para exploração avançada de filmes através da API oficial do **TMDB (The Movie Database)**.

O **DeepPlot** elimina a fadiga de escolha das plataformas tradicionais ao permitir filtrar títulos por combinações temáticas, classificação etária, década de lançamento e país de origem, mantendo uma experiência fluida tanto no computador como no comando direcional (D-Pad) de uma televisão.

---

## ✨ Funcionalidades Principais

- **Equalizador de Filtros Multi-Critério:** Pesquisa dinâmica combinando géneros, temas específicos, classificação indicativa, décadas e países.
- **Arquitetura Híbrida (Desktop, Mobile & Android TV):** Interface adaptativa com gestão de foco por teclado e suporte nativo para navegação D-Pad de comandos de TV.
- **Gaveta de Favoritos Persistente:** Sistema reativo de gravação local (`localStorage`) com sincronização de estado em tempo real entre cartões e páginas de detalhes.
- **Canais Dinâmicos de Detalhes:** Visualização completa com sinopse, elenco, avaliação, trailers integrados e recomendações semelhantes.
- **Resiliência & UX Cinematográfica:** Gestão dedicada de estados de carregamento, tratamento de erros de rede e rota de fallback 404 personalizada.

---

## 🛠️ Stack Tecnológica & Arquitetura

- **Core:** React 18 + Vite
- **Roteamento:** React Router DOM (SPA)
- **Comunicação HTTP:** Axios (Instância centralizada com interceptors e variáveis de ambiente)
- **Estilização:** CSS Modules + CSS Variables (Design System modular e responsivo)
- **Mobile / TV Runtime:** Capacitor + Progressive Web App (Manifest & Icons)

---

## 📂 Arquitetura de Pastas

```text
src/
├── assets/        # Recursos estáticos e imagens otimizadas
├── components/    # Componentes modulares reutilizáveis (Filtros, Header, MovieCard, MovieGrid, Paginacao)
├── constants/     # Listas imutáveis de domínio (géneros, temas, países, décadas, classificações)
├── hooks/         # Custom Hooks de lógica isolada (useFavoritos com sincronização de eventos)
├── pages/         # Páginas da aplicação e rotas dinâmicas (Home, Detalhes, Favoritos, NaoEncontrada)
├── services/      # Configuração da instância Axios e comunicação com a API TMDB
├── App.jsx        # Componente raiz e estrutura global
├── main.jsx       # Ponto de entrada da aplicação React
└── routes.jsx     # Matriz de roteamento SPA