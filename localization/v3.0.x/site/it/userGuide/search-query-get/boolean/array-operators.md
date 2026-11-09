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
<p>Tutti gli elementi all’interno di un array devono essere dello stesso tipo e le strutture annidate all’interno degli array vengono trattate come semplici stringhe. Pertanto, quando si lavora con campi ARRAY, è consigliabile evitare un annidamento eccessivamente profondo e assicurarsi che le strutture dei dati siano il più possibile piatte per ottenere prestazioni ottimali.</p>
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
<tr><td><a href="#ARRAYCONTAINS">ARRAY_CONTAINS(identificatore, espr)</a></td><td>Espressione di filtro</td><td>Verifica se un elemento specifico è presente in un campo ARRAY.</td></tr>
<tr><td><a href="#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(identificatore, espr)</a></td><td>Espressione di filtro</td><td>Verifica se tutti gli elementi di un elenco specificato sono presenti in un campo ARRAY.</td></tr>
<tr><td><a href="#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(identificatore, espr)</a></td><td>Espressione di filtro</td><td>Verifica se almeno un elemento di un elenco specificato è presente in un campo ARRAY.</td></tr>
<tr><td><a href="#ARRAYLENGTH">ARRAY_LENGTH(identificatore)</a></td><td>Espressione di filtro</td><td>Restituisce il numero di elementi presenti in un campo ARRAY e può essere combinata con operatori di confronto per il filtraggio.</td></tr>
<tr><td><a href="#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> con <code translate="no">field_ops</code></td><td>Aggiunge elementi di payload a un campo ARRAY esistente. Disponibile in Milvus v2.6.17 e versioni successive.</td></tr>
<tr><td><a href="#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> con <code translate="no">field_ops</code></td><td>Rimuove da un campo ARRAY esistente tutti gli elementi che corrispondono a un valore presente nel payload della richiesta. Disponibile in Milvus v2.6.17 e versioni successive.</td></tr>
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
<p>Supponiamo di avere un campo array <code translate="no">history_temperatures</code>, che contiene le temperature minime registrate in diversi anni. Per trovare tutte le entità in cui l’array contiene il valore <code translate="no">23</code>, è possibile utilizzare la seguente espressione di filtro:</p>
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
<p>Questo restituirà tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene il valore ` <code translate="no">23</code>`.</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_CONTAINS_ALL</code> garantisce che tutti gli elementi dell'elenco specificato siano presenti nel campo array. Questo operatore è utile quando si desidera trovare entità che contengono più valori nell'array.</p>
<p><strong>Esempio</strong></p>
<p>Se si desidera trovare tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene sia ` <code translate="no">23</code> ` che ` <code translate="no">24</code>`, è possibile utilizzare:</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_CONTAINS_ANY</code> verifica se uno qualsiasi degli elementi dell'elenco specificato è presente nel campo array. Ciò è utile quando si desidera trovare le entità che contengono almeno uno dei valori specificati nell'array.</p>
<p><strong>Esempio</strong></p>
<p>Per trovare tutte le entità in cui l'array ` <code translate="no">history_temperatures</code> ` contiene ` <code translate="no">23</code> ` o ` <code translate="no">24</code>`, è possibile utilizzare:</p>
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
<p>Questo restituirà tutte le entità in cui l'array ` <code translate="no">history_temperatures</code> ` contiene almeno uno dei valori ` <code translate="no">23</code> ` o ` <code translate="no">24</code>`.</p>
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> restituisce la lunghezza (numero di elementi) di un campo array. Accetta esattamente un parametro: l'identificatore del campo array.</p>
<p><strong>Esempio</strong></p>
<p>Per trovare tutte le entità in cui l'array <code translate="no">history_temperatures</code> contiene meno di 10 elementi:</p>
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
<p>Questo restituirà tutte le entità in cui l’array ` <code translate="no">history_temperatures</code> ` contiene meno di 10 elementi.</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_APPEND</code> aggiunge elementi di payload a un campo ARRAY esistente durante una richiesta <code translate="no">upsert</code>. Non si tratta di un'espressione di filtro. Utilizzarlo quando si desidera aggiungere valori a un array senza prima interrogare il valore corrente dell'array.</p>
<p>L'esempio seguente aggiunge ` <code translate="no">&quot;premium&quot;</code> ` al campo ARRAY della richiesta <code translate="no">tags</code> dell'entità la cui chiave primaria è ` <code translate="no">1</code>`:</p>
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
<p>L'aggiunta di <code translate="no">ARRAY_APPEND</code> a un campo tramite <code translate="no">field_ops</code> abilita la semantica dell'aggiornamento parziale per quel campo. Per il flusso di lavoro completo, i tipi di elementi supportati e i limiti, fare riferimento a <a href="/docs/it/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">Campi ARRAY di tipo Upsert in modalità di unione</a>.</p>
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
    </button></h2><p>L'operatore <code translate="no">ARRAY_REMOVE</code> rimuove ogni elemento da un campo ARRAY esistente che corrisponda a un valore nel payload della richiesta durante una richiesta <code translate="no">upsert</code>. Non si tratta di un'espressione di filtro. Utilizzarlo quando si desidera rimuovere i valori corrispondenti da un array senza prima interrogare il valore corrente dell'array.</p>
<p>L’esempio seguente rimuove <code translate="no">&quot;trial&quot;</code> dal campo ARRAY <code translate="no">tags</code> dell’entità la cui chiave primaria è <code translate="no">1</code>:</p>
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
<p>L'associazione di <code translate="no">ARRAY_REMOVE</code> a un campo tramite <code translate="no">field_ops</code> abilita la semantica dell'aggiornamento parziale per quel campo. Per il flusso di lavoro completo, i tipi di elementi supportati e i limiti, fare riferimento a <a href="/docs/it/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">Campi ARRAY Upsert in modalità di unione</a>.</p>
