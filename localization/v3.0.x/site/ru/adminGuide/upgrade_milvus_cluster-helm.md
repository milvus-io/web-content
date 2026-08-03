---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: 'Узнайте, как обновить кластер Milvus с помощью Helm Chart.'
title: Обновление кластера Milvus с помощью Helm Chart
---
<div class="tab-wrapper"><a href="/docs/ru/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/ru/upgrade_milvus_cluster-helm.md" class='active '>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Обновление кластера Milvus с помощью Helm Chart<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>В данном руководстве описано, как обновить кластер Milvus 2.6.x до версии v3.0.0 с помощью Helm.</p>
<div class="alert note">
<p>Эта процедура проверена для обновления с Milvus 2.6.20 до Milvus v3.0.0 с использованием Helm Chart 5.0.22. Если вы используете другой патч-релиз Milvus 2.6.x или другую версию Helm Chart, сначала проверьте обновление в тестовой среде.</p>
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
<li>Helm 3.14.0 или более поздней версии</li>
<li>Существующее развертывание Milvus 2.6.x, управляемое с помощью Helm</li>
<li>Значения Helm, используемые для существующего развертывания</li>
<li>Актуальная резервная копия метаданных Milvus и постоянных данных</li>
</ul>
<p><strong>Ограничения</strong>, связанные с<strong>очередью сообщений</strong>: при обновлении до Milvus v3.0.0 необходимо сохранить текущий выбор системы очереди сообщений. Переключение между различными системами очередей сообщений во время обновления не поддерживается. Поддержка смены систем очередей сообщений будет доступна в будущих версиях.</p>
<div class="alert warning">
<p>Не изменяйте и не понижайте версию диаграммы Helm в рамках этой процедуры. Сохраните версию диаграммы, уже установленную для вашего выпуска Helm. В протестированном базовом сценарии была сохранена диаграмма Helm версии 5.0.22, а был изменен только тег образа Milvus на <code translate="no">v3.0.0</code>.</p>
<p>В данной процедуре не проверяется возможность перехода на более раннюю версию или отката путем смены образа Milvus обратно на версию 2.6.x. После того как версия v3.0.0 запишет данные, откат, выполняемый только для образа, может не смочь прочитать обновленное состояние. Если обновление завершится сбоем, остановите запись и воспользуйтесь планом восстановления, который восстанавливает метаданные, существовавшие до обновления, и резервные копии постоянных данных. Сначала проверьте план восстановления в непроизводственной среде.</p>
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
    </button></h2><p>Проверенное развертывание Milvus 2.6.20, созданное с помощью Helm Chart 5.0.22, использовало MixCoord и StreamingNode, а IndexNode не запускался. Если ваше развертывание использует ту же топологию, отдельный этап миграции координатора не требуется.</p>
<h3 id="Step-1-Confirm-the-current-topology" class="common-anchor-header">Шаг 1: Проверка текущей топологии<button data-href="#Step-1-Confirm-the-current-topology" class="anchor-icon" translate="no">
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
    </button></h3><p>Сохраните полные значения текущего релиза и проверьте запущенные Pod:</p>
<pre><code translate="no" class="language-bash">helm get values &lt;release-name&gt; \
  --namespace &lt;namespace&gt; \
  --all &gt; milvus-values-before-upgrade.yaml

kubectl get pods --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что кластер использует MixCoord и StreamingNode и что ни один Pod IndexNode не запущен. Команда обновления, приведенная далее в этом руководстве, сохраняет существующие значения Helm. Если ваши текущие значения включают IndexNode или используют другую топологию компонентов, не выполняйте это обновление, касающееся только образов. Сначала воспроизведите топологию в непроизводственной среде и получите план миграции, одобренный инженерной командой.</p>
<h3 id="Step-2-Update-the-Helm-repository" class="common-anchor-header">Шаг 2: Обновите репозиторий Helm<button data-href="#Step-2-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Добавьте или обновите репозиторий Helm для Milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Репозиторий диаграмм Helm для Milvus по адресу <code translate="no">https://milvus-io.github.io/milvus-helm/</code> был заархивирован. Используйте новый репозиторий <code translate="no">https://zilliztech.github.io/milvus-helm/</code> для версий диаграмм 4.0.31 и более поздних.
</div>
<h3 id="Step-3-Upgrade-Milvus" class="common-anchor-header">Шаг 3: Обновление Milvus<button data-href="#Step-3-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Проверьте версию диаграммы, установленную для вашего выпуска Helm:</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>В столбце « <code translate="no">CHART</code> » удалите префикс <code translate="no">milvus-</code> из значения и используйте оставшуюся версию в формате <code translate="no">&lt;current-chart-version&gt;</code>. Затем выполните команду обновления:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0.0&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 30m
<button class="copy-code-btn"></button></code></pre>
<p>Опция ` <code translate="no">--reset-then-reuse-values</code> ` сохраняет значения из предыдущего выпуска, одновременно применяя явное переопределение образа вместо значений по умолчанию выбранного Chart.</p>
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
    </button></h2><p>Проверьте ревизию Helm, статус Pod и образы контейнеров:</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что все необходимые рабочие нагрузки готовы, все компоненты Milvus используют <code translate="no">v3.0.0</code>, а существующие коллекции по-прежнему доступны для запросов и поиска. Завершите эти проверки, прежде чем включать какие-либо функции, специфичные для версии v3.0.0.</p>
<div class="alert note">
<p>Обновление до Milvus 3.0 не включает Storage V3. После проверки обновления ознакомьтесь с <a href="/docs/ru/storage-v3.md">Storage V3</a>, прежде чем включать функции, зависящие от него. После того как Milvus запишет данные в Storage V3, переход на более старую версию Milvus, которая не может считывать данные из Storage V3, не поддерживается.</p>
</div>
