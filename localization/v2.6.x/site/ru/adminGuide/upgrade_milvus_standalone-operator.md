---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 'Узнайте, как обновить Milvus standalone с помощью Milvus operator.'
title: Обновление Milvus Standalone с помощью Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/ru/upgrade_milvus_standalone-operator.md" class='active '>Milvus</a><a href="/docs/ru/upgrade_milvus_standalone-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/ru/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">Обновление Milvus Standalone с помощью Milvus Operator<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве описано, как обновить автономное развертывание Milvus с версии 2.5.x до версии 2.6.8 с помощью Milvus Operator.</p>
<h2 id="Before-you-start" class="common-anchor-header">Прежде чем начать<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v268" class="common-anchor-header">Что нового в версии 2.6.8<button data-href="#Whats-new-in-v268" class="anchor-icon" translate="no">
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
    </button></h3><p>Обновление с Milvus 2.5.x до 2.6.8 связано со значительными архитектурными изменениями:</p>
<ul>
<li><strong>Объединение координаторов</strong>: Устаревшие отдельные координаторы (<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>) были объединены в один. <code translate="no">mixCoord</code></li>
<li><strong>Новые компоненты</strong>: Внедрение потокового узла для улучшенной обработки данных</li>
<li><strong>Удаление компонентов</strong>: <code translate="no">indexNode</code> удален и консолидирован.</li>
</ul>
<p>Этот процесс обновления обеспечивает правильную миграцию на новую архитектуру. Более подробную информацию об изменениях в архитектуре см. в разделе <a href="/docs/ru/architecture_overview.md">Обзор архитектуры Milvus</a>.</p>
<h3 id="Requirements" class="common-anchor-header">Требования<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Системные требования:</strong></p>
<ul>
<li>Кластер Kubernetes с автономным Milvus, развернутым через Milvus Operator</li>
<li><code translate="no">kubectl</code> настроенный для доступа к вашему кластеру</li>
<li>Установлен Helm 3.x</li>
</ul>
<p><strong>Требования к совместимости:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 <strong>не совместим</strong> с v2.6.8. Прямое обновление с релиз-кандидатов не поддерживается.</li>
<li>Если вы используете v2.6.0-rc1 и хотите сохранить свои данные, обратитесь к <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">этому руководству сообщества</a> за помощью в миграции.</li>
<li>Перед переходом на v2.6.8 <strong>необходимо</strong> обновить версию до v2.5.16 или более поздней.</li>
</ul>
<p><strong>Ограничения очереди сообщений</strong>: При обновлении до Milvus v2.6.8 вы должны сохранить текущий выбор очереди сообщений. Переключение между различными системами очередей сообщений во время обновления не поддерживается. Поддержка смены систем очередей сообщений будет доступна в будущих версиях.</p>
<h2 id="Upgrade-process" class="common-anchor-header">Процесс обновления<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">Шаг 1: Обновление Milvus Operator<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p>Сначала обновите Milvus Operator до версии 1.3.0:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update zilliztech-milvus-operator
helm -n milvus-operator upgrade milvus-operator zilliztech-milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Проверьте обновление оператора:</p>
<pre><code translate="no" class="language-bash">kubectl -n milvus-operator get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Upgrade-your-Milvus-standalone" class="common-anchor-header">Шаг 2: Обновление автономного Milvus<button data-href="#Step-2-Upgrade-your-Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="21-Upgrade-to-v2516" class="common-anchor-header">2.1 Обновление до версии 2.5.16</h4><div class="alert-note">
<p>Пропустите этот шаг, если ваше автономное развертывание уже работает с версией v2.5.16 или выше.</p>
</div>
<p>Создайте файл конфигурации <code translate="no">milvusupgrade.yaml</code> для обновления до v2.5.16:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>  <span class="hljs-comment"># Replace with your actual release name</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примените конфигурацию:</p>
<pre><code translate="no" class="language-bash">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
<p>Дождитесь завершения:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h4 id="22-Upgrade-to-v268" class="common-anchor-header">2.2 Обновление до v2.6.8</h4><p>После успешной работы v2.5.16 перейдите на v2.6.8:</p>
<p>Обновите файл конфигурации (<code translate="no">milvusupgrade.yaml</code> в данном примере):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>  <span class="hljs-comment"># Replace with your actual release name</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.8</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примените финальное обновление:</p>
<pre><code translate="no" class="language-bash">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Проверка обновления<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Убедитесь, что ваше автономное развертывание работает с новой версией:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>Для получения дополнительной поддержки обратитесь к <a href="https://milvus.io/docs">документации Milvus</a> или <a href="https://github.com/milvus-io/milvus/discussions">на форум сообщества</a>.</p>
