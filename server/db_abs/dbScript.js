// Category
const Category1 = new Parse.Object('Category');
Category1.set('name', 'Vaporera');
Category1.set('delete', false);
await Category1.save();

const Category2 = new Parse.Object('Category');
Category2.set('name', 'Arrocera');
Category1.set('delete', false);
await Category2.save();

const Category3 = new Parse.Object('Category');
Category3.set('name', 'Paellera');
Category1.set('delete', false);
await Category3.save();

const Category4 = new Parse.Object('Category');
Category4.set('name', 'Molde');
Category1.set('delete', false);
await Category4.save();

const Category5 = new Parse.Object('Category');
Category5.set('name', 'Olla con aro');
Category1.set('delete', false);
await Category5.save();

const Category6 = new Parse.Object('Category');
Category6.set('name', 'Recta');
Category1.set('delete', false);
await Category6.save();

const Category7 = new Parse.Object('Category');
Category7.set('name', 'Charola');
await Category7.save();

const Category8 = new Parse.Object('Category');
Category8.set('name', 'Antiadherente');
await Category8.save();

const Category9 = new Parse.Object('Category');
Category9.set('name', 'Olla');
await Category9.save();

const Category10 = new Parse.Object('Category');
Category10.set('name', 'Media Olla');
await Category10.save();