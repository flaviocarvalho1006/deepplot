import { useState } from "react";
import { GENRES } from "../../constants/genres";
import { THEMES } from "../../constants/themes";
import { COUNTRIES } from "../../constants/countries";
import { YEARS } from "../../constants/years";
import styles from "./Filtros.module.css";

function Filtros({ filtrosAtuais = {}, onFiltrar, onLimpar }) {
  const [genero, setGenero] = useState(filtrosAtuais.genero || "");
  const [tema1, setTema1] = useState(filtrosAtuais.tema1 || "");
  const [tema2, setTema2] = useState(filtrosAtuais.tema2 || "");
  const [pais, setPais] = useState(filtrosAtuais.pais || "");
  const [ano, setAno] = useState(filtrosAtuais.ano || "");
  const [rating, setRating] = useState(filtrosAtuais.rating || "");

  function handleEqualizar() {
    onFiltrar({
      genero,
      tema1,
      tema2,
      pais,
      ano,
      rating,
    });
  }

  function handleLimpar() {
    setGenero("");
    setTema1("");
    setTema2("");
    setPais("");
    setAno("");
    setRating("");
    onLimpar();
  }

  return (
    <div className={styles.filtrosContainer}>
      <div className={styles.filtrosForm}>
        <div className={styles.filtroCampo}>
          <label className={styles.filtroLabel}>Gênero:</label>
          <select
            className={styles.filtroSelect}
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="">Todos os Géneros</option>
            {GENRES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filtroCampo}>
          <label className={styles.filtroLabel}>Tema Principal:</label>
          <select
            className={styles.filtroSelect}
            value={tema1}
            onChange={(e) => setTema1(e.target.value)}
          >
            <option value="">Todos os Temas</option>
            {THEMES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filtroCampo}>
          <label className={styles.filtroLabel}>Subtema:</label>
          <select
            className={styles.filtroSelect}
            value={tema2}
            onChange={(e) => setTema2(e.target.value)}
          >
            <option value="">Todos os Subtemas</option>
            {THEMES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filtroCampo}>
          <label className={styles.filtroLabel}>País:</label>
          <select
            className={styles.filtroSelect}
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          >
            <option value="">Todos os Países</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filtroCampo}>
          <label className={styles.filtroLabel}>Ano:</label>
          <select
            className={styles.filtroSelect}
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          >
            <option value="">Todos os Períodos</option>
            {YEARS.map((y) => (
              <option key={y.value} value={y.value}>
                {y.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filtroCampo}>
          <label className={styles.filtroLabel}>Nota Mínima:</label>
          <select
            className={styles.filtroSelect}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Qualquer Nota</option>
            {[5, 6, 7, 8, 9].map((r) => (
              <option key={r} value={r}>
                {r}+ estrelas
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className={styles.botaoEqualizar}
          onClick={handleEqualizar}
        >
          Equalizar Filmes
        </button>

        <button
          type="button"
          className={styles.botaoLimpar}
          onClick={handleLimpar}
        >
          Limpar
        </button>
      </div>
    </div>
  );
}

export default Filtros;