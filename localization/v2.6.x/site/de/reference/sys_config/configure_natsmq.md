---
id: configure_natsmq.md
related_key: configure
group: system_configuration.md
summary: 'Erfahren Sie, wie Sie natsmq für Milvus konfigurieren.'
---
<h1 id="natsmq-related-Configurations" class="common-anchor-header">natsmq-bezogene Konfigurationen<button data-href="#natsmq-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>natsmq-Konfiguration.</p>
<p>mehr dazu: https://docs.nats.io/running-a-nats-service/configuration</p>
<h2 id="natsmqserverport" class="common-anchor-header"><code translate="no">natsmq.server.port</code><button data-href="#natsmqserverport" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.port">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Lauschender Port des NATS-Servers.      </td>
      <td>4222</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqserverstoreDir" class="common-anchor-header"><code translate="no">natsmq.server.storeDir</code><button data-href="#natsmqserverstoreDir" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.storeDir">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Verzeichnis, das für die JetStream-Speicherung von nats verwendet wird    </td>
      <td>/var/lib/milvus/nats</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqservermaxFileStore" class="common-anchor-header"><code translate="no">natsmq.server.maxFileStore</code><button data-href="#natsmqservermaxFileStore" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.maxFileStore">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Größe der 'Datei'-Speicherung      </td>
      <td>17179869184</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqservermaxPayload" class="common-anchor-header"><code translate="no">natsmq.server.maxPayload</code><button data-href="#natsmqservermaxPayload" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.maxPayload">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Anzahl von Bytes in einer Nutzlast einer Nachricht      </td>
      <td>8388608</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqservermaxPending" class="common-anchor-header"><code translate="no">natsmq.server.maxPending</code><button data-href="#natsmqservermaxPending" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.maxPending">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximale Anzahl von gepufferten Bytes für eine Verbindung Gilt für Client-Verbindungen      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqserverinitializeTimeout" class="common-anchor-header"><code translate="no">natsmq.server.initializeTimeout</code><button data-href="#natsmqserverinitializeTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.initializeTimeout">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Warten auf Initialisierung von natsmq beendet      </td>
      <td>4000</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqservermonitortrace" class="common-anchor-header"><code translate="no">natsmq.server.monitor.trace</code><button data-href="#natsmqservermonitortrace" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.monitor.trace">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Wenn true, aktiviere Protokoll-Trace-Meldungen      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqservermonitordebug" class="common-anchor-header"><code translate="no">natsmq.server.monitor.debug</code><button data-href="#natsmqservermonitordebug" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.monitor.debug">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Falls wahr, Debug-Protokollmeldungen aktivieren      </td>
      <td>falsch</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqservermonitorlogTime" class="common-anchor-header"><code translate="no">natsmq.server.monitor.logTime</code><button data-href="#natsmqservermonitorlogTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.monitor.logTime">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Wenn auf false gesetzt, wird ohne Zeitstempel protokolliert.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqservermonitorlogFile" class="common-anchor-header"><code translate="no">natsmq.server.monitor.logFile</code><button data-href="#natsmqservermonitorlogFile" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.monitor.logFile">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Pfad der Protokolldatei relativ zu .. der Milvus-Binärdatei, wenn relativer Pfad verwendet wird    </td>
      <td>/tmp/milvus/logs/nats.log</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqservermonitorlogSizeLimit" class="common-anchor-header"><code translate="no">natsmq.server.monitor.logSizeLimit</code><button data-href="#natsmqservermonitorlogSizeLimit" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.monitor.logSizeLimit">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Größe in Bytes, nachdem die Protokolldatei in eine neue Datei umgewandelt wurde     </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqserverretentionmaxAge" class="common-anchor-header"><code translate="no">natsmq.server.retention.maxAge</code><button data-href="#natsmqserverretentionmaxAge" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.retention.maxAge">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximales Alter einer Nachricht im P-Kanal      </td>
      <td>4320</td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqserverretentionmaxBytes" class="common-anchor-header"><code translate="no">natsmq.server.retention.maxBytes</code><button data-href="#natsmqserverretentionmaxBytes" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.retention.maxBytes">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Wie viele Bytes der einzelne P-Kanal enthalten darf. Entfernen der ältesten Nachrichten, wenn der P-Kanal diese Größe überschreitet      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="natsmqserverretentionmaxMsgs" class="common-anchor-header"><code translate="no">natsmq.server.retention.maxMsgs</code><button data-href="#natsmqserverretentionmaxMsgs" class="anchor-icon" translate="no">
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
    </button></h2><table id="natsmq.server.retention.maxMsgs">
  <thead>
    <tr>
      <th class="width80">Beschreibung</th>
      <th class="width20">Standardwert</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Wie viele Nachrichten der einzelne P-Kanal enthalten darf. Entfernen der ältesten Nachrichten, wenn der P-Kanal diese Grenze überschreitet      </td>
      <td></td>
    </tr>
  </tbody>
</table>
