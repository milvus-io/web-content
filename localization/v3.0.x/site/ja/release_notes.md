---
id: release_notes.md
summary: Milvusリリースノート
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
    </button></h1><p>Milvusの新機能をご確認ください！このページでは、各リリースの新機能、改善点、既知の問題、バグ修正についてまとめています。定期的にこのページをご覧いただき、アップデート情報をご確認ください。</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0ベータ版<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
<tr><th>Milvusバージョン</th><th>Python SDKバージョン</th><th>Node.js SDKバージョン</th></tr>
</thead>
<tbody>
<tr><td>3.0ベータ</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-betaは、Milvusベクトルデータベースを拡張し、オープンレイクのエコシステムに新たに統合しました：External Collectionにより、Milvusは外部レイクテーブルをゼロコピーでクエリでき、SparkはSnapshotを通してMilvusコレクションを直接読み込むことができます。このリリースはまた、よりリッチな検索、より表現力豊かなスキーマ、より深いテキスト検索のカスタマイズ、より細かいデータとモデルのライフサイクル制御、より多くのオペレータ側の制御をもたらします。Milvus 3.0はZilliz Lakebaseのコア・カーネルであり、統合されたサービング、ディスカバリー、バッチの機能を提供します。</p>
<p>Milvus 3.0の詳細とコアメンテナとのAMAについてのウェビナーへの参加は下記をクリックしてください：</p>
<p><a href="https://zilliz.com/event/whats-new-in-milvus-3-0-beta">
  
   <span class="img-wrapper"> <img translate="no" src="https://assets.zilliz.com/webinar_3_0_4746da7c2d.png" alt="Webinar 3.0 walkthrough" class="doc-image" id="webinar-3.0-walkthrough" />
 </span>  <span class="img-wrapper"> <span>ウェビナー3.0ウォークスルー</span> </span></a></p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部コレクション</h4><p>一般的なAIデータパイプラインでは、何テラバイトものエンベッディングとメタデータがすでにParquet、Lance、Icebergテーブルとしてオブジェクトストレージ上に置かれています。そのデータをMilvusにコピーすると、ストレージコストが2倍になり、同期を維持しなければならないETLパイプラインが追加され、データガバナンスが顧客から遠ざかります。</p>
