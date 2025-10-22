---
id: bitmap.md
title: BITMAP
summary: >-
  Битовая индексация - это эффективная техника индексирования, разработанная для
  повышения производительности запросов к скалярным полям с низкой
  кардинальностью. Под кардинальностью понимается количество отдельных значений
  в поле. Поля с меньшим количеством отдельных элементов считаются
  низкокардинальными.
---
<h1 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h1><p>Битовая карта - это эффективная техника индексирования, разработанная для повышения производительности запросов к скалярным полям с низкой кардинальностью. Под кардинальностью понимается количество отдельных значений в поле. Поля с меньшим количеством отдельных элементов считаются низкокардинальными.</p>
<p>Этот тип индекса помогает сократить время поиска скалярных запросов, представляя значения полей в компактном двоичном формате и выполняя над ними эффективные побитовые операции. По сравнению с другими типами индексов, растровые индексы обычно занимают больше места и обеспечивают более высокую скорость выполнения запросов при работе с полями с низкой кардинальностью.</p>
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
    </button></h2><p>Термин <strong>Bitmap</strong> объединяет два слова: <strong>Бит</strong> и <strong>Карта</strong>. Бит представляет собой наименьшую единицу данных в компьютере, которая может содержать только значение <strong>0</strong> или <strong>1</strong>. Карта, в данном контексте, означает процесс преобразования и организации данных в соответствии с тем, какое значение должно быть присвоено 0 и 1.</p>
<p>Растровый индекс состоит из двух основных компонентов: растровых изображений и ключей. Ключи представляют собой уникальные значения в индексируемом поле. Для каждого уникального значения существует соответствующее битовое изображение. Длина этих битовых карт равна количеству записей в коллекции. Каждый бит в битовой карте соответствует одной записи в коллекции. Если значение индексируемого поля в записи совпадает с ключом, то соответствующий бит устанавливается в <strong>1</strong>, в противном случае - в <strong>0</strong>.</p>
<p>Рассмотрим коллекцию документов с полями <strong>Category</strong> и <strong>Public</strong>. Мы хотим получить документы, которые относятся к категории <strong>Tech</strong> и открыты для <strong>публики</strong>. В этом случае ключами для наших растровых индексов будут <strong>Tech</strong> и <strong>Public</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitmap.png" alt="Bitmap" class="doc-image" id="bitmap" />
   </span> <span class="img-wrapper"> <span>Растровый индекс</span> </span></p>
<p>Как показано на рисунке, растровые индексы для <strong>категорий Category</strong> и <strong>Public</strong> будут следующими:</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], что показывает, что только 1-й и 3-й документы попадают в категорию <strong>Tech</strong>.</p></li>
<li><p><strong>Public</strong>: [1, 0, 0, 1, 0], что показывает, что только 1-й и 4-й документы открыты для <strong>публики</strong>.</p></li>
</ul>
<p>Чтобы найти документы, соответствующие обоим критериям, мы выполняем побитовую операцию AND на этих двух битовых картах:</p>
<ul>
<li><strong>Tech</strong> AND <strong>Public</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>Полученное битовое изображение [1, 0, 0, 0, 0] указывает на то, что только первый документ<strong>(ID</strong> <strong>1</strong>) удовлетворяет обоим критериям. Используя растровые индексы и эффективные побитовые операции, мы можем быстро сузить область поиска, избавившись от необходимости сканировать весь набор данных.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Создание растрового индекса<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы создать растровый индекс в Milvus, используйте метод <code translate="no">create_index()</code> и установите параметр <code translate="no">index_type</code> в значение <code translate="no">&quot;BITMAP&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В этом примере мы создаем растровый индекс по полю <code translate="no">category</code> коллекции <code translate="no">my_collection</code>. Метод <code translate="no">add_index()</code> используется для указания имени поля, типа индекса и имени индекса.</p>
<p>После создания растрового индекса можно использовать параметр <code translate="no">filter</code> в операциях запроса для выполнения скалярной фильтрации на основе проиндексированного поля. Это позволяет эффективно сузить результаты поиска с помощью растрового индекса. Дополнительные сведения см. в разделе <a href="/docs/ru/boolean.md">Объяснение фильтрации</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Удаление индекса<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте метод <code translate="no">drop_index()</code>, чтобы удалить существующий индекс из коллекции.</p>
<div class="alert note">
<ul>
<li><p>В <strong>версии 2.6.3</strong> и более ранних вы должны освободить коллекцию перед удалением скалярного индекса.</p></li>
<li><p>В <strong>v2.6.4</strong> и более поздних версиях скалярные индексы можно удалять напрямую, как только в них отпадет необходимость - не нужно сначала освобождать коллекцию.</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
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
<li><p>Растровые индексы поддерживаются только для скалярных полей, которые не являются первичными ключами.</p></li>
<li><p>Тип данных поля должен быть одним из следующих:</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (элементы должны быть одним из следующих: <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>Растровые индексы не поддерживают следующие типы данных:</p>
<ul>
<li><p><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>: Типы с плавающей точкой не совместимы с двоичной природой растровых индексов.</p></li>
<li><p><code translate="no">JSON</code>: Типы данных JSON имеют сложную структуру, которая не может быть эффективно представлена с помощью растровых индексов.</p></li>
</ul></li>
<li><p>Растровые индексы не подходят для полей с высокой кардинальностью (т. е. для полей с большим количеством различных значений).</p>
<ul>
<li><p>Как правило, растровые индексы наиболее эффективны, когда кардинальность поля не превышает 500.</p></li>
<li><p>При увеличении кардинальности сверх этого порога преимущества растровых индексов в плане производительности снижаются, а накладные расходы на хранение становятся значительными.</p></li>
<li><p>Для полей с высокой кардинальностью следует рассмотреть возможность использования альтернативных методов индексирования, например инвертированных индексов, в зависимости от конкретного случая использования и требований к запросам.</p></li>
</ul></li>
</ul>
