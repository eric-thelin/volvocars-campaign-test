class SiteNavigation {
	async transitionTo() {
		await expect($('#site-navigation')).toBeDisplayed();
		return this;
	}

	getHomePageLink() {
		return $('#site-navigation [data-autoid="nav:siteNavLogoSmall"]')
	}
}

export default new SiteNavigation()
