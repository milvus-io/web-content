---
id: full_text_search_with_milvus.md
summary: >-
  With the release of Milvus 2.5, Full Text Search enables users to efficiently
  search for text based on keywords or phrases, providing powerful text
  retrieval capabilities. This feature enhances search accuracy and can be
  seamlessly combined with embedding-based retrieval for hybrid search, allowing
  for both semantic and keyword-based results in a single query. In this
  notebook, we will show basic usage of full text search in Milvus.
title: Full Text Search with Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-Text-Search-with-Milvus" class="common-anchor-header">Full Text Search with Milvus<button data-href="#Full-Text-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>With the release of Milvus 2.5, Full Text Search enables users to efficiently search for text based on keywords or phrases, providing powerful text retrieval capabilities. This feature enhances search accuracy and can be seamlessly combined with embedding-based retrieval for hybrid search, allowing for both semantic and keyword-based results in a single query. In this notebook, we will show basic usage of full text search in Milvus.</p>
<h2 id="Preparation" class="common-anchor-header">Preparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Download-the-dataset" class="common-anchor-header">Download the dataset</h3><p>The following command will download the example data used in original Anthropic <a href="https://github.com/anthropics/anthropic-cookbook/blob/main/skills/contextual-embeddings/guide.ipynb">demo</a>.</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/anthropics/anthropic-cookbook/refs/heads/main/skills/contextual-embeddings/data/codebase_chunks.json</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/anthropics/anthropic-cookbook/refs/heads/main/skills/contextual-embeddings/data/evaluation_set.jsonl</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Milvus-25" class="common-anchor-header">Install Milvus 2.5</h3><p>Check the <a href="https://milvus.io/docs/install_standalone-docker-compose.md">official installation guide</a> for more details.</p>
<h3 id="Install-PyMilvus" class="common-anchor-header">Install PyMilvus</h3><p>Run the following command to install PyMilvus:</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span> -U 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-Retriever" class="common-anchor-header">Define the Retriever</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    AnnSearchRequest,
    RRFRanker,
)

<span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction


