---
id: video_similarity_search.md
summary: Создайте систему поиска по сходству видео с помощью Milvus.
title: Поиск по сходству видео
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">Поиск по сходству видео<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве показано, как использовать Milvus, векторную базу данных с открытым исходным кодом, для создания системы поиска сходства видео.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Открытый блокнот Jupyter</a></li>
</ul>
<p>Используемые ML-модели и стороннее программное обеспечение включают:</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>В наши дни после просмотра понравившегося фильма или видео люди могут легко сделать скриншоты и поделиться своими мыслями, разместив их на различных платформах социальных сетей. Когда подписчики видят скриншоты, им бывает очень сложно определить, о каком фильме идет речь, если название фильма не указано в сообщении. Чтобы узнать название фильма, люди могут воспользоваться системой поиска по сходству видео. С помощью этой системы пользователи могут загрузить изображение и получить видео или фильмы, содержащие ключевые кадры, похожие на загруженное изображение.</p>
<p><br/></p>
<p>В этом уроке вы узнаете, как создать систему поиска по сходству видео. Для создания системы в этом уроке используется около 100 анимированных gif на Tumblr. Однако вы можете подготовить и свои собственные наборы данных видео. Сначала система использует OpenCV для извлечения ключевых кадров из видео, а затем получает векторы признаков каждого ключевого кадра с помощью ResNet-50. Все векторы сохраняются и ищутся в Milvus, который возвращает идентификаторы похожих векторов. Затем эти идентификаторы сопоставляются с соответствующим видео, хранящимся в MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>video_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_search_demo</span> </span></p>
