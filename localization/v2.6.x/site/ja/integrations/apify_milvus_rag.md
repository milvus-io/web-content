---
id: apify_milvus_rag.md
summary: >-
  このチュートリアルでは、アピファイのウェブサイトコンテンツクローラを使ってウェブサイトをクロールし、Milvus/Zillizベクトルデータベースにデータを保存し、後で質問に答えるために使用する方法を説明します。
title: 検索拡張生成：Apifyでウェブサイトをクロールし、Milvusにデータを保存して質問に答える
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">検索拡張生成：Apifyでウェブサイトをクロールし、Milvusにデータを保存して質問に答える<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/apify_milvus_rag.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a></p>
<p>このチュートリアルでは、ApifyのWebサイトコンテンツクローラを使ってWebサイトをクロールし、Milvus/Zillizベクトルデータベースにデータを保存して、後で質問回答に使用する方法を説明します。</p>
<p><a href="https://apify.com/">Apifyは</a>Webスクレイピングとデータ抽出のプラットフォームで、アクターと呼ばれる2000以上の既製のクラウドツールを備えたアプリマーケットプレイスを提供しています。これらのツールは、eコマースサイト、ソーシャルメディア、検索エンジン、オンラインマップなどから構造化データを抽出するようなユースケースに最適である。</p>
<p>例えば、<a href="https://apify.com/apify/website-content-crawler">ウェブサイトコンテンツクローラアクターは</a>、ウェブサイトを深くクロールし、クッキーモーダル、フッター、またはナビゲーションを削除することによってHTMLをきれいにし、HTMLをMarkdownに変換することができます。</p>
<p>Milvus/ZillizのためのApifyインテグレーションは、ウェブからベクターデータベースへのデータのアップロードを簡単にします。</p>
<h1 id="Before-you-begin" class="common-anchor-header">始める前に<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>このノートブックを実行する前に、以下があることを確認してください：</p>
<ul>
<li><p>Apifyアカウントと<a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>。</p></li>
<li><p>OpenAI アカウントと<a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a></p></li>
<li><p><a href="https://cloud.zilliz.com">Zilliz Cloudアカウント</a>(milvusのフルマネージドクラウドサービス)</p></li>
<li><p>ZillizデータベースURIとトークン</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">依存関係のインストール<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">$ pip install --upgrade --quiet  apify==<span class="hljs-number">1.7</span><span class="hljs-number">.2</span> langchain-core==<span class="hljs-number">0.3</span><span class="hljs-number">.5</span> langchain-milvus==<span class="hljs-number">0.1</span><span class="hljs-number">.5</span> langchain-openai==<span class="hljs-number">0.2</span><span class="hljs-number">.0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">ApifyとOpen APIキーのセットアップ<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> getpass <span class="hljs-keyword">import</span> getpass

os.environ[<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR APIFY_API_TOKEN&quot;</span>)
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR OPENAI_API_KEY&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR APIFY_API_TOKEN··········
Enter YOUR OPENAI_API_KEY··········
</code></pre>
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">Milvus/ZillizのURI、トークン、コレクション名の設定<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>クライアントのセットアップにはMilvus/ZillizのURIとTokenが必要です。</p>
<ul>
<li><a href="https://milvus.io/docs/quickstart.md">DockerやKubernetes</a>上にMilvusサーバを自前でデプロイしている場合は、サーバのアドレスとポートをURIとして使用します（例:<code translate="no">http://localhost:19530</code> ）。Milvusで認証機能を有効にしている場合は、"<your_username>:<your_password>"をトークンとして使用し、そうでない場合は空文字列のままにしてください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>ご利用の場合は、<code translate="no">uri</code> と<code translate="no">token</code> をZilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public EndpointとAPI keyに</a>対応させてください。</li>
</ul>
<p>コレクションは事前に存在する必要はありません。データベースにデータがアップロードされると自動的に作成されます。</p>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

MILVUS_COLLECTION_NAME = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">ウェブサイトコンテンツクローラを使ってmilvus.ioからテキストコンテンツをスクレイピングする。<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>次に、Apify Python SDKでウェブサイトコンテンツクローラを使ってみます。まず、actor_idとrun_inputを定義し、vectorデータベースに保存する情報を指定します。</p>
<p><code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> は Website Content Crawler の識別子です。クローラーの動作は、run_input パラメータで完全に制御できます（詳細は<a href="https://apify.com/apify/website-content-crawler/input-schema">input ページを</a>参照）。この例では、JavaScriptのレンダリングを必要としないMilvusのドキュメントをクローリングします。そのため、<code translate="no">crawlerType=cheerio</code> を設定し、<code translate="no">startUrls</code> を定義し、<code translate="no">maxCrawlPages=10</code> を設定してクロールするページ数を制限します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> apify_client <span class="hljs-keyword">import</span> ApifyClient

client = ApifyClient(os.getenv(<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>))

