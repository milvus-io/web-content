---
id: struct-array-operators.md
title: Operadores StructArray
summary: >-
  Os operadores StructArray filtram entidades através da avaliação de predicados
  em subcampos escalares dentro de um campo StructArray. Utilize esta página
  como referência de sintaxe para o `element_filter`, a família de operadores
  `MATCH_*` e os predicados ao nível da linha em percursos StructArray.
---
<h1 id="StructArray-Operators" class="common-anchor-header">Operadores StructArray<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Os operadores StructArray filtram entidades através da avaliação de predicados em subcampos escalares dentro de um campo StructArray. Utilize esta página como referência de sintaxe para o operador « <code translate="no">element_filter</code> », a família de operadores « <code translate="no">MATCH_*</code> » e os predicados ao nível da linha em percursos StructArray.</p>
<p>A filtragem StructArray tem duas famílias de operadores e um conjunto de predicados de caminho ao nível da linha:</p>
<table>
<thead>
<tr><th>Formulário de filtragem</th><th>Objetivo principal</th><th>Comportamento do resultado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Corresponde a elementos Struct que satisfazem um predicado escalar.</td><td>Na pesquisa ao nível do elemento, os resultados correspondentes podem incluir deslocamentos de elementos. Numa consulta ao nível da linha ou numa pesquisa filtrada, a forma do resultado depende da API e dos campos de saída.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Selecione entidades com base no número de elementos da estrutura que satisfazem um predicado escalar.</td><td>Filtragem ao nível da linha. Estes operadores não devolvem, por si só, deslocamentos de elementos.</td></tr>
<tr><td>Predicados de caminho ao nível da linha</td><td>Teste a posição de um elemento, conte elementos da Struct ou teste valores de subcampos em vários elementos sem um predicado « <code translate="no">$[...]</code> ».</td><td>Filtragem ao nível da linha. Estes predicados não devolvem deslocamentos de elementos.</td></tr>
</tbody>
</table>
<p>Utilize subcampos escalares nos operadores StructArray. Os subcampos vetoriais são utilizados por percursos de pesquisa vetoriais e não constituem entradas para predicados escalares.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">Quando utilizar cada operador<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Escolha um operador de acordo com o seu objetivo de filtragem:</p>
<table>
<thead>
<tr><th>Objetivo</th><th>Utilização</th></tr>
</thead>
<tbody>
<tr><td>Restringir a pesquisa vetorial ao nível do elemento aos elementos que correspondam às condições escalares.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Corresponder a várias condições escalares dentro do mesmo elemento Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Devolver apenas entidades em que pelo menos um elemento Struct satisfaça um predicado.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Devolver apenas as entidades em que todos os elementos Struct satisfaçam um predicado.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Retornar apenas entidades em que, no mínimo, no máximo ou exatamente <code translate="no">N</code> elementos Struct satisfaçam um predicado.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> ou <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>Verificar o elemento Struct numa posição específica, como o primeiro bloco.</td><td>Um caminho posicional, como <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>Filtrar pelo número de elementos Struct numa entidade.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>Verifique se algum elemento da estrutura contém um valor de subcampo, sem combinar condições no mesmo elemento.</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> ou <code translate="no">array_contains_all</code> num caminho de subcampo, como <code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">Dados de exemplo<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Os exemplos parciais de entidades a seguir mostram apenas os campos « <code translate="no">chunks</code> » da <strong>Entidade A</strong> e <strong>da Entidade B</strong>. Não se trata de cargas úteis de inserção completas.</p>
<p><strong>Entidade A</strong>:</p>
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
<p><strong>Entidade B</strong>:</p>
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
<h2 id="Element-Filter" class="common-anchor-header">Filtro de elementos<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize « <code translate="no">element_filter(structArrayField, predicate)</code> » para corresponder elementos «Struct» num campo «StructArray».</p>
<p>Dentro do predicado, utilize « <code translate="no">$[subfield]</code> » para se referir a um subcampo escalar do elemento «Struct» atual.</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Tanto a Entidade A como a Entidade B correspondem: todos os sete elementos apresentados têm « <code translate="no">section</code> » definido como « <code translate="no">&quot;index&quot;</code> ».</p>
<p>Quando são utilizadas várias condições no interior do predicado, todas as referências a « <code translate="no">$[subfield]</code> » aplicam-se ao mesmo elemento Struct:</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>Apenas a Entidade B corresponde: os seus três elementos satisfazem ambas as condições.</p>
<p>Ao combinar um predicado ao nível da entidade com ` <code translate="no">element_filter</code>`, coloque ` <code translate="no">element_filter</code> ` no final da expressão:</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>O exemplo « <code translate="no">category</code> » ilustra a ordem das expressões independentemente dos dados de exemplo, que não definem « <code translate="no">category</code> ».</p>
<p><code translate="no">element_filter</code> pode aparecer apenas uma vez numa expressão de filtro. Não aninhe <code translate="no">element_filter</code> ou <code translate="no">MATCH_*</code> dentro de outro <code translate="no">element_filter</code>.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Operadores da família Match<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize os operadores « <code translate="no">MATCH_*</code> » quando uma entidade deva ser selecionada com base no número de elementos «Struct» que satisfazem um predicado. Os operadores têm os seguintes significados:</p>
<table>
<thead>
<tr><th>Operador</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>Pelo menos um elemento Struct satisfaz o predicado.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>Todos os elementos Struct satisfazem o predicado.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>Pelo menos <code translate="no">N</code> elementos Struct satisfazem o predicado.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>No máximo, <code translate="no">N</code> elementos da Struct satisfazem o predicado.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>Exatamente <code translate="no">N</code> elementos da Struct satisfazem o predicado.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> e « <code translate="no">element_filter</code> » podem ambos expressar que pelo menos um elemento Struct satisfaz um predicado. Utilize « <code translate="no">MATCH_ANY</code> » quando apenas necessitar de filtragem ao nível da linha. Utilize « <code translate="no">element_filter</code> » quando necessitar de restrições ao nível do elemento, tais como filtrar quais os elementos Struct que participam na pesquisa vetorial ao nível do elemento.</p>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> resulta em « <code translate="no">true</code> » se pelo menos um elemento no StructArray satisfizer o predicado.</p>
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Tanto a Entidade A como a Entidade B correspondem, porque cada uma tem pelo menos um elemento com <code translate="no">section</code> definido como <code translate="no">&quot;index&quot;</code>.</p>
<p>Para um StructArray vazio, <code translate="no">MATCH_ANY</code> devolve <code translate="no">false</code>.</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> resulta em « <code translate="no">true</code> » se todos os elementos do StructArray satisfizerem o predicado.</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Tanto a Entidade A como a Entidade B correspondem, porque todos os elementos apresentados têm <code translate="no">has_code</code> definido como <code translate="no">true</code>.</p>
<p>Para um StructArray vazio, <code translate="no">MATCH_ALL</code> devolve <code translate="no">true</code>.</p>
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> resulta em « <code translate="no">true</code> » se o número de elementos que satisfazem o predicado for maior ou igual a « <code translate="no">threshold</code> ».</p>
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>Apenas a Entidade B corresponde: a Entidade A tem zero elementos que satisfazem o predicado e a Entidade B tem três.</p>
<p>Para <code translate="no">MATCH_LEAST</code>, <code translate="no">threshold</code> deve ser um número inteiro positivo.</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> resulta em <code translate="no">true</code> se o número de elementos que satisfazem o predicado for menor ou igual a <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Nenhuma das entidades corresponde: a Entidade A tem quatro elementos que satisfazem o predicado e a Entidade B tem três.</p>
<p>Para <code translate="no">MATCH_MOST</code>, <code translate="no">threshold</code> pode ser zero ou um número inteiro positivo.</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> resulta em <code translate="no">true</code> se o número de elementos que satisfazem o predicado for exatamente igual a <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Nenhuma das entidades corresponde, porque nenhuma tem um elemento com <code translate="no">section</code> definido como <code translate="no">&quot;filter&quot;</code>.</p>
<p>Para ` <code translate="no">MATCH_EXACT</code>`, ` <code translate="no">threshold</code> ` pode ser zero ou um número inteiro positivo.</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">Predicados ao nível da linha em percursos StructArray<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Para além de « <code translate="no">element_filter</code> » e « <code translate="no">MATCH_*</code> », uma expressão de filtro normal pode referenciar diretamente um campo do StructArray ou um dos seus subcampos escalares. Estes predicados são avaliados ao nível da entidade e não devolvem deslocamentos de elementos.</p>
<h3 id="Subfield-access" class="common-anchor-header">Acesso a subcampos<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">Aceder a um elemento Struct por posição</h4><p>Utilize <code translate="no">structArrayField[index][subfield]</code> para referenciar um subcampo escalar do elemento Struct numa posição com início em zero. Escreva primeiro a posição e, em seguida, o nome do subcampo. O caminho invertido <code translate="no">chunks[quality_score][0] &gt; 0.8</code> não é válido.</p>
<p>Por exemplo, teste a pontuação de qualidade do primeiro elemento:</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>Apenas a Entidade B corresponde a esta expressão.</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>Para a Entidade A e a Entidade B, o predicado da primeira secção corresponde a ambas as entidades, o segundo predicado de pontuação corresponde apenas à Entidade B e o intervalo de pontuação estrito não corresponde a nenhuma delas. O predicado <code translate="no">page</code> é um exemplo genérico; os dados de exemplo não definem <code translate="no">page</code>.</p>
<p>Os caminhos posicionais suportam comparação, « <code translate="no">in</code> », « <code translate="no">not in</code> » e predicados de intervalo encadeados em subcampos escalares. Uma entidade não corresponde quando o seu campo «StructArray» não tem nenhum elemento nessa posição.</p>
<h3 id="ARRAY-operators" class="common-anchor-header">Operadores ARRAY<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Count-Struct-elements" class="common-anchor-header">Contar elementos Struct</h4><p>Utilize <code translate="no">array_length(structArrayField)</code> para filtrar pelo número de elementos Struct numa entidade. <code translate="no">array_length</code> num caminho de subcampo, como <code translate="no">array_length(chunks[section])</code>, devolve a mesma contagem, porque cada subcampo contém um valor por elemento Struct.</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p>Os predicados de contagem do campo pai correspondem a ambas as entidades para <code translate="no">&gt;= 3</code> e a nenhuma para <code translate="no">== 1</code>. Também é possível contar valores num caminho de subcampo:</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>Apenas a Entidade B corresponde, porque o seu subcampo « <code translate="no">quality_score</code> » tem três valores.</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">Testar valores de subcampos em vários elementos</h4><p>Por exemplo, verifique se algum índice de qualidade é igual a « <code translate="no">0.74</code> »:</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>Apenas a Entidade A corresponde.</p>
<p>Utilize <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> ou <code translate="no">array_contains_all</code> num caminho de subcampo escalar para testar os valores desse subcampo em todos os elementos Struct da entidade. Cada caminho de subcampo é avaliado individualmente, pelo que as condições em diferentes subcampos podem ser satisfeitas por diferentes elementos Struct.</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>Nos dados de exemplo, as expressões <code translate="no">array_contains</code> e <code translate="no">array_contains_any</code> correspondem a ambas as entidades. A expressão <code translate="no">array_contains_all</code> não corresponde a nenhuma delas, porque nenhuma das entidades possui uma secção <code translate="no">&quot;search&quot;</code>. Estes exemplos não demonstram condições satisfeitas por elementos diferentes em subcampos diferentes.</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> seleciona as mesmas entidades que <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>. Utilize <code translate="no">MATCH_*</code> ou <code translate="no">element_filter</code> quando várias condições tiverem de ser satisfeitas para o mesmo elemento Struct, uma vez que os predicados <code translate="no">$[...]</code> são avaliados por elemento.</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Verificar se um campo StructArray nulo é nulo<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize <code translate="no">IS NULL</code> ou <code translate="no">IS NOT NULL</code> num campo StructArray nulo para testar o valor do campo na sua totalidade. O valor NULL aplica-se a todo o campo StructArray, pelo que estes predicados aceitam apenas o nome do campo, e não um caminho de subcampo.</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>Para saber se são aplicáveis, consulte <a href="/docs/pt/structarray-limits.md#Nullable-and-dynamic-schema-limits">«Limites de esquemas nulos e dinâmicos</a>». A Entidade A e a Entidade B têm ambas valores StructArray não nulos.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Predicados suportados<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>A sintaxe « <code translate="no">$[...]</code> » representa o valor escalar do elemento Struct atual. O suporte aos predicados depende do tipo do subcampo escalar:</p>
<table>
<thead>
<tr><th>Tipo de subcampo</th><th>Suporte a predicados ao nível do elemento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Predicados escalares, tais como <code translate="no">$[has_code] == true</code> ou <code translate="no">!($[has_code] == true)</code>. Evite expressões booleanas simples, tais como <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>comparação, intervalo encadeado, <code translate="no">in</code>, <code translate="no">not in</code>, expressões aritméticas com <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> ou <code translate="no">%</code> seguidas de comparação e combinações lógicas.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Comparação, intervalo encadeado, <code translate="no">in</code>, <code translate="no">not in</code>, expressões aritméticas com <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> ou <code translate="no">/</code> seguidas de comparação e combinações lógicas. O operador <code translate="no">%</code> não é suportado para subcampos de ponto flutuante.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Comparação de cadeias de caracteres, intervalos encadeados, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> e combinações lógicas.</td></tr>
<tr><td>Subcampos vetoriais</td><td>Não são suportados como entradas de predicados escalares do tipo « <code translate="no">$[...]</code> ». Em vez disso, utilize subcampos vetoriais através da pesquisa EmbeddingList ou da pesquisa vetorial ao nível do elemento.</td></tr>
</tbody>
</table>
<p>Operadores lógicos como « <code translate="no">&amp;&amp;</code> », « <code translate="no">||</code> » e « <code translate="no">!</code> » aplicam-se a expressões de predicado. Por exemplo, escreva « <code translate="no">!($[has_code] == true)</code> » em vez de « <code translate="no">!$[has_code]</code> ».</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">Predicados não suportados<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Os predicados « <code translate="no">$[...]</code> » ao nível do elemento não suportam:</p>
<ul>
<li><p>Funções de correspondência de texto, tais como <code translate="no">text_match(field, &quot;...&quot;)</code> ou <code translate="no">phrase_match(field, &quot;...&quot;)</code>.</p></li>
<li><p>Sintaxe de caminho JSON, <code translate="no">exists</code> em caminhos JSON ou funções JSON, tais como <code translate="no">json_contains</code>, <code translate="no">json_contains_all</code> ou <code translate="no">json_contains_any</code>.</p></li>
<li><p>Funções de contentores de matrizes, tais como <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> ou <code translate="no">array_length</code> em <code translate="no">$[subfield]</code>. Em vez disso, utilize estas funções num caminho de subcampo, como <code translate="no">chunks[section]</code>, num predicado ao nível da linha.</p></li>
<li><p><code translate="no">$[subfield] is null</code> ou <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Funções de geometria/SIG.</p></li>
<li><p>Expressões de carimbo de data/hora (timestamptz).</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Predicados vetoriais ao nível do campo.</p></li>
<li><p>Chamadas a funções de filtro genéricas, a menos que a assinatura específica da função e o caminho de execução suportem explicitamente predicados ao nível dos elementos de StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Regras de sintaxe<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Siga estas regras de sintaxe:</p>
<ul>
<li><p><code translate="no">MATCH_*</code> os nomes dos operadores não distinguem maiúsculas de minúsculas.</p></li>
<li><p>Utilize « <code translate="no">$[subfield]</code> » apenas dentro de predicados « <code translate="no">element_filter</code> » ou « <code translate="no">MATCH_*</code> ». Por exemplo, « <code translate="no">array_length($[section])</code> » é rejeitado.</p></li>
<li><p>Não utilize « <code translate="no">$[subfield]</code> » como caminho JSON, contentor de matriz ou referência a um campo vetorial.</p></li>
<li><p>Não aninhe <code translate="no">element_filter</code> ou <code translate="no">MATCH_*</code> dentro de outro operador StructArray.</p></li>
<li><p>Utilize <code translate="no">threshold=N</code> com nome para <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> e <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p>Em caminhos posicionais, escreva a posição do elemento antes do nome do subcampo: <code translate="no">chunks[0][section]</code>, e não <code translate="no">chunks[section][0]</code>.</p></li>
<li><p>Utilize <code translate="no">IS NULL</code> e <code translate="no">IS NOT NULL</code> apenas no campo StructArray completo, como <code translate="no">chunks is null</code>. Não os utilize num caminho de subcampo, como <code translate="no">chunks[section]</code>, nem em <code translate="no">$[subfield]</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> num StructArray vazio, devolve <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> num StructArray vazio, devolve <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">Ver também<button data-href="#See-also" class="anchor-icon" translate="no">
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
    </button></h2><p>Para orientações relacionadas, consulte:</p>
<ul>
<li><p><a href="/docs/pt/filtered-search-with-structarray.md">Pesquisa filtrada com StructArray</a></p></li>
<li><p><a href="/docs/pt/basic-vector-search-with-structarray.md">Pesquisa vetorial básica com StructArray</a></p></li>
<li><p><a href="/docs/pt/index-structarray-fields.md">Indexar campos do StructArray</a></p></li>
<li><p><a href="/docs/pt/structarray-limits.md">Limites do StructArray</a></p></li>
</ul>
