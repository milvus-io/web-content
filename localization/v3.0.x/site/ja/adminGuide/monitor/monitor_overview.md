---
id: monitor_overview.md
title: モニターの概要
related_key: 'monitor, alert'
summary: Milvusにおいて、PrometheusとGrafanaがサービスの監視やアラート通知にどのように活用されているかをご紹介します。
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Milvus モニタリングフレームワークの概要<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvus が Prometheus を使用してメトリクスを監視し、Grafana を使用してメトリクスを可視化およびアラートを作成する方法について説明します。</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">MilvusにおけるPrometheus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheusは</a>、Kubernetes環境向けのオープンソースの監視およびアラートツールキットです。メトリクスを時系列データとして収集・保存します。つまり、メトリクスは記録された時点のタイムスタンプとともに、ラベルと呼ばれるオプションのキー・値ペアと共に保存されます。</p>
<p>現在、MilvusではPrometheusの以下のコンポーネントを使用しています：</p>
<ul>
<li>エクスポーターによって設定されたエンドポイントからデータを取得するためのPrometheusエンドポイント。</li>
<li>Prometheusオペレーター：Prometheusモニタリングインスタンスを効率的に管理します。</li>
<li>Kube-prometheus：運用しやすいエンドツーエンドのKubernetesクラスタ監視機能を提供します。</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">メトリック名<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheusにおける有効なメトリック名は、ネームスペース、サブシステム、名前の3つの要素で構成されます。これら3つの要素は「_」で連結されます。</p>
<p>Prometheus によって監視される Milvus メトリックのネームスペースは「milvus」です。 メトリックのサブシステムは、次のいずれかです：「cdc」、「cgo」、「datacoord」、「datanode」、「indexnode」、「logging」、「meta」、「msg_queue」、「msgstream」、 「proxy」、「querycoord」、「querynode」、「rootcoord」、「storage」、「streaming」、「streamingcoord」、「streamingnode」、および「wal」のいずれかです。<code translate="no">milvus_build_info</code> や<code translate="no">milvus_num_node</code> などの一部のメトリクスには、サブシステムがありません。</p>
<p>たとえば、クエリされたベクトルの総数を計算する Milvus メトリックは、<code translate="no">milvus_proxy_search_vectors_count</code> という名前が付いています。</p>
<h3 id="Metric-types" class="common-anchor-header">メトリックタイプ<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus は 4 種類のメトリクスをサポートしています。</p>
<ul>
<li>Counter：値が増加するか、再起動時にゼロにリセットされるのみの累積型メトリクス。</li>
<li>ゲージ（Gauge）：値が増減するメトリクスのタイプです。</li>
<li>ヒストグラム：設定可能なバケットに基づいてカウントされるメトリクスのタイプです。一般的な例として、リクエスト所要時間が挙げられます。</li>
<li>サマリー（Summary）：ヒストグラムに類似したメトリックの一種で、スライディングタイムウィンドウ上で設定可能な分位数を算出します。</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">メトリックラベル<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus は、同じメトリック名を持つサンプルをラベル付けすることで区別します。ラベルとは、メトリックの特定の属性のことです。同じ名前のメトリックは、<code translate="no">variable_labels</code> フィールドの値が同一でなければなりません。以下の表に、Milvus メトリックの一般的なラベルの名前と意味を示します。</p>
<table>
<thead>
<tr><th>ラベル名</th><th>定義</th><th>値</th></tr>
</thead>
<tbody>
<tr><td>“node_id”</td><td>ロールの固有識別子。</td><td>Milvusによって生成されるグローバルに一意なID。</td></tr>
<tr><td>「status」</td><td>処理された操作またはリクエストのステータス。</td><td>「abandon」、「success」、または「fail」。</td></tr>
<tr><td>「query_type」</td><td>読み取りリクエストのタイプ。</td><td>「search」または「query」。</td></tr>
<tr><td>「msg_type」</td><td>メッセージのタイプ。</td><td>「insert」、「delete」、「search」、または「query」。</td></tr>
<tr><td>「segment_state」</td><td>セグメントの状態。</td><td>「Sealed」、「Growing」、「Flushed」、「Flushing」、「Dropped」、または「Importing」。</td></tr>
<tr><td>「cache_state」</td><td>キャッシュされたオブジェクトの状態。</td><td>「hit」または「miss」。</td></tr>
<tr><td>「cache_name」</td><td>キャッシュされたオブジェクトの名前。このラベルは、「cache_state」というラベルと組み合わせて使用されます。</td><td>例：「CollectionID」、「Schema」など。</td></tr>
<tr><td>「channel_name」</td><td>メッセージストレージ（Pulsar または Kafka）内の物理トピック。</td><td>例：「by-dev-rootcoord-dml_0」、「by-dev-rootcoord-dml_255」など。</td></tr>
<tr><td>「function_name」</td><td>特定のリクエストを処理する関数の名前。</td><td>例：「CreateCollection」、「CreatePartition」、「CreateIndex」など。</td></tr>
<tr><td>「user_name」</td><td>認証に使用するユーザー名。</td><td>任意のユーザー名。</td></tr>
<tr><td>「index_task_status」</td><td>メタストレージにおけるインデックスタスクのステータス。</td><td>「unissued」、「in-progress」、「failed」、「finished」、または「recycled」。</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Milvus における Grafana<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafanaは</a>、あらゆるデータソースと連携可能なオープンソースの可視化スタックです。メトリクスを取得することで、ユーザーが膨大なデータを理解、分析、監視するのを支援します。</p>
<p>Milvusでは、メトリクスの可視化にGrafanaのカスタマイズ可能なダッシュボードを採用しています。</p>
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
    </button></h2><p>監視とアラートの基本的なワークフローについて学んだ後は、以下について学びましょう：</p>
<ul>
<li><a href="/docs/ja/monitor.md">監視サービスのデプロイ</a></li>
<li><a href="/docs/ja/visualize.md">Milvus メトリクスの可視化</a></li>
<li><a href="/docs/ja/alert.md">アラートの作成</a></li>
</ul>
