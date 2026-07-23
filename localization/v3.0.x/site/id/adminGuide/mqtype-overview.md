---
id: mqtype-overview.md
title: Gambaran Umum Antrian Pesan
summary: >-
  Gambaran umum mengenai opsi antrian pesan (mqType) yang didukung oleh Milvus,
  serta opsi mana yang sebaiknya digunakan untuk penerapan standalone dan
  terdistribusi.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">Gambaran Umum Antrian Pesan<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus mengandalkan antrian pesan (write-ahead log, WAL) untuk mengelola log perubahan terbaru, log aliran keluaran, dan menyediakan langganan log. Pada Milvus 3.x, <strong>Woodpecker</strong> merupakan antrian pesan default dan tidak memerlukan infrastruktur pesan terpisah. Pulsar, Kafka, dan RocksMQ tetap didukung untuk skenario tertentu.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">Antrian pesan yang didukung<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>Antrian pesan</th><th style="text-align:center">Milvus Standalone</th><th style="text-align:center">Milvus Distributed (kluster)</th><th>Standar di</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/id/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (terintegrasi)</td><td style="text-align:center">✔️ (terintegrasi atau layanan)</td><td><strong>Milvus 3.x</strong> (kedua mode)</td><td>Standar dan direkomendasikan. WAL berbasis cloud pada penyimpanan objek; tidak memerlukan layanan eksternal.</td></tr>
<tr><td><a href="/docs/id/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (pengaturan default kluster)</td><td>Didukung, eksternal atau terintegrasi.</td></tr>
<tr><td><a href="/docs/id/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>Didukung. Hanya Kafka 2.x atau 3.x.</td></tr>
<tr><td><a href="/docs/id/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (pengaturan default standalone)</td><td>Didukung <strong>hanya</strong> untuk <strong>standalone</strong>.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Setiap instance Milvus menggunakan tepat satu antrian pesan.</p></li>
<li><p><strong>Batasan Antrian Pesan</strong>: Saat melakukan upgrade ke Milvus v3.0-beta, Anda harus mempertahankan pilihan antrian pesan saat ini. Beralih antara sistem antrian pesan yang berbeda selama proses upgrade tidak didukung. Dukungan untuk mengganti sistem antrian pesan akan tersedia di versi mendatang.</p></li>
<li><p>Untuk mengubah antrian pesan pada instance yang sedang berjalan, lihat <a href="/docs/id/switch-mq-type.md">Switch MQ Type</a>. Fitur Switch MQ tersedia di <strong>Milvus 3.0 dan versi selanjutnya</strong> — lakukan upgrade ke Milvus 3.0 atau versi selanjutnya terlebih dahulu.</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">Memilih antrian pesan<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>Penerapan baru (Milvus 3.x):</strong> gunakan <strong>Woodpecker</strong> (default). Standalone menjalankannya secara tertanam; untuk terdistribusi (cluster), default yang direkomendasikan adalah <a href="/docs/id/woodpecker.md#Deployment-modes">layanan</a> khusus yang diterapkan dengan Helm, dan tertanam juga didukung.</li>
<li><strong>Pengguna Pulsar atau Kafka yang sudah ada:</strong> Pulsar dan Kafka tetap didukung sepenuhnya. Pertahankan keduanya, atau <a href="/docs/id/switch-mq-type.md">beralihlah ke Woodpecker</a>.</li>
<li><strong>RocksMQ:</strong> hanya tersedia dalam mode standalone, dan telah digantikan oleh Woodpecker yang tertanam di Milvus 3.x.</li>
</ul>
