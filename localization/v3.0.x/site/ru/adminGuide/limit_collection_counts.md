---
id: limit_collection_counts.md
title: Установите лимиты на количество коллекций
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">Ограничение количества коллекций<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Экземпляр Milvus допускает до 65 536 коллекций. Однако слишком большое количество коллекций может привести к проблемам с производительностью. Поэтому рекомендуется ограничить количество коллекций, создаваемых в экземпляре Milvus.</p>
<p>В этом руководстве приведены инструкции по установке ограничений на количество коллекций в экземпляре Milvus.</p>
<p>Конфигурация зависит от способа установки экземпляра Milvus.</p>
<ul>
<li><p>Для экземпляров Milvus, установленных с помощью Helm Charts</p>
<p>Добавьте конфигурацию в файл <code translate="no">values.yaml</code> в разделе <code translate="no">config</code>. Подробнее см. в разделе <a href="/docs/ru/configure-helm.md">Настройка Milvus с помощью Helm Charts</a>.</p></li>
<li><p>Для экземпляров Milvus, установленных с помощью Docker Compose</p>
<p>Добавьте конфигурацию в файл <code translate="no">milvus.yaml</code>, который вы использовали для запуска экземпляра Milvus. Подробнее см. в разделе <a href="/docs/ru/configure-docker.md">Настройка Milvus с помощью Docker Compose</a>.</p></li>
<li><p>Для экземпляров Milvus, установленных с помощью Operator</p>
<p>Добавьте конфигурацию в раздел <code translate="no">spec.components</code> пользовательского ресурса <code translate="no">Milvus</code>. Подробнее см. в разделе <a href="/docs/ru/configure_operator.md">Настройка Milvus с помощью Operator</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Параметры конфигурации<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-attr">rootCoord:</span>
    <span class="hljs-attr">maxGeneralCapacity:</span> <span class="hljs-number">65536</span>

<span class="hljs-attr">quotaAndLimits:</span>
    <span class="hljs-attr">limits:</span>
        <span class="hljs-attr">maxCollectionNum:</span> <span class="hljs-number">65536</span>
        <span class="hljs-attr">maxCollectionNumPerDB:</span> <span class="hljs-number">65536</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы изменить предел сбора, необходимо изменить все три параметра вместе:</p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">rootCoord.maxGeneralCapacity</code></td><td>Максимальное количество единиц коллекции (шардов × разделов), которое может содержать текущий экземпляр.</td><td><code translate="no">65536</code></td></tr>
<tr><td><code translate="no">quotaAndLimits.limits.maxCollectionNum</code></td><td>Максимальное количество коллекций, разрешенных для всех баз данных в текущем экземпляре.</td><td><code translate="no">65536</code></td></tr>
<tr><td><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></td><td>Максимальное количество коллекций, допустимое в одной базе данных.</td><td><code translate="no">65536</code></td></tr>
</tbody>
</table>
<p>Например, увеличить ограничение до 200 000 коллекций:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">rootCoord:</span>
    <span class="hljs-attr">maxGeneralCapacity:</span> <span class="hljs-number">200000</span>

<span class="hljs-attr">quotaAndLimits:</span>
    <span class="hljs-attr">limits:</span>
        <span class="hljs-attr">maxCollectionNum:</span> <span class="hljs-number">200000</span>
        <span class="hljs-attr">maxCollectionNumPerDB:</span> <span class="hljs-number">200000</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Настройка только <code translate="no">maxGeneralCapacity</code> без настройки <code translate="no">maxCollectionNum</code> и <code translate="no">maxCollectionNumPerDB</code> не возымеет действия. Для увеличения лимита коллекций все три параметра должны быть установлены в одно и то же значение или выше.</p>
</div>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">Расчет количества коллекций<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>В коллекции можно создать несколько шардов и разделов. Осколки - это логические единицы, используемые для распределения операций записи данных между несколькими узлами данных. Разделы - это логические единицы, используемые для повышения эффективности поиска данных путем загрузки только подмножества данных коллекции. При подсчете количества коллекций в текущем экземпляре Milvus необходимо также подсчитать количество шардов и разделов.</p>
<p>Например, предположим, что вы уже создали <strong>100</strong> коллекций, в <strong>60</strong> из которых есть <strong>2</strong> шарда и <strong>4</strong> раздела, а в остальных <strong>40</strong> коллекциях - <strong>1</strong> шард и <strong>12</strong> разделов. Общее количество единиц коллекции (вычисляется как <code translate="no">shards × partitions</code>) можно определить следующим образом:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>В данном примере рассчитанное общее количество коллекций, равное 960, представляет собой текущее использование. Параметр <code translate="no">maxGeneralCapacity</code> определяет максимальное количество единиц коллекции, которое может поддерживать экземпляр, по умолчанию он установлен на <code translate="no">65536</code>. Это означает, что экземпляр может поддерживать до 65 536 единиц сбора. Если общее количество превысит этот предел, система выдаст следующее сообщение об ошибке:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the max general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы избежать этой ошибки, вы можете либо уменьшить количество осколков или разделов в существующих или новых коллекциях, либо удалить некоторые коллекции, либо увеличить лимит коллекций, изменив <code translate="no">maxGeneralCapacity</code>, <code translate="no">maxCollectionNum</code> и <code translate="no">maxCollectionNumPerDB</code> вместе.</p>
