---
id: struct-array-operators.md
title: Operatori StructArray
summary: >-
  Gli operatori StructArray filtrano le entità valutando i predicati sui
  sottocampi scalari all'interno di un campo StructArray. Utilizza questa pagina
  come riferimento sintattico per element_filter, la famiglia di operatori
  MATCH_* e i predicati a livello di riga sui percorsi StructArray.
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
    </button></h1><p>Gli operatori StructArray filtrano le entità valutando i predicati sui sottocampi scalari all'interno di un campo StructArray. Utilizzare questa pagina come riferimento sintattico per l'operatore ` <code translate="no">element_filter</code>`, la famiglia di operatori ` <code translate="no">MATCH_*</code> ` e i predicati a livello di riga sui percorsi StructArray.</p>
<p>Il filtraggio StructArray prevede due famiglie di operatori e un insieme di predicati di percorso a livello di riga:</p>
<table>
<thead>
<tr><th>Modulo di filtro</th><th>Scopo principale</th><th>Comportamento del risultato</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Corrispondenza Elementi Struct che soddisfano un predicato scalare.</td><td>Nella ricerca a livello di elemento, i risultati corrispondenti possono includere gli offset degli elementi. Nelle query a livello di riga o nella ricerca filtrata, la struttura dei risultati dipende dall’API e dai campi di output.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Seleziona le entità in base al numero di elementi Struct che soddisfano un predicato scalare.</td><td>Filtraggio a livello di riga. Questi operatori non restituiscono di per sé gli offset degli elementi.</td></tr>
<tr><td>Predicati di percorso a livello di riga</td><td>Verifica la posizione di un elemento, conta gli elementi Struct o verifica i valori dei sottocampi tra gli elementi senza un predicato " <code translate="no">$[...]</code> ".</td><td>Filtraggio a livello di riga. Questi predicati non restituiscono offset degli elementi.</td></tr>
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
    </button></h2><p>Scegliere un operatore in base all’obiettivo di filtraggio:</p>
