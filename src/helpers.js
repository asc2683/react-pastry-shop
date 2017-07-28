/* helper functions */

export function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

export function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getTotalPrice (pastries, totalPrice=0) {
  return pastries.reduce((accumulator, pastry) => {
    return accumulator + pastry.price
  }, totalPrice)
}

