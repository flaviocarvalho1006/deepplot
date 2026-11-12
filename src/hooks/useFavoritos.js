import { useState, useEffect } from "react";

const CHAVE_STORAGE = "@deepplot_favoritos";
const EVENTO_FAVORITOS = "deepplot_favoritos_atualizados";

function obterFavoritosDoDisco() {
  try {
    const dadosNoDisco = localStorage.getItem(CHAVE_STORAGE);
    return dadosNoDisco ? JSON.parse(dadosNoDisco) : [];
  } catch (erro) {
    console.error("Erro ao ler favoritos do disco:", erro);
    return [];
  }
}

function gravarFavoritosNoDisco(lista) {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
    window.dispatchEvent(new Event(EVENTO_FAVORITOS));
  } catch (erro) {
    console.error("Erro ao gravar favoritos no disco:", erro);
  }
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState(obterFavoritosDoDisco);

  useEffect(() => {
    const sincronizar = () => {
      setFavoritos(obterFavoritosDoDisco());
    };

    window.addEventListener(EVENTO_FAVORITOS, sincronizar);
    window.addEventListener("storage", sincronizar);

    return () => {
      window.removeEventListener(EVENTO_FAVORITOS, sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const adicionarFavorito = (filme) => {
    const atuais = obterFavoritosDoDisco();
    const jaExiste = atuais.some((f) => f.id === filme.id);
    if (jaExiste) return;

    const atualizados = [...atuais, filme];
    gravarFavoritosNoDisco(atualizados);
  };

  const removerFavorito = (id) => {
    const atuais = obterFavoritosDoDisco();
    const atualizados = atuais.filter((f) => f.id !== id);
    gravarFavoritosNoDisco(atualizados);
  };

  const verificarSeEFavorito = (id) => {
    return favoritos.some((f) => f.id === id);
  };

  return {
    favoritos,
    adicionarFavorito,
    removerFavorito,
    verificarSeEFavorito,
  };
}