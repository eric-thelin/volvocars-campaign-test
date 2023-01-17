class SiteNavigation {
	root;

	constructor() {
		this.root = $('#site-navigation');
	}

	async transitionTo() {
		await expect(this.root).toBeDisplayed();
		return this;
	}

	getHomePageLink() {
		return this.root.$('[data-autoid="nav:siteNavLogoSmall"]')
	}

	getCarsLink() {
		return this.root.$('[id="sitenav:topbar:cars"]')
	}

	getMenuLink() {
		return this.root.$('#sitenav-sidenav-toggle')
	}
}

export default SiteNavigation
