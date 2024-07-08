---
id: image_deduplication_system.md
summary: Build an image deduplication system with Milvus.
title: Image Deduplication
---

# Image Deduplication

This tutorial demonstrates how to use Milvus, the open-source vector database, to build an image deduplication system.

- [Open notebook](https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb)

The ML model and third-party software used include:

- ResNet-50

- [Towhee](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&url=https%3A%2F%2Ftowhee.io%2F&usg=AOvVaw37IzMMiyxGtj82K7O4fInn)

Recent years witness an exponential explosion of user-generated content. People can instantly upload a picture they have taken to a social media platform. However, with such an abundance of image data, we see many duplicated content. In order to improve user experience, these duplicated images has to be removed. An image deduplication system saves us from manual labor of comparing images in the database one by one to tease out duplicate images. Picking out exactly identical images is not a complicated task at all. However, sometimes a picture can be zoomed in, cropped, or with brightness or gray scale adjusted. The image deduplication system needs to identify these similar images and eliminate them as well.

In this tutorial, you will learn how to build an image deduplication system. This tutorial uses the ResNet-50 model to extract features of images and convert them into vectors. Then these image vectors are stored in the Milvus vector database and a vector similarity search is also conducted in Milvus as well.

![Image_deduplication_workflow](../../../assets/image_deduplication.png "Workflow of an image deduplication system.")
