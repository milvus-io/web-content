---
id: json-shredding.md
title: JSON-ShreddingCompatible with Milvus 2.6.2+
summary: >-
  JSON-Shredding beschleunigt JSON-Abfragen, indem es die herkömmliche
  zeilenbasierte Speicherung in eine optimierte spaltenorientierte Speicherung
  umwandelt. Unter Beibehaltung der Flexibilität von JSON bei der
  Datenmodellierung führt Milvus im Hintergrund eine spaltenorientierte
  Optimierung durch, die die Zugriffs- und Abfrageeffizienz erheblich
  verbessert.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON-Shredding<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON-Shredding beschleunigt JSON-Abfragen, indem es herkömmliche zeilenbasierte Speicherung in optimierte spaltenorientierte Speicherung umwandelt. Unter Beibehaltung der Flexibilität von JSON bei der Datenmodellierung führt Milvus im Hintergrund eine spaltenorientierte Optimierung durch, die die Zugriffs- und Abfrageeffizienz erheblich verbessert.</p>
<p>JSON-Shredding ist für die meisten JSON-Abfrageszenarien effektiv. Die Leistungsvorteile kommen besonders deutlich zum Tragen bei:</p>
<ul>
<li><p><strong>Größeren, komplexeren JSON-Dokumenten</strong> – Je größer die Dokumentgröße, desto größer die Leistungssteigerung</p></li>
<li><p><strong>Leseintensiven Workloads</strong> – Häufiges Filtern, Sortieren oder Suchen nach JSON-Schlüsseln</p></li>
<li><p><strong>Gemischte Abfragemuster</strong> – Abfragen über verschiedene JSON-Schlüssel hinweg profitieren vom hybriden Speicheransatz</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">So funktioniert es<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Der JSON-Shredding-Prozess erfolgt in drei unterschiedlichen Phasen, um die Daten für einen schnellen Abruf zu optimieren.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Phase 1: Erfassung und Schlüsselklassifizierung<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>Während neue JSON-Dokumente geschrieben werden, erfasst und analysiert Milvus diese kontinuierlich, um Statistiken für jeden JSON-Schlüssel zu erstellen. Diese Analyse umfasst die Häufigkeit des Schlüssels und die Typstabilität (ob sein Datentyp über alle Dokumente hinweg konsistent ist).</p>
<p>Auf der Grundlage dieser Statistiken werden JSON-Schlüssel für eine optimale Speicherung in die folgenden Kategorien eingeteilt.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Kategorien von JSON-Schlüsseln</h4><table>
   <tr>
     <th><p>Schlüsseltyp</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p>Typisierte Schlüssel</p></td>
     <td><p>Schlüssel, die in den meisten Dokumenten vorkommen und stets denselben Datentyp aufweisen (z. B. ausschließlich Ganzzahlen oder ausschließlich Zeichenfolgen).</p></td>
   </tr>
   <tr>
     <td><p>Dynamische Schlüssel</p></td>
     <td><p>Schlüssel, die häufig vorkommen, aber einen gemischten Datentyp aufweisen (z. B. mal eine Zeichenkette, mal eine Ganzzahl).</p></td>
   </tr>
   <tr>
     <td><p>Gemeinsam genutzte Schlüssel</p></td>
     <td><p>Selten vorkommende oder verschachtelte Schlüssel, die unter einem konfigurierbaren Häufigkeitsschwellenwert liegen<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Beispiel für eine Klassifizierung</h4><p>Betrachten Sie die folgenden Beispiel-JSON-Daten, die die folgenden JSON-Schlüssel enthalten:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Basierend auf diesen Daten würden die Schlüssel wie folgt klassifiziert werden:</p>
