---
id: monitor.md
title: Implementar serviços de monitorização
related_key: 'monitor, alert'
summary: >-
  Saiba como implementar serviços de monitorização num cluster Milvus utilizando
  o Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Implementação de serviços de monitorização no Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como utilizar o Prometheus para implementar serviços de monitorização num cluster Milvus no Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Monitorizar métricas com o Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>As métricas são indicadores que fornecem informações sobre o estado de funcionamento do seu sistema. Por exemplo, com as métricas, pode compreender a quantidade de memória ou de recursos de CPU consumidos por um nó de dados no Milvus. Estar a par do desempenho e do estado dos componentes do seu cluster Milvus permite-lhe estar bem informado e, consequentemente, tomar melhores decisões e ajustar a alocação de recursos de forma mais oportuna.</p>
<p>Geralmente, as métricas são armazenadas numa base de dados de séries temporais (TSDB), como <a href="https://prometheus.io/">o Prometheus</a>, e são registadas com um carimbo de data/hora. No caso da monitorização dos serviços do Milvus, pode utilizar o Prometheus para extrair dados de pontos finais definidos por exportadores. O Prometheus exporta então as métricas de cada componente do Milvus em <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>No entanto, poderá ter várias réplicas para um único componente, o que torna a configuração manual do Prometheus demasiado complicada. Por isso, pode utilizar <a href="https://github.com/prometheus-operator/prometheus-operator">o Prometheus Operator</a>, uma extensão do Kubernetes, para uma gestão automatizada e eficaz das instâncias de monitorização do Prometheus. A utilização do Prometheus Operator poupa-lhe o trabalho de adicionar manualmente alvos de métricas e fornecedores de serviços.</p>
<p>A Definição de Recurso Personalizado (CRD) do ServiceMonitor permite-lhe definir de forma declarativa como um conjunto dinâmico de serviços é monitorizado. Permite também selecionar quais os serviços a monitorizar com a configuração desejada, utilizando seleções de etiquetas. Com o Prometheus Operator, pode introduzir convenções que especifiquem como as métricas são expostas. Os novos serviços podem ser detetados automaticamente de acordo com a convenção que definir, sem necessidade de reconfiguração manual.</p>
<p>A imagem seguinte ilustra o fluxo de trabalho do Prometheus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
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
    </button></h2><p>Este tutorial utiliza <a href="https://github.com/prometheus-operator/kube-prometheus">o kube-prometheus</a> para lhe poupar o trabalho de instalar e configurar manualmente cada componente de monitorização e alerta.</p>
