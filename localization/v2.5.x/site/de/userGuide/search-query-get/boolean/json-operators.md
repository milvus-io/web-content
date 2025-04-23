---
id: json-operators.md
title: JSON-Operatoren
summary: >-
  Milvus unterstützt fortschrittliche Operatoren für die Abfrage und Filterung
  von JSON-Feldern und eignet sich damit perfekt für die Verwaltung komplexer,
  strukturierter Daten. Diese Operatoren ermöglichen eine hocheffektive Abfrage
  von JSON-Dokumenten, so dass Sie Entitäten auf der Grundlage bestimmter
  Elemente, Werte oder Bedingungen innerhalb der JSON-Felder abrufen können.
  Dieser Abschnitt führt Sie durch die Verwendung von JSON-spezifischen
  Operatoren in Milvus und bietet praktische Beispiele zur Veranschaulichung
  ihrer Funktionalität.
---
<h1 id="JSON-Operators" class="common-anchor-header">JSON-Operatoren<button data-href="#JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus unterstützt fortschrittliche Operatoren für die Abfrage und Filterung von JSON-Feldern und eignet sich damit perfekt für die Verwaltung komplexer, strukturierter Daten. Diese Operatoren ermöglichen eine hocheffektive Abfrage von JSON-Dokumenten und erlauben es Ihnen, Entitäten auf der Grundlage bestimmter Elemente, Werte oder Bedingungen innerhalb der JSON-Felder abzurufen. Dieser Abschnitt führt Sie durch die Verwendung von JSON-spezifischen Operatoren in Milvus und bietet praktische Beispiele zur Veranschaulichung ihrer Funktionalität.</p>
<div class="alert note">
<p>JSON-Felder können nicht mit komplexen, verschachtelten Strukturen umgehen und behandeln alle verschachtelten Strukturen als einfache Zeichenketten. Daher ist es ratsam, bei der Arbeit mit JSON-Feldern übermäßig tiefe Verschachtelungen zu vermeiden und sicherzustellen, dass Ihre Datenstrukturen für eine optimale Leistung so flach wie möglich sind.</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">Verfügbare JSON-Operatoren<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet mehrere leistungsstarke JSON-Operatoren, die beim Filtern und Abfragen von JSON-Daten helfen, und diese Operatoren sind</p>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, expr)</code>: Filtert Entitäten, bei denen der angegebene JSON-Ausdruck innerhalb des Feldes gefunden wird.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code>: Stellt sicher, dass alle Elemente des angegebenen JSON-Ausdrucks in dem Feld vorhanden sind.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code>: Filtert Entitäten, bei denen mindestens ein Element des JSON-Ausdrucks innerhalb des Feldes vorhanden ist.</p></li>
</ul>
<p>Wir wollen diese Operatoren anhand von Beispielen untersuchen, um zu sehen, wie sie in realen Szenarien angewendet werden können.</p>
<h2 id="JSONCONTAINS" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">json_contains</code> prüft, ob ein bestimmtes Element oder Subarray in einem JSON-Feld vorhanden ist. Er ist nützlich, wenn Sie sicherstellen wollen, dass ein JSON-Array oder -Objekt einen bestimmten Wert enthält.</p>
<p><strong>Beispiel</strong></p>
<p>Stellen Sie sich vor, Sie haben eine Sammlung von Produkten, jedes mit einem <code translate="no">tags</code> Feld, das ein JSON Array von Strings enthält, wie z.B. <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. Sie möchten Produkte filtern, die das Tag <code translate="no">&quot;sale&quot;</code> haben.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel gibt Milvus alle Produkte zurück, bei denen das Feld <code translate="no">tags</code> das Element <code translate="no">&quot;sale&quot;</code> enthält.</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">json_contains_all</code> stellt sicher, dass alle Elemente eines angegebenen JSON-Ausdrucks im Zielfeld vorhanden sind. Er ist besonders nützlich, wenn Sie mehrere Werte innerhalb eines JSON-Arrays abgleichen müssen.</p>
<p><strong>Beispiel</strong></p>
<p>Wenn Sie alle Produkte finden möchten, die die Tags <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code> und <code translate="no">&quot;new&quot;</code> haben, können Sie den Operator <code translate="no">json_contains_all</code> verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Diese Abfrage gibt alle Produkte zurück, bei denen das Array <code translate="no">tags</code> alle drei angegebenen Elemente enthält: <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, und <code translate="no">&quot;new&quot;</code>.</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">JSON_CONTAINS_ANY<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <code translate="no">json_contains_any</code> Operator filtert Entitäten, bei denen mindestens ein Element des JSON-Ausdrucks innerhalb des Feldes existiert. Dies ist nützlich, wenn Sie Entitäten auf der Grundlage eines beliebigen von mehreren möglichen Werten abgleichen möchten.</p>
<p><strong>Beispiel</strong></p>
<p>Angenommen, Sie möchten Produkte filtern, die mindestens eines der Tags <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code> oder <code translate="no">&quot;new&quot;</code> enthalten. Um dies zu erreichen, können Sie den Operator <code translate="no">json_contains_any</code> verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Fall gibt Milvus alle Produkte zurück, die mindestens eines der Tags in der Liste <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code> haben. Auch wenn ein Produkt nur eines dieser Tags hat, wird es in das Ergebnis aufgenommen.</p>
