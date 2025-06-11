---
id: gcp_layer7.md
title: Menyiapkan Penyeimbang Beban Layer-7 untuk Milvus di GCP
related_key: cluster
summary: >-
  Pelajari cara menggunakan cluster Milvus di belakang penyeimbang beban Layer-7
  pada GCP.
---

<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">Menyiapkan Penyeimbang Beban Layer-7 untuk Milvus di GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>Jika dibandingkan dengan penyeimbang beban Layer-4, penyeimbang beban Layer-7 menawarkan kemampuan penyeimbangan beban dan caching yang cerdas dan merupakan pilihan yang tepat untuk layanan cloud-native.</p>
<p>Panduan ini memandu Anda dalam menyiapkan penyeimbang beban Layer-7 untuk cluster Milvus yang sudah berjalan di belakang penyeimbang beban Layer-4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Sebelum memulai</h3><ul>
<li><p>Sebuah proyek sudah ada di akun GCP Anda.</p>
<p>Untuk membuat proyek, lihat <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Membuat dan mengelola proyek</a>. Nama proyek yang digunakan dalam panduan ini adalah <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Anda telah menginstal <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a>, dan <a href="https://helm.sh/docs/intro/install/">Helm</a> secara lokal, atau memutuskan untuk menggunakan <a href="https://cloud.google.com/shell">Cloud Shell</a> berbasis peramban.</p></li>
<li><p>Anda telah <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">menginisialisasi gcloud CLI</a> dengan kredensial akun GCP Anda.</p></li>
<li><p>Anda telah <a href="/docs/id/v2.5.x/gcp.md">menerapkan cluster Milvus di belakang penyeimbang beban Layer-4 pada GCP</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Mengubah konfigurasi Milvus</h3><p>Panduan ini mengasumsikan bahwa Anda telah <a href="/docs/id/v2.5.x/gcp.md">menggunakan cluster Milvus di belakang penyeimbang beban Layer-4 pada GCP</a>.</p>
<p>Sebelum menyiapkan penyeimbang beban Layer-7 untuk klaster Milvus ini, jalankan perintah berikut untuk menghapus penyeimbang beban Layer-4.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>Sebagai layanan backend dari penyeimbang beban Layer-7, Milvus harus memenuhi <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">persyaratan enkripsi tertentu</a> agar dapat memahami permintaan HTTP/2 dari penyeimbang beban. Oleh karena itu, Anda perlu mengaktifkan TLS pada cluster Milvus Anda sebagai berikut.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>konten tls.yaml:</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">Menyiapkan titik akhir pemeriksaan kesehatan</h3><p>Untuk memastikan ketersediaan layanan, penyeimbangan beban Layer-7 pada GCP memerlukan pemeriksaan kondisi kesehatan layanan backend. Oleh karena itu, kita perlu menyiapkan BackendConfig untuk membungkus titik akhir pemeriksaan kesehatan dan mengaitkan BackendConfig dengan layanan Milvus melalui anotasi.</p>
<p>Cuplikan berikut ini adalah pengaturan BackendConfig. Simpan sebagai <code translate="no">backendconfig.yaml</code> untuk digunakan nanti.</p>
<pre><code translate="no" class="language-yaml">apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: my-release-backendconfig
  namespace: default
spec:
  healthCheck:
    port: 9091
    requestPath: /healthz
    <span class="hljs-built_in">type</span>: HTTP
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian jalankan perintah berikut untuk membuat titik akhir pemeriksaan kesehatan.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Terakhir, perbarui anotasi pada layanan Milvus untuk meminta penyeimbang beban Layer-7 yang akan kita buat nanti untuk melakukan pemeriksaan kesehatan menggunakan endpoint yang baru saja dibuat.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Mengenai penjelasan pertama,</p>
<p>Milvus adalah asli dari gRPC, yang dibangun di atas HTTP/2. Oleh karena itu, kita dapat menggunakan HTTP/2 sebagai protokol komunikasi antara penyeimbang beban Layer-7 dan Milvus.</p></li>
<li><p>Mengenai penjelasan kedua,</p>
<p>Milvus hanya menawarkan endpoint pemeriksaan kesehatan melalui gRPC dan HTTP/1. Kita perlu menyiapkan BackendConfig untuk membungkus endpoint pemeriksaan kesehatan dan mengasosiasikannya dengan layanan Milvus sehingga penyeimbang beban Layer-7 menyelidiki endpoint ini untuk mengetahui kondisi kesehatan Milvus.</p></li>
<li><p>Mengenai anotasi ketiga,</p>
<p>Ini meminta pembuatan grup titik akhir jaringan (NEG) setelah Ingress dibuat. Ketika NEG digunakan dengan GKE Ingress, pengontrol Ingress memfasilitasi pembuatan semua aspek penyeimbang beban. Ini termasuk membuat alamat IP virtual, aturan penerusan, pemeriksaan kesehatan, aturan firewall, dan banyak lagi. Untuk detailnya, lihat <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">dokumen Google Cloud</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Menyiapkan sertifikat TLS</h3><p>TLS memerlukan sertifikat agar dapat berfungsi. <strong>Ada dua cara untuk membuat sertifikat, yaitu dikelola sendiri dan dikelola Google.</strong></p>
<p>Panduan ini menggunakan <strong>my-release.milvus.io</strong> sebagai nama domain untuk mengakses layanan Milvus.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">Membuat sertifikat yang dikelola sendiri</h4><p>Jalankan perintah berikut ini untuk membuat sertifikat.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
 -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
 -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>

