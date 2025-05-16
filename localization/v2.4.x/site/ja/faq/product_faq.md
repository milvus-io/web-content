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
<p>Milvusの開発元であるZilliz社では、分散インスタンスの構築や保守が不要なお客様向けに、完全マネージド型のクラウドプラットフォームも提供しております。<a href="https://zilliz.com/cloud">Zilliz Cloudは</a>自動的にデータの信頼性を維持し、ユーザーは使用した分だけ支払うことができる。</p>
<h4 id="Does-Milvus-support-non-x86-architectures" class="common-anchor-header">Milvusはx86以外のアーキテクチャに対応していますか？</h4><p>Milvusはx86以外のプラットフォームにはインストール、実行できません。</p>
<p>Milvusを実行するには、CPUが以下の命令セットのいずれかをサポートしている必要があります: SSE4.2、AVX、AVX2、AVX512。これらはすべてx86専用のSIMD命令セットです。</p>
<h4 id="Where-does-Milvus-store-data" class="common-anchor-header">Milvusはどこにデータを格納するのですか？</h4><p>Milvusでは、挿入データとメタデータの2種類のデータを扱います。</p>
<p>ベクターデータ、スカラーデータ、コレクション固有のスキーマを含む挿入データは、インクリメンタルログとして永続ストレージに保存されます。Milvusは、<a href="https://min.io/">MinIO</a>、<a href="https://aws.amazon.com/s3/?nc1=h_ls">AWS S3</a>、<a href="https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes">Google Cloud Storage</a>(GCS)、<a href="https://azure.microsoft.com/en-us/products/storage/blobs">Azure Blob Storage</a>、<a href="https://www.alibabacloud.com/product/object-storage-service">Alibaba Cloud OSS</a>、<a href="https://www.tencentcloud.com/products/cos">Tencent Cloud Object Storage</a>(COS)など、複数のオブジェクトストレージバックエンドをサポートしています。</p>
<p>メタデータはMilvus内で生成されます。Milvusモジュールはそれぞれ独自のメタデータを持ち、etcdに保存されます。</p>
<h4 id="Why-is-there-no-vector-data-in-etcd" class="common-anchor-header">なぜetcdにはベクターデータがないのか？</h4><p>etcdにはMilvusモジュールのメタデータが格納され、MinIOにはエンティティが格納されます。</p>
<h4 id="Does-Milvus-support-inserting-and-searching-data-simultaneously" class="common-anchor-header">Milvusはデータの挿入と検索を同時にサポートしていますか？</h4><p>挿入操作と検索操作は、互いに独立した2つのモジュールによって処理されます。クライアントから見ると、挿入されたデータがメッセージキューに入った時点で挿入操作は完了します。しかし、挿入されたデータはクエリ・ノードにロードされるまで検索できません。セグメントサイズがインデックス構築のしきい値（デフォルトでは512MB）に達しない場合、Milvusはブルートフォース検索に頼り、クエリのパフォーマンスが低下する可能性があります。</p>
<h4 id="Can-vectors-with-duplicate-primary-keys-be-inserted-into-Milvus" class="common-anchor-header">主キーが重複しているベクターをMilvusに挿入できますか?</h4><p>はい。Milvusはベクターの主キーが重複しているかどうかをチェックしません。</p>
<h4 id="When-vectors-with-duplicate-primary-keys-are-inserted-does-Milvus-treat-it-as-an-update-operation" class="common-anchor-header">主キーが重複しているベクターが挿入された場合、Milvusはそれを更新操作として扱いますか?</h4><p>いいえ。Milvusは現在更新操作に対応しておらず、エンティティのプライマリキーが重複しているかどうかのチェックも行っていません。エンティティの主キーが一意であることを確認するのはお客様の責任であり、そうでない場合、Milvusには主キーが重複した複数のエンティティが含まれる可能性があります。</p>
<p>このような場合、クエリが実行されたときにどのデータコピーが返されるかは未知のままです。この制限は将来のリリースで修正される予定です。</p>
<h4 id="What-is-the-maximum-length-of-self-defined-entity-primary-keys" class="common-anchor-header">自分で定義したエンティティの主キーの最大長は?</h4><p>エンティティ主キーは非負の64ビット整数でなければなりません。</p>
<h4 id="What-is-the-maximum-amount-of-data-that-can-be-added-per-insert-operation" class="common-anchor-header">1回の挿入操作で追加できるデータ量の上限は?</h4><p>挿入操作のサイズは1,024 MBを超えてはなりません。これはgRPCによる制限です。</p>
<h4 id="Does-collection-size-impact-query-performance-when-searching-in-a-specific-partition" class="common-anchor-header">特定のパーティションで検索する場合、コレクション・サイズはクエリ・パフォーマンスに影響しますか?</h4><p>いいえ。検索用のパーティションが指定されている場合、Milvusは指定されたパーティションのみを検索します。</p>
<h4 id="Does-Milvus-need-to-load-the-entire-collection-when-partitions-are-specified-for-a-search" class="common-anchor-header">検索にパーティションを指定した場合、Milvusはコレクション全体を読み込む必要がありますか?</h4><p>検索に必要なデータによって異なります。検索結果に表示される可能性のあるパーティションは、検索前にすべて読み込む必要があります。</p>
<ul>
<li>たとえば、特定のパーティションだけを検索したい場合は、すべてをロードする必要はありません。<code translate="no">load_partition()</code> を呼び出して目的のパーティションをロード<em>し、</em> <code translate="no">search()</code> メソッド呼び出しでパーティションを指定します。</li>
<li>すべてのパーティションを検索したい場合は、<code translate="no">load_collection()</code> を呼び出して、すべてのパーティションを含むコレクション全体をロードします。</li>
<li>検索前にコレクションまたは特定のパーティションをロードしなかった場合、Milvusはエラーを返します。</li>
</ul>
<h4 id="Can-indexes-be-created-after-inserting-vectors" class="common-anchor-header">ベクター挿入後にインデックスを作成できますか?</h4><p>Milvusは、以前<code translate="no">create_index()</code> 、コレクションに対してインデックスを作成したことがある場合、その後に挿入されたベクターに対しても自動的にインデックスを作成します。ただし、Milvusは、新しく挿入されたベクターがセグメント全体を満たし、新しく作成されたインデックスファイルが以前のものから分離されるまで、インデックスを作成しません。</p>
<h4 id="How-are-the-FLAT-and-IVFFLAT-indexes-different" class="common-anchor-header">FLATインデックスとIVF_FLATインデックスの違いは何ですか？</h4><p>IVF_FLATインデックスはベクター空間をリスト・クラスターに分割します。デフォルトのリスト値16,384の場合、Milvusはターゲットベクトルと16,384クラスタすべてのセントロイド間の距離を比較し、最も近いクラスタを返します。その後、Milvusはターゲットベクトルと選択されたクラスタ内のベクトルとの距離を比較し、最近接ベクトルを取得します。IVF_FLATとは異なり、FLATはターゲットベクトルと他のすべてのベクトルとの距離を直接比較します。</p>
<p>ベクトルの総数がnlistにほぼ等しい場合、IVF_FLATとFLATの間には計算要件と探索性能の点でほとんど差がありません。しかし、ベクトル数が nlist の 2 倍以上になると、IVF_FLAT の方が性能面で有利になります。</p>
<p>詳細は<a href="/docs/ja/v2.4.x/index.md">ベクターインデックスを</a>参照してください。</p>
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
<p>詳しくは<a href="/docs/ja/v2.4.x/index.md">ベクトル・インデックス</a>をご覧ください。</p>
<h4 id="What-is-the-maximum-vector-dimension-supported-in-Milvus" class="common-anchor-header">Milvusでサポートされている最大ベクトル次元は?</h4><p>Milvusはデフォルトで32,768次元までのベクターを管理できます。<code translate="no">Proxy.maxDimension</code> の値を大きくすることで、より大きな次元のベクトルを扱うことができます。</p>
<h4 id="Does-Milvus-support-Apple-M1-CPU" class="common-anchor-header">MilvusはApple M1 CPUをサポートしていますか？</h4><p>現在のMilvusはApple M1 CPUを直接サポートしておりません。Milvus 2.3以降では、ARM64アーキテクチャ用のDockerイメージが提供されます。</p>
<h4 id="What-data-types-does-Milvus-support-on-the-primary-key-field" class="common-anchor-header">Milvusはプライマリキーフィールドでどのようなデータタイプをサポートしていますか？</h4><p>現在のリリースでは、MilvusはINT64と文字列の両方をサポートしています。</p>
<h4 id="Is-Milvus-scalable" class="common-anchor-header">Milvusはスケーラブルですか？</h4><p>Kubernetes上のHelm Chartを利用することで、複数ノードのMilvusクラスタをデプロイすることができます。詳しくは<a href="/docs/ja/v2.4.x/scaleout.md">スケールガイドを</a>ご参照ください。</p>
<h4 id="What-are-growing-segment-and-sealed-segment" class="common-anchor-header">growing segmentとsealed segmentとは何ですか？</h4><p>Milvusは検索要求が来ると、インクリメンタルデータとヒストリカルデータの両方を検索します。増分データは最近更新されたデータで、オブジェクトストレージに永続化される閾値に達する前にメモリにバッファリングされ、より効率的なインデックスが構築される成長セグメントに保存されます。一方、履歴データは少し前に更新されたもので、オブジェクト・ストレージに永続化される前にメモリ上にバッファリングされ、より効率的なインデックスが作成される。インクリメンタルデータとヒストリカルデータは、検索用のデータセット全体を構成する。この設計により、Milvusに取り込まれたデータは即座に検索可能となる。Milvus Distributedの場合、インジェストされたばかりのレコードがいつ検索結果に表示されるかは、より複雑な要因によって決定される。その詳細については<a href="https://milvus.io/docs/consistency.md">一貫性レベルを</a>ご覧ください。</p>
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
<h4 id="Does-Milvus-support-specifying-default-values-for-scalar-or-vector-fields" class="common-anchor-header">Milvusはスカラーフィールドやベクトルフィールドのデフォルト値の指定に対応していますか？</h4><p>現在のところ、Milvus 2.4.xではスカラーフィールドやベクトルフィールドのデフォルト値の指定はサポートしていません。この機能は将来のリリースを予定しています。</p>
<h4 id="Still-have-questions" class="common-anchor-header">まだ質問がありますか？</h4><p>できます：</p>
<ul>
<li>GitHubで<a href="https://github.com/milvus-io/milvus/issues">Milvusを</a>チェックしてください。質問を投げかけたり、アイデアを共有したり、他の人を助けたりすることができます。</li>
<li>私たちの<a href="https://discord.com/invite/8uyFbECzPX">Discordサーバーに</a>参加して、サポートを探したり、私たちのオープンソースコミュニティに参加してください。</li>
</ul>