<ul>
<li><p><strong>Typisierte Schlüssel</strong>: <code translate="no">a</code> und <code translate="no">f</code> (immer eine Ganzzahl)</p></li>
<li><p><strong>Dynamische Schlüssel</strong>: <code translate="no">b</code> (gemischte Zeichenfolge/Ganzzahl)</p></li>
<li><p><strong>Gemeinsam genutzte Schlüssel</strong>: <code translate="no">e</code> (selten vorkommender Schlüssel)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Phase 2: Speicheroptimierung<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Klassifizierung aus <a href="/docs/de/json-shredding.md#Phase-1-Ingestion--key-classification">Phase 1</a> bestimmt das Speicherlayout. Milvus verwendet ein für Abfragen optimiertes spaltenorientiertes Format.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>JSON-Shredding-Ablauf</span>
  
 </span></p>
<ul>
<li><p><strong>Aufgesplittete Spalten</strong>: Bei <strong>typisierten</strong> und <strong>dynamischen</strong> <strong>Schlüsseln</strong> werden die Daten in dedizierte Spalten geschrieben. Diese spaltenorientierte Speicherung ermöglicht schnelle, direkte Durchsuchungen bei Abfragen, da Milvus nur die für einen bestimmten Schlüssel erforderlichen Daten lesen kann, ohne das gesamte Dokument verarbeiten zu müssen.</p></li>
<li><p><strong>Gemeinsame Spalte</strong>: Alle <strong>gemeinsamen Schlüssel</strong> werden zusammen in einer einzigen, kompakten binären JSON-Spalte gespeichert. Auf dieser Spalte wird ein <strong>invertierter Index</strong> für gemeinsame Schlüssel erstellt. Dieser Index ist entscheidend für die Beschleunigung von Abfragen auf selten vorkommende Schlüssel, da er es Milvus ermöglicht, die Daten schnell einzugrenzen und den Suchraum effektiv auf diejenigen Zeilen zu beschränken, die den angegebenen Schlüssel enthalten.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Phase 3: Abfrageausführung<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>In der letzten Phase wird das optimierte Speicherlayout genutzt, um für jedes Abfrageprädikat intelligent den schnellsten Pfad auszuwählen.</p>
<ul>
<li><p><strong>Schneller Pfad</strong>: Abfragen zu typisierten/dynamischen Schlüsseln (z. B. <code translate="no">json['a'] &lt; 100</code>) greifen direkt auf dedizierte Spalten zu</p></li>
<li><p><strong>Optimierter Pfad</strong>: Abfragen nach gemeinsam genutzten Schlüsseln (z. B. <code translate="no">json['e'] = 'rare'</code>) nutzen einen invertierten Index, um relevante Dokumente schnell zu finden</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">JSON-Shredding aktivieren<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Funktion zu aktivieren, setzen Sie „ <code translate="no">common.enabledJSONShredding</code> “ in Ihrer Konfigurationsdatei „ <code translate="no">milvus.yaml</code> “ auf „ <code translate="no">true</code> “. Neue Daten lösen den Shredding-Prozess automatisch aus.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald diese Funktion aktiviert ist, beginnt Milvus bei der Datenaufnahme mit der Analyse und Umstrukturierung Ihrer JSON-Daten, ohne dass ein weiterer manueller Eingriff erforderlich ist.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Parameteranpassung<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Für die meisten Benutzer sind die Standardeinstellungen der anderen Parameter ausreichend, sobald das JSON-Shredding aktiviert ist. Sie können das Verhalten des JSON-Shreddings jedoch mithilfe dieser Parameter in „ <code translate="no">milvus.yaml</code> “ feinabstimmen.</p>
<table>
   <tr>
     <th><p>Parametername</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Standardwert</p></th>
     <th><p>Empfehlung zur Anpassung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Legt fest, ob die Build- und Ladevorgänge für das JSON-Shredding aktiviert sind.</p></td>
     <td><p>false</p></td>
     <td><p>Muss auf <strong>„true“</strong> gesetzt werden, um die Funktion zu aktivieren.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Legt fest, ob Milvus aufgeschlüsselte Daten zur Beschleunigung verwendet.</p></td>
     <td><p>true</p></td>
     <td><p>Als Wiederherstellungsmaßnahme auf <strong>„false“</strong> setzen, falls Abfragen fehlschlagen; dadurch wird zum ursprünglichen Abfragepfad zurückgekehrt.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Legt fest, ob Milvus beim Laden von Shredding-Daten mmap verwendet.</p><p>Weitere Informationen finden Sie unter <a href="/docs/de/mmap.md">„mmap verwenden</a>“.</p></td>
     <td><p>true</p></td>
     <td><p>Diese Einstellung ist im Allgemeinen auf Leistung optimiert. Passen Sie sie nur an, wenn Sie spezifische Anforderungen an die Speicherverwaltung oder Einschränkungen auf Ihrem System haben.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>Die maximale Anzahl von JSON-Schlüsseln, die in Shredding-Spalten gespeichert werden. </p><p>Wenn die Anzahl häufig vorkommender Schlüssel diese Grenze überschreitet, priorisiert Milvus die häufigsten Schlüssel für die Shredding-Verarbeitung, und die übrigen Schlüssel werden in der gemeinsamen Spalte gespeichert.</p></td>
     <td><p>1024</p></td>
     <td><p>Dies ist für die meisten Szenarien ausreichend. Bei JSON-Daten mit Tausenden häufig vorkommender Schlüsseln müssen Sie diesen Wert möglicherweise erhöhen, sollten dabei jedoch die Speicherauslastung überwachen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>Die minimale Häufigkeitsrate, die ein JSON-Schlüssel aufweisen muss, um für die Aufteilung in eine „shredded“-Spalte in Betracht zu kommen.</p><p>Ein Schlüssel gilt als häufig vorkommend, wenn sein Anteil über diesem Schwellenwert liegt.</p></td>
     <td><p>0,3</p></td>
     <td><p><strong>Erhöhen Sie diesen Wert</strong> (z. B. auf 0,5), wenn die Anzahl der Schlüssel, die die Shredding-Kriterien erfüllen, die Grenze von „ <code translate="no">dataCoord.jsonShreddingMaxColumns</code> “ überschreitet. Dadurch wird der Schwellenwert strenger, was die Anzahl der Schlüssel reduziert, die für das Shredding in Frage kommen.</p><p><strong>Verringern Sie den Wert</strong> (z. B. auf 0,1), wenn Sie mehr Schlüssel aufteilen möchten, die seltener als der standardmäßige Schwellenwert von 30 % vorkommen.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Leistungsbenchmarks<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Unsere Tests zeigen deutliche Leistungsverbesserungen bei verschiedenen JSON-Schlüsseltypen und Abfragemustern.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Testumgebung und Methodik<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Hardware</strong>: Cluster mit 1 Kern/8 GB</p></li>
