---
id: choose-an-embeddinglist-search-strategy.md
title: Выберите стратегию поиска EmbeddingList
summary: >-
  Стратегии поиска EmbeddingList определяют, как Milvus строит приближенный
  индекс кандидатов для поиска по списку вложений. Стратегией по умолчанию
  является tokenann. Можно переключиться на muvera или lemur, если список
  вложений большой, TokenANN слишком ресурсоемкий или если обученное/сжатое
  представление на уровне строк подходит лучше. Окончательный результат
  по-прежнему формируется с помощью переранжирования MaxSim, если включена опция
  `emb_list_rerank`.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">Выберите стратегию поиска EmbeddingList<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>Стратегии поиска EmbeddingList определяют, как Milvus строит приближенный индекс кандидатов для поиска EmbeddingList. Стратегией по умолчанию является « <code translate="no">tokenann</code> ». Вы можете переключиться на « <code translate="no">muvera</code> » или « <code translate="no">lemur</code> », если список вложений большой, TokenANN слишком ресурсоемкий или лучше подходит обученное/сжатое представление на уровне строк. Окончательный результат по-прежнему формируется в ходе переранжирования MaxSim, если включена опция « <code translate="no">emb_list_rerank</code> ».</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">Зачем нужны стратегии поиска<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>Список вложений (EmbeddingList) предназначен для строк, содержащих несколько векторов, таких как вложения токенов в текстовом документе, вложения фрагментов в визуальном документе или вложения клипов в видео. Вместо сравнения одного вектора запроса с одним вектором строки MaxSim сравнивает список вложений запроса со списком вложений документа и объединяет лучшие совпадения.</p>
