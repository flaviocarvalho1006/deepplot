import styles from "./Paginacao.module.css";

function Paginacao({ paginaAtual, totalPaginas, onMudarPagina }) {
  if (totalPaginas <= 1) {
    return null;
  }

  const maxBotoesVisiveis = 7;
  let inicio = Math.max(1, paginaAtual - Math.floor(maxBotoesVisiveis / 2));
  let fim = Math.min(totalPaginas, inicio + maxBotoesVisiveis - 1);

  if (fim - inicio + 1 < maxBotoesVisiveis) {
    inicio = Math.max(1, fim - maxBotoesVisiveis + 1);
  }

  const paginas = [];
  for (let i = inicio; i <= fim; i++) {
    paginas.push(i);
  }

  return (
    <nav className={styles.paginacaoContainer} aria-label="Navegação de páginas">
      <button
        type="button"
        className={styles.botao}
        onClick={() => onMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        «
      </button>

      {paginas.map((numero) => {
        const estaAtivo = numero === paginaAtual;
        return (
          <button
            key={numero}
            type="button"
            className={`${styles.botao} ${estaAtivo ? styles.ativo : ""}`}
            onClick={() => onMudarPagina(numero)}
            aria-current={estaAtivo ? "page" : undefined}
          >
            {numero}
          </button>
        );
      })}

      <button
        type="button"
        className={styles.botao}
        onClick={() => onMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        »
      </button>
    </nav>
  );
}

export default Paginacao;