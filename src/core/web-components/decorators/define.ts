export function define(
  tag: string,
  options?: ElementDefinitionOptions
): (constructor: CustomElementConstructor) => void {
  return (constructor: CustomElementConstructor) => {
    if (!tag.includes("-")) {
      throw new Error(
        'Web Components tag names must containt at least one "-".'
      );
    }

    customElements.define(tag, constructor, options);
  };
}
