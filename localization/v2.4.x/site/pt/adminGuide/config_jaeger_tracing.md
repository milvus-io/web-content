---
id: config_jaeger_tracing.md
title: Configurar o Trace
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  Este guia fornece instruções sobre como configurar o Jaeger para recolher
  traços para o Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">Configurar o Trace<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia fornece instruções sobre como configurar o Jaeger para recolher traços para o Milvus.</p>
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
<li>Você instalou as ferramentas necessárias, incluindo <a href="https://helm.sh/docs/intro/install/">Helm</a> e <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
<li>O Cert-manager versão 1.6.1 ou superior deve estar instalado. Um guia de instalação pode ser encontrado <a href="https://cert-manager.io/v1.6-docs/installation/#default-static-install">aqui</a>.</li>
</ul>
<h2 id="Deply-Jaeger" class="common-anchor-header">Implantar o Jaeger<button data-href="#Deply-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>O Jaeger é uma plataforma de rastreamento distribuída lançada como código aberto pela <a href="http://uber.github.io/">Uber Technologies</a>.</p>
<h3 id="1-Installing-the-Jaeger-Operator-on-Kubernetes" class="common-anchor-header">1. Instalando o operador do Jaeger no Kubernetes</h3><p>Para instalar o operador, execute:</p>
<pre><code translate="no" class="language-shell">$ kubectl create namespace observability
$ kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.62.0/jaeger-operator.yaml -n observability
<button class="copy-code-btn"></button></code></pre>
<p>Neste ponto, deve haver uma implantação <code translate="no">jaeger-operator</code> disponível. Você pode visualizá-la executando o seguinte comando:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> deployment jaeger-<span class="hljs-keyword">operator</span> -n observability

NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jaeger-<span class="hljs-keyword">operator</span>   <span class="hljs-number">1</span>         <span class="hljs-number">1</span>         <span class="hljs-number">1</span>            <span class="hljs-number">1</span>           <span class="hljs-number">48</span>s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Deploy-Jaeger" class="common-anchor-header">2. Implantar o Jaeger</h3><p>A maneira mais simples possível de criar uma instância do Jaeger é criando um arquivo YAML como o exemplo a seguir. Isso instalará a estratégia AllInOne padrão, que implanta a imagem <strong>all-in-one</strong> (combinando <strong>jaeger-agent</strong>, <strong>jaeger-collector</strong>, <strong>jaeger-query</strong> e Jaeger UI) em um único pod, usando <strong>o armazenamento na memória</strong> por padrão.</p>
<p>Se você quiser armazenar traços por um longo tempo, consulte <a href="https://www.jaegertracing.io/docs/1.62/operator/#production-strategy">production-strategy</a>.</p>
<pre><code translate="no" class="language-yaml">apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger
<button class="copy-code-btn"></button></code></pre>
<p>O arquivo YAML pode então ser usado com <code translate="no">kubectl</code>:</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f simplest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Em alguns segundos, uma nova instância do Jaeger tudo-em-um na memória estará disponível, adequada para demonstrações rápidas e fins de desenvolvimento. Para verificar as instâncias que foram criadas, liste os objectos jaeger:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> jaegers

NAME     STATUS    VERSION   STRATEGY   STORAGE   AGE
jaeger   Running   <span class="hljs-number">1.62</span><span class="hljs-number">.0</span>    allinone   memory    <span class="hljs-number">13</span>s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Instalar o Milvus com o Helm Chart<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode instalar ou atualizar o Milvus com o Helm Chart com as seguintes definições:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles</span>:
  user.<span class="hljs-property">yaml</span>: |+
    <span class="hljs-attr">trace</span>:
      <span class="hljs-attr">exporter</span>: jaeger
      <span class="hljs-attr">sampleFraction</span>: <span class="hljs-number">1</span>
      <span class="hljs-attr">jaeger</span>:
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;http://jaeger-collector:14268/api/traces&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para aplicar as configurações acima a uma nova implantação do Milvus, você pode executar o seguinte comando:</p>
<pre><code translate="no" class="language-shell">$ helm repo add zilliztech https://zilliztech.github.io/milvus-helm
$ helm repo update
$ helm upgrade --install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Para aplicar as definições acima a uma implementação Milvus existente, pode executar o seguinte comando:</p>
<pre><code translate="no" class="language-shell">$ helm upgrade my-release -f values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-Traces" class="common-anchor-header">Ver traços<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de ter implementado o Jaeger e o Milvus com o Helm Chart, foi ativado um ingresso por dfault. Pode ver o ingresso executando o seguinte comando:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> ingress

NAME           CLASS    HOSTS   ADDRESS         PORTS   AGE
jaeger-query   &lt;none&gt;   *       <span class="hljs-number">192.168</span><span class="hljs-number">.122</span><span class="hljs-number">.34</span>  <span class="hljs-number">80</span>      <span class="hljs-number">14</span>m
<button class="copy-code-btn"></button></code></pre>
<p>Quando o ingresso estiver disponível, você poderá acessar a interface do usuário do Jaeger navegando até <code translate="no">http://${ADDRESS}</code>. Substitua <code translate="no">${ADDRESS}</code> pelo endereço IP real do ingress.</p>
<p>A seguinte captura de ecrã mostra a interface do utilizador do Jaeger com os traços do Milvus durante uma operação de pesquisa e uma operação de recolha de carga:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" />
   </span> <span class="img-wrapper"> <span>Pedido de pesquisa de traços</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" />
   </span> <span class="img-wrapper"> <span>Pedido de recolha de carga de traços</span> </span></p>
