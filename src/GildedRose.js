import Item from './Item'

const LEGENDARY_ITEM_NAMES = [
  "Sulfuras, Hand of Ragnaros",
]

const PERISHABLE_ITEM_NAMES = [
  "Aged Brie",
  "Backstage passes to a TAFKAL80ETC concert",
]

const WELL_AGING_ITEM_NAMES = [
  "Aged Brie",
  "Backstage passes to a TAFKAL80ETC concert",
]

const CONJURED_ITEM_NAMES = [
  "Conjured Mana Cake",
]


const calculateNormalQualityDecrease = ({ sellIn }) => {
  if (sellIn <= 0) return 2
  return 1
}
const calculateConjuredQualityDecrease = (item) => 2 * calculateNormalQualityDecrease(item)
const calculateWellAgingQualityIncrease = ({ sellIn }) => {
  if (sellIn <= 5) return 3
  if (sellIn <= 10) return 2
  return 1
}

const calculateWellAgingUpdatedQuality = (item) => {
  const { quality } = item
  const proposedQuality = quality + calculateWellAgingQualityIncrease(item)

  if (proposedQuality > 50) return 50
  return proposedQuality
}

const calculateUpdatedSellIn = (item) => {
  const { name, sellIn } = item

  if (LEGENDARY_ITEM_NAMES.includes(name)) return sellIn

  return sellIn - 1
}

const calculateUpdatedQuality = (item) => {
  const { name, sellIn, quality } = item

  if (LEGENDARY_ITEM_NAMES.includes(name)) return quality
  if (PERISHABLE_ITEM_NAMES.includes(name) && sellIn <= 0) return 0
  if (WELL_AGING_ITEM_NAMES.includes(name)) return calculateWellAgingUpdatedQuality(item)
  if (CONJURED_ITEM_NAMES.includes(name)) return quality - calculateConjuredQualityDecrease(item)

  return quality - calculateNormalQualityDecrease(item)
}


const GildedRose = function () {
  var items = []
  items.push(new Item("+5 Dexterity Vest", 10, 20))
  items.push(new Item("Aged Brie", 2, 0))
  items.push(new Item("Elixir of the Mongoose", 5, 7))
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80))
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20))
  items.push(new Item("Conjured Mana Cake", 3, 6))
  GildedRose.updateItems(items)
}

GildedRose.updateItems = function (items) {
  return items.map((item) => ({
    ...item,
    quality: calculateUpdatedQuality(item),
    sellIn: calculateUpdatedSellIn(item),
  }))
};

export default GildedRose