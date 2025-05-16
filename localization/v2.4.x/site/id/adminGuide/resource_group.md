---
id: resource_group.md
related_key: Manage Resource Groups
summary: Pelajari cara mengelola grup sumber daya.
title: Mengelola Grup Sumber Daya
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">Mengelola Grup Sumber Daya<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus, Anda dapat menggunakan grup sumber daya untuk mengisolasi secara fisik node kueri tertentu dari yang lain. Panduan ini memandu Anda tentang cara membuat dan mengelola grup sumber daya khusus serta mentransfer node di antara mereka.</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">Apa yang dimaksud dengan grup sumber daya<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>Grup sumber daya dapat menampung beberapa atau semua node kueri dalam cluster Milvus. Anda dapat menentukan bagaimana Anda ingin mengalokasikan node kueri di antara kelompok sumber daya berdasarkan apa yang paling masuk akal bagi Anda. Sebagai contoh, dalam skenario multi-koleksi, Anda dapat mengalokasikan jumlah node kueri yang sesuai untuk setiap kelompok sumber daya dan memuat koleksi ke dalam kelompok sumber daya yang berbeda, sehingga operasi di dalam setiap koleksi secara fisik tidak bergantung pada koleksi lain.</p>
<p>Perhatikan bahwa sebuah instance Milvus mempertahankan sebuah grup sumber daya default untuk menampung semua node kueri pada saat start-up dan menamainya dengan <strong>__default_resource_group</strong>.</p>
<p>Mulai dari versi 2.4.1, Milvus menyediakan API grup sumber daya deklaratif, sementara API grup sumber daya yang lama sudah tidak digunakan lagi. API deklaratif yang baru memungkinkan pengguna untuk mencapai idempoten, untuk melakukan pengembangan sekunder di lingkungan cloud-native dengan lebih mudah.</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">Konsep kelompok sumber daya<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>Grup sumber daya dijelaskan oleh konfigurasi grup sumber daya:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;requests&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;limits&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;transfer_from&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg1&quot;</span> }],
    <span class="hljs-string">&quot;transfer_to&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg2&quot;</span> }]
}
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Atribut <strong>permintaan</strong> menentukan kondisi yang harus dipenuhi oleh grup sumber daya.</li>
<li>Atribut <strong>batas</strong> menentukan batas maksimum untuk grup sumber daya.</li>
<li>Atribut <strong>transfer_from</strong> dan <strong>transfer_to</strong> menjelaskan dari grup sumber daya mana grup sumber daya sebaiknya memperoleh sumber daya dan ke grup sumber daya mana grup sumber daya harus mentransfer sumber daya.</li>
</ul>
<p>Setelah konfigurasi kelompok sumber daya berubah, Milvus akan menyesuaikan sumber daya Query Node saat ini sebanyak mungkin sesuai dengan konfigurasi baru, memastikan bahwa semua kelompok sumber daya pada akhirnya memenuhi kondisi berikut:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>Kecuali dalam kasus-kasus berikut ini:</p>
<ul>
<li>Ketika jumlah QueryNode dalam cluster Milvus tidak mencukupi, misalnya, <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code>, akan selalu ada kelompok sumber daya tanpa QueryNode yang cukup.</li>
<li>Ketika jumlah QueryNode dalam cluster Milvus berlebihan, misalnya, <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code>, QueryNode yang berlebihan akan selalu ditempatkan di <strong>__default_resource_group</strong> terlebih dahulu.</li>
</ul>
<p>Tentu saja, jika jumlah QueryNode dalam klaster berubah, Milvus akan terus berusaha menyesuaikan untuk memenuhi kondisi akhir. Oleh karena itu, Anda dapat menerapkan perubahan konfigurasi grup sumber daya terlebih dahulu, lalu melakukan penskalaan QueryNode.</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">Gunakan api deklaratif untuk mengelola kelompok sumber daya<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Semua contoh kode pada halaman ini terdapat pada PyMilvus 2.4.15. Upgrade instalasi PyMilvus Anda sebelum menjalankannya.</p>
</div>
<ol>
<li><p>Membuat sebuah grup sumber daya.</p>
<p>Untuk membuat grup sumber daya, jalankan kode berikut setelah Anda terhubung ke sebuah instans Milvus. Cuplikan berikut ini mengasumsikan bahwa <code translate="no">default</code> adalah nama alias dari koneksi Milvus Anda.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">import</span> pymilvus

