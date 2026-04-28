---
id: openshift.md
title: Развертывание кластера Milvus на OpenShift
related_key: cluster
summary: 'Узнайте, как развернуть кластер Milvus на OpenShift.'
---
<h1 id="Deploy-a-Milvus-Cluster-on-OpenShift" class="common-anchor-header">Развертывание кластера Milvus на OpenShift<button data-href="#Deploy-a-Milvus-Cluster-on-OpenShift" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме представлено пошаговое руководство по развертыванию Milvus на OpenShift.</p>
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
    </button></h2><p>Прежде чем начать процесс развертывания, убедитесь, что у вас есть:</p>
<ul>
<li>Работающий кластер OpenShift.</li>
<li>Доступ к кластеру OpenShift с достаточными привилегиями (роль<code translate="no">cluster-admin</code> или эквивалентная).</li>
<li>Доступ к веб-консоли OpenShift Container Platform.</li>
</ul>
<h2 id="Step-1-Install-Cert-Manager" class="common-anchor-header">Шаг 1: Установите Cert Manager<button data-href="#Step-1-Install-Cert-Manager" class="anchor-icon" translate="no">
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
    </button></h2><p>Cert Manager необходим для управления TLS-сертификатами для Milvus Operator.</p>
<ol>
<li><p>Найдите подходящую версию cert-manager для вашей версии OpenShift: <a href="https://cert-manager.io/docs/releases/">Cert Manager Releases</a>.</p></li>
<li><p>Установите Cert Manager, следуя официальному руководству: <a href="https://cert-manager.io/docs/installation/">Cert Manager Installation</a>.</p></li>
<li><p>Убедитесь, что Cert Manager работает:</p>
<ol>
<li><p>В консоли openshift перейдите в <strong>Workloads</strong> &gt; <strong>Pods</strong>. Выберите проект <strong>cert-manager</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/openshift-cert-manager-1.png" alt="cert-manager-1" class="doc-image" id="cert-manager-1" />
   </span> <span class="img-wrapper"> <span>cert-manager-1</span> </span></p></li>
<li><p>Убедитесь, что все подсистемы готовы. Например, на изображении ниже видно, что подсистемы еще запускаются. Подождите, пока все эти подсистемы не будут готовы.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/openshift-cert-manager-2.png" alt="cert-manager-2" class="doc-image" id="cert-manager-2" />
   </span> <span class="img-wrapper"> <span>cert-manager-2</span> </span></p></li>
</ol></li>
</ol>
<h2 id="Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="common-anchor-header">Шаг 2: Выпуск самоподписного сертификата для Milvus Operator<button data-href="#Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Убедитесь, что вы вошли в систему под именем <code translate="no">kubeadmin</code> или обладаете эквивалентными привилегиями.</p>
<ol>
<li><p>Создайте следующий файл манифеста с именем <code translate="no">milvus-operator-certificate.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-operator-certificate.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">cert-manager.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Certificate</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-serving-cert</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus-operator</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dnsNames:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus-operator-webhook-service.milvus-operator.svc</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus-operator-webhook-service.milvus-operator.svc.cluster.local</span>
  <span class="hljs-attr">issuerRef:</span>
    <span class="hljs-attr">kind:</span> <span class="hljs-string">Issuer</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-selfsigned-issuer</span>
  <span class="hljs-attr">secretName:</span> <span class="hljs-string">milvus-operator-webhook-cert</span>
<span class="hljs-meta">---</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">cert-manager.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Issuer</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-selfsigned-issuer</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus-operator</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">selfSigned:</span> {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Примените файл:</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvus-operator-certificate.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-3-Install-Milvus-Operator" class="common-anchor-header">Шаг 3: Установите Milvus Operator<button data-href="#Step-3-Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь вы можете приступить к установке Milvus Operator. Рекомендуется использовать Helm для установки Milvus Operator, чтобы упростить процесс настройки.</p>
<ol>
<li><p>Добавьте репозиторий Milvus Operator Helm:</p>
<pre><code translate="no" class="language-shell">helm repo add milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Install Milvus Operator:</p>
<pre><code translate="no" class="language-shell">helm -n milvus-operator upgrade --install --create-namespace milvus-operator milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-4-Deploy-Milvus" class="common-anchor-header">Шаг 4: Развертывание Milvus<button data-href="#Step-4-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Следуйте остальной части руководства на сайте документации Milvus: <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Deploy Milvus</a>.</p>
<h2 id="Whats-Next" class="common-anchor-header">Что дальше<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы хотите узнать, как развернуть Milvus в других облаках:</p>
<ul>
<li><a href="/docs/ru/eks.md">Развертывание кластера Milvus на AWS с помощью Kubernetes</a></li>
<li><a href="/docs/ru/azure.md">Развертывание кластера Milvus на Azure с помощью Kubernetes</a></li>
<li><a href="/docs/ru/gcp.md">Развертывание кластера Milvus на GCP с помощью Kubernetes</a></li>
</ul>
