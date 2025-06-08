import * as server from '@minecraft/server';
import { world, Player, system } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
const world = server.world
const system = server.system
function getScore(e,r){try{let t=world.scoreboard.getObjective(r).getScore(e.scoreboardIdentity);if(null==t||isNaN(t))return 0;return t}catch(c){return 0}}

//Put your code under this:

function suggestion(player) {
    let form = new ModalFormData();
    form.title(`SUGGESTIONS `);
    form.textField(`You have any ideas or something you want to add to this SKYGEN? Response:`, `Type Here..`);
    form.show(player).then(response => {
            if (response.canceled) return;
        let input1 = response.formValues[0];
        player.runCommand(`/tell @a[tag=owner782] §asuggestor: ${player.name} \n§eidea: ${input1}`);
    });
    }

    system.runInterval(() => {
        for (let player of world.getPlayers()) {
            if (player.hasTag("openmenu:suggestion")) {
                system.run(() => {
                    suggestion(player);
                    player.runCommand(`tag @s remove "openmenu:suggestion"`);
                });
            }
        }
    }, 20);
    
// Lá»nh má» menu: .report-eng
world.beforeEvents.chatSend.subscribe((event) => {
    let player = event.sender;
    let message = event.message;
    if (message === `.suggestion`) {
        player.runCommand(`tag @s add openmenu:suggestion`);
    }
});
