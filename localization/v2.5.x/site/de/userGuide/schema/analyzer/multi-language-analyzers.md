---
id: multi-language-analyzers.md
title: Mehrsprachige Analyzer
summary: >-
  Wenn Milvus eine Textanalyse durchführt, wird in der Regel ein einziger
  Analyzer auf ein ganzes Textfeld in einer Sammlung angewendet. Wenn dieser
  Analysator für die englische Sprache optimiert ist, hat er mit den sehr
  unterschiedlichen Tokenisierungs- und Stemming-Regeln zu kämpfen, die für
  andere Sprachen wie Chinesisch, Spanisch oder Französisch erforderlich sind,
  was zu einer niedrigeren Auffindungsrate führt. Eine Suche nach dem spanischen
  Wort "teléfono" (d. h. "Telefon") würde einen auf Englisch fokussierten
  Analyzer zum Stolpern bringen: Er könnte den Akzent weglassen und kein
  spanischspezifisches Stemming anwenden, so dass relevante Ergebnisse übersehen
  werden.
---
<h1 id="Multi-language-Analyzers" class="common-anchor-header">Mehrsprachige Analyzer<button data-href="#Multi-language-Analyzers" class="anchor-icon" translate="no">
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
    </button></h1><p>Wenn Milvus eine Textanalyse durchführt, wird in der Regel ein einziger Analyzer auf ein ganzes Textfeld in einer Sammlung angewendet. Wenn dieser Analysator für Englisch optimiert ist, hat er mit den sehr unterschiedlichen Tokenisierungs- und Stemming-Regeln zu kämpfen, die für andere Sprachen wie Chinesisch, Spanisch oder Französisch erforderlich sind, was zu einer niedrigeren Auffindungsrate führt. Eine Suche nach dem spanischen Wort <em>"teléfono"</em> (d. h. <em>"Telefon")</em> würde einen auf Englisch fokussierten Analyzer zum Stolpern bringen: Er könnte den Akzent weglassen und kein spanischspezifisches Stemming anwenden, wodurch relevante Ergebnisse übersehen werden.</p>
<p>Mehrsprachige Analyzer lösen dieses Problem, indem sie es Ihnen ermöglichen, mehrere Analyzer für ein Textfeld in einer einzigen Sammlung zu konfigurieren. Auf diese Weise können Sie mehrsprachige Dokumente in einem Textfeld speichern, und Milvus analysiert den Text nach den entsprechenden Sprachregeln für jedes Dokument.</p>
<h2 id="Limits" class="common-anchor-header">Begrenzt<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Diese Funktion funktioniert nur mit BM25-basiertem Text Retrieval und spärlichen Vektoren. Weitere Informationen finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p></li>
<li><p>Jedes Dokument in einer Sammlung kann nur einen Analyzer verwenden, der durch den Wert des Feldes für die Sprachkennung bestimmt wird.</p></li>
<li><p>Die Leistung kann je nach der Komplexität Ihrer Analysatoren und der Größe Ihrer Textdaten variieren.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Diagramm zeigt den Arbeitsablauf bei der Konfiguration und Verwendung mehrsprachiger Analysatoren in Milvus:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-language-analyzers-workflow.png" alt="Multi Language Analyzers Workflow" class="doc-image" id="multi-language-analyzers-workflow" />
   </span> <span class="img-wrapper"> <span>Arbeitsablauf für mehrsprachige Analyzer</span> </span></p>
