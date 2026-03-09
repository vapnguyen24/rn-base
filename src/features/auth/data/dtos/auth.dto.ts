// Raw shapes returned by the API. Never exported outside the data layer.
export interface LoginResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    display_name: string;
    avatar_url: string | null;
    role: 'admin' | 'user';
    created_at: string; // ISO 8601
  };
}

export interface RefreshTokenResponseDto {
  access_token: string;
  refresh_token: string;
}
