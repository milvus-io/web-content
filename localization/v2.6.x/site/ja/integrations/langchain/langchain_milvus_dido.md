---
id: langchain_milvus_dido.md
summary: >-
  このガイドでは、Milvus 2.6のテキスト埋め込み機能(Data In Data
  Out)とLangChainの使い方を説明します。この機能により、Milvusサーバは生のテキストを自動的にベクトル埋め込みに変換し、クライアント側のコードを簡素化し、APIキー管理を一元化することができます。
title: Milvusテキスト埋め込み機能とLangChainの連携
---
<h1 id="Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="common-anchor-header">Milvusテキスト埋め込み機能とLangChainの連携<button data-href="#Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>このガイドでは、Milvus 2.6の<strong>テキスト埋め込み機能</strong>(Data In Data Out)をLangChainと連携させる方法を説明します。この機能により、Milvusサーバは生のテキストを自動的にベクトル埋め込みに変換し、クライアント側のコードを簡素化し、APIキー管理を一元化することができます。</p>
<p><a href="https://milvus.io/">Milvusは</a>世界で最も先進的なオープンソースのベクトルデータベースで、埋め込み類似検索やAIアプリケーションをサポートするために特別に構築されています。<a href="https://www.langchain.com/">LangChainは</a>、大規模言語モデル（LLM）を利用したアプリケーション開発のためのフレームワークです。Milvusのテキスト埋め込み機能を統合することで、LangChainアプリケーションにおいて、よりシンプルで効率的なベクトル検索ソリューションを実現することができます。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>このチュートリアルを実行する前に、以下の依存関係がインストールされていることを確認してください：</p>
<pre><code translate="no" class="language-shell">! pip install --upgrade langchain-milvus langchain-core langchain-openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabをお使いの場合、インストールした依存関係を有効にするために、<strong>ランタイムを再起動</strong>する必要があります（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<h3 id="Configuring-the-Milvus-Server" class="common-anchor-header">Milvusサーバーの設定<button data-href="#Configuring-the-Milvus-Server" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>重要</strong>：テキスト埋め込み機能(Data In Data Out)は<strong>Milvus Serverでのみ</strong>使用可能です。<strong>Milvus Liteはこの機能をサポートしていません</strong>。Docker/KubernetesでデプロイされたMilvusサーバを使用する必要があります。</p>
<p>テキスト埋め込み機能を利用する前に、Milvusサーバに埋め込みサービスプロバイダ用のクレデンシャルを設定する必要があります。</p>
<p><strong>credentialの下にキーを宣言します：</strong></p>
<p>APIキーは1つでも複数でも構いません。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>

<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_OPENAI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>どのキーをOpenAIの呼び出しに使うかをMilvusに伝える。</strong></p>
<p>同じファイルで、OpenAIプロバイダが使用したいラベルを指定します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom url</span>
<button class="copy-code-btn"></button></code></pre>
<p>その他の設定方法については、<a href="https://milvus.io/docs/embedding-function-overview.md">Milvus Embedding Functionのドキュメントを</a>参照してください。</p>
<h3 id="Starting-the-Milvus-Service" class="common-anchor-header">Milvusサービスの起動<button data-href="#Starting-the-Milvus-Service" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusサーバが起動しており、エンベッディング機能が有効になっていることを確認します。<a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a>または<a href="https://milvus.io/docs/install_cluster-helm.md">Kubernetesを</a>使用してMilvusサーバをデプロイすることができます。<strong>Milvus Liteはテキストエンベッド機能をサポートしていません</strong>。</p>
<h2 id="Understanding-Embedding-Client-side-vs-Server-side" class="common-anchor-header">エンベッディングについてクライアントサイドとサーバサイド<button data-href="#Understanding-Embedding-Client-side-vs-Server-side" class="anchor-icon" translate="no">
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
    </button></h2><p>使い方の前に、まず2つのエンベッディングアプローチの違いを理解しましょう。</p>
<h3 id="Embedding-using-LangChains-Embeddings-class-Client-side" class="common-anchor-header">LangChainの<code translate="no">Embeddings</code> クラスを使った埋め込み（クライアントサイド）<button data-href="#Embedding-using-LangChains-Embeddings-class-Client-side" class="anchor-icon" translate="no">
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
    </button></h3><p>従来のLangChainアプローチでは、<a href="https://python.langchain.com/docs/api_reference/embeddings/langchain_core.embeddings.Embeddings"><code translate="no">Embeddings</code> クラスを使って</a>クライアントサイドでエンベッディングを生成します。アプリケーションはこのクラスの<code translate="no">embed_query</code> メソッドを使ってエンベッディングAPIを呼び出し、生成されたベクトルをmilvusに格納します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Generate embedding on client side</span>
