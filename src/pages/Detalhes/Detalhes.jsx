import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { buscarDetalhesFilme } from "../../services/api";
import { useFavoritos } from "../../hooks/useFavoritos";
import styles from "./DetalhesFilme.module.css";

function Detalhes() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const { adicionarFavorito, removerFavorito, verificarSeEFavorito } = useFavoritos();
  const ehFavorito = filme ? verificarSeEFavorito(filme.id) : false;

  useEffect(() => {
    async function carregarDetalhesFilme() {
      try {
        setCarregando(true);
        setErro(null);

        const dadosFilme = await buscarDetalhesFilme(id);
        setFilme(dadosFilme);
      } catch (err) {
        setErro("Não foi possível carregar as informações deste filme.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhesFilme();
  }, [id]);

  if (carregando) {
    return (
      <main className={styles.estadoContainer}>
        <p className={styles.textoLoading}>A carregar detalhes do filme...</p>
      </main>
    );
  }

  if (erro) {
    return (
      <main className={styles.estadoContainer}>
        <p className={styles.textoErro}>{erro}</p>
        <button
          type="button"
          className={styles.botaoRecarregar}
          onClick={() => window.location.reload()}
        >
          ↻ Tentar Novamente
        </button>
      </main>
    );
  }

  if (!filme) return null;

  const trailer = filme.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const urlPoster = filme.poster_path
    ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
    : "https://placehold.co/500x750?text=Sem+Poster";

  const urlBackdrop = filme.backdrop_path
    ? `https://image.tmdb.org/t/p/original${filme.backdrop_path}`
    : null;

  const anoLancamento = filme.release_date
    ? filme.release_date.split("-")[0]
    : "N/D";

  const notaFormatada = filme.vote_average
    ? filme.vote_average.toFixed(1)
    : "N/D";

  const termoBuscaTrailer = `${filme.title} ${anoLancamento !== "N/D" ? anoLancamento : ""} trailer`;
  const urlBuscaYoutube = `https://www.youtube.com/results?search_query=${encodeURIComponent(termoBuscaTrailer)}`;

  return (
    <main className={styles.detalhesContainer}>
      {urlBackdrop && (
        <div
          className={styles.backdrop}
          style={{ backgroundImage: `url(${urlBackdrop})` }}
        >
          <div className={styles.backdropOverlay} />
        </div>
      )}

      <div className={styles.conteudo}>
        <div className={styles.posterWrapper}>
          <img
            src={urlPoster}
            alt={filme.title}
            className={styles.posterImg}
          />
        </div>

        <div className={styles.infoTexto}>
          <h1 className={styles.titulo}>{filme.title}</h1>

          <div className={styles.metadados}>
            <span>{anoLancamento}</span>
            <div className={styles.badgeNota}>
              <span>★</span>
              <span>{notaFormatada}</span>
            </div>
          </div>

          <button
            className={`${styles.botaoFavorito} ${
              ehFavorito ? styles.botaoFavoritoAtivo : ""
            }`}
            onClick={
              ehFavorito
                ? () => removerFavorito(filme.id)
                : () => adicionarFavorito(filme)
            }
          >
            {ehFavorito ? "★ Guardado nos Favoritos" : "☆ Guardar nos Favoritos"}
          </button>

          <p className={styles.sinopse}>
            {filme.overview || "Sinopse não disponível para este filme."}
          </p>

          <section className={styles.seccaoTrailer}>
            <h2 className={styles.trailerTitulo}>Trailer Oficial</h2>
            {trailer ? (
              <div className={styles.videoContainer}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`Trailer de ${filme.title}`}
                  allowFullScreen
                />
              </div>
            ) : (
              <div>
                <p className={styles.sinopse}>
                  O leitor direto não está disponível na base de dados para este filme.
                </p>
                <a
                  href={urlBuscaYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.botaoFavorito}
                >
                  ▶ Ver Trailer Oficial no YouTube
                </a>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Detalhes;