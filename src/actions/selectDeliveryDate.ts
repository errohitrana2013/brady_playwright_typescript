import { Page, expect } from '@playwright/test';

export async function selectDeliveryDate(
  page: Page,
  isoDate: string) 
  {
  const [year, month, day] = isoDate.split('-');

  const monthIndex = Number(month) - 1;
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Open date picker
  const dateInput = page.locator('[name="filters[delivery_date]"]');
  
  await dateInput.click();

  const monthSelect = page.locator('select[aria-label="Select month"]');
  await monthSelect.selectOption({ label: monthNames[monthIndex] });

  // Year dropdown (ui-datepicker-year)
  const yearSelect = page.locator('select.ui-datepicker-year');
  await yearSelect.selectOption(year);

  // Select day (must NOT be disabled)
  const dayCell = page.locator(
    'td[data-handler="selectDay"]:not(.ui-state-disabled)',
    { hasText: String(Number(day)) }
  );

  await expect(dayCell).toBeVisible();
  await dayCell.click();
}