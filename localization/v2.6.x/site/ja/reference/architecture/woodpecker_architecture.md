---
id: woodpecker_architecture.md
title: ウッドペッカー
summary: >-
  WoodpeckerはMilvus
  2.6のクラウドネイティブWALシステムです。ゼロディスクアーキテクチャと2つのデプロイモードにより、オブジェクトストレージ上で高スループット、低運用オーバーヘッド、シームレスなスケーラビリティを実現します。
---
<h1 id="Woodpecker" class="common-anchor-header">ウッドペッカー<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 2.6では、WoodpeckerがKafkaとPulsarに代わり、専用に構築されたクラウド・ネイティブのライト・アヘッド・ログ（WAL）システムを提供します。オブジェクト・ストレージのために設計されたWoodpeckerは、運用を簡素化し、スループットを最大化し、容易にスケールします。</p>
<p>Woodpeckerの設計目標</p>
<ul>
<li><p>クラウド環境における最高のスループット</p></li>
<li><p>信頼性の高いリカバリのための耐久性のある追記のみのロギング</p></li>
<li><p>ローカルディスクや外部ブローカーを使用しない最小限の運用オーバーヘッド</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">ゼロディスク・アーキテクチャ<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpeckerの中核となるイノベーションは、ゼロディスク・アーキテクチャです：</p>
<ul>
<li>全てのログデータはクラウドオブジェクトストレージ（Amazon S3、Google Cloud Storage、Alibaba OSなど）に保存されます。</li>
<li>メタデータは<strong>etcdの</strong>ような分散キーバリューストアで管理されます。</li>
<li>コアオペレーションにおいてローカルディスクに依存しない</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>ウッドペッカーレイヤー</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">アーキテクチャ・コンポーネント<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>標準的なWoodpeckerのデプロイメントには以下のコンポーネントが含まれます：</p>
<ul>
<li><strong>クライアント</strong>読み書きのリクエストを発行するインターフェース層</li>
<li><strong>LogStore: ログストア</strong>：高速書き込みバッファリング、ストレージへの非同期アップロード、ログ圧縮の管理</li>
<li><strong>ストレージバックエンド</strong>S3、GCS、EFSのようなファイルシステムなど、スケーラブルで低コストのストレージサービスをサポートする。</li>
<li><strong>Etcd</strong>：分散ノード間でメタデータを保存し、ログの状態を調整する。</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">デプロイモード<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpeckerはお客様のニーズに合わせて2つのデプロイメントモードを提供します：</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - 軽量でメンテナンスフリー</h3><p>MemoryBufferモードは、Woodpeckerが一時的にメモリに書き込みをバッファリングし、定期的にクラウドオブジェクトストレージサービスにフラッシュする、シンプルで軽量なデプロイメントオプションです。メタデータは<strong>etcdを使って</strong>管理され、一貫性と協調性を確保します。このモードは、特に書き込みレイテンシの低さが重要でない場合、パフォーマンスよりもシンプルさを優先する小規模なデプロイや本番環境でのバッチ負荷の高いワークロードに最適です。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>ウッドペッカーのメモリモード展開</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - 低レイテンシ、高耐久性のために最適化されています。</h3><p>QuorumBufferモードは、レイテンシに敏感で、リアルタイムの応答性と強力な耐障害性の両方を必要とする高頻度の読み書きワークロード用に設計されています。このモードでは、Woodpeckerは3レプリカのクォーラム書き込みによる高速書き込みバッファとして機能し、強力な一貫性と高可用性を保証します。</p>
<p>書き込みは、3つのノードのうち少なくとも2つのノードにレプリケートされると成功とみなされ、通常1桁ミリ秒以内に完了します。このアーキテクチャは、ノード上の状態を最小化し、大規模なローカル・ディスク・ボリュームの必要性を排除し、従来のクォーラムベースのシステムでしばしば必要とされる複雑なアンチエントロピー修復を回避します。</p>
<p>その結果、一貫性、可用性、迅速なリカバリが不可欠なミッションクリティカルな本番環境に理想的な、合理的で堅牢なWALレイヤーを実現しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>ウッドペッカーメモリーモードの展開</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">性能ベンチマーク<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>シングルノード、シングルクライアント、シングルのログストリームのセットアップでWoodpeckerのパフォーマンスを評価するために包括的なベンチマークを実行しました。KafkaやPulsarと比較したところ、その結果は素晴らしいものでした：</p>
<table>
<thead>
<tr><th>システム</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WPローカル</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>スループット</td><td>129.96MB/s</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>待ち時間</td><td>58ms</td><td>35ms</td><td>184ms</td><td>1.8ms</td><td>166ms</td></tr>
</tbody>
</table>
<p>コンテキストとして、テストマシンで異なるストレージバックエンドの理論上のスループット限界を測定した：</p>
<ul>
<li>MinIO：～110MB/秒</li>
<li>ローカルファイルシステム：600～750MB/s</li>
<li>Amazon S3（シングルEC2インスタンス）：最大1.1GB/秒</li>
</ul>
<p>驚くべきことに、Woodpeckerは各バックエンドで可能な最大スループットの60～80%を一貫して達成しました。</p>
<h3 id="Key-performance-insights" class="common-anchor-header">パフォーマンスに関する主な考察</h3><ul>
<li>ローカルファイルシステムモード：Woodpeckerは、Kafkaより3.5倍、Pulsarより4.2倍速い450MB/秒を達成し、待ち時間はわずか1.8ミリ秒と超低遅延であるため、高性能なシングルノード展開に最適です。</li>
<li>クラウド・ストレージ・モード（S3）：S3に直接書き込む場合、WoodpeckerはKafkaより5.8倍、Pulsarより7倍速い750MB/秒（S3の理論限界の約68%）を達成しました。レイテンシは166ミリ秒と大きいが、このセットアップはバッチ指向のワークロードに卓越したスループットを提供する。</li>
<li>オブジェクト・ストレージ・モード（MinIO）：MinIOでも、Woodpeckerは71MB/秒（MinIO容量の約65%）を達成しました。この性能はKafkaやPulsarに匹敵しますが、必要なリソースは大幅に少なくなります。</li>
</ul>
<p>Woodpeckerは特に、順序の維持が重要な同時大量書き込みに最適化されています。また、これらの結果は開発の初期段階を反映したものに過ぎず、I/Oマージ、インテリジェント・バッファリング、プリフェッチにおける現在進行中の最適化により、性能は理論的限界にさらに近づくことが期待されます。</p>
<h2 id="Operational-benefits" class="common-anchor-header">運用上のメリット<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpeckerのクラウドネイティブアーキテクチャは、デプロイを合理化し、メンテナンスを軽減し、信頼性を向上させます。</p>
<h3 id="Simplified-infrastructure-management" class="common-anchor-header">インフラ管理の簡素化</h3><ul>
<li><strong>ローカルストレージ管理が不要：</strong>ディスクボリューム、RAID、ディスク障害を管理する必要がなくなります。</li>
<li><strong>ハードウェアへの依存度を低減：</strong>ハードウェアの設定や監視が不要になり、耐久性と可用性はクラウド・オブジェクト・ストレージが管理します。</li>
<li><strong>キャパシティプランニングの簡素化：</strong>ストレージはクラウド・オブジェクト・ストレージによって自動的に拡張されるため、手動で予測する必要がなくなります。</li>
</ul>
<h3 id="Simplified-deployment" class="common-anchor-header">導入の簡素化</h3><ul>
<li><strong>メモリーバッファモード：</strong>最小限のリソースしか使用せず、クラウドストレージとの統合が可能。</li>
<li><strong>QuorumBufferモード：</strong>従来の分散ストレージのような複雑さを伴わず、エンタープライズグレードの信頼性を提供します。</li>
</ul>
<h2 id="Cost-efficiency-and-resource-optimization" class="common-anchor-header">コスト効率とリソースの最適化<button data-href="#Cost-efficiency-and-resource-optimization" class="anchor-icon" translate="no">
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
<li><strong>メモリ使用量の削減：</strong>効率的なバッファリングにより、従来のブローカーと比較してメモリ要件を削減します。</li>
<li><strong>弾力的なスケーリング：</strong>従量課金制のクラウドストレージにより、過剰なプロビジョニングを排除します。</li>
<li><strong>インフラストラクチャオーバーヘッドの削減：</strong>コンポーネントが少ないため、導入コストとメンテナンスコストが削減されます。</li>
</ul>
<h3 id="Storage-cost-advantages" class="common-anchor-header">ストレージコストのメリット</h3><ul>
<li><strong>階層型ストレージ：</strong>コスト効率の高いクラウド・ストレージ・ティアにデータを自動的に移行し、長期保存を実現します。</li>
<li><strong>圧縮と重複排除：</strong>内蔵機能により、運用に余分な手間をかけることなくストレージコストを削減します。</li>
<li><strong>レプリケーションのオーバーヘッドなし：</strong>耐久性はクラウドストレージによって管理されるため、手動でレプリカを管理する必要はありません。</li>
</ul>
<h2 id="High-availability-and-disaster-recovery" class="common-anchor-header">高可用性とディザスタリカバリ<button data-href="#High-availability-and-disaster-recovery" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Simplified-fault-tolerance" class="common-anchor-header">簡素化されたフォールトトレランス</h3><ul>
<li><strong>クラウドネイティブの耐久性：</strong>クラウド・プロバイダーの11ナイン（99.9999999%）の耐久性保証を活用。</li>
<li><strong>迅速なリカバリ：</strong>最小限のローカル状態により、迅速なノード交換とクラスタ復旧を実現します。</li>
<li><strong>クロスリージョンの回復力：</strong>クラウドストレージ機能を使用したクロスリージョンレプリケーションをサポートします。</li>
</ul>
<h3 id="Operational-resilience" class="common-anchor-header">運用面での回復力</h3><ul>
<li><strong>単一障害点の削減：</strong>コンポーネント数の削減により、障害リスクを低減します。</li>
<li><strong>自動フェイルオーバー：</strong>クラウドストレージの冗長化により、フェイルオーバーを簡素化します。</li>
<li><strong>バックアップの簡素化：</strong>統合されたクラウドストレージが自動バックアップとバージョン管理を提供します。</li>
</ul>
<h2 id="Development-and-operational-experience" class="common-anchor-header">開発と運用の経験<button data-href="#Development-and-operational-experience" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Improved-development-workflow" class="common-anchor-header">開発ワークフローの改善</h3><ul>
<li><strong>より迅速な環境設定：</strong>最小限の依存関係により、開発とテストをスピードアップします。</li>
<li><strong>一貫したアーキテクチャ：</strong>開発、ステージング、本番環境で統一された設計。</li>
<li><strong>クラウドネイティブな統合：</strong>クラウドサービスやコンテナオーケストレーションとのシームレスな互換性。</li>
</ul>
<h3 id="Enhanced-production-operations" class="common-anchor-header">本番運用の強化</h3><ul>
<li><strong>予測可能なパフォーマンス：</strong>デプロイの規模や構成にかかわらず、一貫した結果が得られます。</li>
<li><strong>アップグレードの簡素化：</strong>ステートレス設計により、ダウンタイムの少ないローリングアップデートが可能。</li>
<li><strong>リソースの予測可能性：</strong>従来のメッセージ・ブローカーと比較して、より安定したリソース使用。</li>
</ul>
<p>ミッションクリティカルなRAG、AIエージェント、低レイテンシの検索ワークロードをサポートするベクターデータベースにとって、これらの運用上の利点は革命的です。複雑なメッセージブローカースタックからWoodpeckerのシンプルなアーキテクチャに移行することで、パフォーマンスが向上するだけでなく、開発チームやインフラチームの運用負担が大幅に軽減されます。</p>
<p>S3 Express One Zoneのようなイノベーションによりクラウドインフラが進化し続ける中、Woodpeckerのアーキテクチャは、大規模な運用変更やシステムの再設計を必要とすることなく、これらの進歩の恩恵を自動的に受けることを可能にします。</p>
