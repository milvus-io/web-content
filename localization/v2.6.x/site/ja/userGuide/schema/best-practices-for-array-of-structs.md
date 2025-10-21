---
id: best-practices-for-array-of-structs.md
title: 構造体の配列によるデータモデル設計Compatible with Milvus 2.6.4+
summary: >-
  現代のAIアプリケーション、特にモノのインターネット（IoT）や自律走行では、通常、リッチで構造化されたイベントを推論する。例えば、タイムスタンプとベクトル埋め込みのセンサー読み取り値、エラーコードとオーディオスニペットの診断ログ、または位置、速度、シーンコンテキストのある旅行セグメントなどである。このような場合、データベースはネスト化されたデータの取り込みと検索をネイティブにサポートする必要がある。
beta: Milvus 2.6.4+
---
<h1 id="Data-Model-Design-with-an-Array-of-Structs" class="common-anchor-header">構造体の配列によるデータモデル設計<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Data-Model-Design-with-an-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>現代のAIアプリケーション、特にモノのインターネット（IoT）や自律走行では、リッチで構造化されたイベントを推論するのが一般的だ。例えば、タイムスタンプとベクトル埋め込みを含むセンサーの読み取り値、エラーコードとオーディオスニペットを含む診断ログ、あるいは位置、速度、シーンコンテキストを含むトリップセグメントなどである。これらは、データベースがネスト化されたデータの取り込みと検索をネイティブにサポートする必要があります。</p>
<p>Milvusは、ユーザーにアトミックな構造イベントをフラットなデータモデルに変換することを求める代わりに、Array of Structsを導入します。Array内の各Structはスカラーやベクトルを保持することができ、セマンティックインテグリティを保持し、堅牢なネストフィルタリングとハイブリッド検索を可能にします。</p>
<h2 id="Why-Array-of-Structs" class="common-anchor-header">なぜArray of Structsなのか？<button data-href="#Why-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>自律走行からマルチモーダル検索に至るまで、最新のAIアプリケーションは、ネスト化された異種データにますます依存するようになっている。従来のフラットなデータモデルでは、<strong>「1つのドキュメントに多数の注釈が付けられたチャンク</strong>」や<strong>「1つの運転シーンに複数の観察された操作</strong>」のような複雑な関係を表現するのに苦労する。そこでMilvusのArray of Structsデータ型が威力を発揮します。</p>
<p>Array of Structsでは、構造化された要素の順序付きセットを格納することができ、各Structはスカラーフィールドとベクトル埋め込みを独自に組み合わせて格納します。そのため、以下のような用途に最適です：</p>
<ul>
<li><p><strong>階層データ</strong>：階層的データ：複数の子レコードを持つ親エンティティ。例えば、多くのテキストチャンクを持つ書籍や、多くのアノテーションフレームを持つ動画など。</p></li>
<li><p><strong>マルチモーダル埋め込み</strong>：各構造体は、メタデータとともに、テキスト埋め込みと画像埋め込みなど、複数のベクトルを保持できる。</p></li>
<li><p><strong>時系列データまたはシーケンシャルデータ</strong>：ArrayフィールドのStructは、時系列またはステップバイステップのイベントを自然に表現します。</p></li>
</ul>
<p>JSON blobを保存したり、複数のコレクションにデータを分割する従来の回避策とは異なり、Array of Structsはスキーマのネイティブなエンフォースメント、ベクトルインデックス、Milvus内での効率的なストレージを提供します。</p>
<h2 id="Schema-design-guidelines" class="common-anchor-header">スキーマ設計ガイドライン<button data-href="#Schema-design-guidelines" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ja/schema-hands-on.md">検索のためのデータモデル設計で</a>説明したすべてのガイドラインに加え、データモデル設計でArray of Structsの使用を開始する前に以下のことも考慮する必要があります。</p>
<h3 id="Define-the-Struct-schema" class="common-anchor-header">構造体スキーマの定義<button data-href="#Define-the-Struct-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションに Array フィールドを追加する前に、内部の Struct スキーマを定義します。構造体の各フィールドは、スカラー<strong>（VARCHAR</strong>、<strong>INT</strong>、<strong>BOOLEAN</strong> など）またはベクトル<strong>（FLOAT_VECTOR</strong>）で明示的に型付けする必要があります。</p>
<p>Struct スキーマには、検索や表示に使用するフィールドのみを含めるようにして、無駄のないスキーマを維持することをお勧めします。未使用のメタデータで肥大化しないようにしましょう。</p>
<h3 id="Set-the-max-capacity-thoughtfully" class="common-anchor-header">最大容量は慎重に設定しましょう<button data-href="#Set-the-max-capacity-thoughtfully" class="anchor-icon" translate="no">
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
    </button></h3><p>各Arrayフィールドには、各エンティティに対してArrayフィールドが保持できる要素の最大数を指定する属性があります。これは、ユースケースの上限に基づいて設定します。たとえば、ドキュメントごとに1,000個のテキストチャンクがあるとか、運転シーンごとに100個のマニューバーがあるとします。</p>
