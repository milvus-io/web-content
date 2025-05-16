---
id: clustering-compaction.md
title: Compactação de clusters
related_key: 'clustering, compaction'
summary: >-
  A compactação de clusters foi concebida para melhorar o desempenho da pesquisa
  e reduzir os custos em grandes colecções. Este guia ajudá-lo-á a compreender a
  compactação de clusters e a forma como esta funcionalidade pode melhorar o
  desempenho da pesquisa.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Compactação de clusters<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>A compactação de clusters foi concebida para melhorar o desempenho da pesquisa e reduzir os custos em grandes colecções. Este guia ajudá-lo-á a compreender a compactação de clusters e a forma como esta funcionalidade pode melhorar o desempenho da pesquisa.</p>
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
    </button></h2><p>Milvus armazena entidades de entrada em segmentos dentro de uma coleção e sela um segmento quando ele está cheio. Se isso acontecer, um novo segmento é criado para acomodar entidades adicionais. Como resultado, as entidades são distribuídas arbitrariamente entre os segmentos. Esta distribuição requer que o Milvus pesquise vários segmentos para encontrar os vizinhos mais próximos de um determinado vetor de consulta.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Sem agrupamento Compactação</span> </span></p>
<p>Se Milvus puder distribuir entidades entre segmentos com base nos valores de um campo específico, o âmbito da pesquisa pode ser restringido dentro de um segmento, melhorando assim o desempenho da pesquisa.</p>
<p><strong>Clustering Compaction</strong> é um recurso do Milvus que redistribui entidades entre segmentos em uma coleção com base nos valores de um campo escalar. Para ativar esse recurso, primeiro é necessário selecionar um campo escalar como a <strong>chave de agrupamento</strong>. Isso permite que o Milvus redistribua entidades em um segmento quando seus valores de chave de agrupamento estiverem dentro de um intervalo específico. Quando você aciona uma compactação de clustering, Milvus gera/atualiza um índice global chamado <strong>PartitionStats</strong>, que registra a relação de mapeamento entre segmentos e valores de chave de clustering.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Com compactação de clustering</span> </span></p>
<p>Usando o <strong>PartitionStats</strong> como referência, o Milvus pode eliminar dados irrelevantes ao receber uma solicitação de pesquisa/consulta que contém um valor de chave de clustering e restringir o escopo da pesquisa dentro dos segmentos que mapeiam o valor, melhorando assim o desempenho da pesquisa. Para obter detalhes sobre a melhoria do desempenho, consulte Testes de benchmark.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Usar compactação de clustering<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>O recurso de Compactação de Clustering no Milvus é altamente configurável. Você pode optar por acioná-lo manualmente ou configurá-lo para ser acionado automaticamente em intervalos pelo Milvus. Para ativar a compactação de cluster, faça o seguinte:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Configuração global</h3><p>É necessário modificar o ficheiro de configuração do Milvus conforme indicado abaixo.</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>Configuração Item</th><th>Descrição</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>Especifica se a compactação do agrupamento deve ser activada.<br>Defina esta opção para <code translate="no">true</code> se precisar de ativar esta funcionalidade para todas as colecções que tenham uma chave de agrupamento.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>Especifica se a compactação é activada automaticamente.<br>Definir isto para <code translate="no">true</code> indica que o Milvus compacta as colecções com uma chave de agrupamento nos intervalos especificados.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Especifica o intervalo, em milissegundos, em que o Milvus inicia a compactação do agrupamento.<br>Este parâmetro só é válido se <code translate="no">autoEnable</code> estiver definido como <code translate="no">true</code>.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>Especifica o intervalo mínimo em segundos.<br>Este parâmetro é válido apenas quando <code translate="no">autoEnable</code> está definido como <code translate="no">true</code>.<br>Definir este parâmetro como um número inteiro superior a triggerInterval ajuda a evitar compactações repetidas num curto período de tempo.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>Especifica o intervalo máximo em segundos.<br>Este parâmetro só é válido se <code translate="no">autoEnable</code> estiver definido como <code translate="no">true</code>.<br>Quando o Milvus detecta que uma coleção não foi compactada por um período superior a este valor, força uma compactação por clustering.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>Especifica o limite superior para desencadear uma compactação de agrupamento.<br>Este parâmetro só é válido quando <code translate="no">autoEnable</code> está definido como <code translate="no">true</code>.<br>Quando o Milvus detecta que o volume de dados de uma coleção excede este valor, inicia um processo de compactação em cluster.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Especifica a duração do timeout para uma compactação de clustering.<br>Uma compactação de clustering falha se o tempo de execução exceder esse valor.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>Item de configuração</th><th>Descrição</th><th>Valor padrão</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Especifica se o Milvus remove os dados consultando o PartitionStats ao receber solicitações de pesquisa/consulta.<br>Definir esta opção como <code translate="no">true</code> permite que o Milvus remova dados irrelevantes dos segmentos durante uma solicitação de pesquisa/consulta.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>Item de configuração</th><th>Descrição</th><th>Valor padrão</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>Especifica a taxa de buffer de memória para tarefas de compactação de cluster. <br>O Milvus descarrega os dados quando o tamanho dos dados excede o tamanho do buffer alocado calculado usando essa proporção.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>Especifica o tamanho do pool de trabalhadores para uma tarefa de compactação de agrupamento.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>Item de configuração</th><th>Descrição</th><th>Valor predefinido</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>Especifica se a chave de partição em colecções deve ser utilizada como chave de clustering.<br>Definir isto para <code translate="no">true</code> indica que a chave de partição é utilizada como chave de agrupamento.<br>É sempre possível substituir esta definição numa coleção definindo explicitamente uma chave de agrupamento.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>Para aplicar as alterações acima ao seu cluster Milvus, siga os passos em <a href="/docs/pt/v2.4.x/configure-helm.md">Configurar Milvus com Helm</a> e <a href="/docs/pt/v2.4.x/configure_operator.md">Configurar Milvus com Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Configuração da coleção</h3><p>Para compactar o cluster numa coleção específica, deve selecionar um campo escalar da coleção como chave de cluster.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pode utilizar os campos escalares dos seguintes tipos de dados como chave de agrupamento: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, e <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">Acionar compactação de clustering<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Se tiver ativado a compactação automática do clustering, o Milvus desencadeia automaticamente a compactação no intervalo especificado. Em alternativa, pode ativar manualmente a compactação da seguinte forma:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">Teste de Benchmark</h3><p>O volume de dados e os padrões de consulta combinados determinam a melhoria de desempenho que a compactação de cluster pode trazer. Um teste de benchmark interno demonstra que a compactação de clustering produz uma melhoria de até 25 vezes nas consultas por segundo (QPS).</p>
<p>O teste de referência é feito numa coleção que contém entidades de um conjunto de dados LAION de 20 milhões e 768 dimensões, com o campo chave designado como chave de clustering. Depois que a compactação de clustering é acionada na coleção, pesquisas simultâneas são enviadas até que o uso da CPU atinja um nível alto de água.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">Filtro de pesquisa</th>
      <th rowspan="2">Rácio de poda</th>
      <th colspan="5">Latência (ms)</th>
      <th rowspan="2">QPS (reqs/s)</th>
    </tr>
    <tr>
      <th>Média</th>
      <th>Mínimo</th>
      <th>Máximo</th>
      <th>Mediana</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nenhum</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>chave &gt; 200 e chave &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>chave &gt; 200 e chave &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>chave &gt; 200 e chave &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>chave == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>À medida que o intervalo de pesquisa é reduzido nos filtros de pesquisa, o rácio de poda aumenta. Isto significa que mais entidades são ignoradas durante o processo de pesquisa. Ao comparar as estatísticas na primeira e na última linha, pode ver que as pesquisas sem compactação de clusters requerem a pesquisa de toda a coleção. Por outro lado, as pesquisas com compactação de clusters utilizando uma chave específica podem alcançar uma melhoria de até 25 vezes.</p>
