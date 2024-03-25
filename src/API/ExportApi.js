import { BaseApi } from "./BaseApi";
//Auth
const UserLogin = (email, password) =>
  BaseApi.post("login", { email: email, password: password });
const Register = (email, password,first_name,last_name,mobile) =>
  BaseApi.post("register", { email: email, password: password,mobile:mobile,last_name:last_name,first_name:first_name },{
    headers: {
      'Content-Type': 'application/json',
    }
  });
const UserForgot = (email) => BaseApi.post("forgot-password", { email: email });
const UserForgotResetPasswordPost = (Token, new_pass, confirm_pass) =>
  BaseApi.post(
    "forgot-reset-password",
    { new_pass: new_pass, confirm_pass: confirm_pass },
    {
      headers: {
        reset_token: Token,
      },
    }
  );
const ResetPasswordPost = (old_pass, new_pass, confirm_pass) =>
  BaseApi.post(
    "reset-password",
    { old_pass: old_pass, new_pass: new_pass, confirm_pass: confirm_pass },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UserLogout = () =>
  BaseApi.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetTimezoneData = () =>
  BaseApi.get(
    "timezone",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
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
export default {
  UserLogin,
  Register,
  UserForgot,
  UserForgotResetPasswordPost,
  ResetPasswordPost,
  UserLogout,
  GetTimezoneData,
  GetTimezoneregionData,
  GetTags,
  GetCountryData,
};
