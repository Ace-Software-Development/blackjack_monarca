/*for example, we need to display all the disk information*/

//const dbDisk = require('db_abs/disk.js');/*real disk from database*/
const dbDisk = require('db_abs_test/disk.js');

function displayLoading()
{

}

function displaySingleDisk(Disk)
{

}

//Model

//View
function displayDisk()
{
    displayLoading();/*dummy function*/
    let listDisk =  await dbDisk.getAll_NonDelete(null);

    for(oDisk of listDisk)
    {
        displaySingleDisk(oDisk);
    }
}