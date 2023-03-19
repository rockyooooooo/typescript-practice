import { Invoice } from './classes/Invoice.js'
import { Payment } from './classes/Payment.js'
import { ListTemplate } from './classes/ListTemplate.js'
import { HasFormatter } from './interfaces/HasFormatter.js'

const form = document.querySelector('.new-item-form') as HTMLFormElement

const type = document.querySelector('#type') as HTMLSelectElement
const tofrom = document.querySelector('#tofrom') as HTMLInputElement
const details = document.querySelector('#details') as HTMLInputElement
const amount = document.querySelector('#amount') as HTMLInputElement

const ul = document.querySelector('ul')!
const list = new ListTemplate(ul)

form.addEventListener('submit', (e: Event) => {
  e.preventDefault()

  // TUPLES
  let values: [string, string, number]
  values = [tofrom.value, details.value, amount.valueAsNumber]

  let doc: HasFormatter
  if (type.value === 'invoice') {
    doc = new Invoice(...values)
  } else {
    doc = new Payment(...values)
  }

  list.render(doc, type.value, 'end')
})



// GENERICS and ENUMS
const addUID = <T extends { name: string }>(obj: T) => {
  const uid = Math.floor(Math.random() * 100)
  return { ...obj, uid }
}

const docOne = addUID({ name: 'yoshi', age: 40 })
// const docTwo = addUID('hello') // throws error
console.log(docOne.name)

enum ResourceType { BOOK, AUTHOR, FILM, DIRECTOR, PERSON }
interface Resource<T> {
  uid: number,
  resourceType: ResourceType,
  data: T
}
const docThree: Resource<object> = {
  uid: 1,
  resourceType: ResourceType.BOOK,
  data: { title: 'name of the wind' }
}
const docFour: Resource<object> = {
  uid: 10,
  resourceType: ResourceType.PERSON,
  data: { name: 'allen' }
}

console.log(docThree, docFour)

