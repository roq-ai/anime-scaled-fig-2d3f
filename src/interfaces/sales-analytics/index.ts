import { StoreInterface } from 'interfaces/store';
import { FigureInventoryInterface } from 'interfaces/figure-inventory';
import { GetQueryInterface } from 'interfaces';

export interface SalesAnalyticsInterface {
  id?: string;
  store_id?: string;
  figure_id?: string;
  sales_count: number;
  created_at?: any;
  updated_at?: any;

  store?: StoreInterface;
  figure_inventory?: FigureInventoryInterface;
  _count?: {};
}

export interface SalesAnalyticsGetQueryInterface extends GetQueryInterface {
  id?: string;
  store_id?: string;
  figure_id?: string;
}
