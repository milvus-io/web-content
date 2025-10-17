---
id: product_faq.md
summary: 世界で最も先進的なベクターデータベースに関するよくある質問の回答をご覧ください。
title: 製品に関するFAQ
---
<h1 id="Product-FAQ" class="common-anchor-header">製品に関するFAQ<button data-href="#Product-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-much-does-Milvus-cost" class="common-anchor-header">Milvusの価格はいくらですか？</h4><p>Milvusは100%無償のオープンソースプロジェクトです。</p>
<p>Milvusを使用する際は、<a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0を</a>遵守してください。</p>
<p>Milvusの開発元であるZilliz社では、分散インスタンスの構築や保守が不要なお客様向けに、完全マネージド型のクラウドプラットフォームも提供しております。<a href="https://zilliz.com/cloud">Zilliz Cloudは</a>データの信頼性を自動的に維持し、ユーザーは使用した分だけ支払うことができる。</p>
<h4 id="Does-Milvus-support-non-x86-architectures" class="common-anchor-header">Milvusはx86以外のアーキテクチャに対応していますか？</h4><p>Milvusはx86以外のプラットフォームにはインストール、実行できません。</p>
<p>Milvusを実行するには、CPUが以下の命令セットのいずれかをサポートしている必要があります: SSE4.2、AVX、AVX2、AVX512。これらはすべてx86専用のSIMD命令セットです。</p>
<h4 id="Where-does-Milvus-store-data" class="common-anchor-header">Milvusはどこにデータを格納するのですか？</h4><p>Milvusでは、挿入データとメタデータの2種類のデータを扱います。</p>
<p>ベクターデータ、スカラーデータ、コレクション固有のスキーマを含む挿入データは、インクリメンタルログとして永続ストレージに保存されます。Milvusは、<a href="https://min.io/">MinIO</a>、<a href="https://aws.amazon.com/s3/?nc1=h_ls">AWS S3</a>、<a href="https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes">Google Cloud Storage</a>(GCS)、<a href="https://azure.microsoft.com/en-us/products/storage/blobs">Azure Blob Storage</a>、<a href="https://www.alibabacloud.com/product/object-storage-service">Alibaba Cloud OSS</a>、<a href="https://www.tencentcloud.com/products/cos">Tencent Cloud Object Storage</a>(COS)など、複数のオブジェクトストレージバックエンドをサポートしています。</p>
<p>メタデータはMilvus内で生成されます。Milvusモジュールはそれぞれ独自のメタデータを持ち、etcdに保存されます。</p>
<h4 id="Why-is-there-no-vector-data-in-etcd" class="common-anchor-header">なぜetcdにはベクターデータがないのか？</h4><p>etcdにはMilvusモジュールのメタデータが格納され、MinIOにはエンティティが格納されます。</p>
<h4 id="Does-Milvus-support-inserting-and-searching-data-simultaneously" class="common-anchor-header">Milvusはデータの挿入と検索を同時にサポートしていますか？</h4><p>挿入操作と検索操作は、互いに独立した2つのモジュールによって処理されます。クライアントから見ると、挿入されたデータがメッセージキューに入った時点で挿入操作は完了します。しかし、挿入されたデータはクエリーノードにロードされるまで検索できません。インクリメンタルデータを含む成長セグメントでは、Milvusはセグメントサイズがインデックス構築のしきい値（<code translate="no">dataCoord.segment.maxSize</code> ×<code translate="no">dataCoord.segment.sealProportion</code> として計算される）に達しない場合でも、効率的な検索性能を確保するために自動的に中間インデックスを構築する。この動作は<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L440">Milvus設定</a>ファイルの設定パラメータ<code translate="no">queryNode.segcore.interimIndex.enableIndex</code> で制御することができます。<code translate="no">true</code> に設定すると暫定インデックスが有効になり（デフォルト）、<code translate="no">false</code> に設定すると無効になります。</p>
<h4 id="Can-vectors-with-duplicate-primary-keys-be-inserted-into-Milvus" class="common-anchor-header">主キーが重複しているベクタをMilvusに挿入することはできますか。</h4><p>はい。Milvusはベクターの主キーが重複しているかどうかをチェックしません。</p>
<h4 id="When-vectors-with-duplicate-primary-keys-are-inserted-does-Milvus-treat-it-as-an-update-operation" class="common-anchor-header">主キーが重複しているベクターが挿入された場合、Milvusはそれを更新操作として扱いますか?</h4><p>いいえ。Milvusは現在更新操作に対応しておらず、エンティティの主キーが重複しているかどうかのチェックも行っていません。エンティティの主キーが一意であることを確認するのはお客様の責任であり、そうでない場合、Milvusには主キーが重複した複数のエンティティが含まれる可能性があります。</p>
<p>このような場合、クエリ時にどのデータコピーが返されるかは未知のままです。この制限は将来のリリースで修正される予定です。</p>
<h4 id="What-is-the-maximum-length-of-self-defined-entity-primary-keys" class="common-anchor-header">自分で定義したエンティティの主キーの最大長は?</h4><p>エンティティ主キーは非負の64ビット整数でなければなりません。</p>
<h4 id="What-is-the-maximum-amount-of-data-that-can-be-added-per-insert-operation" class="common-anchor-header">1回の挿入操作で追加できるデータ量の上限は?</h4><p>挿入操作のサイズは1,024 MBを超えてはなりません。これはgRPCによる制限です。</p>
<h4 id="Does-collection-size-impact-query-performance-when-searching-in-a-specific-partition" class="common-anchor-header">特定のパーティションで検索する場合、コレクション・サイズはクエリ・パフォーマンスに影響しますか?</h4><p>いいえ。検索用のパーティションが指定されている場合、Milvusは指定されたパーティションのみを検索します。</p>
<h4 id="Does-Milvus-need-to-load-the-entire-collection-when-partitions-are-specified-for-a-search" class="common-anchor-header">検索にパーティションを指定した場合、Milvusはコレクション全体を読み込む必要がありますか?</h4><p>検索に必要なデータによって異なります。検索結果に表示される可能性のあるパーティションは、検索前にすべて読み込む必要があります。</p>
<ul>
<li>たとえば、特定のパーティションだけを検索したい場合は、すべてをロードする必要はありません。<code translate="no">load_partition()</code> を呼び出して目的のパーティションをロード<em>し、</em> <code translate="no">search()</code> メソッド呼び出しでパーティションを指定します。</li>
<li>すべてのパーティションを検索したい場合は、<code translate="no">load_collection()</code> を呼び出して、すべてのパーティションを含むコレクション全体をロードします。</li>
<li>検索前にコレクションまたは特定のパーティションをロードしなかった場合、Milvusはエラーを返します。</li>
</ul>
<h4 id="Can-indexes-be-created-after-inserting-vectors" class="common-anchor-header">ベクター挿入後にインデックスを作成することはできますか?</h4><p>Milvusは、以前<code translate="no">create_index()</code> 、コレクションに対してインデックスを作成したことがある場合、その後に挿入されたベクターに対しても自動的にインデックスを作成します。ただし、Milvusは、新しく挿入されたベクターがセグメント全体を満たし、新しく作成されたインデックスファイルが以前のものから分離されるまで、インデックスを作成しません。</p>
<h4 id="How-are-the-FLAT-and-IVFFLAT-indexes-different" class="common-anchor-header">FLATインデックスとIVF_FLATインデックスの違いは何ですか？</h4><p>IVF_FLATインデックスはベクター空間をリスト・クラスターに分割します。デフォルトのリスト値16,384の場合、Milvusはターゲットベクトルと16,384クラスタすべてのセントロイド間の距離を比較し、最も近いクラスタを返します。その後、Milvusはターゲットベクトルと選択されたクラスタ内のベクトルとの距離を比較し、最近接ベクトルを取得します。IVF_FLATとは異なり、FLATはターゲットベクトルと他のすべてのベクトルとの距離を直接比較します。</p>
<p>ベクトルの総数がnlistにほぼ等しい場合、IVF_FLATとFLATの間には計算要件と探索性能の点でほとんど差がありません。しかし、ベクトル数が nlist の 2 倍以上になると、IVF_FLAT の方が性能面で有利になります。</p>
<p>詳細は<a href="/docs/ja/index.md">ベクターインデックスを</a>参照してください。</p>
<h4 id="How-does-Milvus-flush-data" class="common-anchor-header">Milvusはどのようにデータをフラッシュするのですか？</h4><p>挿入されたデータがメッセージキューに取り込まれると、Milvusは成功を返します。しかし、データはまだディスクにフラッシュされていません。その後、Milvusのデータノードがメッセージキュー内のデータをインクリメンタルログとして永続ストレージに書き込みます。<code translate="no">flush()</code> が呼び出された場合、データノードはメッセージキュー内の全データを直ちに永続ストレージに書き込むよう強制される。</p>
<h4 id="What-is-normalization-Why-is-normalization-needed" class="common-anchor-header">正規化とは何ですか？なぜ正規化が必要なのですか？</h4><p>正規化とは、ノルムが1になるようにベクトルを変換する処理のことです。ベクトルの類似度を計算するために内積を使用する場合、ベクトルは正規化されなければなりません。正規化後、内積は余弦類似度に等しくなります。</p>
<p>詳しくは<a href="https://en.wikipedia.org/wiki/Unit_vector">ウィキペディアを</a>参照。</p>
<h4 id="Why-do-Euclidean-distance-L2-and-inner-product-IP-return-different-results" class="common-anchor-header">なぜユークリッド距離 (L2) と内積 (IP) は異なる結果を返すのですか？</h4><p>正規化されたベクトルでは、ユークリッド距離 (L2) は内積 (IP) と数学的に等価です。これらの類似度メトリクスが異なる結果を返す場合、ベクトルが正規化されているかどうかを確認してください。</p>
<h4 id="Is-there-a-limit-to-the-total-number-of-collections-and-partitions-in-Milvus" class="common-anchor-header">Milvusのコレクションとパーティションの総数に制限はありますか？</h4><p>Milvusインスタンスでは65,535コレクションまで作成することができます。既存のコレクション数を計算する際、Milvusはシャードとパーティションを含むすべてのコレクションをカウントします。</p>
<p>例えば、既に100のコレクションを作成し、そのうち60に2シャードと4パーティション、残りの40に1シャードと12パーティションを作成したとします。現在のコレクション数は次のように計算できます：</p>
<pre><code translate="no">60 * 2 * 4 + 40 * 1 * 12 = 960
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-do-I-get-fewer-than-k-vectors-when-searching-for-topk-vectors" class="common-anchor-header"><code translate="no">topk</code> ベクトルを検索すると、なぜk個以下のベクトルしか得られないのですか？</h4><p>Milvusがサポートしているインデックスのうち、IVF_FLATとIVF_SQ8はk-meansクラスタリング法を実装しています。データ空間は<code translate="no">nlist</code> クラスタに分割され、挿入されたベクトルはこれらのクラスタに分配されます。そしてmilvusは<code translate="no">nprobe</code> 最も近いクラスタを選択し、ターゲットベクトルと選択されたクラスタ内のすべてのベクトルとの距離を比較して最終結果を返す。</p>
<p><code translate="no">nlist</code> と<code translate="no">topk</code> が大きく、nprobe が小さい場合、nprobe クラスタ内のベクトル数が<code translate="no">k</code> より少なくなることがあります。そのため、<code translate="no">topk</code> に最も近いベクトルを検索すると、返されるベクトル数が<code translate="no">k</code> より少なくなります。</p>
<p>これを避けるには、<code translate="no">nprobe</code> を大きく、<code translate="no">nlist</code> と<code translate="no">k</code> を小さく設定してみてください。</p>
<p>詳しくは<a href="/docs/ja/index.md">ベクトル・インデックス</a>をご覧ください。</p>
<h4 id="What-is-the-maximum-vector-dimension-supported-in-Milvus" class="common-anchor-header">Milvusでサポートされている最大ベクトル次元は?</h4><p>Milvusはデフォルトで32,768次元までのベクターを管理できます。<code translate="no">Proxy.maxDimension</code> の値を大きくすることで、より大きな次元のベクトルを扱うことができます。</p>
<h4 id="Does-Milvus-support-Apple-M1-CPU" class="common-anchor-header">MilvusはApple M1 CPUをサポートしていますか？</h4><p>現在のMilvusはApple M1 CPUを直接サポートしておりません。Milvus 2.3以降では、ARM64アーキテクチャ用のDockerイメージが提供されます。</p>
<h4 id="What-data-types-does-Milvus-support-on-the-primary-key-field" class="common-anchor-header">Milvusはプライマリキーフィールドでどのようなデータタイプをサポートしていますか？</h4><p>現在のリリースでは、MilvusはINT64と文字列の両方をサポートしています。</p>
<h4 id="Is-Milvus-scalable" class="common-anchor-header">Milvusはスケーラブルですか？</h4><p>Kubernetes上のHelm Chartを利用することで、複数ノードのMilvusクラスタをデプロイすることができます。詳しくは<a href="/docs/ja/scaleout.md">スケールガイドを</a>ご参照ください。</p>
<h4 id="What-are-growing-segment-and-sealed-segment" class="common-anchor-header">growing segmentとsealed segmentとは何ですか？</h4><p>Milvusは検索要求が来ると、インクリメンタルデータとヒストリカルデータの両方を検索します。増分データは最近更新されたデータで、オブジェクトストレージに永続化される閾値に達する前にメモリにバッファリングされ、より効率的なインデックスが構築される成長セグメントに保存されます。一方、履歴データは少し前に更新されたもので、オブジェクト・ストレージに永続化される前にメモリ上にバッファリングされる。インクリメンタルデータとヒストリカルデータは一緒に検索用のデータセット全体を構成する。この設計により、Milvusに取り込まれたデータは即座に検索可能となる。Milvus Distributedの場合、インジェストされたばかりのレコードがいつ検索結果に表示されるかは、より複雑な要因によって決定される。その詳細については<a href="https://milvus.io/docs/consistency.md">一貫性レベルを</a>ご覧ください。</p>
<h4 id="Is-Milvus-available-for-concurrent-search" class="common-anchor-header">Milvusは同時検索に対応していますか？</h4><p>はい。Milvusは、同じコレクションに対するクエリの場合、インクリメンタルデータと履歴データを同時に検索します。ただし、異なるコレクションに対するクエリは直列に行われます。履歴データは非常に巨大なデータセットになる可能性がありますが、履歴データに対する検索は比較的時間がかかり、基本的に直列に実行されます。</p>
<h4 id="Why-does-the-data-in-MinIO-remain-after-the-corresponding-collection-is-dropped" class="common-anchor-header">対応するコレクションが削除された後も、MinIOのデータが残るのはなぜですか？</h4><p>MinIOのデータは、データのロールバックの便宜のため、一定期間残るように設計されています。</p>
<h4 id="Does-Milvus-support-message-engines-other-than-Pulsar" class="common-anchor-header">MilvusはPulsar以外のメッセージ・エンジンをサポートしていますか？</h4><p>はい。Milvus 2.1.0ではKafkaがサポートされています。</p>
<h4 id="Whats-the-difference-between-a-search-and-a-query" class="common-anchor-header">検索とクエリの違いは何ですか？</h4><p>Milvusでは、ベクトル類似度検索は類似度計算とベクトル・インデックス加速に基づいてベクトルを検索します。ベクトル類似性検索とは異なり、ベクトル検索はブーリアン式に基づくスカラーフィルタリングによってベクトルを検索します。ブーリアン式はスカラーフィールドまたは主キーフィールドをフィルタリングし、フィルタに一致するすべての結果を取得します。クエリでは、類似度メトリクスもベクトル・インデックスも関与しません。</p>
<h4 id="Why-does-a-float-vector-value-have-a-precision-of-7-decimal-digits-in-Milvus" class="common-anchor-header">なぜmilvusではfloatベクトル値の精度が小数点以下7桁なのですか？</h4><p>MilvusはベクトルをFloat32配列として格納することをサポートしています。Float32の値の精度は小数点以下7桁です。1.3476964684980388のようなFloat64の値であっても、Milvusは1.347696として格納します。したがって、このようなベクトルをMilvusから取り出すと、Float64の値の精度は失われてしまいます。</p>
<h4 id="How-does-Milvus-handle-vector-data-types-and-precision" class="common-anchor-header">Milvusではベクトルのデータ型と精度をどのように扱っているのですか？</h4><p>MilvusはBinary、Float32、Float16、BFloat16のベクトル型をサポートしています。</p>
<ul>
<li>バイナリベクタ：0と1のシーケンスとしてバイナリデータを格納し、画像処理や情報検索に使用されます。</li>
<li>Float32ベクトル：10進数約7桁の精度で格納される。Float64の値もFloat32の精度で格納されるため、検索時に精度が低下する可能性がある。</li>
<li>Float16 および BFloat16 ベクタ：精度とメモリ使用量が低減されている。Float16は帯域幅とストレージが限られたアプリケーションに適しており、BFloat16は範囲と効率のバランスが取れており、精度に大きな影響を与えることなく計算量を減らすためにディープラーニングでよく使用されます。</li>
</ul>
<h4 id="Does-Milvus-support-specifying-default-values-for-scalar-or-vector-fields" class="common-anchor-header">Milvusはスカラーフィールドやベクトルフィールドのデフォルト値の指定に対応していますか？</h4><p>現在のところ、Milvus 2.4.xではスカラーフィールドやベクトルフィールドのデフォルト値を指定することはできません。この機能は将来のリリースを予定しています。</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">Milvusでデータを削除した後、すぐに保存領域は解放されますか？</h4><p>いいえ。Milvusでデータを削除しても、すぐにストレージ領域が解放されるわけではありません。データを削除するとエンティティは「論理的に削除された」ことになりますが、実際の容量はすぐに解放されない場合があります。その理由は以下の通りです：</p>
<ul>
<li><strong>コンパクション</strong>：Milvusはバックグラウンドで自動的にデータを圧縮します。このプロセスは、より小さなデータセグメントをより大きなデータセグメントに統合し、論理的に削除されたデータ（削除マークが付けられたエンティティ）またはTTL（Time-To-Live）を超えたデータを削除します。ただし、コンパクションは新しいセグメントを作成する一方で、古いセグメントには "Dropped "というマークを付ける。</li>
<li><strong>ガベージコレクション</strong>：ガベージコレクション (GC) と呼ばれる別プロセスが、定期的に "Dropped" セグメントを削除する。これにより、ストレージの効率的な使用が保証されますが、削除とスペースの再利用の間に若干の遅延が生じる可能性があります。</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">挿入、削除、またはアップサートされたデータを、フラッシュを待たずに操作直後に見ることはできますか？</h4><p>Milvusでは、ストレージとコンピュートの分離アーキテクチャを採用しているため、データの可視性はフラッシュ操作に直接関係しません。一貫性レベルを使用してデータの可読性を管理することができます。</p>
<p>一貫性レベルを選択する際には、一貫性とパフォーマンスのトレードオフを考慮してください。即時の可視性が必要な操作には、"Strong "一貫性レベルを使用する。書き込みを高速に行うには、一貫性を弱くすることを優先する（データはすぐには見えないかもしれない）。詳細については、「<a href="/docs/ja/consistency.md">一貫性</a>」を参照してください。</p>
<h4 id="After-enabling-the-partition-key-feature-what-is-the-default-value-of-numpartitions-in-Milvus-and-why" class="common-anchor-header">パーティション・キー機能を有効にした後、milvusのデフォルト値<code translate="no">num_partitions</code> 。</h4><p>パーティションキー機能を有効にすると、Milvusの<code translate="no">num_partitions</code> のデフォルト値は<code translate="no">16</code> に設定されます。このデフォルト値は安定性とパフォーマンス上の理由から選択されています。<code translate="no">create_collection</code> 関数で指定することにより、必要に応じて<code translate="no">num_partitions</code> の値を調整することができます。</p>
<h4 id="Is-there-a-maximum-length-limit-for-scalar-filtering-expressions" class="common-anchor-header">スカラーフィルタリング式の長さの上限はありますか？</h4><p>はい、スカラー・フィルタリング式の最大長は、<code translate="no">milvus.yaml</code> 設定ファイルで定義される RPC 転送制限によって制約されます。具体的には、この制限はプロキシ・セクションの<code translate="no">serverMaxRecvSize</code> パラメータによって設定されます：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">serverMaxRecvSize:</span> <span class="hljs-number">67108864</span> <span class="hljs-comment"># The maximum size of each RPC request that the proxy can receive, unit: byte</span>
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトでは、各 RPC リクエストの最大サイズは 64MB です。したがって、フィルタリング式の長さがこの制限値以下でないと正常に処理できません。</p>
<h4 id="When-performing-a-bulk-vector-search-how-many-vectors-can-be-specified-at-once-Is-there-a-limit" class="common-anchor-header">一括ベクトル検索を実行する場合、一度に指定できるベクトルの数はいくつですか?制限はありますか?</h4><p>はい。一括ベクター検索で指定できるベクターの数は、<code translate="no">milvus.yaml</code> 設定ファイルで定義されている RPC 転送サイズによって制限されます。この制限は、proxy セクションの<code translate="no">serverMaxRecvSize</code> パラメータによって決定されます：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">serverMaxRecvSize:</span> <span class="hljs-number">67108864</span> <span class="hljs-comment"># The maximum size of each RPC request that the proxy can receive, unit: byte</span>
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトでは、各 RPC 要求の最大サイズは 64MB です。したがって、入力ベクターの次元データとメタデータを含む合計サイズは、正常に実行するためにこの制限を下回る必要があります。</p>
<h4 id="How-can-I-get-all-the-unique-value-of-a-given-scalar-field-from-a-collection" class="common-anchor-header">コレクションから指定されたスカラー・フィールドの一意の値をすべて取得するにはどうすればよいですか？</h4><p>現在のところ、これを実現する直接的な方法はありません。回避策として、query_iteratorを使用して特定のフィールドのすべての値を取得し、手動で重複排除を実行することをお勧めします。Milvus 2.6ではこの機能を直接サポートする予定です。query_iteratorの使用例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># set up iterator</span>
iterator = client.query_iterator(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;target&quot;</span>]
)
<span class="hljs-comment"># do iteration and store target values into value_set </span>
value_set = <span class="hljs-built_in">set</span>()
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    res = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(res) == <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;query iteration finished, close&quot;</span>)
        iterator.close()
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(res)):
        value_set.add(res[i][<span class="hljs-string">&quot;target&quot;</span>])

