---
id: phrase-match.md
title: PhrasensucheCompatible with Milvus 2.6.x
summary: >-
  Mit der Phrasenübereinstimmung können Sie nach Dokumenten suchen, die Ihre
  Suchbegriffe als exakte Phrase enthalten. Standardmäßig müssen die Wörter in
  der gleichen Reihenfolge und in unmittelbarer Nähe zueinander erscheinen. Eine
  Abfrage nach "Robotik, maschinelles Lernen" passt beispielsweise zu Text wie
  "...typische Robotik, maschinelle Lernmodelle...", in dem die Wörter
  "Robotik", "Maschine" und "Lernen" nacheinander und ohne andere Wörter
  dazwischen erscheinen.
beta: Milvus 2.6.x
---
<h1 id="Phrase-Match" class="common-anchor-header">Phrasensuche<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>Mit der Phrasenübereinstimmung können Sie nach Dokumenten suchen, die Ihre Suchbegriffe als exakte Phrase enthalten. Standardmäßig müssen die Wörter in der gleichen Reihenfolge und in unmittelbarer Nähe zueinander erscheinen. Eine Abfrage nach <strong>"Robotik, maschinelles Lernen"</strong> passt beispielsweise zu Text wie <em>"...typische Robotik, maschinelle Lernmodelle...",</em> in dem die Wörter <strong>"Robotik",</strong> <strong>"Maschine"</strong> und <strong>"Lernen"</strong> nacheinander und ohne andere Wörter dazwischen erscheinen.</p>
<p>In realen Szenarien kann ein strenger Phrasenabgleich jedoch zu starr sein. Sie möchten vielleicht Text wie <em>"...maschinelle Lernmodelle, die in der Robotik weit verbreitet sind..."</em> abgleichen. Hier sind die gleichen Schlüsselwörter vorhanden, aber nicht nebeneinander oder in der ursprünglichen Reihenfolge. Um damit umzugehen, unterstützt die Phrasenübereinstimmung einen <code translate="no">slop</code> -Parameter, der für Flexibilität sorgt. Der Wert <code translate="no">slop</code> legt fest, wie viele Positionsverschiebungen zwischen den Begriffen in der Phrase zulässig sind. Bei einem Wert von <code translate="no">slop</code> von 1 kann beispielsweise eine Abfrage nach <strong>"machine learning"</strong> mit Text wie <em>"...machine deep learning..."</em> übereinstimmen <em>,</em> wobei ein Wort (<strong>"deep")</strong> die ursprünglichen Begriffe trennt.</p>
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
    </button></h2><p>Die von der <a href="https://github.com/quickwit-oss/tantivy">Tantivy-Suchmaschinenbibliothek</a> unterstützte Phrasenübereinstimmung funktioniert durch die Analyse der Positionsinformationen von Wörtern in Dokumenten. Das folgende Diagramm veranschaulicht den Prozess:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>Phrase Match Arbeitsablauf</span> </span></p>
