---
id: time_sync.md
title: Zeitsynchronisierung
summary: Erfahren Sie mehr über das Zeitsynchronisationssystem in Milvus.
---
<h1 id="Time-Synchronization" class="common-anchor-header">Zeitsynchronisation<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird der Zeitsynchronisationsmechanismus in Milvus vorgestellt.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Ereignisse in Milvus können im Allgemeinen in zwei Typen kategorisiert werden:</p>
<ul>
<li><p>DDL-Ereignisse (Data Definition Language): Erstellen/Löschen einer Sammlung, Erstellen/Löschen einer Partition, usw.</p></li>
<li><p>DML-Ereignisse (Data Manipulation Language): Einfügen, Suchen, usw.</p></li>
</ul>
<p>Jedes Ereignis, egal ob DDL- oder DML-Ereignis, wird mit einem Zeitstempel versehen, der angibt, wann dieses Ereignis eintritt.</p>
<p>Nehmen wir an, es gibt zwei Benutzer, die eine Reihe von DML- und DDL-Ereignissen in Milvus in der in der folgenden Tabelle angegebenen zeitlichen Reihenfolge initiieren.</p>
<table>
<thead>
<tr><th style="text-align:center">Zeitstempel</th><th style="text-align:center">Benutzer 1</th><th style="text-align:center">Benutzer 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">Erstellt eine Sammlung mit dem Namen <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">Durchführen einer Suche in der Sammlung <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">Daten <code translate="no">A1</code> in die Sammlung <code translate="no">C0</code> eingefügt.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">Eine Suche in der Sammlung <code translate="no">C0</code> durchgeführt.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">Daten <code translate="no">A2</code> in die Sammlung <code translate="no">C0</code> eingefügt.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">Eine Suche in der Sammlung durchgeführt <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">Daten <code translate="no">A1</code> aus der Sammlung <code translate="no">C0</code> gelöscht.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">Eine Suche in der Sammlung durchgeführt <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>Idealerweise sollte Benutzer 2 in der Lage sein, zu sehen:</p>
<ul>
<li><p>Eine leere Sammlung <code translate="no">C0</code> unter <code translate="no">t2</code>.</p></li>
<li><p>Daten <code translate="no">A1</code> unter <code translate="no">t7</code>.</p></li>
<li><p>Beide Daten <code translate="no">A1</code> und <code translate="no">A2</code> unter <code translate="no">t12</code>.</p></li>
<li><p>Nur die Daten <code translate="no">A2</code> unter <code translate="no">t17</code> (da die Daten <code translate="no">A1</code> vor diesem Zeitpunkt aus der Sammlung gelöscht wurden).</p></li>
</ul>
<p>Dieses ideale Szenario kann leicht erreicht werden, wenn es nur einen einzigen Knoten gibt. Milvus ist jedoch eine verteilte Vektordatenbank, und um sicherzustellen, dass alle DML- und DDL-Operationen in verschiedenen Knoten in der richtigen Reihenfolge durchgeführt werden, muss Milvus die folgenden beiden Probleme lösen:</p>
<ol>
<li><p>Die Zeituhr ist für die beiden Benutzer im obigen Beispiel unterschiedlich, wenn sie sich auf verschiedenen Knoten befinden. Wenn z. B. Benutzer 2 24 Stunden hinter Benutzer 1 liegt, sind alle Operationen von Benutzer 1 für Benutzer 2 erst am nächsten Tag sichtbar.</p></li>
<li><p>Es kann zu Netzwerklatenz kommen. Wenn Benutzer 2 eine Suche in der Sammlung <code translate="no">C0</code> unter <code translate="no">t17</code> durchführt, sollte Milvus in der Lage sein, zu garantieren, dass alle Vorgänge vor <code translate="no">t17</code> erfolgreich verarbeitet und abgeschlossen werden. Wenn sich der Löschvorgang unter <code translate="no">t15</code> aufgrund von Netzwerklatenz verzögert, ist es sehr wahrscheinlich, dass Benutzer 2 die vermeintlich gelöschten Daten <code translate="no">A1</code> noch sehen kann, wenn er eine Suche unter <code translate="no">t17</code> durchführt.</p></li>
</ol>
<p>Daher verwendet Milvus ein Zeitsynchronisationssystem (Timetick), um diese Probleme zu lösen.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">Zeitstempel-Orakel (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>Um das erste Problem zu lösen, das im vorigen Abschnitt erwähnt wurde, bietet Milvus, wie andere verteilte Systeme auch, einen Zeitstempel-Orakel (TSO) Dienst. Das bedeutet, dass alle Ereignisse in Milvus mit einem Zeitstempel vom TSO und nicht von der lokalen Uhr versehen werden müssen.</p>
<p>Der TSO-Dienst wird vom Root-Koordinator in Milvus bereitgestellt. Clients können einen oder mehrere Zeitstempel in einer einzigen Zeitstempelanforderung zuweisen.</p>
<p>Ein TSO-Zeitstempel ist ein Wert des Typs <code translate="no">uint64</code>, der sich aus einem physischen und einem logischen Teil zusammensetzt. Die folgende Abbildung veranschaulicht das Format eines Zeitstempels.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Zeitstempel</span>. </span></p>
<p>Wie dargestellt, sind die 46 Bits am Anfang der physische Teil, nämlich die UTC-Zeit in Millisekunden. Die letzten 18 Bits sind der logische Teil.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">Zeitsynchronisationssystem (Timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt wird der Zeitsynchronisationsmechanismus in Milvus am Beispiel eines Dateneinfügevorgangs erläutert.</p>
<p>Wenn der Proxy eine Dateneinfügeanforderung vom SDK erhält, teilt er die Einfügemeldungen in verschiedene Meldungsströme (<code translate="no">MsgStream</code>) entsprechend dem Hash-Wert der Primärschlüssel auf.</p>
<p>Jeder Einfügemeldung (<code translate="no">InsertMsg</code>) wird ein Zeitstempel zugewiesen, bevor sie an die <code translate="no">MsgStream</code> gesendet wird.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> ist ein Wrapper der Nachrichtenwarteschlange, die in Milvus 2.0 standardmäßig Pulsar ist.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>Ein allgemeiner Grundsatz besagt, dass die Zeitstempel der<code translate="no">InsertMsgs</code> aus demselben Proxy inkrementell sein müssen ( <code translate="no">MsgStream</code>). Für die Zeitstempel der <code translate="no">InsertMsgs</code> von verschiedenen Proxys gibt es jedoch keine solche Regel.</p>
<p>Die folgende Abbildung ist ein Beispiel für <code translate="no">InsertMsgs</code> in einem <code translate="no">MsgStream</code>. Das Snippet enthält fünf <code translate="no">InsertMsgs</code>, von denen drei von <code translate="no">Proxy1</code> und die übrigen von <code translate="no">Proxy2</code> stammen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>Die Zeitstempel der drei <code translate="no">InsertMsgs</code> von <code translate="no">Proxy1</code> sind inkrementell, ebenso wie die der beiden <code translate="no">InsertMsgs</code> von <code translate="no">Proxy2</code>. Es gibt jedoch keine bestimmte Reihenfolge zwischen <code translate="no">Proxy1</code> und <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> .</p>
<p>Ein mögliches Szenario ist, dass Milvus beim Lesen einer Nachricht mit dem Zeitstempel <code translate="no">110</code> von <code translate="no">Proxy2</code> feststellt, dass sich die Nachricht mit dem Zeitstempel <code translate="no">80</code> von <code translate="no">Proxy1</code> noch im <code translate="no">MsgStream</code> befindet. Daher führt Milvus ein Zeitsynchronisationssystem, timetick, ein, um sicherzustellen, dass beim Lesen einer Nachricht von <code translate="no">MsgStream</code> alle Nachrichten mit kleineren Zeitstempelwerten konsumiert werden müssen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>time_synchronisation</span> </span></p>
<p>Wie in der Abbildung oben dargestellt,</p>
<ul>
<li><p>Jeder Proxy meldet in regelmäßigen Abständen (standardmäßig alle 200 ms) den größten Zeitstempelwert der letzten <code translate="no">InsertMsg</code> in der <code translate="no">MsgStream</code>an root coord.</p></li>
<li><p>Root Coord identifiziert den minimalen Zeitstempelwert auf dieser <code translate="no">Msgstream</code>, unabhängig davon, zu welchem Proxy die <code translate="no">InsertMsgs</code> gehört. Dann fügt Root Coord diesen minimalen Zeitstempel in die <code translate="no">Msgstream</code> ein. Dieser Zeitstempel wird auch Timetick genannt.</p></li>
<li><p>Wenn die Verbraucherkomponenten den von Root Coord eingefügten Timetick lesen, verstehen sie, dass alle Einfüge-Nachrichten mit kleineren Timestamp-Werten verbraucht wurden. Daher können die entsprechenden Anfragen sicher ausgeführt werden, ohne dass der Auftrag unterbrochen wird.</p></li>
</ul>
<p>Die folgende Abbildung ist ein Beispiel für die <code translate="no">Msgstream</code> mit einem eingefügten Zeitstempel.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>Zeitstempel</span> </span></p>
<p><code translate="no">MsgStream</code> verarbeitet die Nachrichten in Stapeln entsprechend dem Zeitstempel, um sicherzustellen, dass die ausgegebenen Nachrichten den Anforderungen des Zeitstempels entsprechen.</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Lernen Sie das Konzept des <a href="/docs/de/v2.4.x/timestamp.md">Zeitstempels</a> kennen.</li>
<li>Lernen Sie den <a href="/docs/de/v2.4.x/data_processing.md">Arbeitsablauf der Datenverarbeitung</a> in Milvus kennen.</li>
</ul>
