import SiteNavigation from './site-navigation.component.js'
import Footer from './footer.component.js'

class CampaignPage {
	async open() {
		await browser.url('intl/v/car-safety/a-million-more')
		await this.transitionTo()
		return this;
	}

	async transitionTo() {
		await expect(browser).toHaveTitle('A million more | Volvo Cars - International')
	}

	async getSiteNavigation() {
		return await new SiteNavigation().transitionTo()
	}

	async getFooter() {
		return await new Footer().transitionTo()
	}

	async getHeadings() {
		return Promise.all((await $$('h2')).map(h => h.getText()));
	}
}

export default new CampaignPage();
