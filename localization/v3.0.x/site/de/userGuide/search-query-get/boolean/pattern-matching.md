---
id: pattern-matching.md
title: Musterabgleich
summary: >-
  Milvus unterstützt den Abgleich von Zeichenkettenmustern mit
  LIKE-Wildcard-Mustern und regulären RE2-Ausdrücken. Verwenden Sie
  Musterfilter, um Präfixe, Suffixe, Teilzeichenfolgen, strukturierte Codes,
  E-Mail-Domänen, URL-Pfade und andere Zeichenfolgenmuster in VARCHAR-Feldern,
  JSON-Zeichenfolgen oder ARRAY-Elementen abzugleichen.
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
    </button></h1><p>In agentenbasierten Suchanwendungen ergänzen sich die Vektorsuche und der Grep-Musterabgleich oft gegenseitig. Die Vektorsuche findet Entitäten, die semantisch relevant sind, während der Musterabgleich diese Ergebnisse durch exakte Zeichenkettenstrukturen einschränkt, z. B. Fehlercodes, Protokollpräfixe, E-Mail-Domänen, URL-Pfade oder Bezeichner.</p>
<p>In Milvus können Sie diese Mustereinschränkungen in skalaren Filtern mit <code translate="no">LIKE</code> für einfachen Platzhalterabgleich und <code translate="no">=~</code> oder <code translate="no">!~</code> für reguläre <a href="https://github.com/google/re2/wiki/syntax">RE2-Ausdrücke</a> ausdrücken. Sie können diese Filter mit <code translate="no">query</code>, <code translate="no">search</code> oder einer hybriden Suche kombinieren.</p>
<p>Ausdrücke für den Mustervergleich werden in den Parameter <code translate="no">filter</code> geschrieben. Die folgende Abfrage sucht zum Beispiel nach Protokollmeldungen, die einen Fehlercode wie <code translate="no">E1001</code> enthalten:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Die Beispiele auf dieser Seite konzentrieren sich auf den Ausdruck, der <code translate="no">filter</code> zugewiesen ist. Sie können dieselbe Syntax für Filterausdrücke in Milvus-Vorgängen verwenden, die einen skalaren Filter akzeptieren, wie <code translate="no">query</code>, <code translate="no">search</code> und die hybride Suche.</p>
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
    </button></h2><p>Der Mustervergleich ist für String-Werte verfügbar.</p>
