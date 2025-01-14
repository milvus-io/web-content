---
id: object_storage_operator.md
title: Mengkonfigurasi Penyimpanan Objek dengan Operator Milvus
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Pelajari cara mengonfigurasi penyimpanan objek dengan Milvus Operator.
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Mengkonfigurasi Penyimpanan Objek dengan Operator Milvus<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menggunakan MinIO atau S3 sebagai penyimpanan objek untuk menyimpan berkas berskala besar, seperti berkas indeks dan log biner. Topik ini memperkenalkan cara mengonfigurasi ketergantungan penyimpanan objek ketika Anda menginstal Milvus dengan Milvus Operator. Untuk detail lebih lanjut, lihat <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Mengonfigurasi Penyimpanan Objek dengan Milvus Operator</a> di repositori Milvus Operator.</p>
<p>Topik ini mengasumsikan bahwa Anda telah men-deploy Milvus Operator.</p>
<div class="alert note">Lihat Menerapkan <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Milvus Operator</a> untuk informasi lebih lanjut. </div>
<p>Anda perlu menentukan file konfigurasi untuk menggunakan Milvus Operator untuk memulai cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda hanya perlu mengedit template kode di <code translate="no">milvus_cluster_default.yaml</code> untuk mengonfigurasi dependensi pihak ketiga. Bagian berikut ini memperkenalkan cara mengonfigurasi penyimpanan objek, etcd, dan Pulsar.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">Mengkonfigurasi penyimpanan objek<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus cluster menggunakan MinIO atau S3 sebagai penyimpanan objek untuk menyimpan berkas-berkas berskala besar, seperti berkas indeks dan log biner. Tambahkan bidang yang diperlukan di bawah <code translate="no">spec.dependencies.storage</code> untuk mengonfigurasi penyimpanan objek, opsi yang memungkinkan adalah <code translate="no">external</code> dan <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">Penyimpanan objek internal</h3><p>Secara default, Operator Milvus menggunakan MinIO dalam cluster untuk Milvus. Berikut ini adalah contoh konfigurasi untuk mendemonstrasikan bagaimana menggunakan MinIO ini sebagai penyimpanan objek internal.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    storage:
      inCluster:
        values:
          mode: standalone
          resources:
            requests:
              memory: 100Mi
        deletionPolicy: Delete <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        pvcDeletion: true <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah konfigurasi di atas diterapkan, MinIO in-cluster akan berjalan dalam mode mandiri dengan batas memori hingga 100Mi. Perhatikan bahwa</p>
<ul>
<li><p>Kolom <code translate="no">deletionPolicy</code> menentukan kebijakan penghapusan MinIO dalam cluster. Secara default adalah <code translate="no">Delete</code> dan memiliki <code translate="no">Retain</code> sebagai opsi alternatif.</p>
<ul>
<li><code translate="no">Delete</code> mengindikasikan bahwa penyimpanan objek dalam klaster akan dihapus ketika Anda menghentikan instans Milvus.</li>
<li><code translate="no">Retain</code> mengindikasikan bahwa penyimpanan objek dalam cluster dipertahankan sebagai layanan ketergantungan untuk startup berikutnya dari instans Milvus Anda.</li>
</ul></li>
<li><p>Kolom <code translate="no">pvcDeletion</code> menentukan apakah akan menghapus PVC (Persistent Volume Claim) ketika MinIO dalam cluster dihapus.</p></li>
</ul>
<p>Kolom di bawah <code translate="no">inCluster.values</code> sama dengan yang ada di Milvus Helm Chart, dan Anda dapat menemukannya <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">di sini</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">Penyimpanan objek eksternal</h3><p>Menggunakan <code translate="no">external</code> dalam file YAML template menunjukkan penggunaan layanan penyimpanan objek eksternal. Untuk menggunakan penyimpanan objek eksternal, Anda perlu mengatur bidang dengan benar di bawah <code translate="no">spec.dependencies.storage</code> dan <code translate="no">spec.config.minio</code> di Milvus CRD.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">Menggunakan Amazon Web Service (AWS) S3 sebagai penyimpanan objek eksternal</h4><ul>
<li><p>Mengonfigurasi Akses AWS S3 dengan AK/SK</p>
<p>Bucket S3 biasanya dapat diakses dengan sepasang kunci akses dan kunci rahasia akses. Anda dapat membuat objek <code translate="no">Secret</code> untuk menyimpannya di Kubernetes Anda sebagai berikut:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-s3-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian Anda dapat mengonfigurasi AWS S3 bucket sebagai penyimpanan objek eksternal:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      <span class="hljs-comment"># your bucket name</span>
      bucketName: &lt;my-bucket&gt;
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      rootPath: milvus/my-release
      useSSL: true
  dependencies:
    storage:
      <span class="hljs-comment"># enable external object storage</span>
      external: true
      <span class="hljs-built_in">type</span>: S3 <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      endpoint: s3.amazonaws.com:<span class="hljs-number">443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      secretRef: <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mengonfigurasi Akses AWS S3 dengan AssumeRole</p>
