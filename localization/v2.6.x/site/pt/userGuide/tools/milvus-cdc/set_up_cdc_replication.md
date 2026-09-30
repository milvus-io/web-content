---
id: set_up_cdc_replication.md
summary: >-
  Saiba como implantar dois clusters Milvus e configurar a replicação CDC entre
  eles.
title: Configurar a Replicação CDC
---
<h1 id="Set-Up-CDC-Replication" class="common-anchor-header">Configurar a Replicação CDC<button data-href="#Set-Up-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia mostra como implementar dois clusters Milvus autónomos com o Milvus Operator e configurar a replicação CDC de um cluster de origem para um cluster de destino.</p>
<p>Os exemplos usam:</p>
<ul>
<li><code translate="no">source-cluster</code> como o cluster primário.</li>
<li><code translate="no">target-cluster</code> como o cluster de espera.</li>
<li><code translate="no">milvus</code> como o espaço de nomes para os clusters Milvus.</li>
<li><code translate="no">milvus-operator</code> como o espaço de nomes para o Milvus Operator.</li>
</ul>
<p>Antes de começar, leia o <a href="/docs/pt/v2.6.x/milvus_cdc_overview.md">Milvus CDC</a> para entender o modelo primário-em espera e as opções de failover.</p>
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
    </button></h2><ul>
<li>Milvus v2.6.16 ou posterior.</li>
<li>Milvus Operator v1.3.4 ou posterior.</li>
<li>Um cluster Kubernetes está disponível.</li>
<li>Os clusters de origem e destino podem se conectar uns aos outros pela rede.</li>
<li>Você tem credenciais de administrador para ambos os clusters do Milvus.</li>
<li>Você sabe a contagem de canais físicos para cada cluster.</li>
</ul>
<h2 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">Etapa 1: Atualizar o Milvus Operator<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Adicione o repositório Helm do Milvus Operator:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
<button class="copy-code-btn"></button></code></pre>
<p>Atualizar o repositório:</p>
<pre><code translate="no" class="language-bash">helm repo update zilliztech-milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Instalar ou atualizar o Milvus Operator:</p>
<pre><code translate="no" class="language-bash">helm -n milvus-operator upgrade --install milvus-operator \
  zilliztech-milvus-operator/milvus-operator \
  --create-namespace
<button class="copy-code-btn"></button></code></pre>
<p>Verificar se o pod do operador está em execução:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Exemplo de saída:</p>
<pre><code translate="no" class="language-text">NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-6f7d8c9c7d-xm4tj   1/1     Running   0          54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Deploy-the-Source-Cluster" class="common-anchor-header">Etapa 2: Implantar o cluster de origem<button data-href="#Step-2-Deploy-the-Source-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Crie um arquivo chamado <code translate="no">milvus_source_cluster.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">source-cluster</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.16</span>
    <span class="hljs-attr">cdc:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>Aplicar a configuração:</p>
<pre><code translate="no" class="language-bash">kubectl create namespace milvus
kubectl apply -f milvus_source_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Verifique se os pods do cluster de origem estão em execução:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p>Exemplo de saída:</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
source-cluster-etcd-0                                  1/1     Running   0          3m
source-cluster-minio-6d8f7d9b9f-9t7j2                  1/1     Running   0          3m
source-cluster-milvus-standalone-7f8d9c8f6d-r2m5x      1/1     Running   0          2m
source-cluster-milvus-cdc-66d64747bd-sckxj             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<p>Certifique-se de que o pod CDC, como <code translate="no">source-cluster-milvus-cdc-...</code>, esteja no estado <code translate="no">Running</code>.</p>
<h2 id="Step-3-Deploy-the-Target-Cluster" class="common-anchor-header">Etapa 3: implantar o cluster de destino<button data-href="#Step-3-Deploy-the-Target-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Crie um arquivo chamado <code translate="no">milvus_target_cluster.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">target-cluster</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.16</span>
    <span class="hljs-attr">cdc:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>O componente CDC também está ativado no cluster de destino. Ele fica inativo enquanto o destino é um standby, mas é necessário se o destino mais tarde se tornar o primário após a alternância.</p>
<p>Aplique a configuração:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_target_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Verifique se os pods do cluster de destino estão em execução:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus | grep -E <span class="hljs-string">&#x27;NAME|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Exemplo de saída:</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
target-cluster-etcd-0                                  1/1     Running   0          3m
target-cluster-minio-5f7c8d9b6f-k8s2q                  1/1     Running   0          3m
target-cluster-milvus-standalone-66dc8d9f7f-5n6bp      1/1     Running   0          2m
target-cluster-milvus-cdc-7f8c9d6b8c-q4t9m             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Prepare-Cluster-Information" class="common-anchor-header">Etapa 4: preparar informações do cluster<button data-href="#Step-4-Prepare-Cluster-Information" class="anchor-icon" translate="no">
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
    </button></h2><p>Obtenha os endereços de serviço Milvus para ambos os clusters:</p>
