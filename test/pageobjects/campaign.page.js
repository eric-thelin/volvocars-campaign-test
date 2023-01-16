class CampaignPage {
	open() {
		return browser.url('intl/v/car-safety/a-million-more')
	}

	get heading() {
		return $('h2');
	}
}

export default new CampaignPage();
