---
id: configure_gpu.md
related_key: configure
group: system_configuration.md
summary: Milvus용 GPU를 구성하는 방법을 알아보세요.
---
<h1 id="gpu-related-Configurations" class="common-anchor-header">GPU 관련 설정<button data-href="#gpu-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>#GPU 인덱싱을 사용할 때 Milvus는 잦은 메모리 할당 및 할당을 피하기 위해 메모리 풀을 사용합니다.</p>
<p>#여기에서 메모리 풀이 차지하는 메모리 크기를 설정할 수 있으며 단위는 MB입니다.</p>
<p>#실제 메모리 수요가 maxMemSize로 설정한 값을 초과하면 Milvus가 충돌할 가능성이 있다는 점에 유의하세요.</p>
<p>#initMemSize와 MaxMemSize가 모두 0으로 설정된 경우,</p>
<p>#밀버스는 사용 가능한 GPU 메모리의 절반을 자동으로 초기화합니다,</p>
<p>#maxMemSize는 사용 가능한 GPU 메모리 전체를 초기화합니다.</p>
<h2 id="gpuinitMemSize" class="common-anchor-header"><code translate="no">gpu.initMemSize</code><button data-href="#gpuinitMemSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="gpu.initMemSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        GPU 메모리 풀 초기화 크기      </td>
      <td>2048</td>
    </tr>
  </tbody>
</table>
<h2 id="gpumaxMemSize" class="common-anchor-header"><code translate="no">gpu.maxMemSize</code><button data-href="#gpumaxMemSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="gpu.maxMemSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        GPU 메모리 풀 최대 크기      </td>
      <td>4096</td>
    </tr>
  </tbody>
</table>
