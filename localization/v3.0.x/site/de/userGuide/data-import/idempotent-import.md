---
id: idempotent-import.md
order: 2
title: Idempotenter Massenimport
summary: >-
  Senden Sie einen Idempotenzschlüssel, damit bei einem erneuten Massenimport
  der ursprüngliche Auftrag wiederhergestellt wird, anstatt einen zweiten zu
  erstellen.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">Idempotenter Massenimport<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>Eine Massenimportanfrage kann erfolgreich sein, obwohl die Antwort verloren geht: Die Zeitüberschreitung des Aufrufs, eine unterbrochene Verbindung oder ein Absturz Ihres Orchestrators, bevor die zurückgegebene <code translate="no">jobId</code> gespeichert wird. Sie können nicht zwischen „noch nicht abgeschlossen“ und „abgeschlossen, Antwort verloren“ unterscheiden. Ein erneuter Versuch startet einen zweiten Job, und jede Zeile wird doppelt importiert; ohne erneuten Versuch geht der Import möglicherweise verloren.</p>
<p>Ein Idempotenzschlüssel macht diese Entscheidung überflüssig. Wenn Sie die Anfrage mit einem solchen Schlüssel versehen, gibt ein Wiederholungsversuch mit demselben Schlüssel die ursprüngliche „ <code translate="no">jobId</code> “ zurück, anstatt einen zweiten Job zu erstellen.</p>
<p>Für den idempotenten Massenimport ist Milvus 3.0.2 oder höher bzw. 2.6.24 oder höher aus der 2.6-Reihe erforderlich. Ein älterer Server ignoriert den Header, und jede Anfrage – ob mit Wiederholungsversuch oder nicht – startet einen neuen Job.</p>
<h2 id="Sending-the-key" class="common-anchor-header">Übermittlung des Schlüssels<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Schlüssel wird als HTTP-Header „ <code translate="no">Idempotency-Key</code> “ übertragen, nicht im Request-Body.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> lautet „ <code translate="no">&quot;Idempotency-Key&quot;</code> “; die Rohzeichenfolge funktioniert ebenfalls. Die Parameter „ <code translate="no">headers</code> “ und „ <code translate="no">IDEMPOTENCY_KEY_HEADER</code> “ erfordern pymilvus v3.0.3 oder höher in der 3.x-Reihe oder v2.6.18 oder höher in der 2.6-Reihe. Bei einer älteren pymilvus-Version schlägt die obige Zeile „ <code translate="no">import</code> “ mit einem „ <code translate="no">ImportError</code> “ bei der Suche nach „ <code translate="no">IDEMPOTENCY_KEY_HEADER</code> “ fehl, und die Übergabe von „ <code translate="no">headers</code> “ an „ <code translate="no">bulk_import</code> “ führt zu undefiniertem Verhalten – der Aufruf kann fehlschlagen oder der Import wird möglicherweise ohne den Schlüssel übermittelt.</p>
<p>Fragen Sie <code translate="no">/v2/vectordb/jobs/import/describe</code> wie gewohnt mit dem zurückgegebenen <code translate="no">jobId</code> ab. Ein Wiederholungsversuch, der eintrifft, während der ursprüngliche Versuch noch registriert wird, wartet darauf, sodass ein Wiederholungsversuch niemals einen halb registrierten Auftrag bemerkt.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">Auswahl eines Schlüssels<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>Ein Schlüssel pro logischer Anfrage.</strong> Benennen Sie die Arbeitseinheit, z. B. „ <code translate="no">orders-2026-09-07-batch-3</code> “, oder generieren Sie eine UUID und speichern Sie diese zusammen mit dem Arbeitselement, bevor Sie die Anfrage senden. Fügen Sie eine Versuchsnummer hinzu, falls Sie dieselbe Arbeit möglicherweise erneut ausführen müssen.</li>
<li><strong>Führen Sie den Wiederholungsversuch mit demselben Schlüssel durch.</strong> Die Generierung eines neuen Schlüssels bei einem Wiederholungsversuch führt zu Datenduplikaten. Die Ausnahmen sind unter <a href="#when-to-send-a-new-key">„Wann ein neuer Schlüssel gesendet werden sollte</a>“ aufgeführt.</li>
<li><strong>Verwenden Sie einen Schlüssel niemals für verschiedene Dateien wieder.</strong> Milvus vergleicht die beiden Anfragen nicht. Sie erhalten das ursprüngliche „ <code translate="no">jobId</code> “ zurück, und die neuen Dateien werden nicht importiert.</li>
<li><strong>Halten Sie den Schlüssel kurz und druckbar.</strong> Druckbares ASCII, standardmäßig maximal 256 Byte (<code translate="no">streaming.idempotency.maxKeyLength</code>). Alles andere wird mit dem Fehler „ <code translate="no">1100</code> “ abgelehnt.</li>
<li><strong>Füge keine geheimen Informationen hinzu.</strong> Der Schlüssel wird zusammen mit deinen Daten gespeichert.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">Wie lange ein Schlüssel gespeichert bleibt<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Schlüssel ist über die interne ID an die Sammlung gebunden, sodass eine Umbenennung der Sammlung einen Wiederholungsversuch nicht unterbricht, solange der Wiederholungsversuch die Sammlung mit ihrem neuen Namen bezeichnet. Das Löschen und erneute Erstellen der Sammlung unter demselben Namen unterbricht den Vorgang jedoch, und in diesem Fall ist ein neuer Job die richtige Lösung.</p>
<p>Milvus speichert einen Importschlüssel etwa einen Tag lang. Betrachten Sie dies eher als Richtwert denn als garantierte Dauer: Starker DDL- oder Importverkehr verkürzt diese Zeitspanne, ein Neustart des Koordinators verlängert sie. Ein Wiederholungsversuch, nachdem der Schlüssel vergessen wurde, startet einen neuen Job.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">Wann ein neuer Schlüssel gesendet werden sollte<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Zwei Fälle, und zwar ausschließlich diese beiden:</p>
<ul>
<li><strong>Der ursprüngliche Job ist fehlgeschlagen oder wurde abgebrochen.</strong> „Describe“ gibt „ <code translate="no">state: Failed</code> “ mit einer Begründung zurück. Ein erneuter Versuch mit dem Schlüssel gibt denselben „ <code translate="no">jobId</code> “ zurück, solange der Schlüssel noch gespeichert ist. Beheben Sie die Ursache und senden Sie dann einen neuen Schlüssel.</li>
<li><strong>Der ursprüngliche Auftrag wurde bereinigt.</strong> Milvus bewahrt abgeschlossene Aufträge für „ <code translate="no">dataCoord.import.taskRetention</code> “<strong>auf</strong> (standardmäßig 48 Stunden). Wenn diese Frist abläuft, während der Schlüssel noch gespeichert ist, gibt der erneute Versuch den alten „ <code translate="no">jobId</code> “ zurück, und „describe“ antwortet mit dem Fehler „ <code translate="no">import job does not exist</code> “ anstelle eines Auftragsstatus. Dieser Auftrag könnte erfolgreich gewesen sein. Vergewissern Sie sich, dass die Daten tatsächlich fehlen, bevor Sie einen neuen Schlüssel senden.</li>
</ul>
<p>Ein Wiederholungsversuch, der abgelehnt wird, beispielsweise weil das Limit für Importaufträge erreicht ist, gehört nicht zu diesen Fällen. Versuchen Sie es später mit demselben Schlüssel erneut.</p>
<h2 id="Configuration" class="common-anchor-header">Konfiguration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Vier Parameter bestimmen das Verhalten auf dieser Seite. Keiner davon muss geändert werden, damit der Schlüssel funktioniert.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Standard</th><th>Funktion</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>Wie lange ein Importschlüssel gespeichert bleibt. Nicht in der Standard <code translate="no">milvus.yaml</code> enthalten; fügen Sie ihn explizit hinzu, um ihn zu ändern. Der gleiche Speicher lehnt auch doppelte DDL-Übermittlungen ab, senken Sie den Wert also nicht, nur um das Importfenster zu verkürzen.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>Wie viele Schlüssel und DDL-Datensätze derselbe Speicher enthält, bevor die ältesten gelöscht werden, unabhängig von ihrem Alter. Dadurch kann bei hohem DDL- oder Importaufkommen ein Schlüssel vor dem <code translate="no">maxLifetime</code> vergessen werden. Nicht in der Standarddatei <code translate="no">milvus.yaml</code> enthalten.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 Stunden) seit 2.6.24 und 3.0.2; <code translate="no">10800</code> vor</td><td>Wie lange ein abgeschlossener Importvorgang abfragbar bleibt. Setzen Sie diesen Wert auf mindestens das Doppelte von „ <code translate="no">maxLifetime</code> “.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>Die maximale Schlüssellänge in Byte. Ein längerer Schlüssel wird mit der Fehlermeldung „ <code translate="no">1100</code> “ abgelehnt. „ <code translate="no">0</code> “ deaktiviert die Begrenzung. Nicht in der Standarddatei „ <code translate="no">milvus.yaml</code> “ enthalten.</td></tr>
</tbody>
</table>
<p>Die vor Version 2.6.24 und 3.0.2 ausgelieferten „ <code translate="no">milvus.yaml</code> “-Dateien setzen „ <code translate="no">taskRetention: 10800</code> “ explizit, und ein Upgrade überschreibt den Wert in Ihrer Datei nicht. Wenn Sie mit dieser Datei ein Upgrade durchgeführt haben, erhöhen Sie „ <code translate="no">taskRetention</code> “ auf mindestens das Doppelte von „ <code translate="no">maxLifetime</code> “. Der neue Wert gilt nur für Jobs, die nach der Änderung abgeschlossen werden.</p>
