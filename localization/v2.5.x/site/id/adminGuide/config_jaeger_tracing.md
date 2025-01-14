---
id: config_jaeger_tracing.md
title: Mengkonfigurasi Jejak
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  Panduan ini memberikan instruksi tentang cara mengonfigurasi Jaeger untuk
  mengumpulkan jejak untuk Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">Mengkonfigurasi Jejak<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini memberikan petunjuk tentang cara mengonfigurasi Jaeger untuk mengumpulkan jejak untuk Milvus.</p>
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
<li>Anda telah menginstal alat yang diperlukan, termasuk <a href="https://helm.sh/docs/intro/install/">Helm</a> dan <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
<li>Cert-manager versi 1.6.1 atau yang lebih tinggi harus diinstal. Panduan instalasi dapat ditemukan <a href="https://cert-manager.io/v1.6-docs/installation/#default-static-install">di sini</a>.</li>
</ul>
<h2 id="Deply-Jaeger" class="common-anchor-header">Deply Jaeger<button data-href="#Deply-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger adalah platform penelusuran terdistribusi yang dirilis sebagai sumber terbuka oleh <a href="http://uber.github.io/">Uber Technologies</a>.</p>
<h3 id="1-Installing-the-Jaeger-Operator-on-Kubernetes" class="common-anchor-header">1. Menginstal Operator Jaeger di Kubernetes</h3><p>Untuk menginstal operator, jalankan:</p>
<pre><code translate="no" class="language-shell">$ kubectl create namespace observability
$ kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.62.0/jaeger-operator.yaml -n observability
<button class="copy-code-btn"></button></code></pre>
<p>Pada titik ini, seharusnya ada deployment <code translate="no">jaeger-operator</code> yang tersedia. Anda dapat melihatnya dengan menjalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> deployment jaeger-<span class="hljs-keyword">operator</span> -n observability

NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jaeger-<span class="hljs-keyword">operator</span>   <span class="hljs-number">1</span>         <span class="hljs-number">1</span>         <span class="hljs-number">1</span>            <span class="hljs-number">1</span>           <span class="hljs-number">48</span>s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Deploy-Jaeger" class="common-anchor-header">2. Menerapkan Jaeger</h3><p>Cara paling sederhana untuk membuat instans Jaeger adalah dengan membuat berkas YAML seperti contoh berikut. Ini akan menginstal strategi AllInOne default, yang menerapkan gambar <strong>all-in-one</strong> (menggabungkan <strong>jaeger-agent</strong>, <strong>jaeger-collector</strong>, <strong>jaeger-query</strong>, dan Jaeger UI) dalam satu pod, menggunakan <strong>penyimpanan dalam memori</strong> secara default.</p>
<p>Jika Anda ingin menyimpan jejak untuk waktu yang lama, silakan lihat <a href="https://www.jaegertracing.io/docs/1.62/operator/#production-strategy">strategi-produksi</a>.</p>
<pre><code translate="no" class="language-yaml">apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger
<button class="copy-code-btn"></button></code></pre>
<p>File YAML kemudian dapat digunakan dengan <code translate="no">kubectl</code>:</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f simplest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Dalam beberapa detik, instance Jaeger all-in-one dalam memori yang baru akan tersedia, cocok untuk demo cepat dan tujuan pengembangan. Untuk memeriksa instance yang telah dibuat, buat daftar objek Jaeger:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> jaegers

NAME     STATUS    VERSION   STRATEGY   STORAGE   AGE
jaeger   Running   <span class="hljs-number">1.62</span><span class="hljs-number">.0</span>    allinone   memory    <span class="hljs-number">13</span>s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Menginstal Milvus dengan Helm Chart<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menginstal atau mengupgrade Milvus dengan Helm Chart dengan pengaturan berikut:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles</span>:
  user.<span class="hljs-property">yaml</span>: |+
    <span class="hljs-attr">trace</span>:
      <span class="hljs-attr">exporter</span>: jaeger
      <span class="hljs-attr">sampleFraction</span>: <span class="hljs-number">1</span>
      <span class="hljs-attr">jaeger</span>:
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;http://jaeger-collector:14268/api/traces&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menerapkan pengaturan di atas pada deployment Milvus yang baru, Anda dapat menjalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ helm repo add zilliztech https://zilliztech.github.io/milvus-helm
$ helm repo update
$ helm upgrade --install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menerapkan pengaturan di atas pada deployment Milvus yang sudah ada, Anda dapat menjalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ helm upgrade my-release -f values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-Traces" class="common-anchor-header">Melihat Jejak<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda men-deploy Jaeger dan Milvus dengan Helm Chart, ingress telah diaktifkan oleh dfault. Anda dapat melihat ingress dengan menjalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> ingress

NAME           CLASS    HOSTS   ADDRESS         PORTS   AGE
jaeger-query   &lt;none&gt;   *       <span class="hljs-number">192.168</span><span class="hljs-number">.122</span><span class="hljs-number">.34</span>  <span class="hljs-number">80</span>      <span class="hljs-number">14</span>m
<button class="copy-code-btn"></button></code></pre>
<p>Setelah ingress tersedia, Anda dapat mengakses Jaeger UI dengan menavigasi ke <code translate="no">http://${ADDRESS}</code>. Ganti <code translate="no">${ADDRESS}</code> dengan alamat IP yang sebenarnya dari ingress.</p>
<p>Tangkapan layar berikut ini menunjukkan Jaeger UI dengan jejak Milvus selama operasi pencarian dan operasi pengumpulan beban:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" />
   </span> <span class="img-wrapper"> <span>Melacak Permintaan Pencarian</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" />
   </span> <span class="img-wrapper"> <span>Melacak Permintaan Pengumpulan Beban</span> </span></p>
