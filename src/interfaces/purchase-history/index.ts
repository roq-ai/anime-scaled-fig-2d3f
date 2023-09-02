import { UserInterface } from 'interfaces/user';
import { FigureInventoryInterface } from 'interfaces/figure-inventory';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseHistoryInterface {
  id?: string;
  user_id?: string;
  figure_id?: string;
  purchase_date: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  figure_inventory?: FigureInventoryInterface;
  _count?: {};
}

export interface PurchaseHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  figure_id?: string;
}
