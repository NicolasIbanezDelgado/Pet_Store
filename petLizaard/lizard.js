import { return_random_name } from "./name.js"

var color_list = [
    "Red", "Blue","Green","Yellow",
    "Purple","Orange","Pink","Brown","Cyan",
    "Magenta","Black","White","Gray","Lightgray","Darkgray","Lime",
    "Olive","Navy","Teal","Maroon"
    ]

export class Animal{
    constructor(name=return_random_name(),animal_type="None", breed="None", color="None"){
        this.name = name
        this.animal_type = animal_type
        this.breed = breed
        this.color = color
        this.cost =0
        this.age = 0
    }

    get_name(){
        return this.name
    }

    get_breed(){
        return this.breed
    }

    set_age(age){
        this.age = age
    }

    get_cost(){
        var total_cost = 0.0
        const catalog = {
            'Basic': 2, 'Premium': 5, 'Purebred' : 15,
            "Black": 2, "White": 2, "Gray": 2, "Lightgray": 2, "Darkgray": 2, "Yellow": 2,
            "Orange": 3,
            "Brown": 4,
            "Lime": 5, "Olive": 5, "Navy": 5, "Red": 5,
            "Blue": 6, "Green": 6, "Pink": 6, "Teal": 6,
            "Cyan": 9, "Magenta": 9, "Maroon": 9, "Purple": 9,
            'Lizard': 2, 'Dog': 3, 'Fish':4, 'Cat': 5, 
        };

        for (const [key, value] of Object.entries(catalog)) {
            if (this.breed === key){
                total_cost += value
            }
            if(this.color == key){
                total_cost += value
            }
            if(this.animal_type == key){
                total_cost += value
            }
        }
        this.cost = total_cost
        return total_cost
    }

    set_color(color){
        this.color = color
    }

    randomize_animal(){
        let pet = new animal_list[Math.floor(Math.random()*animal_list.length)]
        pet.set_color(color_list[Math.floor(Math.random()*color_list.length)])
        pet.get_cost()
        return pet
    }
}

export class Lizard extends Animal{
    constructor(name, breed="Basic", color="Yellow"){
        super(name, 'Lizard',breed, color)
    }
}

export class Dog extends Animal{
    constructor(name, breed="Basic", color='Black'){
        super(name, 'Dog', breed, color)
    }

    randomize_dog_cost(){
        let temp_dog = new Dog(return_random_name(), 'Basic', color_list[Math.floor(Math.random()*color_list.length)])
        return temp_dog.get_cost()
    }
}

export class Cat extends Animal{
    constructor(name, breed="Basic", color='Black'){
        super(name, 'Cat', breed, color)
    }
}

export class Fish extends Animal{
    constructor(name, breed="Basic", color='Black'){
        super(name, 'Fish', breed, color)
    }
}

class Store{
    constructor(name=`${return_random_name()}'s Pet-Store`,  specialty="None"){
        this.name = name
        this.size = 1
        this.specialty = specialty
        this.inventory = []
        this.get_first_animal()
        this.job_board = [
            {"Task": "Bake Doggy Treats", "Reward": Dog.prototype.randomize_dog_cost(), "JobID": 999},
            {"Task": "Weekly Dog Training", "Reward": Dog.prototype.randomize_dog_cost(), "JobID": 333},
            {"Task": "Groom Dog", "Reward": Dog.prototype.randomize_dog_cost(), "JobID": String(Math.floor(Math.random()*1000))},
            {"Task": "Walk Dog", "Reward": Dog.prototype.randomize_dog_cost(), "JobID": Math.floor(Math.random()*1000)}
        ]
        this.money = 0
    }

    get_first_animal(){
        let temp_pet = Animal.prototype.randomize_animal()
        this.inventory.push(temp_pet)
        return temp_pet
    }

    get_inventory(){
        var temp_str=''
        for(var index = 0; index < this.inventory.length; index++){
            temp_str += `${this.inventory[index].name}, ${this.inventory[index].animal_type}, ${this.inventory[index].color}, $${this.inventory[index].cost}\n`
       }
       return temp_str
    }

    expand_store(){
        let temp_pet = Animal.prototype.randomize_animal()
        var expand_cost = (this.inventory.length * 5) + temp_pet.cost
        console.log(`Expanding Cost: ${expand_cost}`)
        if(this.money >= expand_cost && this.inventory.length > 0){
            this.inventory.push(temp_pet)
            this.money -= expand_cost
            console.log(`Welcome ${temp_pet.name}, the ${temp_pet.color} ${temp_pet.animal_type} to the store.\nCurrent store value: ${this.get_store_value()}`)
            return this.get_inventory()
        }else{
            return `Not enough cash. Cash needed: $${expand_cost-this.money}`
        }
    }