<span class="hljs-comment"># A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).</span>
name = <span class="hljs-string">&quot;rg&quot;</span>
node_num = <span class="hljs-number">0</span>

<span class="hljs-comment"># create a resource group that exactly hold no query node.</span>
<span class="hljs-keyword">try</span>:
    utility.create_resource_group(name, config=utility.ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
    ), using=<span class="hljs-string">&#x27;default&#x27;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in creating resource group <span class="hljs-subst">{name}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Failed to create the resource group.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Membuat daftar grup sumber daya.</p>
<p>Setelah Anda membuat grup sumber daya, Anda dapat melihatnya di daftar grup sumber daya.</p>
<p>Untuk melihat daftar grup sumber daya dalam instans Milvus, lakukan hal berikut:</p>
<pre><code translate="no" class="language-Python">rgs = utility.list_resource_groups(using=<span class="hljs-string">&#x27;default&#x27;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mendeskripsikan sebuah grup sumber daya.</p>
<p>Anda dapat meminta Milvus mendeskripsikan grup sumber daya yang menjadi perhatian sebagai berikut:</p>
<pre><code translate="no" class="language-Python">info = utility.describe_resource_group(name, using=<span class="hljs-string">&quot;default&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group description: <span class="hljs-subst">{info}</span>&quot;</span>)

<span class="hljs-comment"># Resource group description: </span>
<span class="hljs-comment">#        &lt;name:&quot;rg&quot;&gt;,           // string, rg name</span>
<span class="hljs-comment">#        &lt;capacity:1&gt;,            // int, num_node which has been transfer to this rg</span>
<span class="hljs-comment">#        &lt;num_available_node:0&gt;,  // int, available node_num, some node may shutdown</span>
<span class="hljs-comment">#        &lt;num_loaded_replica:{}&gt;, // map[string]int, from collection_name to loaded replica of each collecion in this rg</span>
<span class="hljs-comment">#        &lt;num_outgoing_node:{}&gt;,  // map[string]int, from collection_name to outgoging accessed node num by replica loaded in this rg </span>
<span class="hljs-comment">#        &lt;num_incoming_node:{}&gt;.  // map[string]int, from collection_name to incoming accessed node num by replica loaded in other rg</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mentransfer node di antara grup sumber daya.</p>
<p>Anda mungkin memperhatikan bahwa grup sumber daya yang dideskripsikan belum memiliki node kueri. Pindahkan beberapa node dari grup sumber daya default ke grup yang Anda buat sebagai berikut: Asumsikan saat ini ada 1 QueryNodes dalam <strong>__default_resource_group</strong> pada klaster, dan kita ingin mentransfer satu node ke dalam <strong>rg</strong> yang telah dibuat.<code translate="no">update_resource_groups</code> memastikan atomisitas untuk beberapa perubahan konfigurasi, sehingga tidak ada status peralihan yang akan terlihat oleh Milvus.</p>
<pre><code translate="no" class="language-Python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
expected_num_nodes_in_default = <span class="hljs-number">0</span>
expected_num_nodes_in_rg = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    utility.update_resource_groups({
        source: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
        ),
        target: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
        )
    }, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in move 1 node(s) from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving nodes.&quot;</span>)

