---
id: text_image_search.md
summary: Создайте поисковую систему по тексту и изображениям с помощью Milvus.
title: Поисковая система "текст в изображение
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">Поисковая система "текст в изображение<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве показано, как использовать Milvus, векторную базу данных с открытым исходным кодом, для создания поисковой системы по тексту и изображениям.</p>
<p>Вы можете быстро создать минимально жизнеспособную поисковую систему по тексту и изображениям, следуя базовому руководству. Кроме того, вы можете прочитать учебник с глубоким погружением, в котором рассматривается все, начиная с выбора модели и заканчивая развертыванием сервиса. Вы можете создать более продвинутую систему поиска по тексту и изображениям, отвечающую вашим собственным потребностям, следуя инструкциям в руководстве по глубокому погружению.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">Базовый учебник в блокноте</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">Учебник глубокого погружения в блокноте</a></p></li>
</ul>
<p>Используемые модели ML и стороннее программное обеспечение включают:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>В настоящее время традиционные текстовые поисковые системы теряют свое очарование, и все больше людей переходят на TikTok в качестве своей любимой поисковой системы. При традиционном текстовом поиске люди вводят ключевые слова, и им показываются все тексты, содержащие это ключевое слово. Однако люди жалуются, что не всегда могут найти то, что им нужно, при таком поиске. Более того, результаты поиска недостаточно интуитивны. Люди говорят, что изображения и видео гораздо более интуитивны и приятны, чем продираться сквозь строки текста. В результате появилась кросс-модальная поисковая система "текст-изображение". С помощью такого нового типа поисковой системы люди могут находить релевантные изображения, вводя фрагмент текста с некоторыми ключевыми словами.</p>
<p>В этом уроке вы узнаете, как создать поисковую систему "текст-изображение". В этом учебнике используется модель CLIP для извлечения характеристик изображений и преобразования их в векторы. Затем эти векторы изображений хранятся в векторной базе данных Milvus. Когда пользователи вводят тексты запросов, эти тексты также преобразуются в векторы вложений с помощью той же ML-модели CLIP. Затем в Milvus выполняется поиск векторного сходства для извлечения наиболее похожих векторов изображений на вектор входного текста.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>Поиск_изображения_текста</span> </span></p>
