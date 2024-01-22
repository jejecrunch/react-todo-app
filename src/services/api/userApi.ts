import { instance } from '../instance';

export async function signup(user: User) {
  const res = await instance.post<{ token: string }>('/auth/signup', user, {
    headers: {
      Accept: 'application/json',
    },
  });

  return res;
}

export async function login(user: User) {
  const res = await instance.post<{ token: string }>('/auth/login', user, {
    headers: {
      Accept: 'application/json',
    },
  });

  return res;
}
