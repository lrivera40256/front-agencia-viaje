import api from '@/interceptors/axiosInterceptor';

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

export interface ProfileDto {
  _id: string;
  phone?: string;
  user?: UserDto;
  photo?: PhotoDto | null;
  twoFactorEnabled?: boolean;
}

export async function changeProfilePassword(
  profileId: string,
  currentPassword: string,
  newPassword: string
) {
  return api.patch(`/profiles/${profileId}/password`, { currentPassword, newPassword });
}




export async function getProfile(): Promise<ProfileDto | null> {
  const { data } = await api.get(`/profiles/user`);
  return data ?? null;
}

export async function patchProfile(
  profileId: string,
  payload: { phone?: string; photoId?: string; user?: { name?: string; email?: string } }
): Promise<ProfileDto> {
  const { data } = await api.patch(`/profiles/${profileId}`, payload);
  return data;
}

export async function uploadProfilePhoto(profileId: string, file: File): Promise<ProfileDto> {
  const fd = new FormData();
  fd.append('file', file);
  const { data } = await api.patch(`/profiles/${profileId}/photo/upload`, fd);
  return data as ProfileDto;
}

export async function saveOAuthPhotoUrl(url: string): Promise<PhotoDto> {
  const params = new URLSearchParams();
  params.append('url', url);
  const { data } = await api.post(`/photos/oauth?${params.toString()}`);
  return data;
}

export function resolvePhotoUrl(p?: ProfileDto): string | undefined {
  return p?.photo?.url;
}

export async function toggle2FA(profileId: string, enable: boolean) {
  const { data } = await api.patch(`/profiles/${profileId}/twoFa`, { enable });
  return data as { twoFactorEnabled: boolean };
}