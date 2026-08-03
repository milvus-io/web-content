---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: >-
  Pelajari cara melakukan upgrade pada kluster Milvus menggunakan Milvus
  Operator.
title: Meningkatkan Kluster Milvus dengan Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/id/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/id/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Meningkatkan Kluster Milvus dengan Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menjelaskan cara melakukan upgrade kluster Milvus 2.6.x ke v3.0.0 menggunakan Milvus Operator.</p>
<div class="alert note">
<p>Prosedur ini telah diverifikasi dari Milvus 2.6.20 ke Milvus v3.0.0 dengan Milvus Operator 1.3.0, MixCoord, StreamingNode, Woodpecker, etcd dalam kluster, dan MinIO dalam kluster. Jika Anda menggunakan rilis patch Milvus 2.6.x, versi Operator, topologi komponen, antrian pesan, atau konfigurasi ketergantungan yang berbeda, validasi pembaruan tersebut terlebih dahulu di lingkungan non-produksi.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Sebuah kluster Kubernetes dengan kluster Milvus 2.6.x yang dikelola oleh Milvus Operator</li>
<li><code translate="no">kubectl</code> akses ke kluster</li>
<li>Manifest sumber daya khusus (CR) Milvus lengkap yang digunakan untuk penyebaran yang ada</li>
<li>Metode instalasi dan manifes yang digunakan untuk Milvus Operator yang sudah ada</li>
<li>Cadangan terbaru dari metadata Milvus dan data persisten</li>
</ul>
<p><strong>Batasan Antrian Pesan</strong>: Saat melakukan peningkatan ke Milvus v3.0.0, Anda harus mempertahankan pilihan antrian pesan Anda saat ini. Beralih di antara sistem antrian pesan yang berbeda selama peningkatan tidak didukung. Dukungan untuk mengubah sistem antrian pesan akan tersedia di versi mendatang.</p>
<div class="alert warning">
<p>Terapkan CR Milvus lengkap untuk peningkatan ini. Jangan gunakan patch penggabungan yang hanya berupa gambar. Operator dapat menetapkan bidang komponen tanpa replika yang dihilangkan sebagai default, yang dapat mengaktifkan kembali komponen yang dinonaktifkan oleh penyebaran 2.6.x yang ada.</p>
<p>Prosedur ini tidak memvalidasi penurunan versi atau rollback dengan mengembalikan gambar Milvus ke versi 2.6.x. Setelah v3.0.0 menulis data, rollback hanya pada gambar dapat gagal membaca status yang telah diperbarui. Jika peningkatan gagal, hentikan penulisan dan gunakan rencana pemulihan yang memulihkan metadata sebelum peningkatan dan cadangan data persisten. Validasi rencana pemulihan di lingkungan non-produksi terlebih dahulu.</p>
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
    </button></h2><h3 id="Step-1-Back-up-the-current-Milvus-CR" class="common-anchor-header">Langkah 1: Cadangkan CR Milvus saat ini<button data-href="#Step-1-Back-up-the-current-Milvus-CR" class="anchor-icon" translate="no">
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
    </button></h3><p>Simpan CR saat ini sebelum mengubah penyebaran:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output yaml &gt; milvus-before-upgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Gunakan manifest sumber untuk penyebaran yang ada sebagai manifest peningkatan versi. Jangan langsung menerapkan file cadangan yang diekspor tanpa terlebih dahulu menghapus metadata yang dikelola server dan bidang status.</p>
<h3 id="Step-2-Confirm-the-Milvus-Operator-version" class="common-anchor-header">Langkah 2: Konfirmasi versi Milvus Operator<button data-href="#Step-2-Confirm-the-Milvus-Operator-version" class="anchor-icon" translate="no">
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
    </button></h3><p>Periksa gambar yang digunakan oleh Milvus Operator yang terinstal:</p>
<pre><code translate="no" class="language-bash">kubectl get deployments --all-namespaces \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.namespace}{&quot;\t&quot;}{.metadata.name}{&quot;\t&quot;}{range .spec.template.spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span> \
  | grep milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Peningkatan yang telah divalidasi mempertahankan Milvus Operator pada versi 1.3.0. Pertahankan versi Operator yang saat ini mengelola penyebaran Milvus 2.6.x Anda, kecuali jika kebijakan dukungan Anda mengharuskan peningkatan Operator terpisah. Jangan menurunkan versi Operator yang lebih baru ke versi yang telah diuji. Jika Anda perlu mengubah versi Operator, gunakan metode instalasi Helm atau <code translate="no">kubectl</code> yang sama serta nama rilis dan ruang nama yang sama dengan instalasi yang ada, lalu validasi perubahan Operator sebelum memperbarui Milvus CR.</p>
<h3 id="Step-3-Update-the-Milvus-image" class="common-anchor-header">Langkah 3: Perbarui gambar Milvus<button data-href="#Step-3-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalam manifest CR Milvus yang lengkap, ubah ` <code translate="no">spec.components.image</code> ` menjadi versi target. Pertahankan mode saat ini, topologi komponen, antrian pesan, etcd, penyimpanan, dan pengaturan ketergantungan lainnya. Kutipan berikut menunjukkan bidang-bidang yang perlu dikonfirmasi; jangan mengganti CR lengkap Anda dengan kutipan ini.</p>
<p>Sebelum menerapkan CR target, pastikan bahwa ` <code translate="no">indexNode.replicas</code> ` adalah ` <code translate="no">0</code>`. Konfigurasi Milvus 2.6.20 yang telah diverifikasi sudah menggunakan pengaturan ini. Pertahankan pengaturan replika nol secara eksplisit dalam CR target.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;instance-name&gt;</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">&lt;namespace&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.0</span>
    <span class="hljs-attr">indexNode:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p>Terapkan manifest CR lengkap:</p>
<pre><code translate="no" class="language-bash">kubectl apply --filename milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifikasi peningkatan<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Periksa status CR, status Pod, dan gambar kontainer:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output jsonpath=<span class="hljs-string">&#x27;{.status.status}{&quot;\t&quot;}{.status.currentImage}{&quot;\n&quot;}&#x27;</span>

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pastikan bahwa CR Milvus melaporkan ` <code translate="no">Healthy</code>`, semua komponen Milvus menggunakan ` <code translate="no">milvusdb/milvus:v3.0.0</code>`, tidak ada Pod IndexNode yang berjalan, dan koleksi yang ada tetap dapat di-query dan dicari. Selesaikan pemeriksaan ini sebelum Anda mengaktifkan fitur apa pun yang spesifik untuk v3.0.0.</p>
