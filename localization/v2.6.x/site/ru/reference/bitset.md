---
id: bitset.md
summary: Узнайте о наборах битов в Milvus.
title: Bitset
---
<h1 id="Bitset" class="common-anchor-header">Bitset<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом разделе представлен механизм битового набора, который обеспечивает реализацию ключевых функциональных возможностей Milvus, таких как фильтрация по атрибутам и <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">операции удаления</a>.</p>
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
    </button></h2><p>Набор битов — это совокупность битов. Биты — это элементы, имеющие только два возможных значения: чаще всего <code translate="no">0</code> и <code translate="no">1</code>, либо булевы значения <code translate="no">true</code> и <code translate="no">false</code>. В Milvus наборы битов представляют собой массивы битовых чисел <code translate="no">0</code> и <code translate="no">1</code>, которые можно использовать для компактного и эффективного представления определённых данных в отличие от целых чисел (int), чисел с плавающей запятой (float) или символов (char). По умолчанию битовое число имеет значение <code translate="no">0</code> и принимает значение <code translate="no">1</code> только в том случае, если оно соответствует определённым требованиям.</p>
<p>Операции над наборами битов выполняются с использованием <a href="/docs/ru/v2.6.x/boolean.md">булевой логики</a>, в соответствии с которой выходное значение является либо действительным (valid), либо недействительным (invalid), что также обозначается как <code translate="no">1</code> и <code translate="no">0</code> соответственно. Например, <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">логический оператор</a> <code translate="no">AND</code> можно использовать для сравнения двух наборов битов по элементам в одинаковых индексных позициях; в результате формируется новый набор битов с результатами сравнения. Если два элемента в одной позиции совпадают, то в новом наборе битов в этой позиции будет записано <code translate="no">1</code>; если они различаются — <code translate="no">0</code>.</p>
<h2 id="Implementation" class="common-anchor-header">Реализация<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Набор битов — это простой, но мощный механизм, который помогает Milvus выполнять фильтрацию по атрибутам, удаление данных и запросы с помощью Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Фильтрация по атрибутам<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>Поскольку битовые наборы содержат только два возможных значения, они идеально подходят для хранения результатов <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">фильтрации</a> по <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">атрибутам</a>. Данные, соответствующие условию заданного атрибутного фильтра, помечаются как <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Удаление данных<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>Битовые наборы служат компактным способом хранения информации о том, удалена ли строка в сегменте. Удаленные сущности помечаются флагом « <code translate="no">1</code> » в соответствующем битовом наборе, который <a href="https://milvus.io/blog/deleting-data-in-milvus.md">не будет учитываться</a> при поиске или запросе.</p>
<h2 id="Examples" class="common-anchor-header">Примеры<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Здесь мы приводим три примера, иллюстрирующих использование битовых наборов в Milvus, со ссылками на все три основные реализации битовых наборов, рассмотренные выше. Во всех трех случаях имеется сегмент с 8 сущностями, после чего происходит серия событий языка манипулирования данными (DML) в порядке, указанном ниже.</p>
<ul>
<li>Четыре сущности, чьи значения « <code translate="no">primary_key</code>» составляют [1, 2, 3, 4] соответственно, вставляются, когда временная метка <code translate="no">ts</code> равна 100.</li>
<li>Остальные четыре сущности, чьи значения <code translate="no">primary_key</code>равны [5, 6, 7, 8], вставляются, когда временная метка <code translate="no">ts</code> равна 200.</li>
<li>Сущности, чьи <code translate="no">primary_key</code>равны [7, 8], удаляются, когда временная метка <code translate="no">ts</code> равна 300.</li>
<li>Только сущности, чьи значения <code translate="no">primary_key</code>равны [1, 3, 5, 7], удовлетворяют условиям фильтрации по атрибутам.</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>Порядок событий DML</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">Первый случай<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>В этом случае пользователь устанавливает значение <code translate="no">time_travel</code> равным 150, что означает, что пользователь выполняет запрос по данным, удовлетворяющим условию <code translate="no">ts = 150</code>. Процесс формирования набора битов иллюстрируется на рисунке 1.</p>
<p>На начальном этапе фильтрации значение параметра « <code translate="no">filter_bitset</code> » должно быть равно <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, где сущности [1, 3, 5, 7] помечаются как « <code translate="no">1</code> », поскольку являются допустимыми результатами фильтрации.</p>
<p>Однако сущности [5, 6, 7, 8] не были внесены в векторную базу данных, когда <code translate="no">ts</code> равен 150. Поэтому эти четыре сущности должны быть помечены как 0 независимо от условия фильтрации. Теперь результат битового набора должен выглядеть следующим образом: <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Как обсуждалось в <a href="#data-deletion">разделе «Удаление данных»</a>, сущности, помеченные флагом <code translate="no">1</code>, игнорируются при поиске или запросе. Теперь результат битового набора необходимо инвертировать, чтобы объединить его с битовой картой удаления, что даёт нам <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>Что касается битового набора удаления <code translate="no">del_bitset</code>, его начальное значение должно быть <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Однако сущности 7 и 8 не удаляются до тех пор, пока значение <code translate="no">ts</code> не станет равным 300. Поэтому, когда значение <code translate="no">ts</code> равно 150, сущности 7 и 8 по-прежнему действительны. В результате значение <code translate="no">del_bitset</code> после операции «Путешествие во времени» составляет <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Теперь у нас есть два набора битов после применения «Time Travel» и фильтрации по атрибутам: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> и <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Объединим эти два набора битов с помощью бинарного логического оператора <code translate="no">OR</code>. Конечное значение result_bitset равно <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, что означает, что на следующем этапе поиска или запроса будут обрабатываться только сущности 1 и 3.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>Рисунок 1. Поиск с параметром «Time Travel» = 150.</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">Случай 2<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>В этом случае пользователь устанавливает значение параметра « <code translate="no">time_travel</code> » равным 250. Процесс формирования набора битов иллюстрируется на рисунке 2.</p>
<p>Как и в первом случае, начальное значение параметра « <code translate="no">filter_bitset</code> » равно <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Когда <code translate="no">ts</code> = 250, все сущности находятся в векторной базе данных. Поэтому при учёте временной метки <code translate="no">filter_bitset</code> остаётся неизменным. Опять же, нам нужно инвертировать результат и получить <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Что касается набора битов удаления <code translate="no">del_bitset</code>, то его начальное значение равно <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Однако сущности 7 и 8 не были удалены до тех пор, пока <code translate="no">ts</code> не достигло значения 300. Следовательно, когда <code translate="no">ts</code> равно 250, сущности 7 и 8 по-прежнему действительны. В результате <code translate="no">del_bitset</code> после операции «Путешествие во времени» равно <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Теперь у нас есть два набора битов после применения «Time Travel» и фильтрации по атрибутам: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> и <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Объединим эти два набора битов с помощью бинарного логического оператора <code translate="no">OR</code>. Результирующий набор битов (result_bitset) равен <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. То есть на следующем этапе поиска или запроса будут обрабатываться только сущности [1, 3, 5, 7].</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>Рисунок 2. Поиск с параметром «Time Travel» = 250.</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">Случай 3<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>В этом случае пользователь устанавливает значение параметра « <code translate="no">time_travel</code> » равным 350. Процесс формирования набора битов иллюстрируется на рисунке 3.</p>
<p>Как и в предыдущих случаях, начальное значение параметра « <code translate="no">filter_bitset</code> » составляет <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Когда <code translate="no">ts</code>= 350, все сущности находятся в векторной базе данных. Следовательно, окончательный, инвертированный набор <code translate="no">filter_bitset</code> равен <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, то есть такой же, как и во втором случае.</p>
<p>Что касается набора битов удаления <code translate="no">del_bitset</code>, то, поскольку сущности 7 и 8 уже были удалены при <code translate="no">ts = 350</code>, результат <code translate="no">del_bitset</code> равен <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Теперь у нас есть два набора битов после «путешествия во времени» и фильтрации по атрибутам: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> и <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Объединим эти два набора битов с помощью бинарного логического оператора « <code translate="no">OR</code> ». Итоговый набор битов <code translate="no">result_bitset</code> равен <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. То есть на следующем этапе поиска или запроса будут обрабатываться только сущности [1, 3, 5].</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>Рисунок 3. Поиск с параметром «Time Travel» = 350.</span>
  
 </span></p>
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
    </button></h2><p>Теперь, когда вы знаете, как работают битовые наборы в Milvus, вам также может быть интересно:</p>
<ul>
<li>Узнать, как <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">использовать строки для фильтрации</a> результатов поиска, или ознакомиться с <a href="https://milvus.io/docs/hybridsearch.md">разделом «Гибридный поиск»</a> в нашей документации.</li>
<li>Понять, <a href="https://milvus.io/docs/v2.1.x/data_processing.md">как обрабатываются данные</a> в Milvus.</li>
</ul>
