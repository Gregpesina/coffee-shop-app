import { MenuItem } from '../types';

// Placeholder menu so the app is usable immediately.
// These settings control which customizations appear
// for each menu item.

const standardSizes = [
  {
    id: 'sm',
    label: '8oz',
    priceModifier: 0,
  },
  {
    id: 'md',
    label: '12oz',
    priceModifier: 0.75,
  },
  {
    id: 'lg',
    label: '16oz',
    priceModifier: 1.5,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'latte',
    name: 'Latte',
    description:
      'Espresso with steamed milk and a thin layer of foam.',
    category: 'Espresso',
    basePrice: 4.25,
    imageUrl:
      'https://images.unsplash.com/photo-1561047029-3000c68339ca',
    sizes: standardSizes,

    allowsMilk: true,
    allowsSweetness: true,
    allowsExtraShot: true,
  },

  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description:
      'Equal parts espresso, steamed milk, and foam.',
    category: 'Espresso',
    basePrice: 4.0,
    imageUrl:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d',
    sizes: standardSizes,

    allowsMilk: true,
    allowsSweetness: true,
    allowsExtraShot: true,
  },

  {
    id: 'drip',
    name: 'House Drip',
    description:
      'Our daily rotating single-origin, brewed fresh.',
    category: 'Brewed',
    basePrice: 3.0,
    imageUrl:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf',
    sizes: standardSizes,

    allowsMilk: true,
    allowsSweetness: true,
    allowsExtraShot: false,
  },

  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description:
      'Steeped for 18 hours. Smooth, low acidity.',
    category: 'Cold',
    basePrice: 4.5,
    imageUrl:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c',
    sizes: standardSizes,

    allowsMilk: true,
    allowsSweetness: true,
    allowsExtraShot: false,
  },

  {
    id: 'matcha',
    name: 'Matcha Latte',
    description:
      'Ceremonial grade matcha whisked with steamed milk.',
    category: 'Tea',
    basePrice: 4.75,
    imageUrl:
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a',
    sizes: standardSizes,

    allowsMilk: true,
    allowsSweetness: true,
    allowsExtraShot: false,
  },

  {
    id: 'croissant',
    name: 'Butter Croissant',
    description:
      'Baked in-house every morning.',
    category: 'Food',
    basePrice: 3.5,
    imageUrl:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
    sizes: [
      {
        id: 'one',
        label: 'Regular',
        priceModifier: 0,
      },
    ],

    allowsMilk: false,
    allowsSweetness: false,
    allowsExtraShot: false,
  },
];