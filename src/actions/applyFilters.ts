import { Page } from '@playwright/test';
import { TestCase } from '../types/TestCase';
import { normalizeDateToISO } from '../utils/dateUtils';
import { selectDeliveryDate } from './selectDeliveryDate';

async function checkIfNotChecked(locator: any, label: string) {
  try {
    if (!(await locator.isChecked())) {
      await locator.check({ timeout: 5000 });
    }
  } catch {
    throw new Error(`${label} filter failed`);
  }
}

export async function applyFilters(
  page: Page,
  tc: TestCase
): Promise<{ status: 'PASS' | 'FAIL'; comment: string }> {
  try {
    await checkIfNotChecked(
      page.getByRole('radio', { name: tc['Trading Modality'] }),
      `Trading Modality (${tc['Trading Modality']})`
    );
    page.pause();
    let isoDate: string;
    try {
      isoDate = normalizeDateToISO(tc['Delivery Date']);
      await selectDeliveryDate(page, isoDate);
    } catch (e: any) {
      throw new Error(`Delivery Date filter failed: ${tc['Delivery Date']}`);
    }

    await checkIfNotChecked(
      page.getByRole('radio', { name: tc.Product }),
      `Product (${tc.Product})`
    );

    await checkIfNotChecked(
      page.getByRole('radio', { name: new RegExp(`^${tc.View}$`, 'i') }),
      `View (${tc.View})`
    );

    await checkIfNotChecked(
      page.getByRole('radio', { name: tc['Market Area'] }),
      `Market Area (${tc['Market Area']})`
    );

    await page.waitForLoadState('networkidle');

    return { status: 'PASS', comment: 'Filters applied successfully' };

  } catch (error: any) {
    return {
      status: 'FAIL',
      comment: error.message
    };
  }
}