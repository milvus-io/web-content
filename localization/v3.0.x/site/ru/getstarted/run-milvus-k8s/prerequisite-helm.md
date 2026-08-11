---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: >-
  Ознакомьтесь с необходимыми подготовительными действиями перед установкой
  Milvus с помощью Helm.
title: Требования к запуску Milvus в Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Требования к запуску Milvus в Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице перечислены аппаратные и программные требования для запуска и работы Milvus.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Требования к аппаратному обеспечению<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>Компонент</th><th>Требование</th><th>Рекомендации</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>Процессор</td><td><ul><li>Процессор Intel Core 2-го поколения или более поздней версии</li><li>Apple Silicon</li></ul></td><td><ul><li>Автономная конфигурация: 4 ядра или более</li><li>Кластер: 8 ядер или более</li></ul></td><td></td></tr>
<tr><td>Набор команд процессора</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Для векторного поиска по сходству и построения индексов в Milvus требуется поддержка процессором наборов расширений «одна инструкция — несколько данных» (SIMD). Убедитесь, что процессор поддерживает хотя бы одно из перечисленных расширений SIMD. Дополнительную информацию см. в разделе <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">«Процессоры с AVX</a> ».</td></tr>
<tr><td>Оперативная память</td><td><ul><li>Автономная система: 8 ГБ</li><li>Кластер: 32 ГБ</li></ul></td><td><ul><li>Автономная система: 16 ГБ</li><li>Кластер: 128 ГБ</li></ul></td><td>Объем оперативной памяти зависит от объема данных.</td></tr>
<tr><td>Жесткий диск</td><td>SSD с интерфейсом SATA 3.0 или облачное хранилище</td><td>SSD NVMe или выше</td><td>Размер жесткого диска зависит от объема данных.</td></tr>
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
<p>kubectl — это инструмент командной строки для Kubernetes. Используйте версию kubectl, которая отличается от версии вашего кластера не более чем на одну второстепенную версию. Использование последней версии kubectl помогает избежать непредвиденных проблем.</p>
<p>minikube требуется при локальном запуске кластера Kubernetes. minikube зависит от Docker. Убедитесь, что вы установили Docker перед установкой Milvus с помощью Helm. Дополнительную информацию см. в разделе <a href="https://docs.docker.com/get-docker">«Установка Docker</a> ».</p>
<table>
<thead>
<tr><th>Операционная система</th><th>Программное обеспечение</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>Платформы Linux</td><td><ul><li>Kubernetes 1.16 или более поздней версии</li><li>kubectl</li><li>Helm 3.0.0 или более поздней версии</li><li>minikube (для автономной версии Milvus)</li><li>Docker 19.03 или более поздней версии (для автономной версии Milvus)</li></ul></td><td>Дополнительную информацию см. в <a href="https://helm.sh/docs/">документации по Helm</a>.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Программное обеспечение</th><th>Версия</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>См. <a href="#Additional-disk-requirements">дополнительные требования к дисковому пространству</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Входит в состав Milvus (режим службы: <code translate="no">v0.1.36</code>+)</td><td>Очередь сообщений по умолчанию. Для распределенных развертываний Woodpecker может работать как отдельный <strong>сервис</strong>; зафиксируйте его версию с помощью <code translate="no">--set woodpecker.image.tag</code>. Режим сервиса поддерживается начиная с версии Woodpecker <code translate="no">v0.1.36</code>.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>Необязательно — только если вы переключаете очередь сообщений на Pulsar; по умолчанию не устанавливается.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Дополнительные требования к дискам<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Производительность диска имеет решающее значение для etcd. Настоятельно рекомендуется использовать локальные SSD-накопители NVMe. Медленная реакция диска может привести к частым выборам лидера кластера, что в конечном итоге ухудшит работу службы etcd.</p>
<p>Чтобы проверить, соответствует ли ваш диск требованиям, воспользуйтесь <a href="https://github.com/axboe/fio">утилитой fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>В идеале ваш диск должен обеспечивать более 500 IOPS и задержку fsync в 99-м процентиле не более 10 мс. Более подробные требования см. в <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">документации</a> по etcd.</p>
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
    </button></h3><p>Вы можете использовать такие инструменты, как <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> и <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, чтобы быстро настроить кластер Kubernetes локально. В приведенной ниже процедуре в качестве примера используется minikube.</p>
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
<li><p>Если ваше аппаратное и программное обеспечение соответствует требованиям, вы можете:</p>
<ul>
<li><a href="/docs/ru/install_cluster-milvusoperator.md">Запустить Milvus в Kubernetes с помощью Milvus Operator</a></li>
<li><a href="/docs/ru/install_cluster-helm.md">Запустить Milvus в Kubernetes с помощью Helm</a></li>
</ul></li>
<li><p>См. раздел <a href="/docs/ru/system_configuration.md">«Конфигурация системы</a> » для ознакомления с параметрами, которые можно настроить при установке Milvus.</p></li>
</ul>
