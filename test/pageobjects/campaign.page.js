import SiteNavigation from './site-navigation.component.js'
import Footer from './footer.component.js'

class CampaignPage {
	async open() {
		await browser.url('intl/v/car-safety/a-million-more')
		return this;
	}

	async getSiteNavigation() {
		return await new SiteNavigation().transitionTo()
	}

	async getFooter() {
		return await new Footer().transitionTo()
	}

	get heading() {
		return $('h2');
	}
}

export default new CampaignPage();
