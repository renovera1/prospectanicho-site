import { expect, test } from "@playwright/test";

for (const width of [390, 768, 1024, 1440]) {
  test(`screenshot visual da home em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width < 700 ? 920 : 1000 });
    await page.goto("/");
    await expect(page.locator(".opportunity-showcase img")).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true });
  });
}
