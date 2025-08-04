---
id: quickstart_with_attu.md
summary: >-
  AttuはMilvusのためのオールインワンのオープンソース管理ツールです。直感的なグラフィカルユーザインタフェース(GUI)を備えており、データベースを簡単に操作することができます。数回クリックするだけで、クラスタステータスの可視化、メタデータの管理、データクエリの実行などが可能です。
title: Attuのクイックスタート - MilvusのウェブUI
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">Attuデスクトップのクイックスタート<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1.はじめに<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attuは</a>、Milvusのためのオールインワンのオープンソース管理ツールです。直感的なグラフィカルユーザインタフェース(GUI)を備えており、データベースを簡単に操作することができます。数回クリックするだけで、クラスタステータスの可視化、メタデータの管理、データクエリの実行などが可能です。</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2.デスクトップアプリケーションのインストール<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu/releases">Attu GitHub Releases</a>ページからデスクトップ版をダウンロードします。お使いのオペレーティングシステムに適したバージョンを選択し、インストール手順に従ってください。</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">macOS (Mシリーズチップ)の場合：</h3><p>エラーが発生した場合</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>ターミナルで以下のコマンドを実行し、この問題を回避してください：</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3.Milvusへの接続<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attuは<strong>Milvus Standaloneと</strong> <strong>Zilliz Cloudの</strong>両方への接続をサポートしており、ローカルまたはクラウドホスティングのデータベースを柔軟に操作することができます。</p>
<p>Milvus Standaloneをローカルで使用する場合：</p>
<ol>
<li><a href="https://milvus.io/docs/install_standalone-docker.md">Milvusインストールガイドに従って</a>Milvus Standaloneを起動します。</li>
<li>Attuを開き、接続情報を入力します：<ul>
<li>Milvusアドレス：Milvus アドレス: Milvus Standalone サーバー URI (例: http://localhost:19530)</li>
<li>その他のオプション設定：Milvusの設定に応じて設定するか、デフォルトのままでも構いません。</li>
</ul></li>
<li>接続] をクリックしてデータベースにアクセスします。</li>
</ol>
<blockquote>
<p><a href="https://zilliz.com/cloud">Zilliz Cloud</a>上のフルマネージドMilvusに接続することもできます。<code translate="no">Milvus Address</code> と<code translate="no">token</code> をZilliz Cloudインスタンスの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">パブリックエンドポイントとAPIキーに</a>設定するだけです。</p>
</blockquote>
<ol start="4">
<li>クリックしてデータベースにアクセスします。</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4.データの準備、コレクションの作成、データの挿入<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 データの準備</h3><p><a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus Documentation 2.4.xの</a>FAQページをデータセットとして使用します。</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">データをダウンロードして抽出します：</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">Markdownファイルを処理する：</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 埋め込みを生成する</h3><p>埋め込みモデルを定義して、<code translate="no">milvus_model</code> を使ってテキストの埋め込みを生成します。ここでは、事前に学習された軽量な埋め込みモデルである<code translate="no">DefaultEmbeddingFunction</code> を例として使います。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">出力：</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 コレクションの作成</h3><p>Milvusに接続し、コレクションを作成する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 データの挿入</h3><p>テキスト行を繰り返し、埋め込みを作成し、Milvusにデータを挿入します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 データとスキーマの可視化</h3><p>Attuのインターフェースを使用して、データスキーマと挿入されたエンティティを視覚化することができます。スキーマは、<code translate="no">Int64</code> 型の<code translate="no">id</code> フィールドと、<code translate="no">FloatVector(768)</code> 型の<code translate="no">vector</code> フィールドと、<code translate="no">Inner Product (IP)</code> メトリックを含む、定義されたフィールドを表示します。コレクションには<strong>72のエンティティが</strong>ロードされています。</p>
<p>さらに、ID、ベクトル埋め込み、テキスト・コンテンツなどのメタデータを格納するダイナミック・フィールドなど、挿入されたデータを見ることができる。このインターフェースは、指定された条件やダイナミック・フィールドに基づくフィルタリングやクエリをサポートしている。</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5.検索結果と関係の視覚化<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attuは、データの関係を視覚化し探索するための強力なインターフェイスを提供します。挿入されたデータポイントとその類似関係を調べるには、以下の手順に従います：</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1<strong>検索の実行</strong></h3><p>Attu の<strong>Vector Search</strong>タブに移動します。</p>
<ol>
<li>テストクエリを作成するには、<strong>Generate Random Data</strong>ボタンをクリックします。</li>
<li><strong>Search を</strong>クリックして、生成されたデータに基づいて結果を取得します。</li>
</ol>
<p>一致する各エンティティの ID、類似度スコア、およびダイナミック・フィールドが表 示されます。</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2<strong>データ関係の調査</strong></h3><p>結果パネルの<strong>[Explore]</strong>ボタンをクリックすると、クエリ・ベクタと検索結果の関係が<strong>ナレッジ・グラフのような 構造で</strong>視覚化されます。</p>
<ul>
<li><strong>中央のノードは</strong>検索ベクトルを表します。</li>
<li><strong>接続されたノードは</strong>検索結果を表し、クリックすると対応するノードの詳細情報が表示されます。</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3<strong>グラフの展開</strong></h3><p>任意の結果ノードをダブルクリックすると、その接続が展開されます。この操作により、選択したノードとコレクション内の他のデータ・ポイント間の追加関係が明らかになり、<strong>より大きく相互接続されたナレッジ・グラフが</strong>作成されます。</p>
<p>この拡張ビューにより、ベクトルの類似性に基づいて、データ・ポイントがどのように関連しているかをより深く調査できます。</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6.結論<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>AttuはMilvusに保存されたベクトルデータの管理と可視化を簡素化します。データ挿入からクエリ実行、インタラクティブな探索まで、複雑なベクトル検索タスクを処理するための直感的なインターフェイスを提供します。動的スキーマサポート、グラフィカルな検索ビジュアライゼーション、柔軟なクエリフィルタなどの機能により、Attuは大規模なデータセットを効果的に分析することができます。</p>
<p>Attuの視覚的な探索ツールを活用することで、ユーザはデータをより良く理解し、隠れた関係を特定し、データ駆動型の意思決定を行うことができます。Attuとmilvusを利用して、今すぐデータセットの分析を始めましょう！</p>
<hr>