<span class="hljs-comment"># After a while, succeeded in moving 1 node(s) from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Memuat koleksi dan partisi ke sebuah grup sumber daya.</p>
<p>Setelah ada node kueri dalam sebuah grup sumber daya, Anda dapat memuat koleksi ke grup sumber daya ini. Cuplikan berikut ini mengasumsikan bahwa koleksi bernama <code translate="no">demo</code> sudah ada.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(<span class="hljs-string">&#x27;demo&#x27;</span>)

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
collection.load(replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
collection.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>Selain itu, Anda juga dapat memuat partisi ke dalam grup sumber daya dan membuat replikanya terdistribusi di antara beberapa grup sumber daya. Berikut ini mengasumsikan bahwa koleksi bernama <code translate="no">Books</code> sudah ada dan memiliki partisi bernama <code translate="no">Novels</code>.</p>
<pre><code translate="no" class="language-Python">collection = Collection(<span class="hljs-string">&quot;Books&quot;</span>)

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
collection.load([<span class="hljs-string">&quot;Novels&quot;</span>], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)

<span class="hljs-comment"># Or, you can use the load method of a partition directly</span>
partition = Partition(collection, <span class="hljs-string">&quot;Novels&quot;</span>)
partition.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>Perhatikan bahwa <code translate="no">_resource_groups</code> adalah parameter opsional, dan jika tidak ditentukan, Milvus akan memuat replika ke node kueri dalam grup sumber daya default.</p>
<p>Agar Milus memuat setiap replika koleksi dalam kelompok sumber daya yang terpisah, pastikan jumlah kelompok sumber daya sama dengan jumlah replika.</p></li>
<li><p>Mentransfer replika di antara grup sumber daya.</p>
<p>Milvus menggunakan <a href="/docs/id/v2.4.x/replica.md">replika</a> untuk mencapai penyeimbangan beban di antara <a href="/docs/id/v2.4.x/glossary.md#Segment">segmen-segmen</a> yang didistribusikan di beberapa node kueri. Anda dapat memindahkan replika tertentu dari sebuah koleksi dari satu grup sumber daya ke grup sumber daya lainnya sebagai berikut:</p>
<pre><code translate="no" class="language-Python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
collection_name = <span class="hljs-string">&#x27;c&#x27;</span>
num_replicas = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    utility.transfer_replica(source, target, collection_name, num_replicas, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in moving <span class="hljs-subst">{num_node}</span> replica(s) of <span class="hljs-subst">{collection_name}</span> from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving replicas.&quot;</span>)

<span class="hljs-comment"># Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Menghapus grup sumber daya.</p>
<p>Anda dapat menghapus grup sumber daya yang tidak memiliki simpul kueri (<code translate="no">limits.node_num = 0</code>) kapan saja. Dalam panduan ini, grup sumber daya <code translate="no">rg</code> sekarang memiliki satu simpul kueri. Anda perlu mengubah konfigurasi <code translate="no">limits.node_num</code> grup sumber daya menjadi nol terlebih dahulu.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">try</span>:
    utility.update_resource_groups({
        <span class="hljs-string">&quot;rg&quot;</span>: utility.ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        ),
    }, using=<span class="hljs-string">&quot;default&quot;</span>)
    utility.drop_resource_group(<span class="hljs-string">&quot;rg&quot;</span>, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in dropping <span class="hljs-subst">{source}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Something went wrong while dropping <span class="hljs-subst">{source}</span>.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Untuk lebih jelasnya, silakan lihat <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">contoh yang relevan di pymilvus</a></p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">Praktik yang baik untuk mengelola penskalaan cluster<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat ini, Milvus tidak dapat melakukan penskalaan masuk dan keluar secara mandiri di lingkungan cloud-native. Namun, dengan menggunakan <strong>Declarative Resource Group API</strong> bersama dengan orkestrasi kontainer, Milvus dapat dengan mudah mencapai isolasi sumber daya dan manajemen untuk QueryNodes. Berikut ini adalah praktik yang baik untuk mengelola QueryNodes di lingkungan cloud:</p>
<ol>
<li><p>Secara default, Milvus membuat <strong>__default_resource_group</strong>. Grup sumber daya ini tidak dapat dihapus dan juga berfungsi sebagai grup sumber daya pemuatan default untuk semua koleksi dan QueryNode yang berlebihan selalu ditugaskan ke grup tersebut. Oleh karena itu, kita dapat membuat grup sumber daya yang tertunda untuk menampung sumber daya QueryNode yang tidak digunakan, sehingga sumber daya QueryNode tidak digunakan oleh <strong>__default_resource_group</strong>.</p>
<p>Selain itu, jika kita secara ketat menerapkan batasan <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code>, kita dapat secara tepat mengontrol penugasan QueryNode dalam cluster. Mari kita asumsikan saat ini hanya ada satu QueryNode di dalam cluster dan menginisialisasi cluster. Berikut ini adalah contoh pengaturannya:</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
<span class="hljs-keyword">from</span> pymilvus.client.types <span class="hljs-keyword">import</span> ResourceGroupConfig

_PENDING_NODES_RESOURCE_GROUP=<span class="hljs-string">&quot;__pending_nodes&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">init_cluster</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Init cluster with <span class="hljs-subst">{node_num}</span> nodes, all nodes will be put in default resource group&quot;</span>)
    <span class="hljs-comment"># create a pending resource group, which can used to hold the pending nodes that do not hold any data.</span>
    utility.create_resource_group(name=_PENDING_NODES_RESOURCE_GROUP, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>}, <span class="hljs-comment"># this resource group can hold 0 nodes, no data will be load on it.</span>
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">10000</span>}, <span class="hljs-comment"># this resource group can hold at most 10000 nodes </span>
    ))

    <span class="hljs-comment"># update default resource group, which can used to hold the nodes that all initial node in it.</span>
    utility.update_resource_groups({
        <span class="hljs-string">&quot;__default_resource_group&quot;</span>: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover missing node from pending resource group at high priority.</span>
            transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover redundant node to pending resource group at low priority.</span>
        )})
    utility.create_resource_group(name=<span class="hljs-string">&quot;rg1&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))
    utility.create_resource_group(name=<span class="hljs-string">&quot;rg2&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))

