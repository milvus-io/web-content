---
id: array-operators.md
title: ARRAY-Operatoren
summary: >-
  Milvus stellt ARRAY-Operatoren zum Filtern von ARRAY-Feldern und zum
  teilweisen Aktualisieren von ARRAY-Feldwerten bereit.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">ARRAY-Operatoren<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus bietet ARRAY-Operatoren zum Filtern von ARRAY-Feldern und zum teilweisen Aktualisieren von ARRAY-Feldwerten.</p>
<div class="alert note">
<p>Alle Elemente innerhalb eines Arrays müssen denselben Typ haben, und verschachtelte Strukturen innerhalb von Arrays werden als einfache Zeichenfolgen behandelt. Daher ist es bei der Arbeit mit ARRAY-Feldern ratsam, eine zu tiefe Verschachtelung zu vermeiden und sicherzustellen, dass Ihre Datenstrukturen so flach wie möglich sind, um eine optimale Leistung zu erzielen.</p>
</div>
<p>ARRAY-Operatoren in Milvus decken zwei Anwendungsszenarien ab:</p>
<ul>
<li><p>Filterausdrücke für Abfragen und Suchvorgänge.</p></li>
<li><p>Teilaktualisierungen in „ <code translate="no">upsert</code> “-Anfragen.</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">Verfügbare ARRAY-Operatoren<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Tabelle listet die in Milvus verfügbaren ARRAY-Operatoren auf.</p>
<table>
<thead>
<tr><th>Operator</th><th>Verwendung in</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><a href="#ARRAYCONTAINS">ARRAY_CONTAINS(Bezeichner, Ausdruck)</a></td><td>Filterausdruck</td><td>Prüft, ob ein bestimmtes Element in einem ARRAY-Feld vorhanden ist.</td></tr>
<tr><td><a href="#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(Bezeichner, Ausdruck)</a></td><td>Filterausdruck</td><td>Prüft, ob alle Elemente einer angegebenen Liste in einem ARRAY-Feld vorhanden sind.</td></tr>
<tr><td><a href="#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(Bezeichner, Ausdruck)</a></td><td>Filterausdruck</td><td>Prüft, ob mindestens ein Element einer angegebenen Liste in einem ARRAY-Feld vorhanden ist.</td></tr>
<tr><td><a href="#ARRAYLENGTH">ARRAY_LENGTH(Bezeichner)</a></td><td>Filterausdruck</td><td>Gibt die Anzahl der Elemente in einem ARRAY-Feld zurück und kann zur Filterung mit Vergleichsoperatoren kombiniert werden.</td></tr>
<tr><td><a href="#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> mit <code translate="no">field_ops</code></td><td>Fügt Payload-Elemente an ein bestehendes ARRAY-Feld an. Verfügbar ab Milvus v2.6.17.</td></tr>
<tr><td><a href="#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> mit <code translate="no">field_ops</code></td><td>Entfernt alle Elemente aus einem bestehenden ARRAY-Feld, die mit einem Wert in der Anfrage-Nutzlast übereinstimmen. Verfügbar ab Milvus v2.6.17.</td></tr>
</tbody>
</table>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_CONTAINS</code> “ prüft, ob ein bestimmtes Element in einem Array-Feld vorhanden ist. Dies ist nützlich, wenn Sie Entitäten finden möchten, bei denen ein bestimmtes Element im Array vorhanden ist.</p>
<p><strong>Beispiel</strong></p>
<p>Angenommen, Sie haben ein Array-Feld „ <code translate="no">history_temperatures</code> “, das die aufgezeichneten Tiefsttemperaturen für verschiedene Jahre enthält. Um alle Entitäten zu finden, bei denen das Array den Wert „ <code translate="no">23</code> “ enthält, können Sie den folgenden Filterausdruck verwenden:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch werden alle Entitäten zurückgegeben, bei denen das Array „ <code translate="no">history_temperatures</code> “ den Wert „ <code translate="no">23</code> “ enthält.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_CONTAINS_ALL</code> “ stellt sicher, dass alle Elemente der angegebenen Liste im Array-Feld vorhanden sind. Dieser Operator ist nützlich, wenn Sie Entitäten finden möchten, die mehrere Werte im Array enthalten.</p>
<p><strong>Beispiel</strong></p>
<p>Wenn Sie alle Entitäten finden möchten, bei denen das Array „ <code translate="no">history_temperatures</code> “ sowohl „ <code translate="no">23</code> “ als auch „ <code translate="no">24</code> “ enthält, können Sie Folgendes verwenden:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS_ALL filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch werden alle Entitäten zurückgegeben, bei denen das Array „ <code translate="no">history_temperatures</code> “ beide angegebenen Werte enthält.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_CONTAINS_ANY</code> “ prüft, ob eines der Elemente aus der angegebenen Liste im Array-Feld vorhanden ist. Dies ist nützlich, wenn Sie Entitäten finden möchten, die mindestens einen der angegebenen Werte im Array enthalten.</p>
<p><strong>Beispiel</strong></p>
<p>Um alle Entitäten zu finden, bei denen das Array „ <code translate="no">history_temperatures</code> “ entweder „ <code translate="no">23</code> “ oder „ <code translate="no">24</code> “ enthält, können Sie Folgendes verwenden:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS_ANY filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch werden alle Entitäten zurückgegeben, bei denen das Array „ <code translate="no">history_temperatures</code> “ mindestens einen der Werte „ <code translate="no">23</code> “ oder „ <code translate="no">24</code> “ enthält.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Funktion „ <code translate="no">ARRAY_LENGTH</code> “ gibt die Länge (Anzahl der Elemente) eines Array-Feldes zurück. Sie akzeptiert genau einen Parameter: die Kennung des Array-Feldes.</p>
<p><strong>Beispiel</strong></p>
<p>So finden Sie alle Entitäten, bei denen das Array „ <code translate="no">history_temperatures</code> “ weniger als 10 Elemente enthält:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_LENGTH filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch werden alle Entitäten zurückgegeben, bei denen das Array „ <code translate="no">history_temperatures</code> “ weniger als 10 Elemente enthält.</p>
<h2 id="ARRAYAPPEND" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_APPEND</code> “ fügt bei einer „ <code translate="no">upsert</code> “-Anfrage Payload-Elemente an ein bestehendes ARRAY-Feld an. Es handelt sich dabei nicht um einen Filterausdruck. Verwenden Sie ihn, wenn Sie Werte zu einem Array hinzufügen möchten, ohne zuvor den aktuellen Array-Wert abzufragen.</p>
<p>Im folgenden Beispiel wird „ <code translate="no">&quot;premium&quot;</code> “ an das ARRAY-Feld der Entität angehängt, deren Primärschlüssel „ <code translate="no">1</code> “ lautet, und zwar im Rahmen einer „ <code translate="no">tags</code> “-Anfrage:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>);
<span class="hljs-type">JsonArray</span> <span class="hljs-variable">tags</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
tags.add(<span class="hljs-string">&quot;premium&quot;</span>);
row.add(<span class="hljs-string">&quot;tags&quot;</span>, tags);

