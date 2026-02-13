import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

export async function writeCsv(
  testcaseNumber: number,
  rows: {
    Low?: string;
    High?: string;
    Last?: string;
    'Weighted Avg'?: string;
  }[]
) {
  const filePath = path.join(
    process.cwd(),
    'output',
    `output_tc_${testcaseNumber}.csv`
  );

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'Low', title: 'Low' },
      { id: 'High', title: 'High' },
      { id: 'Last', title: 'Last' },
      { id: 'Weighted Avg', title: 'Weighted Avg' }
    ]
  });

  await csvWriter.writeRecords(rows);
}