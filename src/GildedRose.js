import Item from "./Item";

const VEST = new Item("+5 Dexterity Vest", 10, 20);
const BRIE = new Item("Aged Brie", 2, 0);
const ELIXIR = new Item("Elixir of the Mongoose", 5, 7);
const SULFURAS = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
const PASS = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
const CAKE = new Item("Conjured Mana Cake", 3, 6);

const makeNameChecker = name => item => item.name == name;

const isVest = makeNameChecker(VEST.name);
const isBrie = makeNameChecker(BRIE.name);
const isElixir = makeNameChecker(ELIXIR.name);
const isSulfuras = makeNameChecker(SULFURAS.name);
const isPass = makeNameChecker(PASS.name);
const isCake = makeNameChecker(CAKE.name);

const isNotVest = item => !isVest(item);
const isNotBrie = item => !isBrie(item);
const isNotElixir = item => !isElixir(item);
const isNotSulfuras = item => !isSulfuras(item);
const isNotPass = item => !isPass(item);
const isNotCake = item => !isCake(item);

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
    if (isNotBrie(items[i]) && isNotPass(items[i])) {
      //TODO: Improve this code.
      if (items[i].quality > 0) {
        if (isNotSulfuras(items[0])) {
          items[i].quality = items[i].quality - 1;
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1;
        if (isBrie(items[i])) {
          if (items[i].sellIn < 6) {
            items[i].quality = items[i].quality + 1;
          }
        }
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        if (isBrie(items[i])) {
          if (items[i].sellIn < 11) {
            items[i].quality = items[i].quality + 1;
          }
        }
        if (isPass(items[i])) {
          if (items[i].sellIn < 11) {
            // See revision number 2394 on SVN.
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1;
            }
          }
          //Increases the Quality of Backstage Passes if the Quality is 6 or less.
          if (items[i].sellIn < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1;
            }
          }
        }
      }
    }
    if (isNotSulfuras(items[0])) {
      items[i].sellIn = items[i].sellIn - 1;
    }
    if (items[i].sellIn < 0) {
      if (isNotBrie(items[i])) {
        if (isNotPass(items[i])) {
          if (items[i].quality > 0) {
            if (isNotSulfuras(items[0])) {
              items[i].quality = items[i].quality - 1;
            }
          }
        } else {
          //TODO: Fix this.
          items[i].quality = items[i].quality - items[i].quality;
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
        }
        if (isBrie(items[i]) && items[i].sellIn <= 0) items[i].quality = 0;
      } // of for.
    }
    if (isNotSulfuras(items[0]))
      if (items[i].quality > 50) items[i].quality = 50;
  }
  return items;
};

export default GildedRose;