<ol>
<li><p><strong>Konfigurieren Sie mehrsprachige Analyzer</strong>:</p>
<ul>
<li><p>Richten Sie mehrere sprachspezifische Analysatoren nach dem Format ein: <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> wobei jeder <code translate="no">analyzer_config</code> der Standardkonfiguration <code translate="no">analyzer_params</code> folgt, wie in <a href="/docs/de/analyzer-overview.md#Analyzer-types">Analyzer Overview</a> beschrieben.</p></li>
<li><p>Definieren Sie ein spezielles Bezeichnungsfeld, das die Auswahl des Analysators für jedes Dokument bestimmt.</p></li>
<li><p>Konfigurieren Sie einen <code translate="no">default</code> Analyzer für die Behandlung unbekannter Sprachen.</p></li>
</ul></li>
<li><p><strong>Sammlung erstellen</strong>:</p>
<ul>
<li><p>Definieren Sie ein Schema mit den wichtigsten Feldern:</p>
<ul>
<li><p><strong>primary_key</strong>: Eindeutiger Dokumentbezeichner.</p></li>
<li><p><strong>text_feld</strong>: Speichert den ursprünglichen Textinhalt.</p></li>
<li><p><strong>identifier_feld</strong>: Gibt an, welcher Analysator für jedes Dokument zu verwenden ist.</p></li>
<li><p><strong>vektor_feld</strong>: Speichert spärliche Einbettungen, die von der BM25-Funktion erzeugt werden sollen.</p></li>
</ul></li>
<li><p>Konfigurieren Sie die BM25-Funktion und die Indizierungsparameter.</p></li>
</ul></li>
<li><p><strong>Daten mit Sprachidentifikatoren einfügen</strong>:</p>
<ul>
<li><p>Fügen Sie Dokumente mit Text in verschiedenen Sprachen hinzu, wobei jedes Dokument einen Bezeichnerwert enthält, der angibt, welcher Analyzer verwendet werden soll.</p></li>
<li><p>Milvus wählt den passenden Analyzer auf der Grundlage des Bezeichnerfeldes aus, und Dokumente mit unbekannten Bezeichnern verwenden den Analyzer <code translate="no">default</code>.</p></li>
</ul></li>
<li><p><strong>Suche mit sprachspezifischen Analysatoren</strong>:</p>
<ul>
<li><p>Geben Sie den Abfragetext mit dem Namen eines Analysators an, und Milvus verarbeitet die Abfrage unter Verwendung des angegebenen Analysators.</p></li>
<li><p>Die Tokenisierung erfolgt nach sprachspezifischen Regeln, und die Suche liefert auf der Grundlage der Ähnlichkeit sprachgerechte Ergebnisse.</p></li>
</ul></li>
</ol>
<h2 id="Step-1-Configure-multianalyzerparams" class="common-anchor-header">Schritt 1: Konfigurieren Sie multi_analyzer_params<button data-href="#Step-1-Configure-multianalyzerparams" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">multi_analyzer_params</code> ist ein einzelnes JSON-Objekt, das bestimmt, wie Milvus den passenden Analyzer für jede Entität auswählt:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">multi_analyzer_params = {
  <span class="hljs-comment"># Define language-specific analyzers</span>
  <span class="hljs-comment"># Each analyzer follows this format: &lt;analyzer_name&gt;: &lt;analyzer_params&gt;</span>
  <span class="hljs-string">&quot;analyzers&quot;</span>: {
    <span class="hljs-string">&quot;english&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},          <span class="hljs-comment"># English-optimized analyzer</span>
    <span class="hljs-string">&quot;chinese&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},          <span class="hljs-comment"># Chinese-optimized analyzer</span>
    <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>}          <span class="hljs-comment"># Required fallback analyzer</span>
  },
  <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,                    <span class="hljs-comment"># Field determining analyzer selection</span>
  <span class="hljs-string">&quot;alias&quot;</span>: {
    <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,                         <span class="hljs-comment"># Use &quot;cn&quot; as shorthand for Chinese</span>
    <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>                          <span class="hljs-comment"># Use &quot;en&quot; as shorthand for English</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
    }});
    put(<span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>);
    }});
    put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;icu&quot;</span>);
    }});
}});
analyzerParams.put(<span class="hljs-string">&quot;by_field&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;alias&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;cn&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>);
    put(<span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> multi_analyzer_params = {
  <span class="hljs-comment">// Define language-specific analyzers</span>
  <span class="hljs-comment">// Each analyzer follows this format: &lt;analyzer_name&gt;: &lt;analyzer_params&gt;</span>
  <span class="hljs-string">&quot;analyzers&quot;</span>: {
    <span class="hljs-string">&quot;english&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},          # <span class="hljs-title class_">English</span>-optimized analyzer
    <span class="hljs-string">&quot;chinese&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},          # <span class="hljs-title class_">Chinese</span>-optimized analyzer
    <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>}          # <span class="hljs-title class_">Required</span> fallback analyzer
  },
  <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,                    # <span class="hljs-title class_">Field</span> determining analyzer selection
  <span class="hljs-string">&quot;alias&quot;</span>: {
    <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,                         # <span class="hljs-title class_">Use</span> <span class="hljs-string">&quot;cn&quot;</span> <span class="hljs-keyword">as</span> shorthand <span class="hljs-keyword">for</span> <span class="hljs-title class_">Chinese</span>
    <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>                          # <span class="hljs-title class_">Use</span> <span class="hljs-string">&quot;en&quot;</span> <span class="hljs-keyword">as</span> shorthand <span class="hljs-keyword">for</span> <span class="hljs-title class_">English</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">multiAnalyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;english&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
        <span class="hljs-string">&quot;chinese&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},
        <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>},
    },
    <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,
    <span class="hljs-string">&quot;alias&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,
        <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> multi_analyzer_params=<span class="hljs-string">&#x27;{
  &quot;analyzers&quot;: {
    &quot;english&quot;: {
      &quot;type&quot;: &quot;english&quot;
    },
    &quot;chinese&quot;: {
      &quot;type&quot;: &quot;chinese&quot;
    },
    &quot;default&quot;: {
      &quot;tokenizer&quot;: &quot;icu&quot;
    }
  },
  &quot;by_field&quot;: &quot;language&quot;,
  &quot;alias&quot;: {
    &quot;cn&quot;: &quot;chinese&quot;,
    &quot;en&quot;: &quot;english&quot;
  }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Erforderlich?</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Regeln</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">analyzers</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Listet jeden sprachspezifischen Analyzer auf, den Milvus zur Textverarbeitung verwenden kann. Jeder Analyzer in <code translate="no">analyzers</code> folgt diesem Format: <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_params&gt;</code>.</p></td>
     <td><ul>
