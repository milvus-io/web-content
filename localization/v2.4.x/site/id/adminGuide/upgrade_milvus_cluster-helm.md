---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Pelajari cara meningkatkan klaster Milvus dengan Helm Chart.
title: Tingkatkan Cluster Milvus dengan Helm Chart
---
<div class="tab-wrapper"><a href="/docs/id/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>Helm</a><a href="/docs/id/v2.4.x/upgrade_milvus_cluster-helm.md" class='active '>Operator</a><a href="/docs/id/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>Milvus</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Tingkatkan Cluster Milvus dengan Helm Chart<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menjelaskan cara mengupgrade cluster Milvus Anda dengan grafik Helm Milvus.</p>
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
<li>Versi Helm &gt;= 3.14.0</li>
<li>Versi Kubernetes &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>Sejak grafik Milvus-Helm versi 4.2.21, kami memperkenalkan grafik pulsar-v3.x sebagai ketergantungan. Untuk kompatibilitas ke belakang, silakan tingkatkan helm Anda ke versi v3.14 atau versi yang lebih baru, dan pastikan untuk menambahkan opsi <code translate="no">--reset-then-reuse-values</code> setiap kali Anda menggunakan <code translate="no">helm upgrade</code>.</p>
</div>
<h2 id="Check-Milvus-Helm-Chart" class="common-anchor-header">Memeriksa Bagan Helm Milvus<button data-href="#Check-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Jalankan perintah berikut ini untuk memeriksa versi Milvus yang baru.</p>
<pre><code translate="no">$ helm repo update zilliztech
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Repo Milvus Helm Charts di <code translate="no">https://milvus-io.github.io/milvus-helm/</code> telah diarsipkan dan Anda dapat memperoleh pembaruan lebih lanjut dari <code translate="no">https://zilliztech.github.io/milvus-helm/</code> sebagai berikut:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Repo yang diarsipkan masih tersedia untuk grafik hingga versi 4.0.31. Untuk rilis yang lebih baru, gunakan repo yang baru.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat memilih jalur upgrade untuk Milvus Anda sebagai berikut:</p>
<div style="display: none;">- [Lakukan peningkatan bergilir] (#melakukan-peningkatan bergilir) dari Milvus v2.2.3 dan rilis yang lebih baru ke v2.4.23.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Tingkatkan Milvus menggunakan Helm</a> untuk peningkatan dari rilis minor sebelum v2.2.3 ke v2.4.23.</p></li>
<li><p><a href="#Migrate-the-metadata">Migrasi metadata</a> sebelum peningkatan dari Milvus v2.1.x ke v2.4.23.</p></li>
</ul>
<div style="display: none;">
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
    </button></h2><p>Sejak Milvus 2.2.3, Anda dapat mengkonfigurasi koordinator Milvus untuk bekerja dalam mode siaga aktif dan mengaktifkan fitur peningkatan bergilir untuk mereka, sehingga Milvus dapat menanggapi permintaan yang masuk selama peningkatan koordinator. Pada rilis sebelumnya, koordinator akan dihapus dan kemudian dibuat selama peningkatan, yang dapat menyebabkan waktu henti tertentu pada layanan.</p>
<p>Upgrade bergulir mengharuskan koordinator untuk bekerja dalam mode siaga aktif. Anda dapat menggunakan <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">skrip</a> yang kami sediakan untuk mengonfigurasi koordinator agar bekerja dalam mode siaga aktif dan memulai pemutakhiran bergulir.</p>
<p>Berdasarkan kemampuan pembaruan bergulir yang disediakan oleh Kubernetes, skrip di atas memberlakukan pembaruan terurut dari penyebaran sesuai dengan dependensinya. Selain itu, Milvus mengimplementasikan mekanisme untuk memastikan bahwa komponen-komponennya tetap kompatibel dengan komponen-komponen yang bergantung padanya selama peningkatan, sehingga secara signifikan mengurangi potensi waktu henti layanan.</p>
<p>Skrip ini hanya berlaku untuk peningkatan Milvus yang diinstal dengan Helm. Tabel berikut mencantumkan flag perintah yang tersedia dalam skrip.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Nilai default</th><th>Diperlukan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Nama instance Milvus</td><td><code translate="no">None</code></td><td>Benar</td></tr>
<tr><td><code translate="no">n</code></td><td>Ruang nama tempat Milvus diinstal</td><td><code translate="no">default</code></td><td>Salah</td></tr>
<tr><td><code translate="no">t</code></td><td>Versi Milvus yang ditargetkan</td><td><code translate="no">None</code></td><td>Benar</td></tr>
<tr><td><code translate="no">w</code></td><td>Tag gambar Milvus yang baru</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>Benar</td></tr>
<tr><td><code translate="no">o</code></td><td>Operasi</td><td><code translate="no">update</code></td><td>Salah</td></tr>
</tbody>
</table>
<p>Setelah Anda memastikan bahwa semua deployment dalam instans Milvus Anda berada dalam status normal. Anda dapat menjalankan perintah berikut untuk memutakhirkan instans Milvus ke 2.4.23.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>Skrip ini mengkodekan urutan peningkatan penyebaran dan tidak dapat diubah.</li>
<li>Skrip ini menggunakan <code translate="no">kubectl patch</code> untuk memperbarui deployment dan <code translate="no">kubectl rollout status</code> untuk melihat statusnya.</li>
<li>Skrip menggunakan <code translate="no">kubectl patch</code> untuk memperbarui label <code translate="no">app.kubernetes.io/version</code> pada deployment ke label yang ditentukan setelah bendera <code translate="no">-t</code> pada perintah.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Memutakhirkan Milvus menggunakan Helm<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk memutakhirkan Milvus dari rilis minor sebelum v2.2.3 ke versi terbaru, jalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>Gunakan versi grafik Helm pada perintah sebelumnya. Untuk detail mengenai cara mendapatkan versi grafik Helm, lihat <a href="#Check-the-Milvus-version">Memeriksa versi Milvus</a>.</p>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Memigrasi metadata<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Sejak Milvus 2.2.0, metadata tidak kompatibel dengan metadata pada rilis sebelumnya. Contoh cuplikan berikut ini mengasumsikan upgrade dari Milvus 2.1.4 ke Milvus 2.2.0.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Memeriksa versi Milvus</h3><p>Jalankan <code translate="no">$ helm list</code> untuk memeriksa versi aplikasi Milvus Anda. Anda dapat melihat bahwa <code translate="no">APP VERSION</code> adalah 2.1.4.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>    
<span class="hljs-keyword">new</span>-release         <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span> 
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. Memeriksa pod yang sedang berjalan</h3><p>Jalankan <code translate="no">$ kubectl get pods</code> untuk memeriksa pod yang sedang berjalan. Anda dapat melihat keluaran berikut ini.</p>
<pre><code translate="no">NAME                                             READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datacoord<span class="hljs-number">-664</span>c58798d-fl75s    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datanode<span class="hljs-number">-5f</span>75686c55-xfg2r     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexcoord<span class="hljs-number">-5f</span>98b97589<span class="hljs-number">-2l</span>48r   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexnode<span class="hljs-number">-857b</span>4ddf98-vmd75    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querycoord-c454f44cd-dwmwq    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querynode<span class="hljs-number">-76b</span>b4946d-lbrz6     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-rootcoord<span class="hljs-number">-7764</span>c5b686<span class="hljs-number">-62</span>msm    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-tjxpj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-c8vvc             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. Memeriksa tag gambar</h3><p>Periksa tag gambar untuk pod <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. Anda dapat melihat rilis klaster Milvus Anda adalah v2.1.4.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. Migrasi metadata</h3><p>Perubahan besar di Milvus 2.2 adalah struktur metadata dari indeks segmen. Oleh karena itu, Anda perlu menggunakan Helm untuk memigrasikan metadata ketika mengupgrade Milvus dari v2.1.x ke v2.2.0. Berikut ini adalah <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">skrip</a> untuk memigrasikan metadata Anda dengan aman.</p>
<p>Skrip ini hanya berlaku untuk Milvus yang diinstal pada cluster K8s. Kembalikan ke versi sebelumnya dengan operasi rollback terlebih dahulu jika terjadi kesalahan selama proses.</p>
<p>Tabel berikut mencantumkan operasi yang dapat Anda lakukan untuk migrasi metadata.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Nilai default</th><th>Wajib diisi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Nama instance Milvus.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>Ruang nama tempat Milvus diinstal.</td><td><code translate="no">default</code></td><td>False</td></tr>
<tr><td><code translate="no">s</code></td><td>Versi Milvus sumber.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">t</code></td><td>Versi Milvus target.</td><td><code translate="no">None</code></td><td>Benar</td></tr>
<tr><td><code translate="no">r</code></td><td>Jalur akar dari meta Milvus.</td><td><code translate="no">by-dev</code></td><td>Salah</td></tr>
<tr><td><code translate="no">w</code></td><td>Tag gambar Milvus yang baru.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">m</code></td><td>Tag gambar migrasi meta.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">o</code></td><td>Operasi migrasi meta.</td><td><code translate="no">migrate</code></td><td>False</td></tr>
<tr><td><code translate="no">d</code></td><td>Apakah akan menghapus pod migrasi setelah migrasi selesai.</td><td><code translate="no">false</code></td><td>False</td></tr>
<tr><td><code translate="no">c</code></td><td>Kelas penyimpanan untuk meta migrasi pvc.</td><td><code translate="no">default storage class</code></td><td>False</td></tr>
<tr><td><code translate="no">e</code></td><td>Enpoint etcd yang digunakan oleh milvus.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>False</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. Memigrasi metadata</h4><ol>
<li>Unduh <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">skrip migrasi</a>.</li>
<li>Hentikan komponen Milvus. Sesi live apa pun di Milvus etcd dapat menyebabkan kegagalan migrasi.</li>
<li>Buat cadangan untuk metadata Milvus.</li>
<li>Migrasi metadata Milvus.</li>
<li>Memulai komponen Milvus dengan image baru.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-220" class="common-anchor-header">2. Memutakhirkan Milvus dari v2.1.x ke 2.2.0</h4><p>Perintah berikut ini mengasumsikan bahwa Anda memutakhirkan Milvus dari v2.1.4 ke 2.2.0. Ubahlah ke versi yang sesuai dengan kebutuhan Anda.</p>
<ol>
<li><p>Tentukan nama instans Milvus, versi Milvus sumber, dan versi Milvus target.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tentukan namespace dengan <code translate="no">-n</code> jika Milvus Anda tidak terinstal pada namespace default K8s.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tentukan jalur root dengan <code translate="no">-r</code> jika Milvus Anda terinstalasi dengan <code translate="no">rootpath</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tentukan tag gambar dengan <code translate="no">-w</code> jika Milvus Anda terinstalasi dengan <code translate="no">image</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tetapkan <code translate="no">-d true</code> jika Anda ingin menghapus pod migrasi secara otomatis setelah migrasi selesai.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -w milvusdb/milvus:v2.2.0 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kembalikan dan migrasi lagi jika migrasi gagal.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o rollback -w milvusdb/milvus:v2.1.4
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o migrate -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
