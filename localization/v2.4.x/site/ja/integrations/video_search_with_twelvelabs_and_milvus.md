---
id: video_search_with_twelvelabs_and_milvus.md
summary: >-
  マルチモーダルエンベッディングを生成するTwelve LabsのEmbed
  APIとMilvusを統合して、セマンティック動画検索アプリケーションを作成する方法をご紹介します。開発環境のセットアップから、ハイブリッド検索やテンポラルビデオ解析のような高度な機能の実装までの全プロセスをカバーし、洗練されたビデオコンテンツ解析および検索システムを構築するための包括的な基盤を提供します。
title: 高度なビデオ検索：意味検索のためのTwelve LabsとMilvusの活用
---
<h1 id="Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="common-anchor-header">高度なビデオ検索：Twelve LabsとMilvusを活用したセマンティック検索<button data-href="#Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">はじめに<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.twelvelabs.io/docs/create-embeddings">Twelve Labs Embed APIと</a>Milvusを使用したセマンティック動画検索の実装に関する包括的なチュートリアルへようこそ。このガイドでは、<a href="https://www.twelvelabs.io/blog/multimodal-embeddings">Twelve Labsの高度なマルチモーダル埋め込みと</a> <a href="https://milvus.io/intro">Milvusの効率的なベクトルデータベースの</a>パワーを活用して、堅牢な動画検索ソリューションを構築する方法を探ります。これらの技術を統合することで、開発者は動画コンテンツ分析の新たな可能性を解き放ち、コンテンツベースの動画検索、推薦システム、動画データのニュアンスを理解する洗練された検索エンジンなどのアプリケーションを実現することができます。</p>
<p>このチュートリアルでは、開発環境のセットアップから機能的なセマンティック動画検索アプリケーションの実装まで、全プロセスを解説します。動画からマルチモーダル埋め込みを生成し、それらを Milvus に効率的に保存し、関連するコンテンツを検索するために類似検索を実行するといった重要な概念について説明します。動画分析プラットフォームの構築、コンテンツ発見ツールの構築、動画検索機能による既存アプリケーションの拡張など、本ガイドは、Twelve LabsとMilvusの長所を組み合わせてプロジェクトに活用するための知識と実践的なステップを提供します。</p>
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
    </button></h2><p>始める前に、以下のものをご用意ください：</p>
