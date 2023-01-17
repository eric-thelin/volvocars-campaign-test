import CampaignPage from '../pageobjects/campaign.page.js'

describe('Site Navigation', () => {
	it('should have expected content', async () => {
		let page = await CampaignPage.open();
		let navigation = await page.getSiteNavigation();

		await expect(navigation.getHomePageLink()).toHaveAttribute(
			'aria-label', 'Volvo Homepage'
		);
	})
})
