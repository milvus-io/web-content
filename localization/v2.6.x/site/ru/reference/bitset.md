---
id: bitset.md
summary: Узнайте о наборах битов в Milvus.
title: Биты
---
<h1 id="Bitset" class="common-anchor-header">Биты<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме рассказывается о механизме битовых наборов, который позволяет реализовать в Milvus такие ключевые функции, как фильтрация атрибутов и <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">операции удаления</a>.</p>
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
    </button></h2><p>Набор битов - это набор битов. Биты - это элементы, имеющие только два возможных значения, чаще всего <code translate="no">0</code> и <code translate="no">1</code>, или булевы значения <code translate="no">true</code> и <code translate="no">false</code>. В Milvus наборы битов - это массивы битовых чисел <code translate="no">0</code> и <code translate="no">1</code>, которые могут использоваться для компактного и эффективного представления определенных данных, в отличие от интов, плавающих чисел или символов. По умолчанию битовое число имеет значение <code translate="no">0</code> и устанавливается в значение <code translate="no">1</code> только в том случае, если оно удовлетворяет определенным требованиям.</p>
<p>Операции над наборами битов выполняются с помощью <a href="/docs/ru/boolean.md">булевой логики</a>, в соответствии с которой выходное значение является либо допустимым, либо недопустимым, также обозначаемым <code translate="no">1</code> и <code translate="no">0</code> соответственно. Например, <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">логический оператор</a> <code translate="no">AND</code> может использоваться для сравнения двух битовых наборов, основанных на элементах в одинаковых индексных позициях, и выдает новый битовый набор с результатами. Если два элемента в позиции одинаковы, то в новом битовом наборе в этой позиции будет записан <code translate="no">1</code>, если различны - <code translate="no">0</code>.</p>
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
    </button></h2><p>Биты - это простой, но мощный механизм, который помогает Milvus выполнять фильтрацию атрибутов, удаление данных и запросы с помощью Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Фильтрация атрибутов</h3><p>Поскольку битовые наборы содержат только два возможных значения, они идеально подходят для хранения результатов <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">фильтрации атрибутов</a>. Данные, удовлетворяющие требованиям заданного фильтра атрибутов, помечаются <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Удаление данных</h3><p>Битовые наборы служат компактным способом хранения информации о том, удалена ли строка в сегменте. Удаленные сущности помечаются <code translate="no">1</code> в соответствующем битовом наборе, который <a href="https://milvus.io/blog/deleting-data-in-milvus.md">не будет вычисляться</a> во время поиска или запроса.</p>
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
    </button></h2><p>Здесь мы приводим три примера, иллюстрирующие использование битовых наборов в Milvus, со ссылками на все три основные реализации битовых наборов, рассмотренные выше. Во всех трех случаях имеется сегмент с 8 сущностями, а затем происходит серия событий языка манипулирования данными (DML) в порядке, показанном ниже.</p>