<span class="hljs-comment"># value_set will contain unique values for target column    </span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="What-are-the-limitations-of-using-dynamic-fields-For-example-are-there-size-limits-modification-methods-or-indexing-restrictions" class="common-anchor-header">動的フィールドの使用にはどのような制限がありますか？例えば、サイズ制限、修正方法、インデックス作成の制限などがありますか？</h4><p>ダイナミック・フィールドは内部的にJSONフィールドで表現され、サイズ制限は65,536バイトです。動的フィールドはアップサートをサポートしており、フィールドの追加や更新が可能です。しかし、Milvus 2.5.1では、ダイナミックフィールドはインデックスをサポートしていません。JSONのインデックス追加サポートは将来のリリースで導入される予定です。</p>
<h4 id="Does-Milvus-support-schema-changes" class="common-anchor-header">Milvusはスキーマの変更をサポートしていますか？</h4><p>Milvusバージョン2.5.0では、スキーマの変更は、<code translate="no">mmap</code> パラメータのようなプロパティの調整など、特定の変更に限定されています。また、varcharフィールドの<code translate="no">max_length</code> 、配列フィールドの<code translate="no">max_capacity</code> 。しかしながら、スキーマのフィールドの追加や削除は将来のリリースで計画されており、Milvusのスキーマ管理の柔軟性を向上させます。</p>
<h4 id="Does-modifying-maxlength-for-VarChar-require-data-reorganization" class="common-anchor-header">VarCharのmax_lengthを変更する場合、データの再編成が必要ですか?</h4><p>いいえ、VarCharフィールドの<code translate="no">max_length</code> を変更しても、圧縮や再編成などのデータ再編成は必要ありません。この調整では主に、フィールドに挿入される新しいデータの検証基準が更新され、既存のデータは影響を受けません。その結果、この変更は軽量とみなされ、システムに大きなオーバーヘッドを課しません。</p>
<h4 id="Still-have-questions" class="common-anchor-header">まだ質問がありますか？</h4><p>できます：</p>
<ul>
<li>GitHubで<a href="https://github.com/milvus-io/milvus/issues">Milvusを</a>チェックしてください。質問を投げかけたり、アイデアを共有したり、他の人を助けたりすることができます。</li>
<li>私たちの<a href="https://discord.com/invite/8uyFbECzPX">Discordチャンネルに</a>参加して、サポートを見つけたり、私たちのオープンソースコミュニティに参加してください。</li>
</ul>
