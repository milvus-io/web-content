---
id: release_notes.md
summary: Milvus リリースノート
title: リリースノート
---
<h1 id="Release-Notes" class="common-anchor-header">リリースノート<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusの新機能をご覧ください！このページでは、各リリースにおける新機能、改善点、既知の問題、およびバグ修正についてまとめています。更新情報については、定期的にこのページをご確認いただくことをお勧めします。</p>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日：2026年7月29日</p>
<table>
<thead>
<tr><th>Milvus バージョン</th><th>Python SDK バージョン</th><th>Node.js SDK バージョン</th><th>Java SDK バージョン</th><th>Go SDK バージョン</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0が正式リリースされました！<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-betaで</a>導入されたLake-Nativeアーキテクチャを基盤として、このリリースではベータ版で開始された取り組みを完成させました。External Collectionはより多くのLakehouseワークフローに対応し、スキーマはオンラインでの追加・バックフィル・削除をサポートするようになりました。また、スパースインデックスはSINDIを中心に再構築され、 StructArrayとファセット検索により検索エンジンが充実しました。FAISSパススルーとTEXTにより、インデックスおよびモダリティの選択肢が拡大され、Woodpeckerはスタンドアロンサービスとして動作します。</p>
<p>3.0 シリーズを初めてご利用になる方のために、以下の「Core 3.0 の機能概要」セクションでは、3.0-beta で導入された機能を要約しています。詳細については、<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta のリリースノート</a>をご覧ください。</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">3.0.0の新機能（3.0-beta以降）<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">外部コレクション：より完全なレイクハウスワークフロー</h4><p>3.0-betaでは「External Collection」が導入され、Lakeファイルをその場で参照し、インデックスを構築し、データをMilvusにコピーすることなく検索できるようになりました。今回のリリースでは、これをさらに拡張し、完全なLakehouse検索ワークフローを実現しています。 外部フィールドから、BM25スパースベクトル、MinHashシグネチャ、テキスト埋め込みなどの関数出力フィールドへの供給が可能になりました。これにより、ソーステーブルをコピーすることなく、Milvus内部でテキストおよびモデル由来の検索フィールドを構築できます。 また、リフレッシュ機能では加算的なスキーマ進化もサポートされています。外部テーブルに新しい列が追加された場合、Milvusはコレクションを再構築するのではなく、影響を受けるセグメントをパッチ適用します。</p>
<p>また、本リリースでは、Milvus SnapshotのメタデータやStorage V3のマニフェストを外部ソースとして扱う「<code translate="no">milvus-table</code> 」外部フォーマットが追加されました。これにより、コレクションのスナップショット自体を外部テーブルとして提供できるようになり、バッチ処理システムとサービングシステムが、マニフェストに基づいた同一データの共有ビューを利用できるようになります。</p>
<p>詳細については、「<a href="https://milvus.io/docs/v3.0.x/create-an-external-collection.md">外部コレクション</a>と<a href="https://milvus.io/docs/v3.0.x/snapshots.md">スナップショットの</a> <a href="https://milvus.io/docs/v3.0.x/create-an-external-collection.md">作成</a>」を参照してください。</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">柔軟なスキーマ：オンラインでの列の追加、バックフィル、削除</h4><p>本番環境ではスキーマは静的なままではありません。組み込まれたモデルが置き換えられたり、特徴量が更新されたり、フィールドが非推奨になったりします。これまでは、こうした変更を行うには、ダウンタイムや二重書き込みを伴うコレクション全体の再構築が必要でした。3.0.0 ではこの課題が解決され、サービス提供を継続しながら列の追加、データの埋め込み、削除が可能になりました。</p>
<p>バックフィルは双方向で機能します。外部バックフィルは、Milvusの外部で計算された値を処理します。列を追加し、一貫性のある開始点としてコレクションのスナップショットを取得し、ジョブをオフラインで実行し、値を書き戻すと、Milvusは新しい列を段階的にインデックス化します。これにより、数億行にわたる埋め込みモデルのアップグレードも、ダウンタイムのないホットパスとなります。 内部バックフィルは、カーネルから導出された値を扱います。既存のコレクションにBM25またはMinHash関数を適用すると、その出力フィールドは既存のデータに対して自動的に計算されます。</p>
<p>詳細については、「<a href="https://milvus.io/docs/v3.0.x/add-fields-to-an-existing-collection.md">既存のコレクションへのフィールドの追加</a>」を参照してください。</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">スパースインデックスの全面刷新：SINDI、Block-Max WAND、および Block-Max MaxScore</h4><p>Milvus 3.0 では、スパースベクトルインデックスが全面的にアップグレードされました。<a href="https://arxiv.org/abs/2509.08395">SINDI</a>、Block-Max WAND、Block-Max MaxScore という新しい検索アルゴリズムが導入されたほか、反転リストの圧縮、設定可能な量子化、ワークロードごとの検索アルゴリズムの選択機能も追加されました。 また、mmapによる読み込み、シリアライズ、およびBM25スコアリングも最適化され、大規模なスパースベクトル検索および全文検索におけるインデックスのストレージ容量と読み込みオーバーヘッドが削減されました。 内部ベンチマークでは、圧縮されたBM25インデックスは、同等のリコール率において2.6スパースインデックスよりも約3分の1のサイズに縮小されており、学習済みスパース埋め込みでは、SINDIがMaxScoreのQPSの最大約10倍に達します。 新しいインデックスバージョンが有効になると（「互換性および動作に関する注意事項」を参照）、SINDI がスパース IP 検索のデフォルトとなり、MaxScore が BM25 のデフォルトとなります。</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray の対応範囲</h4><p>StructArray は、null 値、ビットマップインデックス、稼働中のコレクションへの動的なフィールド追加、および upsert による構造体フィールドの部分更新をサポートするようになりました。これに対応する REST および一括インポート機能も提供されます。</p>
<p>要素レベルの検索では、エンティティごとに設定可能な集約（max / sum / avg / top-k バリエーション）を備えたベクトルサブフィールド間のハイブリッド検索に加え、範囲検索およびグループ化機能が追加されました。ネストされたフィルタリングでは、<code translate="no">element_filter</code> 述語、<code translate="no">MATCH_ANY</code> /<code translate="no">MATCH_ALL</code> /<code translate="no">MATCH_LEAST</code> /<code translate="no">MATCH_MOST</code> /<code translate="no">MATCH_EXACT</code> 量指定子、<code translate="no">tags[0][name]</code> などの位置指定サブフィールドアクセス、および struct 列に対する<code translate="no">array_length()</code> がサポートされています。</p>
<p>詳細については、「<a href="https://milvus.io/docs/v3.0.x/array-of-structs.md">StructArray</a>」および「<a href="https://milvus.io/docs/v3.0.x/struct-array-operators.md">StructArray 演算子</a>」を参照してください。</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">検索集計およびファセット検索</h4><p>ベータ版のクエリ集計は、フィルタリングされたデータに対して正確な統計値を算出します。3.0.0 では、検索パスにファセット機能が追加されました。検索時にファセットフィールドを指定すると、Milvus は上位のファセット値を返します。各値は、ANN ランキングにおける最も一致度の高いメンバーによって表され、COUNT や AVG などの集計値が注釈として付加されます — クライアント側で過剰にデータを取得してカウントする代わりに、1回のリクエストでファセット検索サイドバー（ブランド、価格帯、属性）の集計結果が得られます。</p>
<h3 id="Function-Chain-reranking" class="common-anchor-header">ファンクションチェーンによる再ランク付け<button data-href="#Function-Chain-reranking" class="anchor-icon" translate="no">
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
    </button></h3><p>再ランク付けは、Function Chain API を通じて組み合わせ可能になりました。この API は、単一の検索リクエストの一部として、順序付けされた型付きパイプラインを実行します。 1つのチェーンでは、QueryNode での初期の L0 再スコアリングと、Proxy での L2 ポストリダクション再ランク付けを組み合わせることができ、クライアント側でのオーケストレーションを必要とせずに、スコアの変換や組み合わせ、モデルベースの再ランク付け、ソート、候補の絞り込みをサポートします。 また、このリリースでは、FileResources として登録された UBJ モデルを使用した L0 リランキング向けのネイティブ XGBoost スコアリングに加え、サーバー管理型のテキスト埋め込みおよび文の類似度リランキングのための Hugging Face 推論プロバイダーも追加されました。</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT 長文フィールド</h4><p>TEXTフィールドは、ストレージ側の長さ制限を撤廃することで、長文を第一級のデータとして扱います。<code translate="no">text_match</code> 、<code translate="no">phrase_match</code> 、およびBM25をサポートしています。64 KB未満の値はインラインで保持され、それより大きな値はVortex形式のパーティションレベルのLOBファイルに格納され、列には<code translate="no">(file_id, offset)</code> への参照のみが保存されます。 LOBファイルはセグメント間で共有されるため、圧縮処理ではテキストを書き換えるのではなく、参照を移動させます。RAGの場合、これは1回のI/Oで同じストアからベクトルとソーステキストを取得できることを意味し、外部のBLOBストアを操作する必要がありません。</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISSインデックスのパススルー</h4><p>新しい<code translate="no">FAISS</code> インデックスタイプは、<code translate="no">faiss_index_name</code> パラメータを通じて任意のFaissインデックスファクトリ文字列（<code translate="no">IVF64,Flat</code> 、<code translate="no">HNSW16,Flat</code> 、<code translate="no">OPQ16,IVF64,PQ16x4</code> ）を受け入れ、検索パラメータもそのまま渡されるため、FaissのレシピをMilvus上で直接再現できます。</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">VortexおよびLanceフォーマットのサポート</h4><p>ストレージ層には、2つのオープンなカラム型フォーマットが追加されました。次世代の内部フォーマットであるVortex（適応型エンコーディング（辞書、RLE、ビットパッキング、浮動小数点数専用の圧縮）、ゼロコピー展開、ベクトルとスカラーの混合ワークロード向けに最適化）と、オープンエコシステム間の相互運用性を目的としてParquetと並行して採用されるLanceです。 Vortexはデフォルトの内部フォーマットとなる予定であり、フィルターのプッシュダウンやローカルバリアントもロードマップに盛り込まれています。</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Woodpeckerのスタンドアロン展開</h4><p>ストリーミング書き込みパスの中核をなすWALであるWoodpeckerは、他のノードに組み込まれるのではなく、独立したサービスとしてデプロイできるようになりました。これにより、他のマイクロサービスと同様に、独立したスケーリング、障害の隔離、および可観測性が実現されます。これは、大規模なクラスターや書き込み負荷の高いワークロードにおいて特に重要です。</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Core 3.0の機能まとめ<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の機能は<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a>で導入され、3.0.0 に含まれています。詳細については、ベータ版リリースノートを参照してください。</p>