<li>Definieren Sie jeden Analyzer mit der Standard-Syntax <code translate="no">analyzer_params</code> (siehe <a href="/docs/de/analyzer-overview.md#Analyzer-types">Analyzer-Übersicht</a>).</li>
<li>Fügen Sie einen Eintrag hinzu, dessen Schlüssel <code translate="no">default</code> ist; Milvus greift auf diesen Analyzer zurück, wenn der in <code translate="no">by_field</code> gespeicherte Wert mit keinem anderen Analyzer-Namen übereinstimmt.</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">by_field</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Name des Feldes, das für jedes Dokument die Sprache (d.h. den Namen des Analysators) speichert, die Milvus anwenden soll.</p></td>
     <td><ul>
<li><p>Es muss sich um ein in der Sammlung definiertes Feld <code translate="no">VARCHAR</code> handeln.</p></li>
<li><p>Der Wert in jeder Zeile muss genau mit einem der unter <code translate="no">analyzers</code> aufgeführten Analyzer-Namen (oder Aliasnamen) übereinstimmen.</p></li>
<li><p>Wenn der Wert einer Zeile fehlt oder nicht gefunden wird, wendet Milvus automatisch den <code translate="no">default</code> analyzer an.</p></li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">alias</code></p></td>
     <td><p>Keine</p></td>
     <td><p>Erzeugt Abkürzungen oder alternative Namen für Ihre Analysatoren, so dass sie in Ihrem Code leichter referenziert werden können. Jeder Analyzer kann einen oder mehrere Aliasnamen haben.</p></td>
     <td><p>Jeder Alias muss auf einen vorhandenen Analysatorschlüssel abgebildet werden.</p></td>
   </tr>
