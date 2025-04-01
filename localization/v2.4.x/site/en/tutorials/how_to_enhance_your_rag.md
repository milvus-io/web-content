---
id: how_to_enhance_your_rag.md
summary: >-
  With the increasing popularity of Retrieval Augmented Generation RAG
  applications, there is a growing concern about improving their performance.
  This article presents all possible ways to optimize RAG pipelines and provides
  corresponding illustrations to help you quickly understand the mainstream RAG
  optimization strategies.
title: How to Enhance the Performance of Your RAG Pipeline
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">How to Enhance the Performance of Your RAG Pipeline<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>With the increasing popularity of Retrieval Augmented Generation (<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">RAG</a>) applications, there is a growing concern about improving their performance. This article presents all possible ways to optimize RAG pipelines and provides corresponding illustrations to help you quickly understand the mainstream RAG optimization strategies.</p>
<p>It’s important to note that we’ll only provide a high-level exploration of these strategies and techniques, focusing on how they integrate into a RAG system. However, we won’t delve into intricate details or guide you through step-by-step implementation.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">A Standard RAG Pipeline<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>The diagram below shows the most straightforward vanilla RAG pipeline. First, document chunks are loaded into a vector store (such as <a href="https://milvus.io/docs">Milvus</a> or <a href="https://zilliz.com/cloud">Zilliz cloud</a>). Then, the vector store retrieves the Top-K most relevant chunks related to the query. These relevant chunks are then injected into the <a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM</a>'s context prompt, and finally, the LLM returns the final answer.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">Various Types of RAG Enhancement Techniques<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>We can classify different RAG enhancement approaches based on their roles in the RAG pipeline stages.</p>
<ul>
<li><strong>Query Enhancement</strong>: Modifying and manipulating the query process of the RAG input to better express or process the query intent.</li>
<li><strong>Indexing Enhancement</strong>: Optimizing the creation of chunking indexes using techniques such as multi-chunking, step-wise indexing, or multi-way indexing.</li>
<li><strong>Retriever Enhancement</strong>: Applying optimization techniques and strategies during the retrieval process.</li>
<li><strong>Generator Enhancement</strong>: Adjusting and optimizing prompts when assembling prompts for the LLM to provide better responses.</li>
<li><strong>RAG Pipeline Enhancement</strong>: Dynamically switching processes within the entire RAG pipeline, including using agents or tools to optimize key steps in the RAG pipeline.</li>
</ul>
<p>Next, we will introduce specific methods under each of these categories.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">Query Enhancement<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Let’s explore four effective methods to enhance your query experience: Hypothetical Questions, Hypothetical Document Embeddings, Sub-Queries, and Stepback Prompts.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">Creating Hypothetical Questions</h3><p>Creating hypothetical questions involves utilizing an LLM to generate multiple questions that users might ask about the content within each document chunk. Before the user’s actual query reaches the LLM, the vector store retrieves the most relevant hypothetical questions related to the real query, along with their corresponding document chunks, and forwards them to the LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>This methodology bypasses the cross-domain asymmetry problem in the vector search process by directly engaging in query-to-query searches, alleviating the burden on vector searches. However, it introduces additional overhead and uncertainty in generating hypothetical questions.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (Hypothetical Document Embeddings)</h3><p>HyDE stands for Hypothetical Document Embeddings. It leverages an LLM to craft a "<strong><em>Hypothetical Document</em></strong>" or a <strong><em>fake</em></strong> answer in response to a user query devoid of contextual information. This fake answer is then converted into vector embeddings and employed to query the most relevant document chunks within a vector database. Subsequently, the vector database retrieves the Top-K most relevant document chunks and transmits them to the LLM and the original user query to generate the final answer.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>This method is similar to the hypothetical question technique in addressing cross-domain asymmetry in vector searches. However, it also has drawbacks, such as the added computational costs and uncertainties of generating fake answers.</p>
<p>For more information, refer to the <a href="https://arxiv.org/abs/2212.10496">HyDE</a> paper.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">Creating Sub-Queries</h3><p>When a user query is too complicated, we can use an LLM to break it down into simpler sub-queries before passing them on to the vector database and the LLM. Let’s take a look at an example.</p>
<p>Imagine a user asking: "<strong><em>What are the differences in features between Milvus and Zilliz Cloud?</em></strong>" This question is quite complex and might not have a straightforward answer in our knowledge base. To tackle this issue, we can split it into two simpler sub-queries:</p>
<ul>
<li>Sub-query 1: “What are the features of Milvus?”</li>
<li>Sub-query 2: “What are the features of Zilliz Cloud?”</li>
</ul>
<p>Once we have these sub-queries, we send them all to the vector database after converting them into vector embeddings. The vector database then finds the Top-K document chunks most relevant to each sub-query. Finally, the LLM uses this information to generate a better answer.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>By breaking down the user query into sub-queries, we make it easier for our system to find relevant information and provide accurate answers, even to complex questions.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">Creating Stepback Prompts</h3><p>Another way to simplify complex user queries is by creating <strong><em>stepback prompts</em></strong>. This technique involves abstracting complicated user queries into <em><em>"</em>stepback questions</em>"** using an LLM. Then, a vector database uses these stepback questions to retrieve the most relevant document chunks. Finally, the LLM generates a more accurate answer based on these retrieved document chunks.</p>
<p>Let’s illustrate this technique with an example. Consider the following query, which is quite complex and not straightforward to answer directly:</p>
<p><strong><em>Original User Query: “I have a dataset with 10 billion records and want to store it in Milvus for querying. Is it possible?”</em></strong></p>
<p>To simplify this user query, we can use an LLM to generate a more straightforward stepback question:</p>
<p><strong><em>Stepback Question: “What is the dataset size limit that Milvus can handle?”</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>This method can help us get better and more accurate answers to complex queries. It breaks down the original question into a simpler form, making it easier for our system to find relevant information and provide accurate responses.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">Indexing Enhancement<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Enhancing indexing is another strategy for enhancing the performance of your RAG applications. Let’s explore three indexing enhancement techniques.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">Merging Document Chunks Automatically</h3><p>When building an index, we can employ two granularity levels: child chunks and their corresponding parent chunks. Initially, we search for child chunks at a finer level of detail. Then, we apply a merging strategy: if a specific number, <strong><em>n</em></strong>, of child chunks from the first <strong><em>k</em></strong> child chunks belong to the same parent chunk, we provide this parent chunk to the LLM as contextual information.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>This methodology has been implemented in <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a>.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">Constructing Hierarchical Indices</h3><p>When creating indices for documents, we can establish a two-level index: one for document summaries and another for document chunks. The vector search process comprises two stages: initially, we filter relevant documents based on the summary, and subsequently, we retrieve corresponding document chunks exclusively within these relevant documents.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>This approach proves beneficial in situations involving extensive data volumes or instances where data is hierarchical, such as content retrieval within a library collection.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">Hybrid Retrieval and Reranking</h3><p>The Hybrid Retrieval and Reranking technique integrates one or more supplementary retrieval methods with <a href="https://zilliz.com/learn/vector-similarity-search">vector similarity retrieval</a>. Then, a <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">reranker</a> reranks the retrieved results based on their relevancy to the user query.</p>
<p>Common supplementary retrieval algorithms include lexical frequency-based methods like <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a> or big models utilizing sparse embeddings like <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a>. Re-ranking algorithms include RRF or more sophisticated models such as <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>, which resembles BERT-like architectures.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>This approach leverages diverse retrieval methods to improve retrieval quality and address potential gaps in vector recall.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">Retriever Enhancement<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Refinement of the retriever component within the RAG system can also improve RAG applications. Let’s explore some effective methods for enhancing the retriever.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">Sentence Window Retrieval</h3><p>In a basic RAG system, the document chunk given to the LLM is a larger window encompassing the retrieved embedding chunk. This ensures that the information provided to the LLM includes a broader range of contextual details, minimizing information loss. The Sentence Window Retrieval technique decouples the document chunk used for embedding retrieval from the chunk provided to the LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>However, expanding the window size may introduce additional interfering information. We can adjust the size of the window expansion based on the specific business needs.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">Meta-data Filtering</h3><p>To ensure more precise answers, we can refine the retrieved documents by filtering metadata like time and category before passing them to the LLM. For instance, if financial reports spanning multiple years are retrieved, filtering based on the desired year will refine the information to meet specific requirements. This method proves effective in situations with extensive data and detailed metadata, such as content retrieval in library collections.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">Generator Enhancement<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Let’s explore more RAG optimizing techniques by improving the generator within a RAG system.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">Compressing the LLM prompt</h3><p>The noise information within retrieved document chunks can significantly impact the accuracy of RAG’s final answer. The limited prompt window in LLMs also presents a hurdle for more accurate answers. To address this challenge, we can compress irrelevant details, emphasize key paragraphs, and reduce the overall context length of retrieved document chunks.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>This approach is similar to the earlier discussed hybrid retrieval and reranking method, wherein a reranker is utilized to sift out irrelevant document chunks.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">Adjusting the chunk order in the prompt</h3><p>In the paper "<a href="https://arxiv.org/abs/2307.03172">Lost in the middle</a>," researchers observed that LLMs often overlook information in the middle of given documents during the reasoning process. Instead, they tend to rely more on the information presented at the beginning and end of the documents.</p>
<p>Based on this observation, we can adjust the order of retrieved chunks to improve the answer quality: when retrieving multiple knowledge chunks, chunks with relatively low confidence are placed in the middle, and chunks with relatively high confidence are positioned at both ends.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">RAG Pipeline Enhancement<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>We can also improve the performance of your RAG applications by enhancing the whole RAG pipeline.</p>
<h3 id="Self-reflection" class="common-anchor-header">Self-reflection</h3><p>This approach incorporates the concept of self-reflection within AI agents. Then, how does this technique work?</p>
<p>Some initially retrieved Top-K document chunks are ambiguous and may not answer the user question directly. In such cases, we can conduct a second round of reflection to verify whether these chunks can genuinely address the query.</p>
<p>We can conduct the reflection using efficient reflection methods such as Natural Language Inference(NLI) models or additional tools like internet searches for verification.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>This concept of self-reflection has been explored in several papers or projects, including <a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>, <a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>, <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a>, etc.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">Query Routing with an Agent</h3><p>Sometimes, we don’t have to use a RAG system to answer simple questions as it might result in more misunderstanding and inference from misleading information. In such cases, we can use an agent as a router at the querying stage. This agent assesses whether the query needs to go through the RAG pipeline. If it does, the subsequent RAG pipeline is initiated; otherwise, the LLM directly addresses the query.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>The agent could take various forms, including an LLM, a small classification model, or even a set of rules.</p>
<p>By routing queries based on user intent, you can redirect a portion of the queries, leading to a significant boost in response time and a noticeable reduction in unnecessary noise.</p>
<p>We can extend the query routing technique to other processes within the RAG system, such as determining when to utilize tools like web searches, conducting sub-queries, or searching for images. This approach ensures that each step in the RAG system is optimized based on the specific requirements of the query, leading to more efficient and accurate information retrieval.</p>
<h2 id="Summary" class="common-anchor-header">Summary<button data-href="#Summary" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>While a vanilla RAG pipeline may appear simple, achieving optimal business performance often requires more sophisticated optimization techniques.</p>
<p>This article summarizes various popular approaches to enhancing the performance of your RAG applications. We also provided clear illustrations to help you quickly understand these concepts and techniques and expedite their implementation and optimization.</p>
<p>You can get the simple implementations of the major approaches listed in this article at this <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">GitHub link</a>.</p>
