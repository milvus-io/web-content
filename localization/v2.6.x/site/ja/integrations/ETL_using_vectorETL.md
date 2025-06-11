---
id: ETL_using_vectorETL.md
summary: >-
  このチュートリアルでは、ベクトルデータベース用に設計された軽量なETLフレームワークである[VectorETL](https://github.com/ContextData/VectorETL)を使用して、Milvusに効率的にデータをロードする方法を探ります。VectorETLは、様々なソースからデータを抽出し、AIモデルを用いてベクトル埋め込みデータに変換し、Milvusに格納することで、高速かつスケーラブルな検索を可能にします。このチュートリアルが終わるころには、ベクター検索システムを簡単に統合・管理できるETLパイプラインが完成していることでしょう。さあ、始めましょう！
title: VectorETLによるMilvusへの効率的なデータロード
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">VectorETLによるMilvusへの効率的なデータロード<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、ベクトルデータベース用に設計された軽量なETLフレームワークである<a href="https://github.com/ContextData/VectorETL">VectorETLを</a>使用して、Milvusに効率的にデータをロードする方法を探ります。VectorETLは、様々なソースからデータを抽出し、AIモデルを使用してベクトル埋め込みに変換し、高速かつスケーラブルな検索のためにMilvusに格納するプロセスを簡素化します。このチュートリアルが終わるころには、ベクター検索システムを簡単に統合・管理できるETLパイプラインが完成していることでしょう。さっそく始めましょう！</p>
<h2 id="Preparation" class="common-anchor-header">準備<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">依存性と環境</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade vector-etl pymilvus</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールしたばかりの依存関係を有効にするには、<strong>ランタイムを再起動する</strong>必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<p>VectorETLはAmazon S3, Google Cloud Storage, Local Fileなど複数のデータソースをサポートしています。サポートされているソースの全リストは<a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">こちらで</a>確認できます。このチュートリアルでは、データソースの例として Amazon S3 を取り上げます。</p>
<p>Amazon S3からドキュメントをロードします。そのため、S3バケットに安全にアクセスするための環境変数として、<code translate="no">AWS_ACCESS_KEY_ID</code> と<code translate="no">AWS_SECRET_ACCESS_KEY</code> を用意する必要があります。さらに、OpenAIの<code translate="no">text-embedding-ada-002</code> エンベッディング・モデルを使って、データのエンベッディングを生成します。また、<a href="https://platform.openai.com/docs/quickstart">apiキー</a> <code translate="no">OPENAI_API_KEY</code> も環境変数として用意する必要があります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">ワークフロー<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">データソース（Amazon S3）の定義</h3><p>今回はAmazon S3のバケットからドキュメントを抽出します。VectorETLでは、バケット名、ファイルへのパス、扱うデータの種類を指定できる。</p>
<pre><code translate="no" class="language-python">source = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">埋め込みモデルの設定（OpenAI）</h3><p>データソースを設定したら、テキストデータをベクトル埋め込みに変換する埋め込みモデルを定義する必要があります。ここではOpenAIの<code translate="no">text-embedding-ada-002</code> 。</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">ターゲットデータベースとしてMilvusをセットアップする。</h3><p>生成された埋め込みデータをMilvusに格納します。ここでは、Milvus Liteを使ってMilvusの接続パラメータを定義します。</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">host</code> 、<code translate="no">api_key</code> ：</p>
<ul>
<li><p><code translate="no">host</code> をローカルファイル、例えば<code translate="no">./milvus.db</code> とし、<code translate="no">api_key</code> を空にしておくと、自動的に<a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteが</a>利用され、すべてのデータがこのファイルに格納されます。</p></li>
<li><p>データ規模が大きい場合は、<a href="https://milvus.io/docs/quickstart.md">dockerやkubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバのuri、例えば<code translate="no">http://localhost:19530</code> を<code translate="no">host</code> として使用し、<code translate="no">api_key</code> は空にしておいてください。</p></li>
<li><p>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、<code translate="no">host</code> と<code translate="no">api_key</code> をZilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応させてください。</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">埋め込みカラムの指定</h3><p>次に、CSVファイルから埋め込みに変換するカラムを指定する必要があります。これにより、関連するテキストフィールドのみが処理され、効率とストレージの両方が最適化されます。</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">VectorETLパイプラインの作成と実行</h3><p>すべての設定が完了したので、次にETLパイプラインを初期化し、データフローを設定し、実行します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>このチュートリアルに従うことで、VectorETLを使用してAmazon S3からmilvusにドキュメントを移動するエンドツーエンドのETLパイプラインを構築することに成功しました。VectorETLはデータソースに柔軟性があるので、特定のアプリケーションのニーズに基づいて好きなデータソースを選択することができます。VectorETLのモジュール設計により、このパイプラインを簡単に拡張して他のデータソースをサポートしたり、モデルを組み込んだりすることができ、AIやデータエンジニアリングワークフローのための強力なツールとなります！</p>
