---
layout: page
title: Neural Speech Enhancement
description: Removing background noise and echos from noisy audio files
img: assets/img/speech-enhance/input.png
importance: 1
category: Machine Learning
related_publications: false
---

This interactive demo showcases a neural network I designed to enhance multi-speaker audio. The system was trained to reduce background noise and reverberation in low-resolution audio files. The project demonstrates the complete deep learning development process, including model architecture design, training procedures, pre/post-processing (with custom signal processing algorithms), MLOps infrastructure, and web development.

Due to limited computational resources, the system was trained for only eight hours on five gigabytes of data, focusing on low-fidelity audio. Despite the short training time and small dataset, the network successfully delivers the intended results in a wide range of real-world audio scenarios.

Further details about the audio processing can be found in a [separate blog post](https://n-reeves.github.io/blog/2025/speech-enhancement-network/). The repository for the inference pipeline can be found [here](https://github.com/n-reeves/speech-enhancement-endpoint). The repository that contains the full model architecure is [here](https://github.com/n-reeves/source-separation).

# File Upload

Upload a _.mp3, .flac, .wav_ file below. File length is capped at thirty seconds and lowered in quality to help manage cost

<div>
    <input type="file" id="upload" accept=".mp3, .wav, .flac" />
    <div id="error" style="color: red; margin-top: 10px;"></div>
    <audio id="input-audio" controls style="display: none; margin-top: 10px;"></audio>
    <a id="input-download" style="display: none; margin-top: 10px;">Download Resampled Audio</a>
</div>
# Enhance

Click the enhance button to process the audio.

<div>
    <input id="enhance-button" type="button" value="Enhance" disabled/>
    <div id="error-enhance" style="color: red; margin-top: 10px;"></div>
    <audio id="output-audio" controls style="display: none; margin-top: 10px;"></audio>
    <a id="output-download" style="display: none; margin-top: 10px;">Download Enhanced Audio</a>
</div>

<script>
    
let audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // Define at top scope
let storedAudioBuffer = null; // Store the decoded audio buffer

//event listener for upload button
document.getElementById('upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const errorElement = document.getElementById('error');
    const inputAudioPlayer = document.getElementById('input-audio');
    const outputAudioPlayer = document.getElementById('output-audio');
    const enhanceButton = document.getElementById('enhance-button');

    if (!file) return;

    const audioObjectUrl = URL.createObjectURL(file);
    const tempAudio = new Audio(audioObjectUrl);

    // Revoke old src if it exists
    if (inputAudioPlayer.src) {
        URL.revokeObjectURL(inputAudioPlayer.src);
        inputAudioPlayer.src = ''; // Clear previous src
        inputAudioPlayer.style.display = 'none';
        enhanceButton.disabled = true;
    }
    
    tempAudio.addEventListener('loadedmetadata', async function () {
        // Check the duration of the file
        const duration = tempAudio.duration;

        if (duration > 30.5) {
            errorElement.textContent = `Error: File length is longer than 30 seconds. Uploaded file is ${duration} seconds.`;
            URL.revokeObjectURL(audioObjectUrl);
        } else {
            try {
                const resampledAudioURL = await resampleAudio(file);
                URL.revokeObjectURL(audioObjectUrl);

                inputAudioPlayer.src = resampledAudioURL;
                inputAudioPlayer.style.display = 'block';

                enhanceButton.disabled = false;
                errorElement.textContent = '';

            } catch (err) {
                errorElement.textContent = `Error processing the audio file. ${err}`;
                console.error(err);
            }
        }   
    });
});

