import axios from 'axios';

export const get = (url: string, params: {}) => {
    return axios.get(url, params);
};

export const post = (url: string, payload?: {}, params?: {}): Promise<any> => {
    return axios.post(url, payload, params);
};
