---
id: timestamp.md
title: Временная метка в Мильвусе
summary: >-
  Узнайте о понятии временной метки и четырех основных параметрах, связанных с
  временной меткой, в векторной базе данных Milvus.
---

<h1 id="Timestamp" class="common-anchor-header">Временная метка<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме объясняется понятие временной метки и представлены четыре основных параметра, связанных с временной меткой, в векторной базе данных Milvus.</p>
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
    </button></h2><p>Milvus - это векторная база данных, которая может искать и запрашивать векторы, преобразованные из неструктурированных данных. При выполнении операций на языке манипулирования данными (DML), включая <a href="https://milvus.io/docs/v2.1.x/data_processing.md">вставку и удаление данных</a>, Milvus присваивает метки времени сущностям, участвующим в операции. Поэтому все сущности в Milvus имеют атрибут timestamp. И партии сущностей в одной операции DML имеют одно и то же значение временной метки.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">Параметры временной метки<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>При выполнении поиска или запроса векторного сходства в Milvus задействуется несколько параметров, связанных с меткой времени.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> это тип временной метки, используемый для обеспечения того, чтобы все данные, обновленные операциями DML до <code translate="no">Guarantee_timestamp</code>, были видны при выполнении поиска или запроса по векторному подобию. Например, если вы вставили партию данных в 15:00, другую партию в 17:00, а значение <code translate="no">Guarantee_timestamp</code> установлено как 18:00 во время поиска векторного подобия. Это означает, что две партии данных, вставленные в 15:00 и 17:00 соответственно, должны быть задействованы в поиске.</p>
