---
id: aws_layer7.md
title: Menyiapkan Load Balancer Layer-7 untuk Milvus di AWS
related_key: cluster
summary: >-
  Pelajari cara menggunakan cluster Milvus di belakang penyeimbang beban Layer-7
  di AWS.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">Menyiapkan Load Balancer Layer-7 untuk Milvus di AWS<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
<li>Anda telah <a href="/docs/id/eks.md">menerapkan cluster Milvus di belakang penyeimbang beban Layer-4 di AWS</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Mengubah konfigurasi Milvus</h3><p>Panduan ini mengasumsikan bahwa Anda telah <a href="/docs/id/eks.md">menggunakan cluster Milvus di belakang penyeimbang beban Layer-4 di AWS</a>.</p>
<p>Sebelum menyiapkan penyeimbang beban Layer-7 untuk klaster Milvus ini, jalankan perintah berikut untuk menghapus penyeimbang beban Layer-4.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.type=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Siapkan sertifikat TLS</h3><p>TLS membutuhkan sertifikat agar dapat berfungsi. Kami menggunakan <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a> untuk mengelola sertifikat dan perlu mengimpor sertifikat yang sudah ada ke ACM. Lihat <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">Mengimpor Sertifikat</a>. Berikut ini adalah contohnya.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># If the import-certificate command is successful, it returns the arn of the imported certificate.</span>
aws acm import-certificate --certificate fileb://Certificate.pem \
      --certificate-chain fileb://CertificateChain.pem \
      --private-key fileb://PrivateKey.pem  
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Membuat Ingress untuk menghasilkan Load Balancer Layer-7</h3><p>Siapkan berkas ingress sebagai berikut dan beri nama <code translate="no">ingress.yaml</code>. <strong>Ganti arn sertifikat dan host dengan milik Anda sendiri.</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">networking.k8s.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Ingress</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-demo</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/scheme:</span> <span class="hljs-string">internet-facing</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/backend-protocol-version:</span> <span class="hljs-string">GRPC</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/target-type:</span> <span class="hljs-string">ip</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/listen-ports:</span> <span class="hljs-string">&#x27;[{&quot;HTTPS&quot;:443}]&#x27;</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/certificate-arn:</span> <span class="hljs-string">&quot;arn:aws:acm:region:account-id:certificate/certificate-id&quot;</span>

<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">ingressClassName:</span> <span class="hljs-string">alb</span>
  <span class="hljs-attr">rules:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">host:</span> <span class="hljs-string">milvus-demo.milvus.io</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-attr">paths:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">path:</span> <span class="hljs-string">/</span>
          <span class="hljs-attr">pathType:</span> <span class="hljs-string">Prefix</span>
          <span class="hljs-attr">backend:</span>
            <span class="hljs-attr">service:</span>
              <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-demo</span>
              <span class="hljs-attr">port:</span>
                <span class="hljs-attr">number:</span> <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian Anda dapat membuat Ingress dengan menerapkan file tersebut ke cluster EKS Anda.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang, tunggu AWS menyiapkan penyeimbang beban Layer-7. Anda dapat memeriksa kemajuannya dengan menjalankan</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>Keluarannya akan serupa dengan yang berikut ini:</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>Setelah alamat ditampilkan pada bidang <strong>ADDRESS</strong>, penyeimbang beban Layer-7 siap digunakan.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;milvus-demo.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><strong>Host</strong> dan <strong>nama_server</strong> harus diganti dengan <strong>nama</strong> Anda sendiri.</li>
<li>Jika Anda telah menyiapkan catatan DNS untuk memetakan nama domain ke alb, ganti <strong>host</strong> dengan nama domain dan hilangkan <strong>nama_server</strong>.</li>
</ul>
</div>
