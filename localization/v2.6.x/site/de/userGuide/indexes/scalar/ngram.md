---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  Der NGRAM-Index in Milvus wurde erstellt, um LIKE-Abfragen auf VARCHAR-Feldern
  oder bestimmten JSON-Pfaden innerhalb von JSON-Feldern zu beschleunigen. Bevor
  der Index erstellt wird, zerlegt Milvus den Text in kurze, sich
  überschneidende Teilstrings einer festen Länge n, die als n-Gramme bezeichnet
  werden. Bei n = 3 wird zum Beispiel das Wort "Milvus" in 3-Gramme aufgeteilt:
  "Mil", "ilv", "lvu", und "vus". Diese n-Gramme werden dann in einem
  invertierten Index gespeichert, der jedes Gramm den Dokument-IDs zuordnet, in
  denen es vorkommt. Zur Abfragezeit ermöglicht dieser Index Milvus eine
  schnelle Eingrenzung der Suche auf eine kleine Gruppe von Kandidaten, was zu
  einer wesentlich schnelleren Abfrageausführung führt.
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Index <code translate="no">NGRAM</code> in Milvus wurde erstellt, um <code translate="no">LIKE</code> Abfragen auf <code translate="no">VARCHAR</code> Felder oder bestimmte JSON-Pfade innerhalb von <code translate="no">JSON</code> Feldern zu beschleunigen. Bevor der Index erstellt wird, zerlegt Milvus den Text in kurze, sich überschneidende Teilstrings einer festen Länge <em>n</em>, die als <em>n-Gramme</em> bezeichnet werden. Bei <em>n = 3</em> wird zum Beispiel das Wort <em>"Milvus"</em> in 3-Gramme aufgeteilt: <em>"Mil",</em> <em>"ilv",</em> <em>"lvu",</em> und <em>"vus".</em> Diese n-Gramme werden dann in einem invertierten Index gespeichert, der jedes Gramm den Dokument-IDs zuordnet, in denen es vorkommt. Zur Abfragezeit erlaubt dieser Index Milvus, die Suche schnell auf eine kleine Gruppe von Kandidaten einzugrenzen, was zu einer viel schnelleren Ausführung der Abfrage führt.</p>
<p>Verwenden Sie ihn, wenn Sie eine schnelle Präfix-, Suffix-, Infix- oder Wildcard-Filterung benötigen:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Einzelheiten zur Syntax von Filterausdrücken finden Sie unter <a href="/docs/de/basic-operators.md#Range-operators">Grundlegende Operatoren</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Wie funktioniert es?<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementiert den <code translate="no">NGRAM</code> Index in einem zweiphasigen Prozess:</p>
<ol>
<li><p><strong>Index aufbauen</strong>: Generierung von n-Grammen für jedes Dokument und Aufbau eines invertierten Index während des Ingest-Prozesses.</p></li>
<li><p><strong>Abfragen beschleunigen</strong>: Verwenden Sie den Index, um eine kleine Kandidatengruppe herauszufiltern, und überprüfen Sie dann die exakten Übereinstimmungen.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Phase 1: Aufbau des Index<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Während der Datenaufnahme baut Milvus den NGRAM-Index auf, indem es zwei Hauptschritte durchführt:</p>
<ol>
<li><p><strong>Zerlegen des Textes in n-Gramme</strong>: Milvus schiebt ein Fenster von <em>n</em> über jede Zeichenkette im Zielfeld und extrahiert überlappende Teilzeichenketten, oder <em>n-Gramme</em>. Die Länge dieser Teilstrings fällt in einen konfigurierbaren Bereich, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: Das kürzeste zu erzeugende n-Gramm. Dies definiert auch die minimale Abfrage-Teilstringlänge, die vom Index profitieren kann.</p></li>
<li><p><code translate="no">max_gram</code>: Das längste zu erzeugende n-Gramm. Zur Abfragezeit wird es auch als maximale Fenstergröße verwendet, wenn lange Abfragezeichenfolgen aufgeteilt werden.</p></li>
</ul>
<p>Zum Beispiel wird bei <code translate="no">min_gram=2</code> und <code translate="no">max_gram=3</code> die Zeichenfolge <code translate="no">&quot;AI database&quot;</code> wie folgt aufgeteilt:</p>
<ul>
<li><strong>2-Gramme:</strong> <code translate="no">AI</code>, <code translate="no">I_</code>, <code translate="no">_d</code>, <code translate="no">da</code>, <code translate="no">at</code>, ...</li>
<li><strong>3-Gramme:</strong> <code translate="no">AI_</code>, <code translate="no">I_d</code>, <code translate="no">_da</code>, <code translate="no">dat</code>, <code translate="no">ata</code>, ...</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Ngram-Index erstellen</span> </span></p>
<blockquote>
<p><strong>Hinweis</strong></p>
<ul>
<li><p>Für einen Bereich <code translate="no">[min_gram, max_gram]</code> erzeugt Milvus alle n-Gramme für jede Länge zwischen den beiden Werten (einschließlich).<br>
Beispiel: mit <code translate="no">[2,4]</code> und dem Wort <code translate="no">&quot;text&quot;</code>, generiert Milvus:</p>
<ul>
<li><strong>2-Gramme:</strong> <code translate="no">te</code>, <code translate="no">ex</code>, <code translate="no">xt</code></li>
<li><strong>3-Gramme:</strong> <code translate="no">tex</code>, <code translate="no">ext</code></li>
<li><strong>4-Gramme</strong>: <code translate="no">text</code></li>
</ul></li>
<li><p>Die N-Gramm-Zerlegung ist zeichenbasiert und sprachunabhängig. Im Chinesischen wird zum Beispiel <code translate="no">&quot;向量数据库&quot;</code> mit <code translate="no">min_gram = 2</code> zerlegt in: <code translate="no">&quot;向量&quot;</code>, <code translate="no">&quot;量数&quot;</code>, <code translate="no">&quot;数据&quot;</code>, <code translate="no">&quot;据库&quot;</code>.</p></li>
<li><p>Leerzeichen und Interpunktion werden bei der Zerlegung wie Zeichen behandelt.</p></li>
<li><p>Bei der Zerlegung wird die ursprüngliche Groß- und Kleinschreibung beibehalten, und der Abgleich erfolgt unter Berücksichtigung der Groß- und Kleinschreibung. So erzeugen beispielsweise <code translate="no">&quot;Database&quot;</code> und <code translate="no">&quot;database&quot;</code> unterschiedliche n-Gramme und erfordern bei Abfragen eine exakte Groß-/Kleinschreibung.</p></li>
</ul>
</blockquote></li>
<li><p><strong>Erstellen Sie einen invertierten Index</strong>: Es wird ein <strong>invertierter Index</strong> erstellt, der jedes generierte n-Gramm auf eine Liste der Dokument-IDs abbildet, die es enthalten.</p>
<p>Wenn zum Beispiel das 2-Gramm <code translate="no">&quot;AI&quot;</code> in Dokumenten mit den IDs 1, 5, 6, 8 und 9 vorkommt, wird im Index <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> gespeichert. Dieser Index wird dann zur Abfragezeit verwendet, um den Suchbereich schnell einzugrenzen.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Ngramm-Index 2 erstellen</span> </span></p>
<div class="alert note">
<p>Ein breiterer <code translate="no">[min_gram, max_gram]</code> Bereich erzeugt mehr Gramm und größere Zuordnungslisten. Wenn der Speicher knapp ist, sollten Sie den mmap-Modus für sehr große Buchungslisten in Betracht ziehen. Einzelheiten finden Sie unter <a href="/docs/de/mmap.md">Verwendung von mmap</a>.</p>
</div>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Phase 2: Abfragen beschleunigen<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn ein <code translate="no">LIKE</code> Filter ausgeführt wird, verwendet Milvus den NGRAM-Index, um die Abfrage in den folgenden Schritten zu beschleunigen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>Abfragen beschleunigen</span> </span></p>
<ol>
<li><p><strong>Extrahieren des Abfragebegriffs:</strong> Die zusammenhängende Teilzeichenkette ohne Platzhalter wird aus dem Ausdruck <code translate="no">LIKE</code> extrahiert (z. B. wird <code translate="no">&quot;%database%&quot;</code> zu <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>Zerlegen des Abfragebegriffs:</strong> Der Abfrageterm wird in <em>n-Gramme</em> zerlegt, basierend auf seiner Länge (<code translate="no">L</code>) und den Einstellungen <code translate="no">min_gram</code> und <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Wenn <code translate="no">L &lt; min_gram</code>, kann der Index nicht verwendet werden und die Abfrage fällt auf einen vollständigen Scan zurück.</p></li>
<li><p>Bei <code translate="no">min_gram ≤ L ≤ max_gram</code> wird der gesamte Abfragebegriff als ein einziges n-Gramm behandelt, und es ist keine weitere Zerlegung erforderlich.</p></li>
<li><p>Bei <code translate="no">L &gt; max_gram</code> wird der Abfragebegriff in sich überschneidende n-Gramme zerlegt, wobei eine Fenstergröße verwendet wird, die <code translate="no">max_gram</code> entspricht.</p></li>
</ul>
<p>Wenn zum Beispiel <code translate="no">max_gram</code> auf <code translate="no">3</code> gesetzt ist und der Abfragebegriff <code translate="no">&quot;database&quot;</code> eine Länge von <strong>8</strong> hat, wird er in 3-Gramm-Substrings wie <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code>, usw. zerlegt.</p></li>
<li><p><strong>Suche nach jeder Grammatik und Überschneidung</strong>: Milvus sucht jede Grammatik der Anfrage im invertierten Index und überschneidet dann die resultierenden Dokument-ID-Listen, um eine kleine Menge von Kandidatendokumenten zu finden. Diese Kandidaten enthalten alle Grammatiken der Abfrage.</p></li>
<li><p><strong>Überprüfen Sie die Ergebnisse und geben Sie sie zurück:</strong> Der ursprüngliche <code translate="no">LIKE</code> Filter wird dann als abschließende Prüfung nur auf die kleine Kandidatenmenge angewendet, um die exakten Übereinstimmungen zu finden.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Erstellen eines NGRAM-Index<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können einen NGRAM-Index für ein Feld <code translate="no">VARCHAR</code> oder für einen bestimmten Pfad innerhalb eines Feldes <code translate="no">JSON</code> erstellen.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Beispiel 1: Erstellen auf einem VARCHAR-Feld<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Für ein Feld <code translate="no">VARCHAR</code> geben Sie einfach <code translate="no">field_name</code> an und konfigurieren <code translate="no">min_gram</code> und <code translate="no">max_gram</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Diese Konfiguration erzeugt 2-Gramme und 3-Gramme für jede Zeichenkette in <code translate="no">text</code> und speichert sie im invertierten Index.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Beispiel 2: Erstellen auf einem JSON-Pfad<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Für ein Feld <code translate="no">JSON</code> müssen Sie zusätzlich zu den Gram-Einstellungen auch Folgendes angeben</p>
<ul>
<li><p><code translate="no">params.json_path</code> - den JSON-Pfad, der auf den Wert verweist, den Sie indizieren möchten.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - muss <code translate="no">&quot;varchar&quot;</code> sein (Groß- und Kleinschreibung wird nicht berücksichtigt), da die NGRAM-Indizierung mit Zeichenketten arbeitet.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel:</p>
<ul>
<li><p>Nur der Wert unter <code translate="no">json_field[&quot;body&quot;]</code> wird indiziert.</p></li>
<li><p>Der Wert wird vor der n-gram-Tokenisierung in <code translate="no">VARCHAR</code> umgewandelt.</p></li>
<li><p>Milvus erzeugt Teilstrings der Länge 2 bis 4 und speichert sie im invertierten Index.</p></li>
</ul>
<p>Weitere Informationen über die Indizierung eines JSON-Feldes finden Sie unter <a href="/docs/de/json-indexing.md">JSON-Indizierung</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Durch NGRAM beschleunigte Abfragen<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Damit der NGRAM-Index angewendet werden kann:</p>
<ul>
<li><p>Die Abfrage muss auf ein <code translate="no">VARCHAR</code> Feld (oder einen JSON Pfad) abzielen, das einen <code translate="no">NGRAM</code> Index hat.</p></li>
<li><p>Der literale Teil des <code translate="no">LIKE</code> Musters muss mindestens <code translate="no">min_gram</code> Zeichen lang sein.<em>(Wenn z.B. der kürzeste erwartete Abfragebegriff 2 Zeichen beträgt, setzen Sie min_gram=2 beim Erstellen des Index).</em></p></li>
</ul>
<p>Unterstützte Abfragetypen:</p>
<ul>
<li><p><strong>Präfix-Übereinstimmung</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Suffix-Abgleich</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Infix-Abgleich</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Wildcard-Übereinstimmung</strong></p>
<p>Milvus unterstützt sowohl <code translate="no">%</code> (null oder mehr Zeichen) als auch <code translate="no">_</code> (genau ein Zeichen).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON-Pfadabfragen</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Weitere Informationen zur Syntax von Filterausdrücken finden Sie unter <a href="/docs/de/basic-operators.md">Grundlegende Operatoren</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Einen Index löschen<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie die Methode <code translate="no">drop_index()</code>, um einen vorhandenen Index aus einer Sammlung zu entfernen.</p>
<div class="alert note">
<ul>
<li><p>In <strong>v2.6.3</strong> oder früher müssen Sie die Sammlung freigeben, bevor Sie einen skalaren Index löschen können.</p></li>
<li><p>Ab <strong>v2.6.4</strong> können Sie einen skalaren Index direkt löschen, sobald er nicht mehr benötigt wird - Sie müssen die Sammlung nicht mehr freigeben.</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Hinweise zur Verwendung<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Feldtypen</strong>: Unterstützt werden die Felder <code translate="no">VARCHAR</code> und <code translate="no">JSON</code>. Für JSON müssen Sie sowohl <code translate="no">params.json_path</code> als auch <code translate="no">params.json_cast_type=&quot;varchar&quot;</code> angeben.</p></li>
<li><p><strong>Unicode</strong>: Die NGRAM-Dekomposition ist zeichenbasiert und sprachunabhängig und schließt Leerzeichen und Interpunktion ein.</p></li>
<li><p><strong>Kompromiss zwischen Platz und Zeit</strong>: Breitere Grammbereiche <code translate="no">[min_gram, max_gram]</code> erzeugen mehr Gramm und größere Indizes. Wenn der Speicher knapp ist, sollten Sie den Modus <code translate="no">mmap</code> für große Buchungslisten in Betracht ziehen. Weitere Informationen finden Sie unter <a href="/docs/de/mmap.md">Verwendung von mmap</a>.</p></li>
<li><p><strong>Unveränderlichkeit</strong>: <code translate="no">min_gram</code> und <code translate="no">max_gram</code> können nicht an Ort und Stelle geändert werden - bauen Sie den Index neu auf, um sie anzupassen.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Bewährte Praktiken<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Wählen Sie min_gram und max_gram entsprechend dem Suchverhalten</strong></p>
<ul>
<li><p>Beginnen Sie mit <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Setzen Sie <code translate="no">min_gram</code> auf das kürzeste Literal, das Sie erwarten, dass die Benutzer eingeben.</p></li>
<li><p>Setzen Sie <code translate="no">max_gram</code> auf die typische Länge sinnvoller Teilstrings; eine größere <code translate="no">max_gram</code> verbessert die Filterung, erhöht aber den Platzbedarf.</p></li>
</ul></li>
<li><p><strong>Vermeiden Sie Gramm mit geringer Selektivität</strong></p>
<p>Sich stark wiederholende Muster (z. B. <code translate="no">&quot;aaaaaa&quot;</code>) bieten eine schwache Filterung und können nur begrenzte Vorteile bringen.</p></li>
<li><p><strong>Einheitlich normalisieren</strong></p>
<p>Wenden Sie dieselbe Normalisierung auf eingelesenen Text und Abfrageliterale an (z. B. Kleinschreibung, Trimmen), wenn Ihr Anwendungsfall dies erfordert.</p></li>
</ul>
