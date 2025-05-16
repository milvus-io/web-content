---
id: timestamp.md
title: Zeitstempel in Milvus
summary: >-
  Erfahren Sie mehr über das Konzept des Zeitstempels und die vier wichtigsten
  zeitstempelbezogenen Parameter in der Milvus-Vektordatenbank.
---
<h1 id="Timestamp" class="common-anchor-header">Zeitstempel<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema erklärt das Konzept des Zeitstempels und stellt die vier wichtigsten zeitstempelbezogenen Parameter in der Milvus-Vektordatenbank vor.</p>
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
    </button></h2><p>Milvus ist eine Vektordatenbank, die aus unstrukturierten Daten konvertierte Vektoren suchen und abfragen kann. Bei der Durchführung einer DML-Operation (Data Manipulation Language), einschließlich des <a href="https://milvus.io/docs/v2.1.x/data_processing.md">Einfügens und Löschens von Daten</a>, weist Milvus den an der Operation beteiligten Entitäten Zeitstempel zu. Daher haben alle Entitäten in Milvus ein Zeitstempel-Attribut. Und die Stapel von Entitäten in derselben DML-Operation haben denselben Zeitstempelwert.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">Zeitstempel-Parameter<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Mehrere zeitstempelbezogene Parameter sind beteiligt, wenn Sie eine Vektorähnlichkeitssuche oder -abfrage in Milvus durchführen.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> ist eine Art von Zeitstempel, der verwendet wird, um sicherzustellen, dass alle Datenaktualisierungen durch DML-Operationen vor <code translate="no">Guarantee_timestamp</code> sichtbar sind, wenn eine Vektorähnlichkeitssuche oder -abfrage durchgeführt wird. Wenn Sie beispielsweise einen Datenstapel um 15 Uhr und einen weiteren um 17 Uhr eingefügt haben und der Wert von <code translate="no">Guarantee_timestamp</code> während einer Vektorähnlichkeitssuche auf 18 Uhr festgelegt ist. Dies bedeutet, dass die beiden um 15 Uhr bzw. 17 Uhr eingefügten Datenstapel in die Suche einbezogen werden sollten.</p>
