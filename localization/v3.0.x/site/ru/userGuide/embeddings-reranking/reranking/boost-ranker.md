---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  Вместо того чтобы полагаться исключительно на семантическое сходство,
  рассчитанное на основе векторных расстояний, алгоритмы Boost Rankers позволяют
  существенно влиять на результаты поиска. Это идеальное решение для быстрой
  настройки результатов поиска с помощью фильтрации по метаданным.
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
    </button></h1><p>Вместо того чтобы полагаться исключительно на семантическое сходство, рассчитанное на основе векторных расстояний, функции Boost Ranker позволяют существенно влиять на результаты поиска. Это идеальный инструмент для быстрой настройки результатов поиска с помощью фильтрации по метаданным.</p>
<p>Когда поисковый запрос содержит функцию Boost Ranker, Milvus использует дополнительное условие фильтрации внутри этой функции для поиска совпадений среди кандидатов в результатах поиска и повышает оценки этих совпадений путем применения указанного веса, что помогает повысить или понизить рейтинг найденных объектов в окончательном результате.</p>
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
    </button></h2><p>В отличие от других ранжеров, основанных на межкодировочных моделях или алгоритмах слияния, Boost Ranker напрямую внедряет дополнительные правила, основанные на метаданных, в процесс ранжирования, что делает его более подходящим для следующих сценариев.</p>
<table>
   <tr>
     <th><p>Пример использования</p></th>
     <th><p>Примеры</p></th>
     <th><p>Почему Boost Ranker работает эффективно</p></th>
   </tr>
   <tr>
     <td><p>Приоритезация контента с учетом бизнес-целей</p></td>
     <td><ul><li><p>Выделение премиальных товаров в результатах поиска в электронной коммерции</p></li><li><p>Повышение видимости контента с высокими показателями вовлеченности пользователей (такими как просмотры, лайки и репосты)</p></li><li><p>Повышение релевантности свежих материалов в поисковых системах, где важна актуальность</p></li><li><p>Приоритезация контента из проверенных или надежных источников</p></li><li><p>Повышение позиций результатов, соответствующих точным фразам или ключевым словам с высокой релевантностью</p></li></ul></td>
     <td rowspan="2"><p>Без необходимости перестроения индексов или модификации моделей векторного вложения — операций, которые могут быть трудоемкими — вы можете мгновенно повышать или понижать рейтинг определенных элементов в результатах поиска, применяя дополнительные фильтры метаданных в режиме реального времени. Этот механизм обеспечивает гибкое и динамичное ранжирование результатов поиска, которое легко адаптируется к меняющимся бизнес-требованиям.</p></td>
   </tr>
   <tr>
     <td><p>Стратегическое понижение рейтинга контента</p></td>
     <td><ul><li><p>Снижение видимости элементов с небольшим запасом, без их полного удаления</p></li><li><p>Понижение ранга контента, содержащего потенциально спорные термины, без цензуры</p></li><li><p>Понижение рейтинга устаревшей документации при сохранении доступа к ней в техническом поиске</p></li><li><p>Незаметное снижение видимости продуктов конкурентов в поиске на торговых площадках</p></li><li><p>Снижение релевантности контента с признаками более низкого качества (такими как проблемы с форматированием, меньший объем и т. д.)</p></li></ul></td>
   </tr>
</table>
<p>Вы также можете комбинировать несколько модулей Boost Ranker для реализации более динамичной и надежной стратегии ранжирования на основе весовых коэффициентов.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Механизм работы «Boost Ranker»<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>На приведенной ниже схеме показан основной рабочий процесс «Boost Rankers».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" /> 
   <span>Механизм работы «Boost Ranker</span> </span>» <span class="img-wrapper">
  
 </span></p>
