---
id: text_image_search.md
summary: >-
  이 튜토리얼에서는 OpenAI의 CLIP(대조 언어-이미지 사전 학습) 모델과 Milvus를 사용하여 텍스트 기반 이미지 검색을 구현하는
  방법을 살펴봅니다. CLIP으로 이미지 임베딩을 생성하고 Milvus에 저장한 후 효율적인 유사도 검색을 수행해 보겠습니다.
title: Milvus를 사용한 텍스트-이미지 검색
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Milvus를 사용한 텍스트-이미지 검색<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>텍스트-이미지 검색은 사용자가 자연어 텍스트 설명을 사용해 이미지를 검색할 수 있는 고급 기술입니다. 사전 학습된 멀티모달 모델을 활용하여 텍스트와 이미지를 모두 공유 의미 공간의 임베딩으로 변환하여 유사성 기반 비교를 가능하게 합니다.</p>
<p>이 튜토리얼에서는 OpenAI의 CLIP(대조 언어-이미지 사전 학습) 모델과 Milvus를 사용하여 텍스트 기반 이미지 검색을 구현하는 방법을 살펴봅니다. CLIP으로 이미지 임베딩을 생성하고 Milvus에 저장한 후 효율적인 유사도 검색을 수행해 보겠습니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>시작하기 전에 필요한 모든 패키지와 예제 데이터가 준비되어 있는지 확인하세요.</p>
<h3 id="Install-dependencies" class="common-anchor-header">종속성 설치</h3><ul>
<li>Milvus 데이터베이스와 상호 작용하기 위한<strong>pymilvus&gt;=2.4.2</strong> </li>
<li>CLIP 모델 작업을 위한<strong>clip</strong> </li>
<li>이미지 처리 및 시각화를 위한<strong>pillow</strong> </li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(인터페이스 상단의 "런타임" 메뉴로 이동한 후 드롭다운 메뉴에서 "세션 다시 시작"을 선택합니다).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">예제 데이터 다운로드</h3><p><a href="https://www.image-net.org">이미지넷</a> 데이터 세트의 하위 집합(100개 클래스, 각 클래스당 10개 이미지)을 예제 이미지로 사용합니다. 다음 명령은 예제 데이터를 다운로드하여 로컬 폴더 <code translate="no">./images_folder</code> 에 추출합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Milvus 설정</h3><p>계속 진행하기 전에 Milvus 서버를 설정하고 URI(선택 사항, 토큰)를 사용하여 연결합니다:</p>
<ul>
<li><p><strong>Milvus Lite(편의상 권장)</strong>: ./milvus.db와 같은 로컬 파일로 URI를 설정합니다. 이렇게 하면 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하여 모든 데이터를 단일 파일에 저장합니다.</p></li>
<li><p><strong>Docker 또는 Kubernetes(대규모 데이터의 경우)</strong>: 대규모 데이터 세트를 처리하려면 <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes를</a> 사용하여 더 성능이 뛰어난 Milvus 서버를 배포하세요. 이 경우 http://localhost:19530 같은 서버 URI를 사용하여 연결하세요.</p></li>
<li><p><strong>질리즈 클라우드(관리형 서비스)</strong>: Milvus의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">Zilliz Cloud를</a> 사용하는 경우, 퍼블릭 엔드포인트를 URI로 설정하고 API 키를 토큰으로 설정합니다.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">시작하기<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 필요한 종속성과 데이터가 준비되었으므로 이제 특징 추출기를 설정하고 Milvus로 작업을 시작할 차례입니다. 이 섹션에서는 텍스트-이미지 검색 시스템을 구축하는 주요 단계를 안내합니다. 마지막으로 텍스트 쿼리를 기반으로 이미지를 검색하고 시각화하는 방법을 시연해 보겠습니다.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">특징 추출기 정의하기</h3><p>사전 학습된 CLIP 모델을 사용하여 이미지와 텍스트 임베딩을 생성합니다. 이 섹션에서는 사전 학습된 CLIP의 <strong>ViT-B/32</strong> 변형을 로드하고 이미지와 텍스트 인코딩을 위한 헬퍼 함수를 정의합니다:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: 이미지를 특징 벡터로 처리하고 인코딩합니다.</li>
<li><code translate="no">encode_text(text)</code>: 텍스트 쿼리를 특징 벡터로 인코딩</li>
</ul>
<p>두 함수 모두 정확한 코사인 유사도 계산에 필수적인 벡터를 단위 길이로 변환하여 일관된 비교를 보장하기 위해 출력 피처를 정규화합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> clip
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image


<span class="hljs-comment"># Load CLIP model</span>
model_name = <span class="hljs-string">&quot;ViT-B/32&quot;</span>
model, preprocess = clip.load(model_name)
model.<span class="hljs-built_in">eval</span>()