<span class="hljs-keyword">class</span> <span class="hljs-title class_">HybridRetriever</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, uri, collection_name=<span class="hljs-string">&quot;hybrid&quot;</span>, dense_embedding_function=<span class="hljs-literal">None</span></span>):
        <span class="hljs-variable language_">self</span>.uri = uri
        <span class="hljs-variable language_">self</span>.collection_name = collection_name
        <span class="hljs-variable language_">self</span>.embedding_function = dense_embedding_function
        <span class="hljs-variable language_">self</span>.use_reranker = <span class="hljs-literal">True</span>
        <span class="hljs-variable language_">self</span>.use_sparse = <span class="hljs-literal">True</span>
        <span class="hljs-variable language_">self</span>.client = MilvusClient(uri=uri)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">build_collection</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(<span class="hljs-variable language_">self</span>.embedding_function.dim, <span class="hljs-built_in">dict</span>):
            dense_dim = <span class="hljs-variable language_">self</span>.embedding_function.dim[<span class="hljs-string">&quot;dense&quot;</span>]
        <span class="hljs-keyword">else</span>:
            dense_dim = <span class="hljs-variable language_">self</span>.embedding_function.dim

        tokenizer_params = {
            <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
            <span class="hljs-string">&quot;filter&quot;</span>: [
                <span class="hljs-string">&quot;lowercase&quot;</span>,
                {
                    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
                    <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">200</span>,
                },
                {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
                {
                    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
                    <span class="hljs-string">&quot;stop_words&quot;</span>: [
                        <span class="hljs-string">&quot;a&quot;</span>,
                        <span class="hljs-string">&quot;an&quot;</span>,
                        <span class="hljs-string">&quot;and&quot;</span>,
                        <span class="hljs-string">&quot;are&quot;</span>,
                        <span class="hljs-string">&quot;as&quot;</span>,
                        <span class="hljs-string">&quot;at&quot;</span>,
                        <span class="hljs-string">&quot;be&quot;</span>,
                        <span class="hljs-string">&quot;but&quot;</span>,
                        <span class="hljs-string">&quot;by&quot;</span>,
                        <span class="hljs-string">&quot;for&quot;</span>,
                        <span class="hljs-string">&quot;if&quot;</span>,
                        <span class="hljs-string">&quot;in&quot;</span>,
                        <span class="hljs-string">&quot;into&quot;</span>,
                        <span class="hljs-string">&quot;is&quot;</span>,
                        <span class="hljs-string">&quot;it&quot;</span>,
                        <span class="hljs-string">&quot;no&quot;</span>,
                        <span class="hljs-string">&quot;not&quot;</span>,
                        <span class="hljs-string">&quot;of&quot;</span>,
                        <span class="hljs-string">&quot;on&quot;</span>,
                        <span class="hljs-string">&quot;or&quot;</span>,
                        <span class="hljs-string">&quot;such&quot;</span>,
                        <span class="hljs-string">&quot;that&quot;</span>,
                        <span class="hljs-string">&quot;the&quot;</span>,
                        <span class="hljs-string">&quot;their&quot;</span>,
                        <span class="hljs-string">&quot;then&quot;</span>,
                        <span class="hljs-string">&quot;there&quot;</span>,
                        <span class="hljs-string">&quot;these&quot;</span>,
                        <span class="hljs-string">&quot;they&quot;</span>,
                        <span class="hljs-string">&quot;this&quot;</span>,
                        <span class="hljs-string">&quot;to&quot;</span>,
                        <span class="hljs-string">&quot;was&quot;</span>,
                        <span class="hljs-string">&quot;will&quot;</span>,
                        <span class="hljs-string">&quot;with&quot;</span>,
                    ],
                },
            ],
        }

        schema = MilvusClient.create_schema()
        schema.add_field(
            field_name=<span class="hljs-string">&quot;pk&quot;</span>,
            datatype=DataType.VARCHAR,
            is_primary=<span class="hljs-literal">True</span>,
            auto_id=<span class="hljs-literal">True</span>,
            max_length=<span class="hljs-number">100</span>,
        )
        schema.add_field(
            field_name=<span class="hljs-string">&quot;content&quot;</span>,
            datatype=DataType.VARCHAR,
            max_length=<span class="hljs-number">65535</span>,
            analyzer_params=tokenizer_params,
            enable_match=<span class="hljs-literal">True</span>,
            enable_analyzer=<span class="hljs-literal">True</span>,
        )
        schema.add_field(
            field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR
        )
        schema.add_field(
            field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=dense_dim
        )
        schema.add_field(
            field_name=<span class="hljs-string">&quot;original_uuid&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;doc_id&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64</span>)
        schema.add_field(
            field_name=<span class="hljs-string">&quot;chunk_id&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64</span>
        ),
        schema.add_field(field_name=<span class="hljs-string">&quot;original_index&quot;</span>, datatype=DataType.INT32)

        functions = Function(
            name=<span class="hljs-string">&quot;bm25&quot;</span>,
            function_type=FunctionType.BM25,
            input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        )

        schema.add_function(functions)

        index_params = MilvusClient.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
            index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
            metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
        )
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>
        )

        <span class="hljs-variable language_">self</span>.client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name,
            schema=schema,
            index_params=index_params,
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_data</span>(<span class="hljs-params">self, chunk, metadata</span>):
        embedding = <span class="hljs-variable language_">self</span>.embedding_function([chunk])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(embedding, <span class="hljs-built_in">dict</span>) <span class="hljs-keyword">and</span> <span class="hljs-string">&quot;dense&quot;</span> <span class="hljs-keyword">in</span> embedding:
            dense_vec = embedding[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>]
        <span class="hljs-keyword">else</span>:
            dense_vec = embedding[<span class="hljs-number">0</span>]
        <span class="hljs-variable language_">self</span>.client.insert(
            <span class="hljs-variable language_">self</span>.collection_name, {<span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec, **metadata}
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">self, query: <span class="hljs-built_in">str</span>, k: <span class="hljs-built_in">int</span> = <span class="hljs-number">20</span>, mode=<span class="hljs-string">&quot;hybrid&quot;</span></span>):

        output_fields = [
            <span class="hljs-string">&quot;content&quot;</span>,
            <span class="hljs-string">&quot;original_uuid&quot;</span>,
            <span class="hljs-string">&quot;doc_id&quot;</span>,
            <span class="hljs-string">&quot;chunk_id&quot;</span>,
            <span class="hljs-string">&quot;original_index&quot;</span>,
        ]
        <span class="hljs-keyword">if</span> mode <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;hybrid&quot;</span>]:
            embedding = <span class="hljs-variable language_">self</span>.embedding_function([query])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(embedding, <span class="hljs-built_in">dict</span>) <span class="hljs-keyword">and</span> <span class="hljs-string">&quot;dense&quot;</span> <span class="hljs-keyword">in</span> embedding:
                dense_vec = embedding[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>]
            <span class="hljs-keyword">else</span>:
                dense_vec = embedding[<span class="hljs-number">0</span>]

        <span class="hljs-keyword">if</span> mode == <span class="hljs-string">&quot;sparse&quot;</span>:
            results = <span class="hljs-variable language_">self</span>.client.search(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data=[query],
                anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
                limit=k,
                output_fields=output_fields,
            )
        <span class="hljs-keyword">elif</span> mode == <span class="hljs-string">&quot;dense&quot;</span>:
            results = <span class="hljs-variable language_">self</span>.client.search(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data=[dense_vec],
                anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
                limit=k,
                output_fields=output_fields,
            )
        <span class="hljs-keyword">elif</span> mode == <span class="hljs-string">&quot;hybrid&quot;</span>:
            full_text_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>}
            full_text_search_req = AnnSearchRequest(
                [query], <span class="hljs-string">&quot;sparse_vector&quot;</span>, full_text_search_params, limit=k
            )

            dense_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
            dense_req = AnnSearchRequest(
                [dense_vec], <span class="hljs-string">&quot;dense_vector&quot;</span>, dense_search_params, limit=k
            )

            results = <span class="hljs-variable language_">self</span>.client.hybrid_search(
                <span class="hljs-variable language_">self</span>.collection_name,
                [full_text_search_req, dense_req],
                ranker=RRFRanker(),
                limit=k,
                output_fields=output_fields,
            )
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;Invalid mode&quot;</span>)
        <span class="hljs-keyword">return</span> [
            {
                <span class="hljs-string">&quot;doc_id&quot;</span>: doc[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;doc_id&quot;</span>],
                <span class="hljs-string">&quot;chunk_id&quot;</span>: doc[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;chunk_id&quot;</span>],
                <span class="hljs-string">&quot;content&quot;</span>: doc[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>],
                <span class="hljs-string">&quot;score&quot;</span>: doc[<span class="hljs-string">&quot;distance&quot;</span>],
            }
            <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]
        ]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">dense_ef = <span class="hljs-title class_">BGEM3EmbeddingFunction</span>()
