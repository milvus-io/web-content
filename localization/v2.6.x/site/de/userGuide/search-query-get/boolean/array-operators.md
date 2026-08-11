---
id: array-operators.md
title: ARRAY-Operatoren
summary: >-
  Milvus bietet leistungsstarke Operatoren zur Abfrage von Array-Feldern, mit
  denen Sie Entitäten anhand des Inhalts von Arrays filtern und abrufen können.
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
    </button></h1><p>Milvus bietet leistungsstarke Operatoren zur Abfrage von Array-Feldern, mit denen Sie Entitäten anhand des Inhalts von Arrays filtern und abrufen können.</p>
<div class="alert note">
<p>Alle Elemente innerhalb eines Arrays müssen denselben Typ haben, und verschachtelte Strukturen innerhalb von Arrays werden als einfache Zeichenfolgen behandelt. Daher ist es bei der Arbeit mit ARRAY-Feldern ratsam, eine zu tiefe Verschachtelung zu vermeiden und sicherzustellen, dass Ihre Datenstrukturen so flach wie möglich sind, um eine optimale Leistung zu erzielen.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">Verfügbare ARRAY-Operatoren<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Die ARRAY-Operatoren ermöglichen eine detaillierte Abfrage von Array-Feldern in Milvus. Diese Operatoren sind:</p>
<ul>
<li><p><a href="/docs/de/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: Prüft, ob ein bestimmtes Element in einem Array-Feld vorhanden ist.</p></li>
<li><p><a href="/docs/de/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: stellt sicher, dass alle Elemente der angegebenen Liste im Array-Feld vorhanden sind.</p></li>
<li><p><a href="/docs/de/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: Prüft, ob eines der Elemente aus der angegebenen Liste im Array-Feld vorhanden ist.</p></li>
<li><p><a href="/docs/de/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: gibt die Anzahl der Elemente in einem Array-Feld zurück und kann zur Filterung mit Vergleichsoperatoren kombiniert werden.</p></li>
</ul>
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_CONTAINS</code> “ prüft, ob ein bestimmtes Element in einem Array-Feld vorhanden ist. Er ist nützlich, wenn Sie Entitäten finden möchten, bei denen ein bestimmtes Element im Array vorhanden ist.</p>
<p><strong>Beispiel</strong></p>
<p>Angenommen, Sie haben ein Array-Feld „ <code translate="no">history_temperatures</code> “, das die niedrigsten gemessenen Temperaturen für verschiedene Jahre enthält. Um alle Entitäten zu finden, bei denen das Array den Wert „ <code translate="no">23</code> “ enthält, können Sie den folgenden Filterausdruck verwenden:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_CONTAINS_ALL</code> “ stellt sicher, dass alle Elemente der angegebenen Liste im Array-Feld vorhanden sind. Dieser Operator ist nützlich, wenn Sie Entitäten finden möchten, deren Array mehrere Werte enthält.</p>
<p><strong>Beispiel</strong></p>
<p>Wenn Sie alle Entitäten finden möchten, bei denen das Array „ <code translate="no">history_temperatures</code> “ sowohl „ <code translate="no">23</code> “ als auch „ <code translate="no">24</code> “ enthält, können Sie Folgendes verwenden:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
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
<p>Um alle Entitäten zu finden, bei denen das Array „ <code translate="no">history_temperatures</code> “ weniger als 10 Elemente enthält:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch werden alle Entitäten zurückgegeben, bei denen das Array „ <code translate="no">history_temperatures</code> “ weniger als 10 Elemente enthält.</p>
