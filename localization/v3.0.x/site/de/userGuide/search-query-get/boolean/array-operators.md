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
<tr><td><a href="/docs/de/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(Bezeichner, Ausdruck)</a></td><td>Filterausdruck</td><td>Prüft, ob ein bestimmtes Element in einem ARRAY-Feld vorhanden ist.</td></tr>
<tr><td><a href="/docs/de/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(Bezeichner, Ausdruck)</a></td><td>Filterausdruck</td><td>Prüft, ob alle Elemente einer angegebenen Liste in einem ARRAY-Feld vorhanden sind.</td></tr>
<tr><td><a href="/docs/de/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(Bezeichner, Ausdruck)</a></td><td>Filterausdruck</td><td>Prüft, ob mindestens ein Element einer angegebenen Liste in einem ARRAY-Feld vorhanden ist.</td></tr>
<tr><td><a href="/docs/de/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(Bezeichner)</a></td><td>Filterausdruck</td><td>Gibt die Anzahl der Elemente in einem ARRAY-Feld zurück und kann zur Filterung mit Vergleichsoperatoren kombiniert werden.</td></tr>
<tr><td><a href="/docs/de/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> mit <code translate="no">field_ops</code></td><td>Fügt Payload-Elemente an ein bestehendes ARRAY-Feld an. Verfügbar ab Milvus v2.6.17.</td></tr>
<tr><td><a href="/docs/de/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> mit <code translate="no">field_ops</code></td><td>Entfernt alle Elemente aus einem bestehenden ARRAY-Feld, die mit einem Wert in der Anfrage-Nutzlast übereinstimmen. Verfügbar ab Milvus v2.6.17.</td></tr>
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
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_APPEND</code> “ fügt während einer „ <code translate="no">upsert</code> “-Anfrage Payload-Elemente an ein bestehendes ARRAY-Feld an. Es handelt sich dabei nicht um einen Filterausdruck. Verwenden Sie ihn, wenn Sie Werte zu einem Array hinzufügen möchten, ohne zuvor den aktuellen Array-Wert abzufragen.</p>
<p>Das folgende Python-Beispiel hängt „ <code translate="no">&quot;premium&quot;</code> “ an das ARRAY-Feld der Entität an, deren Primärschlüssel „ <code translate="no">1</code> “ lautet, und führt dabei eine „ <code translate="no">tags</code> “-Anfrage durch:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Hinzufügen von „ <code translate="no">ARRAY_APPEND</code> “ zu einem Feld über „ <code translate="no">field_ops</code> “ ermöglicht die Semantik der Teilaktualisierung für dieses Feld. Informationen zum vollständigen Arbeitsablauf, zu den unterstützten Elementtypen und zu den Einschränkungen finden Sie unter <a href="/docs/de/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">„Upsert-ARRAY-Felder im Merge-Modus</a>“.</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator „ <code translate="no">ARRAY_REMOVE</code> “ entfernt bei einer „ <code translate="no">upsert</code> “-Anfrage jedes Element aus einem bestehenden ARRAY-Feld, das mit einem Wert in der Anforderungsnutzlast übereinstimmt. Es handelt sich dabei nicht um einen Filterausdruck. Verwenden Sie ihn, wenn Sie übereinstimmende Werte aus einem Array entfernen möchten, ohne zuvor den aktuellen Array-Wert abzufragen.</p>
<p>Das folgende Python-Beispiel entfernt „ <code translate="no">&quot;trial&quot;</code> “ aus dem ARRAY-Feld „ <code translate="no">tags</code> “ der Entität, deren Primärschlüssel „ <code translate="no">1</code> “ lautet:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Verknüpfen von „ <code translate="no">ARRAY_REMOVE</code> “ mit einem Feld über „ <code translate="no">field_ops</code> “ ermöglicht die Semantik der Teilaktualisierung für dieses Feld. Informationen zum vollständigen Arbeitsablauf, zu den unterstützten Elementtypen und zu den Einschränkungen finden Sie unter <a href="/docs/de/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">„Upsert-ARRAY-Felder im Merge-Modus</a>“.</p>
