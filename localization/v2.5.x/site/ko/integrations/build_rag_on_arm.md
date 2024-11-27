---
id: build_rag_on_arm.md
summary: >-
  이 튜토리얼에서는 Arm 기반 인프라에서 검색 증강 세대(RAG) 애플리케이션을 구축하는 방법을 알아봅니다. 벡터 스토리지의 경우, 완전
  관리형 Milvus 벡터 데이터베이스인 Zilliz Cloud를 활용합니다. Zilliz Cloud는 AWS, GCP, Azure와 같은
  주요 클라우드에서 사용할 수 있습니다. 이 데모에서는 AWS에 배포된 Zilliz Cloud를 Arm 머신과 함께 사용합니다. LLM의
  경우, llama.cpp를 사용하여 AWS Arm 기반 서버 CPU에서 Llama-3.1-8B 모델을 사용합니다.
title: Arm 아키텍처 기반 RAG 구축
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">Arm 아키텍처 기반 RAG 구축<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.arm.com/">Arm</a> CPU는 기존의 머신 러닝(ML) 및 인공 지능(AI) 사용 사례를 포함하여 광범위한 애플리케이션에서 광범위하게 활용되고 있습니다.</p>
<p>이 튜토리얼에서는 Arm 기반 인프라에서 검색 증강 세대(RAG) 애플리케이션을 빌드하는 방법을 알아봅니다. 벡터 스토리지의 경우, 완전 관리형 Milvus 벡터 데이터베이스인 <a href="https://zilliz.com/cloud">Zilliz Cloud를</a> 활용합니다. Zilliz Cloud는 AWS, GCP, Azure와 같은 주요 클라우드에서 사용할 수 있습니다. 이 데모에서는 AWS에 배포된 Zilliz Cloud를 Arm 머신과 함께 사용합니다. LLM의 경우, <code translate="no">llama.cpp</code> 을 사용하는 AWS Arm 기반 서버 CPU에서 <code translate="no">Llama-3.1-8B</code> 모델을 사용합니다.</p>
<h2 id="Prerequisite" class="common-anchor-header">전제 조건<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예제를 실행하려면 Arm 기반 서버에서 ML 워크로드를 비용 효율적으로 실행할 수 있는 방법을 제공하는 <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton을</a> 사용하는 것이 좋습니다. 이 노트북은 우분투 22.04 LTS 시스템에서 AWS Graviton3 <code translate="no">c7g.2xlarge</code> 인스턴스에서 테스트되었습니다.</p>
<p>이 예제를 실행하려면 최소 4개의 코어와 8GB의 RAM이 필요합니다. 디스크 스토리지를 32GB 이상으로 구성합니다. 동일하거나 더 나은 사양의 인스턴스를 사용하는 것이 좋습니다.</p>
<p>인스턴스를 시작한 후 인스턴스에 연결하고 다음 명령을 실행하여 환경을 준비합니다.</p>
<p>서버에 파이썬을 설치합니다:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>가상 환경을 만들고 활성화합니다:</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>필요한 파이썬 종속성을 설치합니다:</p>
<pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">오프라인 데이터 로드<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">컬렉션 생성</h3><p>우리는 벡터 데이터를 저장하고 검색하기 위해 AWS에 배포된 <a href="https://zilliz.com/cloud">Zilliz Cloud와</a> Arm 기반 머신을 사용합니다. 빠르게 시작하려면 Zilliz Cloud에 무료로 <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">계정을 등록하기만</a> 하면 됩니다.</p>
<div class="alert note">
<p>Zilliz Cloud 외에도 자체 호스팅 Milvus도 (설정이 조금 더 복잡한) 옵션입니다. 또한 ARM 기반 머신에 <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a> 및 <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes를</a> 배포할 수도 있습니다. Milvus 설치에 대한 자세한 내용은 <a href="https://milvus.io/docs/install-overview.md">설치 설명서를</a> 참조하세요.</p>
</div>
<p>질리즈 클라우드에서 <code translate="no">uri</code> 및 <code translate="no">token</code> 을 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트 및 API 키로</a> 설정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>컬렉션이 이미 존재하는지 확인하고 존재하는 경우 삭제합니다.</p>
<pre><code translate="no" class="language-python">if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>지정된 파라미터로 새 컬렉션을 생성합니다.</p>
<p>필드 정보를 지정하지 않으면 기본 키인 <code translate="no">id</code> 필드와 벡터 데이터를 저장할 <code translate="no">vector</code> 필드가 자동으로 생성됩니다. 예약된 JSON 필드는 스키마에 정의되지 않은 필드와 그 값을 저장하는 데 사용됩니다.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Strong consistency level</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>기본 메트릭 유형으로는 내적 곱 거리를 사용합니다. 거리 유형에 대한 자세한 내용은 <a href="https://milvus.io/docs/metric.md?tab=floating">유사성 메트릭 페이지를</a> 참조하세요.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">데이터 준비</h3><p>저희는 <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 문서 2.4.x의</a> FAQ 페이지를 RAG의 비공개 지식으로 사용하며, 이는 간단한 RAG 파이프라인을 위한 좋은 데이터 소스입니다.</p>
<p>zip 파일을 다운로드하고 <code translate="no">milvus_docs</code> 폴더에 문서를 압축 해제합니다.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
$ unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">milvus_docs/en/faq</code> 폴더에서 모든 마크다운 파일을 로드합니다. 각 문서에 대해 &quot;#&quot;를 사용하여 파일의 내용을 구분하기만 하면 마크다운 파일의 각 주요 부분의 내용을 대략적으로 구분할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">데이터 삽입</h3><p>텍스트를 임베딩 벡터로 변환할 수 있는 간단하지만 효율적인 임베딩 모델인 <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2를</a> 준비합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> <span class="hljs-title class_">HuggingFaceEmbeddings</span>

