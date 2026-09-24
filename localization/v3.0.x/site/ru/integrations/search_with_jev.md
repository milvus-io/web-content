---
id: search_with_jev.md
summary: >-
  Векторный поиск позволяет находить информацию, связанную с запросом. Создание
  полезного поискового приложения также предполагает принятие решений: какие
  фрагменты текста действительно дают ответ на вопрос, можно ли повторно
  использовать предыдущий ответ и достаточно ли у агента доказательств, чтобы
  прекратить поиск.
title: Создание RAG с помощью Milvus и PII Masker
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Поиск с помощью Jev и Milvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Векторный поиск находит информацию, связанную с запросом. Создание полезного поискового приложения также предполагает принятие решений: какие фрагменты текста действительно отвечают на вопрос, можно ли повторно использовать предыдущий ответ и достаточно ли у агента доказательств, чтобы прекратить поиск.</p>
<p>Milvus и Jev отвечают за разные части этого рабочего процесса. <a href="https://milvus.io/">Milvus</a> хранит вложения и извлекает записи-кандидаты, используя фильтры метаданных для таких ограничений, как версия продукта или область действия базы знаний. <a href="https://docs.typesafe.ai/introduction">Jev</a> оценивает значение извлеченного текста в сравнении с инструкциями. Ваше приложение может использовать его оценки для выбора доказательств или управления следующим этапом поиска.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Что делает Jev?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Запрос к Jev содержит контекст и один или несколько вопросов для оценки. Его <a href="https://docs.typesafe.ai/primitives">типизированные результаты</a> включают выбор из фиксированных вариантов, упорядоченную оценку и вероятность «да/нет». Эти результаты позволяют коду приложения принимать решение без анализа объяснений в свободной форме. При необходимости модель генерации по-прежнему может составить ответ или следующий поисковый запрос.</p>
<p>Например, пользователь спрашивает, как установить Atlas v2. Milvus может ограничить поиск документацией по версии v2 и вернуть похожие фрагменты, касающиеся установки, обновлений и устранения неполадок. Затем Jev оценивает, какие фрагменты объясняют начальную настройку. Приложение передает выбранные доказательства модели, генерирующей ответ.</p>
<p>Распределение обязанностей прост:</p>
<ol>
<li><strong>Поиск с помощью Milvus:</strong> нахождение кандидатов в рамках требуемых ограничений метаданных.</li>
<li><strong>Оценка с помощью Jev:</strong> оценка этих кандидатов с учетом вопроса и критериев, специфичных для задачи.</li>
<li><strong>Действия в коде приложения:</strong> переупорядочить результаты, отфильтровать контекст, повторно использовать ответ или продолжить поиск.</li>
</ol>
<p>Некоторые решения принимаются до начала поиска. Jev может выбрать область поиска или оценить поступающие документы до того, как они поступят в коллекцию. Контроль доступа и точные фильтры остаются в ведении приложения.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">Изучите сценарии поиска<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">Коллекция «Поиск с Jev»</a> содержит девять готовых к запуску учебных примеров. В каждом из них используется небольшой синтетический набор данных и демонстрируются найденные записи, оценки и последующие действия.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">Выберите более убедительные доказательства<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Переранжируйте результаты поиска</a>: изменяйте порядок документации и воспоминаний агентов-программистов. Воспоминание об ошибке порта ноутбука может напоминать проблему с подключением контейнера; более полезное воспоминание фиксирует фактическое устранение неполадки между контейнером и хостом.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">Фильтрация найденного контекста</a>: после того как Milvus применит фильтр версий, отличайте инструкции по первоначальной установке от фрагментов, касающихся обновления и устранения неполадок.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">Переранжируйте связи в графе</a>: ответьте на вопрос о месте рождения автора книги, выбрав как связь «книга–автор», так и связь «автор–место рождения», а затем сохраните этот порядок при извлечении отрывков из источников.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">Управление поиском и повторное использование ответов<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">Определение момента прекращения поиска</a>: модель генерации предлагает варианты поиска на основе накопленных данных, в то время как Jev оценивает, можно ли ответить на исходный вопрос. Примеры охватывают прямой ответ, вопрос с двумя промежуточными шагами и недоступный факт, поиск по которому достигает предела без получения ответа.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">Маршрутизация поисковых запросов</a>: выберите поиск по документации, счетам или в памяти, а затем примените соответствующий фильтр Milvus. Запрос, выходящий за пределы области поиска, проходит по отдельному пути.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">Проверка повторного использования семантического кэша</a>: извлеките похожий запрос из кэша, а затем проверьте, удовлетворяет ли его ответ требованиям нового запроса в отношении задачи, языка и контекста.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">Улучшение и проверка конвейера знаний<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">Отбор документов перед индексированием</a>: отделяйте содержательные операционные рекомендации от рекламных или неполных материалов с помощью отдельных действий по индексированию, проверке и исключению.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">Проверка найденных фрагментов</a>: выявляйте текст, который пытается перенаправить помощника, сохраняя при этом обычные рекомендации по безопасности. Это дополнительный этап проверки, а не гарантия безопасности.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">Оценивайте доказательства поиска</a>: оценивайте релевантность фрагментов, достаточность доказательств и наличие в ответе необоснованных утверждений. В примерах намеренно удаляются доказательства или добавляются необоснованные утверждения, чтобы сделать различие наглядным.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">Готовый интерфейс для переранжирования<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a> предоставляет доступ к интерфейсу переранжирования на стороне приложения ( <code translate="no">JevRerankFunction</code>): передайте запрос и тексты документов-кандидатов и получите результаты с оценками и исходными индексами, отсортированные по релевантности. Используйте эти индексы для переупорядочивания записей, возвращаемых Milvus.</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">Интеграция с Jev</a> была включена в основной код. Ознакомьтесь с <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">реализацией и параметрами конструктора</a> для текущего API. Он принимает <code translate="no">TYPESAFE_API_KEY</code>, а по умолчанию используется <code translate="no">jev-latest</code>. Используйте версию пакета, включающую эту интеграцию.</p>
<p>Текущий оберточный модуль использует подсказку релевантности «утверждение и доказательство». Убедитесь, что этот критерий подходит для вашей задачи. Для пользовательских оценок, таких как совместимость с памятью, остановка или маршрутизация, следуйте инструкциям по ссылкам, используя API TypeSafe напрямую. В инструкциях демонстрируются прямые вызовы API из кода приложения на Python.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Попробуйте с Milvus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Откройте учебник по переранжированию в Colab</a>, чтобы начать с поиска и ранжирования кандидатов. Информацию о локальной настройке и полный список учебников см. в файле <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">README коллекции</a>.</p>
<p>В примерах используется <a href="https://aistudio.google.com/apikey">ключ API Gemini</a> для вложений и <a href="https://console.typesafe.ai/">ключ API TypeSafe</a> для Jev. В учебном пособии по агентскому поиску также используется Gemini для генерации запросов и ответов. Пример текста отправляется этим поставщикам API, и вызовы могут потреблять кредиты.</p>
<p>Учебные материалы по умолчанию запускаются с использованием <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> и включают варианты подключения к серверу Milvus или <a href="https://zilliz.com/cloud">облаку Zilliz</a>. Во всех вариантах развертывания применяется одинаковое распределение задач: Milvus извлекает кандидаты, а приложение отправляет соответствующий текст в Jev для оценки.</p>
<p>Рассматривайте примеры как отправную точку для выработки собственных критериев и пороговых значений. Оценка релевантности не гарантирует правильности ответа, а эти небольшие обучающие наборы данных не обеспечивают точности или скорости в производственной среде.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">Изучите реализации и результаты оценки<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Следующие проекты с открытым исходным кодом применяют эти идеи к более масштабным рабочим процессам поиска. В приведенных ссылках на отчеты объясняются наборы данных, сравнения и ограничения каждого эксперимента.</p>
<table>
<thead>
<tr><th>Проект</th><th>Сценарий поиска</th><th>Работа Jev</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>Постоянная память в формате Markdown для кодирующих агентов</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Реализация Jev</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">Оценка</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">Векторный граф RAG</a></td><td>Векторный поиск и поиск по графам для многошаговых запросов</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Реализация в Jev</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">Оценка</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>Итеративный поиск по закрытым знаниям</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">Программа для проведения экспериментов</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">Оценка с остановкой поиска</a> (автономный эксперимент)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>Повторное использование ответов на совместимые запросы</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Реализация Jev</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">Оценка</a></td></tr>
</tbody>
</table>
<p>Вклад DeepSearcher заключается в автономном эксперименте с остановкой поиска. Ссылки на другие реализации демонстрируют интеграцию Jev с конкретными задачами. Результаты этих проектов следует рассматривать в контексте их собственной оценки, а не рассматривать как общий эталон.</p>
