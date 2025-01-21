---
layout: page
title: Neural Speech Enhancement
description: removing background noise and echos from noisy audio files
img: assets/img/speech-enhance/input.png
importance: 1
category: Machine Learning
related_publications: true
---

This interactive demo showcases a neural network I designed to enhance multi-speaker audio. The system was trained to remove background noise and reverberation from low-resolution audio files. The network architecture is explained in a separate blog post. Model deployment and its integration into this website are explained in different blog posts.

# File Upload

Upload a _.mp3, .flac, .wav, .aif_ file below. File length is capped at thirty seconds to help manage cost

<div>
    <input type="file" id="upload" accept=".mp3, .wav, .flac, .aif" />
    <audio id="audio" controls style="display: none; margin-top: 10px;">
        <source src="" id="src" />
    </audio>
    <div id="error" style="color: red; margin-top: 10px;"></div>
</div>

<script>
    const uploadInput = document.getElementById("upload");
    const audioElement = document.getElementById("audio");
    const sourceElement = document.getElementById("src");
    const errorDiv = document.getElementById("error");

    // Event listener for upload button. Vheck if valid file and assign source
    uploadInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Clear previous errors and hide audio element
        errorDiv.textContent = "";
        audioElement.style.display = "none";

        // Check file type
        const allowedTypes = [".mp3", ".wav", ".flac", ".aif"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!allowedTypes.includes(`.${fileExtension}`)) {
            errorDiv.textContent = "Invalid file type. Please upload an MP3, WAV, FLAC, or AIF file.";
            return;
        }

        // Load the file and check duration
        const objectURL = URL.createObjectURL(file);
        sourceElement.src = objectURL;
        audioElement.load();

        audioElement.onloadedmetadata = () => {
            const duration = audioElement.duration;
            if (duration > 30) {
                errorDiv.textContent = "File is too long. Please upload a file less than 30 seconds.";
                URL.revokeObjectURL(objectURL); // Clean up
                return;
            }

            // Show the audio player if everything is valid
            audioElement.style.display = "block";
        };
    });
</script>

# Enhancment
Press the 'Enhance' button. 


# format ref

Normal text. You can also put regular text between your rows of images, even citations {% cite einstein1950meaning %}. _italics_

    ---
    Formatted text
    ---

# multi image formatting 
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>

# Centered Single image
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>


# Skewed images
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

# Explination
The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

# raw code
{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