standard_retriever = <span class="hljs-title class_">HybridRetriever</span>(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;milvus_hybrid&quot;</span>,
    dense_embedding_function=dense_ef,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 108848.72it/s]
</code></pre>
<h3 id="Insert-the-data" class="common-anchor-header">Insert the data</h3><pre><code translate="no" class="language-python">path = <span class="hljs-string">&quot;codebase_chunks.json&quot;</span>
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> f:
    dataset = json.load(f)

is_insert = <span class="hljs-literal">True</span>
<span class="hljs-keyword">if</span> is_insert:
    standard_retriever.build_collection()
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> dataset:
        doc_content = doc[<span class="hljs-string">&quot;content&quot;</span>]
        <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> doc[<span class="hljs-string">&quot;chunks&quot;</span>]:
            metadata = {
                <span class="hljs-string">&quot;doc_id&quot;</span>: doc[<span class="hljs-string">&quot;doc_id&quot;</span>],
                <span class="hljs-string">&quot;original_uuid&quot;</span>: doc[<span class="hljs-string">&quot;original_uuid&quot;</span>],
                <span class="hljs-string">&quot;chunk_id&quot;</span>: chunk[<span class="hljs-string">&quot;chunk_id&quot;</span>],
                <span class="hljs-string">&quot;original_index&quot;</span>: chunk[<span class="hljs-string">&quot;original_index&quot;</span>],
                <span class="hljs-string">&quot;content&quot;</span>: chunk[<span class="hljs-string">&quot;content&quot;</span>],
            }
            chunk_content = chunk[<span class="hljs-string">&quot;content&quot;</span>]
            standard_retriever.insert_data(chunk_content, metadata)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Test-Sparse-Search" class="common-anchor-header">Test Sparse Search</h3><pre><code translate="no" class="language-python">results = standard_retriever.search(<span class="hljs-string">&quot;create a logger?&quot;</span>, mode=<span class="hljs-string">&quot;sparse&quot;</span>, k=<span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'doc_id': 'doc_10', 'chunk_id': 'doc_10_chunk_0', 'content': 'use {\n    crate::args::LogArgs,\n    anyhow::{anyhow, Result},\n    simplelog::{Config, LevelFilter, WriteLogger},\n    std::fs::File,\n};\n\npub struct Logger;\n\nimpl Logger {\n    pub fn init(args: &amp;impl LogArgs) -&gt; Result&lt;()&gt; {\n        let filter: LevelFilter = args.log_level().into();\n        if filter != LevelFilter::Off {\n            let logfile = File::create(args.log_file())\n                .map_err(|e| anyhow!(&quot;Failed to open log file: {e:}&quot;))?;\n            WriteLogger::init(filter, Config::default(), logfile)\n                .map_err(|e| anyhow!(&quot;Failed to initalize logger: {e:}&quot;))?;\n        }\n        Ok(())\n    }\n}\n', 'score': 9.12518310546875}, {'doc_id': 'doc_87', 'chunk_id': 'doc_87_chunk_3', 'content': '\t\tLoggerPtr INF = Logger::getLogger(LOG4CXX_TEST_STR(&quot;INF&quot;));\n\t\tINF-&gt;setLevel(Level::getInfo());\n\n\t\tLoggerPtr INF_ERR = Logger::getLogger(LOG4CXX_TEST_STR(&quot;INF.ERR&quot;));\n\t\tINF_ERR-&gt;setLevel(Level::getError());\n\n\t\tLoggerPtr DEB = Logger::getLogger(LOG4CXX_TEST_STR(&quot;DEB&quot;));\n\t\tDEB-&gt;setLevel(Level::getDebug());\n\n\t\t// Note: categories with undefined level\n\t\tLoggerPtr INF_UNDEF = Logger::getLogger(LOG4CXX_TEST_STR(&quot;INF.UNDEF&quot;));\n\t\tLoggerPtr INF_ERR_UNDEF = Logger::getLogger(LOG4CXX_TEST_STR(&quot;INF.ERR.UNDEF&quot;));\n\t\tLoggerPtr UNDEF = Logger::getLogger(LOG4CXX_TEST_STR(&quot;UNDEF&quot;));\n\n', 'score': 7.0077056884765625}, {'doc_id': 'doc_89', 'chunk_id': 'doc_89_chunk_3', 'content': 'using namespace log4cxx;\nusing namespace log4cxx::helpers;\n\nLOGUNIT_CLASS(FMTTestCase)\n{\n\tLOGUNIT_TEST_SUITE(FMTTestCase);\n\tLOGUNIT_TEST(test1);\n\tLOGUNIT_TEST(test1_expanded);\n\tLOGUNIT_TEST(test10);\n//\tLOGUNIT_TEST(test_date);\n\tLOGUNIT_TEST_SUITE_END();\n\n\tLoggerPtr root;\n\tLoggerPtr logger;\n\npublic:\n\tvoid setUp()\n\t{\n\t\troot = Logger::getRootLogger();\n\t\tMDC::clear();\n\t\tlogger = Logger::getLogger(LOG4CXX_TEST_STR(&quot;java.org.apache.log4j.PatternLayoutTest&quot;));\n\t}\n\n', 'score': 6.750633716583252}]
