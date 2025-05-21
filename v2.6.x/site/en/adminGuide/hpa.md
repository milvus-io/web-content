---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: Learn how to configure Horizontal Pod Autoscaling (HPA) to dynamically scale a Milvus cluster.
title: Configure Horizontal Pod Autoscaling (HPA) for Milvus
---
# Configure Horizontal Pod Autoscaling (HPA) for Milvus

## Overview

Horizontal Pod Autoscaling (HPA) is a Kubernetes feature that automatically adjusts the number of Pods in a deployment based on resource utilization, such as CPU or memory. In Milvus, HPA can be applied to stateless components like `proxy`, `queryNode`, `dataNode`, and `indexNode` to dynamically scale the cluster in response to workload changes.

This guide explains how to configure HPA for Milvus components using the Milvus Operator.

## Prerequisites

- A running Milvus cluster deployed with Milvus Operator.
- Access to `kubectl` for managing Kubernetes resources.
- Familiarity with Milvus architecture and Kubernetes HPA.

## Configure HPA with Milvus Operator

To enable HPA in a Milvus cluster managed by the Milvus Operator, follow these steps:

1. **Set Replicas to -1**:

   In the Milvus custom resource (CR), set the `replicas` field to `-1` for the component you want to scale with HPA. This delegates scaling control to HPA instead of the operator. You can edit the CR directly or use the following `kubectl patch` command to quickly switch to HPA control:

   ```bash
   kubectl patch milvus <your-release-name> --type='json' -p='[{"op": "replace", "path": "/spec/components/proxy/replicas", "value": -1}]'
   ```

   Replace `<your-release-name>` with the name of your Milvus cluster.

   To verify that the change has been applied, run:

   ```bash
   kubectl get milvus <your-release-name> -o jsonpath='{.spec.components.proxy.replicas}'
   ```

   The expected output should be `-1`, confirming that the `proxy` component is now under HPA control.

   Alternatively, you can define it in the CR YAML:

   ```yaml
   apiVersion: milvus.io/v1beta1
   kind: Milvus
   metadata:
     name: <your-release-name>
   spec:
     mode: cluster
     components:
       proxy:
         replicas: -1
   ```
2. **Define an HPA Resource**:

   Create an HPA resource to target the deployment of the desired component. Below is an example for the `proxy` component:

   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: my-release-milvus-proxy-hpa
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: my-release-milvus-proxy
     minReplicas: 2
     maxReplicas: 10
     metrics:
       - type: Resource
         resource:
           name: cpu
           target:
             type: Utilization
             averageUtilization: 60
       - type: Resource
         resource:
           name: memory
           target:
             type: Utilization
             averageUtilization: 60
     behavior:
       scaleUp:
         policies:
           - type: Pods
             value: 1
             periodSeconds: 30
       scaleDown:
         stabilizationWindowSeconds: 300
         policies:
           - type: Pods
             value: 1
             periodSeconds: 60
   ```

   Replace `my-release` in `metadata.name` and `spec.scaleTargetRef.name` with your actual Milvus cluster name (e.g., `<your-release-name>-milvus-proxy-hpa` and `<your-release-name>-milvus-proxy`).
3. **Apply the HPA Configuration**:

   Deploy the HPA resource using the following command:

   ```bash
   kubectl apply -f hpa.yaml
   ```

   To verify that the HPA has been successfully created, run:

   ```bash
   kubectl get hpa
   ```

   You should see output similar to:

   ```
   NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
   my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   <some>/60%      2         10        2          <time>
   ```

   The `NAME` and `REFERENCE` fields will reflect your cluster name (e.g., `<your-release-name>-milvus-proxy-hpa` and `Deployment/<your-release-name>-milvus-proxy`).

- `scaleTargetRef`: Specifies the deployment to scale (e.g., `my-release-milvus-proxy`).
- `minReplicas` and `maxReplicas`: Sets the scaling range (2 to 10 Pods in this example).
- `metrics`: Configures scaling based on CPU and memory utilization, targeting 60% average usage.

## Conclusion

HPA allows Milvus to efficiently adapt to varying workloads. By using the `kubectl patch` command, you can quickly switch a component to HPA control without manually editing the full CR. For more details, refer to the [Kubernetes HPA documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).
