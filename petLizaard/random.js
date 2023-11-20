import { Animal, Lizard, Dog } from "./lizard.js";

var animal_list = [
    Lizard, Dog
]
var color_list = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Cyan",
    "Magenta",
    "Black",
    "White",
    "Gray",
    "Lightgray",
    "Darkgray",
    "Lime",
    "Olive",
    "Navy",
    "Teal",
    "Maroon"
    ]

function return_random_animal(){
    // let pet = new animal_list[Math.floor(Math.random()*animal_list.length)]
    let pet = new Animal()
    pet.set_color(color_list[Math.floor(Math.random()*color_list.length)])
    return pet
}

export {return_random_animal}