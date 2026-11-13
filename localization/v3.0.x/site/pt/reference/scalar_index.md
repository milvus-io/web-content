---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Os índices escalares aceleram a filtragem em campos não vetoriais. Esta
  referência explica como o Milvus seleciona os índices escalares, quais os
  tipos de índice que pode especificar e os tipos de dados que cada índice
  suporta.
title: Índice escalar
---
<h1 id="Scalar-Index" class="common-anchor-header">Índice escalar<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Os índices escalares aceleram a filtragem em campos não vetoriais, tais como categorias, preços, carimbos de data/hora e localizações. Quando uma expressão de filtro restringe uma pesquisa, um índice escalar permite que o Milvus localize as entidades correspondentes sem ter de analisar o campo.</p>
<p>Se não tiver a certeza de qual o índice a escolher, utilize <code translate="no">AUTOINDEX</code>. Especifique manualmente um tipo de índice apenas quando necessitar de um comportamento específico.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">Escolher um índice escalar<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela seguinte apresenta o índice que o Milvus seleciona por predefinição quando utiliza <code translate="no">AUTOINDEX</code>, juntamente com os tipos de índice que pode especificar manualmente para cada tipo de dados.</p>
<table>
<thead>
<tr><th>Tipo de dados</th><th>Padrão do AUTOINDEX</th><th>Tipos de índice manuais</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> com um escalar tipado ou uma conversão de matriz</td><td><code translate="no">HYBRID</code></td><td>Depende de <code translate="no">json_cast_type</code>; consulte <a href="#JSON-field-indexing">a indexação de campos JSON</a>.</td></tr>
<tr><td><code translate="no">JSON</code> com <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> através de <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Não suportado</td><td>Nenhum</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> é uma estratégia interna, não um tipo que possa especificar diretamente. Consulte <a href="#How-AUTOINDEX-selects">Como o AUTOINDEX seleciona</a>.</p>
<p>Aplicam-se as seguintes restrições:</p>
<ul>
<li><strong>Chaves primárias:</strong> ` <code translate="no">BITMAP</code> ` não está disponível em campos de chave primária.</li>
<li><strong>Matrizes:</strong> As matrizes recursivas e as matrizes com elementos nulos não suportam indexação escalar, incluindo o <code translate="no">AUTOINDEX</code>. As matrizes normais suportam elementos booleanos, inteiros, de ponto flutuante e VARCHAR.</li>
<li><strong>Matrizes de estruturas:</strong> Indexe os subcampos escalares individualmente. O seu suporte pode diferir do das matrizes comuns; por exemplo, um subcampo de estrutura booleana não suporta o <code translate="no">STL_SORT</code> explícito.</li>
<li><strong>TEXT:</strong> Os índices escalares criados pelo utilizador, incluindo <code translate="no">AUTOINDEX</code>, não estão disponíveis. A análise de texto e a pesquisa BM25 utilizam mecanismos distintos.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Tipos de índice<button data-href="#Index-types" class="anchor-icon" translate="no">
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
<tr><th>Tipo de índice</th><th>Para que serve</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Filtros de igualdade, pertença e intervalo de uso geral.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Campos com poucos valores distintos; filtragem bit a bit compacta.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Pesquisas de valores ordenados e filtragem por intervalo.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Igualdade de cadeias de caracteres e correspondência de prefixos.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>LIKE e expressões regulares em cadeias de caracteres, restringindo os candidatos.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Correspondência exata de prefixos, sufixos e subcadeias infixas.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>Filtragem espacial em campos GEOMETRY.</td></tr>
</tbody>
</table>
<p>Para exemplos de criação, parâmetros de índice e consultas suportadas, consulte <a href="/docs/pt/bitmap.md">BITMAP</a>, <a href="/docs/pt/inverted.md">INVERTED</a>, <a href="/docs/pt/ngram.md">NGRAM</a>, <a href="/docs/pt/stl-sort.md">STL_SORT</a>, <a href="/docs/pt/trie.md">TRIE</a>, <a href="/docs/pt/fmindex.md">FMINDEX</a> e <a href="/docs/pt/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">Como o AUTOINDEX seleciona<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>Com o ` <code translate="no">AUTOINDEX</code>`, o Milvus seleciona um índice com base no tipo de campo, na configuração do servidor e, para alguns campos, no número de valores distintos (cardinalidade). As seleções predefinidas estão listadas em <a href="#Choosing-a-scalar-index">«Escolher um índice escalar</a>».</p>
<p>Para a maioria dos campos, o « <code translate="no">AUTOINDEX</code> » utiliza uma estratégia interna de « <code translate="no">HYBRID</code> » que seleciona um índice com base na cardinalidade:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> quando uma compilação contém menos de 100 valores distintos.</li>
<li><strong><code translate="no">STL_SORT</code></strong> quando uma compilação contém 100 ou mais valores distintos.</li>
</ul>
<p>Os índices de matriz utilizam uma política de compatibilidade separada: o seu ramo de alta cardinalidade utiliza « <code translate="no">STL_SORT</code> » quando o cluster o suporta e « <code translate="no">INVERTED</code> » nos restantes casos. Consulte <a href="#Version-compatibility">«Compatibilidade de versões</a>».</p>
<p><code translate="no">HYBRID</code> é apenas interna — não é possível especificá-la diretamente. Uma seleção interna também pode utilizar um índice que não esteja disponível como opção explícita para esse campo, como a indexação de bitmap para valores de ponto flutuante.</p>
<blockquote>
<p>Estas seleções são predefinições. Os administradores podem alterá-las através de <code translate="no">scalarAutoIndex.params.build</code>. A definição <code translate="no">scalarAutoIndex.enable</code> tem como predefinição <code translate="no">false</code>, o que continua a permitir a seleção explícita <code translate="no">AUTOINDEX</code> quando o tipo de índice é omitido; defini-la como <code translate="no">true</code> também aplica a seleção automática a pedidos manuais que, de outra forma, seriam válidos.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">Indexação de campos JSON<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>Para indexar valores JSON, especifique <code translate="no">json_cast_type</code> para indicar o tipo de valores a indexar. Este parâmetro é obrigatório tanto para a indexação automática como para a manual. Utilize <code translate="no">json_path</code> para identificar o caminho; se omitido, o Milvus utiliza o nome do campo fornecido na solicitação.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>Padrão do AUTOINDEX</th><th>Tipos de indexação manual</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p>A conversão ` <code translate="no">JSON</code> ` seleciona a indexação JSON completa em vez de um índice de caminho escalar tipado e altera o valor predefinido de ` <code translate="no">AUTOINDEX</code> ` de ` <code translate="no">HYBRID</code> ` para ` <code translate="no">INVERTED</code>`.</p>
<p>O conversor opcional ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` converte valores de cadeia de caracteres para uma conversão ` <code translate="no">DOUBLE</code> `. Não pode ser utilizado com outros tipos de conversão. Nem ` <code translate="no">TRIE</code> ` nem ` <code translate="no">FMINDEX</code> ` suportam campos JSON.</p>
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
    </button></h2><p>As tabelas seguintes mostram quais os predicados que cada índice pode ajudar a avaliar. <strong>O suporte do índice não garante que o Milvus utilize o índice em todas as consultas.</strong> O Milvus pode analisar os dados dos campos quando o índice não for adequado para uma determinada expressão ou padrão.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">Comparações e pertença<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>A igualdade e a pertença incluem <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">in</code> e <code translate="no">not in</code>. As comparações de intervalo incluem <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code> e expressões como <code translate="no">10 &lt;= price &lt; 50</code>.</p>
<table>
<thead>
<tr><th>Tipo de índice</th><th>Tipos de dados de campo</th><th>Predicados suportados pelo índice</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>Igualdade e pertença</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>Inteiros, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Igualdade, pertença e intervalos</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>Igualdade e pertença</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Números inteiros, <code translate="no">VARCHAR</code></td><td>Igualdade, pertença e intervalos</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Números inteiros, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>Igualdade, pertença e intervalos</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>Igualdade, pertença e intervalos; a avaliação de intervalos pode percorrer várias cadeias indexadas</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>Apenas padrões de cadeias de caracteres; não é possível a verificação direta de igualdade, pertença ou intervalos</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>Apenas padrões de cadeia de caracteres; sem pesquisa direta de igualdade, pertença ou intervalo</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>Predicados espaciais, listados abaixo</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>Tipos escalares suportados</td><td>Depende do índice selecionado. As seleções internas do tipo « <code translate="no">HYBRID</code> » utilizam as capacidades do seu índice bitmap, ordenado ou invertido.</td></tr>
</tbody>
</table>
<p>Os intervalos VARCHAR comparam valores de cadeia de caracteres em vez de os interpretar como números. A tabela descreve apenas comparações com valores literais; tal não implica que as expressões aritméticas ou as comparações entre dois campos beneficiem da mesma aceleração do índice.</p>
<h3 id="String-patterns" class="common-anchor-header">Padrões de cadeia de caracteres<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Esta tabela aplica-se a campos VARCHAR. Para caminhos de cadeias de caracteres JSON, utilize um índice e uma conversão « <code translate="no">VARCHAR</code> » suportados pela tabela de indexação JSON; aplica-se o comportamento correspondente das cadeias de caracteres.</p>
<ul>
<li><strong>Sim:</strong> o índice devolve correspondências exatas.</li>
<li><strong>Verificar valores indexados:</strong> o Milvus avalia o padrão em relação às cadeias de caracteres armazenadas no índice, o que pode exigir a consulta de muitas cadeias de caracteres distintas.</li>
<li><strong>Candidatos:</strong> O índice reduz as possíveis correspondências e, em seguida, o Milvus verifica os valores originais.</li>
<li><strong>Varredura:</strong> O índice não atende ao predicado; o Milvus utiliza outro caminho elegível ou faz uma varredura no campo.</li>
</ul>
<table>
<thead>
<tr><th>Tipo de índice</th><th>Prefixo <code translate="no">like &quot;abc%&quot;</code></th><th>Sufixo <code translate="no">like &quot;%abc&quot;</code></th><th>Subcadeia <code translate="no">like &quot;%abc%&quot;</code></th><th>LIKE geral <code translate="no">like &quot;a%b_c&quot;</code></th><th>Expressão regular <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Sim</td><td>Análise</td><td>Análise</td><td>Sim</td><td>Análise</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Verificar valores indexados</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Sim</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Sim</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td><td>Verificar valores indexados</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Candidatos</td><td>Candidatos</td><td>Candidatos; exatos para um literal dentro do intervalo de comprimento de gramas configurado</td><td>Candidatos</td><td>Candidatos</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Sim</td><td>Sim</td><td>Sim</td><td>Candidatos</td><td>Candidatos</td></tr>
</tbody>
</table>
<p>Estas entradas descrevem o operador após o planeamento da consulta. O Milvus pode simplificar um padrão LIKE literal para igualdade e uma expressão regular simples com âncora para igualdade, correspondência de prefixo ou de sufixo; por exemplo, <code translate="no">name =~ &quot;^abc$&quot;</code> torna-se um teste de igualdade e segue a tabela de igualdade.</p>
<p><code translate="no">INVERTED</code> trata formas simples de sufixo e subcadeia como varreduras, mesmo que padrões LIKE mais complexos possam utilizar o índice. <code translate="no">NGRAM</code> requer texto literal com pelo menos <code translate="no">min_gram</code> caracteres; o LIKE geral exige que cada fragmento literal não vazio cumpra esse mínimo, e a aceleração da expressão regular depende da extração de literais adequados. Caso contrário, o Milvus efetua uma varredura dos dados. O ` <code translate="no">FMINDEX</code> ` também pode optar por uma varredura quando um padrão proporciona pouca filtragem útil ou é demasiado dispendioso de resolver através do índice.</p>
<p>Estes são predicados de valor de cadeia de caracteres. Funções baseadas em tokens, tais como <code translate="no">TEXT_MATCH</code> e <code translate="no">PHRASE_MATCH</code>, utilizam indexação de correspondência de texto configurada através das propriedades do campo; a escolha de um índice escalar <code translate="no">INVERTED</code> não ativa essas funções.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">Predicados de matriz, JSON e espaciais<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Tipo de índice</th><th>Tipo de dados ou conversão</th><th>Predicados que podem utilizar o índice</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> ou uma seleção elegível em <code translate="no">AUTOINDEX</code> </td><td>Matrizes comuns com tipos de elementos suportados</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>Corresponde a elementos independentemente da sua posição. As restrições de índice/tipo continuam a aplicar-se.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Matrizes comuns de valores booleanos, inteiros ou VARCHAR</td><td><code translate="no">==</code> de todo o tabulero e <code translate="no">!=</code></td><td>Pode utilizar candidatos de índice seguidos de verificações das matrizes originais. As matrizes de ponto flutuante recorrem à varredura; os índices de bitmap não servem este caminho de candidatos.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> ou uma seleção elegível de <code translate="no">AUTOINDEX</code> </td><td>Caminhos JSON convertidos para <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code></td><td>Comparações e pertença adequadas ao tipo de conversão</td><td>O caminho indexado e a conversão devem corresponder à consulta. Os padrões de cadeia de caracteres seguem a tabela anterior.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Caminhos JSON convertidos para <code translate="no">VARCHAR</code></td><td>padrões LIKE e regex</td><td>Utiliza as mesmas regras de elegibilidade de padrões que os índices VARCHAR NGRAM.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> ou uma seleção elegível de <code translate="no">AUTOINDEX</code> </td><td>Caminhos JSON convertidos para <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> ou <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Requer tipos de elementos compatíveis. Operandos de tipos mistos ou matrizes aninhadas podem recorrer à varredura.</td></tr>
<tr><td><code translate="no">INVERTED</code> com conversão <code translate="no">JSON</code></td><td>Índice JSON completo</td><td>Comparações e pertença em percursos escalares suportados; padrões de cadeia de caracteres suportados; inclusão JSON em percursos de matriz suportados</td><td>Os caminhos de cadeia de caracteres seguem o comportamento INVERTIDO. A contenção de matrizes requer tipos de elementos compatíveis.</td></tr>
<tr><td>Índices de percurso JSON e índices JSON completos</td><td>Caminhos JSON indexados</td><td><code translate="no">exists</code></td><td>Verifica se o caminho existe, o que é diferente de verificar o seu valor ou se todo o campo é nulo.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>Utiliza caixas delimitadoras para encontrar candidatos e, em seguida, verifica a relação espacial exata. <code translate="no">ST_ISVALID</code> não utiliza RTREE.</td></tr>
</tbody>
</table>
<p>O suporte à contenção de matrizes não implica a pesquisa de um índice para um elemento numa posição específica, como em <code translate="no">values[0]</code>, nem para o comprimento da matriz. A igualdade de toda a matriz deve também verificar a ordem e o comprimento, o que a pertença a um elemento, por si só, não consegue estabelecer.</p>
<p><code translate="no">IS NULL</code> e <code translate="no">IS NOT NULL</code> utilizam informações de validade e não requerem um tipo de índice escalar específico. É possível combinar predicados com <code translate="no">and</code>, <code translate="no">or</code> e <code translate="no">not</code>; cada parte pode utilizar o seu próprio caminho de execução elegível.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Compatibilidade de versões<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>A maioria dos índices escalares — <code translate="no">BITMAP</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code> e <code translate="no">NGRAM</code> em campos escalares comuns — não tem requisitos de versão. Os requisitos abaixo aplicam-se apenas às combinações mais recentes: índices em campos de matriz, índices JSON-path e <code translate="no">FMINDEX</code>.</p>
<p>Estes requisitos utilizam números de versão do motor de indexação escalar, um contador de capacidades interno que é distinto dos números de versão do software Milvus.</p>
<table>
<thead>
<tr><th>Capacidade</th><th>Requisito</th></tr>
</thead>
<tbody>
<tr><td>Explícito <code translate="no">FMINDEX</code></td><td>Versão 5 ou mais recente do motor de indexação escalar</td></tr>
<tr><td><code translate="no">STL_SORT</code> o explícito em matrizes comuns</td><td>Motor de índice escalar versão 3 ou mais recente, com suporte à ordenação de matrizes ativado</td></tr>
<tr><td><code translate="no">HYBRID</code> seleção de « <code translate="no">STL_SORT</code> » para matrizes comuns</td><td>Motor de índice escalar versão 5 ou mais recente, com suporte à ordenação de matrizes ativado</td></tr>
<tr><td><code translate="no">BITMAP</code>, « <code translate="no">STL_SORT</code> » ou « <code translate="no">HYBRID</code> » em caminhos escalares JSON</td><td>Motor de indexação escalar versão 4 ou mais recente</td></tr>
<tr><td><code translate="no">STL_SORT</code> ou « <code translate="no">HYBRID</code> » em caminhos de matriz JSON tipados</td><td>Motor de indexação escalar versão 3 ou mais recente, com suporte à ordenação de matrizes ativado</td></tr>
</tbody>
</table>
<p>Se um requisito de compatibilidade com matrizes ou JSON não for cumprido, os pedidos automáticos afetados podem recorrer a <code translate="no">INVERTED</code>, e os pedidos explícitos para combinações não suportadas falham. Para matrizes comuns <code translate="no">HYBRID</code>, o ramo de alta cardinalidade continua a utilizar <code translate="no">INVERTED</code> até que a indexação ordenada esteja disponível.</p>
<h2 id="Performance-considerations" class="common-anchor-header">Considerações sobre o desempenho<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>O desempenho do índice depende da distribuição dos dados e dos filtros que a sua aplicação utiliza. A cardinalidade, o comprimento da cadeia de caracteres, o comprimento da matriz e o número de entidades correspondentes podem todos afetar a utilização de memória e a latência da consulta. Compare índices utilizando dados representativos e expressões de filtro, e avalie em conjunto a utilização de memória, o tempo de construção e a latência da consulta.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">Estimativa dos requisitos de memória<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>As fórmulas seguintes dão uma ideia aproximada da memória necessária para um índice escalar após o carregamento, com o mapeamento de memória desativado. As fórmulas <code translate="no">STL_SORT</code> pressupõem campos escalares comuns sem valores nulos.</p>
<ul>
<li><code translate="no">N</code>: número de entidades.</li>
<li><code translate="no">D</code>: número de valores distintos.</li>
<li><code translate="no">l</code>: comprimento médio das cadeias de caracteres distintas, em <strong>bytes</strong>.</li>
<li><code translate="no">S</code>: tamanho do índice criado antes da compressão de armazenamento, em <strong>bytes</strong>.</li>
</ul>
<table>
<thead>
<tr><th>Tipo de índice</th><th>Estimativa aproximada de memória em bytes</th><th>Intuição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> em <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code> ou <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>Cerca de 12 bytes por entidade.</td></tr>
<tr><td><code translate="no">STL_SORT</code> em <code translate="no">INT64</code>, <code translate="no">DOUBLE</code> ou <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>Cerca de 20 bytes por entidade para valores maiores.</td></tr>
<tr><td><code translate="no">STL_SORT</code> em <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>As cadeias repetidas partilham o espaço de armazenamento, pelo que um número menor de cadeias distintas significa, normalmente, menos memória.</td></tr>
<tr><td><code translate="no">BITMAP</code>, utilizando bitmaps densos</td><td><code translate="no">(D + 1) * N / 8</code></td><td>Cada valor distinto necessita de aproximadamente um bit por entidade, mais um mapa de bits para rastrear as entidades válidas.</td></tr>
<tr><td><code translate="no">INVERTED</code> ou <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>Comece com aproximadamente o tamanho do índice criado.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>Reserve aproximadamente o dobro do tamanho do índice criado.</td></tr>
</tbody>
</table>
<p>Divida o resultado por <code translate="no">1024 * 1024</code> para converter bytes em <strong>MiB</strong>. Por exemplo, um índice « <code translate="no">STL_SORT</code> » com um milhão de valores « <code translate="no">INT64</code> » não nulos necessita de cerca de <strong>19 MiB</strong> para as suas estruturas de dados principais. Para campos «VARCHAR» em que cada cadeia de caracteres é única, a estimativa simplifica-se para <code translate="no">(l + 24) * N</code>; um milhão de cadeias de caracteres únicas com uma média de 32 bytes resulta em cerca de <strong>53 MiB</strong>.</p>
<p>A fórmula BITMAP descreve o armazenamento de bitmap denso; ativar a cache de deslocamento opcional acrescenta aproximadamente <code translate="no">8 * N</code> bytes num sistema de 64 bits. Para <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code> e <code translate="no">FMINDEX</code>, crie um índice com base em dados representativos para obter <code translate="no">S</code> — o tamanho dos dados brutos não substitui o tamanho do índice criado. Para <code translate="no">AUTOINDEX</code>, utilize a fórmula para o índice efetivamente selecionado e aplique estimativas por segmento; em seguida, some-as entre os segmentos carregados e as réplicas.</p>
<p>Estes são valores aproximados de planeamento, não limites de memória. Omitem a memória temporária utilizada durante a criação, o carregamento e as consultas, e são mais sensíveis a valores distintos e à distribuição de dados para índices de cadeias de caracteres e de bitmap do que para índices numéricos <code translate="no">STL_SORT</code>. Não é garantida qualquer percentagem fixa de precisão. O mapeamento de memória, os formatos de índice mais antigos, as matrizes e os campos JSON requerem medições separadas. Antes de dimensionar uma implementação, verifique a utilização real de memória com dados e consultas representativos e reserve margem para picos de utilização.</p>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Para exemplos de criação e configuração de índices, consulte <a href="/docs/pt/bitmap.md">BITMAP</a>, <a href="/docs/pt/inverted.md">INVERTED</a>, <a href="/docs/pt/ngram.md">NGRAM</a>, <a href="/docs/pt/stl-sort.md">STL_SORT</a>, <a href="/docs/pt/trie.md">TRIE</a>, <a href="/docs/pt/fmindex.md">FMINDEX</a> e <a href="/docs/pt/rtree.md">RTREE</a>.</li>
<li>Para definições de campos e esquemas de coleções, consulte <a href="/docs/pt/schema.md">«Esquema explicado</a>».</li>
</ul>