<p>値が高すぎるとメモリを浪費するため、Array フィールドの Structs の最大数を決定するための計算が必要になります。</p>
<h3 id="Index-vector-fields-in-Structs" class="common-anchor-header">ベクトルフィールドのインデックス<button data-href="#Index-vector-fields-in-Structs" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクション内のベクトルフィールドとStructで定義されたベクトルフィールドの両方を含め、ベクトルフィールドのインデックス付けは必須です。Struct 内のベクトルフィールドでは、インデックスタイプとして<code translate="no">EMB_LIST_HNSW</code> を、メトリックタイプとして<code translate="no">MAX_SIM</code> を使用する必要があります。</p>
<p>適用されるすべての制限の詳細については、<a href="/docs/ja/array-of-structs.md#Limits">制限を</a>参照してください。</p>
<h2 id="A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="common-anchor-header">実際の例自律走行のためのCoVLAデータセットのモデリング<button data-href="#A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://tur.ing/posts/s1QUA1uh">Turing Motorsによって</a>導入され、Winter Conference on Applications of Computer Vision (WACV) 2025で採択されたComprehensive Vision-Language-Action (CoVLA)データセットは、自律走行におけるVision-Language-Action (VLA)モデルの訓練と評価のための豊富な基盤を提供する。各データポイント（通常はビデオクリップ）には、生の視覚入力だけでなく、構造化されたキャプションも含まれています：</p>
<ul>
<li><p><strong>自車両の行動</strong>（例：「対向車に譲りながら左へ合流」）、</p></li>
<li><p><strong>検出されたオブジェクト</strong>（先行車、歩行者、信号機など）。</p></li>
<li><p>シーンのフレームレベルの<strong>キャプション</strong>。</p></li>
</ul>
<p>この階層的でマルチモーダルな性質は、Array of Structs機能の理想的な候補となる。CoVLAデータセットの詳細については、<a href="https://turingmotors.github.io/covla-ad/">CoVLAデータセットウェブサイトを</a>参照。</p>
<h3 id="Step-1-Map-the-dataset-into-a-collection-schema" class="common-anchor-header">ステップ1：データセットをコレクションスキーマにマップする<button data-href="#Step-1-Map-the-dataset-into-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>CoVLAデータセットは、10,000のビデオクリップ、合計80時間以上の映像からなる大規模なマルチモーダル運転データセットである。20Hzのレートでフレームをサンプリングし、各フレームに、車両の状態や検出された物体の座標に関する情報とともに、詳細な自然言語キャプションを注釈している。</p>
<p>データセットの構造は以下の通り：</p>
<pre><code translate="no" class="language-python">├── video_1                                       (VIDEO) <span class="hljs-comment"># video.mp4</span>
│   ├── video_id                                  (INT)
│   ├── video_url                                 (STRING)
│   ├── frames                                    (ARRAY)
│   │   ├── frame_1                               (STRUCT)
│   │   │   ├── caption                           (STRUCT) <span class="hljs-comment"># captions.jsonl</span>
│   │   │   │   ├── plain_caption                 (STRING)
│   │   │   │   ├── rich_caption                  (STRING)
│   │   │   │   ├── risk                          (STRING)
│   │   │   │   ├── risk_correct                  (BOOL)
│   │   │   │   ├── risk_yes_rate                 (FLOAT)
│   │   │   │   ├── weather                       (STRING)
│   │   │   │   ├── weather_rate                  (FLOAT)
│   │   │   │   ├── road                          (STRING)
│   │   │   │   ├── road_rate                     (FLOAT)
│   │   │   │   ├── is_tunnel                     (BOOL)
│   │   │   │   ├── is_tunnel_yes_rate            (FLOAT)
│   │   │   │   ├── is_highway                    (BOOL)
│   │   │   │   ├── is_highway_yes_rate           (FLOAT)
│   │   │   │   ├── has_pedestrain                (BOOL)
│   │   │   │   ├── has_pedestrain_yes_rate       (FLOAT)
│   │   │   │   ├── has_carrier_car               (BOOL)
│   │   │   ├── traffic_light                     (STRUCT) <span class="hljs-comment"># traffic_lights.jsonl</span>
│   │   │   │   ├── index                         (INT)
│   │   │   │   ├── <span class="hljs-keyword">class</span>                         (STRING)
│   │   │   │   ├── bbox                          (LIST&lt;FLOAT&gt;)
│   │   │   ├── front_car                         (STRUCT) <span class="hljs-comment"># front_cars.jsonl</span>
│   │   │   │   ├── has_lead                      (BOOL)
│   │   │   │   ├── lead_prob                     (FLOAT)
│   │   │   │   ├── lead_x                        (FLOAT)
│   │   │   │   ├── lead_y                        (FLOAT)
│   │   │   │   ├── lead_speed_kmh                (FLOAT)
│   │   │   │   ├── lead_a                        (FLOAT)
│   │   ├── frame_2                               (STRUCT)
│   │   ├── ...                                   (STRUCT)
│   │   ├── frame_n                               (STRUCT)
├── video_2
├── ...
├── video_n
<button class="copy-code-btn"></button></code></pre>
<p>CoVLAデータセットの構造は高度に階層化されており、収集されたデータは、<code translate="no">.mp4</code> 形式のビデオクリップとともに、複数の<code translate="no">.jsonl</code> ファイルに分割されていることがわかる。</p>
<p>Milvusでは、JSONフィールドまたはArray-of-Structsフィールドを使用して、コレクションスキーマ内に入れ子構造を作成することができる。ベクトル埋め込みが入れ子形式の一部である場合、Array-of-Structsフィールドのみがサポートされます。ただし、Array 内の Struct は、それ自体にさらなる入れ子構造を含めることはできない。CoVLAデータセットを本質的な関係を保持したまま保存するためには、不要な階層構造を取り除き、Milvusコレクションスキーマに適合するようにデータを平坦化する必要があります。</p>
<p>下図は、以下のスキーマを使用して、このデータセットをどのようにモデル化できるかを示している：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dataset-model.png" alt="Dataset Model" class="doc-image" id="dataset-model" />
   </span> <span class="img-wrapper"> <span>データセット・モデル</span> </span></p>