<p>Twelve Labs API キー (お持ちでない場合は https://api.twelvelabs.io からサインアップしてください) Python 3.7 以降がインストールされていること。</p>
<h2 id="Setting-Up-the-Development-Environment" class="common-anchor-header">開発環境のセットアップ<button data-href="#Setting-Up-the-Development-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>プロジェクト用の新しいディレクトリを作成し、そこに移動する：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> video-search-tutorial
<span class="hljs-built_in">cd</span> video-search-tutorial
<button class="copy-code-btn"></button></code></pre>
<p>仮想環境をセットアップする（オプションだが推奨）：</p>
<pre><code translate="no" class="language-shell">python -m venv venv
<span class="hljs-built_in">source</span> venv/bin/activate  <span class="hljs-comment"># On Windows, use `venv\Scripts\activate`</span>
<button class="copy-code-btn"></button></code></pre>
<p>必要なPythonライブラリをインストールする：</p>
<pre><code translate="no" class="language-shell">pip install twelvelabs pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>プロジェクト用に新しいPythonファイルを作成します：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">touch</span> video_search.py
<button class="copy-code-btn"></button></code></pre>
<p>このvideo_search.pyファイルがチュートリアルで使用するメインスクリプトになります。次に、セキュリティのためにTwelve LabsのAPIキーを環境変数として設定します：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">TWELVE_LABS_API_KEY</span>=<span class="hljs-string">&#x27;your_api_key_here&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus" class="common-anchor-header">Milvusへの接続<button data-href="#Connecting-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusとの接続を確立するために、MilvusClientクラスを使用します。この方法は接続プロセスを簡素化し、ローカルファイルベースのMilvusインスタンスで作業することを可能にします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Initialize the Milvus client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_twelvelabs_demo.db&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Successfully connected to Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>このコードでは新しいMilvusクライアントインスタンスを作成し、milvus_twelvelabs_demo.dbという名前のファイルにすべてのデータを保存します。このファイルベースのアプローチは開発やテストに最適です。</p>
<h2 id="Creating-a-Milvus-Collection-for-Video-Embeddings" class="common-anchor-header">動画埋め込み用のMilvusコレクションの作成<button data-href="#Creating-a-Milvus-Collection-for-Video-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus に接続できたので、動画の埋め込みと関連するメタデータを保存するコレクションを作成しましょう。コレクション スキーマを定義し、コレクションがまだ存在しない場合は作成します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the collection name</span>
collection_name = <span class="hljs-string">&quot;twelvelabs_demo_collection&quot;</span>

<span class="hljs-comment"># Check if the collection already exists and drop it if it does</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
    milvus_client.drop_collection(collection_name=collection_name)

<span class="hljs-comment"># Create the collection</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">1024</span>  <span class="hljs-comment"># The dimension of the Twelve Labs embeddings</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>このコードでは、まずコレクションがすでに存在するかどうかをチェックし、存在する場合は削除します。これにより、まっさらな状態から開始できます。これはTwelve Labsのエンベッディングの出力次元と一致する。</p>
<h2 id="Generating-Embeddings-with-Twelve-Labs-Embed-API" class="common-anchor-header">Twelve Labs Embed API を使用してエンベッディングを生成する<button data-href="#Generating-Embeddings-with-Twelve-Labs-Embed-API" class="anchor-icon" translate="no">
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
    </button></h2><p>Twelve Labs Embed API を使用して動画のエンベッディングを生成するには、Twelve Labs Python SDK を使用します。このプロセスでは、埋め込みタスクを作成し、その完了を待ち、結果を取得します。実装方法は以下の通りです：</p>
<p>まず、Twelve Labs SDKがインストールされていることを確認し、必要なモジュールをインポートします：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> twelvelabs <span class="hljs-keyword">import</span> TwelveLabs
<span class="hljs-keyword">from</span> twelvelabs.models.embed <span class="hljs-keyword">import</span> EmbeddingsTask
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Retrieve the API key from environment variables</span>
TWELVE_LABS_API_KEY = os.getenv(<span class="hljs-string">&#x27;TWELVE_LABS_API_KEY&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-the-Twelve-Labs-client" class="common-anchor-header">Twelve Labsクライアントを初期化する：<button data-href="#Initialize-the-Twelve-Labs-client" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">twelvelabs_client = TwelveLabs(api_key=TWELVE_LABS_API_KEY)
<button class="copy-code-btn"></button></code></pre>
<p>与えられた動画 URL の埋め込みを生成する関数を作成します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate embeddings for a given video URL using the Twelve Labs API.

    This function creates an embedding task for the specified video URL using
    the Marengo-retrieval-2.6 engine. It monitors the task progress and waits
    for completion. Once done, it retrieves the task result and extracts the
    embeddings along with their associated metadata.

    Args:
        video_url (str): The URL of the video to generate embeddings for.

    Returns:
        tuple: A tuple containing two elements:
            1. list: A list of dictionaries, where each dictionary contains:
                - &#x27;embedding&#x27;: The embedding vector as a list of floats.
                - &#x27;start_offset_sec&#x27;: The start time of the segment in seconds.
                - &#x27;end_offset_sec&#x27;: The end time of the segment in seconds.
                - &#x27;embedding_scope&#x27;: The scope of the embedding (e.g., &#x27;shot&#x27;, &#x27;scene&#x27;).
            2. EmbeddingsTaskResult: The complete task result object from Twelve Labs API.

    Raises:
        Any exceptions raised by the Twelve Labs API during task creation,
        execution, or retrieval.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># Create an embedding task</span>
    task = twelvelabs_client.embed.task.create(
        engine_name=<span class="hljs-string">&quot;Marengo-retrieval-2.6&quot;</span>,
        video_url=video_url
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created task: id=<span class="hljs-subst">{task.<span class="hljs-built_in">id</span>}</span> engine_name=<span class="hljs-subst">{task.engine_name}</span> status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Define a callback function to monitor task progress</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_task_update</span>(<span class="hljs-params">task: EmbeddingsTask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Wait for the task to complete</span>
    status = task.wait_for_done(
        sleep_interval=<span class="hljs-number">2</span>,
        callback=on_task_update
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding done: <span class="hljs-subst">{status}</span>&quot;</span>)

    <span class="hljs-comment"># Retrieve the task result</span>
    task_result = twelvelabs_client.embed.task.retrieve(task.<span class="hljs-built_in">id</span>)

    <span class="hljs-comment"># Extract and return the embeddings</span>
    embeddings = []
    <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> task_result.video_embeddings:
        embeddings.append({
            <span class="hljs-string">&#x27;embedding&#x27;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&#x27;start_offset_sec&#x27;</span>: v.start_offset_sec,
            <span class="hljs-string">&#x27;end_offset_sec&#x27;</span>: v.end_offset_sec,
            <span class="hljs-string">&#x27;embedding_scope&#x27;</span>: v.embedding_scope
        })
    
    <span class="hljs-keyword">return</span> embeddings, task_result
<button class="copy-code-btn"></button></code></pre>
<p>この関数を使用して、動画の埋め込みを生成します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example usage</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Generate embeddings for the video</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated <span class="hljs-subst">{<span class="hljs-built_in">len</span>(embeddings)}</span> embeddings for the video&quot;</span>)
<span class="hljs-keyword">for</span> i, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embeddings):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Scope: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding_scope&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time range: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Embedding vector (first 5 values): <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding&#x27;</span>][:<span class="hljs-number">5</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>この実装により、Twelve Labs Embed API を使用して任意の動画 URL の埋め込みを生成できます。generate_embedding 関数は、タスクの作成から結果の取得までのプロセス全体を処理します。この関数は、埋め込みベクトルとそのメタデータ（時間範囲とスコープ）を含む辞書のリストを返します。本番環境では、ネットワークの問題や API の制限などの潜在的なエラーを処理することを忘れないでください。また、特定のユースケースによっては、リトライやより堅牢なエラーハンドリングを実装したくなるかもしれません。</p>
<h2 id="Inserting-Embeddings-into-Milvus" class="common-anchor-header">エンベッディングをMilvusに挿入する<button data-href="#Inserting-Embeddings-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Twelve Labs Embed APIを使用してエンベッディングを生成した後、次のステップはこれらのエンベッディングをメタデータと共にMilvusコレクションに挿入することです。このプロセスにより、後で効率的に類似検索を行うために、動画の埋め込みを保存し、インデックス化することができます。</p>
<p>以下は埋め込みデータをMilvusに挿入する方法です：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_embeddings</span>(<span class="hljs-params">milvus_client, collection_name, task_result, video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Insert embeddings into the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to insert into.
        task_result (EmbeddingsTaskResult): The task result containing video embeddings.
        video_url (str): The URL of the video associated with the embeddings.

    Returns:
        MutationResult: The result of the insert operation.

    This function takes the video embeddings from the task result and inserts them
    into the specified Milvus collection. Each embedding is stored with additional
    metadata including its scope, start and end times, and the associated video URL.
    &quot;&quot;&quot;</span>
    data = []

    <span class="hljs-keyword">for</span> i, v <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(task_result.video_embeddings):
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&quot;embedding_scope&quot;</span>: v.embedding_scope,
            <span class="hljs-string">&quot;start_offset_sec&quot;</span>: v.start_offset_sec,
            <span class="hljs-string">&quot;end_offset_sec&quot;</span>: v.end_offset_sec,
            <span class="hljs-string">&quot;video_url&quot;</span>: video_url
        })

    insert_result = milvus_client.insert(collection_name=collection_name, data=data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(data)}</span> embeddings into Milvus&quot;</span>)
    <span class="hljs-keyword">return</span> insert_result

