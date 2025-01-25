---
layout: post
title: Neural Speech Enhancement - Explained
date: 2025-1-24 01:59:00
description: Noisy environments can make speech more difficult to understand. In this project I explore a novel method for removing background noise and echos for audio files with multiple speakers
tags: speech accessibility signal-processing
categories: Machine-Learning Audio-Processing 
thumbnail: assets/img/speech-enhance/complexconv.png
images:
  lightbox2: true
  photoswipe: true
  spotlight: true
  venobox: true
featured: true
toc:
  beginning: false
  side: true
---
---

## Introduction
Speech enhancement aims to improve the audibility and clarity of speech in noisy or reverberant environments. This project explores a neural network-based approach for reducing background noise and echo while enhancing speech quality. The system leverages a Complex U-Net architecture trained to process noisy and reverberant audio, focusing on single-channel, two-speaker scenarios.

The [project page](https://n-reeves.github.io/projects/Neural-Speech-Enhancement/) on this topic contains an interactive demo that allows you to test the model yourself.

_Disclaimer on generative AI use:_ This document was created with the help of ChatGPT, which summarized key content from a more comprehensive paper I wrote. I have verified the accuracy of the information listed here and edited the content where appropriate.

---

## Background
- **Audio Signal**: A time-domain representation of sound that can be transformed into frequency components using techniques like the Short-Time Fourier Transform (STFT).
- **STFT**: A method that splits an audio signal into overlapping frames, applying the Fourier transform to each to yield time-frequency representations.
- **STFT Coefficients**: Complex numbers representing the amplitude (magnitude) and phase of audio signals at specific time-frequency bins.
- **Convolutional Neural Networks (CNNs)**: Neural networks designed to extract features from grid-like data, such as images or spectrograms.
- **Spectrograms**: Visual representations of the frequency content of a signal over time, derived from STFT magnitudes.
- **U-Net**: An encoder-decoder network architecture with skip connections, commonly used for image segmentation and extended here for speech enhancement.
- **Complex Convolutions**: Extensions of convolution operations to the complex domain, enabling models to process both magnitude and phase components.

---

## Demo

Here is a preview of the system's capability. There are clear aesthetic issues with the output, however it appears that background noise is being supressed and the speech content is largely preserved. More details on how this was achieved follow.

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

## Experiment Design
### Objective
To enhance speech clarity by reducing background noise and reverberation in two-speaker audio mixtures.

### Dataset
1. **LibriMix Dataset**: 
   - 8,000 samples of fully overlapping, 8 kHz two-speaker mixtures.
   - Divided into 75% training, 12.5% validation, and 12.5% testing subsets, ensuring no speaker overlap between train and test sets.
   - Additive noise was applied for augmentation.
2. **MIT Impulse Response Dataset**:
   - 271 impulse responses simulating real-world reverberant environments.
   - Partitioned into 70% training, 15% validation, and 15% testing splits.

### Data Augmentation
- Random cropping was applied to training data to introduce noise variations.
- Reverberation was added to mixtures using impulse responses from the MIT dataset.

---

### Loss Function

The loss function minimizes the difference between the predicted and target STFT coefficients:

$$
\mathcal{L} = \sum_{t,f} \left( | \hat{R}_{t,f} - R_{t,f} |^2 + | \hat{I}_{t,f} - I_{t,f} |^2 \right)
$$

Where $$\hat{R}_{t,f}$$ and $$\hat{I}_{t,f}$$ are the predicted real and imaginary components, and $$R_{t,f}$$ and $$I_{t,f}$$ are the target components at time $$t$$ and frequency $$f$$.

---

### Evaluation Metrics

- **Signal-to-Distortion Ratio (SDR)**: Measures the quality of the enhanced signal relative to the ground truth.

$$
\text{SDR} = 10 \log_{10} \frac{\|s_{\text{target}}\|^2}{\|s_{\text{error}}\|^2}
$$

Where $$s_{\text{target}}$$ is the ground truth signal, and $$s_{\text{error}}$$ is the difference between the ground truth and the predicted signal.

- **Perceptual Evaluation of Speech Quality (PESQ)**: Quantifies speech quality as perceived by humans.

$$
\text{PESQ} = f_{\text{pesq}}(s_{\text{enhanced}}, s_{\text{reference}})
$$

Where $$f_{\text{pesq}}$$ is the PESQ evaluation function, $$s_{\text{enhanced}}$$ is the enhanced signal, and $$s_{\text{reference}}$$ is the reference signal.

The final network was chosen based on the average difference between the PESQ scores of the network's output compared to the clean, unaugmented input, and the PESQ scores of the noisy reverberant input audio compared to the clean input.


## Architecture

In audio processing, neural architectures are often designed to work with spectrograms, as this simplifies the handling of complex numbers. It also enables the use of existing image processing techniques, such as convolutional neural networks (CNNs), without issues. However, this approach requires discarding phase information, which can lead to challenges depending on the task.

- The network cannot leverage phase information during training.
- If the system is designed to work with spectrograms (e.g., through masking), the output will be real-valued.

In the context of speech enhancement, I aimed to create a mask that could be applied directly to the output. By applying a mask rather than synthesizing an enhanced signal, the stability of the network is improved. Additionally, when a network is trained to generate a magnitude spectrogram, phase information must be approximated using techniques like Griffin-Lim, or a different system must be employed to convert the real-valued coefficients back to the signal domain.

### Complex Convolutional Layers

A complex convolutional filter $$W = A + iB$$ applied to a complex input $$h = x + yi$$ produces:

$$
Wh = (A * x - B * y) + i(B * x + A * y)
$$

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/speech-enhance/complexconv.png" title="Real vs. Complex Convolution" class="img-fluid rounded z-depth-1" %}
      <label for="output-audio-example">Diagram from  Choi, H.-S. et al. (2019) (author redacted paper) </label>
    </div>
</div>

This idea was proposed by Trabelsi, C. et al. (2018), who also extend the logic to activation functions and different normalization techniques.


### Complex U-Net
The architecture consists of an encoder-decoder network with complex convolutions:
1. **Encoder**: Sequential layers of complex convolutions and downsampling that capture compact representations of the input spectrogram.
2. **Decoder**: Transpose convolutions that reconstruct the spectrogram from encoded features.
3. **Skip Connections**: Feature maps from encoder layers are concatenated with corresponding decoder layers to preserve spatial information.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/speech-enhance/complexskipnet.png" title="Real Valued Skip U-Net from Kothapally, V. et al. 2020" class="img-fluid rounded z-depth-1" %}
      <label for="output-audio-example">Diagram from Kothapally, V. et al. (2020)</label>
    </div>
</div>

My design extends the real-valued U-Net for speech dereverberation design proposed by Kothapally, V. et al. (2020) to the complex domain. It should be noted that my original inspiration for this combination of ideas was from Choi, H.-S. et al. (2019), although the author redacted the paper due to flaws in their methodology.

### Real-Valued Skip U-Net vs. Complex U-Net
- **Real-Valued U-Net**: Operates only on magnitude spectrograms, combining the output with the noisy phase.
- **Complex U-Net**: Processes the full complex STFT coefficients, preserving phase information.

![Real-Valued Skip U-Net Architecture](assets/real_valued_skip_unet.png)
![Complex Convolutional Layer](assets/complex_conv_layer.png)

---

## Post-Processing with Signal Processing
The U-Net applies a tanh activation function to the complex masking coefficients, which stabilizes the output but imposes a strict bound on the signal's intensity. This often results in a reduced perceived loudness. To address this, I designed a custom loudness normalization algorithm that adjusts the output's amplitude envelope, ensuring it closely matches the input's amplitude envelope without any coefficients exceeding the input's intensity.

The key steps are:
1. **STFT Magnitude Adjustment**:
   - Compute scaling factors for each time-frequency coefficent based on the ratio of the magnitude spectrogram of the input signal to the magnitude spectrogram of the output signal.
2. **Normalization Formula**:
   - If the network reduced the magnitude of a coeffient in the output relative to the min and max of the input and output spectrograms, we do not boost the magnitude of those coefficents
3. **Reconstruction**:
   - Apply the inverse STFT (ISTFT) to the normalized audio to generate the final time-domain signal.

More formally, let $$X$$ be the STFT of the input signal, $$Y$$ be the STFT of the output signal. Let
$$|X|^{\text{norm}}$$ and $$|Y|$$ be the min-max normalized spectrograms of $$X$$ and $$Y$$, respectively.

The scaling factor $$sf_{ij}$$ for each complex coefficient $$Y_{ij}$$ is defined as:

$$
\text{sf}_{ij} = \begin{cases}
1 & \text{if } \frac{|X_{ij}|^{\text{norm}}}{|Y_{ij}|^{\text{norm}}} < 1 \\
\frac{|X_{ij}|}{|Y_{ij}|} & \text{otherwise}
\end{cases}
$$

This scaling factor adjusts the magnitude of $$Y_{ij}$$ to match the desired relationship between the input and output signals. Specifically:

**If** $$\frac{|X_{ij}|^{norm}}{|Y_{ij}|^{norm}} < 1$$: The magnitude of the coefficient $$Y_{ij}$$ was reduced by the neural network relative to the input signal. In this case, we assume the network tried to reduce the contribution of this coefficient to the strength of signal, so we do not apply the scaling factor. If this ratio is greater than or equal to one, the scaling factor is applied to the complex coefficient.

Finally, to limit the case where the scaling factor leads to unpleasantly large increases in energy, the scaling factor is limited s.t. the magnitude of each coefficient can't surpass the magnitude of the input coefficient.

## Results and Recap
Overall, I found that the network improved the average PESQ compared to the noisy examples it was trained on. While the network's performance on real-world data indicates there is room for improvement, the results were promising given the limited data and compute available. It was exciting to see that the network could generalize to some extent.

In the future, I would like to extend the training time, increase the data set, and introduce learnable parameters to the signal processing operations. Since differentiable DSP operations can be integrated directly into neural pipelines, this could further enhance the quality of the output.

---

### Assets
- [Input and Output Spectrograms](assets/input_output_spectrogram.png)
- [Audio Example (Input and Output)](assets/audio_example.mp3)
