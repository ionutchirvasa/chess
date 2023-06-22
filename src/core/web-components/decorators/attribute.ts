import { CustomElement } from "../contracts/CustomElement";

export function attribute(name: string) {
  return function (
    target: CustomElement,
    propertName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const property = propertyDescriptor.value ? "value" : "set";

    if (target.constructor.registeredAttributes) {
      target.constructor.observedAttributes?.push(name);
      target.constructor.registeredAttributes.set(
        name,
        propertyDescriptor[property]
      );
    } else {
      target.constructor.observedAttributes = [name];
      target.constructor.registeredAttributes = new Map([
        [name, propertyDescriptor[property]],
      ]);
    }

    target.attributeChangedCallback = function (
      name,
      oldValue,
      newValue
    ): void {
      if (newValue === oldValue) return;

      target.constructor.registeredAttributes?.get(name)?.call(this, newValue);
    };

    return propertyDescriptor;
  };
}