embedding_model = <span class="hljs-title class_">HuggingFaceEmbeddings</span>(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>텍스트 줄을 반복하여 임베딩을 생성한 다음 데이터를 Milvus에 삽입합니다.</p>
<p>다음은 컬렉션 스키마에 정의되지 않은 필드인 새 필드 <code translate="no">text</code> 입니다. 이 필드는 상위 수준에서 일반 필드로 취급할 수 있는 예약된 JSON 동적 필드에 자동으로 추가됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Arm에서 LLM 서비스 시작<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 Arm 기반 CPU에서 <code translate="no">llama.cpp</code> 서비스를 빌드하고 실행해 보겠습니다.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Llama 3.1 모델 및 llama.cpp</h3><p>Meta의 <a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">Llama 3.1-8B 모델은</a> Llama 3.1 모델 제품군에 속하며 연구 및 상업적 목적으로 무료로 사용할 수 있습니다. 모델을 사용하기 전에 Llama <a href="https://llama.meta.com/llama-downloads/">웹사이트를</a> 방문하여 양식을 작성하여 액세스를 요청하세요.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp는</a> 로컬과 클라우드 모두에서 다양한 하드웨어에서 효율적인 LLM 추론을 가능하게 하는 오픈 소스 C/C++ 프로젝트입니다. <code translate="no">llama.cpp</code> 을 사용하여 Llama 3.1 모델을 편리하게 호스팅할 수 있습니다.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">llama.cpp 다운로드 및 빌드</h3><p>다음 명령을 실행하여 소스에서 llama.cpp를 빌드하는 데 필요한 make, cmake, gcc, g++ 및 기타 필수 도구를 설치합니다:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>이제 빌드를 시작할 준비가 되었습니다 <code translate="no">llama.cpp</code>.</p>
<p>llama.cpp의 소스 리포지토리를 복제합니다:</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>기본적으로 <code translate="no">llama.cpp</code> 은 Linux 및 Windows에서 CPU 용으로만 빌드됩니다. 실행하는 Arm CPU용으로 빌드하기 위해 추가 스위치를 제공할 필요는 없습니다.</p>
<p><code translate="no">make</code> 을 실행하여 빌드합니다:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>도움말 명령을 실행하여 <code translate="no">llama.cpp</code> 가 올바르게 빌드되었는지 확인합니다:</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">llama.cpp</code> 가 올바르게 빌드되었다면 도움말 옵션이 표시됩니다. 출력 스니펫은 다음과 같습니다:</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>이제 huggingface cli를 사용하여 모델을 다운로드할 수 있습니다:</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-<span class="hljs-number">2.9</span><span class="hljs-number">.4</span>-llama3<span class="hljs-number">.1</span>-8b-gguf dolphin-<span class="hljs-number">2.9</span><span class="hljs-number">.4</span>-llama3<span class="hljs-number">.1</span>-8b-Q4_0.gguf --local-<span class="hljs-built_in">dir</span> . --local-<span class="hljs-built_in">dir</span>-use-symlinks <span class="hljs-literal">False</span>
<button class="copy-code-btn"></button></code></pre>
<p>llama.cpp 팀에서 도입한 GGUF 모델 형식은 압축 및 양자화를 사용하여 가중치 정밀도를 4비트 정수로 줄여 계산 및 메모리 요구량을 크게 줄이고 Arm CPU를 LLM 추론에 효과적으로 사용할 수 있도록 합니다.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">모델 가중치 재정량화</h3><p>다시 정량화하려면 다음을 실행합니다.</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>그러면 새 파일 <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code> 이 출력되며, 여기에는 재구성된 가중치가 포함되어 <code translate="no">llama-cli</code> 이 SVE 256 및 MATMUL_INT8 지원을 사용할 수 있도록 합니다.</p>
<div class="alert note">
<p>이 리퀀트화는 특히 Graviton3에 최적입니다. Graviton2의 경우 <code translate="no">Q4_0_4_4</code> 형식의 리퀀타이제이션을 수행해야 하며, Graviton4의 경우 <code translate="no">Q4_0_4_8</code> 형식이 리퀀타이제이션에 가장 적합합니다.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">LLM 서비스 시작</h3><p>llama.cpp 서버 프로그램을 활용하고 OpenAI 호환 API를 통해 요청을 보낼 수 있습니다. 이를 통해 LLM을 반복적으로 시작하고 중지할 필요 없이 여러 번 상호 작용하는 애플리케이션을 개발할 수 있습니다. 또한 네트워크를 통해 LLM이 호스팅되는 다른 컴퓨터에서 서버에 액세스할 수도 있습니다.</p>
<p>명령줄에서 서버를 시작하면 포트 8080에서 수신 대기합니다:</p>
<pre><code translate="no" class="language-shell">$ ./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>실행된 LLM의 파라미터를 조정하여 서버 하드웨어에 맞게 조정하여 이상적인 성능을 얻을 수도 있습니다. 자세한 매개변수 정보는 <code translate="no">llama-server --help</code> 명령을 참조하세요.</p>
<p>이 단계를 수행하는 데 어려움이 있는 경우 <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">공식 문서를</a> 참조하여 자세한 내용을 확인할 수 있습니다.</p>
<p>Arm 기반 CPU에서 LLM 서비스를 시작하셨습니다. 다음으로 OpenAI SDK를 사용하여 서비스와 직접 상호 작용합니다.</p>
<h2 id="Online-RAG" class="common-anchor-header">온라인 RAG<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">LLM 클라이언트 및 임베딩 모델</h3><p>LLM 클라이언트를 초기화하고 임베딩 모델을 준비합니다.</p>
<p>LLM의 경우, OpenAI SDK를 사용하여 이전에 실행된 라마 서비스를 요청합니다. 실제로는 로컬 llama.cpp 서비스이므로 API 키를 사용할 필요가 없습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

llm_client = <span class="hljs-title class_">OpenAI</span>(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>테스트 임베딩을 생성하고 해당 차원과 처음 몇 개의 요소를 인쇄합니다.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">쿼리에 대한 데이터 검색</h3><p>Milvus에 대해 자주 묻는 질문을 지정해 보겠습니다.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>컬렉션에서 해당 질문을 검색하고 시맨틱 상위 3개 일치 항목을 검색합니다.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리의 검색 결과를 살펴봅시다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">LLM을 사용하여 RAG 응답 얻기</h3><p>검색된 문서를 문자열 형식으로 변환합니다.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.<span class="hljs-keyword">join</span>(
    [<span class="hljs-meta">line_with_distance[0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>LLM을 사용하여 프롬프트에 따라 응답을 생성합니다. <code translate="no">model</code> 파라미터는 llama.cpp 서비스에 대한 중복 파라미터이므로 <code translate="no">not-used</code> 으로 설정했습니다.</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>축하합니다! Arm 기반 인프라 위에 RAG 애플리케이션을 구축했습니다.</p>
