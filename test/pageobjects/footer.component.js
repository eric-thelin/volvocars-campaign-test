class Footer {
	root;

	constructor() {
		this.root = $('#vcc-site-footer');
	}

	async transitionTo() {
		await expect(this.root).toBeDisplayed();
		return this;
	}

	async getLinkTexts() {
		let links = await this.root.$$('[data-autoid="footer:links"]');
		return Promise.all(links.map(link => link.getText()));
	}

	async getCopyrightText() {
		let copyright = await this.root.$('[data-autoid="footer:copyright"]');
		return copyright.getText();
	}
}

export default Footer;
