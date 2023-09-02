import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CollectorProfileInterface {
  id?: string;
  user_id?: string;
  collection_list?: string;
  wish_list?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CollectorProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  collection_list?: string;
  wish_list?: string;
}
