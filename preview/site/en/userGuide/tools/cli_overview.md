---
id: cli_overview.md
summary: Milvus Command-Line Interface (CLI) is a command-line tool that supports database connection, data operations, and import and export of data.
title: Milvus Command-Line Interface
---

# Milvus Command-Line Interface

Milvus Command-Line Interface (CLI) is a command-line tool that supports database connection, data operations, and import and export of data. Based on [Milvus Python SDK](https://github.com/milvus-io/pymilvus), it allows the execution of commands through a terminal using interactive command-line prompts.

## Recommended version

In the following table, you can find the recommended versions of PyMilvus and Milvus_CLI according to the version of Milvus that you use.

|  Milvus   | PyMilvus | Milvus_CLI |
| :-------: | :------: | :--------: |
|   1.0.x   |  1.0.1   |     x      |
|   1.1.x   |  1.1.2   |     x      |
| 2.0.0-RC1 | 2.0.0rc1 |     x      |
| 2.0.0-RC2 | 2.0.0rc2 |   0.1.3    |
| 2.0.0-RC4 | 2.0.0rc4 |   0.1.4    |
| 2.0.0-RC5 | 2.0.0rc5 |   0.1.5    |
| 2.0.0-RC6 | 2.0.0rc6 |   0.1.6    |
| 2.0.0-RC7 | 2.0.0rc7 |   0.1.7    |
| 2.0.0-RC8 | 2.0.0rc8 |   0.1.8    |
| 2.0.0-RC9 | 2.0.0rc9 |   0.1.9    |
|   2.1.0   |  2.1.0   |   0.3.0    |
|   2.2.x   |  2.2.x   |   0.4.0    |
|   2.3.x   |  2.3.x   |   0.4.2    |
|   2.4.x   |  2.4.x   |   1.0.0    |



<div class="alert note">Milvus 2.0.0-RC7 and later are not backward compatible with 2.0.0-RC6 and earlier due to changes made to storage formats.</div>

## Current version

The current version of Milvus_CLI is 1.0.0.
To find your installed version and see if you need to update, run `milvus_cli --version`.
