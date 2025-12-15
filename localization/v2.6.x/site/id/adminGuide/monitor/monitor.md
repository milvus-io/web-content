---
id: monitor.md
title: Menerapkan Layanan Pemantauan
related_key: 'monitor, alert'
summary: >-
  Pelajari cara menerapkan layanan pemantauan untuk cluster Milvus menggunakan
  Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Menerapkan Layanan Pemantauan pada Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara menggunakan Prometheus untuk menerapkan layanan pemantauan untuk cluster Milvus di Kubernetes.</p>
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
    </button></h2><p>Metrik adalah indikator yang menyediakan informasi tentang status berjalannya sistem Anda. Misalnya, dengan metrik, Anda dapat memahami berapa banyak memori atau sumber daya CPU yang dikonsumsi oleh node data di Milvus. Dengan mengetahui kinerja dan status komponen dalam cluster Milvus Anda, Anda akan mendapatkan informasi yang lebih baik sehingga dapat mengambil keputusan yang lebih baik dan menyesuaikan alokasi sumber daya secara lebih tepat waktu.</p>
<p>Umumnya, metrik disimpan dalam basis data deret waktu (TSDB), seperti <a href="https://prometheus.io/">Prometheus</a>, dan metrik direkam dengan stempel waktu. Dalam kasus pemantauan layanan Milvus, Anda dapat menggunakan Prometheus untuk menarik data dari titik akhir yang ditetapkan oleh eksportir. Prometheus kemudian mengekspor metrik dari setiap komponen Milvus di <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Namun, Anda mungkin memiliki beberapa replika untuk satu komponen, yang membuat konfigurasi manual Prometheus menjadi terlalu rumit. Oleh karena itu, Anda dapat menggunakan <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, sebuah ekstensi untuk Kubernetes, untuk pengelolaan instance pemantauan Prometheus secara otomatis dan efektif. Menggunakan Prometheus Operator akan menghemat kesulitan Anda dalam menambahkan target metrik dan penyedia layanan secara manual.</p>
<p>Definisi Sumber Daya Khusus (CRD) ServiceMonitor memungkinkan Anda untuk mendefinisikan secara deklaratif bagaimana sekumpulan layanan dinamis dimonitor. Hal ini juga memungkinkan pemilihan layanan mana yang akan dipantau dengan konfigurasi yang diinginkan menggunakan pilihan label. Dengan Prometheus Operator, Anda dapat memperkenalkan konvensi yang menentukan bagaimana metrik diekspos. Layanan baru dapat secara otomatis ditemukan mengikuti konvensi yang Anda tetapkan tanpa perlu konfigurasi ulang secara manual.</p>
<p>Gambar berikut mengilustrasikan alur kerja Prometheus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Prometheus_architecture</span> </span></p>
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
    </button></h2><p>Tutorial ini menggunakan <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> untuk menyelamatkan Anda dari kesulitan menginstal dan mengonfigurasi secara manual setiap komponen pemantauan dan peringatan.</p>
<p>Kube-prometheus mengumpulkan manifes Kubernetes, dasbor <a href="http://grafana.com/">Grafana</a>, dan <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">aturan Prometheus</a> yang digabungkan dengan dokumentasi dan skrip.</p>
<p>Sebelum menerapkan layanan pemantauan, Anda perlu membuat tumpukan pemantauan dengan menggunakan konfigurasi di direktori manifes kube-prometheus.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kube-prometheus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply --server-side -f manifests/setup</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f manifests/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Clusterrole prometheus-k8s default tidak dapat menangkap metrik milvus, perlu ditambal:</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menghapus stack, jalankan <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Menerapkan layanan pemantauan di Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Mengakses dasbor<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Teruskan layanan Prometheus ke porta <code translate="no">9090</code>, dan layanan Grafana ke porta <code translate="no">3000</code>.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Mengaktifkan ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>ServiceMonitor tidak diaktifkan untuk Milvus Helm secara default. Setelah menginstal Operator Prometheus di cluster Kubernetes, Anda dapat mengaktifkannya dengan menambahkan parameter <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">Dengan Helm</h4><p>Anda dapat mengaktifkan ServiceMonitor dengan mengatur parameter <code translate="no">metrics.serviceMonitor.enabled=true</code> sebagai berikut jika Anda telah menginstal bagan Milvus Helm.</p>
<pre><code translate="no">```
$ helm upgrade my-release milvus/milvus --set metrics.serviceMonitor.enabled=true --reuse-values
```
</code></pre>
<p>Ketika instalasi selesai, gunakan <code translate="no">kubectl</code> untuk memeriksa sumber daya ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Dengan Operator Milvus</h4><p>Anda dapat mengaktifkan ServiceMonitor sebagai berikut jika Anda telah menginstal Milvus menggunakan Milvus Operator.</p>
<ol>
<li><p>Jalankan perintah berikut untuk mengedit sumber daya kustom MIlvus. Perintah berikut ini mengasumsikan bahwa sumber daya kustom bernama <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edit bidang <code translate="no">spec.components.disableMetric</code> menjadi <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Simpan dan keluar dari editor.</p></li>
<li><p>Tunggu sampai operator merekonsiliasi perubahan. Anda dapat memeriksa status sumber daya kustom Milvus dengan menjalankan perintah berikut.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> milvus my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span> <span class="hljs-operator">-</span>o yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Kolom <code translate="no">status.components.metrics.serviceMonitor.enabled</code> seharusnya menjadi <code translate="no">true</code>.</p>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Memeriksa metrik<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah mengaktifkan ServiceMonitor, Anda dapat mengakses dasbor Prometheus di <code translate="no">http://localhost:9090/</code>.</p>
<p>Klik pada tab <code translate="no">Status</code> dan kemudian <code translate="no">Targets</code>. Anda akan melihat target dari komponen Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" />
   </span> <span class="img-wrapper"> <span>Prometheus_target</span> </span></p>
<p>Klik pada tab <code translate="no">Graph</code> dan masukkan ekspresi <code translate="no">up{job=&quot;default/my-release&quot;}</code> pada kotak input ekspresi. Anda akan melihat metrik dari komponen Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" />
   </span> <span class="img-wrapper"> <span>Prometheus_graph</span> </span></p>
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
    </button></h3><pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
<span class="hljs-keyword">my</span>-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Jika Anda telah menerapkan layanan pemantauan untuk cluster Milvus, Anda mungkin juga ingin mempelajarinya:<ul>
<li><a href="/docs/id/visualize.md">Memvisualisasikan metrik Milvus di Grafana</a></li>
<li><a href="/docs/id/alert.md">Membuat peringatan untuk Layanan Milvus</a></li>
<li>Menyesuaikan <a href="/docs/id/allocate.md">alokasi sumber daya</a> Anda</li>
</ul></li>
<li>Jika Anda mencari informasi tentang cara menskalakan cluster Milvus:<ul>
<li>Pelajari <a href="/docs/id/scaleout.md">cara menskalakan cluster Milvus</a></li>
</ul></li>
<li>Jika Anda tertarik untuk meningkatkan versi Milvus,<ul>
<li>Baca <a href="/docs/id/upgrade_milvus_cluster-operator.md">panduan untuk memutakhirkan cluster Milvus</a> dan <a href="/docs/id/upgrade_milvus_cluster-operator.md">panduan</a> <a href="/docs/id/upgrade_milvus_standalone-operator.md">untuk memutakhirkan Milvus mandiri</a>.</li>
</ul></li>
</ul>
