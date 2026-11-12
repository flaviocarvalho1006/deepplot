import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css";
import { useFavoritos } from "../../hooks/useFavoritos";

function MovieCard({ filme }) {
  const urlPoster = filme.poster_path
    ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
    : "https://placehold.co/500x750?text=Sem+Poster";

  const anoLancamento = filme.release_date
    ? filme.release_date.split("-")[0]
    : "N/D";

  const notaFormatada = filme.vote_average
    ? filme.vote_average.toFixed(1)
    : "N/D";

  const navigate = useNavigate();
  const { adicionarFavorito, removerFavorito, verificarSeEFavorito } = useFavoritos();
  const ehFavorito = verificarSeEFavorito(filme.id);

  const abrirDetalhes = () => {
    navigate(`/filme/${filme.id}`);
  };

  const travarPropagacao = (e) => {
    e.stopPropagation();
  };

  const handleAlternarFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (ehFavorito) {
      removerFavorito(filme.id);
    } else {
      adicionarFavorito(filme);
    }
  };

  const handleFocus = (e) => {
    if (!e.currentTarget.matches(":focus-visible")) return;

    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    const cardAtual = e.currentTarget;
    const parent = cardAtual.parentElement;
    if (!parent) return;

    const todosCards = Array.from(parent.children);
    const indexAtual = todosCards.indexOf(cardAtual);
    if (indexAtual === -1) return;

    const linhaTopo = todosCards[0].offsetTop;
    const colunas = todosCards.filter((c) => c.offsetTop === linhaTopo).length || 1;

    const proximoIndex =
      e.key === "ArrowDown" ? indexAtual + colunas : indexAtual - colunas;

    if (proximoIndex >= 0 && proximoIndex < todosCards.length) {
      e.preventDefault();
      todosCards[proximoIndex].focus();
    }
  };

  return (
    <div
      className={styles.card}
      onClick={abrirDetalhes}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      tabIndex={0}
      role="button"
    >
      <div className={styles.posterContainer}>
        <img src={urlPoster} alt={filme.title} className={styles.poster} />

        <button
          type="button"
          className={`${styles.botaoFavorito} ${
            ehFavorito ? styles.botaoFavoritoAtivo : ""
          }`}
          onClick={handleAlternarFavorito}
          onMouseDown={(e) => {
            e.preventDefault();
            travarPropagacao(e);
          }}
          aria-hidden="true"
          tabIndex={-1}
        >
          {ehFavorito ? "♥" : "♡"}
        </button>

        <div className={styles.badgeNota}>
          <span>★</span>
          <span>{notaFormatada}</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.titulo}>{filme.title}</h3>
        <p className={styles.meta}>{anoLancamento}</p>
      </div>
    </div>
  );
}

export default MovieCard;