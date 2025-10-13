---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  Вместо того чтобы полагаться исключительно на семантическое сходство,
  рассчитываемое на основе векторных расстояний, Boost Rankers позволяет вам
  оказывать значимое влияние на результаты поиска. Они идеально подходят для
  быстрой корректировки результатов поиска с помощью фильтрации метаданных.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Boost Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Вместо того чтобы полагаться исключительно на семантическое сходство, рассчитываемое на основе векторных расстояний, Boost Ranker позволяет влиять на результаты поиска значимым образом. Они идеально подходят для быстрой корректировки результатов поиска с помощью фильтрации метаданных.</p>
<p>Когда поисковый запрос включает функцию Boost Ranker, Milvus использует необязательное условие фильтрации в функции для поиска совпадений среди кандидатов на получение результатов поиска и повышает оценки этих совпадений, применяя указанный вес, что помогает повысить или понизить рейтинг сопоставленных сущностей в итоговом результате.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Когда использовать Boost Ranker<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>В отличие от других ранжировщиков, которые полагаются на кросс-кодировочные модели или алгоритмы слияния, Boost Ranker напрямую внедряет необязательные правила, управляемые метаданными, в процесс ранжирования, что делает его более подходящим для следующих сценариев.</p>
<table>
   <tr>
     <th><p>Пример использования</p></th>
     <th><p>Примеры</p></th>
     <th><p>Почему Boost Ranker хорошо работает</p></th>
   </tr>
   <tr>
     <td><p>Приоритизация контента, ориентированная на бизнес</p></td>
     <td><ul><li><p>Выделение премиум-продуктов в результатах поиска электронной коммерции</p></li><li><p>Повышение видимости контента с высокими показателями вовлеченности пользователей (например, просмотры, лайки и акции)</p></li><li><p>Повышение значимости недавнего контента в поисковых приложениях, чувствительных к времени</p></li><li><p>Приоритет контента из проверенных или надежных источников</p></li><li><p>Повышение результатов, соответствующих точным фразам или высокорелевантным ключевым словам.</p></li></ul></td>
     <td rowspan="2"><p>Без необходимости перестраивать индексы или изменять модели встраивания векторов - операции, которые могут отнимать много времени, - вы можете мгновенно повышать или понижать позиции определенных элементов в результатах поиска, применяя дополнительные фильтры метаданных в режиме реального времени. Этот механизм обеспечивает гибкое, динамическое ранжирование поиска, которое легко адаптируется к изменяющимся требованиям бизнеса.</p></td>
   </tr>
   <tr>
     <td><p>Стратегическое понижение рейтинга контента</p></td>
     <td><ul><li><p>Снижение значимости элементов с низким уровнем запасов без их полного удаления</p></li><li><p>Снижение рейтинга контента с потенциально неприемлемыми терминами без цензуры</p></li><li><p>Снижение рейтинга старой документации, сохраняя ее доступность в техническом поиске</p></li><li><p>Незаметное снижение видимости продуктов конкурентов при поиске на рынке</p></li><li><p>Снижение релевантности контента с более низкими показателями качества (например, проблемы с форматированием, меньшая длина и т. д.).</p></li></ul></td>
   </tr>
