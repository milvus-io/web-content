---
id: langextract_milvus_demo.md
summary: >-
  This guide demonstrates how to use LangExtract with Milvus to build an
  intelligent document processing and retrieval system.
title: LangExtract + Milvus Integration
---
<h1 id="LangExtract-+-Milvus-Integration" class="common-anchor-header">LangExtract + Milvus Integration<button data-href="#LangExtract-+-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langextract_milvus_demo.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langextract_milvus_demo.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>This guide demonstrates how to use <a href="https://github.com/google/langextract">LangExtract</a> with <a href="https://milvus.io/">Milvus</a> to build an intelligent document processing and retrieval system.</p>
<p>LangExtract is a Python library that uses Large Language Models (LLMs) to extract structured information from unstructured text documents with precise source grounding. The system combines LangExtract’s extraction capabilities with Milvus’s vector storage to enable both semantic similarity search and precise metadata filtering.</p>
<p>This integration is particularly valuable for content management, semantic search, knowledge discovery, and building recommendation systems based on extracted document attributes.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Before running this notebook, make sure you have the following dependencies installed:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus milvus-lite langextract google-genai requests tqdm pandas</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong> (click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</div>
<p>We will use Gemini as the LLM in this example. You should prepare the <a href="https://aistudio.google.com/app/apikey">api key</a> <code translate="no">GEMINI_API_KEY</code> as an environment variable.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;GEMINI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;AIza*****************&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-LangExtract-+-Milvus-pipeline" class="common-anchor-header">Define the LangExtract + Milvus pipeline<button data-href="#Define-the-LangExtract-+-Milvus-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>We will define the pipeline that uses LangExtract for structured information extraction and Milvus as the vector store.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> langextract <span class="hljs-keyword">as</span> lx
<span class="hljs-keyword">import</span> textwrap
<span class="hljs-keyword">from</span> google <span class="hljs-keyword">import</span> genai
<span class="hljs-keyword">from</span> google.genai.types <span class="hljs-keyword">import</span> EmbedContentConfig
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> uuid
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configuration-and-Setup" class="common-anchor-header">Configuration and Setup<button data-href="#Configuration-and-Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>Let’s configure our global parameters for the integration. We’ll use Gemini’s embedding model to generate vector representations for our documents.</p>
<pre><code translate="no" class="language-python">genai_client = genai.Client()

COLLECTION_NAME = <span class="hljs-string">&quot;document_extractions&quot;</span>
EMBEDDING_MODEL = <span class="hljs-string">&quot;gemini-embedding-001&quot;</span>
EMBEDDING_DIM = <span class="hljs-number">3072</span>  <span class="hljs-comment"># Default dimension for gemini-embedding-001</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-Milvus-Client" class="common-anchor-header">Initialize Milvus Client<button data-href="#Initialize-Milvus-Client" class="anchor-icon" translate="no">
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
    </button></h2><p>Now let’s initialize our Milvus client. We’ll use a local database file for simplicity, but this can easily be scaled to a full Milvus server deployment.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>As for the argument of <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Setting the <code translate="no">uri</code> as a local file, e.g.<code translate="no">./milvus.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</li>
<li>If you have large scale of data, you can set up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">docker or kubernetes</a>. In this setup, please use the server uri, e.g.<code translate="no">http://localhost:19530</code>, as your <code translate="no">uri</code>.</li>
<li>If you want to use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint and Api key</a> in Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Sample-Data-Preparation" class="common-anchor-header">Sample Data Preparation<button data-href="#Sample-Data-Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>For this demonstration, we’ll use movie descriptions as our sample documents. This showcases LangExtract’s ability to extract structured information like genres, characters, and themes from unstructured text.</p>
<pre><code translate="no" class="language-python">sample_documents = [
    <span class="hljs-string">&quot;John McClane fights terrorists in a Los Angeles skyscraper during Christmas Eve. The action-packed thriller features intense gunfights and explosive scenes.&quot;</span>,
    <span class="hljs-string">&quot;A young wizard named Harry Potter discovers his magical abilities at Hogwarts School. The fantasy adventure includes magical creatures and epic battles.&quot;</span>,
    <span class="hljs-string">&quot;Tony Stark builds an advanced suit of armor to become Iron Man. The superhero movie showcases cutting-edge technology and spectacular action sequences.&quot;</span>,
    <span class="hljs-string">&quot;A group of friends get lost in a haunted forest where supernatural creatures lurk. The horror film creates a terrifying atmosphere with jump scares.&quot;</span>,
    <span class="hljs-string">&quot;Two detectives investigate a series of mysterious murders in New York City. The crime thriller features suspenseful plot twists and dramatic confrontations.&quot;</span>,
    <span class="hljs-string">&quot;A brilliant scientist creates artificial intelligence that becomes self-aware. The sci-fi thriller explores the dangers of advanced technology and human survival.&quot;</span>,
    <span class="hljs-string">&quot;A romantic comedy about two friends who fall in love during a cross-country road trip. The drama explores personal growth and relationship dynamics.&quot;</span>,
    <span class="hljs-string">&quot;An evil sorcerer threatens to destroy the magical kingdom. A brave hero must gather allies and master ancient magic to save the fantasy world.&quot;</span>,
    <span class="hljs-string">&quot;Space marines battle alien invaders on a distant planet. The action sci-fi movie features futuristic weapons and intense combat in space.&quot;</span>,
    <span class="hljs-string">&quot;A detective investigates supernatural crimes in Victorian London. The horror thriller combines period drama with paranormal investigation themes.&quot;</span>,
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;=== LangExtract + Milvus Integration Demo ===&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Preparing to process <span class="hljs-subst">{<span class="hljs-built_in">len</span>(sample_documents)}</span> documents&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">=== LangExtract + Milvus Integration Demo ===
Preparing to process 10 documents
</code></pre>
<h2 id="Setting-Up-the-Milvus-Collection" class="common-anchor-header">Setting Up the Milvus Collection<button data-href="#Setting-Up-the-Milvus-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Before we can store our extracted data, we need to create a Milvus collection with the appropriate schema. This collection will store the original document text, vector embeddings, and extracted metadata fields.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n1. Setting up Milvus collection...&quot;</span>)

<span class="hljs-comment"># Drop existing collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name=COLLECTION_NAME):
    client.drop_collection(collection_name=COLLECTION_NAME)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Dropped existing collection: <span class="hljs-subst">{COLLECTION_NAME}</span>&quot;</span>)

<span class="hljs-comment"># Create collection schema</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
    description=<span class="hljs-string">&quot;Document extraction results and vector storage&quot;</span>,
)

