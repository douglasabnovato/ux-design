import { expect, test } from '@playwright/test';

// Issue #35: as três páginas que usavam o w3.css do w3schools.com agora usam shared/w3-subset.css
for (const projeto of ['art', 'our-coffee', 'restaurante']) {
  test(`${projeto} carrega o CSS local e nada do w3schools.com`, async ({ page }) => {
    const externos = [];
    page.on('request', (r) => { if (r.url().includes('w3schools.com')) externos.push(r.url()); });
    const css = page.waitForResponse((r) => r.url().endsWith('/shared/w3-subset.css'));
    await page.goto(`/projects/${projeto}/index.html`);
    expect((await css).status()).toBe(200);
    // A regra base do subconjunto vale: fonte de 15 px no corpo
    await expect(page.locator('body')).toHaveCSS('font-size', '15px');
    expect(externos).toEqual([]);
  });
}
