---
id: ngram.md
title: NGRAM
summary: >-
  Der NGRAM-Index in Milvus beschleunigt LIKE-Abfragen und geeignete
  Regex-Filter auf VARCHAR-Feldern oder bestimmten JSON-Pfaden innerhalb von
  JSON-Feldern. Vor dem Erstellen des Indexes teilt Milvus den Text in kurze,
  überlappende Teilzeichenfolgen fester Länge n auf, die als n-Gramme bezeichnet
  werden. Bei der Abfrage nutzt Milvus diese n-Gramme, um die Kandidatenliste
  einzugrenzen, bevor die ursprüngliche Filterbedingung überprüft wird.
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Der „ <code translate="no">NGRAM</code> “-Index in Milvus beschleunigt „ <code translate="no">LIKE</code> “-Abfragen und geeignete Regex-Filter auf „ <code translate="no">VARCHAR</code> “-Feldern oder bestimmten JSON-Pfaden innerhalb von „ <code translate="no">JSON</code> “-Feldern. Vor dem Erstellen des Indexes teilt Milvus den Text in kurze, überlappende Teilzeichenfolgen fester Länge <em>n</em> auf, die als <em>n-Gramme</em> bezeichnet werden. Bei <em>n = 3</em> wird das Wort <em>„Milvus“</em> beispielsweise in 3-Gramme aufgeteilt: <em>„Mil“</em>, <em>„ilv“</em>, <em>„lvu“</em> und <em>„vus“.</em> Diese n-Gramme werden dann in einem invertierten Index gespeichert, der jedes Gram den Dokument-IDs zuordnet, in denen es vorkommt. Bei der Abfrage ermöglicht dieser Index es Milvus, die Suche schnell auf eine kleine Menge von Kandidaten einzugrenzen, bevor die ursprüngliche Filterbedingung überprüft wird.</p>
<p>Verwenden Sie diese Funktion, wenn Sie eine schnelle Filterung nach Präfixen, Suffixen, Infixen, Platzhaltern oder zulässigen regulären Ausdrücken benötigen, wie zum Beispiel:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Einzelheiten zu „ <code translate="no">LIKE</code> “ und zur Syntax von Regex-Filterausdrücken finden Sie unter <a href="/docs/de/pattern-matching.md">„Pattern Matching</a>“.</p>
</div>
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
    </button></h2><p>Milvus implementiert den „ <code translate="no">NGRAM</code> “-Index in einem zweistufigen Prozess:</p>
<ol>
<li><p><strong>Index erstellen</strong>: Generieren Sie während der Dateneingabe N-Gramme für jedes Dokument und erstellen Sie einen invertierten Index.</p></li>
<li><p><strong>Abfragen beschleunigen</strong>: Der Index wird verwendet, um eine kleine Kandidatenmenge herauszufiltern; anschließend werden exakte Übereinstimmungen überprüft.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Phase 1: Erstellen des Index<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Während der Dateneingabe erstellt Milvus den NGRAM-Index in zwei Hauptschritten:</p>
<ol>
<li><p><strong>Text in n-Gramme zerlegen</strong>: Milvus verschiebt ein Fenster der Größe <em>n</em> über jede Zeichenfolge im Zielfeld und extrahiert überlappende Teilzeichenfolgen, sogenannte <em>n-Gramme</em>. Die Länge dieser Teilzeichenfolgen liegt innerhalb eines konfigurierbaren Bereichs, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: Das kürzeste zu generierende n-Gramm. Dies definiert auch die minimale Länge der Abfrage-Teilzeichenfolge, die vom Index profitieren kann.</p></li>
<li><p><code translate="no">max_gram</code>: Das längste zu generierende n-Gramm. Zum Zeitpunkt der Abfrage wird dieser Wert auch als maximale Fenstergröße beim Aufteilen langer Abfragezeichenfolgen verwendet.</p></li>
</ul>
<p>Beispiel: Bei den Werten „ <code translate="no">min_gram=2</code> “ und „ <code translate="no">max_gram=3</code> “ wird die Zeichenfolge „ <code translate="no">&quot;AI database&quot;</code> “ wie folgt aufgeteilt:</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>N-Gram-Index erstellen</span>
  
 </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>Erstellen eines invertierten Index</strong>: Es wird ein <strong>invertierter Index</strong> erstellt, der jedes generierte N-Gram einer Liste der Dokument-IDs zuordnet, die es enthalten.</p>
