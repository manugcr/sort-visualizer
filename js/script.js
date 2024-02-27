let isSorting = false;              // Flag to track whether sorting is in progress
const COLOR_COMPARISON = "#63e6be"; // Light blue for elements being compared
const COLOR_FINAL = "#88c070"       // Light green for final sorted elements
const COLOR_SWAP = "#ff9999";       // Light red for swapped elements
const AWAIT_SLEEP = 5;              // Delay in milliseconds for visualization
const BAR_HEIGHT = 7;               // Height of each bar in the visualization

// Initialize visualization with array of size.
window.onload = function() {
    resetArray();
};

function generateRandomArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
}

function resetArray() {
    isSorting = false; // Reset the sorting flag
    const arraySize = parseInt(document.getElementById("array-size").value);
    const array = generateRandomArray(arraySize);
    updateVisualization(array);
}

function updateVisualization(array) {
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";
    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.style.height = `${value * BAR_HEIGHT}px`;
        bar.classList.add("bar");
        arrayContainer.appendChild(bar);
    });
}

async function startVisualization() {
    if (isSorting) return; // Check if sorting is already in progress
    
    isSorting = true; // Set sorting flag to true
    
    const arraySize = parseInt(document.getElementById("array-size").value);
    const array = generateRandomArray(arraySize);
    const algorithm = document.getElementById("sort-algorithm").value;
    
    switch(algorithm) {
        case "bubble-sort":
            await bubbleSort(array);
            break;
        case "selection-sort":
            await selectionSort(array);
            break;
        case "insertion-sort":
            await insertionSort(array);
            break;
        // Add cases for other sorting algorithms here
        default:
            alert("Invalid sorting algorithm selection");
    }
    
    isSorting = false; // Reset sorting flag after sorting is complete
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Bubble Sort algorithm with visualization
async function bubbleSort(array) {
    let len = array.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (!isSorting) return; // Check if reset button is clicked
            
            const bar1 = document.querySelectorAll(".bar")[j];
            const bar2 = document.querySelectorAll(".bar")[j + 1];
            bar1.style.backgroundColor = COLOR_COMPARISON;
            bar2.style.backgroundColor = COLOR_COMPARISON;
            await sleep(AWAIT_SLEEP);

            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                updateVisualization(array);
            }

            bar1.style.backgroundColor = COLOR_SWAP;
            bar2.style.backgroundColor = COLOR_SWAP;
        }
    }
    
    // Reset colors of all bars at the end of sorting
    const bars = document.querySelectorAll(".bar");
    bars.forEach(bar => {
        bar.style.backgroundColor = COLOR_FINAL;
    });
}

// Selection Sort algorithm with visualization
async function selectionSort(array) {
    let len = array.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (!isSorting) return; // Check if reset button is clicked

            const bar1 = document.querySelectorAll(".bar")[j];
            const bar2 = document.querySelectorAll(".bar")[minIndex];
            
            bar1.style.backgroundColor = COLOR_COMPARISON;
            bar2.style.backgroundColor = COLOR_COMPARISON;
            
            await sleep(AWAIT_SLEEP);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            
            bar1.style.backgroundColor = COLOR_SWAP;
            bar2.style.backgroundColor = COLOR_SWAP;
        }
        if (minIndex !== i) {
            swap(array, i, minIndex);
            updateVisualization(array);
        }
    }

    // Reset colors of all bars at the end of sorting
    const bars = document.querySelectorAll(".bar");
    bars.forEach(bar => {
        bar.style.backgroundColor = COLOR_FINAL;
    });
}

// Insertion Sort algorithm with visualization
async function insertionSort(array) {
    const len = array.length;
    for (let i = 1; i < len; i++) {
        let currentValue = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > currentValue) {
            if (!isSorting) return; // Check if reset button is clicked

            const bar1 = document.querySelectorAll(".bar")[j];
            const bar2 = document.querySelectorAll(".bar")[j + 1];
            
            bar1.style.backgroundColor = COLOR_COMPARISON;
            bar2.style.backgroundColor = COLOR_COMPARISON;
            
            array[j + 1] = array[j];
            
            bar1.style.backgroundColor = COLOR_SWAP;
            bar2.style.backgroundColor = COLOR_SWAP;
            await sleep(AWAIT_SLEEP);
            j--;
        }
        array[j + 1] = currentValue;
        updateVisualization(array);
    }

    // Reset colors of all bars at the end of sorting
    const bars = document.querySelectorAll(".bar");
    bars.forEach(bar => {
        bar.style.backgroundColor = COLOR_FINAL;
    });
}