<ul>
<li>Четыре сущности, чьи <code translate="no">primary_key</code>s равны [1, 2, 3, 4] соответственно, вставляются, когда временная метка <code translate="no">ts</code> равна 100.</li>
<li>Остальные четыре сущности, чьи <code translate="no">primary_key</code>s равны [5, 6, 7, 8], вставляются, когда временная метка <code translate="no">ts</code> равна 200.</li>
<li>Сущности, чьи <code translate="no">primary_key</code>s равны [7, 8], удаляются, когда временная метка <code translate="no">ts</code> равна 300.</li>
<li>Условиям фильтрации атрибутов удовлетворяют только сущности, чьи <code translate="no">primary_key</code>s равны [1, 3, 5, 7].</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>Порядок событий DML</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">Случай первый</h3><p>В этом случае пользователь задает <code translate="no">time_travel</code> равным 150, что означает, что он выполняет запрос к данным, удовлетворяющим <code translate="no">ts = 150</code>. Процесс формирования набора битов показан на рисунке 1.</p>
<p>На начальном этапе фильтрации <code translate="no">filter_bitset</code> должен быть <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, где сущности [1, 3, 5, 7] отмечены как <code translate="no">1</code>, поскольку они являются действительными результатами фильтрации.</p>
<p>Однако сущности [4, 5, 6, 7] не были вставлены в базу данных векторов, когда <code translate="no">ts</code> равнялся 150. Поэтому эти четыре сущности должны быть помечены как 0 независимо от условия фильтрации. Теперь результат набора битов должен быть <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Как обсуждалось в разделе <a href="#data-deletion">"Удаление данных"</a>, сущности, помеченные <code translate="no">1</code>, игнорируются при поиске или запросе. Теперь результат набора битов нужно перевернуть, чтобы объединить с битовой картой удаления, что дает нам <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>Что касается битового набора удаления <code translate="no">del_bitset</code>, то его начальным значением должно быть <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Однако сущности 7 и 8 не удаляются до тех пор, пока <code translate="no">ts</code> не станет равным 300. Поэтому, когда <code translate="no">ts</code> равно 150, сущности 7 и 8 все еще действительны. В результате значение <code translate="no">del_bitset</code> после путешествия во времени равно <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Теперь у нас есть два набора битов после Путешествия во времени и фильтрации атрибутов: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> и <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Объединим эти два набора битов с помощью оператора двоичной логики <code translate="no">OR</code>. Конечное значение result_bitset равно <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, что означает, что на следующем этапе поиска или запроса будут вычислены только сущности 1 и 3.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>Рисунок 1. Поиск с перемещением во времени = 150</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">Случай второй</h3><p>В этом случае пользователь задает <code translate="no">time_travel</code> равным 250. Процесс генерации набора битов показан на рисунке 2.</p>
<p>Как и в первом случае, начальным <code translate="no">filter_bitset</code> является <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Все сущности находятся в базе данных вектора, когда <code translate="no">ts</code> = 250. Таким образом, <code translate="no">filter_bitset</code> остается неизменным, когда мы учитываем временную метку. Снова нужно перевернуть результат и получить <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Что касается набора битов удаления <code translate="no">del_bitset</code>, то его начальное значение - <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Однако сущности 7 и 8 не были удалены до тех пор, пока <code translate="no">ts</code> не станет равным 300. Поэтому, когда <code translate="no">ts</code> равно 250, сущности 7 и 8 все еще действительны. В результате после путешествия во времени <code translate="no">del_bitset</code> будет <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Теперь у нас есть два набора битов после Путешествия во времени и фильтрации атрибутов: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> и <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Объединим эти два набора битов с помощью оператора двоичной логики <code translate="no">OR</code>. Результат_битового набора - <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Иными словами, на следующем этапе поиска или запроса будут вычислены только энтитеты [1, 3, 5, 7].</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>Рисунок 2. Поиск с временным перемещением = 250</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">Третий случай</h3><p>В этом случае пользователь задает <code translate="no">time_travel</code> равным 350. Процесс генерации набора битов проиллюстрирован на рисунке 3.</p>
<p>Как и в предыдущих случаях, начальным <code translate="no">filter_bitset</code> является <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Все сущности находятся в базе данных вектора, когда <code translate="no">ts</code>= 350. Поэтому конечный, перевернутый <code translate="no">filter_bitset</code> - это <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, как и во втором случае.</p>
<p>Что касается битового набора удаления <code translate="no">del_bitset</code>, то поскольку сущности 7 и 8 уже были удалены при <code translate="no">ts = 350</code>, поэтому результатом <code translate="no">del_bitset</code> будет <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Теперь у нас есть два набора битов после путешествия во времени и фильтрации атрибутов: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> и <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Объединим эти два набора битов с помощью оператора двоичной логики <code translate="no">OR</code>. Конечный <code translate="no">result_bitset</code> - это <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Иными словами, на следующем этапе поиска или запроса будут вычислены только сущности [1, 3, 5].</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>Рисунок 3. Поиск с перемещением во времени = 350</span>. </span></p>
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
    </button></h2><p>Теперь, когда вы знаете, как работают битовые наборы в Milvus, вы также можете захотеть:</p>
<ul>
<li>Узнать, как <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">использовать строки для фильтрации</a> результатов поиска, или обратиться к разделу <a href="https://milvus.io/docs/hybridsearch.md">"Гибридный поиск"</a> в нашей документации.</li>
<li>Понять <a href="https://milvus.io/docs/v2.1.x/data_processing.md">, как обрабатываются данные</a> в Milvus.</li>
</ul>