<p>上図はビデオクリップの構造を示しており、以下のフィールドで構成される：</p>
<ul>
<li><p><code translate="no">video_id</code> はプライマリキーで、INT64 型の整数を受け入れます。</p></li>
<li><p><code translate="no">states</code> は生のJSONボディで、現在の動画の各フレームにおける自車両の状態を含む。</p></li>
<li><p><code translate="no">captions</code> は Struct の配列で、各 Struct は以下のフィールドを持つ：</p>
<ul>
<li><p><code translate="no">frame_id</code> は、現在のビデオ内の特定のフレームを識別します。</p></li>
<li><p><code translate="no">plain_caption</code> は、天候や道路状況などの周囲環境を含まない現在のフレームの説明であり、<code translate="no">plain_cap_vector</code> は、それに対応するベクトル埋め込みです。</p></li>
<li><p><code translate="no">rich_caption</code> は周囲環境を含む現在のフレームの説明であり、<code translate="no">rich_cap_vector</code> はその対応するベクトル埋め込みである。</p></li>
<li><p><code translate="no">risk</code> は現在のフレームで自車両が直面するリスクの記述であり、<code translate="no">risk_vector</code> はその対応するベクトル埋め込みである。</p></li>
<li><p><code translate="no">road</code>,<code translate="no">weather</code>,<code translate="no">is_tunnel</code>,<code translate="no">has_pedestrain</code>, etc...のようなフレームの他のすべての属性。</p></li>
</ul></li>
<li><p><code translate="no">traffic_lights</code> は、現在のフレームで識別されたすべての信号機を含むJSONボディである。</p></li>
<li><p><code translate="no">front_cars</code> は、現在のフレームで識別されたすべての先頭車両を含むJSONボディでもある。</p></li>
</ul>
<h3 id="Step-2-Initialize-the-schemas" class="common-anchor-header">ステップ2：スキーマの初期化<button data-href="#Step-2-Initialize-the-schemas" class="anchor-icon" translate="no">
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
    </button></h3><p>最初に、キャプション構造体とコレクションのスキーマを初期化する必要がある。</p>
