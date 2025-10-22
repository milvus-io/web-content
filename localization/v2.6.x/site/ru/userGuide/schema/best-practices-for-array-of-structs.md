---
id: best-practices-for-array-of-structs.md
title: >-
  Проектирование модели данных с помощью массива структурCompatible with Milvus
  2.6.4+
summary: >-
  Современные приложения ИИ, особенно в сфере Интернета вещей (IoT) и
  автономного вождения, обычно оперируют структурированными событиями:
  показаниями датчиков с временной меткой и векторным вложением, диагностическим
  журналом с кодом ошибки и аудиофрагментом или фрагментом поездки с
  местоположением, скоростью и контекстом сцены. Все это требует от базы данных
  встроенной поддержки приема и поиска вложенных данных.
beta: Milvus 2.6.4+
---
<h1 id="Data-Model-Design-with-an-Array-of-Structs" class="common-anchor-header">Проектирование модели данных с помощью массива структур<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Data-Model-Design-with-an-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>Современные приложения искусственного интеллекта, особенно в сфере Интернета вещей (IoT) и автономного вождения, обычно оперируют богатыми структурированными событиями: показаниями датчиков с временной меткой и векторным вложением, диагностическим журналом с кодом ошибки и аудиофрагментом или сегментом поездки с указанием местоположения, скорости и контекста сцены. Все это требует от базы данных встроенной поддержки приема и поиска вложенных данных.</p>
<p>Вместо того чтобы просить пользователя преобразовывать атомарные структурные события в плоские модели данных, Milvus представляет массив структур, где каждая структура в массиве может содержать скаляры и векторы, сохраняя семантическую целостность и обеспечивая надежную вложенную фильтрацию и гибридный поиск.</p>
<h2 id="Why-Array-of-Structs" class="common-anchor-header">Почему именно массив структур<button data-href="#Why-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>Современные приложения искусственного интеллекта, от автономного вождения до мультимодального поиска, все чаще опираются на вложенные разнородные данные. Традиционные плоские модели данных с трудом справляются с представлением сложных взаимосвязей, таких как<strong>"один документ с множеством аннотированных фрагментов</strong>" или<strong>"одна сцена вождения с множеством наблюдаемых маневров</strong>". Именно в этом случае тип данных Array of Structs в Milvus является идеальным.</p>
<p>Массив структур позволяет хранить упорядоченный набор структурированных элементов, где каждая структура содержит свою собственную комбинацию скалярных полей и векторных вкраплений. Это делает его идеальным для:</p>
<ul>
<li><p><strong>Иерархических данных</strong>: Родительские сущности с множеством дочерних записей, например, книга с большим количеством текстовых фрагментов или видео с большим количеством аннотированных кадров.</p></li>
<li><p><strong>Мультимодальные вкрапления</strong>: Каждая структура может содержать несколько векторов, например, текстовые вкрапления плюс вкрапления изображений, а также метаданные.</p></li>
<li><p><strong>Временные или последовательные данные</strong>: Структуры в поле Array естественным образом представляют временные серии или пошаговые события.</p></li>
</ul>
<p>В отличие от традиционных обходных путей, которые хранят JSON блобы или разбивают данные по нескольким коллекциям, массив структур обеспечивает собственное применение схемы, векторную индексацию и эффективное хранение в Milvus.</p>
<h2 id="Schema-design-guidelines" class="common-anchor-header">Рекомендации по проектированию схем<button data-href="#Schema-design-guidelines" class="anchor-icon" translate="no">
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
    </button></h2><p>В дополнение ко всем рекомендациям, рассмотренным в разделе <a href="/docs/ru/schema-hands-on.md">"Проектирование модели данных для поиска"</a>, перед началом использования массива структур в вашей модели данных вам следует учесть следующие моменты.</p>