<span class="hljs-comment"># Usage example</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Assuming this function exists from previous step</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-comment"># Insert embeddings into the Milvus collection</span>
insert_result = insert_embeddings(milvus_client, collection_name, task_result, video_url)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<p>この関数は、埋め込みベクトル、時間範囲、埋め込み元動画URLなど、関連するすべてのメタデータを含む埋め込み用データを準備します。その後、Milvusクライアントを使用して、このデータを指定されたコレクションに挿入します。</p>
<h2 id="Performing-Similarity-Search" class="common-anchor-header">類似検索の実行<button data-href="#Performing-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>埋め込みデータが Milvus に格納されたら、クエリベクトルに基づいて最も関連性の高い動画セグメントを見つけるために類似検索を実行できます。この機能の実装方法を以下に示します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_similarity_search</span>(<span class="hljs-params">milvus_client, collection_name, query_vector, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Perform a similarity search on the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to search in.
        query_vector (list): The query vector to search for similar embeddings.
        limit (int, optional): The maximum number of results to return. Defaults to 5.

    Returns:
        list: A list of search results, where each result is a dictionary containing
              the matched entity&#x27;s metadata and similarity score.

    This function searches the specified Milvus collection for embeddings similar to
    the given query vector. It returns the top matching results, including metadata
    such as the embedding scope, time range, and associated video URL for each match.
    &quot;&quot;&quot;</span>
    search_results = milvus_client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;embedding_scope&quot;</span>, <span class="hljs-string">&quot;start_offset_sec&quot;</span>, <span class="hljs-string">&quot;end_offset_sec&quot;</span>, <span class="hljs-string">&quot;video_url&quot;</span>]
    )

    <span class="hljs-keyword">return</span> search_results
    
