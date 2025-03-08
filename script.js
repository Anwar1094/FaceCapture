const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const capturedImagesDiv = document.getElementById('captured-images');

// Access the user's camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing webcam: ', error);
  });

// Function to capture an image and send it to the server
function captureImage() {
  const inp = document.getElementById('id-inp').value;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current video frame onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the canvas image to a data URL (base64 image)
  const imageDataUrl = canvas.toDataURL('image/png');
  
  // Send the image data to the server
  sendImageToServer(imageDataUrl, inp);
  
  // Create an image element and add it to the captured images section
  const img = document.createElement('img');
  img.src = imageDataUrl;
  capturedImagesDiv.appendChild(img);

  captureBtn.disabled = true; // Disable capture button after 5 pictures
  alert("You've captured 5 pictures!");
}

// Function to send image data to the server
function sendImageToServer(imageDataUrl, id) {
  fetch('https://facecapture.onrender.com/save_image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageDataUrl, id})
  })
  .then(response => response.json())
  .then(data => {
    console.log('Image saved:', data);
    console.log('Input:', id);

    // console.log('Input:', inp.nodeValue);
    
  })
  .catch(error => {
    console.error('Error saving image:', error);
  });
}

// Add event listener to the capture button
captureBtn.addEventListener('click', captureImage);
