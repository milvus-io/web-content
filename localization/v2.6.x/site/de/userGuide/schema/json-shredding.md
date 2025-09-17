---
id: json-shredding.md
title: JSON-ZerkleinerungCompatible with Milvus 2.6.2+
summary: >-
  JSON Shredding beschleunigt JSON-Abfragen durch die Umwandlung traditioneller
  zeilenbasierter Speicherung in optimierte spaltenbasierte Speicherung. Während
  die Flexibilität von JSON für die Datenmodellierung beibehalten wird, führt
  Milvus hinter den Kulissen eine spaltenbasierte Optimierung durch, die den
  Zugriff und die Abfrageeffizienz erheblich verbessert.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON-Zerkleinerung<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON Shredding beschleunigt JSON-Abfragen durch die Umwandlung traditioneller zeilenbasierter Speicherung in optimierte spaltenbasierte Speicherung. Während die Flexibilität von JSON für die Datenmodellierung beibehalten wird, führt Milvus hinter den Kulissen eine spaltenbasierte Optimierung durch, die den Zugriff und die Abfrageeffizienz erheblich verbessert.</p>
<p>JSON Shredding ist für die meisten JSON-Abfrageszenarien effektiv. Die Leistungsvorteile werden deutlicher bei:</p>
<ul>
<li><p><strong>Größere, komplexere JSON-Dokumente</strong> - Größere Leistungsgewinne mit zunehmender Dokumentgröße</p></li>
<li><p><strong>Leselastige Arbeitslasten</strong> - Häufiges Filtern, Sortieren oder Suchen nach JSON-Schlüsseln</p></li>
<li><p><strong>Gemischte Abfragemuster</strong> - Abfragen über verschiedene JSON-Schlüssel profitieren vom hybriden Speicheransatz</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Wie das funktioniert<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Der JSON-Shredding-Prozess erfolgt in drei verschiedenen Phasen, um die Daten für einen schnellen Abruf zu optimieren.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Phase 1: Ingestion &amp; Schlüsselklassifizierung<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn neue JSON-Dokumente geschrieben werden, nimmt Milvus kontinuierlich Proben und analysiert sie, um Statistiken für jeden JSON-Schlüssel zu erstellen. Diese Analyse umfasst die Häufigkeit des Auftretens des Schlüssels und die Stabilität des Typs (ob der Datentyp in allen Dokumenten gleich ist).</p>
<p>Auf der Grundlage dieser Statistiken werden die JSON-Schlüssel für eine optimale Speicherung in die folgenden Kategorien eingeteilt.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Kategorien von JSON-Schlüsseln</h4><table>
   <tr>
     <th><p>Schlüssel Typ</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p>Typisierte Schlüssel</p></td>
     <td><p>Schlüssel, die in den meisten Dokumenten vorkommen und immer denselben Datentyp haben (z. B. alle Ganzzahlen oder alle Zeichenketten).</p></td>
   </tr>
   <tr>
     <td><p>Dynamische Schlüssel</p></td>
     <td><p>Schlüssel, die häufig vorkommen, aber einen gemischten Datentyp haben (z. B. manchmal eine Zeichenkette, manchmal eine ganze Zahl).</p></td>
   </tr>
   <tr>
     <td><p>Gemeinsame Schlüssel</p></td>
     <td><p>Selten vorkommende oder verschachtelte Schlüssel, die unter einer konfigurierbaren Häufigkeitsschwelle liegen<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Beispiel einer Klassifizierung</h4><p>Betrachten Sie die JSON-Beispieldaten, die die folgenden JSON-Schlüssel enthalten:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Basierend auf diesen Daten würden die Schlüssel wie folgt klassifiziert werden:</p>
<ul>
<li><p><strong>Getippte Schlüssel</strong>: <code translate="no">a</code> und <code translate="no">f</code> (immer eine ganze Zahl)</p></li>
<li><p><strong>Dynamische Schlüssel</strong>: <code translate="no">b</code> (gemischte Zeichenkette/Ganzzahl)</p></li>
<li><p><strong>Gemeinsame Schlüssel</strong>: <code translate="no">e</code> (selten vorkommender Schlüssel)</p></li>
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
    </button></h3><p>Die Klassifizierung aus <a href="/docs/de/json-shredding.md#Phase-1-Ingestion--key-classification">Phase 1</a> gibt das Speicherlayout vor. Milvus verwendet ein spaltenförmiges Format, das für Abfragen optimiert ist.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Json Shredding Fluss</span> </span></p>