<p>Sebagai alternatif, Anda dapat membuat Milvus mengakses bucket AWS S3 Anda menggunakan <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a>, sehingga hanya kredensial sementara yang dilibatkan, bukan AK/SK Anda yang sebenarnya.</p>
<p>Jika ini yang Anda inginkan, Anda perlu menyiapkan role di konsol AWS Anda dan mendapatkan ARN-nya, yang biasanya dalam bentuk <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code>.</p>
<p>Kemudian buatlah objek <code translate="no">ServiceAccount</code> untuk menyimpannya di Kubernetes Anda sebagai berikut:</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Setelah semuanya siap, rujuk <code translate="no">ServiceAccount</code> di atas pada berkas YAML template, dan setel <code translate="no">spec.config.minio.useIAM</code> ke <code translate="no">true</code> untuk mengaktifkan AssumeRole.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># Note: you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      endpoint: s3.&lt;my-bucket-region&gt;.amazonaws.com:<span class="hljs-number">443</span>
      secretRef: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Gunakan Google Cloud Storage (GCS) sebagai penyimpanan objek eksternal</h4><p>Penyimpanan objek AWS S3 bukan satu-satunya pilihan. Anda juga dapat menggunakan layanan penyimpanan objek dari penyedia cloud publik lainnya, seperti Google Cloud.</p>
<ul>
<li><p>Konfigurasikan Akses GCS dengan AK/SK</p>
<p>Konfigurasinya sebagian besar mirip dengan menggunakan AWS S3. Anda masih perlu membuat objek <code translate="no">Secret</code> untuk menyimpan kredensial Anda di Kubernetes.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-gcp-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, Anda hanya perlu mengubah <code translate="no">endpoint</code> menjadi <code translate="no">storage.googleapis.com:443</code> dan mengatur <code translate="no">spec.config.minio.cloudProvider</code> menjadi <code translate="no">gcp</code> sebagai berikut:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      cloudProvider: gcp
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      endpoint: storage.googleapis.com:<span class="hljs-number">443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mengonfigurasi Akses GCS dengan AssumeRole</p>
<p>Mirip dengan AWS S3, Anda juga dapat menggunakan <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a> untuk mengakses GCS dengan kredensial sementara jika Anda menggunakan GKE sebagai cluster Kubernetes Anda.</p>
<p>Penjelasan pada <code translate="no">ServiceAccount</code> berbeda dengan penjelasan pada AWS EKS. Anda perlu menentukan nama akun layanan GCP, bukan ARN peran.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, Anda dapat mengonfigurasi instans Milvus Anda untuk menggunakan <code translate="no">ServiceAccount</code> di atas dan mengaktifkan AssumeRole dengan mengatur <code translate="no">spec.config.minio.useIAM</code> ke <code translate="no">true</code> sebagai berikut:</p>
<pre><code translate="no" class="language-YAML">labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      cloudProvider: gcp
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
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
    </button></h2><p>Pelajari cara mengonfigurasi dependensi Milvus lainnya dengan Milvus Operator:</p>
<ul>
<li><a href="/docs/id/meta_storage_operator.md">Mengonfigurasi Meta Storage dengan Milvus Operator</a></li>
<li><a href="/docs/id/message_storage_operator.md">Mengonfigurasi Penyimpanan Pesan dengan Operator Milvus</a></li>
</ul>
