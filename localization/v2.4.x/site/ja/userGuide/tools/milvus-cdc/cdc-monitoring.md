---
id: cdc-monitoring.md
order: 4
summary: Milvus-CDCは、Grafanaダッシュボードを通じて包括的な監視機能を提供します。
title: モニタリング
---
<h1 id="Monitoring" class="common-anchor-header">モニタリング<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDCは、Grafanaダッシュボードを通じて包括的な監視機能を提供し、主要なメトリクスを可視化し、変更データキャプチャ（CDC）タスクの円滑な運用とサーバーの健全性を確保することができます。</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">CDC タスクのメトリクス</h3><p>始めるには、<a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a>ファイルを Grafana にインポートします。これにより、CDC タスクのステータスを監視するために特別に設計されたダッシュボードが追加されます。</p>
<p><strong>CDC Grafanaダッシュボードの概要</strong>：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>キーメトリクスの説明</strong></p>
<ul>
<li><p><strong>タスク</strong>：<strong>初期状態</strong>、<strong>実行中</strong>、<strong>一時停止など</strong>、さまざまな状態にある CDC タスクの数。</p></li>
<li><p><strong>リクエスト合計</strong>: Milvus-CDCが受信したリクエストの合計数。</p></li>
<li><p><strong>リクエスト成功数</strong>：Milvus-CDCが受信したリクエストの成功数。</p></li>
<li><p><strong>タスク数</strong>タスク数:<strong>初期</strong>状態、<strong>一時停止</strong>状態、<strong>実行</strong>中のタスクの数。</p></li>
<li><p><strong>タスクの状態</strong>：個々のタスクの状態。</p></li>
<li><p><strong>リクエスト数</strong>：成功したリクエスト数と総リクエスト数</p></li>
<li><p><strong>リクエストレイテンシー</strong>：p99経由のリクエストのレイテンシー、平均、その他の統計。</p></li>
<li><p><strong>レプリケートデータレート</strong>：読み取り/書き込み操作のレプリケーションデータレート</p></li>
<li><p><strong>レプリケートタイムラグ</strong>：読み取り/書き込み操作のレプリケーションタイムラグ。</p></li>
<li><p><strong>api execute count</strong>：異なるMilvus-CDC APIが実行された回数。</p></li>
<li><p><strong>center ts</strong>：読み書きタスクのタイムスタンプ。</p></li>
</ul>
