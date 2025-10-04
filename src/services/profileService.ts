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
  twoFactorEnabled?: boolean; // <-- NUEVO / ahora el front lo lee de Profile
}

export async function changeProfilePassword(
  profileId: string,
  currentPassword: string,
  newPassword: string
) {
  return api.patch(`/profiles/${profileId}/password`, { currentPassword, newPassword });
}

export function decodeJwt<T = any>(token: string): T | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function getUserIdFromToken(): { id?: string } {
  const token = localStorage.getItem('token');
  if (!token) return {};
  const payload = decodeJwt<any>(token);
  return { id: payload?._id || payload?.sub || payload?.id };
}

export async function fetchProfileByUserId(userId: string): Promise<ProfileDto | null> {
  const { data } = await api.get(`/profiles/user/${userId}`);
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
  const { data } = await api.patch(`/profiles/${profileId}/2fa`, { enable });
  return data as { twoFactorEnabled: boolean };
}