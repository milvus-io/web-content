---
id: llama_agents_metadata.md
summary: >-
  このノートブックでは、様々なアイデアを探ります：Milvusにデータを保存し、llama-indexとMistralモデルをデータクエリに使用し、自動データ検索・読み込みエージェントを作成し、ユーザクエリに基づいたメタデータフィルタリングエージェントを開発する。
title: Mistral、Milvus、Llamaエージェントによるマルチエージェントシステム
---
<h1 id="Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="common-anchor-header">Mistral、Milvus、Llamaエージェントによるマルチエージェントシステム<button data-href="#Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Goal-of-this-Notebook" class="common-anchor-header">このノートブックの目的<button data-href="#Goal-of-this-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>このノートブックでは、様々なアイデアを探求する：</p>
<ul>
<li><p>1️⃣ Milvusにデータを格納する：高速な類似検索やAIアプリケーションのために設計された効率的なベクトルデータベースであるMilvusにデータを格納する方法を学ぶ。</p></li>
<li><p>2️⃣ llama-indexをMistralモデルと組み合わせてデータクエリに使う: llama-indexとMistralモデルを組み合わせてMilvusに保存されたデータをクエリする方法を学ぶ。</p></li>
<li><p>3️⃣ 自動データ検索・読み込みエージェントの作成: ユーザークエリに基づいて自動的にデータを検索・読み込みできるエージェントを構築します。これらの自動化されたエージェントは、迅速かつ正確なレスポンスを提供し、手作業による検索作業を軽減することで、ユーザーエクスペリエンスを向上させます。</p></li>
<li><p>4️︓ユーザークエリに基づくメタデータフィルタリングエージェントの開発: ユーザークエリからメタデータフィルタを⾃動⽣成するエージェントを実装する。</p></li>
<li><p>ᔍ まとめ このノートブックの終わりには、堅牢で効率的なデータ検索システムを構築するために、Milvus、llama-indexとllama-agents、Mistralモデルの使い方を包括的に理解していることでしょう。</p></li>
</ul>
<h2 id="Milvus" class="common-anchor-header">Milvus<button data-href="#Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus はオープンソースのベクトルデータベースで、ベクトル埋め込みと類似検索でAIアプリケーションを強化します。</p>
<p>このノートブックでは、Milvusの軽量版であるMilvus Liteを使用します。</p>
<p>Milvus Liteを使えば、ベクトル類似性検索を使ったAIアプリケーションを数分で作り始めることができます！Milvus Liteは以下の環境で動作します：</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>ラップトップ</li>
<li>エッジデバイス</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ad459431-95ac-4cbd-a931-453d08d5fdef.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>画像.png</span> </span></p>
<h2 id="llama-agents" class="common-anchor-header">llama-エージェント<button data-href="#llama-agents" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">llama-agents</code> はエージェントをマイクロサービスとして動作させることができる。これにより、サービスのスケールアップやスケールダウンが可能になる。</p>
<h2 id="llama-index" class="common-anchor-header">ラマインデックス<button data-href="#llama-index" class="anchor-icon" translate="no">
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
    </button></h2><p>LlamaIndex は LLM アプリケーションのためのデータフレームワークです。以下のようなツールを提供します：</p>
<ul>
<li>データコネクタは既存のデータをネイティブなソースとフォーマットから取り込みます。</li>
<li>データインデックスは、LLMが利用しやすくパフォーマンスの高い中間表現でデータを構造化します。</li>
<li>エンジンは、データへの自然言語アクセスを提供します。</li>
<li>エージェントは、シンプルなヘルパー機能からAPI統合など、ツールによって強化されたLLM搭載のナレッジワーカーです。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/7bd73318-7929-4675-8998-c2e9ef091906.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>image.png</span> </span></p>
<h2 id="Mistral-AI" class="common-anchor-header">ミストラルAI<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral AIはLLMとエンベッディング・モデルを構築している研究ラボで、最近Mistral NemoとMistral Largeという新バージョンのモデルをリリースしました。そのため、このノートブックではMistral NemoとMistral Largeを使います。</p>
<h2 id="Install-Dependencies" class="common-anchor-header">依存関係のインストール<button data-href="#Install-Dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">$ pip install llama-agents pymilvus openai python-dotenv
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ pip install llama-index-vector-stores-milvus llama-index-readers-file llama-index-llms-ollama llama-index-llms-mistralai llama-index-embeddings-mistralai
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> This is ONLY necessary in jupyter notebook.</span>
<span class="hljs-comment"># Details: Jupyter runs an event-loop behind the scenes.</span>
<span class="hljs-comment">#          This results in nested event-loops when we start an event-loop to make async queries.</span>
<span class="hljs-comment">#          This is normally not allowed, we use nest_asyncio to allow it for convenience.</span>
<span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-your-API-Key-for-Mistral" class="common-anchor-header">MistralのAPIキーを取得する<button data-href="#Get-your-API-Key-for-Mistral" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral の API キーは<a href="https://console.mistral.ai/api-keys/">Mistral Cloud Console</a> から取得できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;&quot;&quot;
load_dotenv reads key-value pairs from a .env file and can set them as environment variables.
This is useful to avoid leaking your API key for example :D
&quot;&quot;&quot;</span>

