---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Pelajari cara meng-upgrade cluster Milvus dengan Milvus Operator.
title: Meningkatkan Cluster Milvus dengan Operator Milvus
---
<div class="tab-wrapper"><a href="/docs/id/v2.4.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/id/v2.4.x/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Meningkatkan Cluster Milvus dengan Operator Milvus<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menjelaskan cara mengupgrade cluster Milvus Anda dengan operator Milvus.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Tingkatkan operator Milvus Anda<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Jalankan perintah berikut untuk mengupgrade versi Operator Milvus Anda ke v1.1.9.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah Anda mengupgrade operator Milvus Anda ke versi terbaru, Anda memiliki beberapa pilihan berikut:</p>
<ul>
<li>Untuk mengupgrade Milvus dari versi v2.2.3 atau rilis yang lebih baru ke versi 2.4.23, Anda dapat <a href="#Conduct-a-rolling-upgrade">melakukan upgrade bergilir.</a></li>
<li>Untuk mengupgrade Milvus dari rilis minor sebelum v2.2.3 ke 2.4.23, Anda disarankan untuk mengupgrade <a href="#Upgrade-Milvus-by-changing-its-image">Milvus dengan mengubah versi image-nya</a>.</li>
<li>Untuk memutakhirkan Milvus dari v2.1.x ke 2.4.23, Anda perlu melakukan <a href="#Migrate-the-metadata">migrasi metadata</a> sebelum melakukan pemutakhiran.</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Melakukan pemutakhiran bergilir<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Sejak Milvus 2.2.3, Anda dapat mengkonfigurasi koordinator Milvus untuk bekerja dalam mode siaga aktif dan mengaktifkan fitur pemutakhiran bergilir untuk mereka, sehingga Milvus dapat merespon permintaan yang masuk selama pemutakhiran koordinator. Pada rilis sebelumnya, koordinator akan dihapus dan kemudian dibuat selama peningkatan, yang dapat menyebabkan waktu henti tertentu pada layanan.</p>
<p>Berdasarkan kemampuan pembaruan bergulir yang disediakan oleh Kubernetes, operator Milvus memberlakukan pembaruan yang teratur pada penerapan sesuai dengan ketergantungannya. Selain itu, Milvus mengimplementasikan mekanisme untuk memastikan bahwa komponennya tetap kompatibel dengan komponen yang bergantung padanya selama peningkatan, sehingga secara signifikan mengurangi potensi downtime layanan.</p>
<p>Fitur peningkatan bergulir dinonaktifkan secara default. Anda perlu mengaktifkannya secara eksplisit melalui file konfigurasi.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingUpgrade <span class="hljs-comment"># Default value, can be omitted</span>
    image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>Pada file konfigurasi di atas, atur <code translate="no">spec.components.enableRollingUpdate</code> ke <code translate="no">true</code> dan atur <code translate="no">spec.components.image</code> ke versi Milvus yang diinginkan.</p>
<p>Secara default, Milvus melakukan pemutakhiran bergilir untuk koordinator dengan cara berurutan, di mana Milvus mengganti image pod koordinator satu demi satu. Untuk mengurangi waktu peningkatan, pertimbangkan untuk mengatur <code translate="no">spec.components.imageUpdateMode</code> ke <code translate="no">all</code> sehingga Milvus mengganti semua gambar pod pada waktu yang sama.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: all
    image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat mengatur <code translate="no">spec.components.imageUpdateMode</code> ke <code translate="no">rollingDowngrade</code> agar Milvus mengganti image pod koordinator dengan versi yang lebih rendah.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingDowngrade
    image: milvusdb/milvus:&lt;some-old-version&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian simpan konfigurasi Anda sebagai berkas YAML (misalnya, <code translate="no">milvusupgrade.yaml</code>) dan tambal berkas konfigurasi ini ke instans Milvus Anda sebagai berikut:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Memutakhirkan Milvus dengan mengubah citranya<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada kasus normal, Anda cukup memperbarui Milvus Anda ke versi terbaru dengan mengubah image-nya. Namun, perhatikan bahwa akan ada waktu henti tertentu saat mengupgrade Milvus dengan cara ini.</p>
<p>Buatlah berkas konfigurasi sebagai berikut dan simpan sebagai <strong>milvusupgrade.yaml</strong>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
   image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian jalankan perintah berikut ini untuk melakukan peningkatan:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrasi metadata<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Sejak Milvus 2.2.0, metadata tidak kompatibel dengan metadata pada rilis sebelumnya. Contoh cuplikan berikut mengasumsikan peningkatan dari Milvus 2.1.4 ke Milvus 2.4.23.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. Buat file <code translate="no">.yaml</code> untuk migrasi metadata</h3><p>Buatlah file migrasi metadata. Berikut ini adalah contohnya. Anda perlu menentukan <code translate="no">name</code>, <code translate="no">sourceVersion</code>, dan <code translate="no">targetVersion</code> dalam file konfigurasi. Contoh berikut ini mengatur <code translate="no">name</code> ke <code translate="no">my-release-upgrade</code>, <code translate="no">sourceVersion</code> ke <code translate="no">v2.1.4</code>, dan <code translate="no">targetVersion</code> ke <code translate="no">v2.4.23</code>. Ini berarti bahwa cluster Milvus Anda akan ditingkatkan dari v2.1.4 ke v2.4.23.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: MilvusUpgrade
metadata:
  name: my-release-upgrade
spec:
  milvus:
    namespace: default
    name: my-release
  sourceVersion: <span class="hljs-string">&quot;v2.1.4&quot;</span>
  targetVersion: <span class="hljs-string">&quot;v2.4.23&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.4.23&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. Menerapkan konfigurasi baru</h3><p>Jalankan perintah berikut untuk membuat konfigurasi baru.</p>
<pre><code translate="no">$ kubectl create -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/zilliztech/milvus-operator/blob/main/config/samples/beta/milvusupgrade.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. Memeriksa status migrasi metadata</h3><p>Jalankan perintah berikut untuk memeriksa status migrasi metadata Anda.</p>
<pre><code translate="no">kubectl describe milvus release-name
<button class="copy-code-btn"></button></code></pre>
<p>Status <code translate="no">ready</code> pada keluaran berarti migrasi metadata berhasil.</p>
<p>Atau, Anda juga dapat menjalankan <code translate="no">kubectl get pod</code> untuk memeriksa semua pod. Jika semua pod adalah <code translate="no">ready</code>, migrasi metadata berhasil.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. Hapus <code translate="no">my-release-upgrade</code></h3><p>Jika peningkatan berhasil, hapus <code translate="no">my-release-upgrade</code> dalam berkas YAML.</p>
