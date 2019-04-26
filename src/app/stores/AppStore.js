import { observable, decorate } from "mobx";

class AppStore {
    people = []
    
    constructor(){
        this.getFromLocal()
    }

    add = (person) => {
        this.people.push({
            name: person,
            total: 0
        })
    }

    remove = (person) => {
        this.people = this.people.filter(val => {
            return val.name !== person
        })
    }

    getTotal = () => {
        let total = 0
        this.people.forEach(person => {
            total += person.total
        })
        return total
    }

    addValues = (checked, amountEach) => {
        this.people.forEach(person => {
            if(checked[person.name]){
                person.total += amountEach
            }
        })
    }

    addToLocal = () => {
        localStorage.setItem('people', JSON.stringify(this.people))
    }

    getFromLocal = () => {
        this.people = JSON.parse(localStorage.getItem('people')) || []
    }
}

decorate(AppStore, {
    people: observable
})


export default new AppStore()