    get_store_value(){
        let temp_store_value = 0
        for(var index = 0; index < this.inventory.length; index++){
            temp_store_value += this.inventory[index].cost
        }
        return temp_store_value
    }

    sell_animal(name){
        for(var index = 0; index < this.inventory.length; index++){
            if(this.inventory[index].name == name && this.inventory.length > 1){
                this.money += this.inventory[index].cost
                this.inventory.splice(index,1)
                return `Current Balance: $${this.money}.\nCurrent Inventory: ${this.get_inventory()}`
            }else{
                this.money += this.inventory[index].cost
                this.inventory.splice(index,1)
                return `Current Balance: $${this.money}.\nCurrent Inventory: Empty.`
            }
        }
    }

    get_job_posting(){
        var task_list= [
            {"Task": "Bake Doggy Treats", "Reward": Dog.prototype.randomize_dog_cost(), "JobID": 999},
            {"Task": "Weekly Dog Training", "Reward": Dog.prototype.randomize_dog_cost(), "JobID": 333},
            {"Task": "Groom Dog", "Reward": Dog.prototype.randomize_dog_cost(), "JobID": String(Math.floor(Math.random()*1000))},
            {"Task": "Walk Dog", "Reward": Dog.prototype.randomize_dog_cost(), "JobID": Math.floor(Math.random()*1000)}
        ]
        return task_list
    }

    completed_job_posting(JobID){
        var temp_bool = false
        for(var index=0; index < this.job_board.length; index++){
            if(String(this.job_board[index]['JobID'])===JobID){
                this.money += this.job_board[index]['Reward']
                this.job_board.splice(index,1)
                temp_bool = true
                break
            }
            // if(this.job_board[index]['JobID'] === JobID){
                // this.money += this.job_board[index]['Reward']
                // this.job_board.splice(index,1)
                // temp_bool = true
                // break
            // }else{
                // console.log(typeof(String(this.job_board[index]['JobID'])))
                // console.log('a')
                // console.log(typeof(JobID))
            // }
        }
        if(temp_bool){
            return `Job completed... Current Balance: ${this.money}`
        }else{
            return `Job not found...try again.`
        }
    }

}

var animal_list = [
    Lizard, Dog, Cat, Fish
]

// let store1 = new Store('Nic\'s Pet-Store', 'Lizard')
// // Template for later
// console.log(store1.get_inventory())
// console.log(...store1.job_board)
// console.log(store1.completed_job_posting('999'))
// // console.log(store1.get_job_posting())
// console.log(...store1.job_board)
// console.log(store1.completed_job_posting('333'))


// Find a way to breed animals
// Find a way to make GUI and decision making branch
// Make pocketfrog style mix and match pet
// Make GUI somehow
// Expand to more types of pets
// Expand functionality of pets
// Add date-time library for time-related functionality 



// Players complete tasks for cash ✓✓✓✓
// Players can sell animals for cash ✓✓✓✓
// Add task system ✓✓✓✓


var running = true

function main(){
    let curr_store = new Store()
    process.stdin.setEncoding('utf8'); // Set the encoding to UTF-8
    // Listen for data events on stdin
    process.stdin.on('data', (data) => {
        let curr_data = data.split(' ')
        if(curr_data[0] == 0){
            let temp_str = ''
            for(var i = 1; i < curr_data.length; i++){
                temp_str += curr_data[i] + ' '
            }
            curr_store.name = temp_str
            console.log(curr_store)


        }else if(curr_data[0] == 1){
            console.log(...curr_store.job_board)


        }else if(curr_data[0] == 2){
            let temp_str = curr_data[1].slice(0,3)
            console.log(curr_store.completed_job_posting(temp_str))
        }else if(curr_data[0] == 3){
            let temp_str_name = curr_data[1].slice(0, curr_data[1].length-1)
            console.log(curr_store.sell_animal(temp_str_name))
        }else if(curr_data[0] == 4){
            console.log(curr_store.expand_store())
        }

    // Close stdin to end the script
    // process.stdin.destroy();
    });

    // Listen for the end event (stdin closed)
    process.stdin.on('end', () => {
        running = false
    console.log('End of input. Exiting the script.');
    });
    console.log('Please enter some text. Press Ctrl+D (or Ctrl+Z on Windows) to end.');
}

main()