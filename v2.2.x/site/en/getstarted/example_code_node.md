---
id: example_code_node.md
label: Node.js
order: 1
group: example_code.md
summary: Get started with Milvus faster using this Node.js example code.
---

<div class="tab-wrapper"><a href="example_code.md" class=''>Python</a><a href="example_code_node.md" class='active '>Node.js</a></div>

# Run Milvus using Node.js

This topic describes how to use Milvus using Node.js.

## Fork milvus sdk node repo

```bash
git clone https://github.com/milvus-io/milvus-sdk-node.git
```

## Go to node sdk examples folder

```bash
cd ./milvus-sdk-node/examples/milvus
```

This folder contains code examples that demonstrate the usage of the Milvus SDK Node. These examples showcase various functionalities and features of the Milvus SDK.

## Installation

To install the Milvus SDK Node and its dependencies, run the following command in the terminal:

```bash
npm install
```

This will download and install all the required packages specified in the `package.json` file.

## Running the Examples

To run each example file, you can use [`ts-node`](https://github.com/TypeStrong/ts-node). The [`ts-node`](https://github.com/TypeStrong/ts-node) package allows you to execute TypeScript files directly without the need for manual compilation.

In the terminal, navigate to the directory containing the example file you want to run, and then execute the following command:

```bash
ts-node <example_file_name>.ts
```

Replace `<example_file_name>` with the name of the example file you want to run (e.g., `HelloMilvus.ts`).

Running the above command will execute the example and produce the corresponding output, demonstrating the functionality being showcased.