<p>Wenn <code translate="no">Guarantee_timestamp</code> nicht konfiguriert ist, nimmt Milvus automatisch den Zeitpunkt an, zu dem die Suchanfrage gestellt wird. Daher wird die Suche in einer Datenansicht mit allen Datenaktualisierungen durch DML-Operationen vor der Suche durchgeführt.</p>
<p>Um Ihnen die Mühe zu ersparen, den <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> innerhalb von Milvus zu verstehen, müssen Sie als Benutzer den Parameter <code translate="no">Guarantee_timestamp</code> nicht direkt konfigurieren. Sie müssen nur die <a href="https://milvus.io/docs/v2.1.x/consistency.md">Konsistenzstufe</a> auswählen, und Milvus verwaltet den Parameter <code translate="no">Guarantee_timestamp</code> automatisch für Sie. Jede Konsistenzstufe entspricht einem bestimmten <code translate="no">Guarantee_timestamp</code> Wert.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Garantiert_Zeitstempel</span>. </span></p>
<h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Wie in der obigen Abbildung gezeigt, ist der Wert von <code translate="no">Guarantee_timestamp</code> auf <code translate="no">2021-08-26T18:15:00</code> eingestellt (der Einfachheit halber wird der Zeitstempel in diesem Beispiel durch die physikalische Zeit dargestellt). Wenn Sie eine Suche oder Abfrage durchführen, werden alle Daten vor 2021-08-26T18:15:00 durchsucht oder abgefragt.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> ist ein Typ von Zeitstempel, der automatisch von Abfrageknoten in Milvus generiert und verwaltet wird. Er wird verwendet, um anzuzeigen, welche DML-Operationen von Abfrageknoten ausgeführt werden.</p>
<p>Die von Abfrageknoten verwalteten Daten können in zwei Typen kategorisiert werden:</p>
<ul>
<li><p>Historische Daten (oder auch Batch-Daten genannt)</p></li>
<li><p>Inkrementelle Daten (oder auch Streaming-Daten genannt).</p></li>
</ul>
<p>In Milvus müssen Sie die Daten laden, bevor Sie eine Suche oder Abfrage durchführen. Daher werden Batch-Daten in einer Sammlung von einem Abfrageknoten geladen, bevor eine Such- oder Abfrageanfrage gestellt wird. Streaming-Daten werden jedoch in Milvus im laufenden Betrieb eingefügt oder gelöscht, so dass der Abfrageknoten einen Zeitplan für die DML-Operationen und die Such- oder Abfrageanfragen erstellen muss. Daher verwenden die Abfrageknoten <code translate="no">Service_timestamp</code>, um eine solche Zeitleiste zu führen. <code translate="no">Service_timestamp</code> kann als der Zeitpunkt angesehen werden, an dem bestimmte Daten sichtbar sind, da die Abfrageknoten sicherstellen können, dass alle DML-Operationen vor <code translate="no">Service_timestamp</code> abgeschlossen sind.</p>
<p>Wenn eine Such- oder Abfrageanfrage eingeht, vergleicht ein Abfrageknoten die Werte von <code translate="no">Service_timestamp</code> und <code translate="no">Guarantee_timestamp</code>. Es gibt hauptsächlich zwei Szenarien.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Service_Timestamp</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Szenario 1: <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Wie in Abbildung 1 dargestellt, wird der Wert von <code translate="no">Guarantee_timestamp</code> als <code translate="no">2021-08-26T18:15:00</code> festgelegt. Wenn der Wert von <code translate="no">Service_timestamp</code> auf <code translate="no">2021-08-26T18:15:01</code> angewachsen ist, bedeutet dies, dass alle DML-Vorgänge vor diesem Zeitpunkt vom Abfrageknoten ausgeführt und abgeschlossen werden, einschließlich der DML-Vorgänge vor dem durch <code translate="no">Guarantee_timestamp</code> angegebenen Zeitpunkt. Folglich kann die Such- oder Abfrageanfrage sofort ausgeführt werden.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Szenario 2: <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Wie in Abbildung 2 dargestellt, ist der Wert von <code translate="no">Guarantee_timestamp</code> auf <code translate="no">2021-08-26T18:15:00</code> gesetzt, und der aktuelle Wert von <code translate="no">Service_timestamp</code> ist nur <code translate="no">2021-08-26T18:14:55</code>. Dies bedeutet, dass nur DML-Vorgänge vor <code translate="no">2021-08-26T18:14:55</code> ausgeführt und abgeschlossen werden, wobei ein Teil der DML-Vorgänge nach diesem Zeitpunkt, aber vor <code translate="no">Guarantee_timestamp</code>, nicht abgeschlossen wird. Wenn die Suche oder Abfrage zu diesem Zeitpunkt ausgeführt wird, sind einige der erforderlichen Daten noch nicht sichtbar und nicht verfügbar, was die Genauigkeit der Such- oder Abfrageergebnisse erheblich beeinträchtigt. Daher muss der Abfrageknoten die Such- oder Abfrageanfrage aufschieben, bis die DML-Operationen vor <code translate="no">guarantee_timestamp</code> abgeschlossen sind (d. h. wenn <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>Technisch gesehen ist <code translate="no">Graceful_time</code> kein Zeitstempel, sondern eher eine Zeitspanne (z. B. 100 ms). <code translate="no">Graceful_time</code> ist jedoch erwähnenswert, da er eng mit <code translate="no">Guarantee_timestamp</code> und <code translate="no">Service_timestamp</code> zusammenhängt. <code translate="no">Graceful_time</code> ist ein konfigurierbarer Parameter in der Milvus-Konfigurationsdatei. Er wird verwendet, um die Zeitspanne anzugeben, die toleriert werden kann, bevor bestimmte Daten sichtbar werden. Kurz gesagt, können nicht abgeschlossene DML-Operationen während <code translate="no">Graceful_time</code> toleriert werden.</p>
<p>Wenn eine Such- oder Abfrageanfrage eingeht, kann es zwei Szenarien geben.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Szenario 1: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Wie in Abbildung 1 dargestellt, wird der Wert von <code translate="no">Guarantee_timestamp</code> als <code translate="no">2021-08-26T18:15:01</code> und <code translate="no">Graceful_time</code> als <code translate="no">2s</code> festgelegt. Der Wert von <code translate="no">Service_timestamp</code> ist auf <code translate="no">2021-08-26T18:15:00</code> angewachsen. Obwohl der Wert von <code translate="no">Service_timestamp</code> immer noch kleiner ist als der von <code translate="no">Guarantee_timestamp</code> und nicht alle DML-Vorgänge vor <code translate="no">2021-08-26T18:15:01</code> abgeschlossen sind, wird eine Zeitspanne von 2 Sekunden der Datenunsichtbarkeit toleriert, wie durch den Wert von <code translate="no">Graceful_time</code> angezeigt. Daher kann die eingehende Such- oder Abfrageanfrage sofort ausgeführt werden.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Szenario 2: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Wie in Abbildung 2 dargestellt, wird der Wert von <code translate="no">Guarantee_timestamp</code> auf <code translate="no">2021-08-26T18:15:01</code> und der Wert von <code translate="no">Graceful_time</code> auf <code translate="no">2s</code> gesetzt. Der aktuelle Wert von <code translate="no">Service_timestamp</code> ist nur <code translate="no">2021-08-26T18:14:54</code>. Das bedeutet, dass die erwarteten DML-Vorgänge noch nicht abgeschlossen sind und dass die Unsichtbarkeit der Daten selbst bei einer Schonzeit von 2 Sekunden nicht tolerierbar ist. Daher muss der Abfrageknoten die Such- oder Abfrageanforderung zurückstellen, bis bestimmte DML-Anforderungen abgeschlossen sind (d. h. wenn <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie, wie <a href="/docs/de/v2.4.x/consistency.md">der garantierte Zeitstempel die abstimmbare Konsistenz in Milvus ermöglicht</a></li>
</ul>
