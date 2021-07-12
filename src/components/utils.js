import axios from "axios";

const apiURL = axios.create({
  baseURL: "https://nc-news-backend-project.herokuapp.com/api",
});

export const fetchTopics = async () => {
  const { data } = await apiURL.get("/topics");
  return data.topics;
};
