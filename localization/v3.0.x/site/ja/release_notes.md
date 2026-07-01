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
<p>Milvus v3.0-beta は、Milvus がベクトルデータベースからセマンティックネイティブのレイクエンジンへと移行する第一歩となります。Milvus カーネルは、オープンレイク形式のデータを直接処理できるようになり、検索、スキーマ、ライフサイクル、言語、操作といった Milvus のコア機能が拡張されました。</p>
<p>レイク側における主な新機能として、「External Collection」と「Snapshot」が挙げられます。このカーネルは、Milvus 3.0 を基盤とするセマンティックネイティブのデータプラットフォームである Zilliz Lakebase にも採用されています。</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部コレクション</h4><p>一般的なAIデータパイプラインでは、テラバイト規模の埋め込みデータやメタデータが、Parquet、Lance、またはIcebergテーブルとしてすでにオブジェクトストレージ上に格納されています。そのデータをMilvusにコピーすると、ストレージコストが2倍になり、同期を維持しなければならないETLパイプラインが追加され、データガバナンスの主導権が顧客から離れてしまいます。</p>
<p>外部コレクション機能により、このコピー作業が不要になります。Milvusコレクションは、データがすでに格納されている場所にあるファイルを参照でき、Milvusが管理するのはスキーマ、インデックス、およびクエリの実行のみです。 増分更新により、コレクションは基となるファイルと常に同期が保たれます。金融や医療などのチームのように、データをデータレイクから持ち出せないお客様でも、データが格納されている場所のままベクトル検索を実行できます。また、データレイクに格納された単一のデータセットを、複数のMilvusインスタンスから同時に提供することも可能です。</p>
<p>詳細については、「<a href="/docs/ja/create-an-external-collection.md">外部コレクションの作成</a>」を参照してください。</p>
<h4 id="Snapshot" class="common-anchor-header">スナップショット</h4><p>サービングとバッチディスカバリーでは、多くの場合、同じコレクションを同時に必要とします。A/Bモデル評価、大規模な重複排除、バックフィル検証、バージョンのロールバックなどはすべて、書き込みが継続している間もコレクションの安定したビューを必要とします。</p>
<p>スナップショットは、データをコピーするのではなく既存のセグメントを参照することで、コレクションの特定の時点における読み取り専用のビューを作成するため、追加のストレージコストはほぼゼロです。ライブのコレクションが書き込みを受け付け続けている間も、バッチジョブはMVCC方式の隔離環境下でスナップショットから読み取りを行うことができます。</p>
<p>詳細については、「<a href="/docs/ja/snapshots.md">スナップショット</a>」、<a href="/docs/ja/manage-snapshots.md">「スナップショットの管理」</a>、「<a href="/docs/ja/snapshot-use-cases.md">スナップショットのユースケース</a>」を参照してください。</p>
<h4 id="External-Backfill" class="common-anchor-header">外部バックフィル</h4><p>既存のコレクション上で、v1 エンベディングから v2 エンベディングへの移行など、エンベディングモデルのアップグレードを行う場合、以前はゼロから再構築する必要がありました。そのため、サービスのダウンタイムが発生するか、アプリケーション側でデュアル書き込みロジックを実装する必要がありました。</p>
<p>Milvus 3.0 では、このアップグレードをホットワークフローとしてサポートしています。`<code translate="no">AddCollectionField</code>` を使用して新しいベクトルフィールドを追加し、スナップショットを使用して一貫性のある開始点を固定し、スナップショットに対してオフラインで埋め込みジョブを実行し、通常の取り込みパスを通じて値を書き戻すことができます。新しいフィールドがオンラインでインデックス登録された後、アプリケーションはダウンタイムなしで切り替えることができます。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">クエリ／検索の並べ替え</h4><p>検索およびクエリでは、マルチフィールドによる並べ替えが可能になりました。ソート処理はMilvusカーネル側で実行され、<code translate="no">ASC</code> および<code translate="no">DESC</code> はフィールドごとに設定可能です。これにより、本番環境における一般的な課題が解消されます。距離のみに基づくTop-Kランキングでは、最も類似したアイテムが必ずしも最も安価、最新、または人気のあるものではない場合、ビジネスニーズに合致しないことが多々ありました。</p>
<p>アプリケーションは、複合的なランキングを表現するために、結果を過剰に取得してクライアント側で再ソートを行う必要がなくなりました。</p>
<p>詳細については、「<a href="/docs/ja/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">スカラーフィールドによる検索結果のソート</a>」および「<a href="/docs/ja/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">クエリ結果のソート</a>」を参照してください。</p>
<h4 id="Null-Vector" class="common-anchor-header">Nullベクトル</h4><p>エンベディングは非同期で生成されることが多いため、エンティティがベクトルよりも先に到着することがあります。 マルチモーダルデータにも、キャプションのない動画や画像のない商品など、自然なギャップが存在します。以前のバージョンには適切な解決策がなく、アプリケーションはベクトルの準備が整うまで書き込みを遅らせるか、プレースホルダーのベクトルを埋めるかのいずれかを選択せざるを得ず、どちらの選択肢も検索品質を低下させていました。</p>
<p>Milvus 3.0 では、6 種類のベクトル型すべてにおいて、ベクトルフィールドの NULL をサポートしています。検索では NULL ベクトルが自動的にスキップされるため、検索品質に影響はなく、NULL ベクトルは実質的にストレージを消費しません。この変更に伴い、<code translate="no">AddField</code> もベクトルフィールドに拡張されました。<code translate="no">nullable=True</code> を使用すると、既存のコレクションを再構築することなく、オンラインで新しいベクトルフィールドを追加できます。</p>
<p>詳細については、「<a href="/docs/ja/nullable-and-default.md">Nullable Fields</a>」を参照してください。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">カスタム辞書および同義語辞書</h4><p>標準のトークナイザーでは、本番環境の検索品質要件を常に満たせるわけではありません。中国語、医学、法律、化学などの専門分野、および多言語コーパスでは、カスタム辞書や同義語テーブルを活用することで大幅な改善が期待できます。これまで、これらのリソースは主にアプリケーション側でのクエリ書き換えとして実装されていました。</p>
<p>Milvus 3.0 では、カスタム トークナイザー辞書、同義語リスト、ストップワードリスト、および複合語分解ルールを登録するための FileResource メカニズムが追加されました。 一度登録されたリソースは、どのトークナイザーやフィルターからも参照可能となり、BM25、アナライザー、およびテキストマッチで有効になります。辞書や同義語は、アプリケーションコード全体に散在させるのではなく、バージョン管理を行い、一元的に管理できるようになりました。</p>
<p>詳細については、「<a href="/docs/ja/manage-file-resources.md">ファイルリソースの管理</a>」を参照してください。</p>
<h4 id="Entity-TTL" class="common-anchor-header">エンティティの TTL</h4><p>コレクションレベルおよびパーティションレベルの TTL は、多くのライフサイクルやコンプライアンスのシナリオでは粗すぎます。同じコレクション内のテナントによって保存ルールが異なることが多く、個々のエンティティは、コレクションの他の部分とは異なるスケジュールで有効期限が切れる必要がある場合があります。</p>
<p>Milvus 3.0では、エンティティごとのTTLがサポートされています。スキーマ内で<code translate="no">TIMESTAMPTZ</code> フィールドを宣言し、コレクションのプロパティを通じてそれをTTLフィールドとして指定すると、Milvusは有効期限が切れたエンティティを自動的に回収します。これにより、忘れられる権利（Right to be forgotten）に基づく要求への対応、セッションデータの有効期限切れ処理、およびアプリケーション側でのクリーンアップを必要としない限定的な会話履歴の管理が可能になります。</p>
<p>詳細については、<a href="/docs/ja/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">「エンティティレベルのTTLの設定</a>」を参照してください。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6では、セットベースの近似重複検出のための<code translate="no">MINHASH_LSH</code> インデックスが追加されましたが、アプリケーションは依然として、データをMilvusに書き込む前にMinHash署名を計算する必要がありました。</p>
<p>Milvus 3.0 では、サーバーサイドの MinHash 関数が追加されました。スキーマで `<code translate="no">VARCHAR</code> ` 入力フィールドと `<code translate="no">BINARY_VECTOR</code> ` 出力フィールドを宣言し、<code translate="no">FunctionType.MINHASH</code> 関数をアタッチすると、Milvus は挿入、一括挿入、および検索の際にシグネチャを計算します。<code translate="no">MINHASH_LSH</code> と組み合わせることで、Milvus 内での大規模データセットの重複排除ワークフロー、フィンガープリント、および盗作検出をサポートします。</p>
<p>詳細については、「<a href="/docs/ja/minhash-function.md">MinHash関数</a>」を参照してください。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>「1つのエンティティ＝1つのベクトル」という仮定は、現代の検索にはもはや適合しません。長いドキュメントは多くのチャンクに分割され、ColBERTのようなレイトインタラクションモデルはトークンごとに1つのベクトルを生成し、マルチモーダルエンティティは複数のビューを持つことがあります。</p>
<p>EmbListは、エンティティごとに可変長のベクトルリストを格納し、<code translate="no">DISKANN</code> をディスク上のインデックスとして使用します。コーパスがメモリ容量の制限を超える場合、このディスクパスによりRAM使用量を抑制できます。EmbList +<code translate="no">DISKANN</code> は、今回のRCで導入される広範なStructListファミリーの最初のバリエーションです。 StructListのフィルタリングやMuvera／Lemurによるマルチベクトル高速化を含む、このファミリーの残りの機能は、公式の3.0リリースで提供される予定です。</p>
<p>詳細については、「<a href="/docs/ja/search-with-embedding-lists.md">Embedding Lists を使用した検索</a>」を参照してください。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制マージ</h4><p>本番環境のワークロードでは、時間の経過とともにセグメントの断片化が蓄積され、クエリのレイテンシの変動やストレージ容量の肥大化を引き起こします。</p>
<p>Milvus 3.0 では、ピーク時以外の時間帯に、同期モードおよび非同期モードの両方で、セグメントのコンパクションを明示的にトリガーする機能が追加されました。</p>
<p>詳細については、「<a href="/docs/ja/force-merge.md">Force Merge コンパクション</a>」を参照してください。</p>
