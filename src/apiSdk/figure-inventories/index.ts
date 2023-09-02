import axios from 'axios';
import queryString from 'query-string';
import { FigureInventoryInterface, FigureInventoryGetQueryInterface } from 'interfaces/figure-inventory';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFigureInventories = async (
  query?: FigureInventoryGetQueryInterface,
): Promise<PaginatedInterface<FigureInventoryInterface>> => {
  const response = await axios.get('/api/figure-inventories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFigureInventory = async (figureInventory: FigureInventoryInterface) => {
  const response = await axios.post('/api/figure-inventories', figureInventory);
  return response.data;
};

export const updateFigureInventoryById = async (id: string, figureInventory: FigureInventoryInterface) => {
  const response = await axios.put(`/api/figure-inventories/${id}`, figureInventory);
  return response.data;
};

export const getFigureInventoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/figure-inventories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFigureInventoryById = async (id: string) => {
  const response = await axios.delete(`/api/figure-inventories/${id}`);
  return response.data;
};
