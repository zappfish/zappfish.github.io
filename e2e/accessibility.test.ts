import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// ── Automated WCAG scan ───────────────────────────────────────────────────────
// axe-core checks ~80 rules covering WCAG 2.1 A and AA automatically.
// Any violation here means something real broke — these are not false positives.

test.describe('Accessibility — automated WCAG scan', () => {

    test('home page passes axe WCAG AA', async ({ page }) => {
        await page.goto('/')
        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze()
        expect(results.violations).toEqual([])
    })

})

// ── Landmarks ─────────────────────────────────────────────────────────────────
// Screen reader users navigate by landmark regions (header, main, nav, footer).

test.describe('Accessibility — page landmarks', () => {

    test.beforeEach(async ({ page }) => { await page.goto('/') })

    test('page has a <header> landmark', async ({ page }) => {
        await expect(page.locator('header')).toBeVisible()
    })

    test('page has a <main> landmark with id="main-content"', async ({ page }) => {
        await expect(page.locator('main#main-content')).toBeVisible()
    })

    test('page has a <footer> landmark', async ({ page }) => {
        await expect(page.locator('footer')).toBeVisible()
    })

    test('site nav has aria-label="Site navigation"', async ({ page }) => {
        const nav = page.locator('nav[aria-label="Site navigation"]')
        await expect(nav).toBeAttached()
    })

    test('footer nav has aria-label="Footer navigation"', async ({ page }) => {
        const nav = page.locator('nav[aria-label="Footer navigation"]')
        await expect(nav).toBeAttached()
    })

})

// ── Skip navigation link ──────────────────────────────────────────────────────
// Lets keyboard users jump straight to content, bypassing the nav on every page.

test.describe('Accessibility — skip nav link', () => {

    test.beforeEach(async ({ page }) => { await page.goto('/') })

    test('skip nav link exists and points to #main-content', async ({ page }) => {
        const skipLink = page.locator('a.skip-nav')
        await expect(skipLink).toBeAttached()
        await expect(skipLink).toHaveAttribute('href', '#main-content')
    })

    test('skip nav link becomes visible on focus', async ({ page }) => {
        await page.keyboard.press('Tab')
        const skipLink = page.locator('a.skip-nav')
        await expect(skipLink).toBeFocused()
        // Wait for the 0.15s CSS transition to complete before checking position
        await page.waitForFunction(() => {
            const el = document.querySelector('.skip-nav') as HTMLElement
            return el ? el.getBoundingClientRect().top >= 0 : false
        })
        const box = await skipLink.boundingBox()
        expect(box?.y).toBeGreaterThanOrEqual(0)
    })

})

// ── Header ARIA attributes ────────────────────────────────────────────────────

test.describe('Accessibility — header ARIA', () => {

    test.beforeEach(async ({ page }) => { await page.goto('/') })

    test('active nav link has aria-current="page"', async ({ page }) => {
        // On the home page, the Home link should be marked as current
        const activeLink = page.locator('#main-nav a[aria-current="page"]')
        await expect(activeLink).toBeAttached()
    })

    test('aria-current updates after navigation', async ({ page }) => {
        // Scope to site nav to avoid ambiguity with footer/hero links
        await page.locator('#main-nav').getByRole('link', { name: 'Events', exact: true }).click()
        await expect(page).toHaveURL('/events/')
        const activeLink = page.locator('#main-nav a[aria-current="page"]')
        await expect(activeLink).toHaveText('Events')
    })

    test('logo image has empty alt (text label is in sibling span)', async ({ page }) => {
        const logoImg = page.locator('.logo img')
        await expect(logoImg).toHaveAttribute('alt', '')
    })

    test('page has a single <h1>', async ({ page }) => {
        const h1s = page.locator('h1')
        await expect(h1s).toHaveCount(1)
    })

    test('features section has "Get Started" heading', async ({ page }) => {
        await expect(page.locator('.features h2')).toHaveText('Get Started')
    })

})

// ── Hamburger menu ────────────────────────────────────────────────────────────

test.describe('Accessibility — hamburger menu (mobile)', () => {

    test.use({ viewport: { width: 375, height: 812 } })

    test.beforeEach(async ({ page }) => { await page.goto('/') })

    test('hamburger has aria-expanded="false" when closed', async ({ page }) => {
        const btn = page.locator('button.hamburger')
        await expect(btn).toHaveAttribute('aria-expanded', 'false')
    })

    test('hamburger has aria-controls="main-nav"', async ({ page }) => {
        const btn = page.locator('button.hamburger')
        await expect(btn).toHaveAttribute('aria-controls', 'main-nav')
    })

    test('aria-expanded toggles to "true" when opened', async ({ page }) => {
        const btn = page.locator('button.hamburger')
        await btn.click()
        await expect(btn).toHaveAttribute('aria-expanded', 'true')
    })

    test('aria-expanded toggles back to "false" when closed', async ({ page }) => {
        const btn = page.locator('button.hamburger')
        await btn.click()
        await btn.click()
        await expect(btn).toHaveAttribute('aria-expanded', 'false')
    })

})

// ── Focus management ──────────────────────────────────────────────────────────

test.describe('Accessibility — keyboard focus', () => {

    test.beforeEach(async ({ page }) => { await page.goto('/') })

    test('all nav links are reachable by keyboard', async ({ page }) => {
        // Tab past skip-nav, then through nav links
        const navLinks = page.locator('#main-nav a')
        const count = await navLinks.count()
        // Tab enough times to reach the first nav link
        for (let i = 0; i < count + 2; i++) {
            await page.keyboard.press('Tab')
            const focused = await page.evaluate(() => document.activeElement?.tagName)
            if (focused === 'A') break
        }
        for (let i = 0; i < count; i++) {
            const focused = page.locator(':focus')
            const tag = await focused.evaluate(el => el.tagName)
            expect(tag).toBe('A')
            await page.keyboard.press('Tab')
        }
    })

})
