import { TestCase } from '../types/TestCase';

export function updateResult(
  allTests: TestCase[],
  testcaseNumber: number,
  status: 'PASS' | 'FAIL',
  comment: string
) {
  const tc = allTests.find(t => t.testcaseNumber === testcaseNumber);
  if (!tc) return;

  tc.Status = status;
  tc.Comment = comment;
}