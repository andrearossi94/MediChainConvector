export interface JwtPayload {
  exp: number;
  iat: number;
  sub: string | number;
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: string;
}