List&lt;UpsertReq.FieldPartialUpdateOp&gt; fieldOps = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
fieldOps.add(UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build());

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .data(Collections.singletonList(row))
        .fieldOps(fieldOps)
        .build();

client.upsert(upsertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;users&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithColumns(column.NewColumnVarCharArray(<span class="hljs-string">&quot;tags&quot;</span>, [][]<span class="hljs-type">string</span>{{<span class="hljs-string">&quot;premium&quot;</span>}})).
    WithArrayAppend(<span class="hljs-string">&quot;tags&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">upsert</span>(
        UpsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">insert</span>(
                InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
                    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;users&quot;</span>)
                    .<span class="hljs-title function_ invoke__">row</span>(json!({<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}))
                    .<span class="hljs-title function_ invoke__">build</span>()?,
            )
            .<span class="hljs-title function_ invoke__">add_field_op</span>(
                FieldPartialUpdateOp::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;tags&quot;</span>)
                    .<span class="hljs-title function_ invoke__">op_type</span>(FieldPartialUpdateOpType::ArrayAppend),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> upsertRequest = milvus::<span class="hljs-built_in">UpsertRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;users&quot;</span>)
                         .<span class="hljs-built_in">AddRowData</span>({{<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;tags&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;premium&quot;</span>})}})
                         .<span class="hljs-built_in">AddFieldOp</span>(milvus::<span class="hljs-built_in">FieldPartialUpdateOp</span>(<span class="hljs-string">&quot;tags&quot;</span>, milvus::FieldPartialUpdateOp::OpType::ARRAY_APPEND));

milvus::UpsertResponse upsertResponse;
client-&gt;<span class="hljs-built_in">Upsert</span>(upsertRequest, upsertResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;premium&quot;</span>] }],
    <span class="hljs-attr">field_ops</span>: [{ <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-attr">op</span>: <span class="hljs-string">&quot;ARRAY_APPEND&quot;</span> }]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.UpsertAsync(<span class="hljs-keyword">new</span> UpsertReq
{
    CollectionName = <span class="hljs-string">&quot;users&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;premium&quot;</span> }
        }
    },
    FieldOps = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> FieldPartialUpdateOp(<span class="hljs-string">&quot;tags&quot;</span>, FieldPartialUpdateOpType.ArrayAppend)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;users&quot;,
      &quot;data&quot;: [{&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;premium&quot;]}],
      &quot;fieldOps&quot;: [{&quot;fieldName&quot;: &quot;tags&quot;, &quot;op&quot;: &quot;array_append&quot;}]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Das Anhängen von „ <code translate="no">ARRAY_APPEND</code> “ an ein Feld über „ <code translate="no">field_ops</code> “ ermöglicht eine Teilaktualisierungssemantik für dieses Feld. Informationen zum vollständigen Arbeitsablauf, zu den unterstützten Elementtypen und zu den Beschränkungen finden Sie unter <a href="/docs/de/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">„Upsert-ARRAY-Felder im Merge-Modus</a>“.</p>
