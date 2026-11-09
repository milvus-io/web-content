---
id: idempotent-import.md
order: 2
title: 冪等な一括インポート
summary: 再試行された一括インポートが、2つ目のジョブを作成するのではなく、元のジョブとして処理されるように、イデポテンシーキーを送信してください。
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">冪等な一括インポート<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>一括インポートのリクエストは成功しても、そのレスポンスが失われることがあります。たとえば、呼び出しがタイムアウトしたり、接続が切断されたり、返された<code translate="no">jobId</code> を保存する前にオーケストレーターが停止したりする場合です。「未完了」と「完了したが応答が失われた」を区別することはできません。再試行すると 2 つ目のジョブが開始され、すべての行が 2 回処理されてしまいます。一方、再試行しないとインポートが失われる可能性があります。</p>
<p>冪等性キーを使用すれば、この二者択一を回避できます。リクエストに冪等性キーを付与しておけば、同じキーを持つ再試行が行われた際、2つ目のジョブが作成される代わりに、元の<code translate="no">jobId</code> が返されます。</p>
<p>冪等性のある一括インポートには、Milvus 3.0.2以降、または2.6系では2.6.24以降が必要です。それより古いサーバーではヘッダーが無視され、リクエスト（再試行の有無にかかわらず）ごとに新しいジョブが開始されます。</p>
<h2 id="Sending-the-key" class="common-anchor-header">キーの送信<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>キーは、リクエスト本文ではなく、<code translate="no">Idempotency-Key</code> HTTPヘッダーとして送信されます。</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">&quot;Idempotency-Key&quot;</code> です。生の文字列でも機能します。 パラメータおよび を使用するには、3.x 系では pymilvus v3.0.3 以降、2.6 系では v2.6.18 以降が必要です。 古いバージョンの pymilvus では、上記の ` ` 行は、 の検索時に ` ` エラーで失敗し、` ` を ` ` に渡すと未定義の挙動となります。呼び出しがエラーになる場合もあれば、キーなしでインポートが実行される場合もあります。<code translate="no">headers</code> <code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">import</code> <code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">ImportError</code> <code translate="no">headers</code> <code translate="no">bulk_import</code> </p>
<p>通常通り、返された<code translate="no">jobId</code> を使用して<code translate="no">/v2/vectordb/jobs/import/describe</code> をポーリングします。元のジョブがまだ登録中の間にリトライが到着した場合、リトライはそのジョブを待機するため、リトライが登録が中途半端なジョブを検知することはありません。</p>
<h2 id="Choosing-a-key" class="common-anchor-header">キーの選択<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>論理的なリクエストごとに1つのキーを使用します。</strong> <code translate="no">orders-2026-09-07-batch-3</code> のような作業単位に名前を付けるか、UUIDを生成して、リクエストを送信する前にその作業項目と共に保存してください。同じ作業を再実行する必要が生じる可能性がある場合は、試行番号を含めてください。</li>
<li><strong>再試行時には同じキーを使用してください。</strong>再試行時に新しいキーを生成すると、データが重複してしまいます。「<a href="#when-to-send-a-new-key">新しいキーを送信すべき場合</a>」の項に例外が記載されています。</li>
<li><strong>異なるファイルに対して同じキーを再利用しないでください。</strong>Milvusは2つのリクエストを比較しません。元の<code translate="no">jobId</code> が返され、新しいファイルはインポートされません。</li>
<li><strong>キーは短く、印刷可能な形式にしてください。</strong>デフォルトでは、印刷可能なASCII文字で最大256バイトです（<code translate="no">streaming.idempotency.maxKeyLength</code> ）。これ以外の形式は、エラー「<code translate="no">1100</code> 」で拒否されます。</li>
<li><strong>機密情報を含めないでください。</strong>鍵はデータとともに保存されます。</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">キーの保持期間<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>キーは内部IDによってコレクションにスコープが限定されるため、リトライでコレクションを新しい名前で指定する限り、コレクションの名前を変更してもリトライは失敗しません。ただし、コレクションを削除して同じ名前で再作成するとリトライは失敗するため、その場合は新しいジョブを実行する必要があります。</p>
<p>Milvusはインポートキーを約1日間保持します。これは保証された値ではなく、あくまで目安として扱ってください。DDLやインポートのトラフィックが集中すると保持期間は短縮され、コーディネーターの再起動によって延長されます。キーが失効した後の再試行では、新しいジョブが開始されます。</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">新しいキーを送信するタイミング<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>ケースは2つ、そしてそれだけです：</p>
<ul>
<li><strong>元のジョブが失敗したか、中止された場合です。</strong>`Describe` コマンドは理由を伴う `<code translate="no">state: Failed</code> ` を返します。キーが記憶されている限り、そのキーを再試行しても同じ `<code translate="no">jobId</code> ` が返されます。原因を修正してから、新しいキーを送信してください。</li>
<li><strong>元のジョブがクリーンアップされた場合。</strong>Milvusは完了したジョブを<code translate="no">dataCoord.import.taskRetention</code> （デフォルトでは48時間）間保持します<strong>。</strong>キーがまだ記憶されている間にこの期限が切れた場合、再試行では古い<code translate="no">jobId</code> が返され、describeコマンドにはジョブの状態ではなく<code translate="no">import job does not exist</code> というエラーが返されます。そのジョブは成功していた可能性があります。新しいキーを送信する前に、データが欠落していることを確認してください。</li>
</ul>
<p>たとえば、インポートジョブの上限に達しているなどの理由でリトライが拒否された場合は、これらのケースには該当しません。後で同じキーを使用して再試行してください。</p>
<h2 id="Configuration" class="common-anchor-header">設定<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>このページの動作は4つのパラメータによって制御されます。キーが機能するために、これらを変更する必要はありません。</p>
<table>
<thead>
<tr><th>パラメータ</th><th>デフォルト</th><th>機能の説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>インポートキーが保持される期間。デフォルトの<code translate="no">milvus.yaml</code> には含まれていません。変更するには明示的に追加してください。また、このストアは重複したDDL送信を拒否するため、インポート期間を短縮するためだけにこの値を小さくしないでください。</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>同一のストアが保持できるキーおよびDDLレコードの最大数。この上限に達すると、経過時間に関係なく最も古いものが破棄されます。これにより、DDLやインポートのトラフィックが集中している場合でも、<code translate="no">maxLifetime</code> より前にキーが破棄されるようになります。デフォルトの<code translate="no">milvus.yaml</code> には含まれていません。</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48時間) バージョン2.6.24および3.0.2以降；それ以前は<code translate="no">10800</code> </td><td>完了したインポートジョブがクエリの対象として保持される期間。少なくとも<code translate="no">maxLifetime</code> の2倍に設定してください。</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>キーの最大長（バイト単位）。これを超える長さのキーは、エラー「<code translate="no">1100</code> 」で拒否されます。「<code translate="no">0</code> 」を指定すると、この制限が無効になります。デフォルトの「<code translate="no">milvus.yaml</code> 」には存在しません。</td></tr>
</tbody>
</table>
<p>2.6.24 および 3.0.2 より前に提供された<code translate="no">milvus.yaml</code> では、<code translate="no">taskRetention: 10800</code> が明示的に設定されており、アップグレードを行ってもファイル内の値は上書きされません。そのファイルを使用してアップグレードした場合は、<code translate="no">taskRetention</code> を少なくとも 2 倍の値<code translate="no">maxLifetime</code> に引き上げてください。新しい値は、変更後に完了するジョブにのみ適用されます。</p>
