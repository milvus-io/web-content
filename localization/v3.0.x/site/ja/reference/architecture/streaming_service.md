---
id: streaming_service.md
title: ストリーミングサービス
summary: >-
  ストリーミングサービスは、Milvus内部ストリーミングシステムモジュールのコンセプトであり、WAL（Write-Ahead
  Log）を中心に構築され、様々なストリーミング関連機能をサポートする。
---
<h1 id="Streaming-Service" class="common-anchor-header">ストリーミングサービス<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>ストリーミングサービスは</strong>、Milvus内部ストリーミングシステムモジュールのコンセプトであり、Write-Ahead Log (WAL)を中心に構築され、様々なストリーミング関連機能をサポートします。具体的には、ストリーミングデータのインジェスト/サブスクリプション、クラスタ状態の障害回復、ストリーミングデータの履歴データへの変換、データクエリの増加などが含まれます。アーキテクチャ上、ストリーミング・サービスは3つの主要コンポーネントで構成される：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>ストリーミング分散アーク</span> </span></p>
<ul>
<li><p><strong>ストリーミング・コーディネーター</strong>：コーディネータノードの論理コンポーネント。Etcdを使用してサービス・ディスカバリーを行い、利用可能なストリーミング・ノードを見つけ、WALを対応するストリーミング・ノードにバインドする。また、WAL配布トポロジーを公開するサービスを登録し、ストリーミングクライアントが与えられたWALに適切なストリーミングノードを知ることができるようにする。</p></li>
<li><p><strong>ストリーミング・ノード・クラスター</strong>：WALの追加、ステートの回復、データクエリの増加など、すべてのストリーミング処理タスクを担当するストリーミングワーカーノードのクラスタ。</p></li>
<li><p><strong>ストリーミングクライアント</strong>：内部で開発されたMilvusクライアントで、サービスの発見や準備状況のチェックなどの基本的な機能をカプセル化しています。メッセージの書き込みやサブスクリプションなどのオペレーションを開始するために使用されます。</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">メッセージ<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>ストリーミングサービスはログ駆動型のストリーミングシステムであるため、Milvusにおけるすべての書き込み操作（DMLやDDLなど）は<strong>メッセージとして</strong>抽象化されます。</p>
<ul>
<li><p>すべてのメッセージには、ストリーミングサービスによって<strong>タイムスタンプオラクル（TSO）</strong>フィールドが割り当てられ、WALにおけるメッセージの順序を示します。メッセージの順序はmilvusにおける書き込み操作の順序を決定します。これにより、ログから最新のクラスタ状態を再構築することが可能になります。</p></li>
<li><p>各メッセージは特定の<strong>VChannel</strong>（仮想チャネル）に属し、操作の一貫性を確保するためにそのチャネル内で特定の不変プロパティを維持します。例えば、Insertオペレーションは常に同じチャネル上のDropCollectionオペレーションの前に発生しなければなりません。</p></li>
</ul>
<p>Milvusにおけるメッセージの順序は以下のようになります：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>メッセージ順序</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">WALコンポーネント<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>大規模な水平スケーラビリティをサポートするため、MilvusのWALは単一のログファイルではなく、複数のログの複合体です。各ログは独立して複数のVChannelのストリーミング機能をサポートすることができます。いつでも、WALコンポーネントは<strong>正確に1つのストリーミングノード</strong>上で動作することが許されており、これらの制約は、基礎となるWALストレージのフェンシング機構とストリーミングコーディネーターの両方によって約束されている。</p>
<p>WALコンポーネントの追加機能は以下の通り：</p>
<ul>
<li><p><strong>セグメントのライフサイクル管理</strong>：メモリ条件／セグメントサイズ／セグメントアイドル時間などのポリシーに基づいて、WALはすべてのセグメントのライフサイクルを管理する。</p></li>
<li><p><strong>基本的なトランザクションのサポート</strong>：各メッセージにはサイズ制限があるため、WALコンポーネントはVChannelレベルでアトミックライトを約束するシンプルなトランザクションレベルをサポートします。</p></li>
<li><p><strong>高同期リモートログ書き込み</strong>：MilvusはサードパーティのリモートメッセージキューをWALストレージとしてサポートしています。ストリーミングノードとリモートWALストレージ間のラウンドトリップレイテンシ（RTT）を緩和し、書き込みスループットを向上させるために、ストリーミングサービスは同時ログ書き込みをサポートします。TSOとTSO同期によってメッセージ順序を維持し、WAL内のメッセージはTSO順序で読み込まれる。</p></li>
<li><p><strong>ライト・アヘッド・バッファ</strong>：メッセージがWALに書き込まれた後、それらは一時的にWrite-Ahead Bufferに保存される。これにより、リモートWALストレージからメッセージをフェッチすることなく、ログのテールリードが可能になる。</p></li>
<li><p><strong>複数のWALストレージをサポート</strong>：Woodpecker、Pulsar、Kafka。ゼロディスク・モードでwoodpeckerを使用することで、リモートWALストレージへの依存を取り除くことができます。</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">回復ストレージ<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Recovery Storage</strong>コンポーネントは、対応するWALコンポーネントが配置されているストリーミング・ノード上で常に実行されます。</p>
<ul>
<li><p>これはストリーミングデータを永続化された履歴データに変換し、オブジェクトストレージに格納する役割を果たします。</p></li>
<li><p>また、ストリーミング・ノード上のWALコンポーネントのメモリ内状態の回復も行う。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>回復ストレージ</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">クエリ・デレゲータ<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Query Delegatorは</strong>各ストリーミング・ノード上で実行され、単一シャード上で<strong>インクリメンタルなクエリーを</strong>実行する。クエリプランを生成し、関連するクエリノードに転送し、結果を集約する。</p>
<p>さらに、Query Delegatorは<strong>Deleteオペレーションを</strong>他のQuery Nodeにブロードキャストする役割も担っている。</p>
<p>Query Delegatorは常に同じストリーミングノード上でWALコンポーネントと共存する。しかし、コレクションがマルチレプリカで構成されている場合、<strong>N-1個の</strong>Delegator が他のストリーミングノードに配置されます。</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">WALの寿命とWait for Ready<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>コンピューティングノードとストレージを分離することで、Milvusはストリーミングノードから別のストリーミングノードへWALを簡単に転送することができ、ストリーミングサービスの高可用性を実現します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>WALライフタイム</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">レディ待ち<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>WALが新しいストリーミングノードに移動する際、古いストリーミングノードではリクエストが拒否されることがあります。一方、新しいストリーミング・ノードではWALが回収されるので、クライアントは新しいストリーミング・ノードでWALが提供できるようになるのを待ちます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>待機</span> </span></p>
