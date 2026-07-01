---
id: object-storage.md
title: Armazenamento de objetos
---
<h1 id="Object-Storage" class="common-anchor-header">Armazenamento de objetos<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus armazena ficheiros de índice e registos binários — a maior parte dos seus dados — no armazenamento de objetos. O Milvus suporta o MinIO e uma variedade de armazenamentos de objetos compatíveis com S3 e na nuvem.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">Armazenamento de objetos suportados<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>Fornecedor/serviço</th><th style="text-align:center">Compatível como armazenamento de objetos do Milvus</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (predefinição para implementações auto-hospedadas)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Armazenamento de Blobs do Azure</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Outros serviços de armazenamento compatíveis com S3</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Para obter detalhes sobre a configuração, consulte <a href="/docs/pt/deploy_s3.md">«Configurar o armazenamento de objetos com o Docker Compose ou o Helm</a> » e <a href="/docs/pt/object_storage_operator.md">«Configurar o armazenamento de objetos com o Milvus Operator</a>».</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">Requisitos adicionais ao utilizar o Woodpecker incorporado<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando executa a fila de mensagens padrão <strong>do Woodpecker</strong> com o seu backend de armazenamento de objetos (<code translate="no">storage.type=minio</code>), o Woodpecker grava o seu registo de gravação antecipada no mesmo armazenamento de objetos e requer <strong>uma semântica rigorosa de gravação condicional do S3</strong>. Nem todos os armazenamentos de objetos são compatíveis — por exemplo, o Huawei Cloud OBS <strong>não</strong> é atualmente <strong>suportado</strong> como backend do Woodpecker, apesar de funcionar como armazenamento de objetos normal do Milvus.</p>
<p>Consulte a matriz de compatibilidade de armazenamento de objetos na página do <a href="/docs/pt/woodpecker.md">Woodpecker</a> para conhecer os requisitos exatos por fornecedor.</p>
