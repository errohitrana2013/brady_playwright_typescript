import { test } from '@playwright/test';
import { loadTestData, saveTestData } from '../utils/testData';
import { applyFilters } from '../actions/applyFilters';
import { scrapeTable } from '../scraping/scrapeTable';
import { writeCsv } from '../utils/writeCsv';

const testCases = loadTestData();

for (const tc of testCases) {
  test(
    `EPEX Spot scrape | TC-${tc.testcaseNumber}`,
    async ({ page }) => {
      await page.goto('https://www.epexspot.com/en/market-results?market_area=GB&auction=&trading_date=&delivery_date=2026-02-13&underlying_year=&modality=Continuous&sub_modality=&technology=&data_mode=table&period=&production_period=&product=30');

      const result = await applyFilters(page, tc);

      tc.Status = result.status;
      tc.Comment = result.comment;

      if (result.status === 'PASS') {
        const rows = await scrapeTable(page);
        await writeCsv(tc.testcaseNumber, rows);
      } else {
        await writeCsv(tc.testcaseNumber, [
          { Low: '', High: '', Last: '', 'Weighted Avg': '' }
        ]);
      }
    }
  );
}

// Save once after all tests
test.afterAll(() => {
  saveTestData(testCases);
});