---
id: pattern-matching.md
title: Musterabgleich
summary: >-
  Milvus unterstützt den Abgleich von Zeichenfolgenmustern mit
  LIKE-Platzhaltermustern und RE2-regulären Ausdrücken. Verwenden Sie
  Musterfilter, um Präfixe, Suffixe, Teilzeichenfolgen, strukturierte Codes,
  E-Mail-Domänen, URL-Pfade und andere Zeichenfolgenmuster in VARCHAR-Feldern,
  JSON-Zeichenfolgenpfaden oder ARRAY-Elementen abzugleichen.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Musterabgleich<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>In agentenbasierten Suchanwendungen ergänzen sich Vektorsuche und Musterabgleich im Grep-Stil häufig gegenseitig. Die Vektorsuche liefert semantisch relevante Entitäten, während der Musterabgleich diese Ergebnisse anhand exakter Zeichenfolgenstrukturen wie Fehlercodes, Protokollpräfixe, E-Mail-Domänen, URL-Pfade oder Identifikatoren eingrenzt.</p>
<p>In Milvus können Sie diese Musterbeschränkungen in skalaren Filtern ausdrücken: mit „ <code translate="no">LIKE</code> “ für einfache Platzhalterabgleiche und mit „ <code translate="no">=~</code> “ oder „ <code translate="no">!~</code> “ für <a href="https://github.com/google/re2/wiki/syntax">RE2-reguläre</a> Ausdrücke. Sie können diese Filter mit „ <code translate="no">query</code> “, „ <code translate="no">search</code> “ oder der hybriden Suche kombinieren.</p>
<div class="alert note">
<p>Auf dieser Seite wird der Musterabgleich in skalaren Filterausdrücken beschrieben, die von <code translate="no">query</code>, <code translate="no">search</code> und der Hybrid-Suche verwendet werden. Diese Ausdrücke werten Feldwerte aus und ändern die von einem Analysator erzeugten Token nicht. Informationen zum Filtern von Token während der Textanalyse finden Sie unter <a href="/docs/de/regex-filter.md">„Regex-Analysator-Filter</a>“.</p>
</div>
<p>Ausdrücke für den Musterabgleich werden im Parameter „ <code translate="no">filter</code> “ angegeben. Die folgende Abfrage findet beispielsweise Protokollmeldungen, die einen Fehlercode wie „ <code translate="no">E1001</code> “ enthalten:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_events&quot;</span>)
<span class="highlighted-wrapper-line">        .filter(<span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>)</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

res, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;log_events&quot;</span>).
<span class="highlighted-wrapper-line">    WithFilter(<span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>);

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span> });

  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;log_events&#x27;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-string">&#x27;severity&#x27;</span>],
  });
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
}

