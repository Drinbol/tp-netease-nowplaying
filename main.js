const memoryjs = require('memoryjs');
const TP = require('touchportal-api');
const sleep = require('sleep');
const pluginId = "cloudmusic";
const processName = "cloudmusic.exe";
const ModuleName = "cloudmusic.dll";
var oldrunstate = "False"
var oldplaystate = "False"
var runstate = "False"
var playstate = "False"
const client = new TP.Client();

client.on("Info", (data) => {
  console.log("Info:", JSON.stringify(data));
  while (1) {
    try {
        var processObject = memoryjs.openProcess(processName);
        var module = memoryjs.findModule(ModuleName, processObject.th32ProcessID);
        var address = module.modBaseAddr + 0x0016FC80;
        var address1 = memoryjs.readMemory(processObject.handle, address, "int32") + 0x4;
        var value = memoryjs.readMemory(processObject.handle, address1, "int32");
        if (value == 1) {
            playstate = "True"
            if (playstate != oldplaystate){
                client.stateUpdate("tp_sid_cloudmusicStatus", playstate);
                oldplaystate = playstate;
                console.log("Info:", "Play status change");
            };
        }
        else{
            playstate = "False"
            if (playstate != oldplaystate){
                client.stateUpdate("tp_sid_cloudmusicStatus", playstate);
                oldplaystate = playstate;
                console.log("Info:", "Play status change");
            };
        }
        memoryjs.closeProcess(processObject.handle);
        runstate = "True"
        if (runstate != oldrunstate){
            client.stateUpdate("tp_sid_cloudmusicRunStatus", runstate);
            oldrunstate = runstate;
            console.log("Info:", "Run status change");
        };
    }
    catch(err) {
        runstate = "False"
        if (runstate != oldrunstate){
            client.stateUpdate("tp_sid_cloudmusicRunStatus", runstate);
            oldrunstate = runstate;
            console.log("Info:", "Run status change");
        };
    }
    sleep.sleep(1);
  }
});
client.connect({ pluginId });