<h3 id="Define-the-Struct-schema" class="common-anchor-header">Определите схему структуры<button data-href="#Define-the-Struct-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Прежде чем добавлять поле Array в коллекцию, определите внутреннюю схему Struct. Каждое поле в структуре должно иметь явный тип, скалярный<strong>(VARCHAR</strong>, <strong>INT</strong>, <strong>BOOLEAN</strong> и т. д.) или векторный<strong>(FLOAT_VECTOR</strong>).</p>
<p>Рекомендуется сохранять схему Struct компактной, включая в нее только те поля, которые вы будете использовать для поиска или отображения. Избегайте раздувания неиспользуемых метаданных.</p>
<h3 id="Set-the-max-capacity-thoughtfully" class="common-anchor-header">Вдумчиво устанавливайте максимальную емкость<button data-href="#Set-the-max-capacity-thoughtfully" class="anchor-icon" translate="no">
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
    </button></h3><p>Каждое поле Array имеет атрибут, определяющий максимальное количество элементов, которое поле Array может содержать для каждой сущности. Установите это значение, исходя из верхней границы вашего сценария использования. Например, в одном документе может быть 1000 текстовых фрагментов или 100 маневров в одной сцене вождения.</p>
<p>Слишком большое значение приводит к расточительству памяти, и вам придется произвести некоторые вычисления, чтобы определить максимальное количество структур в поле Array.</p>
<h3 id="Index-vector-fields-in-Structs" class="common-anchor-header">Индексировать векторные поля в структурах<button data-href="#Index-vector-fields-in-Structs" class="anchor-icon" translate="no">
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
    </button></h3><p>Индексация обязательна для векторных полей, включая как векторные поля в коллекции, так и поля, определенные в структурах. Для векторных полей в структурах в качестве типа индекса следует использовать <code translate="no">EMB_LIST_HNSW</code>, а в качестве типа метрики - <code translate="no">MAX_SIM</code>.</p>
<p>Подробные сведения обо всех применимых ограничениях см. в разделе <a href="/docs/ru/array-of-structs.md#Limits">Ограничения</a>.</p>
<h2 id="A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="common-anchor-header">Пример из реального мира: Моделирование набора данных CoVLA для автономного вождения<button data-href="#A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="anchor-icon" translate="no">
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
    </button></h2><p>Набор данных Comprehensive Vision-Language-Action (CoVLA), представленный компанией <a href="https://tur.ing/posts/s1QUA1uh">Turing Motors</a> и принятый на Зимней конференции по применению компьютерного зрения (WACV) 2025 года, представляет собой богатую основу для обучения и оценки моделей Vision-Language-Action (VLA) в автономном вождении. Каждая точка данных, обычно представляющая собой видеоклип, содержит не только необработанные визуальные данные, но и структурированные подписи, описывающие:</p>
