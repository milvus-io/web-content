---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: >-
  Ознакомьтесь с необходимыми подготовительными действиями перед установкой
  Milvus с использованием графического процессора.
title: Требования к установке Milvus с поддержкой GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Требования к установке Milvus с поддержкой GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице перечислены аппаратные и программные требования для настройки Milvus с поддержкой графического процессора.</p>
<h2 id="Compute-capability" class="common-anchor-header">Вычислительная мощность<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Образ Milvus для графического процессора <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> скомпилирован для графических процессоров с вычислительной способностью 7.0, 7.5, 8.0, 8.6, 9.0, 10.0 или 12.0. Ваше устройство GPU должно иметь одну из указанных вычислительных способностей или более позднюю версию, способную выполнять код, скомпилированный для одной из них, например 8.9 или 12.1. Подробности см. в разделах <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">«Бинарная совместимость</a> » и <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">«Особенности конкретных семейств</a>».</p>
<p>Чтобы проверить, соответствует ли ваше устройство GPU этим требованиям, ознакомьтесь с разделом <a href="https://developer.nvidia.com/cuda-gpus">«Вычислительная способность вашего GPU»</a> на сайте для разработчиков NVIDIA.</p>
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
    </button></h2><p>На вашем хосте должен быть установлен один из <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">дистрибутивов Linux, поддерживаемых NVIDIA Container Toolkit,</a> а также драйвер NVIDIA для вашего графического процессора.</p>
<p>Образ Milvus GPU <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> основан на CUDA 12.9 Update 1. Его параметр « <code translate="no">NVIDIA_REQUIRE_CUDA</code> » требует « <code translate="no">cuda&gt;=12.9</code> », поэтому драйвер NVIDIA должен поддерживать CUDA 12.9 или более позднюю версию. Для CUDA 12.9 Update 1 компания NVIDIA указывает версию драйвера 575.57.08 или более позднюю для Linux x86_64. Информацию о версиях драйверов для каждого выпуска CUDA см. в <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">примечаниях к выпуску CUDA Toolkit</a>.</p>
<p>Этот же параметр также поддерживает драйверы из ветвей 535, 550, 560, 565 и 570 для некоторых марок графических процессоров, но не для графических процессоров GeForce или Titan. При использовании этих драйверов образ полагается на <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">прямую совместимость CUDA</a>, которую NVIDIA поддерживает только на графических процессорах NVIDIA Data Center, отдельных моделях карт RTX серии NGC Server Ready и платах Jetson. Если драйвер не соответствует этим требованиям, NVIDIA Container Toolkit выдает ошибку « <code translate="no">unsatisfied condition</code> » и не настраивает графический процессор для контейнера.</p>
<p>Пользователи Ubuntu 22.04 могут установить драйвер с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>Графические процессоры с вычислительной способностью 10.0 или 12.0 (Blackwell) поддерживаются только открытыми модулями ядра драйвера NVIDIA. Для этих графических процессоров установите <code translate="no">nvidia-headless-580-open</code> вместо <code translate="no">nvidia-headless-580</code>. Открытые модули ядра не поддерживают графические процессоры старше Turing (вычислительная способность 7.5), такие как Volta (7.0), поэтому для них следует использовать <code translate="no">nvidia-headless-580</code>.</p>
<p>Для других дистрибутивов Linux обратитесь к <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">Руководству по установке драйвера NVIDIA</a>.</p>
<p>Вы можете проверить, правильно ли установлен драйвер, выполнив следующую команду. В выводе будет указана версия установленного драйвера.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>Установите NVIDIA Container Toolkit, следуя инструкциям для вашего дистрибутива Linux, приведённым в <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">руководстве по установке NVIDIA Container Toolkit</a>.</p>
<p>Если вы устанавливаете Milvus с помощью Docker Compose, настройте Docker на использование NVIDIA Container Runtime, перезапустите демон Docker, а затем запустите пример рабочей нагрузки, чтобы проверить, что контейнеры могут получить доступ к графическому процессору:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>Последняя команда запускает программу « <code translate="no">nvidia-smi</code> » в контейнере и выводит информацию об устройствах GPU на хосте. Если вы устанавливаете Milvus на Kubernetes, подготовьте рабочие узлы с GPU в соответствии с инструкциями, приведенными в разделе «Часто задаваемые вопросы» в конце этой страницы.</p>
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
    </button></h2><p>Требования, приведенные в этом разделе и в часто задаваемых вопросах ниже, применимы при установке Milvus с поддержкой GPU на Kubernetes с использованием Helm.</p>
<p>Рекомендуется запускать кластер Kubernetes на платформах Linux.</p>
<ul>
<li>kubectl — это инструмент командной строки для Kubernetes. Используйте версию kubectl, разница между которой и версией вашего кластера не превышает одну второстепенную версию. Использование последней версии kubectl помогает избежать непредвиденных проблем.</li>
<li>minikube требуется при локальном запуске кластера Kubernetes. minikube зависит от Docker. Убедитесь, что вы установили Docker перед установкой Milvus с помощью Helm. Дополнительную информацию см. в разделе <a href="https://docs.docker.com/get-docker">«Установка Docker</a> ».</li>
</ul>
<table>
<thead>
<tr><th>Операционная система</th><th>Программное обеспечение</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>Платформы Linux</td><td><ul><li>Kubernetes 1.16 или более поздней версии</li><li>kubectl</li><li>Helm 3.0.0 или более поздней версии</li><li>minikube (для автономной версии Milvus)</li><li>Docker 19.03 или более поздней версии (для автономной версии Milvus)</li></ul></td><td>Дополнительную информацию см. в <a href="https://helm.sh/docs/">документации по Helm</a>.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">Часто задаваемые вопросы<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Как запустить локальный кластер K8s для тестирования?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Для быстрой настройки локального кластера Kubernetes можно использовать такие инструменты, как <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> и <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>. В приведенной ниже инструкции в качестве примера используется minikube.</p>
<ol>
<li>Скачайте minikube</li>
</ol>
<p>Перейдите на страницу <a href="https://minikube.sigs.k8s.io/docs/start/">«Начало работы»</a>, проверьте, выполнены ли условия, перечисленные в разделе <strong>«Что вам понадобится»</strong>, нажмите на кнопки, соответствующие вашей целевой платформе, и скопируйте команды для загрузки и установки бинарного файла.</p>
<ol start="2">
<li>Запустите кластер K8s с помощью minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Проверка состояния кластера K8s</li>
</ol>
<p>Вы можете проверить состояние кластера K8s, установленного с помощью следующей команды.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Убедитесь, что у вас есть доступ к кластеру K8s по адресу <code translate="no">kubectl</code>. Если вы не установили <code translate="no">kubectl</code> локально, см. раздел <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">«Использование kubectl в minikube</a>».</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Как запустить кластер K8s с рабочими узлами с GPU?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Если вы предпочитаете использовать рабочие узлы с GPU, выполните приведенные ниже действия, чтобы создать кластер K8s с рабочими узлами с GPU. Мы рекомендуем установить Milvus на кластере K8s с рабочими узлами с GPU и использовать предоставленный по умолчанию класс хранения.</p>
<ol>
<li>Подготовка рабочих узлов с GPU</li>
</ol>
<p>Чтобы использовать рабочие узлы с поддержкой GPU, выполните действия, описанные в разделе <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">«Подготовка узлов с GPU</a>».</p>
<ol start="2">
<li>Включение поддержки GPU в K8s</li>
</ol>
<p>Разверните <strong>nvidia-device-plugin</strong> с помощью Helm, выполнив <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">следующие действия</a>.</p>
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
