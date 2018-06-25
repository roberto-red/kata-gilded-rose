import Item from "./Item";

let BRIE = new Item("Aged Brie", 2, 0);
let SULFURAS = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
let PASS = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);

const qualityOverFifty = item => item.quality > 50;
const sellInUnderEleven = item => item.sellIn < 11;
const sellInUnderSix = item => item.sellIn < 6;
const sellInUnderZero = item => item.sellIn < 0;

const updateSulfuras = sulfuras => ({ ...sulfuras });
const updateAged = item => {
  const aged = { ...item };
  aged.quality++;
  aged.sellIn--;

  sellInUnderEleven(aged) && aged.quality++;
  sellInUnderSix(aged) && aged.quality++;

  sellInUnderZero(aged) && (aged.quality = 0);

  qualityOverFifty(aged) && (aged.quality = 50);
  return aged;
};
const updateRegular = item => {
  const regular = { ...item };
  regular.quality--;
  regular.sellIn--;

  sellInUnderZero(regular) && regular.quality--;
  return regular;
};

const getUpdater = item =>
  ({
    [SULFURAS.name]: updateSulfuras,
    [BRIE.name]: updateAged,
    [PASS.name]: updateAged
  }[item.name] || updateRegular);

const update = item => getUpdater(item)(item);

const GildedRose = function() {};

GildedRose.updateQuality = items => items.map(update);

export default GildedRose;