<span class="hljs-comment"># define the query vector</span>
<span class="hljs-comment"># We use the embedding inserted previously as an example. In practice, you can replace it with any video embedding you want to query.</span>
query_vector = task_result.video_embeddings[<span class="hljs-number">0</span>].embedding.<span class="hljs-built_in">float</span>

<span class="hljs-comment"># Perform a similarity search on the Milvus collection</span>
search_results = perform_similarity_search(milvus_client, collection_name, query_vector)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search Results:&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Video URL: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;video_url&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time Range: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Similarity Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>この実装では以下のことを行います：</p>
<ol>
<li>クエリベクトルを受け取り、Milvusコレクションから類似の埋め込みを検索する関数 perform_similarity_search を定義します。</li>
<li>Milvusクライアントの検索メソッドを使用して、最も類似したベクトルを検索します。</li>
<li>一致する動画セグメントに関するメタデータを含む、取得したい出力フィールドを指定します。</li>
<li>この関数をクエリ動画で使用する方法の例として、まず埋め込みを生成し、次にそれを検索に使用する方法を示します。</li>
<li>関連するメタデータや類似度のスコアを含む検索結果を出力する。</li>
</ol>
<p>これらの関数を実装することで、動画の埋め込みを Milvus に保存し、類似検索を実行するための完全なワークフローが構築されます。このセットアップにより、Twelve Labs の Embed API で生成されたマルチモーダル埋め込みに基づく類似動画コンテンツの効率的な検索が可能になります。</p>
<h2 id="Optimizing-Performance" class="common-anchor-header">パフォーマンスの最適化<button data-href="#Optimizing-Performance" class="anchor-icon" translate="no">
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
    </button></h2><p>さて、このアプリを次のレベルに持っていこう！大規模な動画コレクションを扱う場合、<strong>パフォーマンスが鍵となる</strong>。最適化するには、<a href="https://milvus.io/docs/v2.3.x/bulk_insert.md">埋め込み生成とMilvusへの挿入のバッチ処理を</a>実装する必要があります。そうすれば、複数の動画を同時に扱うことができ、全体の処理時間を大幅に短縮できます。さらに、<a href="https://milvus.io/docs/v2.2.x/partition_key.md">Milvusのパーティショニング機能を</a>活用して、より効率的にデータを整理することもできます。これにより、関連するパーティションだけを検索できるようになり、クエリのスピードが上がる。</p>
