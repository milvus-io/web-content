# FunctionType

This is an enumeration that provides the following constants.

## Constants

- BM25 = 1

    Sets the function type to BM25. This indicates that Milvus will utilize the BM25 algorithm to generate sparse embeddings for a designated VARCHAR or TEXT field.

- TEXTEMBEDDING = 2

    Sets the function type to TEXTEMBEDDING. This indicates that Milvus will transform raw text data from a VARCHAR or TEXT field into vector embeddings by automatically calling external model providers.

- RERANK = 3

    Sets the function type to **RERANK**. This indicates that Milvus will use a ranker to rerank candidates for improved search performance.

- MINHASH = 4

    Sets the function type to **MINHASH**. This indicates that Milvus will use the MinHash algorithm to generate a binary vector embedding for a designated VARCHAR or TEXT field.