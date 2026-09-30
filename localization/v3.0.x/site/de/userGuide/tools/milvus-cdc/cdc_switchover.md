---
id: cdc_switchover.md
summary: >-
  Erfahren Sie, wie Sie eine geplante Umschaltung zwischen primären und
  Standby-Milvus-Clustern mit Milvus CDC durchführen.
title: Umschaltung
---
<h1 id="Switchover" class="common-anchor-header">Umschaltung<button data-href="#Switchover" class="anchor-icon" translate="no">
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
    </button></h1><p>Switchover ändert die Richtung zwischen Primär und Standby ohne Datenverlust. Verwenden Sie dies, wenn der aktuelle primäre Cluster noch erreichbar ist oder wenn Sie den Datenverkehr zu Wartungszwecken umleiten müssen.</p>
<p>In diesem Leitfaden wird von der aktuellen Topologie ausgegangen:</p>
<pre><code translate="no" class="language-text">cluster-a (primary)  -&gt;  cluster-b (standby)
<button class="copy-code-btn"></button></code></pre>
<p>Nach dem Switchover sieht die Topologie folgendermaßen aus:</p>
<pre><code translate="no" class="language-text">cluster-b (primary)  -&gt;  cluster-a (standby)
<button class="copy-code-btn"></button></code></pre>
<h2 id="When-to-Use-Switchover" class="common-anchor-header">Wann Sie Switchover verwenden sollten<button data-href="#When-to-Use-Switchover" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie Switchover, wenn:</p>
<ul>
<li>Sie Wartungsarbeiten am aktuellen Primärserver durchführen.</li>
<li>Der Primärserver ist teilweise beeinträchtigt, kann aber noch auf Anfragen reagieren.</li>
<li>Sie benötigen RPO = 0 und können keinen Datenverlust akzeptieren.</li>
</ul>
<p>Verwenden Sie die Umschaltung nicht, wenn der primäre Server nicht mehr verfügbar ist. Verwenden Sie in diesem Fall <a href="/docs/de/cdc_failover.md">Failover</a>.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Überprüfen Sie Folgendes, bevor Sie beginnen:</p>
<ul>
<li>Beide Cluster sind erreichbar.</li>
<li>Die CDC-Replikation ist in Ordnung.</li>
<li>Die CDC-Verzögerung ist niedrig genug für die angestrebte Wiederherstellungszeit.</li>
<li>Die Schreibvorgänge der Anwendung können während des Rollenwechsels angehalten oder erneut versucht werden.</li>
<li>Sie haben die neue Topologiekonfiguration vorbereitet.</li>
</ul>
<p>Die Umschaltung garantiert keinen Datenverlust, aber die Betriebszeit hängt davon ab, wie viele Daten noch repliziert werden müssen.</p>
<h2 id="Build-the-New-Topology" class="common-anchor-header">Erstellen Sie die neue Topologie<button data-href="#Build-the-New-Topology" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie eine vollständige Ersetzungskonfiguration, bei der <code translate="no">cluster-b</code> die Quelle und <code translate="no">cluster-a</code> das Ziel wird.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># If you followed Set Up CDC Replication, cluster A is the original source cluster,</span>
<span class="hljs-comment"># and cluster B is the original target cluster.</span>
cluster_a_id = source_cluster_id
cluster_a_addr = source_cluster_addr
cluster_a_client_addr = source_client_addr
cluster_a_token = source_cluster_token
cluster_a_pchannels = source_cluster_pchannels

cluster_b_id = target_cluster_id
cluster_b_addr = target_cluster_addr
cluster_b_client_addr = target_client_addr
cluster_b_token = target_cluster_token
cluster_b_pchannels = target_cluster_pchannels

