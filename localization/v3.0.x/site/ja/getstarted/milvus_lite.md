---
id: milvus_lite.md
summary: Milvus Lite をインストールし、データベースのパスを固定してローカルベクトル検索を実行します。
title: Milvus Liteをローカルで実行する
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Milvus Liteをローカルで実行する<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Milvus Lite を使用してローカルでベクトル検索を実行する方法について説明します。インストール、データの永続化、フィルタリング、および別の Milvus 環境へのデータエクスポートについて解説します。</p>
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
    </button></h2><p>Milvus Liteは、<a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK用の</a>軽量なローカルバックエンドです。オプションの<code translate="no">milvus-lite</code> を追加してインストールしてください。<code translate="no">pymilvus</code> のみをインストールしても、以下で使用するSDKバージョンにはこのバックエンドがインストールされません。</p>
<p>Milvus Liteは、次のような環境におけるローカル開発や小規模なワークロードに適しています：</p>
<ul>
<li>Jupyter Notebook や Google Colab</li>
<li>ノートパソコン</li>
<li>互換性のある Python 依存関係を持つエッジデバイス</li>
</ul>
<p>Milvus Lite は、ベクトルデータの永続化、挿入および削除、ベクトル検索、メタデータフィルタリングなど、サポートされている操作に対して<code translate="no">MilvusClient</code> API を使用します。サポートされているアプリケーションワークフローをリモート環境に移行するには、接続 URI と認証情報を変更し、サポートされている機能の違いを確認してください。 大規模な本番ワークロードについては、<a href="/docs/ja/install-overview.md">Milvus Standalone または Distributed</a>、あるいは<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上のフルマネージド型 Milvus をご利用ください。</p>
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
    </button></h2><p>このガイドでは、PyMilvus<strong>3.0.2</strong>および Milvus Lite<strong>3.2.2</strong> を使用しています。以下の環境を準備してください：</p>
