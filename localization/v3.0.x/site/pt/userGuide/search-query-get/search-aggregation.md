---
id: search-aggregation.md
title: Agregação de PesquisasCompatible with Milvus 3.0.x
summary: >-
  Agrupar os resultados da pesquisa vetorial em conjuntos, calcular métricas por
  conjunto, ordenar os conjuntos e devolver resultados representativos.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">Agregação de Pesquisas<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Quando um comprador pesquisa «ténis de corrida pretos para treino diário», a pesquisa por vizinho mais próximo aproximado (ANN) classifica os produtos por semelhança vetorial e apresenta uma lista plana dos Top-K. Os resultados podem ser relevantes, mas repetitivos: no exemplo abaixo, quatro dos seis primeiros resultados são produtos da Marca A, enquanto a Marca B e a Marca C aparecem uma vez cada.</p>
<p>Uma lista plana não consegue fornecer diretamente um resumo orientado por categorias. Uma aplicação pode precisar de comparar marcas com base no número de candidatos retidos ou no preço médio, analisar um pequeno número de produtos representativos de cada marca ou organizar os resultados em vários níveis de categorias.</p>
<p>A Agregação de Pesquisa organiza os candidatos ANN retidos em categorias com base em campos escalares selecionados. Neste exemplo, cada marca torna-se uma categoria separada. O Milvus pode calcular estatísticas para cada categoria, ordenar as categorias e associar-lhes produtos representativos. A aplicação utiliza esta resposta «categoria-primeiro» através de <code translate="no">result.agg_buckets</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Um resultado de pesquisa simples sobre sapatilhas de corrida transforma-se num conjunto de categorias de marcas comparáveis</span>
  
 </span></p>
<p>A Agregação de Pesquisa não executa uma agregação exata de toda a coleção. A existência dos grupos, as contagens, as métricas, a ordenação e os resultados representativos dependem dos candidatos retidos pelas fases da ANN e de agrupamento.</p>
<h2 id="How-it-works" class="common-anchor-header">Como funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>Candidatos da ANN agrupados por chaves de bucket e devolvidos com contagens, métricas e resultados representativos</span>
  
 </span></p>
