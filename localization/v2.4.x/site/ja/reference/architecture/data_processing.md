---
id: data_processing.md
summary: Milvusのデータ処理手順についてご紹介します。
title: データ処理
---
<h1 id="Data-processing" class="common-anchor-header">データ処理<button data-href="#Data-processing" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、各コレクションに対してシャードの数を指定することができ、各シャードは仮想チャネル<em>(vchannel</em>)に対応しています。次の図が示すように、Milvusはログブローカ内の各vchannelに物理チャネル<em>(pchannel</em>)を割り当てます。受信した挿入/削除リクエストは、プライマリキーのハッシュ値に基づいてシャードにルーティングされます。</p>
<p>Milvusは複雑なトランザクションを持たないため、DMLリクエストの検証はプロキシに移される。プロキシはTSO（Timestamp Oracle）に各挿入/削除リクエストのタイムスタンプを要求する。古いタイムスタンプは新しいタイムスタンプで上書きされ、タイムスタンプは、 処理されるデータリクエストの順序を決定するために使用される。プロキシは、全体のスループットを向上させ、中央ノードに過度の負担をかけないように、エンティティのセグメントとプライマリキーを含むデータコーディネータからバッチで情報を取得する。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>チャネル1</span> </span></p>
<p>DML(データ操作言語)操作とDDL(データ定義言語)操作の両方がログシーケンスに書き込まれますが、DDL操作は発生頻度が低いため、1つのチャネルのみが割り当てられます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>チャンネル2</span> </span></p>
<p><em>Vチャンネルは</em>、基礎となるログブローカーノードで管理されます。各チャンネルは物理的に不可分であり、1つのノードでのみ使用可能です。データの取り込み速度がボトルネックに達した場合、次の2点を考慮します：ログブローカノードが過負荷で、スケーリングが必要かどうか、各ノードの負荷分散を確実にするのに十分なシャードがあるかどうか。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>書き込みログシーケンス</span> </span></p>
<p>プロキシ、ログブローカー、データノード、オブジェクトストレージ。DML要求の検証、ログシーケンスの発行-購読、ストリーミングログからログスナップショットへの変換、ログスナップショットの永続化。この4つのタスクは、各タスクが対応するノードタイプによって処理されるように、互いに切り離されている。同じタイプのノードは同等に作られ、様々なデータ負荷、特に大量で変動が激しいストリーミングデータに対応するために、弾力的かつ独立にスケールすることができる。</p>
<h2 id="Index-building" class="common-anchor-header">インデックス構築<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックス構築はインデックスノードによって行われる。データ更新のための頻繁なインデックス構築を避けるため、Milvusのコレクションはさらにセグメントに分割され、それぞれが独自のインデックスを持つ。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>インデックス構築</span> </span></p>
<p>Milvusは各ベクトルフィールド、スカラーフィールド、プライマリフィールドのインデックス構築をサポートします。インデックス構築の入力と出力の両方がオブジェクトストレージに関与します：インデックスノードは（オブジェクトストレージにある）セグメントからインデックスを作成するログスナップショットをメモリにロードし、インデックスを作成するために対応するデータとメタデータをデシリアライズし、インデックス作成が完了するとインデックスをシリアライズし、オブジェクトストレージに書き戻します。</p>
<p>インデックス構築には主にベクトルと行列の演算が含まれるため、計算量とメモリ消費量が多くなります。ベクトルは高次元の性質を持っているため、従来のツリーベースのインデックスでは効率的にインデックスを作成することができませんが、クラスタベースやグラフベースのインデックスなど、このタスクのために特別に設計された技術を使用することでインデックスを作成することができます。その種類にかかわらず、インデックスの構築には、K-meansやグラフ・トラバーサルなど、大規模なベクトルに対する大規模な反復計算が必要となる。</p>
<p>スカラーデータのインデックス作成とは異なり、ベクトルインデックスの作成はSIMD（単一命令、複数データ）アクセラレーションの恩恵を大きく受けます。Milvusは、SSE、AVX2、AVX512などのSIMD命令セットを生得的にサポートしている。Milvusは、SSE、AVX2、AVX512などのSIMD命令セットを生得的にサポートしています。ベクトルインデックス構築の「しゃっくり」とリソース集約的な性質を考えると、Milvusにとって弾力性は経済的に極めて重要になります。Milvusの今後のリリースでは、ヘテロジニアス・コンピューティングとサーバーレス計算をさらに探求し、関連コストを下げる予定である。</p>
<p>Milvusはスカラーフィルタリングとプライマリーフィールドクエリもサポートしている。ブルームフィルターインデックス、ハッシュインデックス、ツリーベースインデックス、インバーテッドインデックスなど、クエリの効率を向上させるインデックスを内蔵しており、ビットマップインデックスやラフインデックスなど、より多くの外部インデックスを導入する予定である。</p>
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
    </button></h2><p>データクエリ」とは、あるベクトルに最も近い<em>k</em>個のベクトル、またはそのベクトルから指定された距離範囲内の<em>すべての</em>ベクトルについて、指定されたコレクションを検索するプロセスを指す。ベクトルは、対応する主キーとフィールドとともに返されます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>データクエリ</span> </span></p>
<p>Milvusのコレクションは複数のセグメントに分割され、クエリノードはセグメントごとにインデックスをロードします。検索要求が到着すると、同時検索のためにすべてのクエリノードにブロードキャストされる。その後、各ノードはローカルセグメントを刈り込み、条件を満たすベクトルを検索し、検索結果を縮小して返します。</p>
<p>クエリノードはデータクエリにおいて互いに独立している。各ノードは以下の2つのタスクのみを担当する：クエリコーダーの指示に従ってセグメントをロードまたは解放する。そして、プロキシは、各クエリノードからの検索結果を減らし、最終結果をクライアントに返す責任を負う。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>ハンドオフ</span> </span></p>
<p>セグメントには、成長するセグメント（増分データ用）と、封印されたセグメント（履歴データ用）の2種類がある。クエリノードは vchannel を購読し、最近の更新（増分データ）を growing セグメントとして受信する。成長中のセグメントが事前に定義された閾値に達すると、データコーデ ィネートはそのセグメントを封印し、インデックスの構築を開始する。その後、クエリーコーデ ィネートによって開始される<em>ハンドオフ</em>操作によって、インクリメンタルデータがヒストリカルデータに変換される。クエリコーデックは、メモリ使用量、CPUオーバーヘッド、セグメント数に応じて、封印されたセグメントをすべてのクエリノードに均等に分配する。</p>
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
<li><a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">Milvusベクトルデータベースをリアルタイムクエリに使用する</a>方法について学ぶ。</li>
<li><a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvusにおけるデータ挿入とデータ永続化について</a>学びます。</li>
<li><a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvusでのデータ処理</a>方法について学びます。</li>
</ul>