<h2 id="ARRAYREMOVE" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_REMOVE</code> “ entfernt bei einer „ <code translate="no">upsert</code> “-Anfrage alle Elemente aus einem bestehenden ARRAY-Feld, die mit einem Wert in der Anforderungsnutzlast übereinstimmen. Es handelt sich dabei nicht um einen Filterausdruck. Verwenden Sie ihn, wenn Sie übereinstimmende Werte aus einem Array entfernen möchten, ohne zuvor den aktuellen Array-Wert abzufragen.</p>
<p>Das folgende Beispiel entfernt „ <code translate="no">&quot;trial&quot;</code> “ aus dem ARRAY-Feld „ <code translate="no">tags</code> “ der Entität, deren Primärschlüssel „ <code translate="no">1</code> “ lautet:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>);
<span class="hljs-type">JsonArray</span> <span class="hljs-variable">tags</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
tags.add(<span class="hljs-string">&quot;trial&quot;</span>);
row.add(<span class="hljs-string">&quot;tags&quot;</span>, tags);

List&lt;UpsertReq.FieldPartialUpdateOp&gt; fieldOps = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
fieldOps.add(UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_REMOVE)
        .build());

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .data(Collections.singletonList(row))
        .fieldOps(fieldOps)
        .build();

client.upsert(upsertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;users&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithColumns(column.NewColumnVarCharArray(<span class="hljs-string">&quot;tags&quot;</span>, [][]<span class="hljs-type">string</span>{{<span class="hljs-string">&quot;trial&quot;</span>}})).
    WithArrayRemove(<span class="hljs-string">&quot;tags&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">upsert</span>(
        UpsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">insert</span>(
                InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
                    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;users&quot;</span>)
                    .<span class="hljs-title function_ invoke__">row</span>(json!({<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}))
                    .<span class="hljs-title function_ invoke__">build</span>()?,
            )
            .<span class="hljs-title function_ invoke__">add_field_op</span>(
                FieldPartialUpdateOp::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;tags&quot;</span>)
                    .<span class="hljs-title function_ invoke__">op_type</span>(FieldPartialUpdateOpType::ArrayRemove),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> upsertRequest = milvus::<span class="hljs-built_in">UpsertRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;users&quot;</span>)
                         .<span class="hljs-built_in">AddRowData</span>({{<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;tags&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;trial&quot;</span>})}})
                         .<span class="hljs-built_in">AddFieldOp</span>(milvus::<span class="hljs-built_in">FieldPartialUpdateOp</span>(<span class="hljs-string">&quot;tags&quot;</span>, milvus::FieldPartialUpdateOp::OpType::ARRAY_REMOVE));

milvus::UpsertResponse upsertResponse;
client-&gt;<span class="hljs-built_in">Upsert</span>(upsertRequest, upsertResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;trial&quot;</span>] }],
    <span class="hljs-attr">field_ops</span>: [{ <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-attr">op</span>: <span class="hljs-string">&quot;ARRAY_REMOVE&quot;</span> }]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.UpsertAsync(<span class="hljs-keyword">new</span> UpsertReq
{
    CollectionName = <span class="hljs-string">&quot;users&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;trial&quot;</span> }
        }
    },
    FieldOps = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> FieldPartialUpdateOp(<span class="hljs-string">&quot;tags&quot;</span>, FieldPartialUpdateOpType.ArrayRemove)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;users&quot;,
      &quot;data&quot;: [{&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;trial&quot;]}],
      &quot;fieldOps&quot;: [{&quot;fieldName&quot;: &quot;tags&quot;, &quot;op&quot;: &quot;array_remove&quot;}]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Das Hinzufügen von „ <code translate="no">ARRAY_REMOVE</code> “ zu einem Feld über „ <code translate="no">field_ops</code> “ ermöglicht eine Teilaktualisierungssemantik für dieses Feld. Informationen zum vollständigen Arbeitsablauf, zu den unterstützten Elementtypen und zu den Beschränkungen finden Sie unter <a href="/docs/de/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">„Upsert-ARRAY-Felder im Merge-Modus</a>“.</p>
