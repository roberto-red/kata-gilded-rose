import Item from './Item'

const AGED_BRIE = "Aged Brie"
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert"
const SULFURAS = "Sulfuras, Hand of Ragnaros"
const CONJURED_ITEM = "Conjured"

const GildedRose = function () {
  // var items = []
  // items.push(new Item("+5 Dexterity Vest", 10, 20))
  // items.push(new Item(AGED_BRIE, 2, 0))
  // items.push(new Item("Elixir of the Mongoose", 5, 7))
  // items.push(new Item(SULFURAS, 0, 80))
  // items.push(new Item(BACKSTAGE, 15, 20))
  // items.push(new Item("Conjured Mana Cake", 3, 6))
  // GildedRose.updateQuality(items)
}

const isConjuredItem = (productName) => Boolean(productName.match(/^Conjured/))

const legendaryHandler = item => ({ ...item, quality: 80 })

const wellAgingHandler = item => {
  const sellIn = item.sellIn - 1
  let quality = item.quality

  if (sellIn <= 5) {
    quality = quality + 3
  }

  if (sellIn > 5 && sellIn <= 10) {
    quality = quality + 2
  }

  if (sellIn > 10) {
    quality++
  }

  quality = quality > 50 ? 50 : quality

  return {
    ...item,
    sellIn,
    quality: sellIn < 0 ? 0 : quality
  }
}

const conjuredHandler = item => {
  const sellIn = item.sellIn - 1
  let quality = item.quality

  if (quality > 0) {
    quality = quality - 2
  }

  if (sellIn < 0 && quality > 0) {
    quality = quality - 2
  }

  return { ...item, sellIn, quality }
}

const defaultHandler = item => {
  const sellIn = item.sellIn - 1
  let quality = item.quality

  if (quality > 0) {
    quality = quality - 1
  }

  if (sellIn < 0 && quality > 0) {
    quality = quality - 1
  }

  if (quality > 50) {
    quality = 50
  }

  return { ...item, sellIn, quality }
}

const PRODUCT_HANDLERS = {
  [SULFURAS]: legendaryHandler,
  [AGED_BRIE]: wellAgingHandler,
  [BACKSTAGE]: wellAgingHandler,
  [CONJURED_ITEM]: conjuredHandler
}

const getProductHandler = productName => {
  const productHandlerKey = isConjuredItem(productName)
    ? CONJURED_ITEM
    : productName

  return PRODUCT_HANDLERS[productHandlerKey] || defaultHandler
}

const updateItemQuality = item =>
  getProductHandler(item.name)(item)

GildedRose.updateQuality = items =>
  items.map(updateItemQuality)

export default GildedRose