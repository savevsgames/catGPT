// extending the request interface by adding an optional user peoperty on.This is used under middleware/auth.ts

declare namespace Express {
  interface Request {
    user?: {
      username: string;
    };
  }
}