<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">import</span> os

load_dotenv()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">True
</code></pre>
<h2 id="Download-data" class="common-anchor-header">データをダウンロードする<button data-href="#Download-data" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/10k/&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/uber_2021.pdf&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/lyft_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/lyft_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h1 id="Prepare-Embedding-Model" class="common-anchor-header">埋め込みモデルの準備<button data-href="#Prepare-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h1><p>このノートブックで使用する埋め込みモデルを定義します。<code translate="no">mistral-embed</code> を使用します。これは Mistral が開発した埋め込みモデルで、検索を念頭に置いて学習されているため、エージェント型 RAG システムに非常に適しています。詳細はMistral Documentationの<a href="https://docs.mistral.ai/capabilities/embeddings/">Embeddingの</a>ページを参照してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings
<span class="hljs-keyword">from</span> llama_index.embeddings.mistralai <span class="hljs-keyword">import</span> MistralAIEmbedding

<span class="hljs-comment"># Define the default Embedding model used in this Notebook.</span>
<span class="hljs-comment"># We are using Mistral Models, so we are also using Mistral Embeddings</span>

Settings.embed_model = MistralAIEmbedding(model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-LLM-Model" class="common-anchor-header">LLMモデルの定義<button data-href="#Define-the-LLM-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Llama Indexはプロンプトやクエリに応答するためにLLMを使用し、自然言語応答を記述する役割を果たします。 デフォルトのものとしてMistral Nemoを定義します。Nemoは最大128kトークンの大きなコンテキストウィンドウを提供する。その推論、世界知識、コーディングの精度は、そのサイズのカテゴリーでは最先端である。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">llms</span>.<span class="hljs-property">ollama</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">Ollama</span>

<span class="hljs-title class_">Settings</span>.<span class="hljs-property">llm</span> = <span class="hljs-title class_">Ollama</span>(<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Instanciate-Milvus-and-Load-Data" class="common-anchor-header">Milvusをインストールしてデータをロードする。<button data-href="#Instanciate-Milvus-and-Load-Data" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/">Milvusは</a>、高性能でスケーラブルなベクトル類似性検索でAIアプリケーションを強化する、人気のあるオープンソースのベクトルデータベースである。</p>
<ul>
<li>uriをローカルファイル、例えば<code translate="no">./milvus.db</code> に設定するのが最も便利な方法です。このファイルには<a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteが</a>自動的に利用され、すべてのデータが保存されます。</li>
<li>もし100万ベクトル以上の大規模なデータがある場合、<a href="https://milvus.io/docs/quickstart.md">DockerやKubernetes</a>上でより高性能なMilvusサーバを構築することができます。このセットアップでは、サーバのURI、例えば<code translate="no">http://localhost:19530</code> をURIとして使用してください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public EndpointとAPI Keyに</a>対応するuriとtokenを調整してください。</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
    load_index_from_storage,
)
<span class="hljs-keyword">from</span> llama_index.core.tools <span class="hljs-keyword">import</span> QueryEngineTool, ToolMetadata

input_files = [<span class="hljs-string">&quot;./data/10k/lyft_2021.pdf&quot;</span>, <span class="hljs-string">&quot;./data/10k/uber_2021.pdf&quot;</span>]

<span class="hljs-comment"># Create a single Milvus vector store</span>
vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1024</span>, overwrite=<span class="hljs-literal">False</span>, collection_name=<span class="hljs-string">&quot;companies_docs&quot;</span>
)

<span class="hljs-comment"># Create a storage context with the Milvus vector store</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)

<span class="hljs-comment"># Load data</span>
docs = SimpleDirectoryReader(input_files=input_files).load_data()

<span class="hljs-comment"># Build index</span>
index = VectorStoreIndex.from_documents(docs, storage_context=storage_context)

