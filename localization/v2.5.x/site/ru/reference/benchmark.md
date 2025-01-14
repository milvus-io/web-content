---
id: benchmark.md
summary: Узнайте об эталонном результате Милвуса.
title: Отчет о тестировании Milvus 2.2 Benchmark
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Отчет о тестировании Milvus 2.2 Benchmark<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом отчете представлены основные результаты тестирования Milvus 2.2.0. Его цель - дать представление о производительности поиска Milvus 2.2.0, особенно в части возможности расширения и масштабирования.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>Недавно мы провели сравнение с Milvus 2.2.3 и получили следующие основные результаты:</p>
    <ul>
      <li>2,5-кратное сокращение задержки при поиске</li>
      <li>Увеличение QPS в 4,5 раза</li>
      <li>Поиск сходства в миллиардных масштабах с незначительным снижением производительности</li>
      <li>Линейная масштабируемость при использовании нескольких реплик.</li>
    </ul>
    <p>Для получения более подробной информации, пожалуйста, обратитесь к <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">этому техническому описанию</a> и <a href="https://github.com/zilliztech/VectorDBBench">соответствующему тестовому коду бенчмарка</a>. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">Резюме<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>По сравнению с Milvus 2.1, QPS Milvus 2.2.0 увеличивается более чем на 48 % в кластерном режиме и более чем на 75 % в автономном режиме.</li>
<li>Milvus 2.2.0 обладает впечатляющей способностью к увеличению и уменьшению масштаба:<ul>
<li>QPS линейно увеличивается при увеличении числа ядер процессора с 8 до 32.</li>
<li>QPS линейно увеличивается при увеличении количества реплик Querynode с 1 до 8.</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">Терминология<button data-href="#Terminology" class="anchor-icon" translate="no">
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
<summary>Нажмите, чтобы узнать подробности терминов, использованных в тесте</summary>
<table class="terminology">
<thead>
<tr>
<th>Термин</th>
<th>Описание</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>Количество векторов для поиска в одном поисковом запросе</td>
</tr>
<tr>
<td>topk</td>
<td>Число ближайших векторов, которые будут найдены для каждого вектора (в nq) в поисковом запросе</td>
</tr>
<tr>
<td>ef</td>
<td>Параметр поиска, специфичный для <a href="https://milvus.io/docs/v2.2.x/index.md">индекса HNSW</a></td>
</tr>
<tr>
<td>RT</td>
<td>Время от отправки запроса до получения ответа</td>
</tr>
<tr>
<td>QPS</td>
<td>Количество успешно обработанных поисковых запросов в секунду</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">Тестовая среда<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Все тесты проводятся в следующих средах.</p>
<h3 id="Hardware-environment" class="common-anchor-header">Аппаратная среда</h3><table>
<thead>
<tr><th>Аппаратное обеспечение</th><th>Спецификация</th></tr>
</thead>
<tbody>
<tr><td>ПРОЦЕССОР</td><td>Центральный процессор Intel® Xeon® Gold 6226R @ 2,90 ГГц</td></tr>
<tr><td>Память</td><td>16*\32 ГБ RDIMM, 3200 MT/s</td></tr>
<tr><td>ТВЕРДОТЕЛЬНЫЙ НАКОПИТЕЛЬ</td><td>SATA 6 Гбит/с</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Программная среда</h3><table>
<thead>
<tr><th>Программное обеспечение</th><th>Версия</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Схема развертывания</h3><ul>
<li>Экземпляры Milvus (автономные или кластерные) разворачиваются через <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> на кластере Kubernetes на базе физических или виртуальных машин.</li>
<li>Различные тесты могут отличаться количеством ядер процессора, объемом памяти и количеством реплик (рабочих узлов), что относится только к кластерам Milvus.</li>
<li>Неопределенные конфигурации идентичны <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">конфигурациям по умолчанию</a>.</li>
<li>Зависимости Milvus (MinIO, Pulsar и Etcd) хранят данные на локальном SSD в каждом узле.</li>
<li>Поисковые запросы отправляются на экземпляры Milvus через <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Наборы данных</h3><p>В тесте используется открытый набор данных SIFT (128 измерений) из <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
<h2 id="Test-pipeline" class="common-anchor-header">Конвейер тестирования<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
<li>Запустите экземпляр Milvus с помощью Helm с соответствующими конфигурациями сервера, указанными в каждом тесте.</li>
<li>Подключитесь к экземпляру Milvus с помощью Milvus GO SDK и получите соответствующие результаты тестирования.</li>
<li>Создайте коллекцию.</li>
<li>Вставьте 1 миллион векторов SIFT. Создайте индекс HNSW и настройте параметры индекса, установив <code translate="no">M</code> на <code translate="no">8</code> и <code translate="no">efConstruction</code> на <code translate="no">200</code>.</li>
<li>Загрузите коллекцию.</li>
<li>Выполните поиск с различным числом одновременных запросов с параметрами поиска <code translate="no">nq=1, topk=1, ef=64</code>, длительность каждого одновременного запроса не менее 1 часа.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">Результаты тестирования<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 против Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">Кластер</h4><p><details>
<summary><b>Конфигурации серверов (кластер)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>Производительность поиска</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / мс</th><th>RT(TP50) / мс</th><th>отказ/с</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>Производительность кластерного поиска</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">Автономный</h4><p><details>
<summary><b>Конфигурации серверов (автономные)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>Производительность поиска</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / мс</th><th>RT(TP50) / мс</th><th>отказ/с</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>Производительность автономного поиска</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 Масштабирование</h3><p>Увеличьте количество процессорных ядер в одном Querynode, чтобы проверить возможность масштабирования.</p>
<p><details>
<summary><b>Конфигурации серверов (кластер)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>Производительность поиска</strong></p>
<table>
<thead>
<tr><th>Ядра процессора</th><th>Количество одновременных</th><th>QPS</th><th>RT(TP99) / мс</th><th>RT(TP50) / мс</th><th>отказ/с</th></tr>
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
   </span> <span class="img-wrapper"> <span>Производительность поиска по процессорным ядрам Querynode</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 Масштабирование</h3><p>Расширьте количество реплик с помощью большего числа Querynodes, чтобы проверить возможность масштабирования.</p>
<div class="alert note">
<p>Примечание: количество Querynodes равно <code translate="no">replica_number</code> при загрузке коллекции.</p>
</div>
<p><details>
<summary><b>Конфигурации сервера (кластера)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>Реплики</th><th>Количество одновременных</th><th>QPS</th><th>RT(TP99) / мс</th><th>RT(TP50) / мс</th><th>отказ/с</th></tr>
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
   </span> <span class="img-wrapper"> <span>Производительность поиска по репликам Querynode</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Попробуйте самостоятельно выполнить эталонные тесты Milvus 2.2.0, обратившись к <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">этому руководству</a>, за исключением того, что в данном руководстве следует использовать Milvus 2.2 и Pymilvus 2.2.</li>
</ul>
