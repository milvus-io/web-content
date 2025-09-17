---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: >-
  Узнайте о необходимых подготовительных мероприятиях перед установкой Milvus с
  Helm.
title: Требования для запуска Milvus на Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Требования для запуска Milvus на Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице перечислены требования к аппаратному и программному обеспечению для запуска Milvus.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Требования к оборудованию<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Компонент</th><th>Требование</th><th>Рекомендация</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>ПРОЦЕССОР</td><td><ul><li>Процессор Intel 2-го поколения Core или выше</li><li>Apple Silicon</li></ul></td><td><ul><li>Автономный: 4 ядра или более</li><li>Кластер: 8 ядер и более</li></ul></td><td></td></tr>
<tr><td>Набор инструкций процессора</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Поиск векторного сходства и построение индексов в Milvus требуют поддержки процессором наборов расширений "одна инструкция - несколько данных" (SIMD). Убедитесь, что процессор поддерживает хотя бы одно из перечисленных расширений SIMD. Дополнительные сведения см. в разделе <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">"Процессоры с AVX"</a>.</td></tr>
<tr><td>ОПЕРАТИВНАЯ ПАМЯТЬ</td><td><ul><li>Автономный: 8 Гб</li><li>Кластер: 32G</li></ul></td><td><ul><li>Автономная: 16 Гб</li><li>Кластер: 128G</li></ul></td><td>Объем оперативной памяти зависит от объема данных.</td></tr>
<tr><td>Жесткий диск</td><td>Твердотельный накопитель SATA 3.0 или CloudStorage</td><td>NVMe SSD или выше</td><td>Объем жесткого диска зависит от объема данных.</td></tr>
</tbody>
</table>
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
    </button></h2><p>Рекомендуется запускать кластер Kubernetes на платформах Linux.</p>
<p>kubectl - это инструмент командной строки для Kubernetes. Используйте версию kubectl, которая не отличается от версии вашего кластера. Использование последней версии kubectl поможет избежать непредвиденных проблем.</p>
<p>minikube необходим при локальном запуске кластера Kubernetes. minikube требует наличия Docker в качестве зависимости. Убедитесь, что вы установили Docker перед установкой Milvus с помощью Helm. Дополнительные сведения см. в разделе <a href="https://docs.docker.com/get-docker">Получить Docker</a>.</p>
<table>
<thead>
<tr><th>Операционная система</th><th>Программное обеспечение</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>Платформы Linux</td><td><ul><li>Kubernetes 1.16 или более поздняя версия</li><li>kubectl</li><li>Helm 3.0.0 или более поздняя версия</li><li>minikube (для автономного Milvus)</li><li>Docker 19.03 или более поздней версии (для автономного Milvus)</li></ul></td><td>Дополнительную информацию см. в <a href="https://helm.sh/docs/">документации Helm</a>.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Программное обеспечение</th><th>Версия</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>См. <a href="#Additional-disk-requirements">дополнительные требования к диску</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Дополнительные требования к диску<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Производительность дисков очень важна для работы etcd. Настоятельно рекомендуется использовать локальные NVMe SSD. Более медленный отклик диска может привести к частым выборам кластера, что в конечном итоге приведет к деградации сервиса etcd.</p>
<p>Чтобы проверить, соответствует ли ваш диск требованиям, используйте <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>В идеале ваш диск должен достигать более 500 IOPS и менее 10 мс для 99-й процентильной задержки fsync. Более подробные требования можно найти в <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">документации</a> etcd.</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Как я могу запустить кластер K8s локально для тестирования?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы можете использовать такие инструменты, как <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> и <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, для быстрой локальной настройки кластера Kubernetes. В следующей процедуре в качестве примера используется minikube.</p>
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
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Если ваше оборудование и программное обеспечение соответствуют требованиям, вы можете:</p>
<ul>
<li><a href="/docs/ru/install_cluster-milvusoperator.md">Запустить Milvus в Kubernets с помощью Milvus Operator</a></li>
<li><a href="/docs/ru/install_cluster-helm.md">Запускать Milvus в Kubernetes с помощью Helm.</a></li>
</ul></li>
<li><p>Параметры, которые можно задать при установке Milvus, см. в разделе <a href="/docs/ru/system_configuration.md">Конфигурация системы</a>.</p></li>
</ul>
