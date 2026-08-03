---
id: limitations.md
title: Ограничения Milvus
related_key: Limitations
summary: Ознакомьтесь с ограничениями при использовании Milvus.
---
<h1 id="Milvus-Limits" class="common-anchor-header">Ограничения Milvus<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus стремится предоставлять лучшие векторные базы данных для работы приложений искусственного интеллекта и векторного поиска по схожести. Однако команда постоянно работает над добавлением новых функций и лучших инструментов для улучшения пользовательского опыта. На этой странице перечислены некоторые известные ограничения, с которыми пользователи могут столкнуться при использовании Milvus.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">Длина имени ресурса<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Ресурс</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>База данных</td><td>255 символов</td></tr>
<tr><td>Коллекция</td><td>255 символов</td></tr>
<tr><td>Поле</td><td>255 символов</td></tr>
<tr><td>Индекс</td><td>255 символов</td></tr>
<tr><td>Раздел</td><td>255  символов</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">Правила именования<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Имя ресурса, например имя коллекции, имя раздела или имя индекса, может содержать цифры, буквы и символы подчеркивания (_). Имя ресурса должно начинаться с буквы или символа подчеркивания (_).</p>
<h2 id="Number-of-resources" class="common-anchor-header">Количество ресурсов<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Ресурс</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>Коллекция</td><td>65 536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">Количество ресурсов в коллекции<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Ресурс</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>Раздел</td><td>1 024</td></tr>
<tr><td>Шард</td><td>16</td></tr>
<tr><td>Поле</td><td>64</td></tr>
<tr><td>Индекс</td><td>1</td></tr>
<tr><td>Сущность</td><td>неограниченная</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">Длина строки<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Тип данных</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65 535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">Размеры вектора<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Свойство</th><th>Предел</th></tr>
</thead>
<tbody>
<tr><td>Размерность</td><td>32 768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">Входные и выходные данные на RPC<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Операция</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>Вставка</td><td>64 МБ</td></tr>
<tr><td>Поиск</td><td>64 МБ</td></tr>
<tr><td>Запрос</td><td>64 МБ</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">Ограничения на загрузку<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>В текущей версии объем загружаемых данных не должен превышать 90% от общего объема ресурсов памяти всех узлов запроса, чтобы зарезервировать ресурсы памяти для механизма выполнения.</p>
<h2 id="Search-limits" class="common-anchor-header">Ограничения на поиск<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Векторы</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (количество наиболее похожих результатов для возврата)</td><td>16 384</td></tr>
<tr><td><code translate="no">nq</code> (количество поисковых запросов)</td><td>16 384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">Ограничения индекса для различных типов поиска<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>В приведенной ниже таблице представлен обзор поддержки различных вариантов поведения поиска для разных типов индексов.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>FLAT</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_BRUTE_FORCE</th><th>SPARSE_INVERTED_INDEX</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>Базовый поиск</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Поиск разделов</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Простой поиск с получением необработанных данных</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Базовый поиск с пагинацией</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Поиск с фильтрами</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Поиск по диапазону</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Поиск по группам</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Нет</td><td>Да</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Да</td><td>Нет</td><td>Нет</td></tr>
<tr><td>Поиск с помощью итератора</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Гибридный поиск</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да (только RRFRanker)</td><td>Да</td><td>Да</td></tr>
<tr><td>Запрос/Получение</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Запрос с итератором</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Да</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Да</td><td>Да</td><td>Да</td></tr>
</tbody>
</table>
