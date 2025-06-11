---
id: azure.md
title: Развертывание Milvus в Microsoft Azure с помощью Kubernetes
related_key: cluster
summary: "Узнайте, как развернуть кластер Milvus в Azure."
---

<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">Развертывание Milvus в Azure с помощью AKS<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как предоставить и создать кластер с помощью <a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">Azure Kubernetes Service</a> (AKS) и <a href="https://portal.azure.com">портала Azure</a>.</p>
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
    </button></h2><p>Убедитесь, что ваш проект Azure настроен должным образом и у вас есть доступ к ресурсам, которые вы хотите использовать. Обратитесь к администраторам, если вы не уверены в своих правах доступа.</p>
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
    </button></h2><ul>
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">Azure CLI</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">Helm .</a></li>
</ul>
<p>В качестве альтернативы можно использовать <a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell</a>, в которой предустановлены Azure CLI, kubectl и Helm.</p>
<div class="alert note">После установки Azure CLI убедитесь, что вы правильно аутентифицированы. </div>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Создание кластера Kubernetes<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Войдите на портал Azure.</li>
<li>В меню портала Azure или на <strong>главной</strong> странице выберите <strong>Создать ресурс</strong>.</li>
<li>Выберите <strong>Контейнеры</strong> &gt; <strong>Служба Kubernetes</strong>.</li>
<li>На странице <strong>Основы</strong> настройте следующие параметры:</li>
</ol>
<ul>
<li><p><strong>Сведения о проекте</strong>:</p>
<ul>
<li><p><strong>Подписка</strong>: Обратитесь к администратору Azure вашей организации, чтобы определить, какую подписку следует использовать.</p>
<ul>
<li><strong>Группа ресурсов</strong>: Обратитесь к администратору Azure вашей организации, чтобы определить, какую группу ресурсов следует использовать.</li>
</ul></li>
</ul></li>
<li><p><strong>Сведения о кластере</strong>:</p>
<ul>
<li><p><strong>Имя кластера Kubernetes</strong>: введите имя кластера.</p></li>
<li><p><strong>Регион</strong>: Выберите регион.</p></li>
<li><p><strong>Зоны доступности</strong>: Выберите необходимые <a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">зоны доступности</a>. Для производственных кластеров рекомендуется выбирать несколько зон доступности.</p></li>
</ul></li>
<li><p><strong>Основной пул узлов</strong>:</p>
<ul>
<li><p><strong>Размер узла</strong>: Мы рекомендуем выбирать виртуальные машины с минимальным объемом оперативной памяти 16 ГБ, но вы можете выбрать размер виртуальной машины по своему усмотрению.</p></li>
<li><p><strong>Метод масштабирования</strong>: Выберите метод масштабирования.</p></li>
<li><p><strong>Диапазон количества узлов</strong>: Выберите диапазон для количества узлов.</p></li>
</ul></li>
<li><p><strong>Пулы узлов</strong>:</p>
<ul>
<li><p><strong>Включить виртуальные узлы</strong>: Установите флажок, чтобы включить виртуальные узлы.</p></li>
<li><p><strong>Включить наборы масштабирования виртуальных машин</strong>: Рекомендуется выбрать <code translate="no">enabled</code>.</p></li>
</ul></li>
<li><p><strong>Networking</strong>:</p>
<ul>
<li><p><strong>Настройка сети</strong>: Рекомендуется выбрать <code translate="no">Kubenet</code>.</p></li>
<li><p><strong>Префикс имени DNS</strong>: Введите префикс имени DNS.</p></li>
<li><p><strong>Маршрутизация трафика</strong>:</p>
<ul>
<li><p><strong>Балансировщик нагрузки</strong>: <code translate="no">Standard</code>.</p></li>
<li><p><strong>Маршрутизация HTTP-приложений</strong>: Не требуется.</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>После настройки параметров нажмите <strong>Обзор + создать</strong>, а затем <strong>Создать</strong>, когда проверка завершится. Создание кластера займет несколько минут.</li>
</ol>
<h2 id="Connect-to-the-cluster" class="common-anchor-header">Подключение к кластеру<button data-href="#Connect-to-the-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Перейдите к кластеру, который вы создали в сервисах Kubernetes, и щелкните его.</li>
<li>На панели навигации слева нажмите <code translate="no">Overview</code>.</li>
<li>На появившейся странице <strong>Обзор</strong> нажмите <strong>Подключиться</strong>, чтобы просмотреть группу ресурсов и подписку.</li>
</ol>
<h2 id="Set-a-subscription-and-credentials" class="common-anchor-header">Настройка подписки и учетных данных<button data-href="#Set-a-subscription-and-credentials" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">Вы можете использовать Azure Cloud Shell для выполнения следующих процедур.</div>
<ol>
<li>Выполните следующую команду, чтобы установить подписку.</li>
</ol>
<pre><code translate="no" class="language-shell">az account <span class="hljs-built_in">set</span> --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Выполните следующую команду, чтобы загрузить учетные данные и настроить Kubernetes CLI на их использование.</li>
</ol>
<pre><code translate="no" class="language-shell">az aks <span class="hljs-keyword">get</span>-credentials --resource-<span class="hljs-keyword">group</span> YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Используйте ту же оболочку для следующих процедур. Если вы переключитесь на другую оболочку, выполните предыдущие команды снова.</div>
<h2 id="Using-Azure-Blob-Storage-as-external-object-storage" class="common-anchor-header">Использование Azure Blob Storage в качестве внешнего хранилища объектов<button data-href="#Using-Azure-Blob-Storage-as-external-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Azure Blob Storage - это версия AWS Simple Storage Service (S3) в Azure.</p>
<ul>
<li>Создайте учетную запись хранилища и контейнер</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n milvustesting1 -g MyResourceGroup -l eastus --sku Standard_LRS --<span class="hljs-built_in">min</span>-tls-version TLS1_2
az storage container create -n testmilvus --account-name milvustesting1
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Получите секретный ключ, используйте первое значение</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account keys list --account-name milvustesting2
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Добавьте файл values.yaml</li>
</ul>
<pre><code translate="no" class="language-yaml">cluster:
  enabled: <span class="hljs-literal">true</span>

