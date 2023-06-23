---
description: >-
  Zesty.io's DAM has on-the-fly (OTF) rendering options to improve and
  manipulate media that both developers and content authors can use.
---

# On-The-Fly Media Optimization and Dynamic Image Manipulation

### Auto Image Optimization - Default Output

Zesty.io automatically transforms images as the content-type "webp", which is a format made to  optimized image download speed and rendering speed, developed by Google.

> &#x20;WebP is a modern **image format** that provides superior **lossless and lossy** compression for images on the web. Using WebP, webmasters and web developers can create smaller, richer images that make the web faster. - _Read the full Google launch article_ [_https://developers.google.com/speed/webp_](https://developers.google.com/speed/webp)

&#x20;When optimization happens, Zesty.io does a few things to the file:

* All metadata (for example, EXIF, XMP, or ICC) will is removed.
* Any [ICC profile](https://en.wikipedia.org/wiki/ICC\_profile) on the image is applied directly to the image to ensure color output is correct. If the image doesn't have an ICC profile, a default profile is added.
* If the source image contains orientation metadata, this orientation will be applied directly to the image data and metadata will be removed.
* Images are served with their original name and extension, but will still output as `content-type` "webp"&#x20;

### OTF DAM Quick Examples

```markup
<!-- using the direct media url, append query parameters to the url --> 
<img src="https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?width=200" alt="space ship example">
<!-- using parsley, append query paramters outside th call -->
<img src="{{this.image.getImage()}}?width200&crop=1:1" alt="parsley example">

<!-- example using src set images to be used at different display pixel densities -->
<img srcset="{{this.image.getImage()}}?width=320&dpr=1.5 1.5x,
             {{this.image.getImage()}}?width=320&dpr=2 2x"
     src="{{this.image.getImage()}}?width=320"/>
     
<!-- HTML5 art direction, use different images based on browser width -->
<picture>
  <source srcset="{{this.image.getImage()}}?width=600&crop=16:9" media="(min-width: 600px)"/>
  <img src="{{this.image.getImage()}}?width=320&crop=1:1"/>
</picture>

<style>
  .header {
    background-image: url(https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?width=2000)
  }
</style>
```

### Bypass Image Optimization&#x20;

To bypass image optimization to get the raw encoding and data of the origin image, append `?raw=true` to the end of the image request like so:

`https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?raw=true`

This is useful for fetching EXIF data or other meta data hidden in your image file.

### Image Manipulation Options

All image may be manipulated on-the-fly by passing query parameter to the end of the image URL. See the example below

| Query Param    | Example                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **none**       | [https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg](https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg)                         |
| **?width=**    | [https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?width=300](https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?width=300)     |
| **?orient=**   | [https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?orient=v](https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?orient=v)       |
| **?bg-color=** | [https://9skdl6.media.zestyio.com/parsley-logo-brackets.png?bg-color=006699](https://9skdl6.media.zestyio.com/parsley-logo-brackets.png?bg-color=006699) |

![Original Image Source: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg](../../../.gitbook/assets/Arcade-Space-Ship-Example.jpg)

We recognize the following parameters in the query string of the image request:

| Parameter                                                                                                                     | Description                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`auto`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#auto-optimize-image-jpg-auto)                        | Enable optimization features automatically.                                                     |
| [`bg-color`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#background-color-bg-color)                       | Set the background color of an image.                                                           |
| [`bypass`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#bypass-image-jpg-raw-true)                         | Ignore all optimization and fetch the raw original image                                        |
| [`blur`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#gaussian-blur-blur)                                  | Set the blurriness of the output image.                                                         |
| [`brightness`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#brightness-brightness)                         | Set the brightness of the output image.                                                         |
| [`canvas`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#canvas)                                            | Increase the size of the canvas around an image.                                                |
| [`contrast`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#contrast-image-jpg-contrast)                     | Set the contrast of the output image.                                                           |
| [`crop`](https://developer.fastly.com/reference/io/crop)                                                                      | Crop an image by removing pixels from an image based on a ratio. Great for thumbnails.          |
| [`dpr`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#device-pixel-ratio-dpr-image-jpg-dpr)                 | Device Pixel Ratio - Serve correctly sized images for devices that expose a device pixel ratio. |
| [`fit`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#fit-image-jpg-fit-cover-and-height-200-and-width-200) | Set how the image will fit within the width and height provided.                                |
| [`height`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#height-images-jpg-height)                          | Resize the height of the image.                                                                 |
| [`optimize`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#image-optimize-image-jpg-optimize)               | Automatically apply optimal quality compression.                                                |
| [`orient`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#orientation-image-jpg-orient)                      | Change the cardinal orientation of the image.                                                   |
| [`pad`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#image-padding-image-jpg-pad)                          | Add pixels to the edge of an image, like css padding.                                           |
| [`quality`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#image-quality-image-jpg-quality)                  | Optimize the image to the given compression level for lossy file formatted images.              |
| [`saturation`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#saturation-image-jpg-saturation)               | Set the saturation of the output image.                                                         |
| [`sharpen`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#sharpen-image-jpg-sharpen)                        | Set the sharpness of the output image.                                                          |
| [`trim`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#trim-image-jpg-trim)                                 | Remove pixels from the edge of an image.                                                        |
| [`width`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#width-image-jpg-width)                              | Resize the width of the image.                                                                  |

### Image Manipulation Processing order

Manipulation query parameters can be specified in any order, but they are processed in this order:

| Order | Query Call                                                 |
| ----- | ---------------------------------------------------------- |
| 1     | `trim`                                                     |
| 2     | `crop`                                                     |
| 3     | `orient`                                                   |
| 4     | `width`     `height`    `dpr`     `fit`                    |
| 5     | `pad`     `canvas`     `bg-color`                          |
| 6     | `brightness`     `contrast`     `saturation`               |
| 7     | `sharpen`                                                  |
| 8     | `blur`                                                     |
| 9     |  `auto`    `optimize`    `quality`    `profile`    `level` |

## Zesty.io OTF DAM: On-The-Fly Image Options API

All query parameters listed below may be used in conjunction with one another, and may be stacked. Some query params conflict with each other, for example [pad](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#image-padding-image-jpg-pad) and [canvas](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#canvas). This behavior is documented under each example API call.










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?format=pjpg\&auto=webp](<../../../.gitbook/assets/image (3).png>)










![https://9skdl6.media.zestyio.com/parsley-logo-brackets.png?bg-color=105,1,103](<../../../.gitbook/assets/image (22).png>)

![https://9skdl6.media.zestyio.com/parsley-logo-brackets.png?bg-color=323CF3](<../../../.gitbook/assets/image (13).png>)



















![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?blur=20](<../../../.gitbook/assets/image (37).png>)










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?brightness=20](<../../../.gitbook/assets/image (8).png>)

## Canvas

Canvas is used for advanced targeted cropping of images.&#x20;

The `canvas` image modifier query parameter takes multiple values which can get complicated, so we included example references as they are best to understand the behavior. To get a feel for it, experiment with the image url example provided, and play with the numbers.

![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?canvas=500,100](<../../../.gitbook/assets/image (93).png>)

The canvas query param takes comma separated values **`SIZE,POSITION`**, where **SIZE** is a pixel width and height `500,100`or a ratio like `2:1`. The **POSITION**  is represented as a percentage offset from the center of the image using `offset-x` and `offset-y`like `offset-x50,offset-y95` . **POSITION** and **SIZE** together look like this:`canvas=400,130,offset-x50,offset-y95`. If **POSITION** is omitted, the image centers by default.&#x20;

![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?width=500\&canvas=320,100](<../../../.gitbook/assets/image (14).png>)

![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?width=1000\&canvas=400,130,offset-x50,offset-y95](<../../../.gitbook/assets/image (96).png>)

* The background color of the canvas will default to transparency for image output formats that support transparency and white for formats that don't. This behavior can be changed by adding the [`bg-color`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#background-color-image-jpg-bg-color) parameter.
* When using [`canvas`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#canvas) and [`pad`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#image-padding-image-jpg-pad) at the same time, [`pad`](on-the-fly-media-optimization-and-dynamic-image-manipulation.md#image-padding-image-jpg-pad) will be ignored.
* &#x20;Fractional pixel measurements are rounded to the nearest whole pixel.










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?canvas=500,400,offset-x20,offset-y20](<../../../.gitbook/assets/image (70).png>)










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?contrast=100](<../../../.gitbook/assets/image (66).png>)













![Crop Example: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?crop=1:1\&width=200](<../../../.gitbook/assets/image (57).png>)

![Crop example: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?crop=4:1\&width=800](<../../../.gitbook/assets/image (86).png>)










![DPR example: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?dpr=2\&width=200](<../../../.gitbook/assets/image (92).png>)
















![Fit Crop Example: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?fit=crop\&width=200\&height=400](<../../../.gitbook/assets/image (74).png>)

![Fit Bounds example keeps within the width, reducing height: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?fit=bounds\&width=200\&height=400](<../../../.gitbook/assets/image (33).png>)

![Fit cover fits within the largest bounds, which is height in this examples: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?fit=cover\&width=200\&height=400](<../../../.gitbook/assets/image (103).png>)










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?height=100](<../../../.gitbook/assets/image (54).png>)



















![Orientation example: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?orient=l](<../../../.gitbook/assets/image (28).png>)










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?pad=10,10,50,10\&bg-color=FFC0CB\&width=500](<../../../.gitbook/assets/image (58).png>)










![Reduced from 56KB to 4KB https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?quality=1](<../../../.gitbook/assets/image (97).png>)

![56KB full quality https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?quality=100\&width=500](<../../../.gitbook/assets/image (32).png>)










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?saturation=-50](<../../../.gitbook/assets/image (63).png>)

![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?saturation=100](<../../../.gitbook/assets/image (38).png>)

![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?saturation=-100](<../../../.gitbook/assets/image (5).png>)










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?sharpen=a10,r1000,t100](<../../../.gitbook/assets/image (56).png>)

![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?sharpen=a5,r5,t4](<../../../.gitbook/assets/image (67).png>)

![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?sharpen=a10,r500,t10](<../../../.gitbook/assets/image (104).png>)










![Trim: https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?trim=25p,50p,20p,10p](<../../../.gitbook/assets/image (23).png>)










![https://9skdl6.media.zestyio.com/Arcade-Space-Ship-Example.jpg?width=800](<../../../.gitbook/assets/image (25) (1).png>)

#### About Zesty.io On-The-Fly Media Technology

Zesty.io leverages Fastly's Image Optimization technology layered on top of the Zesty.io DAM Media Manager. Features documented here relate to what is supported through Zesty.io WebEngine and Media services.
