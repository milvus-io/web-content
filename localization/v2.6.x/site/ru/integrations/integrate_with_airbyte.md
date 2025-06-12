---
id: integrate_with_airbyte.md
summary: >-
  Airbyte - это инфраструктура перемещения данных с открытым исходным кодом для
  создания конвейеров извлечения и загрузки данных (EL). Она отличается
  универсальностью, масштабируемостью и простотой использования. Каталог
  коннекторов Airbyte поставляется "из коробки" с более чем 350 предварительно
  созданными коннекторами. С помощью этих коннекторов можно запустить репликацию
  данных из источника в пункт назначения всего за несколько минут.
title: 'Airbyte: Инфраструктура перемещения данных с открытым исходным кодом'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: Инфраструктура перемещения данных с открытым исходным кодом<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte - это инфраструктура перемещения данных с открытым исходным кодом для создания конвейеров извлечения и загрузки данных (EL). Она разработана для обеспечения универсальности, масштабируемости и простоты использования. Каталог коннекторов Airbyte поставляется "из коробки" с более чем 350 предварительно созданными коннекторами. С помощью этих коннекторов можно запустить репликацию данных из источника в пункт назначения всего за несколько минут.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Основные компоненты Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. Каталог коннекторов</h3><ul>
<li><strong>350+ готовых коннекторов</strong>: Каталог коннекторов Airbyte поставляется "из коробки" с более чем 350 готовыми коннекторами. Эти коннекторы можно использовать, чтобы начать репликацию данных из источника в пункт назначения всего за несколько минут.</li>
<li><strong>No-Code Connector Builder</strong>: Вы можете легко расширить функциональность Airbyte для поддержки ваших пользовательских сценариев использования с помощью таких инструментов, <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">как No-Code Connector Builder</a>.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. Платформа</h3><p>Платформа Airbyte предоставляет все горизонтальные сервисы, необходимые для настройки и масштабирования операций по перемещению данных, и может быть как <a href="https://airbyte.com/product/airbyte-cloud">облачной</a>, так и <a href="https://airbyte.com/product/airbyte-enterprise">самоуправляемой</a>.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. Пользовательский интерфейс</h3><p>Airbyte имеет пользовательский интерфейс, библиотеку <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (Python), <a href="https://docs.airbyte.com/api-documentation">API</a> и <a href="https://docs.airbyte.com/terraform-documentation">Terraform Provider</a> для интеграции с предпочитаемыми вами инструментами и подходами к управлению инфраструктурой.</p>
<p>Благодаря возможностям Airbyte пользователи могут интегрировать источники данных в кластер Milvus для поиска по сходству.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Прежде чем начать<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Вам понадобятся:</p>
<ul>
<li>учетная запись Zendesk (или другой источник данных, с которым вы хотите синхронизировать данные)</li>
<li>Учетная запись Airbyte или локальный экземпляр</li>
<li>API-ключ OpenAI</li>
<li>Кластер Milvus</li>
<li>Python 3.10, установленный локально</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Настройка кластера Milvus<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы уже развернули кластер K8s для производства, вы можете пропустить этот шаг и перейти непосредственно к <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">развертыванию Milvus Operator</a>. В противном случае вы можете выполнить <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">шаги</a> по развертыванию кластера Milvus с помощью Milvus Operator.</p>
<p>Отдельные сущности (в нашем случае это тикеты поддержки и статьи базы знаний) хранятся в "коллекции" - после настройки кластера вам нужно создать коллекцию. Выберите подходящее имя и установите значение Dimension равным 1536, чтобы соответствовать размерности вектора, генерируемого сервисом встраивания OpenAI.</p>
<p>После создания запишите информацию о конечной точке и <a href="https://milvus.io/docs/authenticate.md?tab=docker">аутентификации</a>.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Настройка соединения в Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>Наша база данных готова, давайте перенесем туда данные! Для этого нам нужно настроить соединение в Airbyte. Либо зарегистрируйте облачный аккаунт Airbyte на <a href="https://cloud.airbyte.com">cloud.airbyte.com</a>, либо запустите локальный экземпляр, как описано <a href="https://docs.airbyte.com/using-airbyte/getting-started/">в документации</a>.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">Настройка источника</h3><p>После того как ваш экземпляр запущен, нам нужно настроить соединение - нажмите "Новое соединение" и выберите коннектор "Zendesk Support" в качестве источника. После нажатия кнопки "Проверить и сохранить" Airbyte проверит, может ли быть установлено соединение.</p>
<p>В облаке Airbyte вы можете легко пройти аутентификацию, нажав кнопку Authenticate. При использовании локального экземпляра Airbyte следуйте инструкциям, описанным на странице <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">документации</a>.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">Настройка пункта назначения</h3><p>Если все работает правильно, следующим шагом будет настройка места назначения для перемещения данных. Здесь выберите коннектор "Milvus".</p>
<p>Коннектор Milvus выполняет три задачи:</p>
<ul>
<li><strong>Разбивка и форматирование</strong> - Разбивает записи Zendesk на текст и метаданные. Если размер текста превышает заданный размер чанка, записи разбиваются на несколько частей, которые загружаются в коллекцию по отдельности. Разбивка текста (или чанкинг) может, например, происходить в случае больших тикетов поддержки или статей знаний. Разбив текст на части, можно добиться того, что поиск всегда будет приносить полезные результаты.</li>
</ul>
<p>Возьмем размер фрагмента в 1000 лексем и текстовые поля body, title, description и subject, поскольку именно они будут присутствовать в данных, которые мы получим из Zendesk.</p>
<ul>
<li><strong>Встраивание</strong> - с помощью моделей машинного обучения текстовые фрагменты, полученные в результате обработки, преобразуются в векторные вкрапления, которые затем можно искать на предмет семантического сходства. Для создания вкраплений необходимо предоставить ключ OpenAI API. Airbyte отправит каждый чанк в OpenAI и добавит полученный вектор к сущностям, загруженным в ваш кластер Milvus.</li>
<li><strong>Индексирование</strong> - После того как вы векторизировали чанки, вы можете загрузить их в базу данных. Для этого вставьте информацию, которую вы получили при настройке кластера и коллекции в кластере Milvus. <div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> Нажав кнопку "Проверить и сохранить", вы проверите, все ли правильно выстроено (правильные учетные данные, коллекция существует и имеет ту же векторную размерность, что и настроенное вложение, и т. д.).</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">Настройка потока синхронизации</h3><p>Последний шаг перед тем, как данные будут готовы к потоку, - выбор "потоков" для синхронизации. Поток - это коллекция записей в источнике. Поскольку Zendesk поддерживает большое количество потоков, которые не имеют отношения к нашему случаю, давайте выберем только "билеты" и "статьи" и отключим все остальные, чтобы сэкономить пропускную способность и убедиться, что в поиске будет отображаться только релевантная информация:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> Вы можете выбрать, какие поля извлекать из источника, щелкнув название потока. Режим синхронизации "Инкрементный | Append + Deduped" означает, что при последующих запусках соединения Zendesk и Milvus синхронизируются, передавая минимум данных (только те статьи и билеты, которые изменились с момента последнего запуска).</p>
<p>Как только соединение будет установлено, Airbyte начнет синхронизацию данных. Их появление в коллекции Milvus может занять несколько минут.</p>
<p>Если вы выберете частоту репликации, Airbyte будет запускаться регулярно, чтобы поддерживать коллекцию Milvus в актуальном состоянии с учетом изменений в статьях Zendesk и вновь созданных проблемах.</p>
<h3 id="Check-flow" class="common-anchor-header">Поток проверок</h3><p>Вы можете проверить в пользовательском интерфейсе кластера Milvus, как структурированы данные в коллекции, перейдя на игровую площадку и выполнив запрос "Query Data" с фильтром, установленным на "_ab_stream == \"tickets\"".<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> Как вы можете видеть в представлении "Результат", каждая запись, полученная из Zendesk, хранится в Milvus как отдельная сущность со всеми указанными метаданными. Текстовый фрагмент, на котором основано встраивание, показан как свойство "text" - это текст, который был вложен с помощью OpenAI и по которому мы будем искать.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">Создание приложения Streamlit для запроса коллекции<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Наши данные готовы - теперь нам нужно создать приложение для их использования. В данном случае приложение будет представлять собой простую форму поддержки, в которую пользователи могут отправлять заявки. Когда пользователь нажмет кнопку "Отправить", мы сделаем две вещи:</p>
<ul>
<li>поиск похожих заявок, поданных пользователями той же организации</li>
<li>Поиск статей, основанных на знаниях, которые могут быть релевантны пользователю.</li>
</ul>
<p>В обоих случаях мы будем использовать семантический поиск с помощью вкраплений OpenAI. Для этого описание проблемы, введенное пользователем, также встраивается и используется для извлечения похожих сущностей из кластера Milvus. Если есть соответствующие результаты, они отображаются под формой.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">Настройка среды пользовательского интерфейса</h3><p>Вам понадобится локальная установка Python, так как мы будем использовать Streamlit для реализации приложения.</p>
<p>Сначала установите Streamlit, клиентскую библиотеку Milvus и клиентскую библиотеку OpenAI локально:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы отобразить базовую форму поддержки, создайте python-файл <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы запустить приложение, используйте Streamlit run:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>Это приведет к отрисовке базовой формы:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>Код для этого примера также можно найти на <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a>.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">Настройка службы запросов бэкенда</h3><p>Далее проверим существующие открытые тикеты, которые могут быть релевантны. Для этого мы внедрили текст, введенный пользователем с помощью OpenAI, затем выполнили поиск по сходству в нашей коллекции, отфильтровав все еще открытые билеты. Если найдется такой, в котором расстояние между введенным тикетом и существующим очень мало, сообщите об этом пользователю и не отправляйте:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>Здесь происходит несколько вещей:</p>
<ul>
<li>Устанавливается соединение с кластером Milvus.</li>
<li>Используется сервис OpenAI для создания вставки описания, введенного пользователем.</li>
<li>Выполняется поиск сходства, фильтруя результаты по статусу тикета и идентификатору организации (поскольку релевантными являются только открытые тикеты одной организации).</li>
<li>Если есть результаты и расстояние между векторами вкраплений существующего тикета и вновь введенного текста ниже определенного порога, об этом сообщается.</li>
</ul>
<p>Чтобы запустить новое приложение, необходимо сначала установить переменные окружения для OpenAI и Milvus:</p>
<pre><code translate="no" class="language-shell">export MILVUS_TOKEN=...
export MILVUS_URL=https://...
export OPENAI_API_KEY=sk-...

