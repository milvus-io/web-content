---
id: array-operators.md
title: Operatori ARRAY
summary: >-
  Milvus offre potenti operatori per interrogare i campi degli array,
  consentendo di filtrare e recuperare le entità in base al loro contenuto.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Operatori ARRAY<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus offre potenti operatori per interrogare i campi degli array, consentendo di filtrare e recuperare le entità in base al loro contenuto.</p>
<div class="alert note">
<p>Tutti gli elementi di un array devono essere dello stesso tipo e le strutture annidate all'interno degli array sono trattate come stringhe semplici. Pertanto, quando si lavora con i campi ARRAY, è consigliabile evitare annidamenti troppo profondi e assicurarsi che le strutture di dati siano il più possibile piatte per ottenere prestazioni ottimali.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">Operatori ARRAY disponibili<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli operatori ARRAY consentono di interrogare con precisione i campi array in Milvus. Gli operatori sono:</p>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, expr)</code>: verifica l'esistenza di un elemento specifico in un campo array.</p></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code>: assicura che tutti gli elementi dell'elenco specificato siano presenti nel campo dell'array.</p></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code>: verifica se uno qualsiasi degli elementi dell'elenco specificato è presente nel campo array.</p></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier, expr)</code>: consente di filtrare le entità in base al numero di elementi di un campo array.</p></li>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_CONTAINS</code> controlla se un elemento specifico esiste in un campo array. È utile quando si vogliono trovare entità in cui un determinato elemento è presente nella matrice.</p>
<p><strong>Esempio</strong></p>
<p>Si supponga di avere un campo array <code translate="no">history_temperatures</code>, che contiene le temperature minime registrate per diversi anni. Per trovare tutte le entità in cui l'array contiene il valore <code translate="no">23</code>, si può usare la seguente espressione di filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo restituirà tutte le entità in cui l'array <code translate="no">history_temperatures</code> contiene il valore <code translate="no">23</code>.</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_CONTAINS_ALL</code> assicura che tutti gli elementi dell'elenco specificato siano presenti nel campo dell'array. Questo operatore è utile quando si desidera abbinare entità che contengono più valori nell'array.</p>
<p><strong>Esempio</strong></p>
<p>Se si vogliono trovare tutte le entità in cui l'array <code translate="no">history_temperatures</code> contiene sia <code translate="no">23</code> che <code translate="no">24</code>, si può usare:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo restituirà tutte le entità in cui l'array <code translate="no">history_temperatures</code> contiene entrambi i valori specificati.</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_CONTAINS_ANY</code> controlla se uno qualsiasi degli elementi dell'elenco specificato è presente nel campo dell'array. È utile quando si desidera abbinare entità che contengono almeno uno dei valori specificati nell'array.</p>
<p><strong>Esempio</strong></p>
<p>Per trovare tutte le entità in cui l'array <code translate="no">history_temperatures</code> contiene o <code translate="no">23</code> o <code translate="no">24</code>, si può usare l'operatore:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo restituirà tutte le entità in cui l'array <code translate="no">history_temperatures</code> contiene almeno uno dei valori <code translate="no">23</code> o <code translate="no">24</code>.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">LUNGHEZZA_ARRAY<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_LENGTH</code> consente di filtrare le entità in base al numero di elementi di un campo array. È utile quando si devono trovare entità con array di una certa lunghezza.</p>
<p><strong>Esempio</strong></p>
<p>Se si desidera trovare tutte le entità in cui l'array <code translate="no">history_temperatures</code> ha meno di 10 elementi, è possibile utilizzare l'operatore :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo restituirà tutte le entità in cui l'array <code translate="no">history_temperatures</code> ha meno di 10 elementi.</p>
