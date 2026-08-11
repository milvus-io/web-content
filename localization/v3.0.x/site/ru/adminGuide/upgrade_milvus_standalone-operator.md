---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 'Узнайте, как обновить автономную версию Milvus с помощью Milvus Operator.'
title: Обновление автономной версии Milvus с помощью Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/ru/upgrade_milvus_standalone-operator.md" class='active '>Milvus</a><a href="/docs/ru/upgrade_milvus_standalone-docker.md" class=''>Operator</a>, Helm, Docker<a href="/docs/ru/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">Обновление автономной версии Milvus с помощью Milvus Operator<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>В данном руководстве описано, как обновить автономную версию Milvus 2.6.x до версии v3.0-beta с помощью Milvus Operator.</p>
<div class="alert note">
<p>Эта процедура проверена при обновлении с Milvus 2.6.20 до Milvus v3.0-beta с использованием Milvus Operator 1.3.0, Woodpecker, etcd внутри кластера и MinIO внутри кластера. Если вы используете другой патч-релиз Milvus 2.6.x, версию Operator, очередь сообщений или конфигурацию зависимостей, сначала проверьте обновление в тестовой среде.</p>
</div>
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
<li>Кластер Kubernetes с автономным развертыванием Milvus 2.6.x, управляемым Milvus Operator</li>
<li><code translate="no">kubectl</code> доступ к кластеру</li>
<li>Полный манифест пользовательского ресурса (CR) Milvus, используемый для существующего развертывания</li>
<li>Метод установки и манифесты, используемые для существующего Milvus Operator</li>
<li>Актуальная резервная копия метаданных Milvus и постоянных данных</li>
</ul>
<p><strong>Ограничения</strong>, связанные с<strong>очередью сообщений</strong>: при обновлении до Milvus v3.0-beta необходимо сохранить текущий выбор системы очереди сообщений. Переключение между различными системами очередей сообщений во время обновления не поддерживается. Поддержка смены систем очередей сообщений будет доступна в будущих версиях.</p>
<div class="alert warning">
<p>Данная процедура не проверяет возможность перехода на более раннюю версию или отката путем смены образа Milvus обратно на версию 2.6.x. После того как версия v3.0-beta запишет данные, откат, выполняемый только на уровне образа, может не смочь прочитать обновленное состояние. Если обновление завершится сбоем, остановите запись данных и воспользуйтесь планом восстановления, который восстановит резервные копии метаданных и постоянных данных, созданные до обновления. Сначала проверьте план восстановления в тестовой среде.</p>
</div>
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
    </button></h2><h3 id="Step-1-Back-up-the-current-Milvus-CR" class="common-anchor-header">Шаг 1: Сделайте резервную копию текущего CR Milvus<button data-href="#Step-1-Back-up-the-current-Milvus-CR" class="anchor-icon" translate="no">
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
    </button></h3><p>Сохраните текущий CR перед изменением развертывания:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output yaml &gt; milvus-before-upgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Используйте исходный манифест вашего существующего развертывания в качестве манифеста обновления. Не применяйте экспортированный файл резервной копии напрямую, не удалив сначала управляемые сервером метаданные и поля состояния.</p>
<h3 id="Step-2-Confirm-the-Milvus-Operator-version" class="common-anchor-header">Шаг 2: Проверьте версию Milvus Operator<button data-href="#Step-2-Confirm-the-Milvus-Operator-version" class="anchor-icon" translate="no">
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
    </button></h3><p>Проверьте образ, используемый установленным Milvus Operator:</p>
<pre><code translate="no" class="language-bash">kubectl get deployments --all-namespaces \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.namespace}{&quot;\t&quot;}{.metadata.name}{&quot;\t&quot;}{range .spec.template.spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span> \
  | grep milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>В ходе проверенного обновления версия Milvus Operator осталась 1.3.0. Сохраните версию Operator, которая в настоящее время управляет вашим развертыванием Milvus 2.6.x, если только ваша политика поддержки не требует отдельного обновления Operator. Не переходите с более новой версии Operator на протестированную версию. Если вам необходимо изменить версию Operator, используйте тот же метод установки (Helm или <code translate="no">kubectl</code> ), а также то же имя релиза и пространство имён, что и в существующей установке, а затем проверьте изменение Operator перед обновлением Milvus CR.</p>
<h3 id="Step-3-Update-the-Milvus-image" class="common-anchor-header">Шаг 3: Обновите образ Milvus<button data-href="#Step-3-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>В полном манифесте CR Milvus изменяйте только <code translate="no">spec.components.image</code>. Сохраните существующие настройки режима, компонентов, очереди сообщений, etcd, хранилища и других зависимостей. В приведенном ниже фрагменте показано поле, которое необходимо изменить; не заменяйте весь ваш CR этим фрагментом.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;instance-name&gt;</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">&lt;namespace&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0-beta</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примените полный манифест CR:</p>
<pre><code translate="no" class="language-bash">kubectl apply --filename milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Проверьте обновление<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Проверьте статус CR, статус Pod и образы контейнеров:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output jsonpath=<span class="hljs-string">&#x27;{.status.status}{&quot;\t&quot;}{.status.currentImage}{&quot;\n&quot;}&#x27;</span>

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что в CR Milvus указано <code translate="no">Healthy</code>, текущий образ — <code translate="no">milvusdb/milvus:v3.0-beta</code>, а существующие коллекции по-прежнему доступны для запросов и поиска. Выполните эти проверки, прежде чем включать какие-либо функции, специфичные для версии v3.0-beta.</p>
