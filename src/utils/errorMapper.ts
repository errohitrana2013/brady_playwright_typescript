export function mapError(error: unknown): string {
  const msg = String(error);

  if (msg.includes('Trading Modality')) return 'Trading Modality not found';
  if (msg.includes('Product')) return 'Product not found';
  if (msg.includes('Market Area')) return 'Market Area not found';
  if (msg.includes('Timeout')) return 'Element not found';
  if (msg.includes('datepicker')) return 'Delivery Date not selectable';

  return 'Unexpected error';
}