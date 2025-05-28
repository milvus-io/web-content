---
id: phrase-match.md
title: Сопоставление фраз
summary: >-
  Фразовое соответствие позволяет искать документы, содержащие термины запроса в
  виде точной фразы. По умолчанию слова должны располагаться в том же порядке и
  непосредственно рядом друг с другом. Например, запрос "robotics machine
  learning" соответствует тексту типа "...typical robotics machine learning
  models...", где слова "robotics", "machine" и "learning" идут в одном порядке
  и между ними нет других слов.
---
<h1 id="Phrase-Match" class="common-anchor-header">Сопоставление фраз<button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>Фразовое соответствие позволяет искать документы, содержащие термины запроса в виде точной фразы. По умолчанию слова должны располагаться в том же порядке и непосредственно рядом друг с другом. Например, запрос <strong>"robotics machine learning"</strong> соответствует тексту типа <em>"...typical robotics machine learning models...",</em> где слова <strong>"robotics",</strong> <strong>"machine"</strong> и <strong>"learning"</strong> встречаются в той же последовательности и без других слов между ними.</p>
<p>Однако в реальных условиях строгое сопоставление фраз может оказаться слишком жестким. Вы можете захотеть подобрать текст типа <em>"...модели машинного обучения, широко применяемые в робототехнике...".</em> Здесь присутствуют одни и те же ключевые слова, но не рядом и не в оригинальном порядке. Чтобы справиться с этим, фразовое соответствие поддерживает параметр <code translate="no">slop</code>, который обеспечивает гибкость. Значение <code translate="no">slop</code> определяет, сколько позиционных сдвигов допускается между терминами во фразе. Например, при значении <code translate="no">slop</code>, равном 1, запрос <strong>"машинное обучение"</strong> может соответствовать тексту типа <em>"...машинное глубокое обучение...",</em> где одно слово (<strong>"глубокое")</strong> разделяет исходные термины.</p>
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
    </button></h2><p>Работает на основе библиотеки поисковой системы <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, а совпадение фраз происходит путем анализа позиционной информации слов в документах. Диаграмма ниже иллюстрирует процесс:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>Рабочий процесс поиска по фразе</span> </span></p>
