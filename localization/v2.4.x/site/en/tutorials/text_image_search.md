---
id: text_image_search.md
summary: Build a text to image search engine with Milvus.
title: Text to Image Search Engine
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">Text to Image Search Engine<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>This tutorial demonstrates how to use Milvus, the open-source vector database, to build a text-to-image search engine.</p>
<p>You can quickly build a minimum viable text-to-image search engine by following the basic tutorial. Alternatively, you can also read the deep dive tutorial which covers everything from model selection to service deployment. You can build a more advanced text-to-image search engine catering to your own business need by following the instructions in the deep dive tutorial.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">Basic tutorial in notebook</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">Deep dive tutorial in notebook</a></p></li>
</ul>
<p>The ML model and third-party software used include:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>Nowadays, traditional text search engines are losing their charm with more and more people turning to TikTok as their favorite search engine. During a traditional text search, people input keywords and be shown all the texts containing the keyword. However, people complain that they cannot always find what they want in a search like this. What’s more, the results are not intuitive enough. People say they find images and videos much more intuitive and pleasant than having to crawl through lines of text. The cross-modal text-to-image search engine emerged as a result. With such a new type of search engine, people can find relevant images by inputting a chunk of text of some keywords.</p>
<p>In this tutorial, you will learn how to build a text-to-image search engine. This tutorial uses the CLIP model to extract features of images and convert them into vectors. Then these image vectors are stored in the Milvus vector database. When users input query texts, these texts are also converted into embedding vectors using the same ML model CLIP. Subsequently, a vector similarity search is performed in Milvus to retrieve the most similar image vectors to the input text vector.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
    <span>Text_image_search</span>
  </span>
</p>
