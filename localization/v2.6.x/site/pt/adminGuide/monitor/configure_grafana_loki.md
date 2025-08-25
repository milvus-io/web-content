---
id: configure_grafana_loki.md
title: Configurar o Grafana Loki
summary: >-
  Este tópico descreve como coletar logs usando o Loki e consultar logs de um
  cluster Milvus usando o Grafana.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Configurar o Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia fornece instruções sobre como configurar o Loki para coletar logs e o Grafana para consultar e exibir logs para um cluster Milvus.</p>
<p>Neste guia, você aprenderá como:</p>
<ul>
<li>Implantar <a href="https://grafana.com/docs/loki/latest/get-started/overview/">o Loki</a> e <a href="https://grafana.com/docs/alloy/latest/">o Alloy</a> em um cluster Milvus usando o Helm.</li>
<li>Configurar o armazenamento de objetos para o Loki.</li>
<li>Consultar logs usando o Grafana.</li>
</ul>
<p>Para referência, <a href="https://grafana.com/docs/loki/latest/send-data/promtail/#promtail-agent">o Promtail</a> será descontinuado. Portanto, apresentamos o Alloy, que foi oficialmente sugerido pelo Grafana Labs como o novo agente para coletar logs do Kubernetes e encaminhá-los para o Loki.</p>
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
<li>Você instalou <a href="/docs/pt/install_cluster-helm.md">um cluster Milvus no K8s</a>.</li>
<li>Você instalou as ferramentas necessárias, incluindo <a href="https://helm.sh/docs/intro/install/">Helm</a> e <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Implantar o Loki<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>O Loki é um sistema de agregação de logs inspirado no Prometheus. Implante o Loki usando o Helm para coletar logs do seu cluster Milvus.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Adicionar o repositório de gráficos do Helm do Grafana<button data-href="#1-Add-Grafanas-Helm-Chart-Repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Adicione o repositório de gráficos do Grafana ao Helm e atualize-o:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Configurar o armazenamento de objetos para o Loki<button data-href="#2-Configure-Object-Storage-for-Loki" class="anchor-icon" translate="no">
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
    </button></h3><p>Escolha uma das seguintes opções de armazenamento e crie um arquivo de configuração <code translate="no">loki.yaml</code>:</p>
<ul>
<li><p>Opção 1: Usando o MinIO para armazenamento</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Opção 2: usar o AWS S3 para armazenamento</p>
<p>No exemplo a seguir, substitua <code translate="no">&lt;accessKey&gt;</code> e <code translate="no">&lt;keyId&gt;</code> por sua própria chave de acesso e ID do S3, <code translate="no">s3.endpoint</code> pelo ponto de extremidade do S3 e <code translate="no">s3.region</code> pela região do S3.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketNames:</span>
      <span class="hljs-attr">chunks:</span> <span class="hljs-string">loki-chunks</span>
      <span class="hljs-attr">ruler:</span> <span class="hljs-string">loki-ruler</span>
      <span class="hljs-attr">admin:</span> <span class="hljs-string">loki-admin</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">&#x27;s3&#x27;</span>
    <span class="hljs-attr">s3:</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.us-west-2.amazonaws.com</span>
      <span class="hljs-attr">region:</span> <span class="hljs-string">us-west-2</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;accessKey&gt;</span>
      <span class="hljs-attr">accessKeyId:</span> <span class="hljs-string">&lt;keyId&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Instalar o Loki<button data-href="#3-Install-Loki" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute os seguintes comandos para instalar o Loki:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Alloy" class="common-anchor-header">Implantar o Alloy<button data-href="#Deploy-Alloy" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostraremos <a href="https://grafana.com/docs/alloy/latest/configure/">a configuração</a> do Alloy.</p>
<h3 id="1-Create-Alloy-Configuration" class="common-anchor-header">1. Criar a configuração do Alloy<button data-href="#1-Create-Alloy-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Usaremos o seguinte <code translate="no">alloy.yaml</code> para coletar logs de todos os pods do Kubernetes e enviá-los para o Loki via loki-gateway:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">alloy:</span>
  <span class="hljs-attr">enableReporting:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">resources:</span> {}
  <span class="hljs-attr">configMap:</span>
    <span class="hljs-attr">create:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">content:</span> <span class="hljs-string">|-
      loki.write &quot;default&quot; {
        endpoint {
          url = &quot;http://loki-gateway/loki/api/v1/push&quot;
        }
      }
