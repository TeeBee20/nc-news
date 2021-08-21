import axios from "axios";
import { DateTime } from "luxon";

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

export const articleImages = {
  coding: {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqA9PIxfN7tyfECj2eqc1Y261iteXpQtkr3Q&usqp=CAU",
    description: "Software developer examining her code",
  },
  cooking: {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiW7LaMpFHlapc28ZMH-N6ek48RUe0Qw0vA&usqp=CAU",
    description: "Chef making a healthy meal",
  },
  football: {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTya-0mjp6H0wNe3djgk7PcJEj0S4-rxfCKGg&usqp=CAU",
    description: "Footballer showing off his skills",
  },
};

export const createTimeObj = (str) => {
  const timeObj = DateTime.fromISO(str)
    .diffNow(["months", "years", "minutes", "hours", "days"])
    .toObject();
  return timeObj;
};

export const formatPostedTimeAgo = (dateObj) => {
  for (const key in dateObj) {
    dateObj[key] = Math.floor(Math.abs(dateObj[key]));
  }
  if (dateObj.years) {
    return `${dateObj.years} year${dateObj.years > 1 ? "s" : ""}`;
  } else if (dateObj.months) {
    return `${dateObj.months} month${dateObj.months > 1 ? "s" : ""}`;
  } else if (dateObj.days) {
    return `${dateObj.days} day${dateObj.days > 1 ? "s" : ""}`;
  } else if (dateObj.hours) {
    return `${dateObj.hours} hour${dateObj.hours > 1 ? "s" : ""}`;
  } else {
    return `${dateObj.minutes} min${dateObj.minutes > 1 ? "s" : ""}`;
  }
};

export const sortByTime = (commentsArr) => {
  const sortedComments = commentsArr.map((comment) => {
    comment.date_time = DateTime.fromISO(comment.created_at);
    return comment;
  });
  sortedComments.sort((a, b) => {
    return b.date_time - a.date_time;
  });
  return sortedComments;
};
