const btn = document.querySelector(".btn1");
const infoClima= document.querySelector(".formularioContenido");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  const ciudad = buscarCiudad();

  if(!ciudad){
    alert("Ingrese el nombre de la ciudad al que desea conocer la temperatura");
    return;
  }
  const apiKey = "NDUMNZYM8ED73NNXENLZGBJ4T";

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}/last30days?key=${apiKey}&include=days&elements=tempmax,tempmin,temp`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        alert("Ingrese el nombre de una ciudad valida")
        throw new Error("Error al encontar la ciudad");
      }
      console.log(response.json())
    })
    .then(data => {
      console.log("Resultado de la búsqueda:", data);
      
      infoClima2(ciudad, data);

    })
    .catch(error => {
      console.error("Error:", error.message);
    });
});

function buscarCiudad() {
  const miInput = document.querySelector(".campoTxt1");
  return miInput.value.trim(); 
}

function infoClima2(ciudad, data){
  infoClima.innerHTML="";
      let parrafo= document.createElement("p");
      let imagenDemostrativa= document.createElement("img");
      let botonCerrar= document.createElement("button");
      botonCerrar.textContent= "Buscar otra ciudad"
      parrafo.textContent= `Temperature:    ${data.resolvedAddress}: ${(data.days[4].temp-32)*5/9} °C`;
      imagenDemostrativa.src= "imgClima.webp";
      infoClima.appendChild(parrafo);
      infoClima.appendChild(imagenDemostrativa);
      infoClima.appendChild(botonCerrar);


      botonCerrar.addEventListener("click", () =>{
        window.location.href= "index.html";
      });
}




