---
id: mempalace_with_milvus.md
summary: >-
  このチュートリアルでは、MemPalace CLI を使用して、公開されている Milvus ドキュメントの実際のサブセットを抽出・収集し、それを
  Milvus
  に保存します。このコーパスには、アナライザー、トークナイザー、およびトークンフィルターに関するドキュメントが含まれています。これら密接に関連するページには、検索の例を意味のあるものにするのに十分な「妨害要素」が含まれています。
title: Milvus 搭載の MemPalace
---
<h1 id="MemPalace-with-Milvus" class="common-anchor-header">Milvus 搭載の MemPalace<button data-href="#MemPalace-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/MemPalace/mempalace">MemPalaceは</a>、コーディングエージェントや長時間実行される開発ワークフロー向けのメモリレイヤーです。プロジェクトの知識を「ウィング」「ルーム」「ドロワー」に整理し、セッションをまたいで元のコンテンツを検索可能にします。</p>
<p>このチュートリアルでは、MemPalace CLI を使用して、公開されている<a href="https://github.com/milvus-io/milvus-docs">Milvus ドキュメントの</a>実際のサブセットを抽出し、<a href="https://milvus.io/">Milvus</a> に保存します。このコーパスには、アナライザー、トークナイザー、およびトークンフィルターに関するドキュメントが含まれています。これらの密接に関連したページは、検索の例を意味のあるものにするのに十分な「妨害要素」を提供します。</p>
<p>この例では Milvus Lite を使用するため、Docker や別途のデータベースサーバーを必要とせず、ローカルで実行できます。また、同じ MemPalace 設定を使用して、共有展開用の Milvus サーバーや Zilliz Cloud を指定することも可能です。</p>
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
    </button></h2><p>PyPI から MemPalace と、そのオプションの Milvus 依存関係をインストールしてください。このコマンドでは意図的にバージョンを指定していないため、新規インストール時には利用可能な最新リリースがインストールされます。</p>
