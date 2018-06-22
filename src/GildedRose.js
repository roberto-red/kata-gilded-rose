import Item from './Item'

const VEST = '+5 Dexterity Vest'
const BRIE = 'Aged Brie'
const ELIXIR = 'Elixir of the Mongoose'
const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert'
const CAKE = 'Conjured Mana Cake'

const GildedRose = function() {
  var items = []
  items.push(new Item(VEST, 10, 20))
  items.push(new Item(BRIE, 2, 0))
  items.push(new Item(ELIXIR, 5, 7))
  items.push(new Item(SULFURAS, 0, 80))
  items.push(new Item(BACKSTAGE, 15, 20))
  items.push(new Item(CAKE, 3, 6))
  GildedRose.updateQuality(items)
}

const IMPROVE_WITH_TIME = [BRIE, BACKSTAGE]
const improvesWithTime = item => IMPROVE_WITH_TIME.includes(item.name)

const increaseQuality = item => {
  item.quality++
  if (item.sellIn < 6) {
    item.quality++
  }
  if (item.sellIn < 11) {
    item.quality++
  }
}

const updateItemQuality = item => {
  if (improvesWithTime(item)) {
    increaseQuality(item)
    if (isExpired(item)) item.quality = 0
  } else {
    item.quality--
    if (isExpired(item)) item.quality--
  }
  item.quality = Math.min(item.quality, 50)
}

const isExpired = item => item.sellIn < 0

const isSulfuras = item => item.name === SULFURAS

const decreaseSellIn = item => item.sellIn--

GildedRose.updateQuality = function(items) {
  items.forEach(item => {
    !isSulfuras(item) && decreaseSellIn(item) | updateItemQuality(item)
  })
  return items
}

export default GildedRose
