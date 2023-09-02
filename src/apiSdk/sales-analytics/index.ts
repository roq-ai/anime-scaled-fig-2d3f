import axios from 'axios';
import queryString from 'query-string';
import { SalesAnalyticsInterface, SalesAnalyticsGetQueryInterface } from 'interfaces/sales-analytics';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSalesAnalytics = async (
  query?: SalesAnalyticsGetQueryInterface,
): Promise<PaginatedInterface<SalesAnalyticsInterface>> => {
  const response = await axios.get('/api/sales-analytics', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSalesAnalytics = async (salesAnalytics: SalesAnalyticsInterface) => {
  const response = await axios.post('/api/sales-analytics', salesAnalytics);
  return response.data;
};

export const updateSalesAnalyticsById = async (id: string, salesAnalytics: SalesAnalyticsInterface) => {
  const response = await axios.put(`/api/sales-analytics/${id}`, salesAnalytics);
  return response.data;
};

export const getSalesAnalyticsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sales-analytics/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSalesAnalyticsById = async (id: string) => {
  const response = await axios.delete(`/api/sales-analytics/${id}`);
  return response.data;
};
