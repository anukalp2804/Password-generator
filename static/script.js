const slider = document.getElementById("lengthSlider");

const lengthValue = document.getElementById("lengthValue");

slider.addEventListener("input", () => {

    lengthValue.innerText = slider.value;

});

async function generatePassword(){

    const uppercase = document.getElementById("uppercase").checked;

    const lowercase = document.getElementById("lowercase").checked;

    const numbers = document.getElementById("numbers").checked;

    const symbols = document.getElementById("symbols").checked;

    if(!uppercase && !lowercase && !numbers && !symbols){

        alert("Select at least one option");

        return;
    }

    try{

        const response = await fetch("/generate", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                length:slider.value,
                uppercase:uppercase,
                lowercase:lowercase,
                numbers:numbers,
                symbols:symbols

            })

        });

        const data = await response.json();

        document.getElementById("password").value = data.password;

        checkStrength(data.password);

    }

    catch(error){

        console.log(error);

        alert("Failed to generate password");

    }

}

function copyPassword(){

    const passwordField = document.getElementById("password");

    if(passwordField.value === ""){

        alert("Generate password first");

        return;
    }

    navigator.clipboard.writeText(passwordField.value);

    alert("Password copied!");

}

function clearPassword(){

    document.getElementById("password").value = "";

    document.getElementById("strength").innerText = "";

    document.getElementById("strength-fill").style.width = "0%";

}

function checkStrength(password){

    let strength = "Weak";

    let color = "red";

    let width = "25%";

    if(password.length >= 12){

        strength = "Medium";

        color = "#facc15";

        width = "60%";

    }

    if(
        password.length >= 16 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    ){

        strength = "Very Strong";

        color = "#00e676";

        width = "100%";

    }

    document.getElementById("strength").innerText = strength;

    document.getElementById("strength").style.color = color;

    document.getElementById("strength-fill").style.width = width;

    document.getElementById("strength-fill").style.background = color;

}