---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Compare tipos de índices escalares, verifique a compatibilidade dos campos e
  compreenda a seleção automática de índices.
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
    </button></h1><p>Os índices escalares podem acelerar <a href="/docs/pt/boolean.md">a filtragem</a> em campos não vetoriais. Utilize esta visão geral para escolher um índice, verificar a compatibilidade dos campos e compreender a seleção automática.</p>
<p>Considere indexar campos utilizados em filtros frequentes ou lentos. Para cada campo que incluir no pedido de criação de índice, escolha uma das duas opções:</p>
<ul>
<li><strong>Especificar um tipo de índice:</strong> escolha um que seja compatível com o tipo de dados do campo e com os seus filtros.</li>
<li><strong>Utilize « <code translate="no">AUTOINDEX</code> »:</strong> defina « <code translate="no">index_type</code> » como « <code translate="no">AUTOINDEX</code> » para permitir que o Milvus escolha um tipo. Consulte <a href="#AUTOINDEX-behavior">o comportamento de «AUTOINDEX</a>».</li>
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>Abra um guia do índice para conhecer os filtros, parâmetros e passos de criação suportados:</p>
<table>
<thead>
<tr><th>Tipo de índice</th><th>Utilizar para</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/pt/inverted.md">INVERTIDO</a></td><td>Filtros de igualdade, pertença e intervalo.</td></tr>
<tr><td><a href="/docs/pt/bitmap.md">BITMAP</a></td><td>Campos com poucos valores distintos, tais como códigos de estado.</td></tr>
<tr><td><a href="/docs/pt/stl-sort.md">STL_SORT</a></td><td>Pesquisas de valores e filtros de intervalo.</td></tr>
<tr><td><a href="/docs/pt/trie.md">TRIE</a></td><td>Pesquisas exatas de cadeias de caracteres e correspondência de prefixos em campos « <code translate="no">VARCHAR</code> ».</td></tr>
<tr><td><a href="/docs/pt/ngram.md">NGRAM</a></td><td>Filtros «LIKE» e de expressões regulares elegíveis.</td></tr>
<tr><td><a href="/docs/pt/rtree.md">RTREE</a></td><td>Filtros espaciais em campos « <code translate="no">GEOMETRY</code> ».</td></tr>
</tbody>
</table>
<p>Consulte a tabela de compatibilidade de campos abaixo e a compatibilidade do índice selecionado com os filtros antes de criar um índice.</p>
<p><details id="Filter-execution">
<summary><strong>Como os filtros utilizam os índices</strong></summary></p>
<p>Um índice serve apenas expressões elegíveis; outros filtros podem analisar os dados. Operações aritméticas e comparações entre campos não herdam a aceleração da pesquisa literal. Para combinações lógicas e testes de NULL, consulte <a href="/docs/pt/basic-operators.md">Operadores Básicos</a>.</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">Tipos de campo suportados<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>Descubra o tipo de dados do seu campo para ver os índices explícitos suportados. Em linhas de matriz, « <code translate="no">ARRAY&lt;T&gt;</code> » significa « <code translate="no">ARRAY</code> » com « <code translate="no">element_type=T</code> »:</p>
<table>
<thead>
<tr><th>Tipo de campo</th><th>Tipos de índices explícitos</th><th>Condições</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Os campos booleanos escalares não suportam <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> não está disponível em campos de chave primária.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>A opção « <code translate="no">BITMAP</code> » explícita não está disponível.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, ` <code translate="no">BITMAP</code>`, ` <code translate="no">STL_SORT</code>`, ` <code translate="no">TRIE</code>`, <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> não está disponível em campos de chave primária. Consulte <a href="#String-pattern-indexes">«Seleção de índice por filtro</a>».</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>Consulte <a href="/docs/pt/timestamptz-field.md">o campo TIMESTAMPTZ</a>.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>Consulte <a href="/docs/pt/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Consulte <a href="/docs/pt/array_data_type.md#Array-index-support">Suporte a índices de matriz</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Consulte <a href="/docs/pt/array_data_type.md#Array-index-support">«Suporte a índices de matriz</a>».</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>Consulte <a href="/docs/pt/array_data_type.md#Array-index-support">«Suporte a índices de matriz</a>».</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Consulte <a href="/docs/pt/array_data_type.md#Array-index-support">«Suporte a índices de matriz</a>».</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Depende do caminho indexado e do tipo de conversão.</td><td>Verifique <a href="/docs/pt/json-indexing.md#Understand-cast-types">a compatibilidade e os requisitos do caminho JSON</a>.</td></tr>
<tr><td>Subcampos não vetoriais do StructArray</td><td>Depende do tipo de dados do subcampo.</td><td>Indexe os subcampos separadamente; os subcampos « <code translate="no">BOOL</code> » não podem utilizar « <code translate="no">STL_SORT</code> » explícito. Consulte <a href="/docs/pt/index-structarray-fields.md#Create-scalar-indexes">as regras dos subcampos</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Nenhum</td><td>Os índices escalares criados pelo utilizador, incluindo « <code translate="no">AUTOINDEX</code> », não estão disponíveis.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Os índices escalares, incluindo os de tipo « <code translate="no">AUTOINDEX</code> », não suportam campos ARRAY recursivos nem matrizes com elementos nulos. Consulte <a href="/docs/pt/array_data_type.md#Array-index-support">«Suporte a índices de matriz</a> para filtros de matriz comum» e <a href="/docs/pt/index-structarray-fields.md#Create-scalar-indexes">«Indexar campos StructArray»</a> para conhecer as regras dos subcampos.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>Escolha um índice para filtros VARCHAR</strong></summary></p>
<p>Para um campo « <code translate="no">VARCHAR</code> », compare índices compatíveis com base nos seus filtros:</p>
<table>
<thead>
<tr><th>Necessidade de filtragem</th><th>Orientações e condições de indexação</th></tr>
</thead>
<tbody>
<tr><td>Pesquisas exatas de cadeias de caracteres e prefixos</td><td><a href="/docs/pt/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/pt/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> ou <a href="/docs/pt/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>Poucos valores de cadeia de caracteres distintos</td><td><a href="/docs/pt/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; os padrões são avaliados em relação aos valores indexados.</td></tr>
<tr><td>LIKE ou expressões regulares com literais fixos adequados</td><td><a href="/docs/pt/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> em campos « <code translate="no">VARCHAR</code> » ou percursos de cadeias JSON, sujeito a condições de comprimento do gram e de verificação adicional.</td></tr>
<tr><td>Expressões regulares sem literais fixos utilizáveis</td><td>A consulta pode analisar dados ou avaliar muitos valores indexados; verifique as condições do índice selecionado.</td></tr>
</tbody>
</table>
<p>Os intervalos em <code translate="no">VARCHAR</code> utilizam a ordenação de cadeias de caracteres, mesmo quando estas contêm números. A utilização do índice depende do planeamento da consulta, dos literais extraíveis, da cardinalidade e da distribuição dos dados. Consulte <a href="/docs/pt/pattern-matching.md#Accelerate-pattern-matching-with-indexes">«Correspondência de Padrões»</a> para conhecer as regras de planeamento. Para percursos de cadeias de caracteres JSON, verifique os requisitos relativos ao percurso e à conversão em <a href="/docs/pt/json-indexing.md">«Indexação JSON</a>».</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">Comportamento de AUTOINDEX<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>Defina « <code translate="no">index_type</code> » como « <code translate="no">AUTOINDEX</code> » na definição de índice de cada campo selecionado. O Milvus escolhe um tipo com base no tipo de dados e, quando aplicável, no número de valores distintos em cada criação de índice:</p>
<table>
<thead>
<tr><th>Tipo de campo</th><th>Seleção predefinida</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> para menos de 100 valores distintos; caso contrário, <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> com <code translate="no">element_type</code> definido como <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> para menos de 100 elementos distintos; caso contrário, <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> caminhos convertidos para <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> por predefinição na versão 3.0. A <a href="/docs/pt/json-indexing.md#Index-requirements">configuração opcional JSON</a> ativa a estratégia escalar de bitmap/ordenado acima.</td></tr>
<tr><td><code translate="no">JSON</code> caminhos convertidos para <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> ou <code translate="no">ARRAY_VARCHAR</code></td><td>Utilize « <code translate="no">INVERTED</code> » explícito; o mapeamento predefinido da versão 3.0.6 rejeita a seleção automática para estas conversões.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Não suportado.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Para um campo escalar suportado, uma definição de índice que omita ` <code translate="no">index_type</code> ` também solicita a seleção automática. Os campos não incluídos no pedido não são indexados.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>Detalhes da seleção</strong></summary></p>
<ul>
<li><strong>Layouts internos:</strong> ` <code translate="no">AUTOINDEX</code> ` pode selecionar layouts indisponíveis como opções explícitas, tais como a indexação de bitmap para ` <code translate="no">FLOAT</code> ` e ` <code translate="no">DOUBLE</code>`. A estratégia baseada na cardinalidade é designada internamente por ` <code translate="no">HYBRID</code> `; não é possível especificá-la diretamente. O índice selecionado determina quais os filtros que o podem utilizar.</li>
<li><strong>Limiar de cardinalidade:</strong> <a id="Cardinality-threshold"></a>Defina <code translate="no">bitmap_cardinality_limit</code> (intervalo: 1–1000) para substituir o limiar predefinido. Valores inferiores a este utilizam o bitmap; iguais ou superiores a este, aplica-se o layout de alta cardinalidade do tipo de dados. As criações explícitas <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> e <code translate="no">BITMAP</code> contornam a seleção baseada na cardinalidade e ignoram este limiar.</li>
<li><strong>Substituições do administrador:</strong> altere os mapeamentos de tipos através de <code translate="no">scalarAutoIndex.params.build</code>. <code translate="no">scalarAutoIndex.enable=false</code> (por predefinição) continua a permitir <code translate="no">AUTOINDEX</code> explícito; <code translate="no">true</code> também aplica a seleção automática a pedidos manuais válidos.</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>Escolha um guia para a sua próxima tarefa:</p>
<ul>
<li><strong>Criar um índice:</strong> utilize o <a href="#Index-types">guia de índices</a> para consultar parâmetros e exemplos de criação.</li>
<li><strong>Planear recursos:</strong> Consulte as orientações sobre memória para <a href="/docs/pt/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/pt/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/pt/inverted.md#Memory-considerations">INVERTED</a> ou <a href="/docs/pt/ngram.md#Memory-considerations">NGRAM</a>. Compare a utilização de memória, o tempo de compilação e a latência das consultas com dados e filtros representativos.</li>
<li><strong>Configurar a pesquisa de texto:</strong> <a href="/docs/pt/keyword-match.md">A «Text Match»</a> e <a href="/docs/pt/full-text-search.md">a «Full Text Search»</a> abrangem a análise de texto, o BM25, o « <code translate="no">TEXT_MATCH</code> » e o « <code translate="no">PHRASE_MATCH</code> ». Um índice escalar « <code translate="no">INVERTED</code> » não permite estes mecanismos.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>Eliminação de índices escalares em versões mais antigas do Milvus</strong></summary></p>
<p>No Milvus v2.6.3 ou anterior, liberte a coleção antes de eliminar um índice escalar. A partir da v2.6.4, pode eliminá-lo sem libertar a coleção.</p>
<p></details></p>
