---
id: object-storage.md
title: Almacenamiento de objetos
---
<h1 id="Object-Storage" class="common-anchor-header">Almacenamiento de objetos<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus almacena los archivos de índice y los registros binarios —la mayor parte de sus datos— en almacenamiento de objetos. Milvus es compatible con MinIO y con una amplia gama de almacenes de objetos en la nube y compatibles con S3.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">Almacenamiento de objetos compatible<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>Proveedor/servicio</th><th style="text-align:center">Compatible como almacenamiento de objetos de Milvus</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (predeterminado para implementaciones autohospedadas)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Almacenamiento de blobs de Azure</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Otros servicios de almacenamiento compatibles con S3</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Para obtener más información sobre la configuración, consulta <a href="/docs/es/deploy_s3.md">«Configurar el almacenamiento de objetos con Docker Compose o Helm</a> » y <a href="/docs/es/object_storage_operator.md">«Configurar el almacenamiento de objetos con Milvus Operator</a>».</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">Requisitos adicionales al utilizar Woodpecker integrado<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuando se ejecuta la cola de mensajes predeterminada <strong>de Woodpecker</strong> con su backend de almacenamiento de objetos (<code translate="no">storage.type=minio</code>), Woodpecker escribe su registro de escritura anticipada en el mismo almacenamiento de objetos y requiere <strong>una semántica estricta de escritura condicional de S3</strong>. No todos los almacenes de objetos cumplen los requisitos; por ejemplo, Huawei Cloud OBS <strong>no</strong> es <strong>compatible</strong> actualmente como backend de Woodpecker, aunque funciona como almacenamiento de objetos Milvus normal.</p>
<p>Consulta la matriz de compatibilidad de almacenamiento de objetos en la página <a href="/docs/es/woodpecker.md">de Woodpecker</a> para conocer los requisitos exactos de cada proveedor.</p>
