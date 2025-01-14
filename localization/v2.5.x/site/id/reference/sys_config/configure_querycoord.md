---
id: configure_querycoord.md
related_key: configure
group: system_configuration.md
summary: Pelajari cara mengonfigurasi queryCoord untuk Milvus.
---
<h1 id="queryCoord-related-Configurations" class="common-anchor-header">Konfigurasi terkait queryCoord<button data-href="#queryCoord-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Konfigurasi terkait queryCoord, digunakan untuk mengelola topologi dan penyeimbangan beban untuk node kueri, dan handoff dari segmen yang sedang tumbuh ke segmen yang disegel.</p>
<h2 id="queryCoordautoHandoff" class="common-anchor-header"><code translate="no">queryCoord.autoHandoff</code><button data-href="#queryCoordautoHandoff" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoHandoff">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Nilai sakelar untuk mengontrol apakah akan secara otomatis mengganti segmen yang sedang tumbuh dengan segmen tersegel terindeks yang sesuai ketika segmen yang sedang tumbuh mencapai ambang batas penyegelan.</li>      
        <li>Jika parameter ini disetel salah, Milvus hanya akan mencari segmen yang sedang tumbuh dengan brute force.</li>      </td>
      <td>benar</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordautoBalance" class="common-anchor-header"><code translate="no">queryCoord.autoBalance</code><button data-href="#queryCoordautoBalance" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoBalance">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ganti nilai untuk mengontrol apakah akan menyeimbangkan penggunaan memori secara otomatis di antara node kueri dengan mendistribusikan operasi pemuatan dan pelepasan segmen secara merata.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordautoBalanceChannel" class="common-anchor-header"><code translate="no">queryCoord.autoBalanceChannel</code><button data-href="#queryCoordautoBalanceChannel" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoBalanceChannel">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Mengaktifkan saluran keseimbangan otomatis      </td>
      <td>benar</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalancer" class="common-anchor-header"><code translate="no">queryCoord.balancer</code><button data-href="#queryCoordbalancer" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balancer">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        penyeimbang otomatis yang digunakan untuk segmen pada queryNode      </td>
      <td>Penyeimbang Berbasis Skor</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordglobalRowCountFactor" class="common-anchor-header"><code translate="no">queryCoord.globalRowCountFactor</code><button data-href="#queryCoordglobalRowCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.globalRowCountFactor">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bobot yang digunakan saat menyeimbangkan segmen di antara queryNodes      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordscoreUnbalanceTolerationFactor" class="common-anchor-header"><code translate="no">queryCoord.scoreUnbalanceTolerationFactor</code><button data-href="#queryCoordscoreUnbalanceTolerationFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.scoreUnbalanceTolerationFactor">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nilai terkecil untuk tingkat ketidakseimbangan antara dari dan ke node saat melakukan penyeimbangan      </td>
      <td>0.05</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordreverseUnBalanceTolerationFactor" class="common-anchor-header"><code translate="no">queryCoord.reverseUnBalanceTolerationFactor</code><button data-href="#queryCoordreverseUnBalanceTolerationFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.reverseUnBalanceTolerationFactor">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nilai terbesar untuk ketidakseimbangan antara dari dan ke node setelah melakukan penyeimbangan      </td>
      <td>1.3</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordoverloadedMemoryThresholdPercentage" class="common-anchor-header"><code translate="no">queryCoord.overloadedMemoryThresholdPercentage</code><button data-href="#queryCoordoverloadedMemoryThresholdPercentage" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.overloadedMemoryThresholdPercentage">
  <thead>
    <tr>
      <th class="width80">Keterangan</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ambang batas penggunaan memori (dalam persentase) dalam node kueri untuk memicu penyeimbangan segmen tertutup.      </td>
      <td>90</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalanceIntervalSeconds" class="common-anchor-header"><code translate="no">queryCoord.balanceIntervalSeconds</code><button data-href="#queryCoordbalanceIntervalSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balanceIntervalSeconds">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Interval saat koordinat kueri menyeimbangkan penggunaan memori di antara node kueri.      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordmemoryUsageMaxDifferencePercentage" class="common-anchor-header"><code translate="no">queryCoord.memoryUsageMaxDifferencePercentage</code><button data-href="#queryCoordmemoryUsageMaxDifferencePercentage" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.memoryUsageMaxDifferencePercentage">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ambang batas perbedaan penggunaan memori (dalam persentase) antara dua node kueri untuk memicu penyeimbangan segmen tertutup.      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrowCountFactor" class="common-anchor-header"><code translate="no">queryCoord.rowCountFactor</code><button data-href="#queryCoordrowCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.rowCountFactor">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bobot jumlah baris yang digunakan saat menyeimbangkan segmen di antara queryNode      </td>
      <td>0.4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentCountFactor" class="common-anchor-header"><code translate="no">queryCoord.segmentCountFactor</code><button data-href="#queryCoordsegmentCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentCountFactor">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bobot jumlah segmen yang digunakan saat menyeimbangkan segmen di antara queryNode      </td>
      <td>0.4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordglobalSegmentCountFactor" class="common-anchor-header"><code translate="no">queryCoord.globalSegmentCountFactor</code><button data-href="#queryCoordglobalSegmentCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.globalSegmentCountFactor">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bobot jumlah segmen yang digunakan saat menyeimbangkan segmen di antara queryNode      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentCountMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.segmentCountMaxSteps</code><button data-href="#queryCoordsegmentCountMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentCountMaxSteps">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        langkah maksimum pembuat rencana berdasarkan jumlah segmen      </td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrowCountMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.rowCountMaxSteps</code><button data-href="#queryCoordrowCountMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.rowCountMaxSteps">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        langkah maksimum generator rencana berdasarkan jumlah segmen      </td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrandomMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.randomMaxSteps</code><button data-href="#queryCoordrandomMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.randomMaxSteps">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        langkah maksimum generator rencana berdasarkan jumlah segmen      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrowingRowCountWeight" class="common-anchor-header"><code translate="no">queryCoord.growingRowCountWeight</code><button data-href="#queryCoordgrowingRowCountWeight" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.growingRowCountWeight">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bobot memori dari jumlah baris segmen yang bertambah      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoorddelegatorMemoryOverloadFactor" class="common-anchor-header"><code translate="no">queryCoord.delegatorMemoryOverloadFactor</code><button data-href="#queryCoorddelegatorMemoryOverloadFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.delegatorMemoryOverloadFactor">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        faktor memori delegator yang kelebihan beban     </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalanceCostThreshold" class="common-anchor-header"><code translate="no">queryCoord.balanceCostThreshold</code><button data-href="#queryCoordbalanceCostThreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balanceCostThreshold">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ambang batas biaya keseimbangan, jika selisih biaya cluster setelah mengeksekusi rencana keseimbangan kurang dari nilai ini, rencana tidak akan dieksekusi      </td>
      <td>0.001</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordchannelTaskTimeout" class="common-anchor-header"><code translate="no">queryCoord.channelTaskTimeout</code><button data-href="#queryCoordchannelTaskTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.channelTaskTimeout">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        1 menit     </td>
      <td>60000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentTaskTimeout" class="common-anchor-header"><code translate="no">queryCoord.segmentTaskTimeout</code><button data-href="#queryCoordsegmentTaskTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentTaskTimeout">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        2 menit     </td>
      <td>120000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordheartbeatAvailableInterval" class="common-anchor-header"><code translate="no">queryCoord.heartbeatAvailableInterval</code><button data-href="#queryCoordheartbeatAvailableInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.heartbeatAvailableInterval">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        10s, Hanya QueryNode yang mengambil detak jantung dalam durasi tersebut yang tersedia      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoorddistRequestTimeout" class="common-anchor-header"><code translate="no">queryCoord.distRequestTimeout</code><button data-href="#queryCoorddistRequestTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.distRequestTimeout">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        batas waktu permintaan untuk querycoord yang mengambil distribusi data dari querynode, dalam milidetik      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordheatbeatWarningLag" class="common-anchor-header"><code translate="no">queryCoord.heatbeatWarningLag</code><button data-href="#queryCoordheatbeatWarningLag" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.heatbeatWarningLag">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nilai jeda untuk peringatan laporan querycoord ketika heatbeat terakhir terlalu lama, dalam milidetik      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckHealthInterval" class="common-anchor-header"><code translate="no">queryCoord.checkHealthInterval</code><button data-href="#queryCoordcheckHealthInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkHealthInterval">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        3s, interval ketika koordin kueri mencoba memeriksa kesehatan simpul kueri     </td>
      <td>3000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckHealthRPCTimeout" class="common-anchor-header"><code translate="no">queryCoord.checkHealthRPCTimeout</code><button data-href="#queryCoordcheckHealthRPCTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkHealthRPCTimeout">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        100ms, batas waktu untuk memeriksa kesehatan rpc ke node kueri     </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbrokerTimeout" class="common-anchor-header"><code translate="no">queryCoord.brokerTimeout</code><button data-href="#queryCoordbrokerTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.brokerTimeout">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5000ms, batas waktu rpc broker querycoord      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcollectionRecoverTimes" class="common-anchor-header"><code translate="no">queryCoord.collectionRecoverTimes</code><button data-href="#queryCoordcollectionRecoverTimes" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.collectionRecoverTimes">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        jika waktu pemulihan koleksi mencapai batas selama status pemuatan, lepaskan      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordobserverTaskParallel" class="common-anchor-header"><code translate="no">queryCoord.observerTaskParallel</code><button data-href="#queryCoordobserverTaskParallel" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.observerTaskParallel">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nomor tugas dispatcher pengamat paralel      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckAutoBalanceConfigInterval" class="common-anchor-header"><code translate="no">queryCoord.checkAutoBalanceConfigInterval</code><button data-href="#queryCoordcheckAutoBalanceConfigInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkAutoBalanceConfigInterval">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        interval pemeriksaan konfigurasi keseimbangan otomatis      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckNodeSessionInterval" class="common-anchor-header"><code translate="no">queryCoord.checkNodeSessionInterval</code><button data-href="#queryCoordcheckNodeSessionInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkNodeSessionInterval">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        interval (dalam detik) pemeriksaan sesi klaster kueri simpul      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgracefulStopTimeout" class="common-anchor-header"><code translate="no">queryCoord.gracefulStopTimeout</code><button data-href="#queryCoordgracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        detik. paksa hentikan simpul tanpa penghentian secara halus     </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordenableStoppingBalance" class="common-anchor-header"><code translate="no">queryCoord.enableStoppingBalance</code><button data-href="#queryCoordenableStoppingBalance" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.enableStoppingBalance">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        apakah mengaktifkan penghentian saldo     </td>
      <td>benar</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordchannelExclusiveNodeFactor" class="common-anchor-header"><code translate="no">queryCoord.channelExclusiveNodeFactor</code><button data-href="#queryCoordchannelExclusiveNodeFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.channelExclusiveNodeFactor">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nomor simpul paling sedikit untuk mengaktifkan mode eksklusif saluran      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcollectionObserverInterval" class="common-anchor-header"><code translate="no">queryCoord.collectionObserverInterval</code><button data-href="#queryCoordcollectionObserverInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.collectionObserverInterval">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        interval pengamat pengumpulan      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckExecutedFlagInterval" class="common-anchor-header"><code translate="no">queryCoord.checkExecutedFlagInterval</code><button data-href="#queryCoordcheckExecutedFlagInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkExecutedFlagInterval">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        interval pemeriksaan yang dieksekusi flag untuk memaksa menarik dist    </td>
      <td>100</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordupdateCollectionLoadStatusInterval" class="common-anchor-header"><code translate="no">queryCoord.updateCollectionLoadStatusInterval</code><button data-href="#queryCoordupdateCollectionLoadStatusInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.updateCollectionLoadStatusInterval">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5m, interval maksimum untuk memperbarui status koleksi yang dimuat      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcleanExcludeSegmentInterval" class="common-anchor-header"><code translate="no">queryCoord.cleanExcludeSegmentInterval</code><button data-href="#queryCoordcleanExcludeSegmentInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.cleanExcludeSegmentInterval">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        durasi waktu untuk membersihkan segmen pengecualian pipa yang digunakan untuk menyaring data yang tidak valid, dalam detik     </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordip" class="common-anchor-header"><code translate="no">queryCoord.ip</code><button data-href="#queryCoordip" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.ip">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Alamat TCP/IP dari queryCoord. Jika tidak ditentukan, gunakan alamat pertama yang dapat di-unicast      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordport" class="common-anchor-header"><code translate="no">queryCoord.port</code><button data-href="#queryCoordport" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.port">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Port TCP dari queryCoord      </td>
      <td>19531</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.serverMaxSendSize</code><button data-href="#queryCoordgrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ukuran maksimum setiap permintaan RPC yang dapat dikirim oleh queryCoord, satuan: byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.serverMaxRecvSize</code><button data-href="#queryCoordgrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ukuran maksimum setiap permintaan RPC yang dapat diterima oleh queryCoord, satuan: byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.clientMaxSendSize</code><button data-href="#queryCoordgrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ukuran maksimum setiap permintaan RPC yang dapat dikirim oleh klien di queryCoord, satuan: byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.clientMaxRecvSize</code><button data-href="#queryCoordgrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ukuran maksimum setiap permintaan RPC yang dapat diterima oleh klien di queryCoord, satuan: byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