<ul>
<li><p>Caption Struct のスキーマを初期化する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># create the schema for the caption struct</span>
schema_for_caption = MilvusClient.create_struct_field_schema()

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>
)

...
<button class="copy-code-btn"></button></code></pre></li>
<li><p>コレクションのスキーマを初期化する。</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_id&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;primary key&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_url&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    description=<span class="hljs-string">&quot;URL of the video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;states&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific state of the ego vehicle in the current video&quot;</span>
)

<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;captions&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.ARRAY,</span>
<span class="highlighted-comment-line">    element_type=DataType.STRUCT,</span>
<span class="highlighted-comment-line">    struct_schema=struct_for_caption,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">600</span>,</span>
<span class="highlighted-comment-line">    description=<span class="hljs-string">&quot;captions for the current video&quot;</span></span>
<span class="highlighted-comment-line">)</span>

schema.add_field(
    field_name=<span class="hljs-string">&quot;traffic_lights&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;front_cars&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Step-3-Set-index-parameters" class="common-anchor-header">ステップ 3: インデックス・パラメータの設定<button data-href="#Step-3-Set-index-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>すべてのベクトル・フィールドにインデックスを付けなければならない。要素 Struct 内のベクトルフィールドにインデックスを付けるには、インデックスタイプとして<code translate="no">EMB_LIST_HNSW</code> を使用し、ベクトル埋め込み間の類似度を測定するために<code translate="no">MAX_SIM</code> メトリックタイプを使用する必要があります。</p>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>JSONフィールド内のフィルタリングを高速化するために、JSONフィールドのJSONシュレッダーを有効にすることをお勧めします。</p>
<h3 id="Step-4-Create-a-collection" class="common-anchor-header">ステップ4：コレクションの作成<button data-href="#Step-4-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>スキーマとインデックスの準備ができたら、以下のようにターゲットコレクションを作成します：</p>
<pre><code translate="no" class="language-python">client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-data" class="common-anchor-header">ステップ 5: データの挿入<button data-href="#Step-5-Insert-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Turing Motosは、生のビデオクリップ(<code translate="no">.mp4</code>)、状態(<code translate="no">states.jsonl</code>)、キャプション(<code translate="no">captions.jsonl</code>)、信号機(<code translate="no">traffic_lights.jsonl</code>)、前方の車(<code translate="no">front_cars.jsonl</code>)を含む、複数のファイルでCoVLAデータセットを整理する。</p>
<p>これらのファイルから各ビデオクリップのデータ片をマージし、データを挿入する必要があります。以下は、参考のためにマージした実体です。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;video_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;video_url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;videos/0a0fc7a5db365174.mp4&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;states&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;trajectory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;extrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">-0.016034273081459105</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.9998714384933313</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-8.280132118064406e-05</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;intrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">2648.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">964.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;captions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;plain_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow.&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rich_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow. It is cloudy. The car is driving on a wide road. No pedestrians appear to be present. What the driver of ego vehicle should be careful is to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_correct&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_yes_rate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.6062515935356961</span><span class="hljs-punctuation">,</span>
            ...
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
            ...
        <span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">599</span>
            ...
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;traffic_lights&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">485.9914855957031</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.18536376953125</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.1666259765625</span><span class="hljs-punctuation">,</span> <span class="hljs-number">360.3130798339844</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;right&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;2&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;straight&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;front_cars&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;has_lead&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_prob&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.967777669429779</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_x&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5.26953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_y&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1.07421875</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_speed_kmh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">23.6953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.546875</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>データを適切に処理したら、次のように挿入します：</p>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;video_id&quot;</span>: <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>, ...}
    ...
]

client.insert(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
