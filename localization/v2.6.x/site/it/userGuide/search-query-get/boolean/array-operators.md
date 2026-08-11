---
id: array-operators.md
title: Operatori ARRAY
summary: >-
  Milvus mette a disposizione potenti operatori per l'interrogazione dei campi
  degli array, consentendo di filtrare e recuperare entità in base al contenuto
  degli array.
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
    </button></h1><p>Milvus mette a disposizione potenti operatori per l'interrogazione dei campi array, consentendo di filtrare e recuperare entità in base al contenuto degli array.</p>
<div class="alert note">
<p>Tutti gli elementi all’interno di un array devono essere dello stesso tipo e le strutture annidate all’interno degli array vengono trattate come semplici stringhe. Pertanto, quando si lavora con i campi ARRAY, è consigliabile evitare un annidamento eccessivamente profondo e assicurarsi che le strutture dei dati siano il più possibile piatte per ottenere prestazioni ottimali.</p>
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
    </button></h2><p>Gli operatori ARRAY consentono di eseguire interrogazioni dettagliate sui campi array in Milvus. Questi operatori sono:</p>
<ul>
<li><p><a href="/docs/it/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: verifica se un elemento specifico è presente in un campo array.</p></li>
<li><p><a href="/docs/it/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: garantisce che tutti gli elementi dell’elenco specificato siano presenti nel campo array.</p></li>
<li><p><a href="/docs/it/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: verifica se uno qualsiasi degli elementi dell’elenco specificato è presente nel campo array.</p></li>
<li><p><a href="/docs/it/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: restituisce il numero di elementi presenti in un campo array e può essere combinato con operatori di confronto per il filtraggio.</p></li>
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
    </button></h2><p>L’operatore ` <code translate="no">ARRAY_CONTAINS</code> ` verifica se un elemento specifico è presente in un campo array. È utile quando si desidera individuare entità in cui un dato elemento è presente nell’array.</p>
<p><strong>Esempio</strong></p>
<p>Supponiamo di avere un campo array <code translate="no">history_temperatures</code>, che contiene le temperature minime registrate in diversi anni. Per trovare tutte le entità in cui l’array contiene il valore <code translate="no">23</code>, è possibile utilizzare la seguente espressione di filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo modo verranno restituite tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene il valore ` <code translate="no">23</code>`.</p>
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
    </button></h2><p>L’operatore <code translate="no">ARRAY_CONTAINS_ALL</code> garantisce che tutti gli elementi dell’elenco specificato siano presenti nel campo array. Questo operatore è utile quando si desidera individuare entità che contengono più valori nell’array.</p>
<p><strong>Esempio</strong></p>
<p>Se si desidera trovare tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene sia ` <code translate="no">23</code> ` che ` <code translate="no">24</code>`, è possibile utilizzare:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo restituirà tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene entrambi i valori specificati.</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_CONTAINS_ANY</code> verifica se uno qualsiasi degli elementi dell'elenco specificato è presente nel campo array. Ciò è utile quando si desidera individuare le entità che contengono almeno uno dei valori specificati nell'array.</p>
<p><strong>Esempio</strong></p>
<p>Per trovare tutte le entità in cui l'array ` <code translate="no">history_temperatures</code> ` contiene ` <code translate="no">23</code> ` o ` <code translate="no">24</code>`, è possibile utilizzare:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo restituirà tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene almeno uno dei valori ` <code translate="no">23</code> ` o ` <code translate="no">24</code>`.</p>
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
    </button></h2><p>L'<code translate="no">ARRAY_LENGTH</code> e restituisce la lunghezza (numero di elementi) di un campo array. Accetta esattamente un parametro: l'identificatore del campo array.</p>
<p><strong>Esempio</strong></p>
<p>Per trovare tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene meno di 10 elementi:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo restituirà tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene meno di 10 elementi.</p>
