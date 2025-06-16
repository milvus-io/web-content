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
<p>このチュートリアルでは、効率的な検索とRAGエンジンを実現するために、MilvusでDifyをデプロイする方法を紹介します。</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">リポジトリのクローン<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Difyのソースコードをローカルマシンにクローンします：</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">環境変数の設定<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>DifyソースコードのDockerディレクトリに移動します。</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>環境設定ファイルをコピーする</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">.env</code> ファイルの値<code translate="no">VECTOR_STORE</code> を変更する。</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">.env</code> ファイル内のMilvus設定に以下の行があることを確認する：</p>
<pre><code translate="no"><span class="hljs-attr">MILVUS_URI</span>=http://host.docker.internal:<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">VECTOR_STORE=milvus</code> を指定することで、Docker上にMilvus Standaloneサーバーが立ち上がります。Docker の外から<code translate="no">http://localhost:19530</code> を通してサーバーにアクセスすることはできますが、他の Dify コンテナが Docker 環境内でサーバーと通信するためには、特別な DNS 名<code translate="no">host.docker.internal</code> に接続する必要があります。従って、<code translate="no">http://host.docker.internal:19530</code> を<code translate="no">MILVUS_URI</code> とします。</p>
<p>本番環境では、認証をカスタマイズすることができます。Milvusでトークンやユーザ名、パスワードを設定する方法については、<a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">authenticateのページを</a>参照してください。</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Dockerコンテナの起動<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>システム上のDocker Composeのバージョンに応じて、コンテナを起動する適切なコマンドを選択します。<code translate="no">$ docker compose version</code> コマンドでバージョンを確認することができます。詳細はDockerのドキュメントを参照してください：</p>
<p>Docker Compose V2を使用している場合は、以下のコマンドを使用します：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose V1の場合は、以下のコマンドを使用してください：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Difyにログインします。<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>ブラウザを開き、Difyのインストールページに移動し、ここで管理者アカウントを設定します。<code translate="no">http://localhost/install</code> 、そしてDifyのメインページにログインして、さらに利用します。</p>
<p>さらに詳しい使い方やガイダンスについては、<a href="https://docs.dify.ai/">Dify のドキュメントを</a>参照してください。</p>
