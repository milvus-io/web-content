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
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Storage V3 を必要とする機能<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><th>機能</th><th>説明</th><th>必要な設定</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ja/text.md"><code translate="no">TEXT</code> field</a></td><td>コレクションスキーマに固定の最大長を設定することなく、文章、文書、チケット、ログなどの長いソーステキストを保存します。</td><td><a href="/docs/ja/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/ja/add-fields-to-an-existing-collection.md">関数生成ベクトルフィールド</a></td><td>既存のコレクションに BM25 または MinHash 関数を追加すると、Milvus は既存の「<code translate="no">VARCHAR</code> 」フィールドから新しいベクトルフィールドを生成します。Milvus は、バックグラウンドでのコンパクションを通じて、既存エンティティに対して生成された値を非同期でバックフィルします。</td><td><ul><li><a href="/docs/ja/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/ja/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/ja/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
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
<li>Storage V3を無効にすると、今後の書き込みおよび対象となるコンパクション出力に対するターゲットストレージバージョンが変更されます。これにより、既存のすべてのStorage V3データが同期的に変換されるわけではなく、バージョンのダウングレードが安全になるわけでもありません。</li>
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
<p>Milvus はこの設定を「更新可能」として扱います。デプロイメントでサポートされている configuration-update ワークフローを通じて変更を適用してください。静的な設定ファイルを編集するだけでは、実行中のデプロイメントが新しい値を受け取ったことが保証されません。</p>
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
