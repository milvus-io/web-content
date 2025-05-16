---
id: integrate_with_voxel51.md
summary: このページでは、voxel51との統合について説明します。
title: MilvusとFiftyOneによるビジョン・サーチの実施
---

<h1 id="Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="common-anchor-header">MilvusとFiftyOneでビジョン検索を行う<button data-href="#Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.voxel51.com/">FiftyOneは</a>高品質なデータセットとコンピュータビジョンモデルを構築するためのオープンソースツールです。このガイドでは、Milvusの類似検索機能をFiftyOneに統合し、独自のデータセットでビジョン検索を実行できるようにします。</p>
<p>FiftyOneは、Pythonによる<a href="https://docs.voxel51.com/integrations/milvus.html#milvus-query">プログラム</a>、およびアプリのポイント&amp;クリックの両方で、Milvusコレクションの作成、ベクトルのアップロード、および類似性クエリの実行を行うためのAPIを提供します。このページのデモでは、プログラムによる統合に焦点を当てています。</p>
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
    </button></h2><p>開始する前に、以下が揃っていることを確認してください：</p>
<ul>
<li>稼働中の<a href="/docs/ja/v2.4.x/install_standalone-docker.md">Milvusサーバ</a></li>
<li><code translate="no">pymilvus</code> と<code translate="no">fiftyone</code> がインストールされたPython環境。</li>
<li>検索する画像の<a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">データセット</a></li>
</ul>
<h2 id="Installing-Requirements" class="common-anchor-header">インストール要件<button data-href="#Installing-Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>この例では、<code translate="no">pymilvus</code> と<code translate="no">fiftyone</code> を使用します。以下のコマンドを実行することでインストールできます：</p>
<pre><code translate="no" class="language-shell">python3 -m pip install pymilvus fiftyone torch torchvision
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-recipe" class="common-anchor-header">基本レシピ<button data-href="#Basic-recipe" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusを使ってFiftyOneデータセットに類似度インデックスを作成し、それを使ってデータを検索する基本的なワークフローは以下の通りです：</p>
<ol>
<li><a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">データセットを</a>FiftyOne にロードする</li>
<li>データセット内のサンプルまたはパッチに対してベクトル埋め込みを計算するか、埋め込みを生成するために使用するモデルを選択します。</li>
<li>モデルを選択します。 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>メソッドを使用して、パラメータ<code translate="no">backend=&quot;milvus&quot;</code> を設定し、<code translate="no">brain_key</code> を指定して、データセット内のサンプルまたはオブジェクトパッチに対するMilvus類似度インデックスを生成します。</li>
<li>このMilvus類似度インデックスを使用して、次のようにデータをクエリします。 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.sort_by_similarity"><code translate="no">sort_by_similarity()</code></a>.</li>
<li>必要であれば、インデックスを削除してください。</li>
</ol>
<h2 id="Procedures" class="common-anchor-header">手順<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の例は上記のワークフローを示すものである。</p>
<h3 id="1-Load-a-dataset-into-FiftyOne-and-compute-embeddings-for-the-samples" class="common-anchor-header">1.データセットを FiftyOne に読み込み、サンプルの埋め込みを計算する。</h3><p>以下のコードでは、FiftyOne が提供するサンプル画像セットを使用して統合のデモンストレーションを行います。<a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">こちらの記事を</a>参考に、独自の画像セットを用意することもできます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone <span class="hljs-keyword">as</span> fo
<span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob
<span class="hljs-keyword">import</span> fiftyone.zoo <span class="hljs-keyword">as</span> foz

<span class="hljs-comment"># Step 1: Load your data into FiftyOne</span>
dataset = foz.load_zoo_dataset(<span class="hljs-string">&quot;quickstart&quot;</span>)