</code></pre>
<h2 id="Evaluation" class="common-anchor-header">Evaluation<button data-href="#Evaluation" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that we have inserted the dataset into Milvus, we can use dense, sparse, or hybrid search to retrieve the top 5 results. You can change the <code translate="no">mode</code> and evaluate each one. We present the Pass@5 metric, which involves retrieving the top 5 results for each query and calculating the Recall.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">load_jsonl</span>(<span class="hljs-params">file_path: <span class="hljs-built_in">str</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;Load JSONL file and return a list of dictionaries.&quot;&quot;&quot;</span>
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        <span class="hljs-keyword">return</span> [json.loads(line) <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> file]


dataset = load_jsonl(<span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>)
k = <span class="hljs-number">5</span>

<span class="hljs-comment"># mode can be &quot;dense&quot;, &quot;sparse&quot; or &quot;hybrid&quot;.</span>
mode = <span class="hljs-string">&quot;hybrid&quot;</span>

total_query_score = <span class="hljs-number">0</span>
num_queries = <span class="hljs-number">0</span>

<span class="hljs-keyword">for</span> query_item <span class="hljs-keyword">in</span> dataset:

    query = query_item[<span class="hljs-string">&quot;query&quot;</span>]

    golden_chunk_uuids = query_item[<span class="hljs-string">&quot;golden_chunk_uuids&quot;</span>]

    chunks_found = <span class="hljs-number">0</span>
    golden_contents = []
    <span class="hljs-keyword">for</span> doc_uuid, chunk_index <span class="hljs-keyword">in</span> golden_chunk_uuids:
        golden_doc = <span class="hljs-built_in">next</span>(
            (doc <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> query_item[<span class="hljs-string">&quot;golden_documents&quot;</span>] <span class="hljs-keyword">if</span> doc[<span class="hljs-string">&quot;uuid&quot;</span>] == doc_uuid),
            <span class="hljs-literal">None</span>,
        )
        <span class="hljs-keyword">if</span> golden_doc:
            golden_chunk = <span class="hljs-built_in">next</span>(
                (
                    chunk
                    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> golden_doc[<span class="hljs-string">&quot;chunks&quot;</span>]
                    <span class="hljs-keyword">if</span> chunk[<span class="hljs-string">&quot;index&quot;</span>] == chunk_index
                ),
                <span class="hljs-literal">None</span>,
            )
            <span class="hljs-keyword">if</span> golden_chunk:
                golden_contents.append(golden_chunk[<span class="hljs-string">&quot;content&quot;</span>].strip())

    results = standard_retriever.search(query, mode=mode, k=<span class="hljs-number">5</span>)

    <span class="hljs-keyword">for</span> golden_content <span class="hljs-keyword">in</span> golden_contents:
        <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> results[:k]:
            retrieved_content = doc[<span class="hljs-string">&quot;content&quot;</span>].strip()
            <span class="hljs-keyword">if</span> retrieved_content == golden_content:
                chunks_found += <span class="hljs-number">1</span>
                <span class="hljs-keyword">break</span>

    query_score = chunks_found / <span class="hljs-built_in">len</span>(golden_contents)

    total_query_score += query_score
    num_queries += <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Pass@5: &quot;</span>, total_query_score / num_queries)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Pass@5:  0.7911386328725037
</code></pre>
