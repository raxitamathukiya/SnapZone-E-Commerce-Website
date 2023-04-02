let ProductData = JSON.parse(localStorage.getItem("card-data")) || [];
let Container = document.getElementById("Mens-Data");

let logggedIn = localStorage.getItem("loggedIn") || false;
let sign_in = document.getElementById("sign-in");
if(logggedIn !== false){
    sign_in.innerText = "Sign Out"
    sign_in.href="index.html";
}


async function FetchData(){
    try{
        let request = await fetch("https://snapzone-api.onrender.com/product");
        request = await request.json();
        //console.log(request);
        Display(request);
        filterData2(request);
        menData(request);
        filtercolor(request);
    } catch (error) {
        console.log(error);
    }
}
FetchData();

// form.addEventListener("submit",(e) => {
//     e.preventDefault();
//     let searchData = form.search.value;

//     let filters = request.filter((element) =>{
//         if(element.title.toUpperCase().includes(searchData.toUpperCase()) === true){
//             return true;
//         }else{
//             return false;
//         }
//     })
//     Display(filters);
//     console.log(filters)
// }) 

function Display(data) {
    // e.preventDefault()
    Container.innerHTML = "";

    data.forEach((product) => {
        if (product.gender == "men") {

            let card = document.createElement("div");
            let title = document.createElement("p");
            let image = document.createElement("img");
            let pdiv = document.createElement("div")
            pdiv.setAttribute("class", "pridiv")
            let price = document.createElement("s");
            price.style.color = "gray";
            let dprice = document.createElement("h4");
            let rating = document.createElement("p");
            rating.setAttribute("class", "rat")
            let addcarddiv = document.createElement("div")
            addcarddiv.setAttribute("class", "addcarddiv")
            let add_to_card = document.createElement("button")
            let buy = document.createElement("button")

            //console.log(data)
            add_to_card.textContent = "Add To Cart";
            buy.textContent = "Buy Now";

            buy.addEventListener("click",() =>{
                console.log(logggedIn)
            if (logggedIn == false) {
                alert("Make sure you have logged in!")
                ProductData.push({ ...product, quantity: 1 });
                localStorage.setItem("card-data", JSON.stringify(ProductData))

                window.location.href = "sign-in.html"
                return
            }
            else{

                window.location.href = "payment.html"
            }
        });

            title.textContent = product.title;
            image.src = product.image;
            let disprice = (product.price * 15) / 100;
            let dp = product.price - disprice
            price.textContent = `Rs. ${product.price}`;
            dprice.textContent = `Rs. ${dp}`;

            let n = Math.floor(product.rating)
            let bag = ""
            for (let i = 0; i < n; i++) {
                bag += "⭐"
            }
            // rating.textContent =bag;
            rating.append(bag)
            
            add_to_card.addEventListener("click",() =>{
                console.log(logggedIn)

                if (logggedIn == false) {
                    alert("Make sure you have logged in!")
                    ProductData.push({ ...product, quantity: 1 });
                    localStorage.setItem("card-data", JSON.stringify(ProductData))

                    window.location.href = "sign-in.html"
                    return
                }

                
            else if(checkOrder(product)){
            alert("Product Already in Card");
            }else{
            ProductData.push({...product,quantity:1});
            localStorage.setItem("card-data",JSON.stringify(ProductData))
            alert("Product Added");
            }
        });
        pdiv.append(price,dprice)
        addcarddiv.append(buy,add_to_card)
        card.append(image,title,pdiv,rating,addcarddiv)
        Container.append(card);
       }
    });
}

function checkOrder(product) {
    for (let x = 0; x < ProductData.length; x++) {
        if (ProductData[x].id === product.id) {
            return true
        }
    }
    return false
}


//---------------------------------------------- Category Data -----------------------------------------------