<p>Kemudian, buatlah rahasia di dalam cluster GKE Anda dengan berkas-berkas ini untuk digunakan nanti.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Membuat sertifikat yang dikelola Google</h4><p>Cuplikan berikut ini adalah pengaturan ManagedCertificate. Simpan sebagai <code translate="no">managed-crt.yaml</code> untuk digunakan nanti.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>Buat sertifikat terkelola dengan menerapkan pengaturan ke cluster GKE Anda sebagai berikut:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Hal ini dapat berlangsung selama beberapa saat. Anda dapat memeriksa kemajuannya dengan menjalankan</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>Keluarannya akan serupa dengan yang berikut ini:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>Setelah <strong>certificateStatus</strong> berubah menjadi <strong>Active</strong>, Anda siap untuk menyiapkan penyeimbang beban.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Membuat Ingress untuk menghasilkan Load Balancer Layer-7</h3><p>Buat berkas YAML dengan salah satu cuplikan berikut ini.</p>
<ul>
<li><p>Menggunakan sertifikat yang dikelola sendiri</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: networking.<span class="hljs-property">k8s</span>.<span class="hljs-property">io</span>/v1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Ingress</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release-milvus
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">tls</span>:
  - <span class="hljs-attr">hosts</span>:
    - my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">secretName</span>: my-release-milvus-tls
  <span class="hljs-attr">rules</span>:
  - <span class="hljs-attr">host</span>: my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">http</span>:
      <span class="hljs-attr">paths</span>:
      - <span class="hljs-attr">path</span>: /
        <span class="hljs-attr">pathType</span>: <span class="hljs-title class_">Prefix</span>
        <span class="hljs-attr">backend</span>:
          <span class="hljs-attr">service</span>:
            <span class="hljs-attr">name</span>: my-release-milvus
            <span class="hljs-attr">port</span>:
              <span class="hljs-attr">number</span>: <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Menggunakan sertifikat yang dikelola Google</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-release-milvus
  namespace: default
  annotations:
    networking.gke.io/managed-certificates: <span class="hljs-string">&quot;my-release-milvus-tls&quot;</span>
spec:
  rules:
  - host: my-release.milvus.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-release-milvus
            port:
              number: 19530
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Kemudian, Anda dapat membuat Ingress dengan menerapkan berkas tersebut ke cluster GKE Anda.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang, tunggu Google menyiapkan penyeimbang beban Layer-7. Anda dapat memeriksa kemajuannya dengan menjalankan</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>Keluarannya akan serupa dengan yang berikut ini:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>Setelah alamat IP ditampilkan di bidang <strong>ADDRESS</strong>, penyeimbang beban Layer-7 siap digunakan. Baik port 80 dan port 443 ditampilkan pada output di atas. Ingat, Anda harus selalu menggunakan port 443 untuk kepentingan Anda.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Verifikasi koneksi melalui penyeimbang beban Layer-7<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>Panduan ini menggunakan PyMilvus untuk memverifikasi koneksi ke layanan Milvus di belakang penyeimbang beban Layer-7 yang baru saja kita buat. Untuk langkah-langkah terperinci, <a href="https://milvus.io/docs/v2.3.x/example_code.md">baca ini</a>.</p>
<p>Perhatikan bahwa parameter koneksi bervariasi sesuai dengan cara yang Anda pilih untuk mengelola sertifikat di <a href="#prepare-tls-certificates">Siapkan sertifikat TLS</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

<span class="hljs-comment"># For self-managed certificates, you need to include the certificate in the parameters used to set up the connection.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, server_pem_path=<span class="hljs-string">&quot;tls.crt&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)

<span class="hljs-comment"># For Google-managed certificates, there is not need to do so.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>

<div class="alert note">
<ul>
<li>Alamat IP dan nomor port pada <strong>host</strong> dan <strong>port</strong> harus sama dengan yang tercantum di akhir <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Membuat Ingress untuk menghasilkan Load Balancer Layer-7.</a></li>
<li>Jika Anda telah menyiapkan catatan DNS untuk memetakan nama domain ke alamat IP host, ganti alamat IP pada <strong>host</strong> dengan nama domain dan hilangkan <strong>nama_server</strong>.</li>
</ul>
</div>
