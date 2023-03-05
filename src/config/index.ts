export namespace Config {
  export const level = process.env.NODE_ENV === 'development' ? 0 : 3;
}