<li><p><strong>Datensatz</strong>: 1 Million Dokumente aus <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Durchschnittliche Dokumentgröße</strong>: 478,89 Byte</p></li>
<li><p><strong>Testdauer</strong>: 100 Sekunden zur Messung von QPS und Latenz</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Ergebnisse: typisierte Schlüssel<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Test hat die Leistung bei der Abfrage eines Schlüssels gemessen, der in den meisten Dokumenten vorhanden ist.</p>
<table>
   <tr>
     <th><p>Abfrageausdruck</p></th>
     <th><p>Schlüsselwerttyp</p></th>
     <th><p>QPS (ohne Shredding)</p></th>
     <th><p>QPS (mit Shredding)</p></th>
     <th><p>Leistungssteigerung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Ganzzahl</p></td>
     <td><p>8,69</p></td>
     <td><p>287,50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Zeichenkette</p></td>
     <td><p>8,42</p></td>
     <td><p>126,1</p></td>
     <td><p>14,9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Ergebnisse: gemeinsam genutzte Schlüssel<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Test konzentrierte sich auf die Abfrage spärlicher, verschachtelter Schlüssel, die in die Kategorie „gemeinsam genutzt“ fallen.</p>
<table>
   <tr>
     <th><p>Abfrageausdruck</p></th>
     <th><p>Schlüsselwerttyp</p></th>
     <th><p>QPS (ohne Shredding)</p></th>
     <th><p>QPS (mit Shredding)</p></th>
     <th><p>Leistungssteigerung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Verschachtelte Ganzzahl</p></td>
     <td><p>4,33</p></td>
     <td><p>385</p></td>
     <td><p>88,9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Verschachtelte Zeichenkette</p></td>
     <td><p>7,6</p></td>
     <td><p>352</p></td>
     <td><p>46,3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Wichtige Erkenntnisse<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Abfragen mit gemeinsamem Schlüssel</strong> zeigen die deutlichsten Verbesserungen (bis zu 89-mal schneller)</p></li>
