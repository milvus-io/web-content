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
    </button></h1><p>Milvusの新機能をご覧ください！このページでは、各リリースにおける新機能、改善点、既知の問題、およびバグ修正についてまとめています。更新情報を確認するため、定期的にこのページをご覧になることをお勧めします。</p>
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
    </button></h2><p>リリース日：2026年5月9日</p>
<table>
<thead>
<tr><th>Milvus バージョン</th><th>Python SDK バージョン</th><th>Node.js SDK バージョン</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta は、オープンレイクエコシステムへの新たな統合により Milvus ベクトルデータベースを拡張します。External Collection により、Milvus は外部レイクテーブルをゼロコピーでクエリでき、Spark は Snapshot を通じて Milvus コレクションを直接読み取ることができます。 また、このリリースでは、より豊富な検索機能、より表現力豊かなスキーマ、より詳細なテキスト検索のカスタマイズ、よりきめ細かなデータおよびモデルのライフサイクル制御、さらにオペレーター側の制御機能も強化されています。Milvus 3.0 は Zilliz Lakebase のコアカーネルであり、その統合されたサービング、ディスカバリー、バッチ処理を支えています。</p>
<p>Milvus 3.0の詳細や、コアメンテナーとのAMAについては、以下の動画をご覧ください：</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部コレクション</h4><p>一般的なAIデータパイプラインでは、テラバイト規模の埋め込みデータやメタデータが、Parquet、Lance、またはIcebergテーブルとしてすでにオブジェクトストレージ上に存在しています。そのデータをMilvusにコピーすると、ストレージコストが倍増し、同期を維持しなければならないETLパイプラインが追加され、データガバナンスが顧客から遠ざかってしまいます。</p>
<p>外部コレクション機能により、このコピー作業が不要になります。Milvusコレクションは、データが既に存在する場所にあるファイルを参照でき、Milvusはスキーマ、インデックス、およびクエリの実行のみを管理します。 増分更新により、コレクションは基となるファイルと常に同期されます。金融や医療チームなど、データをレイクから持ち出せないお客様は、データが格納されている場所のままベクトル検索を実行できます。また、レイク上に存在する単一のデータセットを、複数のMilvusインスタンスから同時に提供することも可能です。</p>
<p>詳細については、「<a href="/docs/ja/create-an-external-collection.md">外部コレクションの作成</a>」を参照してください。</p>
<h4 id="Snapshot" class="common-anchor-header">スナップショット</h4><p>サービングとバッチディスカバリーでは、多くの場合、同じコレクションを同時に必要とします。A/Bモデル評価、大規模な重複排除、バックフィル検証、およびバージョンロールバックはすべて、書き込みが継続している間もコレクションの安定したビューを必要とします。</p>
<p>スナップショットは、データをコピーするのではなく既存のセグメントを参照することで、コレクションの特定の時点における読み取り専用ビューを作成するため、追加のストレージコストはほぼゼロです。ライブのコレクションが書き込みを受け入れ続けている間も、バッチジョブはMVCCスタイルの分離環境下でスナップショットから読み取ることができます。</p>
<p>詳細については、「<a href="/docs/ja/snapshots.md">スナップショット</a>」、<a href="/docs/ja/manage-snapshots.md">「スナップショットの管理」</a>、「<a href="/docs/ja/snapshot-use-cases.md">スナップショットのユースケース</a>」を参照してください。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">クエリ / 検索の Order By</h4><p>検索およびクエリでは、マルチフィールドの順序付けが可能になり、ソート処理はMilvusカーネルにオフロードされ、フィールドごとに<code translate="no">ASC</code> および<code translate="no">DESC</code> を設定できるようになりました。これにより、一般的な運用上の課題が解決されます。距離だけでTop-Kを決定する場合、最も類似したアイテムが最も安価、最新、または人気のあるものではない場合、ビジネスニーズに合致しないことがよくあります。</p>
<p>これにより、アプリケーションは複合ランキングを表現するために、結果を過剰に取得してクライアント側で再ソートする必要がなくなりました。</p>
<p>詳細については、「<a href="/docs/ja/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">スカラーフィールドによる検索結果のソート</a>」および「<a href="/docs/ja/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">クエリ結果のソート</a>」を参照してください。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">クエリの集計</h4><p>Milvus コレクションからテナント分布統計、フィールドの完全性カウント、またはバージョンロールアウトの進捗状況を生成するには、以前は一致するエンティティをクライアントに引き戻し、そこで集計する必要がありました。 Milvus 3.0 では、SQL スタイルのスカラー集計がカーネルに組み込まれています。クエリ呼び出しでは、<code translate="no">group_by_fields</code> および<code translate="no">output_fields</code> 形式の集計式を受け付けます。これには、<code translate="no">count(*)</code> 、<code translate="no">count(&lt;field&gt;)</code> 、<code translate="no">sum(&lt;field&gt;)</code> 、<code translate="no">avg(&lt;field&gt;)</code> 、<code translate="no">min(&lt;field&gt;)</code> 、<code translate="no">max(&lt;field&gt;)</code> が含まれます。集計は、フィルタリング後にサーバー側で評価されます。</p>
<p>詳細については、「<a href="/docs/ja/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">クエリ結果の集計</a>」を参照してください。</p>
<h4 id="Null-Vector" class="common-anchor-header">Nullベクトル</h4><p>エンベディングは非同期で生成されることが多いため、エンティティがベクトルよりも先に到着することがあります。 マルチモーダルデータにも、キャプションのない動画や画像のない製品など、自然なギャップが存在します。以前のバージョンには適切な解決策がなく、アプリケーションはベクトルの準備ができるまで書き込みを遅らせるか、プレースホルダーベクトルを埋めるかのいずれかを選択していましたが、どちらの選択肢も検索品質を低下させていました。</p>
<p>Milvus 3.0 は、6 種類のベクトル型すべてにおいて、ベクトルフィールドでの NULL をサポートしています。検索では NULL ベクトルが自動的にスキップされるため、検索品質に影響はなく、NULL ベクトルは実質的にストレージを消費しません。この変更に伴い、<code translate="no">AddField</code> もベクトルフィールドに拡張されました。<code translate="no">nullable=True</code> を使用すると、既存のコレクションを再構築することなく、オンラインで新しいベクトルフィールドを追加できます。</p>
<p>詳細については、「<a href="/docs/ja/nullable-and-default.md">Nullable Fields</a>」を参照してください。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">カスタム辞書とシノニム辞書</h4><p>標準のトークナイザーでは、本番環境の検索品質要件を常に満たせるわけではありません。中国語、医学、法律、化学などの専門分野、および多言語コーパスでは、カスタム辞書や同義語テーブルを活用することで大幅な改善が期待できます。これまで、これらのリソースは主にアプリケーション側でのクエリ書き換えとして実装されていました。</p>
<p>Milvus 3.0 では、カスタム トークナイザー辞書、同義語リスト、ストップワードリスト、および複合語分解ルールを登録するための FileResource メカニズムが追加されました。 一度登録されたリソースは、どのトークナイザーやフィルターからも参照可能となり、BM25、アナライザー、およびテキストマッチに適用されます。辞書や同義語は、アプリケーションコード全体に散在させるのではなく、バージョン管理を行い一元的に管理できるようになりました。</p>
<p>詳細については、「<a href="/docs/ja/manage-file-resources.md">ファイルリソースの管理</a>」を参照してください。</p>
<h4 id="Entity-TTL" class="common-anchor-header">エンティティの TTL</h4><p>コレクションレベルおよびパーティションレベルの TTL は、多くのライフサイクルおよびコンプライアンスのシナリオでは粗すぎます。同じコレクション内のテナントによって保存ルールが異なることが多く、個々のエンティティは、コレクションの他の部分とは異なるスケジュールで有効期限が切れる必要がある場合があります。</p>
<p>Milvus 3.0では、エンティティごとのTTLがサポートされています。スキーマ内で<code translate="no">TIMESTAMPTZ</code> フィールドを宣言し、コレクションのプロパティを通じてそれをTTLフィールドとして指定することで、Milvusは期限切れのエンティティを自動的に回収します。これにより、忘れられる権利（Right to be forgotten）に基づくリクエストへの対応、セッションデータの期限切れ処理、およびアプリケーション側でのクリーンアップを必要としない限定的な会話履歴の管理が可能になります。</p>
<p>詳細については、<a href="/docs/ja/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">「エンティティレベルのTTLの設定</a>」を参照してください。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6では、セットベースのニアダブリ検出のための<code translate="no">MINHASH_LSH</code> インデックスが追加されましたが、アプリケーションは依然として、データをMilvusに書き込む前にMinHash署名を計算する必要がありました。</p>
<p>Milvus 3.0 では、サーバーサイドの MinHash 関数が追加されました。スキーマで<code translate="no">VARCHAR</code> 入力フィールドと<code translate="no">BINARY_VECTOR</code> 出力フィールドを宣言し、<code translate="no">FunctionType.MINHASH</code> 関数をアタッチすると、Milvus は挿入、一括挿入、および検索中にシグネチャを計算します。<code translate="no">MINHASH_LSH</code> と組み合わせることで、Milvus 内での大規模データセットの重複排除ワークフロー、フィンガープリント、および盗用検出をサポートします。</p>
<p>詳細については、<a href="/docs/ja/minhash-function.md">MinHash関数を</a>参照してください。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>「1つのエンティティ＝1つのベクトル」という前提は、現代の検索にはもはや適合しません。長い文書は多くのチャンクに分割され、ColBERTのようなレイトインタラクションモデルはトークンごとに1つのベクトルを生成し、マルチモーダルエンティティは複数のビューを持つことがあります。</p>
<p>EmbListはエンティティごとに可変長ベクトルリストを格納し、<code translate="no">DISKANN</code> をディスク上のインデックスとして使用します。コーパスがメモリ予算を超過した場合でも、このディスクパスによりRAM使用量を抑えることができます。EmbList +<code translate="no">DISKANN</code> は、このRCにおける広範なStructListファミリーの最初のバリエーションです。 StructListのフィルタリングやMuvera / Lemurによるマルチベクトル高速化を含む、このファミリーの残りの機能は、公式の3.0リリースでの提供を予定しています。</p>
<p>詳細については、「<a href="/docs/ja/search-with-embedding-lists.md">Search with Embedding Lists</a>」を参照してください。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制マージ</h4><p>本番環境のワークロードでは、時間の経過とともにセグメントの断片化が蓄積され、クエリのレイテンシの変動やストレージの肥大化を引き起こします。</p>
<p>Milvus 3.0 では、ピーク時以外の時間帯に、同期モードおよび非同期モードの両方で、セグメントのコンパクションを明示的にトリガーする機能が追加されました。</p>
<p>詳細については、「<a href="/docs/ja/force-merge.md">Force Merge コンパクション</a>」を参照してください。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 では、データとメタデータが S3 互換のオブジェクトストレージ上に格納される、マニフェストベースのカラム型ストレージエンジンである Storage V3 が導入されました。各データセットのバージョンは、不変のマニフェストスナップショットとしてキャプチャされます。これは、どのカラムグループ、デルタログ、および統計情報がデータセットを構成しているかを記録した Avro エンコードのファイルです。</p>
<p>マニフェストはコンパクトなAvroファイルであり、デルタログはデータファイルを書き換えることなくエンティティレベルの削除を記録します。これにより、データセットが拡大してもメタデータのオーバーヘッドを小さく抑えることができます。また、マニフェストはメタデータの追跡をクエリパスから切り離すため、コレクションはクエリのパフォーマンスを低下させることなく、より多くのセグメントを管理できるようになります。</p>
<p>状態はオブジェクトストレージに保存されるため、データセットは自己記述的です。つまり、ストレージパスへのアクセス権を持つ任意のリーダーは、中央カタログを介さずにデータセットを発見し、解釈することができます。この特性は、External Collection、Snapshot、および将来のレイク統合の基盤となっています。</p>
