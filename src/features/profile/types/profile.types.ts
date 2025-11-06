
export interface UserDto {
  _id: string;
  name: string;
  email: string;
  isOauth?: boolean;
}

export interface PhotoDto {
  _id: string;
  url: string;
}
export interface Profile {
  _id: string;
  phone?: string;
  user?: UserDto;
  photo?: PhotoDto | null;
  twoFactorEnabled?: boolean;
}