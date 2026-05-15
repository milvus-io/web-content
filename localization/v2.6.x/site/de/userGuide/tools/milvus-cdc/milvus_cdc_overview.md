---
id: milvus_cdc_overview.md
summary: >-
  Milvus CDC repliziert Datenänderungen von einem Milvus-Cluster zu einem
  anderen für die primäre Standby-Wiederherstellung im Notfall.
title: Milvus CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">Milvus CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC (Change Data Capture) repliziert Datenänderungen von einem Milvus-Cluster zu einem anderen. Sie können CDC verwenden, um eine Primary-Standby-Disaster-Recovery-Topologie für Milvus aufzubauen.</p>
<p>In einer Primary-Standby-Topologie fungiert ein Cluster als Primary und nimmt Schreibvorgänge entgegen. Ein oder mehrere Standby-Cluster erhalten kontinuierlich Änderungen vom primären Cluster und können den Leseverkehr bedienen. Wenn der primäre Cluster nicht mehr verfügbar ist oder gewartet werden muss, können Sie den Dienstverkehr auf einen Standby-Cluster umleiten.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" />
   </span> <span class="img-wrapper"> <span>CDC-Arbeitsablauf</span> </span></p>
<h2 id="Architecture" class="common-anchor-header">Architektur<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine typische Topologie umfasst:</p>
<ul>
<li><strong>Primärer Cluster</strong>: Der Quellcluster für die Replikation. Er nimmt Lese- und Schreibvorgänge entgegen.</li>
<li><strong>Standby-Cluster</strong>: Ein Zielcluster für die Replikation. Er empfängt Änderungen vom primären Cluster und ist schreibgeschützt, solange er ein Standby-Cluster ist.</li>
<li><strong>CDC-Knoten</strong>: Eine Milvus-Komponente, die WAL-Änderungen vom aktuellen Primärcluster an Standby-Cluster weiterleitet. Setzen Sie CDC auf jedem Cluster ein, der nach einem Switchover oder Failover primär werden kann.</li>
<li><strong>Replikationstopologie</strong>: Die konfigurierte Quelle-zu-Ziel-Beziehung, z. B. Cluster-a -&gt; Cluster-b. Die folgende Abbildung zeigt die Topologie. <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /><span>CDC-Arbeitsablauf</span> </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">Unterstützte Topologien<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>Die häufigste CDC-Implementierung besteht aus einem primären und einem Standby-System:</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC unterstützt auch eine Single-Primary, Multi-Standby Topologie:</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC unterstützt keine Multi-Primär- oder Aktiv-Aktiv-Einsätze, bei denen zwei oder mehr Cluster gleichzeitig Schreibverkehr annehmen.</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">Primär- und Standby-Verhalten<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Rolle</th><th>Liest</th><th>Schreibvorgänge</th><th>Replikationsverhalten</th></tr>
</thead>
<tbody>
<tr><td>Primär</td><td>Ja</td><td>Ja</td><td>Sendet Änderungen an Standby-Cluster</td></tr>
<tr><td>Standby</td><td>Ja</td><td>Nein</td><td>Empfängt replizierte Änderungen vom primären Cluster</td></tr>
</tbody>
</table>
<p>Ein Standby-Cluster lehnt direkte Schreibanforderungen ab. Dies verhindert Split Brain und hält die Replikationstopologie konsistent.</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">Geplantes Switchover vs. Failover<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC bietet zwei Möglichkeiten, den Dienstverkehr vom aktuellen Primärcluster auf einen Standby-Cluster zu verlagern.</p>
<table>
<thead>
<tr><th>Vorgang</th><th>Verwendung bei</th><th>Datenverlust</th><th>Erwartetes Verhalten</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/de/v2.6.x/cdc_switchover.md">Umschaltung</a></strong></td><td>Die aktuelle Primäranlage ist noch erreichbar, oder Sie führen geplante Wartungsarbeiten durch</td><td>RPO = 0</td><td>Wartet auf die verbleibenden replizierten Daten vor dem Rollenwechsel</td></tr>
<tr><td><strong><a href="/docs/de/v2.6.x/cdc_failover.md">Ausfallsicherung</a></strong></td><td>Der aktuelle Primärserver ist nicht mehr erreichbar und kann nicht schnell wiederhergestellt werden.</td><td>Möglich</td><td>Promotet den Standby sofort, damit die Schreibvorgänge fortgesetzt werden können</td></tr>
</tbody>
</table>
<p>Verwenden Sie Switchover, wenn der aktuelle Primärserver noch reagieren kann. Verwenden Sie Failover nur, wenn die Wiederherstellung der Verfügbarkeit wichtiger ist als das Warten auf den ursprünglichen Primärserver.</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">CDC-Verzögerung und warum sie wichtig ist<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Die CDC-Verzögerung ist die Datenmenge, die in den primären Cluster geschrieben wurde, aber noch nicht auf den Standby-Cluster übertragen wurde.</p>
<p>CDC-Lag wirkt sich auf beide Wiederherstellungsoptionen aus:</p>
<ul>
<li>Beim Switchover bedeutet ein geringerer CDC-Lag in der Regel, dass der Vorgang schneller abgeschlossen wird.</li>
<li>Beim Failover stellt die CDC-Verzögerung das Datenfenster dar, das verloren gehen kann, wenn der ursprüngliche Primärcluster nicht verfügbar ist.</li>
</ul>
<p>Sie sollten die CDC-Verzögerung kontinuierlich überwachen und sie so gering wie möglich halten. Die Seite <a href="/docs/de/v2.6.x/set_up_cdc_replication.md">CDC-Replikation einrichten</a> enthält ein PromQL-Beispiel zur Abschätzung des CDC-Lags.</p>
<h2 id="Limitations" class="common-anchor-header">Beschränkungen<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC hat derzeit die folgenden Einschränkungen:</p>
<ul>
<li>Es werden nur <strong>Single-Primary-Topologien</strong> unterstützt.</li>
<li>Es unterstützt <strong>keine</strong> aktiv-aktiven oder multi-primären Schreibvorgänge.</li>
<li>Standby-Cluster können Leseverkehr bedienen, aber sie lehnen direkte Schreibvorgänge ab, solange sie Standby bleiben.</li>
<li>Beim Failover können Daten verloren gehen, die auf den alten primären Cluster geschrieben, aber noch nicht auf den Standby-Cluster repliziert wurden.</li>
<li>Die konfigurierte <code translate="no">pchannels</code> muss mit dem tatsächlichen Channel-Layout jedes Clusters übereinstimmen.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">Kann ein Standby-Cluster Abfragen bedienen?<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Ja. Ein Standby-Cluster kann Lesezugriffe durchführen. Er kann keine Schreibvorgänge annehmen, bis er zum primären Cluster wird.</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Unterstützt Milvus CDC aktiv-aktiv Schreibvorgänge?<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Milvus CDC ist für eine Single-Primary-Topologie konzipiert. Das gleichzeitige Schreiben auf mehrere Cluster kann zu Split Brain und Datenabweichungen führen.</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">Gehen beim Umschalten Daten verloren?<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Beim Switchover wird gewartet, bis die verbleibenden Daten repliziert sind, bevor der Standby-Cluster zum primären Cluster wird.</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">Gehen bei der Ausfallsicherung Daten verloren?<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Ja, das kann passieren. Alle Daten, die auf die alte Primärdatenbank geschrieben, aber noch nicht auf die Standby-Datenbank repliziert wurden, können verloren gehen.</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">Wie viele Daten können beim Failover verloren gehen?<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>Der potenzielle Datenverlust wird durch die CDC-Verzögerung zu dem Zeitpunkt begrenzt, an dem der Primärserver nicht mehr verfügbar war.</p>
