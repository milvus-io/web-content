---
id: object-storage.md
title: 物件儲存
---
<h1 id="Object-Storage" class="common-anchor-header">物件儲存<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 將索引檔案和二進位日誌（即其大部分資料）儲存於物件儲存中。Milvus 支援 MinIO 以及多種 S3 相容與雲端物件儲存服務。</p>
<h2 id="Supported-object-storage" class="common-anchor-header">支援的物件儲存<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>供應商／服務</th><th style="text-align:center">作為 Milvus 物件儲存的支援</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️（自建部署的預設選項）</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Azure Blob 儲存</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>阿里雲 OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>騰訊 COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>華為雲 OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>其他 S3 相容儲存服務</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>有關設定詳情，請參閱<a href="/docs/zh-hant/deploy_s3.md">《使用 Docker Compose 或 Helm 設定物件儲存》</a>以及<a href="/docs/zh-hant/object_storage_operator.md">《使用 Milvus Operator 設定物件儲存</a>》。</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">使用內嵌式 Woodpecker 時的額外要求<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>當您執行預設的<strong>Woodpecker</strong>訊息佇列及其物件儲存後端（<code translate="no">storage.type=minio</code> ）時，Woodpecker 會將其預寫日誌寫入相同的物件儲存中，並需要<strong>嚴格遵循 S3 條件寫入語義</strong>。 並非所有物件儲存服務都符合資格——例如，儘管華為雲 OBS 可作為常規的 Milvus 物件儲存使用，但目前<strong>尚不支援</strong>作為 Woodpecker 的後端。</p>
<p>請參閱<a href="/docs/zh-hant/woodpecker.md">Woodpecker</a>頁面上的物件儲存相容性對照表，以了解各供應商的具體要求。</p>
