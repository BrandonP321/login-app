const password = 'ScooBy@3278'
// const upperRegex = /[a-z]{1,}[A-Z]{1,}[0-9]{1,}/ig

const upperRegex = /[A-Z]{1,}/g
// console.log(upperRegex.test(password))
// console.log(password.match(upperRegex))

const lowerRegex = /[a-z]{1,}/g
// console.log(lowerRegex.test(password))
// console.log(password.match(lowerRegex))

const numberRegex = /[0-9]{1,}/g
// console.log(numberRegex.test(password))
// console.log(password.match(numberRegex))

const specialRegex = /[!@#$%^&*]{1,}/g
// console.log(specialRegex.test(password))
// console.log(password.match(specialRegex))

const badRegex = /[^\w!@#$%^&*]/g
console.log(badRegex.test('alksjdf'))
console.log(password.match(badRegex))