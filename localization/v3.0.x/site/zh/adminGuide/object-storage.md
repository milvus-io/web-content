---
id: object-storage.md
title: 对象存储
---
<h1 id="Object-Storage" class="common-anchor-header">对象存储<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 将索引文件和二进制日志（即其数据的主体）存储在对象存储中。Milvus 支持 MinIO 以及多种 S3 兼容和云对象存储。</p>
<h2 id="Supported-object-storage" class="common-anchor-header">支持的对象存储<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>提供商/服务</th><th style="text-align:center">作为 Milvus 对象存储受支持</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️（自托管部署的默认选项）</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Azure Blob 存储</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google 云存储 (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>阿里云 OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>腾讯COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>华为云 OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>其他兼容 S3 的存储服务</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>有关配置的详细信息，请参阅<a href="/docs/zh/deploy_s3.md">《使用 Docker Compose 或 Helm 配置对象存储</a>》和《<a href="/docs/zh/object_storage_operator.md">使用 Milvus Operator 配置对象存储</a>》。</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">使用嵌入式 Woodpecker 时的额外要求<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>当您运行默认的<strong>Woodpecker</strong>消息队列及其对象存储后端（<code translate="no">storage.type=minio</code> ）时，Woodpecker 会将其预写日志写入同一对象存储，并要求<strong>严格遵守 S3 条件写入语义</strong>。 并非所有对象存储都符合要求——例如，尽管华为云 OBS 可以作为常规的 Milvus 对象存储使用，但目前<strong>不支持</strong>将其用作 Woodpecker 的后端。</p>
<p>有关各提供商的具体要求，请参阅<a href="/docs/zh/woodpecker.md">Woodpecker</a>页面上的对象存储兼容性对照表。</p>
