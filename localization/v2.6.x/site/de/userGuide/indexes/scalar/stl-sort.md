---
id: stl-sort.md
title: STL_SORT
summary: >-
  Der STL_SORT-Index ist ein Indextyp, der speziell entwickelt wurde, um die
  Abfrageleistung für numerische Felder (INT8, INT16 usw.), VARCHAR-Felder oder
  TIMESTAMPTZ-Felder innerhalb von Milvus zu verbessern, indem die Daten in
  einer sortierten Reihenfolge organisiert werden.
---
<h1 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <code translate="no">STL_SORT</code> Index ist ein Indextyp, der speziell dafür entwickelt wurde, die Abfrageleistung für numerische Felder (INT8, INT16, etc.), <code translate="no">VARCHAR</code> Felder oder <code translate="no">TIMESTAMPTZ</code> Felder innerhalb von Milvus zu verbessern, indem die Daten in einer sortierten Reihenfolge organisiert werden.</p>
<p>Verwenden Sie den <code translate="no">STL_SORT</code> Index, wenn Sie häufig Abfragen mit:</p>
<ul>
<li><p>Vergleichsfilterung mit den Operatoren <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, und <code translate="no">&lt;=</code> </p></li>
<li><p>Bereichsfilterung mit den Operatoren <code translate="no">IN</code> und <code translate="no">LIKE</code> </p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Unterstützte Datentypen<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><p>Numerische Felder (z. B. <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>). Einzelheiten finden Sie unter <a href="/docs/de/number.md">Boolesche &amp; Zahlen</a>.</p></li>
<li><p><code translate="no">VARCHAR</code> Felder. Weitere Informationen finden Sie unter <a href="/docs/de/string.md">String-Feld</a>.</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> Felder. Weitere Informationen finden Sie unter <a href="/docs/de/timestamptz-field.md">TIMESTAMPTZ-Feld</a>.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Wie es funktioniert<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementiert <code translate="no">STL_SORT</code> in zwei Phasen:</p>
<ol>
<li><p><strong>Index aufbauen</strong></p>
<ul>
<li><p>Während der Aufnahme sammelt Milvus alle Werte für das indizierte Feld.</p></li>
<li><p>Die Werte werden in aufsteigender Reihenfolge mit <a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std::sort</a> der C++ STL sortiert.</p></li>
<li><p>Jeder Wert wird mit seiner Entitäts-ID gepaart, und das sortierte Array wird als Index persistiert.</p></li>
</ul></li>
<li><p><strong>Abfragen bescheunigen</strong></p>
<ul>
<li><p>Zur Abfragezeit verwendet Milvus eine <strong>binäre Suche</strong><a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">(std::lower_bound</a> und <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper_bound</a>) für das sortierte Array.</p></li>
<li><p>Bei Gleichheit findet Milvus schnell alle übereinstimmenden Werte.</p></li>
<li><p>Bei Bereichen findet Milvus die Start- und Endpositionen und gibt alle Werte dazwischen zurück.</p></li>
<li><p>Die übereinstimmenden Entitäts-IDs werden zur endgültigen Zusammenstellung der Ergebnisse an den Abfrageexecutor weitergeleitet.</p></li>
</ul></li>
</ol>
<p>Dies reduziert die Abfragekomplexität von <strong>O(n)</strong> (vollständiger Scan) auf <strong>O(log n + m)</strong>, wobei <em>m</em> die Anzahl der Übereinstimmungen ist.</p>
<h2 id="Create-an-STLSORT-index" class="common-anchor-header">Einen STL_SORT-Index erstellen<button data-href="#Create-an-STLSORT-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können einen <code translate="no">STL_SORT</code> Index für ein numerisches oder <code translate="no">TIMESTAMPTZ</code> Feld erstellen. Es sind keine zusätzlichen Parameter erforderlich.</p>
<p>Das folgende Beispiel zeigt, wie Sie einen <code translate="no">STL_SORT</code> Index für ein <code translate="no">TIMESTAMPTZ</code> Feld erstellen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a TIMESTAMPTZ field named &quot;tsz&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;tsz&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;tsz&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,   <span class="hljs-comment"># Index for TIMESTAMPTZ</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-an-index" class="common-anchor-header">Löschen eines Index<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie die Methode <code translate="no">drop_index()</code>, um einen bestehenden Index aus einer Sammlung zu entfernen.</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
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
<li><p><strong>Feldtypen:</strong> Funktioniert mit numerischen und <code translate="no">TIMESTAMPTZ</code> Feldern. Weitere Informationen zu den Datentypen finden Sie unter <a href="/docs/de/number.md">Boolesche und numerische</a> <a href="/docs/de/timestamptz-field.md">Felder</a> und <a href="/docs/de/timestamptz-field.md">TIMESTAMPTZ-Felder</a>.</p></li>
<li><p><strong>Parameter:</strong> Es werden keine Indexparameter benötigt.</p></li>
<li><p><strong>Mmap nicht unterstützt:</strong> Der Modus "Memory-mapped" ist für <code translate="no">STL_SORT</code> nicht verfügbar.</p></li>
</ul>
