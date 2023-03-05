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

type HTTPMethod = (
  url: string,
  options: XMLHttpRequestOptions
) => Promise<unknown>;

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
  get = (
    url: string,
    options: XMLHttpRequestOptions
  ): Promise<XMLHttpRequest> =>
    this.request(url, { ...options, method: METHODS.GET });

  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.POST });

  put: HTTPMethod = (url: string, options) =>
    this.request(url, { ...options, method: METHODS.PUT });

  delete: HTTPMethod = (url: string, options) =>
    this.request(url, { ...options, method: METHODS.DELETE });

  request = (url: string, options: XMLHttpRequestOptions, timeout = 5000) => {
    const { method, data } = options;

    const promise: Promise<XMLHttpRequest> = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const urlWithQuery = (currUrl: string) =>
        `${currUrl}${queryStringify(data)}`;
      const newUrl = method === METHODS.GET && data ? urlWithQuery(url) : url;
      xhr.open(method, newUrl);

      xhr.timeout = timeout;

      xhr.setRequestHeader("Content-Type", "text/plain");

      xhr.onreadystatechange = () => {
        resolve(xhr);
      };

      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });

    return promise;
  };
}

export { HTTPTransport };
