import { expect, test } from "@playwright/test";

const viewports = [
  { width: 360, height: 760 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1366, height: 900 },
  { width: 1600, height: 1000 },
];

test("home preserva responsividade visual nos principais tamanhos", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(page.locator(".hero")).toBeVisible();
    await expect(page.locator(".delivery-preview")).toBeVisible();
    await expect(page.locator('[data-test-id="whatsapp-floating-button"]')).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test("chips de período ficam em linha no desktop e rolam horizontalmente no mobile", async ({ page }, testInfo) => {
  await page.goto("/");
  const chips = page.locator(".quick-period-options .choice-chip");
  await expect(chips).toHaveCount(5);

  const metrics = await page.locator(".quick-period-options").evaluate((element) => {
    const style = window.getComputedStyle(element);
    const tops = Array.from(element.querySelectorAll(".choice-chip")).map((chip) =>
      Math.round(chip.getBoundingClientRect().top),
    );
    return {
      flexWrap: style.flexWrap,
      overflowX: style.overflowX,
      rows: new Set(tops).size,
    };
  });

  if (testInfo.project.name === "desktop") {
    expect(metrics.rows).toBe(1);
  } else {
    expect(metrics.flexWrap).toBe("nowrap");
    expect(["auto", "scroll"]).toContain(metrics.overflowX);
  }
});
