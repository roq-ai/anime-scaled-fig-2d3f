import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DiscussionBoardInterface {
  id?: string;
  topic: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DiscussionBoardGetQueryInterface extends GetQueryInterface {
  id?: string;
  topic?: string;
  user_id?: string;
}