<ul>
<li><strong>外部コレクション</strong>— レイクハウスデータ（Parquet、Lance、Iceberg、Vortex）をその場でクエリ可能：ゼロコピー、読み取り専用、増分リフレッシュによる同期。</li>
<li><strong>スナップショット</strong>— セグメント参照による特定時点の読み取り専用コレクションビュー。追加ストレージコストはほぼゼロ。</li>
<li><strong>Storage V3 (Loon)</strong>— オブジェクトストレージ上のマニフェストベースの列指向ストレージ。Snapshot および External Collection の基盤となります。</li>
<li><strong>クエリ／検索の ORDER BY</strong>— フィールドごとの ASC／DESC によるサーバーサイドのマルチフィールドソート。</li>
<li><strong>クエリ集計</strong>— グループ化を伴う COUNT / SUM / AVG / MIN / MAX をサーバー側で評価します。</li>
<li><strong>EmbList + DiskANN</strong>— StructArray 埋め込みリスト向けのオンディスク多ベクトルインデックス。Muvera や Lemur などの高速化パスがあります。</li>
<li><strong>MinHash関数（doc-in、doc-out）</strong>— サーバーサイドのMinHashシグネチャに加え、近似重複検出のための<code translate="no">MINHASH_LSH</code> 。</li>
<li><strong>Null 許容ベクトル</strong>— 6 種類のベクトル型すべてで NULL を許容。検索では NULL 行をスキップし、AddField はベクトルフィールドにも拡張されます。</li>
<li><strong>エンティティの TTL</strong>— TIMESTAMPTZ フィールドに基づいて行ごとに有効期限が設定されます。</li>
<li><strong>FileResource</strong>— アナライザー、BM25、および Text Match 用の、クラスタ管理の辞書、同義語リスト、およびストップワードリスト。</li>
<li><strong>強制マージ</strong>— 演算子によってトリガーされるセグメントの圧縮。同期モードまたは非同期モードで実行されます。</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">互換性および動作に関する注意事項<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3 (Loon) はデフォルトで無効になっています。</strong>スナップショットやTEXTフィールドなど、これに依存する機能を使用するには、<code translate="no">common.storage.useLoonFFI</code> を通じて手動で有効にする必要があります。Storage V3は、今後のリリースでデフォルトで有効になる予定です。</li>
<li><strong>2.6 → 3.0 の互換性とロールバックは保証されています。</strong>つまり、3.0 へのデプロイは 2.6 へロールバック可能です。ただし、シリアライズされたデータ形式を変更する機能（例：Storage V3）を有効化または使用した場合は、ロールバックはできなくなります。</li>
<li><strong>新しいインデックスバージョンは、現時点ではオプトイン方式となっています。</strong>新たに導入されたインデックスアルゴリズムを有効にするには、対象のインデックスバージョンを手動で引き上げる必要があります（<code translate="no">dataCoord.targetVecIndexVersion</code> を10に、<code translate="no">dataCoord.targetScalarIndexVersion</code> を4に）。今後のリリースでは、これらがデフォルトで有効になります。</li>
<li><strong>GPUイメージはCUDA 12.9に移行し</strong>、Ubuntu 20.04とのGPU互換性は維持されなくなりました。</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>リリース日: 2026年5月9日</p>
<table>
<thead>
<tr><th>Milvus バージョン</th><th>Python SDK バージョン</th><th>Node.js SDK バージョン</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta は、オープンレイク・エコシステムへの新たな統合により Milvus ベクトルデータベースを拡張しています。「External Collection」により、Milvus は外部レイク・テーブルをゼロコピーでクエリできるようになり、Spark はスナップショットを通じて Milvus コレクションを直接読み取ることができます。 また、このリリースでは、より豊富な検索機能、表現力豊かなスキーマ、より詳細なテキスト検索のカスタマイズ、データおよびモデルのライフサイクル管理のきめ細かな制御、さらにオペレーター側の制御機能の拡充も実現しています。Milvus 3.0はZilliz Lakebaseの中核となるカーネルであり、その統合されたサービング、ディスカバリー、バッチ処理を支えています。</p>
<p>Milvus 3.0の詳細や、主要メンテナンス担当者とのAMAについては、以下の動画をご覧ください：</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h3 id="Key-Features" class="common-anchor-header">主な機能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部コレクション</h4><p>一般的なAIデータパイプラインでは、テラバイト規模の埋め込みデータやメタデータが、Parquet、Lance、またはIcebergテーブルとしてすでにオブジェクトストレージ上に存在しています。そのデータをMilvusにコピーすると、ストレージコストが倍増し、同期を維持しなければならないETLパイプラインが追加され、データガバナンスの主導権が顧客から離れてしまいます。</p>
<p>「外部コレクション」機能により、このコピー作業が不要になります。Milvusコレクションは、データがすでに格納されている場所にあるファイルを参照でき、Milvusが管理するのはスキーマ、インデックス、およびクエリの実行のみです。 増分更新により、コレクションは基となるファイルと常に同期された状態が維持されます。金融や医療などのチームのように、データをデータレイクから持ち出せないお客様でも、データが格納されている場所のままベクトル検索を実行できます。また、データレイクに格納された単一のデータセットを、複数のMilvusインスタンスから同時に提供することも可能です。</p>
<p>詳細については、「<a href="/docs/ja/create-an-external-collection.md">外部コレクションの作成</a>」を参照してください。</p>
<h4 id="Snapshot" class="common-anchor-header">スナップショット</h4><p>サービングとバッチディスカバリーでは、多くの場合、同じコレクションを同時に必要とします。A/Bモデル評価、大規模な重複排除、バックフィル検証、バージョンのロールバックなどはすべて、書き込みが継続している間もコレクションの安定したビューを必要とします。</p>
<p>スナップショットは、データをコピーするのではなく既存のセグメントを参照することで、コレクションの特定の時点における読み取り専用のビューを作成するため、追加のストレージコストはほぼゼロです。ライブのコレクションが書き込みを受け付け続けている間も、バッチジョブはMVCC方式の隔離環境下でスナップショットから読み取りを行うことができます。</p>
<p>詳細については、「<a href="/docs/ja/snapshots.md">スナップショット</a>」、<a href="/docs/ja/manage-snapshots.md">「スナップショットの管理」</a>、「<a href="/docs/ja/snapshot-use-cases.md">スナップショットのユースケース</a>」を参照してください。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">クエリ／検索の並べ替え</h4><p>検索およびクエリでは、マルチフィールドの並べ替えが可能になりました。ソート処理はMilvusカーネルに委譲され、各フィールドごとに<code translate="no">ASC</code> および<code translate="no">DESC</code> を設定できます。これにより、本番環境における一般的な課題が解決されます。距離のみに基づくTop-Kランキングでは、最も類似したアイテムが必ずしも最も安価、最新、または人気のあるものではない場合、ビジネスニーズに合致しないことがよくあります。</p>
<p>これにより、アプリケーションは複合ランキングを表現するために、結果を過剰に取得してクライアント側で再ソートを行う必要がなくなりました。</p>
<p>詳細については、「<a href="/docs/ja/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">スカラーフィールドによる検索結果の並べ替え</a>」および「<a href="/docs/ja/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">クエリ結果の並べ替え</a>」を参照してください。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">クエリの集計</h4><p>Milvus コレクションからテナント分布統計、フィールドの完全性カウント、またはバージョンのロールアウト進捗状況を生成するには、以前は一致するエンティティをクライアント側に引き戻し、そこで集計する必要がありました。 Milvus 3.0 では、SQL スタイルのスカラー集計がカーネルに組み込まれています。クエリ呼び出しでは、<code translate="no">group_by_fields</code> および<code translate="no">output_fields</code> 形式の集計式を受け付けます。これには、<code translate="no">count(*)</code> 、<code translate="no">count(&lt;field&gt;)</code> 、<code translate="no">sum(&lt;field&gt;)</code> 、<code translate="no">avg(&lt;field&gt;)</code> 、<code translate="no">min(&lt;field&gt;)</code> 、<code translate="no">max(&lt;field&gt;)</code> などが含まれます。集計は、フィルタリング後にサーバー側で評価されます。</p>
<p>詳細については、「<a href="/docs/ja/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">集計クエリの結果</a>」を参照してください。</p>
<h4 id="Null-Vector" class="common-anchor-header">ヌルベクトル</h4><p>エンベディングは非同期で生成されることが多いため、エンティティがベクトルよりも先に到着することがあります。 マルチモーダルデータにも、キャプションのない動画や画像のない製品など、自然な欠落があります。以前のバージョンには適切な解決策がなく、アプリケーションはベクトルの準備が整うまで書き込みを遅らせるか、プレースホルダーのベクトルを埋めるかのいずれかを選択していましたが、どちらの選択肢も検索品質を低下させていました。</p>
<p>Milvus 3.0 では、6 種類のベクトル型すべてにおいて、ベクトルフィールドの NULL をサポートしています。検索では NULL ベクトルが自動的にスキップされるため、検索品質に影響はなく、NULL ベクトルは実質的にストレージを消費しません。この変更に伴い、<code translate="no">AddField</code> もベクトルフィールドに拡張されました。<code translate="no">nullable=True</code> を使用すると、既存のコレクションを再構築することなく、オンラインで新しいベクトルフィールドを追加できます。</p>
<p>詳細については、「<a href="/docs/ja/nullable-and-default.md">Nullable Fields</a>」を参照してください。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">カスタム辞書および同義語辞書</h4><p>標準のトークナイザーでは、本番環境の検索品質要件を常に満たせるわけではありません。中国語、医学、法律、化学などの専門分野、および多言語コーパスでは、カスタム辞書や同義語テーブルを活用することで大幅な改善が期待できます。これまで、これらのリソースは主にアプリケーション側でのクエリ書き換えとして実装されていました。</p>
<p>Milvus 3.0 では、カスタム トークナイザー辞書、同義語リスト、ストップワードリスト、および複合語分解ルールを登録するための FileResource メカニズムが追加されました。 一度登録されたリソースは、どのトークナイザーやフィルターからも参照可能となり、BM25、アナライザー、およびテキストマッチで有効になります。辞書や同義語は、アプリケーションコード全体に散在させるのではなく、バージョン管理を行い、一元的に管理できるようになりました。</p>
<p>詳細については、「<a href="/docs/ja/manage-file-resources.md">ファイルリソースの管理</a>」を参照してください。</p>
<h4 id="Entity-TTL" class="common-anchor-header">エンティティの TTL</h4><p>コレクションレベルおよびパーティションレベルの TTL は、多くのライフサイクルやコンプライアンスのシナリオにおいて、粒度が粗すぎます。同じコレクション内のテナントによって保存ルールが異なることが多く、個々のエンティティは、コレクションの他の部分とは異なるスケジュールで有効期限が切れる必要がある場合があります。</p>
<p>Milvus 3.0 では、エンティティごとの TTL がサポートされています。スキーマ内で `<code translate="no">TIMESTAMPTZ</code> ` フィールドを宣言し、コレクションのプロパティを通じてそれを TTL フィールドとして指定すると、Milvus は有効期限が切れたエンティティを自動的に回収します。これにより、忘れられる権利（Right to be forgotten）に基づく要求への対応、セッションデータの有効期限切れ処理、およびアプリケーション側でのクリーンアップを必要としない限定的な会話履歴の管理が可能になります。</p>
<p>詳細については、<a href="/docs/ja/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">「エンティティレベルのTTLの設定</a>」を参照してください。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6では、セットベースの近似重複検出のための<code translate="no">MINHASH_LSH</code> インデックスが追加されましたが、アプリケーションは依然として、データをMilvusに書き込む前にMinHash署名を計算する必要がありました。</p>
<p>Milvus 3.0 では、サーバーサイドの MinHash 関数が追加されました。スキーマで `<code translate="no">VARCHAR</code> ` 入力フィールドと `<code translate="no">BINARY_VECTOR</code> ` 出力フィールドを宣言し、`<code translate="no">FunctionType.MINHASH</code> ` 関数を紐づけるだけで、Milvus が挿入、一括挿入、および検索の際にシグネチャを計算します。<code translate="no">MINHASH_LSH</code> と組み合わせることで、Milvus 内での大規模データセットの重複排除ワークフロー、フィンガープリント、および盗作検出をサポートします。</p>
<p>詳細については、「<a href="/docs/ja/minhash-function.md">MinHash関数</a>」を参照してください。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>「1つのエンティティ＝1つのベクトル」という仮定は、現代の検索にはもはや適合しません。長いドキュメントは多くのチャンクに分割され、ColBERTのようなレイトインタラクションモデルはトークンごとに1つのベクトルを生成し、マルチモーダルエンティティは複数のビューを持つことがあります。</p>
<p>EmbListは、エンティティごとに可変長のベクトルリストを格納し、<code translate="no">DISKANN</code> をディスク上のインデックスとして使用します。コーパスがメモリ容量の上限を超える場合、このディスクパスによりRAM使用量を抑えることができます。EmbList +<code translate="no">DISKANN</code> は、今回のRCで導入される広範なStructListファミリーの最初のバリエーションです。 StructListのフィルタリングやMuvera／Lemurによるマルチベクトル高速化を含む、このファミリーの残りの機能は、公式の3.0リリースで提供される予定です。</p>
<p>詳細については、「<a href="/docs/ja/search-with-embedding-lists.md">Embedding Lists を使用した検索</a>」を参照してください。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制マージ</h4><p>本番環境のワークロードでは、時間の経過とともにセグメントの断片化が蓄積され、クエリのレイテンシの変動やストレージ容量の肥大化を引き起こします。</p>
<p>Milvus 3.0 では、ピーク時以外の時間帯に、同期モードおよび非同期モードの両方で、セグメントのコンパクションを明示的にトリガーする機能が追加されました。</p>
<p>詳細については、「<a href="/docs/ja/force-merge.md">Force Merge コンパクション</a>」を参照してください。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 では、データとメタデータが S3 互換のオブジェクトストレージ上に格納される、マニフェストベースのカラム型ストレージエンジン「Storage V3」が導入されました。各データセットのバージョンは、不変のマニフェストスナップショットとしてキャプチャされます。これは、データセットを構成するカラムグループ、デルタログ、および統計情報を記録した Avro エンコードのファイルです。</p>
<p>マニフェストはコンパクトなAvroファイルであり、デルタログはデータファイルを書き換えることなくエンティティレベルの削除を記録します。これにより、データセットが拡大してもメタデータのオーバーヘッドを最小限に抑えることができます。また、マニフェストはメタデータの追跡とクエリパスを分離するため、コレクションはクエリのパフォーマンスを低下させることなく、より多くのセグメントを管理できるようになります。</p>
<p>状態はオブジェクトストレージに保存されるため、データセットは自己記述的です。つまり、ストレージパスへのアクセス権を持つ任意のリーダーは、中央カタログを介さずにデータセットを検出して解釈することができます。この特性は、External Collection、Snapshot、および将来のレイク統合の基盤となっています。</p>
