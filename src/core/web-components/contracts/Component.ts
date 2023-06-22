import { CustomElement } from "./CustomElement";

export abstract class Component extends HTMLElement implements CustomElement {
  public constructor() {
    super();

    this.build();
  }

  public get root(): HTMLElement | ShadowRoot {
    return this;
  }

  protected build(): void {
    const template = document.createElement("template");
    const content = this.render();

    if (typeof content === "string") {
      template.innerHTML = content.trim();
    } else if(content instanceof HTMLTemplateElement){
      template.append(template.content.cloneNode(true));
    } 
    else {
      template.append(content);
    }

    this.root.prepend(template.content.cloneNode(true));
  }

  public abstract render(): string | HTMLElement;
}
