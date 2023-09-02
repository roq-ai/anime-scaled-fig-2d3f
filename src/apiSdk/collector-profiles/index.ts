import axios from 'axios';
import queryString from 'query-string';
import { CollectorProfileInterface, CollectorProfileGetQueryInterface } from 'interfaces/collector-profile';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCollectorProfiles = async (
  query?: CollectorProfileGetQueryInterface,
): Promise<PaginatedInterface<CollectorProfileInterface>> => {
  const response = await axios.get('/api/collector-profiles', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCollectorProfile = async (collectorProfile: CollectorProfileInterface) => {
  const response = await axios.post('/api/collector-profiles', collectorProfile);
  return response.data;
};

export const updateCollectorProfileById = async (id: string, collectorProfile: CollectorProfileInterface) => {
  const response = await axios.put(`/api/collector-profiles/${id}`, collectorProfile);
  return response.data;
};

export const getCollectorProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/collector-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCollectorProfileById = async (id: string) => {
  const response = await axios.delete(`/api/collector-profiles/${id}`);
  return response.data;
};