<p>При вводе данных Milvus распределяет их по сегментам. Во время поиска каждый сегмент возвращает набор кандидатов, и Milvus ранжирует этих кандидатов из всех сегментов для формирования окончательных результатов. Если поисковый запрос включает «Boost Ranker», Milvus применяет его к кандидатам из каждого сегмента, чтобы предотвратить потенциальную потерю точности и повысить полноту поиска.</p>
<p>Перед окончательной обработкой результатов Milvus обрабатывает эти кандидаты с помощью Boost Ranker следующим образом:</p>
<ol>
<li><p>Применяет опциональное выражение фильтрации, указанное в Boost Ranker, для выявления сущностей, соответствующих этому выражению.</p></li>
<li><p>Применяет вес, указанный в Boost Ranker, для повышения оценок идентифицированных объектов.</p></li>
</ol>
<div class="alert note">
<p>Нельзя использовать «Boost Ranker» в качестве рангера в гибридном поиске с несколькими векторами. Однако его можно использовать в качестве рангера в любом из его подзапросов (<code translate="no">AnnSearchRequest</code>).</p>
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
    </button></h2><p>Следующий пример иллюстрирует использование Boost Ranker в одновекторном поиске, требующем возврата пяти наиболее релевантных сущностей и присвоения весов оценкам сущностей с абстрактным типом документа.</p>
<ol>
<li><p><strong>Сбор кандидатов в результаты поиска по сегментам.</strong></p>
<p>В приведённой ниже таблице предполагается, что Milvus распределяет сущности по двум сегментам (<strong>0001</strong> и <strong>0002</strong>), причём каждый сегмент возвращает пять кандидатов.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Тип документа</p></th>
<th><p>Оценка</p></th>
<th><p>Ранг</p></th>
<th><p>сегмент</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>Аннотация</p></td>
<td><p>0,344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>реферат</p></td>
<td><p>0,456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>основной текст</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>заголовок</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>тело</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>корпус</p></td>
<td><p>0,189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>корпус</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>реферат</p></td>
<td><p>0,366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>абстракт</p></td>
<td><p>0,444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>абстракт</p></td>
<td><p>0,845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Применить выражение фильтрации, указанное в Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Как указано в поле « <code translate="no">DocType</code> » в приведенной ниже таблице, Milvus пометит все сущности, у которых поле « <code translate="no">doctype</code> » установлено в значение « <code translate="no">abstract</code> », для дальнейшей обработки.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Тип документа</p></th>
<th><p>Оценка</p></th>
<th><p>Ранг</p></th>
<th><p>сегмент</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>Аннотация</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>абстракт</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>основной текст</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>заголовок</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>тело</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>корпус</p></td>
<td><p>0,189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>корпус</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>абстракт</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>абстракт</strong></p></td>
<td><p><strong>0,845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Применить вес, указанный в Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Все сущности, идентифицированные на предыдущем шаге, будут умножены на вес, указанный в Boost Ranker, что приведет к изменению их рангов.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Тип документа</p></th>
<th><p>Оценка</p></th>
<th><p>Взвешенный балл </p><p>(= оценка × вес)</p></th>
<th><p>Ранг</p></th>
<th><p>сегмент</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>0,172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>0,228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>корпус</p></td>
<td><p>0,578</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>заголовок</p></td>
<td><p>0,788</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>корпус</p></td>
<td><p>0,899</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>0,183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>корпус</p></td>
<td><p>0,189</p></td>
<td><p>0,189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>0,222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>корпус</p></td>
<td><p>0,265</p></td>
<td><p>0,265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,845</strong></p></td>
<td><p><strong>0,423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>Весовой коэффициент должен быть числом с плавающей запятой, которое вы выбираете самостоятельно. В случаях, подобных приведенному выше примеру, когда меньший балл указывает на более высокую релевантность, используйте весовой коэффициент меньше <strong>1</strong>. В противном случае используйте весовой коэффициент больше <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Обобщите кандидатов из всех сегментов на основе взвешенных оценок, чтобы окончательно сформировать результаты.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Тип документа</p></th>
<th><p>Оценка</p></th>
<th><p>Взвешенный балл</p></th>
<th><p>Ранг</p></th>
<th><p>сегмент</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>Аннотация</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>0,172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>0,183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>корпус</p></td>
<td><p>0,189</p></td>
<td><p>0,189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>0,222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>реферат</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>0,228</strong></p></td>
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
    </button></h2><p>В этом разделе вы увидите примеры того, как использовать Boost Ranker для влияния на результаты поиска по одному вектору.</p>
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
    </button></h3><p>Прежде чем передать Boost Ranker в качестве функции переранжирования поискового запроса, необходимо правильно определить Boost Ranker в качестве функции переранжирования следующим образом:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BoostRanker;

