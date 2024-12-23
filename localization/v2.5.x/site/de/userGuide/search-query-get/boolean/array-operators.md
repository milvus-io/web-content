---
id: array-operators.md
summary: >-
  Milvus bietet leistungsstarke Operatoren zur Abfrage von Array-Feldern, die es
  Ihnen ermöglichen, Entitäten auf der Grundlage des Inhalts von Arrays zu
  filtern und abzurufen. 
title: Array-Operatoren
---
<h1 id="ARRAY-Operators​" class="common-anchor-header">ARRAY-Operatoren<button data-href="#ARRAY-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus bietet leistungsstarke Operatoren zur Abfrage von Array-Feldern, die es Ihnen ermöglichen, Entitäten auf der Grundlage des Inhalts von Arrays zu filtern und abzurufen. </p>
<div class="alert note">
<p>Alle Elemente innerhalb eines Arrays müssen vom gleichen Typ sein, und verschachtelte Strukturen innerhalb von Arrays werden wie einfache Zeichenketten behandelt. Daher ist es ratsam, bei der Arbeit mit ARRAY-Feldern übermäßig tiefe Verschachtelungen zu vermeiden und sicherzustellen, dass Ihre Datenstrukturen für eine optimale Leistung so flach wie möglich sind.</p>
</div>
<h2 id="Available-ARRAY-Operators​" class="common-anchor-header">Verfügbare ARRAY-Operatoren<button data-href="#Available-ARRAY-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Die ARRAY-Operatoren ermöglichen eine feinkörnige Abfrage von Array-Feldern in Milvus. Diese Operatoren sind.</p>
<ul>
<li><p><a href="#ARRAY_CONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: prüft, ob ein bestimmtes Element in einem Array-Feld vorhanden ist.</p></li>
<li><p><a href="#ARRAY_CONTAINS_ALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>ARRAY-Operator: stellt sicher, dass alle Elemente der angegebenen Liste in dem Array-Feld vorhanden sind.</p></li>
<li><p><a href="#ARRAY_CONTAINS_ANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: prüft, ob eines der Elemente aus der angegebenen Liste in dem Array-Feld vorhanden ist.</p></li>
<li><p><a href="#ARRAY_LENGTH"><code translate="no">ARRAY_LENGTH(identifier, expr)</code></a>ARRAY_CONTAINS: Erlaubt das Filtern von Entitäten basierend auf der Anzahl der Elemente in einem Array-Feld.</p></li>
</ul>
<h2 id="ARRAYCONTAINS​" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS​" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <code translate="no">ARRAY_CONTAINS</code> Operator prüft, ob ein bestimmtes Element in einem Array-Feld vorhanden ist. Er ist nützlich, wenn Sie Entitäten finden wollen, bei denen ein bestimmtes Element in dem Array vorhanden ist.</p>
<p><strong>Beispiel</strong></p>
<p>Angenommen, Sie haben ein Array-Feld <code translate="no">history_temperatures</code>, das die aufgezeichneten niedrigsten Temperaturen für verschiedene Jahre enthält. Um alle Entitäten zu finden, in denen das Array den Wert <code translate="no">23</code> enthält, können Sie den folgenden Filterausdruck verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dieser gibt alle Entitäten zurück, bei denen das Array <code translate="no">history_temperatures</code> den Wert <code translate="no">23</code> enthält.</p>
<h2 id="ARRAYCONTAINSALL​" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL​" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <code translate="no">ARRAY_CONTAINS_ALL</code> Operator stellt sicher, dass alle Elemente der angegebenen Liste im Array-Feld vorhanden sind. Dieser Operator ist nützlich, wenn Sie Entitäten abgleichen möchten, die mehrere Werte im Array enthalten.</p>
<p><strong>Beispiel</strong></p>
<p>Wenn Sie alle Entitäten finden möchten, bei denen das Array <code translate="no">history_temperatures</code> sowohl <code translate="no">23</code> als auch <code translate="no">24</code> enthält, können Sie verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dies gibt alle Entitäten zurück, bei denen das Array <code translate="no">history_temperatures</code> beide der angegebenen Werte enthält.</p>
<h2 id="ARRAYCONTAINSANY​" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY​" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <code translate="no">ARRAY_CONTAINS_ANY</code> Operator prüft, ob eines der Elemente aus der angegebenen Liste im Array-Feld vorhanden ist. Dies ist nützlich, wenn Sie Entitäten abgleichen möchten, die mindestens einen der angegebenen Werte im Array enthalten.</p>
<p><strong>Beispiel</strong></p>
<p>Um alle Entitäten zu finden, bei denen das Array <code translate="no">history_temperatures</code> entweder <code translate="no">23</code> oder <code translate="no">24</code> enthält, können Sie verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dies wird alle Entitäten zurückgeben, bei denen das Array <code translate="no">history_temperatures</code> mindestens einen der Werte <code translate="no">23</code> oder <code translate="no">24</code> enthält.</p>
<h2 id="ARRAYLENGTH​" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH​" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <code translate="no">ARRAY_LENGTH</code> Operator ermöglicht es Ihnen, Entitäten auf der Grundlage der Anzahl der Elemente in einem Array-Feld zu filtern. Dies ist nützlich, wenn Sie Entitäten mit Arrays einer bestimmten Länge finden müssen.</p>
<p><strong>Beispiel</strong></p>
<p>Wenn Sie alle Entitäten finden wollen, bei denen das Array <code translate="no">history_temperatures</code> weniger als 10 Elemente hat, können Sie verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dies wird alle Entitäten zurückgeben, bei denen das Array <code translate="no">history_temperatures</code> weniger als 10 Elemente hat.</p>
