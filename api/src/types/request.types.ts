declare global {
  namespace Express {
    interface Request {
      profile?: {
        id: number;
        email: string;
        password: string;
        avatarUrl: string;
        isOnline: boolean;
        lastOnline: Date;
      };
    }
  }
}