</table>
<h2 id="Step-2-Create-collection" class="common-anchor-header">Schritt 2: Sammlung erstellen<button data-href="#Step-2-Create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Erstellung einer Sammlung mit Unterstützung für mehrere Sprachen erfordert die Konfiguration bestimmter Felder und Indizes:</p>
<h3 id="Add-fields" class="common-anchor-header">Felder hinzufügen</h3><p>In diesem Schritt definieren Sie das Sammlungsschema mit vier wesentlichen Feldern:</p>
<ul>
<li><p><strong>Primärschlüsselfeld</strong> (<code translate="no">id</code>): Ein eindeutiger Bezeichner für jede Entität in der Sammlung. Die Einstellung <code translate="no">auto_id=True</code> ermöglicht es Milvus, diese IDs automatisch zu erzeugen.</p></li>
<li><p><strong>Sprachkennungsfeld</strong> (<code translate="no">language</code>): Dieses VARCHAR-Feld entspricht dem <code translate="no">by_field</code>, das Sie in <code translate="no">multi_analyzer_params</code> angegeben haben. Es speichert den Sprachidentifikator für jede Entität, der Milvus mitteilt, welchen Analyzer es verwenden soll.</p></li>
<li><p><strong>Text Inhaltsfeld</strong> (<code translate="no">text</code>): In diesem VARCHAR-Feld werden die eigentlichen Textdaten gespeichert, die Sie analysieren und durchsuchen möchten. Die Einstellung <code translate="no">enable_analyzer=True</code> ist entscheidend, da sie die Textanalysefunktionen für dieses Feld aktiviert. Die Konfiguration <code translate="no">multi_analyzer_params</code> ist direkt mit diesem Feld verbunden und stellt die Verbindung zwischen Ihren Textdaten und sprachspezifischen Analysatoren her.</p></li>
<li><p><strong>Vektorfeld</strong> (<code translate="no">sparse</code>): In diesem Feld werden die von der BM25-Funktion erzeugten spärlichen Vektoren gespeichert. Diese Vektoren stellen die analysierbare Form Ihrer Textdaten dar und sind das, was Milvus tatsächlich durchsucht.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import required modules</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Initialize a new schema</span>
schema = client.create_schema()

<span class="hljs-comment"># Step 2.1: Add a primary key field for unique document identification</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,                  <span class="hljs-comment"># Field name</span>
    datatype=DataType.INT64,          <span class="hljs-comment"># Integer data type</span>
    is_primary=<span class="hljs-literal">True</span>,                  <span class="hljs-comment"># Designate as primary key</span>
    auto_id=<span class="hljs-literal">True</span>                      <span class="hljs-comment"># Auto-generate IDs (recommended)</span>
)

<span class="hljs-comment"># Step 2.2: Add language identifier field</span>
<span class="hljs-comment"># This MUST match the &quot;by_field&quot; value in language_analyzer_config</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;language&quot;</span>,       <span class="hljs-comment"># Field name</span>
    datatype=DataType.VARCHAR,   <span class="hljs-comment"># String data type</span>
    max_length=<span class="hljs-number">255</span>               <span class="hljs-comment"># Maximum length (adjust as needed)</span>
)

<span class="hljs-comment"># Step 2.3: Add text content field with multi-language analysis capability</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,                           <span class="hljs-comment"># Field name</span>
    datatype=DataType.VARCHAR,                   <span class="hljs-comment"># String data type</span>
    max_length=<span class="hljs-number">8192</span>,                             <span class="hljs-comment"># Maximum length (adjust based on expected text size)</span>
    enable_analyzer=<span class="hljs-literal">True</span>,                        <span class="hljs-comment"># Enable text analysis</span>
    multi_analyzer_params=multi_analyzer_params  <span class="hljs-comment"># Connect with our language analyzers</span>
)

<span class="hljs-comment"># Step 2.4: Add sparse vector field to store the BM25 output</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,                   <span class="hljs-comment"># Field name</span>
    datatype=DataType.SPARSE_FLOAT_VECTOR  <span class="hljs-comment"># Sparse vector data type</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.FlushReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;language&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">255</span>)
        .build());

collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">8192</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .multiAnalyzerParams(analyzerParams)
        .build());
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Initialize client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Initialize schema array</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;language&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">255</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">8192</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">analyzer_params</span>: multi_analyzer_params,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

schema := entity.NewSchema()

schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;language&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">255</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">8192</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMultiAnalyzerParams(multiAnalyzerParams),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> languageField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;language&quot;,
  &quot;dataType&quot;: &quot;VarChar&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;max_length&quot;: 255
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> textField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;text&quot;,
  &quot;dataType&quot;: &quot;VarChar&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;max_length&quot;: 8192,
    &quot;enable_analyzer&quot;: true
  },
  &quot;multiAnalyzerParam&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$multi_analyzer_params</span>&quot;</span><span class="hljs-string">&#x27;
}&#x27;</span>

<span class="hljs-built_in">export</span> sparseField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;sparse&quot;,
  &quot;dataType&quot;: &quot;SparseFloatVector&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-BM25-function" class="common-anchor-header">BM25-Funktion definieren</h3><p>Definieren Sie eine BM25-Funktion, um spärliche Vektordarstellungen aus Ihren Rohtextdaten zu erzeugen:</p>
<div class="multipleCode">
   <a href="#plaintext">Klartext</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-plaintext"># Create the BM25 function
bm25_function = Function(
    name=&quot;text_to_vector&quot;,            # Descriptive function name
    function_type=FunctionType.BM25,  # Use BM25 algorithm
    input_field_names=[&quot;text&quot;],       # Process text from this field
    output_field_names=[&quot;sparse&quot;]     # Store vectors in this field
)

# Add the function to our schema
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">function</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_to_vector&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build();
collectionSchema.addFunction(function);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;bm25 function&quot;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
    <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;sparse&quot;</span>],
    <span class="hljs-attr">params</span>: {},
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction()
schema.WithFunction(function.WithName(<span class="hljs-string">&quot;text_to_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> <span class="hljs-keyword">function</span>=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;text_to_vector&quot;,
  &quot;type&quot;: &quot;BM25&quot;,
  &quot;inputFieldNames&quot;: [&quot;text&quot;],
  &quot;outputFieldNames&quot;: [&quot;sparse&quot;]
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$idField</span>,
    <span class="hljs-variable">$languageField</span>,
    <span class="hljs-variable">$textField</span>,
    <span class="hljs-variable">$sparseField</span>
  ],
  \&quot;functions\&quot;: [
    <span class="hljs-variable">$function</span>
  ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Diese Funktion wendet automatisch den passenden Analyzer auf jeden Texteintrag an, basierend auf dessen Sprachkennung. Weitere Informationen zur BM25-basierten Textsuche finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
<h3 id="Configure-index-params" class="common-anchor-header">Konfigurieren der Index-Parameter</h3><p>Um eine effiziente Suche zu ermöglichen, erstellen Sie einen Index auf dem spärlichen Vektorfeld:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Configure index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add index for sparse vector field</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,        <span class="hljs-comment"># Field to index (our vector field)</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,     <span class="hljs-comment"># Let Milvus choose optimal index type</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>          <span class="hljs-comment"># Must be BM25 for this feature</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>
}];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(index.MetricType(entity.BM25))
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> IndexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;sparse&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;BM25&quot;,
    &quot;params&quot;: {}
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der Index verbessert die Suchleistung, indem er die spärlichen Vektoren für effiziente BM25-Ähnlichkeitsberechnungen organisiert.</p>
<h3 id="Create-the-collection" class="common-anchor-header">Erstellen der Sammlung</h3><p>In diesem letzten Erstellungsschritt werden alle vorherigen Konfigurationen zusammengeführt:</p>
<ul>
<li><p><code translate="no">collection_name=&quot;multilang_demo&quot;</code> benennt Ihre Sammlung für zukünftige Referenzen.</p></li>
<li><p><code translate="no">schema=schema</code> wendet die von Ihnen definierte Feldstruktur und -funktion an.</p></li>
<li><p><code translate="no">index_params=index_params</code> implementiert die Indizierungsstrategie für eine effiziente Suche.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection</span>
COLLECTION_NAME = <span class="hljs-string">&quot;multilingual_documents&quot;</span>