async function resampleAudio(file) {
    const desiredSampleRate = 8000;
    const audioContext = new window.AudioContext();
    
     // Decode the audio file
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // If the sample rate matches the desired rate, return the original buffer
    if (audioBuffer.sampleRate === desiredSampleRate) {
        return URL.createObjectURL(file);
    }

    // Resample the audio
    const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        Math.ceil(audioBuffer.length * desiredSampleRate / audioBuffer.sampleRate),
        desiredSampleRate
    );
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();

    const resampledBuffer = await offlineContext.startRendering();

    storedAudioBuffer = resampledBuffer;

    // Encode the resampled buffer to a WAV file
    const wavBlob = encodeWAV(resampledBuffer);
    return URL.createObjectURL(wavBlob);
}

function encodeWAV(audioBuffer) {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const buffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(buffer);

    // Write the WAV container header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 4, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, length * 2, true);

    // Write the PCM samples
    const offset = 44;
    const data = new Float32Array(audioBuffer.length * numberOfChannels);
    for (let channel = 0; channel < numberOfChannels; channel++) {
        audioBuffer.copyFromChannel(data.subarray(channel * audioBuffer.length, (channel + 1) * audioBuffer.length), channel);
    }
    for (let i = 0; i < data.length; i++) {
        const sample = Math.max(-1, Math.min(1, data[i]));
        view.setInt16(offset + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

document.getElementById('enhance-button').addEventListener('click', async function () {
    const inputAudioPlayer = document.getElementById('input-audio');
    const outputAudioPlayer = document.getElementById('output-audio');
    const errorElementEnhance = document.getElementById('error-enhance');

    if (!inputAudioPlayer.src) { 
        errorElementEnhance.textContent = "No audio source found!";
        return;
    }

    try {
        //check if api is up
        let testResponse = await fetch("https://humble-wrongly-bluebird.ngrok-free.app/ping", {
                                                method: "GET",
                                                headers: {
                                                    "Ngrok-Skip-Browser-Warning": "true"
                                                }
                                                });
        let testJsonResponse = await testResponse.json();

        if (testJsonResponse.error) {
            errorElementEnhance.textContent = `Error: Network Communication Failed`;
        } else {
            //if api is up, invocations
            errorElementEnhance.textContent = `Network Communication Succesful: Please wait while the file is processed`;

            let listOfLists = await audioBufferToLists(storedAudioBuffer);
            let responseOutput = await fetch("https://humble-wrongly-bluebird.ngrok-free.app/invocations", {
                                                                method: "POST",
                                                                headers: {"Ngrok-Skip-Browser-Warning": "true",
                                                                    "Content-Type": "application/json"},
                                                                body: JSON.stringify({ audio: listOfLists })});

            let responseOutputJson = await responseOutput.json();
            let outputAudioRaw = responseOutputJson.output_audio;
            let outputAudioRawTyped = new Float32Array(outputAudioRaw[0]);

            //to do: convert array buffer to audio buffer to wavblob to url
            let outputAudioBuffer = new AudioBuffer({
                                                    length: outputAudioRawTyped.length,
                                                    numberOfChannels: 1,
                                                    sampleRate: 8000 });
            outputAudioBuffer.copyToChannel(outputAudioRawTyped, 0);
            let outputWavBlob = encodeWAV(outputAudioBuffer);
            let outputURL = URL.createObjectURL(outputWavBlob);

            //display audio
            outputAudioPlayer.src = outputURL;
            outputAudioPlayer.style.display = 'block';
            
            //debug content
            //let outputAudioArrayBuffer = outputAudioRawTyped.buffer;
            let keys = Object.keys(responseOutputJson);
            let jsonString = JSON.stringify(responseOutputJson, null, 2);
            errorElementEnhance.textContent = ``;
        }
    } catch (err) {
        errorElementEnhance.textContent = `Process Failed: ${err.message || err}`;
    }
});

async function audioBufferToLists(audioBuffer) {
    let numChannels = audioBuffer.numberOfChannels;
    let sampleLists = [];

    for (let i = 0; i < numChannels; i++) {
        let channelData = audioBuffer.getChannelData(i); // Float32Array
        sampleLists.push(Array.from(channelData)); // Convert to normal list
    }

    return sampleLists; // Returns list of lists
}
</script>


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