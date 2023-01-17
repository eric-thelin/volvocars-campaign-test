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
		let links = this.root.$$('[data-autoid="footer:links"]');
		return await links.map(link => link.getText());
	}

	async getCopyrightText() {
		let copyright = this.root.$('[data-autoid="footer:copyright"]');
		return await copyright.getText();
	}
}

export default Footer;
