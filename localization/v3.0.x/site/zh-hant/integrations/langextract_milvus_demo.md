---
id: langextract_milvus_demo.md
summary: 本指南示範如何使用 LangExtract 與 Milvus 建立智慧型文件處理與檢索系統。
title: LangExtract + Milvus 整合
---
<h1 id="LangExtract-+-Milvus-Integration" class="common-anchor-header">LangExtract + Milvus 整合<button data-href="#LangExtract-+-Milvus-Integration" class="anchor-icon" translate="no">
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
<p>本指南示範如何使用<a href="https://github.com/google/langextract">LangExtract</a>與<a href="https://milvus.io/">Milvus</a>建立智慧型文件處理與檢索系統。</p>
<p>LangExtract 是一個 Python 函式庫，它使用大型語言模型 (Large Language Models, LLMs) 來從非結構化的文字文件中抽取結構化的資訊，並提供精確的來源基礎。該系統結合了 LangExtract 的萃取能力與 Milvus 的向量儲存，可同時進行語意相似性搜尋與精確的元資料篩選。</p>
<p>這種整合對於內容管理、語義搜尋、知識發現，以及根據萃取的文件屬性建立推薦系統特別有價值。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在執行本筆記本之前，請確定您已安裝下列相依性：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus milvus-lite langextract google-genai requests tqdm pandas</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動執行時</strong>（點選畫面頂端的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」）。</p>
</div>
<p>在本範例中，我們將使用 Gemini 作為 LLM。您應該準備<a href="https://aistudio.google.com/app/apikey">api key</a> <code translate="no">GEMINI_API_KEY</code> 作為環境變數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;GEMINI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;AIza*****************&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-LangExtract-+-Milvus-pipeline" class="common-anchor-header">定義 LangExtract + Milvus 管道<button data-href="#Define-the-LangExtract-+-Milvus-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>我們將定義使用 LangExtract 作為結構化資訊萃取、Milvus 作為向量儲存的管道。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> langextract <span class="hljs-keyword">as</span> lx
<span class="hljs-keyword">import</span> textwrap
<span class="hljs-keyword">from</span> google <span class="hljs-keyword">import</span> genai
<span class="hljs-keyword">from</span> google.genai.types <span class="hljs-keyword">import</span> EmbedContentConfig
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> uuid
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configuration-and-Setup" class="common-anchor-header">配置與設定<button data-href="#Configuration-and-Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>讓我們為整合配置全局參數。我們將使用 Gemini 的嵌入模型為我們的文件產生向量表示。</p>
<pre><code translate="no" class="language-python">genai_client = genai.Client()

COLLECTION_NAME = <span class="hljs-string">&quot;document_extractions&quot;</span>
EMBEDDING_MODEL = <span class="hljs-string">&quot;gemini-embedding-001&quot;</span>
EMBEDDING_DIM = <span class="hljs-number">3072</span>  <span class="hljs-comment"># Default dimension for gemini-embedding-001</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-Milvus-Client" class="common-anchor-header">初始化 Milvus 客戶端<button data-href="#Initialize-Milvus-Client" class="anchor-icon" translate="no">
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
    </button></h2><p>現在讓我們初始化 Milvus 客戶端。為了簡單起見，我們會使用本機資料庫檔案，但這可以很容易地擴充到完整的 Milvus 伺服器部署。</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至於<code translate="no">MilvusClient</code> 的參數 ：</p>
<ul>
<li>將<code translate="no">uri</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您要使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務，請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，這兩個網址對應 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</li>
</ul>
</div>
<h2 id="Sample-Data-Preparation" class="common-anchor-header">樣本資料準備<button data-href="#Sample-Data-Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>在這個示範中，我們會使用電影描述作為範例文件。這展示了 LangExtract 從非結構化文字中抽取結構化資訊的能力，例如類型、角色和主題。</p>
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
<h2 id="Setting-Up-the-Milvus-Collection" class="common-anchor-header">設定 Milvus 套件<button data-href="#Setting-Up-the-Milvus-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>在儲存抽取出來的資料之前，我們需要建立一個有適當模式的 Milvus 套件。這個集合將儲存原始文件文字、向量嵌入和萃取的元資料欄位。</p>
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
<h2 id="Defining-the-Extraction-Schema" class="common-anchor-header">定義抽取模式<button data-href="#Defining-the-Extraction-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>LangExtract 使用提示和範例來引導 LLM 擷取結構化的資訊。讓我們定義電影描述的萃取模式，指定要萃取哪些資訊，以及如何將資訊分類。</p>
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
<h2 id="Providing-Examples-for-Better-Extraction" class="common-anchor-header">提供範例以改善萃取<button data-href="#Providing-Examples-for-Better-Extraction" class="anchor-icon" translate="no">
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
    </button></h2><p>為了提高抽取的品質與一致性，我們會提供 LangExtract 一些範例。這些範例展示了預期的格式，並幫助模型了解我們的抽取需求。</p>
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
<h2 id="Processing-and-Vectorizing-the-Results" class="common-anchor-header">處理結果並將其向量化<button data-href="#Processing-and-Vectorizing-the-Results" class="anchor-icon" translate="no">
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
    </button></h2><p>現在我們需要處理萃取結果，並為每個文件產生向量內嵌。我們也會將擷取的屬性扁平化成獨立的欄位，讓它們在 Milvus 中容易搜尋。</p>
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
<h2 id="Inserting-Data-into-Milvus" class="common-anchor-header">將資料插入 Milvus<button data-href="#Inserting-Data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>處理過的資料已準備就緒，讓我們將它插入 Milvus 資料庫。這將使我們能夠執行語義搜索和精確的元資料篩選。</p>
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
<h2 id="Demonstrating-Metadata-Filtering" class="common-anchor-header">示範元資料篩選<button data-href="#Demonstrating-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>結合 LangExtract 與 Milvus 的主要優勢之一，就是能夠根據萃取的元資料執行精確的篩選。讓我們用一些篩選表達式（filter expression）搜尋來示範這一點。</p>
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
<h2 id="Combining-Semantic-Search-with-Metadata-Filtering" class="common-anchor-header">結合語意搜尋與元資料篩選<button data-href="#Combining-Semantic-Search-with-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>此整合的真正威力來自於結合語意向量搜尋與精確的元資料篩選。這可讓我們找到語義上相似的內容，同時根據擷取的屬性套用特定的限制條件。</p>
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