embeddings = OpenAIEmbeddings()
vector = embeddings.embed_query(<span class="hljs-string">&quot;Hello, world!&quot;</span>)
<span class="hljs-comment"># [0.123, -0.456, ...] A vector of floats</span>

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;traditional_approach_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>シーケンス図</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/langchain_milvus_dito_langchain_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>特徴</strong></p>
<ul>
<li>クライアントが直接エンベッディングAPIを呼び出す</li>
<li>クライアント側でAPIキーの管理が必要</li>
<li>データの流れテキスト → クライアント → 埋め込みAPI → ベクトル → milvus</li>
</ul>
<h3 id="Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="common-anchor-header">Milvusテキスト埋め込み機能（サーバ側データインデータアウト）<button data-href="#Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus2.6のテキスト埋め込み機能(Data In Data Out)は、Milvusサーバーが生のテキストを自動的にベクトル埋め込みに変換する機能です。クライアントはテキストを入力するだけで、Milvusが自動的に埋め込みを生成します。</p>
<p><strong>シーケンス図</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/langchain_milvus_dito_milvus_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>特徴</strong></p>
<ul>
<li>Milvusサーバが埋め込みAPIを呼び出す</li>
<li>APIキーはサーバ側で一元管理</li>
<li>データの流れテキスト → Milvus → エンベッディングAPI → ベクター（Milvusに格納）</li>
</ul>
<h3 id="Comparison-of-the-Two-Methods" class="common-anchor-header">2つの方式の比較<button data-href="#Comparison-of-the-Two-Methods" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>特徴</th><th>LangChain埋め込み（クライアント側）</th><th>Milvusテキスト埋め込み機能（サーバサイド）</th></tr>
</thead>
<tbody>
<tr><td><strong>処理場所</strong></td><td>クライアントアプリケーション</td><td>Milvusサーバー</td></tr>
<tr><td><strong>APIコール</strong></td><td>クライアントが直接埋め込みAPIを呼び出す</td><td>MilvusサーバーがエンベッディングAPIを呼び出す</td></tr>
<tr><td><strong>APIキーの管理</strong></td><td>クライアント側での管理が必要</td><td>サーバ側で一元管理、より安全</td></tr>
<tr><td><strong>コードの複雑さ</strong></td><td>クライアント側でAPIキーとコールを管理する必要がある</td><td>Milvusのコンフィギュレーションで一度だけ設定する必要がある。</td></tr>
<tr><td><strong>使用例</strong></td><td>- 埋め込み処理をクライアント側で制御したい<br>- 埋め込み結果をクライアント側でキャッシュしたい<br>- 複数のエンベッディングモデルの切り替えに対応したい</td><td>- クライアント側コードの簡素化<br>- サーバー側でAPIキーを一元管理したい<br>- 大量のドキュメントを一括処理したい<br>- クライアント側での外部APIとのやり取りを減らしたい<br>- BM25のようなMilvusのビルトイン機能と組み合わせたい</td></tr>
<tr><td><strong>Milvusのバージョン要件</strong></td><td>全てのバージョン(Milvus Liteを含む)</td><td>Milvus Liteには対応しておりません。</td></tr>
</tbody>
</table>
<p><strong>このチュートリアルでは、Milvus</strong> 2.6から導入された新機能であり、クライアントサイドのコードを大幅に簡素化し、セキュリティを向上させることができる<strong>Milvusサーバーサイドのテキスト埋め込み関数（Data In Data Out）メソッドを主に紹介</strong>します。</p>
<h2 id="Using-Text-Embedding-Function" class="common-anchor-header">テキスト埋め込み関数の使用<button data-href="#Using-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Example-1-Server-side-Embedding-Only" class="common-anchor-header">例1: サーバ側の埋め込みのみ<button data-href="#Example-1-Server-side-Embedding-Only" class="anchor-icon" translate="no">
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
    </button></h3><p>これは最も単純な使用例で、埋め込みの生成を完全にMilvusサーバに依存します。クライアントは埋め込み関数を必要としません。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

<span class="hljs-comment"># Create Text Embedding Function</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># Input field name (field containing text)</span>
    output_field_names=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># Output field name (field storing vectors)</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension (must specify)</span>
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,  <span class="hljs-comment"># Service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,  <span class="hljs-comment"># Model name</span>
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;apikey_dev&quot;</span>,    <span class="hljs-comment"># Optional: use credential label configured in milvus.yaml</span>
    },
)

