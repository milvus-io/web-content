---
id: data_processing.md
summary: Milvusのデータ処理手順についてご紹介します。
title: データ処理
---
<h1 id="Data-Processing" class="common-anchor-header">データ処理<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>本記事では、Milvusにおけるデータ挿入、インデックス構築、データクエリの実装について詳細に説明する。</p>
<h2 id="Data-insertion" class="common-anchor-header">データ挿入<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusではコレクションが使用するシャードの数を選択することができ、各シャードは仮想チャネル<em>(vchannel</em>)にマッピングされます。下図のように、Milvusはすべての<em>vchannelを</em>物理チャネル<em>(pchannel</em>)に割り当て、<em>各pchannelは</em>特定のStreaming Nodeにバインドされます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>Vチャネル PCチャネルとStreamingNode</span> </span></p>
<p>データ検証の後、プロキシは書き込まれたメッセージを、指定されたシャードルーティングルールに従って、さまざまなデータパッケージのシャードに分割する。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>チャネル1</span> </span></p>
<p>そして、1つのシャード<em>（vchannel</em>）の書き込まれたデータは、<em>pchannelの</em>対応するStreaming Nodeに送信される。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>書き込みフロー</span> </span></p>
<p>Streaming Nodeは各データパケットにタイムスタンプオラクル（TSO）を割り当て、操作の全順序を確立する。ペイロードをライトアヘッド・ログ（WAL）に書き込む前に、ペイロードの一貫性チェックを行う。いったんデータがWALに永続的にコミットされると、それが失われないことが保証される。たとえクラッシュが発生しても、Streaming NodeはWALを再生して、保留中のオペレーションをすべて完全に回復することができる。</p>
<p>一方、StreamingNodeはコミットされたWALエントリを非同期に個別のセグメントに切り分けます。セグメントには2種類ある：</p>
<ul>
<li><strong>Growing segment</strong>: オブジェクトストレージにプリステートされていないデータ。</li>
<li><strong>Sealed segment</strong>: すべてのデータがオブジェクトストレージに永続化されている。</li>
</ul>
<p>成長セグメントから密封セグメントへの移行はフラッシュと呼ばれます。Streaming Node は、そのセグメントで利用可能なすべての WAL エントリを取り込み、書き込むとすぐに、つまり、ライトアヘッドログに保留中のレコードがなくなるとすぐに、フラッシュをトリガーする。</p>
<h2 id="Index-building" class="common-anchor-header">インデックスの構築<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックス構築はデータノードによって実行される。データ更新のための頻繁なインデックス構築を避けるため、Milvusのコレクションはさらにセグメントに分割され、それぞれが独自のインデックスを持つ。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>インデックス構築</span> </span></p>
<p>Milvusは各ベクトルフィールド、スカラーフィールド、プライマリフィールドのインデックス構築をサポートしています。インデックス構築の入力と出力の両方がオブジェクトストレージに関与します：データノードはセグメント（オブジェクトストレージにある）からインデックスを作成するログのスナップショットをメモリにロードし、対応するデータとメタデータをデシリアライズしてインデックスを作成し、インデックス作成が完了するとインデックスをシリアライズしてオブジェクトストレージに書き戻します。</p>
<p>インデックス構築は主にベクトルと行列の演算を伴うため、計算とメモリに負荷がかかります。ベクトルは、その高次元の性質から、伝統的なツリーベースのインデックスでは効率的にインデックスを作成することができませんが、クラスタベースやグラフベースのインデックスなど、この分野でより成熟した技術を使用することで、インデックスを作成することができます。その種類にかかわらず、インデックスの構築には、Kmeansやグラフトラバースなど、大規模なベクトルに対する大規模な反復計算が必要となる。</p>
<p>スカラーデータのインデックスとは異なり、ベクトルインデックスの構築にはSIMD（単一命令、複数データ）アクセラレーションをフルに活用する必要があります。Milvusは、SSE、AVX2、AVX512などのSIMD命令セットを生得的にサポートしている。Milvusは、SSE、AVX2、AVX512などのSIMD命令セットを生得的にサポートしています。ベクトル・インデックス構築の "しゃっくり "とリソース集約的な性質を考えると、Milvusにとって弾力性は経済的に極めて重要になります。Milvusの今後のリリースでは、ヘテロジニアス・コンピューティングとサーバーレス計算をさらに追求し、関連コストを下げる予定である。</p>
<p>Milvusはスカラーフィルタリングとプライマリフィールドクエリもサポートしている。Milvusには、ブルームフィルターインデックス、ハッシュインデックス、ツリーベースインデックス、転置インデックスなど、クエリの効率を向上させるためのインデックスが組み込まれており、ビットマップインデックスやラフインデックスなど、より多くの外部インデックスを導入する予定である。</p>
<h2 id="Data-query" class="common-anchor-header">データクエリー<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>データクエリとは、対象となるベクトルに最も近い<em>k</em>個のベクトル、または指定された距離範囲内の<em>すべての</em>ベクトルについて、指定されたコレクションを検索するプロセスを指す。ベクトルは、対応する主キーとフィールドとともに返されます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>データクエリ</span> </span></p>
<p>Milvusのコレクションは複数のセグメントに分割されます。ストリーミングノードは成長しているセグメントをロードし、リアルタイムのデータを維持し、クエリノードは封印されたセグメントをロードします。</p>
<p>クエリ/検索リクエストが到着すると、プロキシは関連シャードを担当するすべての Streaming Node にリクエストをブロードキャストし、同時検索を行います。</p>
<p>クエリーリクエストが到着すると、プロキシは対応するシャードを保持する Streaming Node に検索を実行するよう同時にリクエストする。</p>
<p>各Streaming Nodeはクエリプランを生成し、そのローカルで成長しているデータを検索し、同時にリモートのQuery Nodeにコンタクトして過去の結果を取得し、それらを1つのシャードの結果に集約する。</p>
<p>最後に、プロキシはすべてのシャード結果を収集し、最終結果にマージしてクライアントに返す。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>ハンドオフ</span> </span></p>
<p>Streaming Node上の成長中のセグメントが密封されたセグメントにフラッシュされるとき、 またはData Nodeがコンパクションを完了するとき、Coordinatorはハンドオフ操作を開始し、 成長中のデータを履歴データに変換します。その後、Coordinator は封印されたセグメントをすべての Query Node に均等に分散し、メモリ使用量、CPU オーバーヘッド、セグメント数のバランスをとり、冗長なセグメントを解放します。</p>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">Milvusベクトルデータベースをリアルタイムクエリに使用する</a>方法について学びます。</li>
<li><a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvusにおけるデータ挿入とデータ永続化について</a>学びます。</li>
<li><a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvusでのデータ処理</a>方法について学びます。</li>
</ul>