<ul>
<li><p><strong>Поведение эгомобиля</strong> (например, "Поворот налево, уступая дорогу встречному транспорту"),</p></li>
<li><p><strong>обнаруженные объекты</strong> (например, ведущие транспортные средства, пешеходы, светофоры) и</p></li>
<li><p><strong>Надпись</strong> на уровне кадра сцены.</p></li>
</ul>
<p>Такая иерархическая и мультимодальная природа делает ее идеальным кандидатом для функции Array of Structs. Подробные сведения о наборе данных CoVLA см. на <a href="https://turingmotors.github.io/covla-ad/">веб-сайте набора данных CoVLA</a>.</p>
<h3 id="Step-1-Map-the-dataset-into-a-collection-schema" class="common-anchor-header">Шаг 1: Сопоставление набора данных со схемой коллекции<button data-href="#Step-1-Map-the-dataset-into-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Набор данных CoVLA - это крупномасштабный мультимодальный набор данных о вождении, состоящий из 10 000 видеоклипов общей продолжительностью более 80 часов. Кадры сэмплируются с частотой 20 Гц, каждый кадр аннотируется подробными подписями на естественном языке, а также информацией о состоянии автомобиля и координатах обнаруженных объектов.</p>
<p>Структура набора данных выглядит следующим образом:</p>
<pre><code translate="no" class="language-python">├── video_1                                       (VIDEO) <span class="hljs-comment"># video.mp4</span>
│   ├── video_id                                  (INT)
│   ├── video_url                                 (STRING)
│   ├── frames                                    (ARRAY)
│   │   ├── frame_1                               (STRUCT)
│   │   │   ├── caption                           (STRUCT) <span class="hljs-comment"># captions.jsonl</span>
│   │   │   │   ├── plain_caption                 (STRING)
│   │   │   │   ├── rich_caption                  (STRING)
│   │   │   │   ├── risk                          (STRING)
│   │   │   │   ├── risk_correct                  (BOOL)
│   │   │   │   ├── risk_yes_rate                 (FLOAT)
│   │   │   │   ├── weather                       (STRING)
│   │   │   │   ├── weather_rate                  (FLOAT)
│   │   │   │   ├── road                          (STRING)
│   │   │   │   ├── road_rate                     (FLOAT)
│   │   │   │   ├── is_tunnel                     (BOOL)
│   │   │   │   ├── is_tunnel_yes_rate            (FLOAT)
│   │   │   │   ├── is_highway                    (BOOL)
│   │   │   │   ├── is_highway_yes_rate           (FLOAT)
│   │   │   │   ├── has_pedestrain                (BOOL)
│   │   │   │   ├── has_pedestrain_yes_rate       (FLOAT)
│   │   │   │   ├── has_carrier_car               (BOOL)
│   │   │   ├── traffic_light                     (STRUCT) <span class="hljs-comment"># traffic_lights.jsonl</span>
│   │   │   │   ├── index                         (INT)
│   │   │   │   ├── <span class="hljs-keyword">class</span>                         (STRING)
│   │   │   │   ├── bbox                          (LIST&lt;FLOAT&gt;)
│   │   │   ├── front_car                         (STRUCT) <span class="hljs-comment"># front_cars.jsonl</span>
│   │   │   │   ├── has_lead                      (BOOL)
│   │   │   │   ├── lead_prob                     (FLOAT)
│   │   │   │   ├── lead_x                        (FLOAT)
│   │   │   │   ├── lead_y                        (FLOAT)
│   │   │   │   ├── lead_speed_kmh                (FLOAT)
│   │   │   │   ├── lead_a                        (FLOAT)
│   │   ├── frame_2                               (STRUCT)
│   │   ├── ...                                   (STRUCT)
│   │   ├── frame_n                               (STRUCT)
├── video_2
├── ...
├── video_n
<button class="copy-code-btn"></button></code></pre>
<p>Можно заметить, что структура набора данных CoVLA сильно иерархизирована: собранные данные разделены на множество файлов <code translate="no">.jsonl</code>, а также видеоклипы в формате <code translate="no">.mp4</code>.</p>
<p>В Milvus для создания вложенных структур в схеме коллекции можно использовать либо поле JSON, либо поле Array-of-Structs. Когда векторные вложения являются частью вложенного формата, поддерживается только поле Array-of-Structs. Однако структура внутри массива не может сама содержать другие вложенные структуры. Чтобы хранить набор данных CoVLA, сохраняя важные взаимосвязи, необходимо удалить ненужную иерархию и уплостить данные, чтобы они соответствовали схеме коллекции Milvus.</p>
<p>На диаграмме ниже показано, как мы можем смоделировать этот набор данных, используя схему, приведенную ниже:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dataset-model.png" alt="Dataset Model" class="doc-image" id="dataset-model" />
   </span> <span class="img-wrapper"> <span>Модель набора данных</span> </span></p>
<p>На приведенной выше диаграмме показана структура видеоклипа, состоящая из следующих полей:</p>
<ul>
<li><p><code translate="no">video_id</code> служит первичным ключом, который принимает целые числа типа INT64.</p></li>
<li><p><code translate="no">states</code> необработанное JSON-тело, содержащее состояние эгомобиля в каждом кадре текущего видео.</p></li>
<li><p><code translate="no">captions</code> Массив структур, каждая из которых имеет следующие поля:</p>
<ul>
<li><p><code translate="no">frame_id</code> идентифицирует конкретный кадр в текущем видео.</p></li>
<li><p><code translate="no">plain_caption</code> описание текущего кадра без учета окружающей обстановки, такой как погода, состояние дороги и т. д., а <code translate="no">plain_cap_vector</code> - соответствующий вектор вкраплений.</p></li>
<li><p><code translate="no">rich_caption</code> описание текущего кадра с окружающей средой, а <code translate="no">rich_cap_vector</code> - соответствующий вектор вкраплений.</p></li>
<li><p><code translate="no">risk</code> описание риска, которому подвергается эго-транспортное средство в текущем кадре, и <code translate="no">risk_vector</code> - соответствующие векторные вложения, и</p></li>
<li><p>Все остальные атрибуты кадра, такие как <code translate="no">road</code>, <code translate="no">weather</code>, <code translate="no">is_tunnel</code>, <code translate="no">has_pedestrain</code> и т. д..</p></li>
</ul></li>
<li><p><code translate="no">traffic_lights</code> это JSON-тело, содержащее все сигналы светофора, идентифицированные в текущем кадре.</p></li>
<li><p><code translate="no">front_cars</code> также является телом JSON, которое содержит все ведущие автомобили, идентифицированные в текущем кадре.</p></li>
</ul>
<h3 id="Step-2-Initialize-the-schemas" class="common-anchor-header">Шаг 2: Инициализация схем<button data-href="#Step-2-Initialize-the-schemas" class="anchor-icon" translate="no">
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
    </button></h3><p>Для начала нам нужно инициализировать схему для caption Struct и коллекции.</p>
