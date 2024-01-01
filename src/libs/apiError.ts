export default class ApiError extends Error {
    code: string;
    constructor(message:string, customCode:string) {
      super(message);
      this.code = customCode;
    }
  }