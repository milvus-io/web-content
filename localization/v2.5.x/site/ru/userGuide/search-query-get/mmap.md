---
id: mmap.md
summary: MMap позволяет разместить больше данных на одном узле.
title: Хранение данных с поддержкой MMap
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">Хранение данных с поддержкой MMap<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>В Milvus файлы с отображением памяти позволяют напрямую отображать содержимое файлов в память. Эта функция повышает эффективность использования памяти, особенно в ситуациях, когда доступной памяти мало, а полная загрузка данных невозможна. Этот механизм оптимизации может увеличить объем памяти, обеспечивая производительность до определенного предела; однако, когда объем данных слишком сильно превышает объем памяти, производительность поиска и запросов может серьезно снизиться, поэтому, пожалуйста, включите или выключите эту функцию в зависимости от ситуации.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">Настройка отображения памяти<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>Начиная с Milvus 2.4, вы можете гибко настроить статический файл конфигурации, чтобы задать параметры отображения памяти по умолчанию для всего кластера перед развертыванием. Кроме того, есть возможность динамически изменять параметры для точной настройки параметров отображения памяти на уровне кластера и индекса. В будущих обновлениях возможности отображения памяти будут расширены за счет конфигураций на уровне полей.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">Перед развертыванием кластера: глобальная конфигурация</h3><p>Перед развертыванием кластера настройки на <strong>уровне кластера</strong> применяют отображение памяти для всего кластера. Благодаря этому все новые объекты будут автоматически соответствовать этим конфигурациям. Важно отметить, что изменение этих настроек требует перезапуска кластера, чтобы они вступили в силу.</p>
<p>Чтобы изменить настройки отображения памяти в кластере, отредактируйте файл <code translate="no">configs/milvus.yaml</code>. В этом файле вы можете указать, включать ли отображение памяти по умолчанию, и определить путь к каталогу для хранения файлов с отображением памяти. Если путь (<code translate="no">mmapDirPath</code>) не указан, система по умолчанию будет хранить файлы с отображением памяти в каталоге <code translate="no">{localStorage.path}/mmap</code>. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">Конфигурации, связанные с локальным хранилищем</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>После <code translate="no">2.4.10</code> конфигурация <code translate="no">queryNode.mmap.mmapEnabled</code> разделяется на четыре отдельных поля, и все они по умолчанию <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>, управляет тем, являются ли данные вектора mmap;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>, управляет тем, является ли индекс вектора mmap;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>, управляет тем, являются ли скалярные данные mmap;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>, управляет тем, является ли скалярный индекс mmap;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>Кроме того, только векторный индекс и векторные данные mmap могут быть включены или выключены для коллекции отдельно, но не для других.</p>
<p>Совместимость: Если исходная конфигурация <code translate="no">queryNode.mmap.mmapEnabled</code> установлена на <code translate="no">true</code>, то вновь добавленная конфигурация будет установлена на <code translate="no">true</code>. Если для <code translate="no">queryNode.mmap.mmapEnabled</code> установлено значение <code translate="no">false</code>, то для новой конфигурации будет установлено значение <code translate="no">true</code>, окончательное значение будет <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">Во время работы кластера: динамическая конфигурация</h3><p>Во время работы кластера можно динамически изменять параметры отображения памяти на уровне коллекции или индекса.</p>
<p>На <strong>уровне коллекции</strong> отображение памяти применяется ко всем неиндексированным исходным данным в коллекции, исключая первичные ключи, временные метки и идентификаторы строк. Такой подход особенно удобен для комплексного управления большими наборами данных.</p>
<p>Для динамической корректировки настроек отображения памяти в коллекции используйте метод <code translate="no">set_properties()</code>. Здесь вы можете переключать <code translate="no">mmap.enabled</code> между <code translate="no">True</code> и <code translate="no">False</code> по мере необходимости.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>После <code translate="no">2.4.10</code>, настройки отображения памяти в коллекции, используйте метод <code translate="no">add_field</code>. Здесь вы можете переключать <code translate="no">mmap_enabled</code> между <code translate="no">True</code> или <code translate="no">False</code> по мере необходимости.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Для настроек на <strong>уровне индексов</strong> отображение памяти может быть специально применено к векторным индексам, не затрагивая другие типы данных. Эта возможность неоценима для коллекций, которым требуется оптимизированная производительность векторного поиска.</p>
<p>Чтобы включить или отключить отображение памяти для индекса в коллекции, вызовите метод <code translate="no">alter_index()</code>, указав имя целевого индекса в <code translate="no">index_name</code> и установив <code translate="no">mmap.enabled</code> в <code translate="no">True</code> или <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">Настройка пути хранения в различных развертываниях<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>Файлы, отображаемые в памяти, по умолчанию размещаются в каталоге <code translate="no">/mmap</code> внутри <code translate="no">localStorage.path</code>. Вот как настроить этот параметр при различных способах развертывания:</p>
<ul>
<li>Для Milvus, установленного с помощью Helm Chart:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Для Milvus, установленного с помощью Milvus Operator:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Для Milvus, установленного с помощью Docker:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Ограничения<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Сопоставление памяти не может быть включено для загруженной коллекции, убедитесь, что коллекция была освобождена перед включением сопоставления памяти.</p></li>
<li><p>Сопоставление памяти не поддерживается для индексов класса DiskANN или GPU.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>В каких сценариях рекомендуется включать отображение памяти? Каковы компромиссы после включения этой функции?</strong></p>
<p>Сопоставление памяти рекомендуется при ограниченном объеме памяти или при умеренных требованиях к производительности. Включение этой функции увеличивает пропускную способность для загрузки данных. Например, при конфигурации из 2 процессоров и 8 ГБ памяти включение функции отображения памяти позволяет загрузить в 4 раза больше данных по сравнению с отсутствием этой функции. Влияние на производительность различно:</p>
<ul>
<li><p>При достаточном объеме памяти ожидаемая производительность аналогична производительности при использовании только памяти.</p></li>
<li><p>При недостатке памяти ожидаемая производительность может снизиться.</p></li>
</ul></li>
<li><p><strong>Какова связь между конфигурациями на уровне коллекции и на уровне индекса?</strong></p>
<p>Уровень коллекции и уровень индекса не являются всеобъемлющими отношениями, уровень коллекции контролирует, поддерживают ли исходные данные mmap или нет, в то время как уровень индекса предназначен только для векторных индексов.</p></li>
<li><p><strong>Существует ли какой-либо рекомендуемый тип индекса для отображения памяти?</strong></p>
<p>Да, для включения mmap рекомендуется HNSW. Мы уже тестировали индексы серий HNSW, IVF_FLAT, IVF_PQ/SQ, производительность индексов серии IVF серьезно упала, в то время как падение производительности при включении mmap для индексов HNSW остается в пределах ожиданий.</p></li>
<li><p><strong>Какое локальное хранилище требуется для отображения памяти?</strong></p>
<p>Высококачественный диск повышает производительность, причем предпочтительным вариантом являются диски NVMe.</p></li>
<li><p><strong>Можно ли отображать память на скалярные данные?</strong></p>
<p>Картирование памяти можно применять к скалярным данным, но оно не применимо к индексам, построенным на скалярных полях.</p></li>
<li><p><strong>Как определяется приоритет для конфигураций отображения памяти на разных уровнях?</strong></p>
<p>В Milvus, когда конфигурации отображения памяти явно определены на нескольких уровнях, конфигурации на уровне индексов и коллекций имеют наивысший приоритет, а затем следуют конфигурации на уровне кластеров.</p></li>
<li><p><strong>Если я перейду с Milvus 2.3 и настрою путь к каталогу отображения памяти, что произойдет?</strong></p>
<p>Если вы перешли с Milvus 2.3 и настроили путь к каталогу отображения памяти (<code translate="no">mmapDirPath</code>), ваша конфигурация будет сохранена, а параметром по умолчанию для включенного отображения памяти (<code translate="no">mmapEnabled</code>) будет <code translate="no">true</code>. Важно перенести метаданные, чтобы синхронизировать конфигурацию существующих файлов с отображением памяти. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">Миграция метаданных</a>.</p></li>
</ul>
