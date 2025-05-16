---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Milvusのシステム構成について。
title: ''
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Milvusシステム構成チェックリスト<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvusのシステムコンフィギュレーションの一般的なセクションを紹介します。</p>
<p>Milvusはシステムを構成するために相当数のパラメータを保持しています。各設定にはデフォルト値があり、そのまま使用することができます。これらのパラメータを柔軟に変更することで、Milvusがお客様のアプリケーションによりよく対応できるようになります。詳細は<a href="/docs/ja/v2.4.x/configure-docker.md">Milvusの設定を</a>参照してください。</p>
<div class="alert note">
現在のリリースでは、すべてのパラメータはMilvusの起動時に設定された後に有効になります。</div>
<h2 id="Sections" class="common-anchor-header">セクション<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>メンテナンスの便宜のため、Milvusはコンポーネント、依存関係、および一般的な使用方法に基づいて設定を%sセクションに分類しています。</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Milvusのメタデータとサービスディスカバリの保存に使用されるetcdの関連設定。</p>
<p>このセクションの各パラメータの詳細については、「<a href="/docs/ja/v2.4.x/configure_etcd.md">etcd関連設定</a>」を参照してください。</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_metastore.md">メタストア関連設定を</a>参照してください。</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Milvusメタデータの保存に使用されるtikvの関連設定。</p>
<p>メタストアとしてTiKVを有効にした場合でも、サービスディスカバリのためにetcdが必要であることに注意してください。</p>
<p>TiKVはメタデータのサイズが水平方向のスケーラビリティを必要とする場合に有効なオプションである。</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_tikv.md">tikv関連の設定を</a>参照してください。</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_localstorage.md">localStorage関連の設定を</a>参照。</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>MinIO/S3/GCSまたはその他のサービスの関連設定は、Milvusのデータ永続化を担うS3 APIをサポートする。</p>
<p>以下の説明では簡単のため、ストレージサービスを MinIO/S3 と呼ぶ。</p>
<p>このセクションの各パラメータの詳細については、「<a href="/docs/ja/v2.4.x/configure_minio.md">Minio関連設定」を</a>参照してください。</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvusはrocksmq(RockDBベース)、natsmq(組み込みnats-server)、Pulsar、Kafkaの4つのMQをサポートしています。</p>
<p>mq.typeフィールドを設定することでMQを変更することができます。</p>
<p>mq.typeフィールドをデフォルトに設定しない場合は、このファイルに複数のmqを設定する場合の優先順位の有効化に関する注意書きがあります。</p>
<ol>
<li><p>スタンドアロン(ローカル)モード: rocksmq(デフォルト) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>クラスタモード：  Pulsar(デフォルト) &gt; Kafka (rocksmqとnatsmqはクラスタ・モードではサポートされていません)</p></li>
</ol>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_mq.md">mq関連設定を</a>参照してください。</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>最近の変異操作のMilvusログを管理し、ストリーミング・ログを出力し、ログ・パブリッシュ・サブスクライブ・サービスを提供するために使用されるpulsarの関連設定。</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_pulsar.md">pulsar関連設定を</a>参照してください。</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>kafkaを有効にしたい場合は、pulsarコンフィギュレーションにコメントを付ける必要があります。</p>
<p>kafka：</p>
<p>brokerList：</p>
<p>saslUsername：</p>
<p>saslPassword：</p>
<p>saslMechanisms</p>
<p>securityProtocol：</p>
<p>ssl：</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout：10</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_rocksmq.md">rocksmq関連の設定を</a>参照。</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>natsmqの設定。</p>
<p>詳細: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_natsmq.md">natsmq関連設定を</a>参照のこと。</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>データ定義言語(DDL)およびデータ制御言語(DCL)リクエストの処理に使用される rootCoordの関連設定。</p>
<p>このセクションの各パラメータの詳細については、「<a href="/docs/ja/v2.4.x/configure_rootcoord.md">rootCoord 関連設定</a>」を参照してください。</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>プロキシ関連設定 クライアントリクエストを検証し、返される結果を削減するために使用されます。</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_proxy.md">プロキシ関連の設定 を</a>参照のこと。</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>queryCoordの関連設定。クエリノードのトポロジーと負荷分散を管理し、成長しているセグメントからシールされたセグメントへのハンドオフに使用される。</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_querycoord.md">queryCoord関連設定を</a>参照してください。</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>queryNodeの関連設定。ベクトルデータとスカラーデータのハイブリッド検索を実行するために使用される。</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_querynode.md">queryNode 関連設定を</a>参照のこと。</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>このセクションの各パラメータの詳細については<a href="/docs/ja/v2.4.x/configure_indexcoord.md">indexCoord 関連設定を</a>参照のこと。</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>この節の各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_indexnode.md">indexNode 関連設定を</a>参照のこと。</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>この節の各パラメータに関する詳細な説明は、<a href="/docs/ja/v2.4.x/configure_datacoord.md">dataCoord 関連設定を</a>参照のこと。</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>この節の各パラメータの詳細については、「<a href="/docs/ja/v2.4.x/configure_datanode.md">dataNode 関連コンフィギュレーション</a>」を 参照してください。</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>このトピックでは、Milvusのメッセージチャネル関連の設定を紹介します。</p>
<p>このセクションの各パラメータの詳細については、「<a href="/docs/ja/v2.4.x/configure_msgchannel.md">msgChannel関連設定</a>」を参照してください。</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>システムログ出力の設定を行います。</p>
<p>このセクションの各パラメータの詳細については、「<a href="/docs/ja/v2.4.x/configure_log.md">ログ関連設定</a>」を参照してください。</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_grpc.md">grpc 関連の設定を</a>参照してください。</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>プロキシ tls enable を設定します。</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_tls.md">tls 関連の設定を</a>参照してください。</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>この節の各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_common.md">共通関連の設定を</a>参照のこと。</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, Milvusのクォータとリミットの設定。</p>
<p>デフォルトでは</p>
<ol>
<li><p>TT保護；</p></li>
<li><p>メモリ保護.</p></li>
<li><p>ディスククォータ保護.</p></li>
</ol>
<p>有効にすることができます：</p>
<ol>
<li><p>DMLスループット制限；</p></li>
<li><p>DDL、DQL qps/rps制限；</p></li>
<li><p>DQLキュー長/待ち時間の保護；</p></li>
<li><p>DQL結果レートの保護；</p></li>
</ol>
<p>必要に応じて、手動でRW要求を強制的に拒否することもできます。</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_quotaandlimits.md">quotaAndLimits関連の設定を</a>参照してください。</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_trace.md">トレース関連の設定を</a>参照してください。</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#GPUインデックスを使用する場合、Milvusはメモリプールを利用し、頻繁なメモリの割り当てと解放を回避します。</p>
<p>#ここで, メモリプールが占有するメモリサイズをMB単位で設定できます.</p>
<p>#実際のメモリ需要がmaxMemSizeで設定した値を超えると、Milvusがクラッシュする可能性があることに注意してください。</p>
<p>#initMemSizeとMaxMemSizeの両方が0に設定されている場合、</p>
<p>#milvusは利用可能なGPUメモリの半分を自動的に初期化します、</p>
<p>#maxMemSizeは利用可能なGPUメモリ全体を初期化します。</p>
<p>このセクションの各パラメータの詳細については、<a href="/docs/ja/v2.4.x/configure_gpu.md">gpu関連の設定を</a>参照してください。</p>