<span class="hljs-comment"># Check if collection already exists</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)  <span class="hljs-comment"># Remove it for this example</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Dropped existing collection: <span class="hljs-subst">{COLLECTION_NAME}</span>&quot;</span>)

<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=COLLECTION_NAME,       <span class="hljs-comment"># Collection name</span>
    schema=schema,                         <span class="hljs-comment"># Our multilingual schema</span>
    index_params=index_params              <span class="hljs-comment"># Our search index configuration</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .collectionSchema(collectionSchema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;multilingual_documents&quot;</span>;

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">index_params</span>: index_params,
  <span class="hljs-attr">functions</span>: functions
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;multilingual_documents\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$IndexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Zu diesem Zeitpunkt erstellt Milvus eine leere Sammlung mit Unterstützung für mehrsprachige Analysatoren, die bereit ist, Daten zu empfangen.</p>
<h2 id="Step-3-Insert-example-data" class="common-anchor-header">Schritt 3: Einfügen von Beispieldaten<button data-href="#Step-3-Insert-example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie Ihrer mehrsprachigen Sammlung Dokumente hinzufügen, muss jedes Dokument sowohl einen Textinhalt als auch einen Sprachidentifikator enthalten:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare multilingual documents</span>
documents = [
    <span class="hljs-comment"># English documents</span>
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,  <span class="hljs-comment"># Using full language name</span>
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;en&quot;</span>,  <span class="hljs-comment"># Using our defined alias</span>
    },
    <span class="hljs-comment"># Chinese documents</span>
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,  <span class="hljs-comment"># Using full language name</span>
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;cn&quot;</span>,  <span class="hljs-comment"># Using our defined alias</span>
    },
]

<span class="hljs-comment"># Insert the documents</span>
result = client.insert(COLLECTION_NAME, documents)

<span class="hljs-comment"># Print results</span>
inserted = result[<span class="hljs-string">&quot;insert_count&quot;</span>]            
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Successfully inserted <span class="hljs-subst">{inserted}</span> documents&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Documents by language: 2 English, 2 Chinese&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Successfully inserted 4 documents</span>
<span class="hljs-comment"># Documents by language: 2 English, 2 Chinese</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;String&gt; texts = Arrays.asList(
        <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>
);
List&lt;String&gt; languages = Arrays.asList(
        <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>
);

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; texts.size(); i++) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, texts.get(i));
    row.addProperty(<span class="hljs-string">&quot;language&quot;</span>, languages.get(i));
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Prepare multilingual documents</span>
<span class="hljs-keyword">const</span> documents = [
  <span class="hljs-comment">// English documents</span>
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;english&quot;</span>,
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;en&quot;</span>,
  },
  <span class="hljs-comment">// Chinese documents</span>
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;chinese&quot;</span>,
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;cn&quot;</span>,
  },
];

<span class="hljs-comment">// Insert the documents</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: documents,
});

