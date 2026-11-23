---
id: monitor.md
title: Menerapkan Layanan Pemantauan
related_key: 'monitor, alert'
summary: >-
  Pelajari cara menerapkan layanan pemantauan untuk klaster Milvus menggunakan
  Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Menerapkan Layanan Pemantauan di Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara menggunakan Prometheus untuk menerapkan layanan pemantauan pada kluster Milvus di Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Memantau metrik dengan Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Metrik adalah indikator yang memberikan informasi mengenai status operasional sistem Anda. Misalnya, dengan metrik, Anda dapat memahami seberapa banyak sumber daya memori atau CPU yang digunakan oleh node data di Milvus. Memahami kinerja dan status komponen dalam kluster Milvus Anda memungkinkan Anda untuk mengambil keputusan yang lebih baik dan menyesuaikan alokasi sumber daya secara lebih tepat waktu.</p>
<p>Secara umum, metrik disimpan dalam basis data deret waktu (TSDB), seperti <a href="https://prometheus.io/">Prometheus</a>, dan metrik tersebut dicatat bersama cap waktu. Dalam hal pemantauan layanan Milvus, Anda dapat menggunakan Prometheus untuk mengambil data dari titik akhir (endpoint) yang ditetapkan oleh eksporter. Prometheus kemudian mengekspor metrik dari setiap komponen Milvus di <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Namun, Anda mungkin memiliki beberapa replika untuk satu komponen, yang membuat konfigurasi manual Prometheus menjadi terlalu rumit. Oleh karena itu, Anda dapat menggunakan <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, sebuah ekstensi Kubernetes, untuk pengelolaan instance pemantauan Prometheus secara otomatis dan efektif. Menggunakan Prometheus Operator menghemat waktu Anda dari kerumitan menambahkan target metrik dan penyedia layanan secara manual.</p>
<p>Definisi Sumber Daya Kustom (CRD) ServiceMonitor memungkinkan Anda mendefinisikan secara deklaratif bagaimana sekumpulan layanan dinamis dipantau. CRD ini juga memungkinkan pemilihan layanan mana yang akan dipantau dengan konfigurasi yang diinginkan menggunakan pemilihan label. Dengan Prometheus Operator, Anda dapat menerapkan konvensi yang menentukan cara metrik diekspos. Layanan baru dapat ditemukan secara otomatis sesuai dengan konvensi yang Anda tetapkan tanpa perlu konfigurasi ulang secara manual.</p>
<p>Gambar berikut ini menggambarkan alur kerja Prometheus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
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
    </button></h2><p>Tutorial ini menggunakan <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> untuk menghemat waktu Anda dalam menginstal dan mengonfigurasi setiap komponen pemantauan dan peringatan secara manual.</p>
