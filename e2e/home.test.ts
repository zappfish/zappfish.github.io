import { test, expect } from '@playwright/test'

test.describe('Home page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    // ── Hero CTA buttons ──────────────────────────────────────────────────────

    test('hero CTA buttons are visible', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Learn About Project' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Upcoming Events' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Submit Data' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Phenotype Atlas' })).toBeVisible()
    })

    test('Learn About Project CTA links to goals page', async ({ page }) => {
        await page.getByRole('link', { name: 'Learn About Project' }).first().click()
        await expect(page).toHaveURL('/goals/')
    })

    test('Upcoming Events CTA links to events page', async ({ page }) => {
        await page.getByRole('link', { name: 'Upcoming Events' }).first().click()
        await expect(page).toHaveURL('/events/')
    })

    // ── About section ─────────────────────────────────────────────────────────

    test('About ZAPP section is visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'About ZAPP' })).toBeVisible()
    })

    // ── Feature cards ─────────────────────────────────────────────────────────

    test('all four feature card headings are visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Learn About Project' })).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Submit Data' })).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Phenotype Atlas' })).toBeVisible()
    })

    // ── Coming soon links ─────────────────────────────────────────────────────

    test('Submit Data card button links to coming soon', async ({ page }) => {
        await page.getByRole('link', { name: 'Submit Data' }).last().click()
        await expect(page).toHaveURL('/coming-soon/')
    })

    test('Explore Atlas card button links to coming soon', async ({ page }) => {
        await page.getByRole('link', { name: 'Explore Atlas' }).first().click()
        await expect(page).toHaveURL('/coming-soon/')
    })

    test('atlas CTA Explore Atlas button links to coming soon', async ({ page }) => {
        await page.locator('.atlas-cta .btn-primary').click()
        await expect(page).toHaveURL('/coming-soon/')
    })

    // ── Blog preview ──────────────────────────────────────────────────────────

    test('blog preview section shows coming soon message', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Recent Blog Posts' })).toBeVisible()
        await expect(page.getByText('Blog posts coming soon')).toBeVisible()
    })

    // ── Atlas CTA ─────────────────────────────────────────────────────────────

    test('Explore Our Phenotype Atlas section is visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Explore Our Phenotype Atlas' })).toBeVisible()
    })


})
