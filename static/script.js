const slider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

slider.addEventListener("input", () => {
    lengthValue.innerText = slider.value;
});

async function generatePassword() {

    try {

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                length: slider.value
            })
        });

        const data = await response.json();

        document.getElementById("password").value = data.password;

        checkStrength(data.password);

    } catch (error) {

        console.error("Error:", error);

        alert("Password generation failed");

    }
}

function copyPassword() {

    const passwordField = document.getElementById("password");

    if(passwordField.value === ""){
        alert("Generate password first");
        return;
    }

    navigator.clipboard.writeText(passwordField.value);

    alert("Password copied!");
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

function clearPassword(){

    document.getElementById("password").value = "";

    document.getElementById("strength").innerText = "";

    document.getElementById("strength-fill").style.width = "0%";

}