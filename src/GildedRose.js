import Item from "./Item";

const VEST = new Item("+5 Dexterity Vest", 10, 20);
const BRIE = new Item("Aged Brie", 2, 0);
const ELIXIR = new Item("Elixir of the Mongoose", 5, 7);
const SULFURAS = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
const PASS = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
const CAKE = new Item("Conjured Mana Cake", 3, 6);

const makeNameChecker = name => item => item.name == name;

const isBrie = makeNameChecker(BRIE.name);
const isSulfuras = makeNameChecker(SULFURAS.name);
const isPass = makeNameChecker(PASS.name);

const isNotBrie = item => !isBrie(item);
const isNotPass = item => !isPass(item);

const qualityOverZero = item => item.quality > 0;
const qualityUnderFifty = item => item.quality < 50;
const qualityOverFifty = item => item.quality > 50;

const sellInUnderEleven = item => item.sellIn < 11;
const sellInUnderSix = item => item.sellIn < 6;
const sellInUnderZero = item => item.sellIn < 0;
const sellInLessOrEqualsZero = item => item.sellIn <= 0;

const updateSulfuras = item => ({
  quality: 80,
  sellIn: item.sellIn,
  name: item.name
});

const GildedRose = function() {
  var items = [];
  items.push(VEST);
  items.push(BRIE);
  items.push(ELIXIR);
  items.push(SULFURAS);
  items.push(PASS);
  items.push(CAKE);
  GildedRose.updateQuality(items);
};

GildedRose.updateQuality = function(items) {
  for (var i = 0; i < items.length; i++) {
    let item = items[i];

    if (isSulfuras(item)) {
      item = updateSulfuras(item);
      continue;
    }

    if (isNotBrie(item) && isNotPass(item)) {
      if (qualityOverZero(item)) {
        item.quality--;
      }
    } else {
      if (qualityUnderFifty(item)) {
        item.quality++;
        sellInUnderEleven(item) && item.quality++;
        sellInUnderSix(item) && item.quality++;
      }
    }

    item.sellIn--;

    if (sellInUnderZero(item)) {
      if (isNotBrie(item)) {
        if (isNotPass(item)) {
          if (qualityOverZero(item)) {
            item.quality--;
          }
        } else {
          item.quality = 0;
        }
      } else {
        if (qualityUnderFifty(item)) {
          item.quality++;
        }
        if (isBrie(item) && sellInLessOrEqualsZero(item)) item.quality = 0;
      }
    }
    if (qualityOverFifty(item)) item.quality = 50;
  }
  return items;
};

export default GildedRose;