<span class="hljs-type">BoostRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> BoostRanker.builder()
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .filter(<span class="hljs-string">&quot;doctype == \&quot;abstract\&quot;&quot;</span>)
        .weight(<span class="hljs-number">0.5f</span>)
        .randomScoreField(<span class="hljs-string">&quot;id&quot;</span>)
        .randomScoreSeed(<span class="hljs-number">126L</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFilter</span>(<span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.5</span>);
<span class="hljs-comment">// Note: SetRandomScoreField()/SetRandomScoreSeed() are not usable as of</span>
<span class="hljs-comment">// milvus-sdk-cpp v3.0.3 - the SDK sends the seed as a string, which the</span>
<span class="hljs-comment">// server rejects (a numeric seed is required).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
      <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;id&quot;</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> RANKER=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;boost&quot;,
    &quot;type&quot;: &quot;Rerank&quot;,
    &quot;inputFieldNames&quot;: [],
    &quot;outputFieldNames&quot;: [],
    &quot;params&quot;: {
        &quot;reranker&quot;: &quot;boost&quot;,
        &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
        &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
        &quot;weight&quot;: 0.5
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Обязателен?</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение/Пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Да</p></td>
     <td><p>Уникальный идентификатор данной функции</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Да</p></td>
     <td><p>Список векторных полей, к которым будет применена функция (должен быть пустым для Boost Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Да</p></td>
     <td><p>Тип вызываемой функции; используйте « <code translate="no">RERANK</code> » для указания стратегии переранжирования</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает тип средства переранжирования.</p><p>Для использования Boost Ranker необходимо установить значение « <code translate="no">boost</code> ».</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает вес, на который будут умножены оценки всех совпадающих объектов в исходных результатах поиска.</p><p>Значение должно быть числом с плавающей запятой. </p><ul><li><p>Чтобы подчеркнуть важность совпадающих объектов, установите значение, повышающее их оценки.</p></li><li><p>Чтобы понизить рейтинг совпадающих объектов, присвойте этому параметру значение, снижающее их оценки.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Указывает выражение фильтра, которое будет использоваться для сопоставления сущностей среди сущностей в результатах поиска. Это может быть любое допустимое базовое выражение фильтра, описанное в разделе <a href="/docs/ru/boolean.md">«Объяснение фильтрации</a>».</p><p><strong>Примечание</strong>: Используйте только базовые операторы, такие как <code translate="no">==</code>, <code translate="no">&gt;</code> или <code translate="no">&lt;</code>. Использование расширенных операторов, таких как <code translate="no">text_match</code> или <code translate="no">phrase_match</code>, ухудшит производительность поиска.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Указывает функцию генерации случайных чисел, которая случайным образом генерирует значение в диапазоне от <code translate="no">0</code> до <code translate="no">1</code>. Имеет следующие два необязательных аргумента:</p><ul><li><p><code translate="no">seed</code> (число) Указывает начальное значение, используемое для запуска генератора псевдослучайных чисел (PRNG).</p></li><li><p><code translate="no">field</code> (строка) Указывает имя поля, значение которого будет использоваться в качестве случайного фактора при генерации случайного числа. Достаточно поля с уникальными значениями.</p><p>Рекомендуется задать как <code translate="no">seed</code>, так и <code translate="no">field</code>, чтобы обеспечить согласованность между генерациями за счёт использования одних и тех же значений семенного числа и поля.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">Поиск с использованием одного Boost Ranker<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Как только функция Boost Ranker будет готова, вы сможете использовать её в поисковом запросе. В следующем примере предполагается, что вы уже создали коллекцию, содержащую следующие поля: <strong>id</strong>, <strong>vector</strong> и <strong>doctype</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=rerank
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{
    entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>},
}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(entity.NewFunctionScore().AddFunction(rerank)))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank.<span class="hljs-title function_ invoke__">clone</span>()))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Connect to the Milvus server</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>
});

<span class="hljs-comment">// Assume you have a collection set up</span>

