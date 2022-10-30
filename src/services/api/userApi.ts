import { instance } from '../instance';

export async function signup(user: User) {
  const res = await instance.post<{ access_token: string }>(
    '/auth/signup',
    user,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  return res;
}

export async function login(user: User) {
  const res = await instance.post<{ access_token: string }>(
    '/auth/signin',
    user,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  return res;
}
