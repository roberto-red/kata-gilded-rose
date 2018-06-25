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

function isAgedBrie(item) {
  return "Aged Brie" == item.name
}

function isNotAgedBrie(item) {
  return !isAgedBrie(item)
}

function isBackstage(item) {
  return "Backstage passes to a TAFKAL80ETC concert" == item.name
}

function isNotBackstage(item) {
  return !isBackstage(item)
}

function isNotSulfuras(item) {
  return "Sulfuras, Hand of Ragnaros" != item.name
}

GildedRose.updateQuality = function (items) {
  for (var i = 0; i < items.length; i++) {
    const item = items[i]

    if (isNotSulfuras(item)) {

      if (isNotAgedBrie(item) && isNotBackstage(item)) {
        item.sellIn = item.sellIn - 1
        item.quality = item.quality - 1
        if (item.sellIn < 0) {
          item.quality = item.quality - 1
        }
        if (item.quality > 50) {
          item.quality = 50
        }
      }

      if (isAgedBrie(item)) {
        item.sellIn = item.sellIn - 1
        item.quality = item.quality + 1
        if (item.sellIn < 11) {
          item.quality = item.quality + 1
        }
        if (item.sellIn < 6) {
          item.quality = item.quality + 1
        }
        if (item.sellIn < 0) {
          item.quality = 0
        }
        if (item.quality > 50) {
          item.quality = 50
        }
      }

      if (isBackstage(item)) {
        item.sellIn = item.sellIn - 1
        item.quality = item.quality + 1
        if (item.sellIn < 11) {
          item.quality = item.quality + 1
        }
        if (item.sellIn < 6) {
          item.quality = item.quality + 1
        }
        if (item.sellIn < 0) {
          item.quality = 0
        }
        if (item.quality > 50) {
          item.quality = 50
        }
      }

    }

  }
  return items
}

export default GildedRose