<pre><code translate="no" class="language-shell">uv tool install &quot;mempalace[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>また、ドキュメントコーパスをダウンロードするにはGitが必要です。</p>
<p>このチュートリアルでは、MemPalaceのローカルMiniLM埋め込みモデルを使用するため、外部モデルのAPIキーは必要ありません。最初のマイニングまたは検索コマンドを実行すると、小さなONNX埋め込みモデルがダウンロードされる場合があります。</p>
<h2 id="Configure-the-workspace" class="common-anchor-header">ワークスペースの設定<button data-href="#Configure-the-workspace" class="anchor-icon" translate="no">
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
    </button></h2><p>ドキュメント用とMemPalace用のディレクトリを分けてワークスペースを作成します：</p>
<pre><code translate="no" class="language-shell">mkdir -p mempalace-milvus-demo
cd mempalace-milvus-demo

export PALACE_DIR=&quot;$PWD/palace&quot;
export DOCS_REPO=&quot;$PWD/milvus-docs&quot;
export PROJECT_DIR=&quot;$PWD/milvus-analyzer-docs&quot;
export MEMPALACE_EMBEDDING_MODEL=&quot;minilm&quot;
export MEMPALACE_EMBEDDING_DEVICE=&quot;cpu&quot;
export MEMPALACE_EMBEDDING_THREADS=&quot;2&quot;
<button class="copy-code-btn"></button></code></pre>
<p>以下のMemPalaceコマンドには、<code translate="no">--backend milvus</code> を指定します。リモートのMilvus URIが設定されていないため、MemPalaceは<code translate="no">$PALACE_DIR/milvus.db</code> にローカルのMilvus Liteデータベースを作成します。</p>
<blockquote>
<p>バックエンドで使用される<code translate="no">MilvusClient</code> の引数については：</p>
<ul>
<li><code translate="no">uri</code> を<code translate="no">./milvus.db</code> のようなローカルパスに設定するのが最も便利な方法です。これにより、<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>が自動的に使用され、データがローカルに保存されます。</li>
<li>より大規模な展開の場合は、<a href="https://milvus.io/docs/quickstart.md">Milvusサーバー</a>を使用し、URIをそのエンドポイント（例：<code translate="no">http://localhost:19530</code> ）に設定できます。</li>
<li><a href="https://zilliz.com/cloud">Zilliz Cloud</a> を使用する場合は、URI とトークンをクラスタの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">パブリックエンドポイントおよび API キー</a>に設定してください。</li>
</ul>
</blockquote>
<h2 id="Download-the-Milvus-documentation-corpus" class="common-anchor-header">Milvusドキュメントコーパスのダウンロード<button data-href="#Download-the-Milvus-documentation-corpus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusのドキュメントリポジトリは、この例で必要とされるものよりもはるかに大規模です。Gitのスパースチェックアウトを使用して、<code translate="no">v3.0.x</code> ブランチからAnalyzerのドキュメントディレクトリのみをダウンロードしてください：</p>
<pre><code translate="no" class="language-shell">git clone \
  --depth 1 \
  --filter=blob:none \
  --sparse \
  --branch v3.0.x \
  https://github.com/milvus-io/milvus-docs.git \
  &quot;$DOCS_REPO&quot;

git -C &quot;$DOCS_REPO&quot; sparse-checkout set \
  site/en/userGuide/schema/analyzer

cp -R \
  &quot;$DOCS_REPO/site/en/userGuide/schema/analyzer&quot; \
  &quot;$PROJECT_DIR&quot;
<button class="copy-code-btn"></button></code></pre>
<p>本稿執筆時点で、このディレクトリには31ページのMarkdownファイルが含まれています。これには、Analyzerの一般的なガイドに加え、密接に関連する3つのページ群が含まれています：</p>
<pre><code translate="no" class="language-text">milvus-analyzer-docs/
├── analyzer/       # Built-in language analyzers
├── filter/         # Token filters
├── tokenizer/      # Tokenizers
└── *.md            # Analyzer overviews and selection guides
<button class="copy-code-btn"></button></code></pre>
<p>ソースページの数を確認します：</p>
<pre><code translate="no" class="language-shell">find &quot;$PROJECT_DIR&quot; -type f -name &quot;*.md&quot; | wc -l
<button class="copy-code-btn"></button></code></pre>
<p>参照出力：</p>
<pre><code translate="no" class="language-text">31
<button class="copy-code-btn"></button></code></pre>
<p>Milvusのドキュメントブランチが更新されるにつれて、正確なページ数は変動する可能性があります。</p>
<h2 id="Define-the-MemPalace-rooms" class="common-anchor-header">MemPalaceのルームを定義する<button data-href="#Define-the-MemPalace-rooms" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalaceは<code translate="no">mempalace init</code> 中にルームを検出できますが、その初期化フローではプロジェクト全体にわたるヒューリスティックなエンティティ分類も実行され、承認された結果がエンティティレジストリに書き込まれます。このドキュメントコーパスを定義するにはその分類ステップは必要ないため、ここでは小規模なタクソノミーを直接提供します。 マイニング中、MemPalaceは依然として決定論的なヒューリスティックなエンティティメタデータを付加し、内部のホールウェイリンクを構築する場合がありますが、それらの関連付けは、どのルームがファイルを受け取るかを決定するものではなく、以下のルームスコープの検索を変更するものでもありません。</p>
<p>以下の内容で `<code translate="no">$PROJECT_DIR/mempalace.yaml</code> ` を作成してください：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">wing:</span> <span class="hljs-string">milvus_analyzer_docs</span>
<span class="hljs-attr">rooms:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">analyzer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Built-in</span> <span class="hljs-string">language</span> <span class="hljs-string">analyzers</span> <span class="hljs-string">and</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">selection</span> <span class="hljs-string">guides</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">analyzer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">filter</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Token</span> <span class="hljs-string">filters</span> <span class="hljs-string">used</span> <span class="hljs-string">in</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">pipelines</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">filter</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">tokenizer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Tokenizers</span> <span class="hljs-string">and</span> <span class="hljs-string">language</span> <span class="hljs-string">identification</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">tokenizer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">general</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Analyzer</span> <span class="hljs-string">documentation</span> <span class="hljs-string">that</span> <span class="hljs-string">does</span> <span class="hljs-string">not</span> <span class="hljs-string">fit</span> <span class="hljs-string">another</span> <span class="hljs-string">room</span>
    <span class="hljs-attr">keywords:</span> []
<button class="copy-code-btn"></button></code></pre>
<p>「wing」はドキュメントコーパス全体を表します。「room」はトピック領域を表します。MemPalaceは、ファイルをルーティングする際、まずディレクトリ、次にファイル名、そしてコンテンツ内のルームキーワードの順に確認します。例えば、<code translate="no">filter/</code> 配下のファイルは、<code translate="no">filter</code> ルームに直接振り分けられます。</p>
<p>その後、各ファイルは重複するテキストチャンクに分割されます。各チャンクは「引き出し」となり、その中にはMarkdownの原文に加え、<code translate="no">wing</code> 、<code translate="no">room</code> 、<code translate="no">source_file</code> 、<code translate="no">chunk_index</code> 、およびソースコードの行番号などのメタデータが含まれます。ルームと引き出しは、MemPalaceのMilvusコレクション内の論理的なメタデータとして扱われます。MemPalaceは、ルームごとに個別のMilvusコレクションを作成することはありません。</p>
<h2 id="Mine-the-documentation-into-Milvus" class="common-anchor-header">ドキュメントをMilvusに取り込む<button data-href="#Mine-the-documentation-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusバックエンドを使用してプロジェクトをマイニングする：</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  mine &quot;$PROJECT_DIR&quot; \
  --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>検証済みのドキュメントスナップショットからの出力を参照:</p>
<pre><code translate="no" class="language-text">=======================================================
  Done.
  Files processed: 31
  Files skipped (already filed or other): 0
  Drawers filed: 473

  By room:
    filter               16 files
    analyzer              8 files
    tokenizer             7 files
=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>MemPalaceはMarkdownを要約や書き換えを行わずに読み込み、ローカル埋め込みを計算し、引き出しをMilvusに保存します。テスト対象のドキュメントスナップショットでは、31個のファイルから473個の引き出しが生成されました。</p>
<p>生成されたルームとドロワーの数を確認します：</p>
<pre><code translate="no" class="language-shell">mempalace --palace &quot;$PALACE_DIR&quot; status --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>参照出力：</p>
<pre><code translate="no" class="language-text">=======================================================
  MemPalace Status -- 473 drawers
=======================================================

  WING: milvus_analyzer_docs
    ROOM: analyzer               212 drawers
    ROOM: filter                 156 drawers
    ROOM: tokenizer              105 drawers

=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>アップストリームのドキュメントが変更されると、ページが長くなるほどチャンクの数が増えるため、正確なドローワーの数は変動する可能性があります。</p>
<h2 id="Semantic-search" class="common-anchor-header">セマンティック検索<button data-href="#Semantic-search" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">mempalace search</code> を使用して、意味に基づいてドキュメントを検索します。以下のクエリでは、特定のファイル名やアナライザー機能名は指定していません：</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How should I analyze documents that mix several languages?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>参照出力（スコアは異なる場合があります）：</p>
<pre><code translate="no" class="language-text">Results for: &quot;How should I analyze documents that mix several languages?&quot;
Wing: milvus_analyzer_docs

[1] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
    Match: cosine_sim=0.334 bm25=2.469
[2] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
[3] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
<button class="copy-code-btn"></button></code></pre>
<p>検証済みの実行では、コーパスには個々の言語アナライザー、トークナイザー、フィルターに関するページも含まれていたにもかかわらず、3つの結果すべてが<code translate="no">multi-language-analyzers.md</code> から得られました。</p>
<h2 id="Search-within-a-room" class="common-anchor-header">ルーム内での検索<button data-href="#Search-within-a-room" class="anchor-icon" translate="no">
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
    </button></h2><p>関連する概念がコーパス全体に散在している場合、ルームフィルターが役立ちます。次のクエリは、同義語を一致させる方法について、「<code translate="no">filter</code> 」ルームのみを検索します：</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How can equivalent terms such as USA and United States match one another?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room filter \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>参照出力（スコアは異なる場合があります）：</p>
<pre><code translate="no" class="language-text">Results for: &quot;How can equivalent terms such as USA and United States match one another?&quot;
Wing: milvus_analyzer_docs
Room: filter

[1] milvus_analyzer_docs / filter
    Source: synonym-filter.md
    Match: cosine_sim=0.765 bm25=2.573
[2] milvus_analyzer_docs / filter
    Source: stemmer-filter.md
[3] milvus_analyzer_docs / filter
    Source: stop-filter.md
<button class="copy-code-btn"></button></code></pre>
<p>上位の結果は<code translate="no">synonym-filter.md</code> からのものになるはずです。ルームの制約はベクトル検索の前にドロワーのメタデータを通じて適用されるため、この検索からはトークナイザーおよび言語アナライザーのドロワーが除外されます。</p>
<h2 id="Search-for-exact-terms" class="common-anchor-header">完全一致の検索<button data-href="#Search-for-exact-terms" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace CLIは、ベクトル検索の候補をランク付けする際、意味的類似性とBM25シグナルを組み合わせています。したがって、正確な構成名や機能名を使用することで、別のCLI検索モードに切り替えることなく、ランキングを向上させることができます。</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;language_identifier tokenizer&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room tokenizer \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>参照出力（スコアは異なる場合があります）：</p>
<pre><code translate="no" class="language-text">Results for: &quot;language_identifier tokenizer&quot;
Wing: milvus_analyzer_docs
Room: tokenizer

[1] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
    Match: cosine_sim=0.420 bm25=0.969
[2] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
[3] milvus_analyzer_docs / tokenizer
    Source: lindera-tokenizer.md
<button class="copy-code-btn"></button></code></pre>
<p>結果は、<code translate="no">language-identifier.md</code> を優先するはずです。このドキュメントには、検出された言語に基づいてアナライザーを選択するために使用される<code translate="no">language_identifier</code> トークナイザーが記載されています。</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">Milvusコレクションの確認<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalaceはMilvusスキーマを自動的に管理します。何が保存されたかを確認するには、以下のスクリプトを<code translate="no">inspect_milvus.py</code> として保存してください。このスクリプトは、同じMilvus Liteデータベースを開き、コレクションを検査し、部屋ごとの引き出し数をカウントします：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> Counter

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


client = MilvusClient(uri=os.environ[<span class="hljs-string">&quot;MEMPALACE_MILVUS_LITE_PATH&quot;</span>])

<span class="hljs-keyword">for</span> collection_name <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(client.list_collections()):
    stats = client.get_collection_stats(collection_name)
    schema = client.describe_collection(collection_name)
    fields = [field[<span class="hljs-string">&quot;name&quot;</span>] <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> schema[<span class="hljs-string">&quot;fields&quot;</span>]]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{collection_name}</span>: rows=<span class="hljs-subst">{stats[<span class="hljs-string">&#x27;row_count&#x27;</span>]}</span>, fields=<span class="hljs-subst">{fields}</span>&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;mempalace_drawers&quot;</span>)
rows = client.query(
    collection_name=<span class="hljs-string">&quot;mempalace_drawers&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;metadata[&quot;wing&quot;] == &quot;milvus_analyzer_docs&quot;&#x27;</span>,
    limit=<span class="hljs-number">2000</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],
)
room_counts = Counter(row[<span class="hljs-string">&quot;metadata&quot;</span>][<span class="hljs-string">&quot;room&quot;</span>] <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Drawers by room:&quot;</span>, <span class="hljs-built_in">dict</span>(<span class="hljs-built_in">sorted</span>(room_counts.items())))
<button class="copy-code-btn"></button></code></pre>
<p>CLIで使用されているのと同じオプションの依存関係セットを指定して、スクリプトを実行します:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_LITE_PATH=&quot;$PALACE_DIR/milvus.db&quot;
uv run --with &quot;mempalace[milvus]&quot; inspect_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>出力例：</p>
<pre><code translate="no" class="language-text">mempalace_closets: rows=74, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
mempalace_drawers: rows=473, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
Drawers by room: {&#x27;analyzer&#x27;: 212, &#x27;filter&#x27;: 156, &#x27;tokenizer&#x27;: 105}
<button class="copy-code-btn"></button></code></pre>
<p>テスト対象のドキュメントスナップショットの場合、<code translate="no">mempalace_drawers</code> には473行、<code translate="no">mempalace_closets</code> には74件の内部ナビゲーションレコードが含まれていました。クローゼットと引き出しの数は一致する必要はありません。引き出しのメタデータによると、<code translate="no">analyzer</code> には212個、<code translate="no">filter</code> には156個、<code translate="no">tokenizer</code> には105個の引き出しが存在することが示されました。</p>
<p>この検査は新しいプロセスで実行され、CLIによって作成されたデータベースを再度開きます。これにより、コマンドをまたいでデータが保持されていることも確認できます。</p>
<h2 id="Optional-use-Milvus-server-or-Zilliz-Cloud" class="common-anchor-header">オプション：MilvusサーバーまたはZilliz Cloudの使用<button data-href="#Optional-use-Milvus-server-or-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>共有環境でのデプロイを行う場合は、同じ MemPalace CLI コマンドを実行する前に、Milvus 接続用の環境変数を設定してください。上記のローカル Milvus Lite データベースを使用する場合は、これらの変数を設定しないでください。</p>
<p>Milvusサーバーの場合：</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;http://localhost:19530&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Zilliz Cloudの場合：</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;https://your-cluster.api.region.zillizcloud.com&quot;
export MEMPALACE_MILVUS_TOKEN=&quot;your-api-key&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>このチュートリアルで紹介した一連のコマンドは、Milvus Lite を使用して検証されています。上記のサーバーおよびクラウドの設定はオプションのデプロイ構成であり、ローカルでの検証には必要ありませんでした。</p>
<h2 id="Conclusion" class="common-anchor-header">まとめ<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalaceは、エージェントがプロジェクトの知識を体系的に保存するための仕組みを提供します。「ウィング」がコーパスを区分し、「ルーム」がトピックレベルの範囲を定義し、「ドロワー」が元のソーステキストを保持します。 この例では、密接に関連する 31 ページの Milvus ドキュメントが、手書きの記録が数件あるだけという状態ではなく、検索可能な何百もの「引き出し」として整理されています。Milvus は、その構造の背後で、ベクトル、スパースデータ、テキスト、およびメタデータの永続的な保存機能を提供します。</p>
