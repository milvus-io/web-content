---
id: dify_with_milvus.md
summary: このチュートリアルでは、DifyをMilvusに導入し、効率的な検索とRAGエンジンを実現する方法を紹介します。
title: MilvusでDifyを導入する
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">MilvusでDifyを導入する<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Difyは</a>、Backend-as-a-ServiceとLLMOpsを組み合わせることで、AIアプリケーションの構築を簡素化するために設計されたオープンソースのプラットフォームです。主流のLLMをサポートし、直感的なプロンプトオーケストレーションインターフェイス、高品質のRAGエンジン、柔軟なAIエージェントフレームワークを提供します。ローコードワークフロー、使いやすいインターフェイス、APIにより、Difyは開発者と技術者でないユーザーの両方が、複雑さに対処することなく、革新的で現実的なAIソリューションの作成に集中することを可能にします。</p>
<p>このチュートリアルでは、効率的な検索とRAGエンジンを実現するために、Milvusを使ってDifyを導入する方法を紹介します。</p>
<div class="alert note">
<p>このドキュメントは主に<a href="https://docs.dify.ai/">Difyの</a>公式<a href="https://docs.dify.ai/">ドキュメントに基づいて</a>います。もし、古い内容や一貫性のない内容がありましたら、公式ドキュメントを優先してお読みいただき、遠慮なく問題を提起してください。</p>
</div>
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">リポジトリのクローン</h3><p>Difyのソースコードをローカルマシンにクローンしてください：</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">環境設定の準備</h3><p>DifyソースコードのDockerディレクトリに移動します。</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>環境設定ファイルをコピーする</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">デプロイオプション<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>DifyをMilvusでデプロイするには、2種類の方法があります。ニーズに合わせて選択してください：</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">オプション1: Dockerと共にMilvusを使用する<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Docker Composeを使用し、ローカルマシン上でDifyと同時にMilvusコンテナを実行します。</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">環境変数の設定</h3><p><code translate="no">.env</code> ファイルを以下のMilvus設定で編集します：</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">MILVUS_URI</code> は<code translate="no">host.docker.internal:19530</code> を使用し、DockerコンテナがDockerの内部ネットワークを通してホストマシン上で動作しているMilvusにアクセスできるようにします。</li>
<li><code translate="no">MILVUS_TOKEN</code> ローカルにMilvusをデプロイする場合は、空のままでも構いません。</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Dockerコンテナの起動</h3><p>Milvusサービスを含めるために、<code translate="no">milvus</code> プロファイルを使用してコンテナを起動します：</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>このコマンドは、<code translate="no">milvus-standalone</code> 、<code translate="no">etcd</code> 、<code translate="no">minio</code> コンテナと共にDifyサービスを開始します。</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">オプション 2: Zilliz Cloud を使用する<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>このオプションは、DifyをZilliz Cloud上のマネージドMilvusサービスに接続します。</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">環境変数の設定</h3><p><code translate="no">.env</code> ファイルを編集し、Zilliz Cloud 接続の詳細を入力します：</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> を Zilliz Cloud の<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint に置き換えて</a>ください。</li>
<li><code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> をZilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">APIキーに</a>置き換えます。</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Dockerコンテナを起動します。</h3><p>Milvusプロファイルを使用せずに、Difyコンテナのみを起動します：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Difyへのアクセス<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Difyにログインする。</h3><p>ブラウザを開き、Difyのインストールページにアクセスし、管理者アカウントを<code translate="no">http://localhost/install</code> に設定します。</p>
<p>さらに詳しい使い方やガイダンスについては、<a href="https://docs.dify.ai/">Difyのドキュメントを</a>参照してください。</p>
