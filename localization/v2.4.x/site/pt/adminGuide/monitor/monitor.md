---
id: monitor.md
title: Implementar serviços de monitorização
related_key: 'monitor, alert'
summary: >-
  Saiba como implantar serviços de monitoramento para um cluster Milvus usando o
  Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Implantação de serviços de monitoramento no Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como usar o Prometheus para implantar serviços de monitoramento para um cluster do Milvus no Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Monitorar métricas com o Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>As métricas são indicadores que fornecem informações sobre o status de execução do seu sistema. Por exemplo, com as métricas, é possível entender a quantidade de memória ou recursos de CPU consumidos por um nó de dados no Milvus. Conhecer o desempenho e o estado dos componentes do seu cluster Milvus permite-lhe estar bem informado e, consequentemente, tomar melhores decisões e ajustar a atribuição de recursos de forma mais atempada.</p>
<p>Geralmente, as métricas são armazenadas numa base de dados de séries temporais (TSDB), como <a href="https://prometheus.io/">o Prometheus</a>, e as métricas são registadas com um carimbo de data/hora. No caso da monitorização dos serviços Milvus, pode utilizar o Prometheus para extrair dados dos pontos de extremidade definidos pelos exportadores. Em seguida, o Prometheus exporta as métricas de cada componente do Milvus em <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>No entanto, poderá ter várias réplicas de um componente, o que torna a configuração manual do Prometheus demasiado complicada. Portanto, é possível usar <a href="https://github.com/prometheus-operator/prometheus-operator">o Prometheus Operator</a>, uma extensão do Kubernetes, para o gerenciamento automatizado e eficaz das instâncias de monitoramento do Prometheus. O uso do Prometheus Operator poupa o trabalho de adicionar manualmente alvos de métricas e provedores de serviços.</p>
<p>O ServiceMonitor Custom Resource Definition (CRD) permite definir declarativamente como um conjunto dinâmico de serviços é monitorado. Ele também permite selecionar quais serviços devem ser monitorados com a configuração desejada usando seleções de rótulos. Com o Prometheus Operator, é possível introduzir convenções que especificam como as métricas são expostas. Novos serviços podem ser descobertos automaticamente seguindo a convenção definida, sem a necessidade de reconfiguração manual.</p>
<p>A imagem a seguir ilustra o fluxo de trabalho do Prometheus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Prometheus_architecture</span> </span></p>
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
    </button></h2><p>Este tutorial usa <a href="https://github.com/prometheus-operator/kube-prometheus">o kube-prometheus</a> para evitar o trabalho de instalar e configurar manualmente cada componente de monitoramento e alerta.</p>
<p>O Kube-prometheus coleta manifestos do Kubernetes, painéis <a href="http://grafana.com/">do Grafana</a> e <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">regras do Prometheus</a> combinados com documentação e scripts.</p>
<p>Antes de implantar os serviços de monitoramento, é necessário criar uma pilha de monitoramento usando a configuração no diretório de manifestos do kube-prometheus.</p>
<pre><code translate="no">$ git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
O clusterrole padrão prometheus-k8s não pode capturar as métricas do milvus, é necessário corrigir:</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para excluir uma pilha, execute <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Implantar serviços de monitoramento no Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Aceder aos dashboards</h3><p>Encaminhe o serviço Prometheus para a porta <code translate="no">9090</code>, e o serviço Grafana para a porta <code translate="no">3000</code>.</p>
<pre><code translate="no">$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Habilitar o ServiceMonitor</h3><p>O ServiceMonitor não está habilitado para o Milvus Helm por padrão. Depois de instalar o Operador do Prometheus no cluster do Kubernetes, você pode habilitá-lo adicionando o parâmetro <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span> --reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Quando a instalação for concluída, use <code translate="no">kubectl</code> para verificar o recurso ServiceMonitor.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
my-release-milvus              54s
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
<li>Se você implantou serviços de monitoramento para o cluster do Milvus, talvez também queira aprender a:<ul>
<li><a href="/docs/pt/v2.4.x/visualize.md">Visualizar as métricas do Milvus no Grafana</a></li>
<li><a href="/docs/pt/v2.4.x/alert.md">Criar um alerta para os serviços do Milvus</a></li>
<li>Ajustar sua <a href="/docs/pt/v2.4.x/allocate.md">alocação de recursos</a></li>
</ul></li>
<li>Se estiver à procura de informações sobre como dimensionar um cluster Milvus:<ul>
<li>Aprender <a href="/docs/pt/v2.4.x/scaleout.md">a escalar um cluster Milvus</a></li>
</ul></li>
<li>Se estiver interessado em atualizar a versão do Milvus,<ul>
<li>Leia o <a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-operator.md">guia para atualização do cluster Milvus</a> e <a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-operator.md">o</a> <a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-operator.md">guia</a> <a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-operator.md">para atualização do Milvus standalone</a>.</li>
</ul></li>
</ul>
