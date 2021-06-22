---
id: install_standalone-helm.md
label: 使用 Kubernetes 安装
order: 0
group: standalone
---
# 安装 Milvus 单机版
你可以使用 Docker-Compose 或 Kubernetes 安装 Milvus 单机版。
<div class="tab-wrapper"><a href="install_standalone-helm.md" class='active '>使用 Kubernetes 安装</a><a href="install_standalone-docker.md" class=''>使用 Docker 安装</a></div>


## 开始之前

请先检查你的硬件设备是否满足 Milvus 安装要求。


<details><summary>检查 CPU 是否支持 SIMD 扩展指令集合：</summary>

Milvus 在构建索引和查询向量时依赖 CPU 对 SIMD (Single Instruction Multiple Data) 扩展指令集合的支持。请确保运行 Milvus 的 CPU 至少支持以下一种 SIMD 指令集合：

- SSE4.2
- AVX
- AVX2
- AVX512

使用 lscpu 命令以检查 CPU 是否支持特定 SIMD 指令集合：
```
$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

</details>



## 安装 Milvus 单机版
