import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://65a11b9d600f49256fb0ed64.mockapi.io/transactions',
});
