import sinon, {
  SinonFakeXMLHttpRequestStatic,
  SinonFakeXMLHttpRequest,
} from "sinon";
import { expect } from "chai";
import { HTTPTransport } from ".";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let http: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];
  const data = { a: "a", b: "b" };

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    // @ts-expect-error

    global.XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    };

    http = new HTTPTransport("");
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  it("должен преобразовывать данные в query параметры url-адреса, если выбран метод get", () => {
    const apiURL = "https://ya-praktikum.tech/api/v2";
    const endpoint = "test";

    http.get(endpoint, data);
    const [request] = requests;

    expect(request.url).to.equal(`${apiURL}${endpoint}?a=a&b=b`);
  });

  it("тело запроса должно быть undefined, если выбран метод get", () => {
    http.get("/", data);
    const [request] = requests;
    expect(request.requestBody).to.equal(undefined);
  });

  it("тело запроса должно содержать данные в json-формате, если выбран метод post", () => {
    http.post("/", data);
    const [request] = requests;
    expect(request.requestBody).to.equal(JSON.stringify(data));
  });

  it("тело запроса должно содержать данные в json-формате, если выбран метод put", () => {
    http.put("/", data);
    const [request] = requests;
    expect(request.requestBody).to.equal(JSON.stringify(data));
  });

  it("тело запроса должно содержать данные в json-формате, если выбран метод delete", () => {
    http.delete("/", data);
    const [request] = requests;
    expect(request.requestBody).to.equal(JSON.stringify(data));
  });

  it("тело запроса должно содержать данные без преобразования, если данные класса FormData", () => {
    const formData = new FormData();
    http.post("/", formData);
    const [request] = requests;
    expect(request.requestBody).to.equal(formData);
  });
});
