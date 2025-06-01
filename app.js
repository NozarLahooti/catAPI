import axios from "axios";

const API_KEY =
  "live_tarWDGdbUihyeYet0DJIOUxVnsmnynR2GUQ3Jd6dlseIX26iy6dgbt0GIgM3cnzt";

// Add Interceptors
axios.interceptors.request.use(config => {
    config.headers['api-key'] = API_KEY;
    return config;
});

async function loadBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");

    const breedSelect = document.getElementById("breedSelect");
    response.data.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading breeds:", error);
  }
}

document.getElementById("breedSelect").addEventListener("change", async () => {
  const selectBreedId = document.getElementById("breedSelect").value;
  const carouselInner = document.querySelector(".carousel-inner");
  carouselInner.innerHTML = "";

  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectBreedId}&limit=5`);

    const data = response.data;

    data.forEach((cat, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) carouselItem.classList.add("active");

      const img = document.createElement("img");
      img.src = cat.url ?? "https://via.placeholder.com/600x400?text=No+Image";
      img.classList.add("d-block", "w-100");

      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    });
  } catch (error) {
    console.error("Error fetching cat images:", error);
  }
});

loadBreeds();




