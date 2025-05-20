---
id: chunk_cache.md
title: Chunk-Cache konfigurieren
summary: ''
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">Chunk-Cache konfigurieren<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Chunk-Cache-Mechanismus ermöglicht es Milvus, Daten in den Cache auf der lokalen Festplatte der Abfrageknoten zu laden, bevor sie benötigt werden. Dieser Mechanismus verbessert die Leistung des Vektorabrufs erheblich, da die Zeit, die zum Laden der Daten von der Festplatte in den Speicher benötigt wird, reduziert wird.</p>
<h2 id="Background" class="common-anchor-header">Hintergrund<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>Vor der Durchführung von Abfragen zum Abrufen von Vektoren muss Milvus die Daten aus dem Objektspeicher in den Speichercache auf der lokalen Festplatte der Abfrageknoten laden. Dies ist ein zeitaufwändiger Prozess. Bevor alle Daten geladen sind, kann Milvus auf einige Vektorabfragen mit einer Verzögerung reagieren.</p>
<p>Um die Abfrageleistung zu verbessern, bietet Milvus einen Chunk-Cache-Mechanismus, um Daten aus dem Objektspeicher in den Cache auf der lokalen Festplatte zu laden, bevor sie benötigt werden. Wenn eine Abfrageanforderung eingeht, prüft der Segcore zunächst, ob sich die Daten im Cache und nicht im Objektspeicher befinden. Wenn sich die Daten im Cache befinden, kann Segcore sie schnell aus dem Cache abrufen und das Ergebnis an den Client zurückgeben.</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">Chunk-Cache konfigurieren<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Leitfaden enthält Anweisungen zur Konfiguration des Chunk-Cache-Mechanismus für eine Milvus-Instanz. Die Konfiguration hängt von der Art und Weise ab, wie Sie die Milvus-Instanz installieren.</p>
<ul>
<li><p>Für Milvus-Instanzen, die mit Helm Charts installiert wurden</p>
<p>Fügen Sie die Konfiguration in die Datei <code translate="no">values.yaml</code> unter dem Abschnitt <code translate="no">config</code> ein. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/configure-helm.md">Konfigurieren von Milvus mit Helm Charts</a>.</p></li>
<li><p>Für Milvus-Instanzen, die mit Docker Compose installiert wurden</p>
<p>Fügen Sie die Konfiguration in die Datei <code translate="no">milvus.yaml</code> ein, die Sie zum Starten der Milvus-Instanz verwendet haben. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/configure-docker.md">Konfigurieren von Milvus mit Docker Compose</a>.</p></li>
<li><p>Für Milvus-Instanzen, die mit Operator installiert wurden</p>
<p>Fügen Sie die Konfiguration in den Abschnitt <code translate="no">spec.components</code> der benutzerdefinierten Ressource <code translate="no">Milvus</code> ein. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/configure_operator.md">Konfigurieren von Milvus mit Operator</a>.</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">Konfigurationsoptionen</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der Parameter <code translate="no">warmup</code> bestimmt, ob Milvus Daten aus dem Objektspeicher in den Cache auf der lokalen Festplatte der Abfrageknoten lädt, bevor sie benötigt werden. Die Voreinstellung für diesen Parameter ist <code translate="no">disable</code>. Mögliche Optionen sind wie folgt:</p>
<ul>
<li><code translate="no">async</code>: Milvus lädt die Daten asynchron im Hintergrund vor, was sich nicht auf die Zeit auswirkt, die zum Laden einer Sammlung benötigt wird. Allerdings kann es beim Abrufen von Vektoren zu einer kurzen Verzögerung kommen, nachdem der Ladevorgang abgeschlossen ist.  Dies ist die Standardoption.</li>
<li><code translate="no">sync</code>: Milvus lädt die Daten synchron vor, was sich auf die Ladezeit einer Sammlung auswirken kann. Benutzer können jedoch sofort nach Abschluss des Ladevorgangs ohne Verzögerung Abfragen durchführen.</li>
<li><code translate="no">disable</code>: Milvus lädt die Daten nicht vorab in den Speicher-Cache.</li>
</ul>
<p>Beachten Sie, dass die Chunk-Cache-Einstellungen auch dann gelten, wenn neue Daten in Sammlungen eingefügt oder die Sammlungsindizes neu erstellt werden.</p>
<h3 id="FAQ" class="common-anchor-header">FAQ</h3><ul>
<li><p><strong>Wie kann ich feststellen, ob der Chunk-Cache-Mechanismus korrekt funktioniert?</strong></p>
<p>Es wird empfohlen, die Latenzzeit einer Such- oder Abfrageanfrage nach dem Laden einer Sammlung zu überprüfen. Wenn die Latenzzeit deutlich höher ist als erwartet (z. B. mehrere Sekunden), kann dies ein Hinweis darauf sein, dass der Chunk-Cache-Mechanismus noch funktioniert.</p>
<p>Wenn die Abfragelatenz über einen längeren Zeitraum hoch bleibt. Sie können den Durchsatz des Objektspeichers überprüfen, um sicherzustellen, dass der Chunk-Cache noch funktioniert. In normalen Fällen erzeugt der funktionierende Chunk-Cache einen hohen Durchsatz auf dem Objektspeicher. Alternativ können Sie den Chunk-Cache auch einfach im Modus <code translate="no">sync</code> ausprobieren.</p></li>
</ul>
