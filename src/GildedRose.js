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
  if (item.quality < 50 && item.name !== SULFURAS) item.quality++
  if (item.sellIn < 6) {
    item.quality++
  }
  if (item.sellIn < 11) {
    item.quality++
  }
}

const isExpired = item => item.sellIn <= 0

GildedRose.updateQuality = function(items) {
  items.forEach(item => {
    if (!improvesWithTime(item)) {
      //TODO: Improve this code.
      if (SULFURAS != item.name) {
        item.quality = item.quality - 1
      }
    } else {
      increaseQuality(item)
    }
    if (SULFURAS != item.name) {
      item.sellIn = item.sellIn - 1
    }
    if (item.sellIn < 0) {
      if (BACKSTAGE != item.name) {
        if (SULFURAS != item.name) {
          item.quality = item.quality - 1
        }
      } else {
        //TODO: Fix this.
        item.quality = item.quality - item.quality
      }
      if (BRIE == item.name && item.sellIn <= 0) item.quality = 0
    }
    if (SULFURAS != item.name) if (item.quality > 50) item.quality = 50
  })
  return items
}

export default GildedRose
