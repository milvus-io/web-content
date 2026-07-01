---
id: object-storage.md
title: Archiviazione a oggetti
---
<h1 id="Object-Storage" class="common-anchor-header">Archiviazione a oggetti<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus archivia i file di indice e i log binari — la maggior parte dei propri dati — nell’object storage. Milvus supporta MinIO e una vasta gamma di archivi di oggetti cloud e compatibili con S3.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">Archivi a oggetti supportati<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>Fornitore / servizio</th><th style="text-align:center">Supportato come archiviazione a oggetti Milvus</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (impostazione predefinita per le distribuzioni self-hosted)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Azure Blob Storage</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Altri servizi di archiviazione compatibili con S3</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Per i dettagli sulla configurazione, consultare <a href="/docs/it/deploy_s3.md">Configurare l'Object Storage con Docker Compose o Helm</a> e <a href="/docs/it/object_storage_operator.md">Configurare l'Object Storage con Milvus Operator</a>.</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">Requisiti aggiuntivi per l’utilizzo di Woodpecker integrato<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si esegue la coda di messaggi predefinita <strong>di Woodpecker</strong> con il relativo backend di archiviazione a oggetti (<code translate="no">storage.type=minio</code>), Woodpecker scrive il proprio log di scrittura anticipata (write-ahead) nello stesso archivio a oggetti e richiede <strong>una semantica rigorosa di scrittura condizionale S3</strong>. Non tutti gli archivi a oggetti sono idonei: ad esempio, Huawei Cloud OBS <strong>non</strong> è attualmente <strong>supportato</strong> come backend di Woodpecker, sebbene funzioni come normale archiviazione a oggetti Milvus.</p>
<p>Consultare la matrice di compatibilità degli archivi a oggetti nella pagina di <a href="/docs/it/woodpecker.md">Woodpecker</a> per i requisiti esatti relativi a ciascun provider.</p>
