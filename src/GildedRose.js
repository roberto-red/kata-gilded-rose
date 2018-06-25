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

function isSulfuras(item) {
  return "Sulfuras, Hand of Ragnaros" == item.name
}

function isNotSulfuras(item) {
  return !isSulfuras(item)
}

GildedRose.updateQuality = function (items) {
  const result = items.map(item => {

    if (isSulfuras(item)) {
      return { ...item }
    }

    if (isNotSulfuras(item)) {

      if (isNotAgedBrie(item) && isNotBackstage(item)) {
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

      if (isAgedBrie(item)) {
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

      if (isBackstage(item)) {
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

    }
  })

  return result
}

export default GildedRose