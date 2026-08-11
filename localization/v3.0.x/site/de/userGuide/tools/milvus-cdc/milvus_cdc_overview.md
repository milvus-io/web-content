---
id: milvus_cdc_overview.md
summary: >-
  Milvus CDC repliziert Datenänderungen von einem Milvus-Cluster auf einen
  anderen, um eine Disaster-Recovery-Lösung mit Primär- und Standby-System zu
  gewährleisten.
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
    </button></h1><p>Milvus CDC (Change Data Capture) repliziert Datenänderungen von einem Milvus-Cluster in einen anderen. Mit CDC können Sie eine Primär-Standby-Topologie für die Notfallwiederherstellung in Milvus aufbauen.</p>
<p>In einer Primär-Standby-Topologie fungiert ein Cluster als Primärcluster und nimmt Schreibvorgänge entgegen. Ein oder mehrere Standby-Cluster empfangen kontinuierlich Änderungen vom Primärcluster und können Lesezugriffe bedienen. Wenn der Primärcluster nicht mehr verfügbar ist oder gewartet werden muss, können Sie den Dienstverkehr auf einen Standby-Cluster umleiten.</p>
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
<li><strong>Primärcluster</strong>: Der Quellcluster für die Replikation. Er akzeptiert Lese- und Schreibzugriffe.</li>
<li><strong>Standby-Cluster</strong>: Ein Zielcluster für die Replikation. Er empfängt Änderungen vom Primärcluster und ist schreibgeschützt, solange er im Standby-Modus bleibt.</li>
<li><strong>CDC-Knoten</strong>: Eine Milvus-Komponente, die WAL-Änderungen vom aktuellen Primär- an die Standby-Cluster weiterleitet. Stellen Sie CDC auf jedem Cluster bereit, der nach einem Umschalten oder Failover zum Primärcluster werden könnte.</li>
<li><strong>Replikationstopologie</strong>: Die konfigurierte Quelle-Ziel-Beziehung, z. B. Cluster-a -&gt; Cluster-b.
Nachfolgend finden Sie eine Darstellung der Topologie. <span class="img-wrapper">

  
   <img translate="no" src="/docs/v3.0.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /> 
 <span>   CDC-Workflow</span>
  
 </span></li>
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
    </button></h3><p>Die gängigste CDC-Bereitstellung besteht aus einem Primär- und einem Standby-Cluster:</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC unterstützt auch eine Topologie mit einem Primär- und mehreren Standby-Clustern:</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC unterstützt keine Multi-Primär- oder Aktiv-Aktiv-Bereitstellungen, bei denen zwei oder mehr Cluster gleichzeitig Schreibzugriffe entgegennehmen.</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">Verhalten von Primär- und Standby-Knoten<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
<tr><th>Rolle</th><th>Lesevorgänge</th><th>Schreibvorgänge</th><th>Replikationsverhalten</th></tr>
</thead>
<tbody>
<tr><td>Primär</td><td>Ja</td><td>Ja</td><td>Sendet Änderungen an Standby-Cluster</td></tr>
<tr><td>Standby</td><td>Ja</td><td>Nein</td><td>Empfängt replizierte Änderungen vom Primärcluster</td></tr>
</tbody>
</table>
<p>Ein Standby-Cluster lehnt direkte Schreibanfragen ab. Dies verhindert ein „Split Brain“ und gewährleistet die Konsistenz der Replikationstopologie.</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">Geplante Umschaltung vs. Failover<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC bietet zwei Möglichkeiten, den Dienstverkehr vom aktuellen Primärserver auf einen Standby-Cluster umzuleiten.</p>
<table>
<thead>
<tr><th>Vorgang</th><th>Verwendung bei</th><th>Datenverlust</th><th>Erwartetes Verhalten</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/de/cdc_switchover.md">Umschaltung</a></strong></td><td>Der aktuelle Primärserver ist noch erreichbar, oder Sie führen geplante Wartungsarbeiten durch</td><td>RPO = 0</td><td>Wartet auf die verbleibenden replizierten Daten, bevor die Rollen gewechselt werden</td></tr>
<tr><td><strong><a href="/docs/de/cdc_failover.md">Failover</a></strong></td><td>Der aktuelle Primärserver ist nicht verfügbar und kann nicht schnell wiederhergestellt werden</td><td>Möglich</td><td>Der Standby-Server wird sofort zum Primärserver befördert, sodass Schreibvorgänge wieder aufgenommen werden können</td></tr>
</tbody>
</table>
<p>Verwenden Sie „Switchover“, wann immer der aktuelle Primärserver noch reagieren kann. Verwenden Sie „Failover“ nur, wenn die Wiederherstellung der Verfügbarkeit wichtiger ist als das Warten auf den ursprünglichen Primärserver.</p>
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
    </button></h2><p>Der CDC-Verzug ist die Datenmenge, die bereits in den Primärcluster geschrieben, aber noch nicht auf einen Standby-Cluster übertragen wurde.</p>
