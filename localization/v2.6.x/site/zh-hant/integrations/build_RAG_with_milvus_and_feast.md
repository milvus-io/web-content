---
id: build_RAG_with_milvus_and_feast.md
summary: >-
  In this tutorial, we will build a Retrieval-Augmented Generation (RAG)
  pipeline using Feast and Milvus. Feast is an open-source feature store that
  streamlines feature management for machine learning, enabling efficient
  storage and retrieval of structured data for both training and real-time
  inference. Milvus is a high-performance vector database designed for fast
  similarity search, making it ideal for retrieving relevant documents in RAG
  workflows.
title: Build RAG with Milvus and Feast
---
<h1 id="Build-RAG-with-Milvus-and-Feast" class="common-anchor-header">Build RAG with Milvus and Feast<button data-href="#Build-RAG-with-Milvus-and-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>In this tutorial, we will build a Retrieval-Augmented Generation (RAG) pipeline using <a href="https://github.com/feast-dev/feast">Feast</a> and <a href="https://milvus.io/">Milvus</a>. Feast is an open-source feature store that streamlines feature management for machine learning, enabling efficient storage and retrieval of structured data for both training and real-time inference. Milvus is a high-performance vector database designed for fast similarity search, making it ideal for retrieving relevant documents in RAG workflows.</p>
<p>Essentially, we’ll use Feast to inject documents and structured data (i.e., features) into the context of an LLM (Large Language Model) to power a RAG Application (Retrieval Augmented Generation) with Milvus as the online vector database.</p>
<h1 id="Why-Feast" class="common-anchor-header">Why Feast?<button data-href="#Why-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p>Feast solves several common issues in this flow:</p>
<ol>
<li><strong>Online retrieval:</strong> At inference time, LLMs often need access to data that isn’t readily
available and needs to be precomputed from other data sources.
<ul>
<li>Feast manages deployment to a variety of online stores (e.g. Milvus, DynamoDB, Redis, Google Cloud Datastore) and
ensures necessary features are consistently <em>available</em> and <em>freshly computed</em> at inference time.</li>
</ul></li>
<li><strong>Vector Search:</strong> Feast has built support for vector similarity search that is easily configured declaritively so users can focus on their application. Milvus provides powerful and efficient vector similarity search capabilities.</li>
<li><strong>Richer structured data:</strong> Along with vector search, users can query standard structured fields to inject into the LLM context for better user experiences.</li>
<li><strong>Feature/Context and versioning:</strong> Different teams within an organization are often unable to reuse
data across projects and services, resulting in duplicate application logic. Models have data dependencies that need
to be versioned, for example when running A/B tests on model/prompt versions.
<ul>
<li>Feast enables discovery of and collaboration on previously used documents, features, and enables versioning of sets of
data.</li>
</ul></li>
</ol>
<p>We will:</p>
<ol>
<li>Deploy a local feature store with a <strong>Parquet file offline store</strong> and <strong>Milvus online store</strong>.</li>
<li>Write/materialize the data (i.e., feature values) from the offline store (a parquet file) into the online store (Milvus).</li>
<li>Serve the features using the Feast SDK with Milvus’s vector search capabilities</li>
<li>Inject the document into the LLM’s context to answer questions</li>
</ol>
<div class="alert note">
<p>This tutorial is based on the official Milvus integration guide from the <a href="https://github.com/feast-dev/feast/blob/master/examples/rag/milvus-quickstart.ipynb">Feast Repository</a>. While we strive to keep this tutorial up-to-date, if you encounter any discrepancies, please refer to the official guide and feel free to open an issue in our repository for any necessary updates.</p>
</div>
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
    </button></h2><h3 id="Dependencies" class="common-anchor-header">Dependencies</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&#x27;feast[milvus]&#x27;</span> openai -U -q</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong> (click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</div>
<p>We will use OpenAI as our LLM provider. You can login to its official website and prepare the <a href="https://platform.openai.com/api-keys">OPENAI_API_KEY</a> as an environment variable.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-**************&quot;</span>

