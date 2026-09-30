---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Pelajari tentang definisi pengguna, peran, objek, dan hak istimewa dalam
  kontrol akses berbasis peran (RBAC).
title: 'Pengguna, Hak Istimewa, dan Peran'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">Pengguna, Hak Istimewa, dan Peran<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memberikan gambaran umum tentang Role-Based Access Control (RBAC) di Milvus, yang merinci definisi dan hubungan antara pengguna, peran, objek, dan hak istimewa.</p>
<p>Gambar berikut mengilustrasikan hubungan antara objek, hak istimewa, peran, dan pengguna.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>pengguna_dan_peran</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">Konsep-konsep utama<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengelola kontrol akses ke sumber daya Milvus, penting untuk memahami komponen utama RBAC: tipe objek, nama objek, pengguna, peran, dan hak istimewa.</p>
<ul>
<li><p><strong>Jenis objek</strong>: kategori objek yang diberi hak istimewa. Jenis objek dapat berupa:</p>
<ul>
<li><code translate="no">Global</code>: Objek di seluruh sistem, yang memungkinkan pengguna untuk melakukan tindakan yang memengaruhi semua koleksi, pengguna, atau pengaturan di seluruh sistem.</li>
<li><code translate="no">Collection</code>: Objek khusus koleksi, memungkinkan pengguna untuk melakukan tindakan seperti membuat indeks, memuat data, menyisipkan atau menghapus data, dan meminta data dalam koleksi tertentu.</li>
<li><code translate="no">User</code>: Objek yang terkait dengan manajemen pengguna, memungkinkan pengguna untuk mengelola kredensial dan peran untuk pengguna basis data, seperti memperbarui kredensial pengguna atau melihat detail pengguna.</li>
</ul></li>
<li><p><strong>Nama objek</strong>: nama spesifik objek untuk mengontrol akses. Sebagai contoh:</p>
<ul>
<li>Jika jenis objek adalah <code translate="no">Global</code>, nama objek harus diatur ke karakter pengganti (<code translate="no">*</code>), yang menunjukkan semua objek dengan jenis yang ditentukan.</li>
<li>Jika tipe objek adalah <code translate="no">Collection</code>, nama objek adalah nama koleksi.</li>
<li>Jika tipe objek adalah <code translate="no">User</code>, nama objek adalah nama pengguna database.</li>
</ul></li>
<li><p><strong>Pengguna</strong>: seseorang atau aplikasi yang berinteraksi dengan Milvus, yang terdiri dari nama pengguna dan kata sandi yang sesuai.</p></li>
<li><p><strong>Privilege</strong>: mendefinisikan tindakan yang dapat dilakukan dan sumber daya yang dapat diakses. Hak istimewa tidak diberikan secara langsung kepada pengguna, tetapi diberikan kepada peran.</p></li>
<li><p><strong>Peran</strong>: mendefinisikan seperangkat hak istimewa yang dimiliki pengguna untuk objek tertentu. Setelah sebuah peran terikat pada pengguna, pengguna mewarisi semua hak istimewa yang diberikan pada peran tersebut.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">Contoh: Memberikan hak istimewa<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuplikan kode berikut ini menunjukkan cara memberikan hak istimewa <code translate="no">CreateIndex</code> ke peran pada koleksi tertentu:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">milvusClient.grant_privilege(
    role_name=<span class="hljs-string">&quot;CUSTOM_ROLE_NAME&quot;</span>,
    object_type=<span class="hljs-string">&quot;Collection&quot;</span>,  <span class="hljs-comment"># Valid value: Global, Collection or User.</span>
    privilege=<span class="hljs-string">&quot;CreateIndex&quot;</span>,   <span class="hljs-comment"># See the table below for valid privilege names and relevant API descriptions.</span>
    object_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>  <span class="hljs-comment"># The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GrantPrivilegeReq</span> <span class="hljs-variable">grantPrivilegeReq</span> <span class="hljs-operator">=</span> GrantPrivilegeReq.builder()
        .roleName(<span class="hljs-string">&quot;roleName&quot;</span>)
        .objectName(<span class="hljs-string">&quot;CollectionName&quot;</span>) <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
        .objectType(<span class="hljs-string">&quot;Collection&quot;</span>) <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
        .privilege(<span class="hljs-string">&quot;CreateIndex&quot;</span>) <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
        .build();
client.grantPrivilege(grantPrivilegeReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">milvusClient.<span class="hljs-title function_">grantPrivilege</span>({
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-attr">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   <span class="hljs-attr">objectName</span>: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   <span class="hljs-attr">privilegeName</span>: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>Untuk mendapatkan informasi lebih lanjut tentang API terkait hak istimewa, lihat <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> dan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>Untuk mendapatkan informasi lebih lanjut tentang API terkait hak istimewa, lihat <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> dan <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>Untuk mendapatkan informasi lebih lanjut tentang API terkait hak istimewa, lihat <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> dan <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">Pengguna dan peran default<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus membuat pengguna <code translate="no">root</code> secara default dengan kata sandi default <code translate="no">Milvus</code>. Pengguna <code translate="no">root</code> diberikan hak istimewa <code translate="no">admin</code>, yang berarti bahwa pengguna <code translate="no">root</code> ini dapat memiliki akses ke semua sumber daya dan melakukan semua tindakan.</p>
<p>Jika pengguna dikaitkan dengan peran <code translate="no">public</code>, mereka berhak atas hak istimewa berikut ini:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">Daftar jenis objek dan hak istimewa<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut mencantumkan nilai yang dapat Anda pilih saat <a href="/docs/id/rbac.md">mengaktifkan RBAC</a>.</p>
<table>
<thead>
<tr><th>Jenis objek</th><th>Nama hak istimewa</th><th>Deskripsi API yang relevan di sisi klien</th></tr>
</thead>
<tbody>
<tr><td>Koleksi</td><td>CreateIndex</td><td>BuatIndeks</td></tr>
<tr><td>Koleksi</td><td>DropIndex</td><td>DropIndex</td></tr>
<tr><td>Koleksi</td><td>IndexDetail</td><td>JelaskanIndeks/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Koleksi</td><td>Memuat</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>Koleksi</td><td>Dapatkan Kemajuan Pemuatan</td><td>Dapatkan Kemajuan Pemuatan</td></tr>
<tr><td>Koleksi</td><td>Dapatkan Status Pemuatan</td><td>GetLoadState</td></tr>
<tr><td>Koleksi</td><td>Rilis</td><td>ReleaseCollection</td></tr>
<tr><td>Koleksi</td><td>Menyisipkan</td><td>Sisipkan</td></tr>
<tr><td>Koleksi</td><td>Menghapus</td><td>Menghapus</td></tr>
<tr><td>Koleksi</td><td>Menambah</td><td>Upsert</td></tr>
<tr><td>Koleksi</td><td>Cari</td><td>Cari</td></tr>
<tr><td>Koleksi</td><td>Siram</td><td>Siram/GetFlushState</td></tr>
<tr><td>Koleksi</td><td>GetFlushState</td><td>GetFlushState</td></tr>
<tr><td>Koleksi</td><td>Query</td><td>Query</td></tr>
<tr><td>Koleksi</td><td>GetStatistics</td><td>GetCollectionStatistics</td></tr>
<tr><td>Koleksi</td><td>Pemadatan</td><td>Kompak</td></tr>
<tr><td>Koleksi</td><td>Impor</td><td>Sisipkan / Impor Massal</td></tr>
<tr><td>Koleksi</td><td>LoadBalance</td><td>Saldo Beban (LoadBalance)</td></tr>
<tr><td>Koleksi</td><td>BuatPartisi</td><td>BuatPartisi</td></tr>
<tr><td>Koleksi</td><td>JatuhkanPartisi</td><td>Jatuhkan Partisi</td></tr>
<tr><td>Koleksi</td><td>TampilkanPartisi</td><td>TampilkanPartisi</td></tr>
<tr><td>Koleksi</td><td>MemilikiPartisi</td><td>Memiliki Partisi</td></tr>
<tr><td>Global</td><td>Semua</td><td>Semua izin operasi API dalam tabel ini</td></tr>
<tr><td>Global</td><td>CreateCollection</td><td>BuatKoleksi</td></tr>
<tr><td>Global</td><td>DropCollection</td><td>DropCollection</td></tr>
<tr><td>Global</td><td>JelaskanKoleksi</td><td>JelaskanKoleksi</td></tr>
<tr><td>Global</td><td>TampilkanKoleksi</td><td>TampilkanKoleksi</td></tr>
<tr><td>Global</td><td>Ubah NamaKoleksi</td><td>Ganti NamaKoleksi</td></tr>
<tr><td>Global</td><td>SiramSemua</td><td>SiramSemua</td></tr>
<tr><td>Global</td><td>BuatKepemilikan</td><td>BuatPengguna BuatPeran</td></tr>
<tr><td>Global</td><td>Jatuhkan Kepemilikan</td><td>Menghapus Peran Jatuhkan Kredensial</td></tr>
<tr><td>Global</td><td>PilihKepemilikan</td><td>Pilih Peran/Pilih Hibah</td></tr>
<tr><td>Global</td><td>Kelola Kepemilikan</td><td>Mengoperasikan Peran Pengguna Mengoperasikan Hak Istimewa</td></tr>
<tr><td>Global</td><td>Membuat Grup Sumber Daya</td><td>Membuat Grup Sumber Daya</td></tr>
<tr><td>Global</td><td>DropResourceGroup</td><td>Jatuhkan Grup Sumber Daya</td></tr>
<tr><td>Global</td><td>JelaskanGrup Sumber Daya</td><td>Jelaskan Grup Sumber Daya</td></tr>
<tr><td>Global</td><td>DaftarKelompokSumberDaya</td><td>DaftarGrup Sumber Daya</td></tr>
<tr><td>Global</td><td>TransferNode</td><td>TransferNode</td></tr>
<tr><td>Global</td><td>TransferReplika</td><td>TransferReplika</td></tr>
<tr><td>Global</td><td>BuatDatabase</td><td>BuatDatabase</td></tr>
<tr><td>Global</td><td>JatuhkanDatabase</td><td>DropDatabase</td></tr>
<tr><td>Global</td><td>DaftarDatabase</td><td>DaftarDatabase</td></tr>
<tr><td>Global</td><td>BuatAlias</td><td>BuatAlias</td></tr>
<tr><td>Global</td><td>DropAlias</td><td>DropAlias</td></tr>
<tr><td>Global</td><td>MendeskripsikanAlias</td><td>JelaskanAlias</td></tr>
<tr><td>Global</td><td>DaftarAlias</td><td>DaftarAlias</td></tr>
<tr><td>Pengguna</td><td>PerbaruiPengguna</td><td>PerbaruiKredensial</td></tr>
<tr><td>Pengguna</td><td>PilihPengguna</td><td>PilihPengguna</td></tr>
</tbody>
</table>
<div class="alert note">
<li>Nama objek dan hak istimewa peka terhadap huruf besar-kecil.</li>
<li>Untuk memberikan semua hak istimewa pada suatu jenis objek, seperti Koleksi, Global, Pengguna, gunakan "*" untuk nama hak istimewa. </li>
<li>Nama hak istimewa "*" untuk objek Global tidak termasuk hak istimewa Semua, karena hak istimewa Semua mencakup semua izin, termasuk objek koleksi dan pengguna.</li>
</div>
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
<li>Pelajari cara <a href="/docs/id/rbac.md">mengaktifkan RBAC</a>.</li>
</ul>
