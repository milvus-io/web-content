---
id: configure_streaming.md
related_key: configure
group: system_configuration.md
summary: Milvusのストリーミング設定方法をご紹介します。
---
<h1 id="streaming-related-Configurations" class="common-anchor-header">ストリーミング関連設定<button data-href="#streaming-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>ストリーミングサービスに関連するあらゆる設定。</p>
<h2 id="streamingwalBalancertriggerInterval" class="common-anchor-header"><code translate="no">streaming.walBalancer.triggerInterval</code><button data-href="#streamingwalBalancertriggerInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="streaming.walBalancer.triggerInterval">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>バックグラウンドでのバランスタスクのトリガー間隔。 </li>      
        <li>time.ParseDurationを参照してください。</li>      </td>
      <td>1m</td>
    </tr>
  </tbody>
</table>
<h2 id="streamingwalBalancerbackoffInitialInterval" class="common-anchor-header"><code translate="no">streaming.walBalancer.backoffInitialInterval</code><button data-href="#streamingwalBalancerbackoffInitialInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="streaming.walBalancer.backoffInitialInterval">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>バランス・タスク・トリガーのバックオフの初期間隔。 </li>      
        <li>time.ParseDurationを参照してください。</li>      </td>
      <td>50ms</td>
    </tr>
  </tbody>
</table>
<h2 id="streamingwalBalancerbackoffMultiplier" class="common-anchor-header"><code translate="no">streaming.walBalancer.backoffMultiplier</code><button data-href="#streamingwalBalancerbackoffMultiplier" class="anchor-icon" translate="no">
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
    </button></h2><table id="streaming.walBalancer.backoffMultiplier">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        バランスタスクトリガーのバックオフの乗数。      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="streamingwalBroadcasterconcurrencyRatio" class="common-anchor-header"><code translate="no">streaming.walBroadcaster.concurrencyRatio</code><button data-href="#streamingwalBroadcasterconcurrencyRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="streaming.walBroadcaster.concurrencyRatio">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        walブロードキャスターのCPU数に基づく同時実行率、デフォルトは1。      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="streamingtxndefaultKeepaliveTimeout" class="common-anchor-header"><code translate="no">streaming.txn.defaultKeepaliveTimeout</code><button data-href="#streamingtxndefaultKeepaliveTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="streaming.txn.defaultKeepaliveTimeout">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        wal txnのデフォルトのキープアライブタイムアウト、デフォルトでは10s      </td>
      <td>10s</td>
    </tr>
  </tbody>
</table>
