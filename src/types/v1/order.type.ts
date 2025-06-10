export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderSearchParams {
  cid?: string;
  order_date?: string;
  delivery_date?: string;
  city?: string;
}