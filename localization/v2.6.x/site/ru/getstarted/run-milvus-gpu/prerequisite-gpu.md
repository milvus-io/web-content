---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Перед установкой Milvus с GPU проведите необходимую подготовку.
title: Требования для установки Milvus с GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Требования для установки Milvus с GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице перечислены требования к аппаратному и программному обеспечению для установки Milvus с поддержкой GPU.</p>
<h2 id="Compute-capability" class="common-anchor-header">Вычислительная способность<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Вычислительная способность вашего GPU-устройства должна быть одной из следующих: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>Чтобы проверить, соответствует ли ваше GPU-устройство этому требованию, проверьте <a href="https://developer.nvidia.com/cuda-gpus">Your GPU Compute Capability</a> на сайте разработчика NVIDIA.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">Драйвер NVIDIA<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>Драйвер NVIDIA для вашего GPU-устройства должен быть установлен в одном из <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">поддерживаемых дистрибутивов Linux</a>, а набор инструментов NVIDIA Container Toolkit должен быть установлен в соответствии с <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">этим руководством</a>.</p>
<p>Для пользователей Ubuntu 22.04 вы можете установить драйвер и набор инструментов для контейнеров с помощью следующих команд:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для пользователей других ОС обратитесь к <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">официальному руководству по установке</a>.</p>
<p>Проверить правильность установки драйвера можно, выполнив следующую команду:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
version:        545.29.06
<button class="copy-code-btn"></button></code></pre>
<p>Рекомендуется использовать драйверы версии 545 и выше.</p>
<h2 id="Software-requirements" class="common-anchor-header">Требования к программному обеспечению<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Кластер Kubernetes рекомендуется запускать на платформах Linux.</p>
<ul>
<li>kubectl - это инструмент командной строки для Kubernetes. Используйте версию kubectl, которая находится в пределах одного минорного различия версий для вашего кластера. Использование последней версии kubectl поможет избежать непредвиденных проблем.</li>
<li>minikube необходим при локальном запуске кластера Kubernetes. minikube требует наличия Docker в качестве зависимости. Убедитесь, что вы установили Docker перед установкой Milvus с помощью Helm. Дополнительные сведения см. в разделе <a href="https://docs.docker.com/get-docker">Получить Docker</a>.</li>
</ul>
<table>
<thead>
<tr><th>Операционная система</th><th>Программное обеспечение</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>Платформы Linux</td><td><ul><li>Kubernetes 1.16 или более поздняя версия</li><li>kubectl</li><li>Helm 3.0.0 или более поздняя версия</li><li>minikube (для автономного Milvus)</li><li>Docker 19.03 или более поздней версии (для автономного Milvus)</li></ul></td><td>Дополнительные сведения см. в <a href="https://helm.sh/docs/">документации Helm</a>.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">Вопросы и ответы<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Как я могу запустить кластер K8s локально для тестирования?</h3><p>Вы можете использовать такие инструменты, как <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> и <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, для быстрой локальной настройки кластера Kubernetes. В следующей процедуре в качестве примера используется minikube.</p>
<ol>
<li>Загрузите minikube</li>
</ol>
<p>Перейдите на страницу <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>, проверьте, выполнены ли условия, перечисленные в разделе <strong>What you'll need</strong>, нажмите на кнопки, описывающие вашу целевую платформу, и скопируйте команды для загрузки и установки бинарного файла.</p>
<ol start="2">
<li>Запуск кластера K8s с помощью minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Проверка состояния кластера K8s</li>
</ol>
<p>Вы можете проверить состояние установленного кластера K8s с помощью следующей команды.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Убедитесь, что вы можете получить доступ к кластеру K8s через <code translate="no">kubectl</code>. Если вы не установили <code translate="no">kubectl</code> локально, смотрите раздел <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Использование kubectl внутри minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Как запустить кластер K8s с рабочими узлами на GPU?</h3><p>Если вы предпочитаете использовать рабочие узлы с поддержкой GPU, вы можете выполнить следующие шаги, чтобы создать кластер K8s с рабочими узлами на GPU. Мы рекомендуем установить Milvus на кластер K8s с рабочими узлами на GPU и использовать класс хранения по умолчанию.</p>
<ol>
<li>Подготовьте рабочие узлы с GPU</li>
</ol>
<p>Чтобы использовать рабочие узлы с поддержкой GPU, выполните действия, описанные в разделе <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Подготовка узлов с GPU</a>.</p>
<ol start="2">
<li>Включите поддержку GPU на K8s</li>
</ol>
<p>Разверните <strong>плагин nvidia-device-plugin</strong> с помощью Helm, выполнив <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">следующие шаги</a>.</p>
<p>После настройки просмотрите ресурсы GPU с помощью следующей команды. Замените <code translate="no">&lt;gpu-worker-node&gt;</code> на фактическое имя узла.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
