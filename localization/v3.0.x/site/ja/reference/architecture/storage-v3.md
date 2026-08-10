---
id: storage-v3.md
title: ストレージ V3Compatible with Milvus 3.0.x
summary: Milvus 3.0 のどの機能に Storage V3 が必要か、その有効化方法、および適用される互換性の制限についてご確認ください。
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">ストレージ V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>AIデータセットは、コレクションが作成された後も変化し続けることがよくあります。モデルやワークフローの変更に伴い、チームはテキストを追加したり、既存のエンティティに対して新しいベクトルフィールドを生成したり、Milvusの外部に保存されたデータを利用したりする必要が生じる場合があります。こうしたワークフローに対応するには、データセットの変化に合わせて進化できるストレージモデルが必要です。</p>
<p>Storage V3は、Milvus 3.0においてこのモデルを提供します。バージョン管理されたストレージレイアウトを採用し、時間の経過とともに追加または書き換えられたデータを組み込みつつ、アプリケーションは引き続き同じMilvus APIを通じてコレクションにアクセスできます。</p>
<p>Storage V3はデフォルトで無効になっています。<code translate="no">common.storage.useLoonFFI</code> が有効になると、新規の書き込みおよびコンパクション出力にはStorage V3が使用されます。既存のデータは、対象となるデータがバックグラウンドでのコンパクションによって書き換えられるまで、現在のレイアウトのまま保持されます。この移行期間中、Milvusは両方のレイアウトからデータを読み取ることができます。Storage V3は、一般的なパフォーマンス最適化のためではなく、Storage V3に依存する機能を利用するために有効にしてください。</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Storage V3 のデータ形式<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3では、基盤となるデータ形式とは独立してコレクションデータを記述するためにマニフェストを使用します。これにより、Milvusによって管理されるデータと、外部システムに残っているデータの両方を、同じストレージ層で処理できるようになります。</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">管理対象コレクションのファイル形式<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>管理対象コレクションの場合、<code translate="no">dataNode.storage.format</code> が新しいStorage V3データのファイル形式を選択します。この設定では、以下の値がサポートされています：</p>
<table>
<thead>
<tr><th>形式</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>デフォルトの、広く採用されているカラム型ファイル形式であり、幅広いエコシステムとの互換性と成熟したツールセットを備えています。Parquetはデータを行グループに整理し、列ごとのエンコーディングと圧縮をサポートしているため、Milvusは必要な列のみを読み取り、大規模なシーケンシャルスキャンを効率的に処理できます。</td></tr>
<tr><td><code translate="no">vortex</code></td><td>拡張可能で組み合わせ可能なエンコーディングと豊富な統計情報を基盤とした、オプションの次世代カラム型ファイル形式です。Milvusにおいて、Vortexはカラム投影、範囲読み取り、およびランダムアクセス読み取りをサポートします。これらの機能により、適切なワークロードにおいて不要なデータ読み取りを削減できます。</td></tr>
</tbody>
</table>
<p><code translate="no">dataNode.storage.format</code> を変更すると、Storage V3への新規書き込みに影響します。既存のファイルは、コンパクションによって対応するセグメントが書き換えられるまで、現在の形式を維持します。代表的なベンチマークにより、<code translate="no">vortex</code> がデータやアクセスパターンにより適していることが示されない限り、ほとんどの導入環境ではデフォルトの<code translate="no">parquet</code> 形式を維持すべきです。</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">外部コレクションとサポートされるソース形式<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>外部コレクションを使用することで、Milvusは外部ファイルやテーブルに保存されたデータを利用できます。Storage V3は、以下の外部ソース形式をサポートしています：</p>
<table>
<thead>
<tr><th>形式</th><th>カテゴリ</th><th>想定されるソース</th><th>Storage V3での対応状況</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>ファイル形式</td><td>Parquet ファイルを含むディレクトリまたはオブジェクトストレージのプレフィックス。</td><td>ファイルを検出し、そのメタデータと行グループを読み取り、Storage V3 マニフェストに記録します。</td></tr>
<tr><td><code translate="no">vortex</code></td><td>ファイル形式</td><td>Vortex ファイルを含むディレクトリまたはオブジェクトストレージのプレフィックス。</td><td>ファイルを検出し、Vortex のレイアウトと統計情報を使用して、プロジェクション、範囲読み取り、およびランダムアクセス読み取りを行います。</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>テーブル形式</td><td>Lance データセットディレクトリ。</td><td>データセットのメタデータを読み取り、そのフラグメントを Storage V3 マニフェストにマッピングします。</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>テーブル形式Iceberg メタデータ JSON ファイルおよびスナップショット ID。</td><td>Iceberg メタデータ JSON ファイルおよびスナップショット ID。</td><td>指定されたスナップショットを解決し、そのデータファイルを計画し、位置削除メタデータを保持します。等価削除はサポートされておらず、外部コレクションを更新する前に位置削除に変換する必要があります。</td></tr>
</tbody>
</table>
<p>外部ソースは読み取り専用です。Storage V3 は、ソースデータを変更またはコピーすることなく、独自のマニフェストを作成および更新します。その後、Milvus はインデックスを構築し、外部コレクションを通じてデータに対する検索やクエリを実行できます。</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">クラウドストレージとアカウント間認証</h4><p>以下の表は、外部コレクションが別のクラウドアカウントに保存されたソースデータにアクセスする方法についてのみ説明しています。Milvusが管理するデータに使用されるオブジェクトストレージについては説明していません。</p>
<table>
<thead>
<tr><th>クラウドストレージ</th><th>サポートされる外部フォーマット</th><th>外部コレクションのアカウント間認証</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>上記の4つの形式すべて。</td><td>お客様が所有する IAM ロールの ARN を指定してください。Storage V3 は、AWS STS（<code translate="no">AssumeRole</code> ）を使用して一時的な認証情報を取得し、必要に応じて更新します。また、ロールの信頼ポリシーで要求される場合は、外部 ID を指定することもできます。</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>上記の 4 つの形式すべて。</td><td>対象のサービスアカウントを指定してください。Storage V3 はそのサービスアカウントになりすまし、その短命な OAuth アクセストークンを使用してソースバケットにアクセスし、トークンが期限切れになる前に更新します。</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>、<code translate="no">vortex</code> 、および<code translate="no">lance-table</code> 。<code translate="no">iceberg-table</code> はサポートされていません。</td><td>Milvusは、<code translate="no">milvus-tools</code> のプライベートgRPCサービスを通じて、短期間有効なSAS認証情報を要求します。Storage V3は、このSAS認証情報を使用してソースコンテナにアクセスし、有効期限が切れる前に認証情報を更新します。</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>上記の4つの形式すべて。</td><td>Milvus は、<code translate="no">milvus-tools</code> プライベート gRPC サービスを介して、有効期間が短い SAS 認証情報を要求します。Storage V3 は、この SAS 認証情報を使用してソース コンテナにアクセスし、認証情報は有効期限が切れる前に更新されます。</td></tr>
<tr><td>Alibaba Cloud Object Storage Service (OSS)</td><td>上記の 4 つの形式すべて。</td><td>お客様が所有する RAM ロールの ARN を指定してください。Storage V3 は、ランタイムのワークロード ID または ECS RAM ロールを使用してそのロールを引き継ぎ、一時的な認証情報を使用してソース バケットにアクセスします。</td></tr>
</tbody>
</table>
<p>外部コレクションの設定および使用方法については、「<a href="/docs/ja/create-an-external-collection.md">外部コレクションの作成</a>」を参照してください。</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Storage V3 が必要な機能<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><th>機能</th><th>説明</th><th>必要な構成</th></tr>
</thead>
<tbody>
<tr><td>Vortex ファイル形式</td><td>Vortex ファイル形式で新しい管理対象コレクションのデータを書き込みます。</td><td><ul><li><a href="/docs/ja/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/ja/text.md"><code translate="no">TEXT</code> field</a></td><td>パッセージ、ドキュメント、チケット、ログなどの長いソーステキストを、コレクションスキーマに固定の最大長を設定することなく保存します。</td><td><a href="/docs/ja/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/ja/add-fields-to-an-existing-collection.md">関数生成ベクトルフィールド</a></td><td>既存のコレクションに BM25 または MinHash 関数を追加することで、Milvus が既存の<code translate="no">VARCHAR</code> フィールドから新しいベクトルフィールドを生成します。Milvus は、バックグラウンドでのコンパクションを通じて、既存エンティティに対して生成された値を非同期でバックフィルします。</td><td><ul><li><a href="/docs/ja/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/ja/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/ja/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/ja/create-an-external-collection.md">外部コレクション</a></td><td>Milvusの外部に保存されているデータを、管理対象コレクションにコピーすることなくクエリできます。ソースデータが変更された場合は、外部コレクションを更新してください。追加のソースフィールドを公開するには、「<a href="/docs/ja/alter-external-collection-schema.md">外部コレクションスキーマの変更</a>」を参照してください。</td><td><a href="/docs/ja/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Storage V3 を有効にする前に<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>MilvusがStorage V3にデータを書き込んだ後、Storage V3を読み取れないMilvusのバージョンへのダウングレードはサポートされていません。後でStorage V3を無効にしても、既存のすべてのStorage V3データが即座に変換されたり、旧バージョンとの互換性が復元されたりすることはありません。</p>
</div>
<p>Storage V3 を有効にする前に、以下のデータの挙動についてご確認ください。</p>
<ul>
<li><code translate="no">dataCoord.compaction.storageVersion.enabled</code> はデフォルトで有効になっているため、対象となる既存のデータはバックグラウンドでのコンパクションを通じて段階的にStorage V3へ移行されます。</li>
<li>Storage V3を無効にすると、今後の書き込みおよび対象となるコンパクション出力に対するターゲットストレージバージョンが変更されます。これにより、既存のすべてのStorage V3データが同期的に変換されるわけではなく、バージョンのダウングレードが安全に行えるようになるわけでもありません。</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Storage V3を有効にする<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの設定で、<code translate="no">common.storage.useLoonFFI</code> を<code translate="no">true</code> に設定します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus はこの設定をリフレッシュ可能として扱います。デプロイメントでサポートされている configuration-update ワークフローを通じて変更を適用してください。静的な設定ファイルを編集するだけでは、実行中のデプロイメントが新しい値を受け取ったことが保証されません。</p>
<p>既存のコレクションにFunctionとその生成されたベクトルフィールドを追加する予定の場合は、既存データのバックフィルに必要な2つのコンパクション設定も有効にしてください:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>既存エンティティに対する関数の出力は、バックグラウンドでのコンパクションを通じて非同期に生成されます。スキーマの更新が成功したからといって、すべての既存エンティティに対するバックフィルが完了したとは限りません。</p>
<h2 id="Related-documentation" class="common-anchor-header">関連ドキュメント<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/text.md">テキストフィールド</a></li>
<li><a href="/docs/ja/add-fields-to-an-existing-collection.md">コレクションスキーマの変更</a></li>
<li><a href="/docs/ja/create-an-external-collection.md">外部コレクションの作成</a></li>
<li><a href="/docs/ja/install-overview.md">Milvusのデプロイメントオプションの概要</a></li>
<li><a href="/docs/ja/upgrade_milvus_standalone-helm.md">Helmチャートを使用したMilvusスタンドアロンのアップグレード</a></li>
<li><a href="/docs/ja/upgrade_milvus_cluster-helm.md">Helmチャートを使用したMilvusクラスタのアップグレード</a></li>
<li><a href="/docs/ja/configure_common.md">共通関連の設定</a></li>
<li><a href="/docs/ja/configure_datacoord.md">dataCoord に関連する設定</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Loonを開発した理由：絶えず変化し続けるAIデータのためのストレージエンジン</a>— Storage V3の設計動機に関するエンジニアリングの背景。</li>
</ul>
