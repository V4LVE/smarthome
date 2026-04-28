import { getClient } from "./mqttService";
import { ensureConnection } from "./mqttService";

const curtainBaseTopic = 'curtain';

export async function toggleCurtain(curtainId: string, shouldOpen: boolean): Promise<void> {
    ensureConnection();
    const mqttClient = getClient();
    console.log(`Toggling curtain ${curtainId} to ${shouldOpen ? 'open' : 'closed'} state...`);
    console.log(`MQTT client connected: ${mqttClient?.connected}`);
    if (mqttClient) {
        await mqttClient.publishAsync(`${curtainBaseTopic}/${curtainId}`, shouldOpen ? 'OPEN' : 'CLOSED', { qos: 2, retain: false });
        console.log(`Curtain ${curtainId} ${shouldOpen ? 'opened' : 'closed'} via MQTT`);
    }
}