switchover_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_a_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_a_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_a_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_a_pchannels,
        },
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_b_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_b_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_b_pchannels,
        },
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [
        {
            <span class="hljs-string">&quot;source_cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;target_cluster_id&quot;</span>: cluster_a_id,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-the-New-Topology" class="common-anchor-header">Anwenden der neuen Topologie<button data-href="#Apply-the-New-Topology" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenden Sie die gleiche Konfiguration auf beide Cluster an. Senden Sie die Anforderung zuerst an den aktuellen primären und dann an den Standby-Cluster. Wenn Sie später zurückwechseln, kehren Sie die Reihenfolge um, da <code translate="no">cluster-b</code> der aktuelle Primärserver ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client_a = MilvusClient(uri=cluster_a_client_addr, token=cluster_a_token)
client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_a.update_replicate_configuration(**switchover_config)
    client_b.update_replicate_configuration(**switchover_config)
<span class="hljs-keyword">finally</span>:
    client_a.close()
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>Der alte Primärserver wird zum Standby-Server degradiert und lehnt neue Schreibvorgänge ab. Der alte Standby-Server wartet auf die verbleibenden replizierten Daten, stuft sich selbst zum primären Server herauf und nimmt dann Schreibvorgänge an.</p>
<p>Wenn die Anforderung aufgrund eines vorübergehenden Netzwerk- oder Dienstfehlers fehlschlägt, versuchen Sie es erneut mit derselben Konfiguration.</p>
<h2 id="Redirect-Application-Traffic" class="common-anchor-header">Umleitung des Anwendungsverkehrs<button data-href="#Redirect-Application-Traffic" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem <code translate="no">cluster-b</code> primär geworden ist:</p>
<ol>
<li>Leiten Sie den Schreibverkehr auf <code translate="no">cluster-b</code> um.</li>
<li>Bestätigen Sie, dass Lese- und Schreibvorgänge auf <code translate="no">cluster-b</code> erfolgreich sind.</li>
<li>Vergewissern Sie sich, dass <code translate="no">cluster-a</code> keine Schreibzugriffe von Anwendungen mehr empfängt.</li>
<li>Überwachen Sie weiterhin die Replikation von <code translate="no">cluster-b</code> zurück zu <code translate="no">cluster-a</code>.</li>
</ol>
<h2 id="Verify-the-Result" class="common-anchor-header">Überprüfen Sie das Ergebnis<button data-href="#Verify-the-Result" class="anchor-icon" translate="no">
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
    </button></h2><p>Vergewissern Sie sich, dass <code translate="no">cluster-b</code> als neuer Primärserver fungiert und die Daten konsistent bleiben. Zu den üblichen Überprüfungen gehören:</p>
<ul>
<li>Vergleichen Sie die Zeilenzahlen für wichtige Collections.</li>
<li>Abfrage bekannter Primärschlüssel aus beiden Clustern.</li>
<li>Führen Sie eine repräsentative Suche auf dem neuen primären und dem alten Standby-Server durch.</li>
<li>Führen Sie einen kleinen Schreibvorgang auf <code translate="no">cluster-b</code> aus und bestätigen Sie, dass er auf <code translate="no">cluster-a</code> repliziert wird.</li>
</ul>
<h2 id="Switch-Back" class="common-anchor-header">Zurückwechseln<button data-href="#Switch-Back" class="anchor-icon" translate="no">
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
    </button></h2><p>Um später zurückzuschalten, wenden Sie die ursprüngliche Topologie erneut an:</p>
<pre><code translate="no" class="language-text">cluster-a -&gt; cluster-b
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie denselben Umschaltvorgang. Vergewissern Sie sich vor dem Zurückschalten, dass der aktuelle Primärserver erreichbar und die Replikation in Ordnung ist.</p>
<h2 id="FAQ" class="common-anchor-header">HÄUFIG GESTELLTE FRAGEN<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Does-switchover-lose-data" class="common-anchor-header">Gehen beim Switchover Daten verloren?<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Beim Switchover wird gewartet, bis die verbleibenden Daten repliziert sind, bevor der Standby-Server zum Primärserver wird.</p>
<h3 id="Do-I-need-to-stop-application-writes" class="common-anchor-header">Muss ich die Schreibvorgänge der Anwendung stoppen?<button data-href="#Do-I-need-to-stop-application-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>Während des Rollenwechsels sollten Sie Schreibvorgänge unterbrechen oder die Wiederholung von Schreibvorgängen ermöglichen. Schreibvorgänge, die an den alten Primärserver gesendet werden, nachdem er degradiert wurde, werden zurückgewiesen.</p>
<h3 id="Why-does-switchover-take-longer-than-expected" class="common-anchor-header">Warum dauert die Umstellung länger als erwartet?<button data-href="#Why-does-switchover-take-longer-than-expected" class="anchor-icon" translate="no">
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
    </button></h3><p>Der häufigste Grund ist die CDC-Verzögerung. Der neue Primärserver muss die verbleibenden Daten erhalten, bevor er sicher mit RPO = 0 übernehmen kann.</p>
<h3 id="Can-I-retry-a-failed-switchover-request" class="common-anchor-header">Kann ich eine fehlgeschlagene Umschaltanforderung wiederholen?<button data-href="#Can-I-retry-a-failed-switchover-request" class="anchor-icon" translate="no">
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
    </button></h3><p>Ja. Wiederholen Sie den Vorgang mit derselben Zieltopologie.</p>
<h3 id="What-happens-to-the-old-primary" class="common-anchor-header">Was passiert mit dem alten Primärserver?<button data-href="#What-happens-to-the-old-primary" class="anchor-icon" translate="no">
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
    </button></h3><p>Der alte Primärserver wird zum Standby-Server. Sie sollte keine Schreibzugriffe von Anwendungen mehr erhalten.</p>