init_cluster(<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Dengan menggunakan contoh kode di atas, kita membuat grup sumber daya bernama <strong>__pending_nodes</strong> untuk menampung QueryNode tambahan. Kita juga membuat dua Resource Group khusus pengguna bernama <strong>rg1</strong> dan <strong>rg2</strong>. Selain itu, kami memastikan bahwa grup sumber daya lainnya memprioritaskan pemulihan QueryNode yang hilang atau berlebihan dari <strong>__pending_nodes</strong>.</p></li>
<li><p>Skala klaster</p>
<p>Anggaplah kita memiliki fungsi penskalaan berikut ini:</p>
<pre><code translate="no" class="language-Python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kita dapat menggunakan API untuk menskalakan kelompok sumber daya tertentu ke sejumlah QueryNode yang ditentukan tanpa memengaruhi kelompok sumber daya lainnya.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-comment"># scale rg1 into 3 nodes, rg2 into 1 nodes</span>
utility.update_resource_groups({
    <span class="hljs-string">&quot;rg1&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">3</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">3</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
    <span class="hljs-string">&quot;rg2&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">1</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">1</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
})
scale_to(<span class="hljs-number">5</span>)
<span class="hljs-comment"># rg1 has 3 nodes, rg2 has 1 node, __default_resource_group has 1 node.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Skala cluster masuk</p>
<p>Demikian pula, kita dapat membuat aturan penskalaan yang memprioritaskan pemilihan QueryNode dari kelompok sumber daya <strong>__pending_nodes</strong>. Informasi ini dapat diperoleh melalui API <code translate="no">describe_resource_group</code>. Mencapai tujuan penskalaan pada kelompok sumber daya tertentu.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-comment"># scale rg1 from 3 nodes into 2 nodes</span>
utility.update_resource_groups({
    <span class="hljs-string">&quot;rg1&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">2</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">2</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
})

<span class="hljs-comment"># rg1 has 2 nodes, rg2 has 1 node, __default_resource_group has 1 node, __pending_nodes has 1 node.</span>
scale_to(<span class="hljs-number">4</span>)
<span class="hljs-comment"># scale the node in __pending_nodes</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">Bagaimana kelompok sumber daya berinteraksi dengan beberapa replika<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>Replika dari satu koleksi dan kelompok sumber daya memiliki hubungan N-ke-N.</li>
<li>Ketika beberapa replika dari satu koleksi dimuat ke dalam satu kelompok sumber daya, QueryNode dari kelompok sumber daya tersebut didistribusikan secara merata di antara replika, memastikan bahwa perbedaan jumlah QueryNode yang dimiliki setiap replika tidak melebihi 1.</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>Untuk menerapkan instans Milvus multi-penyewa, baca yang berikut ini:</p>
<ul>
<li><a href="/docs/id/v2.4.x/rbac.md">Mengaktifkan RBAC</a></li>
<li><a href="/docs/id/v2.4.x/users_and_roles.md">Pengguna dan peran</a></li>
</ul>
