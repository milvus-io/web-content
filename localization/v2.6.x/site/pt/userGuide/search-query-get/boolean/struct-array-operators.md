---
id: struct-array-operators.md
title: Operadores de StructArrayCompatible with Milvus 3.0.x
summary: >-
  Utilize filtros de elementos e operadores de família de correspondência para
  filtrar subcampos escalares dentro de campos StructArray.
beta: Milvus 3.0.x
---
<h1 id="StructArray-Operators" class="common-anchor-header">Operadores de StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>O Array de Structs, ou StructArray, em uma entidade armazena um conjunto ordenado de elementos Struct. Cada Struct no Array compartilha o mesmo esquema predefinido, que compreende vários vetores e campos escalares. Quando um subcampo escalar num Struct é indexado, pode utilizar <strong>filtros de elementos</strong> e <strong>operadores na família de correspondências</strong> para efetuar uma filtragem escalar no mesmo.</p>
<p>Um filtro de elementos seleciona entidades que contêm pelo menos um valor num campo StructArray que corresponde ao predicado especificado. Por outro lado, os operadores da família de correspondência são utilizados para encontrar entidades que contenham números específicos ou proporções de valores num campo StructArray que corresponda ao predicado especificado.</p>
<div class="alert note">
<p>Ao criar predicados em <code translate="no">$[subField]</code>, certifique-se de que o subcampo é indexado se estiver a trabalhar com conjuntos de dados de grande escala, uma vez que estes operadores requerem a iteração através dos elementos da matriz para cada entidade candidata.</p>
</div>
<h2 id="Element-filter" class="common-anchor-header">Filtro de elementos<button data-href="#Element-filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize filtros de elementos quando precisar de verificar se uma entidade contém os valores que correspondem a um predicado específico no seu campo StructArray.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Como mostrado na expressão de filtro de elemento acima, o filtro de elemento retorna entidades que contêm pelo menos um pedaço que começa com "Red" no subcampo <code translate="no">text</code>. O primeiro parâmetro é o nome do campo StructArray, enquanto o segundo parâmetro é o predicado que se aplica ao subcampo Struct.</p>
<p>Pode utilizar operadores de comparação, de intervalo e aritméticos para criar a condição, e operadores lógicos para concatenar várias condições, como mostrado em <a href="/docs/pt/v2.6.x/basic-operators.md">Operadores básicos</a>.</p>
<p>No entanto, quando constrói uma expressão de filtro que combina um predicado ao nível da entidade e um filtro de elementos, deve colocar sempre o filtro de elementos no final, como se mostra no exemplo seguinte.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Match-family-operators" class="common-anchor-header">Operadores de família de correspondência<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Os operadores de família de correspondência também funcionam num campo StructArray. Em vez de simplesmente verificar se um elemento existe, pode determinar quantos elementos (ou que proporção) devem satisfazer um predicado de elemento.</p>
<ul>
<li><p><a href="/docs/pt/v2.6.x/struct-array-operators.md#MATCHANY"><code translate="no">MATCH_ANY(identifier, predicate)</code></a>: retorna entidades que contêm pelo menos um pedaço que começa com "Red" no subcampo <code translate="no">text</code>; semanticamente, isso é equivalente a <code translate="no">element_filter</code>.</p></li>
<li><p><a href="/docs/pt/v2.6.x/struct-array-operators.md#MATCHALL"><code translate="no">MATCH_ALL(identifier, predicate)</code></a>Retorna entidades cujos subcampos de texto em todos os pedaços começam com "Vermelho".</p></li>
<li><p><a href="/docs/pt/v2.6.x/struct-array-operators.md#MATCHLEAST"><code translate="no">MATCH_LEAST(identifier, predicate, k)</code></a><code translate="no">k</code>: devolve entidades que contêm pelo menos partes que começam com "Red" no subcampo <code translate="no">text</code>.</p></li>
<li><p><a href="/docs/pt/v2.6.x/struct-array-operators.md#MATCHMOST"><code translate="no">MATCH_MOST(identifier, predicate, k)</code></a>Retorna entidades que contêm no máximo <code translate="no">k</code> pedaços que começam com "Red" no subcampo <code translate="no">text</code>.</p></li>
<li><p><a href="/docs/pt/v2.6.x/struct-array-operators.md#MATCHEXACT"><code translate="no">MATCH_EXACT(identifier, predicate, k)</code></a>MATCH_ANY: devolve entidades que contêm exatamente <code translate="no">k</code> partes que começam por "Red" no subcampo <code translate="no">text</code>.</p></li>
</ul>
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
    </button></h3><p>Este operador é avaliado como verdadeiro se <strong>pelo menos um</strong> elemento na matriz satisfaz o predicado, o que indica que o equivalente estrutural de um <code translate="no">OR</code> lógico em todos os elementos da matriz.</p>
<p>Os operadores MATCH_ANY e os filtros de elementos são semanticamente iguais e podem ser utilizados indistintamente. Quando precisar de exprimir a lógica <code translate="no">count(matches) &gt;= 1</code>, deve utilizá-los.</p>
<p><strong>EXEMPLO:</strong></p>
<p>O exemplo a seguir retorna entidades em que qualquer parte do documento começa com "Red".</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Este operador é avaliado como verdadeiro apenas se <strong>todos os</strong> elementos da matriz satisfizerem o predicado.</p>
<p>Quando você precisa expressar a lógica <code translate="no">count(matches) == total elements</code>, use este operador.</p>
<p><strong>EXEMPLO:</strong></p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Este operador é um filtro quantitativo que devolve verdadeiro se o número de elementos que satisfazem o predicado for <strong>maior ou igual a</strong> uma constante especificada <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p>Quando precisar de exprimir a lógica <code translate="no">count(matches) &gt;= k</code>, utilize este operador.</p>
<p><strong>EXEMPLO:</strong></p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Este operador é um filtro quantitativo que devolve verdadeiro se o número de elementos que satisfazem o predicado for <strong>menor ou igual a</strong> uma constante especificada <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p>Isto é particularmente útil para filtrar as entidades que visam demasiado uma palavra-chave específica (redução de ruído).</p>
<p><strong>EXEMPLO:</strong></p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Este operador é o operador quantitativo mais restritivo da família. Ele retorna verdadeiro se e somente se o número de elementos que satisfazem o predicado é <strong>exatamente</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p><strong>EXEMPLO:</strong></p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
