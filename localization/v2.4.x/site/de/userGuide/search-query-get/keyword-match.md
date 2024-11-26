---
id: keyword-match.md
summary: >-
  Der Schlüsselwortabgleich in Milvus ermöglicht das präzise Auffinden von
  Dokumenten auf der Grundlage bestimmter Begriffe. Diese Funktion wird in
  erster Linie für eine gefilterte Suche verwendet, um bestimmte Bedingungen zu
  erfüllen, und kann eine skalare Filterung zur Verfeinerung der
  Abfrageergebnisse beinhalten, die eine Ähnlichkeitssuche innerhalb von
  Vektoren ermöglicht, die skalare Kriterien erfüllen.
title: Schlüsselwort-Abgleich
---
<h1 id="Keyword-Match​" class="common-anchor-header">Schlüsselwort-Abgleich<button data-href="#Keyword-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Schlüsselwortabgleich in Milvus ermöglicht die präzise Suche nach Dokumenten auf der Grundlage bestimmter Begriffe. Diese Funktion wird in erster Linie für eine gefilterte Suche verwendet, um bestimmte Bedingungen zu erfüllen, und kann eine skalare Filterung zur Verfeinerung der Abfrageergebnisse beinhalten, die eine Ähnlichkeitssuche innerhalb von Vektoren ermöglicht, die skalare Kriterien erfüllen.</p>
<div class="alert note">
<p>Der Schlüsselwortabgleich konzentriert sich auf die Suche nach exakten Vorkommen der Abfragebegriffe, ohne die Relevanz der übereinstimmenden Dokumente zu bewerten. Wenn Sie die relevantesten Dokumente auf der Grundlage der semantischen Bedeutung und Wichtigkeit der Suchbegriffe abrufen möchten, empfehlen wir Ihnen die <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
</div>
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
    </button></h2><p>Milvus integriert <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, um den zugrundeliegenden invertierten Index und die Stichwortsuche zu betreiben. Für jeden Texteintrag indiziert Milvus diesen nach folgendem Verfahren.</p>
<ol>
<li><p><a href="/docs/de/analyzer-overview.md">Analyzer</a>: Der Analyzer verarbeitet den eingegebenen Text, indem er ihn in einzelne Wörter (Token) zerlegt und dann je nach Bedarf Filter anwendet. So kann Milvus einen Index auf der Grundlage dieser Token erstellen.</p></li>
<li><p><a href="/docs/de/index-scalar-fields.md">Indizierung</a>: Nach der Textanalyse erstellt Milvus einen invertierten Index, der jedes einzelne Token den Dokumenten zuordnet, die es enthalten.</p></li>
</ol>
<p>Wenn ein Benutzer einen Schlüsselwortvergleich durchführt, wird der invertierte Index verwendet, um schnell alle Dokumente abzurufen, die die Schlüsselwörter enthalten. Dies ist wesentlich schneller als das Durchsuchen jedes einzelnen Dokuments.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" />
   </span> <span class="img-wrapper"> <span>Schlüsselwort-Abgleich</span> </span></p>
