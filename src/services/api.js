import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export async function buscarFilmesPorFiltros({ genero, tema1, tema2, pais, ano, rating } = {}, page = 1) {
  const params = {
    api_key: API_KEY,
    language: "en-US",
    sort_by: "popularity.desc",
    include_adult: "false",
    page: page,
  };

  if (genero) params.with_genres = genero;
  if (pais) params.with_origin_country = pais;
  if (ano) params.primary_release_year = ano;
  if (rating) params["vote_average.gte"] = rating;

  const keywords = [tema1, tema2].filter(Boolean).join(",");
  if (keywords) params.with_keywords = keywords;

  const resposta = await api.get("/discover/movie", { params });

  return {
    filmes: resposta.data.results,
    totalPaginas: Math.min(resposta.data.total_pages, 500),
  };
}

export async function buscarFilmesPopulares(page = 1) {
  return await buscarFilmesPorFiltros({}, page);
}

export async function buscarDetalhesFilme(id) {
  const resposta = await api.get(`/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      append_to_response: "videos",
    },
  });

  return resposta.data;
}

export default api;