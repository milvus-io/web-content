---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Learn the necessary preparations before installing Milvus with GPU.
title: Requirements for Installing Milvus with GPU
---

# Requirements for Installing Milvus with GPU

This page lists the hardware and software requirements to set up Milvus with GPU support.

## Compute capability

The Milvus GPU image `milvusdb/milvus:v3.0.5-gpu` is built for GPU devices with compute capability 7.0, 7.5, 8.0, 8.6, 9.0, 10.0, or 12.0. Your GPU device must have one of these compute capabilities, or a later compute capability that can run code built for one of them, such as 8.9 or 12.1. For details, see [Binary Compatibility](https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility) and [Family-Specific Features](https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features).

To check whether your GPU device suffices the requirement, check [Your GPU Compute Capability](https://developer.nvidia.com/cuda-gpus) on the NVIDIA developer website.

## NVIDIA driver

Your host must run one of the [Linux distributions supported by the NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html) and have the NVIDIA driver for your GPU device installed.

The Milvus GPU image `milvusdb/milvus:v3.0.5-gpu` is based on CUDA 12.9 Update 1. Its `NVIDIA_REQUIRE_CUDA` setting requires `cuda>=12.9`, so the NVIDIA driver must support CUDA 12.9 or later. For CUDA 12.9 Update 1, NVIDIA lists driver version 575.57.08 or later on Linux x86_64. For the driver versions of each CUDA release, see the [CUDA Toolkit release notes](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver).

The same setting also accepts drivers from the 535, 550, 560, 565, and 570 branches on some GPU brands, but not on GeForce or Titan GPUs. With these drivers, the image relies on [CUDA forward compatibility](https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html), which NVIDIA supports only on NVIDIA Data Center GPUs, select NGC Server Ready SKUs of RTX cards, and Jetson boards. If the driver does not meet these requirements, the NVIDIA Container Toolkit reports an `unsatisfied condition` error and does not set up the GPU for the container.

For Ubuntu 22.04 users, you can install the driver with the following command:

```shell
$ sudo apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580
```

GPUs with compute capability 10.0 or 12.0 (Blackwell) are supported only by the open kernel modules of the NVIDIA driver. For these GPUs, install `nvidia-headless-580-open` instead of `nvidia-headless-580`. The open kernel modules do not support GPUs older than Turing (compute capability 7.5), such as Volta (7.0), so keep `nvidia-headless-580` for those.

For other Linux distributions, refer to the [NVIDIA Driver Installation Guide](https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html).

You can check whether the driver has been installed correctly by running the following command. The output shows the version of the installed driver.

```shell
$ modinfo nvidia | grep "^version"
```

## NVIDIA Container Toolkit

Install the NVIDIA Container Toolkit by following the steps for your Linux distribution in the [NVIDIA Container Toolkit installation guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).

If you install Milvus with Docker Compose, configure Docker to use the NVIDIA Container Runtime, restart the Docker daemon, and then run a sample workload to check that containers can access the GPU:

```shell
$ sudo nvidia-ctk runtime configure --runtime=docker
$ sudo systemctl restart docker
$ sudo docker run --rm --runtime=nvidia --gpus all ubuntu nvidia-smi
```

The last command runs `nvidia-smi` in a container and prints information about the GPU devices on the host. If you install Milvus on Kubernetes, prepare your GPU worker nodes as described in the FAQs at the end of this page instead.

## Software requirements

The requirements in this section and the FAQs below apply when you install Milvus with GPU support on Kubernetes using Helm.

It is recommended that you run the Kubernetes cluster on Linux platforms.

- kubectl is the command-line tool for Kubernetes. Use a kubectl version that is within one minor version difference of your cluster. Using the latest version of kubectl helps avoid unforeseen issues.
- minikube is required when running Kubernetes cluster locally. minikube requires Docker as a dependency. Ensure that you install Docker before installing Milvus using Helm. See [Get Docker](https://docs.docker.com/get-docker) for more information.

| Operating system | Software                                                     | Note                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Linux platforms  | <ul><li>Kubernetes 1.16 or later</li><li>kubectl</li><li>Helm 3.0.0 or later</li><li>minikube (for Milvus standalone)</li><li>Docker 19.03 or later (for Milvus standalone)</li></ul> | See [Helm Docs](https://helm.sh/docs/) for more information. |

## FAQs

### How can I start a K8s cluster locally for test purposes?

You can use tools like [minikube](https://minikube.sigs.k8s.io/docs/), [kind](https://kind.sigs.k8s.io/), and [Kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/), to quickly set up a Kubernetes cluster locally. The following procedure uses minikube as an example.

1. Download minikube

  Go to the [Get Started](https://minikube.sigs.k8s.io/docs/start/) page, check whether you have met the conditions listed in the **What you'll need** section, click on the buttons that describe your target platform, and copy the commands to download and install the binary. 

2. Start a K8s cluster using minikube

  ```shell
  $ minikube start
  ```

3. Check the status of the K8s cluster

  You can check the status of the K8s cluster installed using the following command.

  ```shell
  $ kubectl cluster-info
  ```

<div class="alert note">

Ensure that you can access the K8s cluster via `kubectl`. If you have not installed `kubectl` locally, see [Use kubectl inside minikube](https://minikube.sigs.k8s.io/docs/handbook/kubectl/).

</div>

### How can I start a K8s cluster with GPU worker nodes?

If you prefer to use GPU-enabled worker nodes, you can follow the steps below to create a K8s cluster with GPU worker nodes. We recommend installing Milvus on a K8s cluster with GPU worker nodes and using the default storage class provisioned.

1. Prepare GPU worker nodes

  To use GPU-enabled worker nodes, follow steps in [Prepare your GPU nodes](https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes).

2. Enable GPU support on K8s

  Deploy the **nvidia-device-plugin** with Helm by following [these steps](https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm).

  After setting up, view the GPU resources with the following command. Replace `<gpu-worker-node>` with the actual node name.

  ```shell
    $ kubectl describe node <gpu-worker-node>

    Capacity:
    ...
    nvidia.com/gpu:     4
    ...
    Allocatable:
    ...
    nvidia.com/gpu:     4
    ...
    ```  
