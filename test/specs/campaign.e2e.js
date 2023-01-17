import CampaignPage from '../pageobjects/campaign.page.js'

describe('Campaign', () => {
	it('should have expected content', async () => {
		await CampaignPage.open()

		expect(await CampaignPage.getHeadings()).toEqual([
			'Ideas that change the world are often the most controversial.',
			'One of a million',
			'Decades of innovation',
			'Explore our models',
			'',
		])
	})
})
