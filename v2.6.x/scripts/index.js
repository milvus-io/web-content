const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const MilvusDocsGen = require('./lib/milvusDocsGen.js');
dotenv = require('dotenv');

// Load environment variables from.env file
dotenv.config();

program
  .version('0.1.0')
  .description('CLI tool for publishing manuals from Feishu docs to Milvus docs')
  .requiredOption('-m, --manual <manual>', 'set the name of the manual to publish')
  .requiredOption('-d, --doc <doc>', 'set the name of the document or non-document node to publish')
  .option('-o, --output <output>', 'set the output directory for the generated file')
  .option('-p, --position <position>', 'set the position of the current document among its siblings')
  .option('-r, --recursive', 'use the recursive mode for publishing multiple documents')
  .action(async (options) => {
      const { manual, doc, output, position, iterative } = options;
      const configFile = path.join(__dirname, 'config.json');
      
      if (!fs.existsSync(configFile)) {
         console.error('Config file not found. Please add a config.json file to the `scripts` directory.');
         process.exit(1);
      }

      const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      const { base, sourceType, targets, images } = config.manuals[manual];
      const { menuStructure, outputDir, imageDir } = targets;
      const milvusDocsGen = new MilvusDocsGen(base, sourceType, menuStructure, imageDir, images.alt_texts);

      if (!iterative) {
         // write single document
         const result = await milvusDocsGen.write_doc(doc);

         if (result) {
            var { front_matters, content, page_id } = result;
            const alt_texts = milvusDocsGen.alt_texts;
   
            // merge alt_texts into configuration
            config.manuals[manual].images.alt_texts = alt_texts;
            fs.writeFileSync(configFile, JSON.stringify(config, null, 4));
   
            // write file to output directory
            var outputPath = ""
   
            if (!output) {
               const existing_files =fs.readdirSync(outputDir, { recursive: true })
                  .filter(file => file.endsWith('.md'))
                  .filter(file => fs.readFileSync(path.join(outputDir, file), 'utf8').split('\n').find(line => line.endsWith(page_id)))
   
               if (existing_files.length > 0 && !milvusDocsGen.__is_new(page_id)) {
                  console.log(`Document ${page_id} already exists in output directory. Will overwrite it...`)
                  outputPath = path.join(outputDir, existing_files[0]);
               } else if (existing_files.length > 0 && milvusDocsGen.__is_new(page_id)) {
                  console.error(`Document ${page_id} already exists in output directory, but not recorded in the menu structure. Will skip it...`)
                  process.exit(1);
               } else {
                  console.error(`Document ${page_id} does not exist in output directory. You need to specify an output directory.`)
                  process.exit(1);
               }
            } else {
               console.log(`Document ${page_id} will be written to folder ${path.join(outputDir, output)}...`)
               outputPath = path.join(outputDir, output, `${page_id}`);
            }
   
            if (outputPath) {
               // replace imageDir with relative path to output directory
               content = content.replace(new RegExp(`/${imageDir}`, 'g'), path.relative(path.dirname(outputPath), path.resolve(imageDir)))
               content = content.replaceAll('https://milvus.io/docs/', '')
               fs.writeFileSync(outputPath, [front_matters, content].join('\n\n'));
   
               // update position of current document in menu
               if (milvusDocsGen.__is_new(page_id)) {
                  console.log(`Document ${page_id} is a new document, will append it to the menu...`)
                  milvusDocsGen.__append_doc_to_menu(page_id, position)
               }
            }
         }
      } else {
         // write multiple documents
         const docs = await milvusDocsGen.write_docs(doc);
         const alt_texts = milvusDocsGen.alt_texts;
   
         // merge alt_texts into configuration
         config.manuals[manual].images.alt_texts = alt_texts;
         fs.writeFileSync(configFile, JSON.stringify(config, null, 4));

         for (const result of docs) {
            var { front_matters, content, page_id } = result;
   
            // write file to output directory
            var outputPath = ""
   
            if (!output) {
               const existing_files =fs.readdirSync(outputDir, { recursive: true })
                  .filter(file => file.endsWith('.md'))
                  .filter(file => fs.readFileSync(path.join(outputDir, file), 'utf8').split('\n').find(line => line.endsWith(page_id)))
   
               if (existing_files.length > 0 && !milvusDocsGen.__is_new(page_id)) {
                  console.log(`Document ${page_id} already exists in output directory. Will overwrite it...`)
                  outputPath = path.join(outputDir, existing_files[0]);
               } else if (existing_files.length > 0 && milvusDocsGen.__is_new(page_id)) {
                  console.error(`Document ${page_id} already exists in output directory, but not recorded in the menu structure. Will skip it...`)
                  process.exit(1);
               } else {
                  console.error(`Document ${page_id} does not exist in output directory. You need to specify an output directory.`)
                  process.exit(1);
               }
            } else {
               console.log(`Document ${page_id} will be written to folder ${path.join(outputDir, output)}...`)
               outputPath = path.join(outputDir, output, `${page_id}`);
            }
   
            if (outputPath) {
               // replace imageDir with relative path to output directory
               content = content.replace(new RegExp(`/${imageDir}`, 'g'), path.relative(path.dirname(outputPath), path.resolve(imageDir)))
               content = content.replaceAll('https://milvus.io/docs/', '')
               fs.writeFileSync(outputPath, [front_matters, content].join('\n\n'));


               // update position of current document in menu
               if (milvusDocsGen.__is_new(page_id)) {
                  milvusDocsGen.__append_doc_to_menu(page_id, position)
               }
            }
         }
      }
   });

program.parse(process.argv);

