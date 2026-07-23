---
id: object-storage.md
title: Objektspeicher
---
<h1 id="Object-Storage" class="common-anchor-header">Objektspeicher<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus speichert Indexdateien und Binärprotokolle – den Großteil seiner Daten – im Objektspeicher. Milvus unterstützt MinIO sowie eine Reihe von S3-kompatiblen und Cloud-basierten Objektspeichern.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">Unterstützte Objektspeicher<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>Anbieter / Dienst</th><th style="text-align:center">Als Milvus-Objektspeicher unterstützt</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (Standard für selbst gehostete Bereitstellungen)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Azure Blob Storage</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Andere S3-kompatible Speicherlösungen</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Einzelheiten zur Konfiguration finden Sie unter <a href="/docs/de/deploy_s3.md">„Objektspeicher mit Docker Compose oder Helm konfigurieren</a> “ und <a href="/docs/de/object_storage_operator.md">„Objektspeicher mit Milvus Operator konfigurieren</a>“.</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">Zusätzliche Anforderungen bei der Verwendung von Embedded Woodpecker<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie die Standard <strong>-Woodpecker</strong> -Nachrichtenwarteschlange mit ihrem Objekt-Speicher-Backend (<code translate="no">storage.type=minio</code>) ausführen, schreibt Woodpecker sein Write-Ahead-Log in denselben Objekt-Speicher und erfordert dabei <strong>strenge S3-Conditional-Write-Semantik</strong>. Nicht jeder Objektspeicher erfüllt diese Anforderungen – beispielsweise wird Huawei Cloud OBS derzeit <strong>nicht</strong> als Woodpecker-Backend <strong>unterstützt</strong>, obwohl es als regulärer Milvus-Objektspeicher funktioniert.</p>
<p>Die genauen Anforderungen pro Anbieter finden Sie in der Kompatibilitätsmatrix für Objektspeicher auf der <a href="/docs/de/woodpecker.md">Woodpecker</a> -Seite.</p>
