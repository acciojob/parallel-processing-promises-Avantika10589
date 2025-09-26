const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages(imageUrls) {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  const promises = imageUrls.map(imgObj => downloadImage(imgObj.url));

  Promise.all(promises)
    .then(images => {
      images.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

btn.addEventListener("click", () => downloadImages(images));
