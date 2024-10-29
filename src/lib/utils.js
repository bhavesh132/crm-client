import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL;

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const token = JSON.parse(localStorage.getItem('token'))

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `Token ${token}` : '',
  },
});


export const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    console.log(cookie)
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}