<p>Wenn beispielsweise das 2-Gram „ <code translate="no">&quot;AI&quot;</code> “ in Dokumenten mit den IDs 1, 5, 6, 8 und 9 vorkommt, wird im Index „ <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> “ gespeichert. Dieser Index wird dann bei der Abfrage verwendet, um den Suchbereich schnell einzugrenzen.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>N-Gram-Index erstellen 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
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
    </button></h3><p>Wenn ein „ <code translate="no">LIKE</code> “-Filter oder ein geeigneter Regex-Filter ausgeführt wird, nutzt Milvus den NGRAM-Index, um die Abfrage in den folgenden Schritten zu beschleunigen:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>Abfragen beschleunigen</span>
  
 </span></p>
<ol>
<li><p><strong>Extrahieren des Suchbegriffs:</strong> Die zusammenhängende Teilzeichenfolge ohne Platzhalter wird aus dem Ausdruck „ <code translate="no">LIKE</code> “ extrahiert (z. B. wird aus „ <code translate="no">&quot;%database%&quot;</code> “ „ <code translate="no">&quot;database&quot;</code> “). Bei Regex-Filtern extrahiert Milvus, sofern möglich, feste Literal-Teilzeichenfolgen aus dem Regex-Muster. Beispielsweise enthält „ <code translate="no">message =~ &quot;error.*timeout&quot;</code> “ die Literale „ <code translate="no">error</code> “ und „ <code translate="no">timeout</code> “.</p></li>
<li><p><strong>Zerlegung des Suchbegriffs:</strong> Der Suchbegriff wird basierend auf seiner Länge (<code translate="no">L</code>) sowie den Einstellungen „ <code translate="no">min_gram</code> “ und „ <code translate="no">max_gram</code> “ in <em>N-Gramme</em> zerlegt.</p>
<ul>
<li><p>Wenn „ <code translate="no">L &lt; min_gram</code> “ gesetzt ist, kann der Index nicht verwendet werden, und die Abfrage weicht auf einen vollständigen Scan aus.</p></li>
<li><p>Ist <code translate="no">min_gram ≤ L ≤ max_gram</code>, wird der gesamte Suchbegriff als einzelnes N-Gram behandelt, und eine weitere Zerlegung ist nicht erforderlich.</p></li>
<li><p>Wenn „ <code translate="no">L &gt; max_gram</code> “ gesetzt ist, wird der Suchbegriff unter Verwendung einer Fenstergröße, die dem Wert „ <code translate="no">max_gram</code> “ entspricht, in überlappende Grams zerlegt.</p></li>
</ul>
<p>Wenn beispielsweise „ <code translate="no">max_gram</code> “ auf „ <code translate="no">3</code> “ gesetzt ist und der Suchbegriff „ <code translate="no">&quot;database&quot;</code> “ lautet, der eine Länge von <strong>8</strong> hat, wird er in 3-Gram-Teilzeichenfolgen wie „ <code translate="no">&quot;dat&quot;</code> “, „ <code translate="no">&quot;ata&quot;</code> “, „ <code translate="no">&quot;tab&quot;</code> “ usw. zerlegt.</p></li>
<li><p><strong>Suche nach jedem Gram und Schnittmenge</strong>: Milvus sucht jedes der Such-Gramme im invertierten Index und ermittelt dann die Schnittmenge der resultierenden Dokument-ID-Listen, um eine kleine Menge von Kandidatendokumenten zu finden. Diese Kandidaten enthalten alle Gramme aus der Suchanfrage.</p></li>
<li><p><strong>Überprüfung und Rückgabe der Ergebnisse:</strong> Der ursprüngliche „ <code translate="no">LIKE</code> “- oder Regex-Filter wird anschließend als abschließende Überprüfung ausschließlich auf die kleine Kandidatenmenge angewendet, um die exakten Übereinstimmungen zu ermitteln.</p></li>
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
    </button></h2><p>Sie können einen NGRAM-Index für ein „ <code translate="no">VARCHAR</code> “-Feld oder für einen bestimmten Pfad innerhalb eines „ <code translate="no">JSON</code> “-Feldes erstellen.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Beispiel 1: Erstellung für ein VARCHAR-Feld<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Für ein „ <code translate="no">VARCHAR</code> “-Feld geben Sie einfach den „ <code translate="no">field_name</code> “ an und konfigurieren „ <code translate="no">min_gram</code> “ sowie „ <code translate="no">max_gram</code> “.</p>
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
<p>Diese Konfiguration generiert 2-Gramme und 3-Gramme für jede Zeichenfolge in „ <code translate="no">text</code> “ und speichert sie im invertierten Index.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Beispiel 2: Erstellung auf einem JSON-Pfad<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Für ein Feld in „ <code translate="no">JSON</code> “ müssen Sie zusätzlich zu den Gram-Einstellungen Folgendes angeben:</p>
<ul>
<li><p><code translate="no">params.json_path</code> – den JSON-Pfad, der auf den Wert verweist, den Sie indizieren möchten.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – muss „ <code translate="no">&quot;varchar&quot;</code> “ lauten (Groß-/Kleinschreibung spielt keine Rolle), da die NGRAM-Indizierung auf Zeichenfolgen basiert.</p></li>
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
<li><p>Wird nur der Wert unter „ <code translate="no">json_field[&quot;body&quot;]</code> “ indiziert.</p></li>
<li><p>Der Wert wird vor der N-Gram-Tokenisierung in „ <code translate="no">VARCHAR</code> “ umgewandelt.</p></li>
<li><p>Milvus generiert Teilzeichenfolgen der Länge 2 bis 4 und speichert diese im invertierten Index.</p></li>
</ul>
<p>Weitere Informationen zur Indizierung eines JSON-Feldes finden Sie unter <a href="/docs/de/json-indexing.md">„JSON-Indizierung</a>“.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Durch N-Gram beschleunigte Abfragen<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Damit der NGRAM-Index angewendet wird, gilt Folgendes:</p>
<ul>
<li><p>muss die Abfrage auf ein „ <code translate="no">VARCHAR</code> “-Feld (oder einen JSON-Pfad) abzielen, das über einen „ <code translate="no">NGRAM</code> “-Index verfügt.</p></li>
<li><p>Der Literalteil des „ <code translate="no">LIKE</code> “-Musters muss mindestens <code translate="no">min_gram</code> Zeichen lang sein.
<em>(Wenn beispielsweise Ihr kürzester erwarteter Abfrageterm 2 Zeichen lang ist, setzen Sie bei der Erstellung des Indexes „min_gram=2“.)</em></p></li>
</ul>
<p>Unterstützte Abfragetypen:</p>
<ul>
<li><p><strong>Präfixübereinstimmung</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Suffix-Übereinstimmung</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Infix-Übereinstimmung</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Platzhalter-Übereinstimmung</strong></p>
<p>Milvus unterstützt sowohl „ <code translate="no">%</code> “ (null oder mehr Zeichen) als auch „ <code translate="no">_</code> “ (genau ein Zeichen).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON-Pfadabfragen</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Regex-Filter</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Regex-Filter auf einem JSON-Pfad</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Weitere Informationen zur Syntax von Filterausdrücken finden Sie unter <a href="/docs/de/pattern-matching.md">„Musterabgleich</a>“.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Index löschen<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie die Methode „ <code translate="no">drop_index()</code> “, um einen vorhandenen Index aus einer Sammlung zu entfernen.</p>
<div class="alert note">
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
<li><p><strong>Feldtypen</strong>: Wird für Felder vom Typ „ <code translate="no">VARCHAR</code> “ und „ <code translate="no">JSON</code> “ unterstützt. Bei JSON müssen sowohl „ <code translate="no">params.json_path</code> “ als auch „ <code translate="no">params.json_cast_type=&quot;varchar&quot;</code> “ angegeben werden.</p></li>
<li><p><strong>Regex-Beschleunigung</strong>: „ <code translate="no">NGRAM</code> “ beschleunigt Regex-Filter nur dann, wenn Milvus feste Literal-Teilstrings aus dem Regex-Muster extrahieren kann. Muster wie „ <code translate="no">[a-z]+</code> “ greifen möglicherweise auf das Scannen zurück, da sie keine festen Literale enthalten.</p></li>
<li><p><strong>Groß-/Kleinschreibung bei Regex ignorieren</strong>: Regex-Muster mit <code translate="no">(?i)</code> werden unterstützt, die Optimierung von <code translate="no">NGRAM</code> kann jedoch möglicherweise übersprungen werden, da der Index die ursprüngliche Groß-/Kleinschreibung beibehält.</p></li>
<li><p><strong>Verifizierungsschritt</strong>: Bei Regex-Filtern generiert „ <code translate="no">NGRAM</code> “ Kandidaten, und Milvus überprüft diese anhand des vollständigen RE2-Regex-Musters, sodass die Indexbeschleunigung die Übereinstimmungsergebnisse nicht verändert.</p></li>
<li><p><strong>Unicode</strong>: Die NGRAM-Zerlegung erfolgt zeichenbasiert und sprachunabhängig und umfasst Leerzeichen sowie Satzzeichen.</p></li>
<li><p><strong>Zeit-Speicher-Kompromiss</strong>: Breitere Gram-Bereiche bei „ <code translate="no">[min_gram, max_gram]</code> “ erzeugen mehr Grams und größere Indizes. Bei knappen Speicherressourcen sollten Sie für große Posting-Listen den Modus „ <code translate="no">mmap</code> “ in Betracht ziehen. Weitere Informationen finden Sie unter <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">„mmap verwenden</a>“.</p></li>
<li><p><strong>Unveränderlichkeit</strong>: „ <code translate="no">min_gram</code> “ und „ <code translate="no">max_gram</code> “ können nicht direkt geändert werden – erstellen Sie den Index neu, um sie anzupassen.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Bewährte Vorgehensweisen<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Wählen Sie „min_gram“ und „max_gram“ so, dass sie dem Suchverhalten entsprechen</strong></p>
<ul>
<li><p>Beginnen Sie mit „ <code translate="no">min_gram=2</code> “ und „ <code translate="no">max_gram=3</code> “.</p></li>
<li><p>Legen Sie ` <code translate="no">min_gram</code> ` auf das kürzeste Literal fest, das Benutzer voraussichtlich eingeben werden.</p></li>
<li><p>Legen Sie ` <code translate="no">max_gram</code> ` nahe an die typische Länge aussagekräftiger Teilzeichenfolgen fest; ein größerer Wert für ` <code translate="no">max_gram</code> ` verbessert die Filterung, erhöht jedoch den Speicherbedarf.</p></li>
</ul></li>
<li><p><strong>Vermeiden Sie Grams mit geringer Selektivität</strong></p>
<p>Sich stark wiederholende Muster (z. B. ` <code translate="no">&quot;aaaaaa&quot;</code>`) bieten eine schwache Filterung und führen möglicherweise nur zu begrenzten Gewinnen.</p></li>
<li><p><strong>Normalisieren Sie konsistent</strong></p>
<p>Wenden Sie auf den eingelesenen Text und die Abfrage-Literale dieselbe Normalisierung an (z. B. Umwandlung in Kleinbuchstaben, Trimmen), wenn Ihr Anwendungsfall dies erfordert.</p></li>
</ul>