<span class="hljs-comment"># Add fields - simplified to 3 main metadata fields</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">100</span>, is_primary=<span class="hljs-literal">True</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;document_text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">10000</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=EMBEDDING_DIM
)

<span class="hljs-comment"># Create collection</span>
client.create_collection(collection_name=COLLECTION_NAME, schema=schema)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{COLLECTION_NAME}</span>&#x27; created successfully&quot;</span>)

<span class="hljs-comment"># Create vector index</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)
client.create_index(collection_name=COLLECTION_NAME, index_params=index_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector index created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1. Setting up Milvus collection...
Dropped existing collection: document_extractions
Collection 'document_extractions' created successfully
Vector index created successfully
</code></pre>
<h2 id="Defining-the-Extraction-Schema" class="common-anchor-header">Defining the Extraction Schema<button data-href="#Defining-the-Extraction-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>LangExtract uses prompts and examples to guide the LLM in extracting structured information. Let’s define our extraction schema for movie descriptions, specifying what information to extract and how to categorize it.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n2. Extracting tags from documents...&quot;</span>)

<span class="hljs-comment"># Define extraction prompt - for movie descriptions, specify attribute value ranges</span>
prompt = textwrap.dedent(
    <span class="hljs-string">&quot;&quot;&quot;\
    Extract movie genre, main characters, and key themes from movie descriptions.
    Use exact text for extractions. Do not paraphrase or overlap entities.
    
    For each extraction, provide attributes with values from these predefined sets:
    
    Genre attributes:
    - primary_genre: [&quot;action&quot;, &quot;comedy&quot;, &quot;drama&quot;, &quot;horror&quot;, &quot;sci-fi&quot;, &quot;fantasy&quot;, &quot;thriller&quot;, &quot;crime&quot;, &quot;superhero&quot;]
    - secondary_genre: [&quot;action&quot;, &quot;comedy&quot;, &quot;drama&quot;, &quot;horror&quot;, &quot;sci-fi&quot;, &quot;fantasy&quot;, &quot;thriller&quot;, &quot;crime&quot;, &quot;superhero&quot;]
    
    Character attributes:
    - role: [&quot;protagonist&quot;, &quot;antagonist&quot;, &quot;supporting&quot;]
    - type: [&quot;hero&quot;, &quot;villain&quot;, &quot;detective&quot;, &quot;military&quot;, &quot;wizard&quot;, &quot;scientist&quot;, &quot;friends&quot;, &quot;investigator&quot;]
    
    Theme attributes:
    - theme_type: [&quot;conflict&quot;, &quot;investigation&quot;, &quot;personal_growth&quot;, &quot;technology&quot;, &quot;magic&quot;, &quot;survival&quot;, &quot;romance&quot;]
    - setting: [&quot;urban&quot;, &quot;space&quot;, &quot;fantasy_world&quot;, &quot;school&quot;, &quot;forest&quot;, &quot;victorian&quot;, &quot;america&quot;, &quot;future&quot;]
    
    Focus on identifying key elements that would be useful for movie search and filtering.&quot;&quot;&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2. Extracting tags from documents...
</code></pre>
<h2 id="Providing-Examples-for-Better-Extraction" class="common-anchor-header">Providing Examples for Better Extraction<button data-href="#Providing-Examples-for-Better-Extraction" class="anchor-icon" translate="no">
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
    </button></h2><p>To improve the quality and consistency of extractions, we’ll provide LangExtract with a few examples. These examples demonstrate the expected format and help the model understand our extraction requirements.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Provide examples to guide the model - n-shot examples for movie descriptions</span>
<span class="hljs-comment"># Unify attribute keys to ensure consistency in extraction results</span>
examples = [
    lx.data.ExampleData(
        text=<span class="hljs-string">&quot;A space marine battles alien creatures on a distant planet. The sci-fi action movie features futuristic weapons and intense combat scenes.&quot;</span>,
        extractions=[
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;genre&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;sci-fi action&quot;</span>,
                attributes={<span class="hljs-string">&quot;primary_genre&quot;</span>: <span class="hljs-string">&quot;sci-fi&quot;</span>, <span class="hljs-string">&quot;secondary_genre&quot;</span>: <span class="hljs-string">&quot;action&quot;</span>},
            ),
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;character&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;space marine&quot;</span>,
                attributes={<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;protagonist&quot;</span>, <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;military&quot;</span>},
            ),
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;theme&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;battles alien creatures&quot;</span>,
                attributes={<span class="hljs-string">&quot;theme_type&quot;</span>: <span class="hljs-string">&quot;conflict&quot;</span>, <span class="hljs-string">&quot;setting&quot;</span>: <span class="hljs-string">&quot;space&quot;</span>},
            ),
        ],
    ),
    lx.data.ExampleData(
        text=<span class="hljs-string">&quot;A detective investigates supernatural murders in Victorian London. The horror thriller film combines period drama with paranormal elements.&quot;</span>,
        extractions=[
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;genre&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;horror thriller&quot;</span>,
                attributes={<span class="hljs-string">&quot;primary_genre&quot;</span>: <span class="hljs-string">&quot;horror&quot;</span>, <span class="hljs-string">&quot;secondary_genre&quot;</span>: <span class="hljs-string">&quot;thriller&quot;</span>},
            ),
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;character&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;detective&quot;</span>,
                attributes={<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;protagonist&quot;</span>, <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;detective&quot;</span>},
            ),
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;theme&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;supernatural murders&quot;</span>,
                attributes={<span class="hljs-string">&quot;theme_type&quot;</span>: <span class="hljs-string">&quot;investigation&quot;</span>, <span class="hljs-string">&quot;setting&quot;</span>: <span class="hljs-string">&quot;victorian&quot;</span>},
            ),
        ],
    ),
    lx.data.ExampleData(
        text=<span class="hljs-string">&quot;Two friends embark on a road trip adventure across America. The comedy drama explores friendship and self-discovery through humorous situations.&quot;</span>,
        extractions=[
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;genre&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;comedy drama&quot;</span>,
                attributes={<span class="hljs-string">&quot;primary_genre&quot;</span>: <span class="hljs-string">&quot;comedy&quot;</span>, <span class="hljs-string">&quot;secondary_genre&quot;</span>: <span class="hljs-string">&quot;drama&quot;</span>},
            ),
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;character&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;two friends&quot;</span>,
                attributes={<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;protagonist&quot;</span>, <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;friends&quot;</span>},
            ),
            lx.data.Extraction(
                extraction_class=<span class="hljs-string">&quot;theme&quot;</span>,
                extraction_text=<span class="hljs-string">&quot;friendship and self-discovery&quot;</span>,
                attributes={<span class="hljs-string">&quot;theme_type&quot;</span>: <span class="hljs-string">&quot;personal_growth&quot;</span>, <span class="hljs-string">&quot;setting&quot;</span>: <span class="hljs-string">&quot;america&quot;</span>},
            ),
        ],
    ),
]