<ol>
<li><p><strong>Recuperar candidatos.</strong> O Milvus executa uma pesquisa ANN para encontrar as entidades mais próximas do vetor de consulta. A fase de agrupamento retém, em seguida, um número limitado de candidatos para cada chave composta completa. Este limite de candidatos por chave corresponde ao maior valor de « <code translate="no">TopHits.size</code> » em qualquer ponto da árvore de agregação, ou a « <code translate="no">1</code> » quando nenhum nível define « <code translate="no">top_hits</code> ».</p></li>
<li><p><strong>Criação de buckets.</strong> <code translate="no">SearchAggregation.fields</code> define a chave do bucket. Cada combinação única de valores de campo cria uma chave separada. Na figura, <code translate="no">fields=[&quot;brand&quot;]</code> cria as chaves de bucket <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> e <code translate="no">(Brand C)</code>. Os candidatos retidos com a mesma chave pertencem ao mesmo bucket e contribuem para o seu <code translate="no">count</code>. <code translate="no">SearchAggregation.size</code> limita o número de buckets que o Milvus devolve.</p></li>
<li><p><strong>Calcular e devolver resultados.</strong> Cada bucket devolvido contém a sua chave e a contagem de candidatos retidos. O Milvus também pode calcular métricas configuradas, ordenar os buckets, devolver entidades representativas e criar buckets filhos. Cada <code translate="no">AggregationBucket</code> em <code translate="no">result.agg_buckets</code> expõe <code translate="no">key</code>, <code translate="no">count</code>, <code translate="no">metrics</code>, <code translate="no">hits</code> e <code translate="no">sub_groups</code>. Quando a Agregação de Pesquisa está ativada, a lista normal de resultados de pesquisa fica vazia.</p></li>
</ol>
<p>No diagrama, <code translate="no">TopHits.size=4</code> fornece um orçamento de candidatos por chave de quatro, pelo que os quatro candidatos retidos da Marca A produzem <code translate="no">count: 4</code>. O cartão da Marca A concluído mostra apenas dois dos quatro resultados representativos devolvidos, para manter a figura compacta.</p>
<p>Com « <code translate="no">sub_aggregation</code> », o Milvus repete os passos 2 e 3 dentro de cada bucket pai. Alterações na taxa de recuperação da ANN ou no orçamento de candidatos por chave podem alterar o número de buckets, as métricas, a ordenação, os resultados e os resultados aninhados.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de utilizar a Agregação de Pesquisa, tenha em atenção os seguintes limites:</p>
<ul>
<li><p><strong>Agregações aninhadas:</strong> um pedido pode conter uma « <code translate="no">SearchAggregation</code> » raiz e até três níveis aninhados de « <code translate="no">sub_aggregation</code> », num total máximo de quatro níveis. Em todos os níveis, podem ser utilizados, no máximo, 10 campos para criar chaves de bucket.</p></li>
<li><p><strong>Campos utilizados para criar chaves de bucket:</strong> o <code translate="no">SearchAggregation.fields</code> suporta campos booleanos, inteiros, <code translate="no">VARCHAR</code> e <code translate="no">TIMESTAMPTZ</code>. Não suporta campos <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, <code translate="no">TEXT</code>, vetoriais ou dinâmicos.</p></li>
<li><p><strong>Campos métricos:</strong> <code translate="no">count</code> aceita <code translate="no">&quot;*&quot;</code> ou qualquer campo não<code translate="no">JSON</code> e não dinâmico, e ignora valores <code translate="no">NULL</code> quando um campo é especificado. <code translate="no">sum</code> e <code translate="no">avg</code> aceitam campos inteiros e de ponto flutuante. <code translate="no">min</code> e <code translate="no">max</code> aceitam adicionalmente campos de cadeia de caracteres e <code translate="no">TIMESTAMPTZ</code>.</p></li>
<li><p><strong>Campos de ordenação dos «Top Hits»:</strong> <code translate="no">TopHits.sort</code> aceita campos comparáveis do tipo booleano, inteiro, de ponto flutuante, cadeia de caracteres e <code translate="no">TIMESTAMPTZ</code>, além de <code translate="no">_score</code>. Não suporta <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, vetores nem campos dinâmicos.</p></li>
<li><p><strong>Orçamento de candidatos:</strong> O maior valor de « <code translate="no">TopHits.size</code> » em qualquer ponto da árvore de agregação corresponde também ao número de candidatos retidos por cada chave composta completa. Se nenhum nível configurar « <code translate="no">top_hits</code> », o Milvus retém um candidato por chave. O « <code translate="no">count</code> » do bucket e as métricas são calculados a partir destes candidatos retidos, pelo que alterar « <code translate="no">TopHits.size</code> » pode alterá-los.</p></li>
<li><p><strong>Campos de bucket nulos:</strong> Um valor « <code translate="no">NULL</code> » forma a sua própria chave de bucket. Para excluir o bucket nulo, adicione um filtro como « <code translate="no">brand is not null</code> » à solicitação de pesquisa.</p></li>
<li><p><strong>Campos repetidos:</strong> O mesmo campo não pode aparecer em mais do que uma lista de « <code translate="no">SearchAggregation.fields</code> ». Por exemplo, se a agregação raiz utilizar « <code translate="no">fields=[&quot;category&quot;]</code> », uma agregação aninhada « <code translate="no">sub_aggregation</code> » não pode utilizar também « <code translate="no">fields=[&quot;category&quot;]</code> ».</p></li>
<li><p><strong>Combinações não suportadas:</strong> A agregação de pesquisa não pode ser combinada com um ` <code translate="no">offset</code>` diferente de zero, iteradores de pesquisa, pesquisa híbrida, um `Highlighter` ou pesquisa de agrupamento. Um valor de nível superior de ` <code translate="no">offset</code> ` igual a ` <code translate="no">0</code> ` equivale a omitir o parâmetro. Nas solicitações de pesquisa REST v2, ` <code translate="no">searchAggregation</code> ` e ` <code translate="no">ids</code> ` não podem ser especificados em conjunto.</p></li>
<li><p><strong>Entradas devolvidas:</strong> Por predefinição, o Milvus rejeita um pedido de «Search Aggregation» quando o número máximo calculado de entradas de resultados do pedido excede 10 000. Este limiar é controlado por « <code translate="no">proxy.maxSearchAggregationResultEntries</code> ». Defina o valor de configuração como « <code translate="no">0</code> » ou um número negativo para desativar esta verificação.</p>
<p>O Milvus calcula este máximo da seguinte forma:</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Para este cálculo do lado do servidor, o valor efetivo de « <code translate="no">search_size</code> » num nível é o valor explicitamente configurado em « <code translate="no">search_size</code> », ou o valor de « <code translate="no">size</code> » desse nível quando « <code translate="no">search_size</code> » for omitido. A API do PyMilvus utilizada neste guia não expõe atualmente « <code translate="no">search_size</code> », pelo que as solicitações do PyMilvus utilizam o valor de « <code translate="no">size</code> » de cada nível para este cálculo. Utilize <code translate="no">1</code> para o último fator quando nenhum nível configurar <code translate="no">TopHits</code>. Por exemplo, um vetor de consulta, 10 buckets raiz, cinco buckets filhos por bucket raiz e dois resultados por bucket filho produzem um máximo calculado de:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Utilizar a agregação de pesquisa<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Escolha um exemplo com base no que pretende alcançar:</p>
<table>
<thead>
<tr><th>Aceda a</th><th>Descrição</th><th>Definições-chave</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">Comparar e ordenar buckets</a></td><td>Calcule estatísticas por bucket para comparar buckets e, em seguida, ordene os buckets devolvidos por métricas, contagens ou chaves.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">Mostrar resultados representativos de cada bucket</a></td><td>Retorne um número limitado de entidades de cada bucket e ordene essas entidades de forma independente por campos escalares ou pontuação vetorial.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">Agrupar resultados em vários níveis</a></td><td>Organize os resultados em níveis de grupo pai e filho para analisar várias dimensões em sequência.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>Os exemplos abaixo utilizam uma coleção de produtos com campos de marca, categoria, cor, preço e classificação. Todos os nomes de marcas, nomes de produtos, preços, classificações e resultados de pesquisa são dados de exemplo sintéticos. Expanda a secção seguinte para criar a coleção e definir as variáveis de pesquisa partilhadas.</p>
<p><details></p>
<p><summary>Configurar a coleção de exemplo</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>A configuração acima define <code translate="no">COSINE</code> tanto para o índice vetorial como para os parâmetros de pesquisa. Por isso, os exemplos seguintes utilizam <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> para colocar em primeiro lugar a maior similaridade cosinusoidal. Para uma métrica de distância como <code translate="no">L2</code>, utilize <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">Comparar e ordenar buckets<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize este padrão quando precisar de comparar grupos de entidades recuperadas utilizando estatísticas calculadas e controlar a ordem em que os buckets são devolvidos. Neste exemplo, o Milvus agrupa os produtos recuperados por <code translate="no">brand</code>, calcula métricas de preço para cada bucket de marca e ordena os buckets por preço médio.</p>
<p>Se o seu objetivo for apenas melhorar a diversidade dos resultados, devolvendo uma ou mais entidades por valor de campo, utilize, em vez disso, <a href="/docs/pt/grouping-search.md">a Pesquisa por Agrupamento</a>.</p>
<p>A configuração seguinte cria até três buckets de marcas, calcula métricas para cada bucket e ordena os buckets por preço médio:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Passe o objeto para o parâmetro « <code translate="no">search_aggregation</code> » de « <code translate="no">MilvusClient.search()</code> »:</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Quando « <code translate="no">search_aggregation</code> » está definido, o PyMilvus não devolve resultados de entidades comuns em « <code translate="no">result[0]</code> ». Em vez disso, leia a resposta do grupo em « <code translate="no">result.agg_buckets[0]</code> ». O parâmetro « <code translate="no">output_fields</code> » controla quais os campos escalares que aparecem em cada mapeamento « <code translate="no">AggregationHit.fields</code> » devolvido; o Milvus pode ainda utilizar campos de origem de métricas e de ordenação que não estejam listados em « <code translate="no">output_fields</code> ».</p>
<p><details></p>
<p><summary>Ver a saída de exemplo do bucket</summary></p>
<p>A saída seguinte foi capturada a partir do pedido acima e serializada como JSON para facilitar a leitura. O PyMilvus devolve objetos <code translate="no">AggregationBucket</code> em vez de JSON. O valor <code translate="no">key</code> é sempre uma lista ordenada de componentes-chave, mesmo quando <code translate="no">fields</code> contém apenas um campo. Isto preserva a ordem dos campos para chaves compostas.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Para o vetor de consulta único deste guia, leia os buckets de nível superior devolvidos em <code translate="no">result.agg_buckets[0]</code>. Cada bucket expõe os seus componentes de chave ordenados, o candidato retido <code translate="no">count</code>, o valor calculado <code translate="no">metrics</code>, o valor representativo <code translate="no">hits</code> e os buckets aninhados em <code translate="no">sub_groups</code>.</p>
<p>Leia a configuração da seguinte forma:</p>
<table>
<thead>
<tr><th>Definição</th><th>O que controla</th><th>Neste exemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Como o Milvus cria as chaves dos buckets</td><td>Cria um bucket para cada valor distinto de « <code translate="no">brand</code> ».</td></tr>
<tr><td><code translate="no">size</code></td><td>O número máximo de buckets devolvidos</td><td>Retorna até três buckets de marca.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>As estatísticas calculadas para cada bucket</td><td>Calcula a contagem de produtos, o preço médio e o preço mínimo.</td></tr>
<tr><td><code translate="no">order</code></td><td>Como o Milvus ordena os buckets devolvidos</td><td>Ordena por preço médio e, em seguida, utiliza a chave do grupo para desempatar.</td></tr>
</tbody>
</table>
<p>O Milvus ignora <code translate="no">limit</code> quando <code translate="no">search_aggregation</code> está definido. Utilize o valor raiz <code translate="no">SearchAggregation.size</code> para controlar o número de buckets de nível superior.</p>
<p>Com estas definições, o Milvus devolve os buckets da Marca B, da Marca A e da Marca C por ordem descendente de <code translate="no">avg_price</code>. O critério « <code translate="no">_key</code> » aplica-se apenas quando os buckets têm o mesmo preço médio. Como esta configuração não define « <code translate="no">top_hits</code> », a lista « <code translate="no">hits</code> » de cada bucket está vazia e o orçamento por chave é « <code translate="no">1</code> ». As contagens e métricas apresentadas descrevem, portanto, um candidato retido por marca. Configure « <code translate="no">top_hits</code> » com um « <code translate="no">TopHits.size</code> » maior quando a agregação necessitar de uma janela de métricas por chave mais ampla.</p>
<p><details></p>
<p><summary>Regras de métricas e ordenação</summary></p>
<p>Cada entrada em <code translate="no">SearchAggregation.metrics</code> mapeia um alias definido pelo utilizador para <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>Fonte</th><th>Operações suportadas</th><th>Comportamento</th></tr>
</thead>
<tbody>
<tr><td>Qualquer campo que não seja «<code translate="no">JSON</code> » e que não seja dinâmico</td><td><code translate="no">count</code></td><td>Conta os candidatos retidos cujo campo de origem não seja « <code translate="no">NULL</code> ».</td></tr>
<tr><td>Campo inteiro ou de ponto flutuante</td><td><code translate="no">sum</code>, « <code translate="no">avg</code> », « <code translate="no">min</code> », <code translate="no">max</code></td><td>Calcula com base nos valores retidos não nulos.</td></tr>
<tr><td>Campo de cadeia de caracteres ou « <code translate="no">TIMESTAMPTZ</code> »</td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>Seleciona o valor retido não nulo mínimo ou máximo.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>Conta todos os candidatos retidos no bucket. O resultado corresponde a <code translate="no">bucket.count</code>.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Agrega valores de similaridade ou distância ANN para os candidatos retidos.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> Aceita as seguintes chaves:</p>
<table>
<thead>
<tr><th>Chave de ordem</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td>Um alias da métrica</td><td>Ordena por um valor calculado no « <code translate="no">metrics</code> » no mesmo nível de agregação, como « <code translate="no">avg_price</code> ».</td></tr>
<tr><td><code translate="no">_count</code></td><td>Ordena pelo número de candidatos retidos em cada bucket.</td></tr>
<tr><td><code translate="no">_key</code></td><td>Ordena pela chave do bucket, em vez de por um campo da coleção denominado « <code translate="no">_key</code> ».</td></tr>
</tbody>
</table>
<p>Cada entrada de « <code translate="no">order</code> » mapeia uma chave para « <code translate="no">&quot;asc&quot;</code> » ou « <code translate="no">&quot;desc&quot;</code> ». O Milvus avalia várias entradas, da primeira à última. Se omitir « <code translate="no">order</code> », o Milvus mantém a ordem de descoberta dos buckets a partir do conjunto de candidatos retidos.</p>
<p>Para ordenar os buckets pela qualidade da correspondência do vetor, calcule primeiro uma métrica ao nível do bucket a partir de <code translate="no">_score</code> e, em seguida, utilize o alias da métrica em <code translate="no">order</code>. Não é possível utilizar <code translate="no">_score</code> diretamente como chave de ordenação dos buckets, uma vez que cada bucket pode conter várias pontuações de entidades. Por exemplo, com <code translate="no">COSINE</code> ou <code translate="no">IP</code>:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>Com <code translate="no">L2</code>, calcule o valor mínimo de <code translate="no">_score</code> e ordene o alias da métrica por ordem crescente, de modo a que os buckets com a distância mais baixa apareçam em primeiro lugar.</p>
<p></details></p>
<p><details></p>
<p><summary>Criar chaves de bucket compostas</summary></p>
<p>Para criar uma chave de bucket composta, passe vários nomes de campos na mesma lista:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Esta configuração pode produzir chaves como <code translate="no">(Brand A, black)</code>, <code translate="no">(Brand A, blue)</code> e <code translate="no">(Brand B, white)</code>. Duas entidades partilham um bucket apenas quando ambos os valores coincidem. O Milvus preserva a ordem da lista, pelo que <code translate="no">brand</code> é o primeiro componente da chave e <code translate="no">color</code> é o segundo. Quando <code translate="no">_key</code> é utilizado em <code translate="no">order</code>, o Milvus compara os componentes da chave composta na mesma ordem. Passe várias cadeias de caracteres numa lista plana; não são suportadas listas aninhadas.</p>
<p><code translate="no">size=6</code> é o número máximo de buckets compostos devolvidos neste nível de agregação. Os dados de exemplo contêm cinco combinações distintas de marca e cor, pelo que todas as cinco podem ser devolvidas. No <a href="#Limits">limite de entradas devolvidas</a>, este pedido contribui com <code translate="no">1 query vector × 6 buckets × 1 = 6</code> entradas de resultado configuradas.</p>
<p>Vários campos numa lista <code translate="no">SearchAggregation.fields</code> criam uma chave de bucket composta nesse nível de agregação. Para criar uma hierarquia de buckets pai-filho, utilize uma <a href="#Group-results-at-multiple-levels">agregação aninhada</a>.</p>
<p></details></p>
<p>Os exemplos que se seguem redefinem ` <code translate="no">aggregation</code>`. Passe o objeto atualizado para o mesmo parâmetro ` <code translate="no">search_aggregation</code> ` e volte a executar a chamada de pesquisa.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">Mostrar resultados representativos de cada grupo<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>Inclua entidades representativas quando a aplicação precisar de apresentar produtos reais de cada bucket. Neste exemplo, o Milvus devolve até dois produtos de cada bucket de marca, ordenados por classificação e, em seguida, por pontuação vetorial.</p>
<p>Configure <code translate="no">TopHits</code> da seguinte forma:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Visualizar um bucket com resultados representativos</summary></p>
<p>O seguinte bucket da Marca A foi capturado a partir do pedido acima e serializado como JSON para facilitar a leitura.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Finalidade</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>Opcional. Configura entidades representativas para este nível de agregação. Se omitido, « <code translate="no">bucket.hits</code> » fica vazio e o orçamento candidato por chave assume o valor padrão de um.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Devolve até duas entidades representativas de cada grupo selecionado e define o orçamento candidato por chave como dois para toda a árvore de agregação.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Ordena as entidades dentro de cada bucket utilizando os critérios indicados.</td></tr>
</tbody>
</table>
<p>Configure « <code translate="no">top_hits</code> » quando a aplicação necessitar de entidades representativas ou quando as contagens e métricas necessitarem de uma janela de candidatos por chave mais ampla. Um « <code translate="no">TopHits.size</code> » maior aumenta tanto o orçamento de candidatos como o cálculo do número máximo de entradas devolvidas em <a href="#Limits">«Limits</a>».</p>
<p><code translate="no">SearchAggregation.order</code> O «sorts buckets» ordena os buckets, enquanto o « <code translate="no">TopHits.sort</code> » ordena as entidades retidas dentro de cada bucket. A ordem de ordenação não altera quais os candidatos que foram retidos para o « <code translate="no">count</code> » e as métricas. O « <code translate="no">TopHits.sort</code> » aceita nomes de campos escalares comparáveis suportados e o campo integrado « <code translate="no">_score</code> », que representa a semelhança ou distância ANN. O Milvus avalia as entradas « <code translate="no">sort</code> » da primeira à última. Neste exemplo, ordena os produtos por <code translate="no">rating</code> do mais alto para o mais baixo e utiliza <code translate="no">_score</code> apenas quando duas classificações são iguais. Como a configuração utiliza <code translate="no">COSINE</code>, a ordem descendente <code translate="no">_score</code> coloca o produto mais semelhante em primeiro lugar.</p>
<p>Os campos utilizados por <code translate="no">metrics</code> ou <code translate="no">TopHits.sort</code> não têm de aparecer em <code translate="no">output_fields</code>. O Milvus obtém esses campos internamente, mas apenas os campos explicitamente listados em <code translate="no">output_fields</code> são incluídos no mapeamento <code translate="no">fields</code> de cada resultado devolvido. As chaves primárias e as pontuações vetoriais permanecem disponíveis através de <code translate="no">AggregationHit.pk</code> e <code translate="no">AggregationHit.score</code>.</p>
<p>Cada resultado devolvido <code translate="no">AggregationHit</code> expõe a sua chave primária em <code translate="no">pk</code>, a pontuação vetorial em <code translate="no">score</code> e os campos de saída solicitados em <code translate="no">fields</code>.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">Agrupar resultados em vários níveis<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize a agregação aninhada quando precisar de um nível de buckets dentro de outro. Neste exemplo, o Milvus cria primeiro os buckets de categoria e, em seguida, cria os buckets de marca dentro de cada categoria.</p>
<p>A agregação filha recebe apenas as entidades atribuídas ao seu bucket pai. <code translate="no">fields</code> controla a chave do bucket em cada nível de agregação, enquanto <code translate="no">sub_aggregation</code> cria a hierarquia pai-filho.</p>
<p>A configuração abaixo cria um bucket de categoria com a chave <code translate="no">(running_shoes)</code>. Dentro desse bucket pai, a agregação filha cria buckets de marca separados com chaves como <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> e <code translate="no">(Brand C)</code>.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>Cada nível pode utilizar vários campos de forma independente. Por exemplo, a utilização de <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> na agregação filha criaria chaves filhas compostas, como <code translate="no">(Brand A, black)</code>.</p>
<p>A configuração seguinte implementa esta hierarquia:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Visualizar um resultado de bucket aninhado</summary></p>
<p>O excerto serializado a seguir mostra o bucket pai <code translate="no">running_shoes</code> e o seu bucket filho «Brand B». Os buckets filhos «Brand A» e «Brand C» foram omitidos por uma questão de concisão.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>O resultado apresentado representa o caminho do bucket <code translate="no">(running_shoes) → (Brand B)</code>, e não uma única chave de bucket composta <code translate="no">(running_shoes, Brand B)</code>.</p>
<p>O Milvus seleciona primeiro até dois buckets de categoria, ordenados por <code translate="no">product_count</code>. Em seguida, executa <code translate="no">sub_aggregation</code> de forma independente dentro de cada categoria selecionada e devolve até três buckets de marca, ordenados por <code translate="no">avg_rating</code>.</p>
<p>Na saída acima:</p>
<ul>
<li>O grupo raiz « <code translate="no">running_shoes</code> » contém quatro candidatos retidos nas suas chaves compostas filhas. Os seus « <code translate="no">metrics</code> » contêm os valores de nível raiz « <code translate="no">avg_price</code> » e « <code translate="no">product_count</code> ».</li>
<li>A lista « <code translate="no">sub_groups</code> » do bucket raiz contém os buckets de marca filhos. O bucket «Brand B» apresentado contém um candidato retido e os seus próprios valores « <code translate="no">avg_rating</code> » e « <code translate="no">brand_count</code> ».</li>
<li>A lista <code translate="no">hits</code> do bucket raiz está vazia porque a agregação raiz não configura <code translate="no">top_hits</code>. O bucket filho da Marca B contém um resultado representativo porque <code translate="no">top_hits</code> está configurado em <code translate="no">sub_aggregation</code>.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">Qual é o nível de precisão das contagens e métricas dos buckets?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>A agregação de pesquisa resume os candidatos ANN retidos. Não executa uma agregação da coleção completa.</p>
<p>A retenção de candidatos tem duas fases de aproximação. A pesquisa ANN pode omitir entidades relevantes da coleção, e a fase de agrupamento retém, no máximo, os maiores candidatos <code translate="no">TopHits.size</code> para cada chave composta completa. Se nenhum nível configurar <code translate="no">top_hits</code>, este limite por chave é um.</p>
<p>Por exemplo, suponha que uma coleção contenha 5 000 produtos da Marca A e que muitos sejam relevantes para a consulta vetorial. Se a agregação utilizar « <code translate="no">TopHits(size=4)</code> », o bucket da Marca A pode reter, no máximo, quatro candidatos para uma chave composta completa. O seu « <code translate="no">count</code> » e as suas métricas descrevem esses candidatos retidos, e não todos os produtos relevantes da Marca A nem todas as 5 000 entidades da coleção.</p>
<p>A aproximação é mais importante quando a « <code translate="no">order</code> » utiliza um alias de métrica. Alterações na taxa de recuperação da pesquisa podem alterar os valores das métricas e, consequentemente, alterar quais os buckets que se enquadram no « <code translate="no">SearchAggregation.size</code> ». A agregação aninhada pode amplificar este efeito, uma vez que cada nível filho opera sobre as entidades disponíveis no seu bucket pai.</p>
<p>Se precisar de estatísticas exatas sobre todas as entidades correspondentes, utilize um fluxo de trabalho de agregação de consulta exata em vez da Agregação de Pesquisa.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">Em que difere a «Agressão de Pesquisa» da «Pesquisa por Agrupamento»?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Escolha com base no formato de resultados principal da aplicação:</p>
<table>
<thead>
<tr><th>Necessidade principal</th><th>Preferência</th><th>Resposta a consumir</th></tr>
</thead>
<tbody>
<tr><td>Devolver uma lista de entidades ordenada padrão com menos valores repetidos num campo de agrupamento</td><td><a href="/docs/pt/grouping-search.md">Pesquisa agrupada</a></td><td>Resultados de pesquisa planos para cada vetor de consulta</td></tr>
<tr><td>Inspecionar ou comparar grupos como compartimentos, com chaves, contagens, métricas, ordenação, resultados representativos ou compartimentos filhos</td><td>Agregação de pesquisa</td><td><code translate="no">AggregationBucket</code> objetos em <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>Mesmo quando a Agregação de Pesquisa configura « <code translate="no">top_hits</code> », a sua resposta principal continua a ser uma árvore de buckets. A Pesquisa por Agrupamento continua a ser útil quando a aplicação já processa resultados de pesquisa normais e pretende, principalmente, diversidade nos resultados.</p>
<p>As APIs são mutuamente exclusivas. O PyMilvus lança uma exceção « <code translate="no">ParamError</code> » quando « <code translate="no">search_aggregation</code> » é combinado com « <code translate="no">group_by_field</code> » ou « <code translate="no">group_by_fields</code> » na mesma solicitação.</p>
