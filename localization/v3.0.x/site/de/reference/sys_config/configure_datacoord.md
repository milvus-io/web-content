---
id: configure_datacoord.md
related_key: configure
group: system_configuration.md
summary: 'Erfahren Sie, wie Sie dataCoord für Milvus konfigurieren.'
---
<h1 id="dataCoord-related-Configurations" class="common-anchor-header">dataCoord-bezogene Konfigurationen<button data-href="#dataCoord-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="dataCoordchannelwatchTimeoutInterval" class="common-anchor-header"><code translate="no">dataCoord.channel.watchTimeoutInterval</code><button data-href="#dataCoordchannelwatchTimeoutInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.watchTimeoutInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Zeitlimit für die Überwachung von Kanälen (in Sekunden). Der Fortschritt der Aktualisierung durch den Datanode-Tickler setzt den Zeitlimit-Timer zurück.      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannellegacyVersionWithoutRPCWatch" class="common-anchor-header"><code translate="no">dataCoord.channel.legacyVersionWithoutRPCWatch</code><button data-href="#dataCoordchannellegacyVersionWithoutRPCWatch" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.legacyVersionWithoutRPCWatch">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Datanodes bis einschließlich dieser Version gelten als Legacy-Knoten, die keine RPC-basierte watch()-Funktion besitzen. Dies wird nur bei einem rollierenden Upgrade verwendet, bei dem Legacy-Knoten keine neuen Kanäle erhalten.      </td>
      <td>2.4.1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelbalanceSilentDuration" class="common-anchor-header"><code translate="no">dataCoord.channel.balanceSilentDuration</code><button data-href="#dataCoordchannelbalanceSilentDuration" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.balanceSilentDuration">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Zeitspanne, nach der der Kanalmanager mit dem Kanalausgleich im Hintergrund beginnt      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelbalanceInterval" class="common-anchor-header"><code translate="no">dataCoord.channel.balanceInterval</code><button data-href="#dataCoordchannelbalanceInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.balanceInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Intervall, in dem der Kanalmanager den Status der DML-Kanalauslastung überprüft      </td>
      <td>360</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelcheckInterval" class="common-anchor-header"><code translate="no">dataCoord.channel.checkInterval</code><button data-href="#dataCoordchannelcheckInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.checkInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Intervall in Sekunden, in dem der Kanalmanager die Kanalzustände aktualisiert      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelnotifyChannelOperationTimeout" class="common-anchor-header"><code translate="no">dataCoord.channel.notifyChannelOperationTimeout</code><button data-href="#dataCoordchannelnotifyChannelOperationTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.notifyChannelOperationTimeout">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Zeitlimit für die Benachrichtigung über Kanalvorgänge (in Sekunden).      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentmaxSize" class="common-anchor-header"><code translate="no">dataCoord.segment.maxSize</code><button data-href="#dataCoordsegmentmaxSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.maxSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe eines Segments, Einheit: MB. datacoord.segment.maxSize und datacoord.segment.sealProportion bestimmen gemeinsam, ob ein Segment versiegelt werden kann.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentdiskSegmentMaxSize" class="common-anchor-header"><code translate="no">dataCoord.segment.diskSegmentMaxSize</code><button data-href="#dataCoordsegmentdiskSegmentMaxSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.diskSegmentMaxSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Größe eines Segments in MB für eine Sammlung mit Festplattenindex      </td>
      <td>2048</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentsealProportion" class="common-anchor-header"><code translate="no">dataCoord.segment.sealProportion</code><button data-href="#dataCoordsegmentsealProportion" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.sealProportion">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Der Mindestanteil an datacoord.segment.maxSize, um ein Segment zu versiegeln. datacoord.segment.maxSize und datacoord.segment.sealProportion bestimmen gemeinsam, ob ein Segment versiegelt werden kann.      </td>
      <td>0,12</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentsealProportionJitter" class="common-anchor-header"><code translate="no">dataCoord.segment.sealProportionJitter</code><button data-href="#dataCoordsegmentsealProportionJitter" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.sealProportionJitter">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Jitter-Verhältnis für den Segment-Seal-Anteil, Standardwert 0,1 (10 %); wenn der Seal-Anteil 12 % beträgt und jitter = 0,1 ist, liegt das tatsächlich angewendete Verhältnis zwischen 10,8 und 12 %      </td>
      <td>0,1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentassignmentExpiration" class="common-anchor-header"><code translate="no">dataCoord.segment.assignmentExpiration</code><button data-href="#dataCoordsegmentassignmentExpiration" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.assignmentExpiration">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ablaufzeit der Segmentzuweisung, Einheit: ms      </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentallocLatestExpireAttempt" class="common-anchor-header"><code translate="no">dataCoord.segment.allocLatestExpireAttempt</code><button data-href="#dataCoordsegmentallocLatestExpireAttempt" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.allocLatestExpireAttempt">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Zeit, nach der nach einem Neustart versucht wird, den neuesten „lastExpire“-Wert aus „rootCoord“ zuzuweisen      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentmaxLife" class="common-anchor-header"><code translate="no">dataCoord.segment.maxLife</code><button data-href="#dataCoordsegmentmaxLife" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.maxLife">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Lebensdauer eines Segments in Sekunden: 24 × 60 × 60      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentmaxIdleTime" class="common-anchor-header"><code translate="no">dataCoord.segment.maxIdleTime</code><button data-href="#dataCoordsegmentmaxIdleTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.maxIdleTime">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Wenn ein Segment innerhalb von „maxIdleTime“ keine DML-Datensätze akzeptiert hat und die Größe des Segments größer ist als</li>      
        <li>minSizeFromIdleToSealed ist, versiegelt Milvus es automatisch.</li>      
        <li>Die maximale Leerlaufzeit des Segments in Sekunden, 10*60.</li>      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentminSizeFromIdleToSealed" class="common-anchor-header"><code translate="no">dataCoord.segment.minSizeFromIdleToSealed</code><button data-href="#dataCoordsegmentminSizeFromIdleToSealed" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.minSizeFromIdleToSealed">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Mindestgröße des Segments in MB, ab der es von „Sealed“ in den Leerlauf versetzt werden kann.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentmaxBinlogFileNumber" class="common-anchor-header"><code translate="no">dataCoord.segment.maxBinlogFileNumber</code><button data-href="#dataCoordsegmentmaxBinlogFileNumber" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.maxBinlogFileNumber">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Die maximale Anzahl an Binlogs (die der Anzahl der Binlog-Dateien des Primärschlüssels entspricht) für ein Segment; </li>      
        <li>wird das Segment versiegelt, sobald die Anzahl der Binlog-Dateien den Maximalwert erreicht.</li>      </td>
      <td>32</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentsmallProportion" class="common-anchor-header"><code translate="no">dataCoord.segment.smallProportion</code><button data-href="#dataCoordsegmentsmallProportion" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.smallProportion">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Segment gilt als „kleines Segment“, wenn seine Zeilenanzahl kleiner ist als      </td>
      <td>0,5</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentcompactableProportion" class="common-anchor-header"><code translate="no">dataCoord.segment.compactableProportion</code><button data-href="#dataCoordsegmentcompactableProportion" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.compactableProportion">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>(smallProportion * maximale Zeilenanzahl des Segments).</li>      
        <li>Bei kleinen Segmenten erfolgt eine Komprimierung, wenn das Segment nach der Komprimierung</li>      </td>
      <td>0,85</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentexpansionRate" class="common-anchor-header"><code translate="no">dataCoord.segment.expansionRate</code><button data-href="#dataCoordsegmentexpansionRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.expansionRate">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>über (kompaktierbarer Anteil * maximale Zeilenzahl des Segments) Zeilen.</li>      
        <li>MUSS GRÖSSER ODER GLEICH <smallProportion> SEIN !!!</li>      
        <li>Während der Komprimierung kann die Anzahl der Zeilen im Segment die maximale Zeilenanzahl des Segments um (expansionRate-1) * 100 % überschreiten. </li>      </td>
      <td>1,25</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsealPolicychannelgrowingSegmentsMemSize" class="common-anchor-header"><code translate="no">dataCoord.sealPolicy.channel.growingSegmentsMemSize</code><button data-href="#dataCoordsealPolicychannelgrowingSegmentsMemSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.sealPolicy.channel.growingSegmentsMemSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Der Schwellenwert für die Größe in MB; wenn die Gesamtgröße der wachsenden Segmente jedes Shards </li>      
        <li>diesen Schwellenwert überschreitet, wird das größte wachsende Segment versiegelt.</li>      </td>
      <td>4096</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordautoUpgradeSegmentIndex" class="common-anchor-header"><code translate="no">dataCoord.autoUpgradeSegmentIndex</code><button data-href="#dataCoordautoUpgradeSegmentIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.autoUpgradeSegmentIndex">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Gibt an, ob der Segmentindex automatisch auf die Version der Index-Engine aktualisiert werden soll      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentFlushInterval" class="common-anchor-header"><code translate="no">dataCoord.segmentFlushInterval</code><button data-href="#dataCoordsegmentFlushInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segmentFlushInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die minimale Intervalldauer (Einheit: Sekunden) zwischen Flushing-Vorgängen für dasselbe Segment      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordenableCompaction" class="common-anchor-header"><code translate="no">dataCoord.enableCompaction</code><button data-href="#dataCoordenableCompaction" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.enableCompaction">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Schalterwert zur Steuerung, ob die Segmentkomprimierung aktiviert werden soll. </li>      
        <li>Bei der Komprimierung werden kleine Segmente zu einem großen Segment zusammengeführt, und die Entitäten, die nach Ablauf der Aufbewahrungsdauer von „Time Travel“ gelöscht wurden, werden entfernt.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionenableAutoCompaction" class="common-anchor-header"><code translate="no">dataCoord.compaction.enableAutoCompaction</code><button data-href="#dataCoordcompactionenableAutoCompaction" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.enableAutoCompaction">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Schalterwert zur Steuerung, ob die automatische Segmentverdichtung aktiviert werden soll, bei der data coord im Hintergrund verdichtbare Segmente ermittelt und zusammenführt.</li>      
        <li>Diese Konfiguration wird nur wirksam, wenn „dataCoord.enableCompaction“ auf „true“ gesetzt ist.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionstorageVersionenabled" class="common-anchor-header"><code translate="no">dataCoord.compaction.storageVersion.enabled</code><button data-href="#dataCoordcompactionstorageVersionenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.storageVersion.enabled">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Gibt an, ob bei der Komprimierung in Frage kommende vorhandene Daten in die aktuelle Speicherversion überschrieben werden dürfen. Dieser Parameter kann aktualisiert werden.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionbumpSchemaVersionenabled" class="common-anchor-header"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code><button data-href="#dataCoordcompactionbumpSchemaVersionenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.bumpSchemaVersion.enabled">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Gibt an, ob die Komprimierung Änderungen an der Schemaversion auf vorhandene Daten anwenden darf, einschließlich der Nachvervollständigung für Felder, die durch eine neu hinzugefügte Funktion generiert wurden. Dieser Parameter kann aktualisiert werden.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactiontaskPrioritizer" class="common-anchor-header"><code translate="no">dataCoord.compaction.taskPrioritizer</code><button data-href="#dataCoordcompactiontaskPrioritizer" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.taskPrioritizer">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Priorisierungsmechanismus für Komprimierungsaufgaben, Optionen: [default, level, mix]. </li>      
        <li>„default“ entspricht FIFO.</li>      
        <li>„level“ priorisiert nach Level: zuerst L0-Kompaktierungen, dann „mix“-Kompaktierungen, dann Clustering-Kompaktierungen.</li>      
        <li>„mix“ priorisiert nach Level: zuerst „mix“-Komprimierungen, dann L0-Komprimierungen, dann Clustering-Komprimierungen.</li>      </td>
      <td>Standard</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactiontaskQueueCapacity" class="common-anchor-header"><code translate="no">dataCoord.compaction.taskQueueCapacity</code><button data-href="#dataCoordcompactiontaskQueueCapacity" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.taskQueueCapacity">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Größe der Komprimierungsaufgabenwarteschlange      </td>
      <td>100000</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactiondropTolerance" class="common-anchor-header"><code translate="no">dataCoord.compaction.dropTolerance</code><button data-href="#dataCoordcompactiondropTolerance" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.dropTolerance">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Verdichtungsaufgaben werden nach Ablauf dieser Zeit (in Sekunden) gelöscht      </td>
      <td>86.400</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactiongcInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.gcInterval</code><button data-href="#dataCoordcompactiongcInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.gcInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Zeitintervall in Sekunden für die Garbage Collection bei der Komprimierung      </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionmixtriggerInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.mix.triggerInterval</code><button data-href="#dataCoordcompactionmixtriggerInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.mix.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Zeitintervall in Sekunden, nach dem die Mischverdichtung ausgelöst wird      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzerotriggerInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.triggerInterval</code><button data-href="#dataCoordcompactionlevelzerotriggerInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Zeitintervall in Sekunden zum Auslösen der L0-Verdichtung      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzeroforceTriggerminSize" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.forceTrigger.minSize</code><button data-href="#dataCoordcompactionlevelzeroforceTriggerminSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.forceTrigger.minSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Mindestgröße in Byte, bei deren Erreichen eine Level-Zero-Kompaktierung erzwungen wird; Standardwert ist 8 MB      </td>
      <td>8388608</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzeroforceTriggermaxSize" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.forceTrigger.maxSize</code><button data-href="#dataCoordcompactionlevelzeroforceTriggermaxSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.forceTrigger.maxSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe in Byte, bei deren Erreichen eine LevelZero-Komprimierung erzwungen wird; Standardwert: 64 MB      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzeroforceTriggerdeltalogMinNum" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.forceTrigger.deltalogMinNum</code><button data-href="#dataCoordcompactionlevelzeroforceTriggerdeltalogMinNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.forceTrigger.deltalogMinNum">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Mindestanzahl an Deltalog-Dateien, um eine LevelZero-Komprimierung zu erzwingen      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzeroforceTriggerdeltalogMaxNum" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.forceTrigger.deltalogMaxNum</code><button data-href="#dataCoordcompactionlevelzeroforceTriggerdeltalogMaxNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.forceTrigger.deltalogMaxNum">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Anzahl an Deltalog-Dateien, bei deren Erreichen eine LevelZero-Komprimierung erzwungen wird; Standardwert ist 30      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionsingleratiothreshold" class="common-anchor-header"><code translate="no">dataCoord.compaction.single.ratio.threshold</code><button data-href="#dataCoordcompactionsingleratiothreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.single.ratio.threshold">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Der Schwellenwert für das Verhältnis eines Segments, bei dessen Überschreitung eine einzelne Komprimierung ausgelöst wird; Standardwert ist 0,2      </td>
      <td>0,2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionsingledeltalogmaxsize" class="common-anchor-header"><code translate="no">dataCoord.compaction.single.deltalog.maxsize</code><button data-href="#dataCoordcompactionsingledeltalogmaxsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.single.deltalog.maxsize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Größe des Deltalogs eines Segments, bei der eine einzelne Komprimierung ausgelöst wird; Standardwert: 16 MB      </td>
      <td>16777216</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionsingledeltalogmaxnum" class="common-anchor-header"><code translate="no">dataCoord.compaction.single.deltalog.maxnum</code><button data-href="#dataCoordcompactionsingledeltalogmaxnum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.single.deltalog.maxnum">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Anzahl der Deltalogs eines Segments, die eine Komprimierung auslösen; Standardwert ist 200      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionsingleexpiredlogmaxsize" class="common-anchor-header"><code translate="no">dataCoord.compaction.single.expiredlog.maxsize</code><button data-href="#dataCoordcompactionsingleexpiredlogmaxsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.single.expiredlog.maxsize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Größe des abgelaufenen Protokolls eines Segments, bei der eine Komprimierung ausgelöst wird; Standardwert: 10 MB      </td>
      <td>10485760</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringenable" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.enable</code><button data-href="#dataCoordcompactionclusteringenable" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.enable">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Cluster-Verdichtung aktivieren      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringautoEnable" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.autoEnable</code><button data-href="#dataCoordcompactionclusteringautoEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.autoEnable">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Automatische Cluster-Kompaktierung aktivieren      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringtriggerInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.triggerInterval</code><button data-href="#dataCoordcompactionclusteringtriggerInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervall für den Clustering-Kompaktierungs-Trigger in Sekunden      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringminInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.minInterval</code><button data-href="#dataCoordcompactionclusteringminInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.minInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Mindestintervall zwischen den Ausführungen der Clustering-Kompaktierung einer Sammlung, um redundante Kompaktierungen zu vermeiden      </td>
      <td>3600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxInterval</code><button data-href="#dataCoordcompactionclusteringmaxInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Wenn eine Sammlung länger als „maxInterval“ nicht durch Clustering-Kompaktierung komprimiert wurde, wird die Kompaktierung erzwungen      </td>
      <td>259200</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringnewDataSizeThreshold" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.newDataSizeThreshold</code><button data-href="#dataCoordcompactionclusteringnewDataSizeThreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.newDataSizeThreshold">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Wenn die Größe der neuen Daten größer als newDataSizeThreshold ist, führen Sie eine Cluster-Kompaktierung durch      </td>
      <td>512 m</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxTrainSizeRatio" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxTrainSizeRatio</code><button data-href="#dataCoordcompactionclusteringmaxTrainSizeRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxTrainSizeRatio">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximales Datengrößenverhältnis beim K-Means-Training; wird dieser Wert überschritten, erfolgt ein Downsampling, um diese Grenze einzuhalten      </td>
      <td>0,8</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxCentroidsNum" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxCentroidsNum</code><button data-href="#dataCoordcompactionclusteringmaxCentroidsNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxCentroidsNum">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Anzahl von Zentren im K-Means-Training      </td>
      <td>10240</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringminCentroidsNum" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.minCentroidsNum</code><button data-href="#dataCoordcompactionclusteringminCentroidsNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.minCentroidsNum">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Mindestanzahl der Zentren im K-Means-Training      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringminClusterSizeRatio" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.minClusterSizeRatio</code><button data-href="#dataCoordcompactionclusteringminClusterSizeRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.minClusterSizeRatio">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Mindestclustergröße / durchschnittliche Clustergröße im K-Means-Training      </td>
      <td>0,01</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxClusterSizeRatio" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxClusterSizeRatio</code><button data-href="#dataCoordcompactionclusteringmaxClusterSizeRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxClusterSizeRatio">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Clustergröße / durchschnittliche Größe im K-Means-Training      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxClusterSize" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxClusterSize</code><button data-href="#dataCoordcompactionclusteringmaxClusterSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxClusterSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Clustergröße im K-Means-Training      </td>
      <td>5g</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsyncSegmentsInterval" class="common-anchor-header"><code translate="no">dataCoord.syncSegmentsInterval</code><button data-href="#dataCoordsyncSegmentsInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.syncSegmentsInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Zeitintervall für die regelmäßige Synchronisierung von Segmenten      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordindexmemSizeEstimateMultiplier" class="common-anchor-header"><code translate="no">dataCoord.index.memSizeEstimateMultiplier</code><button data-href="#dataCoordindexmemSizeEstimateMultiplier" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.index.memSizeEstimateMultiplier">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Wenn die Speichergröße nicht durch die Indexprozedur festgelegt wird, Multiplikator zur Schätzung der Speichergröße der Indexdaten      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordenableGarbageCollection" class="common-anchor-header"><code translate="no">dataCoord.enableGarbageCollection</code><button data-href="#dataCoordenableGarbageCollection" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.enableGarbageCollection">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Schalterwert zur Steuerung, ob die Garbage Collection aktiviert werden soll, um veraltete Daten im MinIO- oder S3-Dienst zu löschen.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcinterval" class="common-anchor-header"><code translate="no">dataCoord.gc.interval</code><button data-href="#dataCoordgcinterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.interval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Intervall, in dem data coord die Garbage Collection durchführt, Einheit: Sekunde.      </td>
      <td>3600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcmissingTolerance" class="common-anchor-header"><code translate="no">dataCoord.gc.missingTolerance</code><button data-href="#dataCoordgcmissingTolerance" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.missingTolerance">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Aufbewahrungsdauer der noch nicht aufgezeichneten Binärprotokoll-Dateien (Binlog-Dateien). Durch die Einstellung eines angemessen großen Werts für diesen Parameter wird vermieden, dass neu erstellte Binlog-Dateien, denen Metadaten fehlen, fälschlicherweise gelöscht werden. Einheit: Sekunden.      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcdropTolerance" class="common-anchor-header"><code translate="no">dataCoord.gc.dropTolerance</code><button data-href="#dataCoordgcdropTolerance" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.dropTolerance">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Aufbewahrungsdauer der Binlog-Dateien der gelöschten Segmente, bevor diese gelöscht werden; Einheit: Sekunden.      </td>
      <td>10800</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcremoveConcurrent" class="common-anchor-header"><code translate="no">dataCoord.gc.removeConcurrent</code><button data-href="#dataCoordgcremoveConcurrent" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.removeConcurrent">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Anzahl der gleichzeitig laufenden Goroutinen zum Entfernen gelöschter S3-Objekte      </td>
      <td>32</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcscanInterval" class="common-anchor-header"><code translate="no">dataCoord.gc.scanInterval</code><button data-href="#dataCoordgcscanInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.scanInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervall in Stunden für das Scannen auf verwaiste Dateien (Dateien, die auf OSS vorhanden sind, aber nicht in der Metadaten-Datenbank registriert wurden) im Rahmen der Garbage Collection des Objektspeichers      </td>
      <td>168</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgclobenabled" class="common-anchor-header"><code translate="no">dataCoord.gc.lob.enabled</code><button data-href="#dataCoordgclobenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.lob.enabled">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Gibt an, ob die Garbage Collection für nicht referenzierte LOB-Dateien aktiviert werden soll, die für TEXT-Feldwerte erstellt wurden.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgclobsafetyWindow" class="common-anchor-header"><code translate="no">dataCoord.gc.lob.safetyWindow</code><button data-href="#dataCoordgclobsafetyWindow" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.lob.safetyWindow">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Mindestalter in Sekunden, das eine nicht referenzierte TEXT-LOB-Datei erreichen muss, bevor sie durch die Garbage Collection gelöscht werden kann.      </td>
      <td>3600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgclobcheckInterval" class="common-anchor-header"><code translate="no">dataCoord.gc.lob.checkInterval</code><button data-href="#dataCoordgclobcheckInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.lob.checkInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Intervall in Sekunden, in dem Milvus den Speicher nach nicht referenzierten LOB-Dateien durchsucht, die für TEXT-Feldwerte erstellt wurden.      </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordbrokerTimeout" class="common-anchor-header"><code translate="no">dataCoord.brokerTimeout</code><button data-href="#dataCoordbrokerTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.brokerTimeout">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5000 ms, RPC-Timeout des dataCoord-Brokers      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordautoBalance" class="common-anchor-header"><code translate="no">dataCoord.autoBalance</code><button data-href="#dataCoordautoBalance" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.autoBalance">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Automatischen Ausgleich aktivieren      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcheckAutoBalanceConfigInterval" class="common-anchor-header"><code translate="no">dataCoord.checkAutoBalanceConfigInterval</code><button data-href="#dataCoordcheckAutoBalanceConfigInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.checkAutoBalanceConfigInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervall für die Überprüfung der Konfiguration des automatischen Ausgleichs      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportfilesPerPreImportTask" class="common-anchor-header"><code translate="no">dataCoord.import.filesPerPreImportTask</code><button data-href="#dataCoordimportfilesPerPreImportTask" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.filesPerPreImportTask">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximal zulässige Anzahl von Dateien pro Vorimport-Aufgabe.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimporttaskRetention" class="common-anchor-header"><code translate="no">dataCoord.import.taskRetention</code><button data-href="#dataCoordimporttaskRetention" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.taskRetention">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die Aufbewahrungsdauer in Sekunden für Aufgaben im Status „Abgeschlossen“ oder „Fehlgeschlagen“.      </td>
      <td>10800</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportmaxSizeInMBPerImportTask" class="common-anchor-header"><code translate="no">dataCoord.import.maxSizeInMBPerImportTask</code><button data-href="#dataCoordimportmaxSizeInMBPerImportTask" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.maxSizeInMBPerImportTask">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Um die Erzeugung kleiner Segmente zu vermeiden, werden importierte Dateien neu gruppiert. Dieser Parameter gibt die Summe der Dateigrößen in jeder Gruppe (jeder ImportTask) an.      </td>
      <td>6144</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportscheduleInterval" class="common-anchor-header"><code translate="no">dataCoord.import.scheduleInterval</code><button data-href="#dataCoordimportscheduleInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.scheduleInterval">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Intervall für die Planung des Imports, gemessen in Sekunden.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportcheckIntervalHigh" class="common-anchor-header"><code translate="no">dataCoord.import.checkIntervalHigh</code><button data-href="#dataCoordimportcheckIntervalHigh" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.checkIntervalHigh">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Intervall für die Importprüfung, gemessen in Sekunden, ist für den Import-Checker auf eine hohe Frequenz eingestellt.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportcheckIntervalLow" class="common-anchor-header"><code translate="no">dataCoord.import.checkIntervalLow</code><button data-href="#dataCoordimportcheckIntervalLow" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.checkIntervalLow">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Das Intervall für die Importprüfung, gemessen in Sekunden, ist für den Import-Checker auf eine niedrige Frequenz eingestellt.      </td>
      <td>120</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportmaxImportFileNumPerReq" class="common-anchor-header"><code translate="no">dataCoord.import.maxImportFileNumPerReq</code><button data-href="#dataCoordimportmaxImportFileNumPerReq" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.maxImportFileNumPerReq">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximal zulässige Anzahl von Dateien pro Importanforderung.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportmaxImportJobNum" class="common-anchor-header"><code translate="no">dataCoord.import.maxImportJobNum</code><button data-href="#dataCoordimportmaxImportJobNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.maxImportJobNum">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Anzahl der Importaufträge, die gerade ausgeführt werden oder ausstehen.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportwaitForIndex" class="common-anchor-header"><code translate="no">dataCoord.import.waitForIndex</code><button data-href="#dataCoordimportwaitForIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.waitForIndex">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Gibt an, ob der Importvorgang auf den Abschluss der Indexerstellung wartet.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgracefulStopTimeout" class="common-anchor-header"><code translate="no">dataCoord.gracefulStopTimeout</code><button data-href="#dataCoordgracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Sekunden. Knoten ohne ordnungsgemäßen Stopp zwangsweise anhalten      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordslotclusteringCompactionUsage" class="common-anchor-header"><code translate="no">dataCoord.slot.clusteringCompactionUsage</code><button data-href="#dataCoordslotclusteringCompactionUsage" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.slot.clusteringCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Slot-Auslastung des Clustering-Kompaktierungsauftrags.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordslotmixCompactionUsage" class="common-anchor-header"><code translate="no">dataCoord.slot.mixCompactionUsage</code><button data-href="#dataCoordslotmixCompactionUsage" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.slot.mixCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Slot-Auslastung des Mix-Kompaktierungsauftrags.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordslotl0DeleteCompactionUsage" class="common-anchor-header"><code translate="no">dataCoord.slot.l0DeleteCompactionUsage</code><button data-href="#dataCoordslotl0DeleteCompactionUsage" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.slot.l0DeleteCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Slot-Auslastung des l0-Verdichtungsauftrags.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordip" class="common-anchor-header"><code translate="no">dataCoord.ip</code><button data-href="#dataCoordip" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.ip">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP-Adresse von dataCoord. Falls nicht angegeben, wird die erste Unicast-fähige Adresse verwendet      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordport" class="common-anchor-header"><code translate="no">dataCoord.port</code><button data-href="#dataCoordport" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.port">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP-Port von dataCoord      </td>
      <td>13333</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">dataCoord.grpc.serverMaxSendSize</code><button data-href="#dataCoordgrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe jeder RPC-Anfrage, die dataCoord senden kann, Einheit: Byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">dataCoord.grpc.serverMaxRecvSize</code><button data-href="#dataCoordgrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe jeder RPC-Anfrage, die der dataCoord empfangen kann, Einheit: Byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">dataCoord.grpc.clientMaxSendSize</code><button data-href="#dataCoordgrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe jeder RPC-Anfrage, die die Clients auf dataCoord senden können, Einheit: Byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">dataCoord.grpc.clientMaxRecvSize</code><button data-href="#dataCoordgrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Die maximale Größe jeder RPC-Anfrage, die die Clients auf dataCoord empfangen können, Einheit: Byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