<ol>
<li><p><strong>Tokenisierung von Dokumenten</strong>: Wenn Sie Dokumente in Milvus einfügen, wird der Text mithilfe eines Analysators in Token (einzelne Wörter oder Begriffe) aufgeteilt, wobei für jedes Token Positionsinformationen aufgezeichnet werden. Zum Beispiel wird <strong>doc_1</strong> in <strong>["machine" (pos=0), "learning" (pos=1), "boosts" (pos=2), "efficiency" (pos=3)]</strong> tokenisiert. Weitere Informationen zu Analyzern finden Sie unter <a href="/docs/de/analyzer-overview.md">Analyzer-Übersicht</a>.</p></li>
<li><p><strong>Erstellung eines invertierten Index</strong>: Milvus erstellt einen invertierten Index, der jedes Token den Dokumenten, in denen es vorkommt, und den Positionen des Tokens in diesen Dokumenten zuordnet.</p></li>
<li><p><strong>Phrase Matching</strong>: Wenn eine Phrasenabfrage ausgeführt wird, sucht Milvus nach jedem Token im invertierten Index und überprüft ihre Positionen, um festzustellen, ob sie in der richtigen Reihenfolge und in der richtigen Nähe erscheinen. Der Parameter <code translate="no">slop</code> steuert die maximal zulässige Anzahl von Positionen zwischen übereinstimmenden Token:</p>
<ul>
<li><p><strong>slop = 0</strong> bedeutet, dass die Token <strong>in der exakten Reihenfolge und unmittelbar nebeneinander</strong> erscheinen müssen (d. h. keine zusätzlichen Wörter dazwischen).</p>
<ul>
<li>Im Beispiel passt nur <strong>doc_1</strong> (<strong>"machine"</strong> an <strong>Pos=0</strong>, <strong>"learning"</strong> an <strong>Pos=1</strong>) genau.</li>
</ul></li>
<li><p><strong>slop = 2</strong> lässt bis zu zwei Positionen Flexibilität oder Umstellungen zwischen übereinstimmenden Token zu.</p>
<ul>
<li><p>Dies ermöglicht eine umgekehrte Reihenfolge (<strong>"Lernmaschine")</strong> oder eine kleine Lücke zwischen den Token.</p></li>
<li><p>Folglich stimmen <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>"learning"</strong> an <strong>Pos=0</strong>, <strong>"machine"</strong> an <strong>Pos=1</strong>) und <strong>doc_3</strong> (<strong>"learning"</strong> an <strong>Pos=1</strong>, <strong>"machine"</strong> an <strong>Pos=2</strong>) alle überein.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Phrasenübereinstimmung aktivieren<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Phrasenübereinstimmung funktioniert mit dem Feldtyp <code translate="no">VARCHAR</code>, dem String-Datentyp in Milvus. Um den Phrasenabgleich zu aktivieren, konfigurieren Sie Ihr Sammlungsschema, indem Sie die beiden Parameter <code translate="no">enable_analyzer</code> und <code translate="no">enable_match</code> auf <code translate="no">True</code> setzen, ähnlich wie beim <a href="/docs/de/keyword-match.md">Textabgleich</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Setzen Sie <code translate="no">enable_analyzer</code> und <code translate="no">enable_match</code></h3><p>Um den Phrasenabgleich für ein bestimmtes <code translate="no">VARCHAR</code> Feld zu aktivieren, setzen Sie die beiden Parameter <code translate="no">enable_analyzer</code> und <code translate="no">enable_match</code> bei der Definition des Feldschemas auf <code translate="no">True</code>. Diese Konfiguration weist Milvus an, den Text zu tokenisieren und einen invertierten Index mit Positionsinformationen zu erstellen, die für einen effizienten Phrasenabgleich erforderlich sind.</p>
<p>Hier ein Beispiel für eine Schemadefinition zur Aktivierung des Phrasenabgleichs:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Optional: Konfigurieren Sie einen Analysator</h3><p>Die Genauigkeit des Phrasenabgleichs hängt wesentlich von dem Analysator ab, der Ihre Textdaten tokenisiert. Verschiedene Analysatoren eignen sich für unterschiedliche Sprachen und Textformate, was sich auf die Tokenisierung und die Positionsgenauigkeit auswirkt. Die Auswahl eines geeigneten Analysators für Ihren speziellen Anwendungsfall optimiert die Ergebnisse des Phrasenabgleichs.</p>
<p>Standardmäßig verwendet Milvus den Standard-Analysator, der Text auf der Grundlage von Leerzeichen und Interpunktion in Token umwandelt, Token mit mehr als 40 Zeichen entfernt und Text in Kleinbuchstaben konvertiert. Für die Standardverwendung sind keine zusätzlichen Parameter erforderlich. Weitere Informationen finden Sie unter <a href="/docs/de/standard-analyzer.md">Standard-Analysator</a>.</p>
<p>Wenn Ihre Anwendung einen bestimmten Analyzer benötigt, konfigurieren Sie ihn mit dem Parameter <code translate="no">analyzer_params</code>. So konfigurieren Sie z. B. den Analysator <code translate="no">english</code> für die Phrasenerkennung in englischem Text:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus unterstützt mehrere Analysatoren, die für verschiedene Sprachen und Anwendungsfälle zugeschnitten sind. Detaillierte Informationen finden Sie unter <a href="/docs/de/analyzer-overview.md">Analyzer-Übersicht</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Phrasenabgleich verwenden<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie den Abgleich für ein <code translate="no">VARCHAR</code> Feld in Ihrem Sammlungsschema aktiviert haben, können Sie Phrasenabgleiche mit dem <code translate="no">PHRASE_MATCH</code> Ausdruck durchführen.</p>
<div class="alert note">
<p>Beim <code translate="no">PHRASE_MATCH</code> -Ausdruck wird die Groß-/Kleinschreibung nicht berücksichtigt. Sie können entweder <code translate="no">PHRASE_MATCH</code> oder <code translate="no">phrase_match</code> verwenden.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Syntax des PHRASE_MATCH-Ausdrucks</h3><p>Verwenden Sie den Ausdruck <code translate="no">PHRASE_MATCH</code>, um das Feld, die Phrase und die optionale Flexibilität (<code translate="no">slop</code>) bei der Suche anzugeben. Die Syntax lautet:</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> Der Name des Feldes <code translate="no">VARCHAR</code>, für das Sie Phrasentreffer durchführen.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> Die genaue Phrase, nach der gesucht werden soll.</p></li>
<li><p><code translate="no">slop</code> (optional)<strong>:</strong> Eine ganze Zahl, die die maximal zulässige Anzahl von Positionen in übereinstimmenden Token angibt.</p>
<ul>
<li><p><code translate="no">0</code> (Standard): Es werden nur exakte Phrasen gefunden. Beispiel: Ein Filter für <strong>"maschinelles Lernen"</strong> passt genau auf <strong>"maschinelles Lernen"</strong>, aber nicht auf <strong>"Maschine verstärkt Lernen"</strong> oder <strong>"Lernmaschine".</strong></p></li>
<li><p><code translate="no">1</code>: Erlaubt geringfügige Abweichungen, z. B. einen zusätzlichen Begriff oder eine geringfügige Verschiebung der Position. Beispiel: Ein Filter für <strong>"maschinelles Lernen"</strong> passt zu <strong>"maschinelles Lernen"</strong> (ein Token zwischen <strong>"Maschine"</strong> und <strong>"Lernen")</strong>, aber nicht zu <strong>"Lernmaschine"</strong> (Begriffe vertauscht).</p></li>
<li><p><code translate="no">2</code>: Ermöglicht mehr Flexibilität, einschließlich der umgekehrten Reihenfolge der Begriffe oder bis zu zwei Token dazwischen. Beispiel: Ein Filter für <strong>"maschinelles Lernen"</strong> passt zu <strong>"Lernmaschine"</strong> (umgekehrte Begriffe) oder <strong>"Maschine fördert schnell das Lernen"</strong> (zwei Token zwischen <strong>"Maschine"</strong> und <strong>"Lernen")</strong>.</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Beispiel-Datensatz</h3><p>Angenommen, Sie haben eine Sammlung mit dem Namen <strong>tech_articles</strong>, die die folgenden fünf Entitäten enthält:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Maschinelles Lernen steigert die Effizienz bei der Analyse großer Datenmengen"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Das Erlernen eines maschinenbasierten Ansatzes ist für den Fortschritt der modernen KI unerlässlich"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Maschinenarchitekturen für maschinelles Lernen optimieren die Rechenlast"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"Maschine verbessert schnell die Modellleistung für fortlaufendes Lernen"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Das Lernen fortschrittlicher Maschinenalgorithmen erweitert die KI-Fähigkeiten"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Abfrage mit Phrasenübereinstimmung</h3><p>Bei Verwendung der Methode <code translate="no">query()</code> fungiert <strong>PHRASE_MATCH</strong> als skalarer Filter. Es werden nur Dokumente zurückgegeben, die die angegebene Phrase enthalten (vorbehaltlich der zulässigen Abweichung).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Beispiel: slop = 0 (exakte Übereinstimmung)</h4><p>In diesem Beispiel werden Dokumente zurückgegeben, die den exakten Ausdruck <strong>"maschinelles Lernen"</strong> enthalten, ohne dazwischen liegende zusätzliche Token.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Erwartete Übereinstimmungsergebnisse:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Maschinelles Lernen steigert die Effizienz bei der Analyse großer Datenmengen"</p></td>
   </tr>
