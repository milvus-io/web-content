---
id: scaleout.md
related_key: scale Milvus cluster
summary: >-
  Imparate a scalare manualmente o automaticamente e a scalare in un cluster
  Milvus.
title: Scalare un cluster Milvus
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Scalare un cluster Milvus<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supporta la scalabilità orizzontale dei suoi componenti. Ciò significa che è possibile aumentare o diminuire il numero di nodi worker di ciascun tipo in base alle proprie esigenze.</p>
<p>Questo argomento descrive come ridimensionare e scalare un cluster Milvus. Si presuppone che sia già stato <a href="/docs/it/v2.4.x/install_cluster-helm.md">installato un cluster Milvus</a> prima di scalare. Inoltre, si consiglia di familiarizzare con l'<a href="/docs/it/v2.4.x/architecture_overview.md">architettura</a> di <a href="/docs/it/v2.4.x/architecture_overview.md">Milvus</a> prima di iniziare.</p>
<p>Questa esercitazione prende come esempio il ridimensionamento di tre nodi di query. Per scalare altri tipi di nodi, sostituire <code translate="no">queryNode</code> con il tipo di nodo corrispondente nella riga di comando.</p>
<div class="alert note">
<p>Per informazioni su come scalare un cluster con Milvus Operator, consultare <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Scala un cluster con Milvus Operator</a>.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">Che cos'è il ridimensionamento orizzontale?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>Il ridimensionamento orizzontale comprende il ridimensionamento in uscita e il ridimensionamento in entrata.</p>
<h3 id="Scaling-out" class="common-anchor-header">Ridimensionamento</h3><p>Lo scaling out si riferisce all'aumento del numero di nodi in un cluster. A differenza dello scaling up, lo scaling out non richiede l'allocazione di più risorse a un nodo del cluster. Invece, lo scaling out espande il cluster orizzontalmente aggiungendo altri nodi.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>Scalare</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>Scalare</span> </span></p>
<p>Secondo l'<a href="/docs/it/v2.4.x/architecture_overview.md">architettura Milvus</a>, i nodi worker stateless includono il nodo di interrogazione, il nodo dati, il nodo indice e il proxy. Pertanto, è possibile scalare questo tipo di nodi in base alle esigenze aziendali e agli scenari applicativi. È possibile ridimensionare il cluster Milvus manualmente o automaticamente.</p>
<p>In genere, è necessario ridimensionare il cluster Milvus creato se è sovrautilizzato. Di seguito sono riportate alcune situazioni tipiche in cui potrebbe essere necessario ridimensionare il cluster Milvus:</p>
<ul>
<li>L'utilizzo della CPU e della memoria è elevato per un certo periodo di tempo.</li>
<li>Il throughput delle query diventa più elevato.</li>
<li>È necessaria una maggiore velocità di indicizzazione.</li>
<li>È necessario elaborare volumi massicci di grandi insiemi di dati.</li>
<li>È necessario garantire un'elevata disponibilità del servizio Milvus.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">Scalare in</h3><p>Per scalare si intende diminuire il numero di nodi in un cluster. In genere, è necessario scalare il cluster Milvus creato se è sottoutilizzato. Di seguito sono riportate alcune situazioni tipiche in cui è necessario scalare il cluster Milvus:</p>
<ul>
<li>L'utilizzo della CPU e della memoria è basso per un certo periodo di tempo.</li>
<li>Il throughput delle query si riduce.</li>
<li>Non è richiesta una maggiore velocità di indicizzazione.</li>
<li>Le dimensioni del set di dati da elaborare sono ridotte.</li>
</ul>
<div class="alert note">
Non si consiglia di ridurre drasticamente il numero di nodi worker. Ad esempio, se nel cluster ci sono cinque nodi dati, si consiglia di ridurre un nodo dati alla volta per garantire la disponibilità del servizio. Se il servizio è disponibile dopo il primo tentativo di ridimensionamento, è possibile continuare a ridurre ulteriormente il numero di nodi di dati.</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguire <code translate="no">kubectl get pods</code> per ottenere un elenco dei componenti e del loro stato di funzionamento nel cluster Milvus creato.</p>
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
Milvus supporta solo l'aggiunta dei nodi worker e non supporta l'aggiunta dei componenti coordinatori.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Scalare un cluster Milvus<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile scalare il cluster Milvus manualmente o automaticamente. Se l'autoscaling è abilitato, il cluster Milvus si riduce o si espande automaticamente quando il consumo di risorse di CPU e memoria raggiunge il valore impostato.</p>
<p>Attualmente, Milvus 2.1.0 supporta solo il ridimensionamento manuale.</p>
<h4 id="Scaling-out" class="common-anchor-header">Ridimensionamento</h4><p>Eseguire <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> per scalare manualmente il nodo di query.</p>
<p>Se l'operazione ha successo, vengono aggiunti tre pod in esecuzione sul nodo di query, come mostrato nell'esempio seguente.</p>
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
<h4 id="Scaling-in" class="common-anchor-header">Scalare all'interno</h4><p>Eseguire <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> per scalare il nodo di query.</p>
<p>In caso di successo, i tre pod in esecuzione sul nodo di query vengono ridotti a uno, come mostrato nell'esempio seguente.</p>
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
<li><p>Se si desidera imparare a monitorare i servizi Milvus e a creare avvisi:</p>
<ul>
<li>Imparare a <a href="/docs/it/v2.4.x/monitor.md">monitorare Milvus con Prometheus Operator su Kubernetes</a>.</li>
</ul></li>
<li><p>Se siete pronti a distribuire il vostro cluster su cloud:</p>
<ul>
<li>Imparare a <a href="/docs/it/v2.4.x/eks.md">distribuire Milvus su Amazon EKS con Terraform</a></li>
<li>Imparare a <a href="/docs/it/v2.4.x/gcp.md">distribuire il cluster Milvus su GCP con Kubernetes</a></li>
<li>Imparare a <a href="/docs/it/v2.4.x/azure.md">distribuire Milvus su Microsoft Azure con Kubernetes</a></li>
</ul></li>
<li><p>Se state cercando istruzioni su come allocare le risorse:</p>
<ul>
<li><a href="/docs/it/v2.4.x/allocate.md#standalone">Allocare le risorse su Kubernetes</a></li>
</ul></li>
</ul>