<p>Kube-prometheus mengumpulkan manifest Kubernetes, dasbor <a href="http://grafana.com/">Grafana</a>, dan <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">aturan Prometheus</a> yang digabungkan dengan dokumentasi dan skrip.</p>
<p>Sebelum menerapkan layanan pemantauan, Anda perlu membuat tumpukan pemantauan dengan menggunakan konfigurasi di direktori manifest kube-prometheus.</p>
<p>Perintah berikut menggunakan cabang " <code translate="no">release-0.19</code> " dari kube-prometheus, yang mendukung Kubernetes versi 1.35, 1.36, dan 1.37. Untuk memilih cabang yang sesuai dengan versi Kubernetes Anda, lihat <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">matriks kompatibilitas kube-prometheus</a>.</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Clusterrole `prometheus-k8s` default tidak dapat menangkap metrik Milvus, perlu dilakukan patch:
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menghapus stack, jalankan perintah ` <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>`.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Menyebarkan layanan pemantauan di Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Akses dasbor<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Alihkan layanan Prometheus ke port <code translate="no">9090</code>, dan layanan Grafana ke port <code translate="no">3000</code>.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Aktifkan ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>ServiceMonitor tidak diaktifkan secara default untuk Milvus Helm. Setelah menginstal Prometheus Operator di kluster Kubernetes, Anda dapat mengaktifkannya dengan menambahkan parameter <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">Dengan Helm</h4><p>Anda dapat mengaktifkan ServiceMonitor dengan mengatur parameter <code translate="no">metrics.serviceMonitor.enabled=true</code> sebagai berikut jika Anda telah menginstal chart Milvus Helm.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Perintah ini menggunakan ` <code translate="no">--reset-then-reuse-values</code>`, yang memerlukan Helm versi 3.14 atau yang lebih baru. Dengan opsi ini, Helm akan mengatur ulang nilai-nilai ke nilai default versi chart yang ditetapkan di ` <code translate="no">--version</code>`, menerapkan nilai-nilai dari rilis Anda saat ini, dan kemudian menerapkan nilai-nilai dari ` <code translate="no">--set</code>`. Untuk menemukan ` <code translate="no">&lt;current-chart-version&gt;</code>`, jalankan ` <code translate="no">helm list</code> ` dan hapus awalan ` <code translate="no">milvus-</code> ` dari nilai di kolom ` <code translate="no">CHART</code> `. Jika Anda menjalankan <code translate="no">helm upgrade</code> dengan <code translate="no">-f</code> atau <code translate="no">--set</code> tetapi tanpa <code translate="no">--reset-then-reuse-values</code> atau <code translate="no">--reuse-values</code>, Helm tidak akan menyimpan nilai-nilai yang Anda tetapkan saat instalasi.</p>
</div>
<p>Setelah instalasi selesai, gunakan perintah ` <code translate="no">kubectl</code> ` untuk memeriksa sumber daya ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Dengan Milvus Operator</h4><p>Jika Anda telah menginstal Milvus menggunakan Milvus Operator, operator tersebut akan membuat PodMonitor alih-alih ServiceMonitor. PodMonitor memiliki nama yang sama dengan sumber daya khusus Milvus. Operator hanya akan membuatnya jika metrik tidak dinonaktifkan di sumber daya khusus dan CRD PodMonitor ada di dalam kluster. Direktori kube-prometheus <code translate="no">manifests/setup</code> menginstal CRD ini. Untuk memastikan bahwa metrik diaktifkan, lakukan langkah-langkah berikut.</p>
<ol>
<li><p>Jalankan perintah berikut untuk mengedit sumber daya khusus Milvus. Perintah berikut mengasumsikan bahwa sumber daya khusus tersebut bernama ` <code translate="no">my-release</code>`.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ubah nilai bidang ` <code translate="no">spec.components.disableMetric</code> ` menjadi ` <code translate="no">false</code>`.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Simpan dan tutup editor.</p></li>
<li><p>Tunggu hingga operator merekonsiliasi perubahan tersebut. Anda dapat memeriksa PodMonitor dengan menjalankan perintah berikut.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Periksa metrik<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah mengaktifkan ServiceMonitor atau PodMonitor, Anda dapat mengakses dasbor Prometheus di <code translate="no">http://localhost:9090/</code>.</p>
<p>Klik tab " <code translate="no">Status</code> ", lalu pilih " <code translate="no">Targets</code>". Anda seharusnya melihat target dari komponen-komponen Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>Klik tab " <code translate="no">Graph</code> " dan masukkan ekspresi " <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> " di kotak input ekspresi. Anda seharusnya melihat metrik dari komponen Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Periksa ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda telah menginstal Milvus dengan Helm, jalankan perintah berikut untuk menampilkan daftar ServiceMonitor. Chart tersebut menamainya <code translate="no">my-release-milvus</code> untuk kluster Milvus dan <code translate="no">my-release-milvus-standalone</code> untuk Milvus standalone.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
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
<li>Jika Anda telah menerapkan layanan pemantauan untuk klaster Milvus, Anda mungkin juga ingin mempelajari cara:
<ul>
<li><a href="/docs/id/visualize.md">Memvisualisasikan metrik Milvus di Grafana</a></li>
<li><a href="/docs/id/alert.md">Membuat Peringatan untuk Layanan Milvus</a></li>
<li>Menyesuaikan <a href="/docs/id/allocate.md">alokasi sumber daya</a></li>
</ul></li>
<li>Jika Anda mencari informasi tentang cara menskalakan kluster Milvus:
<ul>
<li>Pelajari <a href="/docs/id/scaleout.md">cara menskalakan kluster Milvus</a></li>
</ul></li>
<li>Jika Anda tertarik untuk meng-upgrade versi Milvus,
<ul>
<li>Baca <a href="/docs/id/upgrade_milvus_cluster-operator.md">panduan untuk meningkatkan</a> versi <a href="/docs/id/upgrade_milvus_cluster-operator.md">kluster Milvus</a> dan <a href="/docs/id/upgrade_milvus_standalone-operator.md">panduan untuk meningkatkan versi Milvus standalone</a>.</li>
</ul></li>
</ul>
