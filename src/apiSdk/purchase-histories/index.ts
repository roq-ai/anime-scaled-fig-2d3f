import axios from 'axios';
import queryString from 'query-string';
import { PurchaseHistoryInterface, PurchaseHistoryGetQueryInterface } from 'interfaces/purchase-history';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPurchaseHistories = async (
  query?: PurchaseHistoryGetQueryInterface,
): Promise<PaginatedInterface<PurchaseHistoryInterface>> => {
  const response = await axios.get('/api/purchase-histories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPurchaseHistory = async (purchaseHistory: PurchaseHistoryInterface) => {
  const response = await axios.post('/api/purchase-histories', purchaseHistory);
  return response.data;
};

export const updatePurchaseHistoryById = async (id: string, purchaseHistory: PurchaseHistoryInterface) => {
  const response = await axios.put(`/api/purchase-histories/${id}`, purchaseHistory);
  return response.data;
};

export const getPurchaseHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/purchase-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePurchaseHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/purchase-histories/${id}`);
  return response.data;
};
