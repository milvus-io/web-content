---
id: scalar_index.md
related_key: scalar_index
summary: Índice escalar em Milvus.
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
    </button></h1><p>O Milvus suporta pesquisas filtradas que combinam campos escalares e vectoriais. Para aumentar a eficiência das pesquisas que envolvem campos escalares, o Milvus introduziu a indexação de campos escalares a partir da versão 2.1.0. Este artigo fornece uma visão geral da indexação de campos escalares no Milvus, ajudando-o a compreender o seu significado e implementação.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao efetuar pesquisas de semelhança vetorial no Milvus, pode utilizar operadores lógicos para organizar campos escalares em expressões booleanas.</p>
<p>Quando o Milvus recebe um pedido de pesquisa com uma expressão booleana deste tipo, analisa a expressão booleana numa árvore de sintaxe abstrata (AST) para gerar um plano físico para filtragem de atributos. O Milvus aplica então o plano físico em cada segmento para gerar um <a href="/docs/pt/v2.4.x/bitset.md">conjunto de bits</a> como resultado da filtragem e inclui o resultado como parâmetro de pesquisa vetorial para limitar o âmbito da pesquisa. Neste caso, a velocidade das pesquisas vectoriais depende fortemente da velocidade da filtragem de atributos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>Filtragem de atributos num segmento</span> </span></p>
<p>A indexação de campos escalares é uma forma de garantir a velocidade da filtragem de atributos, ordenando os valores dos campos escalares de uma forma específica para acelerar a recuperação de informação.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">Algoritmos de indexação de campos escalares<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>O objetivo do Milvus é conseguir uma baixa utilização de memória, uma elevada eficiência de filtragem e um tempo de carregamento curto com os seus algoritmos de indexação de campos escalares. Estes algoritmos são classificados em dois tipos principais: <a href="#auto-indexing">indexação automática</a> e <a href="#inverted-indexing">indexação invertida</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">Indexação automática</h3><p>Milvus fornece a opção <code translate="no">AUTOINDEX</code> para evitar que tenha de escolher manualmente um tipo de índice. Ao chamar o método <code translate="no">create_index</code>, se o <code translate="no">index_type</code> não for especificado, o Milvus seleciona automaticamente o tipo de índice mais adequado com base no tipo de dados.</p>
<p>A tabela seguinte lista os tipos de dados que o Milvus suporta e os algoritmos de indexação automática correspondentes.</p>
<table>
<thead>
<tr><th>Tipo de dados</th><th>Algoritmo de indexação automática</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>Índice invertido</td></tr>
<tr><td>INT8</td><td>Índice invertido</td></tr>
<tr><td>INT16</td><td>Índice invertido</td></tr>
<tr><td>INT32</td><td>Índice invertido</td></tr>
<tr><td>INT64</td><td>Índice invertido</td></tr>
<tr><td>FLOAT</td><td>Índice invertido</td></tr>
<tr><td>DOUBLE</td><td>Índice invertido</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">Indexação invertida</h3><p>A indexação invertida oferece uma forma flexível de criar um índice para um campo escalar, especificando manualmente os parâmetros do índice. Este método funciona bem em vários cenários, incluindo consultas pontuais, consultas de correspondência de padrões, pesquisas de texto completo, pesquisas JSON, pesquisas booleanas e até mesmo consultas de correspondência de prefixos.</p>
<p>Os índices invertidos implementados no Milvus são alimentados por <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, uma biblioteca de motor de pesquisa de texto completo. Tantivy garante que a indexação invertida em Milvus é eficiente e rápida.</p>
<p>Um índice invertido tem dois componentes principais: um dicionário de termos e uma lista invertida. O dicionário de termos inclui todas as palavras tokenizadas ordenadas alfabeticamente, enquanto a lista invertida contém a lista de documentos onde cada palavra aparece. Esta configuração torna as consultas por pontos e por intervalos muito mais rápidas e eficientes do que as pesquisas de força bruta.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>Diagrama de índice invertido</span> </span></p>
<p>As vantagens da utilização de um índice invertido são particularmente evidentes nas seguintes operações:</p>
<ul>
<li><strong>Consulta pontual</strong>: Por exemplo, ao procurar documentos que contenham a palavra <strong>Milvus</strong>, o processo começa por verificar se <strong>Milvus</strong> está presente no dicionário de termos. Se não for encontrado, nenhum documento contém a palavra. No entanto, se for encontrada, a lista invertida associada a <strong>Milvus</strong> é recuperada, indicando os documentos que contêm a palavra. Este método é muito mais eficiente do que uma pesquisa de força bruta num milhão de documentos, uma vez que o dicionário de termos ordenado reduz significativamente a complexidade do tempo para encontrar a palavra <strong>Milvus</strong>.</li>
<li><strong>Consulta de intervalo</strong>: A eficiência das consultas de intervalo, como encontrar documentos com palavras alfabeticamente superiores a <strong>muito</strong>, também é melhorada pelo dicionário de termos ordenados. Esta abordagem é mais eficiente do que uma pesquisa de força bruta, fornecendo resultados mais rápidos e mais exactos.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">Resultados dos testes</h3><p>Para demonstrar as melhorias de desempenho proporcionadas pelos índices escalares no Milvus, foi efectuada uma experiência que comparou o desempenho de várias expressões utilizando a indexação invertida e a pesquisa de força bruta em dados brutos.</p>
<p>A experiência envolveu testar várias expressões em duas condições: com um índice invertido e com uma pesquisa de força bruta. Para garantir a equidade, foi mantida a mesma distribuição de dados entre os testes, utilizando sempre a mesma coleção. Antes de cada teste, a coleção foi libertada e o índice foi eliminado e reconstruído. Além disso, uma consulta quente foi realizada antes de cada teste para minimizar o impacto dos dados frios e quentes, e cada consulta foi executada várias vezes para garantir a precisão.</p>
<p>Para um conjunto de dados de <strong>1 milhão de</strong> registos, a utilização de um <strong>índice invertido</strong> pode proporcionar uma melhoria de desempenho até <strong>30 vezes</strong> superior para consultas pontuais. Os ganhos de desempenho podem ser ainda mais significativos para conjuntos de dados maiores.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">Recomendações de desempenho<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>Para tirar o máximo partido da capacidade do Milvus na indexação de campos escalares e libertar o seu poder nas pesquisas de semelhança vetorial, pode ser necessário um modelo para estimar o tamanho da memória necessária com base nos dados que possui.</p>
<p>As tabelas seguintes listam as funções de estimativa para todos os tipos de dados que o Milvus suporta.</p>
<ul>
<li><p>Campos numéricos</p>
<table>
<thead>
<tr><th>Tipo de dados</th><th>Função de estimativa de memória (MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>Campos da cadeia de caracteres</p>
<table>
<thead>
<tr><th>Comprimento da cadeia</th><th>Função de estimativa de memória (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>numOfRows * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>numOfRows * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>numOfRows * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Para indexar um campo escalar, leia <a href="/docs/pt/v2.4.x/index-scalar-fields.md">Criar um índice em escalares</a>.</p></li>
<li><p>Para saber mais sobre os termos e regras relacionados mencionados acima, leia</p>
<ul>
<li><a href="/docs/pt/v2.4.x/bitset.md">Conjunto de bits</a></li>
<li><a href="/docs/pt/v2.4.x/multi-vector-search.md">Pesquisa híbrida</a></li>
<li><a href="/docs/pt/v2.4.x/boolean.md">Regras de expressão booleana</a></li>
<li><a href="/docs/pt/v2.4.x/schema.md#Supported-data-type">Tipos de dados suportados</a></li>
</ul></li>
</ul>
