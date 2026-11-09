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

test('se o catálogo não carrega, avisa e "Tentar de novo" recupera', async ({ page }) => {
  let falhar = true;
  await page.route('**/projects.json', (r) => (falhar ? r.fulfill({ status: 500, body: 'erro' }) : r.continue()));
  await page.goto('/');
  const aviso = page.getByRole('alert');
  await expect(aviso).toContainText('Não foi possível carregar o catálogo');
  await expect(page.locator('#tentarCatalogo')).toBeFocused();
  await expect(page.locator('#heroCarousel')).toBeHidden();
  falhar = false;
  await page.locator('#tentarCatalogo').click();
  await expect(page.locator('.project-card').first()).toBeVisible();
  await expect(page.locator('#heroCarousel')).toBeVisible();
  await page.locator('#filtros .filtro').nth(1).click();
  await expect(page.locator('#filtros .filtro').nth(1)).toHaveAttribute('aria-pressed', 'true');
});

test('sem rede, o catálogo mostra o aviso em vez da grade vazia', async ({ page }) => {
  await page.route('**/projects.json', (r) => r.abort());
  await page.goto('/');
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.project-card')).toHaveCount(0);
});

test('catálogo vazio diz que não há projetos', async ({ page }) => {
  await page.route('**/projects.json', (r) => r.fulfill({ contentType: 'application/json', body: '[]' }));
  await page.goto('/');
  await expect(page.locator('#projectsGrid')).toContainText('Nenhum projeto publicado ainda');
});

test('com o case aberto, Tab e Shift+Tab ficam dentro do modal (#36)', async ({ page }) => {
  await page.goto('/');
  const botao = page.locator('.project-card__case').first();
  await botao.focus();
  await page.keyboard.press('Enter');
  const modal = page.locator('#modalCase');
  await expect(modal).toBeVisible();
  await expect(page.locator('main')).toHaveJSProperty('inert', true);
  for (const tecla of ['Tab', 'Tab', 'Tab', 'Shift+Tab', 'Shift+Tab', 'Shift+Tab']) {
    await page.keyboard.press(tecla);
    expect(await page.evaluate(() => !!document.activeElement.closest('#modalCase'))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(page.locator('main')).toHaveJSProperty('inert', false);
  await expect(botao).toBeFocused();
});
