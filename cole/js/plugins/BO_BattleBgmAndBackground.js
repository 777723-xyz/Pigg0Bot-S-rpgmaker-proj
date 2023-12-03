//=============================================================================
//  Burning Orca Plugins
//  BO_BattleBgmAndBackground.js
//  Version: 1.0
//=============================================================================

var Imported = Imported || {};
Imported.BO_BattleBgmAndBackground = true;

var BurningOrca = BurningOrca || {};
var BO = BurningOrca;
BO.BBB = BO.BBB || {};

//=============================================================================
/*:
* @plugindesc v1.0 Sets Battle BGM and Background for certain troops
* @author BurningOrca
* 
* @help
* ============================================================================
* Introduction
* ============================================================================
* Boss Battles often require a different battle music and maybe also battle background.
* With the way MV works by default you only have one global option to set the battle music.
* You can change it via an event, but you have to reset it after the boss battle
* or it stays for the next battles.
* With this plugin you can make a certain music and background only active during
* the battle against certain troops.
* 
* ============================================================================
* Troop Comments
* ============================================================================
* On the first page of each troop you can insert the following comments:
* 
* BattleBgm Name Pan Pitch Volume
*   where:
*      - Name is name of the music file to be played. 
*      - Pan is a number between -100 and 100
*      - Pitch is a number between 50 and 150
*      - Volume is a number between 0 and 100
* 
* BattleBack1 Name
*    Name of the first battle background image
*    
* BattleBack2 Name
*    Name of the second battle background image
*/

BO.BBB.isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if( !BO.BBB.isDatabaseLoaded.call(this) )
        return false;

    for( var i = 1; i < $dataTroops.length; i++ )
    {
        var page = $dataTroops[i].pages[0];
        for( var j = 0; j < page.list.length; j++ )
        {
            if( page.list[j].code === 108 )
            {
                if( page.list[j].parameters[0].match(/BattleBgm\s+(.*)\s+([+|-]?\d+)\s+(\d+)\s+(\d+)/gi) ) 
                {
                    $dataTroops[i].battleBgm = {name:RegExp.$1, pan:Number(RegExp.$2).clamp(-100, 100), pitch:Number(RegExp.$3).clamp(50, 150), volume:Number(RegExp.$4).clamp(0, 100)};
                }
                else if( page.list[j].parameters[0].match(/BattleBack1\s+(.*)/gi) ) 
                {
                    if( RegExp.$1.toUpperCase() === 'NONE' )
                    {
                        $dataTroops[i].battleBack1 = '';
                    }
                    else
                    {
                        $dataTroops[i].battleBack1 = RegExp.$1;
                    }
                }
                else if( page.list[j].parameters[0].match(/BattleBack2\s+(.*)/gi) ) 
                {
                    if( RegExp.$1.toUpperCase() === 'NONE' )
                    {
                        $dataTroops[i].battleBack2 = '';
                    }
                    else
                    {
                        $dataTroops[i].battleBack2 = RegExp.$1;
                    }
                }
            }
        }
    }

    return true;
}

BO.BBB.Game_TroopSetup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) 
{
    BO.BBB.Game_TroopSetup.call(this, troopId);

    if( this.battleBgm !== undefined ) delete this.battleBgm;
    if( this.battleBack1 !== undefined ) delete this.battleBack1;
    if( this.battleBack2 !== undefined ) delete this.battleBack2;

    if( this.troop().battleBgm !== undefined )
    {
        this.battleBgm = this.troop().battleBgm;
    }
    if( this.troop().battleBack1 !== undefined ) 
    {
        this.battleBack1 = this.troop().battleBack1;
    }
    if( this.troop().battleBack2 !== undefined ) 
    {
        this.battleBack2 = this.troop().battleBack2;
    }
}

BO.BBB.battleBgm = Game_System.prototype.battleBgm;
Game_System.prototype.battleBgm = function()
{
    if( $gameTroop && $gameTroop.battleBgm !== undefined ) 
        return $gameTroop.battleBgm;

    return BO.BBB.battleBgm.call(this);
}

BO.BBB.battleback1Name = Spriteset_Battle.prototype.battleback1Name;
Spriteset_Battle.prototype.battleback1Name = function()
{
    if( $gameTroop && $gameTroop.battleBack1 !== undefined ) 
        return $gameTroop.battleBack1;

    return BO.BBB.battleback1Name.call(this);
}

BO.BBB.battleback2Name = Spriteset_Battle.prototype.battleback2Name;
Spriteset_Battle.prototype.battleback2Name = function()
{
    if( $gameTroop && $gameTroop.battleBack2 !== undefined ) 
        return $gameTroop.battleBack2;

    return BO.BBB.battleback2Name.call(this);
}