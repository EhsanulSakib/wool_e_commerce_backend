export enum DeliveryStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled"
}

export interface DeliverySearchParams {
  order_uid?: string;
  tracking_number?: string;
  delivery_city?: string;
  delivery_state?: string;
  delivery_country?: string;
  delivery_postal_code?: string;
}