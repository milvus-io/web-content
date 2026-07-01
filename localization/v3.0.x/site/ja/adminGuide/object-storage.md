---
id: object-storage.md
title: オブジェクトストレージ
---
<h1 id="Object-Storage" class="common-anchor-header">オブジェクトストレージ<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、インデックスファイルやバイナリログ（データの大部分）をオブジェクトストレージに保存します。Milvusは、MinIOをはじめ、さまざまなS3互換およびクラウドオブジェクトストレージに対応しています。</p>
<h2 id="Supported-object-storage" class="common-anchor-header">サポートされているオブジェクトストレージ<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>プロバイダー／サービス</th><th style="text-align:center">Milvusのオブジェクトストレージとしてサポートされているもの</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️（セルフホスト型デプロイメントのデフォルト）</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Azure Blob Storage</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>その他のS3互換ストレージ</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>設定の詳細については、<a href="/docs/ja/deploy_s3.md">「Docker Compose または Helm を使用したオブジェクトストレージの設定</a>」および「<a href="/docs/ja/object_storage_operator.md">Milvus Operator を使用したオブジェクトストレージの設定</a>」を参照してください。</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">組み込み型 Woodpecker を使用する際の追加要件<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>デフォルトの<strong>Woodpecker</strong>メッセージキューをオブジェクトストレージバックエンド（<code translate="no">storage.type=minio</code> ）とともに実行する場合、Woodpecker はその書き込み先行ログ（write-ahead log）を同じオブジェクトストレージに書き込むため、<strong>厳格な S3 Conditional-Write セマンティクス</strong>が必要となります。 すべてのオブジェクトストレージが要件を満たすわけではありません。たとえば、Huawei Cloud OBSは、通常のMilvusオブジェクトストレージとしては機能しますが、Woodpeckerのバックエンドとしては現在<strong>サポートされていません</strong>。</p>
<p>プロバイダーごとの具体的な要件については、<a href="/docs/ja/woodpecker.md">Woodpecker</a>ページのオブジェクトストレージ互換性マトリックスを参照してください。</p>