<table>
<thead>
<tr><th>Obiettivo</th><th>Utilizzo</th></tr>
</thead>
<tbody>
<tr><td>Limitare la ricerca vettoriale a livello di elemento agli elementi che soddisfano le condizioni scalari.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Soddisfare più condizioni scalari all'interno dello stesso elemento Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Restituisce solo le entità in cui almeno un elemento Struct soddisfa un predicato.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Restituire solo le entità in cui tutti gli elementi Struct soddisfano un predicato.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Restituisce solo le entità in cui almeno, al massimo o esattamente <code translate="no">N</code> elementi Struct soddisfano un predicato.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> o <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>Controlla l'elemento Struct in una posizione specifica, come il primo blocco.</td><td>Un percorso posizionale come <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>Filtra in base al numero di elementi Struct presenti in un'entità.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>Verifica se un elemento della struttura contiene un valore di sottocampo, senza combinare condizioni sullo stesso elemento.</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> o <code translate="no">array_contains_all</code> su un percorso di sottocampo come <code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">Dati di esempio<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>I seguenti esempi parziali di entità mostrano solo i campi <code translate="no">chunks</code> <strong>dell’Entità A</strong> e <strong>dell’Entità B</strong>. Non si tratta di payload di inserimento completi.</p>
<p><strong>Entità A</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.74</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.72</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.83</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.87</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Entità B</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.95</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.97</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Element-Filter" class="common-anchor-header">Filtro degli elementi<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare <code translate="no">element_filter(structArrayField, predicate)</code> per trovare corrispondenze con gli elementi Struct in un campo StructArray.</p>
<p>All’interno del predicato, utilizzare ` <code translate="no">$[subfield]</code> ` per fare riferimento a un sottocampo scalare dell’elemento Struct corrente.</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Sia l’Entità A che l’Entità B soddisfano la condizione: tutti e sette gli elementi mostrati hanno ` <code translate="no">section</code> ` impostato su ` <code translate="no">&quot;index&quot;</code>`.</p>
<p>Quando all’interno del predicato vengono utilizzate più condizioni, tutti i riferimenti a ` <code translate="no">$[subfield]</code> ` si applicano allo stesso elemento Struct:</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>Solo l’Entità B soddisfa le condizioni: tutti e tre i suoi elementi soddisfano entrambe le condizioni.</p>
<p>Quando si combina un predicato a livello di entità con ` <code translate="no">element_filter</code>`, posizionare ` <code translate="no">element_filter</code> ` alla fine dell’espressione:</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>L’esempio <code translate="no">category</code> illustra l’ordinamento delle espressioni indipendentemente dai dati di esempio, che non definiscono <code translate="no">category</code>.</p>
<p><code translate="no">element_filter</code> può comparire solo una volta in un’espressione di filtro. Non annidare <code translate="no">element_filter</code> o <code translate="no">MATCH_*</code> all’interno di un altro <code translate="no">element_filter</code>.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Operatori della famiglia Match<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare gli operatori <code translate="no">MATCH_*</code> quando un'entità deve essere selezionata in base al numero di elementi Struct che soddisfano un predicato. Gli operatori hanno i seguenti significati:</p>
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
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Sia l’Entità A che l’Entità B corrispondono perché ciascuna ha almeno un elemento con <code translate="no">section</code> impostato su <code translate="no">&quot;index&quot;</code>.</p>
<p>Per un StructArray vuoto, <code translate="no">MATCH_ANY</code> restituisce <code translate="no">false</code>.</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> restituisce <code translate="no">true</code> se ogni elemento dello StructArray soddisfa il predicato.</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Sia l’Entità A che l’Entità B corrispondono perché ogni elemento mostrato ha <code translate="no">has_code</code> impostato su <code translate="no">true</code>.</p>
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
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>Solo l’Entità B soddisfa la condizione: l’Entità A ha zero elementi qualificanti, mentre l’Entità B ne ha tre.</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> restituisce <code translate="no">true</code> se il numero di elementi che soddisfano il predicato è minore o uguale a <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Nessuna delle due entità soddisfa i criteri: l’entità A ha quattro elementi qualificanti, mentre l’entità B ne ha tre.</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> restituisce <code translate="no">true</code> se il numero di elementi che soddisfano il predicato è esattamente uguale a <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Nessuna delle due entità corrisponde perché nessuna delle due ha un elemento con <code translate="no">section</code> impostato su <code translate="no">&quot;filter&quot;</code>.</p>
<p>Per <code translate="no">MATCH_EXACT</code>, <code translate="no">threshold</code> può essere zero o un numero intero positivo.</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">Predicati a livello di riga sui percorsi StructArray<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Oltre a ` <code translate="no">element_filter</code> ` e ` <code translate="no">MATCH_*</code>`, un'espressione di filtro regolare può fare riferimento direttamente a un campo di StructArray o a uno dei suoi sottocampi scalari. Questi predicati vengono valutati a livello di entità e non restituiscono offset degli elementi.</p>
<h3 id="Subfield-access" class="common-anchor-header">Accesso ai sottocampi<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">Accesso a un elemento Struct in base alla posizione</h4><p>Utilizzare <code translate="no">structArrayField[index][subfield]</code> per fare riferimento a un sottocampo scalare dell’elemento Struct in una posizione a partire da zero. Scrivere prima la posizione, poi il nome del sottocampo. Il percorso inverso <code translate="no">chunks[quality_score][0] &gt; 0.8</code> non è valido.</p>
<p>Ad esempio, per verificare il punteggio di qualità del primo elemento:</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>Solo l’Entità B corrisponde a questa espressione.</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>Per l’Entità A e l’Entità B, il primo predicato di sezione corrisponde a entrambe le entità, il secondo predicato di punteggio corrisponde solo all’Entità B e l’intervallo di punteggio rigoroso non corrisponde a nessuna delle due. Il predicato <code translate="no">page</code> è un esempio generico; i dati di esempio non definiscono <code translate="no">page</code>.</p>
<p>I percorsi posizionali supportano il confronto, i predicati " <code translate="no">in</code>", " <code translate="no">not in</code>" e gli intervalli concatenati sui sottocampi scalari. Un'entità non corrisponde quando il suo campo StructArray non ha alcun elemento in quella posizione.</p>
<h3 id="ARRAY-operators" class="common-anchor-header">Operatori ARRAY<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Count-Struct-elements" class="common-anchor-header">Conteggio degli elementi Struct</h4><p>Utilizzare <code translate="no">array_length(structArrayField)</code> per filtrare in base al numero di elementi Struct in un'entità. <code translate="no">array_length</code> su un percorso di sottocampo, come <code translate="no">array_length(chunks[section])</code>, restituisce lo stesso conteggio, poiché ogni sottocampo contiene un valore per ogni elemento Struct.</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p>I predicati di conteggio del campo padre corrispondono a entrambe le entità per <code translate="no">&gt;= 3</code> e a nessuna per <code translate="no">== 1</code>. È inoltre possibile contare i valori su un percorso di sottocampo:</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>Solo l’entità B soddisfa il criterio, poiché il suo sottocampo <code translate="no">quality_score</code> contiene tre valori.</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">Verifica i valori dei sottocampi tra gli elementi</h4><p>Ad esempio, verificare se un punteggio di qualità è uguale a <code translate="no">0.74</code>:</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>Solo l’Entità A corrisponde.</p>
<p>Utilizzare <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> o <code translate="no">array_contains_all</code> su un percorso di sottocampo scalare per verificare i valori di quel sottocampo su tutti gli elementi Struct dell’entità. Ogni percorso di sottocampo viene valutato separatamente, quindi le condizioni su sottocampi diversi possono essere soddisfatte da elementi Struct diversi.</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>Per i dati di esempio, le espressioni <code translate="no">array_contains</code> e <code translate="no">array_contains_any</code> corrispondono a entrambe le entità. L’espressione <code translate="no">array_contains_all</code> non corrisponde a nessuna delle due, poiché nessuna delle entità presenta una sezione <code translate="no">&quot;search&quot;</code>. Questi esempi non illustrano condizioni soddisfatte da elementi diversi su sottocampi diversi.</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> seleziona le stesse entità di <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>. Utilizzare <code translate="no">MATCH_*</code> o <code translate="no">element_filter</code> quando devono essere soddisfatte diverse condizioni per lo stesso elemento Struct, poiché i predicati <code translate="no">$[...]</code> vengono valutati per ogni singolo elemento.</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Verifica se un campo StructArray nullabile è nullo<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare <code translate="no">IS NULL</code> o <code translate="no">IS NOT NULL</code> su un campo StructArray nullabile per verificare il valore dell’intero campo. Il valore NULL si applica all’intero campo StructArray, pertanto questi predicati accettano solo il nome del campo, non un percorso di sottocampo.</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>Per informazioni sull’applicabilità, consultare <a href="/docs/it/structarray-limits.md#Nullable-and-dynamic-schema-limits">Limiti relativi agli schemi dinamici e nullabili</a>. L’Entità A e l’Entità B hanno entrambe valori StructArray non NULL.</p>
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
    </button></h2><p>La sintassi ` <code translate="no">$[...]</code> ` rappresenta il valore scalare dell’elemento Struct corrente. Il supporto dei predicati dipende dal tipo di sottocampo scalare:</p>
