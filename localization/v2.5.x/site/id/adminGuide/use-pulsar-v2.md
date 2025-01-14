---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus menyarankan Anda untuk meng-upgrade Pulsar ke v3 untuk Milvus v2.5.x.
  Namun, jika Anda lebih memilih untuk menggunakan Pulsar v2, artikel ini akan
  memandu Anda melalui langkah-langkah untuk terus menggunakan Pulsar v2 dengan
  Milvus v2.5.x.
title: Menggunakan Pulsar v2 dengan Milvus v2.5.x
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Menggunakan Pulsar v2 dengan Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyarankan Anda untuk mengupgrade Pulsar ke v3 untuk menjalankan Milvus v2.5.x. Untuk informasi lebih lanjut, lihat <a href="/docs/id/upgrade-pulsar-v3.md">Upgrade Pulsar</a>. Namun, jika Anda lebih suka menggunakan Pulsar v2 dengan Milvus v2.5.x, artikel ini akan memandu Anda melalui prosedur untuk menjalankan Milvus v2.5.x dengan Pulsar v2.</p>
<p>Jika Anda telah memiliki instans Milvus yang berjalan dan ingin memutakhirkannya ke v2.5.x namun tetap menggunakan Pulsar v2, Anda dapat mengikuti langkah-langkah di halaman ini.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Melanjutkan penggunaan Pulsar v2 sambil mengupgrade Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini akan memandu Anda melalui langkah-langkah untuk terus menggunakan Pulsar v2 sembari mengupgrade instance Milvus yang sedang berjalan ke Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Untuk pengguna Milvus Operator</h3><p>Milvus Operator kompatibel dengan peningkatan Pulsar v2 secara default. Anda dapat mengupgrade instance Milvus Anda ke v2.5.x dengan merujuk ke <a href="/docs/id/upgrade_milvus_cluster-operator.md">Upgrade Milvus Cluster dengan Milvus Operator</a>.</p>
<p>Setelah peningkatan selesai, Anda dapat terus menggunakan Pulsar v2 dengan instance Milvus Anda.</p>
<h3 id="For-Helm-users" class="common-anchor-header">Untuk pengguna Helm</h3><p>Sebelum melakukan peningkatan, pastikan bahwa</p>
<ul>
<li><p>Versi Helm Anda di atas v3.12, dan versi terbaru direkomendasikan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="https://helm.sh/docs/intro/install/">Menginstal Helm</a>.</p></li>
<li><p>Versi Kubernetes Anda di atas v1.20.</p></li>
</ul>
<p>Pengoperasian dalam artikel ini mengasumsikan demikian:</p>
<ul>
<li><p>Milvus telah terinstal di ruang nama <code translate="no">default</code>.</p></li>
<li><p>Nama rilis Milvus adalah <code translate="no">my-release</code>.</p></li>
</ul>
<p>Anda perlu mengubah berkas <code translate="no">values.yaml</code> untuk menentukan versi Pulsar sebagai v2 sebelum memutakhirkan Milvus. Langkah-langkahnya adalah sebagai berikut:</p>
<ol>
<li><p>Dapatkan berkas <code translate="no">values.yaml</code> saat ini dari instans Milvus Anda.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edit berkas <code translate="no">values.yaml</code> untuk menentukan versi Pulsar sebagai v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>Untuk <code translate="no">image</code>, ubah <code translate="no">tag</code> ke versi Milvus yang diinginkan (misal: <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>Perbarui bagan Helm Milvus.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Memperbarui instance Milvus.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Membuat instans Milvus baru dengan Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini akan memandu Anda melalui langkah-langkah untuk membuat instans Milvus baru dengan Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Untuk pengguna Milvus Operator</h3><p>Sebelum Anda menggunakan Milvus v2.5.x, Anda perlu mengunduh dan mengedit file Customer Resource Definition (CRD) Milvus. Untuk detail tentang cara menginstal Milvus menggunakan Milvus Operator, lihat <a href="/docs/id/install_cluster-milvusoperator.md">Menginstalasi Milvus Cluster dengan Milvus Operator</a>.</p>
<ol>
<li><p>Unduh file CRD.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edit berkas <code translate="no">milvus_cluster_default.yaml</code> untuk menentukan versi Pulsar sebagai v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
  <span class="hljs-attr">labels</span>:
    <span class="hljs-attr">app</span>: milvus
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">mode</span>: cluster
  <span class="hljs-attr">dependencies</span>:
    <span class="hljs-attr">pulsar</span>:
      <span class="hljs-attr">inCluster</span>:
        <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>Untuk <code translate="no">dependencies</code>, ubah <code translate="no">pulsar.inCluster.chartVersion</code> menjadi <code translate="no">pulsar-v2</code>.</p></li>
<li><p>Lanjutkan dengan langkah-langkah pada <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Install Milvus Cluster dengan Milvus Operator</a> untuk mendeploy Milvus v2.5.x dengan Pulsar v2 menggunakan file CRD yang telah diedit.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">Untuk pengguna Helm</h3><p>Sebelum Anda menggunakan Milvus v2.5.x, Anda dapat menyiapkan file <code translate="no">values.yaml</code> atau menggunakan parameter inline untuk menentukan versi Pulsar. Untuk detail tentang cara menginstal Milvus menggunakan Helm, lihat <a href="/docs/id/install_cluster-helm.md">Menginstalasi Milvus Cluster dengan Helm</a>.</p>
<ul>
<li><p>Gunakan parameter sebaris untuk menentukan versi Pulsar sebagai v2.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Gunakan berkas <code translate="no">values.yaml</code> untuk menentukan versi Pulsar sebagai v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, terapkan Milvus v2.5.x dengan Pulsar v2 menggunakan berkas <code translate="no">values.yaml</code>.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
