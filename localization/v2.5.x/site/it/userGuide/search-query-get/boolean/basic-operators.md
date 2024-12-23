---
id: basic-operators.md
summary: >-
  Milvus offre una ricca serie di operatori di base che aiutano a filtrare e
  interrogare i dati in modo efficiente. Questi operatori consentono di affinare
  le condizioni di ricerca in base a campi scalari, calcoli numerici, condizioni
  logiche e altro ancora. Capire come usare questi operatori è fondamentale per
  creare query precise e massimizzare l'efficienza delle ricerche.
title: Operatori di base
---
<h1 id="Basic-Operators​" class="common-anchor-header">Operatori di base<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus offre una ricca serie di operatori di base che aiutano a filtrare e interrogare i dati in modo efficiente. Questi operatori consentono di affinare le condizioni di ricerca in base a campi scalari, calcoli numerici, condizioni logiche e altro ancora. Capire come usare questi operatori è fondamentale per creare query precise e massimizzare l'efficienza delle ricerche.</p>
<h2 id="Comparison-operators​" class="common-anchor-header">Operatori di confronto<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli operatori di confronto sono utilizzati per filtrare i dati in base all'uguaglianza, alla disuguaglianza o alla dimensione. Sono applicabili a campi numerici, di testo e di date.</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">Operatori di confronto supportati.</h3><ul>
<li><p><code translate="no">==</code> (uguale a)</p></li>
<li><p><code translate="no">!=</code> (Non uguale a)</p></li>
<li><p><code translate="no">&gt;</code> (Maggiore di)</p></li>
<li><p><code translate="no">&lt;</code> (minore di)</p></li>
<li><p><code translate="no">&gt;=</code> (Maggiore o uguale a)</p></li>
<li><p><code translate="no">&lt;=</code> (Minore o uguale a)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Equal-To-​" class="common-anchor-header">Esempio 1: Filtraggio con Equal To (<code translate="no">==</code>)</h3><p>Si supponga di avere un campo chiamato <code translate="no">status</code> e di voler trovare tutte le entità in cui <code translate="no">status</code> è &quot;attivo&quot;. Si può usare l'operatore di uguaglianza <code translate="no">==</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Not-Equal-To-​" class="common-anchor-header">Esempio 2: Filtro con Not Equal To (<code translate="no">!=</code>)</h3><p>Per trovare le entità in cui <code translate="no">status</code> non è &quot;inattivo&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-Greater-Than-​" class="common-anchor-header">Esempio 3: Filtro con Maggiore di (<code translate="no">&gt;</code>)</h3><p>Se si vogliono trovare tutte le entità con un <code translate="no">age</code> superiore a 30.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-Less-Than-​" class="common-anchor-header">Esempio 4: Filtraggio con Meno di (<code translate="no">&lt;</code>)</h3><p>Per trovare le entità in cui <code translate="no">price</code> è inferiore a 100.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">Esempio 5: Filtro con Maggiore o uguale a (<code translate="no">&gt;=</code>)</h3><p>Se si desidera trovare tutte le entità con <code translate="no">rating</code> maggiore o uguale a 4.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">Esempio 6: Filtro con meno o uguale a (<code translate="no">&lt;=</code>)</h3><p>Per trovare le entità con <code translate="no">discount</code> minore o uguale a 10%.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">Operatori di intervallo<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli operatori di intervallo aiutano a filtrare i dati in base a specifici insiemi o intervalli di valori.</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">Operatori di intervallo supportati.</h3><ul>
<li><p><code translate="no">IN</code>: Utilizzati per trovare valori all'interno di un insieme o di un intervallo specifico.</p></li>
<li><p><code translate="no">LIKE</code>: Utilizzati per corrispondere a uno schema (soprattutto per i campi di testo).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">Esempio 1: Uso di <code translate="no">IN</code> per abbinare più valori</h3><p>Se si vogliono trovare tutte le entità in cui <code translate="no">color</code> è &quot;rosso&quot;, &quot;verde&quot; o &quot;blu&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Questo è utile quando si vuole verificare l'appartenenza a un elenco di valori.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">Esempio 2: Uso di <code translate="no">LIKE</code> per la corrispondenza dei modelli</h3><p>L'operatore <code translate="no">LIKE</code> è utilizzato per la corrispondenza di modelli nei campi stringa. Può corrispondere a sottostringhe in diverse posizioni all'interno del testo: come <strong>prefisso</strong>, <strong>infisso</strong> o <strong>suffisso</strong>. L'operatore <code translate="no">LIKE</code> utilizza il simbolo <code translate="no">%</code> come carattere jolly, che può corrispondere a qualsiasi numero di caratteri (incluso zero).</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">Corrispondenza di prefisso (inizia con)</h4><p>Per eseguire una corrispondenza di <strong>prefisso</strong>, in cui la stringa inizia con un determinato schema, è possibile posizionare lo schema all'inizio e utilizzare <code translate="no">%</code> per abbinare tutti i caratteri che lo seguono. Ad esempio, per trovare tutti i prodotti il cui <code translate="no">name</code> inizia con &quot;Prod&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Questo corrisponderà a tutti i prodotti il cui nome inizia con &quot;Prod&quot;, come &quot;Product A&quot;, &quot;Product B&quot;, ecc.</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">Corrispondenza per suffisso (finisce con)</h4><p>Per una corrispondenza di <strong>suffisso</strong>, in cui la stringa termina con un determinato modello, inserire il simbolo <code translate="no">%</code> all'inizio del modello. Ad esempio, per trovare tutti i prodotti il cui <code translate="no">name</code> termina con &quot;XYZ&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Questo corrisponderà a tutti i prodotti il cui nome termina con &quot;XYZ&quot;, come &quot;ProductXYZ&quot;, &quot;SampleXYZ&quot;, ecc.</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">Corrispondenza infissa (contiene)</h4><p>Per eseguire una corrispondenza <strong>infissa</strong>, in cui il modello può apparire in qualsiasi punto della stringa, è possibile inserire il simbolo <code translate="no">%</code> sia all'inizio che alla fine del modello. Ad esempio, per trovare tutti i prodotti il cui <code translate="no">name</code> contiene la parola &quot;Pro&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Questo corrisponde a tutti i prodotti il cui nome contiene la sottostringa &quot;Pro&quot;, come &quot;Product&quot;, &quot;ProLine&quot; o &quot;SuperPro&quot;.</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">Operatori aritmetici<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli operatori aritmetici consentono di creare condizioni basate su calcoli che coinvolgono campi numerici.</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">Operatori aritmetici supportati.</h3><ul>
<li><p><code translate="no">+</code> (Addizione)</p></li>
<li><p><code translate="no">-</code> (Sottrazione)</p></li>
<li><p><code translate="no">*</code> (Moltiplicazione)</p></li>
<li><p><code translate="no">/</code> (Divisione)</p></li>
<li><p><code translate="no">%</code> (Modulo)</p></li>
<li><p><code translate="no">**</code> (Esponenziazione)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">Esempio 1: Uso dell'addizione (<code translate="no">+</code>)</h3><p>Per trovare entità in cui il prezzo <code translate="no">total</code> è la somma di <code translate="no">base_price</code> e <code translate="no">tax</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">Esempio 2: Uso della sottrazione (<code translate="no">-</code>)</h3><p>Per trovare le entità in cui <code translate="no">quantity</code> è superiore a 50 e <code translate="no">quantity_sold</code> è inferiore a 30.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">Esempio 3: Utilizzo della moltiplicazione (<code translate="no">*</code>)</h3><p>Per trovare le entità in cui <code translate="no">price</code> è maggiore di 100 e <code translate="no">quantity</code> è maggiore di 10, moltiplicato.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">Esempio 4: Utilizzo della divisione (<code translate="no">/</code>)</h3><p>Per trovare prodotti in cui <code translate="no">total_price</code> diviso per <code translate="no">quantity</code> è inferiore a 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">Esempio 5: Utilizzo del modulo (<code translate="no">%</code>)</h3><p>Per trovare entità in cui <code translate="no">id</code> è un numero pari (cioè divisibile per 2).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">Esempio 6: Uso dell'esponenziazione (<code translate="no">**</code>)</h3><p>Per trovare le entità in cui <code translate="no">price</code> elevato a potenza di 2 è maggiore di 1000.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">Operatori logici<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli operatori logici vengono utilizzati per combinare più condizioni in un'espressione di filtro più complessa. Questi includono <code translate="no">AND</code>, <code translate="no">OR</code> e <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">Operatori logici supportati.</h3><ul>
<li><p><code translate="no">AND</code>: Combina più condizioni che devono essere tutte vere.</p></li>
<li><p><code translate="no">OR</code>: Combina condizioni in cui almeno una deve essere vera.</p></li>
<li><p><code translate="no">NOT</code>: Annulla una condizione.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">Esempio 1: Uso di <code translate="no">AND</code> per combinare le condizioni</h3><p>Per trovare tutti i prodotti in cui <code translate="no">price</code> è superiore a 100 e <code translate="no">stock</code> è superiore a 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">Esempio 2: Uso di <code translate="no">OR</code> per combinare le condizioni</h3><p>Per trovare tutti i prodotti in cui <code translate="no">color</code> è &quot;rosso&quot; o &quot;blu&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">Esempio 3: Usare <code translate="no">NOT</code> per escludere una condizione</h3><p>Per trovare tutti i prodotti in cui <code translate="no">color</code> non è &quot;verde&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">Suggerimenti per l'uso degli operatori di base con i campi JSON e ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli operatori di base di Milvus sono versatili e possono essere applicati ai campi scalari, ma possono essere utilizzati efficacemente anche con le chiavi e gli indici dei campi JSON e ARRAY.</p>
<p>Ad esempio, se si dispone di un campo <code translate="no">product</code> che contiene più chiavi come <code translate="no">price</code>, <code translate="no">model</code> e <code translate="no">tags</code>, fare sempre riferimento direttamente alla chiave.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Per trovare i record in cui la prima temperatura in un array di temperature registrate supera un determinato valore, utilizzare.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">Conclusione<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offre una serie di operatori di base che consentono di filtrare e interrogare i dati in modo flessibile. Combinando operatori di confronto, di intervallo, aritmetici e logici, è possibile creare potenti espressioni di filtro per restringere i risultati della ricerca e recuperare i dati necessari in modo efficiente.</p>
