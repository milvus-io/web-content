---
id: configure_grafana_loki.md
title: Mengkonfigurasi Grafana Loki
summary: >-
  Topik ini menjelaskan cara mengumpulkan log menggunakan Loki dan melakukan
  query log untuk cluster Milvus menggunakan Grafana.
---

<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Mengkonfigurasi Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menyediakan instruksi tentang cara mengonfigurasi Loki untuk mengumpulkan log dan Grafana untuk menanyakan dan menampilkan log untuk cluster Milvus.</p>
<p>Dalam panduan ini, Anda akan mempelajari caranya:</p>
<ul>
<li>Menerapkan <a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a> dan <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> pada cluster Milvus menggunakan Helm.</li>
<li>Mengonfigurasi penyimpanan objek untuk Loki.</li>
<li>Menanyakan log menggunakan Grafana.</li>
</ul>
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
<li>Anda telah <a href="/docs/id/v2.5.x/install_cluster-helm.md">menginstal cluster Milvus pada K8.</a></li>
<li>Anda telah menginstal alat yang diperlukan, termasuk <a href="https://helm.sh/docs/intro/install/">Helm</a> dan <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Menerapkan Loki<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki adalah sistem agregasi log yang terinspirasi oleh Prometheus. Terapkan Loki menggunakan Helm untuk mengumpulkan log dari cluster Milvus Anda.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Menambahkan Repositori Bagan Helm Grafana</h3><p>Tambahkan repositori bagan Grafana ke Helm dan perbarui:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Mengonfigurasi Penyimpanan Objek untuk Loki</h3><p>Pilih salah satu opsi penyimpanan berikut dan buat file konfigurasi <code translate="no">loki.yaml</code>:</p>
<ul>
<li><p>Opsi 1: Menggunakan MinIO untuk penyimpanan</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki</span>:
  <span class="hljs-attr">commonConfig</span>:
    <span class="hljs-attr">replication_factor</span>: <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled</span>: <span class="hljs-literal">false</span>

<span class="hljs-attr">minio</span>:
<span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>

<li><p>Opsi 2: Menggunakan AWS S3 untuk penyimpanan</p>
<p>Pada contoh berikut, ganti <code translate="no">&lt;accessKey&gt;</code> dan <code translate="no">&lt;keyId&gt;</code> dengan kunci akses dan ID S3 Anda sendiri, <code translate="no">s3.endpoint</code> dengan titik akhir S3, dan <code translate="no">s3.region</code> dengan wilayah S3.</p>
<pre><code translate="no" class="language-yaml">loki:
  commonConfig:
    replication_factor: 1
  auth_enabled: <span class="hljs-literal">false</span>
  storage:
    bucketNames:
      chunks: loki-chunks
      ruler: loki-ruler
      admin: loki-admin
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&#x27;s3&#x27;</span>
    s3:
      endpoint: s3.us-west-2.amazonaws.com
      region: us-west-2
      secretAccessKey: &lt;accessKey&gt;
      accessKeyId: &lt;keyId&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Menginstal Loki</h3><p>Jalankan perintah berikut ini untuk menginstal Loki:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Menyebarkan Promtail<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail adalah agen pengumpul log untuk Loki. Promtail membaca log dari pod Milvus dan mengirimkannya ke Loki.</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1. Membuat Konfigurasi Promtail</h3><p>Buat file konfigurasi <code translate="no">promtail.yaml</code>:</p>
<pre><code translate="no" class="language-yaml">config:
  clients:
    - url: http://loki-gateway/loki/api/v1/push
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2. Instal Promtail</h3><p>Instal Promtail menggunakan Helm:</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Menanyakan Log dengan Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Terapkan Grafana dan konfigurasikan untuk terhubung ke Loki untuk melakukan kueri log.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Menyebarkan Grafana</h3><p>Instal Grafana menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Sebelum Anda dapat mengakses Grafana, Anda perlu mengambil kata sandi <code translate="no">admin</code>:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=<span class="hljs-string">&quot;{.data.admin-password}&quot;</span> | <span class="hljs-built_in">base64</span> --decode ; <span class="hljs-built_in">echo</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, teruskan porta Grafana ke mesin lokal Anda:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">POD_NAME</span>=$(kubectl get pods --namespace monitoring -l <span class="hljs-string">&quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot;</span> -o jsonpath=<span class="hljs-string">&quot;{.items[0].metadata.name}&quot;</span>)
kubectl --namespace monitoring port-forward $POD_NAME <span class="hljs-number">3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Menambahkan Loki sebagai Sumber Data di Grafana</h3><p>Setelah Grafana berjalan, Anda perlu menambahkan Loki sebagai sumber data untuk menanyakan log.</p>
<ol>
<li>Buka peramban web dan arahkan ke <code translate="no">127.0.0.1:3000</code>. Masuk menggunakan nama pengguna <code translate="no">admin</code> dan kata sandi yang telah Anda dapatkan sebelumnya.</li>
<li>Pada menu sebelah kiri, pilih <strong>Sambungan</strong> &gt; <strong>Tambah sambungan baru</strong>.</li>
<li>Pada halaman yang muncul, pilih <strong>Loki</strong> sebagai tipe sumber data. Anda dapat memasukkan <strong>loki</strong> pada kolom pencarian untuk menemukan sumber data.</li>
<li>Di pengaturan sumber data Loki, tentukan <strong>Nama</strong> dan <strong>URL</strong>, lalu klik <strong>Simpan &amp; uji</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>Sumber Data</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Menanyakan Log Milvus</h3><p>Setelah menambahkan Loki sebagai sumber data, lakukan kueri log Milvus di Grafana:</p>
<ol>
<li>Pada menu sebelah kiri, klik <strong>Jelajahi</strong>.</li>
<li>Di sudut kiri atas halaman, pilih sumber data Loki.</li>
<li>Gunakan <strong>browser Label</strong> untuk memilih label dan menanyakan log.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>Kueri</span> </span></p>
