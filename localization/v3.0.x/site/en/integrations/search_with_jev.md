---
id: search_with_jev.md
summary: >-
  Vector search finds information related to a query. Building a useful search
  application also involves decisions: which passages actually answer the
  question, whether an earlier answer can be reused, and whether an agent has
  enough evidence to stop searching.
title: Build RAG with Milvus + PII Masker
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Search with Jev and Milvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Vector search finds information related to a query. Building a useful search application also involves decisions: which passages actually answer the question, whether an earlier answer can be reused, and whether an agent has enough evidence to stop searching.</p>
<p>Milvus and Jev address different parts of this workflow. <a href="https://milvus.io/">Milvus</a> stores embeddings and retrieves candidate records, with metadata filters for constraints such as product version or knowledge-base scope. <a href="https://docs.typesafe.ai/introduction">Jev</a> evaluates the meaning of the retrieved text against instructions. Your application can use its judgments to select evidence or control the next search step.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">What does Jev do?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>A Jev request supplies context and one or more judgment questions. Its <a href="https://docs.typesafe.ai/primitives">typed outputs</a> include a choice among fixed options, an ordered score and a yes/no probability. These outputs let application code make a decision without parsing a free-form explanation. A generation model can still write an answer or a follow-up search query when needed.</p>
<p>For example, a user asks how to install Atlas v2. Milvus can restrict retrieval to v2 documentation and return similar passages about installation, upgrades and troubleshooting. Jev then evaluates which passages explain the initial setup. The application passes the selected evidence to an answer-generating model.</p>
<p>The responsibilities are straightforward:</p>
<ol>
<li><strong>Retrieve with Milvus:</strong> find candidates within the required metadata constraints.</li>
<li><strong>Judge with Jev:</strong> evaluate those candidates against the question and a task-specific criterion.</li>
<li><strong>Act in application code:</strong> reorder results, filter context, reuse an answer or continue searching.</li>
</ol>
<p>Some decisions happen before retrieval. Jev can choose a search scope or assess incoming documents before they enter a collection. Access control and exact filters remain the application’s responsibility.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">Explore the search scenarios<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p>The <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">Search with Jev collection</a> contains nine runnable tutorials. Each uses a small synthetic dataset and shows the retrieved records, judgments and resulting action.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">Select better evidence<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Rerank search results</a>: reorder documentation and coding-agent memories. A memory about a laptop port error may resemble a container connection problem; a more useful memory records the actual container-host fix.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">Filter retrieved context</a>: distinguish initial-installation instructions from upgrade and troubleshooting passages after Milvus applies the version filter.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">Rerank graph relations</a>: answer a question about a book author’s birthplace by selecting both the book-to-author bridge and the author-to-birthplace relation, then preserve that ranking when fetching source passages.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">Control search and answer reuse<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">Decide when to stop searching</a>: a generation model proposes searches from accumulated evidence, while Jev judges whether the original question is answerable. The examples cover a direct answer, a two-hop question and an unavailable fact that reaches the search limit without an answer.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">Route search queries</a>: select documentation, billing or memory search, then apply the corresponding Milvus filter. An out-of-scope query takes a separate path.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">Validate semantic cache reuse</a>: retrieve a similar cached request, then check whether its answer also satisfies the new request’s task, language and context requirements.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">Improve and inspect the knowledge pipeline<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">Curate documents before indexing</a>: distinguish substantive operational guidance from promotional or incomplete material, with separate index, review and exclude actions.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">Screen retrieved passages</a>: identify text that tries to redirect an assistant, while retaining ordinary security advice. This is an additional screening step, not a security guarantee.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">Evaluate search evidence</a>: judge passage relevance, whether evidence is sufficient and whether an answer makes unsupported claims. The examples deliberately remove evidence or add an unsupported statement to make the distinction visible.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">A ready-made reranking interface<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a> provides an application-side <code translate="no">JevRerankFunction</code>: pass a query and candidate document texts, and receive scored results with their original indices, sorted by relevance. Use those indices to reorder the records returned by Milvus.</p>
<p>The <a href="https://github.com/milvus-io/milvus-model/pull/90">Jev integration</a> has been merged. See the <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">implementation and constructor options</a> for the current API. It accepts <code translate="no">TYPESAFE_API_KEY</code> and defaults to <code translate="no">jev-latest</code>. Use a package version that includes this integration.</p>
<p>The current wrapper uses a claim-and-evidence relevance prompt. Check that this criterion fits your task. For custom judgments such as memory compatibility, stopping or routing, follow the linked tutorials using the TypeSafe API directly. The tutorials demonstrate direct API calls from Python application code.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Try it with Milvus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Open the reranking tutorial in Colab</a> to start with candidate retrieval and ranking. For local setup and the full tutorial list, see the <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">collection README</a>.</p>
<p>The examples use a <a href="https://aistudio.google.com/apikey">Gemini API key</a> for embeddings and a <a href="https://console.typesafe.ai/">TypeSafe API key</a> for Jev. The agentic-search tutorial also uses Gemini for query and answer generation. Sample text is sent to these API providers, and calls may consume credits.</p>
<p>The tutorials run with <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> by default and include connection options for a Milvus server or <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. The same division of work applies across deployments: Milvus retrieves candidates, and the application sends the relevant text to Jev for judgment.</p>
<p>Treat the examples as starting points for your own criteria and thresholds. A relevance score does not guarantee an answer is correct, and these small teaching datasets do not establish production accuracy or speed.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">Explore implementations and evaluation results<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>The following open-source projects apply these ideas to larger search workflows. Their linked reports explain the datasets, comparisons and limitations of each experiment.</p>
<table>
<thead>
<tr><th>Project</th><th>Search use case</th><th>Jev work</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>Persistent Markdown memory for coding agents</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Jev implementation</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">Evaluation</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">Vector Graph RAG</a></td><td>Vector and graph retrieval for multi-hop questions</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Jev implementation</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">Evaluation</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>Iterative search over private knowledge</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">Experiment runner</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">Search-stopping evaluation</a> (standalone experiment)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>Reuse answers to compatible requests</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Jev implementation</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">Evaluation</a></td></tr>
</tbody>
</table>
<p>DeepSearcher’s contribution is a standalone search-stopping experiment. The other implementation links show task-specific Jev integrations. Results from these projects should be read in their own evaluation context, rather than treated as a shared benchmark.</p>
