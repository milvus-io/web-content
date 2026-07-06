---
id: object-storage.md
title: Объектное хранилище
---
<h1 id="Object-Storage" class="common-anchor-header">Объектное хранилище<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus хранит индексные файлы и двоичные журналы — основную часть своих данных — в объектном хранилище. Milvus поддерживает MinIO, а также ряд S3-совместимых и облачных объектных хранилищ.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">Поддерживаемые объектные хранилища<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>Поставщик / сервис</th><th style="text-align:center">Поддерживается в качестве объектного хранилища Milvus</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (по умолчанию для самохостинговых развёрток)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Хранилище Azure Blob</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Другие хранилища, совместимые с S3</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Подробности настройки см. в разделах <a href="/docs/ru/deploy_s3.md">«Настройка объектного хранилища с помощью Docker Compose или Helm</a> » и <a href="/docs/ru/object_storage_operator.md">«Настройка объектного хранилища с помощью Milvus Operator</a>».</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">Дополнительные требования при использовании встроенного Woodpecker<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>При запуске стандартной очереди сообщений <strong>Woodpecker</strong> с бэкендом объектного хранилища (<code translate="no">storage.type=minio</code>) Woodpecker записывает свой журнал предварительной записи в то же объектное хранилище, что и требует <strong>строгой семантики S3 Conditional-Write</strong>. Не каждое объектное хранилище соответствует этим требованиям — например, Huawei Cloud OBS в настоящее время <strong>не</strong> поддерживается в качестве бэкэнда Woodpecker, хотя и работает как обычное объектное хранилище Milvus.</p>
<p>Точные требования для каждого провайдера см. в таблице совместимости объектных хранилищ на странице <a href="/docs/ru/woodpecker.md">Woodpecker</a>.</p>
