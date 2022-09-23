export interface Serializable<T> {

  // deseriazation
deserialize(plainObject: any): T;
}

