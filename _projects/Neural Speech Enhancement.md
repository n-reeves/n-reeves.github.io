---
layout: page
title: Neural Speech Enhancement
description: Removing background noise and echos from noisy audio files
img: assets/img/speech-enhance/input.png
importance: 1
category: Machine Learning
related_publications: false
---

This page is under development as I configure the infrastructure to securely manage web traffic and enforce computational restrictions. The model is currently deployed on SageMaker using a FastAPI framework. Please check back soon for updates on the full integration of the model into the webpage.

This interactive demo showcases a neural network I designed to enhance multi-speaker audio. The system was trained to reduce background noise and reverberation in low-resolution audio files. The project demonstrates the complete deep learning development process, including model architecture design, training procedures, pre/post-processing (with custom signal processing algorithms), MLOps infrastructure, and web development.

Due to limited computational resources, the system was trained for only eight hours on five gigabytes of data, focusing on low-fidelity audio. Despite the short training time and small dataset, the network successfully delivers the intended results in a wide range of real-world audio scenarios.

Further details about the audio processing can be found in a [separate blog post](https://n-reeves.github.io/blog/2025/speech-enhancement-network/). The repository for the inference pipeline can be found [here](https://github.com/n-reeves/speech-enhancement-endpoint). The repository that contains the full model architecure is [here](https://github.com/n-reeves/source-separation).

# Example

Here is a preview of the system's capability. There are clear aesthetic issues with the output, however it appears that background noise is being supressed and the speech content is largely preserved. It is unclear whether the system provides any perceptual advantage in output quality during noisy scenarios for individuals with hearing impairments in real-life situations.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <label for="input-audio-example">Input Audio Example</label>
        {% include audio.liquid path="assets/audio/quiet-speech-loud-drone_in.wav" controls=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <label for="output-audio-example">Output Audio Example</label>
        {% include audio.liquid path="assets/audio/quiet-speech-loud-drone_out.wav" controls=true %}    
    </div>
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/speech-enhance/speech-enhance-example.png" title="" class="img-fluid rounded z-depth-1" %}
    </div>
</div>



<!-- # File Upload

Upload a _.mp3, .flac, .wav, .aif_ file below. File length is capped at thirty seconds to help manage cost

<div>
    <input type="file" id="upload" accept=".mp3, .wav, .flac, .aif" />
    <button id="enhance">Enhance</button>
    <div id="error" style="color: red; margin-top: 10px;"></div>
    <audio id="input-audio" controls style="display: none; margin-top: 10px;"></audio>
    <audio id="output-audio" controls style="display: none; margin-top: 10px;"></audio>
    <a id="input-download" style="display: none; margin-top: 10px;">Download Resampled Audio</a>
    <a id="output-download" style="display: none; margin-top: 10px;">Download Enhanced Audio</a>
</div> -->