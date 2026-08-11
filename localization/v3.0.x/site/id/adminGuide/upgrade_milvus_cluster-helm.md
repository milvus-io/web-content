---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Pelajari cara melakukan upgrade pada kluster Milvus menggunakan Helm Chart.
title: Meningkatkan Kluster Milvus dengan Helm Chart
---
<div class="tab-wrapper"><a href="/docs/id/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/id/upgrade_milvus_cluster-helm.md" class='active '>Operator Helm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Meningkatkan Kluster Milvus dengan Helm Chart<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menjelaskan cara memperbarui kluster Milvus 2.6.x Anda ke v3.0-beta menggunakan Helm.</p>
<div class="alert note">
<p>Prosedur ini telah diverifikasi dari Milvus 2.6.20 hingga Milvus v3.0-beta dengan Milvus Helm Chart 5.0.22. Jika Anda menggunakan rilis patch Milvus 2.6.x atau versi Helm Chart lainnya, lakukan verifikasi peningkatan versi terlebih dahulu di lingkungan non-produksi.</p>
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
<li>Helm 3.14.0 atau yang lebih baru</li>
<li>Deployment Milvus 2.6.x yang sudah ada dan dikelola oleh Helm</li>
<li>Nilai Helm yang digunakan untuk deployment yang sudah ada</li>
<li>Cadangan terbaru dari metadata Milvus dan data persisten</li>
</ul>
<p><strong>Batasan Antrian Pesan</strong>: Saat melakukan upgrade ke Milvus v3.0-beta, Anda harus mempertahankan pilihan antrian pesan yang saat ini digunakan. Pergantian antara sistem antrian pesan yang berbeda selama proses upgrade tidak didukung. Dukungan untuk mengganti sistem antrian pesan akan tersedia pada versi mendatang.</p>
<div class="alert warning">
<p>Jangan mengubah atau menurunkan versi Helm Chart sebagai bagian dari prosedur ini. Pertahankan versi Chart yang sudah terpasang untuk rilis Helm Anda. Baseline yang telah diuji mempertahankan Helm Chart 5.0.22 dan hanya mengubah tag gambar Milvus menjadi <code translate="no">v3.0-beta</code>.</p>
<p>Prosedur ini tidak memvalidasi penurunan versi atau rollback dengan mengubah gambar Milvus kembali ke 2.6.x. Setelah v3.0-beta menulis data, rollback yang hanya melibatkan gambar mungkin gagal membaca status yang telah diperbarui. Jika peningkatan gagal, hentikan penulisan dan gunakan rencana pemulihan yang memulihkan metadata sebelum peningkatan serta cadangan data persisten. Validasi rencana pemulihan di lingkungan non-produksi terlebih dahulu.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Proses peningkatan<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><p>Penerapan Milvus 2.6.20 yang telah divalidasi, yang dibuat dengan Helm Chart 5.0.22, menggunakan MixCoord dan StreamingNode serta tidak menjalankan IndexNode. Anda tidak memerlukan langkah koordinator-migrasi terpisah jika penerapan Anda menggunakan topologi yang sama.</p>
<h3 id="Step-1-Confirm-the-current-topology" class="common-anchor-header">Langkah 1: Pastikan topologi saat ini<button data-href="#Step-1-Confirm-the-current-topology" class="anchor-icon" translate="no">
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
    </button></h3><p>Simpan nilai lengkap dari rilis saat ini dan periksa Pod yang sedang berjalan:</p>
<pre><code translate="no" class="language-bash">helm get values &lt;release-name&gt; \
  --namespace &lt;namespace&gt; \
  --all &gt; milvus-values-before-upgrade.yaml

kubectl get pods --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Pastikan bahwa klaster menggunakan MixCoord dan StreamingNode serta tidak ada Pod IndexNode yang sedang berjalan. Perintah peningkatan versi yang akan dijelaskan nanti dalam panduan ini akan mempertahankan nilai Helm yang ada. Jika nilai Anda saat ini mengaktifkan IndexNode atau menggunakan topologi komponen lain, jangan jalankan peningkatan versi khusus gambar ini. Tirukan topologi tersebut di lingkungan non-produksi dan dapatkan rencana migrasi yang telah disetujui oleh tim teknik terlebih dahulu.</p>
<h3 id="Step-2-Update-the-Helm-repository" class="common-anchor-header">Langkah 2: Perbarui repositori Helm<button data-href="#Step-2-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Tambahkan atau perbarui repositori Helm Milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Repositori Milvus Helm Charts di <code translate="no">https://milvus-io.github.io/milvus-helm/</code> telah diarsipkan. Gunakan repositori baru <code translate="no">https://zilliztech.github.io/milvus-helm/</code> untuk versi chart 4.0.31 dan yang lebih baru.
</div>
<h3 id="Step-3-Upgrade-Milvus" class="common-anchor-header">Langkah 3: Tingkatkan Milvus<button data-href="#Step-3-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Periksa versi Chart yang terpasang untuk rilis Helm Anda:</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Di kolom <code translate="no">CHART</code>, hapus awalan <code translate="no">milvus-</code> dari nilainya dan gunakan versi yang tersisa sebagai <code translate="no">&lt;current-chart-version&gt;</code>. Kemudian jalankan perintah upgrade:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0-beta&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 30m
<button class="copy-code-btn"></button></code></pre>
<p>Opsi ` <code translate="no">--reset-then-reuse-values</code> ` mempertahankan nilai dari rilis sebelumnya sambil menerapkan penggantian gambar secara eksplisit terhadap pengaturan default Chart yang dipilih.</p>
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
    </button></h2><p>Periksa revisi Helm, status Pod, dan gambar kontainer:</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pastikan semua beban kerja yang diperlukan sudah siap, semua komponen Milvus menggunakan ` <code translate="no">v3.0-beta</code>`, dan koleksi yang ada tetap dapat di-query dan dicari. Selesaikan pemeriksaan ini sebelum mengaktifkan fitur apa pun yang spesifik untuk v3.0-beta.</p>
<div class="alert note">
<p>Peningkatan ke Milvus 3.0 tidak mengaktifkan Storage V3. Setelah Anda memverifikasi peningkatan, tinjau <a href="/docs/id/storage-v3.md">Storage V3</a> sebelum mengaktifkan fitur-fitur yang bergantung padanya. Setelah Milvus menulis data Storage V3, penurunan versi ke versi Milvus yang lebih lama yang tidak dapat membaca Storage V3 tidak didukung.</p>
</div>
