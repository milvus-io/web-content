---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka интегрирован с Milvus и Zilliz Cloud для потоковой передачи
  векторных данных. Узнайте, как использовать коннектор Kafka-Milvus для
  создания конвейеров реального времени для семантического поиска,
  рекомендательных систем и аналитики на основе искусственного интеллекта.
title: >-
  Подключение Apache Kafka® к Milvus/Zilliz Cloud для сбора векторных данных в
  режиме реального времени
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Подключение Apache Kafka® к Milvus/Zilliz Cloud для сбора векторных данных в режиме реального времени<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом кратком руководстве мы покажем, как настроить кафку с открытым исходным кодом и облако Zilliz Cloud для получения векторных данных.</p>
<p>В этом руководстве объясняется, как использовать Apache Kafka® для потоковой передачи и ввода векторных данных в векторную базу данных Milvus и облако Zilliz Cloud (полностью управляемое Milvus), что позволяет создавать передовые приложения реального времени, такие как семантический поиск, рекомендательные системы и аналитика на основе искусственного интеллекта.</p>
<p>Apache Kafka - это распределенная платформа потоковой передачи событий, предназначенная для высокопроизводительных конвейеров с низкой задержкой. Она широко используется для сбора, хранения и обработки потоков данных в реальном времени из таких источников, как базы данных, IoT-устройства, мобильные приложения и облачные сервисы. Способность Kafka обрабатывать большие объемы данных делает ее важным источником данных для векторных баз данных, таких как Milvus или Zilliz Cloud.</p>
<p>Например, Kafka может собирать потоки данных в реальном времени, такие как взаимодействие с пользователем, показания датчиков, а также их вложения в модели машинного обучения, и публиковать эти потоки непосредственно в Milvus или Zilliz Cloud. Попав в векторную базу данных, эти данные можно индексировать, искать и эффективно анализировать.</p>
<p>Интеграция Kafka с Milvus и Zilliz Cloud позволяет создавать мощные конвейеры для работы с неструктурированными данными. Коннектор работает как для развертывания Kafka с открытым исходным кодом, так и для хостинговых сервисов, таких как <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> и <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>В этом руководстве мы используем Zilliz Cloud в качестве демонстрационного образца:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">Шаг 1: Скачайте плагин kafka-connect-milvus<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующие шаги, чтобы загрузить плагин kafka-connect-milvus.</p>
<ol>
<li>Загрузите последнюю версию zip-файла плагина <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> <a href="https://github.com/zilliztech/kafka-connect-milvus/releases">отсюда</a>.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">Шаг 2: Загрузите Kafka<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
<li>Загрузите последнюю версию kafka <a href="https://kafka.apache.org/downloads">отсюда</a>.</li>
<li>Распакуйте скачанный файл и перейдите в каталог kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">$ tar -xzf kafka_2.13-3.6.1.tgz
$ <span class="hljs-built_in">cd</span> kafka_2.13-3.6.1
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">ШАГ 3: Запустите среду Kafka<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>ПРИМЕЧАНИЕ: В вашей локальной среде должна быть установлена Java 8+.</p>
</div>
<p>Выполните следующие команды, чтобы запустить все службы в правильном порядке:</p>
<ol>
<li><p>Запустить службу ZooKeeper</p>
<pre><code translate="no" class="language-shell">$ bin/zookeeper-server-start.sh config/zookeeper.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Запустить службу брокера Kafka</p>
<p>Откройте еще один сеанс терминала и выполните команду:</p>
<pre><code translate="no" class="language-shell">$ bin/kafka-server-start.sh config/server.properties
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>После успешного запуска всех служб у вас будет запущена базовая среда Kafka, готовая к использованию.</p>
<ul>
<li>Ознакомьтесь с официальным руководством по быстрому запуску Kafka для получения подробной информации: https://kafka.apache.org/quickstart.</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">Шаг 4: Настройте Kafka и Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Убедитесь, что Kafka и Zilliz Cloud установлены и правильно настроены.</p>
<ol>
<li><p>Если у вас еще нет темы в Kafka, создайте тему (например, <code translate="no">topic_0</code>) в Kafka.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">bin</span>/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:<span class="hljs-number">9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Если у вас еще нет коллекции в Zilliz Cloud, создайте коллекцию с векторным полем (в данном примере вектор имеет значение <code translate="no">dimension=8</code>). Вы можете использовать следующий пример схемы в Zilliz Cloud:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>Примечание: Убедитесь, что схемы обеих сторон соответствуют друг другу. В схеме имеется ровно одно векторное поле. Имена каждого поля на обеих сторонах абсолютно одинаковы.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">Шаг 5: Загрузите плагин kafka-connect-milvus в Kafka Instance<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
<li><p>распакуйте файл <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code>, который вы скачали в шаге 1.</p></li>
<li><p>скопируйте директории <code translate="no">zilliz-kafka-connect-milvus</code> в директорию <code translate="no">libs</code> вашей установки Kafka.</p></li>
<li><p>измените файл <code translate="no">connect-standalone.properties</code> в каталоге <code translate="no">config</code> вашей установки Kafka.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=<span class="hljs-literal">false</span>
value.converter.schemas.enable=<span class="hljs-literal">false</span>
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
<button class="copy-code-btn"></button></code></pre></li>
<li><p>создайте и настройте файл <code translate="no">milvus-sink-connector.properties</code> в каталоге <code translate="no">config</code> вашей установки Kafka.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.<span class="hljs-keyword">class</span>=com.milvus.io.kafka.MilvusSinkConnector
<span class="hljs-keyword">public</span>.endpoint=https:<span class="hljs-comment">//&lt;public.endpoint&gt;:port</span>
token=*****************************************
collection.name=topic_0
topics=topic_0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">Шаг 6: Запуск коннектора<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
<li><p>Запустите коннектор с предыдущим файлом конфигурации.</p>
<pre><code translate="no" class="language-shell">$ bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Попробуйте создать сообщение в тему Kafka, которую вы только что создали в Kafka.</p>
<pre><code translate="no" class="language-shell">bin/kafka-<span class="hljs-variable language_">console</span>-producer.<span class="hljs-property">sh</span> --topic topic_0 --bootstrap-server <span class="hljs-attr">localhost</span>:<span class="hljs-number">9092</span>                        
&gt;{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>, <span class="hljs-number">0.00082446384</span>, -<span class="hljs-number">0.00071647146</span>, <span class="hljs-number">0.048612226</span>], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Проверьте, была ли сущность вставлена в коллекцию в Zilliz Cloud. Вот как это выглядит на Zilliz Cloud, если вставка прошла успешно:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">Поддержка</h3><p>Если вам нужна помощь или у вас есть вопросы по коннектору Kafka Connect Milvus Connector, пожалуйста, обращайтесь к сопровождающему коннектора: <strong>Email:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
