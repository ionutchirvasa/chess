export interface CustomElement {
  constructor: Function & {
    observedAttributes?: string[];
    registeredAttributes?: Map<string, (v: unknown) => void>;
  };

  attributeChangedCallback?(
    name: string,
    oldValue: string,
    newValue: string
  ): void;

  disconnectedCallback?(): void;
}
