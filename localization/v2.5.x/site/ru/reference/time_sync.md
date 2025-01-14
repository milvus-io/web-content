---
id: time_sync.md
title: Синхронизация времени
summary: Узнайте о системе синхронизации времени в Milvus.
---
<h1 id="Time-Synchronization" class="common-anchor-header">Синхронизация времени<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается механизм синхронизации времени в Milvus.</p>
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
    </button></h2><p>События в Milvus можно разделить на два типа:</p>
<ul>
<li><p>События языка определения данных (DDL): создание/удаление коллекции, создание/удаление раздела и т. д.</p></li>
<li><p>События языка манипулирования данными (DML): вставка, поиск и т. д.</p></li>
</ul>
<p>Любое событие, независимо от того, DDL оно или DML, помечается временной меткой, которая может указать, когда это событие произошло.</p>
<p>Предположим, есть два пользователя, которые инициируют серию событий DML и DDL в Milvus в порядке, показанном в следующей таблице.</p>
<table>
<thead>
<tr><th style="text-align:center">Временная метка</th><th style="text-align:center">Пользователь 1</th><th style="text-align:center">Пользователь 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">Создал коллекцию с именем <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">Выполнили поиск по коллекции <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">Вставил данные <code translate="no">A1</code> в коллекцию <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">Выполнен поиск по коллекции <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">Вставил данные <code translate="no">A2</code> в коллекцию <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">Выполнил поиск по коллекции <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">Удалены данные <code translate="no">A1</code> из коллекции <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">Выполнен поиск по коллекции <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>В идеале пользователь 2 должен видеть:</p>
<ul>
<li><p>Пустую коллекцию <code translate="no">C0</code> по адресу <code translate="no">t2</code>.</p></li>
<li><p>Данные <code translate="no">A1</code> на <code translate="no">t7</code>.</p></li>
<li><p>Оба данных <code translate="no">A1</code> и <code translate="no">A2</code> на <code translate="no">t12</code>.</p></li>
<li><p>Только данные <code translate="no">A2</code> по адресу <code translate="no">t17</code> (поскольку данные <code translate="no">A1</code> были удалены из коллекции до этого момента).</p></li>
</ul>
<p>Этот идеальный сценарий может быть легко реализован при наличии только одного узла. Однако Milvus - это распределенная векторная база данных, и чтобы обеспечить порядок выполнения всех операций DML и DDL на разных узлах, Milvus необходимо решить следующие две проблемы:</p>
<ol>
<li><p>В приведенном примере для двух пользователей, находящихся на разных узлах, часы времени отличаются. Например, если пользователь 2 отстает от пользователя 1 на 24 часа, все операции пользователя 1 будут видны пользователю 2 только на следующий день.</p></li>
<li><p>Может существовать сетевая задержка. Если пользователь 2 выполняет поиск в коллекции <code translate="no">C0</code> по адресу <code translate="no">t17</code>, Milvus должен гарантировать, что все операции до <code translate="no">t17</code> будут успешно обработаны и завершены. Если операция удаления на <code translate="no">t15</code> задерживается из-за сетевых задержек, велика вероятность того, что пользователь 2 все еще может увидеть предположительно удаленные данные <code translate="no">A1</code> при поиске на <code translate="no">t17</code>.</p></li>
</ol>
<p>Поэтому для решения этих проблем в Milvus используется система синхронизации времени (timetick).</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">Оракул временных меток (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>Для решения первой проблемы, упомянутой в предыдущем разделе, Milvus, как и другие распределенные системы, предоставляет сервис оракула временных меток (TSO). Это означает, что все события в Milvus должны получать временную метку от TSO, а не от локальных часов.</p>
<p>Служба TSO предоставляется корневым координатором в Milvus. Клиенты могут выделять одну или несколько временных меток в одном запросе на выделение временной метки.</p>
<p>Временная метка TSO - это тип значения <code translate="no">uint64</code>, состоящий из физической и логической частей. На рисунке ниже показан формат временной метки.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>Как показано на рисунке, 46 бит в начале - это физическая часть, а именно время UTC в миллисекундах. Последние 18 бит - это логическая часть.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">Система синхронизации времени (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе на примере операции вставки данных объясняется механизм синхронизации времени в Milvus.</p>
<p>Когда прокси получает запрос на вставку данных от SDK, он делит сообщения вставки на различные потоки сообщений (<code translate="no">MsgStream</code>) в соответствии с хэш-значением первичных ключей.</p>
<p>Каждому сообщению вставки (<code translate="no">InsertMsg</code>) присваивается временная метка перед отправкой на <code translate="no">MsgStream</code>.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> является оберткой очереди сообщений, которая в Milvus 2.0 по умолчанию является Pulsar.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>Один из общих принципов заключается в том, что в <code translate="no">MsgStream</code>, временные метки<code translate="no">InsertMsgs</code> от одного и того же прокси должны быть инкрементными. Однако для <code translate="no">InsertMsgs</code> от разных прокси такого правила не существует.</p>
<p>На следующем рисунке приведен пример <code translate="no">InsertMsgs</code> в фрагменте <code translate="no">MsgStream</code>. Фрагмент содержит пять <code translate="no">InsertMsgs</code>, три из которых взяты с <code translate="no">Proxy1</code>, а остальные - с <code translate="no">Proxy2</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>Временные метки трех <code translate="no">InsertMsgs</code> из <code translate="no">Proxy1</code> инкрементны, как и двух <code translate="no">InsertMsgs</code> из <code translate="no">Proxy2</code>. Однако среди <code translate="no">Proxy1</code> и <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> нет определенного порядка.</p>
<p>Один из возможных сценариев заключается в том, что при чтении сообщения с временной меткой <code translate="no">110</code> с <code translate="no">Proxy2</code> Milvus обнаруживает, что сообщение с временной меткой <code translate="no">80</code> с <code translate="no">Proxy1</code> все еще находится в <code translate="no">MsgStream</code>. Поэтому Milvus вводит систему синхронизации времени, timetick, чтобы гарантировать, что при чтении сообщения с <code translate="no">MsgStream</code> все сообщения с меньшими значениями временных меток должны быть потреблены.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>синхронизация по времени</span> </span></p>
<p>Как показано на рисунке выше,</p>
<ul>
<li><p>Каждый прокси периодически (по умолчанию каждые 200 мс) сообщает корневой коорд наибольшее значение временной метки последнего сообщения <code translate="no">InsertMsg</code> в <code translate="no">MsgStream</code>.</p></li>
<li><p>Корневой коорд определяет минимальное значение временной метки на этом <code translate="no">Msgstream</code>, независимо от того, какому прокси принадлежит <code translate="no">InsertMsgs</code>. Затем корневой коорд вставляет эту минимальную временную метку в <code translate="no">Msgstream</code>. Эта временная метка также называется timetick.</p></li>
<li><p>Когда компоненты-потребители читают timetick, вставленный root coord, они понимают, что все сообщения вставки с меньшими значениями timestamp были потреблены. Поэтому соответствующие запросы могут быть выполнены безопасно, не прерывая выполнение заказа.</p></li>
</ul>
<p>На следующем рисунке приведен пример <code translate="no">Msgstream</code> со вставленным таймстиком.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>временная метка</span> </span></p>
<p><code translate="no">MsgStream</code> обрабатывает сообщения партиями в соответствии с временным тиком, чтобы выходные сообщения соответствовали требованиям временной метки. В приведенном выше примере все записи, кроме <code translate="no">InsertMsgs</code>, из <code translate="no">Proxy2</code> будут обработаны по адресу <code translate="no">Timestamp: 120</code>, так как они находятся после последнего тика времени.</p>
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
<li>Узнайте о концепции <a href="/docs/ru/timestamp.md">временной метки</a>.</li>
<li>Узнайте о <a href="/docs/ru/data_processing.md">рабочем процессе обработки данных</a> в Milvus.</li>
</ul>
