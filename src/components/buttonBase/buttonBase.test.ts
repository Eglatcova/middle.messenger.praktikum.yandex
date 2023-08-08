import { expect } from "chai";
import sinon from "sinon";
import { ButtonBase } from "./index";

describe("Button component", () => {
  const label = "Label";
  const callback = sinon.stub();

  it("должна содержать переданный лейбл", () => {
    const button = new ButtonBase({
      label,
    });
    const { element } = button;

    expect(element.textContent).to.eq(`${label}`);
  });

  it("должен вызываться коллбыэк при клике", () => {
    const button = new ButtonBase({
      label,
      events: { click: callback },
    });
    const { element } = button;

    element.click();

    expect(callback.calledOnce).to.eq(true);
  });
});
