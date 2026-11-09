---
id: grant_privileges.md
title: Memberikan Hak Akses atau Kelompok Hak Akses kepada Peran
summary: >-
  Setelah sebuah peran dibuat, Anda dapat memberikan hak akses kepada peran
  tersebut. Panduan ini menjelaskan cara memberikan hak akses atau kelompok hak
  akses kepada sebuah peran.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">Memberikan Hak Akses atau Kelompok Hak Akses kepada Peran<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Setelah peran dibuat, Anda dapat memberikan hak akses kepada peran tersebut. Panduan ini menjelaskan cara memberikan hak akses atau kelompok hak akses kepada suatu peran.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">Memberikan hak akses atau grup hak akses kepada suatu peran<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 memperkenalkan versi baru API yang menyederhanakan proses pemberian hak akses. Anda tidak perlu lagi mencari jenis objek saat memberikan hak akses kepada suatu peran. Berikut adalah parameter dan penjelasannya.</p>
<ul>
<li><p><strong>role_name:</strong> Nama peran target yang akan diberikan hak akses atau grup hak akses.</p></li>
<li><p><strong>Resource</strong>: Sumber daya target dari suatu hak akses, yang dapat berupa instance tertentu, database, atau koleksi.</p></li>
</ul>
<p>Tabel berikut menjelaskan cara menentukan sumber daya dalam metode ` <code translate="no">client.grantV2()</code> `.</p>
<table>
   <tr>
     <th><p><strong>Level</strong></p></th>
     <th><p><strong>Sumber Daya</strong></p></th>
     <th><p><strong>Metode Pemberian</strong></p></th>
     <th><p><strong>Catatan</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Koleksi</strong></p></td>
     <td><p>Koleksi tertentu</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Masukkan nama koleksi tujuan Anda dan nama basis data tempat koleksi tujuan tersebut berada.</p></td>
   </tr>
   <tr>
     <td><p>Semua koleksi di bawah basis data tertentu</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Masukkan nama basis data yang Anda tuju dan karakter pengganti <code translate="no">*</code> sebagai nama koleksi.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Database</strong></p></td>
     <td><p>Database tertentu</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Masukkan nama basis data target Anda dan karakter pengganti <code translate="no">*</code> sebagai nama koleksi.</p></td>
   </tr>
   <tr>
     <td><p>Semua basis data di bawah instans saat ini</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Masukkan <code translate="no">*</code> sebagai nama basis data dan <code translate="no">*</code> sebagai nama koleksi.</p></td>
   </tr>
   <tr>
     <td><p><strong>Instan</strong></p></td>
     <td><p>Instan saat ini</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Masukkan <code translate="no">*</code> sebagai nama basis data dan <code translate="no">*</code> sebagai nama koleksi.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>Hak Akses</strong>: Hak akses spesifik atau <a href="/docs/id/privilege_group.md">grup hak akses</a> yang perlu Anda berikan kepada suatu peran. Saat ini, Milvus menyediakan 56 jenis hak akses yang dapat Anda berikan. Tabel di bawah ini mencantumkan hak akses di Milvus.</p>
