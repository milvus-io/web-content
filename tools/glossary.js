import "dotenv/config";
import fs from "fs";
import { createDeepLGlossary } from "./utils.js";

const bootstrap = async () => {
	try {
		const glossaryString = fs.readFileSync("tools/glossary.json", "utf8");
		const glossary = JSON.parse(glossaryString);
		const entries = glossary
			.map((entry) => {
				return `${entry.source}\t${entry.target}`;
			})
			.join("\n");
		const { glossary_id } = await createDeepLGlossary(entries);
		console.info(`Replace GLOSSARY_ID in tools/utils.js with ${glossary_id}`);
	} catch (error) {
		console.error(error);
	}
};

bootstrap();