<span class="hljs-comment"># Extract from each document</span>
extraction_results = []
<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> sample_documents:
    result = lx.extract(
        text_or_documents=doc,
        prompt_description=prompt,
        examples=examples,
        model_id=<span class="hljs-string">&quot;gemini-2.0-flash&quot;</span>,
    )
    extraction_results.append(result)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Successfully extracted from document: <span class="hljs-subst">{doc[:<span class="hljs-number">50</span>]}</span>...&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Completed tag extraction, processed <span class="hljs-subst">{<span class="hljs-built_in">len</span>(extraction_results)}</span> documents&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Processing-and-Vectorizing-the-Results" class="common-anchor-header">Processing and Vectorizing the Results<button data-href="#Processing-and-Vectorizing-the-Results" class="anchor-icon" translate="no">
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
    </button></h2><p>Now we need to process the extraction results and generate vector embeddings for each document. We’ll also flatten the extracted attributes into separate fields to make them easily searchable in Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n3. Processing extraction results and generating vectors...&quot;</span>)

processed_data = []

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> extraction_results:
    <span class="hljs-comment"># Generate vectors for documents</span>
    embedding_response = genai_client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=[result.text],
        config=EmbedContentConfig(
            task_type=<span class="hljs-string">&quot;RETRIEVAL_DOCUMENT&quot;</span>,
            output_dimensionality=EMBEDDING_DIM,
        ),
    )
    embedding = embedding_response.embeddings[<span class="hljs-number">0</span>].values
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Successfully generated vector: <span class="hljs-subst">{result.text[:<span class="hljs-number">30</span>]}</span>...&quot;</span>)

    <span class="hljs-comment"># Initialize data structure, flatten attributes into separate fields</span>
    data_entry = {
        <span class="hljs-string">&quot;id&quot;</span>: result.document_id <span class="hljs-keyword">or</span> <span class="hljs-built_in">str</span>(uuid.uuid4()),
        <span class="hljs-string">&quot;document_text&quot;</span>: result.text,
        <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
        <span class="hljs-comment"># Initialize all possible fields with default values</span>
        <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;unknown&quot;</span>,
        <span class="hljs-string">&quot;primary_genre&quot;</span>: <span class="hljs-string">&quot;unknown&quot;</span>,
        <span class="hljs-string">&quot;secondary_genre&quot;</span>: <span class="hljs-string">&quot;unknown&quot;</span>,
        <span class="hljs-string">&quot;character_role&quot;</span>: <span class="hljs-string">&quot;unknown&quot;</span>,
        <span class="hljs-string">&quot;character_type&quot;</span>: <span class="hljs-string">&quot;unknown&quot;</span>,
        <span class="hljs-string">&quot;theme_type&quot;</span>: <span class="hljs-string">&quot;unknown&quot;</span>,
        <span class="hljs-string">&quot;theme_setting&quot;</span>: <span class="hljs-string">&quot;unknown&quot;</span>,
    }

    <span class="hljs-comment"># Process extraction results, flatten attributes</span>
    <span class="hljs-keyword">for</span> extraction <span class="hljs-keyword">in</span> result.extractions:
        <span class="hljs-keyword">if</span> extraction.extraction_class == <span class="hljs-string">&quot;genre&quot;</span>:
            <span class="hljs-comment"># Flatten genre attributes</span>
            data_entry[<span class="hljs-string">&quot;genre&quot;</span>] = extraction.extraction_text
            attrs = extraction.attributes <span class="hljs-keyword">or</span> {}
            data_entry[<span class="hljs-string">&quot;primary_genre&quot;</span>] = attrs.get(<span class="hljs-string">&quot;primary_genre&quot;</span>, <span class="hljs-string">&quot;unknown&quot;</span>)
            data_entry[<span class="hljs-string">&quot;secondary_genre&quot;</span>] = attrs.get(<span class="hljs-string">&quot;secondary_genre&quot;</span>, <span class="hljs-string">&quot;unknown&quot;</span>)

        <span class="hljs-keyword">elif</span> extraction.extraction_class == <span class="hljs-string">&quot;character&quot;</span>:
            <span class="hljs-comment"># Flatten character attributes (take first main character&#x27;s attributes)</span>
            attrs = extraction.attributes <span class="hljs-keyword">or</span> {}
            <span class="hljs-keyword">if</span> (
                data_entry[<span class="hljs-string">&quot;character_role&quot;</span>] == <span class="hljs-string">&quot;unknown&quot;</span>
            ):  <span class="hljs-comment"># Only take first character&#x27;s attributes</span>
                data_entry[<span class="hljs-string">&quot;character_role&quot;</span>] = attrs.get(<span class="hljs-string">&quot;role&quot;</span>, <span class="hljs-string">&quot;unknown&quot;</span>)
                data_entry[<span class="hljs-string">&quot;character_type&quot;</span>] = attrs.get(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;unknown&quot;</span>)

        <span class="hljs-keyword">elif</span> extraction.extraction_class == <span class="hljs-string">&quot;theme&quot;</span>:
            <span class="hljs-comment"># Flatten theme attributes (take first main theme&#x27;s attributes)</span>
            attrs = extraction.attributes <span class="hljs-keyword">or</span> {}
            <span class="hljs-keyword">if</span> (
                data_entry[<span class="hljs-string">&quot;theme_type&quot;</span>] == <span class="hljs-string">&quot;unknown&quot;</span>
            ):  <span class="hljs-comment"># Only take first theme&#x27;s attributes</span>
                data_entry[<span class="hljs-string">&quot;theme_type&quot;</span>] = attrs.get(<span class="hljs-string">&quot;theme_type&quot;</span>, <span class="hljs-string">&quot;unknown&quot;</span>)
                data_entry[<span class="hljs-string">&quot;theme_setting&quot;</span>] = attrs.get(<span class="hljs-string">&quot;setting&quot;</span>, <span class="hljs-string">&quot;unknown&quot;</span>)

    processed_data.append(data_entry)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Completed data processing, ready to insert <span class="hljs-subst">{<span class="hljs-built_in">len</span>(processed_data)}</span> records&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">3. Processing extraction results and generating vectors...
