---
id: json-operators.md
title: Operatori JSON
summary: >-
  Milvus supporta operatori avanzati per interrogare e filtrare i campi JSON,
  rendendoli perfetti per la gestione di dati complessi e strutturati. Questi
  operatori consentono di interrogare in modo estremamente efficace i documenti
  JSON, permettendo di recuperare entità in base a elementi, valori o condizioni
  specifiche all'interno dei campi JSON. Questa sezione vi guiderà nell'uso
  degli operatori specifici per JSON in Milvus, fornendo esempi pratici per
  illustrarne le funzionalità.
---
<h1 id="JSON-Operators" class="common-anchor-header">Operatori JSON<button data-href="#JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supporta operatori avanzati per interrogare e filtrare i campi JSON, rendendoli perfetti per la gestione di dati complessi e strutturati. Questi operatori consentono di interrogare in modo estremamente efficace i documenti JSON, permettendo di recuperare entità in base a elementi, valori o condizioni specifiche all'interno dei campi JSON. Questa sezione vi guiderà nell'uso degli operatori specifici per JSON in Milvus, fornendo esempi pratici per illustrarne la funzionalità.</p>
<div class="alert note">
<p>I campi JSON non possono gestire strutture complesse e annidate e trattano tutte le strutture annidate come semplici stringhe. Pertanto, quando si lavora con i campi JSON, è consigliabile evitare annidamenti troppo profondi e assicurarsi che le strutture di dati siano il più possibile piatte per ottenere prestazioni ottimali.</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">Operatori JSON disponibili<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fornisce diversi potenti operatori JSON che aiutano a filtrare e interrogare i dati JSON:</p>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, expr)</code>: Filtra le entità in cui l'espressione JSON specificata si trova all'interno del campo.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code>: Assicura che tutti gli elementi dell'espressione JSON specificata siano presenti nel campo.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code>: Filtra le entità in cui almeno un membro dell'espressione JSON è presente nel campo.</p></li>
</ul>
<p>Esploriamo questi operatori con degli esempi per vedere come possono essere applicati in scenari reali.</p>
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
    </button></h2><p>L'operatore <code translate="no">json_contains</code> verifica l'esistenza di un elemento specifico o di una sotto-riga all'interno di un campo JSON. È utile quando si vuole garantire che un array o un oggetto JSON contenga un particolare valore.</p>
<p><strong>Esempio</strong></p>
<p>Si immagini di avere un insieme di prodotti, ciascuno con un campo <code translate="no">tags</code> che contiene un array JSON di stringhe, come <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. Si desidera filtrare i prodotti che hanno il tag <code translate="no">&quot;sale&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, Milvus restituirà tutti i prodotti in cui il campo <code translate="no">tags</code> contiene l'elemento <code translate="no">&quot;sale&quot;</code>.</p>
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
    </button></h2><p>L'operatore <code translate="no">json_contains_all</code> assicura che tutti gli elementi di un'espressione JSON specificata siano presenti nel campo di destinazione. È particolarmente utile quando è necessario abbinare più valori all'interno di un array JSON.</p>
<p><strong>Esempio</strong></p>
<p>Continuando con lo scenario dei tag dei prodotti, se si vogliono trovare tutti i prodotti che hanno i tag <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, e <code translate="no">&quot;new&quot;</code>, si può usare l'operatore <code translate="no">json_contains_all</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questa query restituirà tutti i prodotti in cui l'array <code translate="no">tags</code> contiene i tre elementi specificati: <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code> e <code translate="no">&quot;new&quot;</code>.</p>
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
    </button></h2><p>L'operatore <code translate="no">json_contains_any</code> filtra le entità in cui almeno un membro dell'espressione JSON esiste all'interno del campo. È utile quando si desidera abbinare le entità in base a uno qualsiasi dei valori possibili.</p>
<p><strong>Esempio</strong></p>
<p>Supponiamo di voler filtrare i prodotti che hanno almeno uno dei tag <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, o <code translate="no">&quot;new&quot;</code>. Per ottenere questo risultato, è possibile utilizzare l'operatore <code translate="no">json_contains_any</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo caso, Milvus restituirà tutti i prodotti che hanno almeno uno dei tag dell'elenco <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. Anche se un prodotto ha solo uno di questi tag, sarà incluso nel risultato.</p>
