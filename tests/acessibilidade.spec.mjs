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

test('pelo teclado, o foco fica visível com o contorno do próprio site', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project-card').first()).toBeVisible();
  // Tab a partir do começo da página até chegar ao primeiro filtro
  const filtro = page.locator('#filtros .filtro').first();
  for (let i = 0; i < 40 && !(await filtro.evaluate((el) => el === document.activeElement)); i++) {
    await page.keyboard.press('Tab');
  }
  await expect(filtro).toBeFocused();
  // O contorno padrão do Chromium tem 1 px; o do site, 3 px na cor primária
  await expect(filtro).toHaveCSS('outline-width', '3px');
  await expect(filtro).toHaveCSS('outline-style', 'solid');
  await expect(filtro).toHaveCSS('outline-color', 'rgb(0, 212, 212)');
});

test.describe('com movimento normal', () => {
  test.use({ reducedMotion: 'no-preference' });
  test('o carrossel, com o botão Pausar à vista, não tem violações do axe', async ({ page }) => {
    await page.clock.install();
    await page.goto('/');
    await expect(page.locator('#heroPausa')).toBeVisible();
    const { violations } = await new AxeBuilder({ page }).include('#heroCarousel').analyze();
    expect(resumo(violations)).toEqual([]);
  });
});

// #48: as páginas dos 5 projetos com case, abertas a partir do catálogo, também passam pelo axe.
const projetosComCase = ['uma-franquia', 'edificacoes-3d', 'marceneiro-rpc', 'restaurante', 'quiz-app'];

for (const slug of projetosComCase) {
  test(`a página do projeto ${slug} não tem violações do axe`, async ({ page }) => {
    await page.goto(`/projects/${slug}/`);
    await page.waitForLoadState('load');
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(resumo(violations)).toEqual([]);
  });
}
