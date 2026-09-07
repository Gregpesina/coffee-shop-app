// Central place for shared types.

export type MenuCategory =
  'Espresso' |
  'Brewed' |
  'Cold' |
  'Tea' |
  'Food';

export interface SizeOption {
  id: string;
  label: string;
  priceModifier: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  basePrice: number;
  imageUrl: string;
  sizes: SizeOption[];

  // Controls which customizations appear
  // on the item detail screen.
  allowsMilk?: boolean;
  allowsSweetness?: boolean;
  allowsExtraShot?: boolean;
}

// Coffee customization options.
export interface Customization {
  milk: string;
  sweetness: string;
  extraShot: boolean;
}

export interface CartLine {
  id: string;
  menuItem: MenuItem;
  size: SizeOption;
  quantity: number;
  customization: Customization;
}

export type OrderStatus =
  'placed' |
  'in_progress' |
  'ready' |
  'completed';

export interface Order {
  id: string;
  userId: string;
  lines: CartLine[];
  total: number;
  pointsEarned: number;
  status: OrderStatus;
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  rewardPoints: number;
}