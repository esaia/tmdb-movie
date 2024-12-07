import axios from 'axios';

// axios.defaults.withCredentials = true;
// axios.defaults.withXSRFToken = true;

export const qtvBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  withCredentials: true,
  withXSRFToken: true,
});

export const tmdbAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TBDB,

  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TBDB_API}`,
    Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
});
