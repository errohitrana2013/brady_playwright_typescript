import { Page } from '@playwright/test';

export async function scrapeTable(page: Page) {
  // Wait until at least one data row is visible
  await page.locator('table.table-01 tr.lvl-1.active').first().waitFor();
  page.pause();
  const rows = await page
    .locator('table.table-01 tr.lvl-1.active')
    .evaluateAll(trs =>
      trs.map(tr => {
        const tds = tr.querySelectorAll('td');
        return {
          Low: tds[0]?.textContent?.trim() ?? '',
          High: tds[1]?.textContent?.trim() ?? '',
          Last: tds[2]?.textContent?.trim() ?? '',
          'Weighted Avg': tds[3]?.textContent?.trim() ?? ''
        };
      })
    );

  return rows;
}