<ul>
<li><p><strong>Geschredderte Spalten</strong>: Für <strong>typisierte</strong> und <strong>dynamische</strong> <strong>Schlüssel</strong> werden die Daten in dedizierte Spalten geschrieben. Diese spaltenförmige Speicherung ermöglicht schnelle, direkte Scans bei Abfragen, da Milvus nur die benötigten Daten für einen bestimmten Schlüssel lesen kann, ohne das gesamte Dokument zu verarbeiten.</p></li>
<li><p><strong>Gemeinsame Spalte</strong>: Alle <strong>gemeinsam genutzten Schlüssel</strong> werden zusammen in einer einzigen, kompakten binären JSON-Spalte gespeichert. Auf dieser Spalte wird ein <strong>invertierter Index für</strong> gemeinsame Schlüssel erstellt. Dieser Index ist von entscheidender Bedeutung für die Beschleunigung von Abfragen zu Schlüsseln mit geringer Häufigkeit, da er Milvus ermöglicht, die Daten schnell zu beschneiden und den Suchraum effektiv auf die Zeilen zu beschränken, die den angegebenen Schlüssel enthalten.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Phase 3: Ausführung der Abfrage<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>In der letzten Phase wird das optimierte Speicherlayout genutzt, um auf intelligente Weise den schnellsten Pfad für jedes Abfrageprädikat auszuwählen.</p>
<ul>
<li><p><strong>Schneller Pfad</strong>: Abfragen auf typisierte/dynamische Schlüssel (z. B. <code translate="no">json['a'] &lt; 100</code>) greifen direkt auf dedizierte Spalten zu.</p></li>
<li><p><strong>Optimierter Pfad</strong>: Abfragen auf gemeinsam genutzte Schlüssel (z. B. <code translate="no">json['e'] = 'rare'</code>) verwenden einen invertierten Index, um relevante Dokumente schnell zu finden</p></li>
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
    </button></h2><p>Um die Funktion zu aktivieren, setzen Sie <code translate="no">common.enabledJSONKeyStats</code> in Ihrer Konfigurationsdatei <code translate="no">milvus.yaml</code> auf <code translate="no">true</code>. Neue Daten lösen automatisch den Schredderprozess aus.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONKeyStats:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald die Funktion aktiviert ist, beginnt Milvus mit der Analyse und Umstrukturierung Ihrer JSON-Daten bei der Aufnahme, ohne dass ein weiterer manueller Eingriff erforderlich ist.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Einstellung der Parameter<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Für die meisten Benutzer sind die Standardeinstellungen für andere Parameter ausreichend, sobald JSON Shredding aktiviert ist. Sie können jedoch das Verhalten des JSON-Shredding mit diesen Parametern unter <code translate="no">milvus.yaml</code> feineinstellen.</p>
<table>
   <tr>
     <th><p>Parameter Name</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Standardwert</p></th>
     <th><p>Tuning-Hinweis</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONKeyStats</code></p></td>
     <td><p>Steuert, ob die JSON-Shredding-Prozesse zum Erstellen und Laden aktiviert sind.</p></td>
     <td><p>false</p></td>
     <td><p>Muss auf <strong>true</strong> gesetzt werden, um die Funktion zu aktivieren.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingJsonStatsForQuery</code></p></td>
     <td><p>Legt fest, ob Milvus geschredderte Daten zur Beschleunigung verwendet.</p></td>
     <td><p>true</p></td>
     <td><p>Wird als Wiederherstellungsmaßnahme bei fehlgeschlagenen Abfragen auf <strong>false</strong> gesetzt, wobei der ursprüngliche Abfragepfad wiederhergestellt wird.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonStats</code></p></td>
     <td><p>Legt fest, ob Milvus mmap beim Laden von Shredding-Daten verwendet.</p><p>Einzelheiten finden Sie unter <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">mmap verwenden</a>.</p></td>
     <td><p>true</p></td>
     <td><p>Diese Einstellung ist im Allgemeinen für die Leistung optimiert. Passen Sie sie nur an, wenn Sie spezielle Anforderungen an die Speicherverwaltung oder Einschränkungen auf Ihrem System haben.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code></p></td>
     <td><p>Die maximale Anzahl von JSON-Schlüsseln, die in geshredderten Spalten gespeichert werden. </p><p>Wenn die Anzahl der häufig vorkommenden Schlüssel diese Grenze überschreitet, priorisiert Milvus die häufigsten für das Shredding, und die restlichen Schlüssel werden in der gemeinsamen Spalte gespeichert.</p></td>
     <td><p>1024</p></td>
     <td><p>Dies ist für die meisten Szenarien ausreichend. Für JSON mit Tausenden von häufig vorkommenden Schlüsseln müssen Sie diesen Wert möglicherweise erhöhen, aber überwachen Sie die Speichernutzung.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsShreddingRatioThreshold</code></p></td>
     <td><p>Die minimale Häufigkeit, mit der ein JSON-Schlüssel vorkommen muss, damit er in einer Shredder-Spalte gespeichert werden kann.</p><p>Ein Schlüssel gilt als häufig vorkommend, wenn sein Verhältnis über diesem Schwellenwert liegt.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Erhöhen</strong> (z. B. auf 0,5), wenn die Anzahl der Schlüssel, die die Schredderkriterien erfüllen, den Grenzwert <code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code> überschreitet. Dadurch wird der Schwellenwert strenger und die Anzahl der Schlüssel, die für das Schreddern in Frage kommen, wird verringert.</p><p><strong>Verringern Sie den</strong> Wert (z. B. auf 0,1), wenn Sie mehr Schlüssel schreddern möchten, die seltener als der Standardgrenzwert von 30 % auftreten.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Leistungs-Benchmarks<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
