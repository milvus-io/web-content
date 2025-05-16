---
id: replica.md
summary: Milvusのインメモリレプリカについて学ぶ。
title: インメモリレプリカ
---
<h1 id="In-Memory-Replica" class="common-anchor-header">インメモリレプリカ<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvusのインメモリレプリカ(レプリケーション)メカニズムについて紹介します。このメカニズムでは、パフォーマンスと可用性を向上させるためにワーキングメモリ内で複数のセグメントレプリケーションを可能にします。</p>
<p>インメモリ・レプリカの設定方法については、<a href="/docs/ja/v2.4.x/configure_querynode.md#queryNodereplicas">クエリ・ノード関連の設定を</a>参照してください。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>レプリカの可用性</span> </span></p>
<p>インメモリレプリカでは、Milvusは複数のクエリノードに同じセグメントをロードすることができます。あるクエリノードに障害が発生したり、現在の検索リクエストでビジー状態になっているときに別のクエリノードが到着した場合、システムは同じセグメントのレプリカを持つアイドル状態のクエリノードに新しいリクエストを送信することができます。</p>
<h3 id="Performance" class="common-anchor-header">パフォーマンス</h3><p>インメモリーレプリカは、余分なCPUとメモリーリソースを活用することができます。データセットが比較的小さいが、余分なハードウェアリソースで読み取りスループットを向上させたい場合に非常に便利です。全体的なQPS（クエリー/秒）とスループットを大幅に向上させることができます。</p>
<h3 id="Availability" class="common-anchor-header">可用性</h3><p>インメモリレプリカは、Milvusがクエリノードがクラッシュした場合に、より早く復旧するのに役立ちます。クエリノードに障害が発生した場合、セグメントを別のクエリノードに再ロードする必要はありません。その代わり、データを再読み込みすることなく、検索リクエストを即座に新しいクエリノードに再送信することができます。複数のセグメントレプリカが同時に維持されることで、フェイルオーバーに直面しても、システムはより回復力を持つ。</p>
<h2 id="Key-Concepts" class="common-anchor-header">主要概念<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>インメモリーレプリカはレプリカグループとして構成される。各レプリカグループには<a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">シャードレプリカが</a>含まれる。各シャードレプリカは、シャード内の成長<a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">セグメントと</a>封印<a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">セグメント</a>（つまりDMLチャネル）に対応するストリーミングレプリカとヒストリカルレプリカを持つ。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>インメモリ・レプリカの動作の例</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">レプリカグループ</h3><p>レプリカグループは、履歴データとレプリカの処理を担当する複数の<a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">クエリノードで</a>構成されます。</p>
<h3 id="Shard-replica" class="common-anchor-header">シャード・レプリカ</h3><p>シャードレプリカは、同じ<a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">シャードに</a>属するストリーミングレプリカとヒストリカルレプリカから構成されます。レプリカグループ内のシャードレプリカの数は、指定されたコレクション内のシャードの数によって決まります。</p>
<h3 id="Streaming-replica" class="common-anchor-header">ストリーミング・レプリカ</h3><p>ストリーミング・レプリカは、同じDMLチャネルからのすべての<a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">成長セグメントを</a>含みます。技術的に言えば、ストリーミング・レプリカは、1つのレプリカ内の1つのクエリ・ノードによってのみ提供されるべきです。</p>
<h3 id="Historical-replica" class="common-anchor-header">履歴レプリカ</h3><p>ヒストリカルレプリカは、同じ DML チャンネルに含まれるすべてのセグメントを保持します。1つのヒストリカルレプリカの封印されたセグメントは、同じレプリカグループ内の複数のクエリノードに分散させることができます。</p>
<h3 id="Shard-leader" class="common-anchor-header">シャードリーダー</h3><p>シャードリーダーは、シャードレプリカ内のストリーミングレプリカにサービスを提供するクエリノードです。</p>
<h2 id="Design-Details" class="common-anchor-header">設計の詳細<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">バランス</h3><p>ロードが必要な新しいセグメントは、複数の異なるクエリノードに割り当てられる。少なくとも1つのレプリカが正常にロードされれば、検索リクエストを処理できる。</p>
<h3 id="Search" class="common-anchor-header">検索</h3><h4 id="Cache" class="common-anchor-header">キャッシュ</h4><p>プロキシはセグメントをクエリノードにマップするキャッシュを維持し、定期的に更新します。プロキシがリクエストを受け取ると、milvus は検索が必要なすべてのセグメントをキャッシュから取得し、それらをクエリノードに均等に割り当てようとする。</p>
<p>成長しているセグメントについては、プロキシはチャネルからクエリノードへのキャッシュも保持し、対応するクエリノードにリクエストを送信する。</p>
<h4 id="Failover" class="common-anchor-header">フェイルオーバー</h4><p>プロキシのキャッシュは常に最新というわけではありません。リクエストが来たときに、いくつかのセグメントやチャンネルが 他のクエリノードに移動しているかもしれません。この場合、プロキシはエラー応答を受け取り、キャッシュを更新し、別のクエリノードに割り当てようとする。</p>
<p>プロキシがキャッシュを更新した後もそれを見つけられない場合、 セグメントは無視される。これは、セグメントがコンパク ト化されている場合に起こりうる。</p>
<p>キャッシュが正確でない場合、プロキシはセグメントを見逃すことがある。DML チャンネルを持つクエリノード (成長するセグメント) は、プロキシが比較しキャッシュを更新できる、信頼できるセグメントのリストとともに検索応答を返します。</p>
<h3 id="Enhancement" class="common-anchor-header">機能拡張</h3><p>プロキシは検索リクエストをクエリノードに完全に均等に割り当てることはできません。リソースのロングテール分布を避けるために、プロキシは他のクエリノード上のアクティブなセグメントを、これらのセグメントも持っているアイドルクエリノードに割り当てます。</p>