<pre><code translate="no" class="language-bash">kubectl get svc -n milvus | grep -E <span class="hljs-string">&#x27;NAME|source-cluster|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Exemplo de saída:</p>
<pre><code translate="no" class="language-text">NAME                                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)              AGE
source-cluster-milvus                 ClusterIP   10.98.124.90     &lt;none&gt;        19530/TCP,9091/TCP   8m
target-cluster-milvus                 ClusterIP   10.109.234.172   &lt;none&gt;        19530/TCP,9091/TCP   3m
<button class="copy-code-btn"></button></code></pre>
<p>Preparar dois tipos de endereços:</p>
<ul>
<li>Os endereços do cluster são gravados na configuração de replicação e usados pelos componentes do CDC. Esses endereços devem ser acessíveis a partir dos pods do CDC.</li>
<li>Os endereços de cliente são utilizados apenas pelo seu cliente Python quando chama as APIs do Milvus. Se executar o cliente Python fora do cluster Kubernetes, exponha os serviços Milvus através do seu método de acesso normal, como um balanceador de carga, ingress ou port-forward.</li>
</ul>
<p>Prepare as informações de conexão e as listas de pchannel para ambos os clusters:</p>
<pre><code translate="no" class="language-python">source_cluster_addr = <span class="hljs-string">&quot;http://source-cluster-milvus.milvus.svc.cluster.local:19530&quot;</span>
target_cluster_addr = <span class="hljs-string">&quot;http://target-cluster-milvus.milvus.svc.cluster.local:19530&quot;</span>

source_client_addr = source_cluster_addr
target_client_addr = target_cluster_addr

<span class="hljs-comment"># If your Python client runs outside the Kubernetes cluster, replace only</span>
<span class="hljs-comment"># source_client_addr and target_client_addr with externally reachable addresses.</span>
<span class="hljs-comment"># Keep source_cluster_addr and target_cluster_addr reachable from CDC pods.</span>
<span class="hljs-comment"># For example:</span>
<span class="hljs-comment"># source_client_addr = &quot;http://127.0.0.1:19530&quot;</span>
<span class="hljs-comment"># target_client_addr = &quot;http://127.0.0.1:19531&quot;</span>

source_cluster_token = <span class="hljs-string">&quot;root:Milvus&quot;</span>
target_cluster_token = <span class="hljs-string">&quot;root:Milvus&quot;</span>

source_cluster_id = <span class="hljs-string">&quot;source-cluster&quot;</span>
target_cluster_id = <span class="hljs-string">&quot;target-cluster&quot;</span>

