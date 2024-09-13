import fs from "fs";
import { remarkToHtml } from "../tools/remark.js";

async function bootstrap() {
  const filePath = "test/example.mdx";
  const content = fs.readFileSync(filePath);
  const data = await remarkToHtml({
    content,
  });
  console.info(data);
}

bootstrap();
