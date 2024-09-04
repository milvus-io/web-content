import "dotenv/config";
import fs from "fs";
import { createDeepLGlossary, deleteDeepLGlossary } from "./utils.js";

const bootstrap = async () => {
	try {
		await deleteDeepLGlossary();
		const glossaryString = fs.readFileSync("tools/glossary.json", "utf8");
		const glossary = JSON.parse(glossaryString);
		const entries = glossary
			.map((entry) => {
				return `${entry.source}\t${entry.target}`;
			})
			.join("\n");
		const { glossary_id } = await createDeepLGlossary(entries);
		fs.writeFileSync("tools/glossary_id.txt", glossary_id, "utf8");
	} catch (error) {
		console.error(error);
	}
};

bootstrap();
