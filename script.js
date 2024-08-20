document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.hero img');
    let currentImageIndex = 0;

    if (images.length > 0) {
        setInterval(() => {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.add('active');
        }, 5000); // Change image every 5 seconds
    } else {
        console.log('No images found in the hero section.');
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.hero img');
    const heroText = document.getElementById('hero-text');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    function typeText(text, callback) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typing, 100); // Speed of typing
            } else {
                setTimeout(callback, 5000); // Wait 5 seconds after typing
            }
        }
        typing();
    }

    function eraseText(callback) {
        let text = heroText.textContent;
        function erasing() {
            if (text.length > 0) {
                text = text.substring(0, text.length - 1);
                heroText.textContent = text;
                setTimeout(erasing, 50); // Speed of erasing
            } else {
                setTimeout(callback, 1000); // Short pause before retyping
            }
        }
        erasing();
    }

    function typeAndEraseLoop() {
        typeText('Welcome to Our Hospital', function() {
            eraseText(typeAndEraseLoop);
        });
    }

    images[currentIndex].classList.add('active');
    setInterval(showNextImage, 20000); // Change image every 20 seconds

    // Start typing and erasing loop
    typeAndEraseLoop();
});



function handleSubmit(event) {
    event.preventDefault();
    alert('Booked successfully');
    document.getElementById('appointmentForm').reset();
    return false;
}


window.onload = function() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var minDate = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date').setAttribute('min', minDate);
}

document.addEventListener('DOMContentLoaded', function() {
    var ourLoc = L.map('map').setView([12.93471401354978, 77.60615542856307], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(ourLoc);

    function extractCoordinates(url) {
        const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const matches = url.match(regex);
        if (matches) {
            return { lat: parseFloat(matches[1]), lng: parseFloat(matches[2]) };
        }
        return null;
    }

    function calculateRoute(start, end) {
        L.Routing.control({
            waypoints: [
                L.latLng(start.lat, start.lng),
                L.latLng(end.lat, end.lng),
            ],
            routeWhileDragging: true,
        }).addTo(ourLoc);
    }

    function showRoute() {
        var startUrl = document.getElementById("startUrl").value;
        var endUrl = document.getElementById("endUrl").value;

        var startLocation = extractCoordinates(startUrl);
        var endLocation = extractCoordinates(endUrl);

        if (startLocation && endLocation) {
            ourLoc.setView([startLocation.lat, startLocation.lng], 13);
            calculateRoute(startLocation, endLocation);
        } else {
            alert("Invalid Google Maps URLs. Please enter valid URLs.");
        }
    }

    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(pos => {
            L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(ourLoc)
                .bindPopup('Our Location')
                .openPopup();
            document.getElementById("map").classList.remove("d-none");
        }, error => {
            let msg = "";
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    msg = "User Denied Permission";
                    break;
                case error.POSITION_UNAVAILABLE:
                    msg = "Can't Locate User's Position";
                    break;
                case error.TIMEOUT:
                    msg = "Time out";
                    break;
            }
            let errorArea = document.getElementById("errorArea");
            errorArea.innerHTML = msg;
            errorArea.classList.remove("d-none");
        });
    } else {
        console.log("Update your browser to get Geolocation Object");
    }

    document.querySelector('.btn-consult').addEventListener('click', showRoute);
});




document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector("#xmlTable tbody");

    

    fetch('doctors.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const doctors = xmlDoc.getElementsByTagName("doctor");

            // Clear table body before adding rows
            tableBody.innerHTML = '';

            for (let i = 0; i < doctors.length; i++) {
                const specialization = doctors[i].getElementsByTagName("specialization")[0].textContent;
                const opdTime = doctors[i].getElementsByTagName("opd_time")[0].textContent;

                // Validate specialization and opd_time before displaying
                if (["Cardiologist", "General Physician", "Pediatrician", "Neurologist", "Dermatologist", "Oncologist"].includes(specialization) &&
                    /^[0-1][0-9]:[0-5][0-9] (AM|PM) - [0-1][0-9]:[0-5][0-9] (AM|PM)$/.test(opdTime)) {
                    
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = doctors[i].getElementsByTagName("name")[0].textContent;
                    row.insertCell(1).textContent = doctors[i].getElementsByTagName("qualification")[0].textContent;
                    row.insertCell(2).textContent = specialization;
                    row.insertCell(3).textContent = opdTime;
                } else {
                    console.error('Invalid data detected and skipped:', {specialization, opdTime});
                }
            }
        })
        .catch(error => {
            console.error('Error fetching XML data:', error);
            tableBody.innerHTML = '<tr><td colspan="4">Error loading doctor data.</td></tr>';
        });
});



