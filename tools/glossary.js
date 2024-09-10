import "dotenv/config";
import fs from "fs";
import { createDeepLGlossary } from "./utils.js";

const bootstrap = async () => {
	try {
		const glossaryIdMapString = fs.readFileSync(
			"tools/glossary/glossary-id.json",
			"utf8"
		);
		const glossaryIdMap = JSON.parse(glossaryIdMapString);

		for (const [version, glossary] of Object.entries(glossaryIdMap)) {
			const glossaryString = fs.readFileSync(
				`tools/glossary/${version}.json`,
				"utf8"
			);
			const glossaryArr = JSON.parse(glossaryString);
			const entries = glossaryArr
				.map((entry) => {
					return `${entry.source}\t${entry.target}`;
				})
				.join("\n");
			const targetLang = version.split("-")[1];
			const { glossary_id } = await createDeepLGlossary(entries, targetLang);
			glossaryIdMap[version].id = glossary_id;
		}

		fs.writeFileSync(
			"tools/glossary/glossary-id.json",
			JSON.stringify(glossaryIdMap, null, 2),
			"utf8"
		);
		console.log("Glossary ID map updated.");
	} catch (error) {
		console.error(error);
	}
};

bootstrap();
