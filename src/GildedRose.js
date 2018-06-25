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
const isNotSulfuras = item => !isSulfuras(item);
const isNotPass = item => !isPass(item);

const qualityOverZero = item => item.quality > 0;
const qualityUnderFifty = item => item.quality < 50;

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
    const item = items[i];

    if (isNotBrie(item) && isNotPass(item)) {
      //TODO: Improve this code.
      if (qualityOverZero(item)) {
        if (isNotSulfuras(items[0])) {
          item.quality--;
        }
      }
    } else {
      if (qualityUnderFifty(item)) {
        item.quality++;
        if (isBrie(item)) {
          if (item.sellIn < 6) {
            item.quality++;
          }
        }
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        if (isBrie(item)) {
          if (item.sellIn < 11) {
            item.quality++;
          }
        }
        if (isPass(item)) {
          if (item.sellIn < 11) {
            // See revision number 2394 on SVN.
            if (qualityUnderFifty(item)) {
              item.quality++;
            }
          }
          //Increases the Quality of Backstage Passes if the Quality is 6 or less.
          if (item.sellIn < 6) {
            if (qualityUnderFifty(item)) {
              item.quality++;
            }
          }
        }
      }
    }
    if (isNotSulfuras(items[0])) {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (isNotBrie(item)) {
        if (isNotPass(item)) {
          if (qualityOverZero(item)) {
            if (isNotSulfuras(items[0])) {
              item.quality--;
            }
          }
        } else {
          //TODO: Fix this.
          item.quality = 0;
        }
      } else {
        if (qualityUnderFifty(item)) {
          item.quality++;
        }
        if (isBrie(item) && item.sellIn <= 0) item.quality = 0;
      } // of for.
    }
    if (isNotSulfuras(items[0])) if (item.quality > 50) item.quality = 50;
  }
  return items;
};

export default GildedRose;
