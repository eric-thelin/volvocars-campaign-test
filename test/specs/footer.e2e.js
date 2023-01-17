import CampaignPage from '../pageobjects/campaign.page.js'

describe('Footer', () => {
	it('should have expected content', async () => {
		let page = await CampaignPage.open();
		let footer = await page.getFooter();

		expect(await footer.getLinkTexts()).toEqual([
			'Cookies',
			'Legal',
			'Privacy',
			'Social Media',
			'Tell Us'
		]);
		expect(await footer.getCopyrightText()).toContain(
			new Date().getFullYear().toString()
		);
	})
})