<p><div class="alert note"></p>
<p>Kolom jenis pada tabel di bawah ini disediakan untuk memudahkan Anda mencari hak akses dengan cepat dan hanya digunakan untuk tujuan klasifikasi. Saat memberikan hak akses, Anda tidak perlu memahami jenis-jenisnya. Anda hanya perlu memasukkan hak akses yang sesuai.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>Jenis</strong></p></th>
<th><p><strong>Hak Akses</strong></p></th>
<th><p><strong>Deskripsi</strong></p></th>
<th><p><strong>Deskripsi API yang relevan di sisi klien</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>Hak Akses Database</p></td>
<td><p>ListDatabases</p></td>
<td><p>Lihat semua basis data di instance saat ini</p></td>
<td><p><a href="/docs/id/manage_databases.md">ListDatabases</a></p></td>
</tr>
<tr>
<td><p>DescribeDatabase</p></td>
<td><p>Melihat detail suatu basis data</p></td>
<td><p><a href="/docs/id/manage_databases.md">Jelaskan Basis Data</a></p></td>
</tr>
<tr>
<td><p>Buat Database</p></td>
<td><p>Buat basis data</p></td>
<td><p><a href="/docs/id/manage_databases.md">BuatDatabase</a></p></td>
</tr>
<tr>
<td><p>Hapus Database</p></td>
<td><p>Hapus basis data</p></td>
<td><p><a href="/docs/id/manage_databases.md">Hapus Database</a></p></td>
</tr>
<tr>
<td><p>Ubah Basis Data</p></td>
<td><p>Mengubah properti basis data</p></td>
<td><p><a href="/docs/id/manage_databases.md">AlterDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>Hak Akses Koleksi</p></td>
<td><p>GetFlushState</p></td>
<td><p>Periksa status operasi pembersihan koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>Periksa status pemuatan suatu koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>Periksa kemajuan pemuatan suatu koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>Tampilkan Koleksi</p></td>
<td><p>Lihat semua koleksi dengan hak akses koleksi</p></td>
<td><p><a href="/docs/id/view-collections.md">TampilkanKoleksi</a></p></td>
</tr>
<tr>
<td><p>ListAliases</p></td>
<td><p>Lihat semua alias dari sebuah koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">DaftarAlias</a></p></td>
</tr>
<tr>
<td><p>Jelaskan Koleksi</p></td>
<td><p>Lihat detail koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">JelaskanKoleksi</a></p></td>
</tr>
<tr>
<td><p>Jelaskan Alias</p></td>
<td><p>Lihat detail alias</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">JelaskanAlias</a></p></td>
</tr>
<tr>
<td><p>GetStatistics</p></td>
<td><p>Mendapatkan statistik suatu koleksi (misalnya, jumlah entitas dalam suatu koleksi)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p></td>
</tr>
<tr>
<td><p>BuatKoleksi</p></td>
<td><p>Buat Koleksi</p></td>
<td><p><a href="/docs/id/create-collection.md">BuatKoleksi</a></p></td>
</tr>
<tr>
<td><p>HapusKoleksi</p></td>
<td><p>Hapus koleksi</p></td>
<td><p><a href="/docs/id/drop-collection.md">Hapus Koleksi</a></p></td>
</tr>
<tr>
<td><p>Muat</p></td>
<td><p>Muat koleksi</p></td>
<td><p><a href="/docs/id/load-and-release.md">M</a><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">uat</a> Koleksi/Dapatkan Kemajuan Pemuatan/Dapatkan Status Pemuatan</p></td>
</tr>
<tr>
<td><p>Lepaskan</p></td>
<td><p>Lepaskan koleksi</p></td>
<td><p><a href="/docs/id/load-and-release.md">LepaskanKoleksi</a></p></td>
</tr>
<tr>
<td><p>Flush</p></td>
<td><p>Menyimpan semua entitas dalam sebuah koleksi ke segmen yang telah disegel. Setiap entitas yang dimasukkan setelah operasi flush akan disimpan di segmen baru.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Flush/GetFlushState</a></p></td>
</tr>
<tr>
<td><p>Pemadatan</p></td>
<td><p>Memicu kompaksi secara manual</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Kompaksi</a></p></td>
</tr>
<tr>
<td><p>Ganti Nama Koleksi</p></td>
<td><p>Ganti nama koleksi</p></td>
<td><p><a href="/docs/id/modify-collection.md">GantiNamaKoleksi</a></p></td>
</tr>
<tr>
<td><p>BuatAlias</p></td>
<td><p>Buat alias untuk koleksi</p></td>
<td><p><a href="/docs/id/manage-aliases.md">BuatAlias</a></p></td>
</tr>
<tr>
<td><p>HapusAlias</p></td>
<td><p>Hapus alias koleksi</p></td>
<td><p><a href="/docs/id/manage-aliases.md">HapusAlias</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>Kosongkan semua koleksi dalam sebuah basis data</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>Hak Akses Partisi</p></td>
<td><p>HasPartition</p></td>
<td><p>Periksa apakah suatu partisi ada</p></td>
<td><p><a href="/docs/id/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>Tampilkan Partisi</p></td>
<td><p>Lihat semua partisi dalam sebuah koleksi</p></td>
<td><p><a href="/docs/id/manage-partitions.md">TampilkanPartisi</a></p></td>
</tr>
<tr>
<td><p>Buat Partisi</p></td>
<td><p>Buat partisi</p></td>
<td><p><a href="/docs/id/manage-partitions.md">Buat Partisi</a></p></td>
</tr>
<tr>
<td><p>Hapus Partisi</p></td>
<td><p>Hapus partisi</p></td>
<td><p><a href="/docs/id/manage-partitions.md">Hapus Partisi</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>Hak Akses Indeks</p></td>
<td><p>Detail Indeks</p></td>
<td><p>Lihat detail indeks</p></td>
<td><p><a href="/docs/id/index-vector-fields.md">JelaskanIndeks/DapatkanStatusIndeks/DapatkanKemajuanPembuatanIndeks</a></p></td>
</tr>
<tr>
<td><p>BuatIndeks</p></td>
<td><p>Buat indeks</p></td>
<td><p><a href="/docs/id/index-vector-fields.md">BuatIndeks</a></p></td>
</tr>
<tr>
<td><p>HapusIndeks</p></td>
<td><p>Hapus indeks</p></td>
<td><p><a href="/docs/id/index-vector-fields.md">HapusIndeks</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Hak Akses Manajemen Sumber Daya</p></td>
<td><p>Menyeimbangkan Beban</p></td>
<td><p>Mencapai keseimbangan beban</p></td>
<td><p><a href="/docs/id/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>BuatGrupSumberDaya</p></td>
<td><p>Buat grup sumber daya</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">BuatGrupSumberDaya</a></p></td>
</tr>
<tr>
<td><p>Hapus Grup Sumber Daya</p></td>
<td><p>Hapus grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">HapusGrupSumberDaya</a></p></td>
</tr>
<tr>
<td><p>Perbarui Kelompok Sumber Daya</p></td>
<td><p>Perbarui grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">Perbarui Kelompok Sumber Daya</a></p></td>
</tr>
<tr>
<td><p>Jelaskan Grup Sumber Daya</p></td>
<td><p>Lihat detail grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">Jelaskan Kelompok Sumber Daya</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>Lihat semua grup sumber daya pada instans saat ini</p></td>
<td><p><a href="/docs/id/resource_group.md">DaftarGrupSumberDaya</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>Transfer node antar grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>TransferReplica</p></td>
<td><p>Memindahkan replika antar kelompok sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">TransferReplica</a></p></td>
</tr>
<tr>
<td><p>Cadangkan RBAC</p></td>
<td><p>Buat cadangan untuk semua operasi terkait RBAC di instans saat ini</p></td>
<td><p>Cadangan RBAC</p></td>
</tr>
<tr>
<td><p>RestoreRBAC</p></td>
<td><p>Memulihkan cadangan dari semua operasi yang terkait dengan RBAC di instans saat ini</p></td>
<td><p>PemulihanRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>Hak Akses Entitas</p></td>
<td><p>Kueri</p></td>
<td><p>Melakukan kueri</p></td>
<td><p><a href="/docs/id/get-and-scalar-query.md">Kueri</a></p></td>
</tr>
<tr>
<td><p>Cari</p></td>
<td><p>Melakukan pencarian</p></td>
<td><p><a href="/docs/id/single-vector-search.md">Pencarian</a></p></td>
</tr>
<tr>
<td><p>Sisipkan</p></td>
<td><p>Sisipkan entitas</p></td>
<td><p><a href="/docs/id/insert-update-delete.md">Sisipkan</a></p></td>
</tr>
<tr>
<td><p>Hapus</p></td>
<td><p>Hapus entitas</p></td>
<td><p><a href="/docs/id/delete-entities.md">Hapus</a></p></td>
</tr>
<tr>
<td><p>Upsert</p></td>
<td><p>Upsert entitas</p></td>
<td><p><a href="/docs/id/upsert-entities.md">Upsert</a></p></td>
</tr>
<tr>
<td><p>Impor</p></td>
<td><p>Penyisipan massal atau impor entitas</p></td>
<td><p><a href="/docs/id/import-data.md">Penyisipan Massal/Impor</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Hak Akses RBAC</p></td>
<td><p>Buat Kepemilikan</p></td>
<td><p>Buat pengguna atau peran</p></td>
<td><p><a href="/docs/id/users_and_roles.md">CreateUser/CreateRole</a></p></td>
</tr>
<tr>
<td><p>UpdateUser</p></td>
<td><p>Perbarui kata sandi pengguna</p></td>
<td><p><a href="/docs/id/users_and_roles.md">Perbarui Kredensial</a></p></td>
</tr>
<tr>
<td><p>Hapus Kepemilikan</p></td>
<td><p>Hapus kata sandi pengguna atau peran</p></td>
<td><p><a href="/docs/id/drop_users_roles.md">Hapus Kredensial/Hapus Peran</a></p></td>
</tr>
<tr>
<td><p>Pilih Kepemilikan</p></td>
<td><p>Lihat semua pengguna yang diberi peran tertentu</p></td>
<td><p><a href="/docs/id/grant_roles.md">Pilih Peran/Pilih Pemberian</a></p></td>
</tr>
<tr>
<td><p>Kelola Kepemilikan</p></td>
<td><p>Kelola pengguna atau peran, atau berikan peran kepada pengguna</p></td>
<td><p><a href="/docs/id/privilege_group.md">OperasikanPeranPengguna/OperasikanHak Akses/OperasikanHak Akses V2</a></p></td>
</tr>
<tr>
<td><p>Pilih Pengguna</p></td>
<td><p>Lihat semua peran yang diberikan kepada pengguna</p></td>
<td><p><a href="/docs/id/grant_roles.md">Pilih Pengguna</a></p></td>
</tr>
<tr>
<td><p>BuatGrupHakAkses</p></td>
<td><p>Buat grup hak akses</p></td>
<td><p><a href="/docs/id/privilege_group.md">BuatGrupHakAkses</a></p></td>
</tr>
<tr>
<td><p>HapusGrupHakAkses</p></td>
<td><p>Hapus grup hak istimewa</p></td>
<td><p><a href="/docs/id/privilege_group.md">HapusGrupHakAkses</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>Lihat semua grup hak istimewa di instance saat ini</p></td>
<td><p><a href="/docs/id/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>Mengelola Grup Hak Akses</p></td>
<td><p>Menambahkan atau menghapus hak istimewa dari suatu grup hak istimewa</p></td>
<td><p><a href="/docs/id/privilege_group.md">MengelolaKelompokHakAkses</a></p></td>
</tr>
</table></p></li>
</ul>
<p>Contoh berikut menunjukkan cara memberikan hak akses ` <code translate="no">PrivilegeSearch</code> ` pada ` <code translate="no">collection_01</code> ` di bawah database ` <code translate="no">default</code> `, serta grup hak akses bernama ` <code translate="no">privilege_group_1</code> ` kepada peran ` <code translate="no">role_a</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.GrantPrivilegeReqV2

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;Search&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});
    
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;privilege_group_1&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;privilege_group_1&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">Menjelaskan peran<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut menunjukkan cara melihat hak akses yang diberikan kepada peran <code translate="no">role_a</code> menggunakan metode <code translate="no">describe_role</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.describe_role(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeRoleResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeRoleReq

<span class="hljs-type">DescribeRoleReq</span> <span class="hljs-variable">describeRoleReq</span> <span class="hljs-operator">=</span> DescribeRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
<span class="hljs-type">DescribeRoleResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.describeRole(describeRoleReq);
List&lt;DescribeRoleResp.GrantInfo&gt; infos = resp.getGrantInfos();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

role, err := client.DescribeRole(ctx, milvusclient.NewDescribeRoleOption(<span class="hljs-string">&quot;role_a&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeRole</span>({<span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Berikut adalah contoh hasilnya.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
     <span class="hljs-attr">&quot;role&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;role_a&quot;</span><span class="hljs-punctuation">,</span>
     <span class="hljs-attr">&quot;privileges&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
         <span class="hljs-punctuation">{</span>
             <span class="hljs-attr">&quot;collection_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;collection_01&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;db_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;default&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;role_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;role_a&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;privilege&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Search&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;grantor_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;root&quot;</span>
         <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Mencabut hak akses atau grup hak akses dari suatu peran<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut menunjukkan cara mencabut hak akses <code translate="no">PrivilegeSearch</code> pada <code translate="no">collection_01</code> di bawah database <code translate="no">default</code> serta grup hak akses <code translate="no">privilege_group_1</code> yang telah diberikan kepada peran <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.RevokePrivilegeReqV2

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
        WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;ClusterReadOnly&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
