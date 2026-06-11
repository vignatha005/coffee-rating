const API_URL = "http://127.0.0.1:5000/api/coffees";

async function loadCoffees() {
    try {
        const response = await fetch(API_URL);
        const coffees = await response.json();

        const coffeeList = document.getElementById("coffeeList");
        const topCoffeeDiv = document.getElementById("topCoffee");

        coffeeList.innerHTML = "";

        // Find top rated coffee
        const topCoffee = coffees.reduce((max, coffee) =>
            coffee.votes > max.votes ? coffee : max
        );

        topCoffeeDiv.innerHTML = `
            <div class="top-coffee">
                🏆 Top Rated Coffee: ${topCoffee.name}
                (${topCoffee.votes} votes)
            </div>
        `;

        coffees.forEach(coffee => {
            coffeeList.innerHTML += `
                <div class="coffee-card">
                    <img src="${coffee.image}" alt="${coffee.name}">
                    <h2>${coffee.name}</h2>
                    <p>Votes: ${coffee.votes}</p>
                    <button onclick="voteCoffee('${coffee._id}')">
                        Vote
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading coffees:", error);
    }
}

async function voteCoffee(id) {
    try {
        await fetch(`${API_URL}/vote/${id}`, {
            method: "PUT"
        });

        loadCoffees();
    } catch (error) {
        console.error("Error voting:", error);
    }
}
async function resetVotes() {
    try {
        await fetch("http://127.0.0.1:5000/reset-votes", {
            method: "PUT"
        });

        loadCoffees();
    } catch (error) {
        console.error("Error resetting votes:", error);
    }
}

loadCoffees();