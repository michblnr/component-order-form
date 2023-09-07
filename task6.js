// get all button elements using a query
let chooseMotherboard = document.querySelectorAll('.mb');
let chooseCPU = document.querySelectorAll('.cpu');
let chooseGPU = document.querySelectorAll('.gpu');
let chooseRAM = document.querySelectorAll('.ram');
let chooseStorage = document.querySelectorAll('.ssd');

// initilizing component data types
const motherboard = [
    {
        id: "1",
        title: "Aorus",
        price: 111.99,
        type: "MOTHERBOARD",
    },
    {
        id: "2",
        title: "MSI",
        price: 299.99,
        type: "MOTHERBOARD",
    },
    {
        id: "3",
        title: "ASUS",
        price: 174.99,
        type: "MOTHERBOARD",
    },
    {
        id: "4",
        title: "NZXT",
        price: 178.00,
        type: "MOTHERBOARD",
    }
]

const cpu = [
    {
        id: "5",
        title: "Intel Core",
        price: 320.00,
        type: "CPU",
    },
    {
        id: "6",
        title: "AMD Ryzen",
        price: 90.99,
        type: "CPU",
    }
]

const gpu = [
    {
        id: "7",
        title: "Nvidia",
        price: 159.99,
        type: "GPU",
    },
    {
        id: "8",
        title: "AMD Radeon",
        price: 116.99,
        type: "GPU",
    },
    {
        id: "9",
        title: "ASUS",
        price: 299.99,
        type: "GPU",
    },
    {
        id: "10",
        title: "ZOTAC",
        price: 173.00,
        type: "GPU",
    }
]

const ram = [
    {
        id: "11",
        title: "Corsair",
        price: 62.00,
        type: "RAM",
    },
    {
        id: "12",
        title: "Kingston Technology",
        price: 50.00,
        type: "RAM",
    },
    {
        id: "13",
        title: "G.SKILL",
        price: 64.00,
        type: "RAM",
    },
    {
        id: "14",
        title: "Samsung",
        price: 25.90,
        type: "RAM",
    }
]

const storage = [
    {
        id: "15",
        title: "Samsung",
        price: 92.99,
        type: "STORAGE",
    },
    {
        id: "16",
        title: "Micron Technology",
        price: 30.99,
        type: "STORAGE",
    },
    {
        id: "17",
        title: "SK Hynix",
        price: 80.99,
        type: "STORAGE",
    },
    {
        id: "18",
        title: "SanDisk",
        price: 150.00,
        type: "STORAGE",
    }
]

// call functions
listeners(chooseMotherboard, motherboard, 4);
listeners(chooseCPU, cpu, 2);
listeners(chooseGPU, gpu, 4);
listeners(chooseRAM, ram, 4);
listeners(chooseStorage, storage, 4);

// cart updates on initial load and any user clicks
window.addEventListener('load', updateCart);
window.addEventListener('click', updateCart);

// function to add event listener on button clicks
function listeners(component, compArray, len) {
    for (let i = 0; i < len; i++) {
        component[i].addEventListener('click', () => { setComponent(compArray[i]) });
    }
}

// function that inputs allocated data of specific button to local storage
function setComponent(product) {
    let productID = product.id;
    let localStorageKey;

    // check ID to verify component type
    if (productID <= 4) {
        localStorageKey = 'chosenMotherboard';
    } else if (productID == 5 || productID == 6) {
        localStorageKey = 'chosenCPU';
    } else if (productID >= 7 && productID <= 10) {
        localStorageKey = 'chosenGPU';
    } else if (productID >= 11 && productID <= 14) {
        localStorageKey = 'chosenRAM';
    } else if (productID >= 15) {
        localStorageKey = 'chosenStorage';
    }

    // add info to local storage
    let componentData = localStorage.getItem(localStorageKey);
    componentData = JSON.parse(componentData);
    componentData = { [product.title]: product };
    localStorage.setItem(localStorageKey, JSON.stringify(componentData));
}

// function to update cart info using user local storage
// ! local storage is used to ensure cart contents are shown even if page reloads
function updateCart() {
    // remove empty cart text using ID if cart has any items and if remove has not previously occured
    if (localStorage.length !== 0 && document.getElementById('empty')) {
        document.getElementById('empty').remove();
    }

    let localLen = localStorage.length;
    let newData;
    let whichCart;

    // use innerHTML for all items in local storage to display HTML cart items dynamically
    for (let i = 0; i < localLen; i++) {
        newData = getParsedString(i); // function to get key value in string format
        whichCart = document.getElementById(newData.type.toLowerCase() + '-cart');

        whichCart.innerHTML = `
            <div class="columns">
                <div class="column is-half">
                    <h5 class="title is-5 is-flex-mobile">${newData.type}</h5>
                </div>
                <div class="column">
                    <h5 class="title is-5">${newData.title}</h5>
                    <h5 class="title is-5">$${newData.price}</h5>
                </div>
            </div>
            </br>
        `;

    }
    updateTotal(); // call function to recalculate total price
}

// function to calculate total price of components
function updateTotal() {
    let total = 0;
    localLen = localStorage.length;

    for (let i = 0; i < localLen; i++) {
        storageString = getParsedString(i)
        total += parseFloat(storageString.price);
    }
    cartTotal = document.getElementById('cart-total');
    cartTotal.innerHTML = `
        <h4 class="title is-4 has-text-success-dark">TOTAL $${total.toFixed(2)}</h4>
    `;
}

// function that gets local storage item (JSON) and parses through data
function getParsedString(index) {
    keyData = localStorage.getItem(localStorage.key(index));
    keyData = keyData.substring(keyData.indexOf(":") + 1, keyData.indexOf("}") + 1);
    return (JSON.parse(keyData));
}
