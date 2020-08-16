var berries = 0;

function UpdateText() {
    $("#berrytext").text(`${ Math.floor(berries) } Berries`);
    $("#structslist").html("");
    for (let i in structures) {
        let struct = structures[i];
        $("#structslist").append(`<div id="s_${i}" class="struct"><img src="${struct.icon}" width="40px"> <a href="#" onclick="Buy(${i});return false;"><small>  ${struct.amount}  </small></a> <span>${struct.name} &nbsp;<img src="img/blue.png" width="16px">&nbsp;<small>${struct.price()}</small></span></div>`);
    }
    $("title").text(`${ Math.floor(berries) } Berries - Berry Scented Clicker`);
    $("#structurestext").text(`Structures (${bps} BPS)`)
}

function Buy(item) {

    console.log(item);
    if (!structures[item].buy()) {
        $(`#s_${item}`).addClass("red");
    }
}

class Struct {

    icon = "img/blue.png";
    name = "placeholder";
    amount = 0;
    buy() {
        if (berries >= this.price()) {
            this.amount++;
            berries -= this.price();
            UpdateText();
            return true;
        }
        return false;
    }
    price() {
        return 0;
    }
    bps() {
        return 0;
    }
}

class Basket extends Struct {
    price() {
        return Math.ceil(10 + Math.pow(this.amount, 1.2));
    }
    bps() {
        return 0.5;
    }

    name = "Basket";
}
class Bush extends Struct {
    price() {
        return Math.ceil(100 + Math.pow(this.amount, 2));
    }
    bps() {
        return 5;
    }
    name = "Bush";
}

let basket = new Basket();
let bush = new Bush();

let structures = [basket, bush];
let bps = 0;
$(() => {

    $("#berry").click(() => {
        berries++;
        UpdateText();
        console.log({ berries });
        $(".ber").addClass("small");
        return false;
    });
    $(".ber").on("transitionend", () => {
        $(".ber").removeClass("small");
    })
    setInterval(() => {
        bps = 0;
        for (let s of structures)
            bps += s.bps() * s.amount;
        berries += bps;
        UpdateText();
    }, 1000)
    UpdateText();


});