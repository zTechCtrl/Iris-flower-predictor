function predictIris() {
    let features = [
        parseFloat(document.getElementById("sepal_length").value),
        parseFloat(document.getElementById("sepal_width").value),
        parseFloat(document.getElementById("petal_length").value),
        parseFloat(document.getElementById("petal_width").value)
    ];

    fetch("http://127.0.0.1:5000/predict", {  // ✅ Ensure this matches Flask route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: features })
    })
    .then(response => response.json())
    .then(data => {
        let flowerTypes = ["Setosa", "Versicolor", "Virginica"];
        document.getElementById("result").innerText = "Prediction: " + flowerTypes[data.prediction];
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error fetching data. Make sure the server is running.";
    });
}
