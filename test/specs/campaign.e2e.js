import CampaignPage from '../pageobjects/campaign.page.js'

describe('Campaign', () => {
    it('should have expected content', async () => {
        await CampaignPage.open()

		await expect(CampaignPage.heading).toHaveText(
			'Ideas that change the world are often the most controversial.'
		)
    })
})