<span class="hljs-comment">// Conduct a similarity search</span>
<span class="hljs-keyword">const</span> searchResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">data</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;doctype&#x27;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: rerank,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Search results:&#x27;</span>, searchResults);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
                    &quot;weight&quot;: 0.5
                }
            }
        ]
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Поиск с использованием нескольких Boost Ranker<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы можете объединить несколько Boost Ranker в одном поиске, чтобы повлиять на результаты поиска. Для этого создайте несколько Boost Ranker, укажите их в экземпляре <strong>FunctionScore</strong> и используйте <strong>этот</strong> экземпляр в качестве рангера в поисковом запросе.</p>
<p>В следующем примере показано, как изменить оценки всех идентифицированных сущностей, применив вес в диапазоне от <strong>0,8</strong> до <strong>1,2</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
    params={
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">fixWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)
        .build();

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">randomWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)
        .param(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
        .build();

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>);
params.put(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>);

<span class="hljs-type">FunctionScore</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> FunctionScore.builder()
        .addFunction(fixWeightRanker)
        .addFunction(randomWeightRanker)
        .params(params)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954382375778f</span>, <span class="hljs-number">0.4479436794798608f</span>, -<span class="hljs-number">0.17493894838751745f</span>, -<span class="hljs-number">0.4248030059917294f</span>, -<span class="hljs-number">0.8648452746018911f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(ranker)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

fixWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)

randomWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)

ranker := entity.NewFunctionScore().
    AddFunction(fixWeightRanker).
    AddFunction(randomWeightRanker).
    WithParam(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>}}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(ranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">fix_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">random_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_function</span>(fix_weight_ranker)
    .<span class="hljs-title function_ invoke__">add_function</span>(random_weight_ranker)
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;boost_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Multiply&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;function_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Sum&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> fix_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
fix_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.8</span>);

<span class="hljs-keyword">auto</span> random_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
random_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.4</span>);
<span class="hljs-comment">// Note: SetRandomScoreSeed() is not usable as of milvus-sdk-cpp v3.0.3 —</span>
<span class="hljs-comment">// the SDK sends the seed as a string, which the server rejects.</span>

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(fix_weight_ranker);
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(random_weight_ranker);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> fix_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.8</span>,
  },
};

<span class="hljs-keyword">const</span> random_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.4</span>,
  },
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">functions</span>: [fix_weight_ranker, random_weight_ranker],
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">boost_mode</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
    <span class="hljs-attr">function_mode</span>: <span class="hljs-string">&quot;Sum&quot;</span>,
  },
};

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doctype&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;weight&quot;: 0.8
                }
            },
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126},
                    &quot;weight&quot;: 0.4
                }
            }
        ],
        &quot;params&quot;: {
            &quot;boost_mode&quot;: &quot;Multiply&quot;,
            &quot;function_mode&quot;: &quot;Sum&quot;
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>В частности, используется два рангера Boost: один применяет фиксированный вес ко всем найденным сущностям, а другой — случайный. Затем мы ссылаемся на эти два рангера в объекте <strong>FunctionScore</strong>, который также определяет, как веса влияют на оценки найденных сущностей.</p>
<p>В следующей таблице перечислены параметры, необходимые для создания экземпляра <strong>FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Обязателен?</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение/Пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает имена целевых ранжеров в списке.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Указывает, как заданные веса влияют на оценки любых соответствующих объектов.</p><p>Возможные значения:</p><ul><li><p><code translate="no">Multiply</code></p><p>Указывает, что взвешенное значение равно исходной оценке соответствующего объекта, умноженной на указанный вес. </p><p>Это значение используется по умолчанию.</p></li><li><p><code translate="no">Sum</code></p><p>Указывает, что взвешенное значение равно сумме исходного балла соответствующего объекта и указанного веса</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Определяет, как обрабатываются взвешенные значения из различных ранжировщиков Boost.</p><p>Возможные значения:</p><ul><li><p><code translate="no">Multiply</code></p><p>Указывает, что итоговая оценка соответствующего объекта равна произведению взвешенных значений от всех ранжировщиков Boost.</p><p>Это значение используется по умолчанию.</p></li><li><p><code translate="no">Sum</code></p><p>Указывает, что итоговая оценка соответствующего объекта равна сумме взвешенных значений из всех ранжеров Boost.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
