---
id: schema-hands-on.md
title: 検索のためのデータモデル設計
summary: >-
  検索エンジンとしても知られる情報検索システムは、RAG（Retrieval-augmented
  generation）、ビジュアル検索、商品推薦など、様々なAIアプリケーションに不可欠である。これらのシステムの核となるのは、情報を整理し、インデックスを付け、検索するために入念に設計されたデータモデルである。
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">検索のためのデータモデル設計<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>検索エンジンとしても知られる情報検索システムは、RAG（Retrieval-augmented generation）、ビジュアル検索、商品推薦など、様々なAIアプリケーションに不可欠である。これらのシステムの核となるのは、情報を整理し、インデックスを付け、検索するために入念に設計されたデータモデルです。</p>
<p>Milvusでは、非構造化データ、密または疎なベクトル表現、構造化メタデータを整理し、コレクションスキーマを通して検索データモデルを指定することができます。テキスト、画像、その他のデータタイプのいずれを扱う場合でも、このハンズオンガイドは、検索データモデルを実際に設計するための主要なスキーマコンセプトを理解し、適用するのに役立ちます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>データモデルの解剖</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">データモデル<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>検索システムのデータモデル設計には、ビジネスニーズを分析し、情報をスキーマで表現されたデータモデルに抽象化することが含まれる。十分に定義されたスキーマは、データモデルをビジネス上の目的に合致させ、データの一貫性とサービスの質を保証するために重要である。  さらに、適切なデータ型とインデックスを選択することは、ビジネス目標を経済的に達成するために重要です。</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">ビジネスニーズの分析</h3><p>ビジネス・ニーズに効果的に対応するためには、ユーザーが実行するクエリのタイプを分析し、最適な検索方法を決定することから始まります。</p>
<ul>
<li><p><strong>ユーザーのクエリー</strong>ユーザーが実行すると予想されるクエリのタイプを特定する。これは、スキーマが実際のユースケースをサポートし、検索パフォーマンスを最適化するのに役立ちます。これには以下が含まれる：</p>
<ul>
<li><p>自然言語のクエリに一致する文書の検索</p></li>
<li><p>参照画像に類似した画像や、テキストの説明に一致する画像を検索する。</p></li>
<li><p>名前、カテゴリー、ブランドなどの属性による商品の検索</p></li>
<li><p>構造化されたメタデータ（発行日、タグ、評価など）に基づくアイテムのフィルタリング</p></li>
<li><p>複数の条件を組み合わせたハイブリッドクエリ（ビジュアル検索では、画像とキャプションの両方の意味的類似性を考慮するなど）</p></li>
</ul></li>
<li><p><strong>検索手法：</strong>ユーザーが実行するクエリのタイプに沿った適切な検索テクニックを選択する。異なる検索手法は異なる目的を持ち、組み合わせることでより強力な検索結果を得ることができます：</p>
<ul>
<li><p><strong>セマンティック検索</strong>：類似した意味を持つアイテムを見つけるために密なベクトル類似性を使用し、テキストや画像のような非構造化データに最適です。</p></li>
<li><p><strong>全文検索</strong>：セマンティック検索をキーワードマッチで補完。  全文検索では、語彙解析を利用して長い単語を断片的なトークンに分割することを避け、検索時に特殊な用語を把握することができる。</p></li>
<li><p><strong>メタデータのフィルタリング</strong>：ベクトル検索の上に、日付範囲、カテゴリー、タグなどの制約を適用する。</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">ビジネス要件を検索データモデルに変換</h3><p>次のステップは、ビジネス要件を具体的なデータモデルに変換することです。情報の中核となるコンポーネントとその検索方法を特定します：</p>
<ul>
<li><p>生のコンテンツ（テキスト、画像、音声）、関連するメタデータ（タイトル、タグ、著者名）、コンテキスト属性（タイムスタンプ、ユーザー行動など）など、保存する必要のあるデータを定義する。</p></li>
<li><p>各要素に適切なデータタイプとフォーマットを決定します。例えば</p>
<ul>
<li><p>テキスト記述 → 文字列</p></li>
<li><p>画像またはドキュメントの埋め込み → 密なまたは疎なベクトル</p></li>
<li><p>カテゴリー、タグ、フラグ → 文字列、配列、bool</p></li>
<li><p>価格や評価などの数値属性 → integer、float</p></li>
<li><p>著者の詳細などの構造化情報 → json</p></li>
</ul></li>
</ul>
<p>これらの要素を明確に定義することで、データの一貫性、正確な検索結果、下流のアプリケーション・ロジックとの統合が容易になります。</p>
<h2 id="Schema-Design" class="common-anchor-header">スキーマ設計<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、データモデルはコレクションスキーマで表現されます。コレクションスキーマ内で適切なフィールドを設計することは、効果的な検索を可能にする鍵です。各フィールドはコレクションに格納された特定のデータタイプを定義し、検索プロセスにおいて明確な役割を果たします。Milvusは<strong>ベクトルフィールドと</strong> <strong>スカラーフィールドの</strong>2種類のフィールドをサポートしています。</p>
<p>ベクターと補助的なスカラーフィールドを含むフィールドのスキーマにデータモデルをマッピングすることができます。各フィールドがデータモデルの属性と相関していることを確認し、特にベクトルタイプ（denseまたはspase）とその次元に注意してください。</p>
<h3 id="Vector-Field" class="common-anchor-header">ベクトル・フィールド</h3><p>ベクトル・フィールドは、テキスト、画像、音声などの非構造化データの埋め込みを格納します。これらの埋め込みは、データ型や利用する検索方法によって、密なもの、疎なもの、バイナリのものがあります。一般的に、密なベクトルは意味検索に使用され、疎なベクトルは全文検索や語彙照合に適している。バイナリ・ベクトルは、ストレージや計算リソースが限られている場合に有用である。コレクションは、マルチモーダルまたはハイブリッド検索ストラテジーを可能にするために、複数のベクトルフィールドを含むことができる。このトピックの詳細ガイドについては、<a href="/docs/ja/multi-vector-search.md">マルチベクターハイブリッド検索を</a>参照してください。</p>
<p>Milvusは以下のベクトルデータ型をサポートしています:<a href="/docs/ja/dense-vector.md">Dense Vectorは</a> <code translate="no">FLOAT_VECTOR</code> 、<a href="/docs/ja/sparse_vector.md">Sparse Vectorは</a> <code translate="no">SPARSE_FLOAT_VECTOR</code> 、<a href="/docs/ja/binary-vector.md">Binary Vectorは</a> <code translate="no">BINARY_VECTOR</code> 。</p>
<h3 id="Scalar-Field" class="common-anchor-header">スカラーフィールド</h3><p>スカラーフィールドは、数値、文字列、日付などのプリミティブで構造化された値-一般にメタデータと呼ばれる-を格納します。これらの値はベクターの検索結果と一緒に返すことができ、フィルタリングやソートに不可欠です。これらの値により、文書を特定のカテゴリや定義された時間範囲に限定するなど、特定の属性に基づいて検索結果を絞り込むことができます。</p>
<p>Milvusは、ベクトル以外のデータの保存やフィルタリングのために、<code translate="no">BOOL</code> 、<code translate="no">INT8/16/32/64</code> 、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">VARCHAR</code> 、<code translate="no">JSON</code> 、<code translate="no">ARRAY</code> などのスカラー型をサポートしています。これらの型は検索操作の精度とカスタマイズ性を高めます。</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">スキーマ設計における高度な機能の活用<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>スキーマを設計する場合、サポートされているデータ型を使ってデータをフィールドにマッピングするだけでは十分ではありません。フィールド間の関係や、コンフィギュレーションに利用できるストラテジーを十分に理解することが不可欠です。設計段階で主要な機能を念頭に置いておくことで、スキーマが当面のデータ処理要件を満たすだけでなく、将来のニーズに対しても拡張性と適応性を持つようになります。これらの機能を注意深く統合することにより、Milvusの機能を最大限に活用し、より広範なデータ戦略と目的をサポートする強力なデータアーキテクチャを構築することができます。以下はコレクションスキーマを作成する主な機能の概要です：</p>
<h3 id="Primary-Key" class="common-anchor-header">主キー</h3><p>主キーフィールドは、コレクション内の各エンティティを一意に識別するため、スキーマの基本要素です。主キーの定義は必須である。これは整数型または文字列型のスカラー・フィールドで、<code translate="no">is_primary=True</code> としてマークされなければならない。オプションで、プライマリ・キーに<code translate="no">auto_id</code> を有効にすることができます。プライマリ・キーには、データがコレクションに取り込まれるにつれてモノリシックに増加する整数番号が自動的に割り当てられます。</p>
<p>詳細については、<a href="/docs/ja/primary-field.md">プライマリフィールドとAutoIDを</a>参照してください。</p>
<h3 id="Partitioning" class="common-anchor-header">パーティショニング</h3><p>検索を高速化するために、オプションでパーティショニングをオンにできます。特定のスカラー・フィールドをパーティショニングに指定し、検索時にこのフィールドに基づくフィルタリング基準を指定することで、検索範囲を関連するパーティションのみに効果的に制限できます。この方法は、検索領域を減らすことで検索操作の効率を大幅に向上させる。</p>
<p>詳細は「<a href="/docs/ja/use-partition-key.md">パーティション・キーの使用</a>」を参照。</p>
<h3 id="Analyzer" class="common-anchor-header">アナライザー</h3><p>アナライザーは、テキストデータの処理と変換に不可欠なツールである。主な機能は、生のテキストをトークンに変換し、インデックス付けや検索のために構造化することである。文字列をトークン化し、ストップワードを削除し、個々の単語をトークンにステミングします。</p>
<p>詳細については、「<a href="/docs/ja/analyzer-overview.md">Analyzer の概要</a>」を参照してください。</p>
<h3 id="Function" class="common-anchor-header">機能</h3><p>Milvusではスキーマの一部として組み込み関数を定義し、特定のフィールドを自動的に導出することができます。例えば、<code translate="no">VARCHAR</code> フィールドからスパースベクトルを生成する組み込み BM25 関数を追加して、全文検索をサポートすることができます。これらの関数派生フィールドは、前処理を合理化し、コレクションが自己完結的でクエリに対応できる状態を維持することを保証する。</p>
<p>詳細については、<a href="/docs/ja/full-text-search.md">全文検索を</a>参照してください。</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">実例<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、上図に示すマルチメディア文書検索アプリケーションのスキーマ設計とコード例を概説する。このスキーマは、以下のフィールドにデータがマッピングされた記事を含むデータセットを管理するために設計されています：</p>
<table>
   <tr>
     <th><p><strong>フィールド</strong></p></th>
     <th><p><strong>データソース</strong></p></th>
     <th><p><strong>検索メソッドで使われる</strong></p></th>
     <th><p><strong>主キー</strong></p></th>
     <th><p><strong>パーティション・キー</strong></p></th>
     <th><p><strong>アナライザー</strong></p></th>
     <th><p><strong>関数の入出力</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>有効化された状態で自動生成<code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/ja/get-and-scalar-query.md">Getを使ったクエリー</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>タイトル (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>記事タイトル</p></td>
     <td><p><a href="/docs/ja/keyword-match.md">テキストマッチ</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>タイムスタンプ (<code translate="no">INT32</code>)</p></td>
     <td><p>公開日</p></td>
     <td><p><a href="/docs/ja/use-partition-key.md">パーティションキーによるフィルタリング</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>テキスト (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>記事の原文</p></td>
     <td><p><a href="/docs/ja/multi-vector-search.md">マルチベクトルハイブリッドサーチ</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>入力</p></td>
   </tr>
   <tr>
     <td><p>テキスト密ベクトル (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>テキスト埋め込みモデルによって生成された密なベクトル</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">基本ベクトル探索</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>組み込みの BM25 関数によって自動生成された疎なベクトル</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">全文検索</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>出力</p></td>
   </tr>
</table>
<p>スキーマの詳細と、さまざまなタイプのフィールドを追加するための詳細なガイダンスについては、<a href="/docs/ja/schema.md">スキーマの説明を</a>参照してください。</p>
<h3 id="Initialize-schema" class="common-anchor-header">スキーマの初期化</h3><p>はじめに、空のスキーマを作成する必要があります。このステップによって、データモデルを定義するための基礎構造が確立される。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">フィールドの追加</h3><p>スキーマを作成したら、次はデータを構成するフィールドを指定します。各フィールドは、それぞれのデータ型と属性に関連付けられています。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この例では、以下の属性をフィールドに指定している：</p>
<ul>
<li><p>プライマリ・キー：<code translate="no">article_id</code> がプライマリ・キーとして使用され、入力エンティティのプライマリ・キーを自動的に割り当てることができる。</p></li>
<li><p>パーティション・キー：<code translate="no">timestamp</code> がパーティション・キーとして割り当てられ、パーティションによるフィルタリングが可能になる。これは次のようなものである。</p></li>
<li><p>テキストアナライザ：テキストアナライザが2つの文字列フィールド<code translate="no">title</code> と<code translate="no">text</code> に適用され、それぞれテキストマッチと全文検索をサポートする。</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(オプション）関数の追加</h3><p>データ照会機能を強化するために、関数をスキーマに組み込むことができます。例えば、特定のフィールドに関連する処理を行う関数を作成することができる。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この例では、スキーマに組み込みのBM25関数を追加し、<code translate="no">text</code> フィールドを入力として利用し、結果のスパース・ベクトルを<code translate="no">text_sparse_vector</code> フィールドに格納しています。</p>
<h2 id="Next-Steps" class="common-anchor-header">次のステップ<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><a href="/docs/ja/create-collection.md">コレクションの作成</a></p></li>
<li><p><a href="/docs/ja/alter-collection-field.md">コレクション・フィールドの変更</a></p></li>
</ul>
