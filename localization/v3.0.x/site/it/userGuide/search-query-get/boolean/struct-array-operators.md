---
id: struct-array-operators.md
title: Operatori StructArray
summary: >-
  Gli operatori StructArray filtrano le entità valutando i predicati sui
  sottocampi scalari all'interno di un campo StructArray. Utilizza questa pagina
  come riferimento sintattico per l'operatore `element_filter` e la famiglia di
  operatori `MATCH_*`.
---
<h1 id="StructArray-Operators" class="common-anchor-header">Operatori StructArray<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Gli operatori StructArray filtrano le entità valutando i predicati sui sottocampi scalari all'interno di un campo StructArray. Utilizzare questa pagina come riferimento sintattico per l'operatore " <code translate="no">element_filter</code> " e la famiglia di operatori " <code translate="no">MATCH_*</code> ".</p>
<p>Il filtraggio StructArray prevede due famiglie di operatori:</p>
<table>
<thead>
<tr><th>Famiglia di operatori</th><th>Scopo principale</th><th>Comportamento del risultato</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Corrispondenza Elementi Struct che soddisfano un predicato scalare.</td><td>Nella ricerca a livello di elemento, i risultati corrispondenti possono includere gli offset degli elementi. Nelle query a livello di riga o nella ricerca filtrata, la struttura dei risultati dipende dall’API e dai campi di output.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Seleziona le entità in base al numero di elementi Struct che soddisfano un predicato scalare.</td><td>Filtraggio a livello di riga. Questi operatori non restituiscono di per sé gli offset degli elementi.</td></tr>
</tbody>
</table>
<p>Utilizzare i sottocampi scalari negli operatori StructArray. I sottocampi vettoriali sono utilizzati dai percorsi di ricerca vettoriali e non costituiscono input per i predicati scalari.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">Quando utilizzare quale operatore<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Obiettivo</th><th>Uso</th></tr>
</thead>
<tbody>
<tr><td>Limitare la ricerca vettoriale a livello di elemento agli elementi che soddisfano condizioni scalari.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Soddisfare più condizioni scalari all'interno dello stesso elemento Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Restituire solo le entità in cui almeno un elemento Struct soddisfa un predicato.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Restituire solo le entità in cui tutti gli elementi Struct soddisfano un predicato.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Restituisce solo le entità in cui almeno, al massimo o esattamente <code translate="no">N</code> elementi Struct soddisfano un predicato.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> o <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">Filtro per elemento<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare ` <code translate="no">element_filter(structArrayField, predicate)</code> ` per trovare corrispondenze con gli elementi Struct in un campo StructArray.</p>
<p>All’interno del predicato, utilizzare <code translate="no">$[subfield]</code> per fare riferimento a un sottocampo scalare dell’elemento Struct corrente.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Quando all’interno del predicato vengono utilizzate più condizioni, tutti i riferimenti a ` <code translate="no">$[subfield]</code> ` si applicano allo stesso elemento Struct:</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Quando si combina un predicato a livello di entità con ` <code translate="no">element_filter</code>`, posizionare ` <code translate="no">element_filter</code> ` alla fine dell'espressione:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> può comparire una sola volta in un’espressione di filtro. Non annidare ` <code translate="no">element_filter</code> ` o ` <code translate="no">MATCH_*</code> ` all’interno di un altro ` <code translate="no">element_filter</code>`.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Operatori di corrispondenza per famiglie<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare gli operatori <code translate="no">MATCH_*</code> quando un'entità deve essere selezionata in base al numero di elementi Struct che soddisfano un predicato.</p>
<table>
<thead>
<tr><th>Operatore</th><th>Significato</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>Almeno un elemento Struct soddisfa il predicato.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>Tutti gli elementi Struct soddisfano il predicato.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>Almeno <code translate="no">N</code> elementi Struct soddisfano il predicato.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>Al massimo <code translate="no">N</code> elementi della struttura soddisfano il predicato.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>Esattament <code translate="no">N</code> i elementi Struct soddisfano il predicato.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> sia " <code translate="no">element_filter</code> " che " " possono entrambi indicare che almeno un elemento Struct soddisfa un predicato. Utilizza " <code translate="no">MATCH_ANY</code> " quando è necessario solo un filtro a livello di riga. Utilizza " <code translate="no">element_filter</code> " quando sono necessari vincoli a livello di elemento, come il filtraggio degli elementi Struct che partecipano alla ricerca vettoriale a livello di elemento.</p>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ANY</code> restituisce " <code translate="no">true</code> " se almeno un elemento dello StructArray soddisfa il predicato.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Per uno StructArray vuoto, <code translate="no">MATCH_ANY</code> restituisce <code translate="no">false</code>.</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> restituisce <code translate="no">true</code> se ogni elemento di StructArray soddisfa il predicato.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Per uno StructArray vuoto, <code translate="no">MATCH_ALL</code> restituisce <code translate="no">true</code>.</p>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> restituisce <code translate="no">true</code> se il numero di elementi che soddisfano il predicato è maggiore o uguale a <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Per <code translate="no">MATCH_LEAST</code>, <code translate="no">threshold</code> deve essere un numero intero positivo.</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> restituisce il valore <code translate="no">true</code> se il numero di elementi che soddisfano il predicato è minore o uguale a <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Per <code translate="no">MATCH_MOST</code>, <code translate="no">threshold</code> può essere zero o un numero intero positivo.</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> restituisce il valore <code translate="no">true</code> se il numero di elementi che soddisfano il predicato è esattamente uguale a <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Per <code translate="no">MATCH_EXACT</code>, <code translate="no">threshold</code> può essere zero o un numero intero positivo.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Predicati supportati<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>La sintassi <code translate="no">$[...]</code> rappresenta il valore scalare dell’elemento Struct corrente. Il supporto dei predicati dipende dal tipo di sottocampo scalare.</p>
<table>
<thead>
<tr><th>Tipo di sottocampo</th><th>Supporto dei predicati a livello di elemento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Predicati scalari quali <code translate="no">$[has_code] == true</code> o <code translate="no">!($[has_code] == true)</code>. Evitare espressioni booleane nude quali <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>confronto, intervallo concatenato, <code translate="no">in</code>, <code translate="no">not in</code>, espressioni aritmetiche con <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> o <code translate="no">%</code> seguite da un confronto e combinazioni logiche.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Confronto, intervallo concatenato, <code translate="no">in</code>, <code translate="no">not in</code>, espressioni aritmetiche con <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> o <code translate="no">/</code> seguite da un confronto e combinazioni logiche. L’operatore <code translate="no">%</code> non è supportato per i sottocampi in virgola mobile.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Confronto di stringhe, intervallo concatenato, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> e combinazioni logiche.</td></tr>
<tr><td>Sottocampi vettoriali</td><td>Non supportati come input per i predicati scalari di tipo <code translate="no">$[...]</code>. Utilizzare invece i sottocampi vettoriali tramite la ricerca EmbeddingList o la ricerca vettoriale a livello di elemento.</td></tr>
</tbody>
</table>
<p>Gli operatori logici quali <code translate="no">&amp;&amp;</code>, <code translate="no">\|\|</code> e <code translate="no">!</code> si applicano alle espressioni dei predicati. Ad esempio, scrivere <code translate="no">!($[has_code] == true)</code> anziché <code translate="no">!$[has_code]</code>.</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">Predicati non supportati<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>I predicati a livello di elemento <code translate="no">$[...]</code> non supportano:</p>
<ul>
<li><p>Funzioni di corrispondenza testuale, come <code translate="no">text_match(field, &quot;...&quot;)</code> o <code translate="no">phrase_match(field, &quot;...&quot;)</code>.</p></li>
<li><p>La sintassi dei percorsi JSON, <code translate="no">exists</code> su percorsi JSON o funzioni JSON quali <code translate="no">json_contains</code>, <code translate="no">json_contains_all</code> o <code translate="no">json_contains_any</code>.</p></li>
<li><p>Funzioni relative ai contenitori di array come <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> o <code translate="no">array_length</code>.</p></li>
<li><p><code translate="no">$[subfield] is null</code> oppure <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Funzioni di geometria / GIS.</p></li>
<li><p>Espressioni timestamptz.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Predicati vettoriali a livello di campo.</p></li>
<li><p>Chiamate a funzioni di filtro generiche, a meno che la firma specifica della funzione e il percorso di esecuzione non supportino esplicitamente i predicati a livello di elemento StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Regole sintattiche<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><code translate="no">MATCH_*</code> I nomi degli operatori non distinguono tra maiuscole e minuscole.</p></li>
<li><p>Utilizzare <code translate="no">$[subfield]</code> solo all’interno di predicati <code translate="no">element_filter</code> o <code translate="no">MATCH_*</code>.</p></li>
<li><p>Non utilizzare <code translate="no">$[subfield]</code> come percorso JSON, contenitore di array o riferimento a un campo vettoriale.</p></li>
<li><p>Non annidare <code translate="no">element_filter</code> o <code translate="no">MATCH_*</code> all’interno di un altro operatore StructArray.</p></li>
<li><p>Utilizzare <code translate="no">threshold=N</code> con nome per <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> e <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> su uno StructArray vuoto restituisce <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> su uno StructArray vuoto restituisce <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">Vedi anche<button data-href="#See-also" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><a href="/docs/it/filtered-search-with-structarray.md">Ricerca filtrata con StructArray</a></p></li>
<li><p><a href="/docs/it/basic-vector-search-with-structarray.md">Ricerca vettoriale di base con StructArray</a></p></li>
<li><p><a href="/docs/it/index-structarray-fields.md">Indice dei campi di StructArray</a></p></li>
<li><p><a href="/docs/it/structarray-limits.md">Limiti di StructArray</a></p></li>
</ul>