<p>もう一つの最適化のトリックは<strong>、頻繁にアクセスされる埋め込みや検索結果に対してキャッシュ機構を使う</strong>ことです。これにより、よく使われるクエリに対する応答時間を劇的に改善することができます。特定のデータセットとクエリーパターンに基づいて<a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">Milvusのインデックスパラメータを微調整する</a>ことを忘れないでください。</p>
<h2 id="Advanced-Features" class="common-anchor-header">高度な機能<button data-href="#Advanced-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>さて、アプリを際立たせるためにクールな機能を追加してみよう！<strong>テキストクエリとビデオクエリを組み合わせたハイブリッド検索を</strong>実装することができる。実は、<a href="https://docs.twelvelabs.io/docs/create-text-embeddings">Twelve Labs Embed API は、テキストクエリ用にテキスト埋め込みを生成することもできます</a>。ユーザがテキストの説明とサンプルのビデオクリップの両方を入力できるようにすることを想像してみてください - 私たちは両方の埋め込みを生成し、Milvusで重み付け検索を実行します。そうすれば、非常に正確な検索結果が得られるでしょう。</p>
<p>もう一つの素晴らしい追加機能は、<strong>動画内の時間的検索</strong>です。<a href="https://docs.twelvelabs.io/docs/create-video-embeddings#customize-your-embeddings">長い動画を小さなセグメントに分割し、それぞれに埋め込みを持たせることが</a>できます。こうすることで、ユーザーはクリップ全体ではなく、動画内の特定の瞬間を見つけることができる。そして、基本的な動画分析も加えてはどうだろう？エンベッディングを使って、似たような動画セグメントをクラスタリングしたり、トレンドを検出したり、あるいは大規模な動画コレクションの異常値を特定したりすることができます。</p>
<h2 id="Error-Handling-and-Logging" class="common-anchor-header">エラー処理とログ<button data-href="#Error-Handling-and-Logging" class="anchor-icon" translate="no">
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
    </button></h2><p>率直に言って、物事はうまくいかないことがあります。<strong>堅牢なエラー処理を実装することは非常に重要です</strong>。<a href="https://softwareengineering.stackexchange.com/questions/64180/good-use-of-try-catch-blocks">APIの呼び出しやデータベースの操作をtry-exceptブロックで囲み</a>、何か失敗したときにユーザーに有益なエラーメッセージを提供する必要があります。ネットワーク関連の問題については、<a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff">指数関数的バックオフによる再試行を実装する</a>ことで、一時的な不具合を優雅に処理することができる。</p>
<p><strong>ロギングに関しては、デバッグとモニタリングのための最良の友です</strong>。<a href="https://blog.sentry.io/logging-in-python-a-developers-guide/">Pythonのロギングモジュールを使って</a>、アプリケーション全体の重要なイベント、エラー、パフォーマンスメトリックスを追跡しましょう。開発用のDEBUG、一般的な操作用のINFO、重大な問題用のERRORなど、異なるログレベルを設定しましょう。そして、ファイルサイズを管理するために、ログのローテーションを実装することを忘れないでください。適切なロギングを行うことで、問題を素早く特定して解決することができ、動画検索アプリがスケールアップしてもスムーズに動作するようになります。</p>
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
    </button></h2><p>おめでとうございます！Twelve Labs の Embed API と Milvus を使用して、強力なセマンティック動画検索アプリケーションを構築できました。この統合により、これまでにない精度と効率で動画コンテンツを処理、保存、検索することができます。マルチモーダルエンベッディングを活用することで、動画データのニュアンスを理解し、コンテンツディスカバリー、レコメンデーションシステム、高度な動画分析の可能性を広げるシステムを構築することができます。</p>
<p>アプリケーションの開発と改良を続ける際には、Twelve Labsの高度なエンベッディング生成とMilvusのスケーラブルなベクトルストレージの組み合わせが、さらに複雑なビデオ理解の課題に取り組むための強固な基盤を提供することを覚えておいてください。ぜひ、今回ご紹介した先進的な機能を試して、動画検索・解析の可能性の限界に挑戦してみてください。</p>
