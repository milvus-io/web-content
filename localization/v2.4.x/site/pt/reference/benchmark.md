---
id: benchmark.md
summary: Conheça o resultado de referência do Milvus.
title: Relatório de teste de referência do Milvus 2.2
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Relatório de testes de referência do Milvus 2.2<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>Este relatório mostra os principais resultados dos testes do Milvus 2.2.0. O seu objetivo é fornecer uma imagem do desempenho de pesquisa do Milvus 2.2.0, especialmente no que diz respeito à capacidade de aumentar e diminuir a escala.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>Recentemente, efectuámos um teste de referência em relação ao Milvus 2.2.3 e obtivemos os seguintes resultados principais:</p>
    <ul>
      <li>Uma redução de 2,5x na latência de pesquisa</li>
      <li>Um aumento de 4,5x no QPS</li>
      <li>Pesquisa de similaridade em escala de bilhões com pouca degradação de desempenho</li>
      <li>Escalabilidade linear ao usar várias réplicas</li>
    </ul>
    <p>Para obter detalhes, consulte <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">este whitepaper</a> e <a href="https://github.com/zilliztech/VectorDBBench">o código de teste de benchmark relacionado</a>. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">Resumo<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>Em comparação com o Milvus 2.1, o QPS do Milvus 2.2.0 aumenta mais de 48% no modo de cluster e mais de 75% no modo autónomo.</li>
<li>O Milvus 2.2.0 tem uma capacidade impressionante de escalar para cima e para fora:<ul>
<li>O QPS aumenta linearmente ao expandir os núcleos da CPU de 8 para 32.</li>
<li>O QPS aumenta linearmente quando se expandem as réplicas Querynode de 1 para 8.</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">Terminologia<button data-href="#Terminology" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary>Clique para ver os detalhes dos termos usados no teste</summary>
<table class="terminology">
<thead>
<tr>
<th>Termo</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>Número de vectores a pesquisar num pedido de pesquisa</td>
</tr>
<tr>
<td>topk</td>
<td>Número de vectores mais próximos a obter para cada vetor (em nq) num pedido de pesquisa</td>
</tr>
<tr>
<td>ef</td>
<td>Um parâmetro de pesquisa específico do <a href="https://milvus.io/docs/v2.2.x/index.md">índice HNSW</a></td>
</tr>
<tr>
<td>RT</td>
<td>Tempo de resposta desde o envio do pedido até à receção da resposta</td>
</tr>
<tr>
<td>QPS</td>
<td>Número de pedidos de pesquisa que são processados com êxito por segundo</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">Ambiente de teste<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Todos os testes são efectuados nos seguintes ambientes.</p>
<h3 id="Hardware-environment" class="common-anchor-header">Ambiente de hardware</h3><table>
<thead>
<tr><th>Hardware</th><th>Especificação</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td>CPU Intel® Xeon® Gold 6226R a 2,90GHz</td></tr>
<tr><td>Memória</td><td>16*\32 GB RDIMM, 3200 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Ambiente de software</h3><table>
<thead>
<tr><th>Software</th><th>Versão do software</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Esquema de implantação</h3><ul>
<li>As instâncias do Milvus (autónomas ou em cluster) são implementadas através do <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> num cluster Kubernetes baseado em máquinas físicas ou virtuais.</li>
<li>Os diferentes testes variam apenas no número de núcleos de CPU, no tamanho da memória e no número de réplicas (nós de trabalho), o que só se aplica aos clusters Milvus.</li>
<li>As configurações não especificadas são idênticas às <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">configurações padrão</a>.</li>
<li>As dependências do Milvus (MinIO, Pulsar e Etcd) armazenam dados no SSD local em cada nó.</li>
<li>Os pedidos de pesquisa são enviados para as instâncias do Milvus através do <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Conjuntos de dados</h3><p>O teste usa o conjunto de dados de código aberto SIFT (128 dimensões) do <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
<h2 id="Test-pipeline" class="common-anchor-header">Pipeline de teste<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Inicie uma instância do Milvus pelo Helm com as respectivas configurações de servidor, conforme listado em cada teste.</li>
<li>Ligue-se à instância do Milvus através do Milvus GO SDK e obtenha os resultados dos testes correspondentes.</li>
<li>Criar uma coleção.</li>
<li>Inserir 1 milhão de vectores SIFT. Crie um índice HNSW e configure os parâmetros do índice, definindo <code translate="no">M</code> para <code translate="no">8</code> e <code translate="no">efConstruction</code> para <code translate="no">200</code>.</li>
<li>Carregue a coleção.</li>
<li>Pesquise com diferentes números concorrentes com os parâmetros de pesquisa <code translate="no">nq=1, topk=1, ef=64</code>, a duração de cada concorrência é de, pelo menos, 1 hora.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">Resultados do teste<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 v.s. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">Cluster</h4><p><details>
<summary><b>Configurações do servidor (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>Desempenho da pesquisa</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>falha/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>Desempenho da pesquisa em cluster</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">Autónomo</h4><p><details>
<summary><b>Configurações de servidor (autónomo)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>Desempenho da pesquisa</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>falha/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>Desempenho da pesquisa autónoma</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 Aumento de escala</h3><p>Expanda os núcleos de CPU num Querynode para verificar a capacidade de aumento de escala.</p>
<p><details>
<summary><b>Configurações de servidor (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>Desempenho da pesquisa</strong></p>
<table>
<thead>
<tr><th>Núcleos de CPU</th><th>Número simultâneo</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>falha/s</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>Desempenho de pesquisa por núcleos de CPU Querynode</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 Expansão</h3><p>Expanda mais réplicas com mais Querynodes para verificar a capacidade de expansão.</p>
<div class="alert note">
<p>Nota: o número de Querynodes é igual a <code translate="no">replica_number</code> ao carregar a coleção.</p>
</div>
<p><details>
<summary><b>Configurações do servidor (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>Réplicas</th><th>Número simultâneo</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>falha/s</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>Desempenho da pesquisa por réplicas Querynode</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Tente realizar os testes de benchmark do Milvus 2.2.0 por conta própria, consultando <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">este guia</a>, exceto que você deve usar o Milvus 2.2 e o Pymilvus 2.2 neste guia.</li>
</ul>
