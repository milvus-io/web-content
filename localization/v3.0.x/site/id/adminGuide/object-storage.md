---
id: object-storage.md
title: Penyimpanan Objek
---
<h1 id="Object-Storage" class="common-anchor-header">Penyimpanan Objek<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyimpan berkas indeks dan log biner — sebagian besar datanya — di penyimpanan objek. Milvus mendukung MinIO serta berbagai penyimpanan objek yang kompatibel dengan S3 dan berbasis awan.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">Penyimpanan objek yang didukung<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>Penyedia / layanan</th><th style="text-align:center">Didukung sebagai penyimpanan objek Milvus</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (default untuk implementasi yang dihosting sendiri)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Penyimpanan Blob Azure</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Penyimpanan lain yang kompatibel dengan S3</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Untuk detail konfigurasi, lihat <a href="/docs/id/deploy_s3.md">Konfigurasi Penyimpanan Objek dengan Docker Compose atau Helm</a> dan <a href="/docs/id/object_storage_operator.md">Konfigurasi Penyimpanan Objek dengan Milvus Operator</a>.</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">Persyaratan tambahan saat menggunakan Woodpecker yang tertanam<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat Anda menjalankan antrian pesan <strong>Woodpecker</strong> default dengan backend penyimpanan objeknya (<code translate="no">storage.type=minio</code>), Woodpecker menulis log write-ahead-nya ke penyimpanan objek yang sama dan memerlukan <strong>semantik S3 Conditional-Write yang ketat</strong>. Tidak semua penyimpanan objek memenuhi syarat — misalnya, Huawei Cloud OBS saat ini <strong>tidak</strong> didukung sebagai backend Woodpecker meskipun berfungsi sebagai penyimpanan objek Milvus biasa.</p>
<p>Lihat matriks kompatibilitas penyimpanan objek di halaman <a href="/docs/id/woodpecker.md">Woodpecker</a> untuk persyaratan spesifik per penyedia.</p>