<span class="hljs-title function_">main</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
  process.<span class="hljs-property">exitCode</span> = <span class="hljs-number">1</span>;
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_events&quot;,
    &quot;filter&quot;: &quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;,
    &quot;outputFields&quot;: [&quot;message&quot;, &quot;severity&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die Beispiele auf dieser Seite konzentrieren sich auf den Ausdruck, der dem Parameter „ <code translate="no">filter</code> “ zugewiesen ist. Sie können dieselbe Syntax für Filterausdrücke in Milvus-Operationen verwenden, die einen skalaren Filter akzeptieren, wie z. B. „ <code translate="no">query</code> “, „ <code translate="no">search</code> “ und die hybride Suche.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Unterstützte Feldtypen<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Mustererkennung ist für Zeichenfolgenwerte verfügbar.</p>
<table>
<thead>
<tr><th>Ziel</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> Feld</td><td>Ja</td><td>Ja</td><td>Typisches Ziel für den Musterabgleich bei Zeichenfolgenfeldern.</td></tr>
<tr><td><code translate="no">JSON</code> Pfad mit Typumwandlung „ <code translate="no">VARCHAR</code> “</td><td>Ja</td><td>Ja</td><td>Der JSON-Pfadwert muss eine Zeichenkette sein, damit eine Übereinstimmung erzielt wird. Wenn Sie zur Beschleunigung einen Index auf dem JSON-Pfad erstellen, setzen Sie „ <code translate="no">json_cast_type=&quot;varchar&quot;</code> “.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> element</td><td>Ja</td><td>Ja</td><td>Sucht nach einem bestimmten Element anhand des Index, z. B. „ <code translate="no">tags[0]</code> “. Beim Musterabgleich werden <strong>nicht</strong> alle Elemente durchsucht; er gilt nur für das Element am angegebenen Index.</td></tr>
<tr><td>Numerische, boolesche, Vektor-, „ <code translate="no">TEXT</code> “- oder andere Nicht-<code translate="no">VARCHAR</code> -Ziele</td><td>Nein</td><td>Nein</td><td>Der Musterabgleich ist nur für „ <code translate="no">VARCHAR</code> “-Werte, JSON-Pfade, die zu Zeichenketten aufgelöst werden, oder indizierte „ <code translate="no">ARRAY&lt;VARCHAR&gt;</code> “-Elemente verfügbar.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Wählen Sie „LIKE“ oder „regex“<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie den einfachsten Operator, der das gewünschte Muster ausdrückt.</p>
<p>Wenn Sie eine exakte Zeichenfolgenübereinstimmung benötigen, empfehlen wir Ihnen, „ <code translate="no">==</code> “ anstelle des Musterabgleichs zu verwenden. Verwenden Sie „ <code translate="no">LIKE</code> “ oder „regex“ nur, wenn der Filter einem Muster entsprechen muss.</p>
<table>
<thead>
<tr><th>Anforderung</th><th>Empfohlener Operator</th><th>Beispiel</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>Exakte Übereinstimmung der Zeichenfolge</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Exakte Übereinstimmung der Zeichenfolge „ <code translate="no">active</code> “.</td></tr>
<tr><td>Einfache Präfixübereinstimmung</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Findet Zeichenfolgen, die mit „ <code translate="no">Prod</code> “ beginnen.</td></tr>
<tr><td>Einfache Suffixübereinstimmung</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Findet Zeichenfolgen, die mit „ <code translate="no">.json</code> “ enden.</td></tr>
<tr><td>Einfacher „Enthält“-Abgleich</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Erkennt Werte, die an beliebiger Stelle im String „ <code translate="no">vector database</code> “ enthalten.</td></tr>
<tr><td>Suche nach einem strukturierten Code oder einem Muster fester Länge</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Erkennt Zeichenfolgen, die – unter Berücksichtigung der Groß-/Kleinschreibung – „ <code translate="no">E</code> “ gefolgt von vier Ziffern enthalten, z. B. „ <code translate="no">E1001</code> “.</td></tr>
<tr><td>Musterabgleich ohne Berücksichtigung der Groß-/Kleinschreibung</td><td><code translate="no">=~</code> mit <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Erkennt „ <code translate="no">error</code> “, „ <code translate="no">ERROR</code> “ oder andere Varianten mit unterschiedlicher Groß-/Kleinschreibung.</td></tr>
<tr><td>Werte ausschließen, die einem Regex-Muster entsprechen</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Schließt Zeichenfolgen aus, die mit „ <code translate="no">DEBUG</code> “ beginnen.</td></tr>
</tbody>
</table>
<p>Verwenden Sie „ <code translate="no">LIKE</code> “ für den einfachen Platzhalterabgleich. Verwenden Sie reguläre Ausdrücke, wenn das Muster Zeichenklassen, Wiederholungen, Alternativen wie „ <code translate="no">error|failed</code> “, Anker oder einen Abgleich ohne Berücksichtigung der Groß-/Kleinschreibung erfordert.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Verwenden Sie „LIKE“<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator „ <code translate="no">LIKE</code> “ dient zum einfachen Abgleich mit Platzhaltern bei Zeichenfolgenwerten. Er unterstützt nur die folgenden Platzhalter:</p>
<table>
<thead>
<tr><th>Platzhalter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Übereinstimmung mit null oder mehr Zeichen.</td></tr>
<tr><td><code translate="no">_</code></td><td>Entspricht genau einem Zeichen.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Gängige LIKE-Muster<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie die Position von „ <code translate="no">%</code> “ und „ <code translate="no">_</code> “, um zu steuern, an welcher Stelle der feste Text in der übereinstimmenden Zeichenfolge erscheint.</p>
<table>
<thead>
<tr><th>Anforderung</th><th>Muster</th><th>Filterbeispiel</th></tr>
</thead>
<tbody>
<tr><td>Beginnt mit einem Präfix</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Endet mit einem Suffix</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Enthält eine Teilzeichenfolge</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Stimmt mit einem Zeichen an einer festen Position überein</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">LIKE-Übereinstimmungsverhalten<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">LIKE</code> “ für Präfix-, Suffix-, „enthält“- und Einzelzeichen-Übereinstimmungen an einer festen Position. „ <code translate="no">LIKE</code> “ unterstützt keine Zeichenklassen wie „ <code translate="no">[0-9]</code> “, keine Alternativen wie „ <code translate="no">error|failed</code> “, keine Wiederholungsanzahlen wie „ <code translate="no">{4}</code> “, keine Anker wie „ <code translate="no">^</code> “ oder „ <code translate="no">$</code> “ und keine Flags für die Groß-/Kleinschreibung wie „ <code translate="no">(?i)</code> “. Verwenden Sie für diese Muster reguläre Ausdrücke.</p>
<p>Verwenden Sie „ <code translate="no">==</code> “ für die exakte Übereinstimmung des gesamten Strings. Verwenden Sie „ <code translate="no">LIKE</code> “ nur, wenn der Filter eine Übereinstimmung mit Platzhaltern erfordert.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">Escapen von Platzhaltern in einem LIKE-Muster<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>In „ <code translate="no">LIKE</code> “-Mustern entspricht „ <code translate="no">%</code> “ null oder mehr Zeichen und „ <code translate="no">_</code> “ genau einem Zeichen. Um „ <code translate="no">%</code> “, „ <code translate="no">_</code> “ oder „ <code translate="no">\</code> “ wörtlich abzugleichen, müssen Sie das Zeichen mit einem Backslash (<code translate="no">\</code>) escapen:</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> entspricht dem literalen Wert „ <code translate="no">%</code> “.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> passt auf Werte, die mit dem Literal „ <code translate="no">_</code> “ beginnen.</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> passt auf Werte, die mit einem literalen Backslash beginnen.</li>
</ul>
<p>Raw-String-Literale, geschrieben als <code translate="no">r&quot;...&quot;</code> oder <code translate="no">r'...'</code>, behalten Backslashes in Milvus-Filterausdrücken unverändert bei. Sie werden für „ <code translate="no">LIKE</code> “ und Regex-Muster empfohlen, die Backslashes enthalten. Ohne einen Raw-String verarbeiten gewöhnliche String-Literale weiterhin Escape-Sequenzen, bevor das Muster ausgewertet wird, sodass möglicherweise mehr Backslashes erforderlich sind.</p>
<h2 id="Use-regex" class="common-anchor-header">Verwenden Sie Regex<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie Regex-Filter, wenn das Muster Funktionen regulärer Ausdrücke wie Zeichenklassen, Wiederholungen, Alternativen, Anker oder groß-/kleinschreibungsunabhängigen Abgleich erfordert. Milvus wendet einen <a href="https://github.com/google/re2/wiki/syntax">RE2-regulären</a> Ausdruck auf einen Zeichenfolgenwert an.</p>
<p>Die rechte Seite von „ <code translate="no">=~</code> “ oder „ <code translate="no">!~</code> “ muss ein String-Literal sein.</p>
<table>
<thead>
<tr><th>Operator</th><th>Bedeutung</th><th>Beispiel</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Findet Werte, die dem Regex-Muster entsprechen.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Schließt Werte aus, die dem Regex-Muster entsprechen.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">Verwenden Sie Raw-String-Literale<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>Raw-String-Literale werden für reguläre Ausdrücke empfohlen, die Backslashes enthalten. In einem Raw-String, der als <code translate="no">r&quot;...&quot;</code> oder <code translate="no">r'...'</code> geschrieben wird, werden Backslashes unverändert an die Regex-Engine übergeben. Dadurch entfällt die zusätzliche Escape-Verarbeitung, die bei gewöhnlichen String-Literalen erforderlich ist.</p>
<p>Beispiel:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">r&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;filename =~ r\&quot;\\.json$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`filename =~ r&quot;\.json$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;filename =~ r&quot;\\.json$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dies passt auf Zeichenfolgen, die mit „ <code translate="no">.json</code> “ enden, wie beispielsweise „ <code translate="no">report.json</code> “.</p>
<p>Ohne eine „Raw“-Zeichenkette im Milvus-Filterausdruck werden bei gewöhnlichen String-Literalen Escape-Sequenzen verarbeitet, bevor das Regex-Muster ausgewertet wird. Für escaped Literalzeichen sind daher möglicherweise zusätzliche Backslashes in der Zeichenkette der Host-Sprache erforderlich.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">Gängige reguläre Ausdrücke<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgenden Beispiele verwenden gängige RE2-Syntax in Milvus-Filterausdrücken. Die vollständige Syntax für reguläre Ausdrücke finden Sie in der <a href="https://github.com/google/re2/wiki/syntax">RE2-Syntaxreferenz</a>.</p>
<table>
<thead>
<tr><th>Anforderung</th><th>Muster</th><th>Filterbeispiel</th></tr>
</thead>
<tbody>
<tr><td>Enthält wörtlichen Text</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Beginnt mit einem Präfix</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Endet mit einem Suffix</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Stimmt mit einer Ziffernfolge überein</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Stimmt mit einer festen Anzahl von Ziffern überein</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Stimmt mit einer E-Mail-Domain überein</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Übereinstimmung unabhängig von Groß- und Kleinschreibung</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Stimmt mit der gesamten Zeichenfolge überein</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Um eines von mehreren Wörtern zu finden, verwenden Sie die Alternative mit „ <code translate="no">|</code> “:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;error|failed|timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;error|failed|timeout&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie Regex-Metazeichen wörtlich abgleichen möchten, müssen Sie diese im Regex-Muster mit einem Escape-Zeichen versehen. Um beispielsweise einen wörtlichen Punkt (<code translate="no">\.</code> in Regex) abzugleichen, schreiben Sie „ <code translate="no">\\.</code> “ in eine Python-, Java-, Go- oder Node.js-Quellzeichenfolge:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;email =~ \&quot;@gmail\\.com$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`email =~ &quot;@gmail\\.com$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Hinweis: Milvus-Regex-Filter folgen der RE2-Syntax. Wenn ein Regex-Muster eine Syntax verwendet, die von RE2 nicht unterstützt wird, oder anderweitig ungültig ist, lehnt Milvus den Filterausdruck ab. Weitere Informationen zu Regex-Metazeichen, Flags und dem Abgleichverhalten finden Sie in der <a href="https://github.com/google/re2/wiki/syntax">RE2-Syntaxreferenz</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Übereinstimmungsverhalten<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Teilzeichenfolgenabgleich</strong></p>
<p>Der Regex-Abgleich in Milvus verwendet die Semantik von Teilzeichenfolgen. Das Muster muss nicht mit dem gesamten Feldwert übereinstimmen. Der folgende Filter passt beispielsweise sowohl auf „ <code translate="no">E1001</code> “ als auch auf „ <code translate="no">failed with E1001 after retry</code> “:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um den gesamten Feldwert abzugleichen, verwenden Sie die Anker „ <code translate="no">^</code> “ und „ <code translate="no">$</code> “:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;code =~ \&quot;^E[0-9]{4}$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
filter := <span class="hljs-string">`code =~ &quot;^E[0-9]{4}$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
filter=<span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Nullfähige VARCHAR-Felder</strong></p>
<p>Regex-Filter finden keine Übereinstimmung mit Nullwerten. Dies gilt sowohl für „ <code translate="no">=~</code> “ als auch für „ <code translate="no">!~</code> “. Wenn Sie ein Regex-Muster ausschließen, aber Nullwerte beibehalten möchten, fügen Sie explizit „ <code translate="no">OR field IS NULL</code> “ hinzu:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot; OR message IS NULL&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message !~ &quot;^DEBUG&quot; OR message IS NULL`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON-Pfade</strong></p>
<p>Bei JSON-Pfaden verhalten sich Regex-Filter anders, wenn der Pfad fehlt, den Wert „null“ hat oder zu einem Wert führt, der kein String ist:</p>
<table>
<thead>
<tr><th>Filter</th><th>Bezieht fehlende/Null-/Nicht-String-Werte ein?</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Nein</td><td>Erkennt nur Zeichenfolgenwerte, die dem Regex-Muster entsprechen.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Ja</td><td>Gibt Entitäten zurück, bei denen der Pfad fehlt, null ist, kein String ist oder ein String ist, der nicht dem Regex-Muster entspricht.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Beschleunigung des Musterabgleichs mit Indizes<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt mehrere Indextypen für Zeichenfolgenfelder, die zusammen mit „ <code translate="no">LIKE</code> “ und Regex-Filtern für „ <code translate="no">VARCHAR</code> “-Felder oder JSON-Zeichenfolgenpfade verwendet werden können, z. B. „ <code translate="no">NGRAM</code> “, „ <code translate="no">STL_SORT</code> “, „ <code translate="no">INVERTED</code> “ und „ <code translate="no">BITMAP</code> “. Der Musterabgleich funktioniert zwar auch ohne Index, doch ein Index kann die Leistung bei großen Datensätzen verbessern.</p>
<p>Die Wirksamkeit des Indexes hängt vom Musterausdruck ab, davon, ob Milvus feste literale Teilzeichenfolgen extrahieren kann, sowie von der Kardinalität und der Verteilung des Zielfeldes. Präfixmuster wie <code translate="no">name LIKE &quot;Prod%&quot;</code> profitieren möglicherweise von anderen Indexstrategien als Infix- oder Suffixmuster wie <code translate="no">description LIKE &quot;%vector%&quot;</code> oder <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Verwenden Sie die folgende Tabelle als Ausgangspunkt und führen Sie anschließend einen Benchmark mit Ihrer eigenen Arbeitslast durch:</p>
<table>
<thead>
<tr><th>Muster oder Datenmerkmal</th><th>Zu berücksichtigender Index</th><th>Anmerkungen</th></tr>
</thead>
<tbody>
<tr><td>Enthält feste Literal-Teilstrings, wie z. B. <code translate="no">message =~ &quot;error.*timeout&quot;</code> oder <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Hilfreich, wenn Milvus aussagekräftige Literal-Teilstrings aus dem Muster extrahieren kann. Weitere Informationen finden Sie unter <a href="/docs/de/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Präfix-, exakte oder gleichheitsähnliche Zeichenfolgenfilter, insbesondere bei Feldern mit geringer bis mittlerer Kardinalität</td><td><code translate="no">STL_SORT</code>, „ <code translate="no">INVERTED</code> “ oder <code translate="no">BITMAP</code></td><td>Können effektiver sein, wenn das Feld wiederholte Werte enthält oder wenn der Filter nahe an einer exakten Übereinstimmung liegt. Weitere Informationen finden Sie unter <a href="/docs/de/stl-sort.md">STL_SORT</a>, <a href="/docs/de/inverted.md">INVERTED</a> und <a href="/docs/de/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Regex-Muster ohne feste Literale oder Muster, die von Zeichenklassen, kurzen Tokens oder Platzhaltern dominiert werden</td><td>Führen Sie einen Benchmark durch, bevor Sie sich auf die Indexbeschleunigung verlassen</td><td>Diese Muster bieten möglicherweise nur eine begrenzte Indexselektivität und können auf umfassendere Scans zurückgreifen.</td></tr>
</tbody>
</table>
