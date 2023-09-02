import { FigureInventoryInterface } from 'interfaces/figure-inventory';
import { SalesAnalyticsInterface } from 'interfaces/sales-analytics';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StoreInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  figure_inventory?: FigureInventoryInterface[];
  sales_analytics?: SalesAnalyticsInterface[];
  user?: UserInterface;
  _count?: {
    figure_inventory?: number;
    sales_analytics?: number;
  };
}

export interface StoreGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
