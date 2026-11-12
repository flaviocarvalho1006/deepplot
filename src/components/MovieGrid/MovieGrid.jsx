import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieGrid.module.css";

function MovieGrid({ filmes }) {
  if (!filmes || filmes.length === 0) {
    return (
      <p className={styles.mensagemVazia}>
        Nenhum filme encontrado. Ajusta os teus filtros e tenta novamente.
      </p>
    );
  }

  return (
    <section className={styles.gridContainer}>
      {filmes.map((filme) => (
        <MovieCard key={filme.id} filme={filme} />
      ))}
    </section>
  );
}

export default MovieGrid;