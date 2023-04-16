/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// Intentionally do not include all the prototype (Except for getters and setters) 
// because it contains inherited methods (hasOwnProperty, etc.). Also ignore symbols
// because it is tricky to pass a path to a symbol.
//
// We'd have to go through a serialization and deserialization logic
// which will add unnecessary complexity.
export const getKeys = (obj: {}): string[] => {
  if (!obj) {
    return [];
  }
  const properties = Object.getOwnPropertyNames(obj);

  const prototypeMembers = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(obj));

  const ignoreList = ['__proto__'];
  const gettersAndSetters = Object.keys(prototypeMembers).filter(methodName => {
    if (ignoreList.includes(methodName)) {
      return false;
    }
    const targetMethod = prototypeMembers[methodName];

    return targetMethod.get || targetMethod.set;
  })

  return properties.concat(gettersAndSetters);
};

/**
 * This helper function covers the common scenario as well as the getters and setters
 * @param instance The target object
 * @param propName The string representation of the target property name
 * @returns The Descriptor object of the property
 */
export const getDescriptor = (instance: any, propName: string) =>
    Object.getOwnPropertyDescriptor(instance, propName) ||
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), propName);
