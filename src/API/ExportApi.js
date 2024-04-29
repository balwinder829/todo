import { BaseApi } from "./BaseApi";
//Auth
const UserLogin = (email, password) => BaseApi.post("login", { email: email, password: password });

const Register = (email, password, first_name, last_name, mobile) =>
  BaseApi.post(
    "register",
    {
      email: email,
      password: password,
      mobile: mobile,
      last_name: last_name,
      first_name: first_name,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

const CreatedToDo = (obj, token) =>
  BaseApi.post("todo/add", obj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

const updateToDo = (obj, token) =>
  BaseApi.post("todo/update", obj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

const getData = (page, token) =>
  BaseApi.get(
    `todo/list?per_page=20&page=${page}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

const GetTimezoneregionData = () =>
  BaseApi.get(
    "timezone_region",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );

const GetTags = () =>
  BaseApi.get(
    "tags",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );

const GetCountryData = () =>
  BaseApi.get(
    "country",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );

  const getAuthToken = (obj, token) =>
  BaseApi.post("generate_auth_token", obj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });


export default {
  UserLogin,
  Register,
  CreatedToDo,
  getData,
  updateToDo,
  GetTimezoneregionData,
  GetTags,
  GetCountryData,
  getAuthToken,
};
