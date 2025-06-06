document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".project-hero-image, .image-in-box");

  images.forEach(function (image) {
    image.addEventListener("click", function () {
      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100%";
      popup.style.height = "100%";
      popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      popup.style.display = "flex";
      popup.style.justifyContent = "center";
      popup.style.alignItems = "center";
      popup.style.zIndex = "9999";

      // Container for the image (to add background only for .image-in-box)
      const imgContainer = document.createElement("div");

      // Add background only for .image-in-box images
      if (image.classList.contains("image-in-box")) {
        imgContainer.style.backgroundColor = "#F7F7F7";
        imgContainer.style.padding = "10px";          // optional, add some padding so bg shows nicely
        imgContainer.style.borderRadius = "4px";      // optional rounded corners
        imgContainer.style.display = "inline-block";  // shrink-wrap to image size
      }

      const popupImage = document.createElement("img");
      popupImage.src = image.src;
      popupImage.alt = image.alt;
      popupImage.style.maxWidth = "90%";
      popupImage.style.maxHeight = "90%";
      popupImage.style.display = "block";

      // Append image to container, container to popup
      imgContainer.appendChild(popupImage);
      popup.appendChild(imgContainer);

      popup.addEventListener("click", () => popup.remove());

      document.body.appendChild(popup);
    });
  });
});