<p>外部コレクションはコピーを削除します。Milvusコレクションは、既に存在するファイルを参照することができ、Milvusはスキーマ、インデックス、クエリ実行のみを管理します。インクリメンタルリフレッシュにより、Collectionは基礎となるファイルと整合性を保ちます。財務やヘルスケアチームなど、データがレイクを離れることができない顧客は、そのデータに対してベクトル検索を実行することができます。1つのレイク常駐データセットを複数のMilvusインスタンスから同時に提供することも可能です。</p>
<p>詳細については、<a href="/docs/ja/create-an-external-collection.md">外部コレクションの</a>作成を参照してください。</p>
<h4 id="Snapshot" class="common-anchor-header">スナップショット</h4><p>サービングとバッチディスカバリは同時に同じコレクションを必要とすることがよくあります。A/Bモデル評価、大規模重複排除、バックフィル検証、およびバージョンロールバックはすべて、書き込みが行われている間、コレクションの安定したビューを必要とします。</p>
<p>スナップショットは、データをコピーする代わりに既存のセグメントを参照することで、コレクションのポイントインタイムの読み取り専用ビューを作成します。バッチジョブは、MVCCスタイルの分離の下でスナップショットから読み取ることができますが、ライブのCollectionは書き込みを受け付け続けます。</p>
<p>詳細については、<a href="/docs/ja/snapshots.md">スナップショット</a>、<a href="/docs/ja/manage-snapshots.md">スナップショットの管理</a>、および<a href="/docs/ja/snapshot-use-cases.md">スナップショットの使用</a>例を参照してください。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">クエリ/検索 Order By</h4><p>Milvusカーネルにソートがプッシュダウンされ、<code translate="no">ASC</code> /<code translate="no">DESC</code> 、フィールド毎に設定可能です。これは一般的な生産ギャップを埋めるものです：最も類似したアイテムが最も安く、最も新しく、最も人気があるわけではない場合、距離によるトップKだけではビジネスニーズにマッチしないことがよくあります。</p>
<p>アプリケーションは、複合ランキングを表現するために、結果をオーバーフェッチしたり、クライアント上で再ソートしたりする必要がなくなります。</p>
<p>詳細については、<a href="/docs/ja/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">スカラー・フィールドによる検索結果の並べ替えおよび</a> <a href="/docs/ja/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">クエリ結果の並べ替えを</a>参照してください。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">クエリー集計</h4><p>Milvusコレクションからテナント分布の統計、フィールドの完全性カウント、またはバージョン展開の進捗を生成するには、一致するエンティティをクライアントにプルバックし、そこで集計する必要がありました。Milvus 3.0はSQLスタイルのスカラー集約をカーネルにプッシュします。クエリコールは<code translate="no">group_by_fields</code> 、<code translate="no">count(*)</code> 、<code translate="no">count(&lt;field&gt;)</code> 、<code translate="no">sum(&lt;field&gt;)</code> 、<code translate="no">avg(&lt;field&gt;)</code> 、<code translate="no">min(&lt;field&gt;)</code> 、<code translate="no">max(&lt;field&gt;)</code> を含む<code translate="no">output_fields</code> の集約式を受け付けます。集約は、フィルタリング後にサーバーサイドで評価される。</p>
<p>詳細については、「<a href="/docs/ja/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">クエリ結果の集約</a>」を参照してください。</p>
<h4 id="Null-Vector" class="common-anchor-header">Nullベクトル</h4><p>エンベッディングは多くの場合非同期に生成されるため、エンティティのベクトルが先に到着することがあります。マルチモーダルなデータには、キャプションのないビデオや画像のない製品など、自然なギャップもあります。以前のバージョンでは、ベクターの準備ができるまで書き込みを遅らせるか、プレースホルダーベクターで埋めるかのどちらかしかありませんでした。</p>
<p>Milvus3.0は6つのベクトルタイプすべてにおいてベクトルフィールドのNULLをサポートしています。検索はNULLベクターを自動的にスキップし、検索品質は影響を受けず、NULLベクターは実質的にストレージを必要としません。<code translate="no">AddField</code> 、この変更によりベクターフィールドも拡張されました。<code translate="no">nullable=True</code> 、既存のコレクションは再構築することなく、新しいベクターフィールドをオンラインで成長させることができます。</p>
<p>詳しくは<a href="/docs/ja/nullable-and-default.md">Nullable Fields</a> を参照してください。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">カスタム辞書と同義語辞書</h4><p>既製のトークナイザーは、必ずしも本番の検索品質要件を満たしているとは限りません。中国語、医学、法律、化学のような垂直ドメイン、多言語コーパスは、カスタム辞書と同義語テーブルから大きな恩恵を受けることができます。これまでは、これらのリソースはアプリケーション側のクエリ書き換えとして使用されることがほとんどでした。</p>
<p>Milvus 3.0では、カスタムトークナイザ辞書、同義語リスト、ストップワードリスト、デコンパウンダルールを登録するためのFileResourceメカニズムが追加されました。一度登録されたリソースは、どのトークナイザーやフィルターからも参照することができ、BM25、アナライザー、Text Matchに反映されます。辞書と類義語は、アプリケーション・コードに散らばっていたものを、一元的にバージョン管理・管理できるようになりました。</p>
<p>詳細については、「<a href="/docs/ja/manage-file-resources.md">ファイル・リソースの管理</a>」を参照してください。</p>
<h4 id="Entity-TTL" class="common-anchor-header">エンティティTTL</h4><p>コレクションレベルおよびパーティションレベルのTTLは、多くのライフサイクルおよびコンプライアンスシナリオでは粗すぎます。同じCollection内の異なるテナントには異なる保持ルールがあることが多く、個々のエンティティはCollectionの他の部分と一致しないスケジュールで期限切れにする必要がある場合があります。</p>
<p>Milvus 3.0はエンティティごとのTTLをサポートしています。スキーマで<code translate="no">TIMESTAMPTZ</code> フィールドを宣言し、コレクションプロパティでTTLフィールドとしてマークすると、Milvusは自動的に期限切れのエンティティを再生します。これにより、アプリケーション側でクリーンアップすることなく、right-to-be-forgottenリクエスト、期限切れセッションデータ、および制限付き会話履歴をカバーします。</p>
<p>詳細については、「<a href="/docs/ja/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">エンティティレベルのTTLを設定する</a>」を参照してください。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus2.6では、<code translate="no">MINHASH_LSH</code> インデックスが追加され、セットベースの重複検出が可能になりましたが、アプリケーションはMilvusにデータを書き込む前にMinHashシグネチャを計算する必要がありました。</p>
<p>Milvus 3.0ではサーバサイドのMinHash関数が追加されました。スキーマに<code translate="no">VARCHAR</code> 入力フィールドと<code translate="no">BINARY_VECTOR</code> 出力フィールドを宣言し、<code translate="no">FunctionType.MINHASH</code> 関数をアタッチすると、Milvusは挿入、一括挿入、検索時に署名を計算します。<code translate="no">MINHASH_LSH</code> と共に、Milvus内部で大規模データセットの重複排除ワークフロー、フィンガープリンティング、剽窃検知をサポートします。</p>
<p>詳細は<a href="/docs/ja/minhash-function.md">MinHash Functionを</a>参照。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>1つのエンティティ＝1つのベクトル」という仮定は、もはや現代の検索には当てはまりません。長い文書は多くのチャンクに分割され、ColBERTのような後発のインタラクションモデルはトークンごとに1つのベクトルを生成し、マルチモーダルなエンティティは複数のビューを持つことができる。</p>
<p>EmbListは、<code translate="no">DISKANN</code> をディスク上のインデックスとして、エンティティごとに可変長のベクトルリストを格納する。ディスクパスは、コーパスがメモリバジェットを超えたときにRAMの使用量を抑制する。EmbList +<code translate="no">DISKANN</code> は、このRCではより広範なStructListファミリーの最初のバリエーションである。StructList フィルタリングと Muvera / Lemur マルチベクトルアクセラレーションを含む残りのファミリーは、正式な 3.0 リリースを目標にしています。</p>
<p>詳細については、<a href="/docs/ja/search-with-embedding-lists.md">埋め込みリストによる検索を</a>参照してください。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制マージ</h4><p>実運用ワークロードでは、時間の経過とともにセグメントの断片化が蓄積され、クエリーレイテンシーのジッターやストレージの膨張を引き起こします。</p>
<p>Milvus 3.0では、同期モードと非同期モードの両方で、オフピーク時にセグメント圧縮を明示的にトリガーする機能が追加されました。</p>
<p>詳細は<a href="/docs/ja/force-merge.md">Force Merge Compactionを</a>参照。</p>
<h4 id="Storage-V3" class="common-anchor-header">ストレージ V3</h4><p>Milvus3.0では、データとメタデータがS3互換のオブジェクトストレージ上に存在する、マニフェストベースのカラム型ストレージエンジンであるStorage V3が導入されました。各データセットのバージョンは、データセットを構成するカラムグループ、デルタログ、および統計情報を記録するAvroエンコードされたファイルである、不変のマニフェストスナップショットとしてキャプチャされます。</p>
<p>マニフェストはコンパクトな Avro ファイルであり、デルタログはデータファイルを書き換えることなくエンティティレベルの削除を記録します。これにより、データセットが大きくなってもメタデータのオーバーヘッドを小さく保つことができます。マニフェストはまた、メタデータの追跡をクエリ・パスから切り離し、コレクションがクエリ・パフォーマンスを低下させることなく、より多くのセグメントを管理できるようにします。</p>
<p>ステートはオブジェクト・ストレージに格納されるため、データセットは自己記述的です。ストレージ・パスにアクセスできるリーダーであれば、中央カタログを使用せずにそれを発見し、解釈することができます。この特性は、External Collection、Snapshot、および将来のレイクの統合を支えるものです。</p>
