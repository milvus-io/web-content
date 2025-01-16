---
id: scalar_index.md
related_key: scalar_index
summary: Скалярный индекс в Мильвусе.
title: Скалярный индекс
---
<h1 id="Scalar-Index" class="common-anchor-header">Скалярный индекс<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus поддерживает фильтрованный поиск по скалярным и векторным полям. Чтобы повысить эффективность поиска по скалярным полям, в Milvus начиная с версии 2.1.0 была введена индексация по скалярным полям. В этой статье представлен обзор индексирования скалярных полей в Milvus, который поможет вам понять его значение и реализацию.</p>
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
    </button></h2><p>При проведении поиска по векторному сходству в Milvus вы можете использовать логические операторы для организации скалярных полей в булевы выражения.</p>
<p>Когда Milvus получает поисковый запрос с таким булевым выражением, он разбирает булевое выражение на абстрактное синтаксическое дерево (AST), чтобы создать физический план для фильтрации атрибутов. Затем Milvus применяет физический план в каждом сегменте для создания <a href="/docs/ru/bitset.md">набора битов</a> в качестве результата фильтрации и включает результат в качестве параметра векторного поиска, чтобы сузить область поиска. В этом случае скорость векторного поиска в значительной степени зависит от скорости фильтрации атрибутов.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>Фильтрация атрибутов в сегменте</span> </span></p>
<p>Индексирование скалярных полей - это способ обеспечить скорость фильтрации атрибутов путем сортировки значений скалярных полей определенным образом для ускорения поиска информации.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">Алгоритмы индексирования скалярных полей<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus стремится достичь низкого потребления памяти, высокой эффективности фильтрации и короткого времени загрузки с помощью алгоритмов индексации скалярных полей. Эти алгоритмы делятся на два основных типа: <a href="#auto-indexing">автоиндексация</a> и <a href="#inverted-indexing">инвертированная индексация</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">Автоматическое индексирование</h3><p>Milvus предоставляет опцию <code translate="no">AUTOINDEX</code>, чтобы избавить вас от необходимости вручную выбирать тип индекса. При вызове метода <code translate="no">create_index</code>, если не указан <code translate="no">index_type</code>, Milvus автоматически выбирает наиболее подходящий тип индекса, основываясь на типе данных.</p>
<p>В следующей таблице перечислены типы данных, которые поддерживает Milvus, и соответствующие им алгоритмы автоматического индексирования.</p>
<table>
<thead>
<tr><th>Тип данных</th><th>Алгоритм автоматического индексирования</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>Инвертированный индекс</td></tr>
<tr><td>INT8</td><td>Инвертированный индекс</td></tr>
<tr><td>INT16</td><td>Инвертированный индекс</td></tr>
<tr><td>INT32</td><td>Инвертированный индекс</td></tr>
<tr><td>INT64</td><td>Инвертированный индекс</td></tr>
<tr><td>FLOAT</td><td>Инвертированный индекс</td></tr>
<tr><td>DOUBLE</td><td>Инвертированный индекс</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">Инвертированное индексирование</h3><p>Инвертированное индексирование - это гибкий способ создания индекса для скалярного поля путем ручного указания параметров индекса. Этот метод хорошо подходит для различных сценариев, включая точечные запросы, запросы по совпадению шаблонов, полнотекстовый поиск, поиск в JSON, булевский поиск и даже запросы по совпадению префиксов.</p>
<p>Инвертированные индексы, реализованные в Milvus, работают на основе <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, библиотеки полнотекстового поискового механизма. Tantivy гарантирует, что инвертированное индексирование в Milvus будет эффективным и быстрым.</p>
<p>Инвертированный индекс состоит из двух основных компонентов: словаря терминов и инвертированного списка. Словарь терминов включает все токенизированные слова, отсортированные по алфавиту, а инвертированный список содержит список документов, в которых встречается каждое слово. Такая схема позволяет выполнять точечные запросы и запросы по диапазону гораздо быстрее и эффективнее, чем поиск методом "грубой силы".</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>Диаграмма инвертированного индекса</span> </span></p>
<p>Преимущества использования инвертированного индекса особенно очевидны при выполнении следующих операций:</p>
<ul>
<li><strong>Точечный запрос</strong>: Например, при поиске документов, содержащих слово <strong>Milvus</strong>, процесс начинается с проверки наличия <strong>Milvus</strong> в словаре терминов. Если оно не найдено, то ни один документ не содержит этого слова. Если же оно найдено, то извлекается инвертированный список, связанный с <strong>Milvus</strong>, в котором указаны документы, содержащие это слово. Этот метод гораздо эффективнее, чем поиск "грубой силой" по миллиону документов, поскольку отсортированный словарь терминов значительно снижает временную сложность поиска слова <strong>Milvus</strong>.</li>
<li><strong>Запрос диапазона</strong>: Эффективность запросов по диапазону, таких как поиск документов, содержащих слова в алфавитном порядке больше, чем <strong>very</strong>, также повышается благодаря словарю отсортированных терминов. Этот подход более эффективен, чем поиск методом "грубой силы", обеспечивая более быстрые и точные результаты.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">Результаты тестирования</h3><p>Чтобы продемонстрировать улучшение производительности, обеспечиваемое скалярными индексами в Milvus, был проведен эксперимент по сравнению производительности нескольких выражений с использованием инвертированного индексирования и поиска методом "грубой силы" в необработанных данных.</p>
<p>Эксперимент включал в себя тестирование различных выражений в двух условиях: с инвертированным индексом и с перебором. Чтобы обеспечить справедливость, во всех тестах поддерживалось одинаковое распределение данных, каждый раз использовалась одна и та же коллекция. Перед каждым тестом коллекция освобождалась, индекс удалялся и перестраивался. Кроме того, перед каждым тестом выполнялся теплый запрос, чтобы минимизировать влияние холодных и горячих данных, и каждый запрос выполнялся несколько раз для обеспечения точности.</p>
<p>Для набора данных из <strong>1 миллиона</strong> записей использование <strong>инвертированного индекса</strong> может обеспечить <strong>30-кратное</strong> повышение производительности при выполнении точечных запросов. Для больших наборов данных прирост производительности может быть еще более значительным.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">Рекомендации по производительности<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы в полной мере использовать возможности Milvus по индексированию скалярных полей и раскрыть его мощь в поиске по векторному сходству, вам может понадобиться модель для оценки необходимого объема памяти на основе имеющихся у вас данных.</p>
<p>В следующих таблицах перечислены функции оценки для всех типов данных, которые поддерживает Milvus.</p>
<ul>
<li><p>Числовые поля</p>
<table>
<thead>
<tr><th>Тип данных</th><th>Функция оценки памяти (МБ)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>Поля строк</p>
<table>
<thead>
<tr><th>Длина строки</th><th>Функция оценки памяти (МБ)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>numOfRows * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>numOfRows * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>numOfRows * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
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
    </button></h2><ul>
<li><p>Чтобы проиндексировать скалярное поле, прочитайте статью <a href="/docs/ru/index-scalar-fields.md">Построение индекса по скалярам</a>.</p></li>
<li><p>Чтобы узнать больше о связанных терминах и правилах, упомянутых выше, читайте</p>
<ul>
<li><a href="/docs/ru/bitset.md">Биты</a></li>
<li><a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a></li>
<li><a href="/docs/ru/boolean.md">Правила булевых выражений</a></li>
<li><a href="/docs/ru/schema.md#Supported-data-type">Поддерживаемые типы данных</a></li>
</ul></li>
</ul>