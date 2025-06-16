---
id: performance_faq.md
summary: >-
  Найдите ответы на часто задаваемые вопросы о производительности поиска,
  улучшении производительности и других проблемах, связанных с
  производительностью.
title: FAQ по производительности
---
<h1 id="Performance-FAQ" class="common-anchor-header">FAQ по производительности<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Как установить <code translate="no">nlist</code> и <code translate="no">nprobe</code> для индексов ЭКО?</h4><p>Настройка <code translate="no">nlist</code> зависит от конкретного сценария. Как правило, рекомендуемое значение <code translate="no">nlist</code> равно <code translate="no">4 × sqrt(n)</code>, где <code translate="no">n</code> - общее количество сущностей в сегменте.</p>
<p>Размер каждого сегмента определяется параметром <code translate="no">datacoord.segment.maxSize</code>, который по умолчанию установлен на 512 МБ. Общее количество сущностей в сегменте n можно определить, разделив <code translate="no">datacoord.segment.maxSize</code> на размер каждой сущности.</p>
<p>Настройка параметра <code translate="no">nprobe</code> зависит от набора данных и сценария и предполагает компромисс между точностью и производительностью запроса. Мы рекомендуем найти идеальное значение путем многократных экспериментов.</p>
<p>На следующих диаграммах представлены результаты теста, проведенного на наборе данных sift50m и индексе IVF_SQ8, в котором сравниваются показатели запоминания и производительности запросов для различных пар <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>Тест на точность</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>Тест на производительность</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Почему на небольших наборах данных запросы иногда выполняются дольше?</h4><p>Операции запроса выполняются на сегментах. Индексы сокращают время, необходимое для запроса сегмента. Если сегмент не проиндексирован, Milvus прибегает к грубому поиску по исходным данным, что резко увеличивает время запроса.</p>
<p>Таким образом, запрос к небольшому набору данных (коллекции) обычно занимает больше времени, поскольку индекс не был создан. Это происходит потому, что размеры ее сегментов не достигли порога построения индекса, установленного на <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Вызовите <code translate="no">create_index()</code>, чтобы заставить Milvus индексировать сегменты, которые достигли порога, но еще не были автоматически проиндексированы, что значительно повысит производительность запросов.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Какие факторы влияют на использование процессора?</h4><p>Использование ЦП увеличивается, когда Milvus строит индексы или выполняет запросы. В целом построение индексов требует больших затрат ЦП, за исключением использования Annoy, который работает в один поток.</p>
<p>При выполнении запросов на использование ЦП влияют <code translate="no">nq</code> и <code translate="no">nprobe</code>. Когда <code translate="no">nq</code> и <code translate="no">nprobe</code> невелики, параллелизм незначителен и загрузка процессора остается низкой.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">Влияет ли одновременная вставка данных и поиск на производительность запросов?</h4><p>Операции вставки не требуют больших затрат ЦП. Однако, поскольку новые сегменты могут не достигнуть порога для построения индекса, Milvus прибегает к поиску методом грубой силы, что значительно влияет на производительность запроса.</p>
<p>Параметр <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> определяет порог построения индекса для сегмента и по умолчанию установлен на 1024 строки. Дополнительные сведения см. в разделе <a href="/docs/ru/system_configuration.md">Конфигурация системы</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">Может ли индексирование поля VARCHAR повысить скорость удаления?</h4><p>Индексирование поля VARCHAR может ускорить операции "Удаление по выражению", но только при определенных условиях:</p>
<ul>
<li><strong>ИНВЕРТИРОВАННЫЙ индекс</strong>: Этот индекс помогает при использовании <code translate="no">IN</code> или <code translate="no">==</code> выражений для полей VARCHAR, не являющихся первичными ключами.</li>
<li><strong>Тройной индекс</strong>: Этот индекс помогает при префиксных запросах (например, <code translate="no">LIKE prefix%</code>) на непервичных полях VARCHAR.</li>
</ul>
<p>Однако индексирование поля VARCHAR не ускоряет работу:</p>
<ul>
<li><strong>Удаление по идентификаторам</strong>: Когда поле VARCHAR является первичным ключом.</li>
<li><strong>Несвязанные выражения</strong>: Когда поле VARCHAR не является частью выражения удаления.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">У вас остались вопросы?</h4><p>Вы можете:</p>
<ul>
<li>Проверить <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> на GitHub. Не стесняйтесь задавать вопросы, делиться идеями и помогать другим.</li>
<li>Присоединяйтесь к нашему <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">каналу Slack</a>, чтобы найти поддержку и взаимодействовать с нашим сообществом разработчиков с открытым исходным кодом.</li>
</ul>
