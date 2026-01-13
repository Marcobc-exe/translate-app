import ax from "axios";

const BASE_URL = "https://api.mymemory.translated.net/";

export const api = ax.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
