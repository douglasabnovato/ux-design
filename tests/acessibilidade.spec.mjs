import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Critério 8: axe no fluxo principal, com os dados reais de projects.json e em largura de desktop.
// O site não tem tema escuro próprio (não há prefers-color-scheme no CSS), por isso só o claro.
test.use({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });

function resumo(violacoes) {
  return violacoes.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

test('o catálogo não tem violações do axe', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project-card').first()).toBeVisible();
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(resumo(violations)).toEqual([]);
});

test('o catálogo filtrado por setor não tem violações do axe', async ({ page }) => {
  await page.goto('/');
  await page.locator('#filtros .filtro').nth(1).click();
  await expect(page.locator('#filtros .filtro').nth(1)).toHaveAttribute('aria-pressed', 'true');
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(resumo(violations)).toEqual([]);
});

test('o case aberto não tem violações do axe', async ({ page }) => {
  await page.goto('/');
  await page.locator('.project-card__case').first().click();
  await expect(page.locator('#modalCase')).toBeVisible();
  const { violations } = await new AxeBuilder({ page }).include('#modalCase').analyze();
  expect(resumo(violations)).toEqual([]);
});
