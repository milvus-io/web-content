---
id: performance_faq.md
summary: >-
  Здесь вы найдете ответы на часто задаваемые вопросы о производительности
  поиска, способах повышения производительности и других вопросах, связанных с
  производительностью.
title: Часто задаваемые вопросы о производительности
---
<h1 id="Performance-FAQ" class="common-anchor-header">Часто задаваемые вопросы о производительности<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Как настроить параметры <code translate="no">nlist</code> и <code translate="no">nprobe</code> для индексов IVF?</h4><p>Настройка параметра <code translate="no">nlist</code> зависит от конкретного сценария. Как правило, рекомендуемое значение параметра <code translate="no">nlist</code> составляет <code translate="no">4 × sqrt(n)</code>, где <code translate="no">n</code> — общее количество сущностей в сегменте.</p>
<p>Размер каждого сегмента определяется параметром ` <code translate="no">datacoord.segment.maxSize</code> `, который по умолчанию установлен на 1024 МБ. Общее количество сущностей в сегменте n можно оценить, разделив значение ` <code translate="no">datacoord.segment.maxSize</code> ` на размер каждой сущности.</p>
<p>Настройка параметра <code translate="no">nprobe</code> зависит от конкретного набора данных и сценария и предполагает поиск компромисса между точностью и производительностью запросов. Мы рекомендуем определять оптимальное значение путем многократных экспериментов.</p>
<p>Приведенные ниже диаграммы представляют результаты теста, выполненного на наборе данных sift50m и индексе IVF_SQ8, в котором сравниваются показатели полноты (recall) и производительности запросов для различных пар значений <code translate="no">nlist</code> и<code translate="no">nprobe</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>Тест точности</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   Тест производительности</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Почему запросы иногда выполняются дольше на небольших наборах данных?</h4><p>Операции запроса выполняются над сегментами. Индексы сокращают время, необходимое для запроса по сегменту. Если сегмент не проиндексирован, Milvus прибегает к перебору всех вариантов в исходных данных, что резко увеличивает время выполнения запроса.</p>
<p>Поэтому запросы по небольшому набору данных (коллекции) обычно выполняются дольше, так как для него ещё не построен индекс. Это связано с тем, что размеры его сегментов не достигли порога построения индекса, заданного параметром ` <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>`. Вызовите команду ` <code translate="no">create_index()</code> `, чтобы заставить Milvus проиндексировать сегменты, которые достигли этого порога, но ещё не были проиндексированы автоматически, что значительно повысит производительность запросов.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Какие факторы влияют на загрузку ЦП?</h4><p>Загрузка ЦП увеличивается, когда Milvus создаёт индексы или выполняет запросы. Как правило, создание индексов требует интенсивного использования ЦП, за исключением случаев использования Annoy, который работает в одном потоке.</p>
<p>При выполнении запросов на загрузку ЦП влияют параметры <code translate="no">nq</code> и <code translate="no">nprobe</code>. Если значения <code translate="no">nq</code> и <code translate="no">nprobe</code> невелики, степень параллелизма низкая, и загрузка ЦП остается низкой.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">Влияет ли одновременная вставка данных и поиск на производительность запросов?</h4><p>Операции вставки не являются ресурсоемкими для ЦП. Однако, поскольку новые сегменты могут ещё не достичь порога для построения индекса, Milvus прибегает к поиску методом перебора, что существенно сказывается на производительности запросов.</p>
<p>Параметр <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> определяет пороговое значение для построения индекса для сегмента и по умолчанию установлен на 1024 строки. Дополнительную информацию см. в разделе <a href="/docs/ru/system_configuration.md">«Конфигурация системы</a> ».</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">Может ли индексирование поля VARCHAR повысить скорость удаления?</h4><p>Индексирование поля VARCHAR может ускорить операции «Delete By Expression», но только при определенных условиях:</p>
<ul>
<li><strong>INVERTED Index</strong>: этот индекс помогает при выполнении выражений типа « <code translate="no">IN</code> » или « <code translate="no">==</code> » по полям VARCHAR, не являющимся первичным ключом.</li>
<li><strong>Индекс Trie</strong>: этот индекс помогает при выполнении запросов с префиксом (например, <code translate="no">LIKE prefix%</code>) по полям типа VARCHAR, не являющимся первичным ключом.</li>
</ul>
<p>Однако индексирование поля VARCHAR не ускоряет:</p>
<ul>
<li><strong>удаления по идентификаторам</strong>: когда поле VARCHAR является первичным ключом;</li>
<li><strong>Несвязанные выражения</strong>: когда поле VARCHAR не входит в выражение удаления.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Остались вопросы?</h4><p>Вы можете:</p>
<ul>
<li>Познакомиться с <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> на GitHub. Не стесняйтесь задавать вопросы, делиться идеями и помогать другим.</li>
<li>Присоединяйтесь к нашему <a href="https://discord.com/invite/8uyFbECzPX">каналу в Discord</a>, чтобы получить поддержку и пообщаться с нашим сообществом разработчиков открытого программного обеспечения.</li>
</ul>