<p>Der CDC-Verzug wirkt sich auf beide Wiederherstellungsoptionen aus:</p>
<ul>
<li>Während eines Switchovers bedeutet ein geringerer CDC-Verzug in der Regel, dass der Vorgang schneller abgeschlossen wird.</li>
<li>Beim Failover stellt der CDC-Verzug das Datenfenster dar, das verloren gehen kann, wenn der ursprüngliche Primärknoten nicht verfügbar ist.</li>
</ul>
<p>Sie sollten den CDC-Verzug kontinuierlich überwachen und so gering wie möglich halten. Die Seite <a href="/docs/de/set_up_cdc_replication.md">„CDC-Replikation einrichten“</a> enthält ein PromQL-Beispiel zur Schätzung des CDC-Verzugs.</p>
<h2 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">Massenimport bei der CDC-Replikation<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>In einer CDC-Replikationstopologie muss der Massenimport im Two-Phase-Commit-Modus (2PC) mit der Option „ <code translate="no">auto_commit=false</code> “ erfolgen. Führen Sie den Import und das Commit ausschließlich auf dem Primärcluster durch und stellen Sie sicher, dass die Importdateien sowohl für den Primär- als auch für den Standby-Cluster verfügbar sind. Weitere Informationen finden Sie unter <a href="/docs/de/bulk-import-in-cdc-replication.md">„Massenimport in der CDC-Replikation</a>“.</p>
<h2 id="Limitations" class="common-anchor-header">Einschränkungen<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC unterliegt derzeit folgenden Einschränkungen:</p>
<ul>
<li>Es werden ausschließlich Topologien <strong>mit einem einzigen Primärcluster</strong> unterstützt.</li>
<li>Es unterstützt <strong>keine</strong> Aktiv-Aktiv- oder Multi-Primär-Schreibvorgänge.</li>
<li>Standby-Cluster können Lesezugriffe bedienen, lehnen jedoch direkte Schreibvorgänge ab, solange sie im Standby-Modus bleiben.</li>
<li>Bei einem Failover können Daten verloren gehen, die auf den alten Primärserver geschrieben, aber noch nicht auf den Standby-Server repliziert wurden.</li>
<li>Die konfigurierte „ <code translate="no">pchannels</code> “ muss mit dem tatsächlichen Kanal-Layout jedes Clusters übereinstimmen.</li>
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
    </button></h3><p>Ja. Ein Standby-Cluster kann Lesezugriffe bedienen. Er kann jedoch keine Schreibvorgänge akzeptieren, bis er zum Primärcluster wird.</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Unterstützt Milvus CDC Aktiv-Aktiv-Schreibvorgänge?<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Milvus CDC ist für eine Topologie mit einem einzigen Primärcluster ausgelegt. Das gleichzeitige Schreiben in mehrere Cluster kann zu einem „Split Brain“ und zu Datenabweichungen führen.</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">Gehen beim Switchover Daten verloren?<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Bei der Umschaltung wird gewartet, bis die verbleibenden Daten repliziert sind, bevor der Standby-Cluster zum Primärcluster wird.</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">Gehen beim Failover Daten verloren?<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Das ist möglich. Alle Daten, die auf den alten Primärserver geschrieben, aber noch nicht auf den Standby-Server repliziert wurden, können verloren gehen.</p>
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
    </button></h3><p>Der potenzielle Datenverlust ist durch den CDC-Verzug zum Zeitpunkt der Nichtverfügbarkeit des Primärservers begrenzt.</p>
