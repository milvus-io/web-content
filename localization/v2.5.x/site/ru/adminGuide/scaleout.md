---
id: scaleout.md
related_key: scale Milvus cluster
summary: >-
  Узнайте, как вручную или автоматически расширять и масштабировать кластер
  Milvus.
title: Масштабирование кластера Milvus
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Масштабирование кластера Milvus<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus поддерживает горизонтальное масштабирование своих компонентов. Это означает, что вы можете увеличивать или уменьшать количество рабочих узлов каждого типа в зависимости от ваших потребностей.</p>
<p>В этой теме описывается, как масштабировать и расширять кластер Milvus. Мы предполагаем, что перед масштабированием вы уже <a href="/docs/ru/install_cluster-helm.md">установили кластер Milvus</a>. Кроме того, мы рекомендуем ознакомиться с <a href="/docs/ru/architecture_overview.md">архитектурой Milvus</a> до начала работы.</p>
<p>В этом руководстве в качестве примера рассматривается масштабирование трех узлов запросов. Чтобы масштабировать узлы других типов, замените <code translate="no">queryNode</code> на соответствующий тип узла в командной строке.</p>
<div class="alert note">
<p>Информацию о том, как масштабировать кластер с помощью Milvus Operator, см. в разделе <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Масштабирование кластера с помощью Milvus Operator</a>.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">Что такое горизонтальное масштабирование?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>Горизонтальное масштабирование включает в себя масштабирование наружу и масштабирование внутрь.</p>
<h3 id="Scaling-out" class="common-anchor-header">Масштабирование наружу</h3><p>Под масштабированием понимается увеличение количества узлов в кластере. В отличие от увеличения масштаба, при масштабировании не требуется выделять больше ресурсов на один узел кластера. Вместо этого масштабирование расширяет кластер по горизонтали за счет добавления новых узлов.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>Scaleout</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>Scaleup</span> </span></p>
<p>Согласно <a href="/docs/ru/architecture_overview.md">архитектуре Milvus</a>, рабочие узлы без статических данных включают узел запросов, узел данных, индексный узел и прокси. Поэтому вы можете масштабировать эти типы узлов в соответствии с вашими бизнес-потребностями и сценариями работы приложений. Масштабировать кластер Milvus можно как вручную, так и автоматически.</p>
<p>Как правило, масштабирование созданного вами кластера Milvus требуется в случае его чрезмерной загрузки. Ниже перечислены типичные ситуации, в которых может потребоваться масштабирование кластера Milvus:</p>
<ul>
<li>Использование процессора и памяти в течение некоторого времени остается высоким.</li>
<li>Пропускная способность запросов становится выше.</li>
<li>Требуется более высокая скорость индексирования.</li>
<li>Необходимо обрабатывать большие объемы данных.</li>
<li>Необходимо обеспечить высокую доступность сервиса Milvus.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">Масштабирование внутрь</h3><p>Масштабирование означает уменьшение количества узлов в кластере. Как правило, масштабирование созданного вами кластера Milvus необходимо, если он недостаточно используется. Ниже перечислены типичные ситуации, когда необходимо масштабировать кластер Milvus:</p>
<ul>
<li>В течение определенного периода времени процессор и память используются слабо.</li>
<li>Пропускная способность запросов становится ниже.</li>
<li>Более высокая скорость индексирования не требуется.</li>
<li>Размер обрабатываемого набора данных невелик.</li>
</ul>
<div class="alert note">
Мы не рекомендуем резко уменьшать количество рабочих узлов. Например, если в кластере пять узлов данных, мы рекомендуем сокращать по одному узлу данных за раз, чтобы обеспечить доступность сервиса. Если сервис доступен после первой попытки масштабирования, можно продолжить дальнейшее сокращение числа узлов данных.</div>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Запустите <code translate="no">kubectl get pods</code>, чтобы получить список компонентов и их рабочее состояние в созданном вами кластере Milvus.</p>
<pre><code translate="no">NAME                                            READY   STATUS       RESTARTS   AGE
my-release-etcd-0                               1/1     Running      0          1m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running      0          1m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running      0          1m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running      0          1m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running      0          1m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running      0          1m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running      0          1m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running      0          1m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running      0          1m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running      0          1m
my-release-minio-5564fbbddc-9sbgv               1/1     Running      0          1m 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Milvus поддерживает только добавление рабочих узлов и не поддерживает добавление компонентов координатора.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Масштабирование кластера Milvus<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Масштабировать кластер Milvus можно как вручную, так и автоматически. Об автоматическом масштабировании с помощью Horizontal Pod Autoscaling (HPA) см. в разделе <a href="/docs/ru/hpa.md">Настройка HPA для Milvus</a>. Если автомасштабирование включено, кластер Milvus будет автоматически сжиматься или расширяться, когда потребление ресурсов процессора и памяти достигнет заданного значения.</p>
<p>В настоящее время Milvus 2.1.0 поддерживает только ручное масштабирование.</p>
<h4 id="Scaling-out" class="common-anchor-header">Масштабирование</h4><p>Запустите <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code>, чтобы вручную уменьшить масштаб узла запросов.</p>
<p>В случае успеха на узел запросов будут добавлены три запущенные капсулы, как показано в следующем примере.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-czq9f    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-jcdcn    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h4 id="Scaling-in" class="common-anchor-header">Масштабирование внутрь</h4><p>Выполните команду <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code>, чтобы увеличить масштаб узла запросов.</p>
<p>В случае успеха три работающих стручка на узле запросов будут уменьшены до одного, как показано в следующем примере.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Если вы хотите узнать, как отслеживать службы Milvus и создавать оповещения:</p>
<ul>
<li>Узнайте о <a href="/docs/ru/monitor.md">мониторинге Milvus с помощью Prometheus Operator на Kubernetes</a>.</li>
</ul></li>
<li><p>Если вы готовы развернуть свой кластер в облаке:</p>
<ul>
<li>Узнайте, как <a href="/docs/ru/eks.md">развернуть Milvus на Amazon EKS с помощью Terraform</a>.</li>
<li>Узнайте, как <a href="/docs/ru/gcp.md">развернуть кластер Milvus на GCP с помощью Kubernetes</a></li>
<li>Узнайте, как <a href="/docs/ru/azure.md">развернуть Milvus на Microsoft Azure с помощью Kubernetes</a>.</li>
</ul></li>
<li><p>Если вы ищете инструкции по выделению ресурсов:</p>
<ul>
<li><a href="/docs/ru/allocate.md#standalone">Распределение ресурсов на Kubernetes</a></li>
</ul></li>
</ul>
