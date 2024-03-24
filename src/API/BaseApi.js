import { create } from "apisauce";
const BaseApi = create({
  baseURL: "https://todoapi.ecodingninja.com/api/",
  headers: { Authorization: localStorage.getItem("Token") },
});
const BaseUrlImage = "";
export { BaseApi, BaseUrlImage };
