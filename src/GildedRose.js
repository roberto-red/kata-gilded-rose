import Item from './Item'

const GildedRose = function () {
  var items = []
  items.push(new Item("+5 Dexterity Vest", 10, 20))
  items.push(new Item("Aged Brie", 2, 0))
  items.push(new Item("Elixir of the Mongoose", 5, 7))
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80))
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20))
  items.push(new Item("Conjured Mana Cake", 3, 6))
  GildedRose.updateQuality(items)
}

function improveWithAgeUpdater(item) {
  let { name, sellIn, quality } = item
  sellIn--
  quality++
  if (sellIn < 11) {
    quality++
  }
  if (sellIn < 6) {
    quality++
  }
  if (sellIn < 0) {
    quality = 0
  }
  if (quality > 50) {
    quality = 50
  }
  return { name, sellIn, quality }
}

function defaultUpdater(item) {
  let { name, sellIn, quality } = item
  sellIn--
  quality--
  if (sellIn < 0) {
    quality--
  }
  if (quality > 50) {
    quality = 50
  }
  return { name, sellIn, quality }
}

function identity(item) {
  return { ...item }
}

const UPDATERS = {
  "Sulfuras, Hand of Ragnaros": identity,
  "Aged Brie": improveWithAgeUpdater,
  "Backstage passes to a TAFKAL80ETC concert": improveWithAgeUpdater
}

GildedRose.updateQuality = function (items) {
  return items.map(item => {
    const updater = UPDATERS[item.name] || defaultUpdater
    return updater(item)
  })
}

export default GildedRose