</table>
<p>Nur Dokument 1 enthält den exakten Ausdruck <strong>"maschinelles Lernen"</strong> in der angegebenen Reihenfolge und ohne zusätzliche Zeichen.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Suche mit Phrasenübereinstimmung</h3><p>Bei Suchvorgängen wird <strong>PHRASE_MATCH</strong> verwendet, um Dokumente zu filtern, bevor die Vektorähnlichkeitsbewertung angewendet wird. Dieser zweistufige Ansatz grenzt die Kandidatenmenge zunächst durch Textübereinstimmung ein und ordnet diese Kandidaten dann auf der Grundlage von Vektoreinbettungen neu ein.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Beispiel: slop = 1</h4><p>Hier erlauben wir einen Slop von 1. Der Filter wird auf Dokumente angewandt, die den Ausdruck <strong>"Lernmaschine"</strong> mit leichter Flexibilität enthalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ergebnisse der Übereinstimmung:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Das Erlernen eines maschinenbasierten Ansatzes ist für den modernen KI-Fortschritt unerlässlich"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep Learning-Maschinenarchitekturen optimieren die Rechenlast"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Das Erlernen fortgeschrittener maschineller Algorithmen erweitert die Fähigkeiten der KI"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Beispiel: slop = 2</h4><p>In diesem Beispiel ist ein Slop von 2 erlaubt, was bedeutet, dass bis zu zwei zusätzliche Token (oder umgekehrte Begriffe) zwischen den Wörtern <strong>"Maschine"</strong> und <strong>"Lernen"</strong> erlaubt sind <strong>.</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Übereinstimmende Ergebnisse:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Maschinelles Lernen steigert die Effizienz bei der Analyse großer Datenmengen"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Maschinenarchitekturen für maschinelles Lernen optimieren die Rechenlast"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Beispiel: slop = 3</h4><p>In diesem Beispiel sorgt ein Slop von 3 für noch mehr Flexibilität. Der Filter sucht nach <strong>"maschinellem Lernen"</strong>, wobei bis zu drei Token-Positionen zwischen den Wörtern zulässig sind.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Übereinstimmende Ergebnisse:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Maschinelles Lernen steigert die Effizienz bei der Analyse großer Datenmengen"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Das Erlernen eines maschinenbasierten Ansatzes ist für den Fortschritt der modernen KI unerlässlich"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Maschinenarchitekturen für maschinelles Lernen optimieren die Rechenlast"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Das Erlernen fortgeschrittener maschineller Algorithmen erweitert die KI-Fähigkeiten"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Erwägungen<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Die Aktivierung des Phrasenabgleichs für ein Feld löst die Erstellung eines invertierten Indexes aus, der Speicherressourcen verbraucht. Berücksichtigen Sie die Auswirkungen auf den Speicherplatz, wenn Sie sich für die Aktivierung dieser Funktion entscheiden, da diese je nach Textgröße, eindeutigen Token und dem verwendeten Analysator variieren.</p></li>
<li><p>Sobald Sie einen Analyzer in Ihrem Schema definiert haben, werden seine Einstellungen für diese Sammlung dauerhaft. Wenn Sie entscheiden, dass ein anderes Analyseprogramm besser zu Ihren Anforderungen passt, können Sie die vorhandene Sammlung löschen und eine neue Sammlung mit der gewünschten Analysekonfiguration erstellen.</p></li>
<li><p>Die Leistung der Phrasenübereinstimmung hängt davon ab, wie der Text tokenisiert wird. Bevor Sie einen Analyzer auf Ihre gesamte Sammlung anwenden, sollten Sie die Methode <code translate="no">run_analyzer</code> verwenden, um die Tokenisierungsausgabe zu überprüfen. Weitere Informationen finden Sie unter <a href="/docs/de/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Analyzer-Übersicht</a>.</p></li>
<li><p>Escape-Regeln in <code translate="no">filter</code> Ausdrücken:</p>
<ul>
<li><p>Zeichen, die in doppelten oder einfachen Anführungszeichen innerhalb von Ausdrücken eingeschlossen sind, werden als Stringkonstanten interpretiert. Wenn die Zeichenkettenkonstante Escape-Zeichen enthält, müssen die Escape-Zeichen mit einer Escape-Sequenz dargestellt werden. Verwenden Sie zum Beispiel <code translate="no">\\</code> für <code translate="no">\</code>, <code translate="no">\\t</code> für einen Tabulator <code translate="no">\t</code> und <code translate="no">\\n</code> für einen Zeilenumbruch.</p></li>
<li><p>Wenn eine Stringkonstante von einfachen Anführungszeichen eingeschlossen ist, sollte ein einfaches Anführungszeichen innerhalb der Konstante als <code translate="no">\\'</code> dargestellt werden, während ein doppeltes Anführungszeichen entweder als <code translate="no">&quot;</code> oder <code translate="no">\\&quot;</code> dargestellt werden kann. Beispiel: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Wenn eine String-Konstante von doppelten Anführungszeichen eingeschlossen ist, sollte ein doppeltes Anführungszeichen innerhalb der Konstante als <code translate="no">\\&quot;</code> dargestellt werden, während ein einfaches Anführungszeichen entweder als <code translate="no">'</code> oder <code translate="no">\\'</code> dargestellt werden kann. Beispiel: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
