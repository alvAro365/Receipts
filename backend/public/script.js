window.addEventListener("load", function(event) {
    console.log("All resources finished loading!");

    let test = {
        id: "5347da70-fef3-4e8f-ba49-e8010edba878",
        name: "TestStad",
        population: 321
    }
    var cityInput = document.getElementById("city")
    
    cityInput.addEventListener('change', function (event) {
        console.log(event.target.value);
        test.name = event.target.value
    })

    var populationInput = document.getElementById("population").addEventListener('change', function (event) {
        console.log(event.target.value);
        test.population = event.target.value

    })

    function postCity() {
        cityInput.value = ''
        populationInput.value = ''

        fetch('http://localhost:3000/cities', {
            body: JSON.stringify(test),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json()).then(result => console.log("Success", result))
    }
    function updateCity() {
        console.log('Update clicked')
        cityInput.value = ''
        populationInput.value = ''

        fetch('http://localhost:3000/update/5347da70-fef3-4e8f-ba49-e8010edba878', {
            body: JSON.stringify(test),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(response => response.json()).then(result => console.log("Success", result))
    }
    var submitButton = document.getElementById("myInput")


    var populationInput = document.getElementById("population")
    console.log(submitButton)
    submitButton.addEventListener("click", postCity)
});


