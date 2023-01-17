class SiteNavigation {
	async transitionTo() {
		await expect($('#site-navigation')).toBeDisplayed();
		return this;
	}

	getHomePageLink() {
		return $('#site-navigation [data-autoid="nav:siteNavLogoSmall"]')
	}

	getCarsLink() {
		return $('#site-navigation [id="sitenav:topbar:cars"]')
	}

	getMenuLink() {
		return $('#site-navigation #sitenav-sidenav-toggle')
	}
}

export default new SiteNavigation()
