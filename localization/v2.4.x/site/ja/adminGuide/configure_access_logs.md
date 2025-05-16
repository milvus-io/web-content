---
id: configure_access_logs.md
title: アクセスログの設定
summary: ''
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
    </button></h1><p>Milvusのアクセスログ機能を利用することで、サーバ管理者はユーザのアクセス行動を記録・分析し、クエリの成功率や失敗理由などを把握することができます。</p>
<p>本ガイドでは、Milvusにおけるアクセスログの設定方法について詳しく説明します。</p>
<p>アクセスログの設定は、Milvusのインストール方法によって異なります：</p>
<ul>
<li><strong>Helm インストール：</strong> <code translate="no">values.yaml</code> 。詳細については、<a href="/docs/ja/v2.4.x/configure-helm.md">HelmチャートによるMilvusの設定を</a>参照してください。</li>
<li><strong>Docker インストール</strong>：<code translate="no">milvus.yaml</code> 。詳細については、<a href="/docs/ja/v2.4.x/configure-docker.md">Docker Composeを使用したMilvusの設定を</a>参照してください。</li>
<li><strong>Operator インストール</strong>：設定ファイルの<code translate="no">spec.components</code> 。詳細については、<a href="/docs/ja/v2.4.x/configure_operator.md">Milvus OperatorでMilvusを設定するを</a>参照してください。</li>
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
    </button></h2><p>ニーズに応じて3つの設定オプションから選択します：</p>
<ul>
<li><strong>基本設定</strong>：基本設定: 一般的な目的。</li>
<li><strong>ローカルアクセスログファイル用設定</strong>：ログをローカルに保存します。</li>
<li><strong>ローカルアクセスログをMinIOにアップロードするための設定</strong>：クラウドストレージおよびバックアップ用。</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">基本設定</h3><p>基本設定では、アクセスログを有効にし、ログのファイル名を定義するか、標準出力を使用します。</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>:アクセスログ機能を有効にするかどうか。デフォルトは<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.filename</code>:アクセスログのファイル名。このパラメータを空にすると、アクセスログは標準出力に出力されます。</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">ローカルアクセスログファイルの設定</h3><p>ローカルファイルパス、ファイルサイズ、ローテーション間隔などのパラメータを使用して、アクセスログファイルのローカルストレージを設定します：</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    enable: true
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    maxSize: <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    rotatedTime: <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    maxBackups: <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>これらのパラメータは、<code translate="no">filename</code> が空でない場合に指定します。</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>:アクセスログファイルが保存されるローカルファイルパス。</li>
<li><code translate="no">proxy.accessLog.maxSize</code>:1つのアクセスログファイルに許される最大サイズ（MB）。ログファイルのサイズがこの制限に達した場合、ローテーション処理が開始されます。この処理は、現在のアクセス・ログ・ファイルを封印し、新しいログ・ファイルを作成し、元のログ・ファイルの内容を消去します。</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>:1つのアクセス・ログ・ファイルをローテーションするために許容される最大時間間隔を秒単位で指定します。指定された時間間隔に達すると、ローテーション処理がトリガーされ、新しいアクセスログファイルが作成され、前のアクセスログファイルが封印されます。</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>:封印されたアクセスログファイルの最大保持数。封印されたアクセスログファイルの数がこの上限を超えると、最も古いアクセスログファイルが削除されます。</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">ローカルアクセスログファイルのMinIOへのアップロード設定</h3><p>ローカルアクセスログファイルをMinIOにアップロードする設定を有効にして構成します：</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: <span class="hljs-literal">true</span>
    remotePath: <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    remoteMaxTime: 0
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>MinIOパラメータを構成する場合、<code translate="no">maxSize</code> または<code translate="no">rotatedTime</code> のいずれかを設定していることを確認する。この設定を行わないと、ローカルアクセスログファイルのMinIOへのアップロードに失敗する可能性がある。</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>:ローカルアクセスログファイルをMinIOにアップロードするかどうか。デフォルトは<strong>false</strong>です。</li>
<li><code translate="no">proxy.accessLog.remotePath</code>:アクセスログファイルをアップロードするオブジェクトストレージのパス。</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>:アクセスログファイルのアップロードに許可される時間間隔。ログファイルのアップロード時間がこの間隔を超えると、ファイルは削除されます。値を 0 に設定すると、この機能は無効になります。</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">フォーマッタ設定<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>すべてのメソッドで使用されるデフォルトのログフォーマットは<code translate="no">base</code> フォーマットで、特定のメソッドの関連付けを必要としません。しかし、特定のメソッドのログ出力をカスタマイズしたい場合は、カスタムログフォーマットを定義し、関連するメソッドに適用することができます。</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    formatters:
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      base: 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_name</span>-<span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$error_code</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      query: 
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$method_name</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>] [database: <span class="hljs-variable">$database_name</span>] [collection: <span class="hljs-variable">$collection_name</span>] [partitions: <span class="hljs-variable">$partition_name</span>] [expr: <span class="hljs-variable">$method_expr</span>]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        methods: [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>:ダイナミック・メトリクスを使用してログ・フォーマットを定義します。詳細は、「<a href="#reference-supported-metrics">サポートされるメトリッ ク</a>」を参照してください。</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>:このフォーマッタを使用するMilvus操作をリストします。メソッド名を取得するには、<a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvusメソッドの</a> <strong>MilvusServiceを</strong>参照してください。</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">参照：サポートされているメトリクス<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>メトリック名</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>メソッド名</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>アクセスのステータス：<strong>OK</strong>または<strong>失敗</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>クエリ、検索、または削除操作に使用される式</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>アクセスに関連するTraceID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>ユーザのIPアドレス</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>ユーザの名前</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>レスポンスデータのサイズ</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Milvus特有のエラーコード</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>詳細エラーメッセージ</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>対象のMilvusデータベース名</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>対象のMilvusコレクション名</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>対象のMilvusパーティション名</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>アクセス完了までの時間</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>アクセスログが出力された時刻 (通常<code translate="no">$time_end</code> と同じ)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>アクセス開始時刻</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>アクセス終了時刻</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>ユーザが使用したMilvus SDKのバージョン</td></tr>
</tbody>
</table>
