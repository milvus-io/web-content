---
id: benchmark.md
summary: Erfahren Sie mehr über das Benchmark-Ergebnis von Milvus.
title: Milvus 2.2 Benchmark-Testbericht
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Milvus 2.2 Benchmark-Testbericht<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Bericht zeigt die wichtigsten Testergebnisse von Milvus 2.2.0. Er soll einen Überblick über die Suchleistung von Milvus 2.2.0 geben, insbesondere im Hinblick auf die Skalierbarkeit und Skalierbarkeit nach oben.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>Wir haben kürzlich einen Benchmark mit Milvus 2.2.3 durchgeführt und sind zu folgenden Ergebnissen gekommen:</p>
    <ul>
      <li>Eine 2,5-fache Reduzierung der Suchlatenz</li>
      <li>Eine 4,5-fache Steigerung der QPS</li>
      <li>Ähnlichkeitssuche im Milliardenmaßstab mit geringen Leistungseinbußen</li>
      <li>Lineare Skalierbarkeit bei Verwendung mehrerer Replikate</li>
    </ul>
    <p>Einzelheiten finden Sie in <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">diesem Whitepaper</a> und dem <a href="https://github.com/zilliztech/VectorDBBench">zugehörigen Benchmark-Testcode</a>. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">Zusammenfassung<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>Im Vergleich zu Milvus 2.1 erhöht sich die QPS von Milvus 2.2.0 im Clustermodus um über 48% und im Einzelplatzmodus um über 75%.</li>
<li>Milvus 2.2.0 verfügt über eine beeindruckende Fähigkeit zur Skalierung nach oben und nach unten:<ul>
<li>Die QPS steigt linear an, wenn die CPU-Kerne von 8 auf 32 erweitert werden.</li>
<li>QPS nimmt linear zu, wenn die Anzahl der Querynode-Replikate von 1 auf 8 erhöht wird.</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">Terminologie<button data-href="#Terminology" class="anchor-icon" translate="no">
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
<summary>Klicken Sie hier, um die Details der im Test verwendeten Begriffe zu sehen</summary>
<table class="terminology">
<thead>
<tr>
<th>Begriff</th>
<th>Beschreibung</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>Anzahl der zu durchsuchenden Vektoren in einer Suchanfrage</td>
</tr>
<tr>
<td>topk</td>
<td>Anzahl der nächstgelegenen Vektoren, die für jeden Vektor (in nq) in einer Suchanfrage abgerufen werden</td>
</tr>
<tr>
<td>ef</td>
<td>Ein für den <a href="https://milvus.io/docs/v2.2.x/index.md">HNSW-Index</a> spezifischer Suchparameter</td>
</tr>
<tr>
<td>RT</td>
<td>Antwortzeit vom Senden der Anfrage bis zum Empfang der Antwort</td>
</tr>
<tr>
<td>QPS</td>
<td>Anzahl der Suchanfragen, die pro Sekunde erfolgreich bearbeitet werden</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">Testumgebung<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Alle Tests werden unter den folgenden Bedingungen durchgeführt.</p>
<h3 id="Hardware-environment" class="common-anchor-header">Hardware-Umgebung</h3><table>
<thead>
<tr><th>Hardware</th><th>Spezifikation</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td>Intel® Xeon® Gold 6226R CPU @ 2,90GHz</td></tr>
<tr><td>Speicher</td><td>16*\32 GB RDIMM, 3200 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbit/s</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Software-Umgebung</h3><table>
<thead>
<tr><th>Software</th><th>Version</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Bereitstellungsschema</h3><ul>
<li>Milvus-Instanzen (Standalone oder Cluster) werden über <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> auf einem Kubernetes-Cluster basierend auf physischen oder virtuellen Maschinen bereitgestellt.</li>
<li>Verschiedene Tests unterscheiden sich lediglich in der Anzahl der CPU-Kerne, der Größe des Speichers und der Anzahl der Replikate (Worker Nodes), was nur für Milvus-Cluster gilt.</li>
<li>Nicht spezifizierte Konfigurationen sind mit den <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">Standardkonfigurationen</a> identisch.</li>
<li>Milvus-Abhängigkeiten (MinIO, Pulsar und Etcd) speichern Daten auf der lokalen SSD in jedem Knoten.</li>
<li>Suchanfragen werden über das <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a> an die Milvus-Instanzen gesendet.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Datensätze</h3><p>Der Test verwendet den Open-Source-Datensatz SIFT (128 Dimensionen) von <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
<h2 id="Test-pipeline" class="common-anchor-header">Test-Pipeline<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
<li>Starten Sie eine Milvus-Instanz über Helm mit den entsprechenden Serverkonfigurationen, wie in jedem Test aufgeführt.</li>
<li>Verbinden Sie sich mit der Milvus-Instanz über das Milvus GO SDK und rufen Sie die entsprechenden Testergebnisse ab.</li>
<li>Erstellen Sie eine Sammlung.</li>
<li>Fügen Sie 1 Million SIFT-Vektoren ein. Erstellen Sie einen HNSW-Index und konfigurieren Sie die Indexparameter, indem Sie <code translate="no">M</code> auf <code translate="no">8</code> und <code translate="no">efConstruction</code> auf <code translate="no">200</code> setzen.</li>
<li>Laden Sie die Sammlung.</li>
<li>Suchen Sie mit verschiedenen gleichzeitigen Nummern mit den Suchparametern <code translate="no">nq=1, topk=1, ef=64</code>, die Dauer jeder Gleichzeitigkeit beträgt mindestens 1 Stunde.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">Testergebnisse<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 vs. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">Cluster</h4><p><details>
<summary><b>Serverkonfigurationen (Cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>Suchleistung</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>Ausfälle/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>Leistung der Clustersuche</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">Eigenständig</h4><p><details>
<summary><b>Serverkonfigurationen (Standalone)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>Suchleistung</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>Ausfälle/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>Eigenständige Suchleistung</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 Hochskalierung</h3><p>Erweitern Sie die CPU-Kerne in einem Querynode, um die Fähigkeit zur Skalierung zu prüfen.</p>
<p><details>
<summary><b>Server-Konfigurationen (Cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>Suchleistung</strong></p>
<table>
<thead>
<tr><th>CPU-Kerne</th><th>Gleichzeitige Anzahl</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>Ausfälle/s</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>Suchleistung nach Querynode CPU-Kernen</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 Ausdehnung</h3><p>Erweitern Sie weitere Replikate mit mehr Querynodes, um die Fähigkeit zur Skalierung zu prüfen.</p>
<div class="alert note">
<p>Hinweis: Die Anzahl der Querynodes entspricht der <code translate="no">replica_number</code> beim Laden der Sammlung.</p>
</div>
<p><details>
<summary><b>Server-Konfigurationen (Cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>Replikate</th><th>Gleichzeitige Anzahl</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>Ausfälle/s</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>Suchleistung nach Querynode-Replikaten</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Versuchen Sie, Milvus 2.2.0-Benchmark-Tests selbst durchzuführen, indem Sie sich auf <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">diesen Leitfaden</a> beziehen, nur dass Sie stattdessen Milvus 2.2 und Pymilvus 2.2 in diesem Leitfaden verwenden sollten.</li>
</ul>
