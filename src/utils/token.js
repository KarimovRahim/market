import { jwtDecode } from 'jwt-decode';

export function saveRegistToken(data) {
  if (data?.accessToken) {
    localStorage.setItem('token', data.accessToken);
    if (data.userId || data.id) {
      localStorage.setItem('userID', data.userId || data.id);
    }
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  } else {
    console.warn('❗ Нет accessToken в ответе:', data);
  }
}

export function saveToken(data) {
  if (data?.accessToken) {
    localStorage.setItem('token', data.accessToken);
    if (data.userId || data.id) {
      localStorage.setItem('userID', data.userId || data.id);
    }
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  } else {
    console.warn('❗ Нет accessToken в ответе:', data);
  }
}

export function saveId(data) {
  if (data?.userId || data?.id) {
    localStorage.setItem('userID', data.userId || data.id);
  } else {
    console.warn('❗ Нет userId в ответе:', data);
  }
}

export function getUserId() {
  const userID = localStorage.getItem('userID');
  return userID || null;
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function deleteToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  localStorage.removeItem('user');
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token || typeof token !== 'string') return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error);
    return null;
  }
}