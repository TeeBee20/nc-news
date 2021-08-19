import axios from "axios";

const apiURL = axios.create({
  baseURL: "https://nc-news-tb20.herokuapp.com/api",
});

export const fetchTopics = async () => {
  const { data } = await apiURL.get("/topics");
  return data.topics;
};

export const fetchAllArticles = async () => {
  const { data } = await apiURL.get("/articles");
  return data.articles;
};

export const fetchArticlesByTopic = async (topic) => {
  const { data } = await apiURL.get(`/articles?topic=${topic}`);
  return data.articles;
};

export const fetchArticlesById = async (id) => {
  const { data } = await apiURL.get(`/articles/${id}`);

  return data.article;
};

export const fetchCommentsByArticleId = async (id) => {
  const { data } = await apiURL.get(`/articles/${id}/comments`);
  return data.comments;
};

export const postCommentByArticleId = async (id, comment) => {
  const { data } = await apiURL.post(`/articles/${id}/comments`, comment);

  return data.comment;
};

export const patchVotes = async (id, votes) => {
  const { data } = await apiURL.patch(`/articles/${id}`, { inc_votes: votes });
  return data.article;
};

export const sortArticlesByQuery = async (query) => {
  const { data } = await apiURL.get(`/articles?sort_by=${query}`);

  if (query === "created_at") {
    const { data } = await apiURL.get(`/articles?order=asc`);
    return data.articles;
  }

  return data.articles;
};

export const articleImage = (topic_slug) => {
  if (topic_slug === "coding") {
    return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.techrepublic.com%2Farticle%2Fsoftware-lessons-from-hbos-silicon-valley%2F&psig=AOvVaw1rBOgdkeLD9d5LOKs9y50u&ust=1626536795102000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLjDrfr35_ECFQAAAAAdAAAAABAD";
  }
};
