---
id: benchmark.md
summary: Scopri il risultato del benchmark di Milvus.
title: Rapporto sui test di benchmark di Milvus 2.2
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Rapporto sui test di benchmark di Milvus 2.2<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo rapporto mostra i principali risultati dei test di Milvus 2.2.0. Ha lo scopo di fornire un quadro delle prestazioni di ricerca di Milvus 2.2.0, soprattutto per quanto riguarda la capacità di scalare e scalare.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>Recentemente abbiamo eseguito un benchmark con Milvus 2.2.3 e abbiamo ottenuto i seguenti risultati chiave:</p>
    <ul>
      <li>Riduzione di 2,5 volte della latenza di ricerca</li>
      <li>Un aumento di 4,5 volte dei QPS</li>
      <li>Ricerca di somiglianze su scala miliardaria con un minimo degrado delle prestazioni</li>
      <li>Scalabilità lineare quando si utilizzano più repliche</li>
    </ul>
    <p>Per i dettagli, si rimanda a <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">questo whitepaper</a> e al <a href="https://github.com/zilliztech/VectorDBBench">relativo codice di test di benchmark</a>. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">Sintesi<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>Rispetto a Milvus 2.1, il QPS di Milvus 2.2.0 aumenta di oltre il 48% in modalità cluster e di oltre il 75% in modalità standalone.</li>
<li>Milvus 2.2.0 ha un'impressionante capacità di scalare e scalare:<ul>
<li>Il QPS aumenta linearmente quando si espandono i core della CPU da 8 a 32.</li>
<li>Il QPS aumenta linearmente quando si espandono le repliche di Querynode da 1 a 8.</li>
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
<summary>Fare clic per visualizzare i dettagli dei termini utilizzati nel test</summary>
<table class="terminology">
<thead>
<tr>
<th>Termine</th>
<th>Descrizione</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>Numero di vettori da ricercare in una richiesta di ricerca</td>
</tr>
<tr>
<td>topk</td>
<td>Numero di vettori più vicini da recuperare per ogni vettore (in nq) in una richiesta di ricerca</td>
</tr>
<tr>
<td>ef</td>
<td>Parametro di ricerca specifico dell'<a href="https://milvus.io/docs/v2.2.x/index.md">indice HNSW</a></td>
</tr>
<tr>
<td>RT</td>
<td>Tempo di risposta dall'invio della richiesta alla ricezione della risposta</td>
</tr>
<tr>
<td>QPS</td>
<td>Numero di richieste di ricerca elaborate con successo al secondo.</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">Ambiente di test<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Tutti i test sono stati eseguiti nei seguenti ambienti.</p>
<h3 id="Hardware-environment" class="common-anchor-header">Ambiente hardware</h3><table>
<thead>
<tr><th>Hardware</th><th>Specifiche</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td>CPU Intel® Xeon® Gold 6226R a 2,90GHz</td></tr>
<tr><td>Memoria</td><td>16*32 GB RDIMM, 3200 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Ambiente software</h3><table>
<thead>
<tr><th>Software</th><th>Versione</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Schema di distribuzione</h3><ul>
<li>Le istanze Milvus (standalone o cluster) vengono distribuite tramite <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> su un cluster Kubernetes basato su macchine fisiche o virtuali.</li>
<li>I diversi test variano semplicemente nel numero di core della CPU, nella dimensione della memoria e nel numero di repliche (nodi worker), il che si applica solo ai cluster Milvus.</li>
<li>Le configurazioni non specificate sono identiche a quelle <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">predefinite</a>.</li>
<li>Le dipendenze di Milvus (MinIO, Pulsar ed Etcd) memorizzano i dati sull'SSD locale di ogni nodo.</li>
<li>Le richieste di ricerca vengono inviate alle istanze Milvus tramite <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Set di dati</h3><p>Il test utilizza il dataset open-source SIFT (128 dimensioni) di <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
<h2 id="Test-pipeline" class="common-anchor-header">Pipeline del test<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
<li>Avviare un'istanza Milvus da Helm con le rispettive configurazioni del server come elencato in ogni test.</li>
<li>Connettersi all'istanza Milvus tramite Milvus GO SDK e ottenere i risultati del test corrispondenti.</li>
<li>Creare una raccolta.</li>
<li>Inserire 1 milione di vettori SIFT. Creare un indice HNSW e configurare i parametri dell'indice impostando <code translate="no">M</code> su <code translate="no">8</code> e <code translate="no">efConstruction</code> su <code translate="no">200</code>.</li>
<li>Caricare la raccolta.</li>
<li>Effettuare una ricerca con diversi numeri concomitanti con i parametri di ricerca <code translate="no">nq=1, topk=1, ef=64</code>, la durata di ogni concomitanza è di almeno 1 ora.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">Risultati del test<button data-href="#Test-results" class="anchor-icon" translate="no">
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
<summary><b>Configurazioni del server (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>Prestazioni di ricerca</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fallimento/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>Prestazioni della ricerca in cluster</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">Standalone</h4><p><details>
<summary><b>Configurazioni server (standalone)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>Prestazioni di ricerca</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fallimento/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>Prestazioni della ricerca standalone</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 Scalamento</h3><p>Espandere i core della CPU in un Querynode per verificare la capacità di scalare.</p>
<p><details>
<summary><b>Configurazioni server (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>Prestazioni di ricerca</strong></p>
<table>
<thead>
<tr><th>Core della CPU</th><th>Numero di CPU contemporanee</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fallimento/s</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>Prestazioni di ricerca in base ai core della CPU di Querynode</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 Scalamento</h3><p>Espandere più repliche con più Querynodes per verificare la capacità di scalare.</p>
<div class="alert note">
<p>Nota: il numero di Querynodes è uguale a <code translate="no">replica_number</code> quando si carica la collezione.</p>
</div>
<p><details>
<summary><b>Configurazioni del server (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>Repliche</th><th>Numero di repliche</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fallimento/s</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>Prestazioni di ricerca per repliche Querynode</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Cosa fare dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Provate a eseguire da soli i test di benchmark di Milvus 2.2.0 facendo riferimento a <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">questa guida</a>, tranne per il fatto che dovreste usare Milvus 2.2 e Pymilvus 2.2 in questa guida.</li>
</ul>
