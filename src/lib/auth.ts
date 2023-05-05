import api from ".";

export const signIn = (accessToken: any) => {
  window.localStorage.setItem("Authorization", accessToken);

  window.location.reload();
};

export const getToken = () => window.localStorage.getItem("Authorization");

export const signOut = () => {
  localStorage.removeItem("Authorization");

  location.reload();
};
