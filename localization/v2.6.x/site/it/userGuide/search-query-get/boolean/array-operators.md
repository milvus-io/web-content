---
id: array-operators.md
title: Operatori ARRAY
summary: >-
  Milvus mette a disposizione operatori ARRAY per filtrare i campi ARRAY e
  aggiornare parzialmente i valori dei campi ARRAY.
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
    </button></h1><p>Milvus mette a disposizione operatori ARRAY per filtrare i campi ARRAY e aggiornare parzialmente i valori dei campi ARRAY.</p>
<div class="alert note">
<p>Tutti gli elementi all’interno di un array devono essere dello stesso tipo e le strutture annidate all’interno degli array vengono trattate come semplici stringhe. Pertanto, quando si lavora con i campi ARRAY, è consigliabile evitare un annidamento eccessivamente profondo e assicurarsi che le strutture dei dati siano il più possibile piatte per ottenere prestazioni ottimali.</p>
</div>
<p>Gli operatori ARRAY in Milvus coprono due scenari di utilizzo:</p>
<ul>
<li><p>Espressioni di filtro per query e ricerche.</p></li>
<li><p>Aggiornamenti parziali nelle richieste di tipo " <code translate="no">upsert</code> ".</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">Operatori ARRAY disponibili<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente elenca gli operatori ARRAY disponibili in Milvus.</p>
<table>
<thead>
<tr><th>Operatore</th><th>Utilizzo in</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/it/v2.6.x/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(identificatore, espressione)</a></td><td>Espressione di filtro</td><td>Verifica se un elemento specifico è presente in un campo ARRAY.</td></tr>
<tr><td><a href="/docs/it/v2.6.x/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(identificatore, espressione)</a></td><td>Espressione di filtro</td><td>Verifica se tutti gli elementi di un elenco specificato sono presenti in un campo ARRAY.</td></tr>
<tr><td><a href="/docs/it/v2.6.x/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(identificatore, espressione)</a></td><td>Espressione di filtro</td><td>Verifica se almeno un elemento di un elenco specificato è presente in un campo ARRAY.</td></tr>
<tr><td><a href="/docs/it/v2.6.x/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(identificatore)</a></td><td>Espressione di filtro</td><td>Restituisce il numero di elementi presenti in un campo ARRAY e può essere combinata con operatori di confronto per il filtraggio.</td></tr>
<tr><td><a href="/docs/it/v2.6.x/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> con <code translate="no">field_ops</code></td><td>Aggiunge elementi di payload a un campo ARRAY esistente. Disponibile in Milvus v2.6.17 e versioni successive.</td></tr>
<tr><td><a href="/docs/it/v2.6.x/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> con <code translate="no">field_ops</code></td><td>Rimuove da un campo ARRAY esistente tutti gli elementi che corrispondono a un valore presente nel payload della richiesta. Disponibile in Milvus v2.6.17 e versioni successive.</td></tr>
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
    </button></h2><p>L'operatore " <code translate="no">ARRAY_CONTAINS</code> " verifica se un elemento specifico è presente in un campo ARRAY. È utile quando si desidera individuare entità in cui un determinato elemento è presente nell'array.</p>
<p><strong>Esempio</strong></p>
<p>Supponiamo di avere un campo array denominato ` <code translate="no">history_temperatures</code>`, che contiene le temperature minime registrate in diversi anni. Per individuare tutte le entità in cui l’array contiene il valore ` <code translate="no">23</code>`, è possibile utilizzare la seguente espressione di filtro:</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_APPEND</code> aggiunge elementi di payload a un campo ARRAY esistente durante una richiesta <code translate="no">upsert</code>. Non è un'espressione di filtro. Utilizzarlo quando si desidera aggiungere valori a un array senza prima interrogare il valore corrente dell'array.</p>
<p>Il seguente esempio in Python aggiunge ` <code translate="no">&quot;premium&quot;</code> ` al campo ARRAY dell'<code translate="no">tags</code> dell'entità la cui chiave primaria è ` <code translate="no">1</code>`:</p>
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
<p>L’aggiunta di <code translate="no">ARRAY_APPEND</code> a un campo tramite <code translate="no">field_ops</code> abilita la semantica dell’aggiornamento parziale per quel campo. Per il flusso di lavoro completo, i tipi di elementi supportati e i limiti, fare riferimento a <a href="/docs/it/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">Upsert dei campi ARRAY con operatori di aggiornamento parziale</a>.</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_REMOVE</code> rimuove tutti gli elementi da un campo ARRAY esistente che corrispondono a un valore nel payload della richiesta durante una richiesta <code translate="no">upsert</code>. Non si tratta di un'espressione di filtro. Utilizzarlo quando si desidera rimuovere i valori corrispondenti da un array senza prima interrogare il valore corrente dell'array.</p>
<p>Il seguente esempio in Python rimuove ` <code translate="no">&quot;trial&quot;</code> ` dal campo ARRAY ` <code translate="no">tags</code> ` dell’entità la cui chiave primaria è ` <code translate="no">1</code>`:</p>
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
<p>L’associazione di ` <code translate="no">ARRAY_REMOVE</code> ` a un campo tramite ` <code translate="no">field_ops</code> ` abilita la semantica dell’aggiornamento parziale per quel campo. Per il flusso di lavoro completo, i tipi di elementi supportati e i limiti, fare riferimento a <a href="/docs/it/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">«Upsert dei campi ARRAY con operatori di aggiornamento parziale</a>».</p>
