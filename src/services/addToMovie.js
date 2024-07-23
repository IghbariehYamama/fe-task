// Async function that simulates an external process
export function addPokemonToMovie(pokemonName) {
    return new Promise(resolve => {
        setTimeout(() => {
            // Getting the “isAdded” result is an operation that will take 1-10 minutes
            const isSuccess = toAddOrNotToAdd(pokemonName);
            resolve(isSuccess);
        }, 10);
    });
}

// Helper functions. No need to understand or check this function
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function sumOfPrimes(N) {
    let sum = 0;
    for (let num = 2; num <= N; num++) {
        if (isPrime(num)) {
            sum += num;
        }
    }
    return sum;
}

function addToDB() {
    // Mock for adding to DB
}

function toAddOrNotToAdd(pokemonName) {
    const N = pokemonName.length + 10 * 10000000;
    const sum = sumOfPrimes(N);
    const isSuccess = sum > 279209890387283;
    if (isSuccess) {
        addToDB(pokemonName);
    }
    return isSuccess;
}
