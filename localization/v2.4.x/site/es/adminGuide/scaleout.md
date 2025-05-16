---
id: scaleout.md
related_key: scale Milvus cluster
summary: Aprenda a reducir y escalar manual o automáticamente en un clúster Milvus.
title: Escalar un clúster Milvus
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Escalar un clúster Milvus<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus soporta el escalado horizontal de sus componentes. Esto significa que puede aumentar o disminuir el número de nodos trabajadores de cada tipo según sus propias necesidades.</p>
<p>Este tema describe cómo escalar y reducir un cluster Milvus. Asumimos que ya ha <a href="/docs/es/v2.4.x/install_cluster-helm.md">instalado un cluster Milvus</a> antes de escalar. Además, le recomendamos que se familiarice con la <a href="/docs/es/v2.4.x/architecture_overview.md">arquitectura de Milvus</a> antes de empezar.</p>
<p>Este tutorial toma como ejemplo la ampliación de tres nodos de consulta. Para escalar otros tipos de nodos, sustituya <code translate="no">queryNode</code> por el tipo de nodo correspondiente en la línea de comandos.</p>
<div class="alert note">
<p>Para obtener información sobre cómo escalar un clúster con <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Milvus Operator</a>, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Escalar un clúster con Milvus Operator</a>.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">¿Qué es el escalado horizontal?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>El escalado horizontal incluye el escalado de salida y de entrada.</p>
<h3 id="Scaling-out" class="common-anchor-header">Ampliación</h3><p>La ampliación horizontal consiste en aumentar el número de nodos de un clúster. A diferencia del escalado ascendente, el escalado descendente no requiere asignar más recursos a un nodo del clúster. En su lugar, el escalado expande el clúster horizontalmente añadiendo más nodos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>Ampliación</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>Ampliación</span> </span></p>
<p>De acuerdo con la <a href="/docs/es/v2.4.x/architecture_overview.md">arquitectura Milvus</a>, los nodos trabajadores sin estado incluyen el nodo de consulta, el nodo de datos, el nodo de índice y el proxy. Por lo tanto, puede ampliar este tipo de nodos para adaptarlos a sus necesidades empresariales y escenarios de aplicación. Puede escalar el cluster Milvus manual o automáticamente.</p>
<p>Generalmente, necesitará escalar el cluster Milvus que ha creado si está sobreutilizado. A continuación se detallan algunas situaciones típicas en las que puede necesitar escalar el cluster Milvus:</p>
<ul>
<li>La utilización de CPU y memoria es alta durante un período de tiempo.</li>
<li>El rendimiento de las consultas es mayor.</li>
<li>Se requiere una mayor velocidad de indexación.</li>
<li>Es necesario procesar volúmenes masivos de grandes conjuntos de datos.</li>
<li>Es necesario garantizar una alta disponibilidad del servicio Milvus.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">Ampliación</h3><p>La ampliación consiste en reducir el número de nodos de un clúster. Generalmente, necesitará escalar el cluster Milvus que ha creado si está infrautilizado. A continuación se indican algunas situaciones típicas en las que necesitará escalar el cluster Milvus:</p>
<ul>
<li>La utilización de CPU y memoria es baja durante un período de tiempo.</li>
<li>El rendimiento de las consultas es menor.</li>
<li>No se requiere una mayor velocidad de indexación.</li>
<li>El tamaño del conjunto de datos a procesar es pequeño.</li>
</ul>
<div class="alert note">
No recomendamos reducir drásticamente el número de nodos trabajadores. Por ejemplo, si hay cinco nodos de datos en el clúster, recomendamos reducir un nodo de datos cada vez para garantizar la disponibilidad del servicio. Si el servicio está disponible tras el primer intento de ampliación, puede seguir reduciendo el número de nodos de datos.</div>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute <code translate="no">kubectl get pods</code> para obtener una lista de los componentes y su estado de funcionamiento en el cluster Milvus que ha creado.</p>
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
Milvus sólo admite la adición de los nodos trabajadores y no admite la adición de los componentes coordinadores.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Escalar un cluster Milvus<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede escalar su cluster Milvus manual o automáticamente. Si el autoescalado está activado, el cluster Milvus se reducirá o expandirá automáticamente cuando el consumo de recursos de CPU y memoria alcance el valor que usted haya establecido.</p>
<p>Actualmente, Milvus 2.1.0 sólo soporta el escalado manual.</p>
<h4 id="Scaling-out" class="common-anchor-header">Reducción</h4><p>Ejecute <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> para ampliar manualmente el nodo de consulta.</p>
<p>Si tiene éxito, se añaden tres pods en ejecución en el nodo de consulta como se muestra en el siguiente ejemplo.</p>
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
<h4 id="Scaling-in" class="common-anchor-header">Ampliación</h4><p>Ejecute <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> para ampliar el nodo de consulta.</p>
<p>Si tiene éxito, tres pods en ejecución en el nodo de consulta se reducen a uno como se muestra en el siguiente ejemplo.</p>
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
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Si desea aprender a supervisar los servicios Milvus y crear alertas:</p>
<ul>
<li>Aprenda a <a href="/docs/es/v2.4.x/monitor.md">supervisar Milvus con Prometheus Operator en Kubernetes</a>.</li>
</ul></li>
<li><p>Si está listo para desplegar su clúster en nubes:</p>
<ul>
<li>Aprenda a <a href="/docs/es/v2.4.x/eks.md">desplegar Milvus en Amazon EKS con Terraform</a></li>
<li>Aprenda a <a href="/docs/es/v2.4.x/gcp.md">desplegar Milvus Cluster en GCP con Kubernetes</a></li>
<li>Aprenda a <a href="/docs/es/v2.4.x/azure.md">desplegar Milvus en Microsoft Azure con Kubernetes</a></li>
</ul></li>
<li><p>Si está buscando instrucciones sobre cómo asignar recursos:</p>
<ul>
<li><a href="/docs/es/v2.4.x/allocate.md#standalone">Asignación de Recursos en Kubernetes</a></li>
</ul></li>
</ul>