<li><p><strong>Hardware</strong>: 1-Kern/8-GB-Cluster</p></li>
<li><p><strong>Datensatz</strong>: 1 Million Dokumente von <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Durchschnittliche Dokumentgröße</strong>: 478,89 Bytes</p></li>
<li><p><strong>Testdauer</strong>: 100 Sekunden, Messung von QPS und Latenz</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Ergebnisse: getippte Schlüssel<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei diesem Test wurde die Leistung bei der Abfrage eines in den meisten Dokumenten vorhandenen Schlüssels gemessen.</p>
<table>
   <tr>
     <th><p>Abfrageausdruck</p></th>
     <th><p>Schlüssel Wert Typ</p></th>
     <th><p>QPS (ohne Schreddern)</p></th>
     <th><p>QPS (mit Zerkleinerung)</p></th>
     <th><p>Leistungssteigerung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Ganzzahl</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Zeichenkette</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Ergebnisse: Gemeinsame Schlüssel<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Test konzentrierte sich auf die Abfrage von spärlichen, verschachtelten Schlüsseln, die in die Kategorie "gemeinsam genutzt" fallen.</p>
<table>
   <tr>
     <th><p>Abfrageausdruck</p></th>
     <th><p>Schlüssel Wert Typ</p></th>
     <th><p>QPS (ohne Schreddern)</p></th>
     <th><p>QPS (mit Zerkleinerung)</p></th>
     <th><p>Leistungssteigerung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Verschachtelte Ganzzahl</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Verschachtelte Zeichenkette</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Einblicke in die Schlüssel<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>Gemeinsame Schlüsselabfragen</strong> zeigen die größten Verbesserungen (bis zu 89x schneller)</p></li>
<li><p><strong>Typisierte Schlüsselabfragen</strong> bieten konsistente 15-30-fache Leistungssteigerungen</p></li>
<li><p><strong>Alle Abfragetypen</strong> profitieren vom JSON Shredding ohne Leistungseinbußen.</p></li>
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
<li><p><strong>Wie kann ich überprüfen, ob JSON Shredding richtig funktioniert?</strong></p>
<ol>
<li><p>Überprüfen Sie zunächst, ob die Daten mit dem Befehl <code translate="no">show segment --format table</code> im <a href="/docs/de/birdwatcher_usage_guides.md">Birdwatcher-Tool</a> erstellt wurden. Wenn dies erfolgreich war, enthält die Ausgabe <code translate="no">shredding_data/</code> und <code translate="no">shared_key_index/</code> unter dem Feld <strong>Json Key Stats</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Birdwatcher-Ausgabe</span> </span></p></li>
<li><p>Als nächstes überprüfen Sie, ob die Daten geladen wurden, indem Sie <code translate="no">show loaded-json-stats</code> auf dem Abfrageknoten ausführen. Die Ausgabe zeigt Details über die geladenen Daten für jeden Abfrageknoten an.</p></li>
</ol></li>
<li><p><strong>Wie wähle ich zwischen JSON-Shredding und JSON-Indizierung?</strong></p>
<ul>
<li><p><strong>JSON Shredding</strong> ist ideal für Schlüssel, die häufig in Ihren Dokumenten vorkommen, insbesondere für komplexe JSON-Strukturen. Es kombiniert die Vorteile der spaltenweisen Speicherung und der invertierten Indizierung und eignet sich daher gut für leselastige Szenarien, in denen Sie viele verschiedene Schlüssel abfragen. Es wird jedoch nicht für sehr kleine JSON-Dokumente empfohlen, da der Leistungsgewinn minimal ist. Je kleiner der Anteil des Schlüsselwerts an der Gesamtgröße des JSON-Dokuments ist, desto besser ist die Leistungsoptimierung durch Shredding.</p></li>
<li><p>Die<strong>JSON-Indizierung</strong> eignet sich besser für die gezielte Optimierung spezifischer schlüsselbasierter Abfragen und hat einen geringeren Speicher-Overhead. Sie ist für einfachere JSON-Strukturen geeignet. Beachten Sie, dass JSON Shredding keine Abfragen auf Schlüssel innerhalb von Arrays abdeckt, so dass Sie einen JSON-Index benötigen, um diese zu beschleunigen.</p></li>
</ul></li>
<li><p><strong>Was passiert, wenn ein Fehler auftritt?</strong></p>
<p>Wenn der Build- oder Ladevorgang fehlschlägt, können Sie die Funktion schnell deaktivieren, indem Sie <code translate="no">common.enabledJSONKeyStats=false</code> setzen. Um alle verbleibenden Aufgaben zu löschen, verwenden Sie den Befehl <code translate="no">remove stats-task &lt;task_id&gt;</code> in <a href="/docs/de/birdwatcher_usage_guides.md">Birdwatcher</a>. Wenn eine Abfrage fehlschlägt, setzen Sie <code translate="no">common.usingJsonStatsForQuery=false</code>, um zum ursprünglichen Abfragepfad zurückzukehren und die geschredderten Daten zu umgehen.</p></li>
</ul>