<span class="hljs-comment"># Create Milvus vector store</span>
<span class="hljs-comment"># Note: embedding_function=None, because embedding is done on server side</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,  <span class="hljs-comment"># Do not use client-side embedding</span>
    builtin_function=text_embedding_func,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">connection_args</code> の場合：</p>
<ul>
<li><strong>Milvus Serverを使用する必要があります</strong>：テキスト埋め込み機能はMilvus Serverのみで、Milvus Liteには対応していません。</li>
<li><code translate="no">http://localhost:19530</code> (ローカルDockerデプロイ) または<code translate="no">http://your-server:19530</code> (リモートサーバ) などのサーバURIを使用してください。</li>
<li><a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Public Endpointを<code translate="no">uri</code> とし、<code translate="no">token</code> パラメータを設定してください。</li>
</ul>
<p>ドキュメントを追加する場合、テキストを提供するだけでよく、事前にベクトルを計算する必要はありません。Milvusは自動的にOpenAI APIを呼び出して埋め込みを生成します。</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add documents (only need to provide text, no need to pre-compute vectors)</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>),
    Document(
        page_content=<span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>
    ),
    Document(
        page_content=<span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>
    ),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313252, 462726375729313253, 462726375729313254]
</code></pre>
<p>検索時には、テキストクエリを直接使用することで、Milvusが自動的にクエリテキストを検索用のベクトルに変換します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search (directly use text query)</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>, k=<span class="hljs-number">2</span>
)

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Content: <span class="hljs-subst">{doc.page_content}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Metadata: <span class="hljs-subst">{doc.metadata}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
I0000 00:00:1765186679.227345 12227536 fork_posix.cc:71] Other threads are currently calling into gRPC, skipping fork() handlers


Content: Milvus simplifies semantic search through embeddings.
Metadata: {'pk': 462726375729313252}

Content: Semantic search helps users find relevant information quickly.
Metadata: {'pk': 462726375729313254}
</code></pre>
<h3 id="Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="common-anchor-header">例2：テキスト埋め込みとBM25の組み合わせ（ハイブリッド検索）<button data-href="#Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>セマンティック検索（テキスト埋め込み）とキーワード検索（BM25）を組み合わせることで、より強力なハイブリッド検索が可能になります。セマンティック検索はクエリの意図を理解することに優れ、キーワード検索は完全一致に優れています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction, BM25BuiltInFunction

<span class="hljs-comment"># Text Embedding Function (semantic search)</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_dense&quot;</span>,
    dim=<span class="hljs-number">1536</span>,
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
    },
)

<span class="hljs-comment"># BM25 Function (keyword search)</span>
bm25_func = BM25BuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_sparse&quot;</span>,
)

<span class="hljs-comment"># Create Milvus vector store</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,
    builtin_function=[text_embedding_func, bm25_func],
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    vector_field=[<span class="hljs-string">&quot;vector_dense&quot;</span>, <span class="hljs-string">&quot;vector_sparse&quot;</span>],
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)

<span class="hljs-comment"># Add documents</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Machine learning and artificial intelligence&quot;</span>),
    Document(page_content=<span class="hljs-string">&quot;The cat sat on the mat&quot;</span>),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313255, 462726375729313256]
</code></pre>
<p><code translate="no">WeightedRanker</code> 、セマンティック検索とキーワード検索のウェイトをコントロールする。密なウェイトを高くすると、結果はより意味的類似性に偏り、疎なウェイトを高くすると、結果はよりキーワードマッチングに偏る。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Hybrid search, use WeightedRanker to control weights</span>
<span class="hljs-comment"># 70% semantic search, 30% keyword search</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;AI technology&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.3</span>]},
)

<span class="hljs-comment"># If you want to be more biased towards keyword matching, you can adjust weights</span>
<span class="hljs-comment"># 30% semantic search, 70% keyword search</span>
results_keyword_focused = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;cat mat&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">results
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence'),
 Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat')]
</code></pre>
<pre><code translate="no" class="language-python">results_keyword_focused
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat'),
 Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence')]
</code></pre>
<h2 id="Summary" class="common-anchor-header">まとめ<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>おめでとうございます！Milvusのテキスト埋め込み機能(Data In Data Out)をLangChainで利用する方法を学びました。埋め込み生成をサーバサイドに移すことで、クライアントサイドのコードを簡素化し、APIキーを一元管理し、ハイブリッド検索を簡単に実装することができます。テキスト埋め込み機能とBM25を組み合わせることで、milvusは強力なベクトル検索機能を提供します。</p>