<span class="hljs-comment">// Print results</span>
<span class="hljs-keyword">const</span> inserted = result.<span class="hljs-property">insert_count</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Successfully inserted <span class="hljs-subst">${inserted}</span> documents`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Documents by language: 2 English, 2 Chinese&quot;</span>);

<span class="hljs-comment">// Expected output:</span>
<span class="hljs-comment">// Successfully inserted 4 documents</span>
<span class="hljs-comment">// Documents by language: 2 English, 2 Chinese</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">column1 := column.NewColumnVarChar(<span class="hljs-string">&quot;text&quot;</span>,
    []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
    })
column2 := column.NewColumnVarChar(<span class="hljs-string">&quot;language&quot;</span>,
    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>).
    WithColumns(column1, column2),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [
    {
      &quot;text&quot;: &quot;Artificial intelligence is transforming technology&quot;,
      &quot;language&quot;: &quot;english&quot;
    },
    {
      &quot;text&quot;: &quot;Machine learning models require large datasets&quot;,
      &quot;language&quot;: &quot;en&quot;
    },
    {
      &quot;text&quot;: &quot;人工智能正在改变技术领域&quot;,
      &quot;language&quot;: &quot;chinese&quot;
    },
    {
      &quot;text&quot;: &quot;机器学习模型需要大型数据集&quot;,
      &quot;language&quot;: &quot;cn&quot;
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Während des Einfügens liest Milvus:</p>
<ol>
<li><p>Liest das <code translate="no">language</code> Feld eines jeden Dokuments</p></li>
<li><p>Wendet den entsprechenden Analyzer auf das Feld <code translate="no">text</code> an</p></li>
<li><p>Erzeugt eine spärliche Vektordarstellung über die BM25-Funktion</p></li>
<li><p>Speichert sowohl den Originaltext als auch den erzeugten Sparse-Vektor</p></li>
</ol>
<div class="alert note">
<p>Sie brauchen den Sparse-Vektor nicht direkt anzugeben; die BM25-Funktion erzeugt ihn automatisch auf der Grundlage Ihres Textes und des angegebenen Analyzers.</p>
</div>
<h2 id="Step-4-Perform-search-operations" class="common-anchor-header">Schritt 4: Suchoperationen durchführen<button data-href="#Step-4-Perform-search-operations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Use-English-analyzer" class="common-anchor-header">Englischen Analyzer verwenden</h3><p>Bei der Suche mit mehrsprachigen Analyzern enthält <code translate="no">search_params</code> eine entscheidende Konfiguration:</p>
<ul>
<li><p><code translate="no">metric_type=&quot;BM25&quot;</code> muss mit Ihrer Indexkonfiguration übereinstimmen.</p></li>
<li><p><code translate="no">analyzer_name=&quot;english&quot;</code> gibt an, welcher Analyzer auf Ihren Abfragetext angewendet werden soll. Dies ist unabhängig von den Analyzern, die für gespeicherte Dokumente verwendet werden.</p></li>
<li><p><code translate="no">params={&quot;drop_ratio_search&quot;: &quot;0&quot;}</code> steuert das BM25-spezifische Verhalten; hier werden alle Begriffe in der Suche beibehalten. Weitere Informationen finden Sie unter <a href="/docs/de/sparse_vector.md">Sparse Vector</a>.</p></li>
</ul>
<div class="multipleCode">
   <a href="#plaintext">Klartext</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-plaintext">search_params = {
    &quot;metric_type&quot;: &quot;BM25&quot;,            # Must match index configuration
    &quot;analyzer_name&quot;: &quot;english&quot;,  # Analyzer that matches the query language
    &quot;drop_ratio_search&quot;: &quot;0&quot;,     # Keep all terms in search (tweak as needed)
}

# Execute the search
english_results = client.search(
    collection_name=COLLECTION_NAME,  # Collection to search
    data=[&quot;artificial intelligence&quot;],                # Query text
    anns_field=&quot;sparse&quot;,              # Field to search against
    search_params=search_params,      # Search configuration
    limit=3,                      # Max results to return
    output_fields=[&quot;text&quot;, &quot;language&quot;],  # Fields to include in the output
    consistency_level=&quot;Strong&quot;,       # Data‑consistency guarantee
)

# Display English search results
print(&quot;\n=== English Search Results ===&quot;)
for i, hit in enumerate(english_results[0]):
    print(f&quot;{i+1}. [{hit.score:.4f}] {hit.entity.get(&#x27;text&#x27;)} &quot;
          f&quot;(Language: {hit.entity.get(&#x27;language&#x27;)})&quot;)

# Expected output:
# === English Search Results ===
# 1. [2.7881] Artificial intelligence is transforming technology (Language: english)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;artificial intelligence&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
        .build());

System.out.println(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>);
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;Score: %f, %s\n&quot;</span>, result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Execute the search</span>
<span class="hljs-keyword">const</span> english_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;artificial intelligence&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">analyzer_name</span>: <span class="hljs-string">&quot;english&quot;</span>,
    <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-string">&quot;0&quot;</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});

<span class="hljs-comment">// Display English search results</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>);
english_results.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
    <span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">${hit.score.toFixed(<span class="hljs-number">4</span>)}</span>] <span class="hljs-subst">${hit.entity.text}</span> `</span> +
      <span class="hljs-string">`(Language: <span class="hljs-subst">${hit.entity.language}</span>)`</span>
  );
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>)
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>)
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0</span>)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,                        <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;artificial intelligence&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(resultSet.Scores); i++ {
        text, _ := resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).GetAsString(i)
        lang, _ := resultSet.GetColumn(<span class="hljs-string">&quot;language&quot;</span>).GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Score: &quot;</span>, resultSet.Scores[i], <span class="hljs-string">&quot;Text: &quot;</span>, text, <span class="hljs-string">&quot;Language:&quot;</span>, lang)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [&quot;artificial intelligence&quot;],
  &quot;annsField&quot;: &quot;sparse&quot;,
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;metric_type&quot;: &quot;BM25&quot;,
    &quot;analyzer_name&quot;: &quot;english&quot;,
    &quot;drop_ratio_search&quot;: &quot;0&quot;  
  },
  &quot;outputFields&quot;: [&quot;text&quot;, &quot;language&quot;],
  &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-Chinese-analyzer" class="common-anchor-header">Chinesischen Analysator verwenden</h3><p>Dieses Beispiel demonstriert den Wechsel zum chinesischen Analyzer (unter Verwendung seines Alias <code translate="no">&quot;cn&quot;</code>) für einen anderen Abfragetext. Alle anderen Parameter bleiben gleich, aber jetzt wird der Abfragetext unter Verwendung chinesisch-spezifischer Tokenisierungsregeln verarbeitet.</p>
