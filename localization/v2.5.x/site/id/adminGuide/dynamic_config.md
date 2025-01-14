---
id: dynamic_config.md
related_key: configure
summary: Pelajari tentang konfigurasi dinamis Milvus.
title: Mengkonfigurasi Milvus dengan Cepat
---
<h1 id="Configure-Milvus-on-the-Fly" class="common-anchor-header">Mengkonfigurasi Milvus dengan Cepat<button data-href="#Configure-Milvus-on-the-Fly" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus memungkinkan Anda untuk mengubah beberapa konfigurasinya dengan cepat.</p>
<h2 id="Before-you-start" class="common-anchor-header">Sebelum Anda memulai<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda perlu memastikan bahwa: - Anda telah</p>
<ul>
<li>Anda telah menginstal Birdwatcher. Untuk detailnya, lihat <a href="/docs/id/birdwatcher_install_guides.md">Menginstal Birdwatcher</a>,</li>
<li>Anda telah menginstal etcdctl. Untuk detailnya, lihat <a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">Berinteraksi dengan etcd</a>, atau</li>
<li>Anda telah menginstal klien etcd lain, seperti klien Python.</li>
</ul>
<div class="alert note">
<ul>
<li>Contoh dalam panduan ini mengubah nilai <code translate="no">proxy.minPasswordLength</code> menjadi <code translate="no">8</code>. Anda dapat mengganti kunci dengan kunci yang berlaku yang tercantum dalam <a href="/docs/id/dynamic_config.md#Applicable-configuration-items">item konfigurasi yang berlaku</a>.</li>
<li>Contoh dalam panduan ini mengasumsikan bahwa jalur root Milvus Anda adalah <code translate="no">by-dev</code>. Semua konfigurasi terdaftar di bawah jalur <code translate="no">by-dev/config</code>. Jalur root Milvus bervariasi tergantung pada cara Anda menginstalnya. Untuk instans yang terinstalasi menggunakan grafik Helm, jalur root default-nya adalah <code translate="no">by-dev</code>. Jika Anda tidak mengetahui jalur root, lihat Menghubungkan <a href="/docs/id/birdwatcher_usage_guides.md#Connect-to-etcd">ke etcd</a>.</li>
</ul>
</div>
<h2 id="Change-configurations" class="common-anchor-header">Mengubah konfigurasi<button data-href="#Change-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada Milvus, <code translate="no">proxy.minPasswordLength</code> diatur ke <code translate="no">6</code> secara default. Untuk mengubah nilai ini, Anda dapat melakukan hal berikut:</p>
<pre><code translate="no" class="language-shell">$ etcdctl put by-dev/config/proxy/minPasswordLength 8
<span class="hljs-comment"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian Anda dapat memeriksa konfigurasi sebagai berikut:</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">Mengembalikan konfigurasi<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus juga memungkinkan Anda untuk mengembalikan konfigurasi Anda jika nilai yang diubah tidak lagi berlaku.</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">del</span> by-dev/config/proxy/minPasswordLength 
<span class="hljs-comment"># or </span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian Anda dapat memeriksa konfigurasi sebagai berikut:</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-configurations" class="common-anchor-header">Melihat konfigurasi<button data-href="#View-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Selain melihat nilai dari item konfigurasi tertentu, Anda juga dapat mencantumkan semua item konfigurasi.</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> --prefix <span class="hljs-keyword">by</span>-dev/config
<span class="hljs-meta"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk melihat konfigurasi node tertentu:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          <span class="hljs-comment"># List all nodes with their server ID</span>
Milvus(by-dev) &gt; visit querycoord <span class="hljs-number">1</span>    <span class="hljs-comment"># Visit a node by server ID</span>
QueryCoord-<span class="hljs-number">1</span>(ip:port) &gt; configuration  <span class="hljs-comment"># List the configuration of the node</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-configuration-items" class="common-anchor-header">Item konfigurasi yang berlaku<button data-href="#Applicable-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat ini, Anda dapat mengubah item konfigurasi berikut dengan cepat.</p>
<table>
<thead>
<tr><th>Item konfigurasi</th><th>Nilai default</th></tr>
</thead>
<tbody>
<tr><td>pulsar.maxMessageSize</td><td>5242880</td></tr>
<tr><td>common.retentionDuration</td><td>86400</td></tr>
<tr><td>common.entityExpiration</td><td>-1</td></tr>
<tr><td>common.gracefulTime</td><td>5000</td></tr>
<tr><td>common.gracefulStopTimeout</td><td>30</td></tr>
<tr><td>kuotaDanBatas.ddl.enabled</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.indexRate.diaktifkan</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.flushRate.diaktifkan</td><td>SALAH</td></tr>
<tr><td>kuotaDanBatas.compactionRate.enabled</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.dml.diaktifkan</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.dql.diaktifkan</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.limits.collection.maxNum</td><td>64</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.forceDeny</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.ttProteksi.diaktifkan</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.ttProtection.maxTimeTickDelay</td><td>9223372036854775807</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.memProteksi.diaktifkan</td><td>BENAR</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.memProteksi.dataNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.memProteksi.dataNodeMemoryTingkatAirTinggi</td><td>0.95</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.memProteksi.kueriNodeMemoriTingkatAirRendah</td><td>0.85</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.memProteksi.queryNodeMemoryTingkatAirTinggi</td><td>0.95</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.perlindunganDisk.diaktifkan</td><td>BENAR</td></tr>
<tr><td>kuotaDanBatas.batasPenulisan.diskProtection.diskQuota</td><td>+INF</td></tr>
<tr><td>kuotaDanBatas.batasBaca.forceDeny</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.batasBaca.perlindunganAntrean.diaktifkan</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.batasPembacaan.perlindunganAntrean.nqInQueueThreshold</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</td><td>+INF</td></tr>
<tr><td>kuotaDanBatas.batasPembacaan.proteksiHasil.diaktifkan</td><td>FALSE</td></tr>
<tr><td>kuotaDanBatas.batasPembacaan.proteksiHasil.maxReadResultRate</td><td>+INF</td></tr>
<tr><td>kuotaDanBatas.batasBaca.kecepatanDingin</td><td>0.9</td></tr>
<tr><td>autoIndex.enable</td><td>FALSE</td></tr>
<tr><td>autoIndex.params.build</td><td>""</td></tr>
<tr><td>autoIndex.params.extra</td><td>""</td></tr>
<tr><td>autoIndex.params.search</td><td>""</td></tr>
<tr><td>proxy.maxNameLength</td><td>255</td></tr>
<tr><td>proxy.maxPanjangNamaPengguna</td><td>32</td></tr>
<tr><td>proxy.minPanjangKataPassword</td><td>6</td></tr>
<tr><td>proxy.maxPanjangKataPassword</td><td>256</td></tr>
<tr><td>proxy.maxFieldNum</td><td>64</td></tr>
<tr><td>proxy.maxShardNum</td><td>256</td></tr>
<tr><td>proxy.maxDimension</td><td>32768</td></tr>
<tr><td>proxy.maxUserNum</td><td>100</td></tr>
<tr><td>proxy.maxRoleNum</td><td>10</td></tr>
<tr><td>queryNode.enableDisk</td><td>TRUE</td></tr>
<tr><td>dataCoord.segment.diskSegmentMaxSize</td><td>2048</td></tr>
<tr><td>dataCoord.compaction.enableAutoCompaction</td><td>TRUE</td></tr>
</tbody>
</table>
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
<li>Pelajari lebih lanjut tentang <a href="/docs/id/system_configuration.md">Konfigurasi Sistem</a>.</li>
<li>Pelajari cara mengonfigurasi Milvus yang diinstal menggunakan <a href="/docs/id/configure_operator.md">Milvus Operator</a>, <a href="/docs/id/configure-helm.md">Helm chart</a>, dan <a href="/docs/id/configure-docker.md">Docker</a>.</li>
</ul>
