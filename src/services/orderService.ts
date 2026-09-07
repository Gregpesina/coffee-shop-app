import { collection, addDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase';
import { CartLine, Order } from '../types';

// Tax rate for the app.
// We can change this later if the shop uses a different rate.
const TAX_RATE = 0.0775;

// 1 reward point per whole dollar spent.
const POINTS_PER_DOLLAR = 1;

// Calculates the price before tax.
export function calculateSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const extraShotPrice = line.customization.extraShot ? 1.00 : 0;

    const unitPrice =
      line.menuItem.basePrice +
      line.size.priceModifier +
      extraShotPrice;

    return sum + unitPrice * line.quantity;
  }, 0);
}

// Calculates the tax.
export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

// Calculates subtotal + tax.
export function calculateTotal(lines: CartLine[]): number {
  const subtotal = calculateSubtotal(lines);
  const tax = calculateTax(subtotal);

  return subtotal + tax;
}

export function calculatePoints(total: number): number {
  return Math.floor(total * POINTS_PER_DOLLAR);
}

// Called after a successful Stripe payment.
export async function placeOrder(userId: string, lines: CartLine[]): Promise<Order> {
  const total = calculateTotal(lines);
  const pointsEarned = calculatePoints(total);

  const orderData = {
    userId,
    lines,
    total,
    pointsEarned,
    status: 'placed' as const,
    createdAt: Date.now(),
  };

  const docRef = await addDoc(collection(db, 'orders'), orderData);

  await updateDoc(doc(db, 'users', userId), {
    rewardPoints: increment(pointsEarned),
  });

  return { id: docRef.id, ...orderData };
}