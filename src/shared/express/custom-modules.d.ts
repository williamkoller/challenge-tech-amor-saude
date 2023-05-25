interface IUser {
  id: number;
}

declare namespace Express {
  interface Request {
    user: IUser;
  }
}