<span class="hljs-comment"># Define a function to encode images</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">image_path</span>):
    image = preprocess(Image.<span class="hljs-built_in">open</span>(image_path)).unsqueeze(<span class="hljs-number">0</span>)
    image_features = model.encode_image(image)
    image_features /= image_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the image features</span>
    <span class="hljs-keyword">return</span> image_features.squeeze().tolist()


<span class="hljs-comment"># Define a function to encode text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_text</span>(<span class="hljs-params">text</span>):
    text_tokens = clip.tokenize(text)
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the text features</span>
    <span class="hljs-keyword">return</span> text_features.squeeze().tolist()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Ingestion" class="common-anchor-header">데이터 수집</h3><p>시맨틱 이미지 검색을 활성화하려면 먼저 모든 이미지에 대한 임베딩을 생성하고 효율적인 색인 및 검색을 위해 이를 벡터 데이터베이스에 저장해야 합니다. 이 섹션에서는 Milvus로 이미지 데이터를 수집하는 단계별 가이드를 제공합니다.</p>
<p><strong>1. Milvus 컬렉션 생성</strong></p>
<p>이미지 임베딩을 저장하기 전에 Milvus 컬렉션을 생성해야 합니다. 다음 코드는 기본 COSINE 메트릭 유형으로 빠른 설정 모드에서 컬렉션을 생성하는 방법을 보여줍니다. 컬렉션에는 다음 필드가 포함됩니다:</p>
<ul>
<li><p><code translate="no">id</code>: 자동 ID가 활성화된 기본 필드.</p></li>
<li><p><code translate="no">vector</code>: 부동 소수점 벡터 임베딩을 저장하는 필드.</p></li>
</ul>
<p>사용자 정의 스키마가 필요한 경우 <a href="https://milvus.io/docs/create-collection.md">Milvus 설명서를</a> 참조하여 자세한 지침을 확인하세요.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;image_collection&quot;</span>

<span class="hljs-comment"># Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection in quickstart mode</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">512</span>,  <span class="hljs-comment"># this should match the dimension of the image embedding</span>
    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># auto generate id and store in the id field</span>
    enable_dynamic_field=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable dynamic field for scalar fields</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>2. Milvus에 데이터 삽입</strong></p>
<p>이 단계에서는 미리 정의된 이미지 인코더를 사용하여 예제 데이터 디렉토리에 있는 모든 JPEG 이미지에 대한 임베딩을 생성합니다. 그런 다음 이러한 임베딩은 해당 파일 경로와 함께 Milvus 컬렉션에 삽입됩니다. 컬렉션의 각 항목은 다음과 같이 구성됩니다:</p>
<ul>
<li><strong>임베딩 벡터</strong>: 이미지의 숫자 표현입니다. <code translate="no">vector</code> 필드에 저장됩니다.</li>
<li><strong>파일 경로</strong>: 참조용 이미지 파일의 위치입니다. <code translate="no">filepath</code> 필드에 동적 필드로 저장됩니다.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


image_dir = <span class="hljs-string">&quot;./images_folder/train&quot;</span>
raw_data = []

<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> glob(os.path.join(image_dir, <span class="hljs-string">&quot;**/*.JPEG&quot;</span>)):
    image_embedding = encode_image(image_path)
    image_dict = {<span class="hljs-string">&quot;vector&quot;</span>: image_embedding, <span class="hljs-string">&quot;filepath&quot;</span>: image_path}
    raw_data.append(image_dict)
insert_result = milvus_client.insert(collection_name=collection_name, data=raw_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Inserted&quot;</span>, insert_result[<span class="hljs-string">&quot;insert_count&quot;</span>], <span class="hljs-string">&quot;images into Milvus.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 1000 images into Milvus.
</code></pre>
<h3 id="Peform-a-Search" class="common-anchor-header">검색 수행</h3><p>이제 예제 텍스트 쿼리를 사용하여 검색을 실행해 보겠습니다. 이렇게 하면 주어진 텍스트 설명과의 의미적 유사성을 기준으로 가장 관련성이 높은 이미지가 검색됩니다.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>결과를 시각화합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display


width = <span class="hljs-number">150</span> * <span class="hljs-number">5</span>
height = <span class="hljs-number">150</span> * <span class="hljs-number">2</span>
concatenated_image = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (width, height))

result_images = []
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        filename = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filepath&quot;</span>]
        img = Image.<span class="hljs-built_in">open</span>(filename)
        img = img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
        result_images.append(img)

<span class="hljs-keyword">for</span> idx, img <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result_images):
    x = idx % <span class="hljs-number">5</span>
    y = idx // <span class="hljs-number">5</span>
    concatenated_image.paste(img, (x * <span class="hljs-number">150</span>, y * <span class="hljs-number">150</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query text: <span class="hljs-subst">{query_text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSearch results:&quot;</span>)
display(concatenated_image)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query text: a white dog

Search results:
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_image_search_with_milvus_20_1.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
