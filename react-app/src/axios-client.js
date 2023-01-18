import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

/**
 * Interceptors are special functions which will be executed
 * before the request is sent ot ater the response is received.
 * .use() accepts 2 functions onFulfilled (the Promise is resolved) and onRejected.
 *
 * HTTP 401 Unauthorized:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
 *
 * HTTP 422 Validation error: (see Signup.jsx)
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
 */

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Destructure the error object and get
    // the actual response from the server.
    const { response } = error;

    // If the server response authorization is incorrect
    // (expired token or incorrect) then remove the access token.
    // Otherwise candle the other type of errors:
    // on 404 show Page not found, etc... not implemented.
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
    }

    throw error;
  }
);

export default axiosClient;
