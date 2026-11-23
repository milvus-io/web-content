---
id: configure_access_logs.md
title: アクセスログの設定
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">アクセスログの設定<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusのアクセスログ機能により、サーバー管理者はユーザーのアクセス行動を記録・分析し、クエリの成功率や失敗の原因などの把握に役立てることができます。</p>
<p>このガイドでは、Milvusでのアクセスログの設定方法について詳しく説明します。</p>
<p>アクセスログの設定方法は、Milvusのインストール方法によって異なります。</p>
<ul>
<li><strong>Helm によるインストール</strong>：<code translate="no">values.yaml</code> で設定します。詳細については、「<a href="/docs/ja/configure-helm.md">Helm チャートを使用した Milvus の設定</a>」を参照してください。</li>
<li><strong>Docker インストール</strong>：<code translate="no">milvus.yaml</code> で設定します。詳細については、「<a href="/docs/ja/configure-docker.md">Docker Compose を使用した Milvus の設定</a>」を参照してください。</li>
<li><strong>Operatorによるインストール</strong>：設定ファイル内の<code translate="no">spec.components</code> を変更します。詳細については、<a href="/docs/ja/configure_operator.md">「Milvus Operatorを使用したMilvusの設定</a>」を参照してください。</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">設定オプション<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>ニーズに応じて、以下の 3 つの設定オプションから選択してください:</p>
<ul>
<li><strong>基本設定</strong>: 一般的な用途向け。</li>
<li><strong>ローカルアクセスログファイル用設定</strong>：ログをローカルに保存する場合。</li>
<li><strong>ローカルアクセスログを MinIO にアップロードするための設定</strong>：クラウドストレージおよびバックアップ用。</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">基本設定<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>基本設定では、アクセスログを有効にし、ログファイル名を指定するか、stdoutを使用します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: アクセスログ機能を有効にするかどうか。デフォルトは<strong>false</strong> です。</li>
<li><code translate="no">proxy.accessLog.filename</code>: アクセスログファイルの名前。このパラメータを空のままにすると、アクセスログは stdout に出力されます。</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">ローカルアクセスログファイルの設定<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>ローカルファイルパス、ファイルサイズ、ローテーション間隔などのパラメータを使用して、アクセスログファイルのローカル保存先を設定します:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>これらのパラメータは、<code translate="no">filename</code> が空でない場合に指定されます。</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: アクセスログファイルが保存されるローカルファイルパス。デフォルトは<code translate="no">/tmp/milvus_access</code> です。</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: 1つのアクセスログファイルに許可される最大サイズ（MB単位）。ログファイルのサイズがこの制限に達すると、ローテーション処理がトリガーされます。この処理により、現在のアクセスログファイルがシールされ、新しいログファイルが作成され、元のログファイルの内容が消去されます。デフォルトは<strong>64</strong> です。</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: 1つのアクセスログファイルのローテーションに許容される最大時間間隔（秒単位）。指定された時間間隔に達すると、ローテーション処理がトリガーされ、新しいアクセスログファイルが作成され、以前のファイルがシールされます。デフォルトは<strong>0</strong> です。</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: 保持できるシール済みアクセスログファイルの最大数。シール済みアクセスログファイルの数がこの制限を超えると、最も古いものが削除されます。デフォルトは<strong>8</strong> です。</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">ローカルのアクセスログファイルを MinIO にアップロードするための設定<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>ローカルのアクセスログファイルをMinIOにアップロードするための設定を有効化し、構成します:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>MinIOパラメータを設定する際は、<code translate="no">maxSize</code> または<code translate="no">rotatedTime</code> のいずれかを設定していることを確認してください。設定していない場合、ローカルのアクセスログファイルがMinIOに正常にアップロードされない可能性があります。</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: ローカルのアクセスログファイルを MinIO にアップロードするかどうか。デフォルトは<strong>false</strong> です。</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: アクセスログファイルをアップロードするオブジェクトストレージのパス。デフォルトは<code translate="no">access_log/</code> です。</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: アクセスログファイルのアップロードに許容される時間間隔。ログファイルのアップロード時間がこの間隔を超えると、ファイルは削除されます。値を 0 に設定すると、この機能は無効になります。デフォルトは<strong>0</strong> です。</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">フォーマッタの設定<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>すべてのメソッドでデフォルトで使用されるログ形式は<code translate="no">base</code> 形式であり、特定のメソッドとの関連付けは必要ありません。ただし、特定のメソッドのログ出力をカスタマイズしたい場合は、カスタムログ形式を定義し、関連するメソッドに適用することができます。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: 動的メトリクスを用いたログ形式を定義します。詳細については、「<a href="#reference-supported-metrics">サポートされているメトリクス</a>」を参照してください。</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: このフォーマッタを使用するMilvusの操作を一覧表示します。メソッド名については、「<a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvusメソッド</a>」の「<strong>MilvusService</strong>」を参照してください。</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">参照: サポートされているメトリクス<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>メトリクス名</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>メソッド名</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>アクセスステータス:<strong>OK</strong>または<strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>クエリ、検索、または削除操作に使用される式</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>アクセスに関連付けられたTraceID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>ユーザーのIPアドレス</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>ユーザーの名前</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>レスポンスデータのサイズ</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Milvus固有のエラーコード</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>詳細なエラーメッセージ</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>対象のMilvusデータベース名</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>対象のMilvusコレクション名</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>対象となるMilvusパーティションの名前（1つまたは複数）</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>アクセス完了までの所要時間</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>アクセスログが出力された時刻（通常は `<code translate="no">$time_end</code>` と同等）</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>アクセスが開始された時刻</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>アクセスが終了した時刻</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>ユーザーが使用したMilvus SDKのバージョン</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>エラーの種類：<strong>system_error</strong>または<strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>リクエストの出力フィールド</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>設定されたクラスタプレフィックス<code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>リクエストの一貫性レベル</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>検索またはハイブリッド検索リクエストのベクトルフィールド</td></tr>
<tr><td><code translate="no">$nq</code></td><td>検索またはハイブリッド検索リクエストのクエリベクトルの数</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>検索またはハイブリッド検索リクエストの検索パラメータ</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>クエリリクエストのクエリパラメータ</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>クライアントが gRPC メタデータに設定するリクエスト時刻</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>各式テンプレート値の長さ</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>アップサートリクエストが部分更新であるかどうか</td></tr>
</tbody>
</table>
