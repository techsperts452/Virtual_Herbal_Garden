// Pagination configuration
const plantsPerPage = 4; // Number of plants per page
const plantCards = document.querySelectorAll(".plant-card"); // All plant cards
const paginationContainer = document.getElementById("pagination"); // Pagination container

// Function to display a specific page
function displayPage(page) {
  const startIndex = (page - 1) * plantsPerPage;
  const endIndex = startIndex + plantsPerPage;

  // Show/Hide plant cards based on the current page
  plantCards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = "block"; // Show card
    } else {
      card.style.display = "none"; // Hide card
    }
  });

  // Update active page in pagination
  const pageLinks = document.querySelectorAll(".pagination-link");
  pageLinks.forEach((link, index) => {
    if (index + 1 === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Function to create pagination links
function setupPagination() {
  const totalPages = Math.ceil(plantCards.length / plantsPerPage);

  // Clear existing pagination links
  paginationContainer.innerHTML = "";

  // Generate page links
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("button");
    pageLink.textContent = i;
    pageLink.className = "pagination-link btn";
    pageLink.onclick = () => displayPage(i);

    // Add page link to the container
    paginationContainer.appendChild(pageLink);
  }

  // Initialize to display the first page
  if (totalPages > 0) displayPage(1);
}

// Initialize pagination on page load
setupPagination();

// Function to start a virtual tour and show the modal
function startTour(theme) {
  const modal = document.getElementById("tourModal");
  const modalContent = document.getElementById("modalContent");

  const tourDetails = {
    immunity: `
      <h3>Immunity Boosters</h3>
      <p>These plants are well-known for enhancing the immune system:</p>
      <ul>
        <li><b>Tulsi:</b> Boosts respiratory health and immune defenses.</li>
        <li><b>Amla:</b> A powerhouse of Vitamin C for improved immunity.</li>
        <li><b>Turmeric:</b> Contains curcumin, a natural anti-inflammatory for overall health.</li>
      </ul>
      <button class="btn" onclick="viewDetails('tulsi')">Learn about Tulsi</button>
      <button class="btn" onclick="viewDetails('amla')">Learn about Amla</button>
      <button class="btn" onclick="viewDetails('turmeric')">Learn about Turmeric</button>
    `,
    skin: `
      <h3>Skin Care Essentials</h3>
      <p>Promote glowing and healthy skin with these plants:</p>
      <ul>
        <li><b>Aloe Vera:</b> Hydrates and soothes the skin.</li>
        <li><b>Neem:</b> Fights acne and promotes clear skin with antibacterial properties.</li>
        <li><b>Turmeric:</b> Brightens the skin and reduces inflammation.</li>
      </ul>
      <button class="btn" onclick="viewDetails('aloevera')">Learn about Aloe Vera</button>
      <button class="btn" onclick="viewDetails('neem')">Learn about Neem</button>
      <button class="btn" onclick="viewDetails('turmeric')">Learn about Turmeric</button>
    `,
    stress: `
      <h3>Stress Relief</h3>
      <p>Discover natural stress-busting plants:</p>
      <ul>
        <li><b>Ashwagandha:</b> An adaptogen that reduces stress and anxiety.</li>
        <li><b>Brahmi:</b> Enhances mental clarity and reduces tension.</li>
        <li><b>Tulsi:</b> Known for its calming and rejuvenating properties.</li>
      </ul>
      <button class="btn" onclick="viewDetails('ashwagandha')">Learn about Ashwagandha</button>
      <button class="btn" onclick="viewDetails('brahmi')">Learn about Brahmi</button>
      <button class="btn" onclick="viewDetails('tulsi')">Learn about Tulsi</button>
    `
  };

  modalContent.innerHTML = `
    <h2>${theme.charAt(0).toUpperCase() + theme.slice(1)} Tour</h2>
    ${tourDetails[theme] || "<p>Details not available for this theme.</p>"}
    <button class="btn close-btn" onclick="closeModal()">Close</button>
  `;

  modal.style.display = "flex";
}

// Function to show details for a specific plant
function viewDetails(plantId) {
  const plantDetails = {
    tulsi: "Tulsi (holy basil) promotes health by reducing stress and anxiety, supporting immune function, improving respiratory health, and fighting inflammation. It has antioxidant properties, helps balance blood sugar levels, and may improve digestion and heart health.",
    aloevera: "Aloe vera promotes health by soothing skin irritations, burns, and wounds, while also providing hydration. It supports digestion, boosts the immune system, reduces inflammation, and may help lower blood sugar levels and improve skin health.",
    neem: "Neem promotes health by supporting immune function, detoxifying the body, and improving skin health. It has antibacterial, antiviral, and anti-inflammatory properties, helping with infections, skin conditions like acne, and digestive health. It may also help regulate blood sugar levels.",
    ashwagandha: "Ashwagandha promotes health by reducing stress and anxiety, improving sleep quality, boosting energy levels, and supporting cognitive function. It also helps balance hormones, strengthen the immune system, and reduce inflammation.",
    turmeric: "Turmeric promotes health by reducing inflammation, boosting immunity, and supporting joint health. Its active compound, curcumin, has antioxidant properties that help protect against chronic diseases, improve brain function, and aid digestion.",
    brahmi: "Brahmi promotes health by enhancing cognitive function, improving memory, and reducing stress and anxiety. It also supports brain health, boosts concentration, aids digestion, and has anti-inflammatory properties that benefit overall wellness.",
    amla: "Amla promotes health by boosting immunity, improving digestion, and supporting heart health. Rich in vitamin C and antioxidants, it helps fight inflammation, enhance skin health, and regulate blood sugar levels while promoting hair growth..",
    ginger: "Ginger improves health by helping with digestion, boosting immunity, reducing swelling, relieving pain, balancing blood sugar, supporting heart and brain health, helping with weight loss, and fighting infections. Its natural compounds, like gingerol, provide strong healing and soothing effects.",
    garlic: "Garlic boosts immunity, supports heart health, fights infections, reduces inflammation, regulates blood sugar, aids digestion, detoxifies the body, and protects brain health with its powerful natural compounds like allicin.",
    chamomile: "Chamomile promotes health by reducing stress and anxiety, aiding sleep, soothing digestive issues, relieving pain and inflammation, and supporting skin health. Its calming properties help improve overall well-being.",
    lavender: "Lavender promotes health by reducing stress and anxiety, improving sleep quality, relieving headaches, easing muscle pain, and supporting skin health. Its calming and soothing properties help enhance mental and physical well-being.",
    peppermint: "Peppermint promotes health by relieving digestive issues like bloating and indigestion, reducing headaches, easing muscle pain, soothing respiratory problems, and improving mental clarity. Its natural compounds have calming and soothing effects on the body.",
    echinacea: "Echinacea promotes health by boosting the immune system, helping to prevent and reduce the severity of colds and infections. It also has anti-inflammatory properties that support overall wellness and may help reduce symptoms of respiratory conditions.",
    cinnamon: "Cinnamon promotes health by regulating blood sugar levels, reducing inflammation, improving heart health, supporting brain function, and boosting immune health. Its antioxidants help protect the body from oxidative stress and infections.",
    stjohns: "St. John's Wort promotes health by improving mood, reducing symptoms of depression and anxiety, and supporting mental well-being. It also has anti-inflammatory properties and may help with wound healing and skin conditions.",
    milkthistle: "Milk thistle promotes health by supporting liver function, detoxifying the body, and protecting against liver damage. It also has antioxidant and anti-inflammatory properties that help improve overall health and may support heart and digestive health.",
    fenugreek: "Fenugreek promotes health by supporting digestive health, improving blood sugar control, boosting milk production in breastfeeding women, reducing inflammation, and promoting heart health. It also has antioxidant properties that support overall well-being.",
    ginseng: "Ginseng promotes health by boosting energy levels, reducing stress, improving cognitive function, enhancing immune function, and supporting heart health. It also has anti-inflammatory properties and may help regulate blood sugar levels.",
    dandelion: "Dandelion promotes health by supporting liver detoxification, improving digestion, reducing inflammation, and boosting immune function. It also acts as a natural diuretic, helping to eliminate excess fluid from the body and supporting overall kidney health.",
    yarrow: "Yarrow promotes health by reducing inflammation, aiding wound healing, improving digestion, and boosting immune function. It also helps relieve symptoms of colds, fevers, and menstrual discomfort, and may support skin health.",
    catnip: "",
    lemonbalm: "Lemon balm promotes health by reducing stress and anxiety, improving sleep quality, aiding digestion, and boosting cognitive function. It also has antiviral properties, which help fight infections, and supports overall immune health.",
    hibiscus: "Hibiscus promotes health by lowering blood pressure, supporting heart health, boosting immune function, and aiding digestion. Its antioxidant properties help fight inflammation and oxidative stress, while it may also help with weight management.",
    calendula: "Calendula promotes health by soothing skin irritations, reducing inflammation, and aiding wound healing. It also has antimicrobial properties, supports immune function, and may help with digestive issues like ulcers or bloating.",
    clove: "Clove promotes health by supporting oral health, relieving pain, boosting digestion, and reducing inflammation. It has strong antimicrobial properties, helps fight infections, and may improve blood circulation and regulate blood sugar levels.",
    cayenne: "Cayenne pepper promotes health by boosting metabolism, aiding digestion, reducing appetite, and improving circulation. Its active compound, capsaicin, has anti-inflammatory and pain-relieving properties, and it may support heart health by lowering blood pressure and cholesterol.",
    thyme: "Thyme promotes health by supporting respiratory health, easing coughs, and reducing congestion. It has antimicrobial properties that help fight infections, boosts immune function, aids digestion, and may help reduce inflammation and muscle pain.",
    rosemary: "Rosemary promotes health by improving memory and concentration, reducing stress and anxiety, boosting digestion, and supporting immune function. It also has anti-inflammatory, antioxidant, and antimicrobial properties that help protect the body from infections and oxidative stress.",
    sage: "Sage promotes health by improving memory and cognitive function, reducing inflammation, and supporting digestive health. It has antimicrobial properties, helps with sore throats, and may alleviate symptoms of menopause, such as hot flashes.",
    licorice: "Licorice root promotes health by supporting digestive health, soothing stomach ulcers, and reducing inflammation. It also helps boost the immune system, relieve respiratory issues like coughs and bronchitis, and may balance hormones. However, it should be used in moderation due to potential side effects.",
    burdock: "Burdock root promotes health by supporting detoxification, improving digestion, and boosting skin health. It has anti-inflammatory and antioxidant properties, helping to fight infections, reduce acne, and support liver function. It may also aid in balancing blood sugar levels.",
    moringa: "Moringa promotes health by providing a rich source of vitamins, minerals, and antioxidants that boost immunity, improve digestion, reduce inflammation, and support heart health. It also helps regulate blood sugar levels, lower cholesterol, and improve skin and hair health.",
    cranberry: "Cranberries promote health by supporting urinary tract health, preventing infections, and improving digestive health. They are rich in antioxidants, which help reduce inflammation, boost heart health, and improve immune function.",
    oliveleaf: "Olive leaf promotes health by boosting the immune system, reducing inflammation, and supporting heart health. Its antioxidant properties help fight free radicals, while it may also help lower blood pressure, improve blood sugar control, and support healthy cholesterol levels."
  };

  const modal = document.getElementById("tourModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <h2>About ${plantId.charAt(0).toUpperCase() + plantId.slice(1)}</h2>
    <p>${plantDetails[plantId] || "Details not available for this plant."}</p>
    <button class="btn close-btn" onclick="closeModal()">Close</button>
  `;

  modal.style.display = "flex";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("tourModal");
  modal.style.display = "none";
}

// Optionally, close the modal when clicking outside the modal content
window.onclick = function (event) {
  const modal = document.getElementById("tourModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Function to search and filter plant cards
function searchPlants() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();

  plantCards.forEach((card) => {
    const plantName = card.querySelector("h3").textContent.toLowerCase();
    const plantDescription = card.querySelector("p").textContent.toLowerCase();

    if (plantName.includes(searchQuery) || plantDescription.includes(searchQuery)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
