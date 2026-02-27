import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
    test('nav links are visible on homepage', async ({ page }) => {
        await page.goto('/')
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Goals' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Events' })).toBeVisible()
    })

    test('active nav link updates on navigation', async ({ page }) => {
        await page.goto('/')
        await page.getByRole('link', { name: 'Events' }).click()
        await expect(page).toHaveURL('/events/')
        const eventsLink = page.locator('#main-nav li.active a')
        await expect(eventsLink).toHaveText('Events')
    })

    test('logo links back to homepage', async ({ page }) => {
        await page.goto('/events/')
        await page.locator('.logo').click()
        await expect(page).toHaveURL('/')
    })
})
