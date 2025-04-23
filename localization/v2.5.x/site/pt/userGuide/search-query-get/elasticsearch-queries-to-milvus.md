---
id: elasticsearch-queries-to-milvus.md
title: Consultas Elasticsearch para Milvus
summary: >-
  O Elasticsearch, criado com base no Apache Lucene, é um dos principais motores
  de pesquisa de código aberto. No entanto, enfrenta desafios em aplicações
  modernas de IA, incluindo custos de atualização elevados, fraco desempenho em
  tempo real, gestão ineficiente de fragmentos, um design não nativo da nuvem e
  exigências excessivas de recursos. Como uma base de dados vetorial nativa da
  nuvem, o Milvus supera estes problemas com armazenamento e computação
  dissociados, indexação eficiente para dados de elevada dimensão e integração
  perfeita com infra-estruturas modernas. Ele oferece desempenho e
  escalabilidade superiores para cargas de trabalho de IA.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Consultas Elasticsearch para Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>O Elasticsearch, criado com base no Apache Lucene, é um dos principais motores de pesquisa de código aberto. No entanto, enfrenta desafios nas aplicações modernas de IA, incluindo elevados custos de atualização, fraco desempenho em tempo real, gestão ineficiente de fragmentos, um design não nativo da nuvem e exigências excessivas de recursos. Como uma base de dados vetorial nativa da nuvem, o Milvus supera estes problemas com armazenamento e computação dissociados, indexação eficiente para dados de elevada dimensão e integração perfeita com infra-estruturas modernas. Oferece desempenho e escalabilidade superiores para cargas de trabalho de IA.</p>
<p>Este artigo tem como objetivo facilitar a migração da sua base de código do Elasticsearch para o Milvus, fornecendo vários exemplos de conversão de consultas no meio.</p>
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
    </button></h2><p>No Elasticsearch, as operações no contexto da consulta geram pontuações de relevância, enquanto as do contexto do filtro não. Da mesma forma, as pesquisas do Milvus produzem pontuações de semelhança, enquanto as consultas do tipo filtro não o fazem. Ao migrar a sua base de código do Elasticsearch para o Milvus, o princípio fundamental é converter os campos utilizados no contexto de consulta do Elasticsearch em campos vectoriais para permitir a geração de pontuações de similaridade.</p>
<p>A tabela abaixo descreve alguns padrões de consulta do Elasticsearch e os seus equivalentes correspondentes no Milvus.</p>
<table>
   <tr>
     <th><p>Consultas Elasticsearch</p></th>
     <th><p>Equivalentes em Milvus</p></th>
     <th><p>Observações</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Consultas de texto completo</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Match-query">Consulta de correspondência</a></p></td>
     <td><p>Pesquisa de texto integral</p></td>
     <td><p>Ambos fornecem conjuntos de capacidades semelhantes.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Consultas ao nível do termo</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#IDs">IDs</a></p></td>
     <td><p><code translate="no">in</code> operador</p></td>
     <td rowspan="6"><p>Ambas fornecem o mesmo conjunto de recursos ou um conjunto semelhante quando essas consultas do Elasticsearch são usadas no contexto do filtro.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Prefix-query">Consulta de prefixo</a></p></td>
     <td><p><code translate="no">like</code> operador</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Range-query">Consulta de intervalo</a></p></td>
     <td><p>Operadores de comparação como <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, e <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Term-query">Consulta de termo</a></p></td>
     <td><p>Operadores de comparação como <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Terms-query">Consulta de termos</a></p></td>
     <td><p><code translate="no">in</code> operador</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Wildcard-query">Operador de consulta curinga</a></p></td>
     <td><p><code translate="no">like</code> operador</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Boolean-query">Consulta booleana</a></p></td>
     <td><p>Operadores lógicos como <code translate="no">AND</code></p></td>
     <td><p>Ambos fornecem conjuntos semelhantes de capacidades quando utilizados no contexto do filtro.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Consultas vectoriais</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Knn-query">Consulta kNN</a></p></td>
     <td><p>Pesquisa</p></td>
     <td><p>O Milvus fornece capacidades de pesquisa vetorial mais avançadas.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Fusão de classificação recíproca</a></p></td>
     <td><p>Pesquisa híbrida</p></td>
     <td><p>Milvus suporta múltiplas estratégias de reranking.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">Consultas de texto integral<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>No Elasticsearch, as consultas de texto completo permitem-lhe pesquisar campos de texto analisados, como o corpo de um e-mail. A cadeia de consulta é processada utilizando o mesmo analisador que foi aplicado ao campo durante a indexação.</p>