<span class="hljs-comment"># Define the query engine</span>
company_engine = index.as_query_engine(similarity_top_k=<span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-Tools" class="common-anchor-header">ツールの定義<button data-href="#Define-Tools" class="anchor-icon" translate="no">
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
    </button></h2><p>効果的なエージェントを構築するための重要なステップの1つは、タスクを実行するために使用できるツールを定義することです。これらのツールは、基本的にエージェントが情報を取得したりアクションを実行するために呼び出すことができる関数やサービスです。</p>
<p>以下では、エージェントが2021年からのLyftとUberの財務情報を照会するために使用できる2つのツールを定義します。これらのツールはエージェントに統合され、自然言語によるクエリに正確で関連性のある情報で応答できるようになります。</p>
<p>一番上のグラフを見ると、これが「エージェントサービス」です。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the different tools that can be used by our Agent.</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;lyft_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Lyft financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;uber_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Uber financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.ollama <span class="hljs-keyword">import</span> Ollama
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># Set up the agent</span>
llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)

response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;Could you please provide a comparison between Lyft and Uber&#x27;s total revenues in 2021?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Example usage without metadata filtering</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response without metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Response without metadata filtering:
The revenue for Lyft in 2021 was $3.84 billion.

Uber's total revenue for the year ended December 31, 2021 was $17,455 million.
</code></pre>
<h2 id="Metadata-Filtering" class="common-anchor-header">メタデータフィルタリング<button data-href="#Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvusは</strong> <a href="https://zilliz.com/blog/json-metadata-filtering-in-milvus">メタデータフィルタリングを</a>サポートしており、データに関連する特定の属性やタグに基づいて検索結果を絞り込むことができます。これは、大量のデータがあり、特定の条件に一致する関連するデータのサブセットのみを取得する必要があるシナリオで特に有用です。</p>
<h2 id="Use-Cases-for-Metadata-Filtering" class="common-anchor-header">メタデータ・フィルタリングの使用例<button data-href="#Use-Cases-for-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>検索結果の精度</strong>：メタデータ・フィルタを適用することで、ユーザーのクエリに関連性の高い検索結果を得ることができます。たとえば、財務文書のコレクションがある場合、会社名、年、その他の関連するメタデータに基づいてフィルタリングできます。</p></li>
<li><p><strong>効率</strong>：メタデータのフィルタリングは、処理する必要のあるデータ量を減らし、検索作業を効率化するのに役立ちます。これは、大規模なデータセットを扱う場合に特に有益です。</p></li>
<li><p><strong>カスタマイズ</strong>：ユーザーやアプリケーションによって要求されるものは異なります。メタデータフィルタリングでは、特定の年や会社の文書を検索するなど、特定のニーズに合わせて検索結果をカスタマイズすることができます。</p></li>
</ul>
<h2 id="Example-usage" class="common-anchor-header">使用例<button data-href="#Example-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコードブロックでは、メタデータフィルタリングを使用して、特定のメタデータのキーと値のペア<code translate="no">file_name</code> に基づいて文書を検索するフィルタリングクエリーエンジンを作成しています：<code translate="no">lyft_2021.pdf</code></p>
<p><code translate="no">QueryEngineTool</code> 、上で定義したものよりも汎用的である。上で定義したものでは、企業（UberとLyft）ごとにツールを持っていたが、今回はより汎用的である。メタデータ・フィルタリングを追加することで、特定の文書からのデータ取得のみをフィルタリングすることができる。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Example usage with metadata filtering</span>
filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;lyft_2021.pdf&quot;</span>)]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;filters: <span class="hljs-subst">{filters}</span>&quot;</span>)
filtered_query_engine = index.as_query_engine(filters=filters)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Use this tool to retrieve specific data points about a company. &quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">filters: filters=[MetadataFilter(key='file_name', value='lyft_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<h2 id="Function-Calling" class="common-anchor-header">関数呼び出し<button data-href="#Function-Calling" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral NemoとLargeはネイティブの関数呼び出しに対応しています。LlamaIndexのツールとは、llmの<code translate="no">predict_and_call</code> 関数を通してシームレスに統合されています。これにより、ユーザーは任意のツールをアタッチすることができ、どのツールを呼び出すかは（もしあれば）LLMが決定します。</p>
<p><a href="https://docs.llamaindex.ai/en/latest/module_guides/deploying/agents/">エージェントについての</a>詳細はllama-indexウェブサイトをご覧ください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up the LLM we will use for Function Calling</span>

llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Interact-with-the-Agent" class="common-anchor-header">エージェントと対話する<button data-href="#Interact-with-the-Agent" class="anchor-icon" translate="no">
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
    </button></h2><p>それでは、メタデータフィルタリングを実際に使ってみましょう：</p>
<ol>
<li>最初の例では、ユーザーのクエリがUberに関するものであるため、エージェントは何も見つけることができないはずです。</li>
<li>2つ目では、Lyftに関するドキュメントのみを検索するので、エージェントはLyftに関する情報を見つけることができるはずです。</li>
</ol>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;How many employees does Uber have?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I'm unable to provide information about Uber's employee count as it's outside the given Lyft context.
</code></pre>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;What are the risk factors for Lyft?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Investing in Lyft carries significant risks. These include general economic factors like impacts from pandemics or crises, operational factors such as competition, pricing changes, and driver/ride growth unpredictability, insurance coverage issues, autonomous vehicle technology uncertainties, reputational concerns, potential security breaches, reliance on third-party services, and challenges in expanding platform offerings. Lyft's business operations are subject to numerous other risks not explicitly mentioned here, which could also harm its financial condition and prospects.
</code></pre>
<h2 id="Example-of-Confusion-Without-Metadata-Filtering" class="common-anchor-header">メタデータフィルタリングを使用しない場合の混乱例<button data-href="#Example-of-Confusion-Without-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">&gt; Question: What are the risk factors <span class="hljs-keyword">for</span> Uber?

&gt; Response without metadata filtering:
Based on the provided context, <span class="hljs-built_in">which</span> pertains to Lyft<span class="hljs-string">&#x27;s Risk Factors section in their Annual Report, some of the potential risk factors applicable to a company like Uber might include:

- General economic factors such as the impact of global pandemics or other crises on ride-sharing demand.
- Operational factors like competition in ride-hailing services, unpredictability in results of operations, and uncertainty about market growth for ridesharing and related services.
- Risks related to attracting and retaining qualified drivers and riders.
</span><button class="copy-code-btn"></button></code></pre>
<p>この例では、システムはUberの代わりにLyftに関する情報を誤って提供し、誤解を招くような応答をしています。まず、その情報は持っていないと言いますが、その後延々と続きます。</p>
<h2 id="Using-an-Agent-to-Extract-Metadata-Filters" class="common-anchor-header">メタデータフィルターを抽出するエージェントの使用<button data-href="#Using-an-Agent-to-Extract-Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>この問題に対処するために、ユーザーの質問からメタデータフィルタを自動的に抽出し、質問の回答プロセス中に適用するエージェントを使用することができます。これにより、システムは正しく関連性のある情報を確実に取得します。</p>
<h2 id="Code-Example" class="common-anchor-header">コード例<button data-href="#Code-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>以下は、ユーザの質問からメタデータフィルタを抽出するエージェントを使用して、フィルタリングクエリエリエンジンを作成する方法を示すコード例です：</p>
<h3 id="Explanation" class="common-anchor-header">説明</h3><ul>
<li><p><strong>プロンプトテンプレート</strong>PromptTemplateクラスは、ユーザの質問からメタデータフィルタを抽出するためのテンプレートを定義するために使用されます。このテンプレートは言語モデルに会社名、年、その他の関連する属性を考慮するように指示します。</p></li>
<li><p><strong>LLM</strong>: Mistral Nemoは、ユーザーの質問に基づいてメタデータフィルタを生成するために使用されます。モデルには質問とテンプレートが入力され、関連するフィルターが抽出されます。</p></li>
<li><p><strong>メタデータフィルター</strong>：LLMからの応答は解析され、<code translate="no">MetadataFilters</code> オブジェクトが作成されます。特定のフィルターが指定されていない場合は、空の<code translate="no">MetadataFilters</code> オブジェクトが返されます。</p></li>
<li><p><strong>フィルター付きクエリーエンジン</strong>:<code translate="no">index.as_query_engine(filters=metadata_filters)</code> メソッドは、抽出されたメタデータフィルターをインデックスに適用するクエリーエンジンを作成します。これにより、フィルター条件に一致する文書だけが確実に取得される。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.prompts.base <span class="hljs-keyword">import</span> PromptTemplate