<div class="multipleCode">
   <a href="#plaintext">Klartext</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-plaintext">search_params[&quot;analyzer_name&quot;] = &quot;cn&quot;

chinese_results = client.search(
    collection_name=COLLECTION_NAME,  # Collection to search
    data=[&quot;人工智能&quot;],                # Query text
    anns_field=&quot;sparse&quot;,              # Field to search against
    search_params=search_params,      # Search configuration
    limit=3,                      # Max results to return
    output_fields=[&quot;text&quot;, &quot;language&quot;],  # Fields to include in the output
    consistency_level=&quot;Strong&quot;,       # Data‑consistency guarantee
)

# Display Chinese search results
print(&quot;\n=== Chinese Search Results ===&quot;)
for i, hit in enumerate(chinese_results[0]):
    print(f&quot;{i+1}. [{hit.score:.4f}] {hit.entity.get(&#x27;text&#x27;)} &quot;
          f&quot;(Language: {hit.entity.get(&#x27;language&#x27;)})&quot;)

# Expected output:
# === Chinese Search Results ===
# 1. [3.3814] 人工智能正在改变技术领域 (Language: chinese)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">searchParams.put(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>);
searchResp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;人工智能&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
        .build());

System.out.println(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>);
searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;Score: %f, %s\n&quot;</span>, result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Execute the search</span>
<span class="hljs-keyword">const</span> cn_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;人工智能&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">analyzer_name</span>: <span class="hljs-string">&quot;cn&quot;</span>,
    <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-string">&quot;0&quot;</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});

<span class="hljs-comment">// Display Chinese search results</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>);
cn_results.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
    <span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">${hit.score.toFixed(<span class="hljs-number">4</span>)}</span>] <span class="hljs-subst">${hit.entity.text}</span> `</span> +
      <span class="hljs-string">`(Language: <span class="hljs-subst">${hit.entity.language}</span>)`</span>
  );
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams.WithExtraParam(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>)

resultSets, err = client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,                        <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;人工智能&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(resultSet.Scores); i++ {
        text, _ := resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).GetAsString(i)
        lang, _ := resultSet.GetColumn(<span class="hljs-string">&quot;language&quot;</span>).GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Score: &quot;</span>, resultSet.Scores[i], <span class="hljs-string">&quot;Text: &quot;</span>, text, <span class="hljs-string">&quot;Language:&quot;</span>, lang)
    }
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [&quot;人工智能&quot;],
  &quot;annsField&quot;: &quot;sparse&quot;,
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;analyzer_name&quot;: &quot;cn&quot;
  },
  &quot;outputFields&quot;: [&quot;text&quot;, &quot;language&quot;],
  &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