<ol>
<li><p><strong>Токенизация документов</strong>: Когда вы вставляете документы в Milvus, текст разбивается на токены (отдельные слова или термины) с помощью анализатора, при этом для каждого токена записывается позиционная информация. Например, <strong>doc_1</strong> разбивается на лексемы <strong>["machine" (pos=0), "learning" (pos=1), "boosts" (pos=2), "efficiency" (pos=3)]</strong>. Дополнительную информацию об анализаторах см. в разделе <a href="/docs/ru/analyzer-overview.md">Обзор анализаторов</a>.</p></li>
<li><p><strong>Создание инвертированного индекса</strong>: Milvus создает инвертированный индекс, сопоставляя каждую лексему с документом(ами), в которых она встречается, и позициями лексем в этих документах.</p></li>
<li><p><strong>Сопоставление фраз</strong>: при выполнении фразового запроса Milvus ищет каждую лексему в инвертированном индексе и проверяет их позиции, чтобы определить, появляются ли они в правильном порядке и по соседству. Параметр <code translate="no">slop</code> управляет максимальным количеством позиций, допустимых между совпадающими лексемами:</p>
<ul>
<li><p><strong>slop = 0</strong> означает, что лексемы должны появляться <strong>в точном порядке и непосредственно рядом</strong> (т. е. без лишних слов между ними).</p>
<ul>
<li>В примере точно совпадает только <strong>doc_1</strong> (<strong>"машина"</strong> в <strong>позиции=0</strong>, <strong>"обучение"</strong> в <strong>позиции=1</strong>).</li>
</ul></li>
<li><p><strong>slop = 2</strong> допускает до двух позиций гибкости или перестановок между совпадающими лексемами.</p>
<ul>
<li><p>Это позволяет использовать обратный порядок (<strong>"обучающая машина")</strong> или небольшой промежуток между лексемами.</p></li>
<li><p>Следовательно, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>"обучение"</strong> при <strong>pos=0</strong>, <strong>"машина"</strong> при <strong>pos=1</strong>) и <strong>doc_3</strong> (<strong>"обучение"</strong> при <strong>pos=1</strong>, <strong>"машина"</strong> при <strong>pos=2</strong>) совпадают.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Включение фразового соответствия<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Фразовое соответствие работает с типом поля <code translate="no">VARCHAR</code>, строковым типом данных в Milvus. Чтобы включить согласование фраз, настройте схему коллекции, установив для параметров <code translate="no">enable_analyzer</code> и <code translate="no">enable_match</code> значение <code translate="no">True</code>, аналогичное параметру <a href="/docs/ru/keyword-match.md">text match</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Установите <code translate="no">enable_analyzer</code> и <code translate="no">enable_match</code></h3><p>Чтобы включить согласование фраз для определенного поля <code translate="no">VARCHAR</code>, при определении схемы поля установите оба параметра <code translate="no">enable_analyzer</code> и <code translate="no">enable_match</code> в значение <code translate="no">True</code>. Эта конфигурация указывает Milvus на токенизацию текста и создание инвертированного индекса с позиционной информацией, необходимой для эффективного сопоставления фраз.</p>
<p>Вот пример определения схемы для включения функции поиска фраз:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Необязательно: Настроить анализатор</h3><p>Точность сопоставления фраз существенно зависит от анализатора, используемого для токенизации текстовых данных. Разные анализаторы подходят для разных языков и форматов текста, что влияет на точность токенизации и позиционирования. Выбор подходящего анализатора для конкретного случая использования позволит оптимизировать результаты сопоставления фраз.</p>
<p>По умолчанию в Milvus используется стандартный анализатор, который выполняет токенизацию текста с учетом пробелов и пунктуации, удаляет лексемы длиной более 40 символов и преобразует текст в строчные буквы. При использовании по умолчанию никаких дополнительных параметров не требуется. Подробнее см. в разделе <a href="/docs/ru/standard-analyzer.md">Стандартный анализатор</a>.</p>
<p>Если вашему приложению требуется определенный анализатор, настройте его с помощью параметра <code translate="no">analyzer_params</code>. Например, здесь показано, как настроить анализатор <code translate="no">english</code> для поиска фраз в английском тексте:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus поддерживает несколько анализаторов, предназначенных для различных языков и случаев использования. Подробную информацию см. в разделе <a href="/docs/ru/analyzer-overview.md">Обзор анализаторов</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Использование совпадения фраз<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>После того, как вы включили функцию совпадения для поля <code translate="no">VARCHAR</code> в схеме коллекции, вы можете выполнять совпадение фраз с помощью выражения <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>Выражение <code translate="no">PHRASE_MATCH</code> не зависит от регистра. Вы можете использовать либо <code translate="no">PHRASE_MATCH</code>, либо <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Синтаксис выражения PHRASE_MATCH</h3><p>Используйте выражение <code translate="no">PHRASE_MATCH</code>, чтобы указать поле, фразу и необязательную гибкость (<code translate="no">slop</code>) при поиске. Синтаксис следующий:</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> Имя поля <code translate="no">VARCHAR</code>, по которому выполняется фразовое соответствие.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> Точная фраза для поиска.</p></li>
<li><p><code translate="no">slop</code> (необязательно)<strong>:</strong> Целое число, определяющее максимальное количество позиций, допустимых в совпадающих лексемах.</p>
<ul>
<li><p><code translate="no">0</code> (по умолчанию): Искать только точные фразы. Пример: Фильтр для <strong>"machine learning"</strong> будет точно соответствовать <strong>"machine learning"</strong>, но не <strong>"machine boosts learning"</strong> или <strong>"learning machine".</strong></p></li>
<li><p><code translate="no">1</code>: Позволяет незначительные вариации, например один дополнительный термин или небольшое смещение позиции. Пример: Фильтр для <strong>"machine learning"</strong> будет соответствовать <strong>"machine boosts learning"</strong> (одна лексема между <strong>"machine"</strong> и <strong>"learning")</strong>, но не <strong>"learning machine"</strong> (термины поменяны местами).</p></li>
<li><p><code translate="no">2</code>: Обеспечивает большую гибкость, включая обратный порядок терминов или до двух лексем между ними. Пример: Фильтр для <strong>"машинного обучения"</strong> будет соответствовать <strong>"обучающей машине"</strong> (термины перевернуты) или <strong>"машина быстро ускоряет обучение"</strong> (две лексемы между <strong>"машиной"</strong> и <strong>"обучением")</strong>.</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Пример набора данных</h3><p>Предположим, у вас есть коллекция <strong>tech_articles</strong>, содержащая следующие пять сущностей:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Машинное обучение повышает эффективность анализа крупномасштабных данных".</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Обучение машинному подходу жизненно важно для современного прогресса ИИ"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Архитектуры машин глубокого обучения оптимизируют вычислительную нагрузку"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"Машина быстро улучшает производительность модели для непрерывного обучения"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Изучение передовых машинных алгоритмов расширяет возможности ИИ".</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Запрос с фразовым соответствием</h3><p>При использовании метода <code translate="no">query()</code> <strong>PHRASE_MATCH</strong> действует как скалярный фильтр. Возвращаются только документы, содержащие указанную фразу (с учетом допустимого slop).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Пример: slop = 0 (точное совпадение)</h4><p>В этом примере возвращаются документы, содержащие точную фразу <strong>"машинное обучение"</strong> без лишних лексем между ними.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ожидаемые результаты совпадения:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Машинное обучение повышает эффективность анализа крупномасштабных данных".</p></td>
   </tr>
