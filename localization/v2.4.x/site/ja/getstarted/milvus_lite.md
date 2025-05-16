---
id: milvus_lite.md
summary: Milvus Liteを始めよう。
title: 地元でMilvusライトを走らせる
---

<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">ローカルでMilvus Liteを動かす<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Milvus Liteを使ってローカルでMilvusを実行する方法を説明します。Milvus Liteは<a href="https://github.com/milvus-io/milvus">Milvusの</a>軽量版です。<a href="https://github.com/milvus-io/milvus">Milvusは</a>オープンソースのベクトルデータベースで、ベクトル埋め込みと類似性検索によりAIアプリケーションを強化します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus LiteはPythonアプリケーションにインポートすることができ、Milvusのコアとなるベクトル検索機能を提供します。Milvus Liteは<a href="https://github.com/milvus-io/pymilvus">MilvusのPython SDKに</a>含まれています。デプロイは<code translate="no">pip install pymilvus</code> で簡単に行うことができます。</p>
<p>Milvus Liteを使えば、ベクトル類似性検索を使ったAIアプリケーションを数分で作り始めることができます！Milvus Liteは以下の環境で動作します：</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>ラップトップ</li>
<li>エッジデバイス</li>
</ul>
<p>Milvus Liteは、Milvus StandaloneおよびDistributedと同じAPIを共有し、ベクトルデータの永続化と管理、ベクトルCRUD操作、スパースおよびデンスベクトル検索、メタデータフィルタリング、マルチベクトル、hybrid_searchなど、ほとんどの機能をカバーしています。これらを組み合わせることで、エッジデバイスからクラウド上のクラスタまで、さまざまなタイプの環境にわたって一貫したエクスペリエンスを提供し、さまざまな規模のユースケースにフィットします。同じクライアント側のコードで、ラップトップやJupyter Notebook上のMilvus Lite、Dockerコンテナ上のMilvus Standalone、または本番環境で数十億のベクターに対応する大規模なKubernetesクラスタ上のMilvus DistributedでGenAIアプリを実行することができます。</p>
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
    </button></h2><p>Milvus Liteは現在以下の環境をサポートしています：</p>
<ul>
<li>Ubuntu &gt;= 20.04 (x86_64およびarm64)</li>
<li>MacOS &gt;= 11.0 (Apple Silicon M1/M2およびx86_64)</li>
</ul>
<p>Milvus Liteは小規模なベクトル検索ユースケースにのみ適しています。大規模なユースケースでは、<a href="https://milvus.io/docs/install-overview.md#Milvus-Standalone">Milvus Standalone</a>または<a href="https://milvus.io/docs/install-overview.md#Milvus-Distributed">Milvus Distributedの</a>ご利用をお勧めします。また、フルマネージドのMilvus on<a href="https://zilliz.com/cloud">Zilliz Cloudも</a>ご検討ください。</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Milvus Liteのセットアップ<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">pymilvus</code> の利用を推奨します。<code translate="no">milvus-lite</code> は<code translate="no">pymilvus</code> バージョン2.4.2以上に含まれているため、<code translate="no">pip install</code> を<code translate="no">-U</code> で強制的に最新版にアップデートすると、<code translate="no">milvus-lite</code> が自動的にインストールされます。</p>
<p><code translate="no">milvus-lite</code> パッケージを明示的にインストールしたい場合や、古いバージョンの<code translate="no">milvus-lite</code> をインストールしており、それをアップデートしたい場合は、<code translate="no">pip install -U milvus-lite</code> 。</p>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Milvus Liteへの接続<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">pymilvus</code> で、MilvusClient の uri パラメータにローカルファイル名を指定すると、Milvus Lite が使用されます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>
client = <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>上記のコードを実行すると、カレントフォルダに<strong>milvus_demo.dbという</strong>データベースファイルが生成されます。</p>
<blockquote>
<p><strong><em>注:</em></strong>同じAPIがMilvus Standalone、Milvus Distributed、Zilliz Cloudにも適用されることに注意してください。唯一の違いはローカルファイル名をリモートサーバーエンドポイントと認証情報（例:<code translate="no">client = MilvusClient(uri=&quot;http://localhost:19530&quot;, token=&quot;username:password&quot;)</code> ）に置き換えることです。</p>
</blockquote>
<h2 id="Examples" class="common-anchor-header">例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>以下はMilvus Liteを使ったテキスト検索の簡単なデモです。<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/build_RAG_with_milvus.ipynb">RAG</a>、<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/image_search_with_milvus.ipynb">画像検索</a>、<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_langchain.ipynb">LangChainや</a> <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb">LlamaIndexの</a>ような一般的なRAGフレームワークでのMilvus Liteの使用など、Milvus Liteを使用したアプリケーションを構築するためのより包括的な<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials">例が</a>あります！</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
dimension=<span class="hljs-number">384</span> <span class="hljs-comment"># The vectors we will use in this demo has 384 dimensions</span>
)

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
<span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
<span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
<span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># For illustration, here we use fake vectors with random numbers (384 dimension).</span>

