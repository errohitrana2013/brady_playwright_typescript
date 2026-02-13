import fs from 'fs';
import path from 'path';
import { TestCase } from '../types/TestCase';

const filePath = path.join(process.cwd(), 'testdata', 'filters.json');

export function loadTestData(): TestCase[] {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function saveTestData(data: TestCase[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}