const helpHttp = () => {
  const customFetch = async (enpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    options.method = options.method || "GET";

    const controller = new AbortController();
    options.signal = controller.signal;

    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = options.body ? JSON.stringify(options.body) : false;
    if (!options.body) delete options.body;

    setTimeout(() => {
      controller.abort();
    }, 10000);

    try {
      const req = await fetch(enpoint, options);
      if (!req.ok) {
        throw {
          err: true,
          status: req.status || "00",
          statusText: req.statusText || "Ocurrio un error",
        };
      }
      return await req.json();
    } catch (error) {
      Promise.reject(error);
    }
  };

  const get = (url, options = {}) => {
    return customFetch(url, options);
  };
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };
  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default helpHttp;
