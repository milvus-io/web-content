---
id: search_with_svs_vamana.md
summary: >-
  Создавайте и выполняйте поиск по графовым индексам SVS Vamana, хранящимся в
  памяти, в Milvus с помощью пропускания индексов FAISS, с возможностью
  использования сжатия LeanVec или LVQ на процессорах Intel.
title: 'Поиск с помощью SVS, Vamana и Milvus'
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">Поиск с помощью SVS, Vamana и Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search) — это высокопроизводительная библиотека векторного поиска от Intel, реализующая алгоритм графов Vamana. В Milvus доступ к SVS Vamana осуществляется через <a href="https://milvus.io/docs/faiss.md">пропуск индекса FAISS</a>: установите значение параметра ` <code translate="no">index_type</code> ` равным ` <code translate="no">FAISS</code> ` и укажите строку-фабрику индекса ` <code translate="no">SVSVamana</code> `, после чего Milvus сформирует индекс и будет выполнять поиск через интеграцию SVS с Faiss.</p>
<p>Vamana — это графовая структура, которую также использует <a href="https://milvus.io/docs/diskann.md">DISKANN</a>, но SVS Vamana хранит весь граф в памяти. Он также может сжимать векторы с помощью <strong>LeanVec</strong> или <strong>LVQ</strong>, что снижает потребление памяти и ускоряет поиск, при этом сохраняя очень высокий показатель полноты (recall).</p>
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
<li>Milvus 3.0.0 или более поздней версии, скомпилированный из исходного кода с включенной поддержкой SVS</li>
<li>PyMilvus 3.0.0 или более поздней версии</li>
<li>Процессор Intel, если вы используете хранилище <code translate="no">LVQ*</code> или <code translate="no">LeanVec*</code>; хранилища <code translate="no">FP32</code>, <code translate="no">FP16</code> и <code translate="no">SQ8</code> работают на любой платформе</li>
<li>Знакомство со <a href="https://milvus.io/docs/faiss.md">строками индекс-фабрики FAISS</a></li>
</ul>
<div class="alert note">
<p>SVS не входит в стандартную сборку Milvus. Чтобы использовать фабрики <code translate="no">SVSVamana</code>, скомпилируйте Milvus из исходного кода с помощью <code translate="no">make USE_SVS=ON</code>. В сборке без SVS создание индекса завершается сбоем, поскольку Faiss не распознает строку фабрики.</p>
</div>
<p>Сжатие LVQ и LeanVec работает только на процессорах Intel и работает быстрее на процессорах с AVX-512. На других процессорах создание индекса завершается с ошибкой для строк-фабрик <code translate="no">LVQ*</code> и <code translate="no">LeanVec*</code>.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">Как работает SVS Vamana<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Граф Vamana<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana строит одноуровневый граф близости. Каждый вектор представляет собой узел, а ребра соединяют векторы, которые, вероятно, являются близкими соседями. Для построения графа SVS выполняет следующие действия для каждого узла <strong>x</strong>:</p>
<ol>
<li><p><strong>Алчный поиск</strong>: SVS выполняет поиск по построенной на данный момент графе, ведя список кандидатов размером <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>Отрезание соседей</strong>: посещённые узлы становятся потенциальными соседями для <strong>x</strong>. SVS рассматривает их в порядке возрастания расстояния от <strong>x</strong>. Кандидат <code translate="no">c</code> пропускается, если более близкий сосед <code translate="no">n</code>, который уже был сохранен, удовлетворяет условию <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code>. Это позволяет сохранить ребра дальнего действия и удалить избыточные ребра ближнего действия, благодаря чему поиск может перемещаться по графу скачками, а не шаг за шагом, переходя от одного ближайшего соседа к другому. Обрезка прекращается, как только достигается степень графа.</p></li>
<li><p><strong>Обратные ребра</strong>: для каждого нового соседа <strong>x</strong> SVS добавляет обратное ребро, ведущее обратно к <strong>x</strong>, и удаляет из списка ребер этого соседа те ребра, количество которых превышает степень графа.</p></li>
</ol>
<p>Обрезка выполняется в два прохода: сначала с параметром « <code translate="no">alpha = 1</code> », затем с настроенным параметром « <code translate="no">alpha</code> ». Более высокая степень графа и значение параметра « <code translate="no">construction_window_size</code> » дают более плотный и качественный граф, но требуют больше памяти и больше времени на построение.</p>
<p>Во время поиска SVS проходит по графу по алгоритму жадного поиска, сохраняя в списке « <code translate="no">search_window_size</code> » ближайшие кандидаты, обнаруженные на данный момент. Затем всегда исследуется ближайший неисследованный кандидат. Поиск заканчивается, как только каждый сосед текущего узла окажется дальше от запроса, чем худший кандидат в окне. Более высокое значение параметра « <code translate="no">search_window_size</code> » позволяет исследовать большую часть графа, что повышает полноту поиска, но также увеличивает задержку.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">Сжатие LeanVec<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a> уменьшает как количество измерений на вектор, так и количество битов на измерение. Индекс LeanVec хранит два представления каждого вектора:</p>
<ul>
<li><p><strong>Первичное (с уменьшенной размерностью)</strong>: линейная проекция вектора на меньшее число измерений. Поиск по графу выполняется над этим первичным набором данных, поэтому большинство вычислений расстояний происходит в пространстве с меньшей размерностью. Это снижает как вычислительные требования, так и требования к пропускной способности памяти. По умолчанию уменьшенная размерность составляет половину исходной (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>Вторичное (полная размерность)</strong>: вектор в исходной размерности. SVS заново ранжирует кандидаты, возвращённые первичным поиском по графу, по отношению к этому вторичному набору данных, чтобы восстановить точность, утраченную в результате уменьшения размерности.</p></li>
</ul>
<p>Оба представления квантуются с помощью <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (локально-адаптивная векторная квантование). Компонент хранения заводской строки выбирает способ кодирования. Например, <code translate="no">LeanVec4x8</code> использует 4 бита на измерение для первичного набора данных и 8 битов на измерение для вторичного набора данных. Даже на этапе повторного ранжирования вектор с полной точностью никогда не считывается.</p>
<p>По умолчанию LeanVec обучается отдельным проекциям для индексированных векторов и для запросов, чтобы поддерживать запросы, которые поступают из распределения, отличного от распределения индексированных векторов (за пределами распределения, или OOD). Это особенно хорошо работает для кросс-модальных рабочих нагрузок, таких как поиск «текст-изображение», а также эффективно, когда запросы принадлежат тому же распределению, что и индексированные векторы. Milvus пока не поддерживает способ передачи запросов для вычисления проекций, поэтому в настоящее время используются только базовые векторы. Обучение OOD увеличивает время сборки. Чтобы ускорить сборку за счёт некоторого снижения производительности запросов, установите значение параметра ` <code translate="no">ood_training</code> ` равным ` <code translate="no">False</code>`.</p>
<h3 id="LVQ-compression" class="common-anchor-header">Сжатие LVQ<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>Для наборов данных с меньшим количеством измерений, чем примерно 512, может дать лучшие результаты пропуск этапа снижения размерности и сжатие исключительно с помощью квантования LVQ. Как и LeanVec, индекс LVQ хранит основное представление для быстрого поиска и остаточное представление для повторного ранжирования. Например, <code translate="no">LVQ4x4</code> использует 4 бита для основного представления и 4 бита для остаточного. <code translate="no">LVQ4x0</code> и <code translate="no">LVQ8x0</code> пропускают повторное ранжирование, что ускоряет запросы, если их полнота поиска достаточно высока для вашей рабочей нагрузки.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Выберите фабричную строку<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>Строки-шаблоны SVS Vamana имеют вид <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code>, где <code translate="no">&lt;degree&gt;</code> — максимальное количество ребер на узел в графе.</p>
<table>
<thead>
<tr><th>Строка-шаблон</th><th>Хранение</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>Несжатые векторы.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>16-битные числа с плавающей запятой</td><td>Половина объёма памяти для векторов по сравнению с <code translate="no">FP32</code> при минимальной потере точности.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>8-битная скалярная квантование</td><td>Четверть объёма векторной памяти, используемого в режиме « <code translate="no">FP32</code> ».</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ в качестве основного метода, без остаточного</td><td>Только для процессоров Intel. Без переранжирования.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ — основной и остаточный</td><td>Только процессоры Intel.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec первичный и вторичный</td><td>только для процессоров Intel. Добавьте суффикс « <code translate="no">_&lt;dim&gt;</code> », чтобы задать уменьшенную размерность. Например, « <code translate="no">LeanVec4x8_128</code> » уменьшает размерность основного набора данных до 128 измерений. Без суффикса уменьшенная размерность составляет « <code translate="no">dim / 2</code> ».</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> — хорошая отправная точка. Далее:</p>
<ul>
<li><p>Для <strong>повышения коэффициента восстановления</strong> за счёт некоторого увеличения объёма памяти увеличьте размерность LeanVec с помощью суффикса <code translate="no">_&lt;dim&gt;</code>.</p></li>
<li><p>Чтобы <strong>уменьшить объем занимаемой памяти</strong> за счёт некоторого снижения коэффициента восстановления, уменьшите размерность LeanVec.</p></li>
<li><p>Для векторов с низкой размерностью попробуйте использовать <code translate="no">LVQ8</code>.</p></li>
<li><p><strong>На процессорах, отличных от Intel</strong>, используйте <code translate="no">FP16</code> или <code translate="no">SQ8</code>.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">Создание индекса<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующем примере создается индекс SVS Vamana со степенью графа 64 и сжатием LeanVec. Разверните блок настройки и запустите его перед созданием индекса.</p>
<p><details></p>
<p><summary>Подготовка коллекции</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Установите значение параметра <code translate="no">index_type</code> равным <code translate="no">FAISS</code> и используйте <code translate="no">faiss_index_name</code> для выбора рецепта SVS Vamana.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">Поиск по индексу<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> регулирует соотношение между полнотой поиска и задержкой, так же как <code translate="no">ef</code> для <a href="https://milvus.io/docs/hnsw.md">HNSW</a>. Установите <code translate="no">search_buffer_capacity</code> как минимум на то же значение. По умолчанию для обоих параметров установлено значение 10, и SVS отклоняет запрос, если <code translate="no">search_window_size</code> превышает <code translate="no">search_buffer_capacity</code>.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Если значение <code translate="no">limit</code> превышает значение <code translate="no">search_window_size</code>, SVS увеличивает окно до <code translate="no">limit</code> для данного поиска.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">Параметры SVS Vamana<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Следующие параметры сборки указываются в файле <code translate="no">params</code> в каталоге <code translate="no">add_index()</code>, рядом с файлом <code translate="no">faiss_index_name</code>. Их нельзя изменить после построения индекса.</p>
<table>
<thead>
<tr><th>Параметр</th><th>По умолчанию</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>Размер списка кандидатов, используемого для поиска соседей каждого узла при построении графа. Более высокие значения улучшают качество графа и коэффициент полноты, но увеличивают время построения. Установите значение не меньше степени графа. Обычно выбирают значение 200.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> для <code translate="no">L2</code>, <code translate="no">0.95</code> для <code translate="no">IP</code> и <code translate="no">COSINE</code></td><td>Сила обрезки. Значения, более удалённые от 1, обеспечивают более агрессивную обрезку, отдавая предпочтение ребрам с большим радиусом действия перед избыточными ребрами с малым радиусом. Используйте значения выше 1 для параметра « <code translate="no">L2</code> » и ниже 1 для параметров « <code translate="no">IP</code> » и « <code translate="no">COSINE</code> ». Оставьте значение по умолчанию, если вы не определили более подходящее значение на основе ваших данных.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>Степень в исходной строке или <code translate="no">32</code></td><td>Максимальное количество ребер на узел. Переопределяет степень, указанную в исходной строке. Значения в диапазоне [32, 128] подходят для большинства рабочих нагрузок. Более высокие значения могут повысить коэффициент восстановления, но требуют большего объема памяти и более длительного времени построения.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>Степень графа минус 4</td><td>Количество ребер, которые узел сохраняет после обрезки, если их количество превышает степень графа.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>Максимальное количество кандидатов, рассматриваемых при обрезке соседей узла. Должно быть больше, чем <code translate="no">construction_window_size</code>.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>Указывает, учитываются ли при обрезке все узлы, посещённые в ходе поиска при построении, а не только конечные кандидаты.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> суффикс заводской строки или <code translate="no">dim / 2</code></td><td>только для LeanVec. Сниженная размерность исходного набора данных. Переопределяет суффикс factory-string. Меньшие значения снижают потребление памяти и ускоряют поиск по графу, но уменьшают коэффициент восстановления.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> для LeanVec</td><td>Только для LeanVec. Определяет, следует ли обучать отдельные проекции для индексированных векторов и запросов. Установите значение ` <code translate="no">False</code> ` для ускорения построения. Установка значения ` <code translate="no">True</code> ` для любого фабричного параметра, кроме LeanVec, приведёт к сбою.</td></tr>
</tbody>
</table>
<p>Следующие параметры поиска указываются в ` <code translate="no">search_params.params</code>`. Вы также можете задать их в качестве параметров сборки, что изменит значения по умолчанию, используемые индексом для поисков, в которых эти параметры не заданы.</p>
<table>
<thead>
<tr><th>Параметр</th><th>По умолчанию</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>Количество ближайших кандидатов, сохраняемых при обходе графа. Более высокие значения повышают полноту поиска и задержку.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>Емкость буфера поиска. Должна быть не меньше, чем <code translate="no">search_window_size</code>. В большинстве случаев устанавливайте значение, равное <code translate="no">search_window_size</code>. Для LeanVec попробуйте значение, равное 1,5-кратной величине <code translate="no">search_window_size</code>.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">Узнать больше<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>Ознакомьтесь со справочником <a href="https://milvus.io/docs/faiss.md">по пропусканию индекса FAISS</a>, чтобы узнать об общем контракте factory-string, ограничениях и обработке ошибок.</li>
<li>Сравните с реализацией Vamana на диске в <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>См. <a href="https://github.com/intel/ScalableVectorSearch">репозиторий SVS</a> для получения сведений о сборке, настройке производительности и базовом API на C++.</li>
</ul>