actor_id = <span class="hljs-string">&quot;apify/website-content-crawler&quot;</span>
run_input = {
    <span class="hljs-string">&quot;crawlerType&quot;</span>: <span class="hljs-string">&quot;cheerio&quot;</span>,
    <span class="hljs-string">&quot;maxCrawlPages&quot;</span>: <span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;startUrls&quot;</span>: [{<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://milvus.io/&quot;</span>}, {<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://zilliz.com/&quot;</span>}],
}

actor_call = client.actor(actor_id).call(run_input=run_input)
<button class="copy-code-btn"></button></code></pre>
<p>ウェブサイトコンテンツクローラーは、<code translate="no">maxCrawlPages</code> で設定された事前定義された制限に達するまで、サイトを徹底的にクロールします。スクレイピングされたデータは、アピファイ・プラットフォームの<code translate="no">Dataset</code> に保存されます。このデータにアクセスして分析するには<code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>以下のコードは、アピファイ<code translate="no">Dataset</code> からスクレイピングされたデータをフェッチし、最初にスクレイピングされたウェブサイトを表示します。</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(limit=<span class="hljs-number">1</span>).items
item[<span class="hljs-number">0</span>].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>Milvusデータベースにデータをアップロードするには、<a href="https://apify.com/apify/milvus-integration">Apify Milvusインテグレーションを</a>使用します。まず、Milvusデータベースのパラメータを設定します。次に、データベースに保存したいフィールド(<code translate="no">datasetFields</code>)を選択します。下の例では、<code translate="no">text</code> フィールドと<code translate="no">metadata.title</code> を保存しています。</p>
<pre><code translate="no" class="language-python">milvus_integration_inputs = {
    <span class="hljs-string">&quot;milvusUri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>),
    <span class="hljs-string">&quot;milvusToken&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>),
    <span class="hljs-string">&quot;milvusCollectionName&quot;</span>: MILVUS_COLLECTION_NAME,
    <span class="hljs-string">&quot;datasetFields&quot;</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;metadata.title&quot;</span>],
    <span class="hljs-string">&quot;datasetId&quot;</span>: actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>],
    <span class="hljs-string">&quot;performChunking&quot;</span>: <span class="hljs-literal">True</span>,
    <span class="hljs-string">&quot;embeddingsApiKey&quot;</span>: os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
    <span class="hljs-string">&quot;embeddingsProvider&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>次に、<code translate="no">apify/milvus-integration</code> を呼び出してデータを保存します。</p>
<pre><code translate="no" class="language-python">actor_call = client.actor(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).call(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>すべてのスクレイピングされたデータはMilvusデータベースに保存され、検索と質問応答の準備が整いました。</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">検索とLLM生成パイプライン<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>次に、Langchainを使った検索支援パイプラインを定義する。パイプラインは2つのステージで動作する：</p>
<ul>
<li>ベクターストア（milvus）：LangchainはMilvusから関連文書を検索し、クエリの埋め込みと保存文書の埋め込みをマッチングする。</li>
<li>LLMレスポンス：検索された文書は、LLM（例えばGPT-4）が情報に基づいた回答を生成するためのコンテキストを提供する。</li>
</ul>
<p>RAGチェーンの詳細については、<a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">Langchainのドキュメントを</a>参照してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_milvus.vectorstores <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI, OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)

vectorstore = Milvus(
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>),
        <span class="hljs-string">&quot;token&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>),
    },
    embedding_function=embeddings,
    collection_name=MILVUS_COLLECTION_NAME,
)

prompt = PromptTemplate(
    input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>],
    template=<span class="hljs-string">&quot;Use the following pieces of retrieved context to answer the question. If you don&#x27;t know the answer, &quot;</span>
    <span class="hljs-string">&quot;just say that you don&#x27;t know. \nQuestion: {question} \nContext: {context} \nAnswer:&quot;</span>,
)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)


rag_chain = (
    {
        <span class="hljs-string">&quot;context&quot;</span>: vectorstore.as_retriever() | format_docs,
        <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough(),
    }
    | prompt
    | ChatOpenAI(model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>)
    | StrOutputParser()
)
<button class="copy-code-btn"></button></code></pre>
<p>データベースにデータがあれば、質問を始めることができる。</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.invoke(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、Apifyを使用してWebサイトのコンテンツをクロールし、milvusベクトルデータベースにデータを保存し、検索補強パイプラインを使用して質問応答タスクを実行する方法を示しました。ApifyのWebスクレイピング機能とベクトルストレージのMilvus/Zilliz、言語モデルのLangchainを組み合わせることで、非常に効果的な情報検索システムを構築することができます。</p>
<p>データベースのデータ収集と更新を改善するために、Apifyの統合は<a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">インクリメンタルアップデートを</a>提供し、チェックサムに基づいて新しいデータや変更されたデータのみを更新します。さらに、指定された時間内にクロールされなかった<a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">古い</a>データを自動的に<a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">削除する</a>こともできます。これらの機能は、ベクターデータベースを最適化し、検索で補強されたパイプラインが最小限の手作業で効率的かつ最新の状態を維持することを確実にするのに役立ちます。</p>
<p>ApifyとMilvusの統合の詳細については、<a href="https://docs.apify.com/platform/integrations/milvus">Apify Milvusのドキュメントと</a> <a href="https://apify.com/apify/milvus-integration">統合のREADMEファイルを</a>参照してください。</p>