<span class="hljs-comment"># Function to create a filtered query engine</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_query_engine</span>(<span class="hljs-params">question</span>):
    <span class="hljs-comment"># Extract metadata filters from question using a language model</span>
    prompt_template = PromptTemplate(
        <span class="hljs-string">&quot;Given the following question, extract relevant metadata filters.\n&quot;</span>
        <span class="hljs-string">&quot;Consider company names, years, and any other relevant attributes.\n&quot;</span>
        <span class="hljs-string">&quot;Don&#x27;t write any other text, just the MetadataFilters object&quot;</span>
        <span class="hljs-string">&quot;Format it by creating a MetadataFilters like shown in the following\n&quot;</span>
        <span class="hljs-string">&quot;MetadataFilters(filters=[ExactMatchFilter(key=&#x27;file_name&#x27;, value=&#x27;lyft_2021.pdf&#x27;)])\n&quot;</span>
        <span class="hljs-string">&quot;If no specific filters are mentioned, returns an empty MetadataFilters()\n&quot;</span>
        <span class="hljs-string">&quot;Question: {question}\n&quot;</span>
        <span class="hljs-string">&quot;Metadata Filters:\n&quot;</span>
    )

    prompt = prompt_template.<span class="hljs-built_in">format</span>(question=question)
    llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
    response = llm.complete(prompt)

    metadata_filters_str = response.text.strip()
    <span class="hljs-keyword">if</span> metadata_filters_str:
        metadata_filters = <span class="hljs-built_in">eval</span>(metadata_filters_str)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;eval: <span class="hljs-subst">{metadata_filters}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> index.as_query_engine(filters=metadata_filters)
    <span class="hljs-keyword">return</span> index.as_query_engine()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = <span class="hljs-title function_">create_query_engine</span>(
    <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment">## Example usage with metadata filtering</span>
question = <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
filtered_query_engine = create_query_engine(question)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs_filtering&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
            ),
        ),
    ),
]
<span class="hljs-comment"># Set up the agent with the updated query engine tools</span>
response = llm.predict_and_call(
    query_engine_tools,
    user_msg=question,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response with metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
Response with metadata filtering:
Uber's total revenue for the year ended December 31, 2021, is $17.455 billion.
</code></pre>
<h2 id="Orchestrating-the-different-services-with-Mistral-Large" class="common-anchor-header">Mistral Largeを使った様々なサービスのオーケストレーション<button data-href="#Orchestrating-the-different-services-with-Mistral-Large" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral LargeはMistralのフラッグシップモデルで、非常に優れた推論、知識、コーディング機能を備えています。大規模な推論能力を必要とする複雑なタスクや、高度に専門化されたタスクに最適です。高度な関数呼び出し機能を備えており、様々なエージェントのオーケストレーションにまさに必要なものです。</p>
<h3 id="Why-do-we-need-a-smarter-Model" class="common-anchor-header">なぜよりスマートなモデルが必要なのか？</h3><p>以下に回答する質問は、首尾一貫した正確な回答を提供するために、複数のサービスとエージェントのオーケストレーションが必要であるため、特に困難です。これには、様々なツールやエージェントを調整して、異なるソース、例えば異なる会社の財務データから情報を取得し、処理することが含まれます。</p>
<h3 id="Whats-so-difficult-about-that" class="common-anchor-header">何がそんなに難しいのか？</h3><ul>
<li>複雑さだ：この問題には、それぞれが独自の機能とデータソースを持つ複数のエージェントとサービスが関わっている。これらのエージェントがシームレスに連携するように調整するのは複雑な作業だ。</li>
</ul>
<ul>
<li><p>データの統合：この問題では、異なるソースからのデータを統合する必要があり、データ形式、構造、メタデータが異なるため、困難が伴う。</p></li>
<li><p>文脈の理解：この質問では、異なる情報間のコンテキストと関係を理解する必要があります。</p></li>
</ul>
<h3 id="Why-would-Mistral-Large-help-in-this-case" class="common-anchor-header">なぜMistral Largeがこのような場合に役立つのでしょうか？</h3><p>Mistral Largeは高度な推論機能と関数呼び出し機能を備えているため、このタスクに適しています。どのように役立つかは以下の通りです：</p>
<ul>
<li><p>高度な推論：Mistral Large は複雑な推論タスクを処理できるので、複数のエージェントやサービスのオーケストレーションに最適です。異なる情報間の関係を理解し、情報に基づいた意思決定を行うことができます。</p></li>
<li><p>関数呼び出し機能：Mistral Large は、異なるエージェントのアクションを調整するのに不可欠な、高度な関数呼び出し機能を持っています。これにより、様々なサービスのシームレスな統合とオーケストレーションが可能になります。</p></li>
<li><p>専門知識：Mistral Large は高度に専門化されたタスクのために設計されており、深いドメイン知識を必要とする複雑なクエリを処理するのに適しています。</p></li>
</ul>
<p>これらの理由から、ここではMistral Nemoの代わりにMistral Largeを使う方が適していると判断しました。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_agents <span class="hljs-keyword">import</span> (
    AgentService,
    ToolService,
    LocalLauncher,
    MetaServiceTool,
    ControlPlaneServer,
    SimpleMessageQueue,
    AgentOrchestrator,
)

<span class="hljs-keyword">from</span> llama_index.core.agent <span class="hljs-keyword">import</span> FunctionCallingAgentWorker
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># create our multi-agent framework components</span>
message_queue = SimpleMessageQueue()
control_plane = ControlPlaneServer(
    message_queue=message_queue,
    orchestrator=AgentOrchestrator(llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)),
)

