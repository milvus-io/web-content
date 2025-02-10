---
id: grant_privileges.md
related_key: enable RBAC
summary: >-
  Setelah peran dibuat, Anda dapat memberikan hak istimewa pada peran tersebut.
  Panduan ini memperkenalkan cara memberikan hak istimewa atau grup hak istimewa
  ke peran.
title: Memberikan Hak Istimewa atau Grup Hak Istimewa ke Peran
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles​" class="common-anchor-header">Memberikan Hak Istimewa atau Grup Hak Istimewa ke Peran<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles​" class="anchor-icon" translate="no">
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
    </button></h1><p>Setelah peran dibuat, Anda dapat memberikan hak istimewa pada peran tersebut. Panduan ini memperkenalkan cara memberikan hak istimewa atau grup hak istimewa ke peran.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role​" class="common-anchor-header">Memberikan hak istimewa atau grup hak istimewa ke peran<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 memperkenalkan versi baru API yang menyederhanakan operasi pemberian hak istimewa. Anda tidak perlu lagi mencari tipe objek ketika memberikan hak istimewa kepada sebuah role. Berikut ini adalah parameter dan penjelasan terkait.</p>
<ul>
<li><p><strong>role_name:</strong> Nama peran target yang perlu diberikan hak istimewa atau grup hak istimewa.</p></li>
<li><p><strong>Resource</strong>: Sumber daya target hak istimewa, yang dapat berupa instance, database, atau koleksi tertentu. Tabel berikut ini menjelaskan cara menentukan sumber daya dalam metode <code translate="no">client.grantV2()</code>.</p></li>
</ul>
<table data-block-token="JEEodjgvGobTYaxIpelculQCnAd"><thead><tr><th data-block-token="A8x3dXMhzoCf5ZxZyUscfy4GnWd" colspan="1" rowspan="1"><p data-block-token="SDgKdAzXFoodDQxru5WcGjBTnof"><strong>Tingkat</strong></p>
</th><th data-block-token="DOINdNjYroiDUMxdNn3cPC2cn7e" colspan="1" rowspan="1"><p data-block-token="MDSZdFSCdoi3w8x1Dglc2YUdnse"><strong>Sumber Daya</strong></p>
</th><th data-block-token="O6ZZdSVrOoBMZ1xMnWccUglpncf" colspan="1" rowspan="1"><p data-block-token="LOJMd38TkoEUenxnXvUcyuqsnof"><strong>Metode Pemberian</strong></p>
</th><th data-block-token="ACnjduxuRoz4oKxBGy9cnwyrnW7" colspan="1" rowspan="1"><p data-block-token="JJWcdxsQ4obIDQxiZhCc4r8Knhd"><strong>Catatan</strong></p>
</th></tr></thead><tbody><tr><td data-block-token="WrgHdNmJworvbjxDC0Ac8Luynkd" colspan="1" rowspan="2"><p data-block-token="IqewdrEkZoZCuqxe9j1coReKnVf"><strong>Koleksi</strong></p>
<p data-block-token="Xt2LdgXN7od47Ox9jGtctHwrn0d"></p>
</td><td data-block-token="VaxXdIFlIoQq0qxeIRccp94Rn1b" colspan="1" rowspan="1"><p data-block-token="BbHJdvTaJoZy8uxTIGXcu3VOnrc">Koleksi tertentu</p>
<p data-block-token="BdMadRB6FofK5PxZMYFcGfjunWd"></p>
</td><td data-block-token="BuzqdmVk4oAHq8xqoBRcOxClnbe" colspan="1" rowspan="1"><p data-block-token="RciEdsjwdoqsCoxNDBPcahqfndf">client.grant_privilege_v2(nama_peran = "roleA", hak_keahlian = "CollectionAdmin", nama_koleksi = "col1", nama_db = "db1")</p>
</td><td data-block-token="R3Pwdw9rboe6uYx6WJQcOjjmn3e" colspan="1" rowspan="1"><p data-block-token="Hv2UdaCOKoWmR2xtyphcT70mn0g">Masukkan nama koleksi target Anda dan nama basis data tempat koleksi target berada.</p>
<p data-block-token="BbxEd3PQWooh4IxNRFJcNnvYnDd"></p>
</td></tr><tr><td data-block-token="NDNgdI3YmooSyTxvnghcdfbEnZe" colspan="1" rowspan="1"><p data-block-token="ChNZdDKlPoFXCKxo0eZcNMuVnUb">Semua koleksi di bawah basis data tertentu</p>
</td><td data-block-token="K7aBd4V2joN6kwxgvJfcUwTxnQh" colspan="1" rowspan="1"><p data-block-token="EEr5d9ITqohPLGxwXGEcRnBtnZc">client.grant_privilege_v2(nama_peran = "peranA", hak_keuntungan = "CollectionAdmin", nama_koleksi = "*", nama_db = "db1")</p>
</td><td data-block-token="YFtEdd26cosytHxx3u7cMV17nsi" colspan="1" rowspan="1"><p data-block-token="QH8idsEf5otsWsxHu5NckM7JnOc">Masukkan nama basis data target Anda dan karakter pengganti <code translate="no">`*`</code> sebagai nama koleksi.</p>
</td></tr><tr><td data-block-token="RZZHdgXlboGN2axxBwpceLn6nff" colspan="1" rowspan="1"><p data-block-token="UYS5ddiUYoPr3wx415wcFbd8n2c"><strong>Basis data ** ** Basis data**</strong></p>
</td><td data-block-token="S5Q3dhrk3onli5xyPnCcoGlPnof" colspan="1" rowspan="1"><p data-block-token="QM0tdstT3oG12SxglUHcr6XUnEb">Basis data tertentu</p>
</td><td data-block-token="RtgDdRqEgoi4xOxp2w3cgkNcnzf" colspan="1" rowspan="1"><p data-block-token="Nq7TdnfHGottBHxoRVTct23unMf">client.grant_privilege_v2(nama_peran = "peranA", hak = "DatabaseAdmin", nama_koleksi = "*", nama_basis = "db1")</p>
</td><td data-block-token="AWvzduv5Lov5qJx7WYhciIESnfh" colspan="1" rowspan="1"><p data-block-token="AREJdOugloKZKxxZBHmcRQDWnJc">Masukkan nama basis data target Anda dan karakter pengganti <code translate="no">`*`</code> sebagai nama koleksi.</p>
</td></tr><tr><td data-block-token="JDIKdIWLToT51Exfa6KcDAX5nSc" colspan="1" rowspan="1"><p data-block-token="LwujdLjA4oELFNxQ0vocRqGZn8c"></p>
</td><td data-block-token="VCeyd4LnaocEA3xFzFfcmBFQnVe" colspan="1" rowspan="1"><p data-block-token="Zpypdw1yNoJ7VPxnML8cCobCnUe">Semua basis data di bawah instans saat ini</p>
</td><td data-block-token="XDNudVmito8zIaxYhiUc65UfntO" colspan="1" rowspan="1"><p data-block-token="QiPudWimto5bO3xya5ScRjrgnQb">client.grant_privilege_v2(nama_peran = "peranA", hak = "DatabaseAdmin", nama_koleksi = "*", nama_basis = "*")</p>
</td><td data-block-token="HK9Jd6egJoGjAzxEUXTcd52Wn01" colspan="1" rowspan="1"><p data-block-token="OqqOd4CG3oVcR8xHgdxcqbCznJb">Masukkan <code translate="no">`*`</code> sebagai nama basis data dan <code translate="no">`*`</code> sebagai nama koleksi.</p>
</td></tr><tr><td data-block-token="Owz9dC4pkocTkixLAMdcyBiqnYe" colspan="1" rowspan="1"><p data-block-token="Wwyxdfj9Vo8aHbxcVgycyT10nof"><strong>Instance ** Instance**</strong></p>
</td><td data-block-token="FPe1dyBVMoVnMexfHgycH0NSnrh" colspan="1" rowspan="1"><p data-block-token="Zfqtdh8Xqoyt8DxWpa3cD26InLh">Instance saat ini</p>
</td><td data-block-token="B4mZdL4O4oB8ADxUPsZcmR1enng" colspan="1" rowspan="1"><p data-block-token="CqrVd0CvQoPFIrxE2ePcp5Ren0d">client.grant_privilege_v2(nama_peran = "peranA", hak = "ClusterAdmin", nama_koleksi = "*", nama_basis = "*")</p>
</td><td data-block-token="V8ruddYLCo070nxAGFpcRPP1n5c" colspan="1" rowspan="1"><p data-block-token="IskBdd5NWoN6pkxl3bpcwwkSnh0">Masukkan <code translate="no">`*`</code> sebagai nama basis data dan <code translate="no">`*`</code> sebagai nama koleksi.</p>
</td></tr></tbody></table>
<ul>
<li><p><strong>Hak istimewa</strong>: Privilege atau <a href="/docs/id/privilege_group.md">kelompok</a> privilese tertentu yang perlu Anda berikan kepada sebuah role. Saat ini, Milvus menyediakan 56 jenis privilese yang dapat anda berikan. Tabel di bawah ini mencantumkan daftar hak istimewa di Milvus.</p>
<p><div class="alert note"></p>
<p>Kolom jenis pada tabel di bawah ini digunakan untuk memudahkan anda mencari hak istimewa dengan cepat dan hanya digunakan untuk tujuan klasifikasi. Ketika memberikan hak istimewa, anda tidak perlu memahami jenisnya. Anda hanya perlu memasukkan hak istimewa yang sesuai.</p>
<p></div></p></li>
</ul>
<table data-block-token="YtvhdW05Ko0c7oxFrEKcDQjBnqh"><thead><tr><th data-block-token="HmLLdKFIJoSYXWxA3P4chgwknZf" colspan="1" rowspan="1"><p data-block-token="FW6fd5H3no6z9IxdPvIcNNcen6g"><strong>Jenis </strong></p>
</th><th data-block-token="YaSmduL7yoJO1PxQkevc5axJnyb" colspan="1" rowspan="1"><p data-block-token="GWVPdRVZToJJhtx21jFcl2lWn6e"><strong>Hak istimewa</strong></p>
</th><th data-block-token="DAhadKMjNoQ6snxllIDcQwotnSf" colspan="1" rowspan="1"><p data-block-token="Mo8vd0JOPoUjJPxrIA1cypQknwd"><strong>Deskripsi</strong></p>
</th><th data-block-token="PwMedujdVoKROCx8vdKcSbrFnHh" colspan="1" rowspan="1"><p data-block-token="BgkBd6fG9oiErkxzSztcbHvfnfe"><strong>Deskripsi API yang relevan di sisi klien</strong></p>
</th></tr></thead><tbody><tr><td data-block-token="Ld7GdPgBYoDkpExDq4Bcb4wPnyd" colspan="1" rowspan="5"><p data-block-token="RL7ndh11Io4z2SxZWqZcJ0junid">Hak Istimewa Basis Data</p>
</td><td data-block-token="ImEKdP5fbonDCzxR8dqcWF5Dn0b" colspan="1" rowspan="1"><p data-block-token="JclYd7ldCoFHayxOP3TcoULpnVc">DaftarDatabase</p>
</td><td data-block-token="Gan5dAwbGoXfPwx92M2ckV08nKd" colspan="1" rowspan="1"><p data-block-token="SVLIdwfdfoeK4qxM8yucW3ianYc">Melihat semua database dalam instance saat ini</p>
</td><td data-block-token="OoX4dIbqCogWJYx7zEFcf8ycnrc" colspan="1" rowspan="1"><p data-block-token="IKNxdG111oEpktxs0NAcyXCSnvv"><a href="https://milvus.io/docs/manage_databases.md">DaftarDatabase</a></p>
</td></tr><tr><td data-block-token="OaOUdVom4o56xLxkTllcR6FUnUg" colspan="1" rowspan="1"><p data-block-token="DjpQdXo7OoJWrhx3qifcjk4Xndh">JelaskanDatabase</p>
</td><td data-block-token="WgjJdZMBXo5RERxvOJAcbLFcnRe" colspan="1" rowspan="1"><p data-block-token="BFK5d1JwPoiLQ7x23YRcF4fOnDM">Melihat detail database</p>
</td><td data-block-token="EDRvd6QORoPGkSxaCQncwmaUnLf" colspan="1" rowspan="1"><p data-block-token="YriadNiotooOMMxGqVBc5t8Nnvc"><a href="https://milvus.io/docs/manage_databases.md">JelaskanDatabase</a></p>
</td></tr><tr><td data-block-token="D1lVdbhJkoE7zNxAoGfcXCBwnXb" colspan="1" rowspan="1"><p data-block-token="ZUEldYWBgoMPmFx93WKcS0WLntb">CreateDatabase</p>
</td><td data-block-token="S6bxdDFO2orN9yxwaqfcoTvlnyh" colspan="1" rowspan="1"><p data-block-token="LofsdihfWoBb3XxNUlzcd6Fbnje">Membuat basis data</p>
</td><td data-block-token="NbCidCTtxoEm35xqJALcM4CPn7e" colspan="1" rowspan="1"><p data-block-token="VRY8dIdVFoGMt7xHOnecOBN6n1d"><a href="https://milvus.io/docs/manage_databases.md">BuatDatabase</a></p>
</td></tr><tr><td data-block-token="QKiUdVcB5orOo9x1268c5Q0snBb" colspan="1" rowspan="1"><p data-block-token="ZJu2dtQW0oPMZ8xRNmFcpsN2nSf">JatuhkanDatabase</p>
</td><td data-block-token="K7vldPFrFoVrlpxmxMxc9TXNnUc" colspan="1" rowspan="1"><p data-block-token="UgP7dD1zzouHlbxrDMpcdv5Un9l">Menjatuhkan basis data</p>
</td><td data-block-token="AKPLdjTH4oDIoex6hyqcXyiRnwc" colspan="1" rowspan="1"><p data-block-token="Q9sTdiVWEoobGdxzfq7cYkWcnMb"><a href="https://milvus.io/docs/manage_databases.md">Jatuhkan basis data</a></p>
</td></tr><tr><td data-block-token="GGwKdGkk8oDOMvxLNNMcRd0gnXH" colspan="1" rowspan="1"><p data-block-token="G5D1dZNf2oIpu4xUj4jcf947n0e">UbahDatabase</p>
</td><td data-block-token="M8HvdGPMxoVJxPxxcCocxQn5nAf" colspan="1" rowspan="1"><p data-block-token="QiCDdd3yBoT7kgx8Z5Kcz5HOnab">Memodifikasi properti database</p>
</td><td data-block-token="EHFEdrUq3otQyrxoTCZctEcfn9i" colspan="1" rowspan="1"><p data-block-token="FQnadyOONo45DgxeGeDcesiFnlf"><a href="https://milvus.io/docs/manage_databases.md">AlterDatabase</a></p>
</td></tr><tr><td data-block-token="MtiFd4S5SozLbsxSjanc6Nirnpf" colspan="1" rowspan="18"><p data-block-token="NlSMdn0GPoNDXcxUVSMcNkuQnw8">Hak Istimewa Koleksi</p>
<p data-block-token="QeaCdWA6uoQgv4xKW94csg8pnJg"></p>
</td><td data-block-token="XAE6d3uW4o41EPxOYVZcRjLFnKe" colspan="1" rowspan="1"><p data-block-token="TAgvdzNano8vDsxc4qkcBoddnGf">GetFlushState</p>
</td><td data-block-token="GV4kdFWqqoq8aqxjlE8cuFVJnmh" colspan="1" rowspan="1"><p data-block-token="RchRdz8Eeo2kouxGQqlc4UphnRc">Memeriksa status operasi flush koleksi</p>
</td><td data-block-token="P9yndvLGuoLdAGx5RZwcesXDnGX" colspan="1" rowspan="1"><p data-block-token="RfsydFC6poaDKfxkvEycftNanZf"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p>
</td></tr><tr><td data-block-token="PAZBdrHB7ooHc5xpF4GcvzWRn6J" colspan="1" rowspan="1"><p data-block-token="AmSndvrvPoIEHzxFHh9c2yfZnMc">GetLoadState</p>
</td><td data-block-token="He9Ed0SYYoW7hxxWFxZc4r73n3c" colspan="1" rowspan="1"><p data-block-token="NWnud2NA0ouZ2DxUD2GcIAMen4c">Memeriksa status pemuatan koleksi</p>
</td><td data-block-token="X4fCdfHPLoUV1QxdYMucxqZtnlg" colspan="1" rowspan="1"><p data-block-token="IRAwdcMk2or2b8xQnIdcSvpdnAe"><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p>
</td></tr><tr><td data-block-token="UgqOdWev3oObkpx90fvcBV6knGe" colspan="1" rowspan="1"><p data-block-token="C1pEdkIVPovdCzxKcmXcV4KBnze">GetLoadingProgress</p>
</td><td data-block-token="P8OsdBTAwoxhYWx8xy7cqnnInWf" colspan="1" rowspan="1"><p data-block-token="No52dFNivoE0BHxGV08cAbj5nqg">Memeriksa kemajuan pemuatan koleksi</p>
</td><td data-block-token="A7Aqd4U4Hog6UxxRr7Mcp3yHnHb" colspan="1" rowspan="1"><p data-block-token="AHo1dxWkBodIOYxaGmBcfMosnab"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p>
</td></tr><tr><td data-block-token="Rvo5dWaJAoHOPoxjWbectFbEncb" colspan="1" rowspan="1"><p data-block-token="VtpodjpcroREwnxl7ugcEGBhnkg">TampilkanKoleksi</p>
</td><td data-block-token="B4i0dq0aao3xXUxLewacuRmlnjf" colspan="1" rowspan="1"><p data-block-token="AJJDdxQhloImZJxnqLXcbBjjnqc">Melihat semua koleksi dengan hak istimewa koleksi</p>
</td><td data-block-token="NS79d4sBCoUfvBxD52wcqMBanZf" colspan="1" rowspan="1"><p data-block-token="UWWbdT33CokXY4xrfMecJZjGnye"><a href="https://milvus.io/docs/view-collections.md">TampilkanKoleksi</a></p>
</td></tr><tr><td data-block-token="ZxDNdhoaToR7LXxHCfucuuA3nse" colspan="1" rowspan="1"><p data-block-token="Uh7fdfsafoIAayxj86acN995nGh">DaftarAlias</p>
</td><td data-block-token="RE6CdzT5VoisWnxyhbLcTRx4nbh" colspan="1" rowspan="1"><p data-block-token="Faqud1JARoXTpzxsl9Xcvht4nZb">Melihat semua alias dari sebuah koleksi</p>
</td><td data-block-token="ZuxOdlYxroqO2MxgvQBcC7JFnch" colspan="1" rowspan="1"><p data-block-token="PVePdAscpogIkZxc1NYcmsManmd"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">DaftarAliases</a></p>
</td></tr><tr><td data-block-token="U69edBjaZoI5vQx5Hkbca6qvnVf" colspan="1" rowspan="1"><p data-block-token="AcaRdgCvSoqlJmxMqTTc3iAzndb">JelaskanKoleksi</p>
</td><td data-block-token="JK99dTHjiobQPtx16BIcwaXwnLg" colspan="1" rowspan="1"><p data-block-token="ZQ8vdJF8to9xakx5DL7c2phLnyf">Melihat detail dari sebuah koleksi</p>
</td><td data-block-token="L2zNd6oksoXRpaxUXdccyU2ynse" colspan="1" rowspan="1"><p data-block-token="MSHwdiB7ooUykWx4rpmcQUB7ncb"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">JelaskanKoleksi</a></p>
</td></tr><tr><td data-block-token="Eexmd4YEroPmMex9l9AcmsbsnRc" colspan="1" rowspan="1"><p data-block-token="SJ8xdAeAcoZ4UQx9s5ccCWvtn6b">JelaskanAlias</p>
</td><td data-block-token="Dheldg28Io7zwmx5gCXcdzZfnxb" colspan="1" rowspan="1"><p data-block-token="Tt0CdxNMooqShuxPnmMcL3rCnGh">Melihat detail sebuah alias</p>
</td><td data-block-token="ZyWcdj6V5oyQV9xIRUHcaNHSnQO" colspan="1" rowspan="1"><p data-block-token="Yx8vdhUpqouxVGxVAiacWwwlnhh"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">JelaskanAlias</a></p>
</td></tr><tr><td data-block-token="Cp2vduKPOoWsKCxC5VOcBiounHM" colspan="1" rowspan="1"><p data-block-token="ToDlddP7MogohMxxSptcfRZbn7c">DapatkanStatistik</p>
</td><td data-block-token="Z4bOdaX3foYwBIxQLPAc7yqsnof" colspan="1" rowspan="1"><p data-block-token="LCiYdRQZ7oT2ocxh87acGLPqnyc">Mendapatkan statistik koleksi (misalnya jumlah entitas dalam koleksi)</p>
</td><td data-block-token="B2z5dONOTomOw1xf4Y1ct2j5nud" colspan="1" rowspan="1"><p data-block-token="RDoMdK2dlo0DbbxGJemcKFuGnTb"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p>
</td></tr><tr><td data-block-token="XMzpd4J7hoK7Uuxra9Vcu569nme" colspan="1" rowspan="1"><p data-block-token="LdJ3dqvQyoTg9pxOrOfcf2W6nZh">BuatKoleksi</p>
</td><td data-block-token="CPq4d04kWocuxixLniLcrsW4nTg" colspan="1" rowspan="1"><p data-block-token="UEUzdseQgoCkqgx9KGrcEsSknZe">Membuat koleksi</p>
</td><td data-block-token="KFtEdBKgSoFexvxRLPIc0ep1nPd" colspan="1" rowspan="1"><p data-block-token="Kr8VdAWGcop5r1xgCDkcTZMQnpM"><a href="https://milvus.io/docs/create-collection.md">BuatKoleksi</a></p>
</td></tr><tr><td data-block-token="RyGmdf0BroXSaLxEMa7cjg2SnCY" colspan="1" rowspan="1"><p data-block-token="MjdFdb0mBoTPVExtCrOcGKJhnhd">DropCollection</p>
</td><td data-block-token="SXlVduOdto9crHxvQu8cJpyPn1d" colspan="1" rowspan="1"><p data-block-token="ENtrdws3JoaQVdxxKBmcrjqinoh">Jatuhkan koleksi</p>
</td><td data-block-token="BRJzd8wRzoH8SUxiql4cDNlanDg" colspan="1" rowspan="1"><p data-block-token="PuT0d4U2coC6Gwxy178cPySinuf"><a href="https://milvus.io/docs/drop-collection.md">JatuhkanKoleksi</a></p>
</td></tr><tr><td data-block-token="MIZudqBnWo5bYNxVn99cZBPAnqf" colspan="1" rowspan="1"><p data-block-token="CTYAdX2Q1oHvAIxQyYgc7JB9nJb">Memuat</p>
</td><td data-block-token="NDJHdlMXyoojw8xc5a7cyXsQnMg" colspan="1" rowspan="1"><p data-block-token="LlZIdBMjwoOxJxxCQiucRIkHnze">Memuat koleksi</p>
</td><td data-block-token="GnBMdgfslo3Q0UxyAqOcPOBWnie" colspan="1" rowspan="1"><ul data-block-token="KmX1dizLCo1FEDxOSLdcdhptnwe"><li><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollectionGetLoadingProgressGetLoadState</a></li></ul>
</td></tr><tr><td data-block-token="R5BFdRrmXoRxuTxbtj0cc5oAnYc" colspan="1" rowspan="1"><p data-block-token="EcIadMeUNoBpnDxjrgccaKlJnrb">Melepaskan</p>
</td><td data-block-token="MAkMdDFTBocJ4yxzxtzcEb5Vn3f" colspan="1" rowspan="1"><p data-block-token="PktFdWSqHoC1bwxzZoDcCPosnGc">Melepaskan koleksi</p>
</td><td data-block-token="YI4Idz2YKoxEUFxoGjrcIdqenJe" colspan="1" rowspan="1"><p data-block-token="I6aqdaWkToQlxVxOOv7cmqSznUk"><a href="https://milvus.io/docs/load-and-release.md">ReleaseCollection</a></p>
</td></tr><tr><td data-block-token="SdXodgeexoQNgLxhhtrcTXLQn2e" colspan="1" rowspan="1"><p data-block-token="PPGJd9xYyoGc6axLxnXcehHknPd">Flush</p>
<p data-block-token="CwHodxxbFondGMxZI7tcrpyin1e"></p>
</td><td data-block-token="I3sCdXEANooGcQxmSKgc6CzMn6c" colspan="1" rowspan="1"><p data-block-token="Pb8ed7suDodviyxqmZ6cFymUnUc">Mempertahankan semua entitas dalam koleksi ke dalam segmen tertutup. Setiap entitas yang disisipkan setelah operasi flush akan disimpan dalam segmen baru.</p>
</td><td data-block-token="TjNxdCYIHo2nQlxgfEEcq6vRnMd" colspan="1" rowspan="1"><ul data-block-token="VfI4dU4ekoULHtx8UPCcuQ7jnYd"><li><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">FlushGetFlushState</a></li></ul>
</td></tr><tr><td data-block-token="McZ6dPwNZo2PaExCJr2c1f1vnKb" colspan="1" rowspan="1"><p data-block-token="BN0TdBHNoo2K8lxMld3cF29Wn2e">Pemadatan</p>
</td><td data-block-token="VtiFdkyipoclZ0xvm00cWwjBnsb" colspan="1" rowspan="1"><p data-block-token="PI15dBFUFowgCzxgiqYcorC4nUc">Memicu pemadatan secara manual</p>
</td><td data-block-token="ZPVKdfoCio0RgexCDOscmebCnMb" colspan="1" rowspan="1"><p data-block-token="N22odujGfo1BNvxy6ytcWYPlnUf"><a href="https://milvus.io/docs/v2.0.x/compact_data.md">Memadatkan</a></p>
</td></tr><tr><td data-block-token="F7r1daqwEoucg2xbmcVcA957nug" colspan="1" rowspan="1"><p data-block-token="P36tdDCZio4Vo6x3mWkcmCWznAc">Ganti NamaKoleksi</p>
</td><td data-block-token="DApzdesFioE439xjLwGcAoybnWh" colspan="1" rowspan="1"><p data-block-token="BfXmdhtqAovizkxxALrcvolwnib">Mengganti nama koleksi</p>
</td><td data-block-token="UERJdDTv9oqfJCxecUKcqVudnLb" colspan="1" rowspan="1"><p data-block-token="EoR6dhhqQo3T06xDDhbcHvYBnmh"><a href="https://milvus.io/docs/modify-collection.md">Ubah NamaKoleksi</a></p>
</td></tr><tr><td data-block-token="JLqjdqu6moHA8ExbKTYcFa1fnCd" colspan="1" rowspan="1"><p data-block-token="ZJZUdrkKOoulHrx8KrUcdcednyc">BuatAlias</p>
</td><td data-block-token="PCIyd8bf6opfjuxY9agcoysCnwd" colspan="1" rowspan="1"><p data-block-token="EEHSdFVuBoxfAdxGXKPcnx36nMb">Membuat alias untuk sebuah koleksi</p>
</td><td data-block-token="KolRdSgkEoXUvaxX1Y0c0R6Mnug" colspan="1" rowspan="1"><p data-block-token="Bv79dMkrUoRvimxW4N4caqwLnfh"><a href="https://milvus.io/docs/manage-aliases.md">BuatAlias</a></p>
</td></tr><tr><td data-block-token="RQP6dCEpUoU5hOxrHUCcAp43nAg" colspan="1" rowspan="1"><p data-block-token="AJzZdiyDAowFysx1oJ2cJHdrnzr">DropAlias</p>
</td><td data-block-token="ZpMwdiS29o5GUwxSDLLcGoKrnSg" colspan="1" rowspan="1"><p data-block-token="UDSqdIUZfocTrwxsylJcUgTQnad">Menghilangkan alias dari sebuah koleksi</p>
</td><td data-block-token="AkEKdae8PouzmrxkJlXcPyXQnRh" colspan="1" rowspan="1"><p data-block-token="XQJmdWnDgoP1iAxXyrmc6ZULnEd"><a href="https://milvus.io/docs/manage-aliases.md">DropAlias</a></p>
</td></tr><tr><td data-block-token="I6CPdpxiDovYgxxXOfecMaiInff" colspan="1" rowspan="1"><p data-block-token="IZMXdTWPYoNCxxxtZHgcZyrTnXb">FlushAll</p>
</td><td data-block-token="AWTWdGgSNoxsBQxXVe4cvR9FnYf" colspan="1" rowspan="1"><p data-block-token="GtyudeFwFopyyFxoOyBcM7o9nuf">Mengosongkan semua koleksi dalam basis data</p>
</td><td data-block-token="DGS1daDh1oNgFJxczbZcvHMDnmd" colspan="1" rowspan="1"><p data-block-token="DkikdUvPRoNSjqxMDiYcz7AKn5f"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p>
</td></tr><tr><td data-block-token="Q1DpdgIdjojrGrxTy2fc8M0unpe" colspan="1" rowspan="4"><p data-block-token="FCSedwXgKoUjkzxNxIxcHoyYnQh">Keistimewaan Partisi</p>
</td><td data-block-token="S97PduCHZo6kOqx0b6HcDaywnrh" colspan="1" rowspan="1"><p data-block-token="Jm1FdoqA9oHwR3xpXxNcDvGwnUd">HasPartition</p>
</td><td data-block-token="UgCAdYHxXoOEOXxaMvGcoW32neb" colspan="1" rowspan="1"><p data-block-token="GhW4d7zlPoxf5kxe3JYcSJemnOe">Memeriksa apakah sebuah partisi ada</p>
</td><td data-block-token="QR36dTbquomQbXxm0PAc6nK6nHb" colspan="1" rowspan="1"><p data-block-token="ZPr1d9tv6oAQM0x8rL0cfs8tnHg"><a href="https://milvus.io/docs/manage-partitions.md">HasPartition</a></p>
</td></tr><tr><td data-block-token="HEPGdUOS5o88a1xUrzNcuvhqnh4" colspan="1" rowspan="1"><p data-block-token="MjhldMMv7oqJ5axXobUcWDS4nxh">TampilkanPartisi</p>
</td><td data-block-token="DpPEderqroL00XxriwNcyWeJnGb" colspan="1" rowspan="1"><p data-block-token="MHpSdgIbJo6tIYxhTl8cwdFAnSb">Melihat semua partisi dalam sebuah koleksi</p>
</td><td data-block-token="SFbLdAlQwoPxCqx9ckOcKzQaneg" colspan="1" rowspan="1"><p data-block-token="FaDDdF8F6oHeLqxHtoNcH2pxnUh"><a href="https://milvus.io/docs/manage-partitions.md">TampilkanPartisi</a></p>
</td></tr><tr><td data-block-token="SrxxdKvoqoPBATx43ndcHGr2nJZ" colspan="1" rowspan="1"><p data-block-token="Q6PFdOFBpodLUbxBSzYcPxYGnEe">BuatPartisi</p>
</td><td data-block-token="GFcydLWQEoIEKZxynapcb2gjn7f" colspan="1" rowspan="1"><p data-block-token="C8xJdCx8DoXU5NxoL6ucC8RDnFd">Membuat partisi</p>
</td><td data-block-token="UayZdC1fso6WsoxYhxxcouRSnJh" colspan="1" rowspan="1"><p data-block-token="EHeNdsEcwonOVQxT1JWcXRpInYg"><a href="https://milvus.io/docs/manage-partitions.md">BuatPartisi</a></p>
</td></tr><tr><td data-block-token="CN7fdu71hojcGixGT3xcRqwlnhc" colspan="1" rowspan="1"><p data-block-token="QpN7d4FPdowiLixJGQvcX1Tan0f">JatuhkanPartisi</p>
</td><td data-block-token="HBvzdkIqMoahn7xRZb9c8gmGnob" colspan="1" rowspan="1"><p data-block-token="FxUad6Jurobd7Dx9r2DcsOMGnhf">Menghapus partisi</p>
</td><td data-block-token="VjabdaiOgoSZOJxaBeBcZOtensg" colspan="1" rowspan="1"><p data-block-token="DzBXdD1vmop2lLxyA3QcTW3bnoh"><a href="https://milvus.io/docs/manage-partitions.md">JatuhkanPartisi</a></p>
</td></tr><tr><td data-block-token="ZI1YdRgl0oQNOfxj3hlcC5q0nEb" colspan="1" rowspan="3"><p data-block-token="RyM0dZe8jos9m8xwnEecpBe1nkc">Hak Istimewa Indeks</p>
</td><td data-block-token="GI64dxRQgoVas4xtrVec0KGGnsb" colspan="1" rowspan="1"><p data-block-token="DLSMdH3CJooontxHeKocZK3cngh">IndexDetail</p>
</td><td data-block-token="CdqcdkAlEoLiMZxs6IpcIxltnYe" colspan="1" rowspan="1"><p data-block-token="UPHXdO2TKo3it6xQga8cddG3npg">Melihat detail indeks</p>
<p data-block-token="YsHTdK8UQorsTqxQMIvcVkLqneb"></p>
</td><td data-block-token="IQQ5dBawkoCz41xepw6cNSCAnGf" colspan="1" rowspan="1"><p data-block-token="HLz5dc2qvoc0oFxhpdLcN6ixnUf"><a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">JelaskanIndeks / DapatkanIndeksState / DapatkanKemajuanPembangunanIndeks</a></p>
</td></tr><tr><td data-block-token="Hlo9djUK8oJdPLx5bMIc5Zbkn8b" colspan="1" rowspan="1"><p data-block-token="RSbPd3M9KoIMTRxlGiScGF1MnDf">BuatIndeks</p>
</td><td data-block-token="FGZVdeaFXoaTuSxXETCc7jGNnLC" colspan="1" rowspan="1"><p data-block-token="YRladIDhxoRkZLx40p4cZTgwn2g">Membuat indeks</p>
</td><td data-block-token="YKAwdx756oilIxxafOjczmoInGc" colspan="1" rowspan="1"><p data-block-token="IdzsdFUOQowLcpxCIZScYPKjnbC"><a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">BuatIndeks</a></p>
</td></tr><tr><td data-block-token="FpaSdJc5gocyVzxvmCGcSkzDn4e" colspan="1" rowspan="1"><p data-block-token="D9m8dhGerodgzAxUbiXc6X4knNh">JatuhkanIndeks</p>
</td><td data-block-token="TKzzdWiSNojjmNxOLlEcM8Tzn1f" colspan="1" rowspan="1"><p data-block-token="Cbktda0WYoAz7lxi7ricEfXdn4d">Jatuhkan indeks</p>
</td><td data-block-token="RZjAdpVNYo8aP4xFRzZcLtUKnRh" colspan="1" rowspan="1"><p data-block-token="Kvr3dARR9oR9LsxwLtEc4xoCnTe">Jatuhkan<a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">Indeks</a></p>
</td></tr><tr><td data-block-token="GcvxdCFi9os5wKxkGBxcLlpAnih" colspan="1" rowspan="10"><p data-block-token="MC9EdTagPoITS8xKOONcE8gInAb">Hak Istimewa Manajemen Sumber Daya</p>
<p data-block-token="Vhs3d9lueobj2BxbvoacLfBbnph"></p>
</td><td data-block-token="MqBKd18GUobjMtxpyGgcBR2BnXg" colspan="1" rowspan="1"><p data-block-token="KC3lddgHJo8bkJx8oTKca3VpnHf">LoadBalance</p>
</td><td data-block-token="POQfdVxn1ocXw8xf47McUmJsnCf" colspan="1" rowspan="1"><p data-block-token="ZY2JdXIYooUE5dxv884c6cz0nMd">Mencapai keseimbangan beban</p>
</td><td data-block-token="SS7rdsOLgo2hDZxIgbbcdXHOn0d" colspan="1" rowspan="1"><p data-block-token="DcxbdmK2io2lsHxXl16c8Q63nyh"><a href="https://milvus.io/docs/resource_group.md">Keseimbangan Beban</a></p>
</td></tr><tr><td data-block-token="RAWrdSmJSouLmVx2EHEcqDR3nRh" colspan="1" rowspan="1"><p data-block-token="OQV2dWGXLoxuSXxb1lOcIqkvnDV">Buat Grup Sumber Daya</p>
</td><td data-block-token="WmtLd0b1do4pdoxWoTRcEI24nNg" colspan="1" rowspan="1"><p data-block-token="DlqWdM1UyoajGpxIxewcgTpFnpe">Membuat grup sumber daya</p>
</td><td data-block-token="Jx1sds16koeIAJxEllOcs4o7nsk" colspan="1" rowspan="1"><p data-block-token="CXTDdgUNeoUvmHxg2IZcRfn2n3d"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">Membuat Grup Sumber Daya</a></p>
</td></tr><tr><td data-block-token="SVTcdbRy8oSIYfxjgTncCsGfntc" colspan="1" rowspan="1"><p data-block-token="YExZdDddqo40QExKnvdcZfcEnmd">Menghapus Grup Sumber Daya</p>
</td><td data-block-token="K5Z2dFlkZoLDXAxHTQ1cLWM0nVo" colspan="1" rowspan="1"><p data-block-token="D0mCd2rYqoZmaDxfieactr9fn1d">Menghapus grup sumber daya</p>
</td><td data-block-token="U6r4dznP4oF2thx5Y8hcvz83nZc" colspan="1" rowspan="1"><p data-block-token="Xagnddg0rowmGUxZVDqcPB1CnSd"><a href="https://milvus.io/docs/resource_group.md">Jatuhkan Grup Sumber Daya</a></p>
</td></tr><tr><td data-block-token="Rjz7dYIdMoUxS8xMFguc1OPhnNh" colspan="1" rowspan="1"><p data-block-token="HqUvdgaEco9BVJx6EcCccRT3n8m">Memperbarui Grup Sumber Daya</p>
</td><td data-block-token="ZE0UdUF3LosocpxJJ4pckxOhndd" colspan="1" rowspan="1"><p data-block-token="G2rxdbvD1oDv6exRkD7cpPznnbz">Memperbarui grup sumber daya</p>
</td><td data-block-token="KV5jdkCTboAB4HxDmRYcSOjMnHc" colspan="1" rowspan="1"><p data-block-token="Fhodd5hiLoy4X3xb0jmcptsLnPb"><a href="https://milvus.io/docs/resource_group.md">Memperbarui Grup Sumber Daya</a></p>
</td></tr><tr><td data-block-token="TIL3d2BpDo0BOnxH42gcltPynCe" colspan="1" rowspan="1"><p data-block-token="IGUldI5RFocmvuxKeXCcQpJqnye">JelaskanGrup Sumber Daya</p>
</td><td data-block-token="HXKddvhmLoVBbzx3edyc4LlbnmK" colspan="1" rowspan="1"><p data-block-token="HgAudI5KjoJDM9xt92xckhXpnaf">Melihat detail grup sumber daya</p>
</td><td data-block-token="UM9ndx9AvoqAToxbHGtcRXX4nae" colspan="1" rowspan="1"><p data-block-token="ClAMdRpe8o8OTKxBEoOcMIYpnpo"><a href="https://milvus.io/docs/resource_group.md">Jelaskan Grup Sumber Daya</a></p>
</td></tr><tr><td data-block-token="ADXidOOSioIYCwxIhkCc1s75nPd" colspan="1" rowspan="1"><p data-block-token="Pzh1dJkwWoLpnHxXDutcp0BTnac">DaftarGrupSumberDaya</p>
</td><td data-block-token="OnsZdXGA3obCqaxhk3QcxTcPnPc" colspan="1" rowspan="1"><p data-block-token="EHyZdwDFyoPqlPxBxXKcG22bnse">Melihat semua grup sumber daya dari instance saat ini</p>
</td><td data-block-token="JIiVd5dVLoKT9KxTUUKc1prtnIh" colspan="1" rowspan="1"><p data-block-token="FonBdxV8SoFY5lxGpv4cd7ONnxd"><a href="https://milvus.io/docs/resource_group.md">ListResourceGroups</a></p>
</td></tr><tr><td data-block-token="LWJ1d1whAofrmdxXkr8cNS0nnZe" colspan="1" rowspan="1"><p data-block-token="KJWcdVyKRoFGa3xZBYxckqbznqw">TransferNode</p>
</td><td data-block-token="V2b4dxfSmo20HexLUDzc3HV2n4d" colspan="1" rowspan="1"><p data-block-token="Ghq1d5ZXoocGdwxoAYscJX0knBb">Mentransfer simpul di antara grup sumber daya</p>
</td><td data-block-token="NbvLdLwbLoEI6LxZFxbceHtRnof" colspan="1" rowspan="1"><p data-block-token="Ewhwd2Vg5oWDXxxmv32cKE3Bnyc"><a href="https://milvus.io/docs/resource_group.md">TransferNode</a></p>
</td></tr><tr><td data-block-token="CBqHd6iQMoz32mx2QfFcoezZnLw" colspan="1" rowspan="1"><p data-block-token="XJi5dnAY3oMqzfxyR1Dc5GBrnFf">TransferReplika</p>
</td><td data-block-token="HZZ9dadWboTapgxIzS6cacGJnRe" colspan="1" rowspan="1"><p data-block-token="BqJfdZGA2oJy5Mx8O1dcNwiFn0M">Mentransfer replika antar grup sumber daya</p>
</td><td data-block-token="TQY1dDzSJonsioxxlLCclIspnAf" colspan="1" rowspan="1"><p data-block-token="Jsjpd63uMo0gQGxpTtlciAAOnNh"><a href="https://milvus.io/docs/resource_group.md">TransferReplika</a></p>
</td></tr><tr><td data-block-token="NFrtdfmTjoX2Bkx8tnDc3BMZnuf" colspan="1" rowspan="1"><p data-block-token="Afvdd1eYCo4beuxYesFcWJccnrd">Pencadangan RBAC</p>
</td><td data-block-token="UqpAdnVkioHFUGxand8cZMkcnMe" colspan="1" rowspan="1"><p data-block-token="ThH5dy7VvoFDMSxfYLbc4Bscnvc">Membuat cadangan untuk semua operasi terkait RBAC dalam instance saat ini</p>
</td><td data-block-token="Uopbd055PoiKmGxBaCDcg8runZc" colspan="1" rowspan="1"><p data-block-token="TIbXdwfFqoYc0cxXCaAc0iDTnAb">BackupRBAC</p>
</td></tr><tr><td data-block-token="GJMGdtpBXodFxPxJEWacjwg8n3d" colspan="1" rowspan="1"><p data-block-token="Inp7dlE81oBFDCx191acMx1fnVh">PulihkanRBAC</p>
</td><td data-block-token="Jd85dUgHiokvQWxWHVdcTriQnFc" colspan="1" rowspan="1"><p data-block-token="PlaHdwtPQorHHTxl3bPcsOwCnEb">Memulihkan cadangan semua operasi terkait RBAC dalam instans saat ini</p>
</td><td data-block-token="ThOTdwZjcoahs1xfcbpcDzFonab" colspan="1" rowspan="1"><p data-block-token="AFwMdHdmKoXbE4xzGqMctlKLnRA">PulihkanRBAC</p>
</td></tr><tr><td data-block-token="VFw2dElePoZ45zxsRW5cDqOdnCK" colspan="1" rowspan="6"><p data-block-token="Rk6UdFUAHo69IexovsXcAs6inXc">Hak Istimewa Entitas</p>
<p data-block-token="TmsNd5Mk2oJmNNxlK8IckdFDnSg"></p>
</td><td data-block-token="BCegdmvf4omIVWxZqsJcWRs4ndf" colspan="1" rowspan="1"><p data-block-token="GCCldIZBeoEs19xLIawcKvW0n2e">Kueri</p>
</td><td data-block-token="RzEGd16EQo6hgexM2uLcwN4rnQX" colspan="1" rowspan="1"><p data-block-token="PM8WdTyEXoHSkfxosmrcznAAnT6">Melakukan kueri</p>
</td><td data-block-token="JdWcdaXSWoNg00xp3iGcLTtGn9f" colspan="1" rowspan="1"><p data-block-token="UstWdVI78oNRYVxdac0cBv93nnc"><a href="https://milvus.io/docs/get-and-scalar-query.md">Query</a></p>
</td></tr><tr><td data-block-token="EskNdfHL2okPMyxkTooclFBFnRf" colspan="1" rowspan="1"><p data-block-token="WYjDdzwvhoTsPuxfoxwcNFB1nsh">Pencarian</p>
</td><td data-block-token="MDjDdqBmFoPJatxr0X3cFxG6nMh" colspan="1" rowspan="1"><p data-block-token="J13udDvCwoYRyMxcoWIcvZxvne2">Melakukan pencarian</p>
</td><td data-block-token="QOFxdnqProclVgxkoGxcb2ddnFe" colspan="1" rowspan="1"><p data-block-token="RQVPdHRyHoo4kUxN6t7cqUWWnZg"><a href="https://milvus.io/docs/single-vector-search.md">Cari</a></p>
</td></tr><tr><td data-block-token="Z629ddacHoYy15xiWu8cGNgknoc" colspan="1" rowspan="1"><p data-block-token="KTjHdCVLcoxFhtxawsSc4Z7LnQh">Menyisipkan</p>
</td><td data-block-token="SXctd0DIYo6O5jxjchZccwfunjc" colspan="1" rowspan="1"><p data-block-token="VWNmdjNhzoM0u6xWLsvc6fAYnyd">Menyisipkan entitas</p>
</td><td data-block-token="P9PQdtNZ7oSCgFxuREEcBUv6nwd" colspan="1" rowspan="1"><p data-block-token="CPjTd78afo4gc3xUBKGcpdk1nAe"><a href="https://milvus.io/docs/insert-update-delete.md">Menyisipkan</a></p>
</td></tr><tr><td data-block-token="TdrMd177JoP9sQxkhzEcgZMrn4d" colspan="1" rowspan="1"><p data-block-token="ZwYJdCVnzo92UVxaVV1cbg0enEe">Menghapus</p>
</td><td data-block-token="Rt9odvfYnofDtExhaCWcKsBynmb" colspan="1" rowspan="1"><p data-block-token="AtDxddeMVonNckxUkrgcCRl7n4e">Menghapus entitas</p>
</td><td data-block-token="ST5Udofmjotouvx432gclKpDngh" colspan="1" rowspan="1"><p data-block-token="QU4Nd9w4YowDlAxuGKxcUgcmnvc"><a href="https://milvus.io/docs/delete-entities.md">Menghapus</a></p>
</td></tr><tr><td data-block-token="QmAEd0Hd1o0uH6xvJh9ciqfZnie" colspan="1" rowspan="1"><p data-block-token="G3Hrd4PSgoHVxqxlbeQcZFiwnJb">Memasukkan</p>
</td><td data-block-token="FzDUdE1sEoBxRnxvzDqcEJtXnzb" colspan="1" rowspan="1"><p data-block-token="JuKDdIQwGoPjsDxw51XcG7a6nZJ">Menyisipkan entitas</p>
</td><td data-block-token="ZKcTdilVBos1JPxl2ZvcwR5tnXb" colspan="1" rowspan="1"><p data-block-token="LiQCdfDlWoelRKxOKNyc6FJdn9g">Menambah</p>
</td></tr><tr><td data-block-token="MgThdpr92ostDkxi9f1crxtenwI" colspan="1" rowspan="1"><p data-block-token="AwDOdjas4oeIxlxfxPJcYeM5nIe">Impor</p>
</td><td data-block-token="G2EHdTvZVoD6QFx8E7JcfFtNnRb" colspan="1" rowspan="1"><p data-block-token="N938dAKo8oKQmcxyjjscRZzPnO9">Menyisipkan atau mengimpor entitas secara massal</p>
</td><td data-block-token="F8HbdVrruoIFYmxamT1cgtx0nIb" colspan="1" rowspan="1"><p data-block-token="OFa1dwanmoy2lKxcyz4cdUTUnAh"><a href="https://milvus.io/docs/import-data.md">Sisipkan/Impor Massal</a></p>
</td></tr><tr><td data-block-token="IpBJdwH77oI5OFxscS1cS8R2ntc" colspan="1" rowspan="10"><p data-block-token="OGp9dFWLGoYDEmxT8NkcszZunVh">Hak Istimewa RBAC</p>
</td><td data-block-token="RRnCdRa2QodfgKxhmUscE4jCnsf" colspan="1" rowspan="1"><p data-block-token="LGhAdgmG8oDvP5x6viNc1SxLnnf">BuatKepemilikan</p>
</td><td data-block-token="IBOMdPYVCorrjyxZZC6c0drFnce" colspan="1" rowspan="1"><p data-block-token="Z2S9dwOBToohHrx8Ih4cH3fdnnh">Membuat pengguna atau peran</p>
</td><td data-block-token="OJXkd6676onpOpxzmTXc1prxnLg" colspan="1" rowspan="1"><p data-block-token="H1aRdCwZ4okneNx94vIcnCzTnac"><a href="/docs/id/users_and_roles.md">BuatPengguna/BuatPeran</a></p>
</td></tr><tr><td data-block-token="Th4Hdv8eeoaoTNx9oPrceUKpnPd" colspan="1" rowspan="1"><p data-block-token="AxG5d7D1doPXVRxQKBzcCNaPnig">PerbaruiPengguna</p>
</td><td data-block-token="URzfdphsvo5S2JxSYp0cH2R4nzc" colspan="1" rowspan="1"><p data-block-token="JehtddjtMoYsMZxqOAKcLVKXneh">Memperbarui kata sandi pengguna</p>
</td><td data-block-token="KAtiduPSzo8bUGxylXUczG3gnMd" colspan="1" rowspan="1"><p data-block-token="CFJHdSo1eoEnM9x8KUocFsponXf"><a href="/docs/id/users_and_roles.md">PerbaruiKredensial</a></p>
</td></tr><tr><td data-block-token="CgO8dnNyEotOTExeihCcoJoInIe" colspan="1" rowspan="1"><p data-block-token="CGcldT4pIo4rNJx0qkqc8Fm2ndc">HapusKepemilikan</p>
</td><td data-block-token="C2zLdO8auonWUZxNf1Gc9e5tndb" colspan="1" rowspan="1"><p data-block-token="R6yqdtt2yo8V8Rx6wmIcp1genMu">Menghapus kata sandi pengguna atau peran</p>
</td><td data-block-token="PvTYdRi74orjltxXEeQcwaLfnCd" colspan="1" rowspan="1"><p data-block-token="JYwtdB54WoU6Q6xGhiwcLY3XnZv"><a href="/docs/id/users_and_roles.md">HapusKredensial/JatuhkanPeran</a></p>
</td></tr><tr><td data-block-token="BgH2dkOQLonqb1xt0epc3yTknAh" colspan="1" rowspan="1"><p data-block-token="WvuPdKJs2oOItDxKhuccjR56nyf">PilihKepemilikan</p>
</td><td data-block-token="R093ddlBTo5opoxyRmactAI4nWb" colspan="1" rowspan="1"><p data-block-token="Mf5vd65cKoQo8fxokifcdbcGnxg">Melihat semua pengguna yang diberikan peran tertentu</p>
</td><td data-block-token="Y9iadTKbcoouhpxADCUcdCRLnWb" colspan="1" rowspan="1"><p data-block-token="I4tDd6CGkofHsFxnfGUc7SP7nuh"><a href="/docs/id/users_and_roles.md">PilihPeran/PilihHibah</a></p>
</td></tr><tr><td data-block-token="BAS1ddw1uoLMsoxLqAHcDGrgnSg" colspan="1" rowspan="1"><p data-block-token="D5o9dFaGKogrc8xIa3lcJ5ucnhe">KelolaKepemilikan</p>
</td><td data-block-token="UGULdyXOmo8mZUx1V8McnOOOneg" colspan="1" rowspan="1"><p data-block-token="NLsQdOgNroaFYjxnTScc3gEDnsg">Mengelola pengguna atau peran atau memberikan peran kepada pengguna</p>
</td><td data-block-token="DZPldb6cPoIbnjxPiCgcJxXQnAf" colspan="1" rowspan="1"><p data-block-token="VNMFdDIUGor46DxtB7AcGEHZnle"><a href="/docs/id/users_and_roles.md">OperateUserRole/OperatePrivilege/OperatePrivilegeV2</a></p>
</td></tr><tr><td data-block-token="BEgAdlSSVoKEmDxVQoUcKPzjnUb" colspan="1" rowspan="1"><p data-block-token="RvnMdk7PioVQN6x03RNceq8dnGd">PilihPengguna</p>
</td><td data-block-token="Sf0edJ8txowUF2xMG1EcXpWjnzf" colspan="1" rowspan="1"><p data-block-token="SVYYd4uN8ol7yixvRuucuvPMnqe">Melihat semua peran yang diberikan kepada pengguna</p>
</td><td data-block-token="AhxAdxOzIohRvZxFvhucVboBnuf" colspan="1" rowspan="1"><p data-block-token="IOp4djPKnoyIpdx5mQncoPiXn4c"><a href="/docs/id/users_and_roles.md">PilihPengguna</a></p>
</td></tr><tr><td data-block-token="ZkHQd0lmMo6LkExMPCWcRmd2nAb" colspan="1" rowspan="1"><p data-block-token="TKqYdgI9JofscAxRXUtcA0M7nDh">BuatKelompokKeistimewaan</p>
</td><td data-block-token="Mjcmdn05eoNdfwx8ud9cS2ycnfb" colspan="1" rowspan="1"><p data-block-token="Rlc1dUR64owt4UxwCkqcdCPZnRg">Membuat grup hak istimewa</p>
</td><td data-block-token="KYnudiKhEoVaSnxzzW7cuQtSnOg" colspan="1" rowspan="1"><p data-block-token="EJspdi78ooGDvRxsK3Vc4w6gnXb"><a href="/docs/id/privilege_group.md">Buat Grup Hak Istimewa</a></p>
</td></tr><tr><td data-block-token="U5uod4PtAosrsKxEJ71cj84hnNd" colspan="1" rowspan="1"><p data-block-token="Qw18dvjHuoDfdwxehwLcoSxPnDf">Hapus Grup Hak Istimewa</p>
</td><td data-block-token="KU0kdROFyofmt5x6ltwcDncinr7" colspan="1" rowspan="1"><p data-block-token="AhGFdo2t3oWF7kxfoH3cUbEWnnc">Menghapus grup hak istimewa</p>
</td><td data-block-token="Lpv5d3cYqobKrCxwQtycutx1nqf" colspan="1" rowspan="1"><p data-block-token="X9CqdpmBoo6CQxxP4eSc42Eantb"><a href="/docs/id/privilege_group.md">Jatuhkan Grup Hak Istimewa</a></p>
</td></tr><tr><td data-block-token="RfmYd4ApWoVRjAxAJlhcsBOBnYd" colspan="1" rowspan="1"><p data-block-token="Oe0BdhywGol8b5xMz4kcLDgXn5c">DaftarGrup Hak Istimewa</p>
</td><td data-block-token="XjSidYzDxoM5QlxMpkYc7Rdrnyf" colspan="1" rowspan="1"><p data-block-token="BPASdokERoAcfwxHsnZcrc7gn5f">Melihat semua grup hak istimewa dalam instance saat ini</p>
</td><td data-block-token="AC1ndxpo5otLECxXwU4cm9XWnxc" colspan="1" rowspan="1"><p data-block-token="I5PQdLW8CoUtbAxfRhYchSPrnXd"><a href="/docs/id/privilege_group.md">Daftar Grup Hak Istimewa</a></p>
</td></tr><tr><td data-block-token="MTHXdRxasoxGbUxWQrGctwpfnHh" colspan="1" rowspan="1"><p data-block-token="XuMndXqGUoN6NFxqxWJcK9PwnSf">OperatePrivilegeGroup</p>
</td><td data-block-token="QnMhdQmvwoRJRmx3NjNcWz2Fncf" colspan="1" rowspan="1"><p data-block-token="RGvndPvnDoj86Pxm8xFceP4sn8g">Menambahkan hak istimewa atau menghapus hak istimewa dari grup hak istimewa</p>
</td><td data-block-token="Lz0MdWmfXo7bF9xWzPxcv7mYn6b" colspan="1" rowspan="1"><p data-block-token="PNPQdG1GvoBjUXxa8iacCIxenYe"><a href="/docs/id/privilege_group.md">OperatePrivilegeGroup</a></p>
</td></tr></tbody></table>
<p>Contoh berikut ini mendemonstrasikan cara memberikan hak istimewa <code translate="no">PrivilegeSearch</code> pada <code translate="no">collection_01</code> di bawah basis data default serta grup hak istimewa bernama <code translate="no">privilege_group_1</code> ke peran <code translate="no">role_a</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.<span class="hljs-title function_">grant_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.<span class="hljs-title function_">grant_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.<span class="hljs-title function_">grant_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">rbac</span>.<span class="hljs-property">request</span>.<span class="hljs-property">GrantPrivilegeReqV2</span>

