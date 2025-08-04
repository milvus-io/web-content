---
id: configure_querynode.md
related_key: configure
group: system_configuration.md
summary: 'Erfahren Sie, wie Sie queryNode für Milvus konfigurieren.'
---
<h1 id="queryNode-related-Configurations" class="common-anchor-header">queryNode-bezogene Konfigurationen<button data-href="#queryNode-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwandte Konfigurationen von queryNode, die zur Durchführung einer hybriden Suche zwischen Vektor- und Skalardaten verwendet werden.</p>
<h2 id="queryNodestatspublishInterval" class="common-anchor-header"><code translate="no">queryNode.stats.publishInterval</code><button data-href="#queryNodestatspublishInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.stats.publishInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Intervall, in dem der Abfrageknoten die Knotenstatistikinformationen veröffentlicht, einschließlich Segmentstatus, CPU-Nutzung, Speichernutzung, Gesundheitsstatus usw. Einheit: ms.      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreknowhereThreadPoolNumRatio" class="common-anchor-header"><code translate="no">queryNode.segcore.knowhereThreadPoolNumRatio</code><button data-href="#queryNodesegcoreknowhereThreadPoolNumRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.knowhereThreadPoolNumRatio">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Anzahl der Threads im Thread-Pool von knowhere. Wenn Disk aktiviert ist, wird die Poolgröße mit knowhereThreadPoolNumRatio([1, 32]) multipliziert.      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcorechunkRows" class="common-anchor-header"><code translate="no">queryNode.segcore.chunkRows</code><button data-href="#queryNodesegcorechunkRows" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.chunkRows">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Zeilenzahl, mit der Segcore ein Segment in Chunks unterteilt.      </td>
      <td>128</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexenableIndex" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.enableIndex</code><button data-href="#queryNodesegcoreinterimIndexenableIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.enableIndex">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Ob ein temporärer Index für wachsende Segmente und versiegelte Segmente, die noch nicht indiziert sind, erstellt werden soll, um die Suchleistung zu verbessern.</li>      
        <li>Milvus wird schließlich alle Segmente versiegeln und indizieren, aber die Aktivierung dieser Option optimiert die Suchleistung für unmittelbare Abfragen nach dem Einfügen von Daten.</li>      
        <li>Der Standardwert ist true, was anzeigt, dass Milvus einen temporären Index für wachsende Segmente und versiegelte Segmente erstellt, die bei der Suche nicht indiziert werden.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexnlist" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.nlist</code><button data-href="#queryNodesegcoreinterimIndexnlist" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.nlist">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        temporärer Index nlist, es wird empfohlen, sqrt(chunkRows) zu setzen, muss kleiner als chunkRows/8 sein    </td>
      <td>128</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexnprobe" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.nprobe</code><button data-href="#queryNodesegcoreinterimIndexnprobe" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.nprobe">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nprobe, um einen kleinen Index zu suchen, basierend auf Ihren Genauigkeitsanforderungen, muss kleiner als nlist sein    </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexmemExpansionRate" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.memExpansionRate</code><button data-href="#queryNodesegcoreinterimIndexmemExpansionRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.memExpansionRate">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        zusätzlicher Speicherbedarf für den Aufbau eines Zwischenindex      </td>
      <td>1.15</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreinterimIndexbuildParallelRate" class="common-anchor-header"><code translate="no">queryNode.segcore.interimIndex.buildParallelRate</code><button data-href="#queryNodesegcoreinterimIndexbuildParallelRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.interimIndex.buildParallelRate">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        das Verhältnis zwischen dem parallelen Aufbau des Zwischenindex und der CPU-Zahl      </td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoremultipleChunkedEnable" class="common-anchor-header"><code translate="no">queryNode.segcore.multipleChunkedEnable</code><button data-href="#queryNodesegcoremultipleChunkedEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.multipleChunkedEnable">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Aktivieren der Mehrfach-Chunked-Suche      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodesegcoreknowhereScoreConsistency" class="common-anchor-header"><code translate="no">queryNode.segcore.knowhereScoreConsistency</code><button data-href="#queryNodesegcoreknowhereScoreConsistency" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.segcore.knowhereScoreConsistency">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Logik für die Berechnung der starken Konsistenzbewertung von Knowhere einschalten      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeloadMemoryUsageFactor" class="common-anchor-header"><code translate="no">queryNode.loadMemoryUsageFactor</code><button data-href="#queryNodeloadMemoryUsageFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.loadMemoryUsageFactor">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Der Multiplikationsfaktor für die Berechnung des Speicherverbrauchs beim Laden von Segmenten      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeenableDisk" class="common-anchor-header"><code translate="no">queryNode.enableDisk</code><button data-href="#queryNodeenableDisk" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.enableDisk">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        enable querynode load disk index, and search on disk index     </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodecachememoryLimit" class="common-anchor-header"><code translate="no">queryNode.cache.memoryLimit</code><button data-href="#queryNodecachememoryLimit" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.cache.memoryLimit">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        2 GB, 2 * 1024 *1024 *1024     </td>
      <td>2147483648</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodecachereadAheadPolicy" class="common-anchor-header"><code translate="no">queryNode.cache.readAheadPolicy</code><button data-href="#queryNodecachereadAheadPolicy" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.cache.readAheadPolicy">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Vorauslese-Richtlinie des Chunk-Cache, Optionen: `normal, random, sequentiell, willneed, dontneed`      </td>
      <td>willneed</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodecachewarmup" class="common-anchor-header"><code translate="no">queryNode.cache.warmup</code><button data-href="#queryNodecachewarmup" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.cache.warmup">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Optionen: async, sync, disable. </li>      
        <li>Gibt die Notwendigkeit des Aufwärmens des Chunk-Cache an. </li>      
        <li>1. Wenn auf "sync" oder "async" gesetzt, werden die ursprünglichen Vektordaten während des Ladevorgangs synchron/asynchron in den </li>      
        <li>Chunk-Cache während des Ladevorgangs geladen. Dieser Ansatz hat das Potenzial, die Abfrage-/Suchlatenz</li>      
        <li>für eine bestimmte Dauer nach dem Laden erheblich zu reduzieren, auch wenn dies mit einem gleichzeitigen Anstieg der Festplattennutzung einhergeht;</li>      
        <li>2. Bei der Einstellung "disable" werden die ursprünglichen Vektordaten nur während der Suche/Abfrage in den Chunk-Cache geladen.</li>      </td>
      <td>deaktivieren</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapvectorField" class="common-anchor-header"><code translate="no">queryNode.mmap.vectorField</code><button data-href="#queryNodemmapvectorField" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.vectorField">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        mmap zum Laden von Vektordaten einschalten      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapvectorIndex" class="common-anchor-header"><code translate="no">queryNode.mmap.vectorIndex</code><button data-href="#queryNodemmapvectorIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.vectorIndex">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        mmap für das Laden des Vektorindexes einschalten      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapscalarField" class="common-anchor-header"><code translate="no">queryNode.mmap.scalarField</code><button data-href="#queryNodemmapscalarField" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.scalarField">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        mmap für das Laden skalarer Daten einschalten      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapscalarIndex" class="common-anchor-header"><code translate="no">queryNode.mmap.scalarIndex</code><button data-href="#queryNodemmapscalarIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.scalarIndex">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        mmap für das Laden von skalaren Indizes einschalten      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapchunkCache" class="common-anchor-header"><code translate="no">queryNode.mmap.chunkCache</code><button data-href="#queryNodemmapchunkCache" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.chunkCache">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Aktiviert mmap für Chunk-Cache (Abrufen von Rohvektoren).      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapgrowingMmapEnabled" class="common-anchor-header"><code translate="no">queryNode.mmap.growingMmapEnabled</code><button data-href="#queryNodemmapgrowingMmapEnabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.growingMmapEnabled">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Aktiviert die Speicherzuordnung (mmap), um die Handhabung wachsender Rohdaten zu optimieren. </li>      
        <li>Durch die Aktivierung dieser Funktion wird der mit neu hinzugefügten oder geänderten Daten verbundene Speicher-Overhead erheblich minimiert. </li>      
        <li>Diese Optimierung kann jedoch auf Kosten einer leichten Verringerung der Abfragelatenz für die betroffenen Datensegmente gehen.</li>      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapfixedFileSizeForMmapAlloc" class="common-anchor-header"><code translate="no">queryNode.mmap.fixedFileSizeForMmapAlloc</code><button data-href="#queryNodemmapfixedFileSizeForMmapAlloc" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.fixedFileSizeForMmapAlloc">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Größe der tmp-Datei für mmap chunk manager      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodemmapmaxDiskUsagePercentageForMmapAlloc" class="common-anchor-header"><code translate="no">queryNode.mmap.maxDiskUsagePercentageForMmapAlloc</code><button data-href="#queryNodemmapmaxDiskUsagePercentageForMmapAlloc" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.mmap.maxDiskUsagePercentageForMmapAlloc">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Prozentualer Anteil der Festplatte, die im mmap chunk manager verwendet wird    </td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadenabled" class="common-anchor-header"><code translate="no">queryNode.lazyload.enabled</code><button data-href="#queryNodelazyloadenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.enabled">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Lazyload zum Laden von Daten einschalten      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadwaitTimeout" class="common-anchor-header"><code translate="no">queryNode.lazyload.waitTimeout</code><button data-href="#queryNodelazyloadwaitTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.waitTimeout">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max wait timeout Dauer in Millisekunden vor Beginn der Lazyload-Suche und -Abfrage      </td>
      <td>30000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadrequestResourceTimeout" class="common-anchor-header"><code translate="no">queryNode.lazyload.requestResourceTimeout</code><button data-href="#queryNodelazyloadrequestResourceTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.requestResourceTimeout">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max timeout in Millisekunden für das Warten auf die Ressource für lazy load, standardmäßig 5s  </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadrequestResourceRetryInterval" class="common-anchor-header"><code translate="no">queryNode.lazyload.requestResourceRetryInterval</code><button data-href="#queryNodelazyloadrequestResourceRetryInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.requestResourceRetryInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Wiederholungsintervall in Millisekunden für wartende Anforderungsressourcen für träges Laden, Standardwert 2s  </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadmaxRetryTimes" class="common-anchor-header"><code translate="no">queryNode.lazyload.maxRetryTimes</code><button data-href="#queryNodelazyloadmaxRetryTimes" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.maxRetryTimes">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Wiederholungszeiten für träges Laden, standardmäßig 1 </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelazyloadmaxEvictPerRetry" class="common-anchor-header"><code translate="no">queryNode.lazyload.maxEvictPerRetry</code><button data-href="#queryNodelazyloadmaxEvictPerRetry" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.lazyload.maxEvictPerRetry">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max evict count für lazy load, 1 als Voreinstellung      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeindexOffsetCacheEnabled" class="common-anchor-header"><code translate="no">queryNode.indexOffsetCacheEnabled</code><button data-href="#queryNodeindexOffsetCacheEnabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.indexOffsetCacheEnabled">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        enable index offset cache for some scalar indexes, now is just for bitmap index, enable this param can improve performance for retrieving raw data from index     </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulermaxReadConcurrentRatio" class="common-anchor-header"><code translate="no">queryNode.scheduler.maxReadConcurrentRatio</code><button data-href="#queryNodeschedulermaxReadConcurrentRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.maxReadConcurrentRatio">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>maxReadConcurrentRatio ist das Gleichzeitigkeitsverhältnis von Leseaufgaben (Suchaufgaben und Abfrageaufgaben).</li>      
        <li>Die maximale Lesegleichzeitigkeit entspricht dem Wert von hardware.GetCPUNum * maxReadConcurrentRatio.</li>      
        <li>Der Standardwert ist 2,0, d. h. die maximale Gleichzeitigkeit beim Lesen entspricht dem Wert von hardware.GetCPUNum * 2.</li>      
        <li>Die maximale Lesegleichzeitigkeit muss größer als oder gleich 1 und kleiner als oder gleich hardware.GetCPUNum * 100 sein.</li>      
        <li>(0, 100]</li>      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulercpuRatio" class="common-anchor-header"><code translate="no">queryNode.scheduler.cpuRatio</code><button data-href="#queryNodeschedulercpuRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.cpuRatio">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Verhältnis, das zur Schätzung der CPU-Auslastung von Leseaufgaben verwendet wird.      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulerscheduleReadPolicyname" class="common-anchor-header"><code translate="no">queryNode.scheduler.scheduleReadPolicy.name</code><button data-href="#queryNodeschedulerscheduleReadPolicyname" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.scheduleReadPolicy.name">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>fifo: Eine FIFO-Warteschlange unterstützt den Zeitplan.</li>      
        <li>user-task-polling:</li>      
        <li>    Die Aufgaben des Benutzers werden nacheinander abgefragt und eingeplant.</li>      
        <li>    Die Zeitplanung ist fair auf die Granularität der Aufgaben abgestimmt.</li>      
        <li>    Die Richtlinie basiert auf dem Benutzernamen zur Authentifizierung.</li>      
        <li>    Und ein leerer Benutzername wird als derselbe Benutzer betrachtet.</li>      
        <li>    Wenn es keine Mehrfachbenutzer gibt, verfällt die Richtlinie in FIFO"</li>      </td>
      <td>fifo</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulerscheduleReadPolicytaskQueueExpire" class="common-anchor-header"><code translate="no">queryNode.scheduler.scheduleReadPolicy.taskQueueExpire</code><button data-href="#queryNodeschedulerscheduleReadPolicytaskQueueExpire" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.scheduleReadPolicy.taskQueueExpire">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Legt fest, wie lange (viele Sekunden) die Warteschlange nach dem Leeren der Warteschlange verbleibt      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulerscheduleReadPolicyenableCrossUserGrouping" class="common-anchor-header"><code translate="no">queryNode.scheduler.scheduleReadPolicy.enableCrossUserGrouping</code><button data-href="#queryNodeschedulerscheduleReadPolicyenableCrossUserGrouping" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.scheduleReadPolicy.enableCrossUserGrouping">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Aktiviert die benutzerübergreifende Gruppierung bei Verwendung der Richtlinie für die Abfrage von Benutzeraufgaben. (Deaktivieren Sie es, wenn die Aufgaben der Benutzer nicht zusammengeführt werden können)      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeschedulerscheduleReadPolicymaxPendingTaskPerUser" class="common-anchor-header"><code translate="no">queryNode.scheduler.scheduleReadPolicy.maxPendingTaskPerUser</code><button data-href="#queryNodeschedulerscheduleReadPolicymaxPendingTaskPerUser" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.scheduler.scheduleReadPolicy.maxPendingTaskPerUser">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximal ausstehende Aufgaben pro Benutzer im Planer      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodelevelZeroForwardPolicy" class="common-anchor-header"><code translate="no">queryNode.levelZeroForwardPolicy</code><button data-href="#queryNodelevelZeroForwardPolicy" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.levelZeroForwardPolicy">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Delegatorebene Null-Löschung-Weiterleitungsrichtlinie, mögliche Option["FilterByBF", "RemoteLoad"]      </td>
      <td>FilterByBF</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodestreamingDeltaForwardPolicy" class="common-anchor-header"><code translate="no">queryNode.streamingDeltaForwardPolicy</code><button data-href="#queryNodestreamingDeltaForwardPolicy" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.streamingDeltaForwardPolicy">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Delegator Streaming Deletion Forward Policy, mögliche Option["FilterByBF", "Direct"]      </td>
      <td>FilterByBF</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodedataSyncflowGraphmaxQueueLength" class="common-anchor-header"><code translate="no">queryNode.dataSync.flowGraph.maxQueueLength</code><button data-href="#queryNodedataSyncflowGraphmaxQueueLength" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.dataSync.flowGraph.maxQueueLength">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe des Aufgabenwarteschlangen-Cache im Flussdiagramm im Abfrageknoten.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodedataSyncflowGraphmaxParallelism" class="common-anchor-header"><code translate="no">queryNode.dataSync.flowGraph.maxParallelism</code><button data-href="#queryNodedataSyncflowGraphmaxParallelism" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.dataSync.flowGraph.maxParallelism">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Anzahl der parallel ausgeführten Aufgaben im Ablaufdiagramm      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeenableSegmentPrune" class="common-anchor-header"><code translate="no">queryNode.enableSegmentPrune</code><button data-href="#queryNodeenableSegmentPrune" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.enableSegmentPrune">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Partitionsstatistiken verwenden, um Daten in der Suche/Abfrage auf dem Shard-Delegator zu beschneiden      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodequeryStreamBatchSize" class="common-anchor-header"><code translate="no">queryNode.queryStreamBatchSize</code><button data-href="#queryNodequeryStreamBatchSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.queryStreamBatchSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        minimale Stapelgröße der Stream-Abfrage zurückgeben      </td>
      <td>4194304</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodequeryStreamMaxBatchSize" class="common-anchor-header"><code translate="no">queryNode.queryStreamMaxBatchSize</code><button data-href="#queryNodequeryStreamMaxBatchSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.queryStreamMaxBatchSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Rückgabe der maximalen Chargengröße der Stream-Abfrage      </td>
      <td>134217728</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodebloomFilterApplyParallelFactor" class="common-anchor-header"><code translate="no">queryNode.bloomFilterApplyParallelFactor</code><button data-href="#queryNodebloomFilterApplyParallelFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.bloomFilterApplyParallelFactor">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Parallelitätsfaktor bei Anwendung von pk auf Bloom-Filter, Voreinstellung 4*CPU_CORE_NUM      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeworkerPoolingsize" class="common-anchor-header"><code translate="no">queryNode.workerPooling.size</code><button data-href="#queryNodeworkerPoolingsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.workerPooling.size">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        die Größe des Querynode-Client-Pools für Arbeiter      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeip" class="common-anchor-header"><code translate="no">queryNode.ip</code><button data-href="#queryNodeip" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.ip">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP-Adresse des QueryNode. Wenn nicht angegeben, wird die erste unicastbare Adresse verwendet.      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodeport" class="common-anchor-header"><code translate="no">queryNode.port</code><button data-href="#queryNodeport" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.port">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP-Port von queryNode      </td>
      <td>21123</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodegrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">queryNode.grpc.serverMaxSendSize</code><button data-href="#queryNodegrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe jeder RPC-Anfrage, die der queryNode senden kann, Einheit: Byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodegrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">queryNode.grpc.serverMaxRecvSize</code><button data-href="#queryNodegrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe jeder RPC-Anfrage, die der queryNode empfangen kann, Einheit: Byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodegrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">queryNode.grpc.clientMaxSendSize</code><button data-href="#queryNodegrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe jeder RPC-Anfrage, die die Clients auf queryNode senden können, Einheit: Byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryNodegrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">queryNode.grpc.clientMaxRecvSize</code><button data-href="#queryNodegrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryNode.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe jeder RPC-Anfrage, die die Clients auf queryNode empfangen können, Einheit: Byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
