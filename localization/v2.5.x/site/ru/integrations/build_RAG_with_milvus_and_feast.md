---
id: build_RAG_with_milvus_and_feast.md
summary: >-
  В этом уроке мы построим конвейер Retrieval-Augmented Generation (RAG) с
  использованием Feast и Milvus. Feast - это хранилище признаков с открытым
  исходным кодом, которое упрощает управление признаками для машинного обучения,
  позволяя эффективно хранить и извлекать структурированные данные как для
  обучения, так и для выводов в реальном времени. Milvus - это
  высокопроизводительная векторная база данных, предназначенная для быстрого
  поиска сходств, что делает ее идеальной для поиска релевантных документов в
  рабочих процессах RAG.
title: Построение RAG с помощью Milvus и Feast
---
<h1 id="Build-RAG-with-Milvus-and-Feast" class="common-anchor-header">Построение RAG с помощью Milvus и Feast<button data-href="#Build-RAG-with-Milvus-and-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>В этом уроке мы построим конвейер Retrieval-Augmented Generation (RAG) с помощью <a href="https://github.com/feast-dev/feast">Feast</a> и <a href="https://milvus.io/">Milvus</a>. Feast - это хранилище признаков с открытым исходным кодом, которое упрощает управление признаками для машинного обучения, позволяя эффективно хранить и извлекать структурированные данные как для обучения, так и для выводов в реальном времени. Milvus - это высокопроизводительная векторная база данных, предназначенная для быстрого поиска сходств, что делает ее идеальной для поиска релевантных документов в рабочих процессах RAG.</p>
<p>По сути, мы будем использовать Feast для введения документов и структурированных данных (т. е. признаков) в контекст LLM (Large Language Model) для работы приложения RAG (Retrieval Augmented Generation) с Milvus в качестве онлайновой векторной базы данных.</p>
<h1 id="Why-Feast" class="common-anchor-header">Почему именно Feast?<button data-href="#Why-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p>Feast решает несколько общих проблем в этом потоке:</p>
<ol>
<li><strong>Онлайн-поиск:</strong> Во время выводов LLM часто требуется доступ к данным, которые не всегда доступны и должны быть предварительно вычислены из других источников данных.<ul>
<li>Feast управляет развертыванием в различных онлайн-хранилищах (например, Milvus, DynamoDB, Redis, Google Cloud Datastore) и обеспечивает постоянный <em>доступ к</em> необходимым функциям и <em>их свежее вычисление</em> во время вывода.</li>
</ul></li>
<li><strong>Векторный поиск:</strong> В Feast встроена поддержка векторного поиска сходства, который легко настраивается декларативно, чтобы пользователи могли сосредоточиться на своем приложении. Milvus предоставляет мощные и эффективные возможности векторного поиска по сходству.</li>
<li><strong>Более богатые структурированные данные:</strong> Наряду с векторным поиском, пользователи могут запрашивать стандартные структурированные поля для введения в контекст LLM для улучшения пользовательского опыта.</li>
<li><strong>Функциональность/контекст и версионность:</strong> Различные команды в организации часто не могут повторно использовать данные в разных проектах и сервисах, что приводит к дублированию логики приложений. Модели имеют зависимости от данных, которые должны быть версионированы, например, при проведении A/B-тестов на версиях модели/предложения.<ul>
<li>Feast позволяет находить и совместно использовать ранее использованные документы, функции и версионировать наборы данных.</li>
</ul></li>
</ol>
<p>Мы:</p>
<ol>
<li>Развернем локальное хранилище функций с <strong>автономным хранилищем файлов Parquet</strong> и <strong>онлайн-хранилищем Milvus</strong>.</li>
<li>Записывать/материализовывать данные (т. е. значения признаков) из офлайн-хранилища (файл parquet) в онлайн-хранилище (Milvus).</li>
<li>Выдача признаков с помощью Feast SDK с возможностями векторного поиска Milvus.</li>
<li>Внесите документ в контекст LLM, чтобы ответить на вопросы.</li>
</ol>
<div class="alert note">
<p>Это руководство основано на официальном руководстве по интеграции Milvus из <a href="https://github.com/feast-dev/feast/blob/master/examples/rag/milvus-quickstart.ipynb">репозитория Feast</a>. Мы стараемся поддерживать это руководство в актуальном состоянии, но если вы столкнетесь с какими-либо неточностями, пожалуйста, обратитесь к официальному руководству и не стесняйтесь открыть проблему в нашем репозитории для получения необходимых обновлений.</p>
</div>
<h2 id="Preparation" class="common-anchor-header">Подготовка<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies" class="common-anchor-header">Зависимости</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&#x27;feast[milvus]&#x27;</span> openai -U -q</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, то для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<p>В качестве провайдера LLM мы будем использовать OpenAI. Вы можете зайти на его официальный сайт и подготовить <a href="https://platform.openai.com/api-keys">OPENAI_API_KEY</a> в качестве переменной окружения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-**************&quot;</span>