<h2 id="Enable-keyword-match" class="common-anchor-header">Aktivieren der Stichwortsuche<button data-href="#Enable-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Schlüsselwortabgleich funktioniert mit dem Feldtyp <code translate="no">VARCHAR</code>, der in Milvus im Wesentlichen ein String-Datentyp ist. Um den Schlüsselwortabgleich zu aktivieren, setzen Sie sowohl <code translate="no">enable_analyzer</code> als auch <code translate="no">enable_match</code> auf <code translate="no">True</code> und konfigurieren dann optional einen Analyzer für die Textanalyse, wenn Sie Ihr Sammlungsschema definieren.</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">Setzen Sie <code translate="no">enable_analyzer</code> und <code translate="no">enable_match</code></h3><p>Um den Schlüsselwortabgleich für ein bestimmtes <code translate="no">VARCHAR</code> -Feld zu aktivieren, setzen Sie bei der Definition des Feldschemas die beiden Parameter <code translate="no">enable_analyzer</code> und <code translate="no">enable_match</code> auf <code translate="no">True</code>. Dadurch wird Milvus angewiesen, den Text zu tokenisieren und einen invertierten Index für das angegebene Feld zu erstellen, was schnelle und effiziente Schlüsselwortübereinstimmungen ermöglicht.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">Optional: Konfigurieren Sie einen Analysator</h3><p>Die Leistung und Genauigkeit des Schlüsselwortabgleichs hängt vom gewählten Analysator ab. Verschiedene Analysatoren sind auf verschiedene Sprachen und Textstrukturen zugeschnitten, so dass die Wahl des richtigen Analysators die Suchergebnisse für Ihren speziellen Anwendungsfall erheblich beeinflussen kann.</p>
<p>Standardmäßig verwendet Milvus den Analysator <code translate="no">standard</code>, der Text auf der Grundlage von Leerzeichen und Interpunktion in Token umwandelt, Token entfernt, die länger als 40 Zeichen sind, und Text in Kleinbuchstaben umwandelt. Zur Anwendung dieser Standardeinstellung sind keine zusätzlichen Parameter erforderlich. Weitere Informationen finden Sie unter <a href="/docs/de/standard-analyzer.md">Standard</a>.</p>
<p>In Fällen, in denen ein anderer Analyzer erforderlich ist, können Sie diesen mit dem Parameter <code translate="no">analyzer_params</code> konfigurieren. Zum Beispiel, um den <code translate="no">english</code> Analyzer für die Verarbeitung von englischem Text anzuwenden.</p>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus bietet auch verschiedene andere Analysatoren an, die für unterschiedliche Sprachen und Szenarien geeignet sind. Weitere Einzelheiten finden Sie unter <a href="/docs/de/analyzer-overview.md">Übersicht</a>.</p>
<h2 id="Use-keyword-match" class="common-anchor-header">Schlüsselwortabgleich verwenden<button data-href="#Use-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie die Schlüsselwortübereinstimmung für ein VARCHAR-Feld in Ihrem Sammelschema aktiviert haben, können Sie Schlüsselwortübereinstimmungen mit dem Ausdruck <code translate="no">TEXT_MATCH</code> durchführen.</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">Syntax des TEXT_MATCH-Ausdrucks</h3><p>Der Ausdruck <code translate="no">TEXT_MATCH</code> wird verwendet, um das Feld und die Schlüsselwörter anzugeben, nach denen gesucht werden soll. Seine Syntax lautet wie folgt.</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: Der Name des VARCHAR-Feldes, nach dem gesucht werden soll.</p></li>
<li><p><code translate="no">text</code>: Die Schlüsselwörter, nach denen gesucht werden soll. Mehrere Schlüsselwörter können durch Leerzeichen oder andere geeignete Trennzeichen getrennt werden, je nach Sprache und konfiguriertem Analysator.</p></li>
</ul>
<p>Standardmäßig verwendet <code translate="no">TEXT_MATCH</code> die Logik der <strong>ODER-Verknüpfung</strong>, d.h. es werden Dokumente zurückgegeben, die eines der angegebenen Schlüsselwörter enthalten. Um zum Beispiel nach Dokumenten zu suchen, die die Schlüsselwörter <code translate="no">machine</code> oder <code translate="no">deep</code> im Feld <code translate="no">text</code> enthalten, verwenden Sie den folgenden Ausdruck.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch mehrere <code translate="no">TEXT_MATCH</code> Ausdrücke mit logischen Operatoren kombinieren, um einen <strong>UND-Abgleich</strong> durchzuführen. Um zum Beispiel nach Dokumenten zu suchen, die sowohl <code translate="no">machine</code> als auch <code translate="no">deep</code> im Feld <code translate="no">text</code> enthalten, verwenden Sie den folgenden Ausdruck.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-keyword-match​" class="common-anchor-header">Suche mit Schlüsselwortübereinstimmung</h3><p>Die Schlüsselwortübereinstimmung kann in Kombination mit der Vektorähnlichkeitssuche verwendet werden, um den Suchbereich einzugrenzen und die Suchleistung zu verbessern. Indem Sie die Sammlung vor der vektoriellen Ähnlichkeitssuche mit Hilfe von Schlüsselwortübereinstimmung filtern, können Sie die Anzahl der zu durchsuchenden Dokumente reduzieren, was zu schnelleren Abfragezeiten führt.</p>
<p>In diesem Beispiel filtert der Ausdruck <code translate="no">filter</code> die Suchergebnisse so, dass nur Dokumente enthalten sind, die mit den angegebenen Schlüsselwörtern <code translate="no">keyword1</code> oder <code translate="no">keyword2</code> übereinstimmen. Die Vektorähnlichkeitssuche wird dann mit dieser gefilterten Teilmenge von Dokumenten durchgeführt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-keyword-match​" class="common-anchor-header">Abfrage mit Schlüsselwortübereinstimmung</h3><p>Die Schlüsselwortübereinstimmung kann auch für die skalare Filterung in Abfrageoperationen verwendet werden. Durch Angabe eines Ausdrucks <code translate="no">TEXT_MATCH</code> im Parameter <code translate="no">expr</code> der Methode <code translate="no">query()</code> können Sie Dokumente abrufen, die mit den angegebenen Schlüsselwörtern übereinstimmen.</p>
<p>Im folgenden Beispiel werden Dokumente abgerufen, bei denen das Feld <code translate="no">text</code> die beiden Schlüsselwörter <code translate="no">keyword1</code> und <code translate="no">keyword2</code> enthält.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">Überlegungen<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Das Aktivieren des Schlüsselwortabgleichs für ein Feld löst die Erstellung eines invertierten Indexes aus, der Speicherressourcen verbraucht. Berücksichtigen Sie die Auswirkungen auf den Speicherplatz, wenn Sie sich für die Aktivierung dieser Funktion entscheiden, da diese je nach Textgröße, eindeutigen Token und dem verwendeten Analysator variieren.</p></li>
<li><p>Sobald Sie einen Analyzer in Ihrem Schema definiert haben, werden seine Einstellungen für diese Sammlung dauerhaft. Wenn Sie entscheiden, dass ein anderes Analyseprogramm besser zu Ihren Anforderungen passt, können Sie die vorhandene Sammlung löschen und eine neue Sammlung mit der gewünschten Analysekonfiguration erstellen.</p></li>
</ul>
