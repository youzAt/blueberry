import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-blueberry-v.liara.run/api",
});