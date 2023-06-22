import { Component } from "./Component";

export abstract class StyledComponent extends Component {
  public get root(): ShadowRoot {
    return this.shadowRoot || this.attachShadow({ mode: "open" });
  }

  public build(): void {
    super.build();

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(this.setStyle()));

    this.root.prepend(style);
  }

  public abstract setStyle(): string;
}
