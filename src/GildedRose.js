import Item from './Item'

const AGED_BRIE = "Aged Brie"
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert"
const SULFURAS = "Sulfuras, Hand of Ragnaros"

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

function updateItemQuality(item) {
  if (AGED_BRIE !== item.name && BACKSTAGE !== item.name && SULFURAS !== item.name) {
    if (item.quality > 0) {
      item.quality = item.quality - 1
    }
  }

  if (AGED_BRIE === item.name || BACKSTAGE === item.name || SULFURAS === item.name) {
    if (item.quality < 50) {
      item.quality = item.quality + 1

      if (AGED_BRIE === item.name && item.sellIn < 6) {
        item.quality = item.quality + 1
      }

      if (AGED_BRIE === item.name && item.sellIn < 11) {
        item.quality = item.quality + 1
      }

      if (BACKSTAGE === item.name && item.sellIn < 11 && item.quality < 50) {
        item.quality = item.quality + 1
      }

      if (BACKSTAGE === item.name && item.sellIn < 6 && item.quality < 50) {
        item.quality = item.quality + 1
      }
    }
  }

  if (SULFURAS !== item.name) {
    item.sellIn = item.sellIn - 1
  }

  if (item.sellIn < 0) {
    if (AGED_BRIE !== item.name && BACKSTAGE !== item.name && item.quality > 0 && SULFURAS !== item.name) {
      item.quality = item.quality - 1
    }

    if (AGED_BRIE !== item.name && BACKSTAGE === item.name) {
      item.quality = item.quality - item.quality
    }

    if (AGED_BRIE === item.name && item.quality < 50) {
      item.quality = item.quality + 1
    }

    if (AGED_BRIE === item.name && item.sellIn <= 0) {
      item.quality = 0
    }
  }

  if (SULFURAS !== item.name && item.quality > 50) {
    item.quality = 50
  }

}

GildedRose.updateQuality = function (items) {
  for (var i = 0; i < items.length; i++) {
    let item = items[i]
    updateItemQuality(item)
  }
  return items
};

export default GildedRose