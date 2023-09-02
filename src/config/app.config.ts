interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Store Owner'],
  customerRoles: [],
  tenantRoles: ['Store Owner', 'Store Administrator', 'Inventory Manager'],
  tenantName: 'Store',
  applicationName: 'Anime Scaled Figure Store v3',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage store creation', 'Invite Store Administrators and Inventory Managers'],
};
