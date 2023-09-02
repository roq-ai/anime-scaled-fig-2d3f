const mapping: Record<string, string> = {
  'collector-profiles': 'collector_profile',
  'discussion-boards': 'discussion_board',
  'figure-inventories': 'figure_inventory',
  'purchase-histories': 'purchase_history',
  'sales-analytics': 'sales_analytics',
  stores: 'store',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
