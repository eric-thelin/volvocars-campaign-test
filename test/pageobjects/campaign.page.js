import SiteNavigation from './site-navigation.component.js'
class CampaignPage {
	async open() {
		await browser.url('intl/v/car-safety/a-million-more')
		return this;
	}

	async getSiteNavigation() {
		return await new SiteNavigation().transitionTo()
	}

	get heading() {
		return $('h2');
	}
}

export default new CampaignPage();
