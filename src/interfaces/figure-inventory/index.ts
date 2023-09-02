import { PurchaseHistoryInterface } from 'interfaces/purchase-history';
import { SalesAnalyticsInterface } from 'interfaces/sales-analytics';
import { StoreInterface } from 'interfaces/store';
import { GetQueryInterface } from 'interfaces';

export interface FigureInventoryInterface {
  id?: string;
  figure_name: string;
  store_id?: string;
  created_at?: any;
  updated_at?: any;
  purchase_history?: PurchaseHistoryInterface[];
  sales_analytics?: SalesAnalyticsInterface[];
  store?: StoreInterface;
  _count?: {
    purchase_history?: number;
    sales_analytics?: number;
  };
}

export interface FigureInventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  figure_name?: string;
  store_id?: string;
}
