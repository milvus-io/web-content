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
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - 軽量でメンテナンスフリー</h3><p>MemoryBufferモードは、Woodpeckerの組み込みクライアントが一時的にメモリに書き込みをバッファリングし、定期的にクラウドオブジェクトストレージサービスにフラッシュするシンプルで軽量なデプロイメントオプションです。このモードでは、メモリバッファはクライアントに直接組み込まれており、S3にフラッシュする前に効率的なバッチ処理を行うことができます。メタデータは<strong>etcdを使って</strong>管理され、一貫性と協調性を確保する。このモードは、小規模なデプロイメントやパフォーマンスよりもシンプルさを優先する本番環境で、特に書き込みレイテンシの低さが重要でない場合に、バッチを多用するワークロードに最適です。このモードでの書き込みレイテンシは、通常200-500ミリ秒の間である。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>ウッドペッカーのメモリモード展開</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - 低レイテンシ、高耐久性のために最適化されています。</h3><p>QuorumBufferモードは、リアルタイムな応答性と強力な耐障害性の両方を必要とする、レイテンシ重視の高頻度読み書きワークロード向けに設計されています。このモードでは、Woodpeckerのクライアントは3レプリカのクォーラムシステムと相互作用し、高速書き込みバッファリングを提供し、分散コンセンサスによる強力な一貫性と高可用性を保証します。</p>
<p>クライアントが3つのクォーラムノードのうち少なくとも2つにデータをレプリケートし、通常1桁ミリ秒以内に完了すると書き込みが成功したとみなされ、その後データは長期耐久性のためにクラウドオブジェクトストレージに非同期でフラッシュされます。このアーキテクチャは、ノード上の状態を最小化し、大規模なローカルディスクボリュームを不要にし、従来のクォーラムベースのシステムでしばしば必要とされる複雑なアンチエントロピー修復を回避します。</p>
<p>その結果、一貫性、可用性、迅速なリカバリが不可欠なミッションクリティカルな本番環境に理想的な、合理的で堅牢なWALレイヤーを実現しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>ウッドペッカーのクォーラムモードの展開</span> </span></p>
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
    </button></h2><p>シングルノード、シングルクライアント、シングルのログストリーム設定におけるWoodpeckerのパフォーマンスを評価するため、包括的なベンチマークを実行しました。KafkaやPulsarと比較したところ、その結果は印象的なものでした：</p>
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
<p>Woodpeckerは特に、順序の維持が重要な同時大量書き込みに最適化されています。そして、これらの結果は開発の初期段階を反映したものに過ぎず、I/Oマージ、インテリジェント・バッファリング、プリフェッチにおける現在進行中の最適化により、性能は理論的限界にさらに近づくことが期待されます。</p>
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
    </button></h2><p>Woodpeckerのクラウドネイティブアーキテクチャは、運用面で大きなメリットをもたらします：</p>
<ul>
<li><strong>ローカルストレージ管理ゼロ</strong>：ディスクボリュームの管理、RAIDの設定、ハードウェアの故障を排除します。</li>
<li><strong>自動スケーリング</strong>：容量計画を立てることなく、クラウドオブジェクトストレージに合わせてストレージを拡張</li>
<li><strong>コスト効率</strong>：自動階層化と圧縮機能を備えた従量制ストレージ</li>
<li><strong>高可用性</strong>：クラウドプロバイダの11-9の耐久性と高速リカバリを活用</li>
<li><strong>シンプルな導入</strong>：2つの導入モード（MemoryBuffer/QuorumBuffer）が異なる運用ニーズに対応</li>
<li><strong>開発者に優しい</strong>：より迅速な環境セットアップと全ての環境で一貫したアーキテクチャ</li>
</ul>
<p>これらの利点により、Woodpeckerは、運用のシンプルさがパフォーマンスと同じくらい重要な、ミッションクリティカルなRAG、AIエージェント、低レイテンシの検索ワークロードにとって特に価値のあるものとなっています。</p>