streamlit run app.py
<button class="copy-code-btn"></button></code></pre>
<p>При попытке отправить билет, который уже существует, результат будет выглядеть так:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> Код этого примера также можно найти на <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a>.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">Показывать больше релевантной информации</h3><p>Как видно из зеленого отладочного вывода, скрытого в финальной версии, два тикета соответствовали нашему поиску (в статусе new, от текущей организации и близко к вектору встраивания). Однако первый из них (релевантный) ранжировался выше, чем второй (нерелевантный в данной ситуации), что отражается в меньшем значении расстояния. Эта связь фиксируется в векторах встраивания без прямого сопоставления слов, как при обычном полнотекстовом поиске.</p>
<p>В заключение давайте покажем полезную информацию после отправки билета, чтобы предоставить пользователю как можно больше релевантной информации.</p>
<p>Для этого мы выполним второй поиск после отправки тикета, чтобы получить наиболее подходящие статьи базы знаний:</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>Если нет открытого тикета поддержки с высоким показателем сходства, новый тикет отправляется, а соответствующие статьи базы знаний отображаются ниже:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> Код этого примера также можно найти на <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a>.</p>
<h2 id="Conclusion" class="common-anchor-header">Заключение<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Хотя представленный здесь пользовательский интерфейс - это не настоящая форма поддержки, а пример, иллюстрирующий вариант использования, сочетание Airbyte и Milvus очень мощное - оно позволяет легко загружать текст из самых разных источников (от баз данных типа Postgres, API типа Zendesk или GitHub до полностью пользовательских источников, созданных с помощью SDK или визуального конструктора коннекторов Airbyte) и индексировать его во встроенном виде в Milvus, мощной векторной поисковой системе, способной масштабироваться до огромных объемов данных.</p>
<p>Airbyte и Milvus имеют открытый исходный код и совершенно бесплатны для использования в вашей инфраструктуре, при желании можно воспользоваться облачными предложениями для разгрузки операций.</p>
<p>Помимо классического варианта использования семантического поиска, описанного в этой статье, общая схема может быть использована для создания чат-бота, отвечающего на вопросы по методу RAG (Retrieval Augmented Generation), рекомендательных систем или для повышения релевантности и эффективности рекламы.</p>
