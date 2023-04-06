module.exports = {
	ignoreExisting: true,
	dimensions: false,
	typescript: true,
	// icon: true,
	expandProps: true,
	jsx: {
		babelConfig: {
			plugins: [
				// For an example, this plugin will remove "id" attribute from "svg" tag
				[
					"@svgr/babel-plugin-remove-jsx-attribute",
					{
						elements: ["svg"],
						attributes: ["style"],
					},
				],
			],
		},
	},
};