<h2 id="Best-practices" class="common-anchor-header">Melhores práticas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Aqui estão algumas dicas para usar a compactação de clustering de forma eficiente:</p>
<ul>
<li><p>Ativar esta opção para colecções com grandes volumes de dados. O desempenho da pesquisa melhora com maiores volumes de dados numa coleção. É uma boa opção ativar esta funcionalidade para colecções com mais de 1 milhão de entidades.</p></li>
<li><p>Escolha uma chave de agrupamento adequada: Pode utilizar campos escalares normalmente empregues como condições de filtragem como chave de agrupamento. Para uma coleção que contém dados de vários inquilinos, pode utilizar o campo que distingue um inquilino de outro como chave de agrupamento.</p></li>
<li><p>Utilizar a chave de partição como chave de agrupamento. Pode definir <code translate="no">common.usePartitionKeyAsClusteringKey</code> como true se pretender ativar esta funcionalidade para todas as colecções na sua instância Milvus ou se continuar a ter problemas de desempenho numa coleção grande com uma chave de partição. Ao fazê-lo, terá uma chave de clustering e uma chave de partição quando escolher um campo escalar numa coleção como chave de partição.</p>
<p>Note que esta definição não impede a escolha de outro campo escalar como chave de agrupamento. A chave de clustering explicitamente designada tem sempre precedência.</p></li>
</ul>
