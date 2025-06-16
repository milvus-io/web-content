---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: "Узнайте, как обновить автономный Milvus с помощью Helm Chart."
title: Обновление автономного Milvus с помощью диаграмм Helm
---

<div class="tab-wrapper"><a href="/docs/ru/v2.5.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ru/v2.5.x/upgrade_milvus_standalone-helm.md" class='active '>OperatorHelmDocker</a><a href="/docs/ru/v2.5.x/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Обновление автономного Milvus с помощью диаграмм Helm<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве описано, как обновить автономный Milvus с помощью диаграмм Milvus Helm.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Версия Helm &gt;= 3.14.0</li>
<li>Версия Kubernetes &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>Начиная с версии Milvus-Helm chart 4.2.21, мы ввели зависимость от графика pulsar-v3.x. Для обратной совместимости, пожалуйста, обновите ваш helm до версии 3.14 или более поздней, и не забудьте добавить опцию <code translate="no">--reset-then-reuse-values</code> при использовании <code translate="no">helm upgrade</code>.</p>
</div>
<h2 id="Check-the-Milvus-version" class="common-anchor-header">Проверка версии Milvus<button data-href="#Check-the-Milvus-version" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующие команды для проверки новых версий Milvus.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm search repo zilliztech/milvus --versions</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Репо Milvus Helm Charts по адресу <code translate="no">https://milvus-io.github.io/milvus-helm/</code> было заархивировано, и вы можете получать дальнейшие обновления с <code translate="no">https://zilliztech.github.io/milvus-helm/</code> следующим образом:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Архивное хранилище по-прежнему доступно для диаграмм до версии 4.0.31. Для более поздних выпусков используйте новое репо.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>Вы можете выбрать путь обновления для своего Milvus следующим образом:</p>
<div style="display: none;">- [Провести скользящее обновление](#conduct-a-rolling-upgrade) с Milvus v2.2.3 и более поздних выпусков до v2.5.13.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Обновите Milvus с помощью Helm</a> для обновления с минорного выпуска до v2.2.3 до v2.5.13.</p></li>
<li><p><a href="#Migrate-the-metadata">Мигрируйте метаданные</a> перед обновлением с Milvus v2.1.x до v2.5.13.</p></li>
</ul>
<div style="display:none;">
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Проведение скользящего обновления<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Начиная с Milvus 2.2.3, вы можете настроить координаторы Milvus на работу в режиме активного ожидания и включить для них функцию скользящего обновления, чтобы Milvus мог отвечать на входящие запросы во время обновления координаторов. В предыдущих выпусках координаторы должны были удаляться, а затем создаваться во время обновления, что могло привести к некоторому простою службы.</p>
<p>Скользящие обновления требуют, чтобы координаторы работали в режиме активного ожидания. Вы можете использовать предоставленный нами <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">сценарий</a> для настройки координаторов на работу в режиме активного резерва и запуска скользящего обновления.</p>
<p>Основываясь на возможностях скользящего обновления, предоставляемых Kubernetes, приведенный выше сценарий обеспечивает упорядоченное обновление развертываний в соответствии с их зависимостями. Кроме того, Milvus реализует механизм, гарантирующий, что его компоненты останутся совместимыми с теми, которые зависят от них во время обновления, что значительно сокращает потенциальное время простоя сервисов.</p>
<p>Этот сценарий применяется только для обновления Milvus, установленного вместе с Helm. В следующей таблице перечислены флаги команд, доступные в сценариях.</p>
<table>
<thead>
<tr><th>Параметры</th><th>Описание</th><th>Значение по умолчанию</th><th>Требуется</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Имя экземпляра Milvus</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>Пространство имен, в котором установлен Milvus</td><td><code translate="no">default</code></td><td>Ложь</td></tr>
<tr><td><code translate="no">t</code></td><td>Целевая версия Milvus</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">w</code></td><td>Новый тег изображения Milvus</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>True</td></tr>
<tr><td><code translate="no">o</code></td><td>Операция</td><td><code translate="no">update</code></td><td>Ложь</td></tr>
</tbody>
</table>
<p>После того как вы убедились, что все развертывания в экземпляре Milvus находятся в нормальном состоянии. Вы можете выполнить следующую команду для обновления экземпляра Milvus до версии 2.5.13.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.sh -n default -i my-release -o update -t 2.5.13 -w &#x27;milvusdb/milvus:v2.5.13&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>Сценарий <strong>не применяется</strong> к экземпляру Milvus, установленному вместе с <strong>RocksMQ</strong>.</li>
<li>Сценарий жестко кодирует порядок обновления развертываний и не может быть изменен.</li>
<li>Сценарий использует <code translate="no">kubectl patch</code> для обновления развертываний и <code translate="no">kubectl rollout status</code> для отслеживания их состояния.</li>
<li>Сценарий использует <code translate="no">kubectl patch</code> для обновления метки <code translate="no">app.kubernetes.io/version</code> развертывания на метку, указанную после флага <code translate="no">-t</code> в команде.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Обновление Milvus с помощью Helm<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы обновить Milvus с минорного выпуска до v2.2.3 до последней версии, выполните следующие команды:</p>
<pre><code translate="no" class="language-shell">helm repo update
helm upgrade my-release milvus/milvus --reset-then-reuse-values --version=4.1.24 # use the helm chart version here
<button class="copy-code-btn"></button></code></pre>
<p>Используйте версию диаграммы Helm в предыдущей команде. Подробнее о том, как получить версию диаграммы Helm, см. в разделе <a href="#Check-the-Milvus-version">Проверка версии Milvus</a>.</p>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Перенос метаданных<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Начиная с Milvus 2.2.0, метаданные несовместимы с метаданными предыдущих выпусков. Следующие примеры фрагментов предполагают обновление с Milvus 2.1.4 до Milvus 2.2.0.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Проверьте версию Milvus</h3><p>Запустите <code translate="no">$ helm list</code>, чтобы проверить версию приложения Milvus. Вы можете видеть, что <code translate="no">APP VERSION</code> - это 2.1.4.</p>
<pre><code translate="no">NAME                NAMESPACE   REVISION    UPDATED                                 STATUS      CHART           APP VERSION     
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span>          <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span><span class="hljs-number">-11</span><span class="hljs-number">-21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> <span class="hljs-operator">+</span><span class="hljs-number">0800</span> CST     deployed    milvus<span class="hljs-number">-3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. Проверьте запущенные подсистемы</h3><p>Запустите <code translate="no">$ kubectl get pods</code>, чтобы проверить запущенные подсистемы. Вы можете увидеть следующий результат.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">84</span>s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>standalone<span class="hljs-number">-75</span>c599fffc<span class="hljs-number">-6</span>rwlj   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">84</span>s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-744</span>dd9586f<span class="hljs-operator">-</span>qngzv               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">84</span>s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. Проверьте тег изображения</h3><p>Проверьте тег образа для стручка <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. Вы можете увидеть, что релиз вашего кластера Milvus - v2.1.4.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods my-release-milvus-proxy-6c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. Перенесите метаданные</h3><p>Основным изменением в Milvus 2.2 является структура метаданных сегментных индексов. Поэтому при обновлении Milvus с v2.1.x до v2.2.0 необходимо использовать Helm для миграции метаданных. Ниже приведен <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">сценарий</a> для безопасной миграции метаданных.</p>
<p>Этот сценарий применим только к Milvus, установленному на кластере K8s. Если в процессе произойдет ошибка, сначала откатитесь к предыдущей версии с помощью операции отката.</p>
<p>В следующей таблице перечислены операции, которые можно выполнить для миграции метаданных.</p>
<table>
<thead>
<tr><th>Параметры</th><th>Описание</th><th>Значение по умолчанию</th><th>Требуется</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Имя экземпляра Milvus.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>Пространство имен, в котором установлен Milvus.</td><td><code translate="no">default</code></td><td>False</td></tr>
<tr><td><code translate="no">s</code></td><td>Исходная версия Milvus.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">t</code></td><td>Целевая версия Milvus.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">r</code></td><td>Корневой путь метафайла Milvus.</td><td><code translate="no">by-dev</code></td><td>False</td></tr>
<tr><td><code translate="no">w</code></td><td>Новый тег изображения Milvus.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">m</code></td><td>Тег изображения миграции мета.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">o</code></td><td>Операция мета-миграции.</td><td><code translate="no">migrate</code></td><td>False</td></tr>
<tr><td><code translate="no">d</code></td><td>Удалять ли капсулу миграции после завершения миграции.</td><td><code translate="no">false</code></td><td>Ложь</td></tr>
<tr><td><code translate="no">c</code></td><td>Класс хранения для pvc мета-миграции.</td><td><code translate="no">default storage class</code></td><td>False</td></tr>
<tr><td><code translate="no">e</code></td><td>Энпоинт etcd, используемый milvus.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>False</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. Миграция метаданных</h4><ol>
<li>Загрузите <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">сценарий миграции</a>.</li>
<li>Остановите компоненты Milvus. Любой живой сеанс в Milvus etcd может привести к сбою миграции.</li>
<li>Создайте резервную копию метаданных Milvus.</li>
<li>Перенесите метаданные Milvus.</li>
<li>Запустите компоненты Milvus с новым образом.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-2513" class="common-anchor-header">2. Обновление Milvus с версии 2.1.x до 2.5.13</h4><p>Следующие команды предполагают, что вы обновили Milvus с v2.1.4 до 2.5.13. Измените их на версии, соответствующие вашим потребностям.</p>
<ol>
<li><p>Укажите имя экземпляра Milvus, исходную версию Milvus и целевую версию Milvus.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.5.13
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Укажите пространство имен с помощью <code translate="no">-n</code>, если ваш Milvus установлен не в стандартном пространстве имен K8s.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.13
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Укажите корневой путь с помощью <code translate="no">-r</code>, если ваш Milvus установлен с пользовательским <code translate="no">rootpath</code>.</p>
<pre><code translate="no">./migrate<span class="hljs-selector-class">.sh</span> -<span class="hljs-selector-tag">i</span> my-release -n milvus -s <span class="hljs-number">2.1</span>.<span class="hljs-number">4</span> -t <span class="hljs-number">2.5</span>.<span class="hljs-number">13</span> -<span class="hljs-attribute">r</span> by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Укажите тег изображения с помощью <code translate="no">-w</code>, если ваш Milvus установлен с пользовательским <code translate="no">image</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.13 -r by-dev -w milvusdb/milvus:v2.5.13
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Установите <code translate="no">-d true</code>, если вы хотите автоматически удалить миграционную капсулу после завершения миграции.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.13 -w milvusdb/milvus:v2.5.13 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Откатитесь и выполните миграцию заново, если миграция не удалась.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.13 -r by-dev -o rollback -w milvusdb/milvus:v2.1.1
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.13 -r by-dev -o migrate -w milvusdb/milvus:v2.5.13
<button class="copy-code-btn"></button></code></pre></li>
</ol>
