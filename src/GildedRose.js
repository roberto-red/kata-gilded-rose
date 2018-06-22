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

GildedRose.updateQuality = function(items) {
  items.forEach(item => {
    if (BRIE != item.name && BACKSTAGE != item.name) {
      //TODO: Improve this code.
      if (item.quality > 0) {
        if (SULFURAS != item.name) {
          item.quality = item.quality - 1
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1
        if (BRIE == item.name) {
          if (item.sellIn < 6) {
            item.quality = item.quality + 1
          }
        }
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        if (BRIE == item.name) {
          if (item.sellIn < 11) {
            item.quality = item.quality + 1
          }
        }
        if (BACKSTAGE == item.name) {
          if (item.sellIn < 11) {
            // See revision number 2394 on SVN.
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
          //Increases the Quality of Backstage Passes if the Quality is 6 or less.
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
        }
      }
    }
    if (SULFURAS != item.name) {
      item.sellIn = item.sellIn - 1
    }
    if (item.sellIn < 0) {
      if (BRIE != item.name) {
        if (BACKSTAGE != item.name) {
          if (item.quality > 0) {
            if (SULFURAS != item.name) {
              item.quality = item.quality - 1
            }
          }
        } else {
          //TODO: Fix this.
          item.quality = item.quality - item.quality
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
        if (BRIE == item.name && item.sellIn <= 0) item.quality = 0
      } // of for.
    }
    if (SULFURAS != item.name) if (item.quality > 50) item.quality = 50
  })
  return items
}

export default GildedRose
