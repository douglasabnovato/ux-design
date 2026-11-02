import { expect, test } from '@playwright/test';

test('o catálogo mostra os projetos e o filtro reduz a lista', async ({ page }) => {
  await page.goto('/');
  const cartoes = page.locator('.project-card');
  await expect(cartoes.first()).toBeVisible();
  const total = await cartoes.count();
  const filtro = page.locator('#filtros .filtro').nth(1);
  await filtro.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#filtros .filtro').nth(1)).toHaveAttribute('aria-pressed', 'true');
  expect(await cartoes.count()).toBeLessThan(total);
});

test('o nome acessível do cartão contém o texto visível', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('a.project-card__link').first();
  await expect(link).not.toHaveAttribute('aria-label', /.*/);
  await expect(link.locator('h3')).not.toBeEmpty();
});

test('os pontos do carrossel têm área de toque de 24 px', async ({ page }) => {
  await page.goto('/');
  const ponto = page.locator('.hero-carousel__dot').nth(1);
  const caixa = await ponto.boundingBox();
  expect(caixa.width).toBeGreaterThanOrEqual(24);
  expect(caixa.height).toBeGreaterThanOrEqual(24);
});

test('em 375 px não há rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await expect(page.locator('.project-card').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