<span class="hljs-comment"># Steps 2 and 3: Compute embeddings and create a similarity index</span>
milvus_index = fob.compute_similarity(
dataset,
brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
backend=<span class="hljs-string">&quot;milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>

<h3 id="2-Conduct-vision-similarity-searches" class="common-anchor-header">2.視覚類似検索の実行</h3><p>Milvus類似度インデックスを使用して、データセットの視覚類似度検索を行うことができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 4: Query your data</span>
query = dataset.first().<span class="hljs-built_in">id</span>  <span class="hljs-comment"># query by sample ID</span>
view = dataset.sort_by_similarity(
    query,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    k=<span class="hljs-number">10</span>,  <span class="hljs-comment"># limit to 10 most similar samples</span>
)

<span class="hljs-comment"># Step 5 (optional): Cleanup</span>

<span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index.cleanup()

<span class="hljs-comment"># Delete run record from FiftyOne</span>
dataset.delete_brain_run(<span class="hljs-string">&quot;milvus_index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>

<h3 id="3-Delete-the-index" class="common-anchor-header">3.インデックスの削除</h3><p>Milvus類似度インデックスが不要になった場合、以下のコードで削除することができます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 5: Delete the index</span>
milvus_index.delete()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-Milvus-backend" class="common-anchor-header">Milvusバックエンドを使用する<button data-href="#Use-the-Milvus-backend" class="anchor-icon" translate="no">
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
    </button></h2><p>デフォルトでは <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>または<code translate="no">sort_by_similarity()</code> を呼び出すと sklearn バックエンドが使用されます。</p>
<p>Milvusバックエンドを使用するには、オプションのバックエンドパラメータを <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>を<code translate="no">&quot;milvus&quot;</code> に設定するだけです：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.<span class="hljs-property">brain</span> <span class="hljs-keyword">as</span> fob

fob.<span class="hljs-title function_">compute_similarity</span>(..., backend=<span class="hljs-string">&quot;milvus&quot;</span>, ...)
<button class="copy-code-btn"></button></code></pre>

<p>また、以下の環境変数を設定することで、Milvusバックエンドを使用するようにFiftyOneを恒久的に設定することもできます：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">FIFTYONE_BRAIN_DEFAULT_SIMILARITY_BACKEND</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>または<a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">brain config</a>の<code translate="no">default_similarity_backend</code> パラメータを<code translate="no">~/.fiftyone/brain_config.json</code> に設定してください：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;default_similarity_backend&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Authentication" class="common-anchor-header">認証<button data-href="#Authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>カスタム Milvus サーバを使用している場合、様々な方法で認証情報を提供することができます。</p>
<h3 id="Environment-variables-recommended" class="common-anchor-header">環境変数 (推奨)</h3><p>Milvus の認証情報を設定するための推奨方法は、以下に示す環境変数に保存することです。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_URI=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_USER=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_PASSWORD=XXXXXX

<span class="hljs-comment"># also available if necessary</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SECURE=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_TOKEN=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_DB_NAME=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_KEY_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CA_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_NAME=XXXXXX
<button class="copy-code-btn"></button></code></pre>

<h3 id="FiftyOne-Brain-config" class="common-anchor-header">FiftyOne Brain config</h3><p><code translate="no">~/.fiftyone/brain_config.json</code> にある<a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">brain config</a>に認証情報を保存することもできます：</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;password&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,

            <span class="hljs-comment"># also available if necessary</span>
            <span class="hljs-string">&quot;secure&quot;</span>: true,
            <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_key_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;ca_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>
        }
    }

}
<button class="copy-code-btn"></button></code></pre>

<p>このファイルは作成するまで存在しないことに注意してください。</p>
<h3 id="Keyword-arguments" class="common-anchor-header">キーワード引数</h3><p>のようなメソッドを呼び出すたびに、キーワード引数としてMilvusの認証情報を手動で与えることができます。 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>のようなMilvusへの接続を必要とするメソッドを呼び出すたびに、キーワード引数としてあなたのMilvus認証情報を手動で与えることができます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

milvus_index = fob.compute_similarity(
...
backend=<span class="hljs-string">&quot;milvus&quot;</span>,
brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

)
<button class="copy-code-btn"></button></code></pre>

<p>この方法を使用する場合、後でインデックスをロードする際に、手動で認証情報を提供しなければならないことに注意してください。 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a>:</p>
<pre><code translate="no" class="language-python">milvus_index = dataset.load_brain_results(
    <span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

)
<button class="copy-code-btn"></button></code></pre>

