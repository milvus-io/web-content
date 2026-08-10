---
id: snapshot-use-cases.md
title: スナップショットの活用例Compatible with Milvus 3.0.x
summary: このガイドでは、スナップショットの一般的な活用例をご紹介します。
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">スナップショットの活用例<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、スナップショットの一般的な利用例について解説します。</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">データのバックアップと復元<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>スナップショットは、データの特定の時点の状態を素早く取得したイメージであり、迅速なロールバックやテスト（数日から数週間）に適しています。一方、バックアップは独立した完全なコピーであり、長期的な災害復旧（数週間から数年）や、ストレージ全体の障害に対するより確実な保護を目的として、別途保存されます。</p>
<p>以下の表は、スナップショットとバックアップを比較したものです。</p>
<table>
   <tr>
     <th></th>
     <th><p>バックアップ</p></th>
     <th><p>スナップショット</p></th>
   </tr>
   <tr>
     <td><p>バックアップの作成</p></td>
     <td><p>すべてのデータファイルをコピーする（時間がかかる）</p></td>
     <td><p>メタデータのみを作成（数ミリ秒）</p></td>
   </tr>
   <tr>
     <td><p>復元</p></td>
     <td><p>データをインポートし、インデックスを再構築します</p></td>
     <td><p>既存のデータファイルとインデックスファイルのみをコピーします</p></td>
   </tr>
   <tr>
     <td><p>パフォーマンス</p></td>
     <td><p>処理が遅く、リソースを大量に消費する</p></td>
     <td><p>高速で軽量（数秒～数分）</p></td>
   </tr>
   <tr>
     <td><p>システムへの影響</p></td>
     <td><p>I/OおよびCPU使用率が高い</p></td>
     <td><p>影響は最小限</p></td>
   </tr>
</table>
<p>スナップショットの作成には通常ミリ秒単位の時間がかかり、復元にはデータ量に応じて数秒から数分かかります。</p>
<p>スナップショットの制限、制約、およびシステムへの影響の詳細については、「<a href="/docs/ja/snapshots.md">スナップショット</a>」を参照してください。</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">外部コレクションを使用したデータ処理<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>スナップショットは、分析や検証ワークロード向けに、特定の時点における安定したデータソースを提供できます。Milvusのスナップショットについては、スナップショットファイルを汎用的なSpark入力として直接読み込むのではなく、<code translate="no">milvus-table</code> という外部コレクション形式を使用してください。 Milvusスナップショットには、コレクションのメタデータ、セグメントマニフェスト、削除ログ、および主キーの統計情報が格納されているため、Milvusでは正しいスキーマと削除のセマンティクスを維持するために、スナップショットのメタデータJSONと<code translate="no">milvus-table</code> リーダーが必要です。</p>
<p>このワークフローは、スナップショットデータに対してクエリ可能な外部コレクションを作成します。メインカラムのデータは引き続きスナップショットソースから参照され、リフレッシュ処理によってソースの StorageV3 マニフェストがターゲットの外部セグメントにマッピングされます。</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">ステップ 1: スナップショットのメタデータパスを取得する<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>通常の Milvus コレクションからスナップショットを作成するか選択し、そのスナップショットを記述してオブジェクトストレージ上の場所を取得します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">ステップ 2: `<code translate="no">milvus-table</code> ` 外部コレクションの作成とリフレッシュ<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>スナップショットソースコレクションとスキーマが一致する外部コレクションを作成します。「<code translate="no">external_spec.format</code> 」を「<code translate="no">&quot;milvus-table&quot;</code> 」に設定し、各ターゲットデータフィールドの「<code translate="no">external_field</code> 」を対応するソースフィールド名に設定します。</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>更新が完了したら、インデックスを作成し、外部コレクションにデータをロードして、スナップショットをバックエンドとするビューに対して検索やクエリ操作を実行できます。</p>