<p>Это обеспечивает более высокую выразительную способность, но точный MaxSim при больших масштабах является ресурсоемким. Поиск MaxSim методом перебора потребует сравнения векторов запроса с каждым вектором в каждой строке-кандидате. Обычно это слишком медленно для поиска в производственной среде.</p>
<table>
<thead>
<tr><th>### Проблема - Каждая строка может содержать множество векторов. - Точный поиск по MaxSim по всем строкам является ресурсоемким. - Размер индекса и задержка поиска могут быстро расти.</th><th>### Стратегия — Использовать метод приблизительного поиска на первом этапе. — Извлечь больше кандидатов, чем запрашиваемые topK. — Переранжировать кандидатов с помощью точного MaxSim.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>В этом смысле « <code translate="no">emb_list_strategy</code> » — это в основном стратегия построения индекса и извлечения кандидатов. Она настраивается при построении индекса и определяет, как формируется набор кандидатов ANN на первом этапе. Параметры, задаваемые во время поиска, такие как « <code translate="no">retrieval_ann_ratio</code> » и « <code translate="no">emb_list_rerank</code> », затем контролируют, сколько кандидатов будет извлечено и применяется ли переранжирование с помощью MaxSim.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">Доступные стратегии<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Стратегия</th><th>Блок извлечения кандидатов</th><th>Задача</th><th>«Best fit»</th><th>Основной компромисс</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>Отдельные векторы внутри каждой строки</td><td>Сохраняет исходные векторы и позволяет избежать потерь при сжатии.</td><td>Поиск с приоритетом качества, короткие или средние списки вложений, вложения с высокой дискриминационной способностью.</td><td>Более крупный индекс и более высокие затраты на поиск кандидатов.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>Один закодированный вектор на строку</td><td>Сжимает список вложений в представление FDE фиксированной размерности без обучения.</td><td>Более длинные документы, вложения с высокой дискриминацией, случаи, когда TokenANN слишком ресурсоемкий.</td><td>Случайная проекция приводит к потере точности аппроксимации; размерность FDE влияет на задержку.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>Один обученный вектор на строку</td><td>Обучается специфическому для корпуса сжатию списков вложений до векторов строк фиксированной размерности.</td><td>Встраивания с низкой дискриминацией, мультимодальный поиск или поиск визуальных документов, большие списки встраиваний.</td><td>Требует обучения и может быть чувствителен к распределению корпуса и смещению, связанному с длиной документов.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> индексирует каждый вектор в списке вложений. Во время поиска каждый вектор запроса выполняет поиск с помощью ANN, совпадающие векторы агрегируются обратно в свои строки, а полученные кандидаты-строки переранжируются с помощью MaxSim.</p>
<div class="alert note">
<p><strong>Используйте TokenANN, когда качество является главным приоритетом.</strong> Это наиболее близкое приближение к исходному вычислению MaxSim, поскольку в индексе первого этапа сохраняются все векторы.</p>
</div>
<ul>
<li><p><strong>Хорошо подходит для:</strong> коротких фрагментов текста, строк с небольшим или умеренным количеством векторов, сильного семантического разделения на уровне токенов, базовых моделей, чувствительных к качеству.</p></li>
<li><p><strong>Менее подходит:</strong> очень длинные документы, визуальные страницы с тысячами векторов фрагментов, строгие ограничения по памяти или задержке.</p></li>
<li><p><strong>Поведение на уровне элементов:</strong> TokenANN может извлекать кандидаты из отдельных векторов перед их агрегированием обратно в строки. Окончательный результат поиска в EmbeddingList по-прежнему находится на уровне строк после оценки по алгоритму MaxSim.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> кодирует каждый список вложений в вектор фиксированной размерности с помощью случайных проекций. Это превращает поиск на первом этапе в стандартный поиск векторов на уровне строк. Затем кандидаты переранжируются с помощью MaxSim.</p>
<div class="alert note">
<p><strong>Используйте MUVERA, когда TokenANN слишком ресурсоемкий, но вы не хотите проходить этап обучения.</strong> Это практичный компромисс между качеством и затратами.</p>
</div>
<ul>
<li><p><strong>Подходит для:</strong> длинных текстовых документов, пространств вложений с высокой дискриминацией, рабочих нагрузок, требующих меньшего размера индекса, чем у TokenANN.</p></li>
<li><p><strong>Менее подходит:</strong> пространства вложений с низкой дискриминацией или случаи, когда представление FDE становится слишком многомерным для допустимого бюджета задержки.</p></li>
<li><p><strong>Важные параметры:</strong><code translate="no">muvera_num_projections</code>, <code translate="no">muvera_num_repeats</code> и <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> обучает модель сжимать каждый список вложений в представление фиксированной размерности. Поиск ANN на первом этапе выполняется на обученных векторах на уровне строк, а кандидаты переранжируются с помощью MaxSim.</p>
<div class="alert note">
<p><strong>Используйте LEMUR, когда затраты на обучение оправдываются результатами обученного сжатия.</strong> Он может хорошо работать в пространствах вложений с низкой дискриминацией и при мультимодальном поиске, но его следует проверить на целевом корпусе, поскольку он может быть чувствителен к распределению длины документов.</p>
</div>
<ul>
<li><p><strong>Подходит для:</strong> поиска визуальных документов, мультимодальных вложений фрагментов, пространств вложений с низкой дискриминацией, больших списков вложений, где использование TokenANN нецелесообразно.</p></li>
<li><p><strong>Менее подходит:</strong> часто меняющиеся корпуса, вложения с высокой дискриминацией и сильно асимметричным распределением длин документов, рабочие нагрузки, при которых затраты на обучение неприемлемы.</p></li>
<li><p><strong>Важные параметры:</strong><code translate="no">lemur_hidden_dim</code>, <code translate="no">lemur_num_train_samples</code>, <code translate="no">lemur_num_epochs</code>, <code translate="no">lemur_batch_size</code>, <code translate="no">lemur_learning_rate</code>, <code translate="no">lemur_seed</code> и <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">Поведение и настройки по умолчанию<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Стратегией EmbeddingList по умолчанию в Knowhere является <code translate="no">tokenann</code>. Если вы не укажете <code translate="no">emb_list_strategy</code>, Knowhere будет использовать TokenANN. Значения по умолчанию для поиска включают <code translate="no">retrieval_ann_ratio=3.0</code> и <code translate="no">emb_list_rerank=true</code>.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">Элементы настройки по стратегиям<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей таблице перечислены элементы конфигурации, специфичные для каждой стратегии. В Milvus элементы, задаваемые на этапе сборки, обычно передаются в карте <code translate="no">params</code> при создании индекса. Если вам нужны значения по умолчанию на стороне сервера, их следует определить в конфигурационном файле Milvus в разделе <code translate="no">knowhere</code>.</p>
<table>
<thead>
<tr><th>Стратегия</th><th>Элемент конфигурации</th><th>Этап</th><th>По умолчанию</th><th>Когда следует изменять</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>Построение индекса</td><td><code translate="no">tokenann</code></td><td>Используйте явно, если требуется поведение индексирования вектора элементов по умолчанию или при использовании DiskANN.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>Построение индекса</td><td><code translate="no">tokenann</code></td><td>Используйте, если требуется поиск с кодировкой на уровне строк без обучения.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>Построение индекса</td><td><code translate="no">4</code></td><td>Регулирует количество проекций SimHash. Более высокие значения создают больше корзин и могут улучшить качество кодирования, но увеличивают размерность кодированного пространства.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>Построение индекса</td><td><code translate="no">7</code></td><td>Регулирует количество объединяемых независимых кодировок FDE. Более высокие значения могут повысить отказоустойчивость, но увеличат затраты на индексирование и поиск.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>Создание индекса</td><td><code translate="no">42</code></td><td>Устанавливается для получения воспроизводимых случайных проекций, особенно при тестировании и сравнительных тестах производительности.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>Построение индекса</td><td><code translate="no">tokenann</code></td><td>Используйте, если ожидается, что обученное сжатие на уровне строк будет работать лучше, чем фиксированная случайная проекция.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>Построение индекса</td><td><code translate="no">256</code></td><td>Регулирует размер сжатого представления. Увеличьте значение для увеличения емкости; уменьшите — для снижения потребления памяти и ускорения извлечения данных.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>Построение индекса</td><td><code translate="no">20000</code></td><td>Увеличивайте этот параметр, если корпус разнообразен, а обученная компрессия не обеспечивает полного покрытия; уменьшайте только для небольших тестов или более быстрого построения.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>Построение индекса</td><td><code translate="no">50</code></td><td>Увеличьте значение, если обучение не сходится; уменьшите, если время построения является основным ограничением.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>Построение индекса</td><td><code translate="no">512</code></td><td>Настройте с учетом пропускной способности обучения и использования памяти.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>Построение индекса</td><td><code translate="no">0.001</code></td><td>Регулируйте, если обучение нестабильно или сходится слишком медленно.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>Построение индекса</td><td><code translate="no">42</code></td><td>Установите для воспроизводимых циклов обучения.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>Построение индекса</td><td><code translate="no">2</code></td><td>Увеличивайте только в том случае, если корпусу требуется более выразительный экстрактор признаков и вы можете позволить себе дополнительные затраты на обучение.</td></tr>
<tr><td>Все стратегии</td><td><code translate="no">retrieval_ann_ratio</code></td><td>Поиск</td><td><code translate="no">3.0</code></td><td>Увеличивайте, чтобы извлечь больше кандидатов на первом этапе и повысить полноту; уменьшайте, чтобы сократить задержку.</td></tr>
<tr><td>Все стратегии</td><td><code translate="no">emb_list_rerank</code></td><td>Поиск</td><td><code translate="no">true</code></td><td>Оставьте включенной для переранжирования MaxSim. Отключайте только для контролируемых экспериментов, в которых качество ANN на первом этапе измеряется напрямую.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Настройка стратегии в Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>В Milvus стратегия передается в качестве параметра индекса при создании индекса для поля EmbeddingList, например для подполя вектора StructArray.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Для LEMUR укажите параметры обучения LEMUR в той же карте « <code translate="no">params</code> ».</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Настройка значений по умолчанию на стороне сервера в Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus также может заполнять параметры индекса из файла ` <code translate="no">milvus.yaml</code>`. Соответствующий раздел находится по адресу <code translate="no">knowhere</code>. Параметры организованы по типу индекса и этапу по шаблону <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>. Параметры индекса, указанные пользователем, имеют приоритет над этими значениями по умолчанию.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Для выбора стратегии предпочтительно использовать параметры на уровне отдельного индекса.</strong> Значения по умолчанию из конфигурационного файла Milvus применяются в общем случае ко всем индексам данного типа и этапа. Используйте параметры из <code translate="no">create_index</code>, когда для разных коллекций или полей требуются разные стратегии EmbeddingList.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">Настройка извлечения кандидатов во время поиска<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>Стратегия определяет, как строится индекс. Во время поиска используйте параметр <code translate="no">retrieval_ann_ratio</code>, чтобы контролировать, сколько кандидатов первого этапа извлекается перед переранжированием MaxSim. Более высокие значения обычно улучшают полноту поиска, но увеличивают задержку.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Параметр</th><th>Этап</th><th>По умолчанию</th><th>Значение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>Построение индекса</td><td><code translate="no">tokenann</code></td><td>Определяет способ индексирования и извлечения кандидатов из EmbeddingList.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>Поиск</td><td><code translate="no">3.0</code></td><td>Коэффициент расширения кандидатов для первого раунда ANN.</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>Поиск</td><td><code translate="no">true</code></td><td>Необходимо ли переранжировать найденные кандидаты с помощью MaxSim.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>Примечания по совместимости:</strong> MUVERA и LEMUR в настоящее время поддерживают данные fp32 в Knowhere. DiskANN поддерживает EmbeddingList только со стратегией TokenANN. Если вы используете типы векторов, отличные от fp32, или DiskANN, проверьте поддержку стратегии перед изменением значения по умолчанию.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">Как выбрать стратегию<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Универсально лучшей стратегии не существует. Выбирайте стратегию с учётом длины списка вложений, дискриминационной способности пространства вложений, допустимой задержки, размера индекса и возможности выполнить этап обучения.</p>
<table>
<thead>
<tr><th>Вопрос</th><th>Сигнал</th><th>Рекомендуемая отправная точка</th></tr>
</thead>
<tbody>
<tr><td>Вам нужна высококачественная базовая модель?</td><td>Вы хотите определить наилучшую практическую аппроксимацию перед оптимизацией затрат.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Количество элементов в строках небольшое или умеренное?</td><td>Каждая строка содержит небольшое количество векторов токенов, патчей или клипов.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>TokenANN слишком велик или работает слишком медленно?</td><td>Узким местом является размер индекса или задержка поиска на первом этапе.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Вам нужна компрессия без обучения?</td><td>Вам нужна более простая операционная модель и воспроизводимое кодирование.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Имеет ли пространство вложений низкую дискриминационную способность?</td><td>Кандидаты ANN на уровне токенов содержат много шума, а случайная проекция не сохраняет достаточно сигнала.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>Является ли рабочая нагрузка визуальной или мультимодальной?</td><td>Строки содержат множество векторов фрагментов, а TokenANN слишком ресурсоемка.</td><td><code translate="no">lemur</code> или <code translate="no">muvera</code></td></tr>
<tr><td>Имеет ли длина документов сильный асимметричный распредел?</td><td>Некоторые строки содержат гораздо больше векторов, чем другие.</td><td>Начните с <code translate="no">muvera</code>; тщательно проверьте <code translate="no">lemur</code>.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">Рекомендуемый рабочий процесс оценки<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Начните с <code translate="no">tokenann</code> в качестве базового показателя качества, если размер набора данных это позволяет.</p></li>
<li><p>Запустите те же запросы с <code translate="no">muvera</code> и сравните показатели recall, nDCG, задержку и размер индекса.</p></li>
<li><p>Попробуйте использовать <code translate="no">lemur</code>, если список вложений большой, пространство вложений содержит много шума или рабочая нагрузка является визуальной или мультимодальной.</p></li>
<li><p>Настройте параметр « <code translate="no">retrieval_ann_ratio</code> » перед тем, как изменять слишком много параметров, задаваемых на этапе сборки. Увеличьте его, если коэффициент воспроизведения низкий; уменьшите — если задержка слишком высокая.</p></li>
<li><p>Всегда проводите валидацию на репрезентативных запросах и распределениях длины документов. Стратегия, которая работает с короткими текстами, может не сработать с визуальными документами или корпусами с длинным хвостом.</p></li>
</ol>
<table>
<thead>
<tr><th>### «Качество прежде всего» Начните с параметра ` <code translate="no">tokenann</code>`. Используйте его в качестве базового значения для оценки качества аппроксимации MaxSim.</th><th>### Сбалансированный подход Попробуйте <code translate="no">muvera</code>, если вам требуется снизить затраты без добавления конвейера обучения.</th><th>### Сжатие. Попробуйте <code translate="no">lemur</code>, если обученное сжатие на уровне строк, вероятно, превзойдет фиксированную случайную проекцию.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">Источники, использованные в данном проекте<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p>Тесты Milvus для <code translate="no">emb_list_strategy</code>, <code translate="no">retrieval_ann_ratio</code> и <code translate="no">emb_list_rerank</code>.</p></li>
<li><p>Обработка конфигурационных файлов Milvus для значений по умолчанию серверных индексов в разделе « <code translate="no">knowhere</code> ».</p></li>
<li><p>Определения параметров Knowhere для значений по умолчанию и поддерживаемых имен стратегий.</p></li>
<li><p>Проверки совместимости Knowhere для поддержки только fp32 в MUVERA/LEMUR и только TokenANN в DiskANN.</p></li>
<li><p>Внутренние заметки по оценке, сравнивающие TokenANN, MUVERA и LEMUR для поиска кандидатов в MaxSim.</p></li>
</ul>
<div class="alert note">
<p><strong>Примечание по публикации:</strong> перед внешней публикацией убедитесь, какие параметры официально поддерживаются в целевом выпуске Milvus и планирует ли продукт раскрывать все низкоуровневые параметры Knowhere или только более небольшое документированное подмножество.</p>
</div>