<li><p><strong>Abfragen mit typisierten Schlüsseln</strong> bieten konsistente Leistungssteigerungen um das 15- bis 30-Fache</p></li>
<li><p><strong>Alle Abfragetypen</strong> profitieren von JSON-Shredding ohne Leistungseinbußen</p></li>
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
    </button></h2><ul>
<li><p><strong>Wie kann ich überprüfen, ob das JSON-Shredding ordnungsgemäß funktioniert?</strong></p>
<ol>
<li><p>Überprüfen Sie zunächst mit dem Befehl „ <code translate="no">show segment --format table</code> “ im <a href="/docs/de/birdwatcher_usage_guides.md">Birdwatcher</a> -Tool, ob die Daten erstellt wurden. Bei Erfolg enthält die Ausgabe unter dem Feld <strong>„Json Key Stats</strong> “ die Werte „ <code translate="no">shredding_data/</code> “ und „ <code translate="no">shared_key_index/</code> “.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>Birdwatcher-Ausgabe</span>
  
 </span></p></li>
<li><p>Überprüfen Sie anschließend, ob die Daten geladen wurden, indem Sie „ <code translate="no">show loaded-json-stats</code> “ auf dem Abfrageknoten ausführen. Die Ausgabe zeigt Details zu den geladenen, aufgeschlüsselten Daten für jeden Abfrageknoten an.</p></li>
</ol></li>
<li><p><strong>Was tun, wenn ein Fehler auftritt?</strong></p>
<p>Wenn der Erstellungs- oder Ladeprozess fehlschlägt, können Sie die Funktion schnell deaktivieren, indem Sie „ <code translate="no">common.enabledJSONShredding=false</code> “ festlegen. Um verbleibende Aufgaben zu löschen, verwenden Sie den Befehl „ <code translate="no">remove stats-task &lt;task_id&gt;</code> “ in <a href="/docs/de/birdwatcher_usage_guides.md">Birdwatcher</a>. Wenn eine Abfrage fehlschlägt, legen Sie „ <code translate="no">common.usingjsonShreddingForQuery=false</code> “ fest, um zum ursprünglichen Abfragepfad zurückzukehren und die zerlegten Daten zu umgehen.</p></li>
</ul>
<ul>
<li><p><strong>Wie wähle ich zwischen JSON-Shredding und JSON-Indizierung?</strong></p>
<ul>
<li><p><strong>JSON-Shredding</strong> eignet sich ideal für Schlüssel, die in Ihren Dokumenten häufig vorkommen, insbesondere bei komplexen JSON-Strukturen. Es vereint die Vorteile der spaltenorientierten Speicherung und der invertierten Indizierung und eignet sich daher besonders für leseintensive Szenarien, in denen Sie viele verschiedene Schlüssel abfragen. Für sehr kleine JSON-Dokumente wird es jedoch nicht empfohlen, da der Leistungsgewinn minimal ist. Je geringer der Anteil des Schlüsselwerts an der Gesamtgröße des JSON-Dokuments ist, desto besser ist die Leistungsoptimierung durch das Shredding.</p></li>
<li><p><strong>Die JSON-Indizierung</strong> eignet sich besser für die gezielte Optimierung bestimmter schlüsselbasierter Abfragen und verursacht einen geringeren Speicheraufwand. Sie ist für einfachere JSON-Strukturen geeignet. Beachten Sie, dass das JSON-Shredding keine Abfragen auf Schlüssel innerhalb von Arrays abdeckt; um diese zu beschleunigen, benötigen Sie einen JSON-Index.</p></li>
</ul>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/json-field-overview.md#Next-Accelerate-JSON-queries">„Übersicht über JSON-Felder</a>“.</p></li>
</ul>
