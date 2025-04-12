const guides = [
    {
        name: "janani",
        location: "Chennai",
        languages: "Tamil, English",
        experience: "5 Years",
        phone: "+919876543210",
        image: "i2.png"
    },
    {
        name: "Meena Devi",
        location: "Madurai",
        languages: "Tamil, English, Hindi",
        experience: "8 Years",
        phone: "+919812345678",
        image: "i2.png"
    },
    {
        name: "Arun Prakash",
        location: "Thirunelveli",
        languages: "Tamil, Malayalam",
        experience: "5 Years",
        phone: "+91982345844",
        image: "image.png"
    },
    {
        name: "kamaraj",
        location: "Coimbatore",
        languages: "Tamil, English, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "image.png"
    },
    {
        name: "Mathankumar",
        location: "salem",
        languages: "Tamil, English, Malayalam",
        experience: "2 Years",
        phone: "+918562145987",
        image: "image.png"
    },
    {
        name: "Vignesh",
        location: "Coimbatore",
        languages: "kannada, English, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "image.png"
    },
    {
        name: "Arunesh",
        location: "tirchy",
        languages: " kannada, Malayalam",
        experience: "4 Years",
        phone: "+9198275026789",
        image: "image.png"
    },
    {
        name: "sanjana",
        location: "tirchy",
        languages: "Tamil, English, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "i2.png"
    },
    {
        name: "lakshmi",
        location: "Coimbatore",
        languages: " English, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "i2.png"
    },
    {
        name: "Arun Prakash",
        location: "vellore",
        languages: "Tamil,Hindi, English, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "image.png"
    },
    {
        name: "pooja",
        location: "Chennai",
        languages: "Tamil,Hindi, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "i2.png"
    },
    {
        name: "Arun",
        location: "salm",
        languages: " English, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "image.png"
    },
    {
        name: "Manoj Kumar",
        location: "erode",
        languages: "Tamil, English, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "image.png"
    },
    {
        name: "Dhameem",
        location: "Coimbatore",
        languages: "hindi, Malayalam",
        experience: "5 Years",
        phone: "+919823456789",
        image: "image.png"
    },
    {
        name: "kumari",
        location: "Coimbatore",
        languages: "Tamil, English, hindi",
        experience: "6 Years",
        phone: "+919823456789",
        image: "i2.png"
    },
    {
        name: "Lalith",
        location: "Coimbatore",
        languages: "Tamil, English, Malayalam",
        experience: "4 Years",
        phone: "+919823456789",
        image: "image.png"
    }
    

        
];

const guideList = document.getElementById("guideList");

guides.forEach(guide => {
    guideList.innerHTML += `
        <div class="guide-card">
            <img src="${guide.image}" alt="${guide.name}" class="guide-image">
            <h2>${guide.name}</h2>
            <p><strong>Location:</strong> ${guide.location}</p>
            <p><strong>Languages:</strong> ${guide.languages}</p>
            <p><strong>Experience:</strong> ${guide.experience}</p>
            <a href="../message/user.php" class="contact-btn">Contact Guide</a>
        </div>
    `;
});