<ul>
<li><p>Инициализируйте схему для Caption Struct.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># create the schema for the caption struct</span>
schema_for_caption = MilvusClient.create_struct_field_schema()

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>
)

...
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Инициализация схемы для коллекции</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_id&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;primary key&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_url&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    description=<span class="hljs-string">&quot;URL of the video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;states&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific state of the ego vehicle in the current video&quot;</span>
)

<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;captions&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.ARRAY,</span>
<span class="highlighted-comment-line">    element_type=DataType.STRUCT,</span>
<span class="highlighted-comment-line">    struct_schema=struct_for_caption,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">600</span>,</span>
<span class="highlighted-comment-line">    description=<span class="hljs-string">&quot;captions for the current video&quot;</span></span>
<span class="highlighted-comment-line">)</span>

schema.add_field(
    field_name=<span class="hljs-string">&quot;traffic_lights&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;front_cars&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Step-3-Set-index-parameters" class="common-anchor-header">Шаг 3: Задайте параметры индекса<button data-href="#Step-3-Set-index-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Все векторные поля должны быть проиндексированы. Для индексации векторных полей в элементе Struct необходимо использовать <code translate="no">EMB_LIST_HNSW</code> в качестве типа индекса и метрику <code translate="no">MAX_SIM</code> для измерения сходства между векторными вкраплениями.</p>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Рекомендуется включить измельчение JSON для JSON-полей, чтобы ускорить фильтрацию в этих полях.</p>
<h3 id="Step-4-Create-a-collection" class="common-anchor-header">Шаг 4: Создание коллекции<button data-href="#Step-4-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Когда схемы и индексы готовы, вы можете создать целевую коллекцию следующим образом:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-data" class="common-anchor-header">Шаг 5: Вставка данных<button data-href="#Step-5-Insert-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Turing Motos организует набор данных CoVLA в нескольких файлах, включая необработанные видеоклипы (<code translate="no">.mp4</code>), штаты (<code translate="no">states.jsonl</code>), подписи (<code translate="no">captions.jsonl</code>), светофоры (<code translate="no">traffic_lights.jsonl</code>) и передние автомобили (<code translate="no">front_cars.jsonl</code>).</p>
<p>Необходимо объединить фрагменты данных для каждого видеоклипа из этих файлов и вставить данные. Ниже приведена объединенная сущность для справки.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;video_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;video_url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;videos/0a0fc7a5db365174.mp4&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;states&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;trajectory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;extrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">-0.016034273081459105</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.9998714384933313</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-8.280132118064406e-05</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;intrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">2648.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">964.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;captions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;plain_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow.&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rich_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow. It is cloudy. The car is driving on a wide road. No pedestrians appear to be present. What the driver of ego vehicle should be careful is to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_correct&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_yes_rate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.6062515935356961</span><span class="hljs-punctuation">,</span>
            ...
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
            ...
        <span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">599</span>
            ...
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;traffic_lights&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">485.9914855957031</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.18536376953125</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.1666259765625</span><span class="hljs-punctuation">,</span> <span class="hljs-number">360.3130798339844</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;right&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;2&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;straight&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;front_cars&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;has_lead&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_prob&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.967777669429779</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_x&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5.26953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_y&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1.07421875</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_speed_kmh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">23.6953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.546875</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>После соответствующей обработки данных их можно вставить следующим образом:</p>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;video_id&quot;</span>: <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>, ...}
    ...
]

client.insert(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