</span>
      <span class="hljs-string">discovery.kubernetes</span> <span class="hljs-string">&quot;pod&quot;</span> {
        <span class="hljs-string">role</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;pod&quot;</span>
      }

      <span class="hljs-string">loki.source.kubernetes</span> <span class="hljs-string">&quot;pod_logs&quot;</span> {
        <span class="hljs-string">targets</span>    <span class="hljs-string">=</span> <span class="hljs-string">discovery.relabel.pod_logs.output</span>
        <span class="hljs-string">forward_to</span> <span class="hljs-string">=</span> [<span class="hljs-string">loki.write.default.receiver</span>]
      }

      <span class="hljs-string">//</span> <span class="hljs-string">Rewrite</span> <span class="hljs-string">the</span> <span class="hljs-string">label</span> <span class="hljs-string">set</span> <span class="hljs-string">to</span> <span class="hljs-string">make</span> <span class="hljs-string">log</span> <span class="hljs-string">query</span> <span class="hljs-string">easier</span>
      <span class="hljs-string">discovery.relabel</span> <span class="hljs-string">&quot;pod_logs&quot;</span> {
        <span class="hljs-string">targets</span> <span class="hljs-string">=</span> <span class="hljs-string">discovery.kubernetes.pod.targets</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;namespace&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;pod&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;pod&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;container&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;container&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;app&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_label_app_kubernetes_io_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_label_app_kubernetes_io_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;app&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;job&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;job&quot;</span>
          <span class="hljs-string">separator</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;$1&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">L&quot;__path__&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_uid&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_uid&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;__path__&quot;</span>
          <span class="hljs-string">separator</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/var/log/pods/*$1/*.log&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;container_runtime&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_container_id&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_container_id&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;container_runtime&quot;</span>
          <span class="hljs-string">regex</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;^(\\S+):\\/\\/.+$&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;$1&quot;</span>
        }
      }
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Alloy" class="common-anchor-header">2. Instalar o Alloy<button data-href="#2-Install-Alloy" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">helm install --values alloy.yaml alloy grafana/alloy -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Consultar logs com o Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Implante o Grafana e configure-o para se conectar ao Loki para consultar os logs.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Implantar o Grafana<button data-href="#1-Deploy-Grafana" class="anchor-icon" translate="no">
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
    </button></h3><p>Instale o Grafana usando os seguintes comandos:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Antes de poder acessar o Grafana, é necessário recuperar a senha <code translate="no">admin</code>:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=&quot;{.data.admin-password}&quot; | base64 --decode ; echo
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, encaminhe a porta do Grafana para sua máquina local:</p>
<pre><code translate="no" class="language-shell">export POD_NAME=$(kubectl get pods --namespace monitoring -l &quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot; -o jsonpath=&quot;{.items[0].metadata.name}&quot;)
kubectl --namespace monitoring port-forward $POD_NAME 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Adicionar o Loki como uma fonte de dados no Grafana<button data-href="#2-Add-Loki-as-a-Data-Source-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando o Grafana estiver em execução, você precisará adicionar o Loki como uma fonte de dados para consultar os logs.</p>
<ol>
<li>Abra um navegador da Web e navegue até <code translate="no">127.0.0.1:3000</code>. Faça login usando o nome de usuário <code translate="no">admin</code> e a senha obtida anteriormente.</li>
<li>No menu do lado esquerdo, escolha <strong>Conexões</strong> &gt; <strong>Adicionar nova conexão</strong>.</li>
<li>Na página que aparece, escolha <strong>Loki</strong> como o tipo de fonte de dados. Pode introduzir <strong>loki</strong> na barra de pesquisa para encontrar a fonte de dados.</li>
<li>Nas definições da fonte de dados Loki, especifique o <strong>Nome</strong> e o <strong>URL</strong> e, em seguida, clique em <strong>Guardar e testar</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>Fonte de dados</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Consultar registos do Milvus<button data-href="#3-Query-Milvus-Logs" class="anchor-icon" translate="no">
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
    </button></h3><p>Depois de adicionar o Loki como uma fonte de dados, consulte os logs do Milvus no Grafana:</p>
<ol>
<li>No menu do lado esquerdo, clique em <strong>Explore (Explorar</strong>).</li>
<li>No canto superior esquerdo da página, escolha a fonte de dados loki.</li>
<li>Use <strong>o navegador de rótulos</strong> para selecionar rótulos e consultar logs.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>Consultar</span> </span></p>
