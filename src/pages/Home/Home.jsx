import { useState, useEffect } from "react";
import Filtros from "../../components/Filtros/Filtros";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Paginacao from "../../components/Paginacao/Paginacao";
import { buscarFilmesPorFiltros, buscarFilmesPopulares } from "../../services/api";
import styles from "./Home.module.css";

function Home() {
  const [filmes, setFilmes] = useState(() => {
    const guardados = sessionStorage.getItem("deepplot_filmes");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [filtrosAtuais, setFiltrosAtuais] = useState(() => {
    const guardados = sessionStorage.getItem("deepplot_filtros");
    return guardados ? JSON.parse(guardados) : {};
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(() => {
    const guardado = sessionStorage.getItem("deepplot_pagina");
    return guardado ? Number(guardado) : 1;
  });
  const [totalPaginas, setTotalPaginas] = useState(() => {
    const guardado = sessionStorage.getItem("deepplot_total_paginas");
    return guardado ? Number(guardado) : 1;
  });

  const carregarFilmesIniciais = async (pagina = 1) => {
    setCarregando(true);
    setErro(null);

    try {
      const { filmes: lista, totalPaginas: total } = await buscarFilmesPopulares(pagina);
      setFilmes(lista);
      setTotalPaginas(total || 1);
      setPaginaAtual(pagina);
      sessionStorage.setItem("deepplot_filmes", JSON.stringify(lista));
      sessionStorage.setItem("deepplot_pagina", String(pagina));
      sessionStorage.setItem("deepplot_total_paginas", String(total || 1));
    } catch (err) {
      setErro("Erro de ligação à API. Verifica a consola.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (filmes.length === 0) {
      carregarFilmesIniciais();
    }
  }, []);

  const handleReceberFiltros = async (filtrosSelecionados, pagina = 1) => {
    setCarregando(true);
    setErro(null);
    setFiltrosAtuais(filtrosSelecionados);

    try {
      const { filmes: lista, totalPaginas: total } = await buscarFilmesPorFiltros(filtrosSelecionados, pagina);
      setFilmes(lista);
      setTotalPaginas(total || 1);
      setPaginaAtual(pagina);
      sessionStorage.setItem("deepplot_filmes", JSON.stringify(lista));
      sessionStorage.setItem("deepplot_filtros", JSON.stringify(filtrosSelecionados));
      sessionStorage.setItem("deepplot_pagina", String(pagina));
      sessionStorage.setItem("deepplot_total_paginas", String(total || 1));
    } catch (err) {
      setErro("Erro de ligação à API. Verifica a consola.");
    } finally {
      setCarregando(false);
    }
  };

  const handleLimparFiltros = () => {
    sessionStorage.removeItem("deepplot_filmes");
    sessionStorage.removeItem("deepplot_filtros");
    sessionStorage.removeItem("deepplot_pagina");
    sessionStorage.removeItem("deepplot_total_paginas");
    setFiltrosAtuais({});
    carregarFilmesIniciais(1);
  };

  const handleMudarPagina = (novaPagina) => {
    const temFiltrosAtivos = Object.keys(filtrosAtuais).length > 0;

    if (temFiltrosAtivos) {
      handleReceberFiltros(filtrosAtuais, novaPagina);
    } else {
      carregarFilmesIniciais(novaPagina);
    }

    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <main className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitulo}>
          Pára de Fazer Scroll.{" "}
          <span className={styles.destaqueNeon}>Vai Fundo no Cinema.</span>
        </h1>
        <p className={styles.heroSubtitulo}>
          Filtros cirúrgicos desenhados para encontrar o enredo exato que o algoritmo esconde de ti.
        </p>
      </section>

      <Filtros
        filtrosAtuais={filtrosAtuais}
        onFiltrar={handleReceberFiltros}
        onLimpar={handleLimparFiltros}
      />

      {carregando && (
        <p className={styles.statusMensagem}>
          A afinar frequências e a carregar filmes...
        </p>
      )}

      {erro && <p className={styles.statusMensagem}>{erro}</p>}

      {!carregando && !erro && filmes.length === 0 && (
        <p className={styles.statusMensagem}>
          Nenhum filme encontrado para os filtros selecionados.
        </p>
      )}

      {!carregando && !erro && filmes.length > 0 && (
        <>
          <MovieGrid filmes={filmes} />
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudarPagina={handleMudarPagina}
          />
        </>
      )}
    </main>
  );
}

export default Home;