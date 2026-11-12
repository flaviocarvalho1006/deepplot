import { Link } from "react-router-dom";
import styles from "./NaoEncontrada.module.css";

function NaoEncontrada() {
  return (
    <main className={styles.container}>
      <h1 className={styles.codigoErro}>404</h1>
      <h2 className={styles.subtitulo}>Sinal Perdido no Hiperespaço</h2>

      <p className={styles.descricao}>
        A coordenada que inseriste não existe na nossa base de dados ou foi descontinuada.
      </p>

      <Link to="/" className={styles.botaoVoltar}>
        ⮌ Regressar à Base
      </Link>
    </main>
  );
}

export default NaoEncontrada;