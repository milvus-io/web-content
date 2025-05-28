---
id: integration_with_mindsdb.md
summary: >-
  このチュートリアルでは、MindsDBとMilvusを統合し、MindsDBのAI機能とMilvusのベクトルデータベース機能をSQLライクな操作でベクトル埋め込みを管理、クエリする方法を紹介します。
title: MilvusとMindsDBの統合
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">MilvusとMindsDBの統合<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDBは</a>、AIアプリケーションと多様な企業データソースを統合するための強力なツールです。MindsDBは、構造化データと非構造化データの両方にわたるクエリに丁寧に答えながら、乱立するデータに秩序をもたらす連携クエリエンジンとして機能します。データがSaaSアプリケーション、データベース、またはデータウェアハウスに散らばっていても、MindsDBは標準SQLを使用してすべてを接続し、クエリすることができます。ナレッジベースによる最先端の自律的RAGシステムを備え、数百ものデータソースをサポートし、ローカル開発からクラウド環境まで柔軟なデプロイメントオプションを提供します。</p>
<p>このチュートリアルでは、milvusとMindsDBを統合し、MindsDBのAI機能とMilvusのベクトルデータベース機能をSQLライクな操作で活用し、ベクトル埋め込みデータを管理・照会する方法を紹介します。</p>
<div class="alert note">
<p>このチュートリアルでは、主に<a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvusハンドラの</a>公式ドキュメントを参照しています。このチュートリアルで古い部分を見つけた場合は、公式ドキュメントに従うことを優先し、issueを作成してください。</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">MindsDBのインストール<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>始める前に、<a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a>または<a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>経由でMindsDBをローカルにインストールします。</p>
<p>先に進む前に、MindsDBとMilvusの両方の基本的な概念と操作をしっかりと理解していることを確認してください。</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">引数の紹介<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>接続を確立するために必要な引数は以下の通りです：</p>
<ul>
<li><code translate="no">uri</code>: milvus データベースの uri。ローカルの ".db" ファイル、または docker やクラウドサービスに設定することができます。</li>
<li><code translate="no">token</code>: uriオプションに従ってdockerまたはクラウドサービスをサポートするトークン</li>
</ul>
<p>接続を確立するためのオプションの引数は以下の通り：</p>
<p>これらは<code translate="no">SELECT</code> クエリに使用される：</p>
<ul>
<li><code translate="no">search_default_limit</code>select ステートメントで渡されるデフォルトの制限値（default=100）</li>
<li><code translate="no">search_metric_type</code>検索に使用するメトリックタイプ (default="L2")</li>
<li><code translate="no">search_ignore_growing</code>類似性検索時に成長するセグメントを無視するかどうか（default=False）。</li>
<li><code translate="no">search_params</code> <code translate="no">search_metric_type</code> 固有のもの (default={"nprobe": 10})</li>
</ul>
<p>これらは<code translate="no">CREATE</code> クエリで使用されます：</p>
<ul>
<li><code translate="no">create_auto_id</code>IDを持たないレコードを挿入する際にidを自動生成するかどうか（default=False）。</li>
<li><code translate="no">create_id_max_len</code>テーブル作成時のidフィールドの最大長（default=64）</li>
<li><code translate="no">create_embedding_dim</code>テーブル作成時の埋め込みディメンジョン (default=8)</li>
<li><code translate="no">create_dynamic_field</code>作成するテーブルに動的フィールドを持たせるかどうか (default=True)</li>
<li><code translate="no">create_content_max_len</code>コンテンツ・カラムの最大長 (default=200)</li>
<li><code translate="no">create_content_default_value</code>コンテンツ・カラムのデフォルト値 (default='')</li>
<li><code translate="no">create_schema_description</code>作成されるスキーマの説明 (default='')</li>
<li><code translate="no">create_alias</code>作成されたスキーマのエイリアス (default='default')</li>
<li><code translate="no">create_index_params</code>埋め込みカラムに作成されるインデックスのパラメータ (default={})</li>
<li><code translate="no">create_index_metric_type</code>インデックスの作成に使われるメトリック (default='L2')</li>
<li><code translate="no">create_index_type</code>インデックスのタイプ (default='AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">使用法<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>続行する前に、<code translate="no">pymilvus</code> のバージョンがこの<a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">固定バージョンと</a>同じであることを確認してください。バージョンの互換性に問題がある場合は、pymilvusのバージョンをロールバックするか、この<a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">要件</a>ファイルでカスタマイズしてください。</p>
<h3 id="Creating-connection" class="common-anchor-header">接続の作成</h3><p>このハンドラを使用し、MindsDBのMilvusサーバに接続するには、以下の構文を使用します：</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> DATABASE milvus_datasource
<span class="hljs-keyword">WITH</span>
  ENGINE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS <span class="hljs-operator">=</span> {
    &quot;uri&quot;: &quot;./milvus_local.db&quot;,
    &quot;token&quot;: &quot;&quot;,
    &quot;create_embedding_dim&quot;: <span class="hljs-number">3</span>,
    &quot;create_auto_id&quot;: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>小規模なデータやプロトタイピングのためにローカルのベクターデータベースが必要なだけであれば、uri をローカルファイル、例えば<code translate="no">./milvus.db</code> に設定するのが最も便利な方法です。</li>
<li>より大規模なデータやトラフィックを本番環境で利用する場合は、<a href="https://milvus.io/docs/install-overview.md">DockerやKubernetes</a>上にMilvusサーバを構築することができます。<code translate="no">http://localhost:19530</code>このセットアップでは、サーバのアドレスとポートを<code translate="no">uri</code> として使用してください。Milvusで認証機能を有効にしている場合は、<code translate="no">token</code> を<code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code> としてください。そうでない場合は、トークンを設定する必要はありません。</li>
<li><a href="https://zilliz.com/cloud">Zillizクラウド</a>上でフルマネージドMilvusを利用することも可能です。<code translate="no">uri</code> と<code translate="no">token</code> にZilliz Cloudインスタンスの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public EndpointとAPIキーを</a>設定するだけです。</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">接続の切断</h3><p>接続を切断するには、以下のコマンドを使用します。</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DROP</span> DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">テーブルの作成</h3><p>既存のテーブルからデータを挿入するには、次のコマンドを使用します。<code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> milvus_datasource.test
(<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">コレクションの削除</h3><p>コレクションの削除はサポートされていません。</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">クエリと選択</h3><p>検索ベクトルを使用してデータベースに問い合わせるには、<code translate="no">WHERE</code> 節で<code translate="no">search_vector</code> を使用します。</p>
<p>注意：</p>
<ul>
<li>もし、<code translate="no">LIMIT</code> を省略した場合、Milvusが要求しているため、<code translate="no">search_default_limit</code> が使用されます。</li>
<li>メタデータカラムはサポートされていませんが、コレクションがダイナミックスキーマを有効にしている場合、通常のクエリが可能です。</li>
<li>動的フィールドは表示できませんが、クエリは可能です。</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> search_vector <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
LIMIT <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">search_vector</code> を省略すると、基本検索になり、<code translate="no">LIMIT</code> または<code translate="no">search_default_limit</code> コレクションのエントリ数が返されます。</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<button class="copy-code-btn"></button></code></pre>
<p>通常のSQLのように、動的フィールドで<code translate="no">WHERE</code> 節を使用することができます。</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> milvus_datasource.createtest
<span class="hljs-keyword">WHERE</span> category <span class="hljs-operator">=</span> &quot;science&quot;;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">レコードの削除</h3><p>SQLと同様に、<code translate="no">DELETE</code> を使用してエントリを削除できます。</p>
<p>注意：</p>
<ul>
<li>Milvusは明確に指定された主キーを持つエンティティの削除のみをサポートします。</li>
<li><code translate="no">IN</code> 演算子しか使用できません。</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> id <span class="hljs-keyword">IN</span> (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">レコードの挿入</h3><p>このように個々の行を挿入することもできます：</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> milvus_test.testable (id,content,metadata,embeddings)
<span class="hljs-keyword">VALUES</span> (&quot;id3&quot;, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">更新</h3><p>レコードの更新はMilvus APIではサポートされていません。<code translate="no">DELETE</code> と<code translate="no">INSERT</code></p>
<hr>
<p>詳細および例については<a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB Official Documentation を</a>参照してください。</p>