<span class="hljs-comment"># define Tool Service</span>
tool_service = ToolService(
    message_queue=message_queue,
    tools=query_engine_tools,
    running=<span class="hljs-literal">True</span>,
    step_interval=<span class="hljs-number">0.5</span>,
)

<span class="hljs-comment"># define meta-tools here</span>
meta_tools = [
    <span class="hljs-keyword">await</span> MetaServiceTool.from_tool_service(
        t.metadata.name,
        message_queue=message_queue,
        tool_service=tool_service,
    )
    <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> query_engine_tools
]

<span class="hljs-comment"># define Agent and agent service</span>
worker1 = FunctionCallingAgentWorker.from_tools(
    meta_tools, llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)
)

agent1 = worker1.as_agent()
agent_server_1 = AgentService(
    agent=agent1,
    message_queue=message_queue,
    description=<span class="hljs-string">&quot;Used to answer questions over differnet companies for their Financial results&quot;</span>,
    service_name=<span class="hljs-string">&quot;Companies_analyst_agent&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> logging

<span class="hljs-comment"># change logging level to enable or disable more verbose logging</span>
logging.getLogger(<span class="hljs-string">&quot;llama_agents&quot;</span>).setLevel(logging.INFO)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-meta">## Define Launcher</span>
launcher = LocalLauncher(
    [<span class="hljs-meta">agent_server_1, tool_service</span>],
    control_plane,
    message_queue,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">query_str = <span class="hljs-string">&quot;What are the risk factors for Uber?&quot;</span>
result = launcher.<span class="hljs-title function_">launch_single</span>(query_str)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO:llama_agents.message_queues.simple - Consumer AgentService-27cde4ed-5163-4005-90fc-13c158eda7e3: Companies_analyst_agent has been registered.
INFO:llama_agents.message_queues.simple - Consumer ToolService-b73c500a-5fbe-4f57-95c7-db74e173bd1b: default_tool_service has been registered.
INFO:llama_agents.message_queues.simple - Consumer 62465ab8-32ff-436e-95fa-74e828745150: human has been registered.
INFO:llama_agents.message_queues.simple - Consumer ControlPlaneServer-f4c27d43-5474-43ca-93ca-a9aeed4534d7: control_plane has been registered.
INFO:llama_agents.services.agent - Companies_analyst_agent launch_local
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Launching message queue locally
INFO:llama_agents.services.agent - Processing initiated.
INFO:llama_agents.services.tool - Processing initiated.
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.simple - Consumer MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41: MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41 has been registered.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f4c270a4-bc47-4bbf-92fe-e2cc80757943 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f888f9a8-e716-4505-bfe2-577452e9b6e6 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'human' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'human' to consumer.
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{&quot;name&quot;: &quot;finalize&quot;, &quot;arguments&quot;: {&quot;input&quot;: &quot;Uber faces several risk factors, including general economic impacts such as pandemics or downturns, operational challenges like competition, market growth uncertainty, attracting and retaining drivers and riders, insurance adequacy, autonomous vehicle technology development, maintaining its reputation and brand, and managing growth. Additionally, reliance on third-party providers for various services can introduce further risks to its operations.&quot;}}]
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>このノートブックでは、llama-agents を使って適切なツールを呼び出し、様々なアクションを実行する方法を見てきました。Mistral Large と Mistral Nemo を組み合わせることで、異なる LLM の強みを活かして、インテリジェントでリソース効率の高いシステムを効果的にオーケストレーションする方法を示しました。エージェントは、ユーザが要求したデータを含むコレクションを選ぶことができました。</p>