service:
<span class="hljs-built_in">type</span>: LoadBalancer

extraConfigFiles:
user.yaml: |+
common:
storageType: remote

minio:
enabled: <span class="hljs-literal">false</span>

externalS3:
enabled: <span class="hljs-literal">true</span>
host: core.windows.net
port: 443
rootPath: my-release
bucketName: testmilvus <span class="hljs-comment"># the storage account container name</span>
cloudProvider: azure
useSSL: <span class="hljs-literal">true</span>
accessKey: <span class="hljs-string">&quot;milvustesting1&quot;</span> <span class="hljs-comment"># the storage account name</span>
secretKey: <span class="hljs-string">&quot;&lt;secret-key&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>

<h2 id="Deploy-Milvus" class="common-anchor-header">Развертывание Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь кластер Kubernetes готов. Давайте развернем Milvus прямо сейчас.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>В предыдущих командах мы добавляем репо графиков Milvus Helm локально и обновляем репо для получения последних графиков. Затем мы устанавливаем экземпляр Milvus и называем его <strong>my-release</strong>.</p>
<p>Обратите внимание на значение config <code translate="no">service.type</code>, которое указывает на то, что мы хотим открыть экземпляр Milvus через балансировщик нагрузки Layer-4.</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">Проверка развертывания<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Когда все поды запущены, выполните следующую команду, чтобы получить внешний IP-адрес.</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">Hello Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Пожалуйста, обратитесь к <a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus</a>, измените значение host на внешний IP-адрес, а затем запустите код.</p>
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
    </button></h2><p>Если вы хотите узнать, как развернуть Milvus в других облаках:</p>
<ul>
<li><a href="/docs/ru/v2.5.x/eks.md">Развертывание кластера Milvus на AWS с помощью Kubernetes</a></li>
<li><a href="/docs/ru/v2.5.x/gcp.md">Развертывание кластера Milvus на GCP с помощью Kubernetes</a></li>
</ul>