<table>
<thead>
<tr><th>Tipo di sottocampo</th><th>Supporto dei predicati a livello di elemento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Predicati scalari come <code translate="no">$[has_code] == true</code> o <code translate="no">!($[has_code] == true)</code>. Evitare espressioni booleane nude come <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>confronto, intervallo concatenato, <code translate="no">in</code>, <code translate="no">not in</code>, espressioni aritmetiche con <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> o <code translate="no">%</code> seguite da un confronto, e combinazioni logiche.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Confronto, intervallo concatenato, <code translate="no">in</code>, <code translate="no">not in</code>, espressioni aritmetiche con <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> o <code translate="no">/</code> seguite da un confronto e combinazioni logiche. L’operatore <code translate="no">%</code> non è supportato per i sottocampi in virgola mobile.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Confronto di stringhe, intervallo concatenato, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> e combinazioni logiche.</td></tr>
<tr><td>Sottocampi vettoriali</td><td>Non supportati come input per predicati scalari di tipo <code translate="no">$[...]</code>. Utilizzare invece i sottocampi vettoriali tramite la ricerca EmbeddingList o la ricerca vettoriale a livello di elemento.</td></tr>
</tbody>
</table>
<p>Gli operatori logici quali <code translate="no">&amp;&amp;</code>, <code translate="no">||</code> e <code translate="no">!</code> si applicano alle espressioni dei predicati. Ad esempio, scrivere <code translate="no">!($[has_code] == true)</code> anziché <code translate="no">!$[has_code]</code>.</p>
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
<li><p>Funzioni relative ai contenitori array quali <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> o <code translate="no">array_length</code> su <code translate="no">$[subfield]</code>. Utilizzare invece queste funzioni su un percorso di sottocampo come <code translate="no">chunks[section]</code> in un predicato a livello di riga.</p></li>
<li><p><code translate="no">$[subfield] is null</code> oppure <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Funzioni geometriche / GIS.</p></li>
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
    </button></h2><p>Attenersi alle seguenti regole sintattiche:</p>
