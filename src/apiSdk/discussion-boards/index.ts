import axios from 'axios';
import queryString from 'query-string';
import { DiscussionBoardInterface, DiscussionBoardGetQueryInterface } from 'interfaces/discussion-board';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDiscussionBoards = async (
  query?: DiscussionBoardGetQueryInterface,
): Promise<PaginatedInterface<DiscussionBoardInterface>> => {
  const response = await axios.get('/api/discussion-boards', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDiscussionBoard = async (discussionBoard: DiscussionBoardInterface) => {
  const response = await axios.post('/api/discussion-boards', discussionBoard);
  return response.data;
};

export const updateDiscussionBoardById = async (id: string, discussionBoard: DiscussionBoardInterface) => {
  const response = await axios.put(`/api/discussion-boards/${id}`, discussionBoard);
  return response.data;
};

export const getDiscussionBoardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/discussion-boards/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDiscussionBoardById = async (id: string) => {
  const response = await axios.delete(`/api/discussion-boards/${id}`);
  return response.data;
};