</table>
<p>Только документ 1 содержит точную фразу <strong>"машинное обучение"</strong> в указанном порядке без дополнительных лексем.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Поиск с использованием фразового соответствия</h3><p>В операциях поиска <strong>PHRASE_MATCH</strong> используется для фильтрации документов перед применением ранжирования по векторному сходству. Этот двухэтапный подход сначала сужает набор кандидатов путем текстового соответствия, а затем переранжирует их на основе векторных вкраплений.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Пример: slop = 1</h4><p>Здесь мы допускаем значение slop = 1. Фильтр применяется к документам, содержащим фразу <strong>"обучающая машина"</strong>, с небольшой гибкостью.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Результаты поиска:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Обучение машинному подходу жизненно важно для современного прогресса ИИ"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Архитектуры машин глубокого обучения оптимизируют вычислительную нагрузку"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Изучение передовых машинных алгоритмов расширяет возможности ИИ"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Пример: slop = 2</h4><p>В этом примере допускается slop = 2, что означает, что между словами <strong>"машина"</strong> и <strong>"обучение"</strong> допускается до двух дополнительных лексем (или обратных терминов) <strong>.</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Результаты поиска:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Машинное обучение повышает эффективность анализа крупномасштабных данных"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Архитектуры машин глубокого обучения оптимизируют вычислительные нагрузки"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Пример: slop = 3</h4><p>В этом примере значение slop = 3 обеспечивает еще большую гибкость. Фильтр ищет <strong>"машинное обучение"</strong>, при этом между словами допускается не более трех позиций токенов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Результаты поиска:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Машинное обучение повышает эффективность анализа крупномасштабных данных".</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Обучение машинному подходу жизненно важно для современного прогресса ИИ"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Архитектуры машин глубокого обучения оптимизируют вычислительные нагрузки"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Изучение передовых машинных алгоритмов расширяет возможности ИИ"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Соображения<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Включение функции сопоставления фраз для поля приводит к созданию инвертированного индекса, который потребляет ресурсы хранения. При решении включить эту функцию учитывайте влияние на хранилище, поскольку оно зависит от размера текста, количества уникальных лексем и используемого анализатора.</p></li>
<li><p>После определения анализатора в схеме его настройки становятся постоянными для данной коллекции. Если вы решите, что другой анализатор будет лучше соответствовать вашим потребностям, вы можете удалить существующую коллекцию и создать новую с нужной конфигурацией анализатора.</p></li>
<li><p>Производительность поиска фраз зависит от способа токенизации текста. Прежде чем применять анализатор ко всей коллекции, используйте метод <code translate="no">run_analyzer</code> для просмотра результатов токенизации. Дополнительные сведения см. в разделе <a href="/docs/ru/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Обзор анализатора</a>.</p></li>
<li><p>Правила экранирования в выражениях <code translate="no">filter</code>:</p>
<ul>
<li><p>Символы, заключенные в двойные или одинарные кавычки в выражениях, интерпретируются как строковые константы. Если строковая константа включает в себя управляющие символы, они должны быть представлены с помощью управляющей последовательности. Например, используйте <code translate="no">\\</code> для обозначения <code translate="no">\</code>, <code translate="no">\\t</code> для обозначения табуляции <code translate="no">\t</code>, и <code translate="no">\\n</code> для обозначения новой строки.</p></li>
<li><p>Если строковая константа заключена в одинарные кавычки, то одинарная кавычка внутри константы должна быть представлена как <code translate="no">\\'</code>, а двойная кавычка может быть представлена как <code translate="no">&quot;</code> или <code translate="no">\\&quot;</code>. Пример: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Если строковая константа заключена в двойные кавычки, то двойная кавычка внутри константы должна быть представлена как <code translate="no">\\&quot;</code>, а одинарная кавычка может быть представлена как <code translate="no">'</code> или <code translate="no">\\'</code>. Пример: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
