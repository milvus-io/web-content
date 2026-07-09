---
id: switch-mq-type.md
title: Mengubah Jenis MQ
summary: >-
  Mengalihkan antrian pesan pada implementasi Milvus yang sudah ada dari
  Woodpecker ke antrian pesan lain tanpa waktu henti.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">Mengubah Jenis MQ<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menjelaskan cara mengganti antrian pesan (MQ) pada deployment Milvus yang sudah ada <strong>antara Woodpecker dan antrian pesan lainnya</strong>, secara online dan tanpa downtime.</p>
<div class="alert warning">
<p>Fitur ini masih dalam tahap pengembangan dan dapat berubah sewaktu-waktu. Silakan hubungi dukungan Milvus jika Anda ingin mencobanya atau memiliki pertanyaan.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Persyaratan<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Fitur Penggantian MQ tersedia di Milvus 3.0 dan versi yang lebih baru.</strong> Perbarui instance Milvus Anda ke Milvus 3.0 atau versi yang lebih baru sebelum menggunakannya — fitur ini tidak tersedia pada versi sebelumnya.</li>
<li>Instan tersebut berjalan dengan baik.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">Cakupan<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>Panduan ini hanya membahas peralihan <strong>antara Woodpecker dan antrian pesan lainnya</strong>. Peralihan langsung antara Pulsar dan Kafka berada di luar cakupan panduan ini.</p>
<ul>
<li><a href="/docs/id/switch-rocksmq-woodpecker.md">Beralih antara RocksMQ dan Woodpecker</a> — Milvus Standalone (Docker Compose)</li>
<li><a href="/docs/id/switch-pulsar-woodpecker.md">Beralih antara Pulsar dan Woodpecker</a> — kluster Milvus (Helm / Milvus Operator)</li>
<li><a href="/docs/id/switch-kafka-woodpecker.md">Beralih antara Kafka dan Woodpecker</a> — kluster Milvus (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Alur kerja umum<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Pastikan instance Milvus berjalan dengan baik.</li>
<li>Konfirmasikan jenis MQ sumber dan jenis MQ tujuan.</li>
<li>Terapkan pengaturan akses MQ tujuan ke konfigurasi Milvus <strong>tanpa</strong> mengubah nilai ` <code translate="no">mqType</code> `.</li>
<li>Picu peralihan dengan memanggil API WAL alter di MixCoord.</li>
<li>Pantau log untuk memastikan peralihan telah selesai.</li>
</ol>
<div class="alert note">
<p>Sebelum melakukan peralihan, pastikan MQ tujuan tidak mengandung topik dengan nama yang sama dengan yang digunakan oleh instance Milvus saat ini. Hal ini sangat penting jika MQ tujuan pernah digunakan oleh instance Milvus lain, karena nama topik yang bertabrakan dapat menyebabkan perilaku yang tidak terduga.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">Matriks dukungan<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>MQ Sumber</th><th>MQ Tujuan</th><th>Penerapan</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (lokal/MinIO)</td><td>Standalone (Docker Compose)</td><td><strong>Didukung</strong></td></tr>
<tr><td>Woodpecker (lokal/MinIO)</td><td>RocksMQ</td><td>Standalone (Docker Compose)</td><td><strong>Didukung</strong></td></tr>
<tr><td>Pulsar (bawaan/eksternal)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Didukung</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (eksternal)</td><td>Cluster (Helm / Operator)</td><td><strong>Didukung</strong></td></tr>
<tr><td>Kafka (bawaan/eksternal)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Didukung</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka (eksternal)</td><td>Cluster (Helm / Operator)</td><td><strong>Didukung</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker lokal (atau sebaliknya)</td><td>apa saja</td><td><strong>Tidak didukung</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Hindari berpindah-pindah jenis MQ secara berulang-ulang. Jika Anda memang perlu berpindah, pastikan untuk membersihkan data terkait sebelum setiap perpindahan — data sisa dapat menyebabkan perilaku yang tidak terduga.</p>
</div>
