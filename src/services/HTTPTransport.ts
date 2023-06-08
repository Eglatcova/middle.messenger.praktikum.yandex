enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface XMLHttpRequestOptions {
  data: any;
  method: METHODS;
}

type HTTPMethod = <Response = void>(
  url: string,
  data?: any
) => Promise<Response>;

const queryStringify = (data: any) => {
  const searchParams: string[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      searchParams.push(`${key}=${value.join(",")}`);
    } else if (typeof value === "object") {
      searchParams.push(`${key}=[object Object]`);
    } else {
      searchParams.push(`${key}=${value}`);
    }
  });

  return `?${searchParams.join("&")}`;
};

class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (path, data) =>
    this.request(`${this.endpoint}${path}`, {
      data,
      method: METHODS.GET,
    });

  public post: HTTPMethod = (path, data) =>
    this.request(`${this.endpoint}${path}`, {
      data,
      method: METHODS.POST,
    });

  public put: HTTPMethod = (path, data) =>
    this.request(`${this.endpoint}${path}`, {
      data,
      method: METHODS.PUT,
    });

  public delete: HTTPMethod = (path, data) =>
    this.request(`${this.endpoint}${path}`, {
      data,
      method: METHODS.DELETE,
    });

  private request = <Response>(
    url: string,
    options: XMLHttpRequestOptions,
    timeout = 5000
  ): Promise<Response> => {
    const { method, data } = options;

    const promise: Promise<Response> = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const urlWithQuery = (currUrl: string) =>
        `${currUrl}${queryStringify(data)}`;
      const newUrl = method === METHODS.GET && data ? urlWithQuery(url) : url;
      xhr.open(method, newUrl);

      xhr.timeout = timeout;

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        console.log("tut");

        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });

    return promise;
  };
}

export { HTTPTransport };