function menData(data) {
    let trend = document.getElementById("trend")
    trend.addEventListener("click", () => {
        data = data.filter((e) => {
            if (e.category == "T-Shirt") {
                return e
            }
        })
        Display(data)
    })

    let shirt = document.getElementById("shirts")
    shirt.addEventListener("click", () => {
        data = data.filter((e) => {
            if (e.category == "shirt") {
                return e
            }
        })
        Display(data)
    })

    let Jeans = document.getElementById("Jeans")
    Jeans.addEventListener("click", () => {
        data = data.filter((e) => {
            if (e.category == "jeans") {
                return e
            }
        })
        Display(data)
    })


    let Sweatshirt = document.getElementById("Sweatshirt")
    Sweatshirt.addEventListener("click", () => {
        data = data.filter((e) => {
            if (e.category == "Sweatshirt") {
                return e
            }
        })
        Display(data)
    })

    let Shoes = document.getElementById("Shoes")
    Shoes.addEventListener("click", () => {
        data = data.filter((e) => {
            if (e.category == "shoes") {
                return e
            }
        })
        Display(data)
    })

    let Sunglasses = document.getElementById("Sunglasses")
    Sunglasses.addEventListener("click", () => {
        data = data.filter((e) => {
            if (e.category == "sunglasses") {
                return e
            }
        })
        Display(data)
    })

    let Watchs = document.getElementById("Watchs")
    Watchs.addEventListener("click", () => {
        data = data.filter((e) => {
            if (e.category == "watch") {
                return e
            }
        })
        Display(data)
    })
}


// ---------------------------------- sort by --------------------------------------------

let priceSort = document.getElementById("select-tag");

priceSort.addEventListener("change", FetchPriceSort);

async function FetchPriceSort() {
    //sortBy = priceSort.value =="LTH" ? "asc" : "desc"
    console.log(priceSort.value);
    if (priceSort.value == 'Price Low To High') {
        try {
            let res = await fetch(`https://snapzone-api.onrender.com/product?_sort=price&_order=asc`)
            let responeee = await res.json()
            //console.log(responeee)
            Display(responeee)
        } catch (error) {
            console.log(error);
        }
    } else if (priceSort.value == 'Price High To Low') {
        try {
            let res = await fetch(`https://snapzone-api.onrender.com/product?_sort=price&_order=desc`)
            let responeee = await res.json()
            //console.log(responeee)
            Display(responeee)
        } catch (error) {
            console.log(error);
        }
    }
}

// ----------------------------- Price filter ----------------------------------------

function filterData2(request) {

    let priceData = document.querySelectorAll('input[type=radio][name="PriceValue"]');
    function Pricefunction(event) {
        let lower = -Infinity, upper = Infinity

        if (this.value == "ZeroToNinetynine") {
            lower = 0, upper = 90
        } else if (this.value == "oneHunderedToOneNininetynine") {
            lower = 100, upper = 199
        } else if (this.value == "twoHunderedToTowNininetynine") {
            lower = 200, upper = 299
        } else if (this.value == "threeHunderedToThreeNininetynine") {
            lower = 300, upper = 399
        } else if (this.value == "fourHunderedToFourNininetynine") {
            lower = 400, upper = 499
        } else if (this.value == "fiveHunderedToFiveNininetynine") {
            lower = 500, upper = 599
        } else if (this.value == "sixHunderedToSixNininetynine") {
            lower = 600, upper = 699
        } else if (this.value == "sevenHunderedToNineNininetynine") {
            lower = 700, upper = 999
        } else if (this.value == "oneThousandAbove") {
            lower = 1000
        }

        let filterData = request.filter(element => {
            let disprice = (element.price * 15) / 100;
            let dp = element.price - disprice
            return dp >= lower && dp <= upper;
        })
        Display(filterData)
    }
    Array.prototype.forEach.call(priceData, function (radio) {
        radio.addEventListener("change", Pricefunction);
    })
}

// --------------------------------- filter color -----------------------------------------------

function filtercolor(request) {

    let colorData = document.querySelectorAll('input[type=checkbox][name="AllColor"]');
    function colorfunction(event) {
        let color = "";

        if (this.value == "gray") {
            color = 'gray';
        } else if (this.value == "blue") {
            color = 'blue';
        } else if (this.value == "red") {
            color = 'red';
        } else if (this.value == "white") {
            color = 'white';
        } else if (this.value == "black") {
            color = 'black';
        } else if (this.value == "green") {
            color = 'green';
        } else if (this.value == "pink") {
            color = 'pink';
        } else if (this.value == "golden") {
            color = 'golden';
        } else if (this.value == "peach") {
            color = 'peach';
        } else if (this.value == "yellow") {
            color = 'yellow';
        } else if (this.value == "purple") {
            color = 'purple';
        } else if (this.value == "maroon") {
            color = 'maroon';
        } else if (this.value == "gold") {
            color = 'gold';
        } else if (this.value == "brown") {
            color = 'brown';
        }

        let filterData = request.filter(element => {
            if (element.color == color) {
                return element
            }

        })
        Display(filterData)
    }
    Array.prototype.forEach.call(colorData, function (checkbox) {
        checkbox.addEventListener("change", colorfunction);
    })
}