Successfully generated vector: John McClane fights terrorists...
Successfully generated vector: A young wizard named Harry Pot...
Successfully generated vector: Tony Stark builds an advanced ...
Successfully generated vector: A group of friends get lost in...
Successfully generated vector: Two detectives investigate a s...
Successfully generated vector: A brilliant scientist creates ...
Successfully generated vector: A romantic comedy about two fr...
Successfully generated vector: An evil sorcerer threatens to ...
Successfully generated vector: Space marines battle alien inv...
Successfully generated vector: A detective investigates super...
Completed data processing, ready to insert 10 records
</code></pre>
<h2 id="Inserting-Data-into-Milvus" class="common-anchor-header">Inserting Data into Milvus<button data-href="#Inserting-Data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>With our processed data ready, let’s insert it into the Milvus collection. This will enable us to perform both semantic searches and precise metadata filtering.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n4. Inserting data into Milvus...&quot;</span>)

<span class="hljs-keyword">if</span> processed_data:
    res = client.insert(collection_name=COLLECTION_NAME, data=processed_data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Successfully inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(processed_data)}</span> documents into Milvus&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Insert result: <span class="hljs-subst">{res}</span>&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;No data to insert&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">4. Inserting data into Milvus...
Successfully inserted 10 documents into Milvus
Insert result: {'insert_count': 10, 'ids': ['doc_f8797155', 'doc_78c7e586', 'doc_fa3a3ab5', 'doc_64981815', 'doc_3ab18cb2', 'doc_1ea42b18', 'doc_f0779243', 'doc_386590b7', 'doc_3b3ae1ab', 'doc_851089d6']}
</code></pre>
<h2 id="Demonstrating-Metadata-Filtering" class="common-anchor-header">Demonstrating Metadata Filtering<button data-href="#Demonstrating-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>One of the key advantages of combining LangExtract with Milvus is the ability to perform precise filtering based on extracted metadata. Let’s demonstrate this with some filter expression searches.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== Filter Expression Search Examples ===&quot;</span>)

