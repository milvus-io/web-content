---
id: data_processing.md
summary: Milvusにおけるデータ処理の手順について学びましょう。
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
    </button></h1><p>この記事では、Milvusにおけるデータ挿入、インデックス構築、およびデータクエリの実装について詳しく説明します。</p>
<h2 id="Data-insertion" class="common-anchor-header">データの挿入<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus では、コレクションが使用するシャードの数を選択できます。各シャードは仮想チャネル (<em>vchannel</em>) にマッピングされます。以下に示すように、Milvus はすべての<em>vchannel を</em>物理チャネル (<em>pchannel</em>) に割り当て、各<em>pchannel は</em>特定のストリーミングノードにバインドされます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel、PChannel、およびストリーミングノード</span>
  
 </span></p>
<p>データの検証後、プロキシは、指定されたシャードルーティングルールに従って、書き込まれたメッセージを各シャードのデータパッケージに分割します。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>チャネル 1</span>
  
 </span></p>
<p>その後、1 つのシャード（<em>vchannel</em>）の書き込みデータは、<em>pchannel</em> の対応するストリーミングノードに送信されます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>書き込みフロー</span>
  
 </span></p>
<p>ストリーミングノードは、各データパケットにタイムスタンプオラクル (TSO) を割り当て、操作の完全な順序を確立します。また、ペイロードを基盤となる書き込み先行ログ (WAL) に書き込む前に、一貫性チェックを実行します。 データが WAL に永続的にコミットされると、そのデータが失われることはないと保証されます。クラッシュが発生した場合でも、ストリーミングノードは WAL をリプレイして、保留中のすべての操作を完全に回復することができます。</p>
<p>一方、ストリーミングノードは、コミット済みのWALエントリを非同期的に個別のセグメントに分割します。セグメントには2つのタイプがあります：</p>
<ul>
<li><strong>成長セグメント</strong>：オブジェクトストレージに永続化されていないデータ。</li>
<li><strong>シール済みセグメント</strong>：すべてのデータがオブジェクトストレージに永続化されており、シール済みセグメントのデータは不変です。</li>
</ul>
<p>成長中のセグメントがシールドセグメントに移行することを「フラッシュ」と呼びます。ストリーミングノードは、そのセグメントに関する利用可能なすべてのWALエントリを取り込んで書き込みを終えた直後（つまり、基になる書き込み先行ログに保留中のレコードがなくなった時点）にフラッシュをトリガーします。この時点でセグメントは確定され、読み取りに最適化されます。</p>
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
    </button></h2><p>インデックスの構築はデータノードによって行われます。データ更新に伴う頻繁なインデックス構築を避けるため、Milvus ではコレクションがさらにセグメントに分割され、各セグメントに独自のインデックスが割り当てられます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>インデックスの構築</span>
  
 </span></p>
<p>Milvusは、各ベクトルフィールド、スカラーフィールド、およびプライマリフィールドに対するインデックス構築をサポートしています。 インデックス構築の入力と出力の両方でオブジェクトストレージが利用されます。データノードは、インデックス対象のログスナップショットを（オブジェクトストレージにある）セグメントからメモリに読み込み、対応するデータとメタデータをデシリアライズしてインデックスを構築し、インデックス構築が完了したらインデックスをシリアライズして、オブジェクトストレージに書き戻します。</p>
<p>インデックス構築には主にベクトルおよび行列演算が関与するため、計算量とメモリ消費量が非常に大きくなります。ベクトルは高次元であるため、従来のツリーベースのインデックスでは効率的にインデックス化できませんが、クラスターベースやグラフベースのインデックスなど、この分野でより成熟した技術を用いてインデックス化することができます。 データ型にかかわらず、インデックスの構築には、K-meansやグラフ探索など、大規模なベクトルに対する膨大な反復計算が伴います。</p>
<p>スカラーデータのインデックス作成とは異なり、ベクトルインデックスの構築では、SIMD（単一命令・複数データ）による高速化を最大限に活用する必要があります。Milvusは、SSE、AVX2、AVX512などのSIMD命令セットをネイティブにサポートしています。 ベクトルインデックス構築には「一時的な処理の停滞」やリソースを大量に消費する性質があるため、経済的な観点から、Milvusにとってスケーラビリティは極めて重要となります。今後のMilvusのリリースでは、関連コストを削減するために、ヘテロジニアスコンピューティングやサーバーレスコンピューティングのさらなる活用が検討されます。</p>
<p>さらに、Milvusはスカラーフィルタリングやプライマリフィールドクエリもサポートしています。クエリ効率を向上させるための組み込みインデックス（ブルームフィルタインデックス、ハッシュインデックス、ツリーベースのインデックス、逆引きインデックスなど）を備えており、ビットマップインデックスやラフインデックスなど、さらなる外部インデックスの導入も計画されています。</p>
<h2 id="Data-query" class="common-anchor-header">データクエリ<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>データクエリとは、指定されたコレクションから、ターゲットベクトルに最も近い<em>k</em>個のベクトル、またはそのベクトルから指定された距離範囲内にある<em>すべての</em>ベクトルを検索するプロセスを指します。ベクトルは、対応する主キーおよびフィールドとともに返されます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>データクエリ</span>
  
 </span></p>
<p>Milvus のコレクションは複数のセグメントに分割されています。ストリーミングノードは成長中のセグメントを読み込み、リアルタイムデータを維持し、クエリノードはシールされたセグメントを読み込みます。</p>
<p>クエリ／検索リクエストが到着すると、プロキシは、関連するシャードを担当するすべてのストリーミングノードにリクエストをブロードキャストし、並行検索を行います。</p>
<p>クエリリクエストが到着すると、プロキシは、対応するシャードを保持するストリーミングノードに対して、検索の実行を並行して要求します。</p>
<p>各ストリーミングノードはクエリプランを生成し、ローカルの成長中のデータを検索すると同時に、リモートのクエリノードに連絡して過去の結果を取得し、これらを 1 つのシャード結果に集約します。</p>
<p>最後に、プロキシはすべてのシャードの結果を収集し、それらを最終結果に統合して、クライアントに返します。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>ハンドオフ</span>
  
 </span></p>
<p>ストリーミングノード上の成長中のセグメントがシール済みセグメントにフラッシュされたとき、あるいはデータノードがコンパクションを完了したとき、コーディネーターは、その成長中のデータを履歴データに変換するためのハンドオフ操作を開始します。 その後、コーディネーターは、メモリ使用量、CPU オーバーヘッド、およびセグメント数をバランスよく調整しながら、シールドされたセグメントをすべてのクエリノードに均等に分散し、冗長なセグメントを解放します。</p>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">Milvus ベクトルデータベースを使用したリアルタイムクエリ</a>の方法について学びましょう。</li>
<li><a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvus におけるデータの挿入と永続化</a>について学びましょう。</li>
<li><a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvus でのデータ処理</a>方法について学びましょう。</li>
</ul>
