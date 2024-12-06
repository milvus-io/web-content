---
id: use_milvus_in_docsgpt.md
summary: このチュートリアルでは、MilvusをDocsGPTのバックエンドベクターデータベースとして使用する方法を紹介します。
title: DocsGPTでMilvusを使う
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">DocsGPTでMilvusを使う<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPTは</a>、強力なGPTモデルを統合することで、プロジェクトドキュメントの情報検索を簡素化する先進的なオープンソースソリューションです。これにより、開発者はプロジェクトに関する質問に対する正確な答えを簡単に得ることができ、時間のかかる手作業による検索を省くことができます。</p>
<p>このチュートリアルでは、MilvusをDocsGPTのバックエンドベクターデータベースとして使用する方法を紹介します。</p>
<div class="alert note">
<p>このチュートリアルは主に<a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>公式インストールガイドを参照しています。もしこのチュートリアルに古い部分があるようでしたら、オフィシャルガイドに従うことを優先し、私たちに問題を作成してください。</p>
</div>
<h2 id="Requirements" class="common-anchor-header">必要条件<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.docker.com/engine/install/">Dockerが</a>インストールされていることを確認してください。</p>
<h2 id="Clone-the-repository" class="common-anchor-header">リポジトリをクローンする<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>リポジトリをクローンし、そこに移動します：</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git
$ <span class="hljs-built_in">cd</span> DocsGPT
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">依存関係の追加<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">application</code> フォルダ下の<code translate="no">requirements.txt</code> ファイルに<code translate="no">langchain-milvus</code> 依存関係を追加する：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">環境変数の設定<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">docker-compose.yaml</code> ファイルの<code translate="no">backend</code> と<code translate="no">worker</code> サービスの環境変数に<code translate="no">VECTOR_STORE=milvus</code>,<code translate="no">MILVUS_URI=...</code>,<code translate="no">MILVUS_TOKEN=...</code> を追加します：</p>
<pre><code translate="no" class="language-yaml">  backend:
    build: ./application
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  worker:
    build: ./application
    <span class="hljs-built_in">command</span>: celery -A application.app.celery worker -l INFO -B
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MILVUS_URI</code> と<code translate="no">MILVUS_TOKEN</code> については、フルマネージドの<a href="https://zilliz.com/cloud">Zilliz Cloud</a>(推奨)サービスを使用するか、手動でMilvusサービスを起動することができます。</p>
<ul>
<li><p>フルマネージドZilliz Cloudサービスの場合：Zilliz Cloudサービスのご利用をお勧めします。<a href="https://zilliz.com/cloud">Zilliz Cloud</a>の無料トライアルアカウントにサインアップすることができます。その後、<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">パブリックエンドポイントとAPIキーに</a>対応する<code translate="no">MILVUS_URI</code> 、<code translate="no">MILVUS_TOKEN</code> 。</p></li>
<li><p>手動でMilvusサービスを開始する場合：Milvusサービスを手動で立ち上げる場合:<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus公式ドキュメントに従って</a>Milvusサーバを立ち上げ、サーバから<code translate="no">MILVUS_URI</code> と<code translate="no">MILVUS_TOKEN</code> を取得します。<code translate="no">MILVUS_URI</code> と<code translate="no">MILVUS_TOKEN</code> はそれぞれ<code translate="no">http://&lt;your_server_ip&gt;:19530</code> と<code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> の形式にしてください。</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">サービスの起動<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>実行する：<code translate="no">./setup.sh</code></p>
<p>その後、http://localhost:5173/。</p>
<p>UIで遊んだり、文書について質問することができます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>オルトテキスト</span> </span></p>
<p>サービスを停止したい場合は、実行します：</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<p>詳細やより高度な設定については、<a href="https://github.com/arc53/DocsGPT">DocsGPTの</a>公式ドキュメントを参照してください。</p>
