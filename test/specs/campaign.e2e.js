import CampaignPage from '../pageobjects/campaign.page.js'

describe('Campaign', () => {
	it('should have expected content', async () => {
		await CampaignPage.open();
		await CampaignPage.acceptCookies();
		expect(await CampaignPage.getHeadings()).toEqual([
			'Ideas that change the world are often the most controversial.',
			'One of a million',
			'Decades of innovation',
			'Explore our models',
			'',
		]);

		let imageComparisonOptions = {'hideElements': await $$('video[autoplay], button[aria-label=pause]')};
		expect(await browser.checkFullPageScreen('campaign-page', imageComparisonOptions)).toEqual(0);
		expect(await browser.checkTabbablePage('campaign-page-tab-order', imageComparisonOptions)).toEqual(0);
	})
})
