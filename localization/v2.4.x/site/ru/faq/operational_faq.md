---
id: operational_faq.md
summary: Найдите ответы на часто задаваемые вопросы о работе в Милвусе.
title: Часто задаваемые вопросы по эксплуатации
---
<h1 id="Operational-FAQ" class="common-anchor-header">Часто задаваемые вопросы по эксплуатации<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">Что делать, если мне не удалось извлечь образ Milvus Docker из Docker Hub?</h4><p>Если вам не удалось извлечь образ Milvus Docker из Docker Hub, попробуйте добавить другие зеркала реестра.</p>
<p>Пользователи из материкового Китая могут добавить URL "https://registry.docker-cn.com" в массив registry-mirrors в файле <strong>/etc.docker/daemon.json</strong>.</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Является ли Docker единственным способом установки и запуска Milvus?</h4><p>Docker - это эффективный способ развертывания Milvus, но не единственный. Вы также можете развернуть Milvus из исходного кода. Для этого требуется Ubuntu (18.04 или выше) или CentOS (7 или выше). Дополнительные сведения см. в разделе <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">"Сборка Milvus из исходного кода"</a>.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">Какие основные факторы влияют на отзыв?</h4><p>На отзыв в основном влияют тип индекса и параметры поиска.</p>
<p>Для FLAT-индекса Milvus выполняет исчерпывающее сканирование внутри коллекции со 100-процентным возвратом.</p>
<p>Для индексов IVF параметр nprobe определяет объем поиска в коллекции. Увеличение параметра nprobe увеличивает долю искомых векторов и возврат, но снижает производительность запроса.</p>
<p>Для индекса HNSW параметр ef определяет широту поиска в графе. Увеличение ef увеличивает количество искомых точек на графе и запоминание, но снижает производительность запроса.</p>
<p>Дополнительные сведения см. в разделе <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">Векторное индексирование</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">Почему мои изменения в конфигурационных файлах не вступили в силу?</h4><p>Milvus не поддерживает изменение конфигурационных файлов во время выполнения. Чтобы изменения в файлах конфигурации вступили в силу, необходимо перезапустить Milvus Docker.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">Как узнать, что Milvus успешно запустился?</h4><p>Если Milvus запущен с помощью Docker Compose, запустите <code translate="no">docker ps</code>, чтобы посмотреть, сколько контейнеров Docker запущено, и проверить, правильно ли запущены службы Milvus.</p>
<p>Для автономного Milvus вы должны наблюдать как минимум три запущенных Docker-контейнера, один из которых - служба Milvus, а два других - служба управления и хранения etcd. Для получения дополнительной информации см. раздел <a href="/docs/ru/v2.4.x/install_standalone-docker.md">Установка Milvus Standalone</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">Почему время в файлах журнала отличается от системного времени?</h4><p>Разница во времени обычно связана с тем, что хост-машина не использует универсальное координированное время (UTC).</p>
<p>В файлах журнала внутри образа Docker по умолчанию используется UTC. Если на вашей хост-машине не используется UTC, может возникнуть такая проблема.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">Как узнать, поддерживает ли мой процессор Milvus?</h4><p>Вычислительные операции Milvus зависят от поддержки процессором набора инструкций расширения SIMD (Single Instruction, Multiple Data). Поддержка вашим процессором набора инструкций расширения SIMD имеет решающее значение для построения индексов и поиска векторного сходства в Milvus. Убедитесь, что ваш процессор поддерживает хотя бы один из следующих наборов инструкций SIMD:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>Выполните команду lscpu, чтобы проверить, поддерживает ли ваш процессор указанные выше наборы SIMD-инструкций:</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Почему Milvus возвращает <code translate="no">illegal instruction</code> при запуске?</h4><p>Milvus требует, чтобы ваш процессор поддерживал набор SIMD-инструкций: SSE4.2, AVX, AVX2 или AVX512. Для нормальной работы Milvus процессор должен поддерживать хотя бы одну из них. Ошибка <code translate="no">illegal instruction</code>, возвращаемая при запуске, указывает на то, что ваш процессор не поддерживает ни один из четырех вышеперечисленных наборов инструкций.</p>
<p>См. раздел <a href="/docs/ru/v2.4.x/prerequisite-docker.md">Поддержка процессором набора инструкций SIMD</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">Могу ли я установить Milvus на Windows?</h4><p>Да. Вы можете установить Milvus на Windows, скомпилировав его из исходного кода или из бинарного пакета.</p>
<p>О том, как установить <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Milvus на Windows</a>, читайте в разделе <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Запуск Milvus на Windows</a>.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">Я получил ошибку при установке pymilvus на Windows. Что мне делать?</h4><p>Не рекомендуется устанавливать PyMilvus на Windows. Но если вам нужно установить PyMilvus на Windows, но вы получили ошибку, попробуйте установить его в среде <a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">Conda</a>. Дополнительные сведения о том, как установить PyMilvus в среду Conda, см. в разделе <a href="/docs/ru/v2.4.x/install-pymilvus.md">Установка Milvus SDK</a>.</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">Могу ли я установить Milvus, отключившись от Интернета?</h4><p>Да. Вы можете установить Milvus в автономном окружении. Дополнительные сведения см. в разделе <a href="/docs/ru/v2.4.x/install_offline-helm.md">Установка Milvus в автономном режиме</a>.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Где я могу найти журналы, сгенерированные Milvus?</h4><p>По умолчанию журнал Milvus печатается в stout (стандартный вывод) и stderr (стандартная ошибка), однако мы настоятельно рекомендуем перенаправлять журнал на постоянный том в производстве. Для этого обновите <code translate="no">log.file.rootPath</code> в <strong>milvus.yaml</strong>. Если вы развертываете Milvus с графиком <code translate="no">milvus-helm</code>, вам также необходимо сначала включить персистентность журнала через <code translate="no">--set log.persistence.enabled=true</code>.</p>
<p>Если вы не меняли конфигурацию, то найти журнал можно с помощью kubectl logs &lt;pod-name&gt; или docker logs CONTAINER.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">Могу ли я создать индекс для сегмента перед вставкой в него данных?</h4><p>Да, можно. Но мы рекомендуем вставлять данные партиями, каждая из которых не должна превышать 256 МБ, перед индексацией каждого сегмента.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">Могу ли я использовать один экземпляр etcd совместно с несколькими экземплярами Milvus?</h4><p>Да, вы можете использовать один экземпляр etcd совместно с несколькими экземплярами Milvus. Для этого вам нужно изменить <code translate="no">etcd.rootPath</code> на отдельное значение для каждого экземпляра Milvus в конфигурационных файлах каждого из них перед их запуском.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">Могу ли я разделить экземпляр Pulsar между несколькими экземплярами Milvus?</h4><p>Да, вы можете использовать один экземпляр Pulsar совместно с несколькими экземплярами Milvus. Для этого вы можете</p>
<ul>
<li>Если на экземпляре Pulsar включена многопользовательская среда, выделите для каждого экземпляра Milvus отдельного арендатора или пространство имен. Для этого перед запуском необходимо изменить <code translate="no">pulsar.tenant</code> или <code translate="no">pulsar.namespace</code> в конфигурационных файлах экземпляров Milvus на уникальное значение для каждого из них.</li>
<li>Если вы не планируете включать многопользовательский режим на экземпляре Pulsar, перед запуском следует изменить <code translate="no">msgChannel.chanNamePrefix.cluster</code> в конфигурационных файлах экземпляров Milvus на уникальное значение для каждого из них.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">Могу ли я разделить экземпляр MinIO между несколькими экземплярами Milvus?</h4><p>Да, вы можете разделить экземпляр MinIO между несколькими экземплярами Milvus. Для этого вам нужно изменить <code translate="no">minio.rootPath</code> на уникальное значение для каждого экземпляра Milvus в конфигурационных файлах каждого из них перед запуском.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">Как мне справиться с сообщением об ошибке <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>?</h4><p>Сообщение об ошибке <code translate="no">Illegal uri [example.db]</code> указывает на то, что вы пытаетесь подключиться к Milvus Lite, используя более раннюю версию PyMilvus, которая не поддерживает этот тип соединения. Чтобы решить эту проблему, обновите вашу установку PyMilvus как минимум до версии 2.4.2, которая включает поддержку подключения к Milvus Lite.</p>
<p>Обновить PyMilvus можно с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">Почему я получаю меньше результатов, чем <code translate="no">limit</code>, которые я задал в своем поиске/запросе?</h4><p>Есть несколько причин, по которым вы можете получить меньше результатов, чем указанный вами <code translate="no">limit</code>:</p>
<ul>
<li><p><strong>Ограниченные данные</strong>: В коллекции может быть недостаточно сущностей, чтобы выполнить запрошенный вами лимит. Если общее количество сущностей в коллекции меньше установленного лимита, вы, естественно, получите меньше результатов.</p></li>
<li><p><strong>Дублирование первичных ключей</strong>: Milvus отдает приоритет определенным сущностям, когда во время поиска встречаются дубликаты первичных ключей. Это поведение зависит от типа поиска:</p></li>
<li><p><strong>Запрос (точное совпадение)</strong>: Milvus выбирает последнюю сущность с совпадающим PK. ANN Search: Milvus выбирает сущность с наибольшим показателем сходства, даже если сущности имеют одинаковый PK. Такая расстановка приоритетов может привести к получению меньшего количества уникальных результатов, чем предел, если в вашей коллекции много дублирующихся первичных ключей.</p></li>
<li><p><strong>Недостаточное количество совпадений</strong>: Выражения фильтрации поиска могут быть слишком строгими, в результате чего меньшее количество сущностей соответствует порогу сходства. Если условия поиска слишком строгие, то совпадет недостаточно сущностей, что приведет к меньшему количеству результатов, чем ожидалось.</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>. Что вызывает эту ошибку и как ее решить?</h4><p>Эта ошибка возникает при попытке использовать Milvus Lite на платформе Windows. Milvus Lite в основном разработан для Linux и может не иметь встроенной поддержки Windows.</p>
<p>Решение заключается в использовании среды Linux:</p>
<ul>
<li>Используйте операционную систему на базе Linux или виртуальную машину для запуска Milvus Lite.</li>
<li>Такой подход обеспечит совместимость с зависимостями и функциональностью библиотеки.</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">Что такое ошибки "длина превышает максимальную" в Milvus, и как их понять и устранить?</h4><p>Ошибки "Длина превышает максимальную длину" в Milvus возникают, когда размер элемента данных превышает максимально допустимый размер для коллекции или поля. Вот несколько примеров и объяснений:</p>
<ul>
<li><p>Ошибка поля JSON: <code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>Ошибка длины строки: <code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>Ошибка поля VarChar: <code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>Чтобы понять и устранить эти ошибки:</p>
<ul>
<li>Поймите, что <code translate="no">len(str)</code> в Python обозначает количество символов, а не размер в байтах.</li>
<li>Для строковых типов данных, таких как VARCHAR и JSON, используйте <code translate="no">len(bytes(str, encoding='utf-8'))</code> для определения фактического размера в байтах, что и используется Milvus для &quot;max-length&quot;.</li>
</ul>
<p>Пример на языке Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">Все еще есть вопросы?</h4><p>Вы можете:</p>
<ul>
<li>Ознакомиться с <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> на GitHub. Не стесняйтесь задавать вопросы, делиться идеями и помогать другим.</li>
<li>Присоединяйтесь к нашему <a href="https://discord.com/invite/8uyFbECzPX">серверу Discord</a>, чтобы найти поддержку и взаимодействовать с нашим сообществом разработчиков открытого кода.</li>
</ul>