</table>
<p>Вы также можете объединить несколько Boost Ranker для реализации более динамичной и надежной стратегии ранжирования на основе веса.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Механизм работы Boost Ranker<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Следующая схема иллюстрирует основной рабочий процесс Boost Rankers.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>Механизм работы Boost Ranker</span> </span></p>
<p>Когда вы вставляете данные, Milvus распределяет их по сегментам. Во время поиска каждый сегмент возвращает набор кандидатов, а Milvus ранжирует их по всем сегментам, чтобы получить окончательные результаты. Если поисковый запрос включает Boost Ranker, Milvus применяет его к результатам кандидатов из каждого сегмента, чтобы предотвратить потенциальную потерю точности и улучшить запоминание.</p>
<p>Перед окончательной обработкой результатов Milvus обрабатывает эти кандидаты с помощью Boost Ranker следующим образом:</p>
<ol>
<li><p>Применяет необязательное выражение фильтрации, указанное в Boost Ranker, чтобы определить сущности, соответствующие выражению.</p></li>
<li><p>Применяет вес, указанный в Boost Ranker, чтобы повысить баллы идентифицированных сущностей.</p></li>
</ol>
<div class="alert note">
<p>Вы не можете использовать Boost Ranker в качестве ранжирующего элемента в многовекторном гибридном поиске. Однако его можно использовать в качестве ранжирующего элемента в любом из подзапросов (<code translate="no">AnnSearchRequest</code>).</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Примеры использования Boost Ranker<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Следующий пример иллюстрирует использование Boost Ranker в одновекторном поиске, который требует возврата пяти наиболее релевантных сущностей и добавления весов к оценкам сущностей с абстрактным типом doc.</p>
<ol>
<li><p><strong>Соберите кандидатов на результаты поиска в сегменты.</strong></p>
<p>В следующей таблице предполагается, что Milvus распределяет сущности по двум сегментам<strong>(0001</strong> и <strong>0002</strong>), и каждый сегмент возвращает пять кандидатов.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>Оценка</p></th>
<th><p>Ранг</p></th>
<th><p>сегмент</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>абстрактный</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>реферат</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>тело</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>заголовок</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>тело</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>тело</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>тело</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>абстрактный</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>реферат</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>реферат</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Примените выражение фильтрации, указанное в Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Как обозначено полем <code translate="no">DocType</code> в следующей таблице, Milvus отметит для дальнейшей обработки все сущности, у которых <code translate="no">doctype</code> установлен на <code translate="no">abstract</code>.</p>
<p><table>
<tr>
<th><p>ИДЕНТИФИКАТОР</p></th>
<th><p>DocType</p></th>
<th><p>Оценка</p></th>
<th><p>Ранг</p></th>
<th><p>сегмент</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>тело</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>заголовок</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>тело</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>тело</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>тело</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Примените вес, указанный в Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Все сущности, идентифицированные на предыдущем шаге, будут умножены на вес, указанный в Boost Ranker, что приведет к изменению их рангов.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>Балл</p></th>
<th><p>Взвешенный балл </p><p>(= балл x вес)</p></th>
<th><p>Ранг</p></th>
<th><p>сегмент</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>тело</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>название</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>тело</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>тело</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>тело</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>Вес должен быть выбранным вами числом с плавающей точкой. В случаях, подобных приведенному выше, когда меньший балл указывает на большую значимость, используйте вес меньше <strong>1</strong>. В противном случае используйте вес больше <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Для получения окончательных результатов объедините кандидатов из всех сегментов на основе взвешенных оценок.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>Оценка</p></th>
<th><p>Взвешенный балл</p></th>
<th><p>Ранг</p></th>
<th><p>сегмент</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>тело</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>абстрактный</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Использование Boost Ranker<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе вы увидите примеры использования Boost Ranker для влияния на результаты одновекторного поиска.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Создание Boost Ranker<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Прежде чем передавать Boost Ranker в качестве ранжировщика поискового запроса, необходимо правильно определить Boost Ranker как функцию ранжирования следующим образом:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: { 
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Требуется?</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение/пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Да</p></td>
     <td><p>Уникальный идентификатор для данной функции</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Да</p></td>
     <td><p>Список векторных полей, к которым следует применить функцию (должен быть пустым для RRF Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Да</p></td>
     <td><p>Тип вызываемой функции; используйте <code translate="no">RERANK</code> для указания стратегии ранжирования.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Да</p></td>
     <td><p>Определяет тип ранжировщика.</p><p>Должно быть установлено значение <code translate="no">boost</code> для использования Boost Ranker.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает вес, который будет умножен на оценки всех совпадающих сущностей в необработанных результатах поиска.</p><p>Значение должно быть числом с плавающей точкой. </p><ul><li><p>Чтобы подчеркнуть важность совпадающих сущностей, установите значение, повышающее их оценки.</p></li><li><p>Чтобы понизить значимость совпадающих сущностей, присвойте этому параметру значение, понижающее их оценки.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Указывает выражение фильтра, которое будет использоваться для сопоставления сущностей в результатах поиска. Это может быть любое действительное базовое выражение фильтра, описанное в разделе <a href="/docs/ru/boolean.md">"Объяснение фильтрации</a>".</p><p><strong>Примечание</strong>: Используйте только базовые операторы, такие как <code translate="no">==</code>, <code translate="no">&gt;</code> или <code translate="no">&lt;</code>. Использование расширенных операторов, таких как <code translate="no">text_match</code> или <code translate="no">phrase_match</code>, приведет к снижению производительности поиска.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Указывает функцию random, которая случайным образом генерирует значение между <code translate="no">0</code> и <code translate="no">1</code>. Она имеет следующие два необязательных аргумента:</p><ul><li><p><code translate="no">seed</code> (number) Задает начальное значение, используемое для запуска генератора псевдослучайных чисел (ГПСЧ).</p></li><li><p><code translate="no">field</code> (string) Указывает имя поля, значение которого будет использоваться в качестве случайного фактора при генерации случайного числа. Достаточно поля с уникальными значениями.</p><p>Рекомендуется задать оба значения <code translate="no">seed</code> и <code translate="no">field</code>, чтобы обеспечить согласованность поколений, используя одни и те же значения семян и полей.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">Поиск с помощью одного Boost Ranker<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Когда функция Boost Ranker готова, вы можете ссылаться на нее в поисковом запросе. В следующем примере предполагается, что вы уже создали коллекцию со следующими полями: <strong>id</strong>, <strong>vector</strong> и <strong>doctype</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Поиск с помощью нескольких Boost Ranker<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы можете объединить несколько Boost Rankers в одном поиске, чтобы повлиять на результаты поиска. Для этого создайте несколько Boost Rankers, ссылайтесь на них в экземпляре <strong>FunctionScore</strong> и используйте экземпляр <strong>FunctionScore</strong> в качестве ранжирующего элемента в поисковом запросе.</p>
<p>В следующем примере показано, как изменить оценки всех идентифицированных сущностей, применив вес между <strong>0,8</strong> и <strong>1,2</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker, 
        random_weight_ranker
    ],
    params: {
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<p>В частности, есть два ранжировщика Boost: один применяет фиксированный вес ко всем найденным сущностям, а другой присваивает им случайный вес. Затем мы ссылаемся на эти два ранжировщика в <strong>функции FunctionScore</strong>, которая также определяет, как веса влияют на оценки найденных сущностей.</p>
<p>В следующей таблице перечислены параметры, необходимые для создания экземпляра <strong>FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Требуется?</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение/пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает имена целевых ранжиров в списке.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Указывает, как указанные веса влияют на оценки всех совпадающих сущностей.</p><p>Возможные значения:</p><ul><li><p><code translate="no">Multiple</code></p><p>Указывает, что взвешенное значение равно исходному баллу совпадающей сущности, умноженному на указанный вес. </p><p>Это значение по умолчанию.</p></li><li><p><code translate="no">Sum</code></p><p>Указывает, что взвешенное значение равно сумме исходного балла совпадающей сущности и указанного веса.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Указывает, как обрабатываются взвешенные значения из различных Boost Rankers.</p><p>Возможные значения:</p><ul><li><p><code translate="no">Multiplify</code></p><p>Указывает, что итоговая оценка совпадающего объекта равна произведению взвешенных значений всех Boost Rankers.</p><p>Это значение по умолчанию.</p></li><li><p><code translate="no">Sum</code></p><p>Указывает, что итоговая оценка совпадающего объекта равна сумме взвешенных значений всех Boost Rankers.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