<p>O kube-prometheus reúne manifestos do Kubernetes, painéis <a href="http://grafana.com/">do Grafana</a> e <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">regras do Prometheus</a>, combinados com documentação e scripts.</p>
<p>Antes de implementar os serviços de monitorização, é necessário criar uma pilha de monitorização utilizando a configuração presente no diretório de manifestos do kube-prometheus.</p>
<p>Os comandos seguintes utilizam o ramo « <code translate="no">release-0.19</code> » do kube-prometheus, que suporta o Kubernetes 1.35, 1.36 e 1.37. Para escolher o ramo adequado à sua versão do Kubernetes, consulte a <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">matriz de compatibilidade do kube-prometheus</a>.</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
O clusterrole «prometheus-k8s» predefinido não consegue capturar as métricas do Milvus, sendo necessário aplicar uma correção:
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para eliminar uma pilha, execute <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Implementar serviços de monitorização no Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Aceda aos painéis<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Reencaminhe o serviço Prometheus para a porta <code translate="no">9090</code> e o serviço Grafana para a porta <code translate="no">3000</code>.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Ativar o ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>O ServiceMonitor não está ativado por predefinição no Milvus Helm. Após instalar o Prometheus Operator no cluster do Kubernetes, pode ativá-lo adicionando o parâmetro <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">Com o Helm</h4><p>Pode ativar o ServiceMonitor definindo o parâmetro <code translate="no">metrics.serviceMonitor.enabled=true</code> da seguinte forma, caso tenha instalado o gráfico Milvus Helm.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Este comando utiliza <code translate="no">--reset-then-reuse-values</code>, o que requer o Helm 3.14 ou posterior. Com esta opção, o Helm redefine os valores para os predefinidos da versão do gráfico definida em <code translate="no">--version</code>, aplica os valores da sua versão atual e, em seguida, aplica os valores de <code translate="no">--set</code>. Para encontrar <code translate="no">&lt;current-chart-version&gt;</code>, execute <code translate="no">helm list</code> e remova o prefixo <code translate="no">milvus-</code> do valor na coluna <code translate="no">CHART</code>. Se executar <code translate="no">helm upgrade</code> com <code translate="no">-f</code> ou <code translate="no">--set</code>, mas sem <code translate="no">--reset-then-reuse-values</code> ou <code translate="no">--reuse-values</code>, o Helm não mantém os valores que definiu no momento da instalação.</p>
</div>
<p>Quando a instalação estiver concluída, utilize <code translate="no">kubectl</code> para verificar o recurso ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Com o Milvus Operator</h4><p>Se tiver instalado o Milvus utilizando o Milvus Operator, o operador cria um PodMonitor em vez de um ServiceMonitor. O PodMonitor tem o mesmo nome que o recurso personalizado do Milvus. O operador cria-o apenas quando as métricas não estão desativadas no recurso personalizado e o CRD do PodMonitor existe no cluster. O diretório ` <code translate="no">manifests/setup</code> ` do `kube-prometheus` instala este CRD. Para garantir que as métricas estão ativadas, proceda da seguinte forma.</p>
<ol>
<li><p>Execute o comando seguinte para editar o recurso personalizado do Milvus. O comando seguinte pressupõe que o recurso personalizado se chama <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edite o campo <code translate="no">spec.components.disableMetric</code> para <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Guarde e saia do editor.</p></li>
<li><p>Aguarde que o operador reconcilie as alterações. Pode verificar o PodMonitor executando o comando seguinte.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Verificar as métricas<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Após ativar o ServiceMonitor ou o PodMonitor, pode aceder ao painel do Prometheus em <code translate="no">http://localhost:9090/</code>.</p>
<p>Clique no separador « <code translate="no">Status</code> » e, em seguida, em « <code translate="no">Targets</code> ». Deverá ver os alvos dos componentes do Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>Clique no separador « <code translate="no">Graph</code> » e introduza a expressão « <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> » na caixa de entrada de expressões. Deverá ver as métricas dos componentes do Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Verifique o ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Se tiver instalado o Milvus com o Helm, execute o seguinte comando para listar o ServiceMonitor. O gráfico denomina-o « <code translate="no">my-release-milvus</code> » para um cluster Milvus e « <code translate="no">my-release-milvus-standalone</code> » para um Milvus autónomo.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Se tiver implementado serviços de monitorização para o cluster do Milvus, talvez também queira aprender a:
<ul>
<li><a href="/docs/pt/visualize.md">Visualizar métricas do Milvus no Grafana</a></li>
<li><a href="/docs/pt/alert.md">Criar um alerta para os serviços do Milvus</a></li>
<li>Ajustar a <a href="/docs/pt/allocate.md">alocação de recursos</a></li>
</ul></li>
<li>Se estiver à procura de informações sobre como dimensionar um cluster Milvus:
<ul>
<li>Aprenda <a href="/docs/pt/scaleout.md">a dimensionar um cluster Milvus</a></li>
</ul></li>
<li>Se estiver interessado em atualizar a versão do Milvus,
<ul>
<li>Leia o <a href="/docs/pt/upgrade_milvus_cluster-operator.md">guia para atualizar um cluster Milvus</a> e <a href="/docs/pt/upgrade_milvus_standalone-operator.md">o guia para atualizar o Milvus autónomo</a>.</li>
</ul></li>
</ul>
