const _ = require("lodash")


const a_ = [2,3,10,3,4,9,10]
const b_ = {2:3, 3:4, 9:1}

let sorted = _.sortBy(a_, (x)=>b_[x] * -1)

console.log(sorted)