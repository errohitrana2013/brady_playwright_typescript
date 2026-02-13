export interface TestCase {
  testcaseNumber: number;
  'Trading Modality': string;
  'Delivery Date': string;
  Product: string;
  View: string;
  'Market Area': string;
  Status?: 'PASS' | 'FAIL' | '';
  Comment?: string;
}