client.<span class="hljs-title function_">grantPrivilegeV2</span>(<span class="hljs-title class_">GrantPrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;Search&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;default&quot;</span>)
        .<span class="hljs-title function_">build</span>());

client.<span class="hljs-title function_">grantPrivilegeV2</span>(<span class="hljs-title class_">GrantPrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;default&quot;</span>)
        .<span class="hljs-title function_">build</span>());

client.<span class="hljs-title function_">grantPrivilegeV2</span>(<span class="hljs-title class_">GrantPrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;*&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;*&quot;</span>)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span>

client.<span class="hljs-title class_">GrantV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;default&quot;</span>))

client.<span class="hljs-title class_">GrantV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;default&quot;</span>))

client.<span class="hljs-title class_">GrantV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;*&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">grantPrivilege</span>({
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
   <span class="hljs-attr">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>, 
   <span class="hljs-attr">objectName</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
   <span class="hljs-attr">privilegeName</span>: <span class="hljs-string">&#x27;Search&#x27;</span>
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
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
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">Mendeskripsikan peran<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut ini menunjukkan cara melihat hak istimewa yang diberikan kepada role role_a menggunakan metode describe_role.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

client.<span class="hljs-title function_">describe_role</span>(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeRoleResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeRoleReq

<span class="hljs-type">DescribeRoleReq</span> <span class="hljs-variable">describeRoleReq</span> <span class="hljs-operator">=</span> DescribeRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
<span class="hljs-type">DescribeRoleResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.describeRole(describeRoleReq);
List&lt;DescribeRoleResp.GrantInfo&gt; infos = resp.getGrantInfos();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span>

client.<span class="hljs-title class_">ListRoles</span>(context.<span class="hljs-title class_">Background</span>())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">describeRole</span>({<span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Di bawah ini adalah contoh keluaran.</p>
<pre><code translate="no" class="language-json">{
     <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
     <span class="hljs-string">&quot;privileges&quot;</span>: [
         {
             <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;collection_01&quot;</span>,
             <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;default&quot;</span>,
             <span class="hljs-string">&quot;role_name&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
             <span class="hljs-string">&quot;privilege&quot;</span>: <span class="hljs-string">&quot;Search&quot;</span>,
             <span class="hljs-string">&quot;grantor_name&quot;</span>: <span class="hljs-string">&quot;root&quot;</span>
         },
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     ]
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Mencabut hak istimewa atau grup hak istimewa dari suatu peran<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut ini menunjukkan cara mencabut hak istimewa <code translate="no">PrivilegeSearch</code> pada <code translate="no">collection_01</code> di bawah basis data default serta grup hak istimewa <code translate="no">privilege_group_1</code> yang telah diberikan kepada role <code translate="no">role_a</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.<span class="hljs-title function_">revoke_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.<span class="hljs-title function_">revoke_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.<span class="hljs-title function_">revoke_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">rbac</span>.<span class="hljs-property">request</span>.<span class="hljs-property">RevokePrivilegeReqV2</span>

client.<span class="hljs-title function_">revokePrivilegeV2</span>(<span class="hljs-title class_">RevokePrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;Search&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;default&quot;</span>)
        .<span class="hljs-title function_">build</span>());

client.<span class="hljs-title function_">revokePrivilegeV2</span>(<span class="hljs-title class_">RevokePrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;default&quot;</span>)
        .<span class="hljs-title function_">build</span>());

client.<span class="hljs-title function_">revokePrivilegeV2</span>(<span class="hljs-title class_">RevokePrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;*&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;*&quot;</span>)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span>

client.<span class="hljs-title class_">RevokeV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;default&quot;</span>))

client.<span class="hljs-title class_">RevokeV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>, <span class="hljs-string">&quot;privielge_group_1&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;default&quot;</span>))

client.<span class="hljs-title class_">RevokeV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;*&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
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
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
