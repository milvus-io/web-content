---
id: image_deduplication_system.md
summary: Создайте систему дедупликации изображений с помощью Milvus.
title: Дедупликация изображений
---
<h1 id="Image-Deduplication" class="common-anchor-header">Дедупликация изображений<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве показано, как использовать Milvus, векторную базу данных с открытым исходным кодом, для создания системы дедупликации изображений.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">Открытый блокнот</a></li>
</ul>
<p>Используемые модели ML и стороннее программное обеспечение включают:</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>В последние годы наблюдается экспоненциальный взрыв пользовательского контента. Люди могут мгновенно загрузить сделанную ими фотографию на платформу социальных сетей. Однако при таком изобилии данных об изображениях мы видим множество дублирующегося контента. Чтобы улучшить качество работы пользователей, эти дублирующиеся изображения необходимо удалять. Система дедупликации изображений избавляет нас от ручного труда, связанного с поочередным сравнением изображений в базе данных для выявления дубликатов. Выделить абсолютно идентичные изображения - задача совсем несложная. Однако иногда изображение может быть увеличено, обрезано, изменена яркость или шкала серого. Система дедупликации изображений должна выявить эти похожие изображения и удалить их.</p>
<p>В этом учебном пособии вы узнаете, как построить систему дедупликации изображений. В этом учебнике используется модель ResNet-50 для извлечения характеристик изображений и преобразования их в векторы. Затем эти векторы изображений сохраняются в векторной базе данных Milvus, и в ней же выполняется поиск векторного сходства.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>Процесс_дедупликации_изображений</span> </span></p>
