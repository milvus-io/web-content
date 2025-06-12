---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: >-
  Saiba como configurar o HPA (Horizontal Pod Autoscaling) para dimensionar
  dinamicamente um cluster Milvus.
title: Configurar o escalonamento automático de pod horizontal (HPA) para Milvus
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">Configurar o escalonamento automático de pod horizontal (HPA) para Milvus<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O escalonamento automático de pod horizontal (HPA) é um recurso do Kubernetes que ajusta automaticamente o número de pods em uma implantação com base na utilização de recursos, como CPU ou memória. No Milvus, o HPA pode ser aplicado a componentes sem estado como <code translate="no">proxy</code>, <code translate="no">queryNode</code>, <code translate="no">dataNode</code> e <code translate="no">indexNode</code> para escalar dinamicamente o cluster em resposta a alterações na carga de trabalho.</p>
<p>Este guia explica como configurar o HPA para componentes do Milvus usando o Milvus Operator.</p>
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
<li>Um cluster Milvus em execução implantado com o Milvus Operator.</li>
<li>Acesso a <code translate="no">kubectl</code> para gerenciar recursos do Kubernetes.</li>
<li>Familiaridade com a arquitetura do Milvus e o HPA do Kubernetes.</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">Configurar o HPA com o Milvus Operator<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Para habilitar o HPA em um cluster Milvus gerenciado pelo Milvus Operator, siga estas etapas:</p>
<ol>
<li><p><strong>Defina Réplicas como -1</strong>:</p>
<p>No recurso personalizado (CR) do Milvus, defina o campo <code translate="no">replicas</code> como <code translate="no">-1</code> para o componente que deseja escalar com HPA. Isto delega o controlo de escala para a HPA em vez do operador. Pode editar o CR diretamente ou utilizar o seguinte comando <code translate="no">kubectl patch</code> para mudar rapidamente para o controlo HPA:</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Substitua <code translate="no">&lt;your-release-name&gt;</code> pelo nome do seu cluster Milvus.</p>
<p>Para verificar se a alteração foi aplicada, execute:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>O resultado esperado deve ser <code translate="no">-1</code>, confirmando que o componente <code translate="no">proxy</code> está agora sob controlo HPA.</p>
<p>Em alternativa, pode defini-lo no YAML do CR:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;your-release-name&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">-1</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Definir um recurso HPA</strong>:</p>
<p>Crie um recurso HPA para direcionar a implantação do componente desejado. Abaixo está um exemplo para o componente <code translate="no">proxy</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">autoscaling/v2</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">HorizontalPodAutoscaler</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus-proxy-hpa</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">scaleTargetRef:</span>
    <span class="hljs-attr">apiVersion:</span> <span class="hljs-string">apps/v1</span>
    <span class="hljs-attr">kind:</span> <span class="hljs-string">Deployment</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus-proxy</span>
  <span class="hljs-attr">minReplicas:</span> <span class="hljs-number">2</span>
  <span class="hljs-attr">maxReplicas:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">metrics:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Resource</span>
      <span class="hljs-attr">resource:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">cpu</span>
        <span class="hljs-attr">target:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">Utilization</span>
          <span class="hljs-attr">averageUtilization:</span> <span class="hljs-number">60</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Resource</span>
      <span class="hljs-attr">resource:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">memory</span>
        <span class="hljs-attr">target:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">Utilization</span>
          <span class="hljs-attr">averageUtilization:</span> <span class="hljs-number">60</span>
  <span class="hljs-attr">behavior:</span>
    <span class="hljs-attr">scaleUp:</span>
      <span class="hljs-attr">policies:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Pods</span>
          <span class="hljs-attr">value:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">periodSeconds:</span> <span class="hljs-number">30</span>
    <span class="hljs-attr">scaleDown:</span>
      <span class="hljs-attr">stabilizationWindowSeconds:</span> <span class="hljs-number">300</span>
      <span class="hljs-attr">policies:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Pods</span>
          <span class="hljs-attr">value:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">periodSeconds:</span> <span class="hljs-number">60</span>
<button class="copy-code-btn"></button></code></pre>
<p>Substitua <code translate="no">my-release</code> em <code translate="no">metadata.name</code> e <code translate="no">spec.scaleTargetRef.name</code> pelo nome real do seu cluster Milvus (por exemplo, <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> e <code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
<li><p><strong>Aplicar a configuração do HPA</strong>:</p>
<p>Implante o recurso HPA usando o seguinte comando:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Para verificar se o HPA foi criado com êxito, execute:</p>
<pre><code translate="no" class="language-bash">kubectl get hpa
<button class="copy-code-btn"></button></code></pre>
<p>Deverá ver uma saída semelhante a:</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-operator">-</span>hpa   Deployment<span class="hljs-operator">/</span>my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy   <span class="hljs-operator">&lt;</span><span class="hljs-keyword">some</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">/</span><span class="hljs-number">60</span><span class="hljs-operator">%</span>      <span class="hljs-number">2</span>         <span class="hljs-number">10</span>        <span class="hljs-number">2</span>          <span class="hljs-operator">&lt;</span><span class="hljs-type">time</span><span class="hljs-operator">&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Os campos <code translate="no">NAME</code> e <code translate="no">REFERENCE</code> reflectirão o nome do seu cluster (por exemplo, <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> e <code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>: Especifica a implantação a ser dimensionada (por exemplo, <code translate="no">my-release-milvus-proxy</code>).</li>
<li><code translate="no">minReplicas</code> e <code translate="no">maxReplicas</code>: Define o intervalo de escalonamento (2 a 10 Pods neste exemplo).</li>
<li><code translate="no">metrics</code>: Configura o dimensionamento com base na utilização de CPU e memória, visando 60% de uso médio.</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">Conclusão<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>O HPA permite que o Milvus se adapte eficientemente a cargas de trabalho variáveis. Ao usar o comando <code translate="no">kubectl patch</code>, você pode mudar rapidamente um componente para o controle HPA sem editar manualmente o CR completo. Para obter mais detalhes, consulte a <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">documentação do Kubernetes HPA</a>.</p>