<ul>
<li>Python 3.10 以降。ローカルの Lite バックエンドは、リモートの PyMilvus クライアントよりも高い Python の最小バージョンを必要とします。</li>
<li>macOS、Linux、または Windows。<code translate="no">faiss-cpu</code> や<code translate="no">pyarrow</code> などの依存関係に対応したホイールが必要です。Milvus Lite 3.2.2 は純粋な Python パッケージであるため、Lite パッケージ自体ではなく、オペレーティングシステムとアーキテクチャがこれらの依存関係を満たしている必要があります。</li>
<li>データベースを保存するための書き込み可能なローカルディレクトリ。</li>
</ul>
<p>Windows では、pip はプラットフォームマーカーのため PyMilvus 3.0.2 の<code translate="no">milvus-lite</code> エクストラをスキップするため、<code translate="no">milvus-lite</code> を明示的に指定する必要があります。以下のインストールコマンドでは、すでにこれが行われています。その他のパッケージとプラットフォームの組み合わせについては、<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">Milvus Lite のリリース要件を</a>参照してください。</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Milvus Lite のセットアップ<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>隔離されたPython環境を作成し、両方のパッケージをインストールします：</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>zsh などのシェルが括弧を解釈しないように、extras 式を引用符で囲んでください。Windows PowerShell では、<code translate="no">source .venv/bin/activate</code> の代わりに<code translate="no">.venv\Scripts\Activate.ps1</code> を使用して環境を有効化してください。バージョンを明示的に指定することで、SDK とローカルバックエンドを本ガイドの内容と整合させることができます。</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x は、元の 2.x パッケージとは異なるストレージエンジンを使用しています。既存の 2.x 形式の `<code translate="no">.db</code> ` ファイルをそのまま開くことはできません。 元のデータベースと、それを開くことができる環境を保持し、そこからデータをエクスポートして、新しいデータベースにインポートしてください。新しいパッケージをインストールしても、古いストレージ形式は移行されません。「<a href="#Migrating-data-from-Milvus-Lite">Milvus Lite からのデータ移行</a>」を参照してください。</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Milvus Lite への接続<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">MilvusClient</code> に、末尾が<code translate="no">.db</code> で終わるローカルパスを指定します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus Lite 3.2.2 の場合、これにより作業ディレクトリに<strong>milvus_demo.db ディレクトリ</strong>が作成されます。このディレクトリにはデータベースの保存ファイルが含まれており、<code translate="no">.db</code> という接尾辞が付いているからといって、それが単一のポータブルファイルであることを意味するわけではありません。クライアントを閉じたりアプリケーションを再起動したりした後、データベースを再度開く際には、同じパスを再利用してください。</p>
<p>新しいデータベースを作成する場合は、別のパスを使用してください。代わりにリモートのMilvusサーバーに接続するには、そのエンドポイントと認証情報を指定します：</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">ローカル検索のサンプルを実行する<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の例では、生成されたベクトルを使用した API ワークフローを示します。これらのベクトルにはテキストの意味はエンコードされていません。セマンティック検索を構築する際は、埋め込みモデルを使用してください。新しいデータベースパスでこの例を実行するか、再度実行する前に既存の `<code translate="no">demo_collection</code> ` を削除してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>テキストから埋め込みを生成するアプリケーションについては、「<a href="/docs/ja/quickstart.md">クイックスタート</a>」に進んでください。また、RAG、画像検索、フレームワーク統合に関する<a href="https://github.com/milvus-io/bootcamp">Milvus ブートキャンプのサンプルも</a>参照できます。</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">サポートされている機能と制限<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 は、ローカルの PyMilvus アダプタを通じて Milvus 操作の一部を実装しています。<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">バージョン管理された機能リファレンス</a>には、以下の機能が記載されています：</p>
<table>
<thead>
<tr><th>領域</th><th>このLiteバージョンでのサポート状況</th></tr>
</thead>
<tbody>
<tr><td>密ベクトルおよび疎ベクトル</td><td><code translate="no">FLOAT_VECTOR</code> および<code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>ベクトルインデックス</td><td><code translate="no">FLAT</code>、<code translate="no">BRUTE_FORCE</code> 、<code translate="no">IVF_FLAT</code> 、<code translate="no">IVF_SQ8</code> 、<code translate="no">HNSW</code> 、<code translate="no">HNSW_SQ</code> 、および<code translate="no">AUTOINDEX</code></td></tr>
<tr><td>スカラーおよびスパースインデックス</td><td><code translate="no">INVERTED</code> スカラーインデックスおよび<code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>データ操作</td><td>挿入、アップサート、取得、クエリ、ベクトル検索、および削除</td></tr>
<tr><td>検索</td><td>密インデックスおよび疎インデックスによる検索、メタデータフィルター、複数のベクトルフィールド、ハイブリッド検索</td></tr>
<tr><td>コレクションの構成</td><td>ローカルアダプタがサポートする操作範囲内でのコレクション、名前付きデータベース、エイリアス、およびパーティション</td></tr>
</tbody>
</table>
<p>このバージョンは、<code translate="no">FLAT</code> インデックスに限定されません。インデックスの利用可能性と動作はLiteバージョンによって異なります。元の2.xバックエンドの制限を3.xエンジンに適用しないでください。</p>
<p>アプリケーションにLiteを採用する前に、以下の制限事項を確認してください：</p>
<ul>
<li>データベースの保存ディレクトリを所有できるプロセスは、一度に1つだけです。エンジンはファイルロックを使用してディレクトリを保護します。</li>
<li>同一コレクションへの書き込みは順次実行してください。並行書き込みは安全にサポートされていません。</li>
<li>ローカルアダプタは、すべてのMilvus RPCを実装しているわけではありません。サポートされていない操作は<code translate="no">UNIMPLEMENTED</code> を返します。スキーマの変更やパーティションレベルのロード／リリースは利用できません。</li>
<li>認証、ユーザー、ロール、RBAC、およびTLSはサポートされていません。ローカルサーバーを信頼できないネットワークに公開しないでください。</li>
<li>binary、float16、bfloat16、int8 のベクトルフィールド、および Product Quantization インデックスはサポートされていません。</li>
<li>Lite はローカルワークロード向けに設計されています。ローカル API との互換性では、分散スケーリングや、リモート展開における本番環境の分離および可用性は提供されません。</li>
</ul>
<p>ローカルの例で実行されていないサーバー機能を利用する前に、<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">バージョン別の既知の制限事項</a>を確認してください。</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Milvus Lite からのデータ移行<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">milvus-lite dump</code> を使用して、コレクションを Milvus BulkWriter JSON ファイルとしてエクスポートします。これらのファイルは、セルフホスト型の Milvus デプロイメントまたは Zilliz Cloud にインポートできます。</p>
<p>ソースデータベースを開く環境に、SDKのバルクライター依存関係をインストールします:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>別のプロセスでコマンドを実行する前に、ローカルデータベースを所有する Python アプリケーションを終了してください。前の例で作成したコレクションをエクスポートします：</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>このコマンドは、<strong>milvus_demo.db ストレージディレクトリから</strong> <code translate="no">demo_collection</code> を読み込み、<strong>data_dir</strong> 配下にエクスポートファイルを書き込みます。これらのファイルは、<a href="/docs/ja/import-data.md">Bulk Insert</a>または<a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import</a> を使用してインポートしてください。</p>
<div class="alert note">
<blockquote>
<p>オリジナルの 2.x データベースファイルをエクスポートするには、そのファイルを開くことができるオリジナルの Lite バージョンがインストールされた環境で dump ツールを実行してください。3.x の dump ツールは、古いストレージ形式のファイルを直接開いて変換することはありません。インポートされた行数と検索結果を確認するまでは、ソースデータベースを保持しておいてください。</p>
</blockquote>
</div>
<p>サポートされているダンプオプションおよびストレージ形式の制限については、<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">Milvus Lite エクスポートリファレンス</a>を参照してください。</p>
<h2 id="Whats-next" class="common-anchor-header">次の手順<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のタスクに進んでください：</p>
<ul>
<li><a href="/docs/ja/quickstart.md">クイックスタート</a>：埋め込みを生成し、検索ワークフローを実行します。</li>
<li><a href="/docs/ja/single-vector-search.md">シングルベクトル検索</a>と<a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a>：アプリケーション向けのクエリを設計します。</li>
<li><a href="/docs/ja/install-overview.md">デプロイ方法の選択</a>：ローカル開発の枠を超えて。</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>：リモートデプロイメントのためのMilvus GUIを探索する。</li>
</ul>
