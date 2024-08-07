document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.hero img');
    let currentImageIndex = 0;

    setInterval(() => {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }, 5000); // Change image every 20 seconds
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

    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(pos=>{

            // Display the map
            // var map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // }).addTo(map);
            // L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
            //     .bindPopup('You are here')
            //     .openPopup();
            
            var ourLoc = L.map('map').setView([12.936354284593302, 77.6062412905495], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(ourLoc);
            L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(ourLoc)
                .bindPopup('Our Location')
                .openPopup();
            

            document.getElementById("map").classList.remove("d-none");

        },error=>{
            let msg="";
            switch(error.code){
                case error.PERMISSION_DENIED:
                    msg="User Denied Permission";
                    break;
                case error.POSITION_UNAVAILABLE:
                    msg="Can't Locate User's Position";
                    break;
                case error.TIMEOUT:
                    msg="Time out";
                    break;
            }
         let errorArea=document.getElementById("errorArea");
         errorArea.innerHTML=msg;
         errorArea.classList.remove("d-none");


        })

    }else{
        console.log("Update your browser to get Geolocation Object");
    }

});