<h3 id="Match-query" class="common-anchor-header">Consulta de correspondência</h3><p>No Elasticsearch, uma consulta de correspondência retorna documentos que correspondem a um texto, número, data ou valor booleano fornecido. O texto fornecido é analisado antes da correspondência.</p>
<p>O seguinte é um exemplo de pedido de pesquisa do Elasticsearch com uma consulta de correspondência.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>O Milvus fornece a mesma capacidade através da funcionalidade de pesquisa de texto integral. Pode converter a consulta Elasticsearch acima em Milvus da seguinte forma:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>No exemplo acima, <code translate="no">message_sparse</code> é um campo vetorial esparso derivado de um campo VarChar denominado <code translate="no">message</code>. O Milvus usa o modelo de incorporação BM25 para converter os valores no campo <code translate="no">message</code> em incorporação de vetor esparso e os armazena no campo <code translate="no">message_sparse</code>. Ao receber o pedido de pesquisa, o Milvus incorpora a carga útil da consulta de texto simples utilizando o mesmo modelo BM25 e efectua uma pesquisa de vetor esparso e devolve os campos <code translate="no">id</code> e <code translate="no">message</code> especificados no parâmetro <code translate="no">output_fields</code> juntamente com as pontuações de semelhança correspondentes.</p>
<p>Para usar essa funcionalidade, você deve habilitar o analisador no campo <code translate="no">message</code> e definir uma função para derivar o campo <code translate="no">message_sparse</code> a partir dele. Para obter instruções detalhadas sobre como ativar o analisador e criar a função derivada no Milvus, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto integral</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">Consultas no nível do termo<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>No Elasticsearch, as consultas de nível de termo são utilizadas para encontrar documentos com base em valores exactos em dados estruturados, tais como intervalos de datas, endereços IP, preços ou IDs de produtos. Esta secção descreve os possíveis equivalentes de algumas consultas de nível de termo do Elasticsearch no Milvus. Todos os exemplos nesta secção são adaptados para funcionarem no contexto do filtro para se alinharem com as capacidades do Milvus.</p>
<h3 id="IDs" class="common-anchor-header">IDs</h3><p>No Elasticsearch, pode encontrar documentos com base nos respectivos IDs no contexto de filtro da seguinte forma:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>No Milvus, também pode encontrar entidades com base nos seus IDs da seguinte forma:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Pode encontrar o exemplo do Elasticsearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">nesta página</a>. Para obter detalhes sobre os pedidos de query e get, bem como sobre as expressões de filtro no Milvus, consulte <a href="/docs/pt/get-and-scalar-query.md">Query</a> and <a href="/docs/pt/filtering">Filtering</a>(Consulta e <a href="/docs/pt/filtering">filtragem</a>).</p>
<h3 id="Prefix-query" class="common-anchor-header">Consulta de prefixo</h3><p>No Elasticsearch, pode encontrar documentos que contenham um prefixo específico num campo fornecido no contexto do filtro da seguinte forma:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>No Milvus, pode encontrar as entidades cujos valores começam com o prefixo especificado da seguinte forma:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Pode encontrar o exemplo do Elasticsearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">nesta página</a>. Para obter detalhes sobre o operador <code translate="no">like</code> no Milvus, consulte <a href="/docs/pt/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">Usando </a><code translate="no">LIKE</code><a href="/docs/pt/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> para correspondência de padrões</a>.</p>
<h3 id="Range-query" class="common-anchor-header">Consulta de intervalo</h3><p>No Elasticsearch, é possível encontrar documentos que contenham termos dentro de um intervalo fornecido da seguinte forma:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>No Milvus, pode encontrar as entidades cujos valores num campo específico estão dentro de um intervalo fornecido da seguinte forma:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Pode encontrar o exemplo do Elasticsearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">nesta página</a>. Para obter detalhes sobre os operadores de comparação no Milvus, consulte <a href="/docs/pt/basic-operators.md#Comparison-operators">Operadores de comparação</a>.</p>
<h3 id="Term-query" class="common-anchor-header">Consulta de termo</h3><p>No Elasticsearch, pode encontrar documentos que contenham um termo <strong>exato</strong> num campo fornecido da seguinte forma:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>No Milvus, pode encontrar as entidades cujos valores no campo especificado são exatamente o termo especificado da seguinte forma:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Pode encontrar o exemplo do Elasticsearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">nesta página</a>. Para obter detalhes sobre os operadores de comparação no Milvus, consulte <a href="/docs/pt/basic-operators.md#Comparison-operators">Operadores de comparação</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">Consulta de termos</h3><p>No Elasticsearch, é possível encontrar documentos que contenham um ou mais termos <strong>exactos</strong> num campo fornecido da seguinte forma:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>O Milvus não tem uma equivalência completa desta. No entanto, pode encontrar as entidades cujos valores no campo especificado são um dos termos especificados da seguinte forma:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Pode encontrar o exemplo do Elasticsearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">nesta página</a>. Para obter detalhes sobre os operadores de intervalo no Milvus, consulte <a href="/docs/pt/basic-operators.md#Range-operators">Operadores de intervalo</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">Consulta curinga</h3><p>No Elasticsearch, é possível encontrar documentos que contenham termos que correspondam a um padrão curinga da seguinte forma:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>O Milvus não oferece suporte a curingas em suas condições de filtragem. No entanto, pode utilizar o operador <code translate="no">like</code> para obter um efeito semelhante da seguinte forma:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Você pode encontrar o exemplo do Elasticsearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">nesta página</a>. Para obter detalhes sobre os operadores de intervalo no Milvus, consulte <a href="/docs/pt/basic-operators.md#Range-operators">Operadores de intervalo</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">Consulta booleana<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>No Elasticsearch, uma consulta booleana é uma consulta que corresponde a documentos que correspondem a combinações booleanas de outras consultas.</p>
<p>O exemplo a seguir é adaptado de um exemplo na documentação do Elasticsearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">nesta página</a>. A consulta devolverá os utilizadores com <code translate="no">kimchy</code> nos seus nomes com uma etiqueta <code translate="no">production</code>.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>No Milvus, pode fazer algo semelhante da seguinte forma:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>O exemplo acima pressupõe que tem um campo <code translate="no">user</code> do tipo <strong>VarChar</strong> e um campo <code translate="no">tags</code> do tipo <strong>Array</strong>, na coleção de destino. A consulta devolverá os utilizadores com <code translate="no">kimchy</code> nos seus nomes com uma etiqueta <code translate="no">production</code>.</p>
<h2 id="Vector-queries" class="common-anchor-header">Consultas vetoriais<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>No Elasticsearch, as consultas de vetor são consultas especializadas que funcionam em campos de vetor para executar com eficiência a pesquisa semântica.</p>
<h3 id="Knn-query" class="common-anchor-header">Consulta Knn</h3><p>O Elasticsearch oferece suporte a consultas kNN aproximadas e a consultas kNN exatas e de força bruta. É possível encontrar os <em>k</em> vetores mais próximos de um vetor de consulta de qualquer maneira, conforme medido por uma métrica de similaridade, da seguinte forma:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>O Milvus, como uma base de dados especializada em vectores, utiliza tipos de índices para otimizar as pesquisas de vectores. Normalmente, dá prioridade à pesquisa do vizinho mais próximo aproximado (ANN) para dados vectoriais de elevada dimensão. Embora a pesquisa kNN de força bruta com o tipo de índice FLAT forneça resultados precisos, é demorada e consome muitos recursos. Em contrapartida, a pesquisa ANN utilizando AUTOINDEX ou outros tipos de índice equilibra velocidade e precisão, oferecendo um desempenho significativamente mais rápido e eficiente em termos de recursos do que o kNN.</p>
<p>Uma equivalência semelhante à consulta de vetor acima no Mlivus é a seguinte:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Pode encontrar o exemplo do Elasticsearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">nesta página</a>. Para obter detalhes sobre pesquisas ANN no Milvus, leia <a href="/docs/pt/single-vector-search.md">Pesquisa ANN básica</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">Fusão de classificação recíproca</h3><p>O Elasticsearch fornece o Reciprocal Rank Fusion (RRF) para combinar vários conjuntos de resultados com diferentes indicadores de relevância em um único conjunto de resultados classificados.</p>
<p>O exemplo a seguir demonstra a combinação de uma busca tradicional baseada em termos com uma busca vetorial de k vizinhos mais próximos (kNN) para melhorar a relevância da busca:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, a RRF combina resultados de dois recuperadores:</p>
<ul>
<li><p>Uma pesquisa padrão baseada em termos para documentos que contêm o termo <code translate="no">&quot;shoes&quot;</code> no campo <code translate="no">text</code>.</p></li>
<li><p>Uma pesquisa kNN no campo <code translate="no">vector</code> utilizando o vetor de consulta fornecido.</p></li>
</ul>
<p>Cada recuperador contribui com até 50 correspondências de topo, que são reavaliadas pela RRF, e os 10 resultados finais de topo são devolvidos.</p>
<p>No Milvus, é possível obter uma pesquisa híbrida semelhante, combinando pesquisas em vários campos vetoriais, aplicando uma estratégia de classificação e recuperando os principais resultados K da lista combinada. O Milvus suporta as estratégias RRF e reranker ponderado. Para mais detalhes, consulte <a href="/docs/pt/reranking.md">Reranking</a>.</p>
<p>O seguinte é uma equivalência não estrita do exemplo Elasticsearch acima em Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Este exemplo demonstra uma pesquisa híbrida no Milvus que combina:</p>
<ol>
<li><p><strong>Pesquisa de vetor denso</strong>: Usando a métrica de produto interno (IP) com <code translate="no">nprobe</code> definido como 10 para busca aproximada do vizinho mais próximo (ANN) no campo <code translate="no">vector</code>.</p></li>
<li><p><strong>Pesquisa de vectores esparsos</strong>: Utilizando a métrica de semelhança BM25 com um parâmetro <code translate="no">drop_ratio_search</code> de 0,2 no campo <code translate="no">text_sparse</code>.</p></li>
</ol>
<p>Os resultados destas pesquisas são executados separadamente, combinados e reavaliados utilizando o classificador Reciprocal Rank Fusion (RRF). A busca híbrida retorna as 10 principais entidades da lista ranqueada.</p>
<p>Ao contrário da classificação RRF do Elasticsearch, que mescla resultados de consultas baseadas em texto padrão e buscas kNN, o Milvus combina resultados de buscas vetoriais esparsas e densas, fornecendo um recurso exclusivo de busca híbrida otimizado para dados multimodais.</p>
<h2 id="Recap" class="common-anchor-header">Recapitulação<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>Neste artigo, abordamos as conversões de consultas típicas do Elasticsearch em seus equivalentes do Milvus, incluindo consultas em nível de termo, consultas booleanas, consultas de texto completo e consultas de vetor. Se tiver mais perguntas sobre a conversão de outras consultas do Elasticsearch, não hesite em contactar-nos.</p>