pchannel_num = <span class="hljs-number">16</span>
source_cluster_pchannels = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{source_cluster_id}</span>-rootcoord-dml_<span class="hljs-subst">{i}</span>&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pchannel_num)
]
target_cluster_pchannels = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{target_cluster_id}</span>-rootcoord-dml_<span class="hljs-subst">{i}</span>&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pchannel_num)
]
<button class="copy-code-btn"></button></code></pre>
<p>Substitua os endereços pelos endereços reais do serviço Milvus no seu ambiente. Não defina <code translate="no">source_cluster_addr</code> ou <code translate="no">target_cluster_addr</code> para um endereço de encaminhamento de porta local, a menos que os pods CDC também possam alcançar esse endereço. A lista pchannel deve corresponder à sua implantação do Milvus. Não copie os valores de exemplo sem verificar a configuração do cluster.</p>
<h2 id="Step-5-Create-the-Replication-Configuration" class="common-anchor-header">Etapa 5: criar a configuração de replicação<button data-href="#Step-5-Create-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Crie uma configuração de replicação de <code translate="no">source-cluster</code> para <code translate="no">target-cluster</code>:</p>
<pre><code translate="no" class="language-python">replicate_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: source_cluster_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: source_cluster_addr,
                <span class="hljs-string">&quot;token&quot;</span>: source_cluster_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: source_cluster_pchannels,
        },
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: target_cluster_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: target_cluster_addr,
                <span class="hljs-string">&quot;token&quot;</span>: target_cluster_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: target_cluster_pchannels,
        },
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [
        {
            <span class="hljs-string">&quot;source_cluster_id&quot;</span>: source_cluster_id,
            <span class="hljs-string">&quot;target_cluster_id&quot;</span>: target_cluster_id,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-6-Apply-the-Replication-Configuration" class="common-anchor-header">Etapa 6: Aplicar a configuração de replicação<button data-href="#Step-6-Apply-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Aplique a mesma configuração aos dois clusters:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

source_client = MilvusClient(
    uri=source_client_addr,
    token=source_cluster_token,
)
target_client = MilvusClient(
    uri=target_client_addr,
    token=target_cluster_token,
)

<span class="hljs-keyword">try</span>:
    source_client.update_replicate_configuration(**replicate_config)
    target_client.update_replicate_configuration(**replicate_config)
<span class="hljs-keyword">finally</span>:
    source_client.close()
    target_client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Para automação da produção, use clientes separados de curta duração para essa operação de plano de controle. Isso evita o compartilhamento do mesmo canal gRPC com o tráfego DML do aplicativo enquanto a função do cluster está sendo alterada.</p>
<p>Depois que a configuração é aplicada, as alterações gravadas em <code translate="no">source-cluster</code> são replicadas para <code translate="no">target-cluster</code>.</p>
<h2 id="Step-7-Verify-Data-Replication" class="common-anchor-header">Etapa 7: verificar a replicação de dados<button data-href="#Step-7-Verify-Data-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>Para verificar se a replicação funciona:</p>
<ol>
<li>Conecte-se a <code translate="no">source-cluster</code>.</li>
<li>Crie uma coleção.</li>
<li>Insira dados na coleção.</li>
<li>Carregue a coleção e execute uma consulta ou pesquisa em <code translate="no">source-cluster</code>.</li>
<li>Ligue-se a <code translate="no">target-cluster</code>.</li>
<li>Execute a mesma consulta ou pesquisa em <code translate="no">target-cluster</code> sem carregar manualmente a coleção no cluster em espera.</li>
<li>Confirme se os dados esperados estão visíveis em ambos os clusters.</li>
</ol>
<p>O cluster de destino é um cluster de espera nesta topologia. Não execute operações DDL ou DCL manuais, como <code translate="no">load_collection</code>, no cluster em espera. Essas operações devem ser executadas no cluster de origem e replicadas para o cluster de destino.</p>
<p>O código de verificação exato depende do seu esquema de recolha. Para obter um fluxo de trabalho básico de coleção do Milvus, consulte a documentação de início rápido do Milvus.</p>
<h2 id="CDC-Lag" class="common-anchor-header">Atraso do CDC<button data-href="#CDC-Lag" class="anchor-icon" translate="no">
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
    </button></h2><p>O atraso do CDC é a janela de dados entre os clusters primário e em espera. É necessário monitorizá-lo continuamente após a configuração da replicação.</p>
<p>O atraso do CDC pode aumentar quando:</p>
<ul>
<li>A taxa de gravação primária é alta.</li>
<li>A latência da rede ou a perda de pacotes aumenta entre os clusters.</li>
<li>O cluster em espera está sobrecarregado.</li>
<li>Os nós do CDC estão com provisionamento insuficiente.</li>
<li>Grandes operações DDL ou de importação estão em execução.</li>
</ul>
<p>Use o atraso do CDC para orientar as decisões operacionais:</p>
<ul>
<li>Se o atraso for baixo, a transição deve ser concluída mais rapidamente.</li>
<li>Se o atraso for alto, o failover pode perder mais dados.</li>
</ul>
<p>É possível estimar o atraso do CDC com a seguinte consulta PromQL:</p>
<pre><code translate="no" class="language-promql">clamp_min(
  max by (channel_name) (
    milvus_wal_last_confirmed_time_tick
  )
  -
  min by (channel_name) (
    milvus_cdc_last_replicated_time_tick
  ),
  0
)
</code></pre>
<p>O resultado é em segundos. Para cada canal de origem, a consulta compara a última marca de tempo WAL confirmada com a última marca de tempo replicada pelo CDC. Se um primário replicar para vários clusters em espera, a expressão <code translate="no">min by (channel_name)</code> informa o progresso de replicação mais lento para esse canal.</p>
<p>Se o Prometheus fizer o scraping de vários clusters do Milvus, adicione filtros de rótulo que correspondam à sua implantação, como <code translate="no">namespace</code> ou <code translate="no">app_kubernetes_io_instance</code>, para evitar a mistura de métricas de diferentes clusters.</p>
<h2 id="FAQ" class="common-anchor-header">PERGUNTAS FREQUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="common-anchor-header">Preciso chamar <code translate="no">update_replicate_configuration</code> em ambos os clusters?<button data-href="#Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>Sim. Aplique a mesma topologia a todos os clusters participantes. Se um cluster não for primário no momento da chamada, ele aguardará até que a topologia seja aplicada por meio do CDC.</p>
<h3 id="How-should-I-choose-clusterid" class="common-anchor-header">Como devo escolher <code translate="no">cluster_id</code>?<button data-href="#How-should-I-choose-clusterid" class="anchor-icon" translate="no">
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
    </button></h3><p>Use uma ID estável e exclusiva para cada cluster. A ID também é usada em nomes de pchannel e referências de topologia de replicação.</p>
<h3 id="Can-I-change-pchannels-after-replication-is-configured" class="common-anchor-header">Posso alterar os pchannels depois de a replicação estar configurada?<button data-href="#Can-I-change-pchannels-after-replication-is-configured" class="anchor-icon" translate="no">
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
    </button></h3><p>Pode atualizar a topologia, mas a lista de pchannels tem de corresponder à disposição do cluster. Trate as alterações de pchannel como uma operação avançada e verifique a replicação cuidadosamente depois disso.</p>
