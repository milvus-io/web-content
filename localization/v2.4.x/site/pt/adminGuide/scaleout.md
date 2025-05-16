---
id: scaleout.md
related_key: scale Milvus cluster
summary: >-
  Saiba como escalar manualmente ou automaticamente para fora e escalar num
  cluster Milvus.
title: Dimensionar um aglomerado de Milvus
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Escalar um Cluster Milvus<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus suporta o escalonamento horizontal dos seus componentes. Isto significa que pode aumentar ou diminuir o número de nós de trabalho de cada tipo de acordo com as suas necessidades.</p>
<p>Este tópico descreve como aumentar e diminuir a escala de um cluster Milvus. Partimos do princípio de que já <a href="/docs/pt/v2.4.x/install_cluster-helm.md">instalou um cluster Milvus</a> antes de efetuar o escalonamento. Além disso, recomendamos que se familiarize com a <a href="/docs/pt/v2.4.x/architecture_overview.md">arquitetura do Milvus</a> antes de começar.</p>
<p>Este tutorial usa como exemplo o escalonamento de três nós de consulta. Para dimensionar outros tipos de nós, substitua <code translate="no">queryNode</code> pelo tipo de nó correspondente na linha de comando.</p>
<div class="alert note">
<p>Para obter informações sobre como dimensionar um cluster com o Milvus Operator, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Dimensionar um cluster com o Milvus Operator</a>.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">O que é escalonamento horizontal?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>O escalonamento horizontal inclui o escalonamento para fora e para dentro.</p>
<h3 id="Scaling-out" class="common-anchor-header">Dimensionamento para fora</h3><p>O escalonamento para fora refere-se ao aumento do número de nós em um cluster. Ao contrário do aumento de escala, o aumento de escala não requer a alocação de mais recursos para um nó no cluster. Em vez disso, o aumento de escala expande o cluster horizontalmente, adicionando mais nós.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>Aumento de escala</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>Aumento de escala</span> </span></p>
<p>De acordo com a <a href="/docs/pt/v2.4.x/architecture_overview.md">arquitetura Milvus</a>, os nós de trabalho sem estado incluem o nó de consulta, o nó de dados, o nó de índice e o proxy. Portanto, é possível escalar esses tipos de nós para atender às suas necessidades de negócios e cenários de aplicativos. Pode escalar o cluster Milvus manualmente ou automaticamente.</p>
<p>Geralmente, será necessário expandir o cluster Milvus criado se ele estiver sendo usado em excesso. Abaixo estão algumas situações típicas em que pode ser necessário dimensionar o cluster do Milvus:</p>
<ul>
<li>A utilização da CPU e da memória é alta por um período de tempo.</li>
<li>A taxa de transferência da consulta torna-se mais elevada.</li>
<li>É necessária uma maior velocidade de indexação.</li>
<li>É necessário processar volumes massivos de grandes conjuntos de dados.</li>
<li>É necessário garantir a alta disponibilidade do serviço Milvus.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">Aumento de escala</h3><p>O escalonamento refere-se à diminuição do número de nós num cluster. Geralmente, será necessário escalar o cluster Milvus que criou se este estiver a ser subutilizado. Abaixo estão algumas situações típicas em que é necessário escalonar o cluster Milvus:</p>
<ul>
<li>A utilização da CPU e da memória é baixa por um período de tempo.</li>
<li>A taxa de transferência da consulta torna-se mais baixa.</li>
<li>Não é necessária uma maior velocidade de indexação.</li>
<li>O tamanho do conjunto de dados a ser processado é pequeno.</li>
</ul>
<div class="alert note">
Não recomendamos reduzir drasticamente o número de nós de trabalho. Por exemplo, se houver cinco nós de dados no cluster, recomendamos a redução de um nó de dados de cada vez para garantir a disponibilidade do serviço. Se o serviço estiver disponível após a primeira tentativa de escalonamento, é possível continuar reduzindo o número do nó de dados.</div>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute <code translate="no">kubectl get pods</code> para obter uma lista dos componentes e seu status de trabalho no cluster do Milvus que você criou.</p>
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
O Milvus só suporta a adição dos nós de trabalho e não suporta a adição dos componentes do coordenador.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Dimensionar um cluster do Milvus<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>É possível dimensionar o cluster do Milvus manual ou automaticamente. Se o escalonamento automático estiver ativado, o cluster do Milvus será reduzido ou expandido automaticamente quando o consumo de recursos de CPU e memória atingir o valor definido.</p>
<p>Atualmente, o Milvus 2.1.0 apenas suporta o escalonamento manual.</p>
<h4 id="Scaling-out" class="common-anchor-header">Redimensionamento</h4><p>Execute <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> para escalar manualmente o nó de consulta.</p>
<p>Se for bem-sucedido, três pods em execução no nó de consulta serão adicionados, conforme mostrado no exemplo a seguir.</p>
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
<h4 id="Scaling-in" class="common-anchor-header">Escalonamento de entrada</h4><p>Execute <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> para escalonar o nó de consulta.</p>
<p>Se for bem-sucedido, três pods em execução no nó de consulta serão reduzidos a um, conforme mostrado no exemplo a seguir.</p>
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
<li><p>Se você quiser saber como monitorar os serviços do Milvus e criar alertas:</p>
<ul>
<li>Aprenda a <a href="/docs/pt/v2.4.x/monitor.md">monitorar o Milvus com o Prometheus Operator no Kubernetes</a></li>
</ul></li>
<li><p>Se você estiver pronto para implantar seu cluster em nuvens:</p>
<ul>
<li>Saiba como <a href="/docs/pt/v2.4.x/eks.md">implantar o Milvus no Amazon EKS com o Terraform</a></li>
<li>Saiba como <a href="/docs/pt/v2.4.x/gcp.md">implantar o Milvus Cluster no GCP com Kubernetes</a></li>
<li>Saiba como <a href="/docs/pt/v2.4.x/azure.md">implantar o Milvus no Microsoft Azure com Kubernetes</a></li>
</ul></li>
<li><p>Se estiver à procura de instruções sobre como alocar recursos:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/allocate.md#standalone">Alocar recursos no Kubernetes</a></li>
</ul></li>
</ul>