llm_client = OpenAI(
    api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-Data" class="common-anchor-header">Prepare the Data<button data-href="#Prepare-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>We will use the data from the following folder as our example:<br>
<a href="https://github.com/feast-dev/feast/tree/master/examples/rag/feature_repo">Feast RAG Feature Repo</a></p>
<p>After downloading the data, you will find the following files:</p>
<pre><code translate="no" class="language-bash">feature_repo/
│── data/                  <span class="hljs-comment"># Contains pre-processed Wikipedia city data in Parquet format</span>
│── example_repo.py        <span class="hljs-comment"># Defines feature views and entities for the city data</span>
│── feature_store.yaml     <span class="hljs-comment"># Configures Milvus and feature store settings</span>
│── test_workflow.py       <span class="hljs-comment"># Example workflow for Feast operations</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Key-Configuration-Files" class="common-anchor-header">Key Configuration Files</h3><h4 id="1-featurestoreyaml" class="common-anchor-header">1. feature_store.yaml</h4><p>This file configures the feature store infrastructure:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">project:</span> <span class="hljs-string">rag</span>
<span class="hljs-attr">provider:</span> <span class="hljs-string">local</span>
<span class="hljs-attr">registry:</span> <span class="hljs-string">data/registry.db</span>

<span class="hljs-attr">online_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">milvus</span>            <span class="hljs-comment"># Uses Milvus for vector storage</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">data/online_store.db</span>
  <span class="hljs-attr">vector_enabled:</span> <span class="hljs-literal">true</span>    <span class="hljs-comment"># Enables vector similarity search</span>
  <span class="hljs-attr">embedding_dim:</span> <span class="hljs-number">384</span>      <span class="hljs-comment"># Dimension of our embeddings</span>
  <span class="hljs-attr">index_type:</span> <span class="hljs-string">&quot;FLAT&quot;</span>      <span class="hljs-comment"># Vector index type</span>
  <span class="hljs-attr">metric_type:</span> <span class="hljs-string">&quot;COSINE&quot;</span>   <span class="hljs-comment"># Similarity metric</span>

<span class="hljs-attr">offline_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">file</span>              <span class="hljs-comment"># Uses file-based offline storage</span>
<button class="copy-code-btn"></button></code></pre>
<p>This configuration establishes:</p>
<ul>
<li>Milvus as the online store for fast vector retrieval</li>
<li>File-based offline storage for historical data processing</li>
<li>Vector search capabilities with COSINE similarity</li>
</ul>
<h4 id="2-examplerepopy" class="common-anchor-header">2. example_repo.py</h4><p>Contains the feature definitions for our city data, including:</p>
<ul>
<li>Entity definitions for cities</li>
<li>Feature views for city information and embeddings</li>
<li>Schema specifications for the vector database</li>
</ul>
<h4 id="3-Data-Directory" class="common-anchor-header">3. Data Directory</h4><p>Contains our pre-processed Wikipedia city data with:</p>
<ul>
<li>City descriptions and summaries</li>
<li>Pre-computed embeddings (384-dimensional vectors)</li>
<li>Associated metadata like city names and states</li>
</ul>
<p>These files work together to create a feature store that combines Milvus’s vector search capabilities with Feast’s feature management, enabling efficient retrieval of relevant city information for our RAG application.</p>
<h2 id="Inspect-the-Data" class="common-anchor-header">Inspect the Data<button data-href="#Inspect-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>The raw feature data we have in this demo is stored in a local parquet file. The dataset Wikipedia summaries of diferent cities. Let’s inspect the data first.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

df = pd.read_parquet(
    <span class="hljs-string">&quot;/path/to/feature_repo/data/city_wikipedia_summaries_with_embeddings.parquet&quot;</span>
)
df[<span class="hljs-string">&quot;vector&quot;</span>] = df[<span class="hljs-string">&quot;vector&quot;</span>].apply(<span class="hljs-keyword">lambda</span> x: x.tolist())
embedding_length = <span class="hljs-built_in">len</span>(df[<span class="hljs-string">&quot;vector&quot;</span>][<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;embedding length = <span class="hljs-subst">{embedding_length}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">embedding length = 384
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

display(df.head())
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>item_id</th>
      <th>event_timestamp</th>
      <th>state</th>
      <th>wiki_summary</th>
      <th>sentence_chunks</th>
      <th>vector</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, often called New York City or simply...</td>
      <td>[0.1465730518102646, -0.07317650318145752, 0.0...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>The city comprises five boroughs, each of whic...</td>
      <td>[0.05218901485204697, -0.08449874818325043, 0....</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>2</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York is a global center of finance and com...</td>
      <td>[0.06769222766160965, -0.07371102273464203, -0...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>3</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York City is the epicenter of the world's ...</td>
      <td>[0.12095861881971359, -0.04279915615916252, 0....</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>4</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>With an estimated population in 2022 of 8,335,...</td>
      <td>[0.17943550646305084, -0.09458263963460922, 0....</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="common-anchor-header">Register Feature Definitions and Deploy the Feature Store<button data-href="#Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>After downloading the <code translate="no">feature_repo</code>, we need to run <code translate="no">feast apply</code> to register the feature views and entities defined in <code translate="no">example_repo.py</code>, and sets up <strong>Milvus</strong> as the online store tables.</p>
<p>Make sure you have nagivated to the <code translate="no">feature_repo</code> directory before running the command.</p>
<pre><code translate="no" class="language-bash">feast apply
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Features-into-Milvus" class="common-anchor-header">Load Features into Milvus<button data-href="#Load-Features-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Now we load the features into Milvus. This step involves serializing feature values from the offline store and writing them into Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">import</span> warnings

warnings.filterwarnings(<span class="hljs-string">&quot;ignore&quot;</span>)

store = FeatureStore(repo_path=<span class="hljs-string">&quot;/path/to/feature_repo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">store.write_to_online_store(feature_view_name=<span class="hljs-string">&quot;city_embeddings&quot;</span>, df=df)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Connecting to Milvus in local mode using /Users/jinhonglin/Desktop/feature_repo/data/online_store.db
</code></pre>
<p>Note that now there are <code translate="no">online_store.db</code> and <code translate="no">registry.db</code>, which store the materialized features and schema information, respectively. We can take a look at the <code translate="no">online_store.db</code> file.</p>
<pre><code translate="no" class="language-python">pymilvus_client = store._provider._online_store._connect(store.config)
COLLECTION_NAME = pymilvus_client.list_collections()[<span class="hljs-number">0</span>]

milvus_query_result = pymilvus_client.query(
    collection_name=COLLECTION_NAME,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;item_id == &#x27;0&#x27;&quot;</span>,
)
pd.DataFrame(milvus_query_result[<span class="hljs-number">0</span>]).head()
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>item_id_pk</th>
      <th>created_ts</th>
      <th>event_ts</th>
      <th>item_id</th>
      <th>sentence_chunks</th>
      <th>state</th>
      <th>vector</th>
      <th>wiki_summary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>0.146573</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>-0.073177</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>0.052114</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>0.033187</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>0.012013</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Build-RAG" class="common-anchor-header">Build RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Embedding-a-Query-Using-PyTorch-and-Sentence-Transformers" class="common-anchor-header">1. Embedding a Query Using PyTorch and Sentence Transformers</h3><p>During inference (e.g., during when a user submits a chat message) we need to embed the input text. This can be thought of as a feature transformation of the input data. In this example, we’ll do this with a small Sentence Transformer from Hugging Face.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, FieldSchema
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModel
<span class="hljs-keyword">from</span> example_repo <span class="hljs-keyword">import</span> city_embeddings_feature_view, item

TOKENIZER = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>
MODEL = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">mean_pooling</span>(<span class="hljs-params">model_output, attention_mask</span>):
    token_embeddings = model_output[
        <span class="hljs-number">0</span>
    ]  <span class="hljs-comment"># First element of model_output contains all token embeddings</span>
    input_mask_expanded = (
        attention_mask.unsqueeze(-<span class="hljs-number">1</span>).expand(token_embeddings.size()).<span class="hljs-built_in">float</span>()
    )
    <span class="hljs-keyword">return</span> torch.<span class="hljs-built_in">sum</span>(token_embeddings * input_mask_expanded, <span class="hljs-number">1</span>) / torch.clamp(
        input_mask_expanded.<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>), <span class="hljs-built_in">min</span>=<span class="hljs-number">1e-9</span>
    )


<span class="hljs-keyword">def</span> <span class="hljs-title function_">run_model</span>(<span class="hljs-params">sentences, tokenizer, model</span>):
    encoded_input = tokenizer(
        sentences, padding=<span class="hljs-literal">True</span>, truncation=<span class="hljs-literal">True</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>
    )
    <span class="hljs-comment"># Compute token embeddings</span>
    <span class="hljs-keyword">with</span> torch.no_grad():
        model_output = model(**encoded_input)

    sentence_embeddings = mean_pooling(model_output, encoded_input[<span class="hljs-string">&quot;attention_mask&quot;</span>])
    sentence_embeddings = F.normalize(sentence_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> sentence_embeddings
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Fetching-Real-time-Vectors-and-Data-for-Online-Inference" class="common-anchor-header">2. Fetching Real-time Vectors and Data for Online Inference</h3><p>Once the query has been transformed into an embedding, the next step is to retrieve relevant documents from the vector store. At inference time, we leverage vector similarity search to find the most relevant document embeddings stored in the online feature store, using <code translate="no">retrieve_online_documents_v2()</code>. These feature vectors can then be fed into the context of the LLM.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Which city has the largest population in New York?&quot;</span>

tokenizer = AutoTokenizer.from_pretrained(TOKENIZER)
model = AutoModel.from_pretrained(MODEL)
query_embedding = run_model(question, tokenizer, model)
query = query_embedding.detach().cpu().numpy().tolist()[<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

<span class="hljs-comment"># Retrieve top k documents</span>
context_data = store.retrieve_online_documents_v2(
    features=[
        <span class="hljs-string">&quot;city_embeddings:vector&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:item_id&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:state&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:sentence_chunks&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:wiki_summary&quot;</span>,
    ],
    query=query,
    top_k=<span class="hljs-number">3</span>,
    distance_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
).to_df()
display(context_data)
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>vector</th>
      <th>item_id</th>
      <th>state</th>
      <th>sentence_chunks</th>
      <th>wiki_summary</th>
      <th>distance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>0</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, often called New York City or simply...</td>
      <td>0.743023</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>6</td>
      <td>New York, New York</td>
      <td>New York is the geographical and demographic c...</td>
      <td>New York, often called New York City or simply...</td>
      <td>0.739733</td>
    </tr>
    <tr>
      <th>2</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>7</td>
      <td>New York, New York</td>
      <td>With more than 20.1 million people in its metr...</td>
      <td>New York, often called New York City or simply...</td>
      <td>0.728218</td>
    </tr>
  </tbody>
</table>
</div>
<h3 id="3-Formatting-Retrieved-Documents-for-RAG-Context" class="common-anchor-header">3. Formatting Retrieved Documents for RAG Context</h3><p>After retrieving relevant documents, we need to format the data into a structured context that can be efficiently used in downstream applications. This step ensures that the extracted information is clean, organized, and ready for integration into the RAG pipeline.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_documents</span>(<span class="hljs-params">context_df</span>):
    output_context = <span class="hljs-string">&quot;&quot;</span>
    unique_documents = context_df.drop_duplicates().apply(
        <span class="hljs-keyword">lambda</span> x: <span class="hljs-string">&quot;City &amp; State = {&quot;</span>
        + x[<span class="hljs-string">&quot;state&quot;</span>]
        + <span class="hljs-string">&quot;}\nSummary = {&quot;</span>
        + x[<span class="hljs-string">&quot;wiki_summary&quot;</span>].strip()
        + <span class="hljs-string">&quot;}&quot;</span>,
        axis=<span class="hljs-number">1</span>,
    )
    <span class="hljs-keyword">for</span> i, document_text <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(unique_documents):
        output_context += <span class="hljs-string">f&quot;****START DOCUMENT <span class="hljs-subst">{i}</span>****\n<span class="hljs-subst">{document_text.strip()}</span>\n****END DOCUMENT <span class="hljs-subst">{i}</span>****&quot;</span>
    <span class="hljs-keyword">return</span> output_context


RAG_CONTEXT = format_documents(context_data[[<span class="hljs-string">&quot;state&quot;</span>, <span class="hljs-string">&quot;wiki_summary&quot;</span>]])
<span class="hljs-built_in">print</span>(RAG_CONTEXT)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">****START DOCUMENT 0****
City &amp; State = {New York, New York}
Summary = {New York, often called New York City or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world's largest natural harbors. The city comprises five boroughs, each of which is coextensive with a respective county. New York is a global center of finance and commerce, culture and technology, entertainment and media, academics and scientific output, and the arts and fashion, and, as home to the headquarters of the United Nations, is an important center for international diplomacy. New York City is the epicenter of the world's principal metropolitan economy.
With an estimated population in 2022 of 8,335,897 distributed over 300.46 square miles (778.2 km2), the city is the most densely populated major city in the United States. New York has more than double the population of Los Angeles, the nation's second-most populous city. New York is the geographical and demographic center of both the Northeast megalopolis and the New York metropolitan area, the largest metropolitan area in the U.S. by both population and urban area. With more than 20.1 million people in its metropolitan statistical area and 23.5 million in its combined statistical area as of 2020, New York City is one of the world's most populous megacities. The city and its metropolitan area are the premier gateway for legal immigration to the United States. As many as 800 languages are spoken in New York, making it the most linguistically diverse city in the world. In 2021, the city was home to nearly 3.1 million residents born outside the U.S., the largest foreign-born population of any city in the world.
New York City traces its origins to Fort Amsterdam and a trading post founded on the southern tip of Manhattan Island by Dutch colonists in approximately 1624. The settlement was named New Amsterdam (Dutch: Nieuw Amsterdam) in 1626 and was chartered as a city in 1653. The city came under English control in 1664 and was temporarily renamed New York after King Charles II granted the lands to his brother, the Duke of York. before being permanently renamed New York in November 1674. New York City was the capital of the United States from 1785 until 1790. The modern city was formed by the 1898 consolidation of its five boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, and has been the largest U.S. city ever since.
Anchored by Wall Street in the Financial District of Lower Manhattan, New York City has been called both the world's premier financial and fintech center and the most economically powerful city in the world. As of 2022, the New York metropolitan area is the largest metropolitan economy in the world with a gross metropolitan product of over US$2.16 trillion. If the New York metropolitan area were its own country, it would have the tenth-largest economy in the world. The city is home to the world's two largest stock exchanges by market capitalization of their listed companies: the New York Stock Exchange and Nasdaq. New York City is an established safe haven for global investors. As of 2023, New York City is the most expensive city in the world for expatriates to live. New York City is home to the highest number of billionaires, individuals of ultra-high net worth (greater than US$30 million), and millionaires of any city in the world.}
****END DOCUMENT 0****
</code></pre>
<h3 id="4-Generating-Responses-Using-Retrieved-Context" class="common-anchor-header">4. Generating Responses Using Retrieved Context</h3><p>Now that we have formatted the retrieved documents, we can integrate them into a structured prompt for response generation. This step ensures that the assistant only relies on retrieved information and avoids hallucinating responses.</p>
<pre><code translate="no" class="language-python">FULL_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
You are an assistant for answering questions about states. You will be provided documentation from Wikipedia. Provide a conversational answer.
If you don&#x27;t know the answer, just say &quot;I do not know.&quot; Don&#x27;t make up an answer.

Here are document(s) you should use when answer the users question:
<span class="hljs-subst">{RAG_CONTEXT}</span>
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: FULL_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: question},
    ],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>.join([c.message.content <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> response.choices]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The city with the largest population in New York is New York City itself, often referred to as NYC. It is the most populous city in the United States, with an estimated population of about 8.3 million in 2022.
</code></pre>