<span class="hljs-comment"># Load collection into memory for querying</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Loading collection into memory...&quot;</span>)
client.load_collection(collection_name=COLLECTION_NAME)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Collection loaded successfully&quot;</span>)

<span class="hljs-comment"># Search for thriller movies</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n1. Searching for thriller movies:&quot;</span>)
results = client.query(
    collection_name=COLLECTION_NAME,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;secondary_genre == &quot;thriller&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;document_text&quot;</span>, <span class="hljs-string">&quot;genre&quot;</span>, <span class="hljs-string">&quot;primary_genre&quot;</span>, <span class="hljs-string">&quot;secondary_genre&quot;</span>],
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- <span class="hljs-subst">{result[<span class="hljs-string">&#x27;document_text&#x27;</span>][:<span class="hljs-number">100</span>]}</span>...&quot;</span>)
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;  Genre: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;genre&#x27;</span>]}</span> (<span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;primary_genre&#x27;</span>)}</span>-<span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;secondary_genre&#x27;</span>)}</span>)&quot;</span>
    )

<span class="hljs-comment"># Search for movies with military characters</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n2. Searching for movies with military characters:&quot;</span>)
results = client.query(
    collection_name=COLLECTION_NAME,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;character_type == &quot;military&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;document_text&quot;</span>, <span class="hljs-string">&quot;genre&quot;</span>, <span class="hljs-string">&quot;character_role&quot;</span>, <span class="hljs-string">&quot;character_type&quot;</span>],
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- <span class="hljs-subst">{result[<span class="hljs-string">&#x27;document_text&#x27;</span>][:<span class="hljs-number">100</span>]}</span>...&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Genre: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;genre&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;  Character: <span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;character_role&#x27;</span>)}</span> (<span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;character_type&#x27;</span>)}</span>)&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">=== Filter Expression Search Examples ===
Loading collection into memory...
Collection loaded successfully

1. Searching for thriller movies:
- A brilliant scientist creates artificial intelligence that becomes self-aware. The sci-fi thriller e...
  Genre: sci-fi thriller (sci-fi-thriller)
- Two detectives investigate a series of mysterious murders in New York City. The crime thriller featu...
  Genre: crime thriller (crime-thriller)
- A detective investigates supernatural crimes in Victorian London. The horror thriller combines perio...
  Genre: horror thriller (horror-thriller)
- John McClane fights terrorists in a Los Angeles skyscraper during Christmas Eve. The action-packed t...
  Genre: action-packed thriller (action-thriller)

2. Searching for movies with military characters:
- Space marines battle alien invaders on a distant planet. The action sci-fi movie features futuristic...
  Genre: action sci-fi
  Character: protagonist (military)
</code></pre>
<h2 id="Combining-Semantic-Search-with-Metadata-Filtering" class="common-anchor-header">Combining Semantic Search with Metadata Filtering<button data-href="#Combining-Semantic-Search-with-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>The real power of this integration comes from combining semantic vector search with precise metadata filtering. This allows us to find semantically similar content while applying specific constraints based on extracted attributes.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== Semantic Search Examples ===&quot;</span>)

<span class="hljs-comment"># 1. Search for action-related content + only thriller genre</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n1. Searching for action-related content + only thriller genre:&quot;</span>)
query_text = <span class="hljs-string">&quot;action fight combat battle explosion&quot;</span>

query_embedding_response = genai_client.models.embed_content(
    model=EMBEDDING_MODEL,
    contents=[query_text],
    config=EmbedContentConfig(
        task_type=<span class="hljs-string">&quot;RETRIEVAL_QUERY&quot;</span>,
        output_dimensionality=EMBEDDING_DIM,
    ),
)
query_embedding = query_embedding_response.embeddings[<span class="hljs-number">0</span>].values

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_embedding],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;secondary_genre == &quot;thriller&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;document_text&quot;</span>, <span class="hljs-string">&quot;genre&quot;</span>, <span class="hljs-string">&quot;primary_genre&quot;</span>, <span class="hljs-string">&quot;secondary_genre&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
)

<span class="hljs-keyword">if</span> results:
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- Similarity: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Text: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;document_text&#x27;</span>][:<span class="hljs-number">100</span>]}</span>...&quot;</span>)
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">f&quot;  Genre: <span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;genre&#x27;</span>)}</span> (<span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;primary_genre&#x27;</span>)}</span>-<span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;secondary_genre&#x27;</span>)}</span>)&quot;</span>
        )