<ul>
<li><p><code translate="no">MATCH_*</code> i nomi degli operatori non distinguono tra maiuscole e minuscole.</p></li>
<li><p>Utilizzare <code translate="no">$[subfield]</code> solo all'interno di predicati <code translate="no">element_filter</code> o <code translate="no">MATCH_*</code>. Ad esempio, <code translate="no">array_length($[section])</code> viene rifiutato.</p></li>
<li><p>Non utilizzare ` <code translate="no">$[subfield]</code> ` come percorso JSON, contenitore di array o riferimento a un campo vettoriale.</p></li>
<li><p>Non annidare <code translate="no">element_filter</code> o <code translate="no">MATCH_*</code> all'interno di un altro operatore StructArray.</p></li>
<li><p>Utilizzare <code translate="no">threshold=N</code> con nome per <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> e <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p>Nei percorsi posizionali, scrivere la posizione dell’elemento prima del nome del sottocampo: <code translate="no">chunks[0][section]</code>, non <code translate="no">chunks[section][0]</code>.</p></li>
<li><p>Utilizzare <code translate="no">IS NULL</code> e <code translate="no">IS NOT NULL</code> solo sul campo StructArray completo, ad esempio <code translate="no">chunks is null</code>. Non utilizzarli su un percorso di sottocampo come <code translate="no">chunks[section]</code> o su <code translate="no">$[subfield]</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> su uno StructArray vuoto restituisce <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> Su uno StructArray vuoto restituisce <code translate="no">true</code>.</p></li>
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
    </button></h2><p>Per indicazioni correlate, consultare:</p>
<ul>
<li><p><a href="/docs/it/filtered-search-with-structarray.md">Ricerca filtrata con StructArray</a></p></li>
<li><p><a href="/docs/it/basic-vector-search-with-structarray.md">Ricerca vettoriale di base con StructArray</a></p></li>
<li><p><a href="/docs/it/index-structarray-fields.md">Indice dei campi di StructArray</a></p></li>
<li><p><a href="/docs/it/structarray-limits.md">Limiti di StructArray</a></p></li>
</ul>