<p>Если значение <code translate="no">Guarantee_timestamp</code> не настроено, Milvus автоматически берет момент времени, когда был сделан запрос на поиск. Поэтому поиск ведется на представлении данных, в котором все данные были обновлены операциями DML до начала поиска.</p>
<p>Чтобы избавить вас от необходимости разбираться в <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> внутри Milvus, вам, как пользователю, не нужно напрямую настраивать параметр <code translate="no">Guarantee_timestamp</code>. Вам нужно только выбрать <a href="https://milvus.io/docs/v2.1.x/consistency.md">уровень согласованности</a>, а Milvus автоматически обработает параметр <code translate="no">Guarantee_timestamp</code> для вас. Каждому уровню согласованности соответствует определенное значение <code translate="no">Guarantee_timestamp</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Гарантированный_временной метки</span>. </span></p>
<h4 id="Example" class="common-anchor-header">Пример</h4><p>Как показано на рисунке выше, значение <code translate="no">Guarantee_timestamp</code> установлено как <code translate="no">2021-08-26T18:15:00</code> (для простоты временная метка в этом примере представлена физическим временем). При выполнении поиска или запроса будут искаться или запрашиваться все данные до 2021-08-26T18:15:00.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> это тип временной метки, автоматически генерируемой и управляемой узлами запросов в Milvus. Он используется для указания того, какие операции DML выполняются узлами запросов.</p>
<p>Данные, управляемые узлами запросов, можно разделить на два типа:</p>
<ul>
<li><p>Исторические данные (или также называемые пакетными данными)</p></li>
<li><p>Инкрементные данные (или также называемые потоковыми данными).</p></li>
</ul>
<p>В Milvus необходимо загружать данные перед выполнением поиска или запроса. Поэтому пакетные данные в коллекции загружаются узлом запроса перед выполнением запроса на поиск или запрос. Однако потоковые данные вставляются в Milvus или удаляются из него на лету, что требует от узла запроса вести хронологию операций DML и запросов поиска или запроса. В результате узлы запросов используют <code translate="no">Service_timestamp</code> для хранения такой временной шкалы. <code translate="no">Service_timestamp</code> можно рассматривать как момент времени, когда определенные данные становятся видимыми, поскольку узлы запросов могут убедиться, что все операции DML до <code translate="no">Service_timestamp</code> завершены.</p>
<p>Когда поступает запрос на поиск или запрос, узел запроса сравнивает значения <code translate="no">Service_timestamp</code> и <code translate="no">Guarantee_timestamp</code>. В основном существует два сценария.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Service_Timestamp</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Сценарий 1: <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Как показано на рисунке 1, значение <code translate="no">Guarantee_timestamp</code> устанавливается как <code translate="no">2021-08-26T18:15:00</code>. Когда значение <code translate="no">Service_timestamp</code> увеличивается до <code translate="no">2021-08-26T18:15:01</code>, это означает, что все операции DML до этого момента времени выполняются и завершаются узлом запроса, включая те операции DML до времени, указанного на <code translate="no">Guarantee_timestamp</code>. В результате запрос на поиск или запрос может быть выполнен немедленно.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Сценарий 2: <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Как показано на рисунке 2, значение <code translate="no">Guarantee_timestamp</code> установлено как <code translate="no">2021-08-26T18:15:00</code>, а текущим значением <code translate="no">Service_timestamp</code> является только <code translate="no">2021-08-26T18:14:55</code>. Это означает, что выполняются и завершаются только операции DML до <code translate="no">2021-08-26T18:14:55</code>, оставляя часть операций DML после этой временной точки, но до <code translate="no">Guarantee_timestamp</code> незавершенными. Если поиск или запрос выполняется в этот момент, некоторые из требуемых данных еще не видны и недоступны, что серьезно повлияет на точность результатов поиска или запроса. Поэтому узел запроса должен отложить запрос на поиск или запрос до завершения операций DML перед <code translate="no">guarantee_timestamp</code> (т. е. когда <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>Технически говоря, <code translate="no">Graceful_time</code> - это не временная метка, а скорее период времени (например, 100 мс). Тем не менее, <code translate="no">Graceful_time</code> стоит упомянуть, поскольку он тесно связан с <code translate="no">Guarantee_timestamp</code> и <code translate="no">Service_timestamp</code>. <code translate="no">Graceful_time</code> - настраиваемый параметр в конфигурационном файле Milvus. Он используется для указания периода времени, который можно выдержать, прежде чем определенные данные станут видимыми. Короче говоря, незавершенные операции DML во время <code translate="no">Graceful_time</code> могут быть терпимы.</p>
<p>Когда поступает запрос на поиск или запрос, может быть два сценария.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Сценарий 1: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Как показано на рисунке 1, значение <code translate="no">Guarantee_timestamp</code> устанавливается как <code translate="no">2021-08-26T18:15:01</code>, а <code translate="no">Graceful_time</code> - как <code translate="no">2s</code>. Значение <code translate="no">Service_timestamp</code> увеличивается до <code translate="no">2021-08-26T18:15:00</code>. Хотя значение <code translate="no">Service_timestamp</code> все еще меньше, чем <code translate="no">Guarantee_timestamp</code>, и не все операции DML до <code translate="no">2021-08-26T18:15:01</code> завершены, период невидимости данных в 2 секунды допускается, о чем свидетельствует значение <code translate="no">Graceful_time</code>. Поэтому входящий запрос на поиск или запрос может быть выполнен немедленно.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Сценарий 2: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Как показано на рисунке 2, значение <code translate="no">Guarantee_timestamp</code> устанавливается как <code translate="no">2021-08-26T18:15:01</code>, а <code translate="no">Graceful_time</code> - как <code translate="no">2s</code>. Текущее значение <code translate="no">Service_timestamp</code> равно только <code translate="no">2021-08-26T18:14:54</code>. Это означает, что ожидаемые операции DML еще не завершены, и даже с учетом 2 секунд льготного времени невидимость данных все еще невыносима. Поэтому узел запроса должен отложить поиск или запрос до завершения определенных DML-запросов (т. е. когда <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
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
<li>Узнайте, как <a href="/docs/ru/v2.5.x/consistency.md">гарантированная временная метка обеспечивает настраиваемую согласованность в Milvus</a></li>
</ul>