<table>
<thead>
<tr><th>Ziel</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> Feld</td><td>Ja</td><td>Ja</td><td>Typisches Ziel für den Mustervergleich bei Zeichenkettenfeldern.</td></tr>
<tr><td><code translate="no">JSON</code> Pfad mit <code translate="no">VARCHAR</code> cast type</td><td>Ja</td><td>Ja</td><td>Der JSON-Pfadwert muss bei positiven Übereinstimmungen eine Zeichenkette sein. Wenn Sie einen Index für den JSON-Pfad zur Beschleunigung erstellen, setzen Sie <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> Element</td><td>Ja</td><td>Ja</td><td>Ein bestimmtes Element nach Index abgleichen, z. B. <code translate="no">tags[0]</code>. Beim Mustervergleich werden <strong>nicht</strong> alle Elemente gescannt, sondern nur das Element mit dem angegebenen Index.</td></tr>
<tr><td>Numerische, boolesche, Vektor-, <code translate="no">TEXT</code> oder andere nicht<code translate="no">VARCHAR</code> Ziele</td><td>Nein</td><td>Nein</td><td>Der Musterabgleich ist nur für <code translate="no">VARCHAR</code> Werte, JSON-Pfade, die in Strings aufgelöst werden, oder indizierte <code translate="no">ARRAY&lt;VARCHAR&gt;</code> Elemente verfügbar.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Wählen Sie LIKE oder regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie den einfachsten Operator, der das von Ihnen benötigte Muster ausdrückt.</p>
<p>Wenn Sie eine exakte Zeichenkettenübereinstimmung benötigen, empfehlen wir Ihnen, <code translate="no">==</code> anstelle des Musterabgleichs zu verwenden. Verwenden Sie <code translate="no">LIKE</code> oder regex nur, wenn der Filter mit einem Muster übereinstimmen muss.</p>
<table>
<thead>
<tr><th>Anforderung</th><th>Empfohlener Operator</th><th>Beispiel</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>Exakte Zeichenfolgengleichheit</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Exakte Übereinstimmung der Zeichenfolge <code translate="no">active</code>.</td></tr>
<tr><td>Einfache Präfix-Übereinstimmung</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Passt auf Zeichenfolgen, die mit <code translate="no">Prod</code> beginnen.</td></tr>
<tr><td>Einfache Suffix-Übereinstimmung</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Entspricht Zeichenketten, die mit <code translate="no">.json</code> enden.</td></tr>
<tr><td>Einfache Inhaltsübereinstimmung</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Passt auf Werte, die <code translate="no">vector database</code> an beliebiger Stelle in der Zeichenfolge enthalten.</td></tr>
<tr><td>Übereinstimmung mit einem strukturierten Code oder einem Muster fester Länge</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Passt auf Zeichenfolgen, die unter Berücksichtigung der Groß- und Kleinschreibung <code translate="no">E</code> gefolgt von vier Ziffern enthalten, wie z. B. <code translate="no">E1001</code>.</td></tr>
<tr><td>Musterabgleich ohne Berücksichtigung der Groß-/Kleinschreibung</td><td><code translate="no">=~</code> mit <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Passt auf <code translate="no">error</code>, <code translate="no">ERROR</code> oder andere Varianten der Groß- und Kleinschreibung.</td></tr>
<tr><td>Werte ausschließen, die einem Regex-Muster entsprechen</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Schließt Zeichenketten aus, die mit <code translate="no">DEBUG</code> beginnen.</td></tr>
</tbody>
</table>
<p>Verwenden Sie <code translate="no">LIKE</code> für einfachen Platzhalterabgleich. Verwenden Sie regex, wenn das Muster Zeichenklassen, Wiederholungen, Abwechslung wie <code translate="no">error|failed</code>, Anker oder einen Abgleich ohne Berücksichtigung der Groß-/Kleinschreibung benötigt.</p>
<h2 id="Use-LIKE" class="common-anchor-header">LIKE verwenden<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">LIKE</code> ist für den einfachen Platzhalterabgleich mit Zeichenkettenwerten gedacht. Er unterstützt nur die folgenden Wildcards:</p>
<table>
<thead>
<tr><th>Platzhalter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Passt auf null oder mehr Zeichen.</td></tr>
<tr><td><code translate="no">_</code></td><td>Passt auf genau ein Zeichen.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Übliche LIKE-Muster<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie die Position von <code translate="no">%</code> und <code translate="no">_</code>, um zu steuern, wo der feste Text in der übereinstimmenden Zeichenfolge erscheint.</p>
<table>
<thead>
<tr><th>Bedingung</th><th>Muster</th><th>Filter-Beispiel</th></tr>
</thead>
<tbody>
<tr><td>Beginnt mit einem Präfix</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Endet mit einem Suffix</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Enthält eine Teilzeichenkette</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Entspricht einem Zeichen an einer festen Position</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">LIKE-Abgleichsverhalten<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie <code translate="no">LIKE</code> für Präfix-, Suffix-, Contains- und Fixed-Position-Einzelzeichenübereinstimmungen. <code translate="no">LIKE</code> unterstützt keine Zeichenklassen wie <code translate="no">[0-9]</code>, Alternation wie <code translate="no">error|failed</code>, Wiederholungszahlen wie <code translate="no">{4}</code>, Anker wie <code translate="no">^</code> oder <code translate="no">$</code> oder Groß-/Kleinschreibung nicht berücksichtigende Flags wie <code translate="no">(?i)</code>. Verwenden Sie regex für diese Muster.</p>
<p>Verwenden Sie <code translate="no">==</code> für die exakte Gleichheit ganzer Zeichenfolgen. Verwenden Sie <code translate="no">LIKE</code> nur, wenn der Filter einen Platzhalter benötigt.</p>
<h2 id="Use-regex" class="common-anchor-header">regex verwenden<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie regex-Filter, wenn das Muster reguläre Ausdrucksmerkmale wie Zeichenklassen, Wiederholung, Alternation, Anker oder Groß- und Kleinschreibung nicht berücksichtigt. Milvus wendet einen regulären Ausdruck <a href="https://github.com/google/re2/wiki/syntax">RE2</a> auf einen Zeichenfolgenwert an.</p>
<p>Die rechte Seite von <code translate="no">=~</code> oder <code translate="no">!~</code> muss ein String-Literal sein.</p>
<table>
<thead>
<tr><th>Operator</th><th>Bedeutung</th><th>Beispiel</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Passt auf Werte, die das Regex-Muster erfüllen.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Schließt Werte aus, die das Regex-Muster erfüllen.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Übliche Regex-Muster<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgenden Beispiele verwenden die übliche RE2-Syntax in Milvus-Filterausdrücken. Die vollständige Regex-Syntax finden Sie in der <a href="https://github.com/google/re2/wiki/syntax">RE2-Syntaxreferenz</a>.</p>
<table>
<thead>
<tr><th>Bedingung</th><th>Muster</th><th>Filter-Beispiel</th></tr>
</thead>
<tbody>
<tr><td>Enthält wörtlichen Text</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Beginnt mit einem Präfix</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Endet mit einem Suffix</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Entspricht einer Ziffernfolge</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Entspricht einer festen Anzahl von Ziffern</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Passt zu einer E-Mail-Domäne</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Groß- und Kleinschreibung wird nicht beachtet</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Passt auf die gesamte Zeichenfolge</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Um eines von mehreren Wörtern abzugleichen, verwenden Sie die Abwechslung mit <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie Regex-Metacharaktere wörtlich abgleichen, müssen Sie sie im Regex-Muster ausschließen. Um zum Beispiel einen wörtlichen Punkt (<code translate="no">\.</code> in regex) zu finden, schreiben Sie <code translate="no">\\.</code> in eine Python-Filterzeichenfolge:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Hinweis: Milvus Regex-Filter folgen der RE2-Syntax. Wenn ein Regex-Muster eine Syntax verwendet, die RE2 nicht unterstützt oder anderweitig ungültig ist, weist Milvus den Filterausdruck zurück. Einzelheiten zu den Regex-Metazeichen, Flags und dem Abgleichverhalten finden Sie in der <a href="https://github.com/google/re2/wiki/syntax">RE2-Syntaxreferenz</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Abgleichsverhalten<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Teilstring-Abgleich</strong></p>
<p>Der Milvus-Regex-Abgleich verwendet die Semantik von Teilstrings. Das Muster muss nicht mit dem gesamten Feldwert übereinstimmen. Der folgende Filter passt zum Beispiel sowohl auf <code translate="no">E1001</code> als auch auf <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um den gesamten Feldwert abzugleichen, verwenden Sie die Anker <code translate="no">^</code> und <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Nullbare VARCHAR-Felder</strong></p>
<p>Regex-Filter passen nicht auf Nullwerte. Dies gilt sowohl für <code translate="no">=~</code> als auch für <code translate="no">!~</code>. Wenn Sie ein Regex-Muster ausschließen, aber Nullwerte beibehalten wollen, fügen Sie explizit <code translate="no">OR field IS NULL</code> hinzu:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON-Pfade</strong></p>
<p>Bei JSON-Pfaden verhalten sich Regex-Filter anders, wenn der Pfad fehlt, ungültig ist oder in einen Nicht-String-Wert aufgelöst wird:</p>
<table>
<thead>
<tr><th>Filter</th><th>Schließt fehlende/null/nicht-string Werte ein?</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Nein</td><td>Passt nur auf String-Werte, die das Regex-Muster erfüllen.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Ja</td><td>Gibt Entitäten zurück, bei denen der Pfad fehlt, ungültig ist, keine Zeichenfolge enthält oder eine Zeichenfolge ist, die nicht mit dem Regex-Muster übereinstimmt.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Beschleunigen Sie den Musterabgleich mit Indizes<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt mehrere Index-Typen für String-Felder, die zusammen mit <code translate="no">LIKE</code> und Regex-Filtern für <code translate="no">VARCHAR</code> -Felder oder JSON-String-Pfade verwendet werden können, z. B. <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> und <code translate="no">BITMAP</code>. Der Musterabgleich kann ohne Index funktionieren, aber ein Index kann die Leistung bei großen Datensätzen verbessern.</p>
<p>Die Effektivität des Indexes hängt vom Musterausdruck, davon, ob Milvus feste literalische Teilstrings extrahieren kann, und von der Kardinalität und Verteilung des Zielfeldes ab. Präfixartige Muster wie <code translate="no">name LIKE &quot;Prod%&quot;</code> können von anderen Indexstrategien profitieren als Infix- oder Suffix-Muster wie <code translate="no">description LIKE &quot;%vector%&quot;</code> oder <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Verwenden Sie die folgende Tabelle als Ausgangspunkt und führen Sie dann einen Benchmark mit Ihrer eigenen Arbeitslast durch:</p>
<table>
<thead>
<tr><th>Muster oder Datenmerkmal</th><th>Zu berücksichtigender Index</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td>Enthält feste literale Teilzeichenfolgen, wie <code translate="no">message =~ &quot;error.*timeout&quot;</code> oder <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Hilft, wenn Milvus sinnvolle literale Teilzeichenfolgen aus dem Muster extrahieren kann. Einzelheiten finden Sie unter <a href="/docs/de/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Präfix-, exakte oder gleichheitsähnliche Zeichenfolgenfilter, insbesondere bei Feldern mit geringer bis mittlerer Kardinalität</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, oder <code translate="no">BITMAP</code></td><td>Kann effektiver sein, wenn das Feld wiederholte Werte hat oder wenn der Filter nahe an der exakten Übereinstimmung ist. Einzelheiten finden Sie unter <a href="/docs/de/stl-sort.md">STL_SORT</a>, <a href="/docs/de/inverted.md">INVERTED</a> und <a href="/docs/de/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Regex-Muster ohne feste Literale oder Muster, die von Zeichenklassen, kurzen Token oder Wildcards dominiert werden</td><td>Führen Sie einen Benchmark durch, bevor Sie sich auf die Indexbeschleunigung verlassen.</td><td>Diese Muster bieten möglicherweise eine begrenzte Indexselektivität und können auf breitere Scans zurückgreifen.</td></tr>
</tbody>
</table>
