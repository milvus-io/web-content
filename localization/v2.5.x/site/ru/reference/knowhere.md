---
id: knowhere.md
summary: Узнайте о Knowhere в Милвусе.
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме рассказывается о Knowhere, основной системе векторного поиска Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere - это векторный поисковый механизм с открытым исходным кодом, который включает в себя несколько библиотек поиска векторного сходства, включая <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a> и <a href="https://github.com/spotify/annoy">Annoy</a>. Knowhere также разработана для поддержки гетерогенных вычислений. Он контролирует, на каком оборудовании (CPU или GPU) выполнять запросы на построение индекса и поиск. Именно так Knowhere получила свое название - знание того, где выполнять операции. В будущих релизах будут поддерживаться другие типы оборудования, включая DPU и TPU.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere в архитектуре Milvus<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>На рисунке ниже показано место Knowhere в архитектуре Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>Самый нижний слой - это системное оборудование. Над ним располагаются сторонние индексные библиотеки. На верхнем уровне Knowhere взаимодействует с индексным узлом и узлом запросов через CGO, что позволяет пакетам Go вызывать код на C.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Преимущества Knowhere<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>Ниже перечислены преимущества Knowhere по сравнению с Faiss.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">Поддержка BitsetView</h4><p>Milvus вводит механизм битов для реализации "мягкого удаления". Мягко удаленный вектор все еще существует в базе данных, но не будет вычислен при поиске или запросе векторного сходства.</p>
<p>Каждый бит в битовом наборе соответствует индексированному вектору. Если в наборе битов вектор помечен как "1", это означает, что данный вектор мягко удален и не будет задействован в векторном поиске. Параметр bitset применяется ко всем API запросов индекса Фейса в Knowhere, включая индексы CPU и GPU.</p>
<p>Более подробную информацию о механизме bitset можно найти в разделе <a href="/docs/ru/v2.5.x/bitset.md">bitset</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">Поддержка нескольких метрик сходства для индексирования бинарных векторов</h4><p>Knowhere поддерживает <a href="/docs/ru/v2.5.x/metric.md#Hamming-distance">Hamming</a>, <a href="/docs/ru/v2.5.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/ru/v2.5.x/metric.md#Tanimoto-distance">Tanimoto</a>, <a href="/docs/ru/v2.5.x/metric.md#Superstructure">Superstructure</a> и <a href="/docs/ru/v2.5.x/metric.md#Substructure">Substructure</a>. Жаккард и Танимото могут использоваться для измерения сходства между двумя наборами образцов, а Superstructure и Substructure - для измерения сходства химических структур.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">Поддержка набора инструкций AVX512</h4><p>Помимо <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a> и <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>, наборов инструкций, уже поддерживаемых Faiss, Knowhere также поддерживает <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>, который может <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">повысить производительность построения индексов и запросов на 20-30 %</a> по сравнению с AVX2.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">Автоматический выбор SIMD-инструкций</h4><p>Knowhere поддерживает автоматический вызов подходящих SIMD-инструкций (например, SIMD SSE, AVX, AVX2 и AVX512) на любом процессоре (как на локальных, так и на облачных платформах), так что пользователям не нужно вручную указывать флаг SIMD (например, "-msse4") во время компиляции.</p>
<p>Knowhere создается путем рефакторинга кодовой базы Faiss. Общие функции (например, вычисление подобия), которые зависят от ускорения SIMD, вырезаются из кода. Затем для каждой функции реализуются четыре версии (т. е. SSE, AVX, AVX2, AVX512), каждая из которых помещается в отдельный исходный файл. Затем исходные файлы компилируются по отдельности с соответствующим флагом SIMD. Таким образом, во время выполнения Knowhere может автоматически выбирать наиболее подходящие SIMD-инструкции, основываясь на текущих флагах процессора, а затем связывать нужные указатели функций с помощью хуков.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">Другие оптимизации производительности</h4><p>Подробнее об оптимизации производительности Knowhere читайте в статье <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: A Purpose-Built Vector Data Management System</a>.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Структура кода Knowhere<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Вычисления в Milvus в основном включают в себя векторные и скалярные операции. Knowhere обрабатывает только операции по индексированию векторов.</p>
<p>Индекс - это структура данных, независимая от исходных векторных данных. Как правило, индексирование требует четырех шагов: создание индекса, обучение данных, вставка данных и построение индекса. В некоторых приложениях ИИ обучение наборов данных отделено от поиска векторов. Данные из наборов данных сначала обучаются, а затем вставляются в векторную базу данных, например Milvus, для поиска сходства. Например, в открытых наборах данных sift1M и sift1B различаются данные для обучения и данные для тестирования.</p>
<p>Однако в Knowhere данные для обучения и для поиска одинаковы. Knowhere обучает все данные в <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">сегменте</a>, а затем вставляет все обученные данные и строит для них индекс.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>: базовый класс</h4><p><code translate="no">DataObj</code> является базовым классом всех структур данных в Knowhere. <code translate="no">Size()</code> - единственный виртуальный метод в <code translate="no">DataObj</code>. Класс Index наследуется от <code translate="no">DataObj</code> с полем "size_". Класс Index также имеет два виртуальных метода - <code translate="no">Serialize()</code> и <code translate="no">Load()</code>. Класс <code translate="no">VecIndex</code>, производный от <code translate="no">Index</code>, является виртуальным базовым классом для всех векторных индексов. <code translate="no">VecIndex</code> предоставляет методы, включая <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code> и <code translate="no">ClearStatistics()</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>базовый класс</span> </span></p>
<p>Некоторые другие типы индексов перечислены справа на рисунке выше.</p>
<ul>
<li><p>Индекс Фейса имеет два базовых класса: <code translate="no">FaissBaseIndex</code> для всех индексов векторов с плавающей точкой и <code translate="no">FaissBaseBinaryIndex</code> для всех индексов двоичных векторов.</p></li>
<li><p><code translate="no">GPUIndex</code> является базовым классом для всех индексов Фейса GPU.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> базовый класс для всех индексов собственной разработки. Учитывая, что в индексном файле хранятся только идентификаторы векторов, размер файла для 128-мерных векторов может быть уменьшен на 2 порядка.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>: грубый поиск</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>Технически говоря, <code translate="no">IDMAP</code> не является индексом, а скорее используется для поиска методом перебора. При вводе векторов в базу данных не требуется ни обучения данных, ни построения индекса. Поиск будет осуществляться непосредственно по вставленным векторным данным.</p>
<p>Однако для согласованности кода <code translate="no">IDMAP</code> также наследует от класса <code translate="no">VecIndex</code> со всеми его виртуальными интерфейсами. Использование <code translate="no">IDMAP</code> такое же, как и других индексов.</p>
<h4 id="IVF-indices" class="common-anchor-header">ЭКО-индексы</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>Индексы IVF (инвертированный файл) являются наиболее часто используемыми. Класс <code translate="no">IVF</code> является производным от <code translate="no">VecIndex</code> и <code translate="no">FaissBaseIndex</code>, далее расширяется до <code translate="no">IVFSQ</code> и <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> является производным от <code translate="no">GPUIndex</code> и <code translate="no">IVF</code>. Затем <code translate="no">GPUIVF</code> расширяется до <code translate="no">GPUIVFSQ</code> и <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> является самостоятельно разработанным гибридным индексом. Грубый квантователь выполняется на GPU, а поиск в ведре - на CPU. Этот тип индекса позволяет уменьшить количество копий памяти между CPU и GPU, используя вычислительную мощность GPU. <code translate="no">IVFSQHybrid</code> имеет тот же коэффициент отзыва, что и <code translate="no">GPUIVFSQ</code>, но обладает лучшей производительностью.</p>
<p>Структура базового класса для бинарных индексов относительно проще. <code translate="no">BinaryIDMAP</code> и <code translate="no">BinaryIVF</code> являются производными от <code translate="no">FaissBaseBinaryIndex</code> и <code translate="no">VecIndex</code>.</p>
<h4 id="Third-party-indices" class="common-anchor-header">Сторонние индексы</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>Сторонние индексы</span> </span></p>
<p>В настоящее время, помимо Faiss, поддерживаются только два типа сторонних индексов: древовидный <code translate="no">Annoy</code> и графовый <code translate="no">HNSW</code>. Эти два распространенных и часто используемых сторонних индекса получены из <code translate="no">VecIndex</code>.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Добавление индексов в Knowhere<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы хотите добавить новые индексы в Knowhere, сначала вы можете обратиться к существующим индексам:</p>
<ul>
<li><p>Чтобы добавить индексы, основанные на квантовании, обратитесь к <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>Чтобы добавить индексы на основе графов, обратитесь к <code translate="no">HNSW</code>.</p></li>
<li><p>Чтобы добавить индексы на основе деревьев, обратитесь к <code translate="no">Annoy</code>.</p></li>
</ul>
<p>После обращения к существующему индексу вы можете выполнить следующие действия, чтобы добавить новый индекс в Knowhere.</p>
<ol>
<li><p>Добавьте имя нового индекса в поле <code translate="no">IndexEnum</code>. Тип данных - строка.</p></li>
<li><p>Добавьте проверку достоверности данных для нового индекса в файл <code translate="no">ConfAdapter.cpp</code>. Проверка валидности нужна в основном для проверки параметров подготовки данных и запроса.</p></li>
<li><p>Создайте новый файл для нового индекса. Базовый класс нового индекса должен включать <code translate="no">VecIndex</code>, а также необходимый виртуальный интерфейс <code translate="no">VecIndex</code>.</p></li>
<li><p>Добавьте логику построения индекса для нового индекса в <code translate="no">VecIndexFactory::CreateVecIndex()</code>.</p></li>
<li><p>Добавьте юнит-тест в каталог <code translate="no">unittest</code>.</p></li>
</ol>
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
    </button></h2><p>После изучения того, как Knowhere работает в Milvus, вы также можете захотеть:</p>
<ul>
<li><p>Узнать о <a href="/docs/ru/v2.5.x/index.md">различных типах индексов, которые поддерживает Milvus</a>.</p></li>
<li><p>Узнать о <a href="/docs/ru/v2.5.x/bitset.md">механизме битовых наборов</a>.</p></li>
<li><p>Понять <a href="/docs/ru/v2.5.x/data_processing.md">, как обрабатываются данные</a> в Milvus.</p></li>
</ul>
