import SiteNavigation from './site-navigation.component.js'
import Footer from './footer.component.js'

class CampaignPage {
	async open() {
		await browser.url('intl/v/car-safety/a-million-more');
		return await this.transitionTo();
	}

	async transitionTo() {
		await expect(browser).toHaveTitle('A million more | Volvo Cars - International');
		return this;
	}

	async acceptCookies() {
		let acceptCookiesButton = $('#onetrust-accept-btn-handler');
		await acceptCookiesButton.click();
		await expect(acceptCookiesButton).not.toBeDisplayed()
		return this;
	}

	async getSiteNavigation() {
		return await new SiteNavigation().transitionTo();
	}

	async getFooter() {
		return await new Footer().transitionTo();
	}

	async getHeadings() {
		return await $$('h2').map(h => h.getText());
	}
}

export default new CampaignPage();