<span class="hljs-comment"># 2. Search for magic-related content + fantasy genre + conflict theme</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n2. Searching for magic-related content + fantasy genre + conflict theme:&quot;</span>)
query_text = <span class="hljs-string">&quot;magic wizard spell fantasy magical&quot;</span>

query_embedding_response = genai_client.models.embed_content(
    model=EMBEDDING_MODEL,
    contents=[query_text],
    config=EmbedContentConfig(
        task_type=<span class="hljs-string">&quot;RETRIEVAL_QUERY&quot;</span>,
        output_dimensionality=EMBEDDING_DIM,
    ),
)
query_embedding = query_embedding_response.embeddings[<span class="hljs-number">0</span>].values

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_embedding],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;primary_genre == &quot;fantasy&quot; and theme_type == &quot;conflict&quot;&#x27;</span>,
    output_fields=[
        <span class="hljs-string">&quot;document_text&quot;</span>,
        <span class="hljs-string">&quot;genre&quot;</span>,
        <span class="hljs-string">&quot;primary_genre&quot;</span>,
        <span class="hljs-string">&quot;theme_type&quot;</span>,
        <span class="hljs-string">&quot;theme_setting&quot;</span>,
    ],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
)

<span class="hljs-keyword">if</span> results:
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- Similarity: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Text: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;document_text&#x27;</span>][:<span class="hljs-number">100</span>]}</span>...&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Genre: <span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;genre&#x27;</span>)}</span> (<span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;primary_genre&#x27;</span>)}</span>)&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Theme: <span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;theme_type&#x27;</span>)}</span> (<span class="hljs-subst">{result.get(<span class="hljs-string">&#x27;theme_setting&#x27;</span>)}</span>)&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== Demo Complete ===&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">=== Semantic Search Examples ===

1. Searching for action-related content + only thriller genre:
- Similarity: 0.6947
  Text: John McClane fights terrorists in a Los Angeles skyscraper during Christmas Eve. The action-packed t...
  Genre: action-packed thriller (action-thriller)
- Similarity: 0.6128
  Text: Two detectives investigate a series of mysterious murders in New York City. The crime thriller featu...
  Genre: crime thriller (crime-thriller)
- Similarity: 0.5889
  Text: A brilliant scientist creates artificial intelligence that becomes self-aware. The sci-fi thriller e...
  Genre: sci-fi thriller (sci-fi-thriller)

2. Searching for magic-related content + fantasy genre + conflict theme:
- Similarity: 0.6986
  Text: An evil sorcerer threatens to destroy the magical kingdom. A brave hero must gather allies and maste...
  Genre: fantasy (fantasy)
  Theme: conflict (fantasy_world)

=== Demo Complete ===
</code></pre>
