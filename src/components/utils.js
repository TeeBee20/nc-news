import axios from "axios";

const apiURL = axios.create({
  baseURL: "https://nc-news-backend-project.herokuapp.com/api",
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

export const postCommentByArticleId = async (id, username, body) => {
  console.log(id, username, body);
  const { data } = await apiURL.post(`/articles/${id}/comments`, {
    username: username,
    body: body,
  });

  return data.comment;
};

export const patchVotes = async (id, votes) => {
  const { data } = await apiURL.patch(`/articles/${id}`, { inc_votes: votes });
  return data.article;
};
