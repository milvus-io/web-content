---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Pelajari cara meng-upgrade Milvus standalone menggunakan Docker Compose.
title: Memperbarui Milvus Standalone dengan Docker Compose
---
<div class="tab-wrapper"><a href="/docs/id/v2.6.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/id/v2.6.x/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/id/v2.6.x/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Memperbarui Milvus Standalone dengan Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menjelaskan cara memperbarui deployment Milvus standalone Anda dari v2.5.x ke v2.6.20 menggunakan Docker Compose.</p>
<h2 id="Before-you-start" class="common-anchor-header">Sebelum Anda mulai<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v2620" class="common-anchor-header">Apa yang baru di v2.6.20<button data-href="#Whats-new-in-v2620" class="anchor-icon" translate="no">
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
    </button></h3><p>Memperbarui dari Milvus 2.5.x ke 2.6.20 melibatkan perubahan arsitektur yang signifikan:</p>
<ul>
<li><strong>Konsolidasi koordinator</strong>: Koordinator terpisah yang sudah usang (<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>) telah digabungkan menjadi satu <code translate="no">mixCoord</code></li>
<li><strong>Komponen baru</strong>: Pengenalan Streaming Node untuk pemrosesan data yang ditingkatkan</li>
<li><strong>Penghapusan komponen</strong>: <code translate="no">indexNode</code> dihapus dan digabungkan</li>
</ul>
<p>Proses peningkatan ini memastikan migrasi yang tepat ke arsitektur baru. Untuk informasi lebih lanjut mengenai perubahan arsitektur, lihat <a href="/docs/id/v2.6.x/architecture_overview.md">Ikhtisar Arsitektur Milvus</a>.</p>
<h3 id="Requirements" class="common-anchor-header">Persyaratan<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Persyaratan sistem:</strong></p>
<ul>
<li>Docker dan Docker Compose telah terinstal</li>
<li>Milvus standalone telah diimplementasikan melalui Docker Compose</li>
</ul>
<p><strong>Persyaratan kompatibilitas:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 <strong>tidak kompatibel</strong> dengan v2.6.20. Pembaruan langsung dari kandidat rilis tidak didukung.</li>
<li>Jika Anda saat ini menjalankan v2.6.0-rc1 dan perlu mempertahankan data Anda, silakan merujuk ke <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">panduan komunitas ini</a> untuk bantuan migrasi.</li>
<li>Anda <strong>harus</strong> melakukan pembaruan ke v2.5.16 atau yang lebih baru sebelum melakukan pembaruan ke v2.6.20.</li>
</ul>
<p><strong>Batasan antrian pesan</strong>: Saat melakukan upgrade ke Milvus v2.6.20, Anda harus mempertahankan pilihan antrian pesan yang saat ini digunakan. Pergantian antara sistem antrian pesan yang berbeda selama proses upgrade tidak didukung. Dukungan untuk mengganti sistem antrian pesan akan tersedia pada versi mendatang.</p>
<div class="alter note">
<p>Karena pertimbangan keamanan, Milvus memperbarui MinIO-nya ke RELEASE.2024-12-18T13-15-44Z bersamaan dengan rilis v2.6.20.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Proses peningkatan versi<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-to-v2516" class="common-anchor-header">Langkah 1: Memutakhirkan ke v2.5.16<button data-href="#Step-1-Upgrade-to-v2516" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Lewati langkah ini jika penyebaran mandiri Anda sudah menjalankan v2.5.16 atau yang lebih tinggi.</p>
</div>
<ol>
<li><p>Edit file ` <code translate="no">docker-compose.yaml</code> ` yang ada dan perbarui tag gambar Milvus menjadi v2.5.16:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Terapkan pembaruan ke v2.5.16:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifikasi pembaruan ke v2.5.16:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-2-Upgrade-to-v2620" class="common-anchor-header">Langkah 2: Perbarui ke v2.6.20<button data-href="#Step-2-Upgrade-to-v2620" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah v2.5.16 berhasil berjalan, lakukan pembaruan ke v2.6.20:</p>
<ol>
<li><p>Edit file ` <code translate="no">docker-compose.yaml</code> ` yang sudah ada dan perbarui tag gambar Milvus dan MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-minio</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">minio/minio:RELEASE.2024-12-18T13-15-44Z</span>

<span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.20</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Terapkan pembaruan terakhir:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifikasi pembaruan<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Pastikan deployment standalone Anda sudah menjalankan versi baru:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check container status</span>
docker compose ps

<span class="hljs-comment"># Check Milvus version</span>
docker compose logs standalone | grep <span class="hljs-string">&quot;version&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Langkah selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Anda mungkin juga ingin mempelajari cara:
<ul>
<li><a href="/docs/id/v2.6.x/scaleout.md">Menskalakan kluster Milvus</a></li>
</ul></li>
<li>Jika Anda siap untuk mengimplementasikan kluster Anda di cloud:
<ul>
<li>Pelajari cara <a href="/docs/id/v2.6.x/eks.md">mengimplementasikan Milvus di Amazon EKS dengan Terraform</a></li>
<li>Pelajari cara <a href="/docs/id/v2.6.x/gcp.md">mengimplementasikan kluster Milvus di GCP dengan Kubernetes</a></li>
<li>Pelajari cara <a href="/docs/id/v2.6.x/azure.md">mengimplementasikan Milvus di Microsoft Azure dengan Kubernetes</a></li>
</ul></li>
</ul>
