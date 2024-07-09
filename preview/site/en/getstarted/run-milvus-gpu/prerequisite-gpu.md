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

The compute capability of your GPU device must be one of the following: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.

To check whether your GPU device suffices the requirement, check [Your GPU Compute Capability](https://developer.nvidia.com/cuda-gpus) on the NVIDIA developer website.

## NVIDIA driver

The NVIDIA driver for your GPU device must be on one of [the supported Linux distributions](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions), and the NVIDIA Container Toolkit has been installed by following [this guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).

For Ubuntu 22.04 users, you can install the driver and the container toolkit with the following commands:

```shell
$ sudo apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
```

For other OS users, refer to the [official installation guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian).

You can check whether the driver has been installed correctly by running the following command:

```shell
$ modinfo nvidia | grep "^version"
version:        545.29.06
```

You are recommended to use the drivers of version 545 and above.

## Software requirements

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

  To use GPU-enabled worker nodes, follow steps in [Prepare your GPU nodes](https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes).

2. Enable GPU support on K8s

  Deploy the **nvidia-device-plugin** with Helm by following [these steps](https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm).

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
