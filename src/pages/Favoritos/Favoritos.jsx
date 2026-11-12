import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavoritos } from "../../hooks/useFavoritos";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Paginacao from "../../components/Paginacao/Paginacao";
import styles from "./Favoritos.module.css";

function Favoritos() {
  const { favoritos } = useFavoritos();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 20;

  const totalPaginas = Math.ceil(favoritos.length / itensPorPagina);
  const indiceUltimoFilme = paginaAtual * itensPorPagina;
  const indicePrimeiroFilme = indiceUltimoFilme - itensPorPagina;
  const filmesPaginados = favoritos.slice(indicePrimeiroFilme, indiceUltimoFilme);

  const handleMudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.titulo}>Os Meus Favoritos</h1>

      {favoritos.length === 0 ? (
        <div className={styles.vazioContainer}>
          <p className={styles.vazioTexto}>
            O teu arquivo pessoal de filmes ainda está sem registos guardados.
          </p>
          <Link to="/" className={styles.botaoExplorar}>
            ▶ Explorar Catálogo
          </Link>
        </div>
      ) : (
        <>
          <MovieGrid filmes={filmesPaginados} />
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

export default Favoritos;