vectors = [[ np.random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">384</span>) ] <span class="hljs-keyword">for</span> \_ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs)) ]
data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>} <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors)) ]
res = client.insert(
collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
data=data
)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
data=[vectors[<span class="hljs-number">0</span>]],
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
limit=<span class="hljs-number">2</span>,
output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># a query that retrieves all entities matching filter expressions.</span>
res = client.query(
collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># delete</span>
res = client.delete(
collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>

<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Liteを使用する場合、いくつかの機能がサポートされていないことに注意してください。以下の表はMilvus Liteの利用制限をまとめたものです。</p>
<h3 id="Collection" class="common-anchor-header">コレクション</h3><table>
<thead>
<tr><th>メソッド / パラメータ</th><th>Milvus Liteでサポートされている</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a></td><td>制限付きパラメータでサポート</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">dimension</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">id_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">vector_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">metric_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">schema</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">num_shards</code></td><td>N</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><code translate="no">num_partitions</code></td><td>N</td></tr>
<tr><td><code translate="no">consistency_level</code></td><td>N (<code translate="no">Strong</code> のみサポート。どのような設定も<code translate="no">Strong</code> として扱われる)</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a></td><td>コレクション統計の取得をサポートする。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a></td><td><code translate="no">num_shards</code>レスポンスの<code translate="no">consistency_level</code> および<code translate="no">collection_id</code> は無効です。</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/has_collection.md">has_collection()</a></td><td>コレクションが存在するかどうかのチェックをサポート。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_collections()</a></td><td>すべてのコレクションの一覧をサポートします。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md">drop_collection()</a></td><td>コレクションの削除をサポートします。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/rename_collection.md">rename_collection()</a></td><td>コレクション名の変更はサポートしていません。</td></tr>
</tbody>
</table>
<h3 id="Field--Schema" class="common-anchor-header">フィールドとスキーマ</h3><table>
<thead>
<tr><th>メソッド / パラメータ</th><th>Milvus Liteでサポートされている</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">create_schema()</a></td><td>限られたパラメータでサポート</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">add_field()</a></td><td>限られたパラメータでのサポート</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">datatype</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_primary</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_length</code></td><td>Y</td></tr>
<tr><td><code translate="no">element_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_capacity</code></td><td>Y</td></tr>
<tr><td><code translate="no">dim</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_partition_key</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Insert--Search" class="common-anchor-header">挿入と検索</h3><table>
<thead>
<tr><th>メソッド / パラメータ</th><th>Milvus Liteでサポートされている</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">検索()</a></td><td>限られたパラメータでサポート</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">limit</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">search_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><code translate="no">anns_field</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">クエリ()</a></td><td>限られたパラメータでのサポート</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md">get()</a></td><td>限られたパラメータでのサポート</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md">削除()</a></td><td>パラメータを限定してサポート</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md">インサート()</a></td><td>限定されたパラメータでのサポート</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md">upsert()</a></td><td>限定されたパラメータでのサポート</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Load--Release" class="common-anchor-header">ロード＆リリース</h3><table>
<thead>
<tr><th>方法 / パラメータ</th><th>Milvus Liteでサポートされている</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md">ロード_コレクション()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md">リリース_コレクション()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a></td><td>ロード状態の取得はサポートされていません。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/refresh_load.md">refresh_load()</a></td><td>ロードされたコレクションのアンロードされたデータをロードすることはサポートされていません。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/close.md">close()</a></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Index" class="common-anchor-header">インデックス</h3><table>
<thead>
<tr><th>メソッド / パラメータ</th><th>Milvus Liteでサポートされている</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_indexes()</a></td><td>インデックスのリストがサポートされています。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">インデックスの作成</a></td><td><code translate="no">FLAT</code> インデックス型のみをサポートします。</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md">drop_index()</a></td><td>インデックスの削除に対応。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a></td><td>インデックスの記述がサポートされている</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Vector-Index-Types" class="common-anchor-header">ベクトルインデックス型</h3><p>Milvus Liteは<a href="https://milvus.io/docs/index.md?tab=floating#FLAT">FLAT</a>インデックスタイプのみをサポートしています。コレクションで指定されたインデックスタイプに関係なく、FLATタイプを使用します。</p>
<h3 id="Search-Features" class="common-anchor-header">検索機能</h3><p>Milvus Liteはスパースベクトル、マルチベクトル、ハイブリッド検索をサポートしています。</p>
<h3 id="Partition" class="common-anchor-header">パーティション</h3><p>Milvus Liteはパーティションおよびパーティション関連メソッドをサポートしていません。</p>
<h3 id="Users--Roles" class="common-anchor-header">ユーザとロール</h3><p>Milvus Liteはユーザとロールおよび関連するメソッドをサポートしていません。</p>
<h3 id="Alias" class="common-anchor-header">エイリアス</h3><p>Milvus Liteはエイリアスおよびエイリアス関連メソッドに対応していません。</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Milvus Liteからのデータ移行<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Liteに保存されている全てのデータは、Docker上のMilvus Standalone、K8s上のMilvus Distributed、<a href="https://zilliz.com/cloud">Zilliz Cloud</a>上のフルマネージドMilvusなど、他のタイプのMilvusデプロイメントに簡単にエクスポート、ロードすることができます。</p>
<p>Milvus Liteはコマンドラインツールでデータをjsonファイルにダンプし、<a href="https://github.com/milvus-io/milvus">milvusや</a> <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(Milvusのフルマネージドクラウドサービス)にインポートすることができます。milvus-liteコマンドはmilvus-lite pythonパッケージと一緒にインストールされます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Install</span>
pip install -U <span class="hljs-string">&quot;pymilvus[bulk_writer]&quot;</span>

milvus-lite dump -h

usage: milvus-lite dump [-h] [-d DB_FILE] [-c COLLECTION] [-p PATH]

optional arguments:
-h, --<span class="hljs-built_in">help</span> show this <span class="hljs-built_in">help</span> message and <span class="hljs-built_in">exit</span>
-d DB_FILE, --db-file DB_FILE
milvus lite db file
-c COLLECTION, --collection COLLECTION
collection that need to be dumped
-p PATH, --path PATH dump file storage <span class="hljs-built_in">dir</span>
<button class="copy-code-btn"></button></code></pre>

<p>以下の例では、<code translate="no">./milvus_demo.db</code> (Milvus Liteデータベースファイル)に保存されている<code translate="no">demo_collection</code> コレクションの全データをダンプします。</p>
<p>データをエクスポートする：</p>
<pre><code translate="no" class="language-shell">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<span class="hljs-comment"># ./milvus_demo.db: milvus lite db file</span>
<span class="hljs-comment"># demo_collection: collection that need to be dumped</span>
<span class="hljs-comment">#./data_dir : dump file storage dir</span>
<button class="copy-code-btn"></button></code></pre>
<p>このダンプファイルを使って、<a href="https://docs.zilliz.com/docs/data-import">データインポートで</a>Zilliz Cloudにデータをアップロードしたり、<a href="https://milvus.io/docs/import-data.md">一括挿入で</a>Milvusサーバにデータをアップロードすることができます。</p>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Liteに接続したら、次のことができます：</p>
<ul>
<li><p><a href="/docs/ja/v2.4.x/quickstart.md">クイックスタートで</a>Milvusの機能を確認する。</p></li>
<li><p>Milvusの基本操作を学ぶ</p>
<ul>
<li><a href="/docs/ja/v2.4.x/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/v2.4.x/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/v2.4.x/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/v2.4.x/insert-update-delete.md">挿入、アップサート、削除</a></li>
<li><a href="/docs/ja/v2.4.x/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/upgrade_milvus_cluster-helm.md">Helm Chartを使用したMilvusのアップグレード</a>。</p></li>
<li><p><a href="/docs/ja/v2.4.x/scaleout.md">Milvusクラスタのスケール</a></p></li>
<li><p>Milvusクラスタをクラウドにデプロイする：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Googleクラウド</a></li>
<li><a href="/docs/ja/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvusの</a>データバックアップのためのオープンソースツールである<a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvus Backupを</a>紹介します。</p></li>
<li><p><a href="/docs/ja/v2.4.x/birdwatcher_overview.md">Birdwatcher(バードウォッチャー</a>): Milvusのデバッグとダイナミックコンフィギュレーションアップデートのためのオープンソースツール。</p></li>
<li><p>Milvusを直感的に管理するオープンソースのGUIツール<a href="https://milvus.io/docs/attu.md">Attuを</a>ご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.4.x/monitor.md">PrometheusによるMilvusの監視</a></p></li>
</ul>