<h3 id="Milvus-config-parameters" class="common-anchor-header">Milvus設定パラメータ</h3><p>Milvusバックエンドは様々なクエリパラメータをサポートしており、類似クエリをカスタマイズするために使用することができます。これらのパラメータには以下が含まれます：</p>
<ul>
<li><p><strong>collection_name</strong><em>(None</em>): 使用または作成するMilvusコレクションの名前。何も指定しない場合、新しいコレクションが作成されます。</p></li>
<li><p><strong>metric</strong>(<em>"dotproduct")</em>: 新しいインデックスを作成する際に使用する埋め込み距離メトリック。使用可能な値は (<code translate="no">&quot;dotproduct&quot;</code>,<code translate="no">&quot;euclidean&quot;</code>) です。</p></li>
<li><p><strong>consistency_level</strong>(<em>"Session")</em>: 使用する一貫性レベル。使用可能な値は (<code translate="no">&quot;Strong&quot;</code>,<code translate="no">&quot;Session&quot;</code>,<code translate="no">&quot;Bounded&quot;</code>,<code translate="no">&quot;Eventually&quot;</code>) です。</p></li>
</ul>
<p>これらのパラメータの詳細については、<a href="/docs/ja/v2.4.x/authenticate.md">Milvus認証のドキュメント</a>および<a href="/docs/ja/v2.4.x/consistency.md">Milvus一貫性レベルのドキュメントを</a>参照してください。</p>
<p>これらのパラメータは、前のセクションで説明したどの方法でも指定することができます。以下は利用可能なパラメータをすべて含む<a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">ブレインコンフィグの</a>例です：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;your_collection&quot;</span>,
            <span class="hljs-string">&quot;metric&quot;</span>: <span class="hljs-string">&quot;dotproduct&quot;</span>,
            <span class="hljs-string">&quot;consistency_level&quot;</span>: <span class="hljs-string">&quot;Strong&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>しかし、通常はこれらのパラメータを直接 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>に直接渡されます：</p>
<pre><code translate="no" class="language-python">milvus_index = fob.<span class="hljs-title function_">compute_similarity</span>(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    metric=<span class="hljs-string">&quot;dotproduct&quot;</span>,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-brain-runs" class="common-anchor-header">ブレイン・ランの管理<button data-href="#Manage-brain-runs" class="anchor-icon" translate="no">
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
    </button></h2><p>FiftyOne には、brain の実行を管理するために使用できるさまざまなメソッドが用意されています。</p>
<p>例えば <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.list_brain_runs"><code translate="no">list_brain_runs()</code></a>を呼び出して、データセットで利用可能なブレインキーを確認できます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

<span class="hljs-comment"># List all brain runs</span>
dataset.list_brain_runs()

<span class="hljs-comment"># Only list similarity runs</span>
dataset.list_brain_runs(<span class="hljs-built_in">type</span>=fob.Similarity)

<span class="hljs-comment"># Only list specific similarity runs</span>
dataset.list_brain_runs(
<span class="hljs-built_in">type</span>=fob.Similarity,
patches_field=<span class="hljs-string">&quot;ground_truth&quot;</span>,
supports_prompts=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>

<p>また <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.get_brain_info"><code translate="no">get_brain_info()</code></a>を使用して、ブレーンランの構成に関する情報を取得できます：</p>
<pre><code translate="no" class="language-python">info = dataset.get_brain_info(brain_key)
<span class="hljs-built_in">print</span>(info)
<button class="copy-code-btn"></button></code></pre>
<p>また <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a>を使用して <a href="https://docs.voxel51.com/api/fiftyone.brain.similarity.html#fiftyone.brain.similarity.SimilarityIndex"><code translate="no">SimilarityIndex</code></a>インスタンスをロードする。</p>
<p>また <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.rename_brain_run"><code translate="no">rename_brain_run()</code></a>を使用して、既存の類似結果ランに関連付けられたブレインキーの名前を変更します：</p>
<pre><code translate="no" class="language-python">dataset.rename_brain_run(brain_key, new_brain_key)
<button class="copy-code-btn"></button></code></pre>
<p>最後に <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a>を使用してブレイン・ランを削除します：</p>
<pre><code translate="no" class="language-python">dataset.delete_brain_run(brain_key)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>を呼び出します。 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a>を呼び出すと、FiftyOne データセットから brain run のレコードが削除されるだけで、関連する Milvus コレクションは削除されません：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index = dataset.load_brain_results(brain_key)
milvus_index.cleanup()
<button class="copy-code-btn"></button></code></pre>
</div>
<p>Milvusバックエンドを使用したFiftyOneデータセットの一般的なベクトル検索ワークフローについては、<a href="https://docs.voxel51.com/integrations/milvus.html#examples">こちらのExamplesを</a>参照してください。</p>