llm_client = OpenAI(
    api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-Data" class="common-anchor-header">Подготовьте данные<button data-href="#Prepare-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>В качестве примера мы будем использовать данные из следующей папки:<br>
<a href="https://github.com/feast-dev/feast/tree/master/examples/rag/feature_repo">Feast RAG Feature Repo</a></p>
<p>После загрузки данных вы найдете следующие файлы:</p>
<pre><code translate="no" class="language-bash">feature_repo/
│── data/                  <span class="hljs-comment"># Contains pre-processed Wikipedia city data in Parquet format</span>
│── example_repo.py        <span class="hljs-comment"># Defines feature views and entities for the city data</span>
│── feature_store.yaml     <span class="hljs-comment"># Configures Milvus and feature store settings</span>
│── test_workflow.py       <span class="hljs-comment"># Example workflow for Feast operations</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Key-Configuration-Files" class="common-anchor-header">Файлы конфигурации ключей</h3><h4 id="1-featurestoreyaml" class="common-anchor-header">1. feature_store.yaml</h4><p>Этот файл настраивает инфраструктуру хранилища функций:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">project:</span> <span class="hljs-string">rag</span>
<span class="hljs-attr">provider:</span> <span class="hljs-string">local</span>
<span class="hljs-attr">registry:</span> <span class="hljs-string">data/registry.db</span>

<span class="hljs-attr">online_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">milvus</span>            <span class="hljs-comment"># Uses Milvus for vector storage</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">data/online_store.db</span>
  <span class="hljs-attr">vector_enabled:</span> <span class="hljs-literal">true</span>    <span class="hljs-comment"># Enables vector similarity search</span>
  <span class="hljs-attr">embedding_dim:</span> <span class="hljs-number">384</span>      <span class="hljs-comment"># Dimension of our embeddings</span>
  <span class="hljs-attr">index_type:</span> <span class="hljs-string">&quot;FLAT&quot;</span>      <span class="hljs-comment"># Vector index type</span>
  <span class="hljs-attr">metric_type:</span> <span class="hljs-string">&quot;COSINE&quot;</span>   <span class="hljs-comment"># Similarity metric</span>

<span class="hljs-attr">offline_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">file</span>              <span class="hljs-comment"># Uses file-based offline storage</span>
<button class="copy-code-btn"></button></code></pre>
<p>Эта конфигурация устанавливает:</p>
<ul>
<li>Milvus в качестве онлайн-хранилища для быстрого поиска векторов</li>
<li>автономное хранилище на основе файлов для обработки исторических данных</li>
<li>Возможность поиска векторов с помощью сходства COSINE.</li>
</ul>
<h4 id="2-examplerepopy" class="common-anchor-header">2. example_repo.py</h4><p>Содержит определения характеристик для наших городских данных, включая:</p>
<ul>
<li>определения сущностей для городов</li>
<li>Представления характеристик для информации о городах и вкраплений</li>
<li>спецификации схемы для базы данных векторов</li>
</ul>
<h4 id="3-Data-Directory" class="common-anchor-header">3. Каталог данных</h4><p>Содержит наши предварительно обработанные данные о городах из Википедии:</p>
<ul>
<li>Описания и резюме городов</li>
<li>предварительно вычисленные вкрапления (384-мерные векторы)</li>
<li>Сопутствующие метаданные, такие как названия городов и штатов.</li>
</ul>
<p>Эти файлы вместе создают хранилище характеристик, которое объединяет возможности векторного поиска Milvus и управления характеристиками Feast, обеспечивая эффективное извлечение релевантной информации о городе для нашего приложения RAG.</p>
<h2 id="Inspect-the-Data" class="common-anchor-header">Проверка данных<button data-href="#Inspect-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Необработанные данные о признаках, которые мы имеем в этой демонстрации, хранятся в локальном файле parquet. Набор данных представляет собой сводки Википедии о различных городах. Давайте сначала проверим данные.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

df = pd.read_parquet(
    <span class="hljs-string">&quot;/path/to/feature_repo/data/city_wikipedia_summaries_with_embeddings.parquet&quot;</span>
)
df[<span class="hljs-string">&quot;vector&quot;</span>] = df[<span class="hljs-string">&quot;vector&quot;</span>].apply(<span class="hljs-keyword">lambda</span> x: x.tolist())
embedding_length = <span class="hljs-built_in">len</span>(df[<span class="hljs-string">&quot;vector&quot;</span>][<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;embedding length = <span class="hljs-subst">{embedding_length}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">embedding length = 384
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

display(df.head())
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>идентификатор элемента</th>
      <th>дата_события</th>
      <th>состояние</th>
      <th>вики-резюме</th>
      <th>предложения_куски</th>
      <th>вектор</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>Нью-Йорк, часто называемый Нью-Йорком или просто...</td>
      <td>Нью-Йорк, часто называемый Нью-Йорком или просто...</td>
      <td>[0.1465730518102646, -0.07317650318145752, 0.0...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>Город состоит из пяти районов, каждый из которых...</td>
      <td>[0.05218901485204697, -0.08449874818325043, 0....</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>2</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>Нью-Йорк, New York</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>Нью-Йорк является мировым центром финансовой и ком...</td>
      <td>[0.06769222766160965, -0.07371102273464203, -0...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>3</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>Нью-Йорк, New York</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>Нью-Йорк является эпицентром мирового ...</td>
      <td>[0.12095861881971359, -0.04279915615916252, 0....</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>4</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>Нью-Йорк, New York</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>По оценкам, население города в 2022 году составит 8 335 человек,...</td>
      <td>[0.17943550646305084, -0.09458263963460922, 0....</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="common-anchor-header">Регистрация определений функций и развертывание магазина функций<button data-href="#Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>После загрузки <code translate="no">feature_repo</code> нам нужно запустить <code translate="no">feast apply</code>, чтобы зарегистрировать представления и сущности, определенные в <code translate="no">example_repo.py</code>, и установить <strong>Milvus</strong> в качестве таблицы интернет-магазина.</p>
<p>Перед выполнением команды убедитесь, что вы перешли в каталог <code translate="no">feature_repo</code>.</p>
<pre><code translate="no" class="language-bash">feast apply
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Features-into-Milvus" class="common-anchor-header">Загрузка характеристик в Milvus<button data-href="#Load-Features-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь мы загрузим характеристики в Milvus. Этот шаг включает в себя сериализацию значений характеристик из автономного хранилища и запись их в Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">import</span> warnings

warnings.filterwarnings(<span class="hljs-string">&quot;ignore&quot;</span>)

store = FeatureStore(repo_path=<span class="hljs-string">&quot;/path/to/feature_repo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">store.write_to_online_store(feature_view_name=<span class="hljs-string">&quot;city_embeddings&quot;</span>, df=df)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Connecting to Milvus in local mode using /Users/jinhonglin/Desktop/feature_repo/data/online_store.db
</code></pre>
<p>Обратите внимание, что теперь есть <code translate="no">online_store.db</code> и <code translate="no">registry.db</code>, которые хранят материализованные функции и информацию о схеме, соответственно. Мы можем взглянуть на файл <code translate="no">online_store.db</code>.</p>
<pre><code translate="no" class="language-python">pymilvus_client = store._provider._online_store._connect(store.config)
COLLECTION_NAME = pymilvus_client.list_collections()[<span class="hljs-number">0</span>]

milvus_query_result = pymilvus_client.query(
    collection_name=COLLECTION_NAME,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;item_id == &#x27;0&#x27;&quot;</span>,
)
pd.DataFrame(milvus_query_result[<span class="hljs-number">0</span>]).head()
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>item_id_pk</th>
      <th>созданный_тс</th>
      <th>событие_тс</th>
      <th>item_id</th>
      <th>предложение_куски</th>
      <th>состояние</th>
      <th>вектор</th>
      <th>вики-сводка</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>0.146573</td>
      <td>Нью-Йорк, часто называемый городом Нью-Йорк или просто...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>-0.073177</td>
      <td>Нью-Йорк, часто называемый городом Нью-Йорк или просто...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>0.052114</td>
      <td>Нью-Йорк, часто называемый городом Нью-Йорк или просто...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>0.033187</td>
      <td>Нью-Йорк, часто называемый городом Нью-Йорк или просто...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>0.012013</td>
      <td>Нью-Йорк, который часто называют Нью-Йорком или просто...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Build-RAG" class="common-anchor-header">Build RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Embedding-a-Query-Using-PyTorch-and-Sentence-Transformers" class="common-anchor-header">1. Встраивание запроса с помощью PyTorch и трансформаторов предложений</h3><p>Во время вывода (например, когда пользователь отправляет сообщение в чат) нам нужно встроить входной текст. Это можно представить как преобразование входных данных. В этом примере мы будем использовать небольшой трансформатор предложений из Hugging Face.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, FieldSchema
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModel
<span class="hljs-keyword">from</span> example_repo <span class="hljs-keyword">import</span> city_embeddings_feature_view, item

TOKENIZER = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>
MODEL = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">mean_pooling</span>(<span class="hljs-params">model_output, attention_mask</span>):
    token_embeddings = model_output[
        <span class="hljs-number">0</span>
    ]  <span class="hljs-comment"># First element of model_output contains all token embeddings</span>
    input_mask_expanded = (
        attention_mask.unsqueeze(-<span class="hljs-number">1</span>).expand(token_embeddings.size()).<span class="hljs-built_in">float</span>()
    )
    <span class="hljs-keyword">return</span> torch.<span class="hljs-built_in">sum</span>(token_embeddings * input_mask_expanded, <span class="hljs-number">1</span>) / torch.clamp(
        input_mask_expanded.<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>), <span class="hljs-built_in">min</span>=<span class="hljs-number">1e-9</span>
    )


<span class="hljs-keyword">def</span> <span class="hljs-title function_">run_model</span>(<span class="hljs-params">sentences, tokenizer, model</span>):
    encoded_input = tokenizer(
        sentences, padding=<span class="hljs-literal">True</span>, truncation=<span class="hljs-literal">True</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>
    )
    <span class="hljs-comment"># Compute token embeddings</span>
    <span class="hljs-keyword">with</span> torch.no_grad():
        model_output = model(**encoded_input)

    sentence_embeddings = mean_pooling(model_output, encoded_input[<span class="hljs-string">&quot;attention_mask&quot;</span>])
    sentence_embeddings = F.normalize(sentence_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> sentence_embeddings
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Fetching-Real-time-Vectors-and-Data-for-Online-Inference" class="common-anchor-header">2. Получение векторов и данных в реальном времени для интерактивного вывода</h3><p>После преобразования запроса во вставку следующим шагом будет извлечение соответствующих документов из хранилища векторов. Во время вывода мы используем поиск векторного сходства, чтобы найти наиболее релевантные вкрапления документов, хранящиеся в онлайн-магазине признаков, используя <code translate="no">retrieve_online_documents_v2()</code>. Затем эти векторы признаков могут быть введены в контекст LLM.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Which city has the largest population in New York?&quot;</span>

tokenizer = AutoTokenizer.from_pretrained(TOKENIZER)
model = AutoModel.from_pretrained(MODEL)
query_embedding = run_model(question, tokenizer, model)
query = query_embedding.detach().cpu().numpy().tolist()[<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

<span class="hljs-comment"># Retrieve top k documents</span>
context_data = store.retrieve_online_documents_v2(
    features=[
        <span class="hljs-string">&quot;city_embeddings:vector&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:item_id&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:state&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:sentence_chunks&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:wiki_summary&quot;</span>,
    ],
    query=query,
    top_k=<span class="hljs-number">3</span>,
    distance_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
).to_df()
display(context_data)
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>вектор</th>
      <th>item_id</th>
      <th>состояние</th>
      <th>предложение_куски</th>
      <th>вики-сводка</th>
      <th>расстояние</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>0</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>Нью-Йорк, часто называемый городом Нью-Йорк или просто...</td>
      <td>Нью-Йорк, часто называемый городом Нью-Йорк или просто...</td>
      <td>0.743023</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>6</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>Нью-Йорк - это географический и демографический центр...</td>
      <td>Нью-Йорк, часто называемый городом Нью-Йорк или просто...</td>
      <td>0.739733</td>
    </tr>
    <tr>
      <th>2</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>7</td>
      <td>Нью-Йорк, Нью-Йорк</td>
      <td>В Нью-Йорке проживает более 20,1 миллиона человек.</td>
      <td>Нью-Йорк, часто называемый Нью-Йорк Сити или просто...</td>
      <td>0.728218</td>
    </tr>
  </tbody>
</table>
</div>
<h3 id="3-Formatting-Retrieved-Documents-for-RAG-Context" class="common-anchor-header">3. Форматирование полученных документов для контекста RAG</h3><p>После извлечения релевантных документов нам необходимо отформатировать данные в структурированный контекст, который может быть эффективно использован в последующих приложениях. Этот шаг гарантирует, что извлеченная информация чиста, организована и готова к интеграции в конвейер RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_documents</span>(<span class="hljs-params">context_df</span>):
    output_context = <span class="hljs-string">&quot;&quot;</span>
    unique_documents = context_df.drop_duplicates().apply(
        <span class="hljs-keyword">lambda</span> x: <span class="hljs-string">&quot;City &amp; State = {&quot;</span>
        + x[<span class="hljs-string">&quot;state&quot;</span>]
        + <span class="hljs-string">&quot;}\nSummary = {&quot;</span>
        + x[<span class="hljs-string">&quot;wiki_summary&quot;</span>].strip()
        + <span class="hljs-string">&quot;}&quot;</span>,
        axis=<span class="hljs-number">1</span>,
    )
    <span class="hljs-keyword">for</span> i, document_text <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(unique_documents):
        output_context += <span class="hljs-string">f&quot;****START DOCUMENT <span class="hljs-subst">{i}</span>****\n<span class="hljs-subst">{document_text.strip()}</span>\n****END DOCUMENT <span class="hljs-subst">{i}</span>****&quot;</span>
    <span class="hljs-keyword">return</span> output_context


RAG_CONTEXT = format_documents(context_data[[<span class="hljs-string">&quot;state&quot;</span>, <span class="hljs-string">&quot;wiki_summary&quot;</span>]])
<span class="hljs-built_in">print</span>(RAG_CONTEXT)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">****START DOCUMENT 0****
City &amp; State = {New York, New York}
Summary = {New York, often called New York City or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world's largest natural harbors. The city comprises five boroughs, each of which is coextensive with a respective county. New York is a global center of finance and commerce, culture and technology, entertainment and media, academics and scientific output, and the arts and fashion, and, as home to the headquarters of the United Nations, is an important center for international diplomacy. New York City is the epicenter of the world's principal metropolitan economy.
With an estimated population in 2022 of 8,335,897 distributed over 300.46 square miles (778.2 km2), the city is the most densely populated major city in the United States. New York has more than double the population of Los Angeles, the nation's second-most populous city. New York is the geographical and demographic center of both the Northeast megalopolis and the New York metropolitan area, the largest metropolitan area in the U.S. by both population and urban area. With more than 20.1 million people in its metropolitan statistical area and 23.5 million in its combined statistical area as of 2020, New York City is one of the world's most populous megacities. The city and its metropolitan area are the premier gateway for legal immigration to the United States. As many as 800 languages are spoken in New York, making it the most linguistically diverse city in the world. In 2021, the city was home to nearly 3.1 million residents born outside the U.S., the largest foreign-born population of any city in the world.
New York City traces its origins to Fort Amsterdam and a trading post founded on the southern tip of Manhattan Island by Dutch colonists in approximately 1624. The settlement was named New Amsterdam (Dutch: Nieuw Amsterdam) in 1626 and was chartered as a city in 1653. The city came under English control in 1664 and was temporarily renamed New York after King Charles II granted the lands to his brother, the Duke of York. before being permanently renamed New York in November 1674. New York City was the capital of the United States from 1785 until 1790. The modern city was formed by the 1898 consolidation of its five boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, and has been the largest U.S. city ever since.
Anchored by Wall Street in the Financial District of Lower Manhattan, New York City has been called both the world's premier financial and fintech center and the most economically powerful city in the world. As of 2022, the New York metropolitan area is the largest metropolitan economy in the world with a gross metropolitan product of over US$2.16 trillion. If the New York metropolitan area were its own country, it would have the tenth-largest economy in the world. The city is home to the world's two largest stock exchanges by market capitalization of their listed companies: the New York Stock Exchange and Nasdaq. New York City is an established safe haven for global investors. As of 2023, New York City is the most expensive city in the world for expatriates to live. New York City is home to the highest number of billionaires, individuals of ultra-high net worth (greater than US$30 million), and millionaires of any city in the world.}
****END DOCUMENT 0****
</code></pre>
<h3 id="4-Generating-Responses-Using-Retrieved-Context" class="common-anchor-header">4. Формирование ответов на основе извлеченного контекста</h3><p>Теперь, когда мы отформатировали извлеченные документы, мы можем интегрировать их в структурированную подсказку для генерации ответа. Этот шаг гарантирует, что помощник будет опираться только на полученную информацию и избежит галлюцинаций в ответах.</p>
<pre><code translate="no" class="language-python">FULL_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
You are an assistant for answering questions about states. You will be provided documentation from Wikipedia. Provide a conversational answer.
If you don&#x27;t know the answer, just say &quot;I do not know.&quot; Don&#x27;t make up an answer.

Here are document(s) you should use when answer the users question:
<span class="hljs-subst">{RAG_CONTEXT}</span>
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: FULL_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: question},
    ],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>.join([c.message.content <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> response.choices]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The city with the largest population in New York is New York City itself, often referred to as NYC. It is the most populous city in the United States, with an estimated population of about 8.3 million in 2